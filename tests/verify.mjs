import assert from 'node:assert/strict';
import {
  STATE_TAXES_2026,
  STATE_TAX_MAP,
  PLATFORMS,
  GIG_PLATFORMS,
  IRS_2026_MILEAGE_RATE,
  IRS_SOURCES_2026,
  PLATFORM_FEE_SOURCES,
  GIG_SOURCES,
  calculateFederalAndState1099,
  calculateRequiredHourlyRate,
  compareW2Vs1099,
  calculatePlatformFees,
  solveRequiredListingPrice,
  calculateGigTax,
} from '../dist/index.js';

console.log('Running clearmargin-tax-engine 2026 verification suite...');

// 1. Dataset completeness & primary source coverage
assert.equal(STATE_TAXES_2026.length, 51, `Expected 51 jurisdictions (50 states + DC), got ${STATE_TAXES_2026.length}`);
assert.equal(PLATFORMS.length, 23, `Expected 23 marketplace & payment platforms, got ${PLATFORMS.length}`);
assert.equal(GIG_PLATFORMS.length, 7, `Expected 7 gig & creator verticals, got ${GIG_PLATFORMS.length}`);
assert.equal(IRS_2026_MILEAGE_RATE, 0.70, 'Expected 2026 IRS business mileage rate of $0.70/mile');

for (const p of PLATFORMS) {
  assert.ok(PLATFORM_FEE_SOURCES[p.slug]?.url, `Missing official fee source URL for platform "${p.slug}"`);
}
for (const g of GIG_PLATFORMS) {
  assert.ok(GIG_SOURCES[g.slug]?.url, `Missing official reference URL for gig platform "${g.slug}"`);
}
assert.ok(IRS_SOURCES_2026.scheduleSE.url.includes('irs.gov'));

// 2. Zero income edge case
const zeroRes = calculateFederalAndState1099({
  grossRevenue: 0,
  businessExpenses: 0,
  stateSlug: 'california',
  filingStatus: 'single',
  applyQbiDeduction: true,
});
assert.equal(zeroRes.totalTax, 0);
assert.equal(zeroRes.netTakeHome, 0);
assert.ok(!Number.isNaN(zeroRes.effectiveTotalRate));

// 3. No-tax states vs California progressive monotonic increase
const tx100 = calculateFederalAndState1099({
  grossRevenue: 100000,
  businessExpenses: 0,
  stateSlug: 'texas',
  filingStatus: 'single',
  applyQbiDeduction: true,
});
const fl100 = calculateFederalAndState1099({
  grossRevenue: 100000,
  businessExpenses: 0,
  stateSlug: 'florida',
  filingStatus: 'single',
  applyQbiDeduction: true,
});
assert.equal(tx100.stateIncomeTax, 0);
assert.equal(fl100.stateIncomeTax, 0);
assert.equal(tx100.netTakeHome, fl100.netTakeHome);

const ca50 = calculateFederalAndState1099({
  grossRevenue: 50000,
  businessExpenses: 0,
  stateSlug: 'california',
  filingStatus: 'single',
  applyQbiDeduction: true,
});
const ca100 = calculateFederalAndState1099({
  grossRevenue: 100000,
  businessExpenses: 0,
  stateSlug: 'california',
  filingStatus: 'single',
  applyQbiDeduction: true,
});
const ca250 = calculateFederalAndState1099({
  grossRevenue: 250000,
  businessExpenses: 0,
  stateSlug: 'california',
  filingStatus: 'single',
  applyQbiDeduction: true,
});
assert.ok(ca50.stateIncomeTax > 0 && ca100.stateIncomeTax > ca50.stateIncomeTax && ca250.stateIncomeTax > ca100.stateIncomeTax);
assert.ok(tx100.netTakeHome > ca100.netTakeHome, 'Texas contractor should net more than California at $100k');
assert.ok(STATE_TAX_MAP['california'].topRate > 0.12);

// 4. 2026 Social Security wage cap verification ($184,500 * 12.4% = $22,878 max SS tax)
const highEarner = calculateFederalAndState1099({
  grossRevenue: 500000,
  businessExpenses: 0,
  stateSlug: 'texas',
  filingStatus: 'single',
  applyQbiDeduction: false,
});
assert.equal(Math.round(highEarner.socialSecurityTax), Math.round(184500 * 0.124));

// 5. Hourly rate & W-2 vs 1099 equivalency checks
const hr = calculateRequiredHourlyRate({
  targetNetAnnual: 85000,
  annualOverheadExpenses: 5000,
  billableHoursPerWeek: 28,
  workingWeeksPerYear: 48,
  stateSlug: 'texas',
  filingStatus: 'single',
  applyQbiDeduction: true,
  platformFeeRate: 0.1,
});
assert.ok(hr.hourlyRate > 60 && hr.hourlyRate < 200);
assert.ok(Math.abs(hr.dayRate8h - hr.hourlyRate * 8) < 0.01);

const w2c = compareW2Vs1099({
  w2Salary: 110000,
  employerHealthBenefit: 7200,
  employer401kMatch: 4400,
  paidTimeOffDays: 20,
  annualBusinessOverhead: 4000,
  billableHoursPerYear: 1920,
  stateSlug: 'california',
  filingStatus: 'single',
  applyQbiDeduction: true,
});
assert.ok(w2c.contractorMultiplierVsW2Hourly > 1.1 && w2c.contractorMultiplierVsW2Hourly < 1.8);

// 6. Reverse pricing solver verification across ALL 23 platforms & tiers
const targets = [10, 12.02, 45, 100, 500, 2000];
for (const platform of PLATFORMS) {
  for (const tier of platform.tiers) {
    for (const target of targets) {
      const { requiredSalePrice, breakdown } = solveRequiredListingPrice(platform, target, {
        tierId: tier.id,
        cogs: platform.supportsCogsAndShipping ? 5 : 0,
        sellerShippingCost: 0,
      });
      assert.ok(
        breakdown.netProfit >= target - 0.005,
        `[${platform.slug}/${tier.id}] target=${target}: netProfit=${breakdown.netProfit} < target at price=${requiredSalePrice}`
      );
      assert.ok(
        breakdown.netProfit - target <= 5.0 || tier.underAmountThreshold !== undefined,
        `[${platform.slug}/${tier.id}] target=${target}: overshoot too large (${breakdown.netProfit})`
      );
      const recheck = calculatePlatformFees(platform, {
        salePrice: requiredSalePrice,
        tierId: tier.id,
        cogs: platform.supportsCogsAndShipping ? 5 : 0,
      });
      assert.equal(recheck.netProfit, breakdown.netProfit);
    }
  }
}

// 7. Discontinuous boundary checks (Poshmark $15 cliff & Stripe ACH $5 cap)
const posh = PLATFORMS.find((p) => p.slug === 'poshmark');
const poshBelow = solveRequiredListingPrice(posh, 12.02, {});
assert.ok(poshBelow.requiredSalePrice < 15, `Expected Poshmark price < $15 for $12.02 net, got ${poshBelow.requiredSalePrice}`);

const stripe = PLATFORMS.find((p) => p.slug === 'stripe');
const stripeAch = calculatePlatformFees(stripe, { salePrice: 2000, tierId: 'ach-direct' });
assert.equal(stripeAch.processingFee, 5, 'Expected Stripe ACH fee on $2,000 invoice to cap at $5.00');
assert.equal(stripeAch.netProfit, 1995);

// 8. Gig economy & creator engine verification (Uber $0.70/mi + OnlyFans 20% cut)
const uberRes = calculateGigTax({
  grossRevenue: 52000,
  platformFeePct: 0,
  supportsMileage: true,
  milesDriven: 28000,
  otherExpenses: 2400,
  hoursPerWeek: 35,
  stateSlug: 'california',
  filingStatus: 'single',
  applyQbiDeduction: true,
});
assert.equal(uberRes.mileageDeduction, 28000 * 0.7);
assert.ok(uberRes.deductionTaxSavings > 0);
assert.ok(!Number.isNaN(uberRes.totalTax) && uberRes.netTakeHome > 0);

const onlyfansRes = calculateGigTax({
  grossRevenue: 100000,
  platformFeePct: 0.2,
  supportsMileage: false,
  milesDriven: 5000,
  otherExpenses: 10000,
  hoursPerWeek: 30,
  stateSlug: 'florida',
  filingStatus: 'single',
  applyQbiDeduction: true,
});
assert.equal(onlyfansRes.platformFee, 20000);
assert.equal(onlyfansRes.netProfit, 70000);
assert.ok(onlyfansRes.totalTax > 0 && onlyfansRes.netTakeHome > 0);

console.log(
  `ALL CHECKS PASSED: ${STATE_TAXES_2026.length} jurisdictions, ${PLATFORMS.length} platforms, ${GIG_PLATFORMS.length} gig verticals, reverse-pricing & 2026 IRS math verified!`
);
