import React, { useEffect } from 'react';
import { useTodos } from './hooks/useTodos';
import { useFilters } from './hooks/useFilters';
import Header from './components/common/Header';
import ErrorMessage from './components/common/ErrorMessage';
import AppLayout from './components/layout/AppLayout';
import './App.css';

function App() {
  // Custom hooks for state management
  const {
    // State
    todos,
    stats,
    loading,
    error,
    editTodo,
    
    // Actions
    initializeApp,
    handleCreateTodo,
    handleUpdateTodo,
    handleToggleTodo,
    handleDeleteTodo,
    handleEditTodo,
    handleCancelEdit,
    clearError,
    fetchTodos,
  } = useTodos();

  const {
    filters,
    handleFilterChange,
    clearFilters,
  } = useFilters();

  // Initialize app on mount
  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  // Refetch when filters change
  useEffect(() => {
    fetchTodos(filters);
  }, [filters, fetchTodos]);

  // Handle form submit (create or update)
  const handleSubmit = (formData) => {
    if (editTodo) {
      handleUpdateTodo(editTodo._id, formData);
    } else {
      handleCreateTodo(formData);
    }
  };

  return (
    <div className="App">
      <div className="container">
        {/* Header */}
        <Header />

        {/* Error Message */}
        <ErrorMessage 
          error={error} 
          onClose={clearError} 
        />

        {/* Main App Layout */}
        <AppLayout
          // Todo related props
          todos={todos}
          loading={loading}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditTodo}
          
          // Form related props
          onSubmit={handleSubmit}
          editTodo={editTodo}
          onCancelEdit={handleCancelEdit}
          
          // Stats
          stats={stats}
          
          // Filter related props
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
      </div>
    </div>
  );
}

export default App;