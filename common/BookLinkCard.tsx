import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, BookmarkPlus, Check, ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BookLinkCardProps {
  book: {
    id: string;
    title: string;
    author: string;
  };
  variant?: 'default' | 'compact';
  showTbrButton?: boolean;
  className?: string;
}

const getBookColor = (title: string) => {
  const colors = [
    'from-purple-600 to-indigo-800',
    'from-rose-500 to-purple-700',
    'from-amber-500 to-orange-700',
    'from-emerald-500 to-teal-700',
    'from-blue-500 to-indigo-700',
  ];
  const index = title.length % colors.length;
  return colors[index];
};

export function BookLinkCard({ 
  book, 
  variant = 'default', 
  showTbrButton = true,
  className = ''
}: BookLinkCardProps) {
  const [isInTbr, setIsInTbr] = useState(false);

  const handleAddToTbr = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wasInTbr = isInTbr;
    setIsInTbr(!isInTbr);
    toast({
      title: wasInTbr ? "Removed from TBR" : "Added to TBR",
      description: wasInTbr 
        ? `"${book.title}" removed from your list` 
        : `"${book.title}" added to your reading list`,
    });
  };

  const isCompact = variant === 'compact';

  return (
    <Link
      to={`/books/${book.id}`}
      className={`flex items-center gap-2 ${isCompact ? 'p-2' : 'p-3'} rounded-xl transition-all group ${className}`}
      style={{ 
        background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--baebles-purple) / 0.08))',
        border: '1px solid hsl(var(--primary) / 0.2)'
      }}
    >
      {/* Book Cover */}
      <div className={`${isCompact ? 'w-8 h-10' : 'w-12 h-16'} bg-gradient-to-br ${getBookColor(book.title)} rounded-lg flex items-center justify-center shrink-0 shadow-md relative overflow-hidden`}>
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/20" />
        <BookOpen className={`${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-white`} />
      </div>

      {/* Book Info */}
      <div className="flex-1 min-w-0">
        <p className={`${isCompact ? 'text-xs' : 'text-sm'} font-display truncate group-hover:text-primary transition-colors`}>
          {book.title}
        </p>
        <p className={`${isCompact ? 'text-[10px]' : 'text-xs'} text-muted-foreground truncate`}>
          {book.author}
        </p>
      </div>

      {/* TBR Button */}
      {showTbrButton && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToTbr}
          className={`${isCompact ? 'px-2 py-1.5 text-[10px]' : 'px-3 py-2 text-xs'} rounded-lg font-display flex items-center gap-1 transition-all shrink-0 ${
            isInTbr
              ? 'bg-primary/20 text-primary'
              : 'bg-primary text-primary-foreground'
          }`}
        >
          {isInTbr ? (
            <Check className={`${isCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
          ) : (
            <BookmarkPlus className={`${isCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
          )}
        </motion.button>
      )}

      {/* Arrow (only if no TBR button) */}
      {!showTbrButton && (
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      )}
    </Link>
  );
}
