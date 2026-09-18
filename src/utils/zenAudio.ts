/**
 * zenAudio.ts - Pure Web Audio API Sound Synthesizer
 * Zero external audio files required, zero latency, guaranteed browser compatibility.
 */

class ZenAudioManager {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private toneOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private isAmbientPlaying: boolean = false;
  private activeSoundscape: string | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Plays a soft crystal chime or bell note
   */
  playChime(freq: number = 528, duration: number = 2.5) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.99, now + duration);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {}
  }

  /**
   * Plays a resonant Tibetan Singing Bowl tone with harmonic overtones
   */
  playSingingBowl(baseFreq: number = 216) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const duration = 6.0;

      const harmonics = [1, 2.01, 3.02, 4.8];
      const gains = [0.25, 0.12, 0.06, 0.02];

      harmonics.forEach((h, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * h, now);

        gain.gain.setValueAtTime(gains[i], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
      });
    } catch {}
  }

  /**
   * Plays a water droplet sound for peaceful garden planting
   */
  playWaterDrop() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(2200, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {}
  }

  /**
   * Plays a soft bubble pop
   */
  playBubblePop(freq: number = 440) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.6, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  /**
   * Starts ambient soothing sound generator (Binaural 432Hz / Rain / Singing Bowl loop)
   */
  startAmbient(type: '432hz' | 'rain' | 'ocean' | 'bowls', volume: number = 0.35) {
    this.stopAmbient();
    this.initContext();
    if (!this.ctx) return;

    this.isAmbientPlaying = true;
    this.activeSoundscape = type;

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 1.5);
    masterGain.connect(this.ctx.destination);
    this.ambientGain = masterGain;

    if (type === '432hz') {
      const carrier = 432;
      const beatFreq = 10;

      const oscL = this.ctx.createOscillator();
      const oscR = this.ctx.createOscillator();
      const gainL = this.ctx.createGain();
      const gainR = this.ctx.createGain();

      oscL.type = 'sine';
      oscL.frequency.setValueAtTime(carrier, this.ctx.currentTime);
      oscR.type = 'sine';
      oscR.frequency.setValueAtTime(carrier + beatFreq, this.ctx.currentTime);

      gainL.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gainR.gain.setValueAtTime(0.2, this.ctx.currentTime);

      const merger = this.ctx.createChannelMerger(2);
      oscL.connect(gainL);
      gainL.connect(merger, 0, 0);

      oscR.connect(gainR);
      gainR.connect(merger, 0, 1);

      merger.connect(masterGain);

      oscL.start();
      oscR.start();

      this.toneOscillators.push({ osc: oscL, gain: gainL }, { osc: oscR, gain: gainR });
    } else if (type === 'rain' || type === 'ocean') {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
        b6 = white * 0.115926;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      const filter = this.ctx.createBiquadFilter();
      if (type === 'rain') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      } else {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(350, this.ctx.currentTime);
        filter.Q.setValueAtTime(1.2, this.ctx.currentTime);
      }

      noiseSource.connect(filter);
      filter.connect(masterGain);
      noiseSource.start();
      this.noiseNode = noiseSource;
    } else if (type === 'bowls') {
      const freqs = [108, 216, 324, 432];
      freqs.forEach((f) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.08 / freqs.length, this.ctx.currentTime);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        this.toneOscillators.push({ osc, gain });
      });
    }
  }

  setAmbientVolume(volume: number) {
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.linearRampToValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime + 0.1);
    }
  }

  stopAmbient() {
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        this.toneOscillators.forEach(({ osc }) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        this.toneOscillators = [];
        if (this.noiseNode) {
          try {
            (this.noiseNode as AudioBufferSourceNode).stop();
            this.noiseNode.disconnect();
          } catch {}
          this.noiseNode = null;
        }
      }, 550);
    }
    this.isAmbientPlaying = false;
    this.activeSoundscape = null;
  }

  getIsPlaying() {
    return this.isAmbientPlaying;
  }

  getActiveSoundscape() {
    return this.activeSoundscape;
  }
}

export const zenAudio = new ZenAudioManager();
