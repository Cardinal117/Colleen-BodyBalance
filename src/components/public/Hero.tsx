// components/public/Hero.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Dumbbell, Activity, Users, Target, Zap, Globe, Phone, Mail } from 'lucide-react';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    '/balance-stone-2.png',
    '/exercise-banner.png',
    '/lifestyle-banner.png',
    '/virtual-trainer-banner.png'
  ];

  const imageContent = [
    {
      title: 'Personal Training',
      subtitle: 'Private gym coaching',
      description: 'Challenge yourself & respect your body',
      color: 'from-grounded-500 to-earth-500',
      abbreviation: 'PT',
      icon: Dumbbell,
      iconColor: 'text-grounded-500'
    },
    {
      title: 'Fitness Training',
      subtitle: 'Transform your body',
      description: 'Have fun while getting fit',
      color: 'from-orange-500 to-red-500',
      abbreviation: 'FT',
      icon: Activity,
      iconColor: 'text-orange-500'
    },
    {
      title: 'Lifestyle Balance',
      subtitle: 'Work-life harmony',
      description: 'Achieve equilibrium daily',
      color: 'from-blue-500 to-purple-500',
      abbreviation: 'LB',
      icon: Users,
      iconColor: 'text-blue-500'
    },
    {
      title: 'Virtual Training',
      subtitle: 'Online coaching',
      description: 'Train anywhere, anytime',
      color: 'from-cyan-500 to-blue-500',
      abbreviation: 'VT',
      icon: Globe,
      iconColor: 'text-cyan-500'
    }
  ];

  const currentContent = imageContent[currentImageIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24 lg:pt-0"
      style={{
        backgroundImage: `url('/home-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Background Elements - Simplified for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 md:w-80 md:h-80 bg-grounded-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-soft"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 md:w-80 md:h-80 bg-earth-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-soft" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Content - Mobile first design */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left order-2 lg:order-1 w-full"
          >
            <div className="inline-flex items-center space-x-2 bg-grounded-100/90 backdrop-blur-sm text-grounded-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6">
              <Dumbbell size={14} className="md:size-4" />
              <span className="text-xs md:text-sm font-medium">Personal Trainer & GROUNDED Foodie</span>
            </div>
            
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
              Find Your <span className="text-white drop-shadow-md">Balance</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-md">
              Exercise your Body, Mind & Soul. Nourish your Body with GROUNDED meals. 
              Each day we embark on a never ending quest to achieve equilibrium.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start mb-8 md:mb-12">
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center justify-center space-x-2 py-2.5 md:py-3"
              >
                <span className="text-sm md:text-base">Start Your Journey</span>
                <ArrowRight size={16} className="md:size-5" />
              </motion.a>
            </div>

            {/* Compact Contact Info for Mobile */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-6 text-xs md:text-sm text-white/90">
              <div className="flex items-center space-x-2 justify-center lg:justify-start">
                <Phone size={12} className="md:size-4 text-grounded-300" />
                <span>082 458 3541</span>
              </div>
              <div className="flex items-center space-x-2 justify-center lg:justify-start">
                <Mail size={12} className="md:size-4 text-grounded-300" />
                <span>colleen@mybodybalance.co.za</span>
              </div>
            </div>
          </motion.div>

          {/* Image/Visual - Simplified for mobile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-1 lg:order-2 mb-6 md:mb-0 w-full max-w-sm md:max-w-md lg:max-w-none mx-auto"
          >
            <div className="relative z-20">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl p-3 md:p-4 lg:p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="aspect-square overflow-hidden rounded-lg md:rounded-xl relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={carouselImages[currentImageIndex]}
                      alt={`Body Balance ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>
                  
                  {/* Simplified text overlay for mobile */}
                  <motion.div 
                    key={`overlay-${currentImageIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-3 md:p-4 rounded-lg md:rounded-xl"
                  >
                    <div className="text-white">
                      <div className="text-base md:text-lg lg:text-xl font-bold mb-0.5">{currentContent.title}</div>
                      <div className="text-xs md:text-sm opacity-90">{currentContent.subtitle}</div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Simple Carousel Indicators */}
                <div className="flex justify-center space-x-1.5 md:space-x-2 mt-3 md:mt-4">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors duration-200 ${
                        index === currentImageIndex ? 'bg-grounded-500' : 'bg-neutral-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Simplified service icons for mobile */}
              <motion.div 
                key={`icons-${currentImageIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="absolute -bottom-2 md:-bottom-4 right-2 md:right-4 z-30"
              >
                <div className="flex space-x-1 md:space-x-2">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-md flex items-center justify-center">
                    <currentContent.icon size={10} className={`${currentContent.iconColor} md:size-4`} />
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Single floating icon for mobile */}
            <motion.div 
              key={`icon-top-${currentImageIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [-5, 5, -5] }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2,
                y: { repeat: Infinity, duration: 3 }
              }}
              className="absolute -top-2 -left-2 bg-white/90 backdrop-blur-sm rounded-lg p-1.5 md:p-2 shadow-lg z-30"
            >
              <Activity size={12} className="md:size-4 text-orange-500" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Simplified Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/80 rounded-full flex justify-center">
          <div className="w-1 h-2 md:h-3 bg-white/80 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;