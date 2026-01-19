import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Mail, Heart, Users, Leaf, Dumbbell, BookOpen } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Grounded', href: '/grounded' },
  ];

  const trainingItems = [
    { name: 'Personal Training', href: '/personal-training', description: 'One-on-one training in private gym facilities' },
    { name: 'Virtual Trainer', href: '/virtual-trainer', description: 'Online training programs and virtual coaching' },
  ];

  const blogItems = [
    { 
      name: 'Survival is Possible', 
      href: '/blog/survival-strong-mind-body', 
      description: 'How positivity helped overcome breast cancer',
      icon: Heart,
      category: 'Personal Story',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    { 
      name: 'Finding Balance', 
      href: '/blog/finding-balance-hectic-world', 
      description: 'Practical tips for work-life balance',
      icon: Users,
      category: 'Lifestyle',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    { 
      name: 'Plant-Based Nutrition', 
      href: '/blog/power-plant-based-nutrition', 
      description: 'Transform your energy with plant-based meals',
      icon: Leaf,
      category: 'Nutrition',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    { 
      name: 'Training Tips', 
      href: '/blog/training-tips', 
      description: 'Expert advice for effective workouts',
      icon: Dumbbell,
      category: 'Fitness',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    { 
      name: 'Nutrition Guide', 
      href: '/blog/nutrition-guide', 
      description: 'Complete guide to healthy eating',
      icon: BookOpen,
      category: 'Health',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-sm py-4'
    }`}>
      <div className="container">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
            <img 
              src="./latestWhiteLogoLarge.jpeg" 
              alt="Body Balance Logo" 
              className="w-16 h-12 rounded-lg object-cover"
            />
            <span className="font-heading text-2xl font-bold text-gradient">Body Balance</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`transition-colors duration-200 font-medium ${
                  isActive(item.href) 
                    ? 'text-grounded-500' 
                    : 'text-neutral-600 hover:text-grounded-500'
                }`}
              >
                {item.name}
              </a>
            ))}
            
            {/* Training Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsTrainingOpen(true)}
                onMouseLeave={() => setIsTrainingOpen(false)}
                className={`flex items-center space-x-1 transition-colors duration-200 font-medium ${
                  isActive('/personal-training') || isActive('/virtual-trainer')
                    ? 'text-grounded-500'
                    : 'text-neutral-600 hover:text-grounded-500'
                }`}
              >
                <span>Training</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isTrainingOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isTrainingOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setIsTrainingOpen(true)}
                    onMouseLeave={() => setIsTrainingOpen(false)}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-100 overflow-hidden"
                  >
                    {trainingItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`block p-4 transition-colors duration-200 border-b border-neutral-100 last:border-b-0 ${
                          isActive(item.href) ? 'bg-grounded-50' : 'hover:bg-grounded-50'
                        }`}
                      >
                        <div className={`font-medium mb-1 ${isActive(item.href) ? 'text-grounded-600' : 'text-neutral-900'}`}>
                          {item.name}
                        </div>
                        <div className="text-sm text-neutral-600">{item.description}</div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Blog Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsBlogOpen(true)}
                onMouseLeave={() => setIsBlogOpen(false)}
                className={`flex items-center space-x-1 transition-colors duration-200 font-medium ${
                  location.pathname.startsWith('/blog')
                    ? 'text-grounded-500'
                    : 'text-neutral-600 hover:text-grounded-500'
                }`}
              >
                <span>Blog</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isBlogOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isBlogOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setIsBlogOpen(true)}
                    onMouseLeave={() => setIsBlogOpen(false)}
                    className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-neutral-100 overflow-hidden"
                  >
                    {blogItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`block p-4 transition-colors duration-200 border-b border-neutral-100 last:border-b-0 ${
                          isActive(item.href) ? item.bgColor : 'hover:bg-neutral-50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.bgColor}`}>
                            <item.icon className={item.color} size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className={`font-medium text-sm ${isActive(item.href) ? item.color : 'text-neutral-900'}`}>
                                {item.name}
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${item.bgColor} ${item.color} font-medium`}>
                                {item.category}
                              </span>
                            </div>
                            <div className="text-sm text-neutral-600 line-clamp-2">{item.description}</div>
                          </div>
                        </div>
                      </a>
                    ))}
                    <a
                      href="/blog"
                      className="block p-4 bg-gradient-to-r from-grounded-50 to-earth-50 hover:from-grounded-100 hover:to-earth-100 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-grounded-500 to-earth-500 flex items-center justify-center">
                          <BookOpen className="text-white" size={20} />
                        </div>
                        <div>
                          <div className="font-medium text-grounded-600">View All Posts</div>
                          <div className="text-sm text-neutral-600">Browse the complete blog archive</div>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact Link */}
            <a
              href="/contact"
              className={`transition-colors duration-200 font-medium ${
                isActive('/contact')
                  ? 'text-grounded-500'
                  : 'text-neutral-600 hover:text-grounded-500'
              }`}
            >
              Contact
            </a>
          </div>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:0824583541" className="flex items-center space-x-2 text-neutral-600 hover:text-grounded-500 transition-colors">
              <Phone size={16} />
              <span className="text-sm">082 458 3541</span>
            </a>
            <a href="mailto:colleen@mybodybalance.co.za" className="flex items-center space-x-2 text-neutral-600 hover:text-grounded-500 transition-colors">
              <Mail size={16} />
              <span className="text-sm">Email</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-neutral-600 hover:text-grounded-500 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isOpen ? 1 : 0,
            height: isOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden bg-white border-t border-neutral-100 shadow-lg overflow-hidden"
        >
          <div className="container py-4">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isOpen ? 1 : 0,
                    x: isOpen ? 0 : -20 
                  }}
                  transition={{ duration: 0.2, delay: isOpen ? 0.1 : 0 }}
                  className={`block py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                    isActive(item.href) 
                      ? 'bg-grounded-50 text-grounded-600 border-l-4 border-grounded-500' 
                      : 'text-neutral-700 hover:bg-neutral-50 hover:text-grounded-500'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              
              {/* Mobile Training Menu */}
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className={`font-semibold text-lg mb-3 px-4 ${
                  isActive('/personal-training') || isActive('/virtual-trainer')
                    ? 'text-grounded-600'
                    : 'text-neutral-900'
                }`}>Training Programs</div>
                <div className="space-y-2">
                  {trainingItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: isOpen ? 1 : 0,
                        x: isOpen ? 0 : -20 
                      }}
                      transition={{ duration: 0.2, delay: isOpen ? 0.15 + index * 0.05 : 0 }}
                      className={`block p-4 rounded-lg transition-all duration-200 ${
                        isActive(item.href) 
                          ? 'bg-grounded-50 text-grounded-600 border-l-4 border-grounded-500' 
                          : 'bg-neutral-50 hover:bg-grounded-50 text-neutral-700 hover:text-grounded-500'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="font-medium mb-1">{item.name}</div>
                      <div className="text-sm text-neutral-500">{item.description}</div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Mobile Blog Menu */}
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className={`font-semibold text-lg mb-3 px-4 ${
                  location.pathname.startsWith('/blog')
                    ? 'text-grounded-600'
                    : 'text-neutral-900'
                }`}>Blog Articles</div>
                <div className="space-y-2">
                  {blogItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: isOpen ? 1 : 0,
                        x: isOpen ? 0 : -20 
                      }}
                      transition={{ duration: 0.2, delay: isOpen ? 0.2 + index * 0.05 : 0 }}
                      className={`block p-3 rounded-lg transition-all duration-200 ${
                        isActive(item.href) 
                          ? 'bg-grounded-50 text-grounded-600 border-l-4 border-grounded-500' 
                          : 'bg-neutral-50 hover:bg-grounded-50 text-neutral-700 hover:text-grounded-500'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.bgColor}`}>
                          <item.icon className={item.color} size={18} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="font-medium text-sm">{item.name}</div>
                            <span className={`text-xs px-2 py-1 rounded-full ${item.bgColor} ${item.color} font-medium`}>
                              {item.category}
                            </span>
                          </div>
                          <div className="text-xs text-neutral-500">{item.description}</div>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                  <motion.a
                    href="/blog"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isOpen ? 1 : 0,
                      x: isOpen ? 0 : -20 
                    }}
                    transition={{ duration: 0.2, delay: isOpen ? 0.3 : 0 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-grounded-50 to-earth-50 hover:from-grounded-100 hover:to-earth-100 transition-all duration-200 text-grounded-600 hover:text-grounded-700"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-grounded-500 to-earth-500 flex items-center justify-center">
                      <BookOpen className="text-white" size={18} />
                    </div>
                    <div>
                      <div className="font-medium text-sm">View All Posts</div>
                      <div className="text-xs text-neutral-500">Browse complete blog archive</div>
                    </div>
                  </motion.a>
                </div>
              </div>

              {/* Contact Link */}
              <motion.a
                href="/contact"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : -20 
                }}
                transition={{ duration: 0.2, delay: isOpen ? 0.35 : 0 }}
                className={`block py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                  isActive('/contact')
                    ? 'bg-grounded-50 text-grounded-600 border-l-4 border-grounded-500' 
                    : 'text-neutral-700 hover:bg-neutral-50 hover:text-grounded-500'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </motion.a>
              
              {/* Contact Info */}
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="space-y-3">
                  <a 
                    href="tel:0824583541" 
                    className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-50 hover:bg-grounded-50 transition-colors duration-200 text-neutral-700 hover:text-grounded-500"
                    onClick={() => setIsOpen(false)}
                  >
                    <Phone size={18} className="text-grounded-500" />
                    <span className="font-medium">082 458 3541</span>
                  </a>
                  <a 
                    href="mailto:colleen@mybodybalance.co.za" 
                    className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-50 hover:bg-grounded-50 transition-colors duration-200 text-neutral-700 hover:text-grounded-500"
                    onClick={() => setIsOpen(false)}
                  >
                    <Mail size={18} className="text-grounded-500" />
                    <span className="font-medium">colleen@mybodybalance.co.za</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
