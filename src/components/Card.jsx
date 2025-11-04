
// ============================================
// FILE: src/components/Card.jsx
// ============================================
import { FiTrendingUp } from 'react-icons/fi';

const Card = ({ title, value, icon: Icon, trend, trendValue, color = 'blue' }) => {
  const colorClasses = {
    blue: { bg: 'from-blue-500 to-indigo-600', text: 'text-blue-600', light: 'bg-blue-50 dark:bg-blue-900/20' },
    green: { bg: 'from-green-500 to-emerald-600', text: 'text-green-600', light: 'bg-green-50 dark:bg-green-900/20' },
    orange: { bg: 'from-orange-500 to-red-600', text: 'text-orange-600', light: 'bg-orange-50 dark:bg-orange-900/20' },
    purple: { bg: 'from-purple-500 to-pink-600', text: 'text-purple-600', light: 'bg-purple-50 dark:bg-purple-900/20' },
    red: { bg: 'from-red-500 to-rose-600', text: 'text-red-600', light: 'bg-red-50 dark:bg-red-900/20' }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{value}</h3>
          {trend && (
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                trend === 'up' 
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                  : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
              }`}>
                {trend === 'up' ? <FiTrendingUp /> : '↓'} {trendValue}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses[color].bg} rounded-xl flex items-center justify-center shadow-lg`}>
          {Icon && <Icon className="text-white text-2xl" />}
        </div>
      </div>
    </div>
  );
};

export default Card;

