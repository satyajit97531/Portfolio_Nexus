import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Volume1,
  Sparkles,
  Music,
  Radio,
  Sliders,
  Check,
  ChevronDown
} from 'lucide-react';
import { audioSystem, AudioSystemState, playToggleEcho } from '../utils/audioSystem';

interface SoundToggleProps {
  className?: string;
  variant?: 'navbar' | 'floating';
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ className = '', variant = 'navbar' }) => {
  const [audioState, setAudioState] = useState<AudioSystemState>(audioSystem.getState());
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = audioSystem.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handlePrimaryClick = async () => {
    // If muted, turn on master sound and start space ambient music
    if (audioState.isMuted) {
      await audioSystem.toggleMasterSound();
    } else {
      // Toggle dropdown or quick mute
      await audioSystem.toggleMasterSound();
    }
  };

  const handleToggleBgm = async (e: React.MouseEvent) => {
    e.stopPropagation();
    playToggleEcho(audioState.isBgmPlaying ? 'off' : 'on');
    await audioSystem.toggleBgm();
  };

  const handleToggleSfx = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await audioSystem.toggleSfx();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    audioSystem.setVolume(val);
  };

  const isSoundActive = !audioState.isMuted;
  const isCosmicBgmActive = isSoundActive && audioState.isBgmPlaying;

  return (
    <div className={`relative inline-block ${className}`} ref={menuRef}>
      {/* Primary Toggle Button */}
      <div className="flex items-center">
        <button
          id="sound-toggle-master-btn"
          onClick={handlePrimaryClick}
          className={`ios-glass-pill px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
            isCosmicBgmActive
              ? 'bg-violet-600/30 text-white border-violet-400/40 shadow-[0_0_15px_rgba(168,85,247,0.35)]'
              : isSoundActive
              ? 'bg-white/[0.08] text-violet-300 border-white/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title={isSoundActive ? 'Sound Enabled · Click to Mute' : 'Cosmic Audio Muted · Click to Enable Space Ambient'}
          aria-label="Toggle Sound and Space Ambient Music"
        >
          {isCosmicBgmActive ? (
            <>
              {/* Dynamic Soundwave Equalizer Bars */}
              <div className="flex items-center gap-0.5 h-3.5 px-0.5" aria-hidden="true">
                <span className="w-0.5 bg-violet-400 rounded-full animate-pulse" style={{ height: '70%', animationDuration: '0.8s' }} />
                <span className="w-0.5 bg-sky-400 rounded-full animate-pulse" style={{ height: '100%', animationDuration: '0.5s' }} />
                <span className="w-0.5 bg-emerald-400 rounded-full animate-pulse" style={{ height: '50%', animationDuration: '0.7s' }} />
                <span className="w-0.5 bg-violet-300 rounded-full animate-pulse" style={{ height: '90%', animationDuration: '0.6s' }} />
              </div>
              <span className="text-[11px] font-semibold text-violet-200 hidden md:inline">Space Ambient</span>
            </>
          ) : isSoundActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-[11px] hidden md:inline">Sound On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200" />
              <span className="text-[11px] hidden md:inline">Sound Off</span>
            </>
          )}
        </button>

        {/* Small dropdown options arrow */}
        <button
          id="sound-menu-toggle-btn"
          onClick={(e) => {
            e.stopPropagation();
            playToggleEcho(isOpen ? 'off' : 'on');
            setIsOpen(!isOpen);
          }}
          className={`ios-glass-pill ml-1 p-1.5 rounded-full text-slate-400 hover:text-white transition-all ${
            isOpen ? 'bg-white/10 text-white' : ''
          }`}
          title="Audio Controls & Space Music Options"
          aria-label="Open Audio Controls"
        >
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180 text-violet-400' : ''}`} />
        </button>
      </div>

      {/* Dropdown / Audio Settings Flyout */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 mt-2.5 w-72 sm:w-80 rounded-2xl p-4 bg-[#0a0d16]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50 text-xs font-mono pointer-events-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-violet-400 animate-pulse" />
                <span className="font-bold text-white text-xs tracking-wide">Cosmic Audio System</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                Web Audio Engine
              </span>
            </div>

            <div className="space-y-3.5 pt-3">
              {/* Master Mute / Unmute Toggle */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${!audioState.isMuted ? 'bg-violet-500/20 text-violet-300' : 'bg-white/5 text-slate-400'}`}>
                    {!audioState.isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">Master Sound</div>
                    <div className="text-[10px] text-slate-400">All audio output</div>
                  </div>
                </div>

                <button
                  onClick={async () => {
                    playToggleEcho(audioState.isMuted ? 'on' : 'off');
                    await audioSystem.toggleMasterSound();
                  }}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                    !audioState.isMuted ? 'bg-violet-600' : 'bg-white/20'
                  }`}
                  role="switch"
                  aria-checked={!audioState.isMuted}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      !audioState.isMuted ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Space Ambient Music Controller */}
              <div className="p-2.5 rounded-xl bg-violet-950/20 border border-violet-500/25 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg ${isCosmicBgmActive ? 'bg-violet-500/30 text-violet-200' : 'bg-white/5 text-slate-400'}`}>
                      <Music className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs flex items-center gap-1.5">
                        <span>Space Ambient Music</span>
                        {isCosmicBgmActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        )}
                      </div>
                      <div className="text-[10px] text-violet-300">Calm, smooth outer space drone</div>
                    </div>
                  </div>

                  <button
                    onClick={handleToggleBgm}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                      isCosmicBgmActive ? 'bg-violet-600' : 'bg-white/20'
                    }`}
                    role="switch"
                    aria-checked={isCosmicBgmActive}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        isCosmicBgmActive ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="text-[10px] text-slate-400 font-sans leading-tight pl-0.5">
                  Multi-layered warm cosmic pads, gentle breathing resonant filter, and celestial harmonic swells.
                </div>
              </div>

              {/* Smooth Echo Toggle Chimes */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${audioState.isSfxEnabled ? 'bg-sky-500/20 text-sky-300' : 'bg-white/5 text-slate-400'}`}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">Smooth Echo Chimes</div>
                    <div className="text-[10px] text-slate-400">Harmonic feedback on UI toggles</div>
                  </div>
                </div>

                <button
                  onClick={handleToggleSfx}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                    audioState.isSfxEnabled ? 'bg-sky-600' : 'bg-white/20'
                  }`}
                  role="switch"
                  aria-checked={audioState.isSfxEnabled}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      audioState.isSfxEnabled ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Master Volume Slider */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Sliders className="w-3 h-3" />
                    <span>Volume</span>
                  </span>
                  <span className="font-bold text-violet-400">{Math.round(audioState.volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.05"
                  value={audioState.volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-violet-500"
                />
              </div>

              {/* Test Smooth Echo Sound Button */}
              <div className="pt-2 border-t border-white/[0.08]">
                <button
                  onClick={() => {
                    playToggleEcho('on');
                  }}
                  className="w-full py-1.5 px-3 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] text-slate-200 hover:text-white text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                >
                  <Sparkles className="w-3 h-3 text-violet-400" />
                  <span>Preview Smooth Echo Sound</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
