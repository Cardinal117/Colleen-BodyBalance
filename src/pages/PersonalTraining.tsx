import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import { Dumbbell, Users, Target, Clock, CheckCircle, Star, ArrowUp, MessageCircle, Activity, Heart, Zap, TrendingUp, Award } from 'lucide-react';
import FloatingButtons from '../components/public/FloatingButtons';
import IconSprinkles from '../components/public/IconSprinkles';

const PersonalTraining = () => {
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
    const message = encodeURIComponent("Hi! I'm interested in personal training with Body Balance.");
    window.open(`https://wa.me/27824583541?text=${message}`, '_blank');
  };
  const features = [
    {
      icon: Users,
      title: 'One-on-One Training',
      description: 'Personalized attention in private gym facilities to ensure you get the most out of every session.'
    },
    {
      icon: Target,
      title: 'Custom Programs',
      description: 'Tailored fitness plans designed specifically for your goals, fitness level, and preferences.'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Early morning and evening sessions available to fit your busy lifestyle.'
    },
    {
      icon: CheckCircle,
      title: 'Proven Results',
      description: 'Track your progress with regular assessments and celebrate your achievements.'
    }
  ];

  const whatToExpect = [
    'Comprehensive fitness assessment and goal setting',
    'Personalized workout plans updated regularly',
    'Nutritional guidance and meal planning support',
    'Progress tracking and regular check-ins',
    'Motivation and accountability throughout your journey',
    'Access to private gym facilities'
  ];

  const packages = [
    {
      title: 'Starter Package',
      price: 'R1,200',
      duration: '4 Sessions',
      description: 'Perfect for beginners to get started with personalized training',
      features: [
        '4 Personal Training Sessions',
        'Initial Fitness Assessment',
        'Basic Nutrition Guidance',
        'Email Support',
        'Progress Tracking'
      ],
      popular: false
    },
    {
      title: 'Transformation Package',
      price: 'R3,500',
      duration: '12 Sessions',
      description: 'Our most popular package for complete body transformation',
      features: [
        '12 Personal Training Sessions',
        'Comprehensive Fitness Assessment',
        'Custom Nutrition Plan',
        'Weekly Check-ins',
        'Progress Photos & Measurements',
        'GROUNDED Meal Recommendations',
        'Priority Scheduling'
      ],
      popular: true
    },
    {
      title: 'Elite Package',
      price: 'R6,000',
      duration: '24 Sessions',
      description: 'Ultimate package for serious fitness enthusiasts',
      features: [
        '24 Personal Training Sessions',
        'Advanced Fitness Assessment',
        'Premium Nutrition Coaching',
        'Bi-weekly Check-ins',
        'Detailed Progress Analytics',
        'GROUNDED Meal Plan Included',
        'Flexible Scheduling',
        'Emergency Support Access',
        'Home Workout Plan'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-grounded-50 via-white to-earth-50 relative overflow-hidden">
        {/* Workout Background Icons */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-grounded-500 rounded-full"></div>
          <div className="absolute top-1/2 right-20 w-48 h-48 bg-earth-500 rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-grounded-400 rounded-full"></div>

          {/* Workout Icons */}
          <div className="absolute top-20 right-10 text-grounded-600">
            <Dumbbell size={40} className="animate-pulse" />
          </div>
          <div className="absolute top-1/3 left-20 text-earth-600">
            <Activity size={35} className="animate-bounce-soft" />
          </div>
          <div className="absolute bottom-32 right-1/4 text-grounded-500">
            <Zap size={30} className="animate-pulse" />
          </div>
          <div className="absolute top-2/3 left-1/4 text-earth-500">
            <Heart size={32} className="animate-bounce-soft" />
          </div>
          <div className="absolute bottom-40 left-10 text-grounded-600">
            <TrendingUp size={28} className="animate-pulse" />
          </div>
          <div className="absolute top-1/2 right-1/3 text-earth-600">
            <Award size={36} className="animate-bounce-soft" />
          </div>
        </div>

                <IconSprinkles
          opacity={0.45}
          density="light"
          colorTheme="neutral"
          iconTypes="fitness"
        />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-grounded-100 text-grounded-700 px-4 py-2 rounded-full mb-6">
              <Dumbbell size={16} />
              <span className="text-sm font-medium">Personal Training</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Transform Your <span className="text-gradient">Body</span>
            </h1>

            <p className="text-lg text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              One-on-one personal training in private gym facilities. Challenge yourself,
              push harder than yesterday, and respect your body – you only have ONE.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#packages"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                View Packages
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                Book Consultation
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Workout Background Icons */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 text-grounded-200">
            <Dumbbell size={32} className="animate-pulse" />
          </div>
          <div className="absolute bottom-20 left-10 text-earth-200">
            <Activity size={28} className="animate-bounce-soft" />
          </div>
          <div className="absolute top-1/3 left-1/4 text-grounded-200">
            <Zap size={24} className="animate-pulse" />
          </div>
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              What Makes Our <span className="text-gradient">Training Different</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Personalized approach that delivers real results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-grounded-500 to-earth-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-grounded-50">
        <IconSprinkles
          opacity={0.45}
          density="light"
          colorTheme="neutral"
          iconTypes="fitness"
        />
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                What to <span className="text-gradient">Expect</span>
              </h2>

              <div className="space-y-4">
                {whatToExpect.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-grounded-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="text-white" size={14} />
                    </div>
                    <p className="text-neutral-600">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-grounded-100 to-earth-100 rounded-2xl p-8">
                <div className="aspect-video bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Star className="w-16 h-16 text-grounded-500 mx-auto mb-4" />
                    <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-2">Private Gym Facilities</h3>
                    <p className="text-neutral-600">Train in a comfortable, private environment</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-white">
        <IconSprinkles
          opacity={0.15}
          density="light"
          colorTheme="neutral"
          iconTypes="fitness"
        />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Training <span className="text-gradient">Packages</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Choose the package that best fits your goals and budget
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl ${index === 1 ? 'bg-gradient-to-br from-grounded-500 to-earth-500 text-white scale-105 shadow-2xl' :
                  'bg-white border-2 border-neutral-200 hover:border-grounded-300'
                  } transition-all duration-300`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-grounded-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className={`font-heading text-2xl font-bold mb-2 ${index === 1 ? 'text-white' : 'text-neutral-900'
                    }`}>{pkg.title}</h3>
                  <div className={`text-3xl font-bold mb-1 ${index === 1 ? 'text-white' : 'text-grounded-500'
                    }`}>{pkg.price}</div>
                  <div className={`text-sm ${index === 1 ? 'text-white/80' : 'text-neutral-600'
                    }`}>{pkg.duration}</div>
                </div>

                <ul className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className={`flex-shrink-0 ${index === 1 ? 'text-white' : 'text-grounded-500'
                        }`} size={16} />
                      <span className={`text-sm ${index === 1 ? 'text-white/90' : 'text-neutral-600'
                        }`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-lg font-medium transition-colors duration-200 ${index === 1 ? 'bg-white text-grounded-600 hover:bg-grounded-50' : 'btn-primary'
                      }`}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Buttons */}
      <motion.button
        onClick={openWhatsApp}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-colors duration-200"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={24} />
      </motion.button>

      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 left-6 bg-grounded-500 hover:bg-grounded-600 text-white p-4 rounded-full shadow-lg z-50 transition-colors duration-200"
        aria-label="Back to top"
      >
        <ArrowUp size={24} />
      </motion.button>

      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default PersonalTraining;
