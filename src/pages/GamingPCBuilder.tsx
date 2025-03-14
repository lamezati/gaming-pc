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
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593152167544-085d3b9c4938?auto=format&fit=crop&w=800&q=80'
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
      'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Optimized for streaming with powerful multi-tasking capabilities, featuring dedicated encoding hardware and enhanced connectivity for professional content creators.',
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
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602934585418-f588bea4215e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Affordable gaming PC that delivers great 1080p performance without breaking the bank. Perfect entry-level system for casual gamers and esports enthusiasts.',
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
  {
    id: '4',
    name: 'Compact Gaming Mini',
    type: 'custom',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1601342630314-8427c38bf5e6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1601342630314-8427c38bf5e6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607430761808-84a7d55e945d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1661962772963-1fa29be76137?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Powerful gaming performance in a compact Mini-ITX form factor. Ideal for small spaces or as a portable gaming solution without sacrificing performance.',
    specs: {
      cpu: 'AMD Ryzen 7 7700X',
      gpu: 'NVIDIA RTX 4060 Ti',
      ram: '32GB DDR5',
      storage: '2TB NVMe SSD',
    },
    rating: 4.7,
    storeLinks: [
      { name: 'Newegg', url: '#' },
      { name: 'Micro Center', url: '#' },
    ],
  },
  {
    id: '5',
    name: 'RGB Performance Elite',
    type: 'prebuilt',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1624705013726-8cb4f9219591?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Showcase your gaming setup with this stunning RGB-illuminated system that delivers both performance and style with synchronized lighting effects throughout.',
    specs: {
      cpu: 'Intel Core i7-13700K',
      gpu: 'NVIDIA RTX 4070',
      ram: '32GB DDR5',
      storage: '2TB NVMe SSD',
    },
    rating: 4.5,
    storeLinks: [
      { name: 'Amazon', url: '#' },
      { name: 'Best Buy', url: '#' },
    ],
  },
  {
    id: '6',
    name: 'AMD Champion',
    type: 'custom',
    price: 1749,
    image: 'https://images.unsplash.com/photo-1597872200918-9a0a87b5eb4d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1597872200918-9a0a87b5eb4d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626218174358-7769486c4b79?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1624705013725-b342df4fd5be?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'All-AMD build featuring the latest Ryzen processors and Radeon graphics for exceptional gaming performance and productivity with seamless component integration.',
    specs: {
      cpu: 'AMD Ryzen 9 7900X',
      gpu: 'AMD Radeon RX 7900 XT',
      ram: '32GB DDR5',
      storage: '2TB NVMe SSD',
    },
    rating: 4.7,
    storeLinks: [
      { name: 'Newegg', url: '#' },
      { name: 'Micro Center', url: '#' },
    ],
  },
  {
    id: '7',
    name: 'Content Creator Pro',
    type: 'custom',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1594900889583-455efec3540c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594900889583-455efec3540c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Specially designed for video editors, 3D artists, and other content creators with extra RAM, storage, and computing power for demanding creative applications.',
    specs: {
      cpu: 'Intel Core i9-13900KS',
      gpu: 'NVIDIA RTX 4080',
      ram: '128GB DDR5',
      storage: '8TB NVMe SSD',
    },
    rating: 4.9,
    storeLinks: [
      { name: 'B&H', url: '#' },
      { name: 'Amazon', url: '#' },
    ],
  },
  {
    id: '8',
    name: 'Student Gaming Starter',
    type: 'prebuilt',
    price: 699,
    image: 'https://images.unsplash.com/photo-1608501078713-8e445a709b39?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1608501078713-8e445a709b39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603987248955-9c142c5ae89b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593151930167-c71f19153fff?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Budget-friendly system perfect for students who need a computer for both schoolwork and casual gaming, with upgrade potential for the future.',
    specs: {
      cpu: 'AMD Ryzen 5 5600X',
      gpu: 'NVIDIA GTX 1660 Super',
      ram: '16GB DDR4',
      storage: '512GB NVMe SSD',
    },
    rating: 4.3,
    storeLinks: [
      { name: 'Amazon', url: '#' },
      { name: 'Best Buy', url: '#' },
    ],
  },
  {
    id: '9',
    name: 'Silent Gaming Rig',
    type: 'custom',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1612886649261-af5ebd618b23?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1612886649261-af5ebd618b23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1632660988504-b233a0aeb6b9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1647100769837-2ce62d9ecbcc?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered for nearly silent operation with specialized cooling solutions and sound-dampening technology while maintaining excellent gaming performance.',
    specs: {
      cpu: 'Intel Core i7-13700K',
      gpu: 'NVIDIA RTX 4070',
      ram: '32GB DDR5',
      storage: '2TB NVMe SSD',
    },
    rating: 4.6,
    storeLinks: [
      { name: 'Newegg', url: '#' },
      { name: 'B&H', url: '#' },
    ],
  },
  {
    id: '10',
    name: 'eSports Champion',
    type: 'prebuilt',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1610041321327-b794c052db7a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610041321327-b794c052db7a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626218174359-9fe9e5a6d2d6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Optimized for competitive gaming with high refresh rates and response times, featuring a balanced configuration ideal for popular esports titles.',
    specs: {
      cpu: 'Intel Core i5-13600K',
      gpu: 'NVIDIA RTX 4060',
      ram: '16GB DDR5',
      storage: '1TB NVMe SSD',
    },
    rating: 4.5,
    storeLinks: [
      { name: 'Amazon', url: '#' },
      { name: 'Best Buy', url: '#' },
    ],
  },
  {
    id: '11',
    name: 'Workstation Hybrid',
    type: 'custom',
    price: 2399,
    image: 'https://images.unsplash.com/photo-1622957040873-8ea05bd58f88?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1622957040873-8ea05bd58f88?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1625842268623-5d80c5c16c3f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1614408637553-bf531f8d3d91?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Dual-purpose system that excels at both professional workstation tasks and high-end gaming, perfect for engineers, designers, and developers who also game.',
    specs: {
      cpu: 'AMD Threadripper 5965WX',
      gpu: 'NVIDIA RTX 4090',
      ram: '64GB DDR5',
      storage: '4TB NVMe SSD',
    },
    rating: 4.8,
    storeLinks: [
      { name: 'B&H', url: '#' },
      { name: 'Micro Center', url: '#' },
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
              {/* Button always visible, but styled differently for desktop/mobile */}
              <button
                onClick={() => setShowRecommendations(false)}
                className="flex items-center text-sm font-medium p-2 hover:bg-blue-50 rounded-lg text-blue-600"
              >
                <Settings className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Modify Preferences</span>
                <span className="inline sm:hidden">Preferences</span>
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
          
          {/* Product list - Single column for mobile */}
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
                {/* Results count */}
                <div className="text-xs text-gray-500 mb-2">
                  Showing {filteredBuilds.length} of {SAMPLE_BUILDS.length} builds
                </div>
                
                {/* Single column layout for mobile, grid for larger screens */}
                <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-3">
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