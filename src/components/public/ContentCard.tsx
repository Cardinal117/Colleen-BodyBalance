import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Clock, Leaf, Dumbbell, Heart, Monitor } from 'lucide-react';

interface ContentCardProps {
  title: string;
  description: string;
  image?: string;
  category?: string;
  date?: string;
  author?: string;
  readTime?: string;
  href: string;
  variant?: 'service' | 'blog' | 'default';
  cardStyle?: 'white' | 'green' | 'earth' | 'gradient';
  icon?: 'leaf' | 'dumbbell' | 'heart' | 'monitor' | 'none';
}

const ContentCard = ({ 
  title, 
  description, 
  image, 
  category, 
  date, 
  author, 
  readTime, 
  href, 
  variant = 'default',
  cardStyle = 'white',
  icon = 'none'
}: ContentCardProps) => {
  const cardVariants = {
    service: 'hover:shadow-2xl hover:-translate-y-2',
    blog: 'hover:shadow-2xl hover:-translate-y-1',
    default: 'hover:shadow-xl'
  };

  const getCardBackground = () => {
    switch (cardStyle) {
      case 'green':
        return 'bg-gradient-to-br from-grounded-400 to-grounded-600 text-white';
      case 'earth':
        return 'bg-gradient-to-br from-earth-400 to-earth-600 text-white';
      case 'gradient':
        return 'bg-gradient-to-br from-grounded-500 via-earth-500 to-grounded-600 text-white';
      default:
        return 'bg-white text-neutral-900';
    }
  };

  const getIcon = () => {
    switch (icon) {
      case 'leaf':
        return <Leaf size={32} />;
      case 'dumbbell':
        return <Dumbbell size={32} />;
      case 'heart':
        return <Heart size={32} />;
      case 'monitor':
        return <Monitor size={32} />;
      default:
        return null;
    }
  };

  const getTextColor = () => {
    return cardStyle === 'white' ? 'text-neutral-600' : 'text-white/90';
  };

  const getTitleColor = () => {
    return cardStyle === 'white' ? 'text-neutral-900 group-hover:text-gradient' : 'text-white';
  };

  return (
    <motion.a
      href={href}
      className={`card ${cardVariants[variant]} transition-all duration-300 group block ${getCardBackground()}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image or Icon Header */}
      {image ? (
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-grounded-400 to-earth-400"></div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        </div>
      ) : icon !== 'none' ? (
        <div className="relative h-32 overflow-hidden bg-white/10 flex items-center justify-center">
          <div className="text-white/80">
            {getIcon()}
          </div>
        </div>
      ) : null}

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        {category && (
          <div className="text-sm font-medium text-white-500 mb-3">
            {category}
          </div>
        )}
        {/* Blog Meta */}
        {variant === 'blog' && (date || author || readTime) && (
          <div className="flex flex-wrap gap-4 text-sm mb-4">
            {date && (
              <div className={`flex items-center space-x-1 ${getTextColor()}`}>
                <Calendar size={14} />
                <span>{date}</span>
              </div>
            )}
            {author && (
              <div className={`flex items-center space-x-1 ${getTextColor()}`}>
                <User size={14} />
                <span>{author}</span>
              </div>
            )}
            {readTime && (
              <div className={`flex items-center space-x-1 ${getTextColor()}`}>
                <Clock size={14} />
                <span>{readTime}</span>
              </div>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className={`font-heading text-xl font-bold mb-3 transition-colors duration-200 ${getTitleColor()}`}>
          {title}
        </h3>

        {/* Description */}
        <p className={`${getTextColor()} mb-4 line-clamp-3`}>
          {description}
        </p>

        {/* CTA */}
        <div className={`flex items-center space-x-2 transition-colors duration-200 ${
          cardStyle === 'white' ? 'text-grounded-500 group-hover:text-grounded-600' : 'text-white group-hover:text-white/80'
        }`}>
          <span className="font-medium">
            {variant === 'service' ? 'Learn More' : 'Read More'}
          </span>
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </motion.a>
  );
};

export default ContentCard;
