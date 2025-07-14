import React, { useState } from 'react';
import { format } from 'date-fns';
import './Ideas.css';

const Ideas = () => {
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      title: "10 Ways to Boost Instagram Engagement",
      description: "Create a comprehensive guide with actionable tips for increasing engagement on Instagram posts",
      category: "Educational",
      status: "active",
      priority: "high",
      tags: ["instagram", "engagement", "tips"],
      date: new Date('2024-01-10'),
      notes: "Research current Instagram algorithm changes"
    },
    {
      id: 2,
      title: "Behind the Scenes Video Series",
      description: "Weekly videos showing the creative process behind our content creation",
      category: "Behind the Scenes",
      status: "active",
      priority: "medium",
      tags: ["video", "behind the scenes", "creative"],
      date: new Date('2024-01-12'),
      notes: "Need to set up proper lighting and camera equipment"
    },
    {
      id: 3,
      title: "Product Review Series",
      description: "Honest reviews of tools and products we use in our business",
      category: "Reviews",
      status: "completed",
      priority: "low",
      tags: ["reviews", "products", "tools"],
      date: new Date('2024-01-08'),
      notes: "First review published successfully"
    },
    {
      id: 4,
      title: "Weekly Motivation Quotes",
      description: "Inspirational quotes with beautiful graphics for Monday motivation",
      category: "Inspiration",
      status: "active",
      priority: "medium",
      tags: ["motivation", "quotes", "graphics"],
      date: new Date('2024-01-15'),
      notes: "Create template for consistent branding"
    }
  ]);

  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    priority: 'all',
    search: ''
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingIdea, setEditingIdea] = useState(null);

  const categories = ['Educational', 'Behind the Scenes', 'Reviews', 'Inspiration', 'Tutorial', 'News'];
  const statuses = ['active', 'completed', 'archived'];
  const priorities = ['high', 'medium', 'low'];

  const filteredIdeas = ideas.filter(idea => {
    const matchesCategory = filters.category === 'all' || idea.category === filters.category;
    const matchesStatus = filters.status === 'all' || idea.status === filters.status;
    const matchesPriority = filters.priority === 'all' || idea.priority === filters.priority;
    const matchesSearch = idea.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         idea.description.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesPriority && matchesSearch;
  });

  const handleCreateIdea = (ideaData) => {
    const newIdea = {
      id: Date.now(),
      ...ideaData,
      date: new Date(),
      tags: ideaData.tags.split(',').map(tag => tag.trim())
    };
    setIdeas([newIdea, ...ideas]);
    setShowCreateModal(false);
  };

  const handleEditIdea = (ideaId, updatedData) => {
    setIdeas(ideas.map(idea => 
      idea.id === ideaId ? { ...idea, ...updatedData } : idea
    ));
    setEditingIdea(null);
  };

  const handleDeleteIdea = (ideaId) => {
    if (window.confirm('Are you sure you want to delete this idea?')) {
      setIdeas(ideas.filter(idea => idea.id !== ideaId));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const IdeaCard = ({ idea }) => (
    <div className="idea-card">
      <div className="idea-header">
        <div className="idea-meta">
          <span className={`category-badge ${idea.category.toLowerCase().replace(' ', '-')}`}>
            {idea.category}
          </span>
          <span className={`status-badge ${idea.status}`}>
            {idea.status}
          </span>
          <span 
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(idea.priority) }}
          >
            {idea.priority}
          </span>
        </div>
        <div className="idea-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => setEditingIdea(idea)}
          >
            Edit
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => handleDeleteIdea(idea.id)}
          >
            Delete
          </button>
        </div>
      </div>
      
      <h3 className="idea-title">{idea.title}</h3>
      <p className="idea-description">{idea.description}</p>
      
      {idea.notes && (
        <div className="idea-notes">
          <strong>Notes:</strong> {idea.notes}
        </div>
      )}
      
      <div className="idea-tags">
        {idea.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      
      <div className="idea-footer">
        <span className="idea-date">{format(idea.date, 'MMM dd, yyyy')}</span>
      </div>
    </div>
  );

  return (
    <div className="ideas-page">
      <div className="ideas-header">
        <div>
          <h1 className="page-title">Content Ideas</h1>
          <p className="page-subtitle">Organize and manage your content ideas and creative concepts</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Idea
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search ideas..."
            className="form-input"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        
        <div className="filter-group">
          <select
            className="form-input"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
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
        
        <div className="filter-group">
          <select
            className="form-input"
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          >
            <option value="all">All Priorities</option>
            {priorities.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="ideas-grid">
        {filteredIdeas.map(idea => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>

      {filteredIdeas.length === 0 && (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
          <h3>No ideas found</h3>
          <p>Try adjusting your filters or add a new idea</p>
        </div>
      )}

      {showCreateModal && (
        <CreateIdeaModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateIdea}
          categories={categories}
          statuses={statuses}
          priorities={priorities}
        />
      )}

      {editingIdea && (
        <EditIdeaModal
          idea={editingIdea}
          onClose={() => setEditingIdea(null)}
          onSubmit={handleEditIdea}
          categories={categories}
          statuses={statuses}
          priorities={priorities}
        />
      )}
    </div>
  );
};

const CreateIdeaModal = ({ onClose, onSubmit, categories, statuses, priorities }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Educational',
    status: 'active',
    priority: 'medium',
    tags: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Idea</h2>
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
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-input"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-input"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                className="form-input"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Tags (comma-separated)</label>
            <input
              type="text"
              className="form-input"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="instagram, engagement, tips"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              className="form-input"
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes or reminders..."
            />
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Idea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditIdeaModal = ({ idea, onClose, onSubmit, categories, statuses, priorities }) => {
  const [formData, setFormData] = useState({
    title: idea.title,
    description: idea.description,
    category: idea.category,
    status: idea.status,
    priority: idea.priority,
    tags: idea.tags.join(', '),
    notes: idea.notes
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(idea.id, {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Idea</h2>
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
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-input"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-input"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                className="form-input"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Tags (comma-separated)</label>
            <input
              type="text"
              className="form-input"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="instagram, engagement, tips"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              className="form-input"
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes or reminders..."
            />
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Idea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Ideas; 