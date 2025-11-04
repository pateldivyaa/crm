

// ============================================
// FILE: src/components/Sidebar.jsx
// ============================================
import { NavLink } from 'react-router-dom';
import {
  FiHome, FiUsers, FiUserPlus, FiFileText, FiFile,
  FiPackage, FiBarChart2, FiBell, FiSettings
} from 'react-icons/fi';
import { FaBolt } from 'react-icons/fa';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard', badge: null },
    { path: '/clients', icon: FiUsers, label: 'Clients', badge: '248' },
    { path: '/leads', icon: FiUserPlus, label: 'Leads', badge: '12' },
    { path: '/quotations', icon: FiFileText, label: 'Quotations', badge: null },
    { path: '/invoices', icon: FiFile, label: 'Invoices', badge: '3' },
    { path: '/inventory', icon: FiPackage, label: 'Inventory', badge: null },
    { path: '/reports', icon: FiBarChart2, label: 'Reports', badge: null },
    { path: '/reminders', icon: FiBell, label: 'Reminders', badge: '5' },
    { path: '/settings', icon: FiSettings, label: 'Settings', badge: null }
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-3 p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FaBolt className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Mana Techno</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Corporation CRM</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <item.icon className={`text-xl ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'}`} />
                        <span className={`font-medium ${isActive ? 'text-white' : ''}`}>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Support Card */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl p-5 text-white shadow-xl">
              <p className="text-sm font-semibold mb-1">Need Help?</p>
              <p className="text-xs opacity-80 mb-3">24/7 Support Available</p>
              <button className="w-full bg-white text-blue-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;