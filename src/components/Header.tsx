import React from 'react';
import { Bot, Sun, Moon } from 'lucide-react';
import { Logo } from './Logo';
import type { AppScreen, UserProfile } from '../types';

interface HeaderProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  user: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  darkMode,
  onToggleDarkMode,
  user,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Clickable Brand Logo - Returns to Home */}
        <button
          onClick={() => onNavigate('dashboard')}
          aria-label="AgeFit Home"
          className="cursor-pointer group flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
        >
          <Logo size="md" className="group-hover:opacity-90 transition-opacity" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              currentScreen === 'dashboard'
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('exercises')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              currentScreen === 'exercises' || currentScreen === 'workout_overview' || currentScreen === 'workout_player'
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Workouts
          </button>
          <button
            onClick={() => onNavigate('nutrition')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              currentScreen === 'nutrition'
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Food & Water
          </button>
          <button
            onClick={() => onNavigate('progress')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              currentScreen === 'progress'
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Progress
          </button>
          <button
            onClick={() => onNavigate('settings')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              currentScreen === 'settings'
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => onNavigate('chatgpt')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentScreen === 'chatgpt'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20'
            }`}
          >
            <Bot size={14} /> ChatGPT AI
          </button>
        </nav>

        {/* Action items */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Persona Profile Pill */}
          <button
            onClick={() => onNavigate('settings')}
            className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 text-xs font-bold text-slate-700 dark:text-slate-200 hover:shadow-xs transition-all cursor-pointer"
            title="View User Profile"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
              {user.name.charAt(0)}
            </div>
            <span className="hidden sm:inline">{user.name}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
