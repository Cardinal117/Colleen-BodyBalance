import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  LogOut, 
  FileText, 
  User, 
  Clock,
  Search,
  Filter,
  Tag
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { blogStorageService, categoryStorageService } from '../../lib/blogStorage';
import type { BlogPost, BlogCategory } from '../../lib/supabase';

// Import the storage keys
const CATEGORIES_KEY = 'bodybalance_blog_categories';
const POSTS_KEY = 'bodybalance_blog_posts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categoriesData, setCategoriesData] = useState<BlogCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [selectedColor, setSelectedColor] = useState('text-grounded-500');
  const [selectedBgColor, setSelectedBgColor] = useState('bg-grounded-50');
  const [customColor, setCustomColor] = useState('#6B7280');
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [isCustomColor, setIsCustomColor] = useState(false);
  const [isCustomBgColor, setIsCustomBgColor] = useState(false);

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth');
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    
    // Load posts from JSON storage
    loadPosts();
    loadCategories();
  }, [navigate]);

  const loadPosts = () => {
    try {
      const allPosts = blogStorageService.getPosts();
      setPosts(allPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = () => {
    try {
      const allCategories = categoryStorageService.getCategories();
      setCategoriesData(allCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) return;
    
    try {
      if (editingCategory) {
        // Update existing category
        const updatedCategories = categoriesData.map(cat => 
          cat.id === editingCategory.id 
            ? { ...cat, name: newCategoryName.trim(), description: newCategoryDescription.trim(), color: selectedColor, bgColor: selectedBgColor }
            : cat
        );
        setCategoriesData(updatedCategories);
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updatedCategories));
      } else {
        // Create new category
        const newCategory = categoryStorageService.createCategory({
          name: newCategoryName.trim(),
          slug: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
          description: newCategoryDescription.trim(),
          created_at: new Date().toISOString(),
          color: selectedColor,
          bgColor: selectedBgColor
        });
        setCategoriesData([...categoriesData, newCategory]);
      }
      
      // Reset form
      setNewCategoryName('');
      setNewCategoryDescription('');
      setEditingCategory(null);
      setSelectedColor('text-grounded-500');
      setSelectedBgColor('bg-grounded-50');
      setShowCategoryForm(false);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleEditCategory = (category: BlogCategory) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryDescription(category.description || '');
    setSelectedColor(category.color || 'text-grounded-500');
    setSelectedBgColor(category.bgColor || 'bg-grounded-50');
    setShowCategoryForm(true);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setNewCategoryName('');
    setNewCategoryDescription('');
    setSelectedColor('text-grounded-500');
    setSelectedBgColor('bg-grounded-50');
    setShowCategoryForm(false);
  };

  const handleDeleteCategory = (id: string) => {
    const category = categoriesData.find(cat => cat.id === id);
    if (category) {
      setCategoryToDelete(category.id);
      setShowDeleteModal(category.name);
    }
  };

  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      try {
        // Remove from localStorage
        const updatedCategories = categoriesData.filter(cat => cat.id !== categoryToDelete);
        setCategoriesData(updatedCategories);
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updatedCategories));
        
        // Also update any posts that use this category
        const updatedPosts = posts.map(post => 
          post.category === categoryToDelete ? { ...post, category: '1' } : post
        );
        localStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts));
        setPosts(updatedPosts);
        
        // Close modal
        setShowDeleteModal(null);
        setCategoryToDelete(null);
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const cancelDeleteCategory = () => {
    setShowDeleteModal(null);
    setCategoryToDelete(null);
  };

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

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        blogStorageService.deletePost(id);
        loadPosts(); // Reload posts after deletion
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post');
      }
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      blogStorageService.togglePublishStatus(id);
      loadPosts(); // Reload posts after toggle
    } catch (error) {
      console.error('Error toggling publish status:', error);
      alert('Error updating post status');
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    ...categoriesData.map(cat => ({ value: cat.id, label: cat.name }))
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grounded-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-grounded-500 to-earth-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BB</span>
                </div>
                <span className="font-heading text-lg font-bold text-neutral-900">Body Balance Admin</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-neutral-600 hover:text-neutral-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-heading text-3xl font-bold text-neutral-900">Blog Posts</h1>
              <p className="text-neutral-600 mt-1">Manage your blog content</p>
            </div>
            
            <Link
              to="/admin/editor"
              className="flex items-center space-x-2 bg-gradient-to-r from-grounded-500 to-earth-500 text-white px-4 py-2 rounded-lg hover:from-grounded-600 hover:to-earth-600 transition-all duration-200"
            >
              <Plus className="h-5 w-5" />
              <span>New Post</span>
            </Link>
          </div>
        </motion.div>

        {/* Category Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-lg shadow p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-grounded-500" />
              <h2 className="font-heading text-xl font-bold text-neutral-900">Categories</h2>
            </div>
            <button
              onClick={() => setShowCategoryForm(!showCategoryForm)}
              className="flex items-center space-x-2 bg-grounded-500 text-white px-3 py-1.5 rounded-lg hover:bg-grounded-600 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Category</span>
            </button>
          </div>

          {/* Category Form */}
          {showCategoryForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-4 bg-neutral-50 rounded-lg"
            >
              <div className="mb-4">
                <h3 className="font-medium text-neutral-900 mb-2">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Category Name</label>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-grounded-500 focus:border-transparent"
                    placeholder="Enter category name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={newCategoryDescription}
                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-grounded-500 focus:border-transparent"
                    placeholder="Enter description"
                  />
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Text Color</label>
                  <div className="border border-neutral-300 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        <tr className="grid grid-cols-5">
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-r border-b ${
                              selectedColor === 'text-red-500' ? 'bg-neutral-100 ring-2 ring-red-500' : ''
                            }`}
                            onClick={() => {setSelectedColor('text-red-500'); setIsCustomColor(false)}}
                          >
                            <div className="w-6 h-6 bg-red-500 rounded mx-auto mb-1"></div>
                            <span className="text-xs">Red</span>
                          </td>
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-r border-b ${
                              selectedColor === 'text-orange-500' ? 'bg-neutral-100 ring-2 ring-orange-500' : ''
                            }`}
                            onClick={() => {setSelectedColor('text-orange-500'); setIsCustomColor(false)}}
                          >
                            <div className="w-6 h-6 bg-orange-500 rounded mx-auto mb-1"></div>
                            <span className="text-xs">Orange</span>
                          </td>
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-r border-b ${
                              selectedColor === 'text-green-500' ? 'bg-neutral-100 ring-2 ring-green-500' : ''
                            }`}
                            onClick={() => {setSelectedColor('text-green-500'); setIsCustomColor(false)}}
                          >
                            <div className="w-6 h-6 bg-green-500 rounded mx-auto mb-1"></div>
                            <span className="text-xs">Green</span>
                          </td>
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-r border-b ${
                              selectedColor === 'text-blue-500' ? 'bg-neutral-100 ring-2 ring-blue-500' : ''
                            }`}
                            onClick={() => {setSelectedColor('text-blue-500'); setIsCustomColor(false)}}
                          >
                            <div className="w-6 h-6 bg-blue-500 rounded mx-auto mb-1"></div>
                            <span className="text-xs">Blue</span>
                          </td>
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-b ${
                              selectedColor === 'text-purple-500' ? 'bg-neutral-100 ring-2 ring-purple-500' : ''
                            }`}
                            onClick={() => {setSelectedColor('text-purple-500'); setIsCustomColor(false)}}
                          >
                            <div className="w-6 h-6 bg-purple-500 rounded mx-auto mb-1"></div>
                            <span className="text-xs">Purple</span>
                          </td>
                        </tr>
                        <tr className="grid grid-cols-5">
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-r border-b ${
                              selectedColor === 'text-pink-500' ? 'bg-neutral-100 ring-2 ring-pink-500' : ''
                            }`}
                            onClick={() => {setSelectedColor('text-pink-500'); setIsCustomColor(false)}}
                          >
                            <div className="w-6 h-6 bg-pink-500 rounded mx-auto mb-1"></div>
                            <span className="text-xs">Pink</span>
                          </td>
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-r border-b ${
                              selectedColor === 'text-indigo-500' ? 'bg-neutral-100 ring-2 ring-indigo-500' : ''
                            }`}
                            onClick={() => {setSelectedColor('text-indigo-500'); setIsCustomColor(false)}}
                          >
                            <div className="w-6 h-6 bg-indigo-500 rounded mx-auto mb-1"></div>
                            <span className="text-xs">Indigo</span>
                          </td>
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-r border-b ${
                              selectedColor === 'text-grounded-500' ? 'bg-neutral-100 ring-2 ring-green-600' : ''
                            }`}
                            onClick={() => {setSelectedColor('text-grounded-500'); setIsCustomColor(false)}}
                          >
                            <div className="w-6 h-6 bg-green-600 rounded mx-auto mb-1"></div>
                            <span className="text-xs">Grounded</span>
                          </td>
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-r border-b ${
                              selectedColor === 'text-earth-500' ? 'bg-neutral-100 ring-2 ring-yellow-600' : ''
                            }`}
                            onClick={() => {setSelectedColor('text-earth-500'); setIsCustomColor(false)}}
                          >
                            <div className="w-6 h-6 bg-yellow-600 rounded mx-auto mb-1"></div>
                            <span className="text-xs">Earth</span>
                          </td>
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-b ${
                              selectedColor === 'text-neutral-500' ? 'bg-neutral-100 ring-2 ring-gray-500' : ''
                            }`}
                            onClick={() => {setSelectedColor('text-neutral-500'); setIsCustomColor(false)}}
                          >
                            <div className="w-6 h-6 bg-gray-500 rounded mx-auto mb-1"></div>
                            <span className="text-xs">Neutral</span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={5} className={`p-2 border-b ${isCustomColor ? 'bg-neutral-100 ring-2 ring-blue-500' : ''}`}>
                            <div className="flex items-center space-x-2">
                              <input
                                type="color"
                                value={customColor}
                                onChange={(e) => {setCustomColor(e.target.value); setSelectedColor(e.target.value); setIsCustomColor(true)}}
                                className="w-8 h-8 border border-neutral-300 rounded cursor-pointer"
                              />
                              <span className="text-sm text-neutral-600">Custom Color</span>
                              <input
                                type="text"
                                value={customColor}
                                onChange={(e) => {setCustomColor(e.target.value); setSelectedColor(e.target.value); setIsCustomColor(true)}}
                                className="px-2 py-1 text-sm border border-neutral-300 rounded"
                                placeholder="#000000"
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Background Color</label>
                  <div className="border border-neutral-300 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        <tr className="grid grid-cols-5">
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-r border-b ${
                              selectedBgColor === 'bg-red-50' ? 'bg-neutral-100 ring-2 ring-red-300' : ''
                            }`}
                            onClick={() => {setSelectedBgColor('bg-red-50'); setIsCustomBgColor(false)}}
                          >
                            <div className="w-6 h-6 bg-red-100 rounded mx-auto mb-1 border border-red-200"></div>
                            <span className="text-xs">Red</span>
                          </td>
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-r border-b ${
                              selectedBgColor === 'bg-orange-50' ? 'bg-neutral-100 ring-2 ring-orange-300' : ''
                            }`}
                            onClick={() => {setSelectedBgColor('bg-orange-50'); setIsCustomBgColor(false)}}
                          >
                            <div className="w-6 h-6 bg-orange-100 rounded mx-auto mb-1 border border-orange-200"></div>
                            <span className="text-xs">Orange</span>
                          </td>
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-r border-b ${
                              selectedBgColor === 'bg-green-50' ? 'bg-neutral-100 ring-2 ring-green-300' : ''
                            }`}
                            onClick={() => {setSelectedBgColor('bg-green-50'); setIsCustomBgColor(false)}}
                          >
                            <div className="w-6 h-6 bg-green-100 rounded mx-auto mb-1 border border-green-200"></div>
                            <span className="text-xs">Green</span>
                          </td>
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-r border-b ${
                              selectedBgColor === 'bg-blue-50' ? 'bg-neutral-100 ring-2 ring-blue-300' : ''
                            }`}
                            onClick={() => {setSelectedBgColor('bg-blue-50'); setIsCustomBgColor(false)}}
                          >
                            <div className="w-6 h-6 bg-blue-100 rounded mx-auto mb-1 border border-blue-200"></div>
                            <span className="text-xs">Blue</span>
                          </td>
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-b ${
                              selectedBgColor === 'bg-purple-50' ? 'bg-neutral-100 ring-2 ring-purple-300' : ''
                            }`}
                            onClick={() => {setSelectedBgColor('bg-purple-50'); setIsCustomBgColor(false)}}
                          >
                            <div className="w-6 h-6 bg-purple-100 rounded mx-auto mb-1 border border-purple-200"></div>
                            <span className="text-xs">Purple</span>
                          </td>
                        </tr>
                        <tr className="grid grid-cols-5">
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-r border-b ${
                              selectedBgColor === 'bg-pink-50' ? 'bg-neutral-100 ring-2 ring-pink-300' : ''
                            }`}
                            onClick={() => {setSelectedBgColor('bg-pink-50'); setIsCustomBgColor(false)}}
                          >
                            <div className="w-6 h-6 bg-pink-100 rounded mx-auto mb-1 border border-pink-200"></div>
                            <span className="text-xs">Pink</span>
                          </td>
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-r border-b ${
                              selectedBgColor === 'bg-indigo-50' ? 'bg-neutral-100 ring-2 ring-indigo-300' : ''
                            }`}
                            onClick={() => {setSelectedBgColor('bg-indigo-50'); setIsCustomBgColor(false)}}
                          >
                            <div className="w-6 h-6 bg-indigo-100 rounded mx-auto mb-1 border border-indigo-200"></div>
                            <span className="text-xs">Indigo</span>
                          </td>
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-r border-b ${
                              selectedBgColor === 'bg-grounded-50' ? 'bg-neutral-100 ring-2 ring-green-300' : ''
                            }`}
                            onClick={() => {setSelectedBgColor('bg-grounded-50'); setIsCustomBgColor(false)}}
                          >
                            <div className="w-6 h-6 bg-green-50 rounded mx-auto mb-1 border border-green-200"></div>
                            <span className="text-xs">Grounded</span>
                          </td>
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-r border-b ${
                              selectedBgColor === 'bg-earth-50' ? 'bg-neutral-100 ring-2 ring-yellow-300' : ''
                            }`}
                            onClick={() => {setSelectedBgColor('bg-earth-50'); setIsCustomBgColor(false)}}
                          >
                            <div className="w-6 h-6 bg-yellow-50 rounded mx-auto mb-1 border border-yellow-200"></div>
                            <span className="text-xs">Earth</span>
                          </td>
                          <td 
                            className={`p-2 text-center cursor-pointer hover:bg-neutral-100 border-b ${
                              selectedBgColor === 'bg-neutral-50' ? 'bg-neutral-100 ring-2 ring-gray-300' : ''
                            }`}
                            onClick={() => {setSelectedBgColor('bg-neutral-50'); setIsCustomBgColor(false)}}
                          >
                            <div className="w-6 h-6 bg-gray-50 rounded mx-auto mb-1 border border-gray-200"></div>
                            <span className="text-xs">Neutral</span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={5} className={`p-2 ${isCustomBgColor ? 'bg-neutral-100 ring-2 ring-blue-500' : ''}`}>
                            <div className="flex items-center space-x-2">
                              <input
                                type="color"
                                value={customColor}
                                onChange={(e) => {setCustomColor(e.target.value); setSelectedBgColor(`bg-[${e.target.value}]`); setIsCustomBgColor(true)}}
                                className="w-8 h-8 border border-neutral-300 rounded cursor-pointer"
                              />
                              <span className="text-sm text-neutral-600">Custom Background</span>
                              <input
                                type="text"
                                value={customColor}
                                onChange={(e) => {setCustomColor(e.target.value); setSelectedBgColor(`bg-[${e.target.value}]`); setIsCustomBgColor(true)}}
                                className="px-2 py-1 text-sm border border-neutral-300 rounded"
                                placeholder="#F3F4F6"
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Preview</label>
                <div className={`inline-flex px-3 py-1.5 rounded-full ${selectedBgColor} ${selectedColor}`}>
                  <span className="text-sm font-medium">{newCategoryName || 'Category Name'}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCategory}
                  className="px-4 py-2 bg-grounded-500 text-white rounded-lg hover:bg-grounded-600 transition-colors"
                >
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </motion.div>
          )}

          {/* Categories List */}
          <div className="flex flex-wrap gap-2">
            {categoriesData.map((category) => (
              <div
                key={category.id}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${category.bgColor || 'bg-grounded-100'} ${category.color || 'text-grounded-800'}`}
              >
                <span className="text-sm font-medium">{category.name}</span>
                <button
                  onClick={() => handleEditCategory(category)}
                  className={`${category.color || 'text-grounded-600'} hover:text-blue-600 transition-colors`}
                  title="Edit category"
                >
                  <Edit className="h-3 w-3" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className={`${category.color || 'text-grounded-600'} hover:text-red-600 transition-colors`}
                  title="Delete category"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
            {categoriesData.length === 0 && (
              <p className="text-neutral-500 text-sm">No categories created yet</p>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-grounded-100 rounded-lg p-3">
                <FileText className="h-6 w-6 text-grounded-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Total Posts</p>
                <p className="text-2xl font-bold text-neutral-900">{posts.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Published</p>
                <p className="text-2xl font-bold text-neutral-900">{posts.filter(p => p.published).length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Drafts</p>
                <p className="text-2xl font-bold text-neutral-900">{posts.filter(p => !p.published).length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-earth-100 rounded-lg p-3">
                <User className="h-6 w-6 text-earth-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Authors</p>
                <p className="text-2xl font-bold text-neutral-900">{new Set(posts.map(p => p.author)).size}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-grounded-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-grounded-500 focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Posts Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredPosts.map((post, index) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="hover:bg-neutral-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-neutral-900">{post.title}</div>
                        <div className="text-sm text-neutral-500 truncate max-w-xs">{post.excerpt}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColors(post.category).bgColor} ${getCategoryColors(post.category).color}`}>
                        {getCategoryName(post.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {post.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/blog/${post.slug}`}
                          target="_blank"
                          className="text-neutral-600 hover:text-neutral-900"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          to={`/admin/editor/${post.slug}`}
                          className="text-grounded-600 hover:text-grounded-900"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleTogglePublish(post.id)}
                          className={`${
                            post.published ? 'text-green-600 hover:text-green-900' : 'text-yellow-600 hover:text-yellow-900'
                          }`}
                        >
                          {post.published ? <Eye className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No posts found</h3>
              <p className="text-neutral-500">Get started by creating a new post.</p>
            </div>
          )}
        </motion.div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={cancelDeleteCategory}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Delete Category</h3>
                <p className="text-sm text-neutral-600">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-neutral-700">
                Are you sure you want to delete the <span className="font-semibold">"{showDeleteModal}"</span> category? 
                All posts in this category will be moved to the default category.
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDeleteCategory}
                className="px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteCategory}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Category
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboard;
