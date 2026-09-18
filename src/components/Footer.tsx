import React from 'react';
import { ArrowUp, Heart, Terminal, Shield, Sparkles, Download, Archive, FileText } from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { triggerResumeDownload, triggerSourceCodeDownload } from '../utils/downloadResume';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#05070b] py-14 px-4 sm:px-6 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Identity */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-base font-display">
              <div className="w-6 h-6 rounded-lg bg-violet-600/80 flex items-center justify-center text-white text-xs font-mono font-bold">
                SS
              </div>
              <span>Satyajit Samanta</span>
              <span className="text-violet-400 font-mono text-xs">// Portfolio Nexus</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed font-sans">
              B.Tech CSE student affiliated with Maharshi Dayanand University (MDU), building resilient MERN stack platforms, on-premise Ollama AI integrations, and native iOS applications.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Status: Ready for 2026/2027 Engineering Roles & Internships</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="text-white uppercase font-bold text-xs tracking-wider">
              Navigation
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#hero" className="hover:text-violet-300 transition-colors">
                  01 // System Nexus
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-violet-300 transition-colors">
                  02 // Engineer Profile
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-violet-300 transition-colors">
                  03 // Tech Arsenal
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-violet-300 transition-colors">
                  04 // Production Systems
                </a>
              </li>
              <li>
                <a href="#cp" className="hover:text-violet-300 transition-colors">
                  05 // Algorithmic Engine
                </a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-violet-300 transition-colors">
                  06 // Milestones & Honors
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-violet-300 transition-colors">
                  07 // Academic Foundation
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-violet-300 transition-colors">
                  08 // Dispatch Channel
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Coordinates */}
          <div className="space-y-2">
            <div className="text-white uppercase font-bold text-xs tracking-wider">
              Direct Channels
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-violet-300 transition-colors"
                >
                  GitHub: satyajit97531
                </a>
              </li>
              <li>
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-sky-300 transition-colors"
                >
                  LinkedIn: satyajit-samanta
                </a>
              </li>
              <li>
                <a
                  href={profileData.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors"
                >
                  LeetCode: @satyajitzzzzz
                </a>
              </li>
              <li>
                <a
                  href={profileData.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-300 transition-colors"
                >
                  WhatsApp: +91 8076522382
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profileData.email}`}
                  className="hover:text-rose-300 transition-colors"
                >
                  Email: {profileData.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Action Bar for Downloads */}
        <div className="p-4 rounded-3xl bg-white/[0.02] border border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Archive className="w-4 h-4 text-violet-400" />
            <span>Standalone Project Deliverables & Resume:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={triggerResumeDownload}
              className="ios-glass-pill px-4 py-2 rounded-full text-emerald-300 hover:text-white flex items-center gap-1.5 border border-emerald-500/30 hover:border-emerald-400 text-xs transition-all hover:bg-emerald-500/10"
              title="Download Satyajit Samanta Resume as standard PDF"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download CV (.PDF)</span>
            </button>

            <button
              onClick={triggerSourceCodeDownload}
              className="ios-glass-pill px-4 py-2 rounded-full text-violet-300 hover:text-white flex items-center gap-1.5 border border-violet-500/30 hover:border-violet-400 text-xs transition-all hover:bg-violet-500/10"
              title="Download verified, standalone portfolio source code folder (.ZIP)"
            >
              <Download className="w-3.5 h-3.5 text-violet-400" />
              <span>Download Project (.ZIP)</span>
            </button>
          </div>
        </div>

        {/* Telemetry Bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-4 flex-wrap">
            <span>MDU CSE Roll: 23DGITM425</span>
            <span>·</span>
            <span>Location: Janakpuri, New Delhi</span>
            <span>·</span>
            <span>SKLZ TECT iOS Certified</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="ios-glass-pill px-3.5 py-1.5 rounded-full text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
