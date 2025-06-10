import React from 'react';
import { TrendingUp, Brain, BarChart3 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Quiver</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#markets" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <BarChart3 className="h-4 w-4" />
              <span>Markets</span>
            </a>
            <a href="#analysis" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <Brain className="h-4 w-4" />
              <span>Analysis</span>
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
