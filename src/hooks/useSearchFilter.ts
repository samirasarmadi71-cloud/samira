import { useState, useMemo } from 'react';

interface UseSearchFilterOptions<T> {
  data: T[];
  searchFields?: (keyof T)[];
  filterFields?: { key: keyof T; value: string }[];
}

export function useSearchFilter<T>({ data, searchFields = [], filterFields = [] }: UseSearchFilterOptions<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchQuery && searchFields.length > 0) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        searchFields.some(field => {
          const value = item[field];
          return value && String(value).toLowerCase().includes(query);
        })
      );
    }

    // Apply filters
    filterFields.forEach(({ key, value }) => {
      if (value && value !== '') {
        result = result.filter(item => {
          const itemValue = item[key];
          return String(itemValue) === value;
        });
      }
    });

    // Apply active filters from state
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        result = result.filter(item => {
          const itemValue = (item as any)[key];
          return String(itemValue) === value;
        });
      }
    });

    return result;
  }, [data, searchQuery, filters, searchFields, filterFields]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    handleFilterChange,
    clearFilters,
    filteredData,
    totalCount: data.length,
    resultCount: filteredData.length
  };
}
