import React from 'react';
import { BADGES } from '../data/profiles';
import type { UserProfile, WorkoutHistoryEntry } from '../types';

interface ProgressProps {
  user: UserProfile;
  history: WorkoutHistoryEntry[];
}

export const Progress: React.FC<ProgressProps> = ({ user, history }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Your Progress</h1>
        <p className="text-sm text-slate-500">Every workout you do helps you stay active, healthy, and happy.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-sm text-center">
          <div className="text-2xl mb-1">🔥</div>
          <div className="text-2xl font-black text-rose-500">{user.currentStreak} Days</div>
          <div className="text-[11px] font-bold text-slate-400 uppercase mt-1">Current Streak</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-sm text-center">
          <div className="text-2xl mb-1">🏆</div>
          <div className="text-2xl font-black text-amber-500">{user.bestStreak} Days</div>
          <div className="text-[11px] font-bold text-slate-400 uppercase mt-1">Best Streak</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-sm text-center">
          <div className="text-2xl mb-1">⏱️</div>
          <div className="text-2xl font-black text-emerald-600">{user.totalWorkoutMinutes} Mins</div>
          <div className="text-[11px] font-bold text-slate-400 uppercase mt-1">Total Exercise Time</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-sm text-center">
          <div className="text-2xl mb-1">🎯</div>
          <div className="text-2xl font-black text-blue-500">{user.totalWorkoutsCompleted}</div>
          <div className="text-[11px] font-bold text-slate-400 uppercase mt-1">Workouts Finished</div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4">Milestone Badges</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {BADGES.map((badge, idx) => {
            const isUnlocked = idx < 3;
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 ${
                  isUnlocked
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/40 text-slate-800 dark:text-white'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-40'
                }`}
              >
                <span className="text-3xl">{badge.icon}</span>
                <span className="text-xs font-bold leading-tight">{badge.title}</span>
                <span className="text-[10px] text-slate-500 leading-tight">{badge.description}</span>
                {isUnlocked && (
                  <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full mt-1">
                    Unlocked
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Workout History Log */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4">Recent Workouts</h3>
        {history.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            You haven't completed any workouts yet. Finish your first workout today to see it here!
          </div>
        ) : (
          <div className="space-y-2">
            {history.map(item => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex justify-between items-center text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-white">{item.workoutName}</div>
                    <div className="text-slate-400">{new Date(item.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-600">{item.durationMinutes} mins</span>
                  <div className="text-slate-400">{item.caloriesBurned} calories</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
