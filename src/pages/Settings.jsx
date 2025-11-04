import { useState } from 'react';
import { FiSave, FiUpload, FiUser, FiShield, FiPercent, FiHome, FiMail, FiPhone, FiMapPin, FiCalendar, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: 'Purvi Mihir Shukla', email: 'admin@manatechno.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Rajesh Kumar', email: 'rajesh@manatechno.com', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Priya Shah', email: 'priya@manatechno.com', role: 'Sales', status: 'Active' }
  ]);
  
  // User form state
  const [userForm, setUserForm] = useState({
    id: null,
    name: '',
    email: '',
    role: 'Sales',
    status: 'Active'
  });
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [companyData, setCompanyData] = useState({
    name: 'Mana Techno Corporation',
    gstin: '24AYTPS1130J1Z7',
    phone: '079-2560 3240',
    email: 'info@manatechno.com',
    address: '36/12, Shri Narayan Bhavan, Near Jaysor Park Bus Stand, Paldi, Ahmedabad - 380007',
    alternateAddress: '2nd Floor, Kala Chamber, Near Khanpur Post Office, Opp. Khanpur Telephone Exchange, Khanpur, Ahmedabad, Gujarat',
    registeredSince: '30 June 2017'
  });

  const [taxSettings, setTaxSettings] = useState({
    cgst: 9,
    sgst: 9,
    igst: 18,
    defaultGst: 18
  });

  // Logo upload handler
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should be less than 2MB');
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Only JPG and PNG files are allowed');
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // User form handlers
  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = () => {
    setUserForm({
      id: null,
      name: '',
      email: '',
      role: 'Sales',
      status: 'Active'
    });
    setIsEditMode(false);
    setIsUserFormOpen(true);
  };

  const handleEditUser = (user) => {
    setUserForm({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsEditMode(true);
    setIsUserFormOpen(true);
  };

  const handleDeleteUser = (id) => {
    const userToDelete = users.find(user => user.id === id);
    
    // Prevent deleting admin users
    if (userToDelete?.role === 'Admin') {
      alert('Admin users cannot be deleted');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${userToDelete?.name || 'this user'}? This action cannot be undone.`)) {
      try {
        setUsers(users.filter(user => user.id !== id));
        // Show success message or toast here if you have one
        console.log('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email) {
      alert('Please fill in all required fields');
      return;
    }

    if (isEditMode) {
      setUsers(users.map(user => 
        user.id === userForm.id ? { ...user, ...userForm } : user
      ));
    } else {
      const newUser = {
        ...userForm,
        id: Math.max(...users.map(u => u.id), 0) + 1
      };
      setUsers([...users, newUser]);
    }
    
    setIsUserFormOpen(false);
    setUserForm({
      id: null,
      name: '',
      email: '',
      role: 'Sales',
      status: 'Active'
    });
  };

  const handleSaveCompany = () => {
    console.log('Company information updated');
  };

  const handleSaveTax = () => {
    console.log('Tax settings updated');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your CRM configuration</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-2 flex gap-2">
        <button
          onClick={() => setActiveTab('company')}
          className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all ${
            activeTab === 'company'
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <FiHome />
            <span>Company Info</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('tax')}
          className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all ${
            activeTab === 'tax'
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <FiPercent />
            <span>Tax Settings</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all ${
            activeTab === 'users'
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <FiUser />
            <span>User Management</span>
          </div>
        </button>
      </div>

      {activeTab === 'company' && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FiHome className="text-gray-400" />
              Company Information
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Update your business details</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center gap-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg overflow-hidden">
                {logoPreview ? (
                  <img 
                    src={logoPreview} 
                    alt="Company Logo" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>MT</span>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Company Logo</h4>
                <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium cursor-pointer text-sm">
                  <FiUpload size={14} /> Upload New Logo
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/jpeg,image/png"
                    onChange={handleLogoUpload}
                  />
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Max 2MB, JPG or PNG format (Recommended: 512x512px)
                </p>
                {logoFile && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    {logoFile.name} ({(logoFile.size / 1024).toFixed(2)} KB)
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={companyData.name}
                  onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  GSTIN *
                </label>
                <input
                  type="text"
                  value={companyData.gstin}
                  onChange={(e) => setCompanyData({ ...companyData, gstin: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FiPhone className="inline mr-1 text-blue-500" /> Phone Number *
                </label>
                <input
                  type="text"
                  value={companyData.phone}
                  onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FiMail className="inline mr-1 text-blue-500" /> Email Address *
                </label>
                <input
                  type="email"
                  value={companyData.email}
                  onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FiMapPin className="inline mr-1 text-blue-500" /> Primary Address *
              </label>
              <textarea
                rows="3"
                value={companyData.address}
                onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FiMapPin className="inline mr-1 text-blue-500" /> Alternate Address
              </label>
              <textarea
                rows="3"
                value={companyData.alternateAddress}
                onChange={(e) => setCompanyData({ ...companyData, alternateAddress: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FiCalendar className="inline mr-1 text-blue-500" /> Registered Since
              </label>
              <input
                type="text"
                disabled
                value={companyData.registeredSince}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveCompany}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold"
              >
                <FiSave /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tax' && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FiPercent className="text-green-500" />
              Tax Settings
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Configure GST rates for your business</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800/50 dark:to-gray-800/50 rounded-xl border border-blue-200 dark:border-gray-700">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  CGST Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={taxSettings.cgst}
                    onChange={(e) => setTaxSettings({ ...taxSettings, cgst: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all text-xl font-bold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">%</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Central Goods and Services Tax</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800/50 dark:to-gray-800/50 rounded-xl border border-green-200 dark:border-gray-700">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  SGST Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={taxSettings.sgst}
                    onChange={(e) => setTaxSettings({ ...taxSettings, sgst: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:text-white transition-all text-xl font-bold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">%</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">State Goods and Services Tax</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800/50 dark:to-gray-800/50 rounded-xl border border-purple-200 dark:border-gray-700">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  IGST Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={taxSettings.igst}
                    onChange={(e) => setTaxSettings({ ...taxSettings, igst: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white transition-all text-xl font-bold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">%</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Integrated Goods and Services Tax</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800/50 dark:to-gray-800/50 rounded-xl border border-orange-200 dark:border-gray-700">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Default GST Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={taxSettings.defaultGst}
                    onChange={(e) => setTaxSettings({ ...taxSettings, defaultGst: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white transition-all text-xl font-bold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">%</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Default rate for new documents</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-900/30 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiPercent className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Important Note</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-400">
                    Tax rates will be automatically applied to all new quotations and invoices. Existing documents will not be affected by these changes.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveTax}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all font-semibold"
              >
                <FiSave /> Save Tax Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">User Management</h3>
            <button 
              onClick={handleAddUser}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold"
            >
              <FiPlus /> Add New User
            </button>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800">
              <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <FiUser className="text-purple-500" />
                Team Members ({users.length})
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage user access and permissions</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Role
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
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                            <span className="text-white text-sm font-bold">{user.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <FiMail className="text-blue-500 text-xs" />
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold ${
                          user.role === 'Admin'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                            : user.role === 'Manager'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        }`}>
                          {user.role === 'Admin' && <FiShield className="text-xs" />}
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-lg text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleEditUser(user)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                            title="Edit user"
                          >
                            <FiEdit className="text-base" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteUser(user.id);
                            }}
                            className={`p-2 rounded-lg transition-all ${
                              user.role === 'Admin' 
                                ? 'text-gray-400 cursor-not-allowed' 
                                : 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30'
                            }`}
                            title={user.role === 'Admin' ? 'Admin users cannot be deleted' : 'Delete user'}
                            disabled={user.role === 'Admin'}
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
          </div>
        </div>
      )}

      {/* User Form Modal */}
      {isUserFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isEditMode ? 'Edit User' : 'Add New User'}
              </h3>
            </div>
            <form onSubmit={handleUserSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={userForm.name}
                  onChange={handleUserInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={userForm.email}
                  onChange={handleUserInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={userForm.role}
                    onChange={handleUserInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={userForm.status}
                    onChange={handleUserInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsUserFormOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium"
                >
                  {isEditMode ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;