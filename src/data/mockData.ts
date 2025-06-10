import { Market, TechnicalIndicator, SentimentData, TokenInfo } from '../types';

export const mockMarkets: Market[] = [
  {
    id: '1',
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
    change24h: 2.4
  },
  {
    id: '2',
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
    change24h: -1.2
  },
  {
    id: '3',
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
    change24h: 5.7
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