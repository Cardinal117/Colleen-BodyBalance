import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import WorkoutBackground from '../components/public/WorkoutBackground';
import { Phone, Mail, MapPin, Send, Clock, MessageSquare, MessageCircle, ArrowUp } from 'lucide-react';
import IconSprinkles from '../components/public/IconSprinkles';
import FloatingButtons from '../components/public/FloatingButtons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

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
    const message = encodeURIComponent("Hi! I'd like to inquire about personal training with Body Balance.");
    window.open(`https://wa.me/27824583541?text=${message}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '082 458 3541',
      href: 'tel:0824583541'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'colleen@mybodybalance.co.za',
      href: 'mailto:colleen@mybodybalance.co.za'
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Within 24 hours',
      href: ''
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-grounded-50 via-white to-earth-50 relative overflow-hidden">
        <IconSprinkles
          opacity={0.2}
          density="medium"
          colorTheme="green"
          iconTypes="all"
        />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-grounded-100 text-grounded-700 px-4 py-2 rounded-full mb-6">
              <MessageSquare size={16} />
              <span className="text-sm font-medium">Get In Touch</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Contact <span className="text-gradient">Body Balance</span>
            </h1>

            <p className="text-lg text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Ready to start your journey to better health? Get in touch with Colleen Burger,
              your personal Trainer & GROUNDED Foodie.
            </p>

            {/* Quick Contact Info */}
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-grounded-500 to-earth-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{info.label}</h3>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-grounded-500 hover:text-grounded-600 transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-neutral-600">{info.value}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <IconSprinkles
          opacity={0.15}
          density="light"
          colorTheme="neutral"
          iconTypes="fitness"
        />
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-6">
                Send Me a <span className="text-gradient">Message</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-grounded-500 focus:border-transparent transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-grounded-500 focus:border-transparent transition-all duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-grounded-500 focus:border-transparent transition-all duration-200"
                    placeholder="+27 82 458 3541"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-grounded-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell me about your fitness and nutrition goals..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex items-center justify-center space-x-2 w-full md:w-auto"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-grounded-50 to-earth-50 rounded-2xl p-8 h-full">
                <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-6">
                  Let's Find Your Balance Together
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-grounded-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">Location</h4>
                      <p className="text-neutral-600">South Africa</p>
                      <p className="text-sm text-neutral-500">Private gym facilities available</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-earth-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">Availability</h4>
                      <p className="text-neutral-600">Flexible scheduling</p>
                      <p className="text-sm text-neutral-500">Early morning & evening sessions</p>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="font-semibold text-neutral-900 mb-3">What to Expect</h4>
                    <ul className="space-y-2 text-neutral-600">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-grounded-500 rounded-full"></div>
                        <span>Personalized fitness assessment</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-grounded-500 rounded-full"></div>
                        <span>Custom nutrition guidance</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-grounded-500 rounded-full"></div>
                        <span>Ongoing support & motivation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-grounded-500 rounded-full"></div>
                        <span>GROUNDED meal recommendations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/27824583541?text=Hi%20Eric%2C%20I'd%20like%20to%20book%20a%20lesson%20or%20delivery"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="whatsapp-bubble fixed bottom-6 right-6 z-[1000]"
        target="_blank"
        aria-label="Chat with us on WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </motion.a>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0, y: showBackToTop ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="back-to-top-btn fixed bottom-24 right-6 z-[1000]"
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </motion.button>

      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default Contact;
