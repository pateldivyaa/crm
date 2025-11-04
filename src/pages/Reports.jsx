import { useState } from 'react';
import { FiDownload, FiCalendar, FiDollarSign, FiTrendingUp, FiBarChart2, FiFileText, FiUsers, FiPackage } from 'react-icons/fi';

const invoicesData = [
  { id: 'INV-2025-001', clientName: 'Gujarat Electricals', date: '2025-01-15', total: 100000, status: 'Paid' },
  { id: 'INV-2025-002', clientName: 'Rajesh Enterprises', date: '2025-01-20', total: 50000, status: 'Pending' },
  { id: 'INV-2025-003', clientName: 'Priya Industries', date: '2025-01-10', total: 150000, status: 'Overdue' }
];

const clientsData = [
  { name: 'Amit Trading Co.', totalOrders: 56, totalRevenue: 560000, status: 'Active' },
  { name: 'Gujarat Electricals', totalOrders: 45, totalRevenue: 450000, status: 'Active' },
  { name: 'Rajesh Enterprises', totalOrders: 32, totalRevenue: 320000, status: 'Active' },
  { name: 'Tech Solutions Ltd', totalOrders: 28, totalRevenue: 280000, status: 'Active' },
  { name: 'Priya Industries', totalOrders: 18, totalRevenue: 180000, status: 'Inactive' }
];

const monthlySales = [
  { month: 'Jun', sales: 285000, orders: 28 },
  { month: 'Jul', sales: 320000, orders: 32 },
  { month: 'Aug', sales: 295000, orders: 29 },
  { month: 'Sep', sales: 340000, orders: 35 },
  { month: 'Oct', sales: 375000, orders: 38 },
  { month: 'Nov', sales: 195000, orders: 15 }
];

const topProducts = [
  { name: '4 Core Armoured Cable', revenue: 620000, qty: 5200 },
  { name: 'MCB Panel Board', revenue: 450000, qty: 53 },
  { name: 'LED Panel Light 40W', revenue: 380000, qty: 850 },
  { name: 'Copper Wire 2.5mm', revenue: 290000, qty: 3400 },
  { name: 'Street Light LED 100W', revenue: 250000, qty: 100 }
];

const Reports = () => {
  const [dateFrom, setDateFrom] = useState('2025-01-01');
  const [dateTo, setDateTo] = useState('2025-11-03');
  const [reportType, setReportType] = useState('Sales');

  const totalRevenue = invoicesData.reduce((sum, inv) => sum + inv.total, 0);
  const paidRevenue = invoicesData.filter(i => i.status === 'Paid').reduce((sum, inv) => sum + inv.total, 0);
  const pendingRevenue = totalRevenue - paidRevenue;
  const totalOrders = monthlySales.reduce((sum, m) => sum + m.orders, 0);

  const handleExportExcel = () => {
    // Import xlsx dynamically to reduce initial bundle size
    import('xlsx')
      .then((XLSX) => {
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        
        // Prepare data for export
        const reportData = [
          ['Report Type', 'Date Range', 'Generated On'],
          [reportType, `${dateFrom} to ${dateTo}`, new Date().toLocaleDateString()],
          [], // Empty row for spacing
          ['Revenue Summary', '', ''],
          ['Total Revenue', `₹${totalRevenue.toLocaleString('en-IN')}`, ''],
          ['Paid Amount', `₹${paidRevenue.toLocaleString('en-IN')}`, ''],
          ['Pending Amount', `₹${pendingRevenue.toLocaleString('en-IN')}`, ''],
          [], // Empty row for spacing
          ['Monthly Sales', 'Amount (₹)', 'Orders'],
          ...monthlySales.map(item => [
            item.month,
            item.sales.toLocaleString('en-IN'),
            item.orders
          ]),
          [], // Empty row for spacing
          ['Top Products', 'Revenue (₹)', 'Quantity'],
          ...topProducts.map(item => [
            item.name,
            item.revenue.toLocaleString('en-IN'),
            item.qty
          ]),
          [], // Empty row for spacing
          ['Top Clients', 'Revenue (₹)', 'Orders', 'Status'],
          ...topClients.map(item => [
            item.name,
            item.totalRevenue.toLocaleString('en-IN'),
            item.totalOrders,
            item.status
          ]),
          [], // Empty row for spacing
          ['Recent Invoices', 'Client', 'Date', 'Amount', 'Status'],
          ...invoicesData.map(invoice => [
            invoice.id,
            invoice.clientName,
            new Date(invoice.date).toLocaleDateString('en-IN'),
            `₹${invoice.total.toLocaleString('en-IN')}`,
            invoice.status
          ])
        ];

        // Convert array of arrays to worksheet
        const ws = XLSX.utils.aoa_to_sheet(reportData);
        
        // Set column widths
        const wscols = [
          { wch: 25 }, // Column A: Name/ID
          { wch: 20 }, // Column B: Client/Amount
          { wch: 15 }, // Column C: Date/Orders/Status
          { wch: 15 }, // Column D: Amount/Status
          { wch: 15 }  // Column E: Status (for invoices)
        ];
        ws['!cols'] = wscols;
        
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Sales Report');
        
        // Generate the Excel file
        const fileName = `Sales_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
        
        alert('Excel report exported successfully!');
      })
      .catch(error => {
        console.error('Error exporting to Excel:', error);
        alert('Error exporting to Excel. Please try again.');
      });
  };

  const topClients = clientsData.sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Reports & Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Generate detailed business insights</p>
        </div>
        <button
          onClick={handleExportExcel}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all duration-200 font-medium"
        >
          <FiDownload className="text-lg" /> Export Excel
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <FiBarChart2 className="text-white text-lg" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Report Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
            >
              <option>Sales</option>
              <option>Inventory</option>
              <option>Clients</option>
              <option>Products</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From Date
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To Date
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Revenue</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">₹{(totalRevenue / 100000).toFixed(2)}L</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                  Jan - Nov 2025
                </span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiDollarSign className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Paid Amount</p>
              <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-3">₹{(paidRevenue / 100000).toFixed(2)}L</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  <FiTrendingUp /> {((paidRevenue / totalRevenue) * 100).toFixed(1)}% Rate
                </span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiTrendingUp className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Pending Amount</p>
              <h3 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-3">₹{(pendingRevenue / 100000).toFixed(2)}L</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400">
                  {invoicesData.filter(i => i.status !== 'Paid').length} Invoices
                </span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiCalendar className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Orders</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{totalOrders}</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400">
                  6 Months
                </span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiFileText className="text-white text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <FiBarChart2 className="text-white text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Monthly Sales Performance</h3>
          </div>
          <div className="space-y-3">
            {monthlySales.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.month}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">₹{(item.sales / 1000).toFixed(0)}K</span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${(item.sales / 375000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Trends Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <FiTrendingUp className="text-white text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Order Trends</h3>
          </div>
          <div className="space-y-3">
            {monthlySales.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.month}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.orders} Orders</span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${(item.orders / 38) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products & Clients Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <FiPackage className="text-white text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Top 5 Products by Revenue</h3>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {product.qty.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">₹{(product.revenue / 1000).toFixed(0)}K</p>
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
                      style={{ width: `${(product.revenue / 620000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clients */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <FiUsers className="text-white text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Top 5 Clients by Revenue</h3>
          </div>
          <div className="space-y-4">
            {topClients.map((client, index) => (
              <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{client.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{client.totalOrders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white mb-1">₹{(client.totalRevenue / 1000).toFixed(0)}K</p>
                  <span className={`text-xs px-2.5 py-1 rounded-lg font-semibold ${
                    client.status === 'Active'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {client.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <FiFileText className="text-white text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Invoices</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {invoicesData.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900 dark:text-white font-mono">{invoice.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{invoice.clientName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{new Date(invoice.date).toLocaleDateString('en-IN')}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-semibold text-gray-900 dark:text-white">₹{invoice.total.toLocaleString('en-IN')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${
                      invoice.status === 'Paid'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : invoice.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;