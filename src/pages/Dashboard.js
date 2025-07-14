import React, { useState } from 'react';
import { format } from 'date-fns';
import './Dashboard.css';

const Dashboard = () => {
  const [stats] = useState({
    totalPosts: 156,
    totalViews: 28470,
    totalLikes: 8920,
    totalComments: 2340,
    scheduledPosts: 8,
    pendingIdeas: 12
  });

  const [recentPosts] = useState([
    {
      id: 1,
      title: "10 Tips for Better Social Media Engagement",
      platform: "Instagram",
      status: "published",
      views: 1240,
      likes: 89,
      comments: 23,
      date: new Date('2024-01-15')
    },
    {
      id: 2,
      title: "Behind the Scenes: Our Creative Process",
      platform: "TikTok",
      status: "published",
      views: 2150,
      likes: 156,
      comments: 45,
      date: new Date('2024-01-14')
    },
    {
      id: 3,
      title: "Product Launch Announcement",
      platform: "LinkedIn",
      status: "scheduled",
      views: 0,
      likes: 0,
      comments: 0,
      date: new Date('2024-01-20')
    }
  ]);

  const [upcomingPosts] = useState([
    {
      id: 1,
      title: "Weekly Motivation Quote",
      platform: "Instagram",
      scheduledDate: new Date('2024-01-18T10:00:00'),
      status: "ready"
    },
    {
      id: 2,
      title: "Industry Insights: Digital Marketing Trends",
      platform: "LinkedIn",
      scheduledDate: new Date('2024-01-19T14:30:00'),
      status: "draft"
    }
  ]);

  const StatCard = ({ title, value, icon, color, change }) => (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <p className="stat-value">{value.toLocaleString()}</p>
        {change && (
          <p className={`stat-change ${change > 0 ? 'positive' : 'negative'}`}>
            {change > 0 ? '+' : ''}{change}% from last month
          </p>
        )}
      </div>
    </div>
  );

  const PostCard = ({ post }) => (
    <div className="post-card">
      <div className="post-header">
        <div className="post-platform">
          <span className={`platform-badge ${post.platform.toLowerCase()}`}>
            {post.platform}
          </span>
          <span className={`status-badge ${post.status}`}>
            {post.status}
          </span>
        </div>
        <span className="post-date">{format(post.date, 'MMM dd')}</span>
      </div>
      <h4 className="post-title">{post.title}</h4>
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
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here's what's happening with your social media accounts.</p>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Posts"
          value={stats.totalPosts}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
            </svg>
          }
          color="#6366f1"
          change={12}
        />
        <StatCard
          title="Total Views"
          value={stats.totalViews}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          }
          color="#10b981"
          change={8}
        />
        <StatCard
          title="Total Likes"
          value={stats.totalLikes}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          }
          color="#f59e0b"
          change={15}
        />
        <StatCard
          title="Scheduled Posts"
          value={stats.scheduledPosts}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
            </svg>
          }
          color="#3b82f6"
        />
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <div className="section-header">
            <h2>Recent Posts</h2>
            <button className="btn btn-primary">View All</button>
          </div>
          <div className="posts-grid">
            {recentPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2>Upcoming Posts</h2>
            <button className="btn btn-secondary">Schedule New</button>
          </div>
          <div className="upcoming-posts">
            {upcomingPosts.map(post => (
              <div key={post.id} className="upcoming-post">
                <div className="post-info">
                  <h4>{post.title}</h4>
                  <p className="platform">{post.platform}</p>
                  <p className="scheduled-date">
                    {format(post.scheduledDate, 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <div className="post-actions">
                  <span className={`status-badge ${post.status}`}>
                    {post.status}
                  </span>
                  <button className="btn btn-secondary">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 