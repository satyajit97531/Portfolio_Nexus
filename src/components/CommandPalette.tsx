import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Terminal,
  User,
  Cpu,
  Code2,
  Sparkles,
  Trophy,
  GraduationCap,
  Send,
  FileText,
  Award,
  ExternalLink,
  Github,
  Linkedin,
  MessageSquare,
  Copy,
  X,
  ArrowRight,
  Download,
  Archive,
  Volume2,
  Music
} from 'lucide-react';
import { profileData, projectsData } from '../data/portfolioData';
import { triggerResumeDownload, triggerSourceCodeDownload } from '../utils/downloadResume';
import { audioSystem, playToggleEcho } from '../utils/audioSystem';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal: () => void;
  onOpenCertModal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResumeModal,
  onOpenCertModal
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
          setQuery('');
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const navigateTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const commands = [
    {
      id: 'sec-hero',
      label: 'System Nexus (Overview & Hero)',
      category: 'Navigation',
      icon: Terminal,
      action: () => navigateTo('hero')
    },
    {
      id: 'sec-about',
      label: 'Engineer Profile (About & Philosophy)',
      category: 'Navigation',
      icon: User,
      action: () => navigateTo('about')
    },
    {
      id: 'sec-skills',
      label: 'Tech Arsenal (Skills Matrix)',
      category: 'Navigation',
      icon: Cpu,
      action: () => navigateTo('skills')
    },
    {
      id: 'sec-projects',
      label: 'Production Systems (Featured Projects)',
      category: 'Navigation',
      icon: Code2,
      action: () => navigateTo('projects')
    },
    {
      id: 'sec-cp',
      label: 'Algorithmic Engine (LeetCode Problem Solving)',
      category: 'Navigation',
      icon: Sparkles,
      action: () => navigateTo('cp')
    },
    {
      id: 'sec-achievements',
      label: 'Milestones & Honors (iOS Certificate)',
      category: 'Navigation',
      icon: Trophy,
      action: () => navigateTo('achievements')
    },
    {
      id: 'sec-education',
      label: 'Academic Foundation (DGIT / MDU CSE)',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => navigateTo('education')
    },
    {
      id: 'sec-contact',
      label: 'Dispatch Channel (Contact)',
      category: 'Navigation',
      icon: Send,
      action: () => navigateTo('contact')
    },
    // Actions
    {
      id: 'act-toggle-sound',
      label: 'Toggle Master Sound (Enable / Mute Audio)',
      category: 'Quick Actions',
      icon: Volume2,
      action: async () => {
        onClose();
        await audioSystem.toggleMasterSound();
      }
    },
    {
      id: 'act-toggle-space-bgm',
      label: 'Toggle Outer Space Ambient Music (Calm Cosmic Drone)',
      category: 'Quick Actions',
      icon: Music,
      action: async () => {
        onClose();
        await audioSystem.toggleBgm();
      }
    },
    {
      id: 'act-resume',
      label: 'Open & View Resume (CV Modal)',
      category: 'Quick Actions',
      icon: FileText,
      action: () => {
        onClose();
        onOpenResumeModal();
      }
    },
    {
      id: 'act-download-cv',
      label: 'Download Resume (PDF Format)',
      category: 'Quick Actions',
      icon: Download,
      action: () => {
        onClose();
        triggerResumeDownload();
      }
    },
    {
      id: 'act-download-zip',
      label: 'Download Project Folder (.ZIP Archive)',
      category: 'Quick Actions',
      icon: Archive,
      action: () => {
        onClose();
        triggerSourceCodeDownload();
      }
    },
    {
      id: 'act-cert',
      label: 'Inspect iOS Development Certificate (SKLZ TECT)',
      category: 'Quick Actions',
      icon: Award,
      action: () => {
        onClose();
        onOpenCertModal();
      }
    },
    {
      id: 'act-whatsapp',
      label: 'Message Satyajit on WhatsApp (+91 8076522382)',
      category: 'Quick Actions',
      icon: MessageSquare,
      action: () => {
        window.open(profileData.whatsappUrl, '_blank');
        onClose();
      }
    },
    {
      id: 'act-github',
      label: 'Open GitHub Repositories (satyajit97531)',
      category: 'External Links',
      icon: Github,
      action: () => {
        window.open(profileData.github, '_blank');
        onClose();
      }
    },
    {
      id: 'act-linkedin',
      label: 'Open LinkedIn Profile (Satyajit Samanta)',
      category: 'External Links',
      icon: Linkedin,
      action: () => {
        window.open(profileData.linkedin, '_blank');
        onClose();
      }
    },
    {
      id: 'act-leetcode',
      label: 'Open LeetCode Profile (@satyajitzzzzz)',
      category: 'External Links',
      icon: ExternalLink,
      action: () => {
        window.open(profileData.leetcode, '_blank');
        onClose();
      }
    }
  ];

  // Also include project quick actions
  const projectCommands = projectsData.map((proj) => ({
    id: `proj-${proj.id}`,
    label: `Project: ${proj.title} (${proj.subtitle})`,
    category: 'Projects',
    icon: Code2,
    action: () => {
      navigateTo('projects');
    }
  }));

  const allItems = [...commands, ...projectCommands];

  const filteredItems = query.trim() === ''
    ? allItems
    : allItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-20 sm:pt-28 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Command Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-2xl ios-glass-card rounded-2xl border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="p-4 border-b border-white/[0.08] flex items-center gap-3 bg-white/[0.02]">
            <Search className="w-5 h-5 text-violet-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command, project, or section... (e.g. MERN, iOS, Resume, WhatsApp)"
              className="w-full bg-transparent text-sm sm:text-base font-mono text-white placeholder-slate-500 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-md text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline text-[10px] font-mono bg-white/[0.08] px-2 py-0.5 rounded text-slate-400 border border-white/[0.08]">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono text-slate-400">
                No matching systems or commands found for "{query}".
              </div>
            ) : (
              filteredItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full p-3 rounded-xl hover:bg-violet-600/20 text-left flex items-center justify-between group transition-colors border border-transparent hover:border-violet-500/30"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.05] group-hover:bg-violet-500/30 flex items-center justify-center text-slate-400 group-hover:text-violet-300 transition-colors shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs sm:text-sm text-slate-200 group-hover:text-white font-mono truncate">
                          {item.label}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 group-hover:text-violet-300/80">
                          {item.category}
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Bar */}
          <div className="bg-white/[0.02] px-4 py-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Satyajit Samanta System Navigation</span>
            <div className="flex items-center gap-3">
              <span>Navigate with [Click] or [Enter]</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
