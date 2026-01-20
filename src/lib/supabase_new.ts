import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Types for frontend
export type User = Database['public']['Tables']['users']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Post = Database['public']['Tables']['posts']['Row'] & {
  author?: User;
  category?: Category;
  tags?: Tag[];
  seo_metadata?: SEOData;
};
export type Comment = Database['public']['Tables']['comments']['Row'] & {
  replies?: Comment[];
};
export type Tag = Database['public']['Tables']['tags']['Row'];
export type Media = Database['public']['Tables']['media']['Row'];
export type SEOData = Database['public']['Tables']['seo_metadata']['Row'];
export type PostAnalytics = Database['public']['Tables']['post_analytics']['Row'];

// Blog service
export const blogService = {
  // Get all published posts with joins
  async getPublishedPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:users(*),
        category:categories(*),
        seo_metadata(*)
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data as Post[];
  },

  // Get post by slug
  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:users(*),
        category:categories(*),
        seo_metadata(*),
        comments:comments(*, replies:comments(*))
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;
    
    // Increment view count
    await this.incrementView(data.id);
    
    return data as Post & { comments: Comment[] };
  },

  // Get post by slug (admin - includes drafts)
  async getPostBySlugAdmin(slug: string) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:users(*),
        category:categories(*),
        seo_metadata(*)
      `)
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as Post;
  },

  // Increment view count with analytics
  async incrementView(postId: string, userId?: string) {
    const { error } = await supabase.rpc('increment_post_view', {
      post_id: postId,
      user_id: userId
    });

    if (error) throw error;
  },

  // Like a post
  async likePost(postId: string) {
    const { error } = await supabase
      .from('posts')
      .update({ likes: supabase.sql`likes + 1` })
      .eq('id', postId);

    if (error) throw error;
  },

  // Save post (create or update)
  async savePost(post: Partial<Post>) {
    const { id, author, category, tags, seo_metadata, ...postData } = post;
    
    // Handle SEO metadata
    if (seo_metadata && id) {
      await this.saveSEOMetadata(id, seo_metadata);
    }

    if (id) {
      // Update existing post
      const { data, error } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Post;
    } else {
      // Create new post
      const { data, error } = await supabase
        .from('posts')
        .insert([postData])
        .select()
        .single();

      if (error) throw error;
      return data as Post;
    }
  },

  // Save SEO metadata
  async saveSEOMetadata(postId: string, seoData: Partial<SEOData>) {
    const { id, ...seoDataWithoutId } = seoData;
    
    const { data } = await supabase
      .from('seo_metadata')
      .select('*')
      .eq('post_id', postId)
      .single();

    if (data) {
      // Update existing
      const { error } = await supabase
        .from('seo_metadata')
        .update(seoDataWithoutId)
        .eq('id', data.id);

      if (error) throw error;
    } else {
      // Create new
      const { error } = await supabase
        .from('seo_metadata')
        .insert([{ post_id: postId, ...seoDataWithoutId }]);

      if (error) throw error;
    }
  },

  // Delete post
  async deletePost(postId: string) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) throw error;
  },

  // Update post status
  async updatePostStatus(postId: string, status: 'draft' | 'published' | 'archived') {
    const updateData = { 
      status,
      published_at: status === 'published' ? new Date().toISOString() : null
    };

    const { error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', postId);

    if (error) throw error;
  },

  // Get all posts for admin
  async getAllPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:users(*),
        category:categories(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Post[];
  },

  // Get posts by category
  async getPostsByCategory(categorySlug: string) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:users(*),
        category:categories(*)
      `)
      .eq('status', 'published')
      .eq('category.slug', categorySlug)
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data as Post[];
  },
};

// Category service
export const categoryService = {
  // Get all categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data as Category[];
  },

  // Get category by slug
  async getCategoryBySlug(slug: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as Category;
  },

  // Create category
  async createCategory(category: Partial<Category>) {
    const { data, error } = await supabase
      .from('categories')
      .insert([category])
      .select()
      .single();

    if (error) throw error;
    return data as Category;
  },

  // Update category
  async updateCategory(categoryId: string, updates: Partial<Category>) {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', categoryId)
      .select()
      .single();

    if (error) throw error;
    return data as Category;
  },

  // Delete category
  async deleteCategory(categoryId: string) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId);

    if (error) throw error;
  },
};

// Comment service
export const commentService = {
  // Get comments for post
  async getComments(postId: string) {
    const { data, error } = await supabase
      .from('comments')
      .select('*, replies:comments(*)')
      .eq('post_id', postId)
      .eq('status', 'approved')
      .is('parent_id', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Comment[];
  },

  // Add comment
  async addComment(postId: string, commentData: { 
    author_name: string; 
    author_email: string; 
    content: string;
    parent_id?: string;
  }) {
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        post_id: postId,
        ...commentData,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data as Comment;
  },

  // Delete comment
  async deleteComment(commentId: string) {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) throw error;
  },

  // Update comment status
  async updateCommentStatus(commentId: string, status: 'pending' | 'approved' | 'rejected') {
    const { error } = await supabase
      .from('comments')
      .update({ status })
      .eq('id', commentId);

    if (error) throw error;
  },

  // Get all comments for admin
  async getAllComments() {
    const { data, error } = await supabase
      .from('comments')
      .select('*, post:posts(title, slug)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as (Comment & { post: { title: string; slug: string } })[];
  },
};

// Authentication service
export const authService = {
  // Login with email/password
  async login(email: string, password: string) {
    // Simple validation for demo
    // In production, use Supabase Auth
    if (email === 'admin@bodybalance.com' && password === 'admin123') {
      const token = this.generateToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);
      
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminTokenExpiry', expiresAt.toISOString());
      localStorage.setItem('adminEmail', email);
      
      return { success: true, token };
    }
    throw new Error('Invalid credentials');
  },

  // Verify token
  verifyToken(token: string): boolean {
    const storedToken = localStorage.getItem('adminToken');
    const expiry = localStorage.getItem('adminTokenExpiry');
    
    if (!storedToken || !expiry) return false;
    
    return storedToken === token && new Date(expiry) > new Date();
  },

  // Check authentication
  isAuthenticated(): boolean {
    const token = localStorage.getItem('adminToken');
    const expiry = localStorage.getItem('adminTokenExpiry');
    
    if (!token || !expiry) return false;
    
    return this.verifyToken(token);
  },

  // Get current user
  async getCurrentUser() {
    const email = localStorage.getItem('adminEmail');
    if (!email) return null;

    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    return data as User;
  },

  // Logout
  logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminTokenExpiry');
    localStorage.removeItem('adminEmail');
  },

  // Generate token
  generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
};