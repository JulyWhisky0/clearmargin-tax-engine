import type { PlatformProfile, PlatformTierOption } from '../data/platforms.js';

export interface PlatformFeeInput {
  salePrice: number;
  shippingChargedToBuyer?: number;
  cogs?: number;
  sellerShippingCost?: number;
  tierId?: string;
  addonIds?: string[];
}

export interface PlatformFeeResult {
  grossRevenue: number;
  salePrice: number;
  shippingChargedToBuyer: number;
  platformFee: number;
  processingFee: number;
  addonFees: number;
  totalPlatformFees: number;
  cogs: number;
  sellerShippingCost: number;
  netProfit: number;
  effectiveFeeRate: number;
  profitMargin: number;
  roiOnCogs: number | null;
}

function cleanNonNeg(val: number | undefined): number {
  return typeof val === 'number' && Number.isFinite(val) && val > 0 ? val : 0;
}

export function resolveTier(
  platform: PlatformProfile,
  tierId?: string
): PlatformTierOption {
  if (tierId) {
    const found = platform.tiers.find((t) => t.id === tierId);
    if (found) return found;
  }
  return platform.tiers[0];
}

export function calculatePlatformFees(
  platform: PlatformProfile,
  input: PlatformFeeInput
): PlatformFeeResult {
  const salePrice = cleanNonNeg(input.salePrice);
  const shippingChargedToBuyer = cleanNonNeg(input.shippingChargedToBuyer);
  const grossRevenue = salePrice + shippingChargedToBuyer;
  const cogs = cleanNonNeg(input.cogs);
  const sellerShippingCost = cleanNonNeg(input.sellerShippingCost);
  const tier = resolveTier(platform, input.tierId);
  const activeAddons = new Set(input.addonIds ?? []);

  if (grossRevenue <= 0) {
    return {
      grossRevenue: 0,
      salePrice: 0,
      shippingChargedToBuyer: 0,
      platformFee: 0,
      processingFee: 0,
      addonFees: 0,
      totalPlatformFees: 0,
      cogs,
      sellerShippingCost,
      netProfit: -(cogs + sellerShippingCost),
      effectiveFeeRate: 0,
      profitMargin: 0,
      roiOnCogs: null,
    };
  }

  let platformFee = 0;
  if (
    tier.underAmountThreshold !== undefined &&
    tier.underAmountFlatFee !== undefined &&
    grossRevenue < tier.underAmountThreshold
  ) {
    platformFee = tier.underAmountFlatFee;
  } else {
    platformFee = grossRevenue * tier.platformPct + (tier.platformFixed ?? 0);
    if (tier.platformMin !== undefined) {
      platformFee = Math.max(platformFee, tier.platformMin);
    }
  }

  let processingFee =
    grossRevenue * (tier.processingPct ?? 0) + (tier.processingFixed ?? 0);

  if (tier.feeCap !== undefined) {
    if (tier.platformPct > 0 && (tier.processingPct ?? 0) === 0) {
      platformFee = Math.min(platformFee, tier.feeCap);
    } else if ((tier.processingPct ?? 0) > 0 && tier.platformPct === 0) {
      processingFee = Math.min(processingFee, tier.feeCap);
    }
  }

  let addonFees = 0;
  for (const addon of platform.addons) {
    if (activeAddons.has(addon.id)) {
      addonFees += grossRevenue * addon.pct + (addon.fixed ?? 0);
    }
  }

  const totalPlatformFees = platformFee + processingFee + addonFees;
  const netProfit = grossRevenue - totalPlatformFees - cogs - sellerShippingCost;

  return {
    grossRevenue,
    salePrice,
    shippingChargedToBuyer,
    platformFee,
    processingFee,
    addonFees,
    totalPlatformFees,
    cogs,
    sellerShippingCost,
    netProfit,
    effectiveFeeRate: grossRevenue > 0 ? totalPlatformFees / grossRevenue : 0,
    profitMargin: grossRevenue > 0 ? netProfit / grossRevenue : 0,
    roiOnCogs: cogs > 0 ? netProfit / cogs : null,
  };
}

/**
 * Exact reverse-pricing solver: finds the smallest gross sale price P (to $0.01)
 * whose netProfit meets or exceeds desiredNetProfit.
 * Handles discontinuous fee cliffs (e.g., Poshmark's $15 cliff) and $5 minimums cleanly.
 */
export function solveRequiredListingPrice(
  platform: PlatformProfile,
  desiredNetProfit: number,
  options: Omit<PlatformFeeInput, 'salePrice'>
): { requiredSalePrice: number; breakdown: PlatformFeeResult } {
  const target = Number.isFinite(desiredNetProfit) ? desiredNetProfit : 0;
  const shippingBuyer = cleanNonNeg(options.shippingChargedToBuyer);
  const cogs = cleanNonNeg(options.cogs);
  const sellerShipping = cleanNonNeg(options.sellerShippingCost);
  const tier = resolveTier(platform, options.tierId);

  const evalPrice = (p: number) =>
    calculatePlatformFees(platform, {
      ...options,
      salePrice: p,
    });

  // Search continuous bracket using binary search for exact monotonic upper bound
  let lo = 0;
  let hi = Math.max(100, (Math.max(0, target) + cogs + sellerShipping + 50) * 3);

  while (evalPrice(hi).netProfit < target && hi < 10_000_000) {
    hi *= 2;
  }

  for (let i = 0; i < 64; i++) {
    const mid = (lo + hi) / 2;
    if (evalPrice(mid).netProfit >= target) {
      hi = mid;
    } else {
      lo = mid;
    }
  }

  let candidate = Math.ceil(hi * 100) / 100;

  // Special check for discontinuous cliff thresholds (like Poshmark $15 cliff):
  // If binary search crossed above the cliff, check just below the cliff threshold in case a lower price achieves >= target!
  if (
    tier.underAmountThreshold !== undefined &&
    tier.underAmountFlatFee !== undefined
  ) {
    const belowCliffPrice = Math.max(
      0.01,
      Math.round((tier.underAmountThreshold - shippingBuyer - 0.01) * 100) / 100
    );
    if (belowCliffPrice > 0 && evalPrice(belowCliffPrice).netProfit >= target) {
      // Binary search strictly inside [0, belowCliffPrice]
      let cLo = 0;
      let cHi = belowCliffPrice;
      for (let i = 0; i < 48; i++) {
        const mid = (cLo + cHi) / 2;
        if (evalPrice(mid).netProfit >= target) {
          cHi = mid;
        } else {
          cLo = mid;
        }
      }
      const lowerValid = Math.ceil(cHi * 100) / 100;
      if (lowerValid < candidate && evalPrice(lowerValid).netProfit >= target) {
        candidate = lowerValid;
      }
    }
  }

  // Step down 1 cent if rounding bumped it 1 cent above necessary
  if (candidate > 0.01 && evalPrice(Math.round((candidate - 0.01) * 100) / 100).netProfit >= target) {
    candidate = Math.round((candidate - 0.01) * 100) / 100;
  }

  return {
    requiredSalePrice: candidate,
    breakdown: evalPrice(candidate),
  };
}
