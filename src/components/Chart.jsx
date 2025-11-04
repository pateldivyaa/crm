
// ============================================
// FILE: src/components/Chart.jsx
// ============================================
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ type = 'line', data, xKey, yKey, title, color = '#3b82f6' }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={300}>
        {type === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis dataKey={xKey} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '0.75rem',
                color: '#fff'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={3} />
          </LineChart>
        ) : type === 'area' ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis dataKey={xKey} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '0.75rem',
                color: '#fff'
              }}
            />
            <Area type="monotone" dataKey={yKey} stroke={color} fillOpacity={1} fill="url(#colorGradient)" strokeWidth={3} />
          </AreaChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis dataKey={xKey} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '0.75rem',
                color: '#fff'
              }}
            />
            <Legend />
            <Bar dataKey={yKey} fill={color} radius={[8, 8, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
