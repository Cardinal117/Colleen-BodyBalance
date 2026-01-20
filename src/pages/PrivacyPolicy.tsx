import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, UserCheck, Mail, Globe, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-gradient">BB</div>
              <span className="text-2xl font-bold text-neutral-900">Body Balance</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-neutral-600 hover:text-neutral-900">Home</Link>
              <Link to="/blog" className="text-neutral-600 hover:text-neutral-900">Blog</Link>
              <Link to="/privacy-policy" className="text-blue-600 font-medium">Privacy Policy</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-6">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold">Privacy Policy</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Your Privacy Matters
            </h1>
            
            <p className="text-lg text-neutral-600 mb-8">
              At Body Balance, we are committed to protecting your privacy and ensuring transparency in how we collect, use, and safeguard your personal information.
            </p>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-12">
            {/* Information We Collect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 ml-4">Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Personal Information</h3>
                  <p className="text-neutral-600">
                    When you voluntarily provide personal information (such as name, email, or comments), we collect and store it securely.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Usage Data</h3>
                  <p className="text-neutral-600 mb-2">
                    We automatically collect certain technical information about your visit, including:
                  </p>
                  <ul className="list-disc list-inside text-neutral-600 ml-4 space-y-1">
                    <li>IP address (anonymized)</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent</li>
                    <li>Click patterns and navigation behavior</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Cookies and Tracking</h3>
                  <p className="text-neutral-600 mb-2">
                    We use cookies and similar technologies to enhance your experience and analyze site usage. This includes:
                  </p>
                  <ul className="list-disc list-inside text-neutral-600 ml-4 space-y-1">
                    <li>Essential cookies for site functionality</li>
                    <li>Analytics cookies (anonymized and aggregated)</li>
                    <li>Session management</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 ml-4">How We Use Your Information</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">To Provide Services</h3>
                  <p className="text-neutral-600">
                    We use your information to deliver the services you request, including blog content, comments functionality, and personalized user experience.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">To Improve Our Website</h3>
                  <p className="text-neutral-600">
                    Anonymous usage data helps us understand how visitors interact with our site, identify popular content, and improve overall user experience.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">For Legal Compliance</h3>
                  <p className="text-neutral-600">
                    We may use your information to comply with legal obligations, protect our rights, and ensure regulatory compliance.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Data Sharing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                  <Lock className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 ml-4">Data Sharing & Third Parties</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-neutral-600 mb-4">
                  <strong>We do not sell, rent, or trade your personal information with third parties.</strong> We only share data in the following circumstances:
                </p>
                
                <ul className="list-disc list-inside text-neutral-600 ml-4 space-y-2">
                  <li>Service Providers: We may share data with trusted service providers who help us deliver our services (e.g., hosting, analytics)</li>
                  <li>Legal Requirements: When required by law or to protect our rights</li>
                  <li>Business Transfers: In connection with any merger, acquisition, or sale of our business</li>
                </ul>
              </div>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 ml-4">Your Rights</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Access & Control</h3>
                  <p className="text-neutral-600">
                    You have the right to access, update, or delete your personal information at any time.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Data Portability</h3>
                  <p className="text-neutral-600">
                    You can request a copy of your personal data in a machine-readable format for transfer to another service.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Opt-Out</h3>
                  <p className="text-neutral-600">
                    You can opt out of marketing communications and non-essential data collection at any time.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Cookie Control</h3>
                  <p className="text-neutral-600">
                    You can control cookies through your browser settings. Our site will function with essential cookies even if you disable others.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 bg-earth-100 rounded-full p-3">
                  <UserCheck className="w-6 h-6 text-earth-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 ml-4">Contact Us</h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-neutral-600 mb-4">
                  If you have any questions about this Privacy Policy or how we handle your data, please contact us:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-neutral-50 rounded-lg p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="font-medium text-neutral-900 mb-1">Email</p>
                    <p className="text-neutral-600 text-sm">colleen@mybodybalance.co.za</p>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-lg p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                      <Globe className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="font-medium text-neutral-900 mb-1">Website</p>
                    <p className="text-neutral-600 text-sm">mybodybalance.co.za</p>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-lg p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                      <Phone className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="font-medium text-neutral-900 mb-1">Phone</p>
                    <p className="text-neutral-600 text-sm">+(27) 82 458 3541</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Policy Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-50 rounded-lg shadow-lg p-8"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Policy Updates</h3>
                <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
                  We may update this Privacy Policy from time to time. We will notify users of significant changes through:
                </p>
                
                <div className="flex flex-col md:flex-row justify-center gap-6 mb-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold">📢</span>
                    </div>
                    <p className="font-medium text-neutral-900">Website notifications</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold">📧</span>
                    </div>
                    <p className="font-medium text-neutral-900">Email communications for major policy changes</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold">📅</span>
                    </div>
                    <p className="font-medium text-neutral-900">Updated policy posting dates</p>
                  </div>
                </div>
                
                <div className="bg-white inline-flex items-center space-x-4 px-6 py-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">🔄</span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Last Updated</p>
                    <p className="text-neutral-600 text-sm">January 20, 2026</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Back to Home */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <Link
                to="/"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="text-lg font-semibold">Back to Home</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              
              <p className="text-neutral-500 text-sm mt-6">
                Thank you for trusting Body Balance with your privacy
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;