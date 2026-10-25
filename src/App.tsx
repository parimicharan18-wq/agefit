import React, { useState, useEffect } from 'react';
import { Home, Dumbbell, Apple, LineChart, User, Moon, Sun, Bot } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Workouts } from './components/Workouts';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { Progress } from './components/Progress';
import { Nutrition } from './components/Nutrition';
import { Settings } from './components/Settings';
import { Onboarding } from './components/Onboarding';
import { ChatGPTAssistant } from './components/ChatGPTAssistant';
import { RecommendationEngine } from './data/engine';
import { DEMO_PROFILES } from './data/profiles';
import { AutoHealerEngine } from './data/autoHealer';
import type { UserProfile, Workout, WorkoutHistoryEntry, AppScreen } from './types';

export default function App() {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('agefit_user');
    return saved ? JSON.parse(saved) : DEMO_PROFILES.charan;
  });

  const [history, setHistory] = useState<WorkoutHistoryEntry[]>(() => {
    const saved = localStorage.getItem('agefit_history');
    return saved ? JSON.parse(saved) : [
      {
        id: 'h1',
        workoutId: 'w1',
        workoutName: 'Daily Energy and Strength',
        date: new Date(Date.now() - 86400000).toISOString(),
        durationMinutes: 15,
        exercisesCompleted: 6,
        totalExercises: 6,
        caloriesBurned: 85,
        phaseCompleted: { warmup: true, main: true, cooldown: true }
      }
    ];
  });

  const [currentScreen, setCurrentScreen] = useState<AppScreen>('dashboard');
  const [workoutCategoryFilter, setWorkoutCategoryFilter] = useState<string>('all');
  const [workoutLevelFilter, setWorkoutLevelFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [dailyWorkout, setDailyWorkout] = useState<Workout>(() => RecommendationEngine.generateWorkout(user));
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('agefit_dark') === 'true';
  });
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);

  useEffect(() => {
    localStorage.setItem('agefit_user', JSON.stringify(user));
  }, [user]);

  // Start Autonomous Self-Healing Background Daemon
  useEffect(() => {
    AutoHealerEngine.start();
    return () => {
      AutoHealerEngine.stop();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('agefit_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('agefit_dark', darkMode ? 'true' : 'false');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSwitchPersona = (key: string) => {
    const profile = DEMO_PROFILES[key];
    if (profile) {
      setUser(profile);
      setDailyWorkout(RecommendationEngine.generateWorkout(profile));
    }
  };

  const handleWorkoutComplete = () => {
    const newEntry: WorkoutHistoryEntry = {
      id: 'hist-' + Date.now(),
      workoutId: dailyWorkout.id,
      workoutName: dailyWorkout.name,
      date: new Date().toISOString(),
      durationMinutes: dailyWorkout.durationMinutes,
      exercisesCompleted: dailyWorkout.exercises.length,
      totalExercises: dailyWorkout.exercises.length,
      caloriesBurned: dailyWorkout.estimatedCalories,
      phaseCompleted: { warmup: true, main: true, cooldown: true }
    };

    setHistory(prev => [newEntry, ...prev]);
    setUser(prev => ({
      ...prev,
      totalWorkoutsCompleted: prev.totalWorkoutsCompleted + 1,
      totalWorkoutMinutes: prev.totalWorkoutMinutes + dailyWorkout.durationMinutes,
      currentStreak: prev.currentStreak + 1,
      bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1)
    }));

    setCurrentScreen('progress');
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors ${
      largeText ? 'large-text' : ''
    } ${highContrast ? 'high-contrast' : ''}`}>

      {/* TOP DESKTOP & MOBILE HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div
            onClick={() => setCurrentScreen('dashboard')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xl">
              🌿
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              Age<span className="text-emerald-600 dark:text-emerald-400">Fit</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentScreen === 'dashboard'
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentScreen('exercises')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentScreen === 'exercises' || currentScreen === 'workout_overview'
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Workouts
            </button>
            <button
              onClick={() => setCurrentScreen('nutrition')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentScreen === 'nutrition'
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Food & Water
            </button>
            <button
              onClick={() => setCurrentScreen('progress')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentScreen === 'progress'
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Progress
            </button>
            <button
              onClick={() => setCurrentScreen('settings')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentScreen === 'settings'
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setCurrentScreen('chatgpt')}
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
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={darkMode ? "Switch to light theme" : "Switch to dark theme"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Persona Switch Pill */}
            <button
              onClick={() => setCurrentScreen('settings')}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 text-xs font-bold text-slate-700 dark:text-slate-200 hover:shadow-xs transition-all cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                {user.name.charAt(0)}
              </div>
              <span className="hidden sm:inline">{user.name}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN VIEW AREA */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 pb-24 md:pb-8">
        {isOnboarding ? (
          <Onboarding
            onComplete={(newUser) => {
              const fullProfile: UserProfile = {
                ...user,
                ...newUser,
                ageGroup: RecommendationEngine.getAgeGroup(newUser.age || 28)
              } as UserProfile;
              setUser(fullProfile);
              setDailyWorkout(RecommendationEngine.generateWorkout(fullProfile));
              setIsOnboarding(false);
              setCurrentScreen('dashboard');
            }}
          />
        ) : currentScreen === 'dashboard' ? (
          <Dashboard
            user={user}
            workout={dailyWorkout}
            onStartWorkout={() => setCurrentScreen('workout_player')}
            onNavigate={(screen, options) => {
              if (options?.category) {
                setWorkoutCategoryFilter(options.category);
                setWorkoutLevelFilter('all');
              } else if (options?.level) {
                setWorkoutLevelFilter(options.level);
                setWorkoutCategoryFilter('all');
              } else {
                setWorkoutCategoryFilter('all');
                setWorkoutLevelFilter('all');
              }
              if (screen === 'onboarding') {
                setIsOnboarding(true);
              } else {
                setCurrentScreen(screen);
              }
            }}
            onSwitchPersona={handleSwitchPersona}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
          />
        ) : currentScreen === 'exercises' || currentScreen === 'workout_overview' ? (
          <Workouts
            currentAgeGroup={user.ageGroup}
            initialCategory={workoutCategoryFilter}
            initialLevel={workoutLevelFilter}
            onSelectExercise={(ex) => {
              setDailyWorkout({
                ...dailyWorkout,
                exercises: [{ exercise: ex, phase: 'main', durationSeconds: ex.durationSeconds }]
              });
              setCurrentScreen('workout_player');
            }}
            onStartFullWorkout={() => setCurrentScreen('workout_player')}
          />
        ) : currentScreen === 'workout_player' ? (
          <WorkoutPlayer
            workout={dailyWorkout}
            onComplete={handleWorkoutComplete}
            onExit={() => setCurrentScreen('dashboard')}
          />
        ) : currentScreen === 'progress' ? (
          <Progress user={user} history={history} />
        ) : currentScreen === 'nutrition' ? (
          <Nutrition />
        ) : currentScreen === 'settings' ? (
          <Settings
            user={user}
            onSaveProfile={(updated) => {
              setUser(updated);
              setDailyWorkout(RecommendationEngine.generateWorkout(updated));
            }}
            largeText={largeText}
            onToggleLargeText={() => setLargeText(!largeText)}
            highContrast={highContrast}
            onToggleHighContrast={() => setHighContrast(!highContrast)}
          />
        ) : currentScreen === 'chatgpt' ? (
          <ChatGPTAssistant user={user} />
        ) : null}
      </main>

      {/* BOTTOM MOBILE NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex justify-around py-2">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold py-1 px-3 rounded-xl cursor-pointer ${
            currentScreen === 'dashboard' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
          }`}
        >
          <Home size={18} /> Home
        </button>
        <button
          onClick={() => setCurrentScreen('exercises')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold py-1 px-3 rounded-xl cursor-pointer ${
            currentScreen === 'exercises' || currentScreen === 'workout_player' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
          }`}
        >
          <Dumbbell size={18} /> Workouts
        </button>
        <button
          onClick={() => setCurrentScreen('nutrition')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold py-1 px-3 rounded-xl cursor-pointer ${
            currentScreen === 'nutrition' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
          }`}
        >
          <Apple size={18} /> Food & Water
        </button>
        <button
          onClick={() => setCurrentScreen('progress')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold py-1 px-3 rounded-xl cursor-pointer ${
            currentScreen === 'progress' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
          }`}
        >
          <LineChart size={18} /> Progress
        </button>
        <button
          onClick={() => setCurrentScreen('settings')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold py-1 px-3 rounded-xl cursor-pointer ${
            currentScreen === 'settings' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
          }`}
        >
          <User size={18} /> Profile
        </button>
        <button
          onClick={() => setCurrentScreen('chatgpt')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold py-1 px-3 rounded-xl cursor-pointer ${
            currentScreen === 'chatgpt' ? 'text-emerald-600 dark:text-emerald-400' : 'text-emerald-500/70'
          }`}
        >
          <Bot size={18} /> AI Coach
        </button>
      </div>

      {/* FOOTER */}
      <footer className="hidden md:block border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div>© 2026 AgeFit — Fitness made easy for every age.</div>
          <div className="flex gap-4 font-semibold text-slate-600 dark:text-slate-400">
            <button onClick={() => setIsOnboarding(true)} className="hover:underline cursor-pointer">Start Setup Again</button>
            <button onClick={() => setCurrentScreen('nutrition')} className="hover:underline cursor-pointer">Food & Water Tips</button>
            <button onClick={() => setCurrentScreen('settings')} className="hover:underline cursor-pointer">Reading Options</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
