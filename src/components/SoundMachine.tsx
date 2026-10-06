import { useState, useRef, useEffect } from 'react';
import { useT } from '../i18n';

export default function SoundMachine() {
  const t = useT();
  const sm = t.soundMachine;
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundType, setSoundType] = useState<'brown' | 'rain' | 'white'>('brown');
  const [volume, setVolume] = useState(0.2);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<AudioNode | null>(null);

  const stopAudio = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const startAudio = () => {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (soundType === 'brown') {
        // Brown noise: integrate white noise for deep rumble
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      } else if (soundType === 'rain') {
        // Pink/rain noise filter
        const pink = (lastOut + 0.08 * white) / 1.08;
        lastOut = pink;
        output[i] = pink * 2.5;
      } else {
        // White noise
        output[i] = white * 0.4;
      }
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gainNodeRef.current = gain;

    whiteNoise.connect(gain);
    gain.connect(ctx.destination);
    whiteNoise.start(0);

    sourceNodeRef.current = whiteNoise;
    setIsPlaying(true);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  // Adjust volume dynamically
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Restart on soundType change if playing
  useEffect(() => {
    if (isPlaying) {
      stopAudio();
      setTimeout(startAudio, 50);
    }
  }, [soundType]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="card sound-machine-card">
      <div className="sound-machine-header">
        <span className="sound-icon" aria-hidden="true">🎧</span>
        <div>
          <h3>{sm.title}</h3>
          <p className="muted-text">{sm.desc}</p>
        </div>
      </div>

      <div className="sound-machine-controls">
        <button
          type="button"
          className={`btn ${isPlaying ? 'btn--accent' : 'btn--primary'}`}
          onClick={toggleSound}
          aria-pressed={isPlaying}
        >
          {isPlaying ? `⏸️ ${sm.mute}` : `▶️ ${sm.play}`}
        </button>

        <div className="choice__options">
          {(['brown', 'rain', 'white'] as const).map((type) => (
            <button
              key={type}
              type="button"
              className={`choice-pill ${soundType === type ? 'active' : ''}`}
              onClick={() => setSoundType(type)}
            >
              {sm.types[type]}
            </button>
          ))}
        </div>

        <div className="volume-slider">
          <label htmlFor="sound-vol">{sm.volume}: {Math.round(volume * 100)}%</label>
          <input
            id="sound-vol"
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
