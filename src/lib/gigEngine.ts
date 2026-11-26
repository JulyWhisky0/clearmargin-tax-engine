import type { FilingStatus } from '../data/federalTax2026.js';
import {
  IRS_2026_MILEAGE_RATE_H1,
  IRS_2026_MILEAGE_RATE_H2,
} from '../data/gigPlatforms.js';
import { calculateFederalAndState1099 } from './taxEngine.js';

export interface GigTaxInput {
  grossRevenue: number;
  platformFeePct: number; // decimal fraction, e.g. 0.20 for 20%
  supportsMileage: boolean;
  /** Total annual business miles (split 50/50 across H1 & H2 if milesH1/milesH2 are omitted) */
  milesDriven: number;
  /** Optional Jan 1 – Jun 30, 2026 business miles deducted at $0.725/mi (IRS Notice 2026-10) */
  milesH1?: number;
  /** Optional Jul 1 – Dec 31, 2026 business miles deducted at $0.76/mi (IRS Announcement 2026-11) */
  milesH2?: number;
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
  milesH1: number;
  milesH2: number;
  mileageDeductionH1: number;
  mileageDeductionH2: number;
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

  let milesH1 = 0;
  let milesH2 = 0;
  if (input.supportsMileage) {
    if (input.milesH1 !== undefined || input.milesH2 !== undefined) {
      milesH1 = clampNonNeg(input.milesH1 ?? 0);
      milesH2 = clampNonNeg(input.milesH2 ?? 0);
    } else {
      const totalMiles = clampNonNeg(input.milesDriven);
      milesH1 = totalMiles / 2;
      milesH2 = totalMiles / 2;
    }
  }

  const mileageDeductionH1 = milesH1 * IRS_2026_MILEAGE_RATE_H1;
  const mileageDeductionH2 = milesH2 * IRS_2026_MILEAGE_RATE_H2;
  const mileageDeduction = mileageDeductionH1 + mileageDeductionH2;
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
    milesH1,
    milesH2,
    mileageDeductionH1,
    mileageDeductionH2,
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
