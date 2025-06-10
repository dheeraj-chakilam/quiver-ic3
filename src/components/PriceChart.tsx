import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Market } from '../types';

interface PriceChartProps {
  market: Market;
}

// Generate mock price data for the chart
export const generatePriceData = (currentPrice: number, targetPrice: number) => {
  const data = [];
  const days = 30;
  const startPrice = currentPrice * 0.85;
  
  for (let i = 0; i < days; i++) {
    const progress = i / (days - 1);
    const volatility = (Math.random() - 0.5) * 0.1;
    const trend = (targetPrice - startPrice) * progress * 0.3;
    const price = startPrice + trend + (startPrice * volatility);
    
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: Math.round(price),
      yes: 0.3 + (progress * 0.4) + (Math.random() * 0.2),
      no: 0.7 - (progress * 0.4) - (Math.random() * 0.2)
    });
  }
  
  return data;
};

const PriceChart: React.FC<PriceChartProps> = ({ market }) => {
  const priceData = generatePriceData(market.currentPrice, market.targetPrice);
  
  return (
    <div className="space-y-6">
      {/* Price Chart */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Price History</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Probability Chart */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Probability</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                domain={[0, 1]}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${(value * 100).toFixed(1)}%`, 
                  name === 'yes' ? 'YES' : 'NO'
                ]}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="yes" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
                name="yes"
              />
              <Line 
                type="monotone" 
                dataKey="no" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={false}
                name="no"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;