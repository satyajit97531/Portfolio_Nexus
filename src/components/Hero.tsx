import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  Terminal,
  Send,
  FileText,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Copy,
  ExternalLink,
  MapPin,
  Sparkles,
  Smartphone,
  Cpu,
  Download
} from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { triggerResumeDownload } from '../utils/downloadResume';

interface HeroProps {
  onOpenResumeModal: () => void;
  onOpenCertModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal, onOpenCertModal }) => {
  const [copied, setCopied] = useState(false);

  const copyContact = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
        
        {/* Left Column - Main Pitch */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          
          {/* Top Status Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="ios-glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono text-violet-300 border border-violet-400/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
              </span>
              <span>Available for Internships & Full-Time Roles</span>
            </div>

            <div className="ios-glass-pill px-3 py-1.5 rounded-full text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-sky-400" />
              <span>Janakpuri, New Delhi</span>
            </div>
          </div>

          {/* Main Name & Title */}
          <div className="space-y-2">
            <div className="font-mono text-xs text-violet-400 tracking-wider uppercase font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Systems Builder · B.Tech (CSE) 4th Year</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-display">
              SATYAJIT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-300 to-emerald-300">
                SAMANTA
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed pt-2">
              B.Tech Computer Science student at <span className="text-white font-medium">Delhi Global Institute of Technology (DGIT)</span>, affiliated with <span className="text-white font-medium">Maharshi Dayanand University</span>. Engineering scalable <span className="text-sky-300 font-medium">MERN stack platforms</span>, on-premise <span className="text-purple-300 font-medium">Ollama AI inference</span>, and <span className="text-amber-300 font-medium">certified native iOS</span> solutions.
            </p>
          </div>

          {/* Quick Telemetry Chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="ios-glass-pill px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 flex items-center gap-1.5 border border-white/10">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>MERN + Ollama AI</span>
            </span>
            <button
              onClick={onOpenCertModal}
              className="ios-glass-pill px-3.5 py-1.5 rounded-full text-xs font-mono text-amber-300 hover:text-white flex items-center gap-1.5 border border-amber-400/30 hover:border-amber-400 transition-colors"
              title="Click to view iOS Certification"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>iOS Certified</span>
            </button>
            <a
              href={profileData.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="ios-glass-pill px-3.5 py-1.5 rounded-full text-xs font-mono text-emerald-300 hover:text-white flex items-center gap-1.5 border border-emerald-400/30 hover:border-emerald-400 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>LeetCode @satyajitzzzzz</span>
            </a>
            <span className="ios-glass-pill px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-400 border border-white/10">
              Roll: 23DGITM425
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              id="hero-explore-btn"
              onClick={() => scrollTo('projects')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-mono text-xs sm:text-sm font-bold flex items-center gap-2 shadow-[0_0_24px_rgba(168,85,247,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Systems</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              id="hero-download-cv-btn"
              onClick={triggerResumeDownload}
              className="px-5 py-3 rounded-full bg-gradient-to-r from-emerald-600/90 to-teal-600/90 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02]"
              title="Download Satyajit Samanta Official Resume in PDF format"
            >
              <Download className="w-4 h-4 text-emerald-200" />
              <span>Download CV (PDF)</span>
            </button>

            <button
              id="hero-resume-btn"
              onClick={onOpenResumeModal}
              className="ios-glass-pill px-5 py-3 rounded-full text-slate-200 hover:text-white font-mono text-xs sm:text-sm font-semibold flex items-center gap-2 border border-white/15 hover:border-white/30 transition-all hover:bg-white/[0.08]"
            >
              <FileText className="w-4 h-4 text-sky-400" />
              <span>View Resume</span>
            </button>

            <a
              id="hero-whatsapp-btn"
              href={profileData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ios-glass-pill px-4 py-3 rounded-full text-emerald-300 hover:text-white font-mono text-xs sm:text-sm font-medium flex items-center gap-2 border border-emerald-500/30 hover:border-emerald-400 transition-all hover:bg-emerald-500/10"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <button
              id="hero-copy-email-btn"
              onClick={copyContact}
              className="ios-glass-pill p-3 rounded-full text-slate-300 hover:text-white transition-all"
              title="Copy Email Address"
            >
              {copied ? (
                <span className="text-xs text-emerald-400 font-mono">Copied!</span>
              ) : (
                <Copy className="w-4 h-4 text-slate-400 hover:text-slate-200" />
              )}
            </button>
          </div>

        </div>

        {/* Right Column - High-Tech Interactive Terminal Card */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="ios-glass-card rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
          >
            {/* Terminal Window Bar */}
            <div className="bg-white/[0.04] px-5 py-3.5 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/40" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/40" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/40" />
              </div>
              <div className="font-mono text-[11px] text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-violet-400" />
                <span>satyajit@nexus-core: ~</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                LIVE
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-xs space-y-4">
              <div>
                <span className="text-violet-400">$ </span>
                <span className="text-slate-200">whoami --verbose</span>
              </div>

              <div className="space-y-2 text-slate-300 bg-black/30 p-4 rounded-2xl border border-white/[0.05]">
                <div className="flex justify-between border-b border-white/[0.05] pb-1.5">
                  <span className="text-slate-400">ENGINEER:</span>
                  <span className="text-white font-semibold">{profileData.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.05] pb-1.5">
                  <span className="text-slate-400">DEGREE:</span>
                  <span className="text-sky-300 font-medium">B.Tech CSE (Sem 7)</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.05] pb-1.5">
                  <span className="text-slate-400">COLLEGE:</span>
                  <span className="text-slate-200 text-right truncate max-w-[200px]" title={profileData.currentCollege}>
                    DGIT / MDU
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/[0.05] pb-1.5">
                  <span className="text-slate-400">SCHOOL:</span>
                  <span className="text-slate-300 text-right truncate max-w-[200px]">
                    Vinay Nagar Sr. Sec.
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/[0.05] pb-1.5">
                  <span className="text-slate-400">LOCATION:</span>
                  <span className="text-slate-200">Janakpuri / Sagarpur, DL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">TRAINING:</span>
                  <span className="text-amber-300 font-semibold cursor-pointer hover:underline" onClick={onOpenCertModal}>
                    iOS Development (SKLZ TECT)
                  </span>
                </div>
              </div>

              <div>
                <span className="text-violet-400">$ </span>
                <span className="text-slate-200">cat system_capabilities.json</span>
              </div>

              <div className="text-slate-400 bg-black/30 p-3 rounded-xl border border-white/[0.05] text-[11px] leading-relaxed overflow-x-auto">
                <span className="text-violet-300">&#123;</span>
                <div className="pl-4">
                  <span className="text-sky-300">"frontend"</span>: <span className="text-slate-200">["Next.js", "React 19", "Tailwind CSS", "TypeScript"]</span>,<br />
                  <span className="text-sky-300">"backend"</span>: <span className="text-slate-200">["Node.js", "Express", "MongoDB", "REST APIs"]</span>,<br />
                  <span className="text-sky-300">"mobile_ai"</span>: <span className="text-amber-300">["Swift / iOS", "Ollama LLM Integrations"]</span>,<br />
                  <span className="text-sky-300">"problem_solving"</span>: <span className="text-emerald-300">["LeetCode Core", "DSA", "Figma UI/UX"]</span>
                </div>
                <span className="text-violet-300">&#125;</span>
              </div>

              {/* Status Action */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified DGIT Roll: {profileData.rollNo}</span>
                </div>
                <button
                  onClick={() => scrollTo('contact')}
                  className="text-violet-400 hover:text-violet-300 underline underline-offset-2 flex items-center gap-1"
                >
                  <span>Dispatch Ping</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>

            </div>
          </motion.div>
        </div>

      </div>

      {/* Bottom subtle scroll hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 font-mono text-[10px]">
        <span>SCROLL TO EXPLORE ARCHITECTURE</span>
        <div className="w-1 h-5 rounded-full bg-slate-700 overflow-hidden relative">
          <div className="w-full h-2 rounded-full bg-violet-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
