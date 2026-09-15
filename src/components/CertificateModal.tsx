import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, CheckCircle2, ShieldCheck, Download, ExternalLink, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger subtle celebratory confetti
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#38bdf8', '#fbbf24', '#f97316']
      });

      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }
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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl ios-glass-card rounded-2xl sm:rounded-3xl border border-amber-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10 my-6"
        >
          {/* Header Bar */}
          <div className="bg-white/[0.04] px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-sm font-bold text-white font-display">
                  Official Credential Verification
                </h3>
                <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <a
                    href="https://sklztect.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:text-white underline inline-flex items-center gap-1"
                    title="Open SKLZ TECT LLP official website"
                  >
                    <span>SKLZ TECT LLP</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>· iOS Application Development</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://sklztect.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-white border border-amber-500/30 font-mono text-xs transition-all"
                title="Visit sklztect.com"
              >
                <span>sklztect.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Certificate Display Area */}
          <div className="p-4 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* The High-Fidelity Certificate Canvas Card matching the uploaded document */}
            <div className="relative bg-[#faf7f2] text-[#222] rounded-xl sm:rounded-2xl p-6 sm:p-12 shadow-2xl border-4 border-[#e6decb] overflow-hidden">
              
              {/* Geometric ribbon vectors in corners matching SKLZ TECT design */}
              <div className="absolute top-0 left-0 w-44 sm:w-64 h-44 sm:h-64 pointer-events-none opacity-90">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <polygon points="0,0 200,0 0,60" fill="#2d6a4f" opacity="0.85" />
                  <polygon points="0,0 160,0 0,110" fill="#40916c" opacity="0.75" />
                  <polygon points="0,40 180,0 0,150" fill="#b08968" opacity="0.6" />
                  <polygon points="0,90 120,0 0,200" fill="#9d0208" opacity="0.8" />
                </svg>
              </div>

              <div className="absolute bottom-0 right-0 w-44 sm:w-64 h-44 sm:h-64 pointer-events-none opacity-90">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <polygon points="200,200 0,200 200,140" fill="#40916c" opacity="0.8" />
                  <polygon points="200,200 40,200 200,90" fill="#b08968" opacity="0.6" />
                  <polygon points="200,160 20,200 200,50" fill="#e85d04" opacity="0.7" />
                  <polygon points="200,110 80,200 200,0" fill="#9d0208" opacity="0.85" />
                </svg>
              </div>

              {/* Certificate Inner Content */}
              <div className="relative z-10 space-y-6 sm:space-y-8 text-center max-w-2xl mx-auto">
                
                {/* Logo */}
                <div className="flex items-center justify-between sm:justify-start gap-2.5 pb-2">
                  <a
                    href="https://sklztect.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
                    title="Visit official website of SKLZ TECT LLP (https://sklztect.com/)"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#1b263b] flex items-center justify-center text-white font-black text-xs shadow">
                      ⚙️
                    </div>
                    <div className="text-left font-sans font-black text-lg sm:text-xl tracking-tight text-[#1b263b] flex items-center gap-1.5">
                      <span>SKLZ TECT LLP</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-600 transition-colors" />
                    </div>
                  </a>
                </div>

                {/* Certificate Title */}
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-4xl font-serif tracking-widest text-[#cf711f] font-bold uppercase">
                    CERTIFICATE
                  </h2>
                  <div className="text-xs sm:text-sm font-mono tracking-widest text-slate-600 uppercase font-semibold">
                    OF COMPLETION
                  </div>
                </div>

                {/* Body Text */}
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm italic font-serif text-slate-700">
                    This is to proudly certify that:
                  </p>

                  <div className="text-2xl sm:text-4xl font-serif text-[#b23b18] font-bold underline decoration-[#cf711f]/40 underline-offset-8">
                    Satyajit Samanta
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl mx-auto font-sans pt-2">
                    has successfully completed his/her <strong className="font-semibold text-slate-900">8 weeks training and internship program on iOS Application Development</strong> held at <strong className="font-semibold text-slate-900">Management Education & Research Institute, New Delhi</strong> on <strong className="font-semibold text-slate-900">14th August, 2024</strong>.
                  </p>
                </div>

                {/* Signatures & Golden Ribbon Seal */}
                <div className="pt-8 sm:pt-12 grid grid-cols-3 items-end border-t border-slate-300/80">
                  {/* Seal */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 flex items-center justify-center text-white shadow-lg border-2 border-amber-300">
                      <Award className="w-6 sm:w-8 h-6 sm:h-8" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-600 mt-1 uppercase">
                      Official Seal
                    </span>
                  </div>

                  {/* Signatory 1 */}
                  <div className="flex flex-col items-center">
                    <div className="font-serif italic text-base sm:text-xl font-bold text-slate-800 tracking-wide">
                      Simran
                    </div>
                    <div className="w-24 sm:w-32 h-[1px] bg-slate-400 my-1" />
                    <div className="text-[11px] font-sans font-semibold text-slate-700">
                      Simran
                    </div>
                    <div className="text-[9px] font-mono text-slate-500">
                      Instructor / Lead
                    </div>
                  </div>

                  {/* Signatory 2 */}
                  <div className="flex flex-col items-center">
                    <div className="font-serif italic text-base sm:text-xl font-bold text-slate-800 tracking-wide">
                      Aldrin Castelino
                    </div>
                    <div className="w-24 sm:w-32 h-[1px] bg-slate-400 my-1" />
                    <div className="text-[11px] font-sans font-semibold text-slate-700">
                      Aldrin Castelino
                    </div>
                    <div className="text-[9px] font-mono text-slate-500">
                      Director
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Curriculum Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-black/40 p-4 rounded-xl border border-white/[0.08] space-y-1.5">
                <div className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Swift & Xcode Mastery</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Object-oriented Swift concepts, memory structures, protocol-oriented architecture, and Xcode workspace profiling.
                </p>
              </div>

              <div className="bg-black/40 p-4 rounded-xl border border-white/[0.08] space-y-1.5">
                <div className="text-xs font-mono text-sky-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Figma to iOS Layouts</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Translating wireframes and UI components from Figma into production-ready auto-layout and declarative mobile views.
                </p>
              </div>

              <div className="bg-black/40 p-4 rounded-xl border border-white/[0.08] space-y-1.5">
                <div className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>App Lifecycle & HIG</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Strict adherence to Apple's Human Interface Guidelines, view hierarchy state transitions, and responsive touch gestures.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <a
                href="https://sklztect.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-white border border-amber-500/30 font-mono text-xs transition-all"
              >
                <span>Visit SKLZ TECT LLP (sklztect.com)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-mono text-xs font-semibold transition-colors"
              >
                Close Verification
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
