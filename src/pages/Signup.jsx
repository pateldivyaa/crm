import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBolt } from 'react-icons/fa';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiPhone } from 'react-icons/fi';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    setIsLoading(true);

    // Validate all required fields
    if (!formData.email || !formData.password || !formData.fullName || !formData.phone) {
      console.log('Validation failed - missing required fields');
      alert('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    // Simulate API call with timeout
    setTimeout(() => {
      try {
        console.log('Processing signup with data:', formData);
        
        // Store user data in localStorage
        const userData = {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          role: 'User',
          company: 'Mana Techno Corporation'
        };
        
        console.log('Storing user data:', userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        
        console.log('Redirecting to dashboard...');
        // Force a page reload to ensure auth state is properly initialized
        window.location.href = '/dashboard';
      } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred during signup. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FaBolt className="text-white text-xl" />
            </div>
            <h2 className="ml-3 text-2xl font-bold text-gray-800 dark:text-white">Mana Techno</h2>
          </div>

          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              Create Account
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Start managing your business today
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:outline-none focus:border-blue-500 dark:text-white transition text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:outline-none focus:border-blue-500 dark:text-white transition text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:outline-none focus:border-blue-500 dark:text-white transition text-sm"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full pl-12 pr-12 py-2.5 bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:outline-none focus:border-blue-500 dark:text-white transition text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className="w-full pl-12 pr-12 py-2.5 bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:outline-none focus:border-blue-500 dark:text-white transition text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                I agree to the{' '}
                <button className="text-blue-600 dark:text-blue-400 hover:underline">
                  Terms of Service
                </button>
                {' '}and{' '}
                <button className="text-blue-600 dark:text-blue-400 hover:underline">
                  Privacy Policy
                </button>
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account '
              )}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
            <button 
  onClick={() => navigate('/login')} 
  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
>
  Sign in
</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;