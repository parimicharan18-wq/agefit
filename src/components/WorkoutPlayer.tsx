import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { sound } from '../data/audio';
import type { Workout } from '../types';

interface WorkoutPlayerProps {
  workout: Workout;
  initialExerciseIndex?: number;
  onComplete: () => void;
  onExit: () => void;
}

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({
  workout,
  initialExerciseIndex = 0,
  onComplete,
  onExit
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialExerciseIndex);
  const currentWorkoutEx = workout.exercises[currentIndex];
  const exercise = currentWorkoutEx?.exercise;

  const [timeLeft, setTimeLeft] = useState(currentWorkoutEx ? currentWorkoutEx.durationSeconds : 30);
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Reset timer on exercise switch
  const [prevIndex, setPrevIndex] = useState(initialExerciseIndex);
  if (currentIndex !== prevIndex) {
    setPrevIndex(currentIndex);
    setTimeLeft(currentWorkoutEx ? currentWorkoutEx.durationSeconds : 30);
    setIsActive(false);
  }

  useEffect(() => {
    if (!isActive) return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // When reaching 0, handle transition
          if (currentIndex < workout.exercises.length - 1) {
            sound.playExerciseDone();
            setCurrentIndex(c => c + 1);
            return 0;
          } else {
            sound.playVictory();
            setIsActive(false);
            onComplete();
            return 0;
          }
        }
        if (prev <= 4) {
          sound.playCountdown();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, currentIndex, workout.exercises.length, onComplete]);

  const toggleTimer = () => {
    if (!isActive) sound.playStart();
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(currentWorkoutEx ? currentWorkoutEx.durationSeconds : 30);
  };

  const handleNext = () => {
    if (currentIndex < workout.exercises.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      sound.playVictory();
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(c => c - 1);
    }
  };

  const toggleSound = () => {
    sound.isMuted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!exercise) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl">
        <h3 className="text-lg font-bold">No exercise found</h3>
        <button onClick={onExit} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold cursor-pointer">
          Go Back to Home
        </button>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / workout.exercises.length) * 100);

  const getPhaseName = (phase: string) => {
    if (phase === 'warmup') return 'Step 1: Warm Up';
    if (phase === 'main') return 'Step 2: Main Exercise';
    return 'Step 3: Cool Down';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Exit Workout
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
            title={isMuted ? "Turn sound on" : "Turn sound off"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">
            Exercise {currentIndex + 1} of {workout.exercises.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
        <div
          className="bg-emerald-500 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Exercise Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                {getPhaseName(currentWorkoutEx.phase)}
              </span>
              <span className="text-[10px] font-bold text-emerald-600 capitalize">
                {exercise.difficulty === 'beginner' ? 'Easy (Beginner)' : exercise.difficulty === 'intermediate' ? 'Medium' : 'Hard'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
              {exercise.name}
            </h1>
          </div>

          {/* Big Timer Badge */}
          <div className="w-24 h-24 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex flex-col items-center justify-center shrink-0">
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {timeLeft}s
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Seconds Left</span>
          </div>
        </div>

        {/* Real Exercise Photo Hero */}
        <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden relative shadow-inner border border-slate-200 dark:border-slate-700 bg-slate-900">
          <img
            src={exercise.mediaUrl || 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'}
            alt={exercise.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
            <div className="text-sm font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>{exercise.name}</span>
            </div>
            <p className="text-xs text-slate-200 line-clamp-2 mt-1">
              {exercise.description}
            </p>
          </div>

          {isActive && (
            <div className="absolute top-3 right-3 text-[11px] font-bold text-white bg-emerald-600/90 px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-xs shadow-md">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" /> Timer is Running
            </div>
          )}
        </div>

        {/* Step-by-Step Instructions */}
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">How to Do This Exercise:</h3>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            {exercise.instructions.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-bold text-emerald-600 shrink-0">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Safety Note Alert */}
        {exercise.safetyNotes && (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
            <ShieldCheck size={18} className="shrink-0 text-amber-600 mt-0.5" />
            <div>
              <strong className="font-bold">Safety Tip: </strong>
              {exercise.safetyNotes}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-bold disabled:opacity-40 cursor-pointer"
          >
            ← Previous
          </button>

          <button
            onClick={toggleTimer}
            className={`px-8 py-3.5 rounded-full font-black text-sm flex items-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer text-white ${
              isActive ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isActive ? <><Pause size={18} /> Pause</> : <><Play size={18} fill="currentColor" /> Start</>}
          </button>

          <button
            onClick={resetTimer}
            className="p-3 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
            title="Reset timer"
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold cursor-pointer hover:bg-emerald-200"
          >
            {currentIndex === workout.exercises.length - 1 ? 'Finish Workout ✨' : 'Next Exercise →'}
          </button>
        </div>
      </div>
    </div>
  );
};
