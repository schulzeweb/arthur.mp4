/**
 * Web Audio API synthesizer for ambient lo-fi soundscapes and tactile UI clicks.
 * Safe, zero-external dependency audio engine that runs entirely in the browser.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isAmbientPlaying = false;
  private ambientGain: GainNode | null = null;
  private currentTimer: number | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Tactile micro-click sound when pressing buttons or links
   */
  public playClick(enabled = true) {
    if (!enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Audio context might be restricted before first gesture
    }
  }

  /**
   * Toggle ambient relaxing lo-fi generative chord progression
   */
  public toggleAmbient(onStateChange?: (playing: boolean) => void): boolean {
    try {
      this.initContext();
      if (!this.ctx) return false;

      if (this.isAmbientPlaying) {
        this.stopAmbient();
        if (onStateChange) onStateChange(false);
        return false;
      } else {
        this.startAmbient();
        if (onStateChange) onStateChange(true);
        return true;
      }
    } catch {
      return false;
    }
  }

  public getIsPlaying(): boolean {
    return this.isAmbientPlaying;
  }

  private startAmbient() {
    if (!this.ctx) return;
    this.isAmbientPlaying = true;

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.ambientGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 1.5);
    if (this.masterGain) {
      this.ambientGain.connect(this.masterGain);
    }

    // Gentle chord chords: Fmaj7 -> Gsus -> Am7 -> Cmaj7
    const chords = [
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 261.63, 293.66, 392.00], // Gsus4
      [220.00, 261.63, 329.63, 392.00], // Am7
      [130.81, 164.81, 196.00, 246.94], // C
    ];

    let chordIdx = 0;
    const playChordStep = () => {
      if (!this.isAmbientPlaying || !this.ctx || !this.ambientGain) return;

      const chord = chords[chordIdx % chords.length];
      chordIdx++;

      chord.forEach((freq) => {
        if (!this.ctx || !this.ambientGain) return;
        const osc = this.ctx.createOscillator();
        const chordGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        chordGain.gain.setValueAtTime(0.0001, now);
        chordGain.gain.linearRampToValueAtTime(0.025, now + 1.2);
        chordGain.gain.linearRampToValueAtTime(0.0001, now + 3.8);

        osc.connect(filter);
        filter.connect(chordGain);
        chordGain.connect(this.ambientGain);

        osc.start(now);
        osc.stop(now + 4);
      });

      this.currentTimer = window.setTimeout(playChordStep, 3600);
    };

    playChordStep();
  }

  public stopAmbient() {
    this.isAmbientPlaying = false;
    if (this.currentTimer) {
      clearTimeout(this.currentTimer);
      this.currentTimer = null;
    }
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
        setTimeout(() => {
          this.ambientGain?.disconnect();
          this.ambientGain = null;
        }, 700);
      } catch {
        this.ambientGain = null;
      }
    }
  }

  public setVolume(val: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  public getVisualizerData(): number[] {
    if (!this.analyser || !this.isAmbientPlaying) {
      return [12, 18, 8, 22, 14, 28, 10, 16];
    }
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    // Sample 8 points
    const result: number[] = [];
    for (let i = 0; i < 8; i++) {
      const idx = Math.floor((i * dataArray.length) / 8);
      const val = Math.max(6, Math.round((dataArray[idx] / 255) * 40));
      result.push(val);
    }
    return result;
  }
}

export const soundEngine = new SoundEngine();
