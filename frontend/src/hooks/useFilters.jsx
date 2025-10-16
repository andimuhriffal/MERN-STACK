import { useState, useCallback } from 'react';

export const useFilters = () => {
  const [filters, setFilters] = useState({
    completed: '',
    priority: '',
    category: '',
    search: ''
  });

  // Handle filter changes
  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      completed: '',
      priority: '',
      category: '',
      search: ''
    });
  }, []);

  // Check if any filter is active
  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return {
    filters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
  };
};