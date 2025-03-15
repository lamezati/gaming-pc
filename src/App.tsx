import React, { useState, useEffect } from 'react';
import { Monitor, Search, Settings, User } from 'lucide-react';
import PreferencesForm from './components/PreferencesForm';
import RecommendationCard from './components/RecommendationCard';
import QuickFilters from './components/QuickFilters';
import ProductDetails from './components/ProductDetails';
import UserProfile from './components/UserProfile';
import AuthGuard from './components/AuthGuard';
import { useAuth } from './contexts/AuthContext';
import { UserPreferences, PCBuild } from './types';
import { getUserPreferences, saveUserPreferences } from './firebase/userProfile';

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
  {
    id: '4',
    name: 'Compact Gaming Mini',
    type: 'custom',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1594406994422-8afcda9215a0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594406994422-8afcda9215a0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1655059522424-cb8a8bb21b55?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1661723016608-6e2f9f771a4a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Compact design with powerful components for 1440p gaming in a space-saving form factor',
    specs: {
      cpu: 'AMD Ryzen 7 7700X',
      gpu: 'NVIDIA RTX 4060 Ti',
      ram: '32GB DDR5',
      storage: '1TB NVMe SSD',
    },
    rating: 4.7,
    storeLinks: [
      { name: 'Amazon', url: '#' },
      { name: 'Newegg', url: '#' },
    ],
  },
  {
    id: '5',
    name: 'Professional Workstation',
    type: 'custom',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622957040873-8ea05bc41fd0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1624571408859-ef9a135eaf15?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Professional-grade workstation for content creation, 3D modeling, and development',
    specs: {
      cpu: 'AMD Threadripper 5990X',
      gpu: 'NVIDIA RTX 4090',
      ram: '128GB DDR5',
      storage: '4TB NVMe RAID',
    },
    rating: 4.9,
    storeLinks: [
      { name: 'Micro Center', url: '#' },
      { name: 'System76', url: '#' },
    ],
  },
  {
    id: '6',
    name: 'Student Gaming PC',
    type: 'prebuilt',
    price: 699,
    image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593152167544-085d3b9c4938?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608501078713-8e445a709b39?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Budget-friendly gaming PC perfect for students and casual gamers',
    specs: {
      cpu: 'Intel Core i3-12100F',
      gpu: 'NVIDIA GTX 1660 Super',
      ram: '16GB DDR4',
      storage: '500GB NVMe SSD',
    },
    rating: 4.3,
    storeLinks: [
      { name: 'Best Buy', url: '#' },
      { name: 'Walmart', url: '#' },
    ],
  },
  {
    id: '7',
    name: 'Creator Ultra',
    type: 'custom',
    price: 2799,
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Optimized for video editing, 3D rendering, and creative workflows',
    specs: {
      cpu: 'Intel Core i9-13900K',
      gpu: 'NVIDIA RTX 4080',
      ram: '64GB DDR5',
      storage: '4TB NVMe SSD',
    },
    rating: 4.8,
    storeLinks: [
      { name: 'Puget Systems', url: '#' },
      { name: 'B&H', url: '#' },
    ],
  },
  {
    id: '8',
    name: 'Console Killer',
    type: 'prebuilt',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1600348712270-5a9564ac7264?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600348712270-5a9564ac7264?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603481546238-487240415921?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Better than console performance at a competitive price point',
    specs: {
      cpu: 'AMD Ryzen 5 7600X',
      gpu: 'AMD RX 6700 XT',
      ram: '32GB DDR5',
      storage: '1TB NVMe SSD',
    },
    rating: 4.5,
    storeLinks: [
      { name: 'Amazon', url: '#' },
      { name: 'GameStop', url: '#' },
    ],
  },
  {
    id: '9',
    name: 'RGB Enthusiast',
    type: 'custom',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1624705013726-b3a5d302a2eb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1624705013726-b3a5d302a2eb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1633507104446-8e193385da5a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1624088159717-98d364d74002?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Maximize your RGB experience with this fully customizable light show',
    specs: {
      cpu: 'Intel Core i7-13700K',
      gpu: 'NVIDIA RTX 4070',
      ram: '32GB DDR5 RGB',
      storage: '2TB NVMe SSD',
    },
    rating: 4.7,
    storeLinks: [
      { name: 'Corsair', url: '#' },
      { name: 'Micro Center', url: '#' },
    ],
  },
  {
    id: '10',
    name: 'Silent Gaming PC',
    type: 'prebuilt',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1636211999558-14064e9bfffc?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1636211999558-14064e9bfffc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1625842486912-8fee217502e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1637971586641-ee7ae44d168e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Whisper-quiet operation with high-end noctua cooling and sound dampening',
    specs: {
      cpu: 'AMD Ryzen 7 7800X3D',
      gpu: 'NVIDIA RTX 4070',
      ram: '32GB DDR5',
      storage: '2TB NVMe SSD',
    },
    rating: 4.6,
    storeLinks: [
      { name: 'Be Quiet!', url: '#' },
      { name: 'Newegg', url: '#' },
    ],
  },
  {
    id: '11',
    name: 'Portable Gaming Rig',
    type: 'custom',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1528928441742-b4ccfdb75a70?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1528928441742-b4ccfdb75a70?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602837385569-08ac28552310?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563203369-26f2e4a5ccb7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Compact mini-ITX build designed for LAN parties and gaming on the go',
    specs: {
      cpu: 'Intel Core i5-13600K',
      gpu: 'NVIDIA RTX 4060 Ti',
      ram: '32GB DDR5',
      storage: '1TB NVMe SSD',
    },
    rating: 4.4,
    storeLinks: [
      { name: 'Amazon', url: '#' },
      { name: 'NZXT', url: '#' },
    ],
  },
];

function MainApp() {
  const [showRecommendations, setShowRecommendations] = useState(true); // Default to showing recommendations
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedBuild, setSelectedBuild] = useState<PCBuild | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>({
    buildType: '',
    budget: 1500,
    primaryUse: '',
    preferredGames: [],
  });

  // Load user preferences on login
  useEffect(() => {
    const loadUserPreferences = async () => {
      if (currentUser) {
        setIsLoading(true);
        try {
          const userPrefs = await getUserPreferences(currentUser.uid);
          if (userPrefs) {
            setPreferences(userPrefs);
          }
        } catch (error) {
          console.error('Error loading user preferences:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadUserPreferences();
  }, [currentUser]);

  // Save preferences when they change
  const handleUpdatePreferences = async (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
    setShowRecommendations(true);
    
    // Save to Firestore if user is logged in
    if (currentUser) {
      try {
        await saveUserPreferences(currentUser.uid, newPreferences);
      } catch (error) {
        console.error('Error saving preferences:', error);
      }
    }
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredBuilds = SAMPLE_BUILDS.filter(build => {
    // Apply search filter
    if (searchQuery && !build.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !build.specs.cpu.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !build.specs.gpu.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply preference filters
    if (preferences.buildType && build.type !== preferences.buildType) return false;
    if (build.price > preferences.budget) return false;
    
    // Apply quick filters
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

  const handleUserProfileClick = () => {
    setShowUserProfile(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Monitor className="w-8 h-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Gaming PC Builder</h1>
            </div>
            <button
              onClick={handleUserProfileClick}
              className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100"
            >
              <User className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium">{currentUser?.email?.split('@')[0] || 'User'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : !showRecommendations ? (
          <PreferencesForm
            preferences={preferences}
            setPreferences={handleUpdatePreferences}
            onComplete={() => setShowRecommendations(true)}
          />
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Recommended Builds</h2>
              <button
                onClick={() => setShowRecommendations(false)}
                className="flex items-center gap-2 text-blue-600"
              >
                <Settings size={20} />
                <span>Preferences</span>
              </button>
            </div>

            {/* Search bar */}
            <div className="relative mb-2">
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-md border-gray-300 bg-white pl-10 py-2 focus:border-blue-500 focus:ring-blue-500 text-sm md:text-base"
                  placeholder="Search builds, components..."
                />
              </div>
            </div>

            <QuickFilters
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-4">Showing {filteredBuilds.length} of {SAMPLE_BUILDS.length} builds</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredBuilds.map(build => (
                  <RecommendationCard 
                    key={build.id} 
                    build={build}
                    onClick={() => setSelectedBuild(build)}
                  />
                ))}
              </div>
              
              {filteredBuilds.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No builds found matching your criteria. Try adjusting your filters or search query.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* User Profile */}
      {showUserProfile && (
        <UserProfile onClose={() => setShowUserProfile(false)} />
      )}

      {/* Product Details */}
      {selectedBuild && (
        <ProductDetails
          build={selectedBuild}
          onClose={() => setSelectedBuild(null)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthGuard>
      <MainApp />
    </AuthGuard>
  );
}

export default App;