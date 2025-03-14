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

  // Format CPU and GPU names to be shorter
  const cpuShort = build.specs.cpu.split(' ').slice(-1)[0];
  const gpuShort = build.specs.gpu.split(' ').slice(-1)[0];

  return (
    <div
      className="mobile-product-card" 
      onClick={onClick}
    >
      {/* New row-based horizontal layout */}
      <div className="flex items-stretch">
        {/* Image container - fixed size */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <img
            src={build.image}
            alt={build.name}
            className="w-full h-full object-cover"
          />
          {/* Build type badge */}
          <div className="absolute top-1 left-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded-sm flex items-center">
            <BuildIcon className="w-3 h-3 mr-1" />
            <span className="text-xs">{build.type === 'prebuilt' ? 'Pre-built' : 'Custom'}</span>
          </div>
        </div>

        {/* Content section */}
        <div className="flex-1 p-2">
          {/* Product name and rating */}
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-sm line-clamp-1 mr-2">{build.name}</h3>
            <div className="flex items-center">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="ml-0.5 text-xs text-yellow-500 font-medium">{build.rating}</span>
            </div>
          </div>

          {/* CPU and GPU info */}
          <div className="flex text-xs text-blue-600 mb-1">
            <div className="mr-3">CPU: {cpuShort}</div>
            <div>GPU: {gpuShort}</div>
          </div>

          {/* Price and RAM */}
          <div className="flex justify-between items-center mt-1">
            <div className="font-bold text-base">${build.price.toLocaleString()}</div>
            <div className="text-xs text-blue-600">{build.specs.ram}</div>
          </div>
        </div>
      </div>
    </div>
  );
}