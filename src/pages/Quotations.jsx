import { useState } from 'react';
import { FiPlus, FiSearch, FiEye, FiDownload, FiCheck, FiX, FiFileText, FiTrendingUp, FiDollarSign, FiClock } from 'react-icons/fi';

const quotationsData = [
  { id: 'QUO-2025-001', clientName: 'Gujarat Electricals', date: '2025-11-01', validTill: '2025-11-30', status: 'Sent', subtotal: 125000, cgst: 11250, sgst: 11250, total: 147500, items: [{ product: 'MCB Panel Board', hsn: '8537', qty: 5, rate: 15000, gst: 18 }, { product: '4 Core Cable', hsn: '8544', qty: 10, rate: 5000, gst: 18 }] },
  { id: 'QUO-2025-002', clientName: 'Rajesh Enterprises', date: '2025-11-02', validTill: '2025-11-30', status: 'Approved', subtotal: 85000, cgst: 7650, sgst: 7650, total: 100300, items: [{ product: 'LED Panel Light', hsn: '9405', qty: 20, rate: 3500, gst: 18 }, { product: 'MCB 32A', hsn: '8536', qty: 30, rate: 500, gst: 18 }] },
  { id: 'QUO-2025-003', clientName: 'Priya Industries', date: '2025-11-03', validTill: '2025-11-30', status: 'Pending', subtotal: 200000, cgst: 18000, sgst: 18000, total: 236000, items: [{ product: 'Distribution Board', hsn: '8537', qty: 8, rate: 20000, gst: 18 }, { product: 'Cable Tray', hsn: '7308', qty: 15, rate: 4000, gst: 18 }] },
  { id: 'QUO-2025-004', clientName: 'Amit Trading Co.', date: '2025-11-04', validTill: '2025-11-30', status: 'Sent', subtotal: 155000, cgst: 13950, sgst: 13950, total: 182900, items: [{ product: 'Copper Wire 2.5mm', hsn: '8544', qty: 50, rate: 2500, gst: 18 }, { product: 'Junction Box', hsn: '8538', qty: 25, rate: 900, gst: 18 }] },
  { id: 'QUO-2025-005', clientName: 'Tech Solutions Ltd', date: '2025-10-28', validTill: '2025-11-15', status: 'Rejected', subtotal: 95000, cgst: 8550, sgst: 8550, total: 112100, items: [{ product: 'Modular Switch', hsn: '8536', qty: 100, rate: 750, gst: 18 }, { product: 'Socket Outlet', hsn: '8536', qty: 50, rate: 350, gst: 18 }] }
];

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
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

const Quotations = () => {
  const [quotations, setQuotations] = useState(quotationsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewQuotation, setViewQuotation] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    date: new Date().toISOString().split('T')[0],
    validTill: '',
    items: [{ product: '', hsn: '', qty: 1, rate: 0, gst: 18 }]
  });

  const filteredQuotations = quotations.filter(q =>
    q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewQuotation = (quotation) => {
    setViewQuotation(quotation);
    setIsModalOpen(true);
  };

  const handleDownloadPDF = (quotation) => {
    // Import jsPDF dynamically to avoid SSR issues
    import('jspdf')
      .then(({ jsPDF }) => {
        // Create a new jsPDF instance
        const doc = new jsPDF();
        
        // Add company logo and header
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('ELECTRICAL SUPPLIES & SERVICES', 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('123 Business Street, Surat, Gujarat - 395001', 105, 28, { align: 'center' });
        doc.text('GSTIN: 24ABCDE1234F1Z5 | Phone: +91 9876543210', 105, 35, { align: 'center' });
        
        // Add title
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('TAX INVOICE', 105, 50, { align: 'center' });
        
        // Add quotation info
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Quotation #:', 20, 70);
        doc.text('Date:', 20, 77);
        doc.text('Valid Till:', 20, 84);
        doc.text('Status:', 20, 91);
        
        doc.setFont('helvetica', 'normal');
        doc.text(quotation.id, 50, 70);
        doc.text(quotation.date, 50, 77);
        doc.text(quotation.validTill, 50, 84);
        doc.text(quotation.status, 50, 91);
        
        // Client info
        doc.setFont('helvetica', 'bold');
        doc.text('Bill To:', 130, 70);
        doc.setFont('helvetica', 'normal');
        doc.text(quotation.clientName, 150, 70);
        
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
        
        quotation.items.forEach((item, index) => {
          const amount = item.qty * item.rate;
          doc.text((index + 1).toString(), 25, y + 5);
          doc.text(item.product, 40, y + 5, { maxWidth: 50 });
          doc.text(item.hsn, 100, y + 5);
          doc.text(item.qty.toString(), 120, y + 5);
          doc.text('₹' + item.rate.toFixed(2), 140, y + 5);
          doc.text(item.gst + '%', 160, y + 5);
          doc.text('₹' + amount.toFixed(2), 180, y + 5);
          y += 8;
        });
        
        // Summary
        const startY = Math.max(y + 20, 170);
        doc.setFont('helvetica', 'bold');
        doc.text('Subtotal:', 130, startY);
        doc.text('CGST (9%):', 130, startY + 8);
        doc.text('SGST (9%):', 130, startY + 16);
        doc.text('Total:', 130, startY + 24);
        
        doc.text('₹' + quotation.subtotal.toFixed(2), 180, startY);
        doc.text('₹' + (quotation.subtotal * 0.09).toFixed(2), 180, startY + 8);
        doc.text('₹' + (quotation.subtotal * 0.09).toFixed(2), 180, startY + 16);
        doc.text('₹' + quotation.total.toFixed(2), 180, startY + 24);
        
        // Footer
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text('Thank you for your business!', 105, startY + 40, { align: 'center' });
        doc.text('Terms & Conditions:', 20, startY + 50);
        doc.setFont('helvetica', 'normal');
        doc.text('1. This is a computer generated document. No signature required.', 25, startY + 55, { maxWidth: 170 });
        doc.text('2. Valid until ' + quotation.validTill, 25, startY + 62, { maxWidth: 170 });
        
        // Save the PDF
        doc.save(`Quotation_${quotation.id}.pdf`);
      })
      .catch(error => {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
      });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product: '', hsn: '', qty: 1, rate: 0, gst: 18 }]
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = field === 'qty' || field === 'rate' || field === 'gst' ? Number(value) : value;
    setFormData({ ...formData, items: newItems });
  };

  const handleCreateQuotation = () => {
    if (!formData.clientName || !formData.validTill) {
      alert('Please fill in all required fields');
      return;
    }

    const hasEmptyItems = formData.items.some(item => !item.product || !item.hsn);
    if (hasEmptyItems) {
      alert('Please fill in all item details');
      return;
    }

    const subtotal = formData.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const cgst = subtotal * 0.09;
    const sgst = subtotal * 0.09;
    const total = subtotal + cgst + sgst;

    const newQuotation = {
      id: `QUO-2025-${String(quotations.length + 1).padStart(3, '0')}`,
      clientName: formData.clientName,
      date: formData.date,
      validTill: formData.validTill,
      status: 'Sent',
      subtotal,
      cgst,
      sgst,
      total,
      items: formData.items
    };

    setQuotations([newQuotation, ...quotations]);
    setIsCreateModalOpen(false);
    setFormData({
      clientName: '',
      date: new Date().toISOString().split('T')[0],
      validTill: '',
      items: [{ product: '', hsn: '', qty: 1, rate: 0, gst: 18 }]
    });
  };

  const statusColors = {
    'Sent': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Approved': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Pending': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    'Rejected': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };

  const totalQuotations = quotations.length;
  const pendingQuotations = quotations.filter(q => q.status === 'Pending' || q.status === 'Sent').length;
  const approvedQuotations = quotations.filter(q => q.status === 'Approved').length;
  const totalValue = quotations.reduce((sum, q) => sum + q.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Quotations</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Create and manage price quotations</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 font-medium"
        >
          <FiPlus className="text-lg" /> Create Quotation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Quotations</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{totalQuotations}</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  <FiTrendingUp /> 15%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
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
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Pending</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{pendingQuotations}</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400">
                  <FiClock /> Awaiting
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">response</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiClock className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Approved</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{approvedQuotations}</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  <FiTrendingUp /> 28%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiCheck className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Value</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">₹{(totalValue / 100000).toFixed(1)}L</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  <FiTrendingUp /> 35%
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

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
          <div className="relative group max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by quotation ID or client name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Quotation ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredQuotations.map((quotation) => (
                <tr key={quotation.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <FiFileText className="text-white text-sm" />
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{quotation.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{quotation.clientName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white font-medium">{new Date(quotation.date).toLocaleDateString('en-IN')}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Valid: {new Date(quotation.validTill).toLocaleDateString('en-IN')}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900 dark:text-white">₹{quotation.total.toLocaleString('en-IN')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${statusColors[quotation.status]}`}>{quotation.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleViewQuotation(quotation)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all" title="View">
                        <FiEye className="text-base" />
                      </button>
                      <button onClick={() => handleDownloadPDF(quotation)} className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-all" title="Download PDF">
                        <FiDownload className="text-base" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredQuotations.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="text-3xl text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No quotations found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Quotation ${viewQuotation?.id}`} size="lg">
        {viewQuotation && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Client</p>
                <p className="font-semibold text-gray-900 dark:text-white">{viewQuotation.clientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${statusColors[viewQuotation.status]}`}>{viewQuotation.status}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date</p>
                <p className="font-medium text-gray-900 dark:text-white">{new Date(viewQuotation.date).toLocaleDateString('en-IN')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Valid Till</p>
                <p className="font-medium text-gray-900 dark:text-white">{new Date(viewQuotation.validTill).toLocaleDateString('en-IN')}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Items</h3>
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
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {viewQuotation.items.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{item.product}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{item.hsn}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-gray-100">{item.qty}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-gray-100">₹{item.rate}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{item.gst}%</td>
                        <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900 dark:text-white">₹{(item.qty * item.rate).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="space-y-2 max-w-xs ml-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                  <span className="font-medium text-gray-900 dark:text-white">₹{viewQuotation.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">CGST (9%):</span>
                  <span className="font-medium text-gray-900 dark:text-white">₹{viewQuotation.cgst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">SGST (9%):</span>
                  <span className="font-medium text-gray-900 dark:text-white">₹{viewQuotation.sgst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <span className="text-gray-900 dark:text-white">Total:</span>
                  <span className="text-gray-900 dark:text-white">₹{viewQuotation.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button onClick={() => handleDownloadPDF(viewQuotation)} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all font-medium">
                <FiDownload /> Download PDF
              </button>
              <button onClick={() => { alert('Convert to invoice'); setIsModalOpen(false); }} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium">
                <FiCheck /> Convert to Invoice
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Quotation" size="xl">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Client Name *</label>
              <input type="text" value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Enter client name" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Client GSTIN *</label>
              <input type="text" value={formData.clientGstin} onChange={(e) => setFormData({ ...formData, clientGstin: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Enter client GSTIN" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date *</label>
              <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Valid Till *</label>
              <input type="date" value={formData.validTill} onChange={(e) => setFormData({ ...formData, validTill: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Items *</label>
              <input type="text" value={formData.items} onChange={(e) => setFormData({ ...formData, items: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Enter items" required />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={() => setIsCreateModalOpen(false)} className="flex-1 flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all font-medium">
              <FiX /> Cancel
            </button>
            <button onClick={handleCreateQuotation} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium">
              <FiPlus /> Create Quotation
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Quotations;
