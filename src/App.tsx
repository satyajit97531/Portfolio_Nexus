/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { LeetCodeSection } from './components/LeetCodeSection';
import { Achievements } from './components/Achievements';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { ResumeModal } from './components/ResumeModal';
import { CertificateModal } from './components/CertificateModal';
import { playToggleEcho, audioSystem, AudioSystemState } from './utils/audioSystem';
import { Volume2, VolumeX, Radio, Sparkles } from 'lucide-react';

export default function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [audioState, setAudioState] = useState<AudioSystemState>(audioSystem.getState());

  useEffect(() => {
    const unsub = audioSystem.subscribe(setAudioState);
    return unsub;
  }, []);

  // Global listener: Play smooth echo sound whenever any interactive toggle or switch is triggered
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Detect buttons, switches, tabs, filter pills, checkboxes, modal triggers
      const interactiveEl = target.closest(
        'button, [role="switch"], [role="tab"], input[type="checkbox"], [data-toggle]'
      );

      if (interactiveEl) {
        // Exclude specific text inputs or submit buttons that have distinct handling
        const isInput = interactiveEl.tagName.toLowerCase() === 'input' && (interactiveEl as HTMLInputElement).type !== 'checkbox';
        if (isInput) return;

        // Trigger smooth echo chime
        playToggleEcho('generic');
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, []);

  const openResume = () => {
    playToggleEcho('on');
    setIsResumeModalOpen(true);
  };

  const closeResume = () => {
    playToggleEcho('off');
    setIsResumeModalOpen(false);
  };

  const openCert = () => {
    playToggleEcho('on');
    setIsCertModalOpen(true);
  };

  const closeCert = () => {
    playToggleEcho('off');
    setIsCertModalOpen(false);
  };

  const openCommandPalette = () => {
    playToggleEcho('on');
    setIsCommandPaletteOpen(true);
  };

  const closeCommandPalette = () => {
    playToggleEcho('off');
    setIsCommandPaletteOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 selection:bg-violet-500/30 selection:text-violet-200">
      {/* Interactive Three.js 3D Canvas Background */}
      <ThreeCanvas />

      {/* Global Ambient Circular Blurred Orbs & Glows */}
      <div className="fixed top-10 left-[15%] w-[520px] h-[520px] rounded-full glow-gradient-violet pointer-events-none z-0 opacity-50 blur-[130px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="fixed top-[45%] right-[10%] w-[580px] h-[580px] rounded-full glow-gradient-cyan pointer-events-none z-0 opacity-40 blur-[140px] animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="fixed bottom-[10%] left-[20%] w-[480px] h-[480px] rounded-full glow-gradient-indigo pointer-events-none z-0 opacity-45 blur-[120px] animate-pulse" style={{ animationDuration: '9s' }} />

      {/* Navigation Dock */}
      <Navbar
        onOpenCommandPalette={openCommandPalette}
        onOpenResumeModal={openResume}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 01 System Nexus */}
        <Hero
          onOpenResumeModal={openResume}
          onOpenCertModal={openCert}
        />

        {/* 02 Engineer Profile */}
        <About
          onOpenCertModal={openCert}
        />

        {/* 03 Tech Arsenal */}
        <Skills />

        {/* 04 Production Systems */}
        <Projects />

        {/* 05 Algorithmic Engine */}
        <LeetCodeSection />

        {/* 06 Milestones & Honors */}
        <Achievements
          onOpenCertModal={openCert}
        />

        {/* 07 Academic Foundation */}
        <Education />

        {/* 08 Dispatch Channel */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick Cosmic Audio Indicator & Toggle */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          id="floating-space-audio-toggle"
          onClick={async () => {
            playToggleEcho(audioState.isMuted ? 'on' : 'off');
            await audioSystem.toggleMasterSound();
          }}
          className={`ios-glass-card group px-3 py-2 rounded-full border flex items-center gap-2 font-mono text-xs shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300 ${
            !audioState.isMuted && audioState.isBgmPlaying
              ? 'bg-violet-950/70 border-violet-400/40 text-violet-200 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
              : !audioState.isMuted
              ? 'bg-slate-900/80 border-white/20 text-slate-200'
              : 'bg-slate-900/70 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/25'
          }`}
          title={
            !audioState.isMuted && audioState.isBgmPlaying
              ? 'Cosmic Space Music Active · Click to Mute'
              : 'Cosmic Audio Muted · Click to Activate Outer Space Ambient Music'
          }
          aria-label="Toggle Space Ambient Audio"
        >
          {!audioState.isMuted && audioState.isBgmPlaying ? (
            <>
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 bg-violet-400 rounded-full animate-pulse" style={{ height: '100%', animationDuration: '0.6s' }} />
                <span className="w-0.5 bg-sky-400 rounded-full animate-pulse" style={{ height: '60%', animationDuration: '0.9s' }} />
                <span className="w-0.5 bg-emerald-400 rounded-full animate-pulse" style={{ height: '80%', animationDuration: '0.7s' }} />
              </div>
              <span className="text-[11px] font-medium hidden sm:inline">Space Ambient</span>
            </>
          ) : !audioState.isMuted ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-[11px] hidden sm:inline">Sound Active</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-400 transition-colors" />
              <span className="text-[11px] hidden sm:inline">Sound Muted</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Modals */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={closeCommandPalette}
        onOpenResumeModal={openResume}
        onOpenCertModal={openCert}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={closeResume}
        onOpenCertModal={() => {
          closeResume();
          openCert();
        }}
      />

      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={closeCert}
      />
    </div>
  );
}
