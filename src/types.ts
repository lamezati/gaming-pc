export interface PCBuild {
  id: string;
  name: string;
  type: 'prebuilt' | 'custom';
  price: number;
  image: string;
  images?: string[]; // Array of additional images
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