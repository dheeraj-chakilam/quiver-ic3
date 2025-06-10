import React from 'react';
// Market data is generated locally for demo purposes
import { TrendingUp, TrendingDown, Clock, User } from 'lucide-react';


interface ActivityItem {
  id: string;
  type: 'buy' | 'sell';
  side: 'yes' | 'no';
  user: string;
  shares: number;
  price: number;
  timestamp: Date;
}

// Generate mock activity data
const generateActivity = (): ActivityItem[] => {
  const activities: ActivityItem[] = [];
  const users = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
  
  for (let i = 0; i < 20; i++) {
    const timestamp = new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000);
    activities.push({
      id: `activity-${i}`,
      type: Math.random() > 0.5 ? 'buy' : 'sell',
      side: Math.random() > 0.5 ? 'yes' : 'no',
      user: users[Math.floor(Math.random() * users.length)],
      shares: Math.floor(Math.random() * 5000) + 100,
      price: 0.3 + Math.random() * 0.4,
      timestamp
    });
  }
  
  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

const MarketActivity: React.FC = () => {
  const activities = generateActivity();
  
  const formatPrice = (price: number) => `${(price * 100).toFixed(1)}¢`;
  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <div className="text-sm text-gray-500">Last 24 hours</div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.type === 'buy' 
                  ? activity.side === 'yes' ? 'bg-green-100' : 'bg-red-100'
                  : 'bg-gray-200'
              }`}>
                {activity.type === 'buy' ? (
                  activity.side === 'yes' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )
                ) : (
                  <User className="h-4 w-4 text-gray-600" />
                )}
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{activity.user}</span>
                  <span className="text-sm text-gray-600">
                    {activity.type === 'buy' ? 'bought' : 'sold'}
                  </span>
                  <span className={`text-sm font-medium ${
                    activity.side === 'yes' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {activity.shares.toLocaleString()} {activity.side.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{formatTime(activity.timestamp)}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-medium text-gray-900">
                {formatPrice(activity.price)}
              </div>
              <div className="text-xs text-gray-500">
                ${(activity.shares * activity.price).toFixed(0)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Load more activity
        </button>
      </div>
    </div>
  );
};

export default MarketActivity;