import React from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  Cpu,
  Smartphone,
  Figma,
  CheckCircle2,
  Terminal,
  Quote,
  Flame,
  Award,
  BookOpen,
  ExternalLink
} from 'lucide-react';
import { profileData } from '../data/portfolioData';

interface AboutProps {
  onOpenCertModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenCertModal }) => {
  const pillars = [
    {
      icon: Layers,
      title: 'Full-Stack MERN & Next.js Architecture',
      tag: 'Core Discipline',
      techBadges: ['Next.js', 'React 19', 'Node.js', 'Express.js', 'MongoDB'],
      color: 'from-sky-500/20 to-indigo-500/10 border-sky-500/30 text-sky-400',
      description:
        'Designing production-grade, SEO-optimized web systems with Next.js (App Router, Server Components & SSR/SSG), React 19, Node.js, and MongoDB. Focusing on resilient database schemas, JWT authentication, and fluid reactive UI rendering.',
    },
    {
      icon: Cpu,
      title: 'Localized Ollama AI Integration',
      tag: 'AI Engineering',
      techBadges: ['Ollama AI', 'Local LLMs', 'Confidential Data', 'Zero-API Cost'],
      color: 'from-violet-500/20 to-purple-500/10 border-violet-500/30 text-violet-400',
      description:
        'Pioneering on-premise AI model execution with Ollama. Eliminating recurring third-party API dependencies and guaranteeing 100% confidential user data retention in healthcare and service applications.',
    },
    {
      icon: Smartphone,
      title: 'Native iOS & Mobile Craft',
      tag: 'Certified Competence',
      techBadges: ['Swift', 'Xcode', 'Apple HIG', 'SKLZ TECT'],
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
      description:
        'Completed intensive 8-week iOS Development training with SKLZ TECT LLP at MERI. Proficient in Swift programming, Xcode architecture, Apple HIG standards, and mobile UI lifecycle management.',
    },
    {
      icon: Figma,
      title: 'UI/UX & Interactive Prototyping',
      tag: 'Design Systems',
      techBadges: ['Figma', 'Atomic Design', 'Tailwind CSS', 'Design Tokens'],
      color: 'from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-400',
      description:
        'Crafting high-fidelity mockups, dark-themed gaming storefronts (Games 24), design tokens, and user journeys in Figma prior to implementing pixel-perfect frontend code.',
    },
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 cyber-grid">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-violet-400 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span>02 // ENGINEER PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Systems Thinking, Craft & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">
              Modern Full-Stack Execution
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Synthesizing computer science fundamentals, full-stack web platforms, and mobile development to create fast, reliable software systems.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Bio & Career Objective */}
          <div className="lg:col-span-6 space-y-6">
            <div className="ios-glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-white/10">
              <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Satyajit Samanta</h3>
                  <p className="text-xs font-mono text-slate-400">
                    B.Tech CSE (4th Year / Sem 7) · DGIT / MDU
                  </p>
                </div>
              </div>

              {/* Career Objective from Resume */}
              <div className="relative bg-black/40 p-5 rounded-xl border border-violet-500/20 space-y-2">
                <Quote className="w-5 h-5 text-violet-400/60 mb-1" />
                <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                  "{profileData.careerObjective}"
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Resume Objective · Roll 23DGITM425</span>
                  <span className="text-violet-400">DGIT, Haryana</span>
                </div>
              </div>

              {/* Bio description */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  I am a pre-final year Computer Science Engineering undergraduate studying at <strong className="text-white">Delhi Global Institute of Technology (DGIT)</strong> in Jhajjar, Haryana under <strong className="text-white">Maharshi Dayanand University</strong>, living in Janakpuri / Sagarpur, New Delhi.
                </p>
                <p>
                  My engineering journey is driven by practical problem-solving: from architecting the <strong className="text-sky-300">Service Portal Application</strong> with offline Ollama AI assistance to designing the <strong className="text-amber-300">Games 24</strong> digital gaming distribution UI and engineering emergency navigation in <strong className="text-emerald-300">Medi_Map</strong>.
                </p>
                <p>
                  I also completed a rigorous 8-week corporate training and internship program on{' '}
                  <strong className="text-white">native iOS Application Development with </strong>
                  <a
                    href="https://sklztect.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-amber-300 hover:text-white underline underline-offset-2 transition-colors"
                    title="Visit SKLZ TECT LLP (sklztect.com)"
                  >
                    <span>SKLZ TECT LLP</span>
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </a>{' '}
                  at Management Education & Research Institute, mastering Swift, Xcode, and Apple's Human Interface Guidelines.
                </p>
              </div>

              {/* Verified Metrics Counter */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/[0.08]">
                <div className="bg-white/[0.03] p-3 rounded-xl border border-white/[0.06] text-center">
                  <div className="text-xl sm:text-2xl font-black text-violet-400 font-mono">7th</div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Semester CSE</div>
                </div>
                <div className="bg-white/[0.03] p-3 rounded-xl border border-white/[0.06] text-center">
                  <div className="text-xl sm:text-2xl font-black text-sky-400 font-mono">6+</div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">GitHub Repos</div>
                </div>
                <div className="bg-white/[0.03] p-3 rounded-xl border border-white/[0.06] text-center cursor-pointer hover:border-amber-400/40 transition-colors" onClick={onOpenCertModal}>
                  <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">8 Wk</div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">iOS Training</div>
                </div>
                <div className="bg-white/[0.03] p-3 rounded-xl border border-white/[0.06] text-center">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">100%</div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Local AI Privacy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Core Architectural Pillars */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <Flame className="w-4 h-4 text-violet-400" />
              <span>Core Architectural Competencies</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className={`ios-glass-card rounded-2xl p-5 border bg-gradient-to-br ${pillar.color} hover:scale-[1.02] transition-all duration-300 space-y-3 flex flex-col justify-between`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.08] text-slate-300 border border-white/[0.08]">
                          {pillar.tag}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white font-display leading-snug">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {pillar.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {pillar.techBadges.map((badge, bIdx) => (
                          <span
                            key={bIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-200 border border-white/[0.08]"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {pillar.title.includes('iOS') && (
                      <div className="mt-2 pt-2 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2">
                        <button
                          onClick={onOpenCertModal}
                          className="text-xs font-mono text-amber-300 hover:text-amber-200 flex items-center gap-1.5"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>Inspect Certificate →</span>
                        </button>
                        <a
                          href="https://sklztect.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                          title="Visit SKLZ TECT official website"
                        >
                          <span>sklztect.com</span>
                          <ExternalLink className="w-3 h-3 text-amber-400" />
                        </a>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Academic Highlight Card */}
            <div className="ios-glass-card rounded-2xl p-5 border border-white/10 flex items-start gap-4 bg-gradient-to-r from-violet-950/20 to-transparent">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-display">
                  Maharshi Dayanand University & DGIT Student
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enrolled in B.Tech CSE (Batch 2023-2027) with deep study in operating systems, algorithms, database normalization, and distributed web services. Schooling foundation from Vinay Nagar Senior Secondary School, New Delhi.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
