import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Eye, Trash2, Info, CheckCircle } from 'lucide-react';
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
  const [showSavePopup, setShowSavePopup] = useState(false);

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
    console.log('Content changed in admin editor:', content); // Debug log
    const readTime = calculateReadTime(content);
    setPost(prev => ({
      ...prev,
      content,
      read_time: readTime
    }));
  };

  const handleSave = async (publish: boolean = false) => {
    setIsSaving(true);
    try {
      const postToSave = {
        ...post,
        published: publish,
        updated_at: new Date().toISOString(),
      } as BlogPost;

      console.log('Saving post:', postToSave); // Debug log
      console.log('Post content being saved:', postToSave.content); // Debug log

      if (isEditing && slug) {
        blogStorageService.updatePost(slug, postToSave);
        console.log('Post updated');
      } else {
        blogStorageService.createPost(postToSave);
        console.log('Post created');
      }

      setShowSavePopup(true);
      setTimeout(() => setShowSavePopup(false), 3000);
      
      if (publish) {
        setTimeout(() => navigate('/admin/dashboard'), 1000);
      }
    } catch (error) {
      console.error('Error saving post:', error);
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
            className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-neutral-700 prose-strong:text-neutral-900 prose-em:text-neutral-700 prose-code:text-neutral-900 prose-pre:bg-neutral-100 prose-blockquote:border-l-4 prose-blockquote:border-grounded-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-neutral-600 prose-ul:list-disc prose-ol:list-decimal prose-li:my-2 prose-a:text-grounded-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-lg prose-hr:border-neutral-200 prose-table:border prose-table:border-neutral-300 prose-th:bg-neutral-50 prose-th:border prose-th:border-neutral-300 prose-th:px-4 prose-th:py-2 prose-td:border prose-td:border-neutral-300 prose-td:px-4 prose-td:py-2 [&_*]:font-inherit [&_*]:text-inherit"
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
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                <Save size={20} />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              
              <button
                onClick={() => handleSave(true)}
                disabled={isSaving}
                className={`flex items-center gap-2 px-4 py-2 rounded disabled:opacity-50 ${
                  post.published 
                    ? 'bg-orange-600 text-white hover:bg-orange-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <Save size={20} />
                {isSaving ? 'Publishing...' : (
                  post.published ? 'Update Published' : 'Publish'
                )}
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
                    <div className="inline-block ml-2">
                      <div className="group relative inline-block">
                        <Info size={12} className="text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                          <div className="font-semibold mb-1">Why Meta Description Matters:</div>
                          <ul className="space-y-1">
                            <li>• Appears in Google search results</li>
                            <li>• Shows on social media when shared</li>
                            <li>• Helps with SEO ranking</li>
                            <li>• Keep under 160 characters</li>
                          </ul>
                        </div>
                      </div>
                    </div>
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
                    <div className="inline-block ml-2">
                      <div className="group relative inline-block">
                        <Info size={12} className="text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                          <div className="font-semibold mb-1">Why Meta Keywords Help:</div>
                          <ul className="space-y-1">
                            <li>• Tell search engines what your post is about</li>
                            <li>• Help with ranking for specific terms</li>
                            <li>• Use 5-10 relevant keywords</li>
                            <li>• Separate with commas</li>
                            <li>• Include terms people actually search for</li>
                          </ul>
                        </div>
                      </div>
                    </div>
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

      {/* Save Confirmation Popup */}
      {showSavePopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowSavePopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Changes Saved</h3>
                <p className="text-sm text-gray-600">
                  {post.published 
                    ? 'Your post has been updated and is live on the site.' 
                    : 'Your draft has been saved successfully.'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setShowSavePopup(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminBlogEditor;
