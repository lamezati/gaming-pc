import React from 'react';
import { PCBuild } from '../types';
import { Star } from 'lucide-react';

interface RecommendationCardProps {
  build: PCBuild;
  onClick: () => void;
}

export default function RecommendationCard({ build, onClick }: RecommendationCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <img
        src={build.image}
        alt={build.name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900">{build.name}</h3>
            <p className="text-lg font-bold text-gray-900 mt-1">
              ${build.price.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{build.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}