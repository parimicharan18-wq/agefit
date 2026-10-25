import { EXERCISE_DATABASE } from './exercises';
import type { UserProfile, Workout, WorkoutExercise, AgeGroup, FitnessGoal } from '../types';

export class RecommendationEngine {
  static getAgeGroup(age: number): AgeGroup {
    const numAge = Number(age) || 25;
    if (numAge <= 12) return 'children';
    if (numAge <= 18) return 'teenagers';
    if (numAge <= 30) return 'young_adults';
    if (numAge <= 45) return 'adults';
    if (numAge <= 60) return 'middle_age';
    return 'seniors';
  }

  static generateWorkout(user: Partial<UserProfile>): Workout {
    const ageGroup = user.ageGroup || this.getAgeGroup(user.age || 28);
    const fitnessLevel = user.fitnessLevel || 'beginner';
    const goals = user.goals && user.goals.length > 0 ? user.goals : ['general_fitness'];
    const availableTime = Number(user.availableTime) || 15;
    const limitations = user.limitations || ['none'];
    const preferences = user.preferences || ['home', 'bodyweight'];

    let mainExerciseCount = 4;
    if (availableTime <= 5) mainExerciseCount = 2;
    else if (availableTime <= 10) mainExerciseCount = 3;
    else if (availableTime <= 15) mainExerciseCount = 4;
    else if (availableTime <= 20) mainExerciseCount = 5;
    else mainExerciseCount = 6;

    const safeExercises = EXERCISE_DATABASE.filter(ex => {
      if (limitations.includes('none')) return true;
      const hasContra = ex.contraindications.some(c => limitations.includes(c));
      return !hasContra;
    });

    const scored = safeExercises.map(ex => {
      let score = 0;
      if (ex.targetAgeGroups.includes(ageGroup)) score += 5;
      if (ageGroup === 'children' && ex.isChildFriendly) score += 6;
      if (ageGroup === 'seniors' && (ex.category === 'balance' || ex.category === 'mobility')) score += 4;
      if (ex.recommendedFitnessLevels.includes(fitnessLevel)) score += 4;
      if (ex.difficulty === fitnessLevel) score += 2;

      if (goals.includes('muscle_strength') && ex.category === 'strength') score += 5;
      if (goals.includes('weight_management') && (ex.category === 'cardio' || ex.category === 'strength')) score += 4;
      if (goals.includes('endurance') && ex.category === 'cardio') score += 5;
      if (goals.includes('mobility') && ex.category === 'mobility') score += 6;
      if (goals.includes('balance') && ex.category === 'balance') score += 6;
      if (goals.includes('flexibility') && ex.category === 'flexibility') score += 5;
      if (goals.includes('stress_reduction') && (ex.category === 'relaxation' || ex.category === 'mobility')) score += 5;
      if (preferences.includes('walking') && (ex.id === 'c1' || ex.id === 'b2')) score += 4;

      return { exercise: ex, score };
    }).sort((a, b) => b.score - a.score);

    const warmupsPool = EXERCISE_DATABASE.filter(ex =>
      (ex.category === 'cardio' || ex.category === 'mobility') &&
      ex.targetAgeGroups.includes(ageGroup)
    );
    const cooldownsPool = EXERCISE_DATABASE.filter(ex =>
      (ex.category === 'flexibility' || ex.category === 'relaxation' || ex.category === 'mobility') &&
      ex.targetAgeGroups.includes(ageGroup)
    );

    const warmupEx = (warmupsPool.length > 0 ? warmupsPool : EXERCISE_DATABASE).slice(0, 2);
    const mainEx = scored.slice(0, mainExerciseCount).map(s => s.exercise);
    const cooldownEx = (cooldownsPool.length > 0 ? cooldownsPool : EXERCISE_DATABASE).slice(0, 2);

    const workoutExercises: WorkoutExercise[] = [
      ...warmupEx.map(ex => ({ exercise: ex, phase: 'warmup' as const, durationSeconds: ex.durationSeconds || 45 })),
      ...mainEx.map(ex => ({ exercise: ex, phase: 'main' as const, durationSeconds: ex.durationSeconds || 45 })),
      ...cooldownEx.map(ex => ({ exercise: ex, phase: 'cooldown' as const, durationSeconds: ex.durationSeconds || 45 }))
    ];

    const ageGroupTitles: Record<AgeGroup, string> = {
      children: 'Fun Active Play',
      teenagers: 'Energy and Posture Boost',
      young_adults: 'Full-Body Strength and Fitness',
      adults: 'Daily Energy and Strength',
      middle_age: 'Joint Care and Healthy Movement',
      seniors: 'Gentle Balance and Easy Movement'
    };

    const ageGroupRationales: Record<AgeGroup, string> = {
      children: 'Fun, active games that help build strong bones and good balance.',
      teenagers: 'Easy exercises to improve posture, build strength, and boost energy.',
      young_adults: 'Fast, effective exercises to stay fit and build healthy daily habits.',
      adults: 'Helps ease back tension, improve posture, and keep your body strong.',
      middle_age: 'Gentle on your joints while building strength for daily activities.',
      seniors: 'Simple, steady movements to improve balance, protect joints, and prevent falls.'
    };

    return {
      id: 'daily-' + Date.now(),
      name: ageGroupTitles[ageGroup] || 'Daily Healthy Movement',
      description: `A simple ${availableTime}-minute plan made for you.`,
      durationMinutes: availableTime,
      difficulty: fitnessLevel,
      targetAgeGroup: ageGroup,
      targetGoals: goals as FitnessGoal[],
      estimatedCalories: Math.round(availableTime * (fitnessLevel === 'advanced' ? 8 : fitnessLevel === 'intermediate' ? 6.5 : 5)),
      exercises: workoutExercises,
      aiRationale: ageGroupRationales[ageGroup],
      createdAt: new Date().toISOString()
    };
  }
}
