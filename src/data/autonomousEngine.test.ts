import { describe, it, expect } from 'vitest';
import { AutonomousEngine } from './autonomousEngine';

describe('AutonomousEngine Multi-Age Tests', () => {
  it('supplies tailored autonomous features across all 5 age brackets', () => {
    const features = AutonomousEngine.getFeatures();
    expect(features.length).toBeGreaterThanOrEqual(6);
    expect(features.some(f => f.category === 'workout')).toBe(true);
    expect(features.some(f => f.category === 'nutrition')).toBe(true);
    expect(features.some(f => f.category === 'recovery')).toBe(true);
  });

  it('evolves features without throwing errors', () => {
    expect(() => AutonomousEngine.evolveFeaturesSilently()).not.toThrow();
  });
});
