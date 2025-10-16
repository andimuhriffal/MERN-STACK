import React from 'react';
import TodoForm from '../TodoForm';
import TodoStats from '../TodoStats';

const Sidebar = ({ 
  onSubmit, 
  editTodo, 
  onCancelEdit, 
  stats 
}) => {
  return (
    <div className="sidebar">
      <TodoForm
        onSubmit={onSubmit}
        editTodo={editTodo}
        onCancelEdit={onCancelEdit}
      />
      
      <TodoStats stats={stats} />
    </div>
  );
};

export default Sidebar;