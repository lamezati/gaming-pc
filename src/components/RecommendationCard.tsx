import React from 'react';
import { PCBuild } from '../types';
import { Star, Computer, Settings } from 'lucide-react';

interface RecommendationCardProps {
  build: PCBuild;
  onClick: () => void;
}

export default function RecommendationCard({ build, onClick }: RecommendationCardProps) {
  // Determine the component icon based on the build type
  const BuildIcon = build.type === 'prebuilt' ? Computer : Settings;

  return (
    <div
      className="mobile-product-card" 
      onClick={onClick}
    >
      {/* Mobile optimized layout */}
      <div className="flex flex-col sm:flex-row h-full">
        {/* Image section - smaller on mobile */}
        <div className="relative w-full sm:w-1/3 h-32 sm:h-full">
          <img
            src={build.image}
            alt={build.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Badge showing build type */}
          <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <BuildIcon className="w-3 h-3 mr-1" />
            <span className="text-xs">{build.type === 'prebuilt' ? 'Pre-built' : 'Custom'}</span>
          </div>
        </div>

        {/* Content section */}
        <div className="p-3 flex-1 flex flex-col justify-between">
          <div>
            {/* Title and rating */}
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-sm line-clamp-1 mr-2">{build.name}</h3>
              <div className="mobile-rating">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="ml-1 text-xs">{build.rating}</span>
              </div>
            </div>

            {/* Key specs - concise for mobile */}
            <div className="flex flex-wrap gap-x-2 text-xs text-gray-500 mb-1.5">
              <span>CPU: {build.specs.cpu.split(' ').slice(-1)[0]}</span>
              <span>•</span>
              <span>GPU: {build.specs.gpu.split(' ').slice(-1)[0]}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex justify-between items-center">
            <p className="font-bold text-base">
              ${build.price.toLocaleString()}
            </p>
            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
              {build.specs.ram}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}