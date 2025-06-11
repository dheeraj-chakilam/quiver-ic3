import { Market, TechnicalIndicator, SentimentData, TokenInfo } from '../types';

export const mockMarkets: Market[] = [
  {
    id: '1',
    slug: 'bitcoin-70k-dec-31-2024',
    tokenSymbol: 'BTC',
    tokenName: 'Bitcoin',
    currentPrice: 67423,
    targetPrice: 70000,
    deadline: '2024-12-31T23:59:59Z',
    totalVolume: 2450000,
    yesShares: 1200000,
    noShares: 1250000,
    yesPrice: 0.52,
    noPrice: 0.48,
    description: 'Will Bitcoin reach $70,000 by December 31, 2024?',
    change24h: 2.4,
    outcomes: [
      { label: '>110k', probability: 0.35, shares: 500000 },
      { label: '100-110k', probability: 0.25, shares: 400000 },
      { label: '90-100k', probability: 0.2, shares: 300000 },
      { label: '<90k', probability: 0.2, shares: 350000 }
    ]
  },
  {
    id: '2',
    slug: 'ethereum-4k-nov-30-2024',
    tokenSymbol: 'ETH',
    tokenName: 'Ethereum',
    currentPrice: 3456,
    targetPrice: 4000,
    deadline: '2024-11-30T23:59:59Z',
    totalVolume: 890000,
    yesShares: 520000,
    noShares: 370000,
    yesPrice: 0.58,
    noPrice: 0.42,
    description: 'Will Ethereum reach $4,000 by November 30, 2024?',
    change24h: -1.2,
    outcomes: [
      { label: '>4k', probability: 0.4, shares: 200000 },
      { label: '3.5k-4k', probability: 0.3, shares: 150000 },
      { label: '3k-3.5k', probability: 0.2, shares: 100000 },
      { label: '<3k', probability: 0.1, shares: 80000 }
    ]
  },
  {
    id: '3',
    slug: 'solana-250-oct-15-2024',
    tokenSymbol: 'SOL',
    tokenName: 'Solana',
    currentPrice: 178,
    targetPrice: 250,
    deadline: '2024-10-15T23:59:59Z',
    totalVolume: 340000,
    yesShares: 180000,
    noShares: 160000,
    yesPrice: 0.53,
    noPrice: 0.47,
    description: 'Will Solana reach $250 by October 15, 2024?',
    change24h: 5.7,
    outcomes: [
      { label: '>250', probability: 0.3, shares: 120000 },
      { label: '200-250', probability: 0.4, shares: 100000 },
      { label: '150-200', probability: 0.2, shares: 80000 },
      { label: '<150', probability: 0.1, shares: 40000 }
    ]
  }
];

export const mockTechnicalIndicators: TechnicalIndicator[] = [
  {
    name: 'RSI (14)',
    value: '67.2',
    signal: 'neutral',
    description: 'Relative Strength Index indicates moderate momentum'
  },
  {
    name: 'MACD',
    value: '1,234.5',
    signal: 'bullish',
    description: 'Moving Average Convergence Divergence shows bullish crossover'
  },
  {
    name: 'SMA (50)',
    value: '65,890',
    signal: 'bullish',
    description: 'Simple Moving Average indicates upward trend'
  },
  {
    name: 'Support/Resistance',
    value: '66,500 / 68,200',
    signal: 'neutral',
    description: 'Key price levels for technical analysis'
  }
];

export const mockSentimentData: SentimentData = {
  overall: 72,
  social: 68,
  technical: 75,
  news: 70
};

export const mockTokenInfo: TokenInfo = {
  symbol: 'BTC',
  name: 'Bitcoin',
  currentPrice: 67423,
  marketCap: 1330000000000,
  volume24h: 28500000000,
  change24h: 2.4,
  description: 'Bitcoin is the first and largest cryptocurrency by market capitalization. It operates on a decentralized peer-to-peer network and serves as digital gold and a store of value.'
};
