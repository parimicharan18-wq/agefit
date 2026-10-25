import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import type { UserProfile, FitnessLevel } from '../types';

interface OnboardingProps {
  onComplete: (user: Partial<UserProfile>) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState(28);
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel>('beginner');
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['general_fitness']);

  const goalsList = [
    { id: 'general_fitness', label: 'More Energy and Better Health' },
    { id: 'muscle_strength', label: 'Build Muscle and Core Strength' },
    { id: 'mobility', label: 'Move Joints Easily Without Pain' },
    { id: 'balance', label: 'Better Balance and Fall Safety' },
    { id: 'weight_management', label: 'Stay at a Healthy Weight' },
    { id: 'stress_reduction', label: 'Relax and Calm My Mind' },
  ];

  const toggleGoal = (id: string) => {
    if (selectedGoals.includes(id)) {
      if (selectedGoals.length > 1) {
        setSelectedGoals(selectedGoals.filter(g => g !== id));
      }
    } else {
      setSelectedGoals([...selectedGoals, id]);
    }
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onComplete({
      name,
      age: Number(age) || 28,
      fitnessLevel,
      goals: selectedGoals as any,
      availableTime: 15,
      limitations: ['none'],
      currentStreak: 1,
      bestStreak: 1,
      totalWorkoutMinutes: 0,
      totalWorkoutsCompleted: 0
    });
  };

  return (
    <div className="max-w-md mx-auto my-auto p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center text-2xl mx-auto">
          🌿
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Welcome to AgeFit</h1>
        <p className="text-xs text-slate-500">Simple daily exercises made for your age and body.</p>
      </div>

      <form onSubmit={handleFinish} className="space-y-4">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                What is your name?
              </label>
              <input
                type="text"
                placeholder="Type your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Your Age: {age} years
              </label>
              <input
                type="range"
                min="5"
                max="100"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>Kids (5–12)</span>
                <span>Teens (13–18)</span>
                <span>Adults (19–60)</span>
                <span>Seniors (60+)</span>
              </div>
            </div>

            <button
              type="button"
              disabled={!name.trim()}
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md disabled:opacity-40 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              Next Step <ArrowRight size={14} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                How easy or hard do you want your exercises?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'beginner', label: 'Easy' },
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

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                What is your main goal? (Choose any)
              </label>
              <div className="space-y-1.5">
                {goalsList.map(g => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => toggleGoal(g.id)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      selectedGoals.includes(g.id)
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{g.label}</span>
                    {selectedGoals.includes(g.id) && <Check size={14} className="text-emerald-600" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                Go Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Create My Workout ✨
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
