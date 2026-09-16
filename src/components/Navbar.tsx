import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  User,
  Cpu,
  Code2,
  Trophy,
  GraduationCap,
  Send,
  Search,
  ExternalLink,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { SoundToggle } from './SoundToggle';
import { playToggleEcho } from '../utils/audioSystem';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResumeModal?: () => void;
}

const navItems = [
  { id: 'hero', label: 'System Nexus', shortLabel: 'Nexus', index: '01', icon: Terminal },
  { id: 'about', label: 'Engineer Profile', shortLabel: 'Profile', index: '02', icon: User },
  { id: 'skills', label: 'Tech Arsenal', shortLabel: 'Arsenal', index: '03', icon: Cpu },
  { id: 'projects', label: 'Production Systems', shortLabel: 'Systems', index: '04', icon: Code2 },
  { id: 'cp', label: 'Algorithmic Arena', shortLabel: 'DSA/CP', index: '05', icon: Sparkles },
  { id: 'achievements', label: 'Milestones & Honors', shortLabel: 'Honors', index: '06', icon: Trophy },
  { id: 'education', label: 'Academic Foundation', shortLabel: 'Education', index: '07', icon: GraduationCap },
  { id: 'contact', label: 'Dispatch Channel', shortLabel: 'Dispatch', index: '08', icon: Send },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette, onOpenResumeModal }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Progress calculation
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Section spy
      const scrollPos = window.scrollY + 240;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top scroll reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/[0.04]">
        <div
          className="h-full bg-gradient-to-r from-violet-500 via-sky-400 to-emerald-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="fixed top-3 sm:top-5 left-0 right-0 z-40 px-3 sm:px-6 max-w-7xl mx-auto pointer-events-none">
        <nav
          id="main-navigation"
          className="pointer-events-auto ios-glass-dock rounded-2xl sm:rounded-full px-3.5 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
        >
          {/* Logo & Identity */}
          <button
            id="nav-brand-btn"
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600/80 to-indigo-700/80 flex items-center justify-center text-white font-bold font-mono text-sm border border-violet-400/30 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(168,85,247,0.35)]">
              SS
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1 font-mono">
                Satyajit<span className="text-violet-400">.dev</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                Full-Stack · MERN · iOS
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden xl:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.06]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDockPill"
                      className="absolute inset-0 rounded-full bg-violet-600/30 border border-violet-400/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-violet-300' : 'text-slate-400'}`} />
                  <span className="relative z-10">{item.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Sound & Space Ambient Music Toggle */}
            <SoundToggle />

            {/* Command Palette Trigger */}
            <button
              id="cmd-k-btn"
              onClick={() => {
                playToggleEcho('generic');
                onOpenCommandPalette();
              }}
              className="ios-glass-pill px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5"
              title="Search & Command Palette (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-violet-400" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden sm:inline text-[10px] bg-white/[0.08] px-1.5 py-0.5 rounded-full text-slate-400 border border-white/[0.08]">
                ⌘K
              </kbd>
            </button>

            {/* GitHub Profile */}
            <a
              id="github-nav-link"
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ios-glass-pill px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5"
              title="GitHub Repositories"
            >
              <span className="hidden sm:inline">GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            {/* Mobile Hamburger */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => {
                playToggleEcho(mobileMenuOpen ? 'off' : 'on');
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="xl:hidden ios-glass-pill p-2 rounded-full text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="xl:hidden mt-2 pointer-events-auto"
            >
              <div className="ios-glass-card rounded-3xl p-4 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs mb-3">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        id={`mobile-nav-${item.id}`}
                        onClick={() => {
                          playToggleEcho('generic');
                          scrollTo(item.id);
                        }}
                        className={`p-2.5 rounded-xl text-left flex items-center gap-2 border transition-all ${
                          isActive
                            ? 'bg-violet-500/25 border-violet-400/40 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                            : 'bg-white/[0.04] border-white/[0.06] text-slate-300 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-violet-400 shrink-0" />
                        <span className="truncate">{item.shortLabel}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-white/[0.08] flex items-center gap-2">
                  <div className="shrink-0">
                    <SoundToggle />
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      playToggleEcho('generic');
                      onOpenCommandPalette();
                    }}
                    className="flex-1 py-2.5 px-3 rounded-full bg-violet-600/90 hover:bg-violet-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search & Command Palette (⌘K)</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
