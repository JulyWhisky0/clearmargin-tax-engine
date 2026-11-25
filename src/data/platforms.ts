export type PlatformCategory = 'freelance' | 'ecommerce' | 'creator-saas';

export interface PlatformTierOption {
  id: string;
  label: string;
  platformPct: number;
  platformFixed?: number;
  platformMin?: number;
  processingPct?: number;
  processingFixed?: number;
  /** Optional cliff threshold (e.g. Poshmark under $15 pays flat $2.95) */
  underAmountThreshold?: number;
  underAmountFlatFee?: number;
  /** Optional cap on percentage fee (e.g. Stripe ACH $5 max) */
  feeCap?: number;
}

export interface PlatformAddonToggle {
  id: string;
  label: string;
  pct: number;
  fixed?: number;
  defaultChecked?: boolean;
  description: string;
}

export interface PlatformFaq {
  q: string;
  a: string;
}

export interface PlatformProfile {
  slug: string;
  name: string;
  category: PlatformCategory;
  categoryLabel: string;
  tagline: string;
  defaultSalePrice: number;
  defaultCogs: number;
  defaultShipping: number;
  supportsCogsAndShipping: boolean;
  tiers: PlatformTierOption[];
  addons: PlatformAddonToggle[];
  feeSummaryBullets: string[];
  proTips: string[];
  rivals: string[];
  faqs: PlatformFaq[];
}

export const PLATFORM_CATEGORY_LABELS: Record<PlatformCategory, string> = {
  freelance: 'Freelance Marketplaces',
  ecommerce: 'E-Commerce & Reselling',
  'creator-saas': 'Payments, SaaS & App Stores',
};

export const PLATFORMS: PlatformProfile[] = [
  {
    slug: 'upwork',
    name: 'Upwork',
    category: 'freelance',
    categoryLabel: 'Freelance Marketplaces',
    tagline: 'Calculate Upwork freelancer service fees and reverse-price your hourly or fixed-price bids.',
    defaultSalePrice: 1000,
    defaultCogs: 0,
    defaultShipping: 0,
    supportsCogsAndShipping: false,
    tiers: [
      { id: 'standard-10', label: 'Standard Marketplace Contract (10%)', platformPct: 0.10 },
      { id: 'variable-15', label: 'High-Demand / Variable Tier (15%)', platformPct: 0.15 },
      { id: 'enterprise-5', label: 'Enterprise / Legacy Tier (5%)', platformPct: 0.05 },
    ],
    addons: [
      { id: 'fx-withdrawal', label: 'Cross-Border / Direct-to-Local Withdrawal (~2.0%)', pct: 0.02, description: 'Models currency spread or wire conversion fees outside free US ACH.' },
      { id: 'boosted-connects', label: 'Amortized Proposal / Connects Overhead (1.5%)', pct: 0.015, description: 'Optional allowance for Connects spent acquiring the client.' },
    ],
    feeSummaryBullets: [
      'Most standard Upwork contracts incur a 10% flat freelancer service fee on gross billings.',
      'Certain variable categories and short-term contracts can run between 5% and 15%.',
      'US ACH withdrawals are $0, while non-USD local bank payouts incur ~2% conversion spreads.',
    ],
    proTips: [
      'Always use Reverse Pricing before submitting a proposal: to net $1,000 at a 10% fee, bid $1,111.11.',
      'Build retainer milestones rather than one-off gigs to amortize Connects cost to near zero.',
      'Remember Upwork fees reduce your taxable Schedule C profit as a deductible business expense.',
    ],
    rivals: ['fiverr', 'freelancer', 'stripe'],
    faqs: [
      { q: 'How much does Upwork take from freelancers in 2026?', a: 'Most standard Upwork marketplace contracts carry a 10% freelancer service fee, though variable rates between 5% and 15% apply depending on contract type and category.' },
      { q: 'How do I calculate what to bid on Upwork to keep my full rate?', a: 'Divide your target net payout by (1 - fee rate). At a 10% fee, divide your desired take-home pay by 0.90 (roughly multiplying by 1.1111).' },
      { q: 'Are Upwork fees tax deductible for 1099 freelancers?', a: 'Yes. On Schedule C, you report gross client payments and deduct Upwork service fees and Connects as ordinary business expenses.' },
      { q: 'Does Upwork charge a fee to withdraw to a US bank account?', a: 'Standard ACH transfers to a US bank account are free, whereas wire transfers ($30) and non-USD currency conversions incur additional fees.' },
    ],
  },
  {
    slug: 'fiverr',
    name: 'Fiverr',
    category: 'freelance',
    categoryLabel: 'Freelance Marketplaces',
    tagline: 'Calculate Fiverr’s 20% seller commission and find the exact gig price needed to hit your target payout.',
    defaultSalePrice: 250,
    defaultCogs: 0,
    defaultShipping: 0,
    supportsCogsAndShipping: false,
    tiers: [
      { id: 'standard-20', label: 'Standard Fiverr Order (20%)', platformPct: 0.20 },
    ],
    addons: [
      { id: 'fiverr-ads', label: 'Fiverr Promoted Gigs / Seller Plus Budget (5%)', pct: 0.05, description: 'Optional ad spend / Seller Plus allocation per order.' },
      { id: 'payout-fee', label: 'PayPal / Fast Payout Withdrawal Fee ($3.00)', pct: 0, fixed: 3.0, description: 'Covers Payoneer/PayPal withdrawal fees on smaller payouts.' },
    ],
    feeSummaryBullets: [
      'Fiverr deducts a flat 20% commission from every order, custom offer, gig extra, and buyer tip.',
      'To walk away with $100 net after Fiverr’s 20% cut, your gig must be priced at $125.00.',
      'Promoted Gigs charge CPC clicks separately and should be budgeted as an effective percentage of revenue.',
    ],
    proTips: [
      'Price packages in multiples that protect margin after the 20% cut—multiply desired net by 1.25.',
      'Use custom milestone offers for larger scopes so you do not lose fixed withdrawal fees repeatedly.',
      'Track your Promoted Gigs ROAS weekly and pause keywords whose ad cost pushes total take above 30%.',
    ],
    rivals: ['upwork', 'freelancer', 'gumroad'],
    faqs: [
      { q: 'Does Fiverr take 20% of tips too?', a: 'Yes. Fiverr applies the same 20% service commission to base gig packages, extras, milestones, and client tips.' },
      { q: 'What should I charge on Fiverr to make $500?', a: 'Divide $500 by 0.80, which equals $625.00 before taxes or optional withdrawal fees.' },
      { q: 'Why does Fiverr charge 20% while Upwork charges 10%?', a: 'Fiverr acts as an inbound marketplace storefront without paid bidding for standard organic leads, pricing discovery into its 20% commission.' },
      { q: 'Are Fiverr fees deducted automatically before payout?', a: 'Yes. You see 80% of the order value credited to your pending clearance balance immediately upon order completion.' },
    ],
  },
  {
    slug: 'freelancer',
    name: 'Freelancer.com',
    category: 'freelance',
    categoryLabel: 'Freelance Marketplaces',
    tagline: 'Model Freelancer.com’s 10% or $5 minimum project fee (and hourly 10% rate) with reverse pricing.',
    defaultSalePrice: 120,
    defaultCogs: 0,
    defaultShipping: 0,
    supportsCogsAndShipping: false,
    tiers: [
      { id: 'fixed-10-min5', label: 'Fixed Project (10% or $5.00 min)', platformPct: 0.10, platformMin: 5.0 },
      { id: 'hourly-10', label: 'Hourly Contract (10% flat)', platformPct: 0.10 },
      { id: 'preferred-15', label: 'Recruiter / Preferred Project (15%)', platformPct: 0.15, platformMin: 5.0 },
    ],
    addons: [
      { id: 'express-payout', label: 'Express / PayPal Withdrawal Cost (2%)', pct: 0.02, description: 'Optional fee estimate for non-free payout methods.' },
    ],
    feeSummaryBullets: [
      'Fixed-price projects charge 10% of the total award or $5.00 USD, whichever is greater.',
      'Because of the $5 minimum, micro-projects under $50 suffer a steep effective fee rate (up to 50% on a $10 task!).',
      'Hourly projects are billed straight at 10% with no $5 per-invoice floor.',
    ],
    proTips: [
      'Avoid bidding on fixed-price jobs below $50 where the $5.00 minimum fee wipes out margin.',
      'Keep bids above $75 or bundle small tasks into one milestone to stay safely in the 10% zone.',
      'Compare net payouts against direct Stripe invoicing once relationships mature outside platform terms.',
    ],
    rivals: ['upwork', 'fiverr', 'stripe'],
    faqs: [
      { q: 'When does Freelancer.com’s $5 minimum fee trigger?', a: 'Any fixed-price project awarded for under $50 triggers the $5.00 minimum instead of 10%. Above $50, the fee scales linearly at 10%.' },
      { q: 'What is the fee on a $25 fixed Freelancer.com job?', a: 'You pay $5.00 (a 20% effective fee), leaving $20.00 before withdrawal fees.' },
      { q: 'Do preferred freelancer projects cost more?', a: 'Recruiter-assisted or Preferred Freelancer projects can carry a 15% project fee instead of 10%.' },
      { q: 'How do I price a fixed project to net $100?', a: 'Since $100 net requires >$50 gross, divide $100 by 0.90 to bid $111.11.' },
    ],
  },
  {
    slug: 'etsy',
    name: 'Etsy',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce & Reselling',
    tagline: 'Calculate Etsy’s listing, 6.5% transaction, payment processing, and optional 15% Offsite Ads fees.',
    defaultSalePrice: 45,
    defaultCogs: 12,
    defaultShipping: 5,
    supportsCogsAndShipping: true,
    tiers: [
      { id: 'us-standard', label: 'US Seller Standard (6.5% + 3% + $0.25 + $0.20)', platformPct: 0.065, platformFixed: 0.20, processingPct: 0.03, processingFixed: 0.25 },
      { id: 'uk-ca-eu', label: 'Cross-Border / Non-US Standard (6.5% + 4% + $0.30 + $0.20)', platformPct: 0.065, platformFixed: 0.20, processingPct: 0.04, processingFixed: 0.30 },
    ],
    addons: [
      { id: 'offsite-ads-15', label: 'Offsite Ads Attribution (15% < $10k/yr)', pct: 0.15, description: 'Applied when a sale originates from an Etsy Offsite Ad (mandatory 12% above $10k/yr).' },
      { id: 'offsite-ads-12', label: 'Offsite Ads Attribution (12% > $10k/yr)', pct: 0.12, description: 'Discounted Offsite Ads fee for shops exceeding $10,000 annual revenue.' },
    ],
    feeSummaryBullets: [
      'Every Etsy sale triggers a $0.20 listing fee, a 6.5% transaction fee on item + shipping, and 3.0% + $0.25 US payment processing.',
      'Combined base Etsy fees equal roughly 9.5% + $0.45 per single-item order.',
      'If an order converts via Offsite Ads, Etsy adds an extra 12%–15% commission on the order total.',
    ],
    proTips: [
      'Build at least a 15% buffer into SKU pricing if you cannot opt out of Offsite Ads.',
      'Encourage multi-quantity bundles so the fixed $0.20 listing + $0.25 payment fees spread across more units.',
      'Remember Etsy applies its 6.5% transaction fee to shipping charges too—do not underprice shipping.',
    ],
    rivals: ['shopify', 'ebay', 'amazon-fba'],
    faqs: [
      { q: 'What is Etsy’s total fee percentage per sale in 2026?', a: 'For US sellers without Offsite Ads, Etsy’s combined fee is 9.5% plus $0.45 ($0.20 listing + 6.5% transaction + 3% + $0.25 processing).' },
      { q: 'Does Etsy charge fees on shipping revenue?', a: 'Yes. Both the 6.5% transaction fee and the 3% payment processing fee apply to the item price plus shipping charged to the buyer.' },
      { q: 'Can you turn off Etsy Offsite Ads?', a: 'Shops under $10,000 in trailing 12-month sales can opt out. Once a shop crosses $10,000, Offsite Ads becomes mandatory at a 12% fee on attributed sales.' },
      { q: 'How do I price an Etsy item to clear $25 profit?', a: 'Switch the calculator above to Reverse Pricing, enter your COGS and shipping costs, and set Desired Net Profit to $25.' },
    ],
  },
  {
    slug: 'ebay',
    name: 'eBay',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce & Reselling',
    tagline: 'Calculate eBay final value fees, per-order fixed charges, and promoted listing margins.',
    defaultSalePrice: 65,
    defaultCogs: 25,
    defaultShipping: 8,
    supportsCogsAndShipping: true,
    tiers: [
      { id: 'most-categories', label: 'Most Categories (13.6% + $0.40)', platformPct: 0.136, platformFixed: 0.40 },
      { id: 'store-discounted', label: 'eBay Store Subscriber Avg (12.35% + $0.40)', platformPct: 0.1235, platformFixed: 0.40 },
      { id: 'sneakers-over-150', label: 'Athletic Shoes >= $150 (8% + $0.40)', platformPct: 0.08, platformFixed: 0.40 },
      { id: 'under-10-order', label: 'Orders <= $10 (13.6% + $0.30)', platformPct: 0.136, platformFixed: 0.30 },
    ],
    addons: [
      { id: 'promoted-5', label: 'Promoted Listings Standard (5%)', pct: 0.05, description: 'Optional ad rate if the item sells through a promoted click.' },
      { id: 'international-165', label: 'International Sale Fee (+1.65%)', pct: 0.0165, description: 'Extra fee when the buyer’s registered address is outside the US.' },
    ],
    feeSummaryBullets: [
      'Most eBay categories charge a 13.6% Final Value Fee plus $0.40 per order (or $0.30 on orders $10 and under).',
      'Final value fees are calculated on the total amount of the sale—including shipping and sales tax collected by eBay.',
      'Promoted Listings ad percentages stack directly on top of the final value fee when attributed.',
    ],
    proTips: [
      'Account for buyer sales tax impact: eBay’s percentage fee applies to the tax-inclusive total, adding roughly ~1% effective drag.',
      'Test a 2%–3% Promoted Listings rate before jumping to eBay’s suggested double-digit ad rates.',
      'For high-volume inventory, an eBay Basic Store subscription often pays for itself via the ~1.25% FVF discount.',
    ],
    rivals: ['mercari', 'poshmark', 'etsy'],
    faqs: [
      { q: 'What is eBay’s final value fee in 2026?', a: 'In most general categories, eBay charges 13.6% on total order amount up to $7,500 plus $0.40 per order ($0.30 if total <= $10).' },
      { q: 'Does eBay charge fees on shipping and sales tax?', a: 'Yes. eBay calculates final value fees on item price, shipping charged to the buyer, and applicable sales tax.' },
      { q: 'Are Promoted Listings charged if a buyer finds my item organically?', a: 'Under Promoted Listings Standard (CPS), you only pay the ad percentage when a buyer clicks your promoted ad and purchases within 30 days.' },
      { q: 'Is eBay cheaper than Poshmark?', a: 'Above $15, eBay (13.6% + $0.40) is meaningfully cheaper than Poshmark (20%), though eBay charges on shipping while Poshmark uses flat buyer-paid shipping labels.' },
    ],
  },
  {
    slug: 'shopify',
    name: 'Shopify',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce & Reselling',
    tagline: 'Calculate Shopify Payments card processing fees, third-party gateway fees, and real product margin.',
    defaultSalePrice: 80,
    defaultCogs: 22,
    defaultShipping: 6,
    supportsCogsAndShipping: true,
    tiers: [
      { id: 'basic', label: 'Shopify Basic (2.9% + $0.30)', platformPct: 0, processingPct: 0.029, processingFixed: 0.30 },
      { id: 'grow', label: 'Shopify Grow Plan (2.7% + $0.30)', platformPct: 0, processingPct: 0.027, processingFixed: 0.30 },
      { id: 'advanced', label: 'Shopify Advanced (2.5% + $0.30)', platformPct: 0, processingPct: 0.025, processingFixed: 0.30 },
    ],
    addons: [
      { id: 'third-party-2', label: 'Third-Party Gateway Surcharge (+2.0% Basic)', pct: 0.02, description: 'Shopify surcharge if you bypass Shopify Payments on Basic (1% on Grow, 0.6% on Advanced).' },
      { id: 'intl-card', label: 'International / Currency Conversion (+1.5%)', pct: 0.015, description: 'Additional cross-border card or currency FX fee.' },
    ],
    feeSummaryBullets: [
      'With Shopify Payments enabled, Basic stores pay 2.9% + $0.30 per online card transaction and 0% Shopify transaction fee.',
      'Higher plans lower card rates to 2.7% (Grow) and 2.5% (Advanced), saving thousands at scale.',
      'Using an external payment gateway triggers an extra 0.6%–2.0% Shopify transaction surcharge.',
    ],
    proTips: [
      'Always enable Shopify Payments whenever eligible to eliminate the extra 2% third-party transaction fee.',
      'Once monthly card volume passes ~$12,000–$15,000, compare upgrading from Basic to Grow purely on the 0.2% card fee savings.',
      'Monitor app subscriptions and CAC separately from checkout fees to keep true contribution margin above 35%.',
    ],
    rivals: ['etsy', 'stripe', 'tiktok-shop'],
    faqs: [
      { q: 'Does Shopify take a percentage of every sale?', a: 'If you use Shopify Payments, Shopify takes 0% platform commission—you only pay card processing (2.5%–2.9% + $0.30) plus your monthly plan.' },
      { q: 'When does Shopify charge a 2% transaction fee?', a: 'The 2% surcharge applies on Shopify Basic only when you use an outside payment processor instead of Shopify Payments.' },
      { q: 'What does a $100 Shopify Basic order cost in card fees?', a: 'At 2.9% + $0.30, processing costs $3.20, leaving $96.80 before product cost, shipping, and ad spend.' },
      { q: 'Is Shopify cheaper than Etsy?', a: 'Per transaction, Shopify (2.9% + $0.30) is over 6% cheaper than Etsy (9.5% + $0.45), though Shopify requires bringing your own traffic.' },
    ],
  },
  {
    slug: 'amazon-fba',
    name: 'Amazon FBA',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce & Reselling',
    tagline: 'Estimate Amazon 15% referral fees, FBA fulfillment pick-and-pack costs, and net unit margin.',
    defaultSalePrice: 39.99,
    defaultCogs: 9.50,
    defaultShipping: 1.50,
    supportsCogsAndShipping: true,
    tiers: [
      { id: 'std-small', label: 'Standard 15% Referral + Small Std FBA ($3.60)', platformPct: 0.15, platformFixed: 3.60 },
      { id: 'std-large', label: 'Standard 15% Referral + Large Std FBA ($5.40)', platformPct: 0.15, platformFixed: 5.40 },
      { id: 'fbm', label: 'FBM / Self-Fulfilled (15% Referral, $0 FBA)', platformPct: 0.15, platformFixed: 0 },
      { id: 'electronics-8', label: 'Consumer Electronics 8% + Std FBA ($4.25)', platformPct: 0.08, platformFixed: 4.25 },
    ],
    addons: [
      { id: 'amazon-ppc', label: 'Target TACoS / Amazon PPC Ad Spend (12%)', pct: 0.12, description: 'Budget for Sponsored Products / Sponsored Brands advertising.' },
      { id: 'storage-returns', label: 'Inbound / Storage / Returns Allowance (3%)', pct: 0.03, description: 'Prorated FBA monthly storage, placement, and return processing drag.' },
    ],
    feeSummaryBullets: [
      'Most Amazon categories carry a 15% referral fee on the gross selling price (minimum $0.30).',
      'FBA fulfillment fees depend on size tier and shipping weight—typically $3.25 to $6.00+ per standard-size unit.',
      'Winning private-label SKUs usually target >= 30% margin before PPC so net profit stays >= 15%–20% after ads.',
    ],
    proTips: [
      'Shaving 0.2 inches off packaging thickness can drop a product into a lower FBA size tier and save $1+ per unit.',
      'Budget inbound placement fees and return damage reserves into your shipping/COGS field before ordering inventory.',
      'Use Reverse Pricing to test whether raising price by $2 covers higher PPC bids without losing conversion.',
    ],
    rivals: ['tiktok-shop', 'shopify', 'ebay'],
    faqs: [
      { q: 'What is Amazon’s standard referral fee?', a: 'Most categories charge 15% of total sales price (minimum $0.30), while consumer electronics sit at 8% and apparel under $15/$20 can qualify for lower tiers.' },
      { q: 'What is the difference between FBA and FBM fees?', a: 'Both pay the same category referral fee, but FBA also deducts Amazon’s pick, pack, and shipping fee instead of you paying postage directly.' },
      { q: 'What is a healthy profit margin for Amazon FBA?', a: 'Most experienced sellers target 25%–35% gross margin pre-advertising and 15%–20% true net profit after PPC.' },
      { q: 'How do I account for Amazon PPC in this calculator?', a: 'Check the Target TACoS / PPC toggle above to simulate your ad spend percentage right alongside referral and FBA fees.' },
    ],
  },
  {
    slug: 'poshmark',
    name: 'Poshmark',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce & Reselling',
    tagline: 'Calculate Poshmark’s $2.95 flat fee under $15 and 20% commission at $15+, plus exact break-even pricing.',
    defaultSalePrice: 35,
    defaultCogs: 8,
    defaultShipping: 0,
    supportsCogsAndShipping: true,
    tiers: [
      {
        id: 'poshmark-standard',
        label: 'Poshmark US Standard ($2.95 under $15; 20% >= $15)',
        platformPct: 0.20,
        underAmountThreshold: 15,
        underAmountFlatFee: 2.95,
      },
    ],
    addons: [
      { id: 'shipping-discount', label: 'Seller Shipping Discount ($2.15)', pct: 0, fixed: 2.15, description: 'Common offer-to-likers $2.15 shipping discount paid by seller.' },
    ],
    feeSummaryBullets: [
      'Sales under $15 incur a simple flat fee of $2.95 regardless of item category.',
      'Sales of $15 or more pay a straight 20% commission with no separate payment processing fee.',
      'Notice the $15 cliff: selling at $14.99 nets $12.04, whereas selling at $15.00 nets $12.00!',
    ],
    proTips: [
      'Watch out for the $15–$16 dead zone: only price above $15 if you can sell at $16+ (or bundle multiple items).',
      'Remember Offer-to-Likers shipping discounts come straight out of your net payout after the 20% fee.',
      'Compare high-ticket items ($150+) against eBay or Depop, where fees are substantially lower than 20%.',
    ],
    rivals: ['mercari', 'depop', 'ebay'],
    faqs: [
      { q: 'What is Poshmark’s fee on a $15 item vs a $14 item?', a: 'A $14 sale pays $2.95 (netting $11.05). A $15 sale crosses into the 20% tier, paying $3.00 (netting $12.00). At $14.99 you actually net $12.04.' },
      { q: 'Does Poshmark charge payment processing fees on top of 20%?', a: 'No. Poshmark’s $2.95 or 20% commission covers payment processing as well.' },
      { q: 'How do seller shipping discounts affect Poshmark payout?', a: 'When you send an offer with discounted shipping, Poshmark deducts the shipping subsidy (e.g., $2.15 or $7.97 for free shipping) directly from your net earnings.' },
      { q: 'What should I price an item at to clear $40 on Poshmark?', a: 'Divide $40 by 0.80 to get $50.00 (or add any COGS/shipping discount before dividing by 0.80).' },
    ],
  },
  {
    slug: 'mercari',
    name: 'Mercari',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce & Reselling',
    tagline: 'Calculate Mercari’s 10% selling fee, shipping deductions, and direct payout costs.',
    defaultSalePrice: 40,
    defaultCogs: 10,
    defaultShipping: 0,
    supportsCogsAndShipping: true,
    tiers: [
      { id: 'mercari-10', label: 'Mercari US Standard (10% Flat Selling Fee)', platformPct: 0.10 },
    ],
    addons: [
      { id: 'instant-pay', label: 'Instant Pay / Direct Deposit Fee ($2.00)', pct: 0, fixed: 2.0, description: 'Optional $2.00 fee for Direct Deposit under thresholds or Instant Pay.' },
    ],
    feeSummaryBullets: [
      'Mercari charges a flat 10% selling fee on item sales with no additional payment processing fee.',
      'You keep 90% of your item sale price before optional free-shipping subsidies or Instant Pay fees.',
      'Leaving balance until larger ACH transfers avoids repeated withdrawal fees.',
    ],
    proTips: [
      'Batch multiple Mercari payouts before withdrawing if your transfer method carries a $2 flat fee.',
      'Compare buyer-paid vs free-shipping pricing—buyer-paid shipping avoids losing 10% on postage if you roll it into item price.',
      'Use Reverse Pricing before accepting lowball offers so you never drop below your minimum COGS margin.',
    ],
    rivals: ['poshmark', 'ebay', 'depop'],
    faqs: [
      { q: 'What is Mercari’s seller fee in 2026?', a: 'Mercari charges a flat 10% selling fee on the item price under its simplified US fee structure.' },
      { q: 'Does Mercari charge a separate 2.9% payment processing fee?', a: 'Under Mercari’s flat 10% seller structure, there is no separate 2.9% payment processing surcharge.' },
      { q: 'How much do I make on a $50 Mercari sale?', a: 'After the 10% ($5.00) fee, your payout is $45.00 assuming buyer-paid shipping and standard bank transfer.' },
      { q: 'How much should I list for on Mercari to net $45?', a: 'Divide $45 by 0.90 to list at $50.00.' },
    ],
  },
  {
    slug: 'depop',
    name: 'Depop',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce & Reselling',
    tagline: 'Calculate Depop’s 0% selling fee, 3.3% + $0.45 payment processing, and optional 8% Boosted fee.',
    defaultSalePrice: 38,
    defaultCogs: 9,
    defaultShipping: 0,
    supportsCogsAndShipping: true,
    tiers: [
      { id: 'depop-us-0', label: 'Depop US Standard (0% Selling + 3.3% + $0.45)', platformPct: 0, processingPct: 0.033, processingFixed: 0.45 },
      { id: 'depop-legacy-10', label: 'Legacy / International (10% + 3.3% + $0.45)', platformPct: 0.10, processingPct: 0.033, processingFixed: 0.45 },
    ],
    addons: [
      { id: 'depop-boosted', label: 'Depop Boosted Listing Fee (+8%)', pct: 0.08, description: 'Charged only when the buyer purchases through a Boosted tile click.' },
    ],
    feeSummaryBullets: [
      'US and UK sellers enjoy 0% Depop selling fees, paying only payment processing of 3.3% + $0.45.',
      'Even with Boosted Listings enabled (8% on boosted clicks), total fees stay roughly half of Poshmark’s 20% cut.',
      'Note that processing applies to the total amount including shipping and sales tax collected.',
    ],
    proTips: [
      'Cross-list vintage streetwear and Y2K apparel on Depop first to retain ~95% of your sale price on non-boosted orders.',
      'Leave Boosted Listings off on rare items with existing demand and use it selectively on slow-moving stock.',
      'Factor buyer-paid shipping vs free shipping carefully before accepting bundle offers.',
    ],
    rivals: ['poshmark', 'mercari', 'ebay'],
    faqs: [
      { q: 'Is Depop really 0% selling fees now?', a: 'For eligible US and UK listings, Depop removed its 10% selling fee, leaving only standard payment processing (3.3% + $0.45).' },
      { q: 'How much does Depop Boosted Listings cost?', a: 'Boosted Listings carry an additional 8% fee on the total sale amount when a sale results from a click on your boosted listing.' },
      { q: 'How much do I keep on a $40 Depop sale?', a: 'Without boosting, 3.3% + $0.45 equals $1.77, leaving you $38.23 (over 95.5% of the item price).' },
      { q: 'Is Depop cheaper than Poshmark and Mercari?', a: 'Yes—3.3% + $0.45 is dramatically cheaper than Mercari (10%) and Poshmark (20%).' },
    ],
  },
  {
    slug: 'stockx',
    name: 'StockX',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce & Reselling',
    tagline: 'Calculate StockX seller level commissions (7%–9%), 3% payment processing, and shipping payouts.',
    defaultSalePrice: 220,
    defaultCogs: 140,
    defaultShipping: 4,
    supportsCogsAndShipping: true,
    tiers: [
      { id: 'level-1', label: 'Seller Level 1 (9.0% + 3% Processing)', platformPct: 0.09, processingPct: 0.03 },
      { id: 'level-2', label: 'Seller Level 2 (8.5% + 3% Processing)', platformPct: 0.085, processingPct: 0.03 },
      { id: 'level-3', label: 'Seller Level 3 (8.0% + 3% Processing)', platformPct: 0.08, processingPct: 0.03 },
      { id: 'level-4', label: 'Seller Level 4 (7.5% + 3% Processing)', platformPct: 0.075, processingPct: 0.03 },
      { id: 'level-5', label: 'Seller Level 5 (7.0% + 3% Processing)', platformPct: 0.07, processingPct: 0.03 },
    ],
    addons: [
      { id: 'minimum-fee-floor', label: 'Express / Minimum Fee Adjustment ($5)', pct: 0, fixed: 5, description: 'Optional allowance if shipping or minimum transaction fee adjustments apply.' },
    ],
    feeSummaryBullets: [
      'StockX charges a tiered transaction fee from 9.0% (Level 1) down to 7.0% (Level 5), plus a flat 3.0% payment processing fee.',
      'US sellers also pay a modest flat shipping deduction (~$4–$5 depending on category/bulk option) reflected in net payout.',
      'Total fee drag for new Level 1 sellers sits at 12.0% plus shipping.',
    ],
    proTips: [
      'Hit Level 2 or Level 3 early with quick small-margin flips if you plan to move high-ticket sneakers where 1% saves big money.',
      'Use Bulk Shipping when mailing multiple sold pairs on the same day to reduce shipping drag.',
      'Always use Reverse Pricing on target Ask prices before accepting low Bids.',
    ],
    rivals: ['ebay', 'poshmark', 'depop'],
    faqs: [
      { q: 'What is the total StockX fee for Level 1 sellers?', a: 'Level 1 sellers pay a 9.0% transaction fee plus a 3.0% payment processing fee (12.0% combined), plus any applicable flat seller shipping rate.' },
      { q: 'How do I unlock lower StockX seller fees?', a: 'Quarterly sales count and total dollar volume move you from Level 1 (9%) up to Level 5 (7%), cutting fees by up to 2%.' },
      { q: 'Does StockX charge a minimum transaction fee on cheap items?', a: 'Lower-priced items can trigger minimum transaction fee floors depending on category, so verify payout before listing items under $60.' },
      { q: 'What Ask price nets $200 on StockX at Level 1?', a: 'At 12% combined fees (plus $4 shipping), you need roughly $231.82 Ask price to clear $200.' },
    ],
  },
  {
    slug: 'tiktok-shop',
    name: 'TikTok Shop',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce & Reselling',
    tagline: 'Calculate TikTok Shop US referral fees, creator affiliate commissions, and net e-commerce margin.',
    defaultSalePrice: 35,
    defaultCogs: 8,
    defaultShipping: 4.5,
    supportsCogsAndShipping: true,
    tiers: [
      { id: 'standard-6', label: 'US Standard Referral Fee (6.0%)', platformPct: 0.06 },
      { id: 'tier-8', label: 'Expanded / 8% Referral Tier (8.0%)', platformPct: 0.08 },
      { id: 'jewelry-5', label: 'Pre-Owned / Select 5% Category (5.0%)', platformPct: 0.05 },
    ],
    addons: [
      { id: 'affiliate-10', label: 'Creator Affiliate Commission (10%)', pct: 0.10, description: 'Open/Target Collaboration commission paid to TikTok creators driving the order.' },
      { id: 'free-ship-cofund', label: 'Co-Funded Free Shipping / Promo (3%)', pct: 0.03, description: 'Estimated share of shipping co-funding or flash coupon discount.' },
    ],
    feeSummaryBullets: [
      'TikTok Shop’s standard US seller referral fee sits at 6%–8% depending on category and onboarding timeline.',
      'Unlike Shopify, most TikTok Shop GMV comes from creator affiliates taking an extra 10%–20% commission per video/live conversion.',
      'Modeling referral fee + affiliate rate + COGS together avoids accidentally losing money on viral orders.',
    ],
    proTips: [
      'Price TikTok Shop SKUs with enough headroom for a 10%–15% creator commission while maintaining >= 20% net margin.',
      'Bundle 2-packs or upsells to dilute $4.50–$6.00 shipping costs per package.',
      'Reserve your highest affiliate rates (15%+) only for proven top-converting creators via Targeted Collaboration.',
    ],
    rivals: ['amazon-fba', 'shopify', 'etsy'],
    faqs: [
      { q: 'What is the TikTok Shop seller fee in the US?', a: 'Most established US sellers pay a 6% to 8% referral fee per order, which includes payment processing.' },
      { q: 'Does TikTok Shop charge extra for affiliate creators?', a: 'Yes, any affiliate commission rate you set (commonly 10%–15%) is paid out of the order revenue in addition to TikTok’s referral fee.' },
      { q: 'Is TikTok Shop cheaper than Amazon FBA?', a: 'Referral fees (6%–8%) are lower than Amazon’s 15%, though shipping and affiliate commissions often bring total variable costs to a similar range.' },
      { q: 'How do I protect profit when a TikTok goes viral?', a: 'Keep at least a 3x markup over landed COGS or cap your Open Collaboration affiliate percentage before launching.' },
    ],
  },
  {
    slug: 'airbnb',
    name: 'Airbnb',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce & Reselling',
    tagline: 'Compare Airbnb’s 3% Split-Fee vs 15% Host-Only structure and calculate true booking payouts.',
    defaultSalePrice: 600,
    defaultCogs: 95,
    defaultShipping: 0,
    supportsCogsAndShipping: true,
    tiers: [
      { id: 'split-3', label: 'Split-Fee Host Share (3.0%)', platformPct: 0.03 },
      { id: 'host-only-15', label: 'Simplified Host-Only Fee (15.0%)', platformPct: 0.15 },
    ],
    addons: [
      { id: 'cohost-10', label: 'Property Manager / Co-Host Share (12%)', pct: 0.12, description: 'Optional management fee if using a co-host or PMS operator.' },
    ],
    feeSummaryBullets: [
      'Under Split-Fee pricing, hosts pay 3% of the booking subtotal (nightly rate + cleaning fee) while guests pay a separate ~14% service fee.',
      'Hosts using API-connected PMS software or choosing Host-Only pricing pay ~15% directly, while guests see 0% added service fee.',
      'Enter turnover/cleaning/utilities in Product Cost above to view true net cash flow per reservation.',
    ],
    proTips: [
      'When switching to Host-Only 15%, raise your nightly rate by ~14%–17% so your net payout stays identical while guest checkout price stays flat.',
      'Remember Airbnb calculates its 3% or 15% commission on both the nightly subtotal AND your cleaning fee.',
      'Track local occupancy taxes separately—Airbnb collects and remits many jurisdictions automatically, but verify your city.',
    ],
    rivals: ['stripe', 'shopify', 'upwork'],
    faqs: [
      { q: 'What is the Airbnb host fee in 2026?', a: 'Individual hosts on Split-Fee pricing typically pay 3%, while hosts on the Simplified Host-Only structure (required for many PMS software integrations) pay around 15%.' },
      { q: 'Does Airbnb charge its 3% fee on my cleaning fee?', a: 'Yes. Host service fees are calculated on the entire reservation subtotal, including nightly rate, cleaning fee, and extra guest fees (excluding taxes).' },
      { q: 'Should I switch to Host-Only 15% pricing?', a: 'Host-Only removes the surprise guest fee at checkout, which can lift conversion as long as you mark up your base nightly rate by roughly 17.6%.' },
      { q: 'How do I calculate what nightly total nets $500 under Split-Fee?', a: 'Divide $500 plus your turnover costs by 0.97 under the 3% Split-Fee model.' },
    ],
  },
  {
    slug: 'stripe',
    name: 'Stripe',
    category: 'creator-saas',
    categoryLabel: 'Payments, SaaS & App Stores',
    tagline: 'Calculate Stripe card processing, ACH caps, international surcharges, and exact client invoice gross-ups.',
    defaultSalePrice: 500,
    defaultCogs: 0,
    defaultShipping: 0,
    supportsCogsAndShipping: false,
    tiers: [
      { id: 'us-card', label: 'Standard US Card (2.9% + $0.30)', platformPct: 0, processingPct: 0.029, processingFixed: 0.30 },
      { id: 'ach-direct', label: 'ACH Direct Debit (0.8%, capped at $5.00)', platformPct: 0, processingPct: 0.008, feeCap: 5.0 },
      { id: 'stripe-invoicing', label: 'Stripe Invoicing Plus (2.9% + 0.4% + $0.30)', platformPct: 0.004, processingPct: 0.029, processingFixed: 0.30 },
    ],
    addons: [
      { id: 'intl-card', label: 'International Card (+1.5%)', pct: 0.015, description: 'Applied to cards issued outside the United States.' },
      { id: 'currency-fx', label: 'Currency Conversion (+1.0%)', pct: 0.01, description: 'Applied when Stripe converts non-USD settlement currency.' },
      { id: 'billing-07', label: 'Stripe Billing Recurring SaaS (+0.7%)', pct: 0.007, description: 'Optional fee for Stripe Billing subscription management.' },
    ],
    feeSummaryBullets: [
      'Standard domestic card charges cost 2.9% + $0.30 per successful transaction.',
      'International cards add +1.5% (and +1.0% if currency conversion is required), bringing cross-border card fees up to 5.4% + $0.30.',
      'ACH Direct Debit costs just 0.8% capped at $5.00 max—saving big money on B2B invoices over $625.',
    ],
    proTips: [
      'For US B2B invoices above $500, enable ACH Direct Debit so a $5,000 invoice costs $5 instead of $145.30.',
      'Use Reverse Pricing to build processing costs cleanly into client retainers rather than eating 3%–5%.',
      'Note that Stripe generally does not refund processing fees when issuing full refunds.',
    ],
    rivals: ['paypal', 'paddle', 'lemon-squeezy'],
    faqs: [
      { q: 'How much does Stripe charge on a $1,000 invoice?', a: 'A domestic card costs $29.30 (2.9% + $0.30), leaving $970.70. Paid via Stripe ACH Direct Debit, the same $1,000 invoice costs only $5.00.' },
      { q: 'What should I invoice on Stripe to receive exactly $1,000?', a: 'For standard 2.9% + $0.30 domestic cards, add $0.30 and divide by 0.971: invoice $1,030.18.' },
      { q: 'Does Stripe charge extra for international cards?', a: 'Yes. Cards issued outside your account’s country incur +1.5%, plus another +1.0% if currency conversion is needed.' },
      { q: 'What is the maximum fee on Stripe ACH?', a: 'Stripe ACH Direct Debit charges 0.8% with a strict $5.00 cap per transaction, kicking in at $625.' },
    ],
  },
  {
    slug: 'paypal',
    name: 'PayPal',
    category: 'creator-saas',
    categoryLabel: 'Payments, SaaS & App Stores',
    tagline: 'Calculate PayPal Business, Invoicing, and PayPal Checkout fees plus cross-border invoice gross-ups.',
    defaultSalePrice: 300,
    defaultCogs: 0,
    defaultShipping: 0,
    supportsCogsAndShipping: false,
    tiers: [
      { id: 'paypal-checkout', label: 'PayPal Checkout / Button (3.49% + $0.49)', platformPct: 0, processingPct: 0.0349, processingFixed: 0.49 },
      { id: 'paypal-invoice', label: 'Standard Cards / Goods & Services (2.99% + $0.49)', platformPct: 0, processingPct: 0.0299, processingFixed: 0.49 },
      { id: 'paypal-qr', label: 'QR Code / Venmo Merchant (2.29% + $0.09)', platformPct: 0, processingPct: 0.0229, processingFixed: 0.09 },
    ],
    addons: [
      { id: 'intl-15', label: 'International Commercial Fee (+1.5%)', pct: 0.015, description: 'PayPal cross-border surcharge when buyer and seller are in different countries.' },
    ],
    feeSummaryBullets: [
      'Standard US PayPal Checkout payments cost 3.49% + $0.49, making it noticeably pricier than Stripe’s 2.9% + $0.30.',
      'Invoicing and standard Goods & Services rates generally run 2.99% + $0.49 domestically.',
      'International commercial invoices add +1.5% cross-border fee (plus FX spread if converting currencies).',
    ],
    proTips: [
      'Always use Reverse Pricing when clients insist on paying via PayPal Goods & Services so you keep your full quoted rate.',
      'For recurring $1,000+ US client work, steer clients toward bank ACH rather than PayPal Checkout to save $35+ per invoice.',
      'Avoid PayPal currency conversion inside the wallet when possible—hold USD or compare Wise/bank FX spreads.',
    ],
    rivals: ['stripe', 'paddle', 'upwork'],
    faqs: [
      { q: 'How much is the PayPal Goods & Services fee in 2026?', a: 'US commercial Goods & Services and invoicing transactions cost 2.99% + $0.49 (or 3.49% + $0.49 via PayPal Checkout buttons).' },
      { q: 'How much should I request via PayPal to receive $500?', a: 'At 3.49% + $0.49, request $518.59. At 2.99% + $0.49, request $515.92.' },
      { q: 'Why does PayPal take more on international payments?', a: 'PayPal adds a 1.5% international commercial fee (plus currency spread if converting) whenever the sender’s account is outside the US.' },
      { q: 'Is Stripe or PayPal cheaper for freelancers?', a: 'Stripe (2.9% + $0.30, and $5-capped ACH) is cheaper across virtually every invoice size than PayPal’s 2.99%–3.49% + $0.49.' },
    ],
  },
  {
    slug: 'gumroad',
    name: 'Gumroad',
    category: 'creator-saas',
    categoryLabel: 'Payments, SaaS & App Stores',
    tagline: 'Compare Gumroad’s Direct 10% + $0.50 fee + processing vs Gumroad Discover’s 30% marketplace cut.',
    defaultSalePrice: 49,
    defaultCogs: 0,
    defaultShipping: 0,
    supportsCogsAndShipping: false,
    tiers: [
      { id: 'direct-sale', label: 'Direct Link Sale (10% + $0.50 + 2.9% + $0.30)', platformPct: 0.10, platformFixed: 0.50, processingPct: 0.029, processingFixed: 0.30 },
      { id: 'discover-30', label: 'Gumroad Discover Marketplace (30% Total)', platformPct: 0.30 },
    ],
    addons: [
      { id: 'affiliate-10', label: 'Creator Affiliate Commission (10%)', pct: 0.10, description: 'Optional commission paid to partners referring buyers.' },
    ],
    feeSummaryBullets: [
      'Direct sales via your own link pay Gumroad’s 10% + $0.50 fee plus standard payment processing (~2.9% + $0.30), totaling ~12.9% + $0.80.',
      'Orders generated organically through Gumroad Discover carry a flat 30% total cut.',
      'Gumroad handles global VAT/sales tax remittance as a Merchant of Record.',
    ],
    proTips: [
      'Avoid selling $3–$5 micro-ebooks directly on Gumroad—the $0.80 fixed overhead eats 16%–26% on top of percentages.',
      'Once your digital product clears $1,000+/month from your own audience, compare Lemon Squeezy or Paddle (5% + $0.50) to save ~8% margin.',
      'Leave Discover enabled only for front-end lead magnets if 30% cuts too deeply into flagship courses.',
    ],
    rivals: ['lemon-squeezy', 'paddle', 'substack'],
    faqs: [
      { q: 'How much does Gumroad actually take per sale?', a: 'On direct link sales, Gumroad charges 10% + $0.50 plus card/PayPal processing (~2.9% + $0.30). Sales via Gumroad Discover take 30%.' },
      { q: 'Does Gumroad handle EU VAT and US sales tax?', a: 'Yes, Gumroad acts as a Merchant of Record and collects/remits global digital sales taxes automatically.' },
      { q: 'How much do I keep from a $50 Gumroad course?', a: 'On a direct sale, fees total ~$7.25 (12.9% + $0.80), leaving roughly $42.75 before taxes.' },
      { q: 'What is a cheaper alternative to Gumroad?', a: 'Merchant-of-Record platforms like Lemon Squeezy and Paddle charge 5% + $0.50, saving ~8% on direct digital sales.' },
    ],
  },
  {
    slug: 'lemon-squeezy',
    name: 'Lemon Squeezy',
    category: 'creator-saas',
    categoryLabel: 'Payments, SaaS & App Stores',
    tagline: 'Calculate Lemon Squeezy Merchant of Record fees (5% + $0.50) plus international & subscription surcharges.',
    defaultSalePrice: 39,
    defaultCogs: 0,
    defaultShipping: 0,
    supportsCogsAndShipping: false,
    tiers: [
      { id: 'base-5', label: 'US Card Checkout (5.0% + $0.50)', platformPct: 0.05, platformFixed: 0.50 },
    ],
    addons: [
      { id: 'intl-15', label: 'International Card Transaction (+1.5%)', pct: 0.015, description: 'Applied when customer uses a card issued outside the US.' },
      { id: 'paypal-15', label: 'PayPal Checkout Option (+1.5%)', pct: 0.015, description: 'Applied when customer pays via PayPal instead of card.' },
      { id: 'sub-05', label: 'Subscription Billing (+0.5%)', pct: 0.005, description: 'Additional recurring billing fee on subscription renewals.' },
    ],
    feeSummaryBullets: [
      'Base checkout starts at 5.0% + $0.50 and includes global sales tax/VAT Merchant of Record handling.',
      'International cards (+1.5%), PayPal transactions (+1.5%), and subscriptions (+0.5%) stack onto the 5% base.',
      'Even with international surcharges (6.5%–7%), it remains roughly half Gumroad’s effective fee.',
    ],
    proTips: [
      'Compare your average international buyer mix—most global indie SaaS tools average around ~6.2%–6.5% blended Lemon Squeezy fees.',
      'Price annual SaaS plans around $49–$199 so the $0.50 fixed fee stays around 0.25%–1%.',
      'Pass Merchant of Record tax compliance work to Lemon Squeezy instead of spending on separate tax filing tools.',
    ],
    rivals: ['paddle', 'gumroad', 'stripe'],
    faqs: [
      { q: 'Does Lemon Squeezy include Stripe fees in 5% + $0.50?', a: 'Yes, for US domestic card payments, 5% + $0.50 is all-inclusive. Non-US cards (+1.5%) and PayPal (+1.5%) add small surcharges.' },
      { q: 'Does Lemon Squeezy act as Merchant of Record?', a: 'Yes. Lemon Squeezy collects, files, and remits global VAT, GST, and US state sales taxes on your behalf.' },
      { q: 'How does Lemon Squeezy compare to Paddle?', a: 'Both have identical 5% + $0.50 base pricing; Paddle often keeps international/wire fees bundled cleanly while Lemon Squeezy shines for quick digital downloads and indie SaaS.' },
      { q: 'What should I charge to net $100 on Lemon Squeezy?', a: 'On a US card checkout (5% + $0.50), price at $105.79. With international card surcharge (6.5% + $0.50), price at $107.49.' },
    ],
  },
  {
    slug: 'paddle',
    name: 'Paddle',
    category: 'creator-saas',
    categoryLabel: 'Payments, SaaS & App Stores',
    tagline: 'Calculate Paddle’s 5% + $0.50 all-inclusive Merchant of Record SaaS checkout fees and payouts.',
    defaultSalePrice: 99,
    defaultCogs: 0,
    defaultShipping: 0,
    supportsCogsAndShipping: false,
    tiers: [
      { id: 'paddle-5', label: 'Paddle Standard Checkout (5.0% + $0.50)', platformPct: 0.05, platformFixed: 0.50 },
      { id: 'paddle-volume', label: 'High-Volume Custom Tier Example (4.0% + $0.50)', platformPct: 0.04, platformFixed: 0.50 },
    ],
    addons: [
      { id: 'wire-fx', label: 'Optional Wire / Payout Conversion Cushion (1%)', pct: 0.01, description: 'Optional margin cushion if receiving payouts in non-USD currencies.' },
    ],
    feeSummaryBullets: [
      'Paddle charges a flat 5.0% + $0.50 per transaction across cards, Apple Pay, and PayPal without separate international card markups.',
      'Includes global VAT/sales tax compliance, chargeback protection, and invoicing.',
      'High-volume SaaS companies can negotiate lower rates once MRR scales.',
    ],
    proTips: [
      'Paddle is especially strong for global SaaS where 40%+ of users pay with non-US cards or PayPal, avoiding extra +1.5% surcharges.',
      'Set annual plans or higher-ARPU tiers so $0.50 fixed fees never erode micro-transactions.',
      'Use Paddle’s tax-inclusive or tax-exclusive geo-pricing intentionally so net MRR stays consistent worldwide.',
    ],
    rivals: ['lemon-squeezy', 'stripe', 'gumroad'],
    faqs: [
      { q: 'Does Paddle charge extra for international cards or PayPal?', a: 'Paddle’s headline 5% + $0.50 rate bundles standard card, PayPal, and cross-border checkout fees together.' },
      { q: 'Why pay Paddle 5% instead of Stripe 2.9%?', a: 'Stripe leaves global VAT/GST/sales tax registration, calculation, and remittance on your shoulders, whereas Paddle handles all tax compliance as Merchant of Record.' },
      { q: 'How much do I keep from a $99 Paddle SaaS subscription?', a: '5% + $0.50 equals $5.45, leaving $93.55 net payout.' },
      { q: 'Can small solo founders use Paddle?', a: 'Yes, solo developers and indie SaaS founders routinely use Paddle as long as their product complies with Paddle’s acceptable use policy.' },
    ],
  },
  {
    slug: 'apple-app-store',
    name: 'Apple App Store',
    category: 'creator-saas',
    categoryLabel: 'Payments, SaaS & App Stores',
    tagline: 'Calculate Apple Small Business Program (15%) vs Standard (30%) App Store and IAP developer payouts.',
    defaultSalePrice: 29.99,
    defaultCogs: 0,
    defaultShipping: 0,
    supportsCogsAndShipping: false,
    tiers: [
      { id: 'small-business-15', label: 'App Store Small Business Program (15%)', platformPct: 0.15 },
      { id: 'standard-30', label: 'Standard App / Year 1 IAP (30%)', platformPct: 0.30 },
      { id: 'year2-sub-15', label: 'Year 2+ Auto-Renewing Subscription (15%)', platformPct: 0.15 },
    ],
    addons: [
      { id: 'web-funnel-compare', label: 'Optional Attribution / UA Reserve (5%)', pct: 0.05, description: 'Optional user acquisition or localization cushion per purchase.' },
    ],
    feeSummaryBullets: [
      'Developers earning under $1M/year in proceeds qualify for the App Store Small Business Program at a 15% commission.',
      'Standard apps and first-year subscriptions outside the Small Business Program incur a 30% cut, dropping to 15% in Year 2+.',
      'Apple acts as distributor/MoR for App Store sales across 175 storefronts.',
    ],
    proTips: [
      'Apply for the App Store Small Business Program BEFORE launching paid monetization—approval is not retroactive.',
      'Focus on annual subscriptions rather than short trials to increase LTV above acquisition cost.',
      'Remember Apple calculates commission on net sales after local VAT/GST in tax-inclusive regions.',
    ],
    rivals: ['google-play', 'steam', 'paddle'],
    faqs: [
      { q: 'How do indie developers get Apple’s 15% commission instead of 30%?', a: 'Enroll in the App Store Small Business Program if your total proceeds across associated developer accounts were under $1 million in the previous calendar year.' },
      { q: 'What happens to Year 2 App Store subscriptions?', a: 'Auto-renewing subscriptions drop from 30% to 15% after a subscriber completes 12 full months of paid service—even for large publishers.' },
      { q: 'How much do I net on a $9.99 app under the 15% tier?', a: 'Before local storefront VAT adjustments, you retain $8.49 (85%).' },
      { q: 'What price is needed to net $50 per IAP under 30% vs 15%?', a: 'At 15%, charge $58.82; at 30%, you must charge $71.43.' },
    ],
  },
  {
    slug: 'google-play',
    name: 'Google Play',
    category: 'creator-saas',
    categoryLabel: 'Payments, SaaS & App Stores',
    tagline: 'Calculate Google Play’s 15% first-$1M tier, 15% subscription rate, and 30% standard payouts.',
    defaultSalePrice: 19.99,
    defaultCogs: 0,
    defaultShipping: 0,
    supportsCogsAndShipping: false,
    tiers: [
      { id: 'first-1m-15', label: 'First $1M Annual Revenue / All Subscriptions (15%)', platformPct: 0.15 },
      { id: 'over-1m-30', label: 'Standard Non-Subscription Over $1M (30%)', platformPct: 0.30 },
    ],
    addons: [
      { id: 'fx-payout', label: 'Optional UA / Analytics Margin Cushion (5%)', pct: 0.05, description: 'Optional user acquisition or localization overhead allowance.' },
    ],
    feeSummaryBullets: [
      'Google Play charges 15% on the first $1 million of developer earnings every year—and 15% permanently on all subscriptions from Day 1.',
      'Only one-time IAPs and paid app downloads above $1 million annual revenue shift to the 30% bracket.',
      'Google handles Play billing tax collection in applicable territories.',
    ],
    proTips: [
      'You must enroll in Google Play’s 15% service fee tier inside Play Console—do not leave money on the table.',
      'Subscriptions on Google Play enjoy the 15% rate immediately in Year 1 (unlike Apple’s 30% Year 1 rule outside SBP).',
      'Use Reverse Pricing to align Android and Web subscription net ARPU.',
    ],
    rivals: ['apple-app-store', 'steam', 'stripe'],
    faqs: [
      { q: 'Does Google Play charge 15% on subscriptions from day one?', a: 'Yes. Enrolled developers pay 15% on all auto-renewing subscriptions starting on the subscriber’s very first billing cycle.' },
      { q: 'What is Google Play’s fee after $1M in revenue?', a: 'Earnings above $1 million from non-subscription purchases move to 30%, while subscriptions stay at 15%.' },
      { q: 'Is Google Play cheaper than Apple for big subscription apps?', a: 'Yes, for publishers over $1M annual proceeds, Google’s 15% Year-1 subscription fee is half Apple’s 30% Year-1 rate.' },
      { q: 'How much do I net from a $19.99 Play Store purchase at 15%?', a: 'You keep $16.99 before local tax or currency adjustments.' },
    ],
  },
  {
    slug: 'steam',
    name: 'Steam',
    category: 'creator-saas',
    categoryLabel: 'Payments, SaaS & App Stores',
    tagline: 'Calculate Steam’s 30% / 25% / 20% PC game revenue tiers and true indie studio take-home.',
    defaultSalePrice: 19.99,
    defaultCogs: 0,
    defaultShipping: 0,
    supportsCogsAndShipping: false,
    tiers: [
      { id: 'steam-30', label: 'Standard Steam Tier ($0 – $10M: 30%)', platformPct: 0.30 },
      { id: 'steam-25', label: 'Mid Tier ($10M – $50M: 25%)', platformPct: 0.25 },
      { id: 'steam-20', label: 'Top Tier ($50M+: 20%)', platformPct: 0.20 },
    ],
    addons: [
      { id: 'refund-chargeback', label: 'Estimated Refunds / VAT / Chargebacks Reserve (8%)', pct: 0.08, description: 'Real-world buffer for 2-hour Steam refunds and VAT-inclusive regional pricing.' },
    ],
    feeSummaryBullets: [
      'Steam takes 30% of net revenue (gross sales minus VAT/sales tax and refunds) up to $10 million per game.',
      'Revenue between $10M and $50M drops to a 25% Steam cut, and revenue above $50M drops to 20%.',
      'Most indie games see ~60%–65% of sticker price hit their bank after VAT, refunds, and Steam’s 30% fee.',
    ],
    proTips: [
      'Remember Steam’s 30% cut is calculated AFTER VAT and refunds are subtracted from sticker price.',
      'Model launch discounts (e.g., 10%–20% launch discount) as your Sale Price to verify realistic launch cash flow.',
      'Do not forget the $100 Steam Direct fee is recoupable once a game clears $1,000 in adjusted gross revenue.',
    ],
    rivals: ['apple-app-store', 'google-play', 'paddle'],
    faqs: [
      { q: 'How much does Steam take from indie game developers?', a: 'Steam charges 30% on the first $10 million in adjusted gross revenue, 25% from $10M to $50M, and 20% above $50M.' },
      { q: 'Why do developers often net closer to 62% instead of 70% on Steam?', a: 'Because Steam first deducts regional VAT/sales taxes and customer refunds before applying the 70/30 split.' },
      { q: 'What is the Steam Direct app fee?', a: 'Valve charges a $100 per-game recoupable deposit that is refunded after your game achieves $1,000 in adjusted gross sales.' },
      { q: 'What price must I charge on Steam to net $14 per copy?', a: 'At the standard 30% cut, price at $20.00 ($20 × 0.70 = $14.00) before VAT/refund reserves.' },
    ],
  },
  {
    slug: 'patreon',
    name: 'Patreon',
    category: 'creator-saas',
    categoryLabel: 'Payments, SaaS & App Stores',
    tagline: 'Calculate Patreon platform tiers (8% / 12%) plus card processing and optional Apple iOS fee.',
    defaultSalePrice: 15,
    defaultCogs: 0,
    defaultShipping: 0,
    supportsCogsAndShipping: false,
    tiers: [
      { id: 'pro-8', label: 'Patreon Pro Plan (8% + 2.9% + $0.30)', platformPct: 0.08, processingPct: 0.029, processingFixed: 0.30 },
      { id: 'premium-12', label: 'Patreon Premium Plan (12% + 2.9% + $0.30)', platformPct: 0.12, processingPct: 0.029, processingFixed: 0.30 },
      { id: 'micropay-3', label: 'Low-Pledge <= $3 Tier (8% + 5% + $0.10)', platformPct: 0.08, processingPct: 0.05, processingFixed: 0.10 },
    ],
    addons: [
      { id: 'payout-1', label: 'Monthly Payout / Currency Fee Cushion (1%)', pct: 0.01, description: 'Covers standard PayPal/Payoneer 1% payout percentage.' },
    ],
    feeSummaryBullets: [
      'Patreon charges 8% (Pro) or 12% (Premium) platform fee plus payment processing (2.9% + $0.30 on pledges over $3).',
      'Small $1–$3 tiers incur micropayment processing of 5% + $0.10, making $5–$15 tiers vastly more efficient.',
      'Encourage fans to subscribe on the web rather than iOS in-app purchase to avoid Apple’s 30% fee.',
    ],
    proTips: [
      'Avoid setting your lowest tier below $5 unless needed—a $3 pledge loses nearly 16.3% to combined fees.',
      'Direct audience members to join via mobile browser or desktop links to keep payouts cleanly at web rates.',
      'Offer annual memberships to cut fixed $0.30 per-charge processing fees by 12x.',
    ],
    rivals: ['substack', 'gumroad', 'lemon-squeezy'],
    faqs: [
      { q: 'What is Patreon’s total cut on a $10 membership?', a: 'On the Pro plan (8%), combined platform and processing fees total $1.39 (8% + 2.9% + $0.30), leaving $8.61 before payout fees.' },
      { q: 'Why do $2 Patreon tiers lose a higher percentage?', a: 'Pledges of $3 or less use Patreon’s micropayment rate of 5% + $0.10 on top of the 8% or 12% platform fee.' },
      { q: 'Does Patreon charge a payout fee?', a: 'US ACH direct deposit is $0.25 per payout; PayPal payouts typically incur 1% (capped at $20 in the US).' },
      { q: 'Is Substack cheaper than Patreon?', a: 'Substack charges 10% + 2.9% + $0.30 (12.9% total), slightly higher than Patreon Pro (10.9%) but slightly lower than Patreon Premium (14.9%).' },
    ],
  },
  {
    slug: 'substack',
    name: 'Substack',
    category: 'creator-saas',
    categoryLabel: 'Payments, SaaS & App Stores',
    tagline: 'Calculate Substack’s 10% platform fee, Stripe 2.9% + $0.30 processing, and Stripe Billing charges.',
    defaultSalePrice: 80,
    defaultCogs: 0,
    defaultShipping: 0,
    supportsCogsAndShipping: false,
    tiers: [
      { id: 'substack-standard', label: 'Substack Standard (10% + Stripe 2.9% + $0.30)', platformPct: 0.10, processingPct: 0.029, processingFixed: 0.30 },
    ],
    addons: [
      { id: 'stripe-billing-07', label: 'Stripe Recurring Billing Fee (+0.7%)', pct: 0.007, description: 'Stripe’s 0.7% recurring billing surcharge passed through on paid subscriptions.' },
    ],
    feeSummaryBullets: [
      'Substack takes 10% of paid newsletter subscription revenue, alongside Stripe’s 2.9% + $0.30 card fee (and 0.7% Stripe Billing fee).',
      'Free newsletters and free subscribers cost $0 forever.',
      'Annual subscriptions ($70–$100/yr) minimize fixed $0.30 per-charge overhead compared to monthly plans.',
    ],
    proTips: [
      'Default your subscription toggle toward annual pricing—12 monthly $7 charges cost $3.60 in fixed $0.30 fees vs just $0.30 on one $70 annual plan.',
      'Evaluate your breakeven point: once gross ARR passes ~$15,000, Substack’s 10% cut exceeds fixed-fee newsletter SaaS tools.',
      'Use Reverse Pricing to set your annual subscription price to clear your exact target take-home per subscriber.',
    ],
    rivals: ['patreon', 'gumroad', 'stripe'],
    faqs: [
      { q: 'How much does Substack take from paid newsletters?', a: 'Substack takes 10% of gross subscription revenue, plus Stripe card processing (2.9% + $0.30) and Stripe’s 0.7% recurring billing fee.' },
      { q: 'How much do I keep on an $8/month Substack subscription?', a: 'After 10% ($0.80) and Stripe fees (~$0.59), you net about $6.61 per subscriber before taxes.' },
      { q: 'How much do I keep on an $80 annual Substack subscription?', a: 'After 10% ($8.00) and Stripe (~$3.18 including Billing), you net roughly $68.82.' },
      { q: 'Are free Substack newsletters charged any fees?', a: 'No. Substack is 100% free unless and until you turn on paid subscriptions.' },
    ],
  },
];

// Normalize alias fallback if referenced in rivals
export const PLATFORM_MAP: Record<string, PlatformProfile> = Object.fromEntries(
  PLATFORMS.map((p) => [p.slug, p])
);
