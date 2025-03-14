import React from 'react';
import { PCBuild } from '../types';
import { Star, Cpu, Monitor } from 'lucide-react';

interface RecommendationCardProps {
  build: PCBuild;
  onClick: () => void;
}

export default function RecommendationCard({ build, onClick }: RecommendationCardProps) {
  // Determine the component icon based on the build type
  const BuildIcon = build.type === 'prebuilt' ? Monitor : Cpu;

  return (
    <div
      className="mobile-product-card" 
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={build.image}
          alt={build.name}
          className="mobile-card-image"
        />
        {/* Badge showing build type */}
        <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full flex items-center">
          <BuildIcon className="w-3 h-3 mr-1" />
          {build.type === 'prebuilt' ? 'Pre-built' : 'Custom'}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-900 line-clamp-2">{build.name}</h3>
          <div className="mobile-rating">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1">{build.rating}</span>
          </div>
        </div>

        {/* Key specs preview - mobile only */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2 text-xs text-gray-500">
          <div className="flex items-center">
            <span className="text-gray-400">CPU:</span>
            <span className="ml-1">{build.specs.cpu.split(' ').slice(-1)[0]}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400">GPU:</span>
            <span className="ml-1">{build.specs.gpu.split(' ').slice(-1)[0]}</span>
          </div>
        </div>

        <p className="mobile-price">
          ${build.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}