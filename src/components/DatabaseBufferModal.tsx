import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Database,
  RefreshCw,
  Search,
  Mail,
  User,
  Calendar,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  Inbox,
  AlertCircle
} from 'lucide-react';

export interface DispatchMessageRecord {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  userAgent?: string | null;
  createdAt: string;
}

interface DatabaseBufferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMessageDeleted?: () => void;
}

export const DatabaseBufferModal: React.FC<DatabaseBufferModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<DispatchMessageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [statusNote, setStatusNote] = useState<string | null>(null);

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const fetchMessages = async () => {
    setIsLoading(true);
    setStatusNote(null);
    try {
      const res = await fetch('/api/dispatch');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setMessages(data.data);
      }
    } catch (err: any) {
      console.error('Failed to load messages from MongoDB:', err);
      setStatusNote('Unable to reach MongoDB database endpoint. Server may be syncing.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMessages = messages.filter((msg) => {
    const q = searchQuery.toLowerCase();
    return (
      msg.name.toLowerCase().includes(q) ||
      msg.email.toLowerCase().includes(q) ||
      (msg.subject && msg.subject.toLowerCase().includes(q)) ||
      msg.message.toLowerCase().includes(q)
    );
  });

  if (!isOpen) return null;

  const modalNode = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 pt-24 sm:pt-28 pb-12 overflow-y-auto bg-black/85 backdrop-blur-md">
        {/* Backdrop click dismiss */}
        <div
          className="fixed inset-0 -z-10"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-[#0b0f19] border border-violet-500/30 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[85vh] flex flex-col z-[101]"
        >
          {/* Top Header */}
          <div className="p-4 sm:p-6 bg-white/[0.03] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    MongoDB Atlas Database Buffer
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live MongoDB
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Database: <code className="text-emerald-300">portfolio_nexus</code> · Collection: <code className="text-emerald-300">dispatch_messages</code>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchMessages}
                disabled={isLoading}
                className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors disabled:opacity-50"
                title="Refresh MongoDB records"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search & Metadata Filter Bar */}
          <div className="px-4 sm:px-6 py-3 bg-black/40 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by sender identity, email, subject, or message text..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-violet-400/50"
              />
            </div>
            <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
              <span>
                Total Records:{' '}
                <strong className="text-violet-400 font-bold">{messages.length}</strong>
              </span>
              {searchQuery && (
                <span className="text-slate-500">
                  (Showing {filteredMessages.length})
                </span>
              )}
            </div>
          </div>

          {/* Message List Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-mono text-xs">
            {statusNote && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{statusNote}</span>
              </div>
            )}

            {filteredMessages.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-white/[0.04] text-slate-500 mx-auto flex items-center justify-center">
                  <Inbox className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-300 font-sans">
                  {searchQuery ? 'No matching transmissions found' : 'Database Buffer is Empty'}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto font-sans">
                  {searchQuery
                    ? 'Try clearing the search query to view all messages.'
                    : 'Submit a message through the Dispatch Message Buffer form to test the MongoDB Atlas write flow.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMessages.map((msg) => {
                  const dateStr = new Date(msg.createdAt).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  const gmailReplyUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    msg.email
                  )}&su=${encodeURIComponent(`Re: ${msg.subject || 'Portfolio Inquiry'}`)}`;

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-violet-500/30 p-4 sm:p-5 transition-all space-y-3"
                    >
                      {/* Top Row: Sender Info & Actions */}
                      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.06] pb-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <User className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="font-bold text-white text-sm">
                              {msg.name}
                            </span>
                            <span
                              className="text-[10px] text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono"
                              title="MongoDB ObjectId"
                            >
                              _id: {msg.id}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-slate-400 text-[11px]">
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-sky-400" />
                              <a
                                href={gmailReplyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-300 hover:underline hover:text-sky-200"
                                title={`Open Gmail compose to ${msg.email}`}
                              >
                                {msg.email}
                              </a>
                              <button
                                onClick={() => handleCopyEmail(msg.email, msg.id)}
                                className="ml-1 p-0.5 text-slate-500 hover:text-white transition-colors"
                                title="Copy email address"
                              >
                                {copiedId === msg.id ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>

                            <div className="flex items-center gap-1 text-slate-500">
                              <Calendar className="w-3 h-3" />
                              <span>{dateStr}</span>
                            </div>
                          </div>
                        </div>

                        {/* Card Action: Clean Gmail Reply */}
                        <div className="flex items-center gap-2">
                          <a
                            href={gmailReplyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 hover:text-white text-xs border border-sky-500/30 flex items-center gap-1.5 transition-all shadow-sm group"
                            title={`Redirect to contact ${msg.email} in Gmail with recipient pre-filled`}
                          >
                            <Mail className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
                            <span className="font-sans font-medium">Reply in Gmail</span>
                            <ExternalLink className="w-3 h-3 text-sky-400 opacity-70 group-hover:opacity-100" />
                          </a>
                        </div>
                      </div>

                      {/* Subject */}
                      {msg.subject && (
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-slate-500 block">
                            Subject
                          </span>
                          <span className="text-white font-medium text-xs">
                            {msg.subject}
                          </span>
                        </div>
                      )}

                      {/* Message Payload */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 block">
                          Payload / Message
                        </span>
                        <div className="p-3 rounded-lg bg-black/40 border border-white/[0.05] text-slate-200 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                          {msg.message}
                        </div>
                      </div>

                      {/* User Agent / Client Meta */}
                      {msg.userAgent && (
                        <div className="text-[10px] text-slate-600 truncate flex items-center gap-1">
                          <span>Client:</span>
                          <span className="truncate">{msg.userAgent}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-white/[0.02] border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official MongoDB Driver · Database: portfolio_nexus (Collection: dispatch_messages)</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white transition-colors"
            >
              Close Inspector
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalNode, document.body)
    : modalNode;
};
