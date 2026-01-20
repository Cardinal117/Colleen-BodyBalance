import type { BlogPost, BlogCategory } from './supabase';

// JSON Storage Service (Temporary - will be replaced with Supabase)
const STORAGE_KEY = 'bodybalance_blog_posts';
const CATEGORIES_KEY = 'bodybalance_blog_categories';

// Initialize with sample data if empty
const initializeSampleData = () => {
  const existingPosts = localStorage.getItem(STORAGE_KEY);
  const existingCategories = localStorage.getItem(CATEGORIES_KEY);
  
  if (!existingPosts) {
    const samplePosts: BlogPost[] = [
      {
        id: '1',
        title: "The Science Behind Mindful Movement",
        slug: "science-behind-mindful-movement",
        excerpt: "Discover how combining physical exercise with mindfulness techniques can transform your mental and physical well-being.",
        content: `<h1>The Science Behind Mindful Movement</h1>
        <p>In today's fast-paced world, the connection between mind and body has never been more crucial. Mindful movement represents a revolutionary approach to exercise that goes beyond physical benefits.</p>
        
        <h2>What is Mindful Movement?</h2>
        <p>Mindful movement is the practice of being fully present and aware during physical activity. It's about moving with intention, paying attention to sensations, breathing, and the body's responses.</p>
        
        <h3>Key Benefits:</h3>
        <ul>
          <li>Reduced stress and anxiety levels</li>
          <li>Improved body awareness and coordination</li>
          <li>Enhanced mental clarity and focus</li>
          <li>Better emotional regulation</li>
          <li>Increased physical performance</li>
        </ul>
        
        <h2>The Neuroscience Connection</h2>
        <p>Research shows that mindful movement activates specific brain regions associated with attention, emotional regulation, and body awareness. The prefrontal cortex, responsible for executive functions, becomes more active during mindful practices.</p>
        
        <blockquote>
        "The body benefits from movement, and the mind benefits from stillness. When you combine the two, you create a powerful synergy." - Dr. Sarah Johnson
        </blockquote>
        
        <h2>Getting Started</h2>
        <p>Begin with simple exercises like mindful walking, yoga, or tai chi. Focus on your breath, notice sensations in your body, and stay present in the moment.</p>
        
        <h2>Conclusion</h2>
        <p>Mindful movement isn't just another fitness trend—it's a scientifically-backed approach to holistic wellness that can transform your relationship with exercise and your body.</p>`,
        author: "Dr. Sarah Johnson",
        published: true,
        featured_image: "https://picsum.photos/seed/mindful/800/400.jpg",
        category: '1',
        read_time: "5 min",
        likes: 42,
        views: 156,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        title: "Building Sustainable Fitness Habits",
        slug: "building-sustainable-fitness-habits",
        excerpt: "Learn how to create lasting fitness habits that stick, using proven behavioral psychology techniques.",
        content: `<h1>Building Sustainable Fitness Habits</h1>
        <p>Creating lasting fitness habits isn't about willpower—it's about strategy. Understanding the psychology of habit formation can help you build a sustainable fitness routine.</p>
        
        <h2>The Habit Loop</h2>
        <p>Every habit follows a three-step pattern: cue, routine, and reward. By understanding this loop, you can design habits that stick.</p>
        
        <h3>Step 1: Identify Your Cues</h3>
        <p>What triggers your current habits? Time of day, location, emotional state, or specific events can all serve as cues.</p>
        
        <h3>Step 2: Design Your Routine</h3>
        <p>Start small. The key is consistency, not intensity. A 5-minute workout done daily is better than a 1-hour workout done once a month.</p>
        
        <h3>Step 3: Create Immediate Rewards</h3>
        <p>Your brain needs immediate reinforcement. Track your progress, celebrate small wins, and focus on how good you feel after moving.</p>
        
        <h2>Environment Design</h2>
        <p>Make good habits easy and bad habits hard. Lay out your workout clothes the night before. Remove obstacles between you and your fitness goals.</p>
        
        <h2>Conclusion</h2>
        <p>Sustainable fitness habits are built gradually through consistency, smart design, and understanding your own psychology.</p>`,
        author: "Mike Chen",
        published: true,
        featured_image: "https://picsum.photos/seed/habits/800/400.jpg",
        category: '2',
        read_time: "4 min",
        likes: 28,
        views: 89,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '3',
        title: "The Power of Plant-Based Nutrition",
        slug: "power-plant-based-nutrition",
        excerpt: "Discover how plant-based eating can transform your energy levels, improve digestion, and support overall wellness.",
        content: `<h1>The Power of Plant-Based Nutrition</h1>
        <p>Plant-based nutrition is more than just a diet—it's a lifestyle choice that can dramatically improve your health, energy levels, and overall well-being. Let's explore the science and practical benefits of embracing plant-based eating.</p>
        
        <h2>What Makes Plant-Based Eating Powerful?</h2>
        <p>Plant-based diets focus on whole foods derived from plants: fruits, vegetables, whole grains, legumes, nuts, and seeds. These foods are packed with fiber, vitamins, minerals, and phytonutrients that work together to optimize your body's functions.</p>
        
        <h3>Key Benefits:</h3>
        <ul>
          <li>Increased energy and vitality</li>
          <li>Improved digestion and gut health</li>
          <li>Enhanced immune system function</li>
          <li>Better weight management</li>
          <li>Reduced inflammation</li>
          <li>Lower risk of chronic diseases</li>
        </ul>
        
        <h2>Getting Started with Plant-Based Eating</h2>
        <p>Transitioning to a plant-based diet doesn't have to be overwhelming. Start with simple changes:</p>
        
        <h3>Step 1: Add More Plants</h3>
        <p>Begin by adding more vegetables to your current meals. Try adding a side salad to lunch or extra vegetables to your dinner.</p>
        
        <h3>Step 2: Try Meatless Mondays</h3>
        <p>Commit to one meat-free day per week. This helps you explore new recipes and build confidence.</p>
        
        <h3>Step 3: Explore Plant Proteins</h3>
        <p>Discover the variety of plant-based proteins: lentils, beans, tofu, tempeh, nuts, and seeds.</p>
        
        <h2>Practical Tips for Success</h2>
        <p>Here are some strategies to make your plant-based journey enjoyable and sustainable:</p>
        
        <ul>
          <li><strong>Meal Prep:</strong> Prepare plant-based meals in advance to avoid last-minute decisions</li>
          <li><strong>Spice It Up:</strong> Use herbs and spices to add flavor without extra calories</li>
          <li><strong>Stay Hydrated:</strong> Drink plenty of water throughout the day</li>
          <li><strong>Listen to Your Body:</strong> Pay attention to how different foods make you feel</li>
        </ul>
        
        <h2>Sample Day of Plant-Based Eating</h2>
        <p>Here's what a typical plant-based day might look like:</p>
        
        <h3>Breakfast (7:00 AM)</h3>
        <p>Oatmeal with berries, nuts, and seeds, or a green smoothie with spinach, banana, and plant-based protein powder.</p>
        
        <h3>Lunch (12:30 PM)</h3>
        <p>Large salad with mixed greens, roasted vegetables, chickpeas, and tahini dressing, or a lentil soup with whole grain bread.</p>
        
        <h3>Dinner (6:30 PM)</h3>
        <p>Vegetable stir-fry with tofu and brown rice, or black bean burgers on whole grain buns with sweet potato fries.</p>
        
        <h3>Snacks</h3>
        <p>Fresh fruit, nuts, hummus with vegetables, or plant-based yogurt.</p>
        
        <blockquote>
        "Let food be thy medicine and medicine be thy food." - Hippocrates
        </blockquote>
        
        <h2>Overcoming Common Challenges</h2>
        <p>Every journey has its challenges. Here's how to handle common plant-based eating obstacles:</p>
        
        <h3>Cravings</h3>
        <p>Cravings are normal. Try plant-based alternatives that satisfy similar taste and texture preferences.</p>
        
        <h3>Social Situations</h3>
        <p>Eat before attending events, or bring a plant-based dish to share.</p>
        
        <h3>Nutrient Concerns</h3>
        <p>Focus on variety and consider supplements for B12 and vitamin D if needed.</p>
        
        <h2>The Environmental Impact</h2>
        <p>Plant-based eating isn't just good for you—it's good for the planet. Plant-based diets require significantly less water, land, and energy to produce compared to animal-based diets.</p>
        
        <h3>Water Usage</h3>
        <p>Producing 1 pound of beef requires about 1,800 gallons of water, while 1 pound of vegetables requires only 39 gallons.</p>
        
        <h3>Land Usage</h3>
        <p>Plant-based foods can feed more people using less land, helping address global food security.</p>
        
        <h2>Conclusion</h2>
        <p>Plant-based nutrition offers a path to better health, increased energy, and environmental sustainability. Start where you are, make gradual changes, and enjoy the journey to a more vibrant, plant-powered life.</p>
        
        <p>Remember: every plant-based meal is a vote for your health and the planet's future.</p>`,
        author: "Sarah Martinez",
        published: true,
        featured_image: "https://picsum.photos/seed/nutrition/800/400.jpg",
        category: '3',
        read_time: "6 min",
        likes: 35,
        views: 124,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePosts));
  }
  
  if (!existingCategories) {
    const sampleCategories: BlogCategory[] = [
      { 
        id: '1', 
        name: "Mindfulness", 
        slug: "mindfulness", 
        description: "Articles about mindfulness and mental wellness", 
        created_at: new Date().toISOString(),
        color: 'text-red-500',
        bgColor: 'bg-red-50'
      },
      { 
        id: '2', 
        name: "Fitness", 
        slug: "fitness", 
        description: "Fitness tips and workout advice", 
        created_at: new Date().toISOString(),
        color: 'text-orange-500',
        bgColor: 'bg-orange-50'
      },
      { 
        id: '3', 
        name: "Nutrition", 
        slug: "nutrition", 
        description: "Nutrition advice and healthy eating", 
        created_at: new Date().toISOString(),
        color: 'text-green-500',
        bgColor: 'bg-green-50'
      }
    ];
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(sampleCategories));
  }
};

// Blog Post Service
export const blogStorageService = {
  // Initialize sample data on first load
  initialize: () => {
    initializeSampleData();
  },

  // Get all blog posts
  getPosts: (): BlogPost[] => {
    const posts = localStorage.getItem(STORAGE_KEY);
    return posts ? JSON.parse(posts) : [];
  },

  // Get published blog posts
  getPublishedPosts: (): BlogPost[] => {
    return blogStorageService.getPosts().filter(post => post.published);
  },

  // Get blog post by slug
  getPostBySlug: (slug: string): BlogPost | null => {
    const posts = blogStorageService.getPosts();
    return posts.find(post => post.slug === slug) || null;
  },

  // Get blog post by ID
  getPostById: (id: string): BlogPost | null => {
    const posts = blogStorageService.getPosts();
    return posts.find(post => post.id === id) || null;
  },

  // Create new blog post
  createPost: (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): BlogPost => {
    const posts = blogStorageService.getPosts();
    const newPost: BlogPost = {
      ...post,
      id: posts.length > 0 ? (Math.max(...posts.map(p => parseInt(p.id))) + 1).toString() : '1',
      likes: 0,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    posts.push(newPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return newPost;
  },

  // Update blog post
  updatePost: (id: string, updates: Partial<BlogPost>): BlogPost | null => {
    const posts = blogStorageService.getPosts();
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) return null;
    
    posts[index] = {
      ...posts[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return posts[index];
  },

  // Delete blog post
  deletePost: (id: string): boolean => {
    const posts = blogStorageService.getPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    if (filteredPosts.length === posts.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));
    return true;
  },

  // Toggle publish status
  togglePublishStatus: (id: string): BlogPost | null => {
    const post = blogStorageService.getPostById(id);
    if (!post) return null;
    
    return blogStorageService.updatePost(id, { published: !post.published });
  },

  // Like a blog post
  likePost: (id: string): BlogPost | null => {
    const post = blogStorageService.getPostById(id);
    if (!post) return null;
    
    return blogStorageService.updatePost(id, { likes: post.likes + 1 });
  },

  // Increment view count with session tracking
  incrementViews: (id: string): BlogPost | null => {
    const post = blogStorageService.getPostById(id);
    if (!post) return null;
    
    // Check if this post has been viewed in this session
    const sessionKey = `post_viewed_${id}`;
    const hasViewed = sessionStorage.getItem(sessionKey);
    
    if (!hasViewed) {
      // Mark as viewed in this session
      sessionStorage.setItem(sessionKey, 'true');
      // Increment the view count
      return blogStorageService.updatePost(id, { views: post.views + 1 });
    }
    
    return post;
  },
};

// Category Service
export const categoryStorageService = {
  // Get all categories
  getCategories: (): BlogCategory[] => {
    const categories = localStorage.getItem(CATEGORIES_KEY);
    return categories ? JSON.parse(categories) : [];
  },

  // Get category by ID
  getCategoryById: (id: string): BlogCategory | null => {
    const categories = categoryStorageService.getCategories();
    return categories.find(cat => cat.id === id) || null;
  },

  // Create new category
  createCategory: (category: Omit<BlogCategory, 'id'>): BlogCategory => {
    const categories = categoryStorageService.getCategories();
    const newCategory: BlogCategory = {
      ...category,
      id: categories.length > 0 ? (Math.max(...categories.map(c => parseInt(c.id))) + 1).toString() : '1'
    };
    categories.push(newCategory);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    return newCategory;
  }
};

// Initialize the storage service
blogStorageService.initialize();

// Add the nutrition blog post if it doesn't exist
const addNutritionBlogPost = () => {
  const posts = blogStorageService.getPosts();
  const nutritionPostExists = posts.some(post => post.slug === 'power-plant-based-nutrition');
  
  if (!nutritionPostExists) {
    const nutritionPost: BlogPost = {
      id: '3',
      title: "The Power of Plant-Based Nutrition",
      slug: "power-plant-based-nutrition",
      excerpt: "Discover how plant-based eating can transform your energy levels, improve digestion, and support overall wellness.",
      content: `<h1>The Power of Plant-Based Nutrition</h1>
        <p>Plant-based nutrition is more than just a diet—it's a lifestyle choice that can dramatically improve your health, energy levels, and overall well-being. Let's explore the science and practical benefits of embracing plant-based eating.</p>
        
        <h2>What Makes Plant-Based Eating Powerful?</h2>
        <p>Plant-based diets focus on whole foods derived from plants: fruits, vegetables, whole grains, legumes, nuts, and seeds. These foods are packed with fiber, vitamins, minerals, and phytonutrients that work together to optimize your body's functions.</p>
        
        <h3>Key Benefits:</h3>
        <ul>
          <li>Increased energy and vitality</li>
          <li>Improved digestion and gut health</li>
          <li>Enhanced immune system function</li>
          <li>Better weight management</li>
          <li>Reduced inflammation</li>
          <li>Lower risk of chronic diseases</li>
        </ul>
        
        <h2>Getting Started with Plant-Based Eating</h2>
        <p>Transitioning to a plant-based diet doesn't have to be overwhelming. Start with simple changes:</p>
        
        <h3>Step 1: Add More Plants</h3>
        <p>Begin by adding more vegetables to your current meals. Try adding a side salad to lunch or extra vegetables to your dinner.</p>
        
        <h3>Step 2: Try Meatless Mondays</h3>
        <p>Commit to one meat-free day per week. This helps you explore new recipes and build confidence.</p>
        
        <h3>Step 3: Explore Plant Proteins</h3>
        <p>Discover the variety of plant-based proteins: lentils, beans, tofu, tempeh, nuts, and seeds.</p>
        
        <h2>Practical Tips for Success</h2>
        <p>Here are some strategies to make your plant-based journey enjoyable and sustainable:</p>
        
        <ul>
          <li><strong>Meal Prep:</strong> Prepare plant-based meals in advance to avoid last-minute decisions</li>
          <li><strong>Spice It Up:</strong> Use herbs and spices to add flavor without extra calories</li>
          <li><strong>Stay Hydrated:</strong> Drink plenty of water throughout the day</li>
          <li><strong>Listen to Your Body:</strong> Pay attention to how different foods make you feel</li>
        </ul>
        
        <h2>Sample Day of Plant-Based Eating</h2>
        <p>Here's what a typical plant-based day might look like:</p>
        
        <h3>Breakfast (7:00 AM)</h3>
        <p>Oatmeal with berries, nuts, and seeds, or a green smoothie with spinach, banana, and plant-based protein powder.</p>
        
        <h3>Lunch (12:30 PM)</h3>
        <p>Large salad with mixed greens, roasted vegetables, chickpeas, and tahini dressing, or a lentil soup with whole grain bread.</p>
        
        <h3>Dinner (6:30 PM)</h3>
        <p>Vegetable stir-fry with tofu and brown rice, or black bean burgers on whole grain buns with sweet potato fries.</p>
        
        <h3>Snacks</h3>
        <p>Fresh fruit, nuts, hummus with vegetables, or plant-based yogurt.</p>
        
        <blockquote>
        "Let food be thy medicine and medicine be thy food." - Hippocrates
        </blockquote>
        
        <h2>Overcoming Common Challenges</h2>
        <p>Every journey has its challenges. Here's how to handle common plant-based eating obstacles:</p>
        
        <h3>Cravings</h3>
        <p>Cravings are normal. Try plant-based alternatives that satisfy similar taste and texture preferences.</p>
        
        <h3>Social Situations</h3>
        <p>Eat before attending events, or bring a plant-based dish to share.</p>
        
        <h3>Nutrient Concerns</h3>
        <p>Focus on variety and consider supplements for B12 and vitamin D if needed.</p>
        
        <h2>The Environmental Impact</h2>
        <p>Plant-based eating isn't just good for you—it's good for the planet. Plant-based diets require significantly less water, land, and energy to produce compared to animal-based diets.</p>
        
        <h3>Water Usage</h3>
        <p>Producing 1 pound of beef requires about 1,800 gallons of water, while 1 pound of vegetables requires only 39 gallons.</p>
        
        <h3>Land Usage</h3>
        <p>Plant-based foods can feed more people using less land, helping address global food security.</p>
        
        <h2>Conclusion</h2>
        <p>Plant-based nutrition offers a path to better health, increased energy, and environmental sustainability. Start where you are, make gradual changes, and enjoy the journey to a more vibrant, plant-powered life.</p>
        
        <p>Remember: every plant-based meal is a vote for your health and the planet's future.</p>`,
      author: "Sarah Martinez",
      published: true,
      featured_image: "https://picsum.photos/seed/nutrition/800/400.jpg",
      category: '3',
      read_time: "6 min",
      likes: 35,
      views: 124,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    posts.push(nutritionPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }
};

// Call this function to ensure the nutrition post is added
addNutritionBlogPost();
