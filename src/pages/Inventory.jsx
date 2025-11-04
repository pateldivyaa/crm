import { useState } from 'react';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiAlertCircle, FiPackage, FiTrendingUp, FiDollarSign, FiX, FiBox } from 'react-icons/fi';

const productsData = [
  { id: 1, sku: 'MCB-001', name: 'MCB Panel Board', category: 'Panel Boards', hsn: '85371010', stock: 45, minStock: 20, rate: 8475, gst: 18, supplier: 'Siemens India', lastUpdated: '2025-01-15' },
  { id: 2, sku: 'CBL-002', name: 'Cable Tray 100mm', category: 'Cables', hsn: '73269099', stock: 15, minStock: 25, rate: 2350, gst: 18, supplier: 'L&T Electrical', lastUpdated: '2025-01-20' },
  { id: 3, sku: 'DBD-003', name: 'Distribution Board', category: 'Panel Boards', hsn: '85371020', stock: 32, minStock: 15, rate: 6850, gst: 18, supplier: 'Havells India', lastUpdated: '2025-01-10' },
  { id: 4, sku: 'LED-004', name: 'LED Panel Light 40W', category: 'Lighting', hsn: '94054090', stock: 120, minStock: 50, rate: 850, gst: 12, supplier: 'Philips Lighting', lastUpdated: '2025-01-18' },
  { id: 5, sku: 'WIR-005', name: 'Copper Wire 2.5mm', category: 'Wires', hsn: '85444900', stock: 8, minStock: 30, rate: 4200, gst: 18, supplier: 'Polycab Wires', lastUpdated: '2025-01-22' }
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

const Inventory = () => {
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: 'Panel Boards',
    hsn: '',
    stock: '',
    minStock: '',
    rate: '',
    gst: 18,
    supplier: ''
  });

  const categories = ['All', ...new Set(productsData.map(p => p.category))];
  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;
  const totalValue = products.reduce((sum, p) => sum + (p.stock * p.rate), 0);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      sku: '', name: '', category: 'Panel Boards', hsn: '', stock: '',
      minStock: '', rate: '', gst: 18, supplier: ''
    });
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      alert('Product deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ?
        { ...formData, id: p.id, lastUpdated: new Date().toISOString().split('T')[0] } : p
      ));
      alert('Product updated successfully');
    } else {
      setProducts([...products, {
        ...formData,
        id: products.length + 1,
        stock: parseInt(formData.stock),
        minStock: parseInt(formData.minStock),
        rate: parseFloat(formData.rate),
        gst: parseInt(formData.gst),
        lastUpdated: new Date().toISOString().split('T')[0]
      }]);
      alert('Product added successfully');
    }
    setIsModalOpen(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Panel Boards': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'Cables': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      'Lighting': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      'Wires': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      'Accessories': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400'
    };
    return colors[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Inventory Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage product stock and pricing</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 font-medium"
        >
          <FiPlus className="text-lg" /> Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Products</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{products.length}</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                  {categories.length - 1} Categories
                </span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiPackage className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">In Stock</p>
              <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-3">
                {products.filter(p => p.stock > p.minStock).length}
              </h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  <FiTrendingUp /> Healthy Stock
                </span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiBox className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Low Stock Alert</p>
              <h3 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-3">{lowStockCount}</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                  Needs Reorder
                </span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiAlertCircle className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Value</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">₹{(totalValue / 100000).toFixed(1)}L</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400">
                  Inventory Worth
                </span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiDollarSign className="text-white text-2xl" />
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
                placeholder="Search by product name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
            >
              {categories.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Product Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">HSN Code</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <FiPackage className="text-white text-lg" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{product.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">SKU: {product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${getCategoryColor(product.category)}`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-300">{product.hsn}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${product.stock <= product.minStock ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                          {product.stock}
                        </span>
                        {product.stock <= product.minStock && (
                          <FiAlertCircle className="text-red-600 dark:text-red-400 text-sm" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Min: {product.minStock}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">₹{product.rate.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">GST: {product.gst}%</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{product.supplier}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                        title="Edit"
                      >
                        <FiEdit className="text-base" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="text-3xl text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No products found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SKU *</label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                placeholder="e.g., MCB-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                placeholder="e.g., MCB Panel Board"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              >
                <option>Panel Boards</option>
                <option>Cables</option>
                <option>Lighting</option>
                <option>Wires</option>
                <option>Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HSN Code *</label>
              <input
                type="text"
                required
                value={formData.hsn}
                onChange={(e) => setFormData({ ...formData, hsn: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                placeholder="e.g., 85371010"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock Quantity *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                placeholder="e.g., 45"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Min Stock Level *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                placeholder="e.g., 20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rate (₹) *</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.rate}
                onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                placeholder="e.g., 8475"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GST (%) *</label>
              <select
                required
                value={formData.gst}
                onChange={(e) => setFormData({ ...formData, gst: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              >
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Supplier *</label>
            <input
              type="text"
              required
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              placeholder="e.g., Siemens India"
            />
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Estimated Value:</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ₹{((formData.stock || 0) * (formData.rate || 0)).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Inventory;