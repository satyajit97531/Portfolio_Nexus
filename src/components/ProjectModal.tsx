import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Github,
  ExternalLink,
  Cpu,
  CheckCircle2,
  Layers,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Database
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-3xl ios-glass-card rounded-2xl sm:rounded-3xl border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-8"
        >
          {/* Header Bar */}
          <div className="bg-white/[0.04] px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                {project.badge}
              </span>
              <span className="text-xs font-mono text-slate-400">
                // System Architecture Blueprint
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[78vh] overflow-y-auto">
            {/* Title & Tagline */}
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-violet-300">
                {project.subtitle}
              </p>
              <p className="text-sm text-slate-300 pt-1">
                {project.tagline}
              </p>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black/40 p-4 rounded-xl border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-rose-400 uppercase font-semibold">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>The Architectural Problem</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="bg-black/40 p-4 rounded-xl border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Engineered Solution</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                System Performance & Verified Metrics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {project.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.03] p-3 rounded-xl border border-white/[0.06] flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200">{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Models & Training / Creation Volume */}
            {(project.dataModel || project.dataVolumeNumeral) && (
              <div className="space-y-2.5 bg-violet-950/20 p-4 rounded-xl border border-violet-500/25">
                <h3 className="text-xs font-mono text-violet-300 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <Database className="w-3.5 h-3.5 text-violet-400" />
                  <span>Data Models & Training / Creation Datasets</span>
                </h3>
                {project.dataVolumeNumeral && (
                  <div className="text-xs font-mono bg-violet-500/10 text-emerald-300 border border-violet-500/20 px-3 py-2 rounded-lg flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                    <span><strong>Numerals / Dataset Scale:</strong> {project.dataVolumeNumeral}</span>
                  </div>
                )}
                {project.dataModel && (
                  <div className="text-xs text-slate-300 pt-0.5 leading-relaxed">
                    <span className="font-mono text-slate-400 font-medium">Schema Architecture: </span>
                    <span>{project.dataModel}</span>
                  </div>
                )}
              </div>
            )}

            {/* Technical Stack Breakdown */}
            {project.techStackDetailed && (
              <div className="space-y-2.5 bg-black/40 p-4 rounded-xl border border-white/[0.06]">
                <h3 className="text-xs font-mono text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Tech Stack Specification</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {project.techStackDetailed.frontend && (
                    <div>
                      <span className="text-slate-400 font-mono">Frontend: </span>
                      <span className="text-slate-200">{project.techStackDetailed.frontend}</span>
                    </div>
                  )}
                  {project.techStackDetailed.backend && (
                    <div>
                      <span className="text-slate-400 font-mono">Backend: </span>
                      <span className="text-slate-200">{project.techStackDetailed.backend}</span>
                    </div>
                  )}
                  {project.techStackDetailed.database && (
                    <div>
                      <span className="text-slate-400 font-mono">Database: </span>
                      <span className="text-slate-200">{project.techStackDetailed.database}</span>
                    </div>
                  )}
                  {project.techStackDetailed.aiOrTools && (
                    <div>
                      <span className="text-slate-400 font-mono">Tools/AI: </span>
                      <span className="text-slate-200">{project.techStackDetailed.aiOrTools}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-slate-400 uppercase">Tags & Frameworks:</div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="ios-glass-pill px-2.5 py-1 rounded-lg text-xs font-mono text-slate-300 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View Source on GitHub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                className="ios-glass-pill px-4 py-2.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white"
              >
                Close Blueprint
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
