export type FilingStatus = 'single' | 'mfj' | 'hoh';

export interface TaxBracket {
  upTo: number | null;
  rate: number;
}

export const FILING_STATUS_LABELS: Record<FilingStatus, string> = {
  single: 'Single',
  mfj: 'Married Filing Jointly',
  hoh: 'Head of Household',
};

export const FEDERAL_STANDARD_DEDUCTION_2026: Record<FilingStatus, number> = {
  single: 16100,
  mfj: 32200,
  hoh: 24150,
};

export const FEDERAL_BRACKETS_2026: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { upTo: 12400, rate: 0.10 },
    { upTo: 50400, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 },
    { upTo: 256225, rate: 0.32 },
    { upTo: 640600, rate: 0.35 },
    { upTo: null, rate: 0.37 },
  ],
  mfj: [
    { upTo: 24800, rate: 0.10 },
    { upTo: 100800, rate: 0.12 },
    { upTo: 211400, rate: 0.22 },
    { upTo: 403550, rate: 0.24 },
    { upTo: 512450, rate: 0.32 },
    { upTo: 768700, rate: 0.35 },
    { upTo: null, rate: 0.37 },
  ],
  hoh: [
    { upTo: 17700, rate: 0.10 },
    { upTo: 67450, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201750, rate: 0.24 },
    { upTo: 256200, rate: 0.32 },
    { upTo: 640600, rate: 0.35 },
    { upTo: null, rate: 0.37 },
  ],
};

export const SE_TAX_CONSTANTS_2026 = {
  netEarningsFactor: 0.9235,
  socialSecurityRate: 0.124,
  socialSecurityWageCap: 184500,
  medicareRate: 0.029,
  additionalMedicareRate: 0.009,
  additionalMedicareThreshold: {
    single: 200000,
    mfj: 250000,
    hoh: 200000,
  } as Record<FilingStatus, number>,
  employerFicaRate: 0.0765,
};

export const QUARTERLY_DEADLINES_2026 = [
  { quarter: 'Q1 2026', period: 'Jan 1 – Mar 31, 2026', dueDate: 'April 15, 2026', note: 'First federal & state estimated installment.' },
  { quarter: 'Q2 2026', period: 'Apr 1 – May 31, 2026', dueDate: 'June 15, 2026', note: 'Covers a 2-month income window before summer.' },
  { quarter: 'Q3 2026', period: 'Jun 1 – Aug 31, 2026', dueDate: 'September 15, 2026', note: 'Third quarterly installment for 1099 contractors.' },
  { quarter: 'Q4 2026', period: 'Sep 1 – Dec 31, 2026', dueDate: 'January 15, 2027', note: 'Final 2026 estimated installment (or file & pay by Feb 1).' },
];
