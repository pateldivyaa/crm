import { useState } from 'react';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiPhone, FiMail, FiCalendar, FiTrendingUp, FiUserPlus, FiDollarSign, FiTarget, FiX } from 'react-icons/fi';

const leadsData = [
  { id: 1, name: 'Amit Patel', company: 'Patel Industries', phone: '+91 98765 43210', email: 'amit@patel.com', status: 'New', source: 'Website', followUpDate: '2025-11-15', estimatedValue: 150000, assignedTo: 'Purvi Shukla', notes: 'Interested in panel boards' },
  { id: 2, name: 'Priya Shah', company: 'Shah Electricals', phone: '+91 98765 43211', email: 'priya@shah.com', status: 'Contacted', source: 'Referral', followUpDate: '2025-11-10', estimatedValue: 200000, assignedTo: 'Purvi Shukla', notes: 'Follow up on quotation' },
  { id: 3, name: 'Rajesh Kumar', company: 'Kumar Trading', phone: '+91 98765 43212', email: 'rajesh@kumar.com', status: 'Qualified', source: 'Cold Call', followUpDate: '2025-11-08', estimatedValue: 350000, assignedTo: 'Purvi Shukla', notes: 'Ready to place order' },
  { id: 4, name: 'Neha Desai', company: 'Desai Constructions', phone: '+91 98765 43213', email: 'neha@desai.com', status: 'Negotiation', source: 'Trade Show', followUpDate: '2025-11-12', estimatedValue: 500000, assignedTo: 'Purvi Shukla', notes: 'Price negotiation pending' },
  { id: 5, name: 'Vikram Mehta', company: 'Mehta Enterprises', phone: '+91 98765 43214', email: 'vikram@mehta.com', status: 'Lost', source: 'LinkedIn', followUpDate: '2025-11-05', estimatedValue: 120000, assignedTo: 'Purvi Shukla', notes: 'Chose competitor' }
];

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-800">
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

const Leads = () => {
  const [leads, setLeads] = useState(leadsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [formData, setFormData] = useState({
    name: '', company: '', phone: '', email: '', status: 'New',
    source: 'Website', followUpDate: '', estimatedValue: '', notes: ''
  });

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddLead = () => {
    setEditingLead(null);
    setFormData({
      name: '', company: '', phone: '', email: '', status: 'New',
      source: 'Website', followUpDate: '', estimatedValue: '', notes: ''
    });
    setIsModalOpen(true);
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
    setFormData(lead);
    setIsModalOpen(true);
  };

  const handleDeleteLead = (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(l => l.id !== leadId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingLead) {
      setLeads(leads.map(l => l.id === editingLead.id ? { ...formData, id: l.id, assignedTo: 'Purvi Shukla' } : l));
    } else {
      setLeads([...leads, { ...formData, id: leads.length + 1, assignedTo: 'Purvi Shukla' }]);
    }
    setIsModalOpen(false);
  };

  const statusColors = {
    'New': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Contacted': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    'Qualified': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Negotiation': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'Lost': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };

  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const qualifiedLeads = leads.filter(l => l.status === 'Qualified' || l.status === 'Negotiation').length;
  const totalValue = leads.reduce((sum, l) => sum + (parseInt(l.estimatedValue) || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Leads</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage sales opportunities</p>
        </div>
        <button
          onClick={handleAddLead}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 font-medium"
        >
          <FiPlus className="text-lg" /> Add Lead
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Leads</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{totalLeads}</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  <FiTrendingUp /> 18%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiUserPlus className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">New Leads</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{newLeads}</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  <FiTrendingUp /> 25%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiTarget className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Qualified Leads</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{qualifiedLeads}</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  <FiTrendingUp /> 32%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiTrendingUp className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Pipeline Value</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">₹{(totalValue / 100000).toFixed(1)}L</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  <FiTrendingUp /> 45%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiDollarSign className="text-white text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Search and Filter Bar */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search leads by name or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
            >
              <option>All</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Negotiation</option>
              <option>Lost</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Lead Information
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Follow-up
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Est. Value
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredLeads.map((lead) => (
                <tr 
                  key={lead.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <span className="text-white text-sm font-bold">{lead.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{lead.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{lead.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <FiPhone className="text-blue-500 text-xs" />
                        <span>{lead.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <FiMail className="text-blue-500 text-xs" />
                        <span className="truncate max-w-[200px]">{lead.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${statusColors[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{lead.source}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <FiCalendar className="text-blue-500 text-xs" />
                      <span>{new Date(lead.followUpDate).toLocaleDateString('en-IN')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ₹{(lead.estimatedValue / 1000).toFixed(0)}K
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditLead(lead)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                      >
                        <FiEdit className="text-base" />
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
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

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="text-3xl text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No leads found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingLead ? 'Edit Lead' : 'Add New Lead'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company *</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone *</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Negotiation</option>
                <option>Lost</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Source</label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              >
                <option>Website</option>
                <option>Referral</option>
                <option>Cold Call</option>
                <option>Trade Show</option>
                <option>LinkedIn</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Follow-up Date *</label>
              <input
                type="date"
                value={formData.followUpDate}
                onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Value (₹)</label>
              <input
                type="number"
                value={formData.estimatedValue}
                onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
            <textarea
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
            />
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
              {editingLead ? 'Update Lead' : 'Add Lead'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Leads;