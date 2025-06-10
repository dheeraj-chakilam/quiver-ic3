import React, { useState } from 'react';
import { Market } from '../types';
import { TrendingUp, TrendingDown, Calculator, Wallet } from 'lucide-react';

interface TradingInterfaceProps {
  market: Market;
}

const TradingInterface: React.FC<TradingInterfaceProps> = ({ market }) => {
  const [selectedSide, setSelectedSide] = useState<'yes' | 'no'>('yes');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');

  const currentPrice = selectedSide === 'yes' ? market.yesPrice : market.noPrice;
  const shares = amount ? Math.floor(parseFloat(amount) / currentPrice) : 0;
  const potentialPayout = shares * 1; // $1 per share if correct
  const potentialProfit = potentialPayout - parseFloat(amount || '0');

  const formatPrice = (price: number) => `${(price * 100).toFixed(1)}¢`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Place Order</h3>
      </div>

      {/* Side Selection */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => setSelectedSide('yes')}
          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
            selectedSide === 'yes'
              ? 'border-green-500 bg-green-50 shadow-md'
              : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
          }`}
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-green-600 mr-1" />
              <span className="font-semibold text-green-600">YES</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{formatPrice(market.yesPrice)}</div>
            <div className="text-xs text-gray-500 mt-1">
              {((market.yesPrice) * 100).toFixed(0)}% implied
            </div>
          </div>
        </button>
        
        <button
          onClick={() => setSelectedSide('no')}
          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
            selectedSide === 'no'
              ? 'border-red-500 bg-red-50 shadow-md'
              : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
          }`}
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingDown className="h-5 w-5 text-red-600 mr-1" />
              <span className="font-semibold text-red-600">NO</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{formatPrice(market.noPrice)}</div>
            <div className="text-xs text-gray-500 mt-1">
              {((market.noPrice) * 100).toFixed(0)}% implied
            </div>
          </div>
        </button>
      </div>

      {/* Order Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setOrderType('market')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              orderType === 'market'
                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
            }`}
          >
            Market
          </button>
          <button
            onClick={() => setOrderType('limit')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              orderType === 'limit'
                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
            }`}
          >
            Limit
          </button>
        </div>
      </div>

      {/* Limit Price Input */}
      {orderType === 'limit' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Limit Price</label>
          <div className="relative">
            <input
              type="number"
              placeholder="0.00"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
              step="0.01"
              min="0.01"
              max="0.99"
            />
            <span className="absolute right-3 top-2 text-gray-500 text-sm">¢</span>
          </div>
        </div>
      )}

      {/* Amount Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
        <div className="relative">
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-8"
            step="0.01"
            min="0.01"
          />
          <span className="absolute left-3 top-2 text-gray-500">$</span>
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {['10', '25', '50', '100'].map((value) => (
          <button
            key={value}
            onClick={() => setAmount(value)}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            ${value}
          </button>
        ))}
      </div>

      {/* Order Summary */}
      {amount && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shares</span>
            <span className="font-medium">{shares.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Avg Price</span>
            <span className="font-medium">{formatPrice(currentPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Max Payout</span>
            <span className="font-medium">${potentialPayout.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
            <span className="text-gray-600">Potential Profit</span>
            <span className={`font-medium ${potentialProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${potentialProfit.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Place Order Button */}
      <button
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          selectedSide === 'yes'
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
        disabled={parseFloat(amount) <= 0}
      >
        <Wallet className="h-4 w-4 inline mr-2" />
        Buy {selectedSide.toUpperCase()} for ${amount || '0.00'}
      </button>

      {/* Balance Info */}
      <div className="mt-4 text-center text-sm text-gray-500">
        <span>Balance: $1,234.56</span>
      </div>
    </div>
  );
};

export default TradingInterface;