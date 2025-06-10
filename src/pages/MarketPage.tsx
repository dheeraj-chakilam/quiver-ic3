import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Clock, DollarSign, Users, BarChart3, Activity } from 'lucide-react';
import { mockMarkets } from '../data/mockData';
import PriceChart from '../components/PriceChart';
import OrderBook from '../components/OrderBook';
import TradingInterface from '../components/TradingInterface';
import MarketActivity from '../components/MarketActivity';

const MarketPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const market = mockMarkets.find(m => m.id === id);
  const [activeTab, setActiveTab] = useState<'chart' | 'activity'>('chart');

  if (!market) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Market Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to Markets
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num.toFixed(0)}`;
  };

  const getTimeUntilDeadline = () => {
    const now = new Date();
    const deadline = new Date(market.deadline);
    const diff = deadline.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Markets
        </Link>
      </div>

      {/* Market Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {market.tokenSymbol}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{market.description}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Ends in {getTimeUntilDeadline()}
                </span>
                <span className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {formatNumber(market.totalVolume)} volume
                </span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {Math.floor(Math.random() * 500 + 100)} traders
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Current Price</div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">{formatPrice(market.currentPrice)}</span>
                <span className={`flex items-center text-sm font-medium ${
                  market.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {market.change24h >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {Math.abs(market.change24h)}%
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Target Price</div>
              <div className="text-2xl font-bold text-gray-900">{formatPrice(market.targetPrice)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Chart and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart/Activity Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('chart')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'chart'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <BarChart3 className="h-4 w-4 inline mr-2" />
                  Price Chart
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'activity'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Activity className="h-4 w-4 inline mr-2" />
                  Market Activity
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'chart' ? (
                <PriceChart market={market} />
              ) : (
                <MarketActivity />
              )}
            </div>
          </div>

          {/* Order Book */}
          <OrderBook market={market} />
        </div>

        {/* Right Column - Trading Interface */}
        <div>
          <TradingInterface market={market} />
        </div>
      </div>
    </div>
  );
};

export default MarketPage;
