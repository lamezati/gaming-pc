import React, { useState } from 'react';
import { Sliders, Settings, Search } from 'lucide-react';
import PreferencesForm from '../components/PreferencesForm';
import RecommendationCard from '../components/RecommendationCard';
import QuickFilters from '../components/QuickFilters';
import ProductDetails from '../components/ProductDetails';
import { UserPreferences, PCBuild } from '../types';

const SAMPLE_BUILDS: PCBuild[] = [
  {
    id: '1',
    name: 'Ultimate Gaming Beast',
    type: 'prebuilt',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    description: 'High-end gaming PC perfect for 4K gaming and streaming',
    specs: {
      cpu: 'Intel Core i9-13900K',
      gpu: 'NVIDIA RTX 4080',
      ram: '32GB DDR5',
      storage: '2TB NVMe SSD',
    },
    rating: 4.9,
    storeLinks: [
      { name: 'Amazon', url: '#' },
      { name: 'Newegg', url: '#' },
    ],
  },
  {
    id: '2',
    name: 'Streamer Pro',
    type: 'custom',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1587202372616-b43abea06c2f?auto=format&fit=crop&w=800&q=80',
    description: 'Optimized for streaming with powerful multi-tasking capabilities',
    specs: {
      cpu: 'AMD Ryzen 9 7950X',
      gpu: 'NVIDIA RTX 4070 Ti',
      ram: '64GB DDR5',
      storage: '4TB NVMe SSD',
    },
    rating: 4.8,
    storeLinks: [
      { name: 'Micro Center', url: '#' },
      { name: 'B&H', url: '#' },
    ],
  },
  {
    id: '3',
    name: 'Budget Gaming King',
    type: 'prebuilt',
    price: 899,
    image: 'https://images.unsplash.com/photo-1587202372162-638fa1791a43?auto=format&fit=crop&w=800&q=80',
    description: 'Affordable gaming PC that delivers great 1080p performance',
    specs: {
      cpu: 'Intel Core i5-12400F',
      gpu: 'NVIDIA RTX 3060',
      ram: '16GB DDR4',
      storage: '1TB NVMe SSD',
    },
    rating: 4.6,
    storeLinks: [
      { name: 'Best Buy', url: '#' },
      { name: 'Amazon', url: '#' },
    ],
  },
];

export default function GamingPCBuilder() {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedBuild, setSelectedBuild] = useState<PCBuild | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [preferences, setPreferences] = useState<UserPreferences>({
    buildType: '',
    budget: 1500,
    primaryUse: '',
    preferredGames: [],
  });

  const handleFilterChange = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredBuilds = SAMPLE_BUILDS.filter(build => {
    // Search filter
    if (searchTerm && !build.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !build.specs.cpu.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !build.specs.gpu.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Preference filters
    if (preferences.buildType && build.type !== preferences.buildType) return false;
    if (build.price > preferences.budget) return false;
    
    // Quick filters
    if (selectedFilters.length === 0) return true;
    
    return selectedFilters.every(filter => {
      switch (filter) {
        case 'under-1000':
          return build.price < 1000;
        case 'nvidia':
          return build.specs.gpu.toLowerCase().includes('nvidia');
        case 'amd-cpu':
          return build.specs.cpu.toLowerCase().includes('amd');
        case 'intel-cpu':
          return build.specs.cpu.toLowerCase().includes('intel');
        case '16gb-ram':
          return build.specs.ram.toLowerCase().includes('16gb');
        case '32gb-ram':
          return build.specs.ram.toLowerCase().includes('32gb');
        case '1-2tb':
          return build.specs.storage.toLowerCase().includes('1tb') || 
                 build.specs.storage.toLowerCase().includes('2tb');
        case 'over-2tb':
          return parseInt(build.specs.storage) > 2;
        default:
          return true;
      }
    });
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {!showRecommendations ? (
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <PreferencesForm
            preferences={preferences}
            setPreferences={setPreferences}
            onComplete={() => setShowRecommendations(true)}
          />
        </div>
      ) : (
        <>
          {/* Header section */}
          <div className="px-4 pt-3 pb-2 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-3">
              <h2 className="mobile-heading">Recommended Builds</h2>
              {/* Only display button on medium and larger screens */}
              <button
                onClick={() => setShowRecommendations(false)}
                className="hidden md:flex items-center text-sm text-blue-600 font-medium p-2 hover:bg-blue-50 rounded-lg"
              >
                <Settings className="w-4 h-4 mr-1" />
                <span>Modify Preferences</span>
              </button>
            </div>
            
            {/* Search bar */}
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search builds, components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <QuickFilters
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          {/* Product grid - Optimized layout for mobile */}
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {filteredBuilds.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg shadow">
                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mb-3">
                  <Sliders className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-gray-900 font-medium">No matching builds</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                  Try adjusting your filters or preferences to see more options.
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setSelectedFilters([]);
                      setSearchTerm('');
                    }}
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Results count for mobile */}
                <div className="text-xs text-gray-500 mb-2">
                  Showing {filteredBuilds.length} of {SAMPLE_BUILDS.length} builds
                </div>
                
                {/* Compact grid for mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {filteredBuilds.map(build => (
                    <RecommendationCard 
                      key={build.id} 
                      build={build}
                      onClick={() => setSelectedBuild(build)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* Mobile floating button for preferences - ONLY button on mobile */}
          <div className="fixed bottom-4 left-0 right-0 flex justify-center z-40">
            <button 
              onClick={() => setShowRecommendations(false)}
              className="btn-primary flex items-center shadow-lg rounded-full px-5 py-3"
            >
              <Settings className="w-4 h-4 mr-2" />
              Modify Preferences
            </button>
          </div>
        </>
      )}

      {selectedBuild && (
        <ProductDetails
          build={selectedBuild}
          onClose={() => setSelectedBuild(null)}
        />
      )}
    </div>
  );
}