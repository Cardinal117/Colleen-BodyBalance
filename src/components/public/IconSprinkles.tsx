// components/public/IconSprinkles.tsx
import { motion } from 'framer-motion';
import {
    Dumbbell, Activity, Heart, Zap, Leaf, Apple, Salad, Users,
    Target, Award, Clock, TrendingUp, Battery, Flame, Moon, Sun,
    Cloud, Droplets, Waves, Mountain, CheckCircle, Sparkles, Trophy,
    Star, Globe, Shield, AlertCircle, Cookie, Coffee, Pizza, Cake,
    Carrot, Beef, Fish, Egg, Milk, Wheat, Coffee as CoffeeIcon,
    Thermometer, Wind, CloudRain, CloudSnow, CloudLightning, CloudSun,
    CloudMoon, CloudDrizzle, CloudHail, CloudFog, CloudOff, Cloud as CloudIcon,
    Bird, Cat, Dog, Rabbit, Fish as FishIcon, Bug,
    Flower, Sprout, TreePalm, Apple as AppleIcon,
    Banana, Grape, Cherry,
    Carrot as CarrotIcon,
    EggFried, Cookie as CookieIcon, IceCream, Candy,
    Wine, Beer, CupSoda, Milk as MilkIcon
} from 'lucide-react';

interface IconSprinklesProps {
    opacity?: number;
    density?: 'light' | 'medium' | 'heavy';
    colorTheme?: 'green' | 'earth' | 'neutral' | 'mixed';
    iconTypes?: 'fitness' | 'nutrition' | 'nature' | 'all';
}

const IconSprinkles = ({
    opacity = 0.15,
    density = 'medium',
    colorTheme = 'mixed',
    iconTypes = 'all'
}: IconSprinklesProps) => {

    // Define colors based on theme
    const colors = {
        green: ['text-grounded-400', 'text-grounded-500', 'text-grounded-600'],
        earth: ['text-earth-400', 'text-earth-500', 'text-earth-600'],
        neutral: ['text-neutral-400', 'text-neutral-500', 'text-neutral-600'],
        mixed: ['text-grounded-400', 'text-earth-500', 'text-neutral-500', 'text-grounded-600', 'text-earth-600']
    };

    // Get appropriate color palette
    const colorPalette = colors[colorTheme];

    // Filter icons based on type
    const allIcons = [
        // Fitness Icons
        { icon: Dumbbell, category: 'fitness' },
        { icon: Activity, category: 'fitness' },
        { icon: Heart, category: 'fitness' },
        { icon: Zap, category: 'fitness' },
        { icon: Target, category: 'fitness' },
        { icon: Award, category: 'fitness' },
        { icon: Trophy, category: 'fitness' },
        { icon: Star, category: 'fitness' },
        { icon: Shield, category: 'fitness' },
        { icon: TrendingUp, category: 'fitness' },

        // Nutrition Icons
        { icon: Apple, category: 'nutrition' },
        { icon: Leaf, category: 'nutrition' },
        { icon: Salad, category: 'nutrition' },
        { icon: Carrot, category: 'nutrition' },
        { icon: Banana, category: 'nutrition' },
        { icon: Grape, category: 'nutrition' },
        { icon: Cherry, category: 'nutrition' },
        { icon: EggFried, category: 'nutrition' },
        { icon: Milk, category: 'nutrition' },
        { icon: Wheat, category: 'nutrition' },

        // Nature Icons
        { icon: Flower, category: 'nature' },
        { icon: Sprout, category: 'nature' },
        { icon: TreePalm, category: 'nature' },
        { icon: Cloud, category: 'nature' },
        { icon: Sun, category: 'nature' },
        { icon: Moon, category: 'nature' },
        { icon: Droplets, category: 'nature' },
        { icon: Waves, category: 'nature' },
        { icon: Mountain, category: 'nature' },
        { icon: Bird, category: 'nature' },

        // Other decorative
        { icon: CheckCircle, category: 'all' },
        { icon: Sparkles, category: 'all' },
        { icon: Users, category: 'all' },
        { icon: Clock, category: 'all' },
        { icon: Battery, category: 'all' },
        { icon: Flame, category: 'all' },
        { icon: Globe, category: 'all' },
        { icon: AlertCircle, category: 'all' },
    ];

    // Filter icons based on selected type
    const filteredIcons = allIcons.filter(icon =>
        iconTypes === 'all' || icon.category === iconTypes
    );

    // Determine number of icons based on density
    const iconCount = {
        light: 5,
        medium: 8,
        heavy: 12
    }[density];

    // Generate random positions and sizes for icons
    const generateIcons = () => {
        const icons = [];
        for (let i = 0; i < iconCount; i++) {
            const randomIcon = filteredIcons[Math.floor(Math.random() * filteredIcons.length)];
            const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            const randomSize = Math.floor(Math.random() * 16) + 24; // 24-40px
            const randomX = Math.floor(Math.random() * 90) + 5; // 5-95%
            const randomY = Math.floor(Math.random() * 90) + 5; // 5-95%
            const rotation = Math.floor(Math.random() * 60) - 30; // -30 to 30 degrees
            const animationDelay = Math.random() * 2;
            const animationDuration = 4 + Math.random() * 4; // 4-8 seconds

            // Random animation type
            const animations = ['float', 'pulse', 'rotate', 'bounce'];
            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

            icons.push({
                id: i,
                icon: randomIcon.icon,
                color: randomColor,
                size: randomSize,
                x: randomX,
                y: randomY,
                rotation,
                animationDelay,
                animationDuration,
                animationType: randomAnimation
            });
        }
        return icons;
    };

    const icons = generateIcons();

    // Animation variants
    const variants = {
        float: {
            initial: { y: 0 },
            animate: { y: [0, -20, 0] }
        },
        pulse: {
            initial: { scale: 1, opacity: 0.8 },
            animate: { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }
        },
        rotate: {
            initial: { rotate: 0 },
            animate: { rotate: [0, 15, 0, -15, 0] }
        },
        bounce: {
            initial: { y: 0 },
            animate: { y: [0, -15, 0] }
        }
    };

    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ opacity }}
        >
            {icons.map((item) => (
                <motion.div
                    key={item.id}
                    className={`absolute ${item.color} z-0`}
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
                    }}
                    variants={variants[item.animationType as keyof typeof variants]}
                    animate="animate"
                    initial="initial"
                    transition={{
                        duration: item.animationDuration,
                        delay: item.animationDelay,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                >
                    <item.icon size={item.size} />
                </motion.div>
            ))}
        </div>
    );
};


export default IconSprinkles;