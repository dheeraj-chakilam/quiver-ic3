import React from 'react';
import { Market } from '../types';

interface OrderBookProps {
  market: Market;
}

// Generate mock order book data
const generateOrderBook = (yesPrice: number, noPrice: number) => {
  const yesOrders = [];
  const noOrders = [];
  
  // Generate YES orders
  for (let i = 0; i < 8; i++) {
    const price = yesPrice - (i * 0.02);
    const shares = Math.floor(Math.random() * 5000) + 500;
    yesOrders.push({
      price: Math.max(0.01, price),
      shares,
      total: price * shares
    });
  }
  
  // Generate NO orders
  for (let i = 0; i < 8; i++) {
    const price = noPrice - (i * 0.02);
    const shares = Math.floor(Math.random() * 5000) + 500;
    noOrders.push({
      price: Math.max(0.01, price),
      shares,
      total: price * shares
    });
  }
  
  return { yesOrders, noOrders };
};

const OrderBook: React.FC<OrderBookProps> = ({ market }) => {
  const { yesOrders, noOrders } = generateOrderBook(market.yesPrice, market.noPrice);
  
  const formatPrice = (price: number) => `${(price * 100).toFixed(1)}¢`;
  const formatShares = (shares: number) => shares.toLocaleString();
  const formatTotal = (total: number) => `$${total.toFixed(0)}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Book</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* YES Orders */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-green-600">YES Orders</h4>
            <span className="text-sm text-gray-500">Best: {formatPrice(market.yesPrice)}</span>
          </div>
          
          <div className="space-y-1">
            <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-500 pb-2 border-b border-gray-200">
              <span>Price</span>
              <span className="text-right">Shares</span>
              <span className="text-right">Total</span>
            </div>
            
            {yesOrders.map((order, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-sm py-1 hover:bg-green-50 rounded transition-colors">
                <span className="font-medium text-green-600">{formatPrice(order.price)}</span>
                <span className="text-right text-gray-700">{formatShares(order.shares)}</span>
                <span className="text-right text-gray-700">{formatTotal(order.total)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* NO Orders */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-red-600">NO Orders</h4>
            <span className="text-sm text-gray-500">Best: {formatPrice(market.noPrice)}</span>
          </div>
          
          <div className="space-y-1">
            <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-500 pb-2 border-b border-gray-200">
              <span>Price</span>
              <span className="text-right">Shares</span>
              <span className="text-right">Total</span>
            </div>
            
            {noOrders.map((order, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-sm py-1 hover:bg-red-50 rounded transition-colors">
                <span className="font-medium text-red-600">{formatPrice(order.price)}</span>
                <span className="text-right text-gray-700">{formatShares(order.shares)}</span>
                <span className="text-right text-gray-700">{formatTotal(order.total)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
