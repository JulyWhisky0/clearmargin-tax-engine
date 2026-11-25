import {
  FEDERAL_BRACKETS_2026,
  FEDERAL_STANDARD_DEDUCTION_2026,
  SE_TAX_CONSTANTS_2026,
  type FilingStatus,
  type TaxBracket,
} from '../data/federalTax2026.js';
import { STATE_TAX_MAP, type StateTaxProfile } from '../data/stateTaxes2026.js';

export interface Calc1099Input {
  grossRevenue: number;
  businessExpenses: number;
  stateSlug: string;
  filingStatus: FilingStatus;
  applyQbiDeduction: boolean;
  w2WagesOutside?: number;
}

export interface Calc1099Result {
  grossRevenue: number;
  businessExpenses: number;
  netProfit: number;
  seTaxableEarnings: number;
  socialSecurityTax: number;
  medicareTax: number;
  additionalMedicareTax: number;
  totalSeTax: number;
  seTaxDeduction: number;
  agi: number;
  federalStandardDeduction: number;
  qbiDeduction: number;
  federalTaxableIncome: number;
  federalIncomeTax: number;
  federalMarginalRate: number;
  stateTaxableIncome: number;
  stateIncomeTax: number;
  stateMarginalRate: number;
  totalTax: number;
  netTakeHome: number;
  effectiveTotalRate: number;
  effectiveStateRate: number;
  quarterlyEstimatedTax: number;
  monthlyTakeHome: number;
  weeklyTakeHome: number;
}

function clampNonNeg(val: number): number {
  return Number.isFinite(val) && val > 0 ? val : 0;
}

export function computeBracketTax(
  taxableIncome: number,
  brackets: TaxBracket[]
): { tax: number; marginalRate: number } {
  const income = clampNonNeg(taxableIncome);
  if (income <= 0 || brackets.length === 0) {
    return { tax: 0, marginalRate: 0 };
  }

  let tax = 0;
  let prevCap = 0;
  let marginalRate = brackets[0].rate;

  for (const bracket of brackets) {
    marginalRate = bracket.rate;
    if (bracket.upTo === null || income <= bracket.upTo) {
      tax += (income - prevCap) * bracket.rate;
      break;
    }
    tax += (bracket.upTo - prevCap) * bracket.rate;
    prevCap = bracket.upTo;
  }

  return { tax, marginalRate };
}

export function computeStateTax2026(
  agi: number,
  state: StateTaxProfile,
  filingStatus: FilingStatus,
  federalTaxableIncome: number
): { stateTaxableIncome: number; stateIncomeTax: number; stateMarginalRate: number } {
  const cleanAgi = clampNonNeg(agi);
  if (cleanAgi <= 0 || state.taxType === 'none' || state.bracketsSingle.length === 0) {
    return { stateTaxableIncome: 0, stateIncomeTax: 0, stateMarginalRate: 0 };
  }

  // Approximate MFJ double standard deduction & bracket width smoothly for states aligned to federal/joint brackets
  const deductionMultiplier = filingStatus === 'mfj' ? 2 : filingStatus === 'hoh' ? 1.5 : 1;
  const bracketMultiplier = filingStatus === 'mfj' ? 2 : filingStatus === 'hoh' ? 1.35 : 1;

  let deduction = state.standardDeductionSingle * deductionMultiplier;

  // States that piggyback directly on Federal Taxable Income (CO, ID, MT, ND, SC, IA) already reflect QBI & federal standard deduction
  const federalTaxablePiggyback = new Set(['colorado', 'iowa', 'montana', 'north-dakota', 'south-carolina']);
  if (federalTaxablePiggyback.has(state.slug)) {
    const scaledBrackets = state.bracketsSingle.map((b) => ({
      upTo: b.upTo === null ? null : Math.round(b.upTo * bracketMultiplier),
      rate: b.rate,
    }));
    const res = computeBracketTax(federalTaxableIncome, scaledBrackets);
    return {
      stateTaxableIncome: federalTaxableIncome,
      stateIncomeTax: res.tax,
      stateMarginalRate: res.marginalRate,
    };
  }

  const stateTaxableIncome = Math.max(0, cleanAgi - deduction);
  const scaledBrackets = state.bracketsSingle.map((b) => ({
    upTo: b.upTo === null ? null : Math.round(b.upTo * bracketMultiplier),
    rate: b.rate,
  }));

  const res = computeBracketTax(stateTaxableIncome, scaledBrackets);

  // Utah taxpayer tax credit offsets ~6% of standard deduction/exemptions
  let finalStateTax = res.tax;
  if (state.slug === 'utah') {
    const baseCredit = (filingStatus === 'mfj' ? 32200 : 16100) * 0.06;
    const creditPhaseout = Math.max(0, cleanAgi - (filingStatus === 'mfj' ? 35500 : 17750)) * 0.013;
    const credit = Math.max(0, baseCredit - creditPhaseout);
    finalStateTax = Math.max(0, res.tax - credit);
  }

  return {
    stateTaxableIncome,
    stateIncomeTax: finalStateTax,
    stateMarginalRate: finalStateTax > 0 ? res.marginalRate : 0,
  };
}

export function calculateFederalAndState1099(input: Calc1099Input): Calc1099Result {
  const grossRevenue = clampNonNeg(input.grossRevenue);
  const businessExpenses = Math.min(grossRevenue, clampNonNeg(input.businessExpenses));
  const netProfit = Math.max(0, grossRevenue - businessExpenses);
  const w2Wages = clampNonNeg(input.w2WagesOutside ?? 0);
  const state = STATE_TAX_MAP[input.stateSlug] ?? STATE_TAX_MAP['texas'];
  const status: FilingStatus = input.filingStatus ?? 'single';

  if (netProfit <= 0) {
    return {
      grossRevenue,
      businessExpenses,
      netProfit: 0,
      seTaxableEarnings: 0,
      socialSecurityTax: 0,
      medicareTax: 0,
      additionalMedicareTax: 0,
      totalSeTax: 0,
      seTaxDeduction: 0,
      agi: 0,
      federalStandardDeduction: FEDERAL_STANDARD_DEDUCTION_2026[status],
      qbiDeduction: 0,
      federalTaxableIncome: 0,
      federalIncomeTax: 0,
      federalMarginalRate: 0,
      stateTaxableIncome: 0,
      stateIncomeTax: 0,
      stateMarginalRate: 0,
      totalTax: 0,
      netTakeHome: 0,
      effectiveTotalRate: 0,
      effectiveStateRate: 0,
      quarterlyEstimatedTax: 0,
      monthlyTakeHome: 0,
      weeklyTakeHome: 0,
    };
  }

  // Self-employment tax only applies once net earnings reach $400
  const seTaxableEarnings =
    netProfit >= 400 ? netProfit * SE_TAX_CONSTANTS_2026.netEarningsFactor : 0;

  const remainingSsCap = Math.max(
    0,
    SE_TAX_CONSTANTS_2026.socialSecurityWageCap - w2Wages
  );
  const ssTaxable = Math.min(seTaxableEarnings, remainingSsCap);
  const socialSecurityTax = ssTaxable * SE_TAX_CONSTANTS_2026.socialSecurityRate;

  const medicareTax = seTaxableEarnings * SE_TAX_CONSTANTS_2026.medicareRate;

  const addMedThreshold = SE_TAX_CONSTANTS_2026.additionalMedicareThreshold[status];
  const combinedMedEarnings = seTaxableEarnings + w2Wages;
  const addMedExcess = Math.max(0, combinedMedEarnings - addMedThreshold);
  const addMedSePortion = Math.min(seTaxableEarnings, addMedExcess);
  const additionalMedicareTax =
    addMedSePortion * SE_TAX_CONSTANTS_2026.additionalMedicareRate;

  const totalSeTax = socialSecurityTax + medicareTax + additionalMedicareTax;
  // IRS Form 1040 Schedule SE allows deducting 50% of regular SS + regular Medicare
  const seTaxDeduction = (socialSecurityTax + medicareTax) * 0.5;

  const agi = Math.max(0, netProfit - seTaxDeduction);
  const federalStandardDeduction = FEDERAL_STANDARD_DEDUCTION_2026[status];
  const preQbiTaxable = Math.max(0, agi - federalStandardDeduction);

  // Section 199A QBI deduction: 20% of lesser of qualified business income or taxable income before QBI
  const qbiDeduction = input.applyQbiDeduction
    ? Math.max(0, Math.min(agi, preQbiTaxable) * 0.2)
    : 0;

  const federalTaxableIncome = Math.max(0, preQbiTaxable - qbiDeduction);
  const fedRes = computeBracketTax(
    federalTaxableIncome,
    FEDERAL_BRACKETS_2026[status]
  );

  const stateRes = computeStateTax2026(
    agi,
    state,
    status,
    federalTaxableIncome
  );

  const totalTax = totalSeTax + fedRes.tax + stateRes.stateIncomeTax;
  const netTakeHome = Math.max(0, netProfit - totalTax);

  return {
    grossRevenue,
    businessExpenses,
    netProfit,
    seTaxableEarnings,
    socialSecurityTax,
    medicareTax,
    additionalMedicareTax,
    totalSeTax,
    seTaxDeduction,
    agi,
    federalStandardDeduction,
    qbiDeduction,
    federalTaxableIncome,
    federalIncomeTax: fedRes.tax,
    federalMarginalRate: fedRes.tax > 0 ? fedRes.marginalRate : 0,
    stateTaxableIncome: stateRes.stateTaxableIncome,
    stateIncomeTax: stateRes.stateIncomeTax,
    stateMarginalRate: stateRes.stateMarginalRate,
    totalTax,
    netTakeHome,
    effectiveTotalRate: netProfit > 0 ? totalTax / netProfit : 0,
    effectiveStateRate: netProfit > 0 ? stateRes.stateIncomeTax / netProfit : 0,
    quarterlyEstimatedTax: totalTax / 4,
    monthlyTakeHome: netTakeHome / 12,
    weeklyTakeHome: netTakeHome / 52,
  };
}

export interface HourlyRateInput {
  targetNetAnnual: number;
  annualOverheadExpenses: number;
  billableHoursPerWeek: number;
  workingWeeksPerYear: number;
  stateSlug: string;
  filingStatus: FilingStatus;
  applyQbiDeduction: boolean;
  platformFeeRate: number; // e.g. 0.10 for 10%
}

export interface HourlyRateResult {
  requiredGrossBilling: number;
  requiredNetProfitBeforeTax: number;
  estimatedPlatformFees: number;
  estimatedTotalTaxes: number;
  totalBillableHours: number;
  hourlyRate: number;
  dayRate8h: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  effectiveTaxRate: number;
}

export function calculateRequiredHourlyRate(input: HourlyRateInput): HourlyRateResult {
  const targetNet = clampNonNeg(input.targetNetAnnual);
  const overhead = clampNonNeg(input.annualOverheadExpenses);
  const hoursPerWeek = Math.max(1, clampNonNeg(input.billableHoursPerWeek));
  const weeks = Math.max(1, Math.min(52, clampNonNeg(input.workingWeeksPerYear)));
  const feeRate = Math.min(0.6, clampNonNeg(input.platformFeeRate));
  const totalBillableHours = hoursPerWeek * weeks;

  if (targetNet <= 0) {
    return {
      requiredGrossBilling: 0,
      requiredNetProfitBeforeTax: 0,
      estimatedPlatformFees: 0,
      estimatedTotalTaxes: 0,
      totalBillableHours,
      hourlyRate: 0,
      dayRate8h: 0,
      weeklyRevenue: 0,
      monthlyRevenue: 0,
      effectiveTaxRate: 0,
    };
  }

  // Binary search required net profit before tax such that (netProfit - tax) == targetNet
  let lo = targetNet;
  let hi = targetNet * 2.5 + 10000;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const taxRes = calculateFederalAndState1099({
      grossRevenue: mid,
      businessExpenses: 0,
      stateSlug: input.stateSlug,
      filingStatus: input.filingStatus,
      applyQbiDeduction: input.applyQbiDeduction,
    });
    if (taxRes.netTakeHome < targetNet) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  const requiredNetProfitBeforeTax = (lo + hi) / 2;
  const finalTaxRes = calculateFederalAndState1099({
    grossRevenue: requiredNetProfitBeforeTax,
    businessExpenses: 0,
    stateSlug: input.stateSlug,
    filingStatus: input.filingStatus,
    applyQbiDeduction: input.applyQbiDeduction,
  });

  // Gross billing G satisfies: G * (1 - feeRate) - overhead = requiredNetProfitBeforeTax
  const requiredGrossBilling =
    (requiredNetProfitBeforeTax + overhead) / Math.max(0.1, 1 - feeRate);
  const estimatedPlatformFees = requiredGrossBilling * feeRate;
  const hourlyRate = requiredGrossBilling / totalBillableHours;

  return {
    requiredGrossBilling,
    requiredNetProfitBeforeTax,
    estimatedPlatformFees,
    estimatedTotalTaxes: finalTaxRes.totalTax,
    totalBillableHours,
    hourlyRate,
    dayRate8h: hourlyRate * 8,
    weeklyRevenue: requiredGrossBilling / weeks,
    monthlyRevenue: requiredGrossBilling / 12,
    effectiveTaxRate: finalTaxRes.effectiveTotalRate,
  };
}

export interface W2Vs1099Input {
  w2Salary: number;
  employerHealthBenefit: number;
  employer401kMatch: number;
  paidTimeOffDays: number;
  annualBusinessOverhead: number;
  billableHoursPerYear: number;
  stateSlug: string;
  filingStatus: FilingStatus;
  applyQbiDeduction: boolean;
}

export interface W2Vs1099Result {
  w2TotalCompensationValue: number;
  w2EmployeeFicaAndIncomeTax: number;
  w2NetEffectiveValue: number;
  equivalent1099GrossRevenue: number;
  equivalent1099HourlyRate: number;
  contractorMultiplierVsW2Hourly: number;
  w2HourlyBase: number;
  extraSeTaxGap: number;
}

export function compareW2Vs1099(input: W2Vs1099Input): W2Vs1099Result {
  const w2Salary = clampNonNeg(input.w2Salary);
  const health = clampNonNeg(input.employerHealthBenefit);
  const match401k = clampNonNeg(input.employer401kMatch);
  const ptoDays = Math.min(60, clampNonNeg(input.paidTimeOffDays));
  const overhead = clampNonNeg(input.annualBusinessOverhead);
  const billableHours = Math.max(200, clampNonNeg(input.billableHoursPerYear));
  const status: FilingStatus = input.filingStatus ?? 'single';
  const state = STATE_TAX_MAP[input.stateSlug] ?? STATE_TAX_MAP['texas'];

  const w2HourlyBase = w2Salary / 2080;
  const ptoReplacementValue = ptoDays * 8 * w2HourlyBase;

  // W-2 employee pays 7.65% FICA (capped SS) + federal/state income tax on W-2 salary
  const w2SsTax =
    Math.min(w2Salary, SE_TAX_CONSTANTS_2026.socialSecurityWageCap) * 0.062;
  const w2MedTax =
    w2Salary * 0.0145 +
    Math.max(
      0,
      w2Salary - SE_TAX_CONSTANTS_2026.additionalMedicareThreshold[status]
    ) *
      0.009;
  const w2Fica = w2SsTax + w2MedTax;
  const w2FedTaxable = Math.max(
    0,
    w2Salary - FEDERAL_STANDARD_DEDUCTION_2026[status]
  );
  const w2FedIncome = computeBracketTax(
    w2FedTaxable,
    FEDERAL_BRACKETS_2026[status]
  ).tax;
  const w2StateIncome = computeStateTax2026(
    w2Salary,
    state,
    status,
    w2FedTaxable
  ).stateIncomeTax;

  const w2EmployeeFicaAndIncomeTax = w2Fica + w2FedIncome + w2StateIncome;
  const w2TotalCompensationValue = w2Salary + health + match401k + ptoReplacementValue;
  // Target after-tax cash + replacement value of employer-paid health & retirement
  const targetAfterTaxEquivalent =
    w2Salary - w2EmployeeFicaAndIncomeTax + health + match401k;

  // Find 1099 net profit needed to yield targetAfterTaxEquivalent after 1099 taxes
  let lo = targetAfterTaxEquivalent;
  let hi = targetAfterTaxEquivalent * 2.5 + 15000;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const res = calculateFederalAndState1099({
      grossRevenue: mid,
      businessExpenses: 0,
      stateSlug: input.stateSlug,
      filingStatus: status,
      applyQbiDeduction: input.applyQbiDeduction,
    });
    if (res.netTakeHome < targetAfterTaxEquivalent) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  const required1099NetProfit = (lo + hi) / 2;
  const final1099Res = calculateFederalAndState1099({
    grossRevenue: required1099NetProfit,
    businessExpenses: 0,
    stateSlug: input.stateSlug,
    filingStatus: status,
    applyQbiDeduction: input.applyQbiDeduction,
  });

  // Account for unbilled PTO hours in billable base or add overhead directly
  const effectiveHours = Math.max(200, billableHours - ptoDays * 8);
  const equivalent1099GrossRevenue = required1099NetProfit + overhead;
  const equivalent1099HourlyRate = equivalent1099GrossRevenue / effectiveHours;

  return {
    w2TotalCompensationValue,
    w2EmployeeFicaAndIncomeTax,
    w2NetEffectiveValue: targetAfterTaxEquivalent,
    equivalent1099GrossRevenue,
    equivalent1099HourlyRate,
    contractorMultiplierVsW2Hourly:
      w2HourlyBase > 0 ? equivalent1099HourlyRate / w2HourlyBase : 1.35,
    w2HourlyBase,
    extraSeTaxGap: Math.max(0, final1099Res.totalSeTax - w2Fica),
  };
}

export function formatUSD(amount: number, decimals = 0): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(safe);
}

export function formatPct(rate: number, decimals = 1): string {
  const safe = Number.isFinite(rate) ? rate : 0;
  return `${(safe * 100).toFixed(decimals)}%`;
}
