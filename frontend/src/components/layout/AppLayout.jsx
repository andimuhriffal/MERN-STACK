import React from 'react';
import Sidebar from './Sidebar';
import Filters from '../common/Filters';
import TodoList from '../TodoList';

const AppLayout = ({
  // Todo related props
  todos,
  loading,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
  
  // Form related props
  onSubmit,
  editTodo,
  onCancelEdit,
  
  // Stats
  stats,
  
  // Filter related props
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar
        onSubmit={onSubmit}
        editTodo={editTodo}
        onCancelEdit={onCancelEdit}
        stats={stats}
      />

      {/* Main Content */}
      <div className="main-content">
        {/* Filters */}
        <Filters
          filters={filters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
        />

        {/* Todo List */}
        <TodoList
          todos={todos}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AppLayout;