import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Check, Star, Pen, BookOpen, Heart } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AUTHORS, BOOKS } from '@/types/onboarding';
import { toast } from '@/hooks/use-toast';

// Generate a consistent color based on book title
const getBookColor = (title: string) => {
  const colors = [
    'from-purple-900 to-purple-700',
    'from-blue-900 to-blue-700',
    'from-emerald-900 to-emerald-700',
    'from-rose-900 to-rose-700',
    'from-amber-900 to-amber-700',
    'from-cyan-900 to-cyan-700',
    'from-indigo-900 to-indigo-700',
    'from-pink-900 to-pink-700',
  ];
  const index = title.length % colors.length;
  return colors[index];
};

interface AuthorSectionProps {
  selected: string[];
  onToggle: (item: string) => void;
  maxItems?: number;
}

function AuthorSection({ selected, onToggle, maxItems = 5 }: AuthorSectionProps) {
  const isMaxReached = selected.length >= maxItems;

  const handleToggle = (item: string) => {
    if (selected.includes(item)) {
      onToggle(item);
    } else if (selected.length < maxItems) {
      onToggle(item);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base text-primary flex items-center gap-2">
          <Pen className="w-5 h-5" />
          <span>Authors</span>
        </h3>
        <span className={`text-xs font-body px-2 py-1 rounded-full ${
          isMaxReached ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
        }`}>
          {selected.length}/{maxItems}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {AUTHORS.map(item => {
          const isSelected = selected.includes(item);
          const isFavorite = selected[0] === item;
          const isDisabled = isMaxReached && !isSelected;
          
          return (
            <motion.button
              key={item}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleToggle(item)}
              disabled={isDisabled}
              className={`relative flex items-center gap-2 p-3 rounded-xl text-left transition-all ${
                isSelected
                  ? isFavorite
                    ? 'bg-baebles-orange/10 border-2 border-baebles-orange'
                    : 'bg-primary/10 border-2 border-primary'
                  : isDisabled
                    ? 'bg-muted/30 border-2 border-transparent opacity-50 cursor-not-allowed'
                    : 'bg-muted/50 border-2 border-transparent hover:border-primary/30 active:bg-muted'
              }`}
            >
              <span className="font-body text-sm text-foreground/90 line-clamp-1 flex-1">
                {item}
              </span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                    isFavorite ? 'bg-baebles-orange' : 'bg-primary'
                  }`}
                >
                  {isFavorite ? (
                    <Star className="w-3 h-3 text-white fill-white" />
                  ) : (
                    <Check className="w-3 h-3 text-primary-foreground" />
                  )}
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

interface BookCarouselProps {
  selected: string[];
  onToggle: (item: string) => void;
  maxItems?: number;
}

function BookCarousel({ selected, onToggle, maxItems = 5 }: BookCarouselProps) {
  const isMaxReached = selected.length >= maxItems;

  const handleToggle = (item: string) => {
    if (selected.includes(item)) {
      onToggle(item);
    } else if (selected.length < maxItems) {
      onToggle(item);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base text-primary flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          <span>Books & Series</span>
        </h3>
        <span className={`text-xs font-body px-2 py-1 rounded-full ${
          isMaxReached ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
        }`}>
          {selected.length}/{maxItems}
        </span>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {BOOKS.map(book => {
          const isSelected = selected.includes(book);
          const isFavorite = selected[0] === book;
          const isDisabled = isMaxReached && !isSelected;
          
          return (
            <motion.button
              key={book}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleToggle(book)}
              disabled={isDisabled}
              className={`shrink-0 relative group ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {/* Book Cover */}
              <div 
                className={`w-24 h-36 rounded-lg bg-gradient-to-br ${getBookColor(book)} 
                  flex flex-col justify-end p-2 shadow-lg transition-all relative overflow-hidden
                  ${isSelected 
                    ? isFavorite 
                      ? 'ring-3 ring-baebles-orange ring-offset-2 ring-offset-background' 
                      : 'ring-3 ring-primary ring-offset-2 ring-offset-background'
                    : 'hover:scale-105'
                  }`}
              >
                {/* Decorative spine */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/20" />
                
                {/* Book Title */}
                <div className="relative z-10">
                  <p className="font-display text-[10px] text-white/90 leading-tight line-clamp-3 text-left">
                    {book}
                  </p>
                </div>

                {/* Selected Badge */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-md ${
                      isFavorite ? 'bg-baebles-orange' : 'bg-primary'
                    }`}
                  >
                    {isFavorite ? (
                      <Star className="w-3.5 h-3.5 text-white fill-white" />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-primary-foreground" />
                    )}
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default function EditFavorites() {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<string[]>([]);
  const [books, setBooks] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('baebles_onboarding');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAuthors(parsed.favoriteAuthors || []);
        setBooks(parsed.favoriteBooks || []);
      } catch {
        // Keep empty
      }
    }
  }, []);

  const toggleAuthor = (author: string) => {
    if (authors.includes(author)) {
      setAuthors(authors.filter(a => a !== author));
    } else {
      setAuthors([...authors, author]);
    }
  };

  const toggleBook = (book: string) => {
    if (books.includes(book)) {
      setBooks(books.filter(b => b !== book));
    } else {
      setBooks([...books, book]);
    }
  };

  const handleSave = () => {
    const saved = localStorage.getItem('baebles_onboarding');
    const data = saved ? JSON.parse(saved) : {};
    localStorage.setItem('baebles_onboarding', JSON.stringify({
      ...data,
      favoriteAuthors: authors,
      favoriteBooks: books
    }));

    toast({
      title: "Favorites Updated",
      description: "Your favorite authors and books have been saved",
    });
    navigate('/settings');
  };

  const canSave = authors.length >= 1 || books.length >= 1;

  return (
    <MainLayout>
      <div className="py-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 sm:gap-3 mb-6"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-baebles-rose/30 to-primary/20 flex items-center justify-center shadow-lg shrink-0">
            <Heart className="w-5 h-5 text-baebles-rose" />
          </div>
          <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent">
            Edit Favorites
          </h1>
        </motion.div>

        {/* Authors */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="baebles-card-simple p-4 mb-4"
        >
          <AuthorSection
            selected={authors}
            onToggle={toggleAuthor}
          />
        </motion.div>

        {/* Books Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="baebles-card-simple p-4 mb-4"
        >
          <BookCarousel
            selected={books}
            onToggle={toggleBook}
          />
        </motion.div>

        {/* Buttons */}
        <div className="flex gap-3">
          <motion.button
            onClick={() => navigate('/settings')}
            className="flex-1 py-3 px-4 rounded-xl font-display text-sm bg-muted/50 border border-border/50 text-muted-foreground active:bg-muted transition-all"
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={handleSave}
            disabled={!canSave}
            className="flex-1 baebles-btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            whileTap={{ scale: 0.98 }}
          >
            <Check className="w-4 h-4" />
            Save
          </motion.button>
        </div>
      </div>
    </MainLayout>
  );
}
