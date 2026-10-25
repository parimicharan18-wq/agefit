import { describe, it, expect, beforeEach } from 'vitest';
import { AutoHealerEngine } from './autoHealer';

describe('AutoHealer Self-Repair Engine Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('detects missing user profile in localStorage and auto-repairs it', () => {
    expect(localStorage.getItem('agefit_user')).toBeNull();
    const report = AutoHealerEngine.healAll();
    expect(report.storageHealthy).toBe(true);
    expect(localStorage.getItem('agefit_user')).not.toBeNull();
    const user = JSON.parse(localStorage.getItem('agefit_user')!);
    expect(user.name).toBe('Charan Teja');
    expect(user.ageGroup).toBe('adults');
  });

  it('guarantees voice coaching and water auto-sync flags are initialized', () => {
    AutoHealerEngine.healAll();
    expect(localStorage.getItem('agefit_voice_enabled')).toBe('true');
    expect(localStorage.getItem('agefit_water_auto_sync')).toBe('true');
  });
});
