import React from 'react';
import { PCBuild } from '../types';
import { Star, X, ExternalLink, Cpu, Monitor, Database, HardDrive, ChevronDown, ChevronLeft } from 'lucide-react';

interface ProductDetailsProps {
  build: PCBuild;
  onClose: () => void;
}

export default function ProductDetails({ build, onClose }: ProductDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col z-50">
      {/* Mobile header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-3 flex justify-between items-center border-b border-gray-200 shadow-sm">
        <button
          onClick={onClose}
          className="p-1 -ml-1 text-gray-500 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold truncate max-w-[70%]">{build.name}</h2>
        <button
          onClick={onClose}
          className="p-1 text-gray-500 hover:bg-gray-100 rounded-full md:hidden"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto bg-white">
        {/* Product hero image */}
        <div className="relative">
          <img
            src={build.image}
            alt={build.name}
            className="w-full h-56 md:h-64 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg font-medium text-white">{build.rating}</span>
              </div>
              <span className="text-2xl font-bold text-white">${build.price.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* Desktop price rating section - hidden on mobile */}
        <div className="hidden md:flex mt-6 mx-6 items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-lg font-medium">{build.rating}</span>
          </div>
          <span className="text-3xl font-bold">${build.price.toLocaleString()}</span>
        </div>
        
        {/* Description section */}
        <div className="px-4 py-4 md:px-6">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-600">{build.description}</p>
        </div>
        
        {/* Specifications section */}
        <div className="px-4 py-4 md:px-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Cpu className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Processor</p>
                <p className="font-medium">{build.specs.cpu}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Monitor className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Graphics Card</p>
                <p className="font-medium">{build.specs.gpu}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Database className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Memory</p>
                <p className="font-medium">{build.specs.ram}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <HardDrive className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">Storage</p>
                <p className="font-medium">{build.specs.storage}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Store links section */}
        <div className="px-4 py-4 md:px-6 border-t border-gray-100 mb-20 md:mb-6">
          <h3 className="text-lg font-semibold mb-4">Available at</h3>
          <div className="flex flex-wrap gap-3">
            {build.storeLinks.map((store, index) => (
              <a
                key={index}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {store.name}
                <ExternalLink className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile floating buy button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:hidden">
        <button className="w-full btn-primary">
          Check Availability
        </button>
      </div>
    </div>
  );
}