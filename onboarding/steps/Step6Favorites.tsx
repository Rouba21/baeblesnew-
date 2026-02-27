import { motion } from 'framer-motion';
import { AUTHORS, BOOKS } from '@/types/onboarding';
import { NavigationButtons } from '../NavigationButtons';
import { Check, Star, Pen, BookOpen, Heart, LucideIcon } from 'lucide-react';

interface Step6Props {
  authors: string[];
  books: string[];
  onAuthorsChange: (authors: string[]) => void;
  onBooksChange: (books: string[]) => void;
  onBack: () => void;
  onContinue: () => void;
}

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
                    ? 'bg-gradient-to-br from-baebles-gold/15 to-baebles-gold/10 ring-2 ring-baebles-gold'
                    : 'bg-gradient-to-br from-primary/15 to-baebles-gold/10 ring-2 ring-primary'
                  : isDisabled
                    ? 'bg-muted/30 opacity-50 cursor-not-allowed'
                    : 'bg-muted/50 hover:bg-muted/80 active:bg-muted'
              }`}
            >
              <span className="font-body text-sm text-foreground/90 flex-1 leading-tight">
                {item}
              </span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                    isFavorite ? 'bg-baebles-gold' : 'bg-primary'
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
                    ? 'ring-3 ring-baebles-gold ring-offset-2 ring-offset-background' 
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
                      isFavorite ? 'bg-baebles-gold' : 'bg-primary'
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

export function Step6Favorites({
  authors,
  books,
  onAuthorsChange,
  onBooksChange,
  onBack,
  onContinue,
}: Step6Props) {
  const toggleAuthor = (author: string) => {
    if (authors.includes(author)) {
      onAuthorsChange(authors.filter(a => a !== author));
    } else {
      onAuthorsChange([...authors, author]);
    }
  };

  const toggleBook = (book: string) => {
    if (books.includes(book)) {
      onBooksChange(books.filter(b => b !== book));
    } else {
      onBooksChange([...books, book]);
    }
  };

  const canContinue = authors.length >= 1 || books.length >= 1;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-baebles-purple/20 to-primary/20 flex items-center justify-center">
          <Heart className="w-7 h-7 text-baebles-purple" />
        </div>
        <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent tracking-wide mb-1">
          Your Favorites
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-body">
          Help us personalize your experience
        </p>
      </div>

      {/* Info Note */}
      <div 
        className="flex items-center gap-2 p-3 rounded-xl text-xs mb-4"
        style={{ 
          background: 'hsl(var(--baebles-purple) / 0.1)', 
          border: '1px solid hsl(var(--baebles-purple) / 0.3)' 
        }}
      >
        <Star className="w-3.5 h-3.5 shrink-0 text-baebles-purple" />
        <span className="font-body text-baebles-purple">
          The first one you select will be your favorite!
        </span>
      </div>

      {/* Authors */}
      <div className="baebles-card-simple p-4 mb-4">
        <AuthorSection
          selected={authors}
          onToggle={toggleAuthor}
        />
      </div>

      {/* Books Carousel */}
      <div className="baebles-card-simple p-4 mb-4">
        <BookCarousel
          selected={books}
          onToggle={toggleBook}
        />
      </div>

      <NavigationButtons
        onBack={onBack}
        onContinue={onContinue}
        continueDisabled={!canContinue}
      />
    </div>
  );
}
