export type AgeGroup = 'children' | 'teenagers' | 'young_adults' | 'adults' | 'middle_age' | 'seniors';

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export type FitnessGoal =
  | 'general_fitness'
  | 'weight_management'
  | 'muscle_strength'
  | 'flexibility'
  | 'endurance'
  | 'mobility'
  | 'balance'
  | 'stress_reduction'
  | 'better_daily_activity';

export type AvailableTime = 5 | 10 | 15 | 20 | 30 | 45;

export type ExercisePreference =
  | 'indoor'
  | 'outdoor'
  | 'home'
  | 'gym'
  | 'walking'
  | 'yoga_mobility'
  | 'bodyweight';

export type PhysicalLimitation =
  | 'knee'
  | 'back'
  | 'shoulder'
  | 'wrist'
  | 'balance'
  | 'other'
  | 'none';

export type ExerciseCategory =
  | 'cardio'
  | 'strength'
  | 'mobility'
  | 'balance'
  | 'flexibility'
  | 'relaxation';

export type MovementAnimationType =
  | 'squat'
  | 'chair_squat'
  | 'pushup'
  | 'wall_pushup'
  | 'marching'
  | 'arm_circles'
  | 'stretching'
  | 'balance'
  | 'breathing'
  | 'jumping'
  | 'bridge'
  | 'plank'
  | 'cat_cow'
  | 'step_up'
  | 'knee_raise'
  | 'general';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  difficulty: FitnessLevel;
  description: string;
  instructions: string[];
  durationSeconds: number;
  repetitions?: number;
  targetAgeGroups: AgeGroup[];
  recommendedFitnessLevels: FitnessLevel[];
  safetyNotes: string;
  contraindications: PhysicalLimitation[];
  alternativeExerciseId?: string;
  alternativeName?: string;
  mediaUrl?: string;
  animationType: MovementAnimationType;
  equipment?: 'none' | 'chair' | 'wall' | 'mat';
  isChildFriendly?: boolean;
}

export type WorkoutPhase = 'warmup' | 'main' | 'cooldown';

export interface WorkoutExercise {
  exercise: Exercise;
  phase: WorkoutPhase;
  durationSeconds: number;
  repetitions?: number;
  completed?: boolean;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  difficulty: FitnessLevel;
  targetAgeGroup: AgeGroup;
  targetGoals: FitnessGoal[];
  estimatedCalories: number;
  exercises: WorkoutExercise[];
  aiRationale?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  age: number;
  ageGroup: AgeGroup;
  gender?: string;
  avatarUrl?: string;
  heightCm?: number;
  weightKg?: number;
  fitnessLevel: FitnessLevel;
  goals: FitnessGoal[];
  availableTime: AvailableTime;
  preferences: ExercisePreference[];
  limitations: PhysicalLimitation[];
  limitationNotes?: string;
  isRecoveryDay?: boolean;
  currentStreak: number;
  bestStreak: number;
  totalWorkoutMinutes: number;
  totalWorkoutsCompleted: number;
  role?: 'user' | 'admin';
  createdAt: string;
}

export interface WorkoutHistoryEntry {
  id: string;
  workoutId: string;
  workoutName: string;
  date: string; // ISO string
  durationMinutes: number;
  exercisesCompleted: number;
  totalExercises: number;
  caloriesBurned: number;
  phaseCompleted: {
    warmup: boolean;
    main: boolean;
    cooldown: boolean;
  };
}

export interface DailyProgressData {
  date: string; // YYYY-MM-DD
  workoutMinutes: number;
  exercisesCompleted: number;
  caloriesBurned: number;
  completedWorkout: boolean;
}

export interface Challenge {
  id: string;
  name: string;
  level: FitnessLevel;
  durationDays: number;
  description: string;
  badgeName: string;
  icon: string;
  targetAgeGroups: AgeGroup[];
  dailyTasks: {
    day: number;
    title: string;
    description: string;
    targetMinutes: number;
  }[];
}

export interface UserChallenge {
  challengeId: string;
  startDate: string;
  completedDays: number[];
  isCompleted: boolean;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'streak' | 'workouts' | 'special';
  unlockedAt?: string;
}

export interface NotificationSettings {
  morningEnabled: boolean;
  morningTime: string;
  eveningEnabled: boolean;
  eveningTime: string;
  restDayReminder: boolean;
  soundEnabled: boolean;
}

export interface AccessibilitySettings {
  largeText: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  soundEffects: boolean;
}

export type AppScreen =
  | 'splash'
  | 'onboarding'
  | 'auth'
  | 'assessment'
  | 'dashboard'
  | 'workout_overview'
  | 'workout_player'
  | 'workout_completion'
  | 'exercises'
  | 'progress'
  | 'nutrition'
  | 'challenges'
  | 'profile'
  | 'settings'
  | 'admin'
  | 'chatgpt';
