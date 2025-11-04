// ============================================
// FILE: src/components/Navbar.jsx
// ============================================
import { useState } from 'react';
import { FiMenu, FiBell, FiSearch, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notifications = [
    { id: 1, text: 'New lead from Amit Patel', time: '5 min ago', unread: true, type: 'lead' },
    { id: 2, text: 'Invoice INV-2025-003 is overdue', time: '1 hour ago', unread: true, type: 'warning' },
    { id: 3, text: 'Low stock alert: MCB Panel Board', time: '2 hours ago', unread: false, type: 'alert' },
    { id: 4, text: 'Meeting scheduled with Priya Shah', time: '3 hours ago', unread: false, type: 'event' }
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              <FiMenu className="text-xl text-gray-600 dark:text-gray-300" />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-2xl">
              <div className="relative w-full group">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search clients, products, invoices..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <FiBell className="text-xl text-gray-600 dark:text-gray-300" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                      <span className="px-2.5 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                        {notifications.filter(n => n.unread).length} New
                      </span>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-800 ${
                          notif.unread ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notif.unread ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{notif.text}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-3 text-center border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                    <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">
                    {user?.name?.charAt(0) || 'P'}
                  </span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
                </div>
                <FiChevronDown className="hidden lg:block text-gray-400" />
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="px-5 py-5 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-lg font-bold">
                          {user?.name?.charAt(0) || 'P'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                      </div>
                    </div>
                    <span className="inline-block px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-lg">
                      {user?.role}
                    </span>
                  </div>
                  <div className="py-2">
                    <button 
                      onClick={() => navigate('/settings')}
                      className="w-full px-5 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3 transition-colors"
                    >
                      <FiUser className="text-gray-400" /> Profile Settings
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full px-5 py-3 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-3 transition-colors"
                    >
                      <FiLogOut className="text-red-500" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
