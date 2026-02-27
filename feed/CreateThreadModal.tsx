import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Feather, AlertTriangle } from 'lucide-react';
import { rooms } from '@/data/mockData';
import { books } from '@/data/mockData';
import { BookLinkPicker } from '@/components/common/BookLinkPicker';

interface CreateThreadModalProps {
  onClose: () => void;
  preselectedRoomId?: string;
}

export function CreateThreadModal({ onClose, preselectedRoomId }: CreateThreadModalProps) {
  const [content, setContent] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(preselectedRoomId || '');
  const [selectedBook, setSelectedBook] = useState('');
  const [spoilerSubject, setSpoilerSubject] = useState('');
  const [tags, setTags] = useState('');
  const [isMature, setIsMature] = useState(false);
  const [hasSpoilers, setHasSpoilers] = useState(false);

  // Clear spoiler subject when a book is selected
  useEffect(() => {
    if (selectedBook) setSpoilerSubject('');
  }, [selectedBook]);

  const selectedBookData = books.find((b) => b.id === selectedBook);
  const spoilerLabel = selectedBookData
    ? selectedBookData.title
    : spoilerSubject.trim() || null;

  const canSubmit = content && selectedRoom && (!hasSpoilers || spoilerLabel);

  const handleSubmit = () => {
    if (!canSubmit) return;
    console.log('Create thread:', { content, selectedRoom, selectedBook, spoilerSubject, tags, isMature, hasSpoilers });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed z-50 bg-card overflow-hidden rounded-2xl inset-x-4 mx-auto max-w-md max-h-[85vh] overflow-y-auto"
        style={{ 
          top: '6%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)' 
        }}
      >
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--baebles-gold) / 0.2))' }}>
                <Feather className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <h2 className="font-display text-lg sm:text-xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent">Create Post</h2>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full active:bg-muted/80 transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {/* Room selector */}
            <div>
              <label className="block text-xs sm:text-sm font-body text-muted-foreground mb-2">
                Choose a room *
              </label>
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full h-11 sm:h-12 px-3 sm:px-4 bg-muted/50 border border-border/50 rounded-xl font-body text-sm sm:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              >
                <option value="">Select a room...</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    #{room.name} {room.isMature ? '🔑' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Content textarea */}
            <div>
              <label className="block text-xs sm:text-sm font-body text-muted-foreground mb-2">
                What's on your mind? * ({content.length}/500)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value.slice(0, 500))}
                placeholder="Share your thoughts with the community..."
                className="w-full h-24 sm:h-32 p-3 sm:p-4 bg-muted/50 border border-border/50 rounded-xl font-body text-sm sm:text-base text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>

            {/* Link a Book */}
            <BookLinkPicker
              selectedBookId={selectedBook}
              onSelectBook={setSelectedBook}
              onClear={() => setSelectedBook('')}
              showToggleButton={!hasSpoilers}
              forceOpen={hasSpoilers}
              label={hasSpoilers ? 'Link the book (required for spoilers)' : undefined}
            />

            {/* Spoiler free-text fallback — only if spoilers checked and no book selected */}
            <AnimatePresence>
              {hasSpoilers && !selectedBook && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <label className="block text-xs sm:text-sm font-body text-muted-foreground mb-2">
                    Or type what the spoiler is about *
                  </label>
                  <input
                    type="text"
                    value={spoilerSubject}
                    onChange={(e) => setSpoilerSubject(e.target.value.slice(0, 120))}
                    placeholder='e.g., "Fourth Wing", "ACOTAR series"'
                    className="w-full h-11 sm:h-12 px-3 sm:px-4 bg-muted/50 border border-border/50 rounded-xl font-body text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Spoiler preview banner */}
            <AnimatePresence>
              {hasSpoilers && spoilerLabel && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2.5 p-3 rounded-xl border"
                  style={{
                    background: 'hsl(var(--baebles-orange) / 0.08)',
                    borderColor: 'hsl(var(--baebles-orange) / 0.25)',
                  }}
                >
                  <AlertTriangle className="w-4 h-4 text-baebles-orange shrink-0" />
                  <p className="text-xs sm:text-sm font-body text-foreground">
                    This post contains spoilers about <span className="font-display text-baebles-orange">{spoilerLabel}</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tags */}
            <div>
              <label className="block text-xs sm:text-sm font-body text-muted-foreground mb-2">
                Tags (optional, comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., discussion, question, fan-art"
                className="w-full h-11 sm:h-12 px-3 sm:px-4 bg-muted/50 border border-border/50 rounded-xl font-body text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>

            {/* Mature content */}
            <label className="flex items-center gap-2.5 sm:gap-3 cursor-pointer py-1">
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMature(!isMature)}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${
                  isMature 
                    ? 'bg-primary border-primary' 
                    : 'border-muted-foreground/50 bg-muted/30'
                }`}
              >
                {isMature && <span className="text-primary-foreground text-xs sm:text-sm">✓</span>}
              </motion.div>
              <span className="text-xs sm:text-sm text-muted-foreground font-body">
                This contains 🌙 mature themes
              </span>
            </label>

            {/* Spoilers */}
            <label className="flex items-center gap-2.5 sm:gap-3 cursor-pointer py-1">
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={() => setHasSpoilers(!hasSpoilers)}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${
                  hasSpoilers 
                    ? 'bg-primary border-primary' 
                    : 'border-muted-foreground/50 bg-muted/30'
                }`}
              >
                {hasSpoilers && <span className="text-primary-foreground text-xs sm:text-sm">✓</span>}
              </motion.div>
              <span className="text-xs sm:text-sm text-muted-foreground font-body">
                This contains 🕯️ spoilers
              </span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-6">
            <motion.button 
              whileTap={{ scale: 0.98 }}
              onClick={onClose} 
              className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl font-display text-sm bg-muted/50 border border-border/50 text-muted-foreground active:bg-muted transition-all"
            >
              Cancel
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="baebles-btn-primary flex-1 py-2.5 sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
