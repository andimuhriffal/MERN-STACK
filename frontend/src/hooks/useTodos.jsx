import { useState, useEffect, useCallback } from 'react';
import { todoAPI, healthCheck } from '../services/api';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editTodo, setEditTodo] = useState(null);

  // Fetch all todos
  const fetchTodos = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError('');
      const result = await todoAPI.getTodos(filters);
      
      if (result.success) {
        setTodos(result.data);
      } else {
        setError('Failed to fetch todos');
      }
    } catch (err) {
      setError('Cannot connect to server. Please make sure backend is running!');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch statistics
  const fetchStats = useCallback(async () => {
    try {
      const result = await todoAPI.getStats();
      if (result.success) {
        setStats(result.data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, []);

  // Health check on initial load
  const initializeApp = useCallback(async () => {
    try {
      await healthCheck();
      await fetchTodos();
      await fetchStats();
    } catch (err) {
      setError('Backend server is not responding. Please start the backend server first.');
      setLoading(false);
    }
  }, [fetchTodos, fetchStats]);

  // Handle create todo
  const handleCreateTodo = async (todoData) => {
    try {
      const result = await todoAPI.createTodo(todoData);
      if (result.success) {
        await fetchTodos();
        await fetchStats();
      }
    } catch (err) {
      setError('Error creating todo');
      console.error('Error creating todo:', err);
    }
  };

  // Handle update todo
  const handleUpdateTodo = async (id, todoData) => {
    try {
      const result = await todoAPI.updateTodo(id, todoData);
      if (result.success) {
        await fetchTodos();
        await fetchStats();
        setEditTodo(null);
      }
    } catch (err) {
      setError('Error updating todo');
      console.error('Error updating todo:', err);
    }
  };

  // Handle toggle todo completion
  const handleToggleTodo = async (id) => {
    try {
      const result = await todoAPI.toggleTodo(id);
      if (result.success) {
        await fetchTodos();
        await fetchStats();
      }
    } catch (err) {
      setError('Error updating todo');
      console.error('Error toggling todo:', err);
    }
  };

  // Handle delete todo
  const handleDeleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) {
      return;
    }

    try {
      const result = await todoAPI.deleteTodo(id);
      if (result.success) {
        await fetchTodos();
        await fetchStats();
      }
    } catch (err) {
      setError('Error deleting todo');
      console.error('Error deleting todo:', err);
    }
  };

  // Handle edit todo
  const handleEditTodo = (todo) => {
    setEditTodo(todo);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditTodo(null);
  };

  // Clear error
  const clearError = () => {
    setError('');
  };

  return {
    // State
    todos,
    stats,
    loading,
    error,
    editTodo,
    
    // Actions
    fetchTodos,
    fetchStats,
    initializeApp,
    handleCreateTodo,
    handleUpdateTodo,
    handleToggleTodo,
    handleDeleteTodo,
    handleEditTodo,
    handleCancelEdit,
    clearError,
    
    // Setters
    setError,
  };
};