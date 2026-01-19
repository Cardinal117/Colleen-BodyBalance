import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Eye, Trash2, Info } from 'lucide-react';
import BlogEditor from '../../components/admin/BlogEditor';
import { blogStorageService, categoryStorageService } from '../../lib/blogStorage';
import type { BlogPost, BlogCategory } from '../../lib/supabase';

const AdminBlogEditor: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(slug);

  const [post, setPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    published: false,
    featured_image: '',
    meta_description: '',
    meta_keywords: '',
    read_time: ''
  });

  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // Load categories
    const loadedCategories = categoryStorageService.getCategories();
    setCategories(loadedCategories);

    // Load post if editing
    if (isEditing && slug) {
      const existingPost = blogStorageService.getPostBySlug(slug);
      if (existingPost) {
        setPost(existingPost);
      } else {
        navigate('/admin/dashboard');
      }
    }
  }, [slug, isEditing, navigate]);

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  };

  const handleTitleChange = (title: string) => {
    const newSlug = generateSlug(title);
    setPost(prev => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug || '' : newSlug
    }));
  };

  const handleContentChange = (content: string) => {
    const readTime = calculateReadTime(content);
    setPost(prev => ({
      ...prev,
      content,
      read_time: readTime
    }));
  };

  const handleSave = async (publish: boolean = false) => {
    if (!post.title || !post.content) {
      alert('Please fill in the title and content');
      return;
    }

    setIsSaving(true);
    try {
      const postData = {
        ...post,
        published: publish,
        read_time: post.read_time || calculateReadTime(post.content)
      } as BlogPost;

      if (isEditing && post.id) {
        blogStorageService.updatePost(post.id, postData);
      } else {
        blogStorageService.createPost(postData);
      }

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!isEditing || !post.id) return;

    if (confirm('Are you sure you want to delete this post?')) {
      try {
        blogStorageService.deletePost(post.id);
        navigate('/admin/dashboard');
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post');
      }
    }
  };

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Uncategorized';
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowPreview(false)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={20} />
                Back to Editor
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSave(false)}
                  disabled={isSaving}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
                >
                  Save Draft
                </button>
                <button
                  onClick={() => handleSave(true)}
                  disabled={isSaving}
                  className="px-4 py-2 bg-grounded-600 text-white rounded hover:bg-grounded-700 disabled:opacity-50"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span>By {post.author || 'Anonymous'}</span>
              <span>•</span>
              <span>{getCategoryName(post.category || '')}</span>
              <span>•</span>
              <span>{post.read_time}</span>
              <span>•</span>
              <span>{post.published ? 'Published' : 'Draft'}</span>
            </div>
            {post.featured_image && (
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg mt-6"
              />
            )}
          </header>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={20} />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Edit Post' : 'Create New Post'}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <Eye size={20} />
                Preview
              </button>
              
              {isEditing && (
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 size={20} />
                  Delete
                </button>
              )}
              
              <button
                onClick={() => handleSave(false)}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
              >
                <Save size={20} />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </button>
              
              <button
                onClick={() => handleSave(true)}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-grounded-600 text-white rounded hover:bg-grounded-700 disabled:opacity-50"
              >
                <Save size={20} />
                {isSaving ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <input
                type="text"
                placeholder="Post Title"
                value={post.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full text-3xl font-bold border-0 focus:outline-none placeholder-gray-400"
              />
              
              <input
                type="text"
                placeholder="URL Slug (auto-generated from title)"
                value={post.slug}
                onChange={(e) => setPost(prev => ({ ...prev, slug: e.target.value }))}
                disabled={isEditing}
                className="w-full mt-2 text-gray-600 border-0 focus:outline-none placeholder-gray-400 disabled:opacity-50"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <textarea
                placeholder="Write a brief excerpt for your post..."
                value={post.excerpt}
                onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
                className="w-full h-24 border-0 focus:outline-none resize-none placeholder-gray-400"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <BlogEditor
                key={slug || 'new'}
                content={post.content || ''}
                onChange={handleContentChange}
                placeholder="Start writing your blog post..."
              />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Publish Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={post.author}
                    onChange={(e) => setPost(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full p-2 border rounded focus:ring-grounded-500 focus:border-grounded-500"
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={post.category}
                    onChange={(e) => setPost(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2 border rounded focus:ring-grounded-500 focus:border-grounded-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={post.featured_image}
                    onChange={(e) => setPost(prev => ({ ...prev, featured_image: e.target.value }))}
                    className="w-full p-2 border rounded focus:ring-grounded-500 focus:border-grounded-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={post.published ? 'published' : 'draft'}
                    onChange={(e) => setPost(prev => ({ ...prev, published: e.target.value === 'published' }))}
                    className={`w-full p-2 border rounded focus:ring-grounded-500 focus:border-grounded-500 font-medium ${
                      post.published 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    <option value="draft" className="bg-gray-50 text-gray-700">📝 Draft</option>
                    <option value="published" className="bg-green-50 text-green-700">🚀 Published</option>
                    <option value="unpublish" className="bg-red-50 text-red-700">🔴 Unpublish</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {post.published ? 'Post is live and visible to readers' : 'Post is saved but not visible to readers'}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">SEO Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Description
                    <span className="ml-2 text-xs text-gray-500 cursor-help" title="This appears in search engine results and social media previews. Keep it under 160 characters for best results.">
                      <Info size={12} className="inline" />
                    </span>
                  </label>
                  <textarea
                    value={post.meta_description}
                    onChange={(e) => setPost(prev => ({ ...prev, meta_description: e.target.value }))}
                    className="w-full h-20 p-2 border rounded focus:ring-grounded-500 focus:border-grounded-500 resize-none"
                    placeholder="Brief description for search engines..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Keywords
                    <span className="ml-2 text-xs text-gray-500 cursor-help" title="Comma-separated keywords that help search engines understand your content. Include 5-10 relevant keywords.">
                      <Info size={12} className="inline" />
                    </span>
                  </label>
                  <input
                    type="text"
                    value={post.meta_keywords}
                    onChange={(e) => setPost(prev => ({ ...prev, meta_keywords: e.target.value }))}
                    className="w-full p-2 border rounded focus:ring-grounded-500 focus:border-grounded-500"
                    placeholder="mindfulness, fitness, nutrition, wellness, health"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogEditor;
