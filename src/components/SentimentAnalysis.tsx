import React from 'react';
import { SentimentData, TechnicalIndicator } from '../types';
import { TrendingUp, TrendingDown, Minus, Brain, Activity, MessageSquare, Newspaper } from 'lucide-react';

interface SentimentAnalysisProps {
  sentimentData: SentimentData;
  technicalIndicators: TechnicalIndicator[];
}

const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({ sentimentData, technicalIndicators }) => {
  const getSentimentColor = (score: number) => {
    if (score >= 70) return 'text-green-600 bg-green-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSentimentLabel = (score: number) => {
    if (score >= 70) return 'Bullish';
    if (score >= 40) return 'Neutral';
    return 'Bearish';
  };

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'bullish':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'bearish':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'bullish':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'bearish':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Sentiment */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Market Sentiment</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getSentimentColor(sentimentData.overall)} mb-2`}>
              <span className="text-2xl font-bold">{sentimentData.overall}</span>
            </div>
            <div className="text-sm font-medium text-gray-700">Overall</div>
            <div className={`text-xs font-medium ${getSentimentColor(sentimentData.overall).split(' ')[0]}`}>
              {getSentimentLabel(sentimentData.overall)}
            </div>
          </div>
          
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getSentimentColor(sentimentData.social)} mb-2`}>
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className="text-sm font-medium text-gray-700">Social</div>
            <div className="text-lg font-bold text-gray-900">{sentimentData.social}</div>
          </div>
          
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getSentimentColor(sentimentData.technical)} mb-2`}>
              <Activity className="h-6 w-6" />
            </div>
            <div className="text-sm font-medium text-gray-700">Technical</div>
            <div className="text-lg font-bold text-gray-900">{sentimentData.technical}</div>
          </div>
          
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getSentimentColor(sentimentData.news)} mb-2`}>
              <Newspaper className="h-6 w-6" />
            </div>
            <div className="text-sm font-medium text-gray-700">News</div>
            <div className="text-lg font-bold text-gray-900">{sentimentData.news}</div>
          </div>
        </div>
      </div>

      {/* Technical Indicators */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Technical Indicators</h2>
        </div>
        
        <div className="space-y-3">
          {technicalIndicators.map((indicator, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getSignalColor(indicator.signal)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getSignalIcon(indicator.signal)}
                  <span className="font-semibold text-gray-900">{indicator.name}</span>
                </div>
                <span className="font-bold text-gray-900">{indicator.value}</span>
              </div>
              <p className="text-sm text-gray-600">{indicator.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysis;