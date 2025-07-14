import React, { useState } from 'react';
import { format } from 'date-fns';
import './Analytics.css';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const platforms = ['Instagram', 'TikTok', 'LinkedIn', 'Twitter', 'Facebook'];
  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ];

  // Mock data for analytics
  const analyticsData = {
    overview: {
      totalPosts: 156,
      totalViews: 28470,
      totalLikes: 8920,
      totalComments: 2340,
      totalShares: 1560,
      avgEngagement: 8.5
    },
    platformStats: [
      { platform: 'Instagram', posts: 45, views: 12400, likes: 3200, comments: 890, engagement: 9.2 },
      { platform: 'TikTok', posts: 32, views: 8900, likes: 2800, comments: 650, engagement: 7.8 },
      { platform: 'LinkedIn', posts: 28, views: 4200, likes: 1800, comments: 450, engagement: 6.5 },
      { platform: 'Twitter', posts: 35, views: 2100, likes: 800, comments: 250, engagement: 5.2 },
      { platform: 'Facebook', posts: 16, views: 870, likes: 320, comments: 100, engagement: 4.8 }
    ],
    topPosts: [
      {
        id: 1,
        title: "10 Tips for Better Social Media Engagement",
        platform: "Instagram",
        views: 1240,
        likes: 89,
        comments: 23,
        engagement: 9.1,
        date: new Date('2024-01-15')
      },
      {
        id: 2,
        title: "Behind the Scenes: Our Creative Process",
        platform: "TikTok",
        views: 2150,
        likes: 156,
        comments: 45,
        engagement: 9.3,
        date: new Date('2024-01-14')
      },
      {
        id: 3,
        title: "Product Launch Announcement",
        platform: "LinkedIn",
        views: 890,
        likes: 67,
        comments: 18,
        engagement: 9.6,
        date: new Date('2024-01-12')
      }
    ],
    engagementTrend: [
      { date: '2024-01-01', engagement: 7.2 },
      { date: '2024-01-08', engagement: 8.1 },
      { date: '2024-01-15', engagement: 8.5 },
      { date: '2024-01-22', engagement: 9.1 },
      { date: '2024-01-29', engagement: 8.8 }
    ]
  };

  const MetricCard = ({ title, value, change, icon, color }) => (
    <div className="metric-card">
      <div className="metric-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="metric-content">
        <h3 className="metric-title">{title}</h3>
        <p className="metric-value">{value.toLocaleString()}</p>
        {change && (
          <p className={`metric-change ${change > 0 ? 'positive' : 'negative'}`}>
            {change > 0 ? '+' : ''}{change}% from last period
          </p>
        )}
      </div>
    </div>
  );

  const PlatformCard = ({ platform }) => (
    <div className="platform-card">
      <div className="platform-header">
        <h3 className="platform-name">{platform.platform}</h3>
        <span className="engagement-rate">{platform.engagement}% engagement</span>
      </div>
      <div className="platform-stats">
        <div className="stat-item">
          <span className="stat-label">Posts</span>
          <span className="stat-value">{platform.posts}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Views</span>
          <span className="stat-value">{platform.views.toLocaleString()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Likes</span>
          <span className="stat-value">{platform.likes.toLocaleString()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Comments</span>
          <span className="stat-value">{platform.comments.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );

  const TopPostCard = ({ post }) => (
    <div className="top-post-card">
      <div className="post-header">
        <div className="post-meta">
          <span className={`platform-badge ${post.platform.toLowerCase()}`}>
            {post.platform}
          </span>
          <span className="post-date">{format(post.date, 'MMM dd')}</span>
        </div>
        <span className="engagement-rate">{post.engagement}% engagement</span>
      </div>
      
      <h4 className="post-title">{post.title}</h4>
      
      <div className="post-stats">
        <div className="stat-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span>{post.views}</span>
        </div>
        <div className="stat-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span>{post.likes}</span>
        </div>
        <div className="stat-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>{post.comments}</span>
        </div>
      </div>
    </div>
  );

  const EngagementChart = () => (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Engagement Trend</h3>
        <div className="chart-controls">
          <select 
            className="form-input"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="chart-placeholder">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
        <p>Chart visualization would be implemented with Chart.js or similar library</p>
        <div className="chart-data">
          {analyticsData.engagementTrend.map((point, index) => (
            <div key={index} className="data-point">
              <span className="date">{format(new Date(point.date), 'MMM dd')}</span>
              <span className="value">{point.engagement}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Track your social media performance and engagement metrics</p>
        </div>
        <div className="header-controls">
          <select 
            className="form-input"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            <option value="all">All Platforms</option>
            {platforms.map(platform => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="metrics-grid">
        <MetricCard
          title="Total Posts"
          value={analyticsData.overview.totalPosts}
          change={12}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
            </svg>
          }
          color="#6366f1"
        />
        <MetricCard
          title="Total Views"
          value={analyticsData.overview.totalViews}
          change={8}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          }
          color="#10b981"
        />
        <MetricCard
          title="Total Likes"
          value={analyticsData.overview.totalLikes}
          change={15}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          }
          color="#f59e0b"
        />
        <MetricCard
          title="Avg Engagement"
          value={analyticsData.overview.avgEngagement}
          change={5}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          }
          color="#3b82f6"
        />
      </div>

      <div className="analytics-content">
        <div className="content-section">
          <div className="section-header">
            <h2>Platform Performance</h2>
          </div>
          <div className="platforms-grid">
            {analyticsData.platformStats.map(platform => (
              <PlatformCard key={platform.platform} platform={platform} />
            ))}
          </div>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2>Top Performing Posts</h2>
          </div>
          <div className="top-posts">
            {analyticsData.topPosts.map(post => (
              <TopPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <div className="content-section">
          <EngagementChart />
        </div>
      </div>
    </div>
  );
};

export default Analytics; 