import React, { useState, useEffect } from 'react';

const TodoForm = ({ onSubmit, editTodo, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    text: '',
    priority: 'medium',
    category: 'general'
  });

  useEffect(() => {
    if (editTodo) {
      setFormData({
        text: editTodo.text,
        priority: editTodo.priority,
        category: editTodo.category
      });
    }
  }, [editTodo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.text.trim()) {
      alert('Please enter todo text');
      return;
    }

    onSubmit(formData);
    
    if (!editTodo) {
      // Reset form only when creating new todo
      setFormData({
        text: '',
        priority: 'medium',
        category: 'general'
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      text: '',
      priority: 'medium',
      category: 'general'
    });
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="What needs to be done?"
          className="todo-input"
          rows="3"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Priority:</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="form-input"
          />
        </div>
      </div>

      <div className="form-actions">
        {editTodo ? (
          <>
            <button type="submit" className="btn btn-primary">
              Update Todo
            </button>
            <button 
              type="button" 
              onClick={handleCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </>
        ) : (
          <button type="submit" className="btn btn-primary">
            Add Todo
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;