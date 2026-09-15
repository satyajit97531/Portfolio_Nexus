import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code,
  Terminal,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Award,
  Flame,
  Zap,
  Target
} from 'lucide-react';
import { leetCodeData, codeforcesData, profileData } from '../data/portfolioData';

export const LeetCodeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'both' | 'leetcode' | 'codeforces'>('both');

  return (
    <section id="cp" className="relative py-28 px-4 sm:px-6 cyber-grid">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>05 // ALGORITHMIC & COMPETITIVE ARENA</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Data Structures & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400">
                Competitive Problem Solving
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Active problem solving across LeetCode and Codeforces. Focused on optimal asymptotic runtime O(N), space-efficient in-place transformations, constructive algorithms, and rigorous edge-case handling.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 self-start md:self-auto">
            <a
              href={profileData.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="ios-glass-pill px-4 py-2 rounded-full text-xs font-mono text-amber-300 hover:text-white border border-amber-500/30 hover:border-amber-400 flex items-center gap-2 transition-all hover:bg-amber-500/10 shadow-[0_0_16px_rgba(245,158,11,0.2)]"
            >
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>LeetCode @{leetCodeData.username}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={profileData.codeforces}
              target="_blank"
              rel="noopener noreferrer"
              className="ios-glass-pill px-4 py-2 rounded-full text-xs font-mono text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 flex items-center gap-2 transition-all hover:bg-cyan-500/10 shadow-[0_0_16px_rgba(6,182,212,0.2)]"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Codeforces @{codeforcesData.handle}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Dual Platform Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: LeetCode Platform Card */}
          <div className="lg:col-span-6 flex flex-col">
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
                        {leetCodeData.stats.totalSolved}+ Algorithmic Problems Mastered
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
                    <span>Key DSA Competencies</span>
                    <span className="text-amber-400 text-[11px]">{leetCodeData.stats.acceptanceRate} Acc.</span>
                  </div>
                  {leetCodeData.focusAreas.slice(0, 4).map((area, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">{area.name}</span>
                        <span className="text-amber-300">{area.count} Solved</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min(100, (area.count / 45) * 100)}%` }}
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
                  <span>Inspect Full LeetCode Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Codeforces Platform Card */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="ios-glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-xl">
                      🏆
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                        <span>Codeforces Arena</span>
                        <span className="text-[11px] font-mono text-cyan-400 font-normal">@{codeforcesData.handle}</span>
                      </h3>
                      <p className="text-xs font-mono text-slate-400">
                        {codeforcesData.rank} · Active Competitor
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    Contest Participant
                  </span>
                </div>

                {/* Rating & Contest Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/[0.03] p-3.5 rounded-2xl border border-white/[0.06] text-center">
                    <div className="text-2xl font-black text-cyan-400 font-mono">
                      {codeforcesData.rating}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase mt-1">
                      Current Rating
                    </div>
                  </div>

                  <div className="bg-white/[0.03] p-3.5 rounded-2xl border border-white/[0.06] text-center">
                    <div className="text-2xl font-black text-indigo-400 font-mono">
                      {codeforcesData.maxRating}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase mt-1">
                      Peak Rating
                    </div>
                  </div>

                  <div className="bg-white/[0.03] p-3.5 rounded-2xl border border-white/[0.06] text-center">
                    <div className="text-2xl font-black text-emerald-400 font-mono">
                      {codeforcesData.problemsSolved}+
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase mt-1">
                      Problems Solved
                    </div>
                  </div>
                </div>

                {/* Codeforces Problem Taxonomy */}
                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-300 flex items-center justify-between">
                    <span>Competitive Problem Taxonomy</span>
                    <span className="text-cyan-400 text-[11px]">{codeforcesData.contests} Contests</span>
                  </div>
                  {codeforcesData.tags.map((tag, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">{tag.name}</span>
                        <span className="text-cyan-300">{tag.count} Solved</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min(100, (tag.count / 35) * 100)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: tag.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <a
                  href={profileData.codeforces}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 hover:text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 border border-cyan-500/30 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                >
                  <span>Inspect Codeforces Profile (@{codeforcesData.handle})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
