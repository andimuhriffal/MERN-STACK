import React from 'react';

const Filters = ({ filters, onFilterChange, onClearFilters }) => {
  return (
    <div className="filters-section">
      <h3>Filters</h3>
      <div className="filters-grid">
        <div className="filter-group">
          <label>Status:</label>
          <select
            value={filters.completed}
            onChange={(e) => onFilterChange('completed', e.target.value)}
            className="filter-select"
          >
            <option value="">All</option>
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Priority:</label>
          <select
            value={filters.priority}
            onChange={(e) => onFilterChange('priority', e.target.value)}
            className="filter-select"
          >
            <option value="">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search todos..."
            className="filter-input"
          />
        </div>

        <button onClick={onClearFilters} className="clear-filters-btn">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;