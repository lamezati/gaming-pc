import React from 'react';
import { UserPreferences } from '../types';
import { ChevronRight, ChevronLeft, GamepadIcon, MonitorIcon, DollarSign, Computer, Settings } from 'lucide-react';

interface PreferencesFormProps {
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  onComplete: () => void;
}

export default function PreferencesForm({ preferences, setPreferences, onComplete }: PreferencesFormProps) {
  const [step, setStep] = React.useState(1);

  const updatePreference = (key: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else onComplete();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress indicator - simplified for mobile */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {num}
              </div>
              <div className="text-xs mt-1 text-gray-500 hidden sm:block">
                {num === 1 ? 'Type' : num === 2 ? 'Budget' : 'Use'}
              </div>
              {num < 3 && (
                <div className={`h-1 w-16 sm:w-24 mt-4 sm:mt-0 absolute ${
                  step > num ? 'bg-blue-600' : 'bg-gray-200'
                }`} style={{left: `calc(${(num - 0.5) * 50}% - ${num === 1 ? 12 : 0}px)`}} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5 sm:p-6">
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold mb-5">Build Preference</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                className={`p-4 sm:p-6 rounded-lg border-2 flex items-center ${
                  preferences.buildType === 'prebuilt'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => updatePreference('buildType', 'prebuilt')}
              >
                <Computer className="w-6 h-6 mr-3 text-blue-500" />
                <div className="text-left">
                  <h3 className="font-semibold mb-1">Pre-built PC</h3>
                  <p className="text-xs text-gray-600">Ready to use, hassle-free setup</p>
                </div>
              </button>
              <button
                className={`p-4 sm:p-6 rounded-lg border-2 flex items-center ${
                  preferences.buildType === 'custom'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => updatePreference('buildType', 'custom')}
              >
                <Settings className="w-6 h-6 mr-3 text-green-500" />
                <div className="text-left">
                  <h3 className="font-semibold mb-1">Custom Build</h3>
                  <p className="text-xs text-gray-600">Personalized parts selection</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold mb-5">Budget Range</h2>
            <div className="space-y-4 px-2">
              <div className="flex items-center">
                <DollarSign className="text-gray-400 h-5 w-5" />
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={preferences.budget}
                  onChange={(e) => updatePreference('budget', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="text-center font-semibold text-xl">
                ${preferences.budget.toLocaleString()}
              </div>
              
              {/* Budget labels */}
              <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                <span>$500</span>
                <span>$2,500</span>
                <span>$5,000</span>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold mb-5">Primary Use</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                className={`p-4 sm:p-6 rounded-lg border-2 flex items-center ${
                  preferences.primaryUse === 'gaming'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => updatePreference('primaryUse', 'gaming')}
              >
                <GamepadIcon className="w-6 h-6 mr-3 text-blue-500" />
                <div className="text-left">
                  <h3 className="font-semibold">Gaming</h3>
                  <p className="text-xs text-gray-600">High performance for games</p>
                </div>
              </button>
              <button
                className={`p-4 sm:p-6 rounded-lg border-2 flex items-center ${
                  preferences.primaryUse === 'streaming'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => updatePreference('primaryUse', 'streaming')}
              >
                <MonitorIcon className="w-6 h-6 mr-3 text-green-500" />
                <div className="text-left">
                  <h3 className="font-semibold">Streaming</h3>
                  <p className="text-xs text-gray-600">Optimized for content creation</p>
                </div>
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button onClick={prevStep} className="btn-secondary flex items-center py-2 px-4">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </button>
          ) : (
            <div></div>
          )}
          <button 
            onClick={nextStep} 
            className="btn-primary flex items-center py-2 px-4"
          >
            {step === 3 ? 'Show Recommendations' : 'Next'}
            {step < 3 && <ChevronRight className="w-4 h-4 ml-1" />}
          </button>
        </div>
      </div>
    </div>
  );
}