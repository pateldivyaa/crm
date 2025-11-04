import { FiUsers, FiUserPlus, FiDollarSign, FiTrendingUp, FiPackage, FiAlertCircle } from 'react-icons/fi';
import Card from '../components/Card';
import Chart from '../components/Chart';
import { clientsData } from '../api/clientData';
import { leadsData } from '../api/leadData';
import { invoicesData } from '../api/invoiceData';
import { productsData } from '../api/productData';

const Dashboard = () => {
  const totalClients = clientsData.length;
  const totalLeads = leadsData.length;
  const totalRevenue = invoicesData.reduce((sum, inv) => sum + inv.total, 0);
  const activeClients = clientsData.filter(c => c.status === 'Active').length;
  const lowStockProducts = productsData.filter(p => p.stock <= p.minStock).length;

  const salesData = [
    { month: 'Jan', revenue: 185000 },
    { month: 'Feb', revenue: 245000 },
    { month: 'Mar', revenue: 195000 },
    { month: 'Apr', revenue: 265000 },
    { month: 'May', revenue: 310000 },
    { month: 'Jun', revenue: 285000 }
  ];

  const categoryData = [
    { category: 'Panel Boards', sales: 450000 },
    { category: 'Cables', sales: 620000 },
    { category: 'Lighting', sales: 380000 },
    { category: 'Wires', sales: 290000 },
    { category: 'Accessories', sales: 145000 }
  ];

  const recentActivities = [
    { id: 1, text: 'New quotation created for Rajesh Enterprises', time: '10 mins ago', type: 'quotation' },
    { id: 2, text: 'Invoice INV-2025-001 marked as paid', time: '1 hour ago', type: 'payment' },
    { id: 3, text: 'New lead added: Amit Patel', time: '2 hours ago', type: 'lead' },
    { id: 4, text: 'Low stock alert: MCB Panel Board', time: '3 hours ago', type: 'alert' },
    { id: 5, text: 'Client Gujarat Electricals updated', time: '5 hours ago', type: 'update' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, here's your overview</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Clients"
          value={totalClients}
          icon={FiUsers}
          trend="up"
          trendValue="12%"
          color="blue"
        />
        <Card
          title="Active Leads"
          value={totalLeads}
          icon={FiUserPlus}
          trend="up"
          trendValue="8%"
          color="green"
        />
        <Card
          title="Total Revenue"
          value={`₹${(totalRevenue / 100000).toFixed(2)}L`}
          icon={FiDollarSign}
          trend="up"
          trendValue="23%"
          color="orange"
        />
        <Card
          title="Active Clients"
          value={activeClients}
          icon={FiTrendingUp}
          trend="down"
          trendValue="3%"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          type="line"
          data={salesData}
          xKey="month"
          yKey="revenue"
          title="Revenue Trends"
          color="#3b82f6"
        />
        <Chart
          type="bar"
          data={categoryData}
          xKey="category"
          yKey="sales"
          title="Sales by Category"
          color="#10b981"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div className={`w-2 h-2 mt-2 rounded-full ${
                  activity.type === 'payment' ? 'bg-green-500' :
                  activity.type === 'alert' ? 'bg-red-500' :
                  activity.type === 'lead' ? 'bg-blue-500' : 'bg-gray-400'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-800 dark:text-gray-200">{activity.text}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <FiAlertCircle className="text-red-600 dark:text-red-400 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Low Stock Alert</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{lowStockProducts} products</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {lowStockProducts} products are running low on stock. Reorder soon to avoid shortages.
            </p>
            <button className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition text-sm font-medium">
              View Details
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <FiPackage className="text-2xl" />
              <h3 className="font-semibold">Quick Actions</h3>
            </div>
            <div className="space-y-2">
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg transition text-sm font-medium">
                Create Quotation
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg transition text-sm font-medium">
                Add New Client
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg transition text-sm font-medium">
                Generate Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
