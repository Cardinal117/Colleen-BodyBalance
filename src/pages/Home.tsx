import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Dumbbell, Heart, Users, Leaf } from 'lucide-react';
import Navbar from '../components/public/Navbar';
import Hero from '../components/public/Hero';
import ContentCard from '../components/public/ContentCard';
import Footer from '../components/public/Footer';
import IconSprinkles from '../components/public/IconSprinkles';
import FloatingButtons from '../components/public/FloatingButtons';
import { blogStorageService, categoryStorageService } from '../lib/blogStorage';
import type { BlogPost, BlogCategory } from '../lib/supabase';

const Home = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categoriesData, setCategoriesData] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        // Load posts from JSON storage
        const posts = blogStorageService.getPublishedPosts();
        setBlogPosts(posts);

        // Load categories for color mapping
        const allCategories = categoryStorageService.getCategories();
        setCategoriesData(allCategories);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogData();
  }, []);

  // Helper functions to get category colors and names
  const getCategoryColors = (category: string): { color: string; bgColor: string; name: string } => {
    const cat = categoriesData.find(c => c.id === category);
    return {
      color: cat?.color || 'text-grounded-800',
      bgColor: cat?.bgColor || 'bg-grounded-100',
      name: cat?.name || category
    };
  };

  const getCategoryName = (category: string): string => {
    const cat = categoriesData.find(c => c.id === category);
    return cat?.name || category;
  };

  const services = [
    {
      title: 'Personal Training',
      description: 'One-on-one personal training in private gym facilities. Challenge yourself, push harder than yesterday, and respect your body - you only have ONE.',
      href: '/personal-training',
      category: 'Training',
      cardStyle: 'green' as const,
      icon: 'dumbbell' as const
    },
    {
      title: 'Virtual Trainer',
      description: 'Sign up for your own Virtual Personal Trainer. We offer Gym/Home Fitness Training Programs plus Nutritional, Lifestyle and Fitness screening.',
      href: '/virtual-trainer',
      category: 'Online',
      cardStyle: 'earth' as const,
      icon: 'heart' as const  // Changed from 'monitor' to 'heart'
    },
    {
      title: 'Grounded Nutrition',
      description: 'Nourish your body with GROUNDED meals. Discover homemade plant-based meals and detox programs for a balanced lifestyle.',
      href: '/grounded',
      category: 'Nutrition',
      cardStyle: 'gradient' as const,
      icon: 'leaf' as const
    }
  ];

  const blogPostsOld = [
    {
      title: 'Survival is Possible with a Strong Mind and Strong Body',
      description: 'Read on my blog, how my positivity in life was put to the test when I became a statistic of Breast Cancer.',
      href: '/blog/survival-strong-mind-body',
      category: 'Personal Story',
      date: '2024-01-15',
      author: 'Colleen Burger',
      readTime: '5 min read',
      cardStyle: 'green' as const
    },
    {
      title: 'Finding Balance in a Hectic World',
      description: 'Each day we embark on a never ending quest to achieve equilibrium. Learn practical tips for maintaining work-life balance.',
      href: '/blog/finding-balance-hectic-world',
      category: 'Lifestyle',
      date: '2024-01-10',
      author: 'Colleen Burger',
      readTime: '3 min read',
      cardStyle: 'white' as const
    },
    {
      title: 'The Power of Plant-Based Nutrition',
      description: 'Discover how plant-based meals can transform your energy levels and overall health with GROUNDED nutrition.',
      href: '/blog/power-plant-based-nutrition',
      category: 'Nutrition',
      date: '2024-01-05',
      author: 'Colleen Burger',
      readTime: '4 min read',
      cardStyle: 'earth' as const
    }
  ];

  const testimonials = [
    {
      name: 'Ange',
      text: 'Dearest Coll, Where do I start..there aren\'t enough words to say how I feel..but I\'ll start with Thank You. Thank you from the bottom of my heart for all your encouragement, support, kindness and guidance! Every day spent with you has been an absolute pleasure (sometimes there\'s been physical pain 🙂 but it\'s always been good!!! I\'ve enjoyed Bootcamp so much and I am loving being fit and healthy! You are the most amazing person and continue to inspire and motivate me and everyone around you. The enthusiasm, kindness and positive outlook you have on people, nature and everyday things is so inspiring! I wish you all the very best on this new path you are taking and know you will make a success of whatever comes your way. No matter where you are or where life leads us, you will always have my friendship and will forever be in my heart. May you always have Peace of Mind, Happiness in your Heart and Love in Your Soul. All my love, Ange',
      rating: 5,
      preview: 'Dearest Coll, Where do I start..there aren\'t enough words to say how I feel..but I\'ll start with Thank You. Thank you from the bottom of my heart for all your encouragement, support, kindness and guidance!'
    },
    {
      name: 'Justine',
      text: 'Wow – what to say! The best part about exercising has been you, Colleen, whom we are going to miss dearly. You have always been encouraging, patient and understanding and you explain exercises and help with all our complaints of injuries / strains and put up with my whining about cardio which I hate!! You are always on top form and in a good mood and laugh a lot and we are at loss to understand how you manage to maintain that calm demeanor when you are up every single day starting training from 5h30 to 6h30 and then again every evening – five days a week! You manage to balance this with always looking fresh and happy and still finding time to sort your working day and family commitments. All in all Colleen you are just such a lovely, kind, caring wholesome person – We are going to miss you Colleen and my final closing for you is that I pray that you will continue to be a light to those around you. Justine xx',
      rating: 5,
      preview: 'Wow – what to say! The best part about exercising has been you, Colleen, whom we are going to miss dearly. You have always been encouraging, patient and understanding and you explain exercises and help with all our complaints.'
    },
    {
      name: 'Karen',
      text: 'Dear Colleen, Thank you so much for your dedication to getting us to exercise and for making it such fun. How you managed to make us bear crawl and do worms and planks is beyond me! It has been lovely getting to know you over the last 2 years. You have such enthusiasm and genuine concern for people no matter what you are going through. My prayer for you is that you walk into the fullness of everything that God wants for you. You deserve so much happiness Colleen and I hope that this new season is full of good things for you. I will never forget not being able to raise my arms to brush my hair and almost dying in my sports bra due to sore muscles!!! And as for the "this is for public toilets" exercise I still laugh every time I go into a public loo! You made us laugh when our muscles were crying and you even managed to get me to run and I will always be grateful! You are a woman of strength and grace Colleen and I pray that you know how precious you are to God and how loved you are. We are going to miss you! Lots of love, Karen',
      rating: 5,
      preview: 'Thank you so much for your dedication to getting us to exercise and for making it such fun. How you managed to make us bear crawl and do worms and planks is beyond me!'
    },
    {
      name: 'Richard',
      text: 'Some years ago my right leg was amputated above the knee and, after I finally had a prosthesis fitted, I required training to improve my fitness, balance and general wellbeing, both physical and mental. Over the years Colleen has taken me, step by step through a series of programmes with patience, kindness, and steely determination which have helped me through some very difficult times. Without our twice weekly sessions I would not be where I am now. PS I am now 74 years old !!! Richard',
      rating: 5,
      preview: 'Some years ago my right leg was amputated above the knee and, after I finally had a prosthesis fitted, I required training to improve my fitness, balance and general wellbeing, both physical and mental.'
    },
    {
      name: 'Ann',
      text: 'Dear Colleen, From the beginning it\'s been awesome to have an \'almost-personal trainer\' in an outdoor and fun environment! You\'ve kept me active when I was threatening to join the league of serious couch potatoes. It\'s been just the best, and I\'m not really sure how to face exercise without you in future … Who\'s going to listen to me bemoaning lost weights and stolen mats?? Sigh. I really have enjoyed the bootcamp stint, Colleen. Thank-you. And I\'m certainly not alone. I don\'t know anyone who hasn\'t enjoyed it, no matter how few or how many they\'ve done. I know things will turn out well in Jhb. But if you get homesick and can convince the gang to return, you do know where to find some enthusiastic campers. Thanks for everything, Ann',
      rating: 5,
      preview: 'From the beginning it\'s been awesome to have an \'almost-personal trainer\' in an outdoor and fun environment! You\'ve kept me active when I was threatening to join the league of serious couch potatoes.'
    },
    {
      name: 'Pamela',
      text: 'When I first came for a trial session with Colleen Burger, she described her work as encouraging her clients to move towards having a healthier "lifestyle". That is what drew me to her and it is exactly what I am achieving. I have been overweight, sluggish and generally feeling unhealthy for at least 11 to 12 years. Under Colleen\'s guidance I have come to understand what my body needs to function at its absolute best in order to help me sustain a happy successful existence. Who would have thought that my physical health would contribute in such a direct way to my overall focus and general performance? I have gone from being frustrated and angry with my body to being excited and motivated by it! I can\'t wait to see what it will show me is possible! It is so great to work with a trainer like Colleen who delivers and takes time to understand you and your temperament so that she is able to naturally shift you out of your comfort zone into your untapped potential. Forever grateful and inspired. Pamela',
      rating: 5,
      preview: 'When I first came for a trial session with Colleen Burger, she described her work as encouraging her clients to move towards having a healthier "lifestyle". That is what drew me to her and it is exactly what I am achieving.'
    },
    {
      name: 'Sharin',
      text: 'My motivation 8 months ago to join Body Balance was an ongoing back pain. Colleen\'s knowledge and ability to adapt exercise to improve specific body muscles has all but eliminated my problem. The bonus weight and centimetre loss as well, as well as body fat and muscle mass, has made me feel so much better physically. Thank you Colleen! Sharin',
      rating: 5,
      preview: 'My motivation 8 months ago to join Body Balance was an ongoing back pain. Colleen\'s knowledge and ability to adapt exercise to improve specific body muscles has all but eliminated my problem.'
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(null);

  const nextTestimonial = () => {
    if (expandedTestimonial === null) {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (expandedTestimonial === null) {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const goToTestimonial = (index: number) => {
    if (expandedTestimonial === null) {
      setCurrentTestimonial(index);
    }
  };

  const toggleReadMore = (index: number) => {
    setExpandedTestimonial(expandedTestimonial === index ? null : index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (expandedTestimonial === null) {
        nextTestimonial();
      }
    }, 6000); // Auto-rotate every 4 seconds

    return () => clearInterval(interval);
  }, [expandedTestimonial]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-grounded-50 via-white to-earth-50 relative overflow-hidden">
        {/* NEW: Icon Sprinkles - VISIBLE icons */}
        <IconSprinkles
          opacity={0.25}  // More visible!
          density="medium"
          colorTheme="green"
          iconTypes="fitness"  // Only fitness icons for this section
        />

        <div className="container relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-grounded-100 text-grounded-700 px-4 py-2 rounded-full mb-4">
              <Leaf size={16} />
              <span className="text-sm font-medium">Our Services</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Transform Your <span className="text-gradient">Health Journey</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Discover our comprehensive approach to health and wellness, combining fitness training with proper nutrition
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ContentCard
                  title={service.title}
                  description={service.description}
                  href={service.href}
                  variant="service"
                  category={service.category}
                  cardStyle={service.cardStyle}
                  icon={service.icon}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-gradient-to-br from-earth-50 to-grounded-50 relative overflow-hidden">
        {/* NEW: Icon Sprinkles - Nutrition theme */}
        <IconSprinkles
          opacity={0.2}
          density="medium"
          colorTheme="earth"
          iconTypes="nutrition"  // Only nutrition icons
        />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-earth-100 text-earth-700 px-4 py-2 rounded-full mb-6">
                <Heart size={16} />
                <span className="text-sm font-medium">Our Philosophy</span>
              </div>

              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                The <span className="text-gradient">Balance</span> Approach
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-grounded-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-2">BALANCE</h3>
                    <p className="text-neutral-600">
                      Each day we embark on a never ending quest to achieve equilibrium. We strive to work hard, play hard and "balance" this out with family time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-earth-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Dumbbell className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-2">EXERCISE</h3>
                    <p className="text-neutral-600">
                      DO it because YOU can. Challenge yourself - push harder than you did yesterday. Respect your body – you only have ONE. Never lose your sense of humour – HAVE FUN!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-grounded-400 to-earth-400 rounded-2xl shadow-xl p-8 text-white">
                <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-16 h-16 text-white mx-auto mb-4" />
                    <h3 className="font-heading text-2xl font-bold mb-2">Join Our Community</h3>
                    <p className="text-white/90 mb-6">Start your journey to a balanced life today</p>
                    <button className="bg-white text-grounded-600 hover:bg-grounded-50 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* NEW: Icon Sprinkles - Mixed icons */}
        <IconSprinkles
          opacity={0.15}
          density="light"
          colorTheme="mixed"
          iconTypes="all"  // All types of icons
        />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-grounded-100 text-grounded-700 px-4 py-2 rounded-full mb-4">
              <Star size={16} />
              <span className="text-sm font-medium">Testimonials</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              What Our <span className="text-gradient">Clients Say</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Real stories from real people who found their balance with Body Balance
            </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5 }}
                  className={`p-8 md:p-12 rounded-2xl shadow-xl ${currentTestimonial % 3 === 0 ? 'bg-gradient-to-br from-grounded-50 to-grounded-100' :
                    currentTestimonial % 3 === 1 ? 'bg-gradient-to-br from-earth-50 to-earth-100' :
                      'bg-white border-2 border-neutral-200'
                    } ${expandedTestimonial === currentTestimonial ? 'md:col-span-3' : ''}`}
                >
                  <div className="max-w-3xl mx-auto">
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-lg md:text-xl text-neutral-600 mb-6 italic text-center leading-relaxed">
                      {expandedTestimonial === currentTestimonial ? testimonials[currentTestimonial].text : testimonials[currentTestimonial].preview}
                      {expandedTestimonial !== currentTestimonial && testimonials[currentTestimonial].text.length > testimonials[currentTestimonial].preview.length && '...'}
                    </p>
                    {testimonials[currentTestimonial].text.length > testimonials[currentTestimonial].preview.length && (
                      <button
                        onClick={() => toggleReadMore(currentTestimonial)}
                        className="text-grounded-600 hover:text-grounded-700 font-medium text-sm transition-colors duration-200"
                      >
                        {expandedTestimonial === currentTestimonial ? 'Read Less' : 'Read More'}
                      </button>
                    )}
                    <p className="text-lg md:text-xl font-semibold text-neutral-900 text-center">
                      - {testimonials[currentTestimonial].name}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons - Only show when no testimonial is expanded */}
            {expandedTestimonial === null && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-grounded-600 hover:bg-white hover:text-grounded-700 rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 z-10"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} className="md:w-6 md:h-6" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-grounded-600 hover:bg-white hover:text-grounded-700 rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 z-10"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} className="md:w-6 md:h-6" />
                </button>
              </>
            )}

            {/* Dots Indicator - Only show when no testimonial is expanded */}
            {expandedTestimonial === null && (
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${index === currentTestimonial
                      ? 'bg-grounded-500 w-8 md:w-12'
                      : 'bg-neutral-300 hover:bg-neutral-400'
                      }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-grounded-50 relative overflow-hidden">
        {/* NEW: Icon Sprinkles - Nature theme */}
        <IconSprinkles
          opacity={0.18}
          density="medium"
          colorTheme="mixed"
          iconTypes="nature"  // Nature icons for blog
        />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-white text-grounded-700 px-4 py-2 rounded-full mb-4 shadow-sm">
              <Leaf size={16} />
              <span className="text-sm font-medium">Latest Blog Posts</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Health & Wellness <span className="text-gradient">Insights</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Tips, stories, and insights on health, fitness, and balanced living
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {blogPosts.slice(0, 3).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ContentCard
                  title={post.title}
                  href={`/blog/${post.slug}`}
                  variant="blog"
                  category={getCategoryName(post.category)}
                  categoryColor={getCategoryColors(post.category).color}
                  categoryBgColor={getCategoryColors(post.category).bgColor}
                  author={post.author}
                  readTime={post.read_time}
                  likes={post.likes}
                  views={post.views}
                  cardStyle="white" description={''} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.a
              href="/blog"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              View All Posts
            </motion.a>
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default Home;