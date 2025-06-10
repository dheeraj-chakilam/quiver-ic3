import React from 'react';
import { TokenInfo } from '../types';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

interface TokenInfoCardProps {
  tokenInfo: TokenInfo;
}

const TokenInfoCard: React.FC<TokenInfoCardProps> = ({ tokenInfo }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Info className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Token Information</h2>
      </div>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {tokenInfo.symbol}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{tokenInfo.name}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-gray-700">
              {tokenInfo.currentPrice.toLocaleString('en-US', { 
                style: 'currency', 
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}
            </span>
            <span className={`flex items-center text-sm font-medium ${
              tokenInfo.change24h >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {tokenInfo.change24h >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {Math.abs(tokenInfo.change24h)}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Market Cap</div>
          <div className="text-lg font-bold text-gray-900">{formatNumber(tokenInfo.marketCap)}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">24h Volume</div>
          <div className="text-lg font-bold text-gray-900">{formatNumber(tokenInfo.volume24h)}</div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">About {tokenInfo.name}</h4>
        <p className="text-sm text-gray-700 leading-relaxed">{tokenInfo.description}</p>
      </div>
    </div>
  );
};

export default TokenInfoCard;
