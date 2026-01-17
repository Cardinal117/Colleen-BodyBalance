import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About Me', href: '/about' },
        { name: 'Personal Training', href: '/personal-training' },
        { name: 'Virtual Trainer', href: '/virtual-trainer' },
        { name: 'Testimonials', href: '/testimonials' },
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Personal Training', href: '/personal-training' },
        { name: 'Virtual Training', href: '/virtual-trainer' },
        { name: 'Nutrition Coaching', href: '/nutrition' },
        { name: 'Lifestyle Coaching', href: '/lifestyle' },
        { name: 'Grounded Nutrition', href: '/grounded' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/bodybalancecolleen', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/body_balance_forlife/', label: 'Instagram' },
    { icon: Instagram, href: 'https://www.instagram.com/grounded_balanced/', label: 'Grounded Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/groundedsa', label: 'Grounded Facebook' },
  ];

  return (
    <footer className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-grounded-500 to-earth-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="font-heading text-2xl font-bold">Body Balance</span>
            </div>
            
            <p className="text-neutral-300 mb-6 leading-relaxed">
              Exercise your Body, Mind & Soul. Nourish your Body with GROUNDED meals. Find your perfect balance with personalized training and nutrition.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:0824583541" className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors">
                <Phone size={18} />
                <span className="text-sm">082 458 3541</span>
              </a>
              <a href="mailto:colleen@mybodybalance.co.za" className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors">
                <Mail size={18} />
                <span className="text-sm">colleen@mybodybalance.co.za</span>
              </a>
              <div className="flex items-center space-x-3 text-neutral-300">
                <MapPin size={18} />
                <span className="text-sm">South Africa</span>
              </div>
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="font-heading text-lg font-semibold mb-4 text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-neutral-300 hover:text-grounded-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-neutral-700 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <span className="text-sm text-neutral-400">Follow us:</span>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-grounded-400 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-neutral-400">
              <span>Made with</span>
              <Heart size={16} className="text-grounded-500" />
              <span>by Body Balance</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-700">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-neutral-400">
              © {new Date().getFullYear()} Body Balance. All Rights Reserved.
            </p>
            
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-neutral-400 hover:text-grounded-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-neutral-400 hover:text-grounded-400 transition-colors">
                Terms of Service
              </a>
              <a href="/admin/login" className="text-neutral-400 hover:text-grounded-400 transition-colors">
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
