import { useState } from 'react';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiMail, FiPhone, FiMapPin, FiTrendingUp, FiDollarSign, FiShoppingBag, FiX } from 'react-icons/fi';

const clientsData = [
  { id: 1, name: 'Gujarat Electricals', gstin: '24AAAAA1234A1Z5', contact: '+91 98765 43210', email: 'info@gujaratelec.com', address: 'Ahmedabad, Gujarat', status: 'Active', totalOrders: 45, totalRevenue: 450000 },
  { id: 2, name: 'Rajesh Enterprises', gstin: '24BBBBB5678B2Z5', contact: '+91 98765 43211', email: 'rajesh@enterprises.com', address: 'Surat, Gujarat', status: 'Active', totalOrders: 32, totalRevenue: 320000 },
  { id: 3, name: 'Priya Industries', gstin: '24CCCCC9012C3Z5', contact: '+91 98765 43212', email: 'priya@industries.com', address: 'Vadodara, Gujarat', status: 'Inactive', totalOrders: 18, totalRevenue: 180000 },
  { id: 4, name: 'Amit Trading Co.', gstin: '24DDDDD3456D4Z5', contact: '+91 98765 43213', email: 'amit@trading.com', address: 'Rajkot, Gujarat', status: 'Active', totalOrders: 56, totalRevenue: 560000 },
  { id: 5, name: 'Tech Solutions Ltd', gstin: '24EEEEE7890E5Z5', contact: '+91 98765 43214', email: 'tech@solutions.com', address: 'Gandhinagar, Gujarat', status: 'Active', totalOrders: 28, totalRevenue: 280000 }
];

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all">
              <FiX className="text-xl text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

const Clients = () => {
  const [clients, setClients] = useState(clientsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({
    name: '', gstin: '', contact: '', email: '', address: '', status: 'Active'
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    setEditingClient(null);
    setFormData({ name: '', gstin: '', contact: '', email: '', address: '', status: 'Active' });
    setIsModalOpen(true);
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setFormData(client);
    setIsModalOpen(true);
  };

  const handleDeleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(c => c.id !== clientId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { ...formData, id: c.id, totalOrders: c.totalOrders, totalRevenue: c.totalRevenue } : c));
    } else {
      setClients([...clients, { ...formData, id: clients.length + 1, totalOrders: 0, totalRevenue: 0 }]);
    }
    setIsModalOpen(false);
  };

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'Active').length;
  const totalRevenue = clients.reduce((sum, c) => sum + c.totalRevenue, 0);
  const totalOrders = clients.reduce((sum, c) => sum + c.totalOrders, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Clients</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your customer database</p>
        </div>
        <button
          onClick={handleAddClient}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 font-medium"
        >
          <FiPlus className="text-lg" /> Add Client
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Clients</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{totalClients}</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  <FiTrendingUp /> 12%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiShoppingBag className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Active Clients</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{activeClients}</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  <FiTrendingUp /> 8%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
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
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Revenue</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">₹{(totalRevenue / 100000).toFixed(1)}L</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  <FiTrendingUp /> 23%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiDollarSign className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Orders</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{totalOrders}</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  <FiTrendingUp /> 15%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiShoppingBag className="text-white text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Search Bar */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
          <div className="relative group max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search clients by name, GSTIN, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredClients.map((client) => (
                <tr 
                  key={client.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <span className="text-white text-sm font-bold">{client.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{client.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{client.gstin}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <FiPhone className="text-blue-500 text-xs" />
                        <span>{client.contact}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <FiMail className="text-blue-500 text-xs" />
                        <span className="truncate max-w-[200px]">{client.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <FiMapPin className="text-blue-500 text-xs flex-shrink-0" />
                      <span>{client.address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{client.totalOrders}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">₹{(client.totalRevenue / 1000).toFixed(0)}K</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${
                      client.status === 'Active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditClient(client)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                      >
                        <FiEdit className="text-base" />
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                      >
                        <FiTrash2 className="text-base" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="text-3xl text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No clients found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingClient ? 'Edit Client' : 'Add New Client'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GSTIN *
              </label>
              <input
                type="text"
                value={formData.gstin}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contact Number *
              </label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Address *
            </label>
            <textarea
              rows="3"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium"
            >
              {editingClient ? 'Update Client' : 'Add Client'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Clients;