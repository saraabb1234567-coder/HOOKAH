/**
 * Optional Web Audio synthesizer for ambient hookah sound & gentle bubbling.
 * Zero external audio files required. Completely clean and performant.
 */
class HookahAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private bubbleTimer: number | null = null;
  private ambientGain: GainNode | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public toggle(): boolean {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    this.init();
    if (!this.ctx) return;
    this.isPlaying = true;

    // Ambient sub drone
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note sub

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      this.ambientGain = gain;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();

      // Start gentle random water bubbles
      this.scheduleBubble();
    } catch {
      // Audio autoplay policy handled gracefully
    }
  }

  private scheduleBubble() {
    if (!this.isPlaying || !this.ctx) return;

    this.playSingleBubble();
    const nextInterval = Math.random() * 800 + 400; // between 400ms and 1200ms
    this.bubbleTimer = window.setTimeout(() => this.scheduleBubble(), nextInterval);
  }

  public playSingleBubble() {
    if (!this.ctx || this.ctx.state === 'suspended') return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const startFreq = 300 + Math.random() * 200;
      const endFreq = startFreq + 150 + Math.random() * 100;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // silent
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.bubbleTimer) {
      clearTimeout(this.bubbleTimer);
      this.bubbleTimer = null;
    }
    if (this.ctx && this.ctx.state === 'running') {
      try {
        this.ctx.suspend();
      } catch {
        // silent
      }
    }
  }
}

export const audioEngine = new HookahAudioEngine();
