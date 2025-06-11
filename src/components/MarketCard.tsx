import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Market } from '../types';
import { TrendingUp, TrendingDown, Clock, DollarSign, ExternalLink } from 'lucide-react';

interface MarketCardProps {
  market: Market;
}

const MarketCard: React.FC<MarketCardProps> = ({ market }) => {
  const [selectedSide, setSelectedSide] = useState<'yes' | 'no' | null>(null);
  const [betAmount, setBetAmount] = useState('');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num.toFixed(0)}`;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const getTimeUntilDeadline = () => {
    const now = new Date();
    const deadline = new Date(market.deadline);
    const diff = deadline.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {market.tokenSymbol}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{market.tokenName}</h3>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>{formatPrice(market.currentPrice)}</span>
              <span className={`flex items-center ${market.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {market.change24h >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(market.change24h)}%
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <Clock className="h-4 w-4 mr-1" />
            {getTimeUntilDeadline()}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-1" />
            {formatNumber(market.totalVolume)}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-700 text-sm leading-relaxed">{market.description}</p>
        <div className="mt-2 text-xs text-gray-500">
          Target: {formatPrice(market.targetPrice)} • Current: {formatPrice(market.currentPrice)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => setSelectedSide(selectedSide === 'yes' ? null : 'yes')}
          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
            selectedSide === 'yes'
              ? 'border-green-500 bg-green-50 shadow-md scale-105'
              : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
          }`}
        >
          <div className="text-center">
            <div className="font-semibold text-green-600 text-lg">YES</div>
            <div className="text-2xl font-bold text-gray-900">{(market.yesPrice * 100).toFixed(0)}¢</div>
            <div className="text-xs text-gray-500 mt-1">
              {formatNumber(market.yesShares)} shares
            </div>
          </div>
        </button>
        
        <button
          onClick={() => setSelectedSide(selectedSide === 'no' ? null : 'no')}
          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
            selectedSide === 'no'
              ? 'border-red-500 bg-red-50 shadow-md scale-105'
              : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
          }`}
        >
          <div className="text-center">
            <div className="font-semibold text-red-600 text-lg">NO</div>
            <div className="text-2xl font-bold text-gray-900">{(market.noPrice * 100).toFixed(0)}¢</div>
            <div className="text-xs text-gray-500 mt-1">
              {formatNumber(market.noShares)} shares
            </div>
          </div>
        </button>
      </div>

      {selectedSide && (
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Betting {selectedSide.toUpperCase()}</span>
            <span className={`text-sm font-medium ${selectedSide === 'yes' ? 'text-green-600' : 'text-red-600'}`}>
              {selectedSide === 'yes' ? (market.yesPrice * 100).toFixed(0) : (market.noPrice * 100).toFixed(0)}¢ per share
            </span>
          </div>
          
          <input
            type="number"
            placeholder="Enter amount ($)"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {betAmount && (
            <div className="text-sm text-gray-600">
              You'll receive ~{Math.floor(
                parseFloat(betAmount) /
                  (selectedSide === 'yes' ? market.yesPrice : market.noPrice)
              )}{' '}
              shares
            </div>
          )}
          
          <button
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              selectedSide === 'yes'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            Place Bet
          </button>
        </div>
      )}

      <Link
        to={`/markets/${market.slug}`}
        className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <span className="mr-2">View Details</span>
        <ExternalLink className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default MarketCard;
