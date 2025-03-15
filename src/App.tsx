import React, { useState } from 'react';
import { Monitor } from 'lucide-react';
import PreferencesForm from './components/PreferencesForm';
import RecommendationCard from './components/RecommendationCard';
import QuickFilters from './components/QuickFilters';
import ProductDetails from './components/ProductDetails';
import { UserPreferences, PCBuild } from './types';

const SAMPLE_BUILDS: PCBuild[] = [
  {
    id: '1',
    name: 'Ultimate Gaming Beast',
    type: 'prebuilt',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1661961111184-11317b40adb2?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'High-end gaming PC perfect for 4K gaming and streaming with top-of-the-line components and premium cooling system for intense gaming sessions.',
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
    images: [
      'https://images.unsplash.com/photo-1587202372616-b43abea06c2f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603987248955-9c142c5ae89b?auto=format&fit=crop&w=800&q=80'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1587202372162-638fa1791a43?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621364090295-090252d88f47?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1623934199716-aab560a4d8a1?auto=format&fit=crop&w=800&q=80'
    ],
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

function App() {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedBuild, setSelectedBuild] = useState<PCBuild | null>(null);
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
    if (preferences.buildType && build.type !== preferences.buildType) return false;
    if (build.price > preferences.budget) return false;
    
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Monitor className="w-8 h-8 text-blue-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">Gaming PC Builder</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!showRecommendations ? (
          <PreferencesForm
            preferences={preferences}
            setPreferences={setPreferences}
            onComplete={() => setShowRecommendations(true)}
          />
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Recommended Builds</h2>
              <button
                onClick={() => setShowRecommendations(false)}
                className="btn-secondary"
              >
                Modify Preferences
              </button>
            </div>
            <QuickFilters
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredBuilds.map(build => (
                <RecommendationCard 
                  key={build.id} 
                  build={build}
                  onClick={() => setSelectedBuild(build)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {selectedBuild && (
        <ProductDetails
          build={selectedBuild}
          onClose={() => setSelectedBuild(null)}
        />
      )}
    </div>
  );
}

export default App;