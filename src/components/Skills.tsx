import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Layers,
  Database,
  Smartphone,
  Wrench,
  CheckCircle2,
  ExternalLink,
  Code
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { Skill } from '../types';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'aimobile' | 'tools'>('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'backend', label: 'Backend & Data' },
    { id: 'aimobile', label: 'AI, iOS & Mobile' },
    { id: 'tools', label: 'Tools & Workflow' },
  ];

  const filteredSkills = activeTab === 'all'
    ? skillsData
    : skillsData.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>03 // TECH ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Engineered Stacks & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-300 to-indigo-400">
                Production Core Competencies
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl text-sm sm:text-base">
              Hands-on mastery spanning MERN stack web architectures, native Swift iOS environments, on-premise Ollama AI models, and design systems.
            </p>
          </div>

          {/* Quick filter tabs */}
          <div className="flex flex-wrap gap-1.5 bg-white/[0.03] p-1.5 rounded-2xl border border-white/[0.08]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                  activeTab === cat.id
                    ? 'bg-emerald-500/25 text-white font-semibold border border-emerald-400/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, idx) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="ios-glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: skill.accent, boxShadow: `0 0 10px ${skill.accent}` }}
                      />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {skill.category}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                        skill.tier === 'Production Core'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : skill.tier === 'Specialized'
                          ? 'bg-violet-500/10 text-violet-300 border-violet-500/30'
                          : 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                      }`}
                    >
                      {skill.tier}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display group-hover:text-violet-300 transition-colors">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Linked Projects */}
                <div className="pt-3 border-t border-white/[0.06] space-y-1.5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Associated Systems:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.projects.map((proj) => (
                      <span
                        key={proj}
                        className="ios-glass-pill px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-300 border border-white/[0.08]"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner with Tech Stacks Overview */}
        <div className="ios-glass-card rounded-2xl p-6 border border-white/10 bg-gradient-to-r from-emerald-950/20 via-slate-900/40 to-violet-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-display">
                Modern Standard Stack Execution
              </div>
              <div className="text-xs text-slate-400">
                MongoDB · Express.js · React 19 · Node.js · Swift · Ollama AI · Figma · TypeScript
              </div>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Zero Unused Bloat · Clean Modularity</span>
          </div>
        </div>

      </div>
    </section>
  );
};
