import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Send,
  Mail,
  Phone,
  MessageSquare,
  Linkedin,
  Github,
  MapPin,
  Check,
  Copy,
  Terminal,
  ExternalLink,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { profileData } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare direct mailto URL as graceful fallback
    const mailtoUrl = `mailto:${profileData.email}?subject=${encodeURIComponent(
      formState.subject || `Message from ${formState.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    )}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.open(mailtoUrl, '_blank');
    }, 800);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span>08 // DISPATCH CHANNEL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Initiate Direct <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-violet-400 to-sky-400">
              Communication Protocol
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl text-sm sm:text-base">
            Open for software engineering internships, full-time full-stack roles, localized AI development, and collaborative projects.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Hub */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Channel Cards */}
            <div className="ios-glass-card rounded-2xl p-6 border border-white/10 space-y-5">
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <Terminal className="w-4 h-4 text-violet-400" />
                <span>Direct Coordinates</span>
              </h3>

              {/* Email */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Email Address</div>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-xs sm:text-sm font-mono text-white hover:text-violet-300 truncate block"
                    >
                      {profileData.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(profileData.email, 'email')}
                  className="ios-glass-pill p-2 rounded-lg text-slate-400 hover:text-white shrink-0 ml-2"
                  title="Copy Email"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* WhatsApp / Phone */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">WhatsApp / Mobile</div>
                    <a
                      href={profileData.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-mono text-white hover:text-emerald-300 truncate block"
                    >
                      {profileData.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <a
                    href={profileData.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ios-glass-pill p-2 rounded-lg text-emerald-400 hover:text-white"
                    title="Open in WhatsApp"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleCopy(profileData.phone, 'phone')}
                    className="ios-glass-pill p-2 rounded-lg text-slate-400 hover:text-white"
                    title="Copy Phone"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-9 h-9 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Current Base</div>
                  <div className="text-xs sm:text-sm text-slate-200">
                    Janakpuri / Sagarpur, New Delhi, India
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-white/[0.06] space-y-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase">
                  Connected Engineering Networks:
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  <a
                    href={profileData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ios-glass-pill p-2.5 rounded-2xl text-slate-300 hover:text-white flex items-center gap-2"
                  >
                    <Linkedin className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="truncate">LinkedIn</span>
                  </a>

                  <a
                    href={profileData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ios-glass-pill p-2.5 rounded-2xl text-slate-300 hover:text-white flex items-center gap-2"
                  >
                    <Github className="w-4 h-4 text-violet-400 shrink-0" />
                    <span className="truncate">GitHub</span>
                  </a>

                  <a
                    href={profileData.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ios-glass-pill p-2.5 rounded-2xl text-slate-300 hover:text-white flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">LeetCode</span>
                  </a>

                  <a
                    href={profileData.codeforces}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ios-glass-pill p-2.5 rounded-2xl text-slate-300 hover:text-white flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate">Codeforces</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Fast WhatsApp Chat Banner */}
            <a
              href={profileData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ios-glass-card rounded-3xl p-4 border border-emerald-500/30 bg-gradient-to-r from-emerald-950/25 to-slate-900/40 flex items-center justify-between hover:scale-[1.01] transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-display">Instant WhatsApp Message</div>
                  <div className="text-[11px] text-emerald-300 font-mono">+91 8076522382</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-400" />
            </a>

          </div>

          {/* Right Column: Interactive Dispatch Terminal Form */}
          <div className="lg:col-span-7">
            <div className="ios-glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span>Dispatch Message Buffer</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  READY
                </span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-display">
                    Dispatch Initiated!
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your message draft has been routed to <strong>{profileData.email}</strong>. You can also message directly on WhatsApp at <strong>+91 8076522382</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-mono text-white"
                  >
                    Send Another Transmission
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="sender-name" className="text-slate-400 block">
                        Sender Identity / Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="sender-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Recruiters / Engineering Lead"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/40"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="sender-email" className="text-slate-400 block">
                        Return Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="sender-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. contact@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/40"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="msg-subject" className="text-slate-400 block">
                      Transmission Subject
                    </label>
                    <input
                      id="msg-subject"
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g. Full-Stack / iOS Internship Opportunity"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/40"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="msg-content" className="text-slate-400 block">
                      Payload / Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="msg-content"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Enter project details, role description, or greeting..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/40 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(168,85,247,0.4)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Routing Transmission...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch Message Transmission</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
