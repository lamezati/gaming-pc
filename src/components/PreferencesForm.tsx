import React from 'react';
import { UserPreferences } from '../types';
import { ChevronRight, ChevronLeft, GamepadIcon, MonitorIcon, DollarSign } from 'lucide-react';

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
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {num}
              </div>
              {num < 3 && (
                <div className={`h-1 w-24 ${
                  step > num ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Build Preference</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                className={`p-6 rounded-lg border-2 ${
                  preferences.buildType === 'prebuilt'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => updatePreference('buildType', 'prebuilt')}
              >
                <h3 className="font-semibold mb-2">Pre-built PC</h3>
                <p className="text-sm text-gray-600">Ready to use, hassle-free setup</p>
              </button>
              <button
                className={`p-6 rounded-lg border-2 ${
                  preferences.buildType === 'custom'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => updatePreference('buildType', 'custom')}
              >
                <h3 className="font-semibold mb-2">Custom Build</h3>
                <p className="text-sm text-gray-600">Personalized parts selection</p>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Budget Range</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <DollarSign className="text-gray-400" />
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
              <div className="text-center font-semibold text-lg">
                ${preferences.budget.toLocaleString()}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Primary Use</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                className={`p-6 rounded-lg border-2 ${
                  preferences.primaryUse === 'gaming'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => updatePreference('primaryUse', 'gaming')}
              >
                <GamepadIcon className="w-6 h-6 mb-2" />
                <h3 className="font-semibold">Gaming</h3>
              </button>
              <button
                className={`p-6 rounded-lg border-2 ${
                  preferences.primaryUse === 'streaming'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => updatePreference('primaryUse', 'streaming')}
              >
                <MonitorIcon className="w-6 h-6 mb-2" />
                <h3 className="font-semibold">Streaming</h3>
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button onClick={prevStep} className="btn-secondary flex items-center">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          ) : (
            <div />
          )}
          <button onClick={nextStep} className="btn-primary flex items-center">
            {step === 3 ? 'Show Recommendations' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}