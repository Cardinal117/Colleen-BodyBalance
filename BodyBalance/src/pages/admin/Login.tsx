import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // For now, simple mock authentication
      // In production, this would connect to Supabase Auth
      if (formData.email === 'admin@bodybalance.co.za' && formData.password === 'admin123') {
        // Store admin session in localStorage
        localStorage.setItem('adminAuth', 'true');
        window.location.href = '/admin/dashboard';
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-grounded-50 via-white to-earth-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-grounded-500 to-earth-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">BB</span>
            </div>
            <span className="font-heading text-xl font-bold text-neutral-900">Body Balance</span>
          </Link>
          
          <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-2">
            Admin Login
          </h2>
          <p className="text-neutral-600">
            Sign in to manage your blog content
          </p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-grounded-500 focus:border-transparent transition-all duration-200"
                  placeholder="admin@bodybalance.co.za"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-grounded-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-neutral-400 hover:text-neutral-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-neutral-400 hover:text-neutral-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-grounded-500 to-earth-500 text-white py-3 px-4 rounded-lg font-medium hover:from-grounded-600 hover:to-earth-600 focus:outline-none focus:ring-2 focus:ring-grounded-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn className="h-5 w-5" />
              <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-grounded-50 rounded-lg">
            <p className="text-sm text-neutral-600 mb-2">
              <strong>Demo Credentials:</strong>
            </p>
            <p className="text-xs text-neutral-500">
              Email: admin@bodybalance.co.za<br />
              Password: admin123
            </p>
          </div>
        </motion.div>

        {/* Back to Site */}
        <div className="text-center">
          <Link
            to="/"
            className="text-grounded-600 hover:text-grounded700 font-medium text-sm transition-colors duration-200"
          >
            ← Back to Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
