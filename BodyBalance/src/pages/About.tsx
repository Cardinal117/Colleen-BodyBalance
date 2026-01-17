import { motion } from 'framer-motion';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import WorkoutBackground from '../components/public/WorkoutBackground';
import FloatingButtons from '../components/public/FloatingButtons';
import { Heart, Award, Users, Target, Star } from 'lucide-react';

const About = () => {
  const achievements = [
    {
      icon: Users,
      title: '500+ Clients',
      description: 'Transformed lives through personalized training and nutrition'
    },
    {
      icon: Award,
      title: '15+ Years Experience',
      description: 'Professional fitness and nutrition expertise'
    },
    {
      icon: Heart,
      title: 'Holistic Approach',
      description: 'Mind, body, and soul wellness philosophy'
    },
    {
      icon: Target,
      title: 'Proven Results',
      description: 'Sustainable health transformations'
    }
  ];

  const values = [
    {
      title: 'Balance',
      description: 'Each day we embark on a never ending quest to achieve equilibrium. We strive to work hard, play hard and "balance" this out with family time.',
      color: 'grounded'
    },
    {
      title: 'Exercise',
      description: 'DO it because YOU can. Challenge yourself - push harder than you did yesterday. Respect your body – you only have ONE. Never lose your sense of humour – HAVE FUN!',
      color: 'earth'
    },
    {
      title: 'Nutrition',
      description: 'Nourish your body with GROUNDED meals. Discover homemade plant-based meals and detox programs for a balanced lifestyle.',
      color: 'grounded'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-grounded-50 via-white to-earth-50 relative overflow-hidden">
        <WorkoutBackground opacity={0.03} />
        
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-grounded-100 text-grounded-700 px-4 py-2 rounded-full mb-6">
              <Heart size={16} />
              <span className="text-sm font-medium">About Colleen</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Meet <span className="text-gradient">Colleen Burger</span>
            </h1>
            
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Personal Trainer & GROUNDED Foodie dedicated to helping you find your perfect balance 
              between exercise, nutrition, and lifestyle. With years of experience and a passion 
              for holistic wellness, I'm here to guide you on your health journey.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-grounded-500 to-earth-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="text-white" size={32} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">{achievement.title}</h3>
                  <p className="text-neutral-600 text-sm">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                My <span className="text-gradient">Journey</span>
              </h2>
              
              <div className="space-y-6 text-neutral-600">
                <p>
                  Read on my blog, how my positivity in life was put to the test when I became a statistic of Breast Cancer. 
                  Survival is possible with a strong mind and strong body. This experience shaped my approach to wellness, 
                  teaching me that true health encompasses mental, emotional, and physical wellbeing.
                </p>
                
                <p>
                  Through my personal journey and professional experience, I've developed a holistic approach that combines 
                  personalized fitness training with proper nutrition. I believe that balance is the key to sustainable health 
                  - not extreme diets or punishing workouts, but realistic, enjoyable lifestyle changes.
                </p>
                
                <p>
                  My mission is to help you discover your own path to balance, whether through one-on-one personal 
                  training, virtual coaching, or nourishing your body with GROUNDED's plant-based meals.
                </p>
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
                    <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-2">Certified Professional</h3>
                    <p className="text-neutral-600">Qualified Personal Trainer & Nutrition Coach</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-grounded-50">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              My <span className="text-gradient">Core Values</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The principles that guide every training session and nutrition plan
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-8 rounded-2xl ${
                  value.color === 'grounded' 
                    ? 'bg-gradient-to-br from-grounded-50 to-grounded-100' 
                    : 'bg-gradient-to-br from-earth-50 to-earth-100'
                }`}
              >
                <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-4">{value.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{value.description}</p>
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

export default About;
