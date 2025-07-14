import React, { useState } from 'react';
import { format } from 'date-fns';
import './Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "10 Tips for Better Social Media Engagement",
      content: "Learn the best practices for increasing engagement on your social media posts...",
      platform: "Instagram",
      status: "published",
      views: 1240,
      likes: 89,
      comments: 23,
      date: new Date('2024-01-15'),
      tags: ["engagement", "tips", "social media"]
    },
    {
      id: 2,
      title: "Behind the Scenes: Our Creative Process",
      content: "Take a peek behind the curtain and see how we create our content...",
      platform: "TikTok",
      status: "published",
      views: 2150,
      likes: 156,
      comments: 45,
      date: new Date('2024-01-14'),
      tags: ["behind the scenes", "creative", "process"]
    },
    {
      id: 3,
      title: "Product Launch Announcement",
      content: "We're excited to announce our latest product launch...",
      platform: "LinkedIn",
      status: "scheduled",
      views: 0,
      likes: 0,
      comments: 0,
      date: new Date('2024-01-20'),
      tags: ["product", "launch", "announcement"]
    },
    {
      id: 4,
      title: "Weekly Motivation Quote",
      content: "Success is not final, failure is not fatal...",
      platform: "Instagram",
      status: "draft",
      views: 0,
      likes: 0,
      comments: 0,
      date: new Date('2024-01-18'),
      tags: ["motivation", "quote", "inspiration"]
    }
  ]);

  const [filters, setFilters] = useState({
    platform: 'all',
    status: 'all',
    search: ''
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const platforms = ['Instagram', 'TikTok', 'LinkedIn', 'Twitter', 'Facebook'];
  const statuses = ['published', 'scheduled', 'draft'];

  const filteredPosts = posts.filter(post => {
    const matchesPlatform = filters.platform === 'all' || post.platform === filters.platform;
    const matchesStatus = filters.status === 'all' || post.status === filters.status;
    const matchesSearch = post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         post.content.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesPlatform && matchesStatus && matchesSearch;
  });

  const handleCreatePost = (postData) => {
    const newPost = {
      id: Date.now(),
      ...postData,
      views: 0,
      likes: 0,
      comments: 0,
      date: new Date(),
      tags: postData.tags.split(',').map(tag => tag.trim())
    };
    setPosts([newPost, ...posts]);
    setShowCreateModal(false);
  };

  const handleEditPost = (postId, updatedData) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, ...updatedData } : post
    ));
    setEditingPost(null);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const PostCard = ({ post }) => (
    <div className="post-card">
      <div className="post-header">
        <div className="post-meta">
          <span className={`platform-badge ${post.platform.toLowerCase()}`}>
            {post.platform}
          </span>
          <span className={`status-badge ${post.status}`}>
            {post.status}
          </span>
          <span className="post-date">{format(post.date, 'MMM dd, yyyy')}</span>
        </div>
        <div className="post-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => setEditingPost(post)}
          >
            Edit
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => handleDeletePost(post.id)}
          >
            Delete
          </button>
        </div>
      </div>
      
      <h3 className="post-title">{post.title}</h3>
      <p className="post-content">{post.content}</p>
      
      <div className="post-tags">
        {post.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      
      <div className="post-stats">
        <span className="stat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          {post.views}
        </span>
        <span className="stat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          {post.likes}
        </span>
        <span className="stat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          {post.comments}
        </span>
      </div>
    </div>
  );

  return (
    <div className="posts-page">
      <div className="posts-header">
        <div>
          <h1 className="page-title">Posts</h1>
          <p className="page-subtitle">Manage your social media posts and content</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create Post
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search posts..."
            className="form-input"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        
        <div className="filter-group">
          <select
            className="form-input"
            value={filters.platform}
            onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
          >
            <option value="all">All Platforms</option>
            {platforms.map(platform => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <select
            className="form-input"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="all">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="posts-grid">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14,2 14,8 20,8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10,9 9,9 8,9"></polyline>
          </svg>
          <h3>No posts found</h3>
          <p>Try adjusting your filters or create a new post</p>
        </div>
      )}

      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePost}
          platforms={platforms}
        />
      )}

      {editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSubmit={handleEditPost}
          platforms={platforms}
        />
      )}
    </div>
  );
};

const CreatePostModal = ({ onClose, onSubmit, platforms }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    platform: 'Instagram',
    tags: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Create New Post</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              className="form-input"
              rows="4"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Platform</label>
            <select
              className="form-input"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            >
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Tags (comma-separated)</label>
            <input
              type="text"
              className="form-input"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="engagement, tips, social media"
            />
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditPostModal = ({ post, onClose, onSubmit, platforms }) => {
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    platform: post.platform,
    tags: post.tags.join(', ')
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(post.id, {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Post</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              className="form-input"
              rows="4"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Platform</label>
            <select
              className="form-input"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            >
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Tags (comma-separated)</label>
            <input
              type="text"
              className="form-input"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="engagement, tips, social media"
            />
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Posts; 