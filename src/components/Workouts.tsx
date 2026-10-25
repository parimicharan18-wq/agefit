import React, { useState } from 'react';
import { Search, Clock, ChevronRight } from 'lucide-react';
import { EXERCISE_DATABASE } from '../data/exercises';
import type { Exercise, FitnessLevel, AgeGroup } from '../types';

interface WorkoutsProps {
  currentAgeGroup: AgeGroup;
  onSelectExercise: (ex: Exercise) => void;
  onStartFullWorkout: () => void;
  initialCategory?: string;
  initialLevel?: FitnessLevel | 'all';
}

export const Workouts: React.FC<WorkoutsProps> = ({
  currentAgeGroup,
  onSelectExercise,
  onStartFullWorkout,
  initialCategory = 'all',
  initialLevel = 'all',
}) => {
  const [search, setSearch] = useState('');
  const [levelOverride, setLevelOverride] = useState<FitnessLevel | 'all' | null>(null);
  const [categoryOverride, setCategoryOverride] = useState<string | null>(null);

  const selectedLevel = levelOverride !== null ? levelOverride : initialLevel;
  const selectedCategory = categoryOverride !== null ? categoryOverride : initialCategory;

  const filteredExercises = EXERCISE_DATABASE.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.description.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || ex.difficulty === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || ex.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'All Exercises' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'strength', label: 'Strength' },
    { id: 'mobility', label: 'Mobility' },
    { id: 'balance', label: 'Balance' },
    { id: 'flexibility', label: 'Stretches' },
  ];

  const getDifficultyLabel = (diff: string) => {
    if (diff === 'beginner') return 'Easy';
    if (diff === 'intermediate') return 'Medium';
    return 'Hard';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Exercise Library</h1>
          <p className="text-sm text-slate-500">Real exercise photos and step-by-step instructions for every age.</p>
        </div>
        <button
          onClick={onStartFullWorkout}
          className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
        >
          ⚡ Start Today’s Complete Workout
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name (e.g. march, squat, pushup, stretch)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Level Filter Pills */}
          <div className="flex gap-1.5 shrink-0">
            {[
              { id: 'all', label: 'All Levels' },
              { id: 'beginner', label: 'Easy' },
              { id: 'intermediate', label: 'Medium' },
              { id: 'advanced', label: 'Hard' }
            ].map(lvl => (
              <button
                key={lvl.id}
                onClick={() => setLevelOverride(lvl.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedLevel === lvl.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryOverride(cat.id)}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Workouts / Exercises with Real Photos */}
      {filteredExercises.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-700">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No exercises found</h3>
          <p className="text-xs text-slate-500 mt-1">Try typing a different word or clearing your filters.</p>
          <button
            onClick={() => { setSearch(''); setLevelOverride('all'); setCategoryOverride('all'); }}
            className="mt-4 px-4 py-2 rounded-full bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExercises.map(ex => {
            const isAgeMatch = ex.targetAgeGroups.includes(currentAgeGroup);

            return (
              <div
                key={ex.id}
                onClick={() => onSelectExercise(ex)}
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                {/* Real Exercise Photo Header */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={ex.mediaUrl || 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'}
                    alt={ex.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs">
                      {ex.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-xs">
                      {getDifficultyLabel(ex.difficulty)}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-extrabold text-base drop-shadow-sm leading-tight">
                      {ex.name}
                    </h3>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {ex.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Clock size={13} className="text-emerald-600" />
                      <span>{ex.durationSeconds} seconds</span>
                    </div>

                    {isAgeMatch && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                        ✓ Made for You
                      </span>
                    )}

                    <span className="text-emerald-600 font-bold text-xs flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      View <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
