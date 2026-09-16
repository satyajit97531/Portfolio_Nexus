import React from 'react';
import { motion } from 'motion/react';
import {
  Terminal,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Flame,
  Zap,
  Target
} from 'lucide-react';
import { leetCodeData, profileData } from '../data/portfolioData';

export const LeetCodeSection: React.FC = () => {
  return (
    <section id="cp" className="relative py-28 px-4 sm:px-6 cyber-grid">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>05 // ALGORITHMIC MASTERY & PROBLEM SOLVING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Data Structures & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400">
                LeetCode Solutions
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Active problem solving on LeetCode focusing on optimal asymptotic runtime O(N), space-efficient in-place transformations, tree traversals, and rigorous edge-case validation.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 self-start md:self-auto">
            <a
              href={profileData.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="ios-glass-pill px-4 py-2.5 rounded-full text-xs font-mono text-amber-300 hover:text-white border border-amber-500/30 hover:border-amber-400 flex items-center gap-2 transition-all hover:bg-amber-500/10 shadow-[0_0_16px_rgba(245,158,11,0.2)]"
            >
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>LeetCode @{leetCodeData.username}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* LeetCode Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Card: LeetCode Platform Card */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="ios-glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xl">
                      ⚡
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                        <span>LeetCode Profile</span>
                        <span className="text-[11px] font-mono text-amber-400 font-normal">@{leetCodeData.username}</span>
                      </h3>
                      <p className="text-xs font-mono text-slate-400">
                        {leetCodeData.stats.totalSolved}+ Problems Solved · {leetCodeData.stats.acceptanceRate} Acceptance
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    Active Solver
                  </span>
                </div>

                {/* Solved metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/[0.03] p-3.5 rounded-2xl border border-white/[0.06] text-center">
                    <div className="text-2xl font-black text-emerald-400 font-mono">
                      {leetCodeData.stats.easySolved}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase mt-1">
                      Easy Solved
                    </div>
                  </div>

                  <div className="bg-white/[0.03] p-3.5 rounded-2xl border border-white/[0.06] text-center">
                    <div className="text-2xl font-black text-amber-400 font-mono">
                      {leetCodeData.stats.mediumSolved}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase mt-1">
                      Medium Solved
                    </div>
                  </div>

                  <div className="bg-white/[0.03] p-3.5 rounded-2xl border border-white/[0.06] text-center">
                    <div className="text-2xl font-black text-rose-400 font-mono">
                      {leetCodeData.stats.hardSolved}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase mt-1">
                      Hard Solved
                    </div>
                  </div>
                </div>

                {/* Focus Areas Progress */}
                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-300 flex items-center justify-between">
                    <span>Key DSA Topic Distribution</span>
                    <span className="text-amber-400 text-[11px]">{leetCodeData.stats.acceptanceRate} Acc.</span>
                  </div>
                  {leetCodeData.focusAreas.map((area, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">{area.name}</span>
                        <span className="text-amber-300">{area.count} Solved</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min(100, (area.count / 20) * 100)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: area.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <a
                  href={profileData.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 hover:text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 border border-amber-500/30 transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                >
                  <span>Inspect Full LeetCode Profile (@{leetCodeData.username})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Side Card: Algorithmic Paradigms & Core Competencies */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="ios-glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-400">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-display">
                      Algorithmic Core Principles
                    </h3>
                    <p className="text-xs font-mono text-slate-400">
                      Standard Engineering Methodologies
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white font-display">Time Complexity Optimization</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                        Focusing on reducing brute-force O(N²) quadratic loops to linear O(N) or logarithmic O(log N) operations using hash sets, binary search, and frequency tables.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                    <TrendingUp className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white font-display">Space-Efficient Transformations</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                        Prioritizing in-place array manipulation, pointer reversals, and sliding window boundaries to minimize memory allocations.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                    <Target className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white font-display">Edge-Case Verification</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                        Thorough testing on empty sequences, negative bounds, duplicate elements, single-node trees, and boundary conditions.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white font-display">Clean, Readable Code</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                        Writing modular functions with self-documenting naming, typed variables, and disciplined branching logic.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] font-mono text-slate-400">
                  Total Solved: <strong className="text-white">50+ LeetCode problems</strong> across 5 core topics
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
