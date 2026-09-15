import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  MapPin,
  Calendar,
  BookOpen,
  CheckCircle2,
  Building2,
  Award
} from 'lucide-react';
import { educationData } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-28 px-4 sm:px-6 cyber-grid">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>07 // ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Computer Science & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Institutional Pedagogy
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl text-sm sm:text-base">
            Formal coursework and foundational academics shaping systems design, algorithm efficiency, and engineering discipline.
          </p>
        </div>

        {/* Education Timeline / Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className={`ios-glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6 ${
                idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
              }`}
            >
              {/* Institution Header */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                    {edu.status}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white font-display pt-1">
                  {edu.institution}
                </h3>
                
                <div className="text-sm font-semibold text-cyan-300 font-mono">
                  {edu.degree}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{edu.location}</span>
                </div>

                {edu.rollNo && (
                  <div className="text-xs font-mono text-slate-400 pt-1">
                    University Roll Number: <span className="text-white font-bold">{edu.rollNo}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {edu.description}
              </p>

              {/* Academic Highlights */}
              <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Academic Milestones:
                </div>
                <div className="space-y-1.5">
                  {edu.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Coursework Modules */}
              <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Core Academic Modules:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="ios-glass-pill px-2.5 py-1 rounded-lg text-[11px] font-mono text-slate-300 border border-white/[0.08]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
