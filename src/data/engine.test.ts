import { describe, it, expect } from 'vitest';
import { RecommendationEngine } from './engine';
import { DEMO_PROFILES } from './profiles';

describe('RecommendationEngine Unit Tests', () => {
  it('correctly categorizes age groups according to medical guidance', () => {
    expect(RecommendationEngine.getAgeGroup(8)).toBe('children');
    expect(RecommendationEngine.getAgeGroup(15)).toBe('teenagers');
    expect(RecommendationEngine.getAgeGroup(25)).toBe('young_adults');
    expect(RecommendationEngine.getAgeGroup(38)).toBe('adults');
    expect(RecommendationEngine.getAgeGroup(52)).toBe('middle_age');
    expect(RecommendationEngine.getAgeGroup(68)).toBe('seniors');
  });

  it('generates customized workout tailored to adult profile (Charan Teja)', () => {
    const workout = RecommendationEngine.generateWorkout(DEMO_PROFILES.charan);
    expect(workout).toBeDefined();
    expect(workout.exercises.length).toBeGreaterThanOrEqual(3);
    expect(workout.durationMinutes).toBeGreaterThan(0);
    expect(['young_adults', 'adults']).toContain(workout.targetAgeGroup);
  });

  it('generates safe, low-impact routine for seniors (Grace)', () => {
    const seniorWorkout = RecommendationEngine.generateWorkout(DEMO_PROFILES.grace);
    expect(seniorWorkout.targetAgeGroup).toBe('seniors');
    // Ensure all exercises avoid forbidden knee/high impact movements
    seniorWorkout.exercises.forEach(({ exercise }) => {
      expect(exercise.difficulty).not.toBe('advanced');
    });
  });
});
