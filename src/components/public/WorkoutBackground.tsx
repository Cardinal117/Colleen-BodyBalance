import { motion } from 'framer-motion';
import { 
  Dumbbell, Activity, Heart, Zap, TrendingUp, Award, Target, Users, Clock,
  Battery, Calendar, Flame, Moon, Sun, Cloud, Droplets, Waves, Mountain, Leaf,
  CheckCircle, Sparkles, Trophy, Star, Settings, Globe, Shield, AlertCircle
} from 'lucide-react';

interface WorkoutBackgroundProps {
  opacity?: number;
  className?: string;
  density?: 'light' | 'medium' | 'dense';
  colorTheme?: 'neutral' | 'blue' | 'green' | 'purple';
}

const WorkoutBackground = ({ 
  opacity = 0.08, 
  className = '',
  density = 'medium',
  colorTheme = 'neutral'
}: WorkoutBackgroundProps) => {
  
  // WhatsApp-inspired color themes
  const themes = {
    neutral: {
      icon: 'text-neutral-800/30',
      circle: 'bg-neutral-400/15',
      line: 'from-neutral-300/10 via-neutral-400/15 to-neutral-300/10',
      gradient: 'from-neutral-50/10 via-transparent to-neutral-100/10'
    },
    blue: {
      icon: 'text-blue-500/25',
      circle: 'bg-blue-400/10',
      line: 'from-blue-300/10 via-blue-400/15 to-blue-300/10',
      gradient: 'from-blue-50/5 via-transparent to-blue-100/5'
    },
    green: {
      icon: 'text-emerald-500/25',
      circle: 'bg-emerald-400/10',
      line: 'from-emerald-300/10 via-emerald-400/15 to-emerald-300/10',
      gradient: 'from-emerald-50/5 via-transparent to-emerald-100/5'
    },
    purple: {
      icon: 'text-purple-500/25',
      circle: 'bg-purple-400/10',
      line: 'from-purple-300/10 via-purple-400/15 to-purple-300/10',
      gradient: 'from-purple-50/5 via-transparent to-purple-100/5'
    }
  };

  const theme = themes[colorTheme];

  // WhatsApp-like chat bubbles style background elements
  const workoutIcons = [
    // Large decorative elements (WhatsApp-style bubbles)
    { icon: Activity, size: 28, position: 'top-5 left-5', animation: 'animate-float', color: theme.icon },
    { icon: Heart, size: 24, position: 'top-12 right-16', animation: 'animate-pulse-slow', color: theme.icon },
    { icon: Dumbbell, size: 22, position: 'top-1/4 left-12', animation: 'animate-float-delayed', color: theme.icon },
    { icon: Zap, size: 20, position: 'top-1/3 right-8', animation: 'animate-bounce-slow', color: theme.icon },
    { icon: Target, size: 26, position: 'top-2/5 left-1/4', animation: 'animate-float', color: theme.icon },
    { icon: TrendingUp, size: 18, position: 'top-2/3 right-1/3', animation: 'animate-pulse-slow', color: theme.icon },
    { icon: Award, size: 24, position: 'bottom-1/4 left-10', animation: 'animate-float-delayed', color: theme.icon },
    { icon: Users, size: 30, position: 'bottom-12 right-12', animation: 'animate-bounce-slow', color: theme.icon },
    { icon: Clock, size: 16, position: 'bottom-1/3 left-1/5', animation: 'animate-float', color: theme.icon },
    { icon: Battery, size: 20, position: 'bottom-8 right-20', animation: 'animate-pulse-slow', color: theme.icon },
    
    // More subtle elements (like WhatsApp's subtle background patterns)
    { icon: Flame, size: 14, position: 'top-20 left-24', animation: 'animate-pulse-very-slow', color: theme.icon },
    { icon: Moon, size: 18, position: 'top-32 right-32', animation: 'animate-float', color: theme.icon },
    { icon: Sun, size: 16, position: 'top-40 left-40', animation: 'animate-pulse-slow', color: theme.icon },
    { icon: Cloud, size: 22, position: 'top-1/2 right-40', animation: 'animate-float-delayed', color: theme.icon },
    { icon: Droplets, size: 12, position: 'bottom-40 left-32', animation: 'animate-pulse-very-slow', color: theme.icon },
    { icon: Waves, size: 20, position: 'bottom-24 right-48', animation: 'animate-float', color: theme.icon },
    { icon: Mountain, size: 24, position: 'bottom-32 left-48', animation: 'animate-pulse-slow', color: theme.icon },
    { icon: Leaf, size: 16, position: 'top-3/4 right-1/4', animation: 'animate-float-delayed', color: theme.icon },
    { icon: CheckCircle, size: 20, position: 'top-1/6 left-1/6', animation: 'animate-pulse-very-slow', color: theme.icon },
    { icon: Sparkles, size: 14, position: 'bottom-1/6 right-1/6', animation: 'animate-float', color: theme.icon },
  ];

  // WhatsApp-style gradient lines
  const gradientLines = [
    { position: 'top-0 left-0', width: 'w-full', height: 'h-px', direction: 'to-r' },
    { position: 'bottom-0 left-0', width: 'w-full', height: 'h-px', direction: 'to-r' },
    { position: 'top-1/4 left-0', width: 'w-1/2', height: 'h-px', direction: 'to-r' },
    { position: 'top-1/2 right-0', width: 'w-1/3', height: 'h-px', direction: 'to-l' },
    { position: 'top-3/4 left-0', width: 'w-2/3', height: 'h-px', direction: 'to-r' },
    { position: 'bottom-1/3 right-0', width: 'w-1/4', height: 'h-px', direction: 'to-l' },
  ];

  // WhatsApp-inspired diagonal grid pattern
  const gridLines = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    position: `top-${i * 8} left-0`,
    angle: 'rotate-12'
  }));

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
    >
      {/* WhatsApp-inspired subtle gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`}></div>
      
      {/* WhatsApp-style grid pattern (very subtle) */}
      <div className="absolute inset-0">
        {gridLines.map((line) => (
          <div
            key={line.id}
            className={`absolute ${line.position} w-full h-px bg-gradient-to-r ${theme.line} ${line.angle} opacity-5`}
          />
        ))}
      </div>
      
      {/* WhatsApp-style chat bubble circles */}
      <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full opacity-5 bg-gradient-to-br from-white/20 to-transparent blur-sm"></div>
      <div className="absolute bottom-1/3 left-1/3 w-20 h-20 rounded-full opacity-5 bg-gradient-to-tr from-white/15 to-transparent blur-sm"></div>
      <div className="absolute top-10 right-10 w-12 h-12 rounded-full opacity-5 bg-gradient-to-bl from-white/10 to-transparent blur-sm"></div>
      
      {/* Main background circles (WhatsApp-style subtle blobs) */}
      <div className={`absolute top-10 left-10 w-32 h-32 ${theme.circle} rounded-full filter blur-3xl opacity-30`}></div>
      <div className={`absolute top-1/2 right-20 w-48 h-48 ${theme.circle} rounded-full filter blur-3xl opacity-20`}></div>
      <div className={`absolute bottom-20 left-1/3 w-24 h-24 ${theme.circle} rounded-full filter blur-2xl opacity-25`}></div>
      <div className={`absolute top-1/3 right-1/4 w-40 h-40 ${theme.circle} rounded-full filter blur-3xl opacity-15`}></div>
      <div className={`absolute bottom-1/2 left-1/5 w-36 h-36 ${theme.circle} rounded-full filter blur-2xl opacity-20`}></div>
      
      {/* WhatsApp-style gradient lines */}
      {gradientLines.map((line, index) => (
        <div
          key={index}
          className={`absolute ${line.position} ${line.width} ${line.height} bg-gradient-${line.direction} ${theme.line} opacity-10`}
        />
      ))}
      
      {/* WhatsApp-inspired decorative icons */}
      {workoutIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.position} ${item.color} z-0`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            scale: [0.9, 1.1, 0.9],
            y: [0, -5, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ 
            duration: 8,
            delay: index * 0.4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <item.icon 
            size={item.size} 
            className={`${item.animation} opacity-60`}
          />
        </motion.div>
      ))}
      
      {/* WhatsApp-style floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: density === 'light' ? 8 : density === 'medium' ? 15 : 25 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${theme.circle.replace('bg-', 'bg-opacity-')} rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      {/* WhatsApp-style checkmark pattern */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`check-${i}`}
            className={`absolute ${theme.icon}`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${15 + i * 10}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 6,
              delay: i * 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <CheckCircle size={12} />
          </motion.div>
        ))}
      </div>
      
      {/* WhatsApp-style status indicator dots */}
      <div className="absolute top-1/5 right-1/5 flex space-x-1">
        {[1, 2, 3].map((dot) => (
          <motion.div
            key={dot}
            className={`w-1 h-1 ${theme.circle} rounded-full`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 1.5,
              delay: dot * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkoutBackground;