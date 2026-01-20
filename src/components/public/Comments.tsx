import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Trash2, User, Clock, Heart } from 'lucide-react';
import type { BlogComment } from '../../lib/supabase';
import commentStorageService from '../../lib/commentStorage';

interface CommentsProps {
  postId: string;
  comments: BlogComment[];
  onAddComment: (comment: { author: string; email: string; content: string }) => void;
  onDeleteComment: (commentId: string) => void;
  isAdmin?: boolean;
}

const Comments: React.FC<CommentsProps> = ({ postId, comments, onAddComment, onDeleteComment, isAdmin = false }) => {
  const [newComment, setNewComment] = useState({ author: '', email: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLikeComment = async (commentId: string) => {
    try {
      commentStorageService.likeComment(commentId);
      // Reload the page to show updated like count
      window.location.reload();
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.author.trim() || !newComment.email.trim() || !newComment.content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddComment(newComment);
      setNewComment({ author: '', email: '', content: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Error adding comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Comment Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Leave a Comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
              <input
                type="text"
                value={newComment.author}
                onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
                className="w-full p-2 border rounded focus:ring-grounded-500 focus:border-grounded-500"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
              <input
                type="email"
                value={newComment.email}
                onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-2 border rounded focus:ring-grounded-500 focus:border-grounded-500"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Comment</label>
            <textarea
              value={newComment.content}
              onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
              className="w-full h-32 p-2 border rounded focus:ring-grounded-500 focus:border-grounded-500 resize-none"
              placeholder="Share your thoughts..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-6 py-2 bg-grounded-600 text-white rounded hover:bg-grounded-700 disabled:opacity-50 transition-colors duration-200"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </h3>
        
        {comments.length === 0 ? (
          <div className="text-center py-8 text-neutral-600">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <AnimatePresence>
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-neutral-600" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">{comment.author}</h4>
                      <p className="text-sm text-neutral-600">{comment.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={14} className="text-neutral-500" />
                    <span className="text-sm text-neutral-500">{formatDate(comment.created_at)}</span>
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition-colors duration-200"
                      aria-label="Like comment"
                    >
                      <Heart size={14} />
                      <span className="text-sm">{comment.likes || 0}</span>
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => onDeleteComment(comment.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        aria-label="Delete comment"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="prose prose-sm max-w-none text-neutral-700">
                  <p>{comment.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Comments;
