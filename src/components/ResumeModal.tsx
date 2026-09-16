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
  Award,
  Download,
  Code2
} from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { triggerResumeDownload } from '../utils/downloadResume';

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
                onClick={triggerResumeDownload}
                className="px-3.5 py-1.5 rounded-full bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 hover:text-white border border-sky-500/40 text-xs font-mono flex items-center gap-1.5 transition-colors shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                title="Download ATS-Optimized Single Page Resume PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>

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
          <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-6 bg-[#0b0f19] text-slate-200 font-sans print:bg-white print:text-black print:p-0">
            
            {/* Centered Resume Header */}
            <div className="border-b border-white/10 pb-5 text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display uppercase tracking-wider">
                Satyajit Samanta
              </h1>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 tracking-wide uppercase">
                B.Tech in Computer Science & Engineering | Full-Stack & iOS Developer
              </div>
              <div className="text-[11px] text-slate-400 font-normal">
                JANAKPURI, NEW DELHI, INDIA · DELHI GLOBAL INSTITUTE OF TECHNOLOGY (DGIT) · MAHARSHI DAYANAND UNIVERSITY (MDU)
              </div>

              {/* Contact rows with distinct, visible icons */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-300 pt-1">
                <span className="inline-flex items-center gap-1.5 text-slate-200">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>+91 8076522382</span>
                </span>
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-200 hover:text-white hover:underline transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-3.5 h-3.5 text-slate-100 shrink-0" />
                  <span>satyajit97531</span>
                </a>
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sky-400 hover:underline transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0077b5] shrink-0 fill-[#0077b5]" />
                  <span>in satyajit-samanta-07a461385</span>
                </a>
                <a
                  href="mailto:satyajit97531@gmail.com"
                  className="inline-flex items-center gap-1.5 text-rose-300 hover:text-rose-200 hover:underline transition-colors"
                  title="Send Gmail"
                >
                  <Mail className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>satyajit97531@gmail.com</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-400 pt-0.5">
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <Code2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>LeetCode:</span>
                  <a
                    href={profileData.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:underline"
                  >
                    satyajitzzzzz (50+ Solved: 30E/15M/5H)
                  </a>
                </span>
              </div>
            </div>

            {/* 1. Career Objective */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100 border-b border-white/20 pb-1">
                Career Objective
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Motivated B.Tech Computer Science student with a strong foundation in Full Stack Development (MERN, Next.js), Ollama AI Integration, and iOS app development. Seeking an engineering or internship opportunity to build scalable, secure, and user-centric web & mobile solutions.
              </p>
            </div>

            {/* 2. Education */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100 border-b border-white/20 pb-1">
                Education
              </h2>

              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">
                    Bachelor of Technology (B.Tech) – Computer Science & Engineering
                  </h3>
                  <span className="text-xs font-semibold text-slate-200">2023 – 2027 (Ongoing)</span>
                </div>
                <div className="text-xs text-slate-400">
                  Delhi Global Institute of Technology (DGIT) · Maharshi Dayanand University (MDU), Haryana
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5 pt-1">
                  <li>Semester: 7th | University Roll No: <strong className="text-slate-200">23DGITM425</strong></li>
                  <li>Core Subjects: Data Structures & Algorithms, Object-Oriented Programming, DBMS, OS, Computer Networks.</li>
                </ul>
              </div>

              <div className="space-y-1 pt-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">
                    Senior Secondary & High School (CBSE)
                  </h3>
                  <span className="text-xs font-semibold text-slate-200">Completed</span>
                </div>
                <div className="text-xs text-slate-400">
                  Vinay Nagar Senior Secondary School, New Delhi
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5 pt-1">
                  <li>Science Stream (Physics, Chemistry, Mathematics, Computer Science Fundamentals).</li>
                </ul>
              </div>
            </div>

            {/* 3. Technical Skills & Problem Solving */}
            <div className="space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100 border-b border-white/20 pb-1">
                Technical Skills & Problem Solving
              </h2>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5 leading-relaxed">
                <li>
                  <strong className="text-white">Full-Stack:</strong> Next.js (App Router, SSR), React 19, Node.js, Express.js, MongoDB, TypeScript, JavaScript, Tailwind CSS
                </li>
                <li>
                  <strong className="text-white">Mobile & AI:</strong> Swift, Xcode, iOS SDK (MVC, AutoLayout), Local Ollama AI (Llama, Mistral), JWT Authentication
                </li>
                <li>
                  <strong className="text-white">Problem Solving:</strong> LeetCode (@satyajitzzzzz, 50+ Solved: 30E/15M/5H), Data Structures & Algorithms Intermediate
                </li>
                <li>
                  <strong className="text-white">Tools & Design:</strong> Figma UI/UX Prototyping, Git, GitHub, VS Code, Postman, Leaflet Maps, REST APIs
                </li>
              </ul>
            </div>

            {/* 4. Technical Projects */}
            <div className="space-y-3.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100 border-b border-white/20 pb-1">
                Technical Projects
              </h2>

              {/* Project 1 */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">
                    Service Portal Application (Major Project) | MERN Stack + Local Ollama AI
                  </h3>
                  <a
                    href="https://github.com/satyajit97531/Service_Portal"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-sky-400 hover:underline"
                  >
                    github.com/satyajit97531/Service_Portal
                  </a>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 leading-relaxed">
                  <li>Architected full-stack portal with on-premise Ollama AI trained/conditioned with 45+ medical Q&A pairs.</li>
                  <li>Modeled 5 MongoDB document schemas managing 60+ synthetic biometric telemetry records & vital trend histories.</li>
                  <li>Implemented secure JWT authentication and sub-80ms queries with 0% external cloud data leakage or API fees.</li>
                </ul>
              </div>

              {/* Project 2 */}
              <div className="space-y-1 pt-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">
                    Games 24 (Minor Project) | High-Fidelity Game Storefront Platform (Figma UI/UX)
                  </h3>
                  <span className="text-xs text-slate-300 font-medium">
                    Figma UI/UX & Prototyping
                  </span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 leading-relaxed">
                  <li>Designed high-fidelity storefront modeling 40+ game title catalog items, 12 genre taxonomies, and 35+ design tokens.</li>
                  <li>Engineered 20+ atomic UI components and tested an interactive 10+ screen prototype with a frictionless 2-step checkout flow.</li>
                </ul>
              </div>

              {/* Project 3 */}
              <div className="space-y-1 pt-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">
                    Medi_Map | Geospatial Clinic & Emergency Navigation | React, Leaflet, Node.js
                  </h3>
                  <a
                    href="https://github.com/satyajit97531/Medi_Map"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-sky-400 hover:underline"
                  >
                    github.com/satyajit97531/Medi_Map
                  </a>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 leading-relaxed">
                  <li>Constructed geospatial data model indexing 50+ verified clinic coordinates and 25+ emergency centers across 12 specialties.</li>
                </ul>
              </div>

              {/* Project 4 */}
              <div className="space-y-1 pt-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">
                    AuraSpace & Product_Store | TypeScript, React 19, Express.js, Tailwind CSS
                  </h3>
                  <a
                    href="https://github.com/satyajit97531/AuraSpace"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-sky-400 hover:underline"
                  >
                    github.com/satyajit97531/AuraSpace
                  </a>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 leading-relaxed">
                  <li>Engineered TypeScript workspace models managing 50+ document nodes and Product_Store catalog with 45+ SKU records.</li>
                </ul>
              </div>
            </div>

            {/* 5. Industry Training & Certifications */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between border-b border-white/20 pb-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100">
                  Industry Training & Certifications
                </h2>
                <div className="flex items-center gap-3">
                  <a
                    href="https://sklztect.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-normal"
                  >
                    <span>sklztect.com</span>
                    <ExternalLink className="w-3 h-3 text-sky-400" />
                  </a>
                  <button
                    onClick={onOpenCertModal}
                    className="text-xs text-amber-300 hover:underline flex items-center gap-1 font-normal"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>View SKLZ TECT Certificate</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">
                    iOS Application Development Certification | SKLZ TECT LLP (sklztect.com)
                  </h3>
                  <span className="text-xs font-semibold text-slate-200">
                    June – August 2024 (8 Weeks)
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Management Education & Research Institute (MERI), New Delhi | Credential: SKLZ-TECT-IOS-2024-SAMANTA
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 leading-relaxed pt-1">
                  <li>Completed intensive 8-week corporate training in native iOS development using Swift and Xcode.</li>
                  <li>Built responsive iOS view hierarchies conforming to Apple Human Interface Guidelines and MVC architectural patterns.</li>
                </ul>
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
                onClick={triggerResumeDownload}
                className="px-4 py-2 rounded-full bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 hover:text-white border border-sky-500/40 font-mono text-xs flex items-center gap-1.5 transition-colors shadow-[0_0_12px_rgba(56,189,248,0.2)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
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
