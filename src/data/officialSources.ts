export interface OfficialSource {
  label: string;
  url: string;
  authority: string;
}

export const IRS_SOURCES_2026 = {
  scheduleSE: {
    label: 'IRS Schedule SE (Form 1040) — Self-Employment Tax',
    url: 'https://www.irs.gov/forms-pubs/about-schedule-se-form-1040',
    authority: 'IRS',
  },
  seTaxGuide: {
    label: 'IRS Self-Employment Tax (Social Security & Medicare)',
    url: 'https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes',
    authority: 'IRS',
  },
  form1040ES: {
    label: 'IRS Form 1040-ES — Estimated Tax for Individuals',
    url: 'https://www.irs.gov/forms-pubs/about-form-1040-es',
    authority: 'IRS',
  },
  mileageRates: {
    label: 'IRS Standard Mileage Rates (2026: $0.725/mi Jan–Jun & $0.76/mi Jul–Dec, Announcement 2026-11)',
    url: 'https://www.irs.gov/tax-professionals/standard-mileage-rates',
    authority: 'IRS',
  },
  qbiDeduction: {
    label: 'IRS Section 199A — Qualified Business Income Deduction',
    url: 'https://www.irs.gov/newsroom/qualified-business-income-deduction',
    authority: 'IRS',
  },
  ssaWageBase: {
    label: 'SSA Contribution & Benefit Base (Social Security Cap)',
    url: 'https://www.ssa.gov/oact/cola/cbb.html',
    authority: 'SSA',
  },
} as const satisfies Record<string, OfficialSource>;

export const PLATFORM_FEE_SOURCES: Record<string, OfficialSource> = {
  upwork: {
    label: 'Upwork Freelancer Service Fees',
    url: 'https://support.upwork.com/hc/en-us/articles/211062538-Freelancer-Service-Fees',
    authority: 'Upwork',
  },
  fiverr: {
    label: 'Fiverr Seller Commission & Order Policy',
    url: 'https://help.fiverr.com/hc/en-us/articles/360010559198-Order-management',
    authority: 'Fiverr',
  },
  freelancer: {
    label: 'Freelancer.com Fees & Charges Schedule',
    url: 'https://www.freelancer.com/feesandcharges',
    authority: 'Freelancer',
  },
  etsy: {
    label: 'Etsy Fees & Payments Policy',
    url: 'https://www.etsy.com/legal/fees/',
    authority: 'Etsy',
  },
  ebay: {
    label: 'eBay Seller Selling Fees',
    url: 'https://www.ebay.com/help/selling/fees-credits-invoices/selling-fees?id=4822',
    authority: 'eBay',
  },
  shopify: {
    label: 'Shopify Plans & Payment Processing Rates',
    url: 'https://www.shopify.com/pricing',
    authority: 'Shopify',
  },
  'amazon-fba': {
    label: 'Selling on Amazon Fee Schedule',
    url: 'https://sell.amazon.com/pricing',
    authority: 'Amazon',
  },
  poshmark: {
    label: 'Poshmark Selling Fee Policy',
    url: 'https://support.poshmark.com/s/article/What-are-the-fees-for-selling-on-Poshmark',
    authority: 'Poshmark',
  },
  mercari: {
    label: 'Mercari Selling & Processing Fees',
    url: 'https://www.mercari.com/us/help_center/article/169/',
    authority: 'Mercari',
  },
  depop: {
    label: 'Depop Marketplace & Payment Fees',
    url: 'https://depophelp.zendesk.com/hc/en-gb/articles/360001791127-Depop-Fees-and-Charges',
    authority: 'Depop',
  },
  stockx: {
    label: 'StockX Seller Transaction & Level Fees',
    url: 'https://stockx.com/help/articles/What-are-StockXs-fees-for-sellers',
    authority: 'StockX',
  },
  'tiktok-shop': {
    label: 'TikTok Shop US Seller Commission Guide',
    url: 'https://seller-us.tiktok.com/university/essay?knowledge_id=6837835390748418',
    authority: 'TikTok Shop',
  },
  airbnb: {
    label: 'Airbnb Host Service Fees',
    url: 'https://www.airbnb.com/help/article/1857',
    authority: 'Airbnb',
  },
  stripe: {
    label: 'Stripe Official Pricing & Card Processing Fees',
    url: 'https://stripe.com/pricing',
    authority: 'Stripe',
  },
  paypal: {
    label: 'PayPal US Merchant & Commercial Transaction Fees',
    url: 'https://www.paypal.com/us/webapps/mpp/merchant-fees',
    authority: 'PayPal',
  },
  gumroad: {
    label: 'Gumroad Creator Pricing & Fees',
    url: 'https://gumroad.com/pricing',
    authority: 'Gumroad',
  },
  'lemon-squeezy': {
    label: 'Lemon Squeezy Merchant-of-Record Pricing',
    url: 'https://www.lemonsqueezy.com/pricing',
    authority: 'Lemon Squeezy',
  },
  paddle: {
    label: 'Paddle SaaS Billing & MoR Pricing',
    url: 'https://www.paddle.com/pricing',
    authority: 'Paddle',
  },
  'apple-app-store': {
    label: 'Apple App Store Commission & Small Business Program',
    url: 'https://developer.apple.com/app-store/small-business-program/',
    authority: 'Apple',
  },
  'google-play': {
    label: 'Google Play Console Service Fees',
    url: 'https://support.google.com/googleplay/android-developer/answer/112622',
    authority: 'Google Play',
  },
  steam: {
    label: 'Steamworks Revenue Share & Payment FAQ',
    url: 'https://partner.steamgames.com/doc/finance/payments_salesreporting/faq',
    authority: 'Valve / Steam',
  },
  patreon: {
    label: 'Patreon Creator Fees Overview',
    url: 'https://support.patreon.com/hc/en-us/articles/11111747095181-Creator-fees-overview',
    authority: 'Patreon',
  },
  substack: {
    label: 'Substack Publisher Fee Breakdown',
    url: 'https://support.substack.com/hc/en-us/articles/360037607131-How-much-does-Substack-cost',
    authority: 'Substack',
  },
};

export const GIG_SOURCES: Record<string, OfficialSource> = {
  uber: {
    label: 'Uber Driver Tax Information & Summaries',
    url: 'https://www.uber.com/us/en/drive/tax-information/',
    authority: 'Uber',
  },
  doordash: {
    label: 'DoorDash Dasher 1099 Tax FAQ',
    url: 'https://help.doordash.com/dashers/s/article/Common-Dasher-Tax-Questions',
    authority: 'DoorDash',
  },
  instacart: {
    label: 'Instacart Shopper Earnings & 1099 Overview',
    url: 'https://shoppers.instacart.com/income',
    authority: 'Instacart',
  },
  'amazon-flex': {
    label: 'Amazon Flex Delivery Partner FAQ',
    url: 'https://flex.amazon.com/faq',
    authority: 'Amazon Flex',
  },
  lyft: {
    label: 'Lyft Driver Tax Information',
    url: 'https://help.lyft.com/hc/en-us/articles/115012926967-Tax-information-for-drivers',
    authority: 'Lyft',
  },
  youtube: {
    label: 'YouTube Partner Program Revenue Share',
    url: 'https://support.google.com/youtube/answer/72902',
    authority: 'YouTube',
  },
  onlyfans: {
    label: 'OnlyFans Creator Payout & Commission FAQ',
    url: 'https://onlyfans.com/help/3/16/44',
    authority: 'OnlyFans',
  },
};
