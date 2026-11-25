# ClearMargin 2026 US 1099 Tax & Platform Fee Engine

[![Verify 2026 Tax & Fee Engine](https://github.com/JulyWhisky0/clearmargin-tax-engine/actions/workflows/ci.yml/badge.svg)](https://github.com/JulyWhisky0/clearmargin-tax-engine/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/clearmargin-tax-engine.svg)](https://www.npmjs.com/package/clearmargin-tax-engine)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/Node-%3E%3D20-blue.svg)](https://nodejs.org)

Audited, zero-dependency TypeScript calculation engine and 2026 statutory datasets powering **[ClearMargin](https://clearmargincalc.com)**.

This open-source package exposes the deterministic mathematical rules behind:
- **2026 IRS Schedule SE & Federal Income Tax Engine** (92.35% SE taxable earnings factor, 12.4% Social Security up to the $184,500 2026 wage cap, 2.9% + 0.9% Medicare, 50% SE deduction, Section 199A 20% QBI deduction, and progressive Single / MFJ / HOH brackets)
- **All 50 US States + District of Columbia (51 Jurisdictions)** with progressive brackets, flat rates, no-tax states, state standard deductions/exemptions, and federal-taxable-income conformity logic
- **Freelance Hourly Rate & W-2 vs 1099 Equivalency Solvers**
- **Gig Economy & Creator 1099 Engine (7 Verticals)** modeling the **2026 IRS $0.70/mile** standard business mileage deduction
- **23 Marketplace, SaaS & Payment Processor Fee Engines + Exact Reverse-Pricing Solvers** (handling discontinuous tiers such as Poshmark’s flat $2.95 cliff below $15 and Stripe ACH’s $5.00 cap)

---

## Try the Interactive Web Calculators

- **[All 51 State 1099 Tax Calculators](https://clearmargincalc.com/calculators/1099-tax/)**
- **[23 Platform Fee & Reverse-Pricing Calculators](https://clearmargincalc.com/calculators/platform-fees/)**
- **[30 State-vs-State Tax Relocation Comparisons](https://clearmargincalc.com/calculators/compare/)**
- **[Gig Economy & Creator 1099 Calculators](https://clearmargincalc.com/calculators/gig-tax/)** (Uber, DoorDash, Instacart, Amazon Flex, Lyft, YouTube, OnlyFans)
- **[Free Embeddable Widgets](https://clearmargincalc.com/embed/1099-tax/)** (iframe-ready for blogs and newsletters)

---

## Installation

```bash
npm install clearmargin-tax-engine
```

Zero runtime dependencies. Full TypeScript declarations (`dist/index.d.ts`) and ESM exports included.

---

## Quick Start

### 1. Calculate 2026 1099 Taxes (Federal + State + Quarterly)

```ts
import { calculateFederalAndState1099 } from 'clearmargin-tax-engine';

const result = calculateFederalAndState1099({
  grossRevenue: 120000,
  businessExpenses: 12000,
  stateSlug: 'california',
  filingStatus: 'single',
  applyQbiDeduction: true,
});

console.log({
  netProfit: result.netProfit,
  totalSeTax: result.totalSeTax,
  federalIncomeTax: result.federalIncomeTax,
  stateIncomeTax: result.stateIncomeTax,
  netTakeHome: result.netTakeHome,
  quarterlyEstimatedTax: result.quarterlyEstimatedTax,
});
```

### 2. Reverse-Solve Required Marketplace Listing Price

```ts
import { PLATFORM_MAP, solveRequiredListingPrice } from 'clearmargin-tax-engine';

const etsy = PLATFORM_MAP['etsy'];
const quote = solveRequiredListingPrice(etsy, 45.0, {
  cogs: 12,
  sellerShippingCost: 4.5,
  addonIds: ['offsite-ads-15'],
});

console.log({
  requiredListingPrice: quote.requiredSalePrice,
  totalPlatformFees: quote.breakdown.totalPlatformFees,
  netProfit: quote.breakdown.netProfit,
});
```

### 3. Gig Economy Mileage & Net Hourly Pay

```ts
import { calculateGigTax } from 'clearmargin-tax-engine';

const uber = calculateGigTax({
  grossRevenue: 52000,
  platformFeePct: 0,
  supportsMileage: true,
  milesDriven: 28000,
  otherExpenses: 2400,
  hoursPerWeek: 35,
  stateSlug: 'texas',
  filingStatus: 'single',
  applyQbiDeduction: true,
});

console.log({
  mileageDeduction: uber.mileageDeduction,
  taxSavedByDeductions: uber.deductionTaxSavings,
  effectiveHourlyAfterTax: uber.effectiveHourlyAfterTax,
});
```

---

## Local Development

```bash
npm install
npm test
```

---

## Primary Sources & Methodology

Every tax bracket, wage cap, mileage rate, and marketplace fee schedule traces directly to primary regulatory or platform documentation. Full methodology and per-platform links are documented in [`src/data/officialSources.ts`](./src/data/officialSources.ts) and on **[ClearMargin Methodology](https://clearmargincalc.com/methodology/#sources)**:

| Rule Set | Authoritative Source |
| :--- | :--- |
| Self-Employment Tax (Schedule SE) | [IRS Schedule SE (Form 1040)](https://www.irs.gov/forms-pubs/about-schedule-se-form-1040) |
| Estimated Quarterly Payments | [IRS Form 1040-ES](https://www.irs.gov/forms-pubs/about-form-1040-es) |
| 2026 Business Mileage Rate | [IRS Standard Mileage Rates](https://www.irs.gov/tax-professionals/standard-mileage-rates) |
| QBI Deduction (Section 199A) | [IRS QBI Overview](https://www.irs.gov/newsroom/qualified-business-income-deduction) |
| Social Security Wage Cap | [SSA Contribution & Benefit Base](https://www.ssa.gov/oact/cola/cbb.html) |

---

## Disclaimer

This software and its datasets are provided for **informational and financial planning estimation purposes only**. They do not constitute tax, legal, or CPA advice. Final liabilities are always governed by official IRS/state tax forms and official marketplace settlement statements. See the full [ClearMargin Disclaimer](https://clearmargincalc.com/disclaimer/).

## License

[MIT](./LICENSE)
