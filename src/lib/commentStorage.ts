import type { BlogComment } from './supabase';

const COMMENTS_KEY = 'bodybalance_blog_comments';

export interface CommentStorageService {
  getComments: (postId: string) => BlogComment[];
  addComment: (postId: string, commentData: Omit<BlogComment, 'id' | 'created_at' | 'post_id' | 'likes'>) => BlogComment;
  deleteComment: (commentId: string) => void;
  likeComment: (commentId: string) => BlogComment | null;
}

const commentStorageService: CommentStorageService = {
  getComments: (postId: string): BlogComment[] => {
    if (typeof window === 'undefined') return [];
    
    const comments = localStorage.getItem(COMMENTS_KEY);
    if (!comments) return [];
    
    const allComments = JSON.parse(comments) as BlogComment[];
    return allComments.filter(comment => comment.post_id === postId);
  },

  addComment: (postId: string, commentData: Omit<BlogComment, 'id' | 'created_at' | 'post_id' | 'likes'>): BlogComment => {
    if (typeof window === 'undefined') {
      throw new Error('Cannot add comment in server-side environment');
    }

    const existingComments = localStorage.getItem(COMMENTS_KEY);
    const allComments = existingComments ? JSON.parse(existingComments) as BlogComment[] : [];
    
    const newComment: BlogComment = {
      ...commentData,
      id: Date.now().toString(),
      post_id: postId,
      likes: 0,
      created_at: new Date().toISOString()
    };
    
    const updatedComments = [...allComments, newComment];
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(updatedComments));
    
    return newComment;
  },

  deleteComment: (commentId: string): void => {
    if (typeof window === 'undefined') return;
    
    const existingComments = localStorage.getItem(COMMENTS_KEY);
    if (!existingComments) return;
    
    const allComments = JSON.parse(existingComments) as BlogComment[];
    const updatedComments = allComments.filter(comment => comment.id !== commentId);
    
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(updatedComments));
  },

  likeComment: (commentId: string): BlogComment | null => {
    if (typeof window === 'undefined') return null;
    
    const existingComments = localStorage.getItem(COMMENTS_KEY);
    if (!existingComments) return null;
    
    const allComments = JSON.parse(existingComments) as BlogComment[];
    const commentIndex = allComments.findIndex(comment => comment.id === commentId);
    
    if (commentIndex === -1) return null;
    
    allComments[commentIndex].likes += 1;
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
    
    return allComments[commentIndex];
  }
};

export default commentStorageService;
