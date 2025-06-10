export interface Market {
  id: string;
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