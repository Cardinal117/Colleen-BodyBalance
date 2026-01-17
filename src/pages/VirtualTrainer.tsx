import { motion } from 'framer-motion';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import WorkoutBackground from '../components/public/WorkoutBackground';
import { Monitor, Smartphone, Clock, Users, CheckCircle, Play, Globe, Dumbbell, Activity, Zap, Heart, TrendingUp, Award } from 'lucide-react';
import FloatingButtons from '../components/public/FloatingButtons';
import IconSprinkles from '../components/public/IconSprinkles';

const VirtualTrainer = () => {
  const features = [
    {
      icon: Monitor,
      title: 'Online Training Programs',
      description: 'Access professional workout programs from anywhere in the world with our comprehensive virtual training platform.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Train on your phone, tablet, or computer with our responsive platform designed for all devices.'
    },
    {
      icon: Clock,
      title: 'Train on Your Schedule',
      description: 'No fixed class times - workout whenever it suits you with 24/7 access to training materials.'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Join a community of like-minded individuals on similar health journeys.'
    }
  ];

  const whatYouGet = [
    'Customized fitness training programs for home or gym',
    'Nutritional, Lifestyle and Fitness screening',
    'FREE online advice and support',
    'Exercise video demonstrations and form guides',
    'Progress tracking and goal setting tools',
    'Monthly virtual consultations via video call'
  ];

  const packages = [
    {
      title: 'Basic Virtual',
      price: 'R800',
      duration: 'Monthly',
      description: 'Perfect for self-motivated individuals who need guidance',
      features: [
        'Monthly Workout Plan',
        'Exercise Video Library',
        'Basic Nutrition Guidelines',
        'Email Support',
        'Progress Tracking App'
      ],
      popular: false
    },
    {
      title: 'Premium Virtual',
      price: 'R1,500',
      duration: 'Monthly',
      description: 'Most popular virtual training option with personalized coaching',
      features: [
        'Custom Workout Plans (Updated Weekly)',
        'Video Exercise Library',
        'Personalized Nutrition Plan',
        'Weekly Video Check-ins',
        'Progress Tracking & Analytics',
        'Mobile App Access',
        'Priority Email Support'
      ],
      popular: true
    },
    {
      title: 'Elite Virtual',
      price: 'R2,500',
      duration: 'Monthly',
      description: 'Complete virtual coaching experience with unlimited support',
      features: [
        'Daily Custom Workouts',
        'Premium Video Library',
        'Advanced Nutrition Coaching',
        'Bi-weekly Video Calls',
        'Detailed Progress Analytics',
        'Mobile App with Premium Features',
        '24/7 WhatsApp Support',
        'Meal Planning Service',
        'Home Equipment Consultation'
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

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-earth-100 text-earth-700 px-4 py-2 rounded-full mb-6">
              <Globe size={16} />
              <span className="text-sm font-medium">Virtual Trainer</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Train <span className="text-gradient">Anywhere</span>, Anytime
            </h1>

            <p className="text-lg text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Sign up here for your own Virtual Personal Trainer. We offer Gym/Home Fitness
              Training Programs plus Nutritional, Lifestyle and Fitness screening and FREE online advice.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#programs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                View Programs
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                Free Consultation
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose <span className="text-gradient">Virtual Training</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Flexibility and convenience without compromising on quality
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

      {/* What You Get Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-earth-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                What You <span className="text-gradient">Get</span>
              </h2>

              <div className="space-y-4">
                {whatYouGet.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-earth-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
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
              <div className="bg-gradient-to-br from-earth-100 to-grounded-100 rounded-2xl p-8">
                <div className="aspect-video bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-earth-500 mx-auto mb-4" />
                    <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-2">Start Today</h3>
                    <p className="text-neutral-600 mb-6">Join from anywhere in the world</p>
                    <button className="btn-secondary">
                      Try Free Demo
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-white">
        <IconSprinkles
          opacity={0.18}
          density="medium"
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
              Virtual Training <span className="text-gradient">Programs</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Choose the program that fits your lifestyle and goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl ${index === 1 ? 'bg-gradient-to-br from-earth-500 to-grounded-500 text-white scale-105 shadow-2xl' :
                    'bg-white border-2 border-neutral-200 hover:border-earth-300'
                  } transition-all duration-300`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-earth-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className={`font-heading text-2xl font-bold mb-2 ${index === 1 ? 'text-white' : 'text-neutral-900'
                    }`}>{pkg.title}</h3>
                  <div className={`text-3xl font-bold mb-1 ${index === 1 ? 'text-white' : 'text-earth-500'
                    }`}>{pkg.price}</div>
                  <div className={`text-sm ${index === 1 ? 'text-white/80' : 'text-neutral-600'
                    }`}>{pkg.duration}</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className={`flex-shrink-0 ${index === 1 ? 'text-white' : 'text-earth-500'
                        }`} size={16} />
                      <span className={`text-sm ${index === 1 ? 'text-white/90' : 'text-neutral-600'
                        }`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-lg font-medium transition-colors duration-200 ${index === 1 ? 'bg-white text-earth-600 hover:bg-earth-50' : 'btn-primary'
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

      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default VirtualTrainer;
