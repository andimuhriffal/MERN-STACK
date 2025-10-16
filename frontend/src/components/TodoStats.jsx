import React from 'react';

const TodoStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="stats-container">
      <h3>📊 Todo Statistics</h3>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Todos</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.completionRate}%</div>
          <div className="stat-label">Completion Rate</div>
        </div>
      </div>

      {/* Priority Stats */}
      <div className="stats-section">
        <h4>By Priority</h4>
        <div className="priority-stats">
          {stats.byPriority?.map(item => (
            <div key={item._id} className="priority-stat">
              <span className="priority-label">{item._id}:</span>
              <span className="priority-count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Stats */}
      <div className="stats-section">
        <h4>By Category</h4>
        <div className="category-stats">
          {stats.byCategory?.map(item => (
            <div key={item._id} className="category-stat">
              <span className="category-label">{item._id}:</span>
              <span className="category-count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoStats;