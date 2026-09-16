/**
 * Cosmic Sound & Ambient Music System
 * Web Audio API synthesizer for smooth echo toggle sounds and generative outer space ambient music.
 */

type AudioStateListener = (state: AudioSystemState) => void;

export interface AudioSystemState {
  isMuted: boolean;
  isBgmPlaying: boolean;
  isSfxEnabled: boolean;
  volume: number; // 0.0 to 1.0
  isInitialized: boolean;
}

class SoundSystem {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;

  // Echo delay bus for toggle sounds
  private delayNode: DelayNode | null = null;
  private feedbackGain: GainNode | null = null;
  private delayFilter: BiquadFilterNode | null = null;

  // BGM Nodes (Procedural Space Ambient Drone)
  private droneOscs: OscillatorNode[] = [];
  private droneGain: GainNode | null = null;
  private celestialTimer: number | null = null;
  private lfoOsc: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private spaceFilter: BiquadFilterNode | null = null;

  // State
  private state: AudioSystemState = {
    isMuted: true, // Default to muted until user enables or clicks toggle (respects browser autoplay)
    isBgmPlaying: false,
    isSfxEnabled: true,
    volume: 0.65,
    isInitialized: false,
  };

  private listeners: Set<AudioStateListener> = new Set();

  constructor() {
    // Read previous user preferences from localStorage if available
    try {
      const savedMuted = localStorage.getItem('portfolio_audio_muted');
      const savedVolume = localStorage.getItem('portfolio_audio_volume');
      const savedBgm = localStorage.getItem('portfolio_audio_bgm');
      const savedSfx = localStorage.getItem('portfolio_audio_sfx');

      if (savedMuted !== null) {
        this.state.isMuted = savedMuted === 'true';
      }
      if (savedVolume !== null) {
        this.state.volume = Math.max(0.1, Math.min(1, parseFloat(savedVolume) || 0.65));
      }
      if (savedBgm !== null) {
        this.state.isBgmPlaying = savedBgm === 'true' && !this.state.isMuted;
      }
      if (savedSfx !== null) {
        this.state.isSfxEnabled = savedSfx === 'true';
      }
    } catch {
      // Ignore storage access errors
    }
  }

  /**
   * Initializes the Web Audio Context on first user gesture
   */
  public async ensureContext(): Promise<AudioContext | null> {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return null;

      this.ctx = new AudioCtxClass();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.state.isMuted ? 0 : this.state.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // SFX Bus
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      // Setup Lush Smooth Echo / Feedback Delay Bus for SFX
      this.delayNode = this.ctx.createDelay(1.0);
      this.delayNode.delayTime.setValueAtTime(0.22, this.ctx.currentTime); // 220ms smooth delay

      this.feedbackGain = this.ctx.createGain();
      this.feedbackGain.gain.setValueAtTime(0.46, this.ctx.currentTime); // Gentle smooth echo decay

      this.delayFilter = this.ctx.createBiquadFilter();
      this.delayFilter.type = 'lowpass';
      this.delayFilter.frequency.setValueAtTime(2200, this.ctx.currentTime); // Warm analog echo roll-off

      // Connect delay loop: delay -> filter -> feedback -> delay
      this.delayNode.connect(this.delayFilter);
      this.delayFilter.connect(this.feedbackGain);
      this.feedbackGain.connect(this.delayNode);
      this.delayFilter.connect(this.sfxGain);

      // BGM Bus
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.18, this.ctx.currentTime); // Calm, gentle, soft background level
      this.bgmGain.connect(this.masterGain);

      this.state.isInitialized = true;
      this.notify();
    }

    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch {
        // Handled silently
      }
    }

    return this.ctx;
  }

  /**
   * Generates a warm, smooth harmonic tone with lush feedback echo
   * Designed specifically for toggling switches, filters, cards, and UI controls.
   */
  public async playToggleSound(type: 'on' | 'off' | 'generic' = 'generic') {
    if (!this.state.isSfxEnabled || this.state.isMuted) return;

    const ctx = await this.ensureContext();
    if (!ctx || !this.sfxGain || !this.delayNode) return;

    try {
      const now = ctx.currentTime;

      // Pitches tuned to tranquil celestial harmony (A4, E5, or C#5)
      let f1 = 523.25; // C5 warm chime
      let f2 = 659.25; // E5
      let f3 = 783.99; // G5

      if (type === 'on') {
        f1 = 440.00; // A4
        f2 = 659.25; // E5 ascending fifth
        f3 = 880.00; // A5
      } else if (type === 'off') {
        f1 = 659.25; // E5
        f2 = 523.25; // C5 descending
        f3 = 440.00; // A4
      }

      // Voice 1: Soft fundamental sine
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(f1, now);
      if (type === 'on') {
        osc1.frequency.exponentialRampToValueAtTime(f2, now + 0.08);
      } else if (type === 'off') {
        osc1.frequency.exponentialRampToValueAtTime(f1 * 0.8, now + 0.1);
      }

      // Voice 2: Warm gentle triangle for soft sparkle
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(f2, now);
      osc2.frequency.exponentialRampToValueAtTime(f3, now + 0.12);

      // Voice Envelope with ultra-smooth attack (no clicks) and natural decay
      const voiceGain = ctx.createGain();
      voiceGain.gain.setValueAtTime(0.0001, now);
      voiceGain.gain.linearRampToValueAtTime(0.28, now + 0.02); // 20ms soft attack
      voiceGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45); // Gentle primary decay

      // Connect to dry SFX and wet Echo delay bus
      osc1.connect(voiceGain);
      osc2.connect(voiceGain);

      voiceGain.connect(this.sfxGain);
      voiceGain.connect(this.delayNode); // Feeds into the 220ms smooth echo loop

      osc1.start(now);
      osc2.start(now);

      osc1.stop(now + 0.5);
      osc2.stop(now + 0.5);

      // Clean up nodes after echo dies out
      setTimeout(() => {
        try {
          osc1.disconnect();
          osc2.disconnect();
          voiceGain.disconnect();
        } catch {
          // Disconnect ignore
        }
      }, 1600);
    } catch {
      // Audio execution failure fallback
    }
  }

  /**
   * Generates continuous smooth, calm, and light outer-space ambient background music
   * Combines multi-layered detuned cosmic drones, subtle breathing LFO filter sweeps,
   * and tranquil celestial harmonic swells.
   */
  public async startSpaceAmbient() {
    const ctx = await this.ensureContext();
    if (!ctx || !this.bgmGain) return;

    if (this.droneOscs.length > 0) {
      // Already running
      return;
    }

    try {
      const now = ctx.currentTime;

      // Filter: Warm deep space lowpass filter with slow resonant sweep
      this.spaceFilter = ctx.createBiquadFilter();
      this.spaceFilter.type = 'lowpass';
      this.spaceFilter.frequency.setValueAtTime(420, now);
      this.spaceFilter.Q.setValueAtTime(1.8, now);

      // LFO for filter breathing (slow 0.07Hz outer space orbital drift)
      this.lfoOsc = ctx.createOscillator();
      this.lfoOsc.type = 'sine';
      this.lfoOsc.frequency.setValueAtTime(0.065, now); // ~15 second breathing cycle

      this.lfoGain = ctx.createGain();
      this.lfoGain.gain.setValueAtTime(220, now); // Swings filter between 200Hz and 640Hz
      this.lfoOsc.connect(this.lfoGain);
      this.lfoGain.connect(this.spaceFilter.frequency);
      this.lfoOsc.start(now);

      // Drone Gain Master
      this.droneGain = ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.0001, now);
      this.droneGain.gain.linearRampToValueAtTime(0.12, now + 3.0); // 3 second gentle fade-in

      // Cosmic Chords (Root A1 = 55Hz, E2 = 82.4Hz, A2 = 110Hz, C#3 = 138.6Hz, E3 = 164.8Hz)
      // Detuned slightly for wide, expansive interstellar texture
      const cosmicFrequencies = [
        { freq: 55.0, detune: -4, type: 'sine' as OscillatorType, vol: 0.35 },
        { freq: 55.0, detune: +4, type: 'sine' as OscillatorType, vol: 0.35 },
        { freq: 110.0, detune: -6, type: 'triangle' as OscillatorType, vol: 0.16 },
        { freq: 110.0, detune: +7, type: 'sine' as OscillatorType, vol: 0.22 },
        { freq: 164.81, detune: -2, type: 'sine' as OscillatorType, vol: 0.18 },
        { freq: 220.0, detune: +3, type: 'sine' as OscillatorType, vol: 0.12 },
        { freq: 329.63, detune: -5, type: 'sine' as OscillatorType, vol: 0.08 },
      ];

      this.droneOscs = cosmicFrequencies.map((cfg) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = cfg.type;
        osc.frequency.setValueAtTime(cfg.freq, now);
        osc.detune.setValueAtTime(cfg.detune, now);
        oscGain.gain.setValueAtTime(cfg.vol, now);

        osc.connect(oscGain);
        oscGain.connect(this.spaceFilter!);
        osc.start(now);
        return osc;
      });

      this.spaceFilter.connect(this.droneGain);
      this.droneGain.connect(this.bgmGain);

      // Schedule periodic tranquil celestial harmonic swells (like distant planetary chimes)
      this.scheduleNextCelestialSwell();

      this.state.isBgmPlaying = true;
      this.notify();
    } catch {
      // Audio engine handle
    }
  }

  /**
   * Plays a random celestial pentatonic swell every 7-12 seconds
   */
  private scheduleNextCelestialSwell() {
    if (this.celestialTimer) {
      window.clearTimeout(this.celestialTimer);
    }

    const nextInterval = 7000 + Math.random() * 6000; // 7 to 13 seconds

    this.celestialTimer = window.setTimeout(async () => {
      if (!this.state.isBgmPlaying || this.state.isMuted) return;

      await this.triggerCelestialNote();
      this.scheduleNextCelestialSwell();
    }, nextInterval);
  }

  /**
   * Generates a soft, glowing cosmic note that resonates through the echo delay
   */
  private async triggerCelestialNote() {
    if (!this.ctx || !this.bgmGain || !this.delayNode) return;

    try {
      const now = this.ctx.currentTime;
      // Celestial harmonic frequencies (A4 pentatonic celestial modes: A, C, D, E, G, High A)
      const celestialPitches = [440.0, 523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
      const pitch = celestialPitches[Math.floor(Math.random() * celestialPitches.length)];

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);

      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(0.045, now + 1.2); // 1.2s soft swell attack
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.0); // 5s long cosmic trail

      osc.connect(noteGain);
      noteGain.connect(this.bgmGain);
      noteGain.connect(this.delayNode); // Send to smooth echo bus

      osc.start(now);
      osc.stop(now + 5.2);

      setTimeout(() => {
        try {
          osc.disconnect();
          noteGain.disconnect();
        } catch {
          // cleanup
        }
      }, 5500);
    } catch {
      // ignore
    }
  }

  /**
   * Stops space ambient background music with smooth fade-out
   */
  public stopSpaceAmbient() {
    if (this.celestialTimer) {
      window.clearTimeout(this.celestialTimer);
      this.celestialTimer = null;
    }

    if (this.droneGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 1.2); // 1.2s smooth fade-out

        setTimeout(() => {
          this.droneOscs.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // ignore
            }
          });
          this.droneOscs = [];

          if (this.lfoOsc) {
            try {
              this.lfoOsc.stop();
              this.lfoOsc.disconnect();
            } catch {
              // ignore
            }
            this.lfoOsc = null;
          }

          if (this.spaceFilter) {
            this.spaceFilter.disconnect();
            this.spaceFilter = null;
          }
        }, 1300);
      } catch {
        this.droneOscs = [];
      }
    } else {
      this.droneOscs = [];
    }

    this.state.isBgmPlaying = false;
    this.notify();
  }

  /**
   * Master sound toggle: toggles all sound on or off
   */
  public async toggleMasterSound(): Promise<boolean> {
    const nextMuted = !this.state.isMuted;
    this.state.isMuted = nextMuted;

    try {
      localStorage.setItem('portfolio_audio_muted', String(nextMuted));
    } catch {
      // ignore
    }

    if (nextMuted) {
      // Mute audio
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
      this.stopSpaceAmbient();
    } else {
      // Unmute audio
      const ctx = await this.ensureContext();
      if (ctx && this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.state.volume, ctx.currentTime);
      }
      // Trigger toggle sound with smooth echo!
      await this.playToggleSound('on');
      // Also automatically start outer space ambient background music smoothly
      this.startSpaceAmbient();
    }

    this.notify();
    return !nextMuted;
  }

  /**
   * Toggle only the space ambient background music
   */
  public async toggleBgm(): Promise<boolean> {
    if (this.state.isMuted) {
      // If currently muted, unmuting enables master audio and BGM
      await this.toggleMasterSound();
      return true;
    }

    if (this.state.isBgmPlaying) {
      this.stopSpaceAmbient();
      try {
        localStorage.setItem('portfolio_audio_bgm', 'false');
      } catch {
        // ignore
      }
      await this.playToggleSound('off');
      return false;
    } else {
      await this.playToggleSound('on');
      await this.startSpaceAmbient();
      try {
        localStorage.setItem('portfolio_audio_bgm', 'true');
      } catch {
        // ignore
      }
      return true;
    }
  }

  /**
   * Toggle only the toggle SFX chimes
   */
  public async toggleSfx(): Promise<boolean> {
    this.state.isSfxEnabled = !this.state.isSfxEnabled;
    try {
      localStorage.setItem('portfolio_audio_sfx', String(this.state.isSfxEnabled));
    } catch {
      // ignore
    }

    if (this.state.isSfxEnabled) {
      await this.playToggleSound('on');
    }
    this.notify();
    return this.state.isSfxEnabled;
  }

  /**
   * Set Master Volume
   */
  public setVolume(val: number) {
    const clamped = Math.max(0, Math.min(1, val));
    this.state.volume = clamped;

    if (this.masterGain && this.ctx && !this.state.isMuted) {
      this.masterGain.gain.setValueAtTime(clamped, this.ctx.currentTime);
    }

    try {
      localStorage.setItem('portfolio_audio_volume', String(clamped));
    } catch {
      // ignore
    }
    this.notify();
  }

  public getState(): AudioSystemState {
    return { ...this.state };
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const current = this.getState();
    this.listeners.forEach((l) => l(current));
  }
}

// Global Audio Singleton
export const audioSystem = new SoundSystem();

/**
 * Convenient helper to trigger the smooth echo sound anywhere in the app on toggle
 */
export const playToggleEcho = (type: 'on' | 'off' | 'generic' = 'generic') => {
  audioSystem.playToggleSound(type);
};
