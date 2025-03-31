import { useMemo, useState } from 'react';

export const useBucketItemFilters = (initialItems) => {
  const [items, setItems] = useState(initialItems);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [visitedFilter, setVisitedFilter] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    ascending: true
  });

  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];
    
    // Apply filters
    if (categoryFilter) {
      result = result.filter(item => item.category === categoryFilter);
    }
    
    if (visitedFilter !== null) {
      result = result.filter(item => item.visited === visitedFilter);
    }
  
    // Apply sorting
    return result.sort((a, b) => {
      const valueA = String(a[sortConfig.key]).toLowerCase();
      const valueB = String(b[sortConfig.key]).toLowerCase();
      
      if (valueA === valueB) return 0;
      if (sortConfig.ascending) {
        return valueA < valueB ? -1 : 1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }, [items, categoryFilter, visitedFilter, sortConfig]);
  
  const requestSort = (key) => {
    setSortConfig(prev => ({
      key,
      ascending: prev.key === key ? !prev.ascending : true
    }));
  };

  return {
    items: filteredAndSortedItems,
    categoryFilter,
    setCategoryFilter,
    visitedFilter,
    setVisitedFilter,
    sortConfig,
    requestSort,
    setItems
  };
};