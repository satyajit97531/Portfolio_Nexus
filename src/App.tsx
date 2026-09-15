/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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

export default function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

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
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 01 System Nexus */}
        <Hero
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onOpenCertModal={() => setIsCertModalOpen(true)}
        />

        {/* 02 Engineer Profile */}
        <About
          onOpenCertModal={() => setIsCertModalOpen(true)}
        />

        {/* 03 Tech Arsenal */}
        <Skills />

        {/* 04 Production Systems */}
        <Projects />

        {/* 05 Algorithmic Engine */}
        <LeetCodeSection />

        {/* 06 Milestones & Honors */}
        <Achievements
          onOpenCertModal={() => setIsCertModalOpen(true)}
        />

        {/* 07 Academic Foundation */}
        <Education />

        {/* 08 Dispatch Channel */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenCertModal={() => setIsCertModalOpen(true)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onOpenCertModal={() => {
          setIsResumeModalOpen(false);
          setIsCertModalOpen(true);
        }}
      />

      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
      />
    </div>
  );
}
