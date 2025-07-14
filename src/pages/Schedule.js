import React, { useState } from 'react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';
import './Schedule.css';

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const [scheduledPosts, setScheduledPosts] = useState([
    {
      id: 1,
      title: "Weekly Motivation Quote",
      content: "Success is not final, failure is not fatal...",
      platform: "Instagram",
      scheduledDate: new Date('2024-01-18T10:00:00'),
      status: "scheduled",
      image: null
    },
    {
      id: 2,
      title: "Industry Insights: Digital Marketing Trends",
      content: "The latest trends in digital marketing for 2024...",
      platform: "LinkedIn",
      scheduledDate: new Date('2024-01-19T14:30:00'),
      status: "scheduled",
      image: null
    },
    {
      id: 3,
      title: "Behind the Scenes: Our Creative Process",
      content: "Take a peek behind the curtain...",
      platform: "TikTok",
      scheduledDate: new Date('2024-01-20T16:00:00'),
      status: "draft",
      image: null
    }
  ]);

  const platforms = ['Instagram', 'TikTok', 'LinkedIn', 'Twitter', 'Facebook'];

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const getPostsForDate = (date) => {
    return scheduledPosts.filter(post => isSameDay(new Date(post.scheduledDate), date));
  };

  const handleCreateSchedule = (scheduleData) => {
    const newSchedule = {
      id: Date.now(),
      ...scheduleData,
      scheduledDate: new Date(scheduleData.scheduledDate + 'T' + scheduleData.scheduledTime),
      status: 'scheduled'
    };
    setScheduledPosts([newSchedule, ...scheduledPosts]);
    setShowScheduleModal(false);
  };

  const handleEditSchedule = (scheduleId, updatedData) => {
    setScheduledPosts(scheduledPosts.map(schedule => 
      schedule.id === scheduleId ? { ...schedule, ...updatedData } : schedule
    ));
    setEditingSchedule(null);
  };

  const handleDeleteSchedule = (scheduleId) => {
    if (window.confirm('Are you sure you want to delete this scheduled post?')) {
      setScheduledPosts(scheduledPosts.filter(schedule => schedule.id !== scheduleId));
    }
  };

  const CalendarDay = ({ date, posts }) => {
    const isSelected = isSameDay(date, selectedDate);
    const isToday = isSameDay(date, new Date());
    const dayPosts = getPostsForDate(date);

    return (
      <div 
        className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
        onClick={() => setSelectedDate(date)}
      >
        <div className="day-header">
          <span className="day-number">{format(date, 'd')}</span>
          <span className="day-name">{format(date, 'EEE')}</span>
        </div>
        <div className="day-posts">
          {dayPosts.map(post => (
            <div key={post.id} className="day-post">
              <span className={`platform-badge ${post.platform.toLowerCase()}`}>
                {post.platform}
              </span>
              <span className="post-title">{post.title}</span>
              <span className="post-time">{format(new Date(post.scheduledDate), 'HH:mm')}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ScheduledPostCard = ({ post }) => (
    <div className="scheduled-post-card">
      <div className="post-header">
        <div className="post-meta">
          <span className={`platform-badge ${post.platform.toLowerCase()}`}>
            {post.platform}
          </span>
          <span className={`status-badge ${post.status}`}>
            {post.status}
          </span>
        </div>
        <div className="post-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => setEditingSchedule(post)}
          >
            Edit
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => handleDeleteSchedule(post.id)}
          >
            Delete
          </button>
        </div>
      </div>
      
      <h3 className="post-title">{post.title}</h3>
      <p className="post-content">{post.content}</p>
      
      <div className="post-schedule">
        <span className="schedule-date">
          {format(new Date(post.scheduledDate), 'MMM dd, yyyy')}
        </span>
        <span className="schedule-time">
          {format(new Date(post.scheduledDate), 'HH:mm')}
        </span>
      </div>
    </div>
  );

  return (
    <div className="schedule-page">
      <div className="schedule-header">
        <div>
          <h1 className="page-title">Schedule</h1>
          <p className="page-subtitle">Plan and schedule your social media posts</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowScheduleModal(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Schedule Post
        </button>
      </div>

      <div className="calendar-container">
        <div className="calendar-header">
          <button 
            className="btn btn-secondary"
            onClick={() => setCurrentDate(addDays(currentDate, -7))}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
            Previous
          </button>
          <h2 className="calendar-title">
            {format(weekStart, 'MMM dd')} - {format(weekEnd, 'MMM dd, yyyy')}
          </h2>
          <button 
            className="btn btn-secondary"
            onClick={() => setCurrentDate(addDays(currentDate, 7))}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            Next
          </button>
        </div>
        
        <div className="calendar-grid">
          {weekDays.map(day => (
            <CalendarDay key={day.toISOString()} date={day} posts={getPostsForDate(day)} />
          ))}
        </div>
      </div>

      <div className="schedule-content">
        <div className="content-section">
          <div className="section-header">
            <h2>Scheduled Posts</h2>
            <p>Selected: {format(selectedDate, 'EEEE, MMMM dd, yyyy')}</p>
          </div>
          <div className="scheduled-posts">
            {getPostsForDate(selectedDate).map(post => (
              <ScheduledPostCard key={post.id} post={post} />
            ))}
            {getPostsForDate(selectedDate).length === 0 && (
              <div className="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <h3>No posts scheduled</h3>
                <p>No posts are scheduled for this date</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showScheduleModal && (
        <ScheduleModal
          onClose={() => setShowScheduleModal(false)}
          onSubmit={handleCreateSchedule}
          platforms={platforms}
          selectedDate={selectedDate}
        />
      )}

      {editingSchedule && (
        <EditScheduleModal
          schedule={editingSchedule}
          onClose={() => setEditingSchedule(null)}
          onSubmit={handleEditSchedule}
          platforms={platforms}
        />
      )}
    </div>
  );
};

const ScheduleModal = ({ onClose, onSubmit, platforms, selectedDate }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    platform: 'Instagram',
    scheduledDate: format(selectedDate, 'yyyy-MM-dd'),
    scheduledTime: '10:00'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Schedule New Post</h2>
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
          
          <div className="form-row">
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
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-input"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Schedule Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditScheduleModal = ({ schedule, onClose, onSubmit, platforms }) => {
  const [formData, setFormData] = useState({
    title: schedule.title,
    content: schedule.content,
    platform: schedule.platform,
    scheduledDate: format(new Date(schedule.scheduledDate), 'yyyy-MM-dd'),
    scheduledTime: format(new Date(schedule.scheduledDate), 'HH:mm')
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(schedule.id, {
      ...formData,
      scheduledDate: new Date(formData.scheduledDate + 'T' + formData.scheduledTime)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Scheduled Post</h2>
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
          
          <div className="form-row">
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
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-input"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Schedule; 