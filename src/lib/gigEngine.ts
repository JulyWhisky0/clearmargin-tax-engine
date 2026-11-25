import type { FilingStatus } from '../data/federalTax2026.js';
import { IRS_2026_MILEAGE_RATE } from '../data/gigPlatforms.js';
import { calculateFederalAndState1099 } from './taxEngine.js';

export interface GigTaxInput {
  grossRevenue: number;
  platformFeePct: number; // decimal fraction, e.g. 0.20 for 20%
  supportsMileage: boolean;
  milesDriven: number;
  otherExpenses: number;
  hoursPerWeek: number;
  stateSlug: string;
  filingStatus: FilingStatus;
  applyQbiDeduction: boolean;
  w2WagesOutside?: number;
}

export interface GigTaxResult {
  grossRevenue: number;
  platformFee: number;
  netPayoutBeforeExpenses: number;
  mileageDeduction: number;
  otherExpenses: number;
  totalDeductions: number;
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
  totalTaxWithoutDeductions: number;
  deductionTaxSavings: number;
  netTakeHome: number;
  cashTakeHomeAfterOutOfPocket: number;
  quarterlySetAside: number;
  monthlyTakeHome: number;
  weeklyTakeHome: number;
  annualHours: number;
  effectiveHourlyAfterTax: number;
  effectiveTaxRate: number;
  effectiveRateOnPayout: number;
}

function clampNonNeg(val: number): number {
  return Number.isFinite(val) && val > 0 ? val : 0;
}

export function calculateGigTax(input: GigTaxInput): GigTaxResult {
  const grossRevenue = clampNonNeg(input.grossRevenue);
  const feePct = Math.min(1, clampNonNeg(input.platformFeePct));
  const platformFee = grossRevenue * feePct;
  const netPayoutBeforeExpenses = Math.max(0, grossRevenue - platformFee);

  const milesDriven = input.supportsMileage ? clampNonNeg(input.milesDriven) : 0;
  const mileageDeduction = input.supportsMileage ? milesDriven * IRS_2026_MILEAGE_RATE : 0;
  const otherExpenses = clampNonNeg(input.otherExpenses);
  const totalDeductions = mileageDeduction + otherExpenses;

  const withDeductions = calculateFederalAndState1099({
    grossRevenue: netPayoutBeforeExpenses,
    businessExpenses: totalDeductions,
    stateSlug: input.stateSlug,
    filingStatus: input.filingStatus,
    applyQbiDeduction: input.applyQbiDeduction,
    w2WagesOutside: input.w2WagesOutside,
  });

  const withoutDeductions = calculateFederalAndState1099({
    grossRevenue: netPayoutBeforeExpenses,
    businessExpenses: 0,
    stateSlug: input.stateSlug,
    filingStatus: input.filingStatus,
    applyQbiDeduction: input.applyQbiDeduction,
    w2WagesOutside: input.w2WagesOutside,
  });

  const deductionTaxSavings = Math.max(0, withoutDeductions.totalTax - withDeductions.totalTax);
  const quarterlySetAside = withDeductions.quarterlyEstimatedTax;
  const annualHours = clampNonNeg(input.hoursPerWeek) * 50;
  const effectiveHourlyAfterTax = annualHours > 0 ? withDeductions.netTakeHome / annualHours : 0;
  const cashTakeHomeAfterOutOfPocket = Math.max(
    0,
    netPayoutBeforeExpenses - otherExpenses - withDeductions.totalTax
  );

  return {
    grossRevenue,
    platformFee,
    netPayoutBeforeExpenses,
    mileageDeduction,
    otherExpenses,
    totalDeductions,
    netProfit: withDeductions.netProfit,
    seTaxableEarnings: withDeductions.seTaxableEarnings,
    socialSecurityTax: withDeductions.socialSecurityTax,
    medicareTax: withDeductions.medicareTax,
    additionalMedicareTax: withDeductions.additionalMedicareTax,
    totalSeTax: withDeductions.totalSeTax,
    seTaxDeduction: withDeductions.seTaxDeduction,
    agi: withDeductions.agi,
    federalStandardDeduction: withDeductions.federalStandardDeduction,
    qbiDeduction: withDeductions.qbiDeduction,
    federalTaxableIncome: withDeductions.federalTaxableIncome,
    federalIncomeTax: withDeductions.federalIncomeTax,
    federalMarginalRate: withDeductions.federalMarginalRate,
    stateTaxableIncome: withDeductions.stateTaxableIncome,
    stateIncomeTax: withDeductions.stateIncomeTax,
    stateMarginalRate: withDeductions.stateMarginalRate,
    totalTax: withDeductions.totalTax,
    totalTaxWithoutDeductions: withoutDeductions.totalTax,
    deductionTaxSavings,
    netTakeHome: withDeductions.netTakeHome,
    cashTakeHomeAfterOutOfPocket,
    quarterlySetAside,
    monthlyTakeHome: withDeductions.monthlyTakeHome,
    weeklyTakeHome: withDeductions.weeklyTakeHome,
    annualHours,
    effectiveHourlyAfterTax,
    effectiveTaxRate: withDeductions.effectiveTotalRate,
    effectiveRateOnPayout:
      netPayoutBeforeExpenses > 0 ? withDeductions.totalTax / netPayoutBeforeExpenses : 0,
  };
}
