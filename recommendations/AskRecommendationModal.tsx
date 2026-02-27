import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MessageSquare, Search } from 'lucide-react';
import { SUBGENRES, TROPES } from '@/types/onboarding';

interface AskRecommendationModalProps {
  onClose: () => void;
}

export function AskRecommendationModal({ onClose }: AskRecommendationModalProps) {
  const [content, setContent] = useState('');
  const [selectedSubgenre, setSelectedSubgenre] = useState('');
  const [selectedTropes, setSelectedTropes] = useState<string[]>([]);
  const [isMature, setIsMature] = useState(false);
  const [showTropeSearch, setShowTropeSearch] = useState(false);
  const [tropeQuery, setTropeQuery] = useState('');

  const filteredTropes = TROPES.filter(
    (t) => t.name.toLowerCase().includes(tropeQuery.toLowerCase())
  );

  const toggleTrope = (tropeId: string) => {
    setSelectedTropes(prev => 
      prev.includes(tropeId) 
        ? prev.filter(id => id !== tropeId)
        : prev.length < 3 
          ? [...prev, tropeId]
          : prev
    );
  };

  const handleSubmit = () => {
    if (!content) return;
    // In a real app, this would send to backend
    console.log('Ask recommendation:', { content, selectedSubgenre, selectedTropes, isMature });
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

      {/* Modal - centered higher on screen */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed z-50 bg-card overflow-hidden rounded-2xl inset-x-4 mx-auto max-w-md max-h-[80vh] overflow-y-auto"
        style={{ 
          top: '8%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)' 
        }}
      >
        <div className="p-4 sm:p-6">
          {/* Header - harmonized style */}
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-teal) / 0.3), hsl(var(--primary) / 0.2))' }}>
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-baebles-teal" />
              </div>
              <h2 className="font-display text-lg sm:text-xl bg-gradient-to-r from-baebles-teal via-primary to-baebles-teal bg-clip-text text-transparent">Ask for Recs</h2>
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
            {/* Description textarea */}
            <div>
              <label className="block text-xs sm:text-sm font-body text-muted-foreground mb-2">
                What are you looking for? * ({content.length}/300)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value.slice(0, 300))}
                placeholder="I'm looking for a book with..."
                className="w-full h-24 sm:h-28 p-3 sm:p-4 bg-muted/50 border border-border/50 rounded-xl font-body text-sm sm:text-base text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>

            {/* Subgenre selector */}
            <div>
              <label className="block text-xs sm:text-sm font-body text-muted-foreground mb-2">
                Preferred subgenre (optional)
              </label>
              <select
                value={selectedSubgenre}
                onChange={(e) => setSelectedSubgenre(e.target.value)}
                className="w-full h-11 sm:h-12 px-3 sm:px-4 bg-muted/50 border border-border/50 rounded-xl font-body text-sm sm:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              >
                <option value="">Any subgenre...</option>
                {SUBGENRES.map((subgenre) => (
                  <option key={subgenre.id} value={subgenre.id}>
                    {subgenre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tropes */}
            <div>
              <label className="block text-xs sm:text-sm font-body text-muted-foreground mb-2">
                Tropes you love (optional, max 3)
              </label>
              
              {/* Selected tropes */}
              {selectedTropes.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {selectedTropes.map(tropeId => {
                    const trope = TROPES.find(t => t.id === tropeId);
                    return trope && (
                      <motion.span
                        key={tropeId}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-primary/20 border border-primary/30 rounded-full text-xs text-primary"
                      >
                        {trope.name}
                        <button 
                          onClick={() => toggleTrope(tropeId)}
                          className="ml-0.5 hover:text-primary/70"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.span>
                    );
                  })}
                </div>
              )}

              {showTropeSearch ? (
                <div className="bg-muted/50 border border-border/50 rounded-xl p-3">
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={tropeQuery}
                      onChange={(e) => setTropeQuery(e.target.value)}
                      placeholder="Search tropes..."
                      autoFocus
                      className="w-full h-10 pl-9 pr-4 bg-card rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {filteredTropes.slice(0, 6).map((trope) => (
                      <motion.button
                        key={trope.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          toggleTrope(trope.id);
                          if (selectedTropes.length >= 2) {
                            setShowTropeSearch(false);
                            setTropeQuery('');
                          }
                        }}
                        disabled={selectedTropes.length >= 3 && !selectedTropes.includes(trope.id)}
                        className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors ${
                          selectedTropes.includes(trope.id)
                            ? 'bg-primary/20 text-primary'
                            : 'active:bg-card'
                        } disabled:opacity-50`}
                      >
                        <span className="text-sm font-display">{trope.name}</span>
                      </motion.button>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setShowTropeSearch(false);
                      setTropeQuery('');
                    }}
                    className="text-xs text-primary mt-2"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowTropeSearch(true)}
                  disabled={selectedTropes.length >= 3}
                  className="w-full h-11 sm:h-12 px-3 sm:px-4 bg-muted/50 border border-border/50 rounded-xl font-body text-sm text-muted-foreground active:text-foreground text-left flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  <Search className="w-4 h-4" />
                  {selectedTropes.length >= 3 ? 'Max tropes selected' : 'Search tropes...'}
                </motion.button>
              )}
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
                {isMature && <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
              </motion.div>
              <span className="text-xs sm:text-sm text-muted-foreground font-body">
                Open to spicy recommendations
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
              disabled={!content}
              className="baebles-btn-primary flex-1 py-2.5 sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ask
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
