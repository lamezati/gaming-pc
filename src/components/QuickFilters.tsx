import React, { useRef, useState, useEffect } from 'react';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';

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
  { label: '1-2TB Storage', value: '1-2tb' },
  { label: 'Over 2TB Storage', value: 'over-2tb' },
];

export default function QuickFilters({ selectedFilters, onFilterChange }: QuickFiltersProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  // Check if scrolling is needed and update button visibility
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  };

  // Handle scroll buttons
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 150;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Update scroll buttons visibility on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  // Recheck on window resize
  useEffect(() => {
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <div className="relative mb-3">
      {/* Filter scroll controls - mobile only */}
      <div className="flex justify-between absolute -top-8 right-0 space-x-1 md:hidden">
        <button
          onClick={() => handleScroll('left')}
          className={`p-1 rounded-full ${showLeftScroll ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-400'}`}
          disabled={!showLeftScroll}
          aria-label="Scroll filters left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleScroll('right')}
          className={`p-1 rounded-full ${showRightScroll ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-400'}`}
          disabled={!showRightScroll}
          aria-label="Scroll filters right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable filter container */}
      <div 
        ref={scrollContainerRef}
        className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <button className="flex items-center whitespace-nowrap px-2.5 py-1.5 rounded-full text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-800">
          <Filter className="w-3 h-3 mr-1" />
          <span>All</span>
        </button>
        
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
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