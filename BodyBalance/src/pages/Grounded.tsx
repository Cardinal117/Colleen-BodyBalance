import { motion } from 'framer-motion';
import Navbar from '../components/public/Navbar';
import ContentCard from '../components/public/ContentCard';
import Footer from '../components/public/Footer';
import WorkoutBackground from '../components/public/WorkoutBackground';
import { Leaf, Truck, Hand, CheckCircle, Star } from 'lucide-react';
import IconSprinkles from '../components/public/IconSprinkles';

const Grounded = () => {
  const features = [
    {
      icon: Hand,
      title: 'Handmade',
      description: 'Fresh ingredients from our kitchen to your table'
    },
    {
      icon: CheckCircle,
      title: '100% Natural',
      description: 'No preservatives nor additives'
    },
    {
      icon: Truck,
      title: 'Shipping',
      description: 'Collect your order or we can deliver it to your door'
    },
    {
      icon: Leaf,
      title: 'Plant-Based',
      description: 'Our recipes are vegetarian and vegan based'
    }
  ];

  const products = [
    {
      title: 'Moussaka',
      description: 'Traditional Greek-inspired dish with layers of eggplant, plant-based meat sauce, and creamy béchamel. A hearty, satisfying meal that\'s both nutritious and delicious.',
      image: '/grounded_food/Moussaka-plated.webp',
      category: 'Main Meals',
      price: 'R75.00 – R175.00',
      cardStyle: 'green' as const
    },
    {
      title: 'Melanzane',
      description: 'Italian-style eggplant dish with rich tomato sauce and herbs. A Mediterranean favorite that\'s both light and flavorful.',
      image: '/grounded_food/Melanzane-plated.webp',
      category: 'Main Meals',
      price: 'R75.00 – R175.00',
      cardStyle: 'earth' as const
    },
    {
      title: 'Chickpea & Butternut Curry',
      description: 'Warm, aromatic curry with protein-rich chickpeas and sweet butternut squash. Perfect for a cozy, nourishing meal.',
      image: '/grounded_food/Chickpea-and-Butternut-Curry.webp',
      category: 'Main Meals',
      price: 'R55.00 – R150.00',
      cardStyle: 'gradient' as const
    },
    {
      title: 'Veg & Barley Soup',
      description: 'Hearty, wholesome soup packed with seasonal vegetables and nutritious barley. Comfort in a bowl that\'s both filling and healthy.',
      image: '/grounded_food/Veg-and-Barely-soup.webp',
      category: 'Soups',
      price: 'R75.00',
      cardStyle: 'green' as const
    }
  ];

  const benefits = [
    {
      title: 'Curated Products',
      description: 'Carefully selected recipes that are both nutritious and delicious'
    },
    {
      title: 'Detox Programme',
      description: 'Specialized meal plans to cleanse and rejuvenate your body'
    },
    {
      title: 'Balanced Nutrition',
      description: 'Perfect complement to your fitness training with Body Balance'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-grounded-50 via-white to-earth-50 relative overflow-hidden">
        <IconSprinkles
          opacity={0.15}
          density="light"
          colorTheme="neutral"
          iconTypes="nutrition"
        />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-grounded-100 text-grounded-700 px-4 py-2 rounded-full mb-6">
              <Leaf size={16} />
              <span className="text-sm font-medium">GROUNDED Nutrition</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Discover <span className="text-gradient">Homemade</span> Plant-Based Meals
            </h1>

            <p className="text-lg text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              GROUNDED brings you back to earth with nutrition and a balanced lifestyle.
              Fresh, handmade meals that nourish your body and support your fitness journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                View Products
              </motion.a>
              <motion.a
                href="#detox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                Detox Programme
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <IconSprinkles
          opacity={0.15}
          density="light"
          colorTheme="neutral"
          iconTypes="nutrition"
        />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose <span className="text-gradient">GROUNDED</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Quality, freshness, and nutrition in every meal
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

      {/* Products Section */}
      <section id="products" className="py-20 bg-gradient-to-br from-neutral-50 to-grounded-50">
        <IconSprinkles
          opacity={0.15}
          density="light"
          colorTheme="neutral"
          iconTypes="nutrition"
        />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Featured <span className="text-gradient">Products</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Delicious, nutritious meals made with love
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ContentCard
                  title={product.title}
                  description={product.description}
                  image={product.image}
                  href="#"
                  variant="default"
                  category={product.category}
                  cardStyle={product.cardStyle}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a href="https://groundedhealthfood.co.za/shop/" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Shop All Products
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="detox" className="py-20 bg-white">
        <IconSprinkles
          opacity={0.15}
          density="light"
          colorTheme="neutral"
          iconTypes="nutrition"
        />
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Detox <span className="text-gradient">Programme</span>
              </h2>

              <div className="space-y-6">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-grounded-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-2">{benefit.title}</h3>
                      <p className="text-neutral-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="https://groundedhealthfood.co.za/product-category/detox/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Find Out More
                </a>
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
                    <Leaf className="w-16 h-16 text-grounded-500 mx-auto mb-4" />
                    <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-2">Perfect Balance</h3>
                    <p className="text-neutral-600 mb-6">Nutrition that complements your fitness journey</p>
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Grounded;
