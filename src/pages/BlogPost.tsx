import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  Heart,
  Eye,
  Mail
} from 'lucide-react';
import { blogStorageService, categoryStorageService } from '../lib/blogStorage';
import type { BlogPost, BlogCategory, BlogComment } from '../lib/supabase';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import IconSprinkles from '../components/public/IconSprinkles';
import Comments from '../components/public/Comments';
import commentStorageService from '../lib/commentStorage';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Helper function to get category name and colors
  const getCategoryInfo = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return {
      name: category?.name || 'Uncategorized',
      color: category?.color || 'text-grounded-800',
      bgColor: category?.bgColor || 'bg-grounded-100'
    };
  };

  useEffect(() => {
    const loadPost = async () => {
      try {
        // Load categories first
        const allCategories = categoryStorageService.getCategories();
        setCategories(allCategories);
        
        // Load post from JSON storage
        const foundPost = blogStorageService.getPostBySlug(slug || '');
        if (foundPost) {
          setPost(foundPost);
          // Increment view count
          blogStorageService.incrementViews(foundPost.id);
          // Load comments for this post
          const postComments = commentStorageService.getComments(foundPost.id);
          setComments(postComments);
        } else {
          setError('Post not found');
        }
      } catch (error) {
        setError('Error loading post');
        console.error('Error loading blog post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  const handleAddComment = async (commentData: { author: string; email: string; content: string }) => {
    if (!post) return;
    
    try {
      const newComment = commentStorageService.addComment(post.id, commentData);
      setComments(prev => [...prev, newComment]);
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      commentStorageService.deleteComment(commentId);
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const sharePost = (platform: string) => {
    const url = window.location.href;
    const text = post?.title || '';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`, '_blank');
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grounded-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Post Not Found</h2>
          <p className="text-neutral-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-grounded-50 via-white to-earth-50 relative overflow-hidden">
        <IconSprinkles
          opacity={0.15}
          density="light"
          colorTheme="mixed"
          iconTypes="all"
        />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-neutral-600 mb-8">
              <Link to="/" className="hover:text-grounded-600 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-grounded-600 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-neutral-900">{post.title}</span>
            </nav>

            {/* Post Header */}
            <div className="text-center mb-12">
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 ${getCategoryInfo(post.category).bgColor} ${getCategoryInfo(post.category).color}`}>
                <span className="text-sm font-medium">{getCategoryInfo(post.category).name}</span>
              </div>
              
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                {post.title}
              </h1>
              
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Post Meta */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-neutral-600">
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{post.read_time}</span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex justify-center items-center space-x-4 mt-8">
                <span className="text-sm text-neutral-600">Share:</span>
                <button
                  onClick={() => sharePost('facebook')}
                  className="text-neutral-600 hover:text-blue-600 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={20} />
                </button>
                <button
                  onClick={() => sharePost('twitter')}
                  className="text-neutral-600 hover:text-blue-400 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={20} />
                </button>
                <button
                  onClick={() => sharePost('email')}
                  className="text-neutral-600 hover:text-grounded-600 transition-colors"
                  aria-label="Share via Email"
                >
                  <Mail size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Back to Blog */}
            <div className="mt-16 pt-8 border-t border-neutral-200">
              <Link
                to="/blog"
                className="inline-flex items-center space-x-2 text-grounded-600 hover:text-grounded-700 font-medium transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Back to Blog</span>
              </Link>
            </div>

            {/* Like and View Counts */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => {
                      if (post) {
                        blogStorageService.likePost(post.id);
                        // Update the post state to reflect the new like count
                        window.location.reload();
                      }
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Heart size={18} />
                    <span className="font-medium">{post?.likes || 0}</span>
                  </button>
                  
                  <div className="flex items-center space-x-2 text-neutral-600">
                    <Eye size={18} />
                    <span className="font-medium">{post?.views || 0} views</span>
                  </div>
                </div>
                
                <div className="text-sm text-neutral-500">
                  {post?.read_time}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-grounded-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Comments
              postId={post.id}
              comments={comments}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
              isAdmin={false}
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
