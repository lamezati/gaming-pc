import React from 'react';
import { Filter } from 'lucide-react';

interface QuickFiltersProps {
  selectedFilters: string[];
  onFilterChange: (filter: string) => void;
}

const FILTERS = [
  { label: 'Under $1,000', value: 'under-1000' },
  { label: 'NVIDIA GPU', value: 'nvidia' },
  { label: 'AMD CPU', value: 'amd-cpu' },
  { label: 'Intel CPU', value: 'intel-cpu' },
  { label: '16 GB RAM', value: '16gb-ram' },
  { label: '32 GB RAM', value: '32gb-ram' },
  { label: '1 - 2TB Storage', value: '1-2tb' },
  { label: 'Over 2TB Storage', value: 'over-2tb' },
];

export default function QuickFilters({ selectedFilters, onFilterChange }: QuickFiltersProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-4">
        <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <Filter className="w-4 h-4" />
          <span>All Filters</span>
        </button>
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`whitespace-nowrap px-3 py-2 rounded-full transition-colors ${
              selectedFilters.includes(filter.value)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}