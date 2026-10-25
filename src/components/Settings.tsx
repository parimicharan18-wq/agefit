import React, { useState } from 'react';
import { Save, Check } from 'lucide-react';
import type { UserProfile, FitnessLevel } from '../types';

interface SettingsProps {
  user: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
  largeText: boolean;
  onToggleLargeText: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  user,
  onSaveProfile,
  largeText,
  onToggleLargeText,
  highContrast,
  onToggleHighContrast
}) => {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel>(user.fitnessLevel);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...user,
      name,
      age: Number(age) || 25,
      fitnessLevel
    };
    onSaveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Your Profile and Settings</h1>
        <p className="text-sm text-slate-500">Update your name, age, and text size settings.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-white"
            placeholder="Type your name"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Age (We use this to choose safe exercises for you)
          </label>
          <input
            type="number"
            min="5"
            max="115"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Workout Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'beginner', label: 'Easy (Beginner)' },
              { id: 'intermediate', label: 'Medium' },
              { id: 'advanced', label: 'Hard' }
            ].map(lvl => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setFitnessLevel(lvl.id as any)}
                className={`py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  fitnessLevel === lvl.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accessibility Toggles */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Easy Reading Options</h3>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Larger Text</div>
              <div className="text-[11px] text-slate-400">Makes letters and headings bigger and easier to read</div>
            </div>
            <input
              type="checkbox"
              checked={largeText}
              onChange={onToggleLargeText}
              className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">High Contrast Mode</div>
              <div className="text-[11px] text-slate-400">Darkens text and button outlines for clearer vision</div>
            </div>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={onToggleHighContrast}
              className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
        >
          {savedSuccess ? <><Check size={16} /> Changes Saved!</> : <><Save size={16} /> Save Changes</>}
        </button>
      </form>
    </div>
  );
};
