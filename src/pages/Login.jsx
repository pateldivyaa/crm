import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBolt, FaChartLine, FaUsers, FaRocket } from 'react-icons/fa';
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // Use the login function from AuthContext
        const isLoggedIn = login(email, password);
        
        if (isLoggedIn) {
          // Redirect to dashboard on successful login
          navigate('/dashboard');
        } else {
          alert('Invalid credentials');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 py-12 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl -z-10"></div>
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl -z-10"></div>

      <div className="w-full max-w-md mx-auto">
        {/* Left Side - Branding & Features */}
        {/* <div className="hidden md:block space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FaBolt className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-white text-3xl font-bold">Mana Techno</h2>
                  <p className="text-blue-200 text-sm">Corporation CRM</p>
                </div>
              </div>
              
              <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                Welcome Back to<br />Your CRM Hub
              </h1>
              <p className="text-blue-100 text-lg">
                Manage customers, track sales, and grow your business efficiently.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <FaUsers className="text-white text-3xl mb-2" />
                <h3 className="text-white font-semibold mb-1">Customers</h3>
                <p className="text-blue-100 text-sm">Manage all contacts</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <FaChartLine className="text-white text-3xl mb-2" />
                <h3 className="text-white font-semibold mb-1">Analytics</h3>
                <p className="text-blue-100 text-sm">Track performance</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <FaRocket className="text-white text-3xl mb-2" />
                <h3 className="text-white font-semibold mb-1">Automation</h3>
                <p className="text-blue-100 text-sm">Save time daily</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <FiShield className="text-white text-3xl mb-2" />
                <h3 className="text-white font-semibold mb-1">Security</h3>
                <p className="text-blue-100 text-sm">Bank-level encryption</p>
              </div>
            </div>
          </div> */}

        {/* Login Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 w-full">
          <div className="md:hidden flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <FaBolt className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-gray-800 dark:text-white text-xl font-bold">Mana Techno</h2>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Sign In
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Access your CRM dashboard
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:outline-none focus:border-blue-500 dark:text-white transition"
                  placeholder="admin@manatechno.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:outline-none focus:border-blue-500 dark:text-white transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Forgot password?
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-slate-800 text-gray-500">Demo Access</span>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use any email and password to explore
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <button 
                onClick={() => navigate('/signup')}
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Sign up for free
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;