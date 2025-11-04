import { useState } from 'react';
import { FiPlus, FiSearch, FiEye, FiDownload, FiEdit, FiTrash2, FiX, FiCalendar, FiDollarSign, FiFileText, FiClock } from 'react-icons/fi';

const invoicesData = [
  { id: 'INV-2025-001', clientName: 'Gujarat Electricals', clientGstin: '24AAAAA1234A1Z5', date: '2025-01-15', dueDate: '2025-02-14', status: 'Paid', subtotal: 84746, cgst: 7627, sgst: 7627, total: 100000, items: [{ product: 'MCB Panel Board', hsn: '85371010', qty: 10, rate: 8475, gst: 18 }] },
  { id: 'INV-2025-002', clientName: 'Rajesh Enterprises', clientGstin: '24BBBBB5678B2Z5', date: '2025-01-20', dueDate: '2025-02-19', status: 'Pending', subtotal: 42373, cgst: 3814, sgst: 3814, total: 50000, items: [{ product: 'Cable Tray', hsn: '73269099', qty: 5, rate: 8475, gst: 18 }] },
  { id: 'INV-2025-003', clientName: 'Priya Industries', clientGstin: '24CCCCC9012C3Z5', date: '2025-01-10', dueDate: '2025-01-25', status: 'Overdue', subtotal: 127119, cgst: 11441, sgst: 11441, total: 150000, items: [{ product: 'Distribution Board', hsn: '85371020', qty: 15, rate: 8475, gst: 18 }] }
];

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
        <div className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-800`}>
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

const Invoices = () => {
  const [invoices, setInvoices] = useState(invoicesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewInvoice, setViewInvoice] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientGstin: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    items: [{ product: '', hsn: '', qty: 1, rate: 0, gst: 18 }]
  });

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || inv.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewInvoice = (invoice) => {
    setViewInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleDownloadPDF = (invoice) => {
    // Import jsPDF dynamically to avoid SSR issues
    import('jspdf')
      .then(({ jsPDF }) => {
        // Create a new jsPDF instance
        const doc = new jsPDF();
        
        // Add company logo and header
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 64, 175); // Blue color
        doc.text('MANA TECHNO CORPORATION', 105, 20, { align: 'center' });
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(75, 85, 99); // Gray color
        doc.text('36/12, Shri Narayan Bhavan, Near Jaysor Park', 105, 28, { align: 'center' });
        doc.text('Paldi, Ahmedabad - 380007 | GSTIN: 24AYTPS1130J1Z7', 105, 35, { align: 'center' });
        
        // Add title
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('TAX INVOICE', 20, 50);
        
        // Add invoice info
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Invoice #:', 20, 65);
        doc.text('Date:', 20, 72);
        doc.text('Due Date:', 20, 79);
        doc.text('Status:', 20, 86);
        
        doc.setFont('helvetica', 'normal');
        doc.text(invoice.id, 50, 65);
        doc.text(new Date(invoice.date).toLocaleDateString('en-IN'), 50, 72);
        doc.text(new Date(invoice.dueDate).toLocaleDateString('en-IN'), 50, 79);
        doc.text(invoice.status, 50, 86);
        
        // Client info
        doc.setFont('helvetica', 'bold');
        doc.text('Bill To:', 130, 65);
        doc.setFont('helvetica', 'normal');
        doc.text(invoice.clientName, 150, 65);
        doc.text('GSTIN: ' + invoice.clientGstin, 150, 72);
        
        // Table header
        doc.setFillColor(59, 130, 246);
        doc.setTextColor(255, 255, 255);
        doc.rect(20, 100, 170, 8, 'F');
        doc.text('No.', 25, 105);
        doc.text('Product/Service', 40, 105);
        doc.text('HSN', 100, 105);
        doc.text('Qty', 120, 105);
        doc.text('Rate', 140, 105);
        doc.text('GST %', 160, 105);
        doc.text('Amount', 180, 105);
        
        // Table rows
        let y = 110;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        
        invoice.items.forEach((item, index) => {
          const amount = item.qty * item.rate;
          doc.text((index + 1).toString(), 25, y + 5);
          doc.text(item.product, 40, y + 5, { maxWidth: 50 });
          doc.text(item.hsn, 100, y + 5);
          doc.text(item.qty.toString(), 120, y + 5);
          doc.text('₹' + item.rate.toLocaleString('en-IN', { minimumFractionDigits: 2 }), 140, y + 5);
          doc.text(item.gst + '%', 160, y + 5);
          doc.text('₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 2 }), 180, y + 5);
          y += 8;
        });
        
        // Summary
        const startY = Math.max(y + 20, 170);
        doc.setFont('helvetica', 'bold');
        doc.text('Subtotal:', 130, startY);
        doc.text('CGST (9%):', 130, startY + 8);
        doc.text('SGST (9%):', 130, startY + 16);
        doc.text('Total:', 130, startY + 24);
        
        doc.text('₹' + invoice.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 }), 180, startY);
        doc.text('₹' + invoice.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 }), 180, startY + 8);
        doc.text('₹' + invoice.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 }), 180, startY + 16);
        doc.text('₹' + invoice.total.toLocaleString('en-IN', { minimumFractionDigits: 2 }), 180, startY + 24);
        
        // Footer
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text('Thank you for your business!', 105, startY + 40, { align: 'center' });
        doc.text('Terms & Conditions:', 20, startY + 50);
        doc.setFont('helvetica', 'normal');
        doc.text('1. This is a computer generated document. No signature required.', 25, startY + 55, { maxWidth: 170 });
        doc.text('2. Please pay within ' + (new Date(invoice.dueDate).getDate() - new Date(invoice.date).getDate()) + ' days from the invoice date.', 25, startY + 62, { maxWidth: 170 });
        
        // Save the PDF
        doc.save(`Invoice_${invoice.id}.pdf`);
      })
      .catch(error => {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
      });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product: '', hsn: '', qty: 1, rate: 0, gst: 18 }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const calculateInvoiceTotal = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const gstRate = 0.09;
    const cgst = Math.round(subtotal * gstRate);
    const sgst = Math.round(subtotal * gstRate);
    const total = subtotal + cgst + sgst;
    return { subtotal, cgst, sgst, total };
  };

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const { subtotal, cgst, sgst, total } = calculateInvoiceTotal();
    const newInvoice = {
      id: `INV-2025-${String(invoices.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'Pending',
      subtotal,
      cgst,
      sgst,
      total
    };
    setInvoices([...invoices, newInvoice]);
    setIsCreateModalOpen(false);
    setFormData({
      clientName: '',
      clientGstin: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: '',
      items: [{ product: '', hsn: '', qty: 1, rate: 0, gst: 18 }]
    });
    alert('Invoice created successfully!');
  };

  const handleDeleteInvoice = (invoiceId) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(invoices.filter(inv => inv.id !== invoiceId));
      alert('Invoice deleted successfully');
    }
  };

  const statusColors = {
    'Paid': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Pending': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    'Overdue': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalPaid = invoices.filter(i => i.status === 'Paid').reduce((sum, inv) => sum + inv.total, 0);
  const totalPending = invoices.filter(i => i.status !== 'Paid').reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Invoices</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage GST-compliant invoices</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 font-medium"
        >
          <FiPlus className="text-lg" /> Create Invoice
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Invoiced</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">₹{(totalInvoiced / 100000).toFixed(2)}L</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                  {invoices.length} Invoices
                </span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiFileText className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Paid</p>
              <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-3">₹{(totalPaid / 100000).toFixed(2)}L</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  {invoices.filter(i => i.status === 'Paid').length} Paid
                </span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiDollarSign className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Pending/Overdue</p>
              <h3 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-3">₹{(totalPending / 100000).toFixed(2)}L</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                  {invoices.filter(i => i.status !== 'Paid').length} Unpaid
                </span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiClock className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">This Month</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">₹{(totalInvoiced / 100000).toFixed(2)}L</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400">
                  +23% Growth
                </span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiCalendar className="text-white text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Search Bar */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search by invoice ID or client name..."
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
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900 dark:text-white font-mono">{invoice.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <span className="text-white text-sm font-bold">{invoice.clientName.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{invoice.clientName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{invoice.clientGstin}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{new Date(invoice.date).toLocaleDateString('en-IN')}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Due: {new Date(invoice.dueDate).toLocaleDateString('en-IN')}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900 dark:text-white">₹{invoice.total.toLocaleString('en-IN')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${statusColors[invoice.status]}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewInvoice(invoice)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                        title="View"
                      >
                        <FiEye className="text-base" />
                      </button>
                      <button
                        onClick={() => handleDownloadPDF(invoice)}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-all"
                        title="Download PDF"
                      >
                        <FiDownload className="text-base" />
                      </button>
                      <button
                        onClick={() => handleDeleteInvoice(invoice.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                        title="Delete"
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

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="text-3xl text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No invoices found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Create Invoice Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Invoice"
        size="xl"
      >
        <form onSubmit={handleCreateInvoice} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Client Name *</label>
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Client GSTIN *</label>
              <input
                type="text"
                required
                value={formData.clientGstin}
                onChange={(e) => setFormData({ ...formData, clientGstin: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Invoice Date *</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date *</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Invoice Items</h3>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
              >
                <FiPlus /> Add Item
              </button>
            </div>

            <div className="space-y-4">
              {formData.items.map((item, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
                      <input
                        type="text"
                        required
                        value={item.product}
                        onChange={(e) => updateItem(index, 'product', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">HSN Code</label>
                      <input
                        type="text"
                        required
                        value={item.hsn}
                        onChange={(e) => updateItem(index, 'hsn', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={item.qty}
                        onChange={(e) => updateItem(index, 'qty', parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Rate (₹)</label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
                      />
                    </div>
                    <div className="flex items-end">
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="w-full px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
                        >
                          <FiTrash2 className="mx-auto" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Item Total: <span className="font-semibold text-gray-900 dark:text-white">₹{(item.qty * item.rate).toLocaleString('en-IN')}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="space-y-2 max-w-xs ml-auto">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                <span className="font-medium text-gray-800 dark:text-white">₹{calculateInvoiceTotal().subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">CGST (9%):</span>
                <span className="font-medium text-gray-800 dark:text-white">₹{calculateInvoiceTotal().cgst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">SGST (9%):</span>
                <span className="font-medium text-gray-800 dark:text-white">₹{calculateInvoiceTotal().sgst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-2 mt-3">
                <span className="text-gray-800 dark:text-white">Total Amount:</span>
                <span className="text-blue-600 dark:text-blue-400">₹{calculateInvoiceTotal().total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </Modal>

      {/* View Invoice Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Invoice ${viewInvoice?.id}`}
        size="lg"
      >
        {viewInvoice && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">From</p>
                  <p className="font-bold text-gray-900 dark:text-white text-lg">Mana Techno Corporation</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">36/12, Shri Narayan Bhavan</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Paldi, Ahmedabad - 380007</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-mono mt-2">GSTIN: 24AYTPS1130J1Z7</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Bill To</p>
                  <p className="font-bold text-gray-900 dark:text-white text-lg">{viewInvoice.clientName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-mono mt-2">GSTIN: {viewInvoice.clientGstin}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Invoice Date</p>
                <p className="font-semibold text-gray-900 dark:text-white">{new Date(viewInvoice.date).toLocaleDateString('en-IN')}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Due Date</p>
                <p className="font-semibold text-gray-900 dark:text-white">{new Date(viewInvoice.dueDate).toLocaleDateString('en-IN')}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${statusColors[viewInvoice.status]}`}>
                  {viewInvoice.status}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Items</h3>
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">HSN</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">Qty</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">Rate</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">GST</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                    {viewInvoice.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">{item.product}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">{item.hsn}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-200">{item.qty}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-800 dark:text-gray-200">₹{item.rate.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{item.gst}%</td>
                        <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900 dark:text-white">₹{(item.qty * item.rate).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="space-y-2 max-w-xs ml-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                  <span className="font-medium text-gray-800 dark:text-white">₹{viewInvoice.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">CGST (9%):</span>
                  <span className="font-medium text-gray-800 dark:text-white">₹{viewInvoice.cgst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">SGST (9%):</span>
                  <span className="font-medium text-gray-800 dark:text-white">₹{viewInvoice.sgst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                  <span className="text-gray-900 dark:text-white">Total Amount:</span>
                  <span className="text-blue-600 dark:text-blue-400">₹{viewInvoice.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => handleDownloadPDF(viewInvoice)}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all font-medium"
              >
                <FiDownload /> Download PDF
              </button>
              {viewInvoice.status !== 'Paid' && (
                <button
                  onClick={() => {
                    const updatedInvoices = invoices.map(inv => 
                      inv.id === viewInvoice.id ? { ...inv, status: 'Paid' } : inv
                    );
                    setInvoices(updatedInvoices);
                    alert('Payment recorded successfully');
                    setIsModalOpen(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium"
                >
                  Mark as Paid
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Invoices;