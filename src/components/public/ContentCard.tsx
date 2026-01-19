import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Clock, Leaf, Dumbbell, Heart, Monitor } from 'lucide-react';

interface ContentCardProps {
  title: string;
  description: string;
  image?: string;
  category?: string;
  categoryColor?: string;
  categoryBgColor?: string;
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
  categoryColor,
  categoryBgColor,
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
        return 'bg-white text-neutral-900 border border-neutral-200';
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
      className={`relative rounded-2xl overflow-hidden ${cardVariants[variant]} transition-all duration-300 group block ${getCardBackground()} h-full`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image or Icon Header - FIXED */}
      {image ? (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik0xMDAgMTI1TDE1MCAxNzVMMjUwIDc1TDMwMCAxMjVMMzUwIDc1IiBzdHJva2U9IiMyOGE3NDUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iMTUiIGZpbGw9IiNBNjdjNTIiLz4KPGNpcmNsZSBjeD0iMjUwIiBjeT0iMjAwIiByPSIyMCIgZmlsbD0iIzI4YTc0NSIvPgo8L3N2Zz4K';
              console.error(`Failed to load image: ${image}`);
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/20 transition-colors duration-300"></div>
        </div>
      ) : icon !== 'none' ? (
        <div className="relative h-32 overflow-hidden flex items-center justify-center">
          <div className={cardStyle === 'white' ? 'text-grounded-500' : 'text-white/90'}>
            {getIcon()}
          </div>
        </div>
      ) : null}

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        {category && (
          <div className={`text-sm font-medium mb-3 px-2 py-1 rounded-full ${
            categoryBgColor || (cardStyle === 'white' ? 'bg-grounded-100 text-grounded-600' : 'bg-white/20 text-white/80')
          } ${categoryColor || ''}`}>
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
            {variant === 'service' ? 'Learn More' : variant === 'blog' ? 'Read More' : 'View Details'}
          </span>
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </motion.a>
  );
};

export default ContentCard;