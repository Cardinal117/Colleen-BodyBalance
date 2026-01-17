import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowUp } from 'lucide-react';

const FloatingButtons = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi Colleen! I'd like to inquire about Body Balance services.");
    window.open(`https://wa.me/27824583541?text=${message}`, '_blank');
  };

  return (
    <>
      {/* WhatsApp Button */}
      <motion.button
        onClick={openWhatsApp}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-[1000] w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
      </motion.button>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: showBackToTop ? 1 : 0,
          y: showBackToTop ? 0 : 20,
          scale: showBackToTop ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-28 right-6 z-[1000] w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-grounded-500 to-earth-500 hover:from-grounded-600 hover:to-earth-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 ${
          showBackToTop ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6 md:w-7 md:h-7" />
      </motion.button>
    </>
  );
};

export default FloatingButtons;