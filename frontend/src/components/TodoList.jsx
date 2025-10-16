import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ 
  todos, 
  onToggleTodo, 
  onDeleteTodo, 
  onEditTodo,
  loading 
}) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading todos...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No todos yet</h3>
        <p>Add your first todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <div className="todo-list-header">
        <h3>Your Todos ({todos.length})</h3>
      </div>
      
      <div className="todos-container">
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
            onEdit={onEditTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;