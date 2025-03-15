export interface PCBuild {
  id: string;
  name: string;
  type: 'prebuilt' | 'custom';
  price: number;
  image: string;
  images: string[];
  description: string;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
  };
  rating: number;
  storeLinks: {
    name: string;
    url: string;
  }[];
}

export interface UserPreferences {
  buildType: 'prebuilt' | 'custom' | '';
  budget: number;
  primaryUse: 'gaming' | 'streaming' | 'both' | '';
  preferredGames: string[];
}

export interface User {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName?: string | null;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  error: string | null;
}