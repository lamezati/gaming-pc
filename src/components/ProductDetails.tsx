import React from 'react';
import { PCBuild } from '../types';
import { Star, X, ExternalLink, Cpu, Cpu as Gpu, MemoryStick as Memory, HardDrive } from 'lucide-react';

interface ProductDetailsProps {
  build: PCBuild;
  onClose: () => void;
}

export default function ProductDetails({ build, onClose }: ProductDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{build.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={build.image}
                alt={build.name}
                className="w-full aspect-square object-cover rounded-lg shadow-lg"
              />
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-medium">{build.rating}</span>
                </div>
                <span className="text-3xl font-bold">${build.price.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{build.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="grid gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Cpu className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Processor</p>
                      <p className="font-medium">{build.specs.cpu}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Gpu className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Graphics Card</p>
                      <p className="font-medium">{build.specs.gpu}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Memory className="w-5 h-5 text-purple-600" />
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
              
              <div>
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
          </div>
        </div>
      </div>
    </div>
  );
}