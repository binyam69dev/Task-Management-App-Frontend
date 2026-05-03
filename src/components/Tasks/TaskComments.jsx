import React, { useState } from 'react';
import { format } from 'date-fns';
import { FiSend, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';

const TaskComments = ({ taskId, initialComments = [] }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const comment = {
        id: Date.now(),
        text: newComment,
        user: { name: 'Current User' },
        createdAt: new Date().toISOString()
      };
      setComments([comment, ...comments]);
      setNewComment('');
      setLoading(false);
      toast.success('Comment added');
    }, 500);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>
      
      {/* Add Comment */}
      <div className="flex space-x-2 mb-6">
        <textarea
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          rows="3"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          disabled={loading}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors h-fit"
        >
          <FiSend className="w-5 h-5" />
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <FiUser className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{comment.user.name}</p>
                  <p className="text-xs text-gray-500">{format(new Date(comment.createdAt), 'PPP p')}</p>
                </div>
              </div>
              <p className="text-gray-700 ml-10">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskComments;
