import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { Logo } from './Logo';
import { DEMO_PROFILES } from '../data/profiles';

describe('Logo Component', () => {
  it('renders the AgeFit brand and green leaf icon', () => {
    const { container } = render(<Logo size="md" />);
    expect(screen.getByText('Age')).toBeDefined();
    expect(screen.getByText('Fit')).toBeDefined();
    expect(container.textContent).toContain('🌿');
  });

  it('renders without text when showText is false', () => {
    render(<Logo size="sm" showText={false} />);
    expect(screen.queryByText('Age')).toBeNull();
  });
});

describe('Header Component', () => {
  it('renders AgeFit logo and triggers return to Home (dashboard) on click', () => {
    const handleNavigate = vi.fn();
    const handleToggleDarkMode = vi.fn();

    render(
      <Header
        currentScreen="exercises"
        onNavigate={handleNavigate}
        darkMode={false}
        onToggleDarkMode={handleToggleDarkMode}
        user={DEMO_PROFILES.charan}
      />
    );

    // Click logo button
    const logoButton = screen.getByRole('button', { name: /AgeFit Home/i });
    expect(logoButton).toBeDefined();
    fireEvent.click(logoButton);

    expect(handleNavigate).toHaveBeenCalledWith('dashboard');
  });

  it('renders navigation buttons for all key pages', () => {
    const handleNavigate = vi.fn();
    render(
      <Header
        currentScreen="dashboard"
        onNavigate={handleNavigate}
        darkMode={false}
        onToggleDarkMode={vi.fn()}
        user={DEMO_PROFILES.charan}
      />
    );

    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('Workouts')).toBeDefined();
    expect(screen.getByText('Food & Water')).toBeDefined();
    expect(screen.getByText('Progress')).toBeDefined();
    expect(screen.getByText('Profile')).toBeDefined();
    expect(screen.getByText('ChatGPT AI')).toBeDefined();
  });
});
