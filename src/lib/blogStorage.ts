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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePosts));
  }
  
  if (!existingCategories) {
    const sampleCategories: BlogCategory[] = [
      { id: '1', name: "Mindfulness", slug: "mindfulness", description: "Articles about mindfulness and mental wellness", created_at: new Date().toISOString() },
      { id: '2', name: "Fitness", slug: "fitness", description: "Fitness tips and workout advice", created_at: new Date().toISOString() },
      { id: '3', name: "Nutrition", slug: "nutrition", description: "Nutrition advice and healthy eating", created_at: new Date().toISOString() }
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
  }
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
