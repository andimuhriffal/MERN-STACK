import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#27ae60';
      default: return '#95a5a6';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-checkbox">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo._id)}
            className="checkbox"
          />
        </div>
        
        <div className="todo-details">
          <span className="todo-text">{todo.text}</span>
          
          <div className="todo-meta">
            <span 
              className="priority-badge"
              style={{ backgroundColor: getPriorityColor(todo.priority) }}
            >
              {todo.priority}
            </span>
            
            <span className="category">#{todo.category}</span>
            
            {todo.createdAt && (
              <span className="created-date">
                {formatDate(todo.createdAt)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="todo-actions">
        <button 
          onClick={() => onEdit(todo)}
          className="edit-btn"
          title="Edit todo"
        >
          ✏️
        </button>
        
        <button 
          onClick={() => onDelete(todo._id)}
          className="delete-btn"
          title="Delete todo"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TodoItem;