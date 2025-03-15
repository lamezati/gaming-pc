import React, { useState, useEffect } from 'react';
import { Monitor, Search, Settings, User } from 'lucide-react';
import PreferencesForm from './components/PreferencesForm';
import RecommendationCard from './components/RecommendationCard';
import QuickFilters from './components/QuickFilters';
import ProductDetails from './components/ProductDetails';
import UserProfile from './components/UserProfile';
import AuthGuard from './components/AuthGuard';
import EmailVerificationAlert from './components/EmailVerificationAlert';
import { useAuth } from './contexts/AuthContext';
import { UserPreferences, PCBuild } from './types';
import { getUserPreferences, saveUserPreferences } from './firebase/userProfile';

// SAMPLE_BUILDS const remains unchanged, so I'm omitting it for brevity

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
        {/* Email Verification Alert */}
        <EmailVerificationAlert />
        
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