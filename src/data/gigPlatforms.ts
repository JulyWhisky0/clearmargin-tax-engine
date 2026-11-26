/** IRS Notice 2026-10: Jan 1 – Jun 30, 2026 business standard mileage rate ($0.725/mile) */
export const IRS_2026_MILEAGE_RATE_H1 = 0.725;
/** IRS Announcement 2026-11: Jul 1 – Dec 31, 2026 mid-year business standard mileage rate ($0.76/mile) */
export const IRS_2026_MILEAGE_RATE_H2 = 0.76;
/** Equal 50/50 full-year blended reference rate ($0.7425/mile) when annual miles are split evenly across H1 & H2 */
export const IRS_2026_MILEAGE_RATE_BLENDED =
  Math.round(((IRS_2026_MILEAGE_RATE_H1 + IRS_2026_MILEAGE_RATE_H2) / 2) * 10000) / 10000;
/** Active H2 2026 IRS business standard mileage rate (effective July 1, 2026) */
export const IRS_2026_MILEAGE_RATE = IRS_2026_MILEAGE_RATE_H2;

export interface GigFaq {
  q: string;
  a: string;
}

export interface GigPlatformProfile {
  slug: string;
  name: string;
  roleLabel: string;
  tagline: string;
  supportsMileage: boolean;
  defaultGrossRevenue: number;
  defaultMiles: number;
  defaultOtherExpenses: number;
  defaultHoursPerWeek: number;
  defaultPlatformFeePct: number;
  defaultStateSlug: string;
  taxFormLabel: string;
  platformFeeNote: string;
  commonDeductions: string[];
  tips: string[];
  rivals: string[];
  faqs: GigFaq[];
}

export const GIG_PLATFORMS: GigPlatformProfile[] = [
  {
    slug: 'uber',
    name: 'Uber',
    roleLabel: 'Rideshare Driver',
    tagline:
      'Calculate 2026 Uber 1099-NEC & 1099-K self-employment taxes, split 2026 IRS mileage deductions ($0.725/mi Jan–Jun & $0.76/mi Jul–Dec), quarterly payments, and net hourly take-home pay.',
    supportsMileage: true,
    defaultGrossRevenue: 52000,
    defaultMiles: 28000,
    defaultOtherExpenses: 2400,
    defaultHoursPerWeek: 35,
    defaultPlatformFeePct: 0,
    defaultStateSlug: 'california',
    taxFormLabel: 'Form 1099-NEC & 1099-K',
    platformFeeNote:
      'Uber driver 1099-NEC payouts and bank deposits already reflect net driver pay after Uber booking/service fees, so Platform Cut defaults to 0%. If you input gross rider fares from your Uber Annual Tax Summary, include Uber service fees in Other Schedule C Expenses.',
    commonDeductions: [
      'IRS Standard Mileage ($0.725/mi Jan 1–Jun 30 & $0.76/mi Jul 1–Dec 31, 2026) for all online, pickup, and repositioning miles',
      'Business share of smartphone hardware and monthly unlimited wireless plan',
      'Highway tolls, airport queue fees, and business parking paid while driving',
      'Dual-facing dashcam, magnetic phone mount, fast chargers, and passenger water/snacks',
      'Frequent car washes, vacuuming, floor mats, and interior detailing supplies',
      'Rideshare insurance endorsement difference, mileage-tracking app, and tax software',
    ],
    tips: [
      'Split your 2026 odometer log at June 30 / July 1: under IRS Announcement 2026-11, miles driven Jan–Jun deduct at $0.725/mi while Jul–Dec miles deduct at $0.76/mi.',
      'Track every deadhead mile from the moment you go online until your final drop-off—app-reported "trip miles" miss up to 35% of deductible driving.',
      'Do not double-count gas, oil changes, tires, or auto insurance on top of the 2026 standard mileage rate ($0.725/$0.76/mi); those vehicle costs are already built in.',
    ],
    rivals: ['lyft', 'doordash', 'instacart', 'amazon-flex'],
    faqs: [
      {
        q: 'How much should Uber drivers set aside for taxes in 2026?',
        a: 'After claiming the 2026 IRS standard mileage deduction ($0.725/mi Jan–Jun and $0.76/mi Jul–Dec) and wireless/supply write-offs, many full-time Uber drivers owe roughly 10% to 18% of their gross payouts in combined self-employment (15.3%) and federal/state income tax, depending on state rates and filing status.',
      },
      {
        q: 'Why does Uber issue both a 1099-K and a 1099-NEC?',
        a: 'Uber generally reports gross passenger fare payments on Form 1099-K (when thresholds apply) and promotions, quests, or referral bonuses on Form 1099-NEC. Your Uber Annual Tax Summary breaks out Uber service fees and tolls so you can deduct them on Schedule C and avoid paying tax on money you never kept.',
      },
      {
        q: 'Can Uber drivers deduct deadhead miles between rides?',
        a: 'Yes. Once you are online and actively available for trips—driving to pickup locations, returning from drop-offs, or repositioning to busy zones—those business miles qualify for the 2026 IRS rate ($0.725/mi through June 30 and $0.76/mi starting July 1, 2026).',
      },
      {
        q: 'Should Uber drivers use the 2026 standard mileage rate ($0.725/$0.76/mi) or actual car expenses?',
        a: 'Most rideshare drivers save significantly more with the 2026 IRS standard rate ($0.725/mi Jan–Jun, raised mid-year to $0.76/mi Jul–Dec), especially in fuel-efficient hybrids or older vehicles. You must choose standard mileage in the first year you place a vehicle into rideshare service if you want the option to switch later.',
      },
    ],
  },
  {
    slug: 'doordash',
    name: 'DoorDash',
    roleLabel: 'Delivery Dasher',
    tagline:
      'Estimate 2026 DoorDash 1099-NEC taxes, split 2026 IRS mileage savings ($0.725/mi Jan–Jun & $0.76/mi Jul–Dec), quarterly IRS installments, and true after-tax hourly earnings.',
    supportsMileage: true,
    defaultGrossRevenue: 36000,
    defaultMiles: 21000,
    defaultOtherExpenses: 1500,
    defaultHoursPerWeek: 30,
    defaultPlatformFeePct: 0,
    defaultStateSlug: 'texas',
    taxFormLabel: 'Form 1099-NEC',
    platformFeeNote:
      'DoorDash Form 1099-NEC reports your net Dasher earnings (base pay, peak pay, challenges, and 100% of customer tips) directly with 0% platform commission withheld.',
    commonDeductions: [
      'IRS Standard Mileage ($0.725/mi Jan 1–Jun 30 & $0.76/mi Jul 1–Dec 31, 2026) from restaurant dispatch to drop-off and hotspot return',
      'Insulated thermal delivery bags, pizza bags, and sturdy drink carriers',
      'Business percentage of your smartphone purchase and monthly cellular data plan',
      'Fast Pay instant cashout fees and bank transfer charges',
      'Phone mounts, portable power banks, flashlights, and foul-weather delivery gear',
      'Mileage tracking subscription (Stride, Gridwise, Everlance) and tax prep fees',
    ],
    tips: [
      'Separate your 2026 delivery mileage log by half-year: IRS Announcement 2026-11 increased the business rate from $0.725/mi (Jan–Jun) to $0.76/mi starting July 1, 2026.',
      'Start your mileage tracker when you leave to pick up your first order and stop only when you end your Dash—DoorDash only estimates active delivery miles.',
      'Monitor your net earnings per total mile: if a batch pays under $1.25/mile round-trip, vehicle depreciation and SE tax can wipe out your margin.',
    ],
    rivals: ['uber', 'instacart', 'amazon-flex', 'lyft'],
    faqs: [
      {
        q: 'Are DoorDash tips included on Form 1099-NEC and subject to tax?',
        a: 'Yes. All cashless base pay, peak pay, and customer tips paid through DoorDash are totaled on your Form 1099-NEC and are subject to both 15.3% self-employment tax and regular income tax after Schedule C deductions.',
      },
      {
        q: 'What happens if I earned under $600 on DoorDash in 2026?',
        a: 'Even if DoorDash does not issue a Form 1099-NEC below reporting thresholds, the IRS requires reporting all self-employment income whenever net Schedule C profit across all gig work reaches $400 or more.',
      },
      {
        q: 'Can Dashers deduct insulated hot bags and phone plans?',
        a: 'Yes. Thermal bags, drink caddies, phone mounts, and the business-use percentage of your cell phone bill are ordinary and necessary Schedule C expenses you can deduct alongside the 2026 standard mileage rate ($0.725/mi Jan–Jun & $0.76/mi Jul–Dec).',
      },
      {
        q: 'Do DoorDash drivers qualify for the 20% QBI deduction?',
        a: 'Yes. Independent Dashers operating as sole proprietors or single-member LLCs generally qualify for the federal 20% Section 199A Qualified Business Income deduction on net Schedule C profit.',
      },
    ],
  },
  {
    slug: 'instacart',
    name: 'Instacart',
    roleLabel: 'Full-Service Shopper',
    tagline:
      'Calculate 2026 Instacart Shopper 1099-NEC taxes, split 2026 IRS delivery mileage deductions ($0.725/mi Jan–Jun & $0.76/mi Jul–Dec), equipment write-offs, and net hourly pay.',
    supportsMileage: true,
    defaultGrossRevenue: 34000,
    defaultMiles: 16500,
    defaultOtherExpenses: 1600,
    defaultHoursPerWeek: 28,
    defaultPlatformFeePct: 0,
    defaultStateSlug: 'florida',
    taxFormLabel: 'Form 1099-NEC',
    platformFeeNote:
      'Instacart issues Form 1099-NEC for your full batch pay, heavy-order bumps, and customer tips with 0% commission subtracted from your reported payout.',
    commonDeductions: [
      'IRS Standard Mileage ($0.725/mi Jan 1–Jun 30 & $0.76/mi Jul 1–Dec 31, 2026) driving between stores and customer drop-offs',
      'Collapsible grocery wagon, stair-climbing cart, and heavy-duty tote crates',
      'Insulated freezer bags, ice packs, and temperature-controlled coolers',
      'Business share of smartphone hardware, unlimited data plan, and portable power banks',
      'Instant Cashout payout fees and metered parking / bridge tolls',
      'Mileage-tracking apps, gloves/rain gear, and Schedule C tax preparation software',
    ],
    tips: [
      'Split your 2026 mileage log at July 1: business miles driven Jan 1–Jun 30 deduct at $0.725/mi while Jul 1–Dec 31 miles qualify for the $0.76/mi mid-year IRS rate.',
      'Instacart involves substantial in-store shopping time, so your miles-per-dollar are lower than rideshare—make sure you capture every phone, wagon, and cooler deduction.',
      'Check whether you also drive for DoorDash or Uber—keep one unified mileage log across apps without overlapping or double-counting miles.',
    ],
    rivals: ['doordash', 'amazon-flex', 'uber', 'lyft'],
    faqs: [
      {
        q: 'Why is the Instacart mileage deduction lower than Uber or DoorDash?',
        a: 'Full-service Instacart Shoppers spend a large share of each batch walking store aisles rather than driving. That means fewer deductible miles per dollar earned, making non-mileage Schedule C write-offs (carts, bags, phone plan %) especially valuable.',
      },
      {
        q: 'Are collapsible carts and insulated bags 100% tax deductible?',
        a: 'Yes. Equipment bought strictly for grocery delivery—like heavy-duty folding wagons, insulated freezer bags, and thermal totes—can be deducted in full as Schedule C supplies.',
      },
      {
        q: 'Can I deduct the cost of my smartphone and data plan as an Instacart Shopper?',
        a: 'You can deduct the business-use percentage of your monthly cellular plan and smartphone cost. Many full-time shoppers track total hours on the Instacart Shopper app to justify a reasonable 50%–75% business allocation.',
      },
      {
        q: 'Do Instacart Shoppers need to pay quarterly estimated taxes?',
        a: 'If you expect to owe at least $1,000 in federal tax for 2026 after any W-2 withholding, the IRS expects quarterly Form 1040-ES payments due April 15, June 15, September 15, and January 15.',
      },
    ],
  },
  {
    slug: 'amazon-flex',
    name: 'Amazon Flex',
    roleLabel: 'Parcel Delivery Partner',
    tagline:
      'Calculate 2026 Amazon Flex 1099-NEC taxes, split 2026 IRS block mileage deductions ($0.725/mi Jan–Jun & $0.76/mi Jul–Dec), quarterly IRS estimates, and real after-tax hourly pay.',
    supportsMileage: true,
    defaultGrossRevenue: 42000,
    defaultMiles: 24000,
    defaultOtherExpenses: 1400,
    defaultHoursPerWeek: 30,
    defaultPlatformFeePct: 0,
    defaultStateSlug: 'texas',
    taxFormLabel: 'Form 1099-NEC',
    platformFeeNote:
      'Amazon Flex pays your full block offer plus Fresh/Whole Foods tips on Form 1099-NEC with 0% platform commission deducted.',
    commonDeductions: [
      'IRS Standard Mileage ($0.725/mi Jan 1–Jun 30 & $0.76/mi Jul 1–Dec 31, 2026) from pickup station through final parcel delivery',
      'Folding hand truck, parcel sorting totes, and trunk cargo organizers',
      'Headlamp, reflective safety vest, and weatherproof delivery boots/rain jacket',
      'Business portion of smartphone, unlimited data plan, and dash mount/chargers',
      'Highway tolls, parking fees, and commercial/delivery auto insurance rider excess',
      'Mileage tracking app subscription and Schedule C bookkeeping/tax filing tools',
    ],
    tips: [
      'Log odometer readings separately before and after July 1, 2026—high-mileage suburban blocks generate $0.725/mi (H1) and $0.76/mi (H2) write-offs often exceeding 40% of gross pay.',
      'Be conservative on commuting miles: driving from home to your first warehouse pickup may be non-deductible commuting unless you maintain a qualifying administrative home office.',
      'Factor return-trip miles after your last stop when evaluating whether a base-rate block actually beats your local after-tax minimum wage.',
    ],
    rivals: ['doordash', 'instacart', 'uber', 'lyft'],
    faqs: [
      {
        q: 'Can Amazon Flex drivers deduct miles from home to the delivery station?',
        a: 'Under IRS commuting rules, driving from home to your first regular pickup station is generally commuting unless your home qualifies as your principal place of business (administrative home office). Miles between the warehouse, every customer stop, and between multiple blocks are fully deductible.',
      },
      {
        q: 'How much does the 2026 IRS mileage deduction ($0.725/$0.76/mi) save an Amazon Flex driver?',
        a: 'At 24,000 business miles split evenly across the year (12,000 mi Jan–Jun at $0.725/mi + 12,000 mi Jul–Dec at $0.76/mi), the 2026 IRS rates create a $17,820 Schedule C write-off. Because every dollar of Schedule C expense reduces both 15.3% self-employment tax and your marginal income tax bracket, that deduction often cuts your annual IRS bill by $3,800 to $5,500+.',
      },
      {
        q: 'Are Whole Foods and Amazon Fresh tips included on my 1099-NEC?',
        a: 'Yes. Amazon combines base block pay and customer tips from Fresh/Whole Foods routes into one Form 1099-NEC total.',
      },
      {
        q: 'Can I deduct car repairs and gas if I claim the 2026 IRS standard mileage rate?',
        a: 'No. The 2026 standard mileage rate ($0.725/mi Jan–Jun and $0.76/mi Jul–Dec) replaces actual fuel, oil changes, tires, repairs, registration, and vehicle depreciation. You can still deduct tolls, parking, sorting gear, and your business phone share separately.',
      },
    ],
  },
  {
    slug: 'lyft',
    name: 'Lyft',
    roleLabel: 'Rideshare Driver',
    tagline:
      'Estimate 2026 Lyft 1099-NEC & 1099-K self-employment taxes, split 2026 IRS mileage deductions ($0.725/mi Jan–Jun & $0.76/mi Jul–Dec), and real net take-home pay per hour.',
    supportsMileage: true,
    defaultGrossRevenue: 48000,
    defaultMiles: 26000,
    defaultOtherExpenses: 2200,
    defaultHoursPerWeek: 34,
    defaultPlatformFeePct: 0,
    defaultStateSlug: 'illinois',
    taxFormLabel: 'Form 1099-NEC & 1099-K',
    platformFeeNote:
      'Lyft bank deposits and net driver earnings exclude Lyft platform/service fees (0% cut needed when entering actual driver payouts). If you enter gross passenger charges from a 1099-K, include Lyft fees from your Annual Tax Summary as an expense.',
    commonDeductions: [
      'IRS Standard Mileage ($0.725/mi Jan 1–Jun 30 & $0.76/mi Jul 1–Dec 31, 2026) for online, en-route, and passenger trip miles',
      'Express Pay instant cashout fees and Lyft platform fees (if reporting gross 1099-K)',
      'Business percentage of smartphone hardware and unlimited cellular data plan',
      'Car washes, interior detailing, odor eliminators, and seat protectors',
      'Dashcam, dual phone mount, multi-port charging cables, and passenger amenities',
      'Rideshare insurance endorsement delta, tolls, airport fees, and tax software',
    ],
    tips: [
      'Split your 2026 mileage log at July 1: under IRS Announcement 2026-11, Jan–Jun miles deduct at $0.725/mi while Jul–Dec miles deduct at $0.76/mi.',
      'Reconcile your Lyft Annual Summary against bank deposits before filing so you never accidentally pay tax on Lyft’s passenger-side platform fees shown on Form 1099-K.',
      'If you drive both Lyft and Uber in the same shift, track continuous online business mileage once—never claim the same trip mile on two Schedule C logs.',
    ],
    rivals: ['uber', 'doordash', 'instacart', 'amazon-flex'],
    faqs: [
      {
        q: 'Why does my Lyft 1099-K look higher than what hit my bank account?',
        a: 'Form 1099-K reports gross passenger payments processed before Lyft deducts its platform fee, service fee, and third-party pass-through fees. You report that gross figure on Schedule C and deduct all Lyft fees shown on your Lyft Annual Summary so you are taxed only on net driver earnings.',
      },
      {
        q: 'Are Lyft Express Pay $0.85 cashout fees tax deductible?',
        a: 'Yes. Instant payout fees and Lyft Direct bank charges incurred to receive your earnings are deductible business banking fees on Schedule C.',
      },
      {
        q: 'How do multi-app drivers handle Uber and Lyft mileage?',
        a: 'You may combine all rideshare driving under one Schedule C rideshare business or separate logs, provided every business mile is counted strictly once when either app is online and actively working.',
      },
      {
        q: 'How much tax does the 2026 IRS mileage rate ($0.725/$0.76/mi) save a Lyft driver?',
        a: 'Driving 26,000 business miles split evenly across the year (13,000 mi H1 at $0.725/mi + 13,000 mi H2 at $0.76/mi) produces a $19,305 Schedule C deduction, typically cutting combined self-employment and federal/state income taxes by $4,100 to $6,200+ per year.',
      },
    ],
  },
  {
    slug: 'youtube',
    name: 'YouTube',
    roleLabel: 'Video Creator & Partner',
    tagline:
      'Calculate 2026 YouTube AdSense & sponsorship 1099-NEC taxes, gear & studio Schedule C write-offs, quarterly IRS estimates, and net hourly pay.',
    supportsMileage: false,
    defaultGrossRevenue: 75000,
    defaultMiles: 0,
    defaultOtherExpenses: 14000,
    defaultHoursPerWeek: 35,
    defaultPlatformFeePct: 0,
    defaultStateSlug: 'california',
    taxFormLabel: 'Form 1099-NEC (Google AdSense)',
    platformFeeNote:
      'Google AdSense issues Form 1099-NEC for your net creator payout (already reflecting your 55% long-form or 45% Shorts share), and brand sponsorships pay 100% directly—keep Platform Cut at 0%.',
    commonDeductions: [
      'Cameras, lenses, microphones, lighting rigs, and editing workstations (Section 179)',
      'Editing suites, music licensing, thumbnail tools, and cloud backup (Adobe, Epidemic Sound)',
      'Contract video editors, thumbnail designers, and scriptwriters (issue 1099-NEC if >= $600)',
      'Dedicated home studio office deduction (simplified $5/sq ft or actual space %)',
      'Set props, review gear, software licenses, and production travel strictly for filming',
      'Business LLC fees, trademark/copyright costs, liability insurance, and CPA bookkeeping',
    ],
    tips: [
      'Combine AdSense 1099-NEC payouts, brand sponsorship deals, affiliate commissions, and merch revenue into your Schedule C gross receipts before calculating quarterly taxes.',
      'Remember that free review products sent by sponsors under a deliverable contract count as taxable barter income at fair market value—unless fully consumed as a business prop.',
      'Once annual net creator profit passes roughly $75,000–$90,000, ask a CPA whether electing S-Corp status makes sense to reduce 15.3% self-employment tax.',
    ],
    rivals: ['onlyfans', 'uber', 'doordash'],
    faqs: [
      {
        q: 'Does YouTube withhold taxes from AdSense payouts for US creators?',
        a: 'Normally no, provided you submitted an accurate Form W-9 in AdSense. Google reports your full net payouts on Form 1099-NEC, leaving you responsible for quarterly Form 1040-ES self-employment and income tax payments.',
      },
      {
        q: 'Can YouTubers write off cameras, PCs, and microphones immediately?',
        a: 'Yes. Equipment used exclusively or predominantly for channel production can typically be expensed in full during the purchase year under Section 179 or bonus depreciation rules.',
      },
      {
        q: 'Do I owe taxes on brand sponsorships and free review products?',
        a: 'Yes. Cash sponsorships are standard business income, and products received in exchange for a contracted video review are generally taxable at fair market value unless used strictly as business equipment/props.',
      },
      {
        q: 'Can I deduct a home studio room on Schedule C?',
        a: 'If a specific room or clearly defined area of your home is used regularly and exclusively for filming, editing, and managing your channel, you can claim either the simplified home office deduction or actual pro-rata housing expenses.',
      },
    ],
  },
  {
    slug: 'onlyfans',
    name: 'OnlyFans',
    roleLabel: 'Digital Subscription Creator',
    tagline:
      'Calculate 2026 OnlyFans 1099-NEC self-employment taxes after OnlyFans’ 20% creator cut, studio & gear deductions, and quarterly IRS set-asides.',
    supportsMileage: false,
    defaultGrossRevenue: 85000,
    defaultMiles: 0,
    defaultOtherExpenses: 11000,
    defaultHoursPerWeek: 30,
    defaultPlatformFeePct: 0.20,
    defaultStateSlug: 'florida',
    taxFormLabel: 'Form 1099-NEC',
    platformFeeNote:
      'OnlyFans takes a flat 20% commission on gross subscriptions, PPV messages, and tips. Enter your gross sales with Platform Cut at 20%—or if entering your net Form 1099-NEC payout, set Platform Cut to 0%.',
    commonDeductions: [
      'Cameras, ring/key lighting, tripods, backdrops, and dedicated creator smartphone',
      'Dedicated home studio room used exclusively for filming and content editing',
      'Content-exclusive costumes, props, and shoot sets (not everyday wearable clothing)',
      'Photo/video editing apps, social scheduling tools, VPN, and encrypted cloud storage',
      'DMCA takedown / privacy protection services, PO Box, and LLC formation/registered agent',
      'Contract photographers, agencies, moderators, and specialized 1099 creator CPAs',
    ],
    tips: [
      'Be strict on wardrobe deductions: everyday apparel adaptable to normal wear is disallowed by the IRS, whereas unmistakable stage costumes or shoot props used solely for content qualify.',
      'Keep personal and creator banking cleanly separated via a business checking account or single-member LLC so Schedule C write-offs stay audit-ready.',
      'Remember Form 1099-NEC sends zero taxes to the IRS—save 25%–30% of net creator payouts into a tax reserve account for quarterly Form 1040-ES payments.',
    ],
    rivals: ['youtube', 'uber', 'lyft'],
    faqs: [
      {
        q: 'Does OnlyFans report gross subscriber sales or the 80% net payout on Form 1099-NEC?',
        a: 'Fenix International (OnlyFans) typically reports the creator’s net 80% earnings paid out on Form 1099-NEC. If you enter your net 1099-NEC total in this calculator, set Platform Cut to 0%; if you enter gross fan spending from your dashboard, keep Platform Cut at 20%.',
      },
      {
        q: 'What expenses can OnlyFans creators legally deduct on Schedule C?',
        a: 'Ordinary and necessary business expenses include lighting, cameras, studio props, editing software, DMCA privacy services, promotional ads, dedicated filming room costs, and agency/photographer fees—while everyday clothing, gym memberships, and personal grooming generally do not qualify.',
      },
      {
        q: 'How much should an OnlyFans creator set aside for quarterly taxes?',
        a: 'Because creators pay both 15.3% self-employment tax and federal/state income tax with no employer withholding, setting aside 22% to 32% of net profit (depending on your total income and state tax rate) prevents April surprises and IRS penalties.',
      },
      {
        q: 'Can forming an LLC or S-Corp save taxes for higher-earning creators?',
        a: 'A single-member LLC provides privacy and liability separation without changing federal taxes, whereas electing S-Corp taxation once net profit consistently tops ~$80,000–$100,000+ can save thousands in Social Security and Medicare taxes after paying a reasonable salary.',
      },
    ],
  },
];

export const GIG_PLATFORM_MAP: Record<string, GigPlatformProfile> = Object.fromEntries(
  GIG_PLATFORMS.map((p) => [p.slug, p])
);
