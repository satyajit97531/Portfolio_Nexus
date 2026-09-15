import React from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  GraduationCap,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { achievementsData } from '../data/portfolioData';

interface AchievementsProps {
  onOpenCertModal: () => void;
}

export const Achievements: React.FC<AchievementsProps> = ({ onOpenCertModal }) => {
  return (
    <section id="achievements" className="relative py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>06 // MILESTONES & HONORS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Industry Certifications & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-amber-300 to-sky-400">
                Engineering Distinctions
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl text-sm sm:text-base">
              Verified corporate training credentials, academic computer science milestones, and specialized architectural achievements.
            </p>
          </div>

          <button
            onClick={onOpenCertModal}
            className="ios-glass-pill px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono text-amber-300 hover:text-white border border-amber-500/30 hover:border-amber-400 flex items-center gap-2 transition-all hover:bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.2)] self-start md:self-auto"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Inspect iOS Certificate</span>
          </button>
        </div>

        {/* Milestone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`ios-glass-card rounded-2xl p-6 sm:p-7 border flex flex-col justify-between space-y-6 ${
                item.hasCertificatePreview
                  ? 'border-amber-500/40 bg-gradient-to-b from-amber-500/[0.08] to-transparent shadow-[0_0_30px_rgba(245,158,11,0.1)]'
                  : 'border-white/10'
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/[0.08] text-slate-300 border border-white/[0.08] flex items-center gap-1.5">
                    {item.hasCertificatePreview && <Award className="w-3 h-3 text-amber-400" />}
                    <span>{item.badge}</span>
                  </span>

                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-amber-300/90 pt-1 flex items-center gap-2">
                    {item.issuerUrl ? (
                      <a
                        href={item.issuerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:underline hover:text-amber-200 transition-colors"
                        title="Visit SKLZ TECT LLP official website"
                      >
                        <span>{item.issuer}</span>
                        <ExternalLink className="w-3 h-3 text-amber-400" />
                      </a>
                    ) : (
                      <span>{item.issuer}</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Details list */}
                <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.skillsCovered.map((skill) => (
                    <span
                      key={skill}
                      className="ios-glass-pill px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              {item.hasCertificatePreview && (
                <div className="pt-4 border-t border-white/[0.08] space-y-2">
                  <button
                    onClick={onOpenCertModal}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-white font-mono text-xs font-bold flex items-center justify-center gap-2 border border-amber-500/30 transition-all"
                  >
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>View Official Certificate (SKLZ TECT)</span>
                  </button>
                  {item.issuerUrl && (
                    <a
                      href={item.issuerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white font-mono text-xs flex items-center justify-center gap-1.5 border border-white/[0.08] transition-all"
                    >
                      <span>Visit SKLZ TECT LLP (sklztect.com)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
