import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { blogStorageService } from '../lib/blogStorage';
import { categoryStorageService } from '../lib/blogStorage';
import type { BlogPost } from '../lib/supabase';
import Navbar from '../components/public/Navbar';
import ContentCard from '../components/public/ContentCard';
import Footer from '../components/public/Footer';
import { Search, ChevronDown, Leaf } from 'lucide-react';
import IconSprinkles from '../components/public/IconSprinkles';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Set category from URL parameter
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Load posts from JSON storage
        const posts = blogStorageService.getPublishedPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const loadCategories = async () => {
      try {
        // Load categories from storage
        const allCategories = categoryStorageService.getCategories();
        setCategoriesData(allCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadPosts();
    loadCategories();
  }, []);

  const categories = [
    { value: 'all', label: 'All Posts' },
    ...categoriesData.map((cat: any) => ({ value: cat.slug, label: cat.name }))
  ];

  const getCategoryName = (categoryId: string): string => {
    const category = categoriesData.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  const getCategoryColors = (categoryId: string): { color: string; bgColor: string } => {
    const category = categoriesData.find(cat => cat.id === categoryId);
    return {
      color: category?.color || 'text-grounded-800',
      bgColor: category?.bgColor || 'bg-grounded-100'
    };
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ||
      post.category === selectedCategory ||
      post.category === '1' && selectedCategory === 'mindfulness' ||
      post.category === '2' && selectedCategory === 'fitness' ||
      post.category === '3' && selectedCategory === 'nutrition';
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-grounded-50 via-white to-earth-50 relative overflow-hidden">
        <IconSprinkles
          opacity={0.18}
          density="medium"
          colorTheme="green"
          iconTypes="nature"  // Nature icons for blog
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
              <span className="text-sm font-medium">Health & Wellness Blog</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Insights for <span className="text-gradient">Balanced Living</span>
            </h1>

            <p className="text-lg text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Tips, stories, and expert advice on fitness, nutrition, and wellness.
              Your journey to balance starts here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-grounded-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-neutral-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-grounded-500 focus:border-transparent transition-all duration-200 cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center md:text-left">
            <p className="text-neutral-600">
              Showing {filteredPosts.length} of {blogPosts.length} posts
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gradient-to-br from-neutral-50 to-white">
        <IconSprinkles
          opacity={0.12}
          density="light"
          colorTheme="mixed"
          iconTypes="all"
        />
        <div className="container">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ContentCard
                    title={post.title}
                    description={post.excerpt}
                    href={`/blog/${post.slug}`}
                    variant="blog"
                    category={getCategoryName(post.category)}
                    categoryColor={getCategoryColors(post.category).color}
                    categoryBgColor={getCategoryColors(post.category).bgColor}
                    date={new Date(post.created_at).toLocaleDateString()}
                    author={post.author}
                    readTime={post.read_time}
                    likes={post.likes}
                    views={post.views}
                    cardStyle="white"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <Search className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">No posts found</h3>
                <p className="text-neutral-600">
                  Try adjusting your search terms or browse different categories.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-grounded-50 to-earth-50">
        <IconSprinkles
          opacity={0.15}
          density="light"
          colorTheme="earth"
          iconTypes="nutrition"
        />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-4">
              Stay <span className="text-gradient">Updated</span>
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Get the latest health tips, fitness advice, and nutrition insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-grounded-500 focus:border-transparent transition-all duration-200"
              />
              <button className="btn-primary">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
