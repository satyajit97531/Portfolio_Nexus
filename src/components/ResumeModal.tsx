import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Github,
  Linkedin,
  FileText,
  Award
} from 'lucide-react';
import { profileData } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCertModal: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  onOpenCertModal
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          className="relative w-full max-w-4xl ios-glass-card rounded-3xl border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10 my-6"
        >
          {/* Header Bar */}
          <div className="bg-white/[0.04] px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-sky-400" />
              <div>
                <h3 className="text-sm font-bold text-white font-display">
                  Curriculum Vitae / Resume
                </h3>
                <p className="text-[11px] font-mono text-slate-400">
                  Satyajit Samanta · B.Tech (CSE) 2023-2027
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Content */}
          <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-8 bg-[#0b0f19] text-slate-200 font-sans print:bg-white print:text-black print:p-0">
            
            {/* Top Resume Header */}
            <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div className="space-y-1">
                <h1 className="text-3xl font-extrabold text-white font-display uppercase tracking-tight">
                  {profileData.name}
                </h1>
                <div className="text-sm font-mono text-violet-400">
                  B.Tech in Computer Science and Engineering
                </div>
                <div className="text-xs font-mono text-slate-400 pt-1">
                  Delhi Global Institute of Technology (DGIT) · Maharshi Dayanand University (MDU)
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Batch: 2023–2027 | Semester: 7th | Roll No: <strong className="text-slate-200">23DGITM425</strong>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+91 8076522382</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-violet-400" />
                  <span>satyajit97531@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>Janakpuri / Sagarpur, New Delhi, India</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px]">
                  <a href={profileData.github} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline flex items-center gap-1">
                    <Github className="w-3 h-3" /> GitHub
                  </a>
                  <a href={profileData.linkedin} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline flex items-center gap-1">
                    <Linkedin className="w-3 h-3" /> LinkedIn
                  </a>
                  <a href={profileData.leetcode} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">
                    LeetCode (@satyajitzzzzz)
                  </a>
                  <a href={profileData.codeforces} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                    Codeforces (@satyajitzzz)
                  </a>
                </div>
              </div>
            </div>

            {/* Career Objective */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase text-violet-400 tracking-wider font-bold border-b border-white/[0.08] pb-1">
                Career Objective
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-white/[0.02] p-3 rounded-xl border border-white/[0.04]">
                "{profileData.careerObjective}"
              </p>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-bold border-b border-white/[0.08] pb-1">
                Education
              </h2>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    Bachelor of Technology in Computer Science & Engineering (B.Tech CSE)
                  </h3>
                  <span className="text-xs font-mono text-cyan-300">2023 – 2027</span>
                </div>
                <div className="text-xs text-slate-400">
                  Delhi Global Institute of Technology (DGIT), Maharshi Dayanand University (MDU), Haryana
                </div>
                <div className="text-xs text-slate-300">
                  Semester: 7th | Roll No: 23DGITM425 | Core: Data Structures, Algorithms, DBMS, Operating Systems
                </div>

                <div className="pt-2">
                  <div className="flex flex-wrap items-center justify-between">
                    <h3 className="text-sm font-bold text-white">
                      Senior Secondary Education (Class XII & X)
                    </h3>
                    <span className="text-xs font-mono text-slate-400">Completed</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Vinay Nagar Senior Secondary School, New Delhi
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Skills & Problem Solving (Directly Under Education) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-2">
                <h2 className="text-xs font-mono uppercase text-violet-400 tracking-wider font-bold border-b border-white/[0.08] pb-1">
                  Technical Skills & Arsenal
                </h2>
                <div className="text-xs text-slate-300 space-y-1.5">
                  <div><strong>Development:</strong> MERN Stack (MongoDB, Express.js, React.js, Node.js), Next.js, HTML5, CSS3, JavaScript, TypeScript</div>
                  <div><strong>Mobile & AI:</strong> Swift, iOS Development (Xcode, UIKit), Ollama (Local AI Chatbot)</div>
                  <div><strong>Design & Tools:</strong> UI/UX Design, Figma, Wireframing, Git, GitHub, VS Code, Postman</div>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xs font-mono uppercase text-emerald-400 tracking-wider font-bold border-b border-white/[0.08] pb-1">
                  Problem Solving & Algorithmic
                </h2>
                <div className="text-xs text-slate-300 space-y-1.5">
                  <div><strong>Problem Solving:</strong> LeetCode (@satyajitzzzzz, 50+ Solved: 30 Easy, 15 Med, 5 Hard), Codeforces (@satyajitzzz, 35+ Problems Solved), DSA Intermediate</div>
                  <div><strong>Platform Metrics:</strong> LeetCode (50+ Solved: 30E / 15M / 5H), Codeforces (35+ Solved)</div>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase text-violet-400 tracking-wider font-bold border-b border-white/[0.08] pb-1">
                Engineering Projects & Data Models
              </h2>

              {/* Major Project */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    Major Project: Service Portal Application
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">
                    MERN Stack + Ollama AI (Chatbot Assistant)
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Developed a comprehensive health tracking and wellness platform with on-premise localized Ollama LLM assistant. Integrated a local model conditioned on <strong>45+ clinical and wellness Q&A pairs</strong>. Modeled <strong>5 MongoDB document schemas</strong> managing <strong>60+ synthetic biometric telemetry records</strong> (BMI curves, blood pressure, glucose logs). Features secure JWT authentication with 0% external cloud API data leakage.
                </p>
              </div>

              {/* Minor Project */}
              <div className="space-y-1.5 pt-2">
                <div className="flex flex-wrap items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    Minor Project: Games 24
                  </h3>
                  <span className="text-xs font-mono text-rose-400">
                    Figma, UI/UX Design & Interactive Prototyping
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Designed a high-fidelity user interface for a digital game distribution platform similar to Steam and Epic Games. Architected catalog data models structuring <strong>40+ game title catalog items</strong>, <strong>12 genre taxonomies</strong>, <strong>35+ design tokens</strong>, and <strong>20+ reusable atomic UI components</strong> across <strong>10+ interactive flow screens</strong> with a streamlined 2-step checkout flow.
                </p>
              </div>

              {/* Other Projects */}
              <div className="space-y-1.5 pt-2">
                <div className="flex flex-wrap items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    Medi_Map & AuraSpace
                  </h3>
                  <span className="text-xs font-mono text-sky-400">
                    React.js, TypeScript, Geospatial APIs, REST
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Engineered Medi_Map's geospatial data model indexing <strong>50+ verified clinic coordinates</strong> and <strong>25+ emergency centers</strong> across 12 specialties with 2dsphere spatial indexing. Modeled AuraSpace's TypeScript workspace data schemas managing <strong>50+ document nodes</strong> and Product_Store catalog organizing <strong>45+ SKU inventory records</strong>.
                </p>
              </div>
            </div>

            {/* Industry Experience & Certifications */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase text-amber-400 tracking-wider font-bold border-b border-white/[0.08] pb-1 flex flex-wrap items-center justify-between gap-2">
                <span>Industry Experience & Training</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://sklztect.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-amber-300/80 hover:text-amber-200 hover:underline flex items-center gap-1 normal-case font-normal"
                  >
                    <span>sklztect.com</span>
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </a>
                  <button
                    onClick={onOpenCertModal}
                    className="text-xs text-amber-300 hover:underline flex items-center gap-1 normal-case font-normal"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>View SKLZ TECT Certificate</span>
                  </button>
                </div>
              </h2>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    iOS Development Training & Internship | [SKLZ Tech / SKLZ TECT LLP]
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    June – August 2024 (8 Weeks)
                  </span>
                </div>
                <div className="text-xs font-mono text-amber-300">
                  Held at Management Education & Research Institute (MERI), New Delhi · Certificate Awarded Aug 14, 2024
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1">
                  <li>Mastered Swift programming and the Xcode environment for building native Apple mobile apps.</li>
                  <li>Designed user interfaces in Figma and successfully implemented them into functional iOS layouts.</li>
                  <li>Gained hands-on experience in mobile UI/UX principles, view hierarchies, and app lifecycle management.</li>
                </ul>
              </div>
            </div>

            {/* Languages & Interests */}
            <div className="space-y-2 pt-1">
              <h2 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold border-b border-white/[0.08] pb-1">
                Languages & Interests
              </h2>
              <div className="text-xs text-slate-300 space-y-1">
                <div><strong>Languages:</strong> English (Professional Proficiency), Hindi (Native)</div>
                <div><strong>Interests & Hobbies:</strong> Web Design & Prototyping, Tech Architecture, High-Performance Computing & Hardware Optimization</div>
              </div>
            </div>

          </div>

          {/* Footer controls */}
          <div className="bg-white/[0.03] px-6 py-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-slate-400">
              Verified Candidate Profile · Roll: 23DGITM425
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.12] text-white font-mono text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
