class SoundSystem {
  private audioCtx: AudioContext | null = null;
  public isMuted: boolean = false;

  private init() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.15, volume: number = 0.2) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  playCountdown() {
    this.playTone(440, 'triangle', 0.12, 0.18);
  }

  playStart() {
    this.playTone(880, 'sine', 0.35, 0.25);
  }

  playExerciseDone() {
    if (this.isMuted) return;
    try {
      this.init();
      const notes = [523.25, 659.25, 783.99];
      notes.forEach((f, idx) => {
        setTimeout(() => this.playTone(f, 'sine', 0.2, 0.2), idx * 100);
      });
    } catch {}
  }

  playVictory() {
    if (this.isMuted) return;
    try {
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((f, idx) => {
        setTimeout(() => this.playTone(f, 'triangle', 0.25, 0.25), idx * 120);
      });
    } catch {}
  }
}

export const sound = new SoundSystem();
