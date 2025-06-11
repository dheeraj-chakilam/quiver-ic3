export interface Market {
  id: string;
  /**
   * Human readable identifier used in URLs.
   */
  slug: string;
  tokenSymbol: string;
  tokenName: string;
  currentPrice: number;
  targetPrice: number;
  deadline: string;
  totalVolume: number;
  yesShares: number;
  noShares: number;
  yesPrice: number;
  noPrice: number;
  description: string;
  change24h: number;
  /**
   * Optional multi-outcome structure for ranged prediction markets.
   */
  outcomes?: Outcome[];
}

export interface Outcome {
  label: string;
  /**
   * Implied probability expressed as a decimal between 0 and 1.
   */
  probability: number;
  shares: number;
}

export interface TechnicalIndicator {
  name: string;
  value: string;
  signal: 'bullish' | 'bearish' | 'neutral';
  description: string;
}

export interface SentimentData {
  overall: number;
  social: number;
  technical: number;
  news: number;
}

export interface TokenInfo {
  symbol: string;
  name: string;
  currentPrice: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
  description: string;
}
