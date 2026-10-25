import React from 'react';
import {
  Flame,
  Footprints,
  Droplets,
  ChevronRight,
  Play,
  Award,
  Zap
} from 'lucide-react';
import type { UserProfile, Workout } from '../types';

interface DashboardProps {
  user: UserProfile;
  workout: Workout;
  onStartWorkout: () => void;
  onNavigate: (screen: any, options?: { category?: string; level?: 'beginner' | 'intermediate' | 'advanced' }) => void;
  onSwitchPersona: (key: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  workout,
  onStartWorkout,
  onNavigate,
  onSwitchPersona,
}) => {
  // Motivational Streak Milestone Badges
  const streakMilestones = [
    {
      days: 3,
      title: '3-Day Starter',
      desc: '3 straight days of movement.',
      icon: '🌱',
      unlocked: user.currentStreak >= 3 || user.bestStreak >= 3,
      reward: 'Great start! Momentum is building.'
    },
    {
      days: 7,
      title: '7-Day Champion',
      desc: 'A full week of healthy habits.',
      icon: '🔥',
      unlocked: user.currentStreak >= 7 || user.bestStreak >= 7,
      reward: 'Fantastic dedication! You are unstoppable.'
    },
    {
      days: 30,
      title: '30-Day Legend',
      desc: 'One month of consistent fitness.',
      icon: '👑',
      unlocked: user.currentStreak >= 30 || user.bestStreak >= 30,
      reward: 'Life-changing consistency achieved!'
    }
  ];

  // 6 Real Fitness Categories
  const categoryCards = [
    {
      id: 'warmup',
      name: 'Warm-Up',
      description: 'Prepare your joints safely.',
      imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
      alt: 'Athletic person doing a dynamic warm-up stretch outdoors'
    },
    {
      id: 'strength',
      name: 'Strength',
      description: 'Build full body muscle power.',
      imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
      alt: 'Athlete performing bodyweight strength training'
    },
    {
      id: 'cardio',
      name: 'Cardio',
      description: 'Boost heart rate and stamina.',
      imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80',
      alt: 'Person running outdoors for cardiovascular fitness'
    },
    {
      id: 'flexibility',
      name: 'Flexibility',
      description: 'Release tight joints smoothly.',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
      alt: 'Person performing yoga flexibility stretches on a mat'
    },
    {
      id: 'beginner',
      name: 'Beginner Workouts',
      description: 'Low-impact gentle movements.',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      alt: 'Person starting comfortable beginner exercises in the gym'
    },
    {
      id: 'cooldown',
      name: 'Cool-Down',
      description: 'Relax muscles and slow breathing.',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      alt: 'Person seated in peaceful cool-down stretch'
    }
  ];

  // 3 Fitness Levels
  const levelCards: {
    level: 'beginner' | 'intermediate' | 'advanced';
    title: string;
    description: string;
    tag: string;
    imageUrl: string;
    alt: string;
  }[] = [
    {
      level: 'beginner',
      title: 'Beginner',
      description: 'Start with gentle, low-impact exercises.',
      tag: 'Gentle & Safe',
      imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
      alt: 'Beginner practicing steady posture and movement'
    },
    {
      level: 'intermediate',
      title: 'Intermediate',
      description: 'Build strength and active stamina.',
      tag: 'Build Stamina',
      imageUrl: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=800&q=80',
      alt: 'Athletic person performing intermediate functional exercise'
    },
    {
      level: 'advanced',
      title: 'Advanced',
      description: 'Challenge your muscular endurance.',
      tag: 'High Energy',
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      alt: 'High-intensity advanced athlete training'
    }
  ];

  const currentYear = 2026;

  const ageCards = [
    { name: 'Kids', range: '5 – 12 years', key: 'leo', bg: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300', emoji: '🧒' },
    { name: 'Teens', range: '13 – 18 years', key: 'maya', bg: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/40 text-blue-800 dark:text-blue-300', emoji: '🎒' },
    { name: 'Adults', range: '19 – 40 years', key: 'charan', bg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300', emoji: '💼' },
    { name: 'Middle Age', range: '41 – 60 years', key: 'david', bg: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800/40 text-purple-800 dark:text-purple-300', emoji: '☕' },
    { name: 'Seniors', range: '60+ years', key: 'grace', bg: 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/40 text-rose-800 dark:text-rose-300', emoji: '🌿' }
  ];

  return (
    <div className="space-y-8">
      {/* ============================================================== */}
      {/* 1. TOP PRIORITY: TODAY'S WORKOUT 1-CLICK ACTION HERO FOR CHARAN */}
      {/* ============================================================== */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800/60 min-h-[380px] sm:min-h-[420px] flex items-center">
        {/* Real Fitness Photograph with High-Contrast Overlay */}
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80"
          alt="Athlete focused on daily strength training"
          className="absolute inset-0 w-full h-full object-cover object-center select-none"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/70" />

        <div className="relative z-10 max-w-2xl px-6 sm:px-10 py-8 text-white space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black tracking-wide uppercase">
            <Zap size={14} className="text-emerald-400" />
            Ready for {user.name} • {workout.durationMinutes} Mins
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            TODAY'S WORKOUT: <br />
            <span className="text-emerald-400">{workout.name}</span>
          </h1>

          <p className="text-slate-200 text-sm sm:text-base font-medium max-w-xl">
            Tailored for adults at intermediate level with zero joint limitations.
          </p>

          {/* 1-Click Workout Launcher */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onStartWorkout}
              className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play size={18} fill="currentColor" />
              <span>Start Workout (1-Click)</span>
            </button>

            <button
              onClick={() => onNavigate('exercises')}
              className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs hover:scale-105 transition-all cursor-pointer"
            >
              Explore All Workouts
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. ENHANCED MOTIVATION STREAKS & CELEBRATORY MILESTONE BADGES */}
      {/* ============================================================== */}
      <section className="bg-white dark:bg-slate-800 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Award className="text-emerald-600 dark:text-emerald-400" size={20} />
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Milestone Badges & Streak
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Current streak: <strong className="text-slate-900 dark:text-white">{user.currentStreak} Days</strong>. Keep moving daily to unlock badges.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600">
            <Flame size={15} />
            <span>Best Streak: {user.bestStreak} Days</span>
          </div>
        </div>

        {/* Milestone Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {streakMilestones.map((badge) => (
            <div
              key={badge.days}
              className={`p-4 rounded-2xl border transition-all relative flex flex-col justify-between ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-500/40 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl p-2 rounded-xl bg-white dark:bg-slate-800 shadow-xs">
                  {badge.icon}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                    badge.unlocked
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {badge.unlocked ? 'Unlocked' : 'In Progress'}
                </span>
              </div>

              <div className="mt-3">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {badge.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{badge.desc}</p>
              </div>

              {badge.unlocked && (
                <div className="mt-2 pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  ✓ {badge.reward}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. DAILY ACTIVITY RING & METRICS */}
      {/* ============================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Step-by-Step Routine Breakdown */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white">Today's 3 Routine Phases</h3>
              <p className="text-xs text-slate-500">Smooth sequence designed for body conditioning.</p>
            </div>
            <button
              onClick={onStartWorkout}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Start All <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              onClick={() => onNavigate('exercises', { category: 'mobility' })}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 hover:border-emerald-400 transition-all cursor-pointer group flex flex-col justify-between h-32"
            >
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                  Step 1
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1.5 group-hover:text-emerald-600 transition-colors">
                  Warm Up
                </h4>
                <p className="text-[11px] text-slate-500">Easy preparation moves</p>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 font-semibold pt-1 border-t border-slate-200/50 dark:border-slate-800">
                <span>3 mins</span>
                <Play size={13} className="text-emerald-600 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('exercises', { category: 'strength' })}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 hover:border-emerald-400 transition-all cursor-pointer group flex flex-col justify-between h-32"
            >
              <div>
                <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                  Step 2
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1.5 group-hover:text-emerald-600 transition-colors">
                  Main Workout
                </h4>
                <p className="text-[11px] text-slate-500">Strength and stamina</p>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 font-semibold pt-1 border-t border-slate-200/50 dark:border-slate-800">
                <span>10 mins</span>
                <Play size={13} className="text-emerald-600 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('exercises', { category: 'flexibility' })}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 hover:border-emerald-400 transition-all cursor-pointer group flex flex-col justify-between h-32"
            >
              <div>
                <span className="text-[10px] font-bold uppercase text-purple-600 bg-purple-100 dark:bg-purple-950 px-2 py-0.5 rounded-md">
                  Step 3
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1.5 group-hover:text-emerald-600 transition-colors">
                  Cool Down
                </h4>
                <p className="text-[11px] text-slate-500">Relax and stretch</p>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 font-semibold pt-1 border-t border-slate-200/50 dark:border-slate-800">
                <span>3 mins</span>
                <Play size={13} className="text-emerald-600 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Circular Progress & Metrics */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-black text-base text-slate-900 dark:text-white">Today's Progress</h3>
            <button
              onClick={() => onNavigate('progress')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              Details <ChevronRight size={14} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-5">
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-100 dark:text-slate-700" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                  className="text-emerald-500 transition-all duration-700"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * 0.72)}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">72%</span>
                <span className="text-[9px] text-slate-500 font-semibold uppercase">Done</span>
              </div>
            </div>

            <div className="space-y-2.5 flex-1 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950/50 text-orange-600 flex items-center justify-center shrink-0">
                  <Flame size={14} />
                </div>
                <div>
                  <div className="font-black text-slate-900 dark:text-white text-xs">320 kcal</div>
                  <div className="text-slate-500 text-[10px]">Calories Burned</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Footprints size={14} />
                </div>
                <div>
                  <div className="font-black text-slate-900 dark:text-white text-xs">5,200</div>
                  <div className="text-slate-500 text-[10px]">Steps Walked</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center shrink-0">
                  <Droplets size={14} />
                </div>
                <div>
                  <div className="font-black text-slate-900 dark:text-white text-xs">1.8 L</div>
                  <div className="text-slate-500 text-[10px]">Water Drunk</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. CHOOSE YOUR LEVEL (3 CARDS WITH REAL PHOTOS) */}
      {/* ============================================================== */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Choose Your Level
          </h2>
          <p className="text-xs text-slate-500">
            Select the difficulty that feels comfortable today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {levelCards.map((lvl) => (
            <div
              key={lvl.level}
              onClick={() => onNavigate('exercises', { level: lvl.level })}
              className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                  <img
                    src={lvl.imageUrl}
                    alt={lvl.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px]">
                    {lvl.tag}
                  </span>
                  <div className="absolute bottom-3 left-4 text-white">
                    <h3 className="font-black text-lg">{lvl.title}</h3>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {lvl.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-700 dark:text-emerald-300 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  View Workouts <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. EXPLORE 6 REAL FITNESS CATEGORIES */}
      {/* ============================================================== */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Explore Categories
            </h2>
            <p className="text-xs text-slate-500">
              Browse guided routines with real photos.
            </p>
          </div>
          <button
            onClick={() => onNavigate('exercises')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            All Workouts <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryCards.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('exercises', { category: cat.id })}
              className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                  <img
                    src={cat.imageUrl}
                    alt={cat.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white font-bold text-xs">
                    {cat.name}
                  </span>
                </div>

                <div className="p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-500 dark:bg-slate-700 dark:hover:bg-emerald-500 text-slate-800 dark:text-slate-200 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  Explore Workouts <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. SWITCH PERSONA SELECTOR */}
      {/* ============================================================== */}
      <section className="space-y-3">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Switch Age Persona</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {ageCards.map((card) => {
            const isCurrent = user.name.toLowerCase().includes(card.name.toLowerCase()) ||
              (card.key === 'charan' && user.id === 'user-charan') ||
              (card.key === 'leo' && user.id === 'user-leo') ||
              (card.key === 'maya' && user.id === 'user-maya') ||
              (card.key === 'david' && user.id === 'user-david') ||
              (card.key === 'grace' && user.id === 'user-grace');

            return (
              <button
                key={card.key}
                onClick={() => onSwitchPersona(card.key)}
                className={`p-3.5 rounded-2xl border text-left transition-all hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between h-24 ${card.bg} ${
                  isCurrent ? 'ring-2 ring-emerald-500 shadow-sm' : ''
                }`}
              >
                <div>
                  <div className="text-xs font-bold">{card.name}</div>
                  <div className="text-[11px] opacity-75">{card.range}</div>
                </div>
                <div className="text-xl self-end">{card.emoji}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. FOOTER */}
      {/* ============================================================== */}
      <footer className="pt-8 pb-4 border-t border-slate-200 dark:border-slate-800 text-slate-500 text-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base text-slate-900 dark:text-white">
              Age<span className="text-emerald-600 dark:text-emerald-400">Fit</span>
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-5 text-xs font-bold">
            <button onClick={() => onNavigate('dashboard')} className="hover:text-emerald-500 cursor-pointer">Home</button>
            <button onClick={() => onNavigate('exercises')} className="hover:text-emerald-500 cursor-pointer">Workouts</button>
            <button onClick={() => onNavigate('nutrition')} className="hover:text-emerald-500 cursor-pointer">Food & Water</button>
            <button onClick={() => onNavigate('progress')} className="hover:text-emerald-500 cursor-pointer">Progress</button>
            <button onClick={() => onNavigate('settings')} className="hover:text-emerald-500 cursor-pointer">Profile</button>
            <button onClick={() => onNavigate('chatgpt')} className="text-emerald-600 dark:text-emerald-400 font-extrabold cursor-pointer">AI Auditor</button>
          </nav>
        </div>
        <div className="text-center text-[11px] text-slate-400">
          © {currentYear} AgeFit. Optimized for Charan Teja (Adults, Intermediate).
        </div>
      </footer>
    </div>
  );
};
