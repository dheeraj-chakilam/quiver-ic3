import React from 'react';
import MarketCard from '../components/MarketCard';
import SentimentAnalysis from '../components/SentimentAnalysis';
import TokenInfoCard from '../components/TokenInfoCard';
import { mockMarkets, mockTechnicalIndicators, mockSentimentData, mockTokenInfo } from '../data/mockData';

const HomePage: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Predict the Future of
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-3">
            Crypto
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Make informed predictions on cryptocurrency prices with real-time sentiment analysis, 
          technical indicators, and market intelligence.
        </p>
      </div>

      {/* Markets Section */}
      <section id="markets" className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Active Markets</h2>
          <div className="text-sm text-gray-600">
            {mockMarkets.length} markets available
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {mockMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </section>

      {/* Analysis Section */}
      <section id="analysis" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SentimentAnalysis 
            sentimentData={mockSentimentData} 
            technicalIndicators={mockTechnicalIndicators} 
          />
        </div>
        <div>
          <TokenInfoCard tokenInfo={mockTokenInfo} />
        </div>
      </section>
    </main>
  );
};

export default HomePage;