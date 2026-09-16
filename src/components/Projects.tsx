import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Cpu,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  CheckCircle,
  Database
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { playToggleEcho } from '../utils/audioSystem';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Systems' },
    { id: 'AI & ML', label: 'AI & Ollama' },
    { id: 'Full-Stack', label: 'MERN Full-Stack' },
    { id: 'Mobile & Design', label: 'Design & Mobile' },
    { id: 'Systems & Security', label: 'Security & Systems' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-fuchsia-400 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
              <span>04 // PRODUCTION SYSTEMS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Engineered Architectures & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-violet-400 to-sky-400">
                Software Deployments
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl text-sm sm:text-base">
              Real-world systems with live repositories, offline AI inference pipelines, health tracking diagnostics, and high-fidelity design prototypes.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-white/[0.03] p-1.5 rounded-2xl border border-white/[0.08]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playToggleEcho(selectedCategory === cat.id ? 'generic' : 'on');
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-fuchsia-500/25 text-white font-semibold border border-fuchsia-400/40 shadow-[0_0_12px_rgba(217,70,239,0.25)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="ios-glass-card rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-violet-400/30 transition-all flex flex-col justify-between group space-y-5"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/25 font-semibold">
                      {project.badge}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl font-bold text-white font-display group-hover:text-violet-300 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-violet-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>
                    <p className="text-xs font-mono text-violet-300/80 pt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description / Tagline */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Data Model & Volume Numeral Callout */}
                  {project.dataVolumeNumeral && (
                    <div className="px-2.5 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/25 flex items-center gap-2 text-[10px] font-mono text-violet-300">
                      <Database className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                      <span className="truncate">
                        <span className="text-white font-semibold">Data Models:</span> {project.dataVolumeNumeral}
                      </span>
                    </div>
                  )}

                  {/* Key Metrics Pill */}
                  <div className="bg-black/30 p-3 rounded-xl border border-white/[0.05] space-y-1.5">
                    {project.metrics.slice(0, 2).map((metric, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{metric}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="ios-glass-pill px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-[10px] font-mono text-slate-500 self-center">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      playToggleEcho('on');
                      setActiveProject(project);
                    }}
                    className="text-xs font-mono text-violet-400 hover:text-violet-300 flex items-center gap-1 font-semibold"
                  >
                    <span>Inspect System</span>
                    <Zap className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ios-glass-pill px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5"
                    title="View GitHub Repository"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Repo</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* System Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => {
            playToggleEcho('off');
            setActiveProject(null);
          }}
        />

      </div>
    </section>
  );
};
