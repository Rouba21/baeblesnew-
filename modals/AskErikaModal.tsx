import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, BookOpen, User, FileText, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AskErikaModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillTitle?: string;
}

export function AskErikaModal({ isOpen, onClose, prefillTitle = '' }: AskErikaModalProps) {
  const [title, setTitle] = useState(prefillTitle);
  const [author, setAuthor] = useState('');
  const [notes, setNotes] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; author?: string }>({});

  const validate = () => {
    const newErrors: { title?: string; author?: string } = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!author.trim()) newErrors.author = 'Author is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: 'Request sent to Erika!',
        description: `We'll add "${title.trim()}" by ${author.trim()} soon.`,
      });
      setTitle('');
      setAuthor('');
      setNotes('');
      setErrors({});
      onClose();
    }, 1200);
  };

  const handleClose = () => {
    if (isSending) return;
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <div
              className="w-full rounded-2xl sm:rounded-3xl overflow-hidden"
              style={{
                maxWidth: 'calc(100% - 2rem)',
                width: '420px',
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                boxShadow: '0 20px 60px hsl(0 0% 0% / 0.4)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="relative px-5 pt-5 pb-4"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--baebles-gold) / 0.1), hsl(var(--primary) / 0.08))',
                  borderBottom: '1px solid hsl(var(--border))',
                }}
              >
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'hsl(var(--baebles-gold) / 0.2)' }}
                  >
                    <Sparkles className="w-5 h-5 text-baebles-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-foreground">Ask Erika</h3>
                    <p className="text-xs text-muted-foreground font-body">
                      Request a book to be added to our catalog
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="px-5 py-4 space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-display text-foreground">
                    <BookOpen className="w-3.5 h-3.5 text-primary" />
                    Book Title <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
                    }}
                    placeholder="e.g. A Court of Thorns and Roses"
                    maxLength={200}
                    className={`w-full h-10 px-3 bg-muted/50 rounded-xl text-sm font-body focus:outline-none focus:ring-2 transition-all ${
                      errors.title
                        ? 'ring-2 ring-destructive/50 border border-destructive/30'
                        : 'border border-border/50 focus:ring-primary/30'
                    }`}
                  />
                  {errors.title && (
                    <p className="text-[11px] text-destructive font-body">{errors.title}</p>
                  )}
                </div>

                {/* Author */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-display text-foreground">
                    <User className="w-3.5 h-3.5 text-primary" />
                    Author <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => {
                      setAuthor(e.target.value);
                      if (errors.author) setErrors((prev) => ({ ...prev, author: undefined }));
                    }}
                    placeholder="e.g. Sarah J. Maas"
                    maxLength={150}
                    className={`w-full h-10 px-3 bg-muted/50 rounded-xl text-sm font-body focus:outline-none focus:ring-2 transition-all ${
                      errors.author
                        ? 'ring-2 ring-destructive/50 border border-destructive/30'
                        : 'border border-border/50 focus:ring-primary/30'
                    }`}
                  />
                  {errors.author && (
                    <p className="text-[11px] text-destructive font-body">{errors.author}</p>
                  )}
                </div>

                {/* Notes (optional) */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-display text-foreground">
                    <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                    Additional Notes <span className="text-muted-foreground text-[10px]">(optional)</span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Series name, edition, ISBN..."
                    maxLength={500}
                    rows={2}
                    className="w-full px-3 py-2 bg-muted/50 border border-border/50 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none transition-all"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 pb-5">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  disabled={isSending}
                  className="baebles-btn-primary w-full flex items-center justify-center gap-2 !py-3"
                >
                  {isSending ? (
                    <div className="flex gap-1">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 rounded-full bg-white" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 rounded-full bg-white" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Request
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
