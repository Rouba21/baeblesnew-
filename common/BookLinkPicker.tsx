import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, X, Sparkles } from 'lucide-react';
import { books } from '@/data/mockData';
import { AskErikaModal } from '@/components/modals/AskErikaModal';

interface BookLinkPickerProps {
  selectedBookId: string;
  onSelectBook: (bookId: string) => void;
  onClear: () => void;
  showToggleButton?: boolean;
  forceOpen?: boolean;
  label?: string;
  variant?: 'inline' | 'panel';
  placeholder?: string;
}

export function BookLinkPicker({
  selectedBookId,
  onSelectBook,
  onClear,
  showToggleButton = true,
  forceOpen = false,
  label,
  variant = 'panel',
  placeholder = 'Search books...',
}: BookLinkPickerProps) {
  const [showSearch, setShowSearch] = useState(forceOpen);

  useEffect(() => {
    if (forceOpen) setShowSearch(true);
  }, [forceOpen]);
  const [bookQuery, setBookQuery] = useState('');
  const [erikaModalOpen, setErikaModalOpen] = useState(false);

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(bookQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(bookQuery.toLowerCase())
  );

  const selectedBookData = books.find((b) => b.id === selectedBookId);
  const noBookResults = bookQuery.trim().length > 2 && filteredBooks.length === 0;

  const handleSelectBook = (bookId: string) => {
    onSelectBook(bookId);
    setShowSearch(false);
    setBookQuery('');
  };

  const handleClear = () => {
    onClear();
    setBookQuery('');
  };

  // Selected book display
  if (selectedBookData) {
    return (
      <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-xl">
        <div className="w-10 h-14 bg-gradient-to-br from-primary to-baebles-purple rounded-lg flex items-center justify-center shadow-md">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm truncate text-foreground">{selectedBookData.title}</p>
          <p className="text-xs text-muted-foreground truncate">{selectedBookData.author}</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleClear}
          className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground active:text-foreground active:bg-muted/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2">
        {/* Toggle Button */}
        {showToggleButton && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSearch(!showSearch)}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-display transition-all ${
              showSearch
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'bg-muted/50 text-muted-foreground border border-border/50 active:bg-muted'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {label || 'Link a Book (optional)'}
          </motion.button>
        )}

        {/* Search Panel */}
        <AnimatePresence>
          {(showSearch || !showToggleButton) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className={`bg-muted/50 border border-border/50 rounded-xl p-3 ${variant === 'inline' ? 'bg-muted/30' : ''}`}>
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={bookQuery}
                    onChange={(e) => setBookQuery(e.target.value)}
                    placeholder={placeholder}
                    autoFocus
                    className="w-full h-9 pl-9 pr-8 bg-card rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  {showToggleButton && (
                    <button 
                      onClick={() => setShowSearch(false)}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
                
                <div className="max-h-40 overflow-y-auto space-y-1">
                  {filteredBooks.slice(0, 5).map((book) => (
                    <motion.button
                      key={book.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectBook(book.id)}
                      className="w-full flex items-center gap-2 p-2 rounded-lg active:bg-card text-left transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-display truncate">{book.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{book.author}</p>
                      </div>
                    </motion.button>
                  ))}
                  
                  {/* No results - Ask Erika */}
                  {noBookResults && (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setErikaModalOpen(true)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors mt-2"
                      style={{ 
                        background: 'linear-gradient(135deg, hsl(var(--baebles-gold) / 0.1), hsl(var(--primary) / 0.1))',
                        border: '1px solid hsl(var(--baebles-gold) / 0.3)'
                      }}
                    >
                      <div 
                        className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center"
                        style={{ background: 'hsl(var(--baebles-gold) / 0.2)' }}
                      >
                        <Sparkles className="w-4 h-4 text-baebles-gold" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-display text-baebles-gold">Ask Erika</p>
                        <p className="text-xs text-muted-foreground">
                          Can't find your book? Simply ask Erika to add it
                        </p>
                      </div>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ask Erika Modal */}
      <AskErikaModal
        isOpen={erikaModalOpen}
        onClose={() => setErikaModalOpen(false)}
        prefillTitle={bookQuery}
      />
    </>
  );
}
