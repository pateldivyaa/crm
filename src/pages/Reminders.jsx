import { useState } from 'react';
import { FiCalendar, FiUser, FiPhone, FiMail, FiClock, FiCheck, FiAlertCircle, FiSend, FiTrendingUp, FiUserPlus, FiDollarSign } from 'react-icons/fi';

const Reminders = () => {
  const [activeTab, setActiveTab] = useState('followups');
  const [companyData] = useState({
    name: 'Your Company Name',
    email: 'info@yourcompany.com',
    phone: '+91 12345 67890',
    address: '123 Business Street, City, State, 123456'
  });

  // Sample data
  const leadsData = [
    { id: 1, name: 'Rajesh Kumar', company: 'Kumar Electricals', phone: '+91 98765 43210', email: 'rajesh@kumar.com', followUpDate: '2025-10-28', notes: 'Interested in 3-phase panel boards. Follow up for price negotiation.' },
    { id: 2, name: 'Priya Shah', company: 'Shah Industries', phone: '+91 98765 43211', email: 'priya@shah.com', followUpDate: '2025-11-05', notes: 'Requested quotation for industrial cables. Awaiting decision.' },
    { id: 3, name: 'Amit Patel', company: 'Patel Enterprises', phone: '+91 98765 43212', email: 'amit@patel.com', followUpDate: '2025-11-06', notes: 'Needs consultation for warehouse electrical setup.' }
  ];

  const invoicesData = [
    { id: 'INV-2025-001', clientName: 'Gujarat Electricals', total: 45000, dueDate: '2025-10-20', status: 'Overdue' },
    { id: 'INV-2025-002', clientName: 'Mehta Trading Co.', total: 32000, dueDate: '2025-10-25', status: 'Overdue' },
    { id: 'INV-2025-003', clientName: 'Patel Industries', total: 28000, dueDate: '2025-11-10', status: 'Pending' },
    { id: 'INV-2025-004', clientName: 'Tech Solutions Ltd', total: 52000, dueDate: '2025-11-15', status: 'Pending' }
  ];

  const [followups, setFollowups] = useState(leadsData);
  const [invoices, setInvoices] = useState(invoicesData);

  // Calculate derived state
  const upcomingFollowups = followups.filter(lead => new Date(lead.followUpDate) >= new Date());
  const overdueFollowups = followups.filter(lead => new Date(lead.followUpDate) < new Date());
  const overdueInvoices = invoices.filter(inv => inv.status === 'Overdue');
  const pendingInvoices = invoices.filter(inv => inv.status === 'Pending');

  const totalPending = upcomingFollowups.length + overdueFollowups.length + overdueInvoices.length + pendingInvoices.length;

  const handleMarkComplete = (id, type) => {
    if (window.confirm(`Are you sure you want to mark this ${type.toLowerCase()} as complete?`)) {
      if (type === 'Follow-up') {
        setFollowups(prev => prev.filter(item => item.id !== id));
      } else if (type === 'Payment') {
        setInvoices(prev => prev.filter(item => item.id !== id));
      }
      alert(`${type} marked as complete!`);
    }
  };

  const handleSendReminder = (contact, type = 'Email') => {
    if (type === 'Email') {
      const subject = encodeURIComponent('Payment Reminder');
      const body = encodeURIComponent(
        `Dear ${contact.name || contact.clientName || 'Valued Customer'},\n\n` +
        'This is a friendly reminder about your pending payment.\n\n' +
        'Invoice Details:\n' +
        `- ${contact.id ? `Invoice: ${contact.id}\n` : ''}` +
        `- Amount: ₹${contact.total ? contact.total.toLocaleString('en-IN') : 'N/A'}\n` +
        `- Due Date: ${contact.dueDate ? new Date(contact.dueDate).toLocaleDateString('en-IN') : 'N/A'}\n\n` +
        'Please make the payment at your earliest convenience.\n\n' +
        'Thank you for your business!\n\n' +
        'Best regards,\n' + companyData.name
      );
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    } else if (type === 'WhatsApp') {
      const phone = contact.phone ? contact.phone.replace(/[^0-9]/g, '') : '';
      const message = encodeURIComponent(
        `Hello ${contact.name || contact.clientName || ''}, ` +
        'This is a reminder about your pending payment. ' +
        (contact.id ? `Invoice: ${contact.id} ` : '') +
        (contact.total ? `Amount: ₹${contact.total.toLocaleString('en-IN')} ` : '') +
        (contact.dueDate ? `Due: ${new Date(contact.dueDate).toLocaleDateString('en-IN')}` : '')
      );
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Reminders & Alerts</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Stay on top of follow-ups and payments</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4">
        {/* Overdue Follow-ups */}
        <div className="flex-1 min-w-[240px] bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between h-full">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overdue Follow-ups</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white my-2">{overdueFollowups.length}</h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                <FiAlertCircle size={14} /> Urgent
              </span>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiAlertCircle className="text-white text-xl" />
            </div>
          </div>
        </div>

        {/* Upcoming Follow-ups */}
        <div className="flex-1 min-w-[240px] bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between h-full">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming Follow-ups</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white my-2">{upcomingFollowups.length}</h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                <FiTrendingUp size={14} /> This Week
              </span>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiUserPlus className="text-white text-xl" />
            </div>
          </div>
        </div>

        {/* Overdue Payments */}
        <div className="flex-1 min-w-[240px] bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between h-full">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overdue Payments</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white my-2">{overdueInvoices.length}</h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400">
                <FiAlertCircle size={14} /> Action Required
              </span>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiDollarSign className="text-white text-xl" />
            </div>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="flex-1 min-w-[240px] bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between h-full">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Payments</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white my-2">{pendingInvoices.length}</h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400">
                <FiClock size={14} /> Due Soon
              </span>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiClock className="text-white text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-2 flex gap-2">
        <button
          onClick={() => setActiveTab('followups')}
          className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all ${activeTab === 'followups'
            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
        >
          <div className="flex items-center justify-center gap-2 whitespace-nowrap">
            <FiUser />
            <span>Follow-ups ({upcomingFollowups.length + overdueFollowups.length})</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all ${activeTab === 'payments'
            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
        >
          <div className="flex items-center justify-center gap-2">
            <FiDollarSign />
            <span>Payment Reminders</span>
            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${activeTab === 'payments' ? 'bg-white/20' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
              }`}>
              {overdueInvoices.length + pendingInvoices.length}
            </span>
          </div>
        </button>
      </div>

      {/* Follow-ups Tab Content */}
      {activeTab === 'followups' && (
        <div className="space-y-6">
          {/* Overdue Follow-ups */}
          {overdueFollowups.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-red-50 to-rose-50 dark:from-gray-800 dark:to-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiAlertCircle className="text-red-500" />
                    Overdue Follow-ups ({overdueFollowups.length})
                  </h3>
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold rounded-lg">
                    REQUIRES ATTENTION
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Lead Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Follow-up Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Notes
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {overdueFollowups.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
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
                          <div className="flex items-center gap-2">
                            <FiCalendar className="text-red-500 text-xs" />
                            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                              {new Date(lead.followUpDate).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Overdue</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">{lead.notes}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${lead.email}?subject=Follow-up: ${encodeURIComponent(lead.company || 'Regarding your inquiry')}`}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                              title="Send Email"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSendReminder(lead, 'Email');
                              }}
                            >
                              <FiMail className="text-base" />
                            </a>
                            <button
                              onClick={() => handleSendReminder(lead.name, 'WhatsApp')}
                              className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-all"
                              title="Send WhatsApp"
                            >
                              <FiPhone className="text-base" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkComplete(lead.id, 'Follow-up');
                              }}
                              className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-all"
                              title="Mark as Complete"
                            >
                              <FiCheck className="text-base" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Upcoming Follow-ups */}
          {upcomingFollowups.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiCalendar className="text-blue-500" />
                    Upcoming Follow-ups ({upcomingFollowups.length})
                  </h3>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Lead Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Follow-up Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Notes
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {upcomingFollowups.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
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
                          <div className="flex items-center gap-2">
                            <FiCalendar className="text-blue-500 text-xs" />
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {new Date(lead.followUpDate).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">{lead.notes}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${lead.email}?subject=Follow-up: ${encodeURIComponent(lead.company || 'Regarding your inquiry')}`}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                              title="Send Email"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSendReminder(lead, 'Email');
                              }}
                            >
                              <FiMail className="text-base" />
                            </a>
                            <button
                              onClick={() => handleSendReminder(lead.name, 'WhatsApp')}
                              className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-all"
                              title="Send WhatsApp"
                            >
                              <FiPhone className="text-base" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkComplete(lead.id, 'Follow-up');
                              }}
                              className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-all"
                              title="Mark as Complete"
                            >
                              <FiCheck className="text-base" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Payments Tab Content */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          {/* Overdue Payments */}
          {overdueInvoices.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiAlertCircle className="text-orange-500" />
                    Overdue Payments ({overdueInvoices.length})
                  </h3>
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold rounded-lg">
                    ACTION REQUIRED
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Invoice
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Amount
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
                    {overdueInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                              <span className="text-white text-xs font-bold">INV</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">{invoice.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{invoice.clientName}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FiCalendar className="text-red-500 text-xs" />
                            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                              {new Date(invoice.dueDate).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {Math.ceil((new Date() - new Date(invoice.dueDate)) / (1000 * 60 * 60 * 24))} days overdue
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                            ₹{invoice.total.toLocaleString('en-IN')}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-3 py-1 rounded-lg text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            Overdue
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleSendReminder(invoice, 'Email')}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all text-sm font-medium"
                          >
                            <FiSend /> Send Reminder
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pending Payments */}
          {pendingInvoices.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiClock className="text-yellow-500" />
                    Pending Payments ({pendingInvoices.length})
                  </h3>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Invoice
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Amount
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
                    {pendingInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                              <span className="text-white text-xs font-bold">INV</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">{invoice.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{invoice.clientName}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FiCalendar className="text-yellow-500 text-xs" />
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {new Date(invoice.dueDate).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            ₹{invoice.total.toLocaleString('en-IN')}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-3 py-1 rounded-lg text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                            Pending
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleSendReminder(invoice, 'Email')}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all text-sm font-medium"
                          >
                            <FiSend /> Send Reminder
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reminders