import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Onboarding } from './Onboarding';
import { Settings } from './Settings';
import { Progress } from './Progress';
import { DEMO_PROFILES } from '../data/profiles';

describe('Component Verification Suite: Onboarding, Settings & Progress', () => {
  it('renders onboarding correctly and advances steps', () => {
    const handleComplete = vi.fn();
    render(<Onboarding onComplete={handleComplete} />);

    // Step 1: Welcome & name input
    expect(screen.getByText(/Welcome to AgeFit/i)).toBeDefined();
    const nameInput = screen.getByPlaceholderText(/Type your name/i);
    fireEvent.change(nameInput, { target: { value: 'Charan Teja' } });

    // Click Next Step
    const nextBtn = screen.getByRole('button', { name: /Next Step/i });
    fireEvent.click(nextBtn);

    // Step 2: Choose goals & submit
    expect(screen.getByText(/What is your main goal/i)).toBeDefined();
    const submitBtn = screen.getByRole('button', { name: /Create My Workout/i });
    fireEvent.click(submitBtn);

    expect(handleComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Charan Teja',
        age: 28,
        fitnessLevel: 'beginner'
      })
    );
  });

  it('renders Settings and saves updated profile correctly', () => {
    const handleSave = vi.fn();
    render(
      <Settings
        user={DEMO_PROFILES.charan}
        onSaveProfile={handleSave}
        largeText={false}
        onToggleLargeText={vi.fn()}
        highContrast={false}
        onToggleHighContrast={vi.fn()}
      />
    );

    const nameInput = screen.getByDisplayValue(DEMO_PROFILES.charan.name);
    fireEvent.change(nameInput, { target: { value: 'Charan T.' } });

    const saveBtn = screen.getByRole('button', { name: /Save Changes/i });
    fireEvent.click(saveBtn);

    expect(handleSave).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Charan T.',
        age: DEMO_PROFILES.charan.age
      })
    );
  });

  it('renders Progress stats and streaks properly', () => {
    render(<Progress user={DEMO_PROFILES.charan} history={[]} />);

    expect(screen.getByText(/Your Progress/i)).toBeDefined();
    expect(screen.getByText(`${DEMO_PROFILES.charan.currentStreak} Days`)).toBeDefined();
    expect(screen.getByText(`${DEMO_PROFILES.charan.bestStreak} Days`)).toBeDefined();
    expect(screen.getByText(`${DEMO_PROFILES.charan.totalWorkoutMinutes} Mins`)).toBeDefined();
  });
});
