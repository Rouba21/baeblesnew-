import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, MessageCircle, ChevronRight, Sparkles, ExternalLink, BookOpen } from 'lucide-react';


interface SponsoredBookPostProps {
  authorId?: string;
  authorName?: string;
  authorIcon?: string;
  roomName?: string;
  content?: string;
  bookId?: string;
  bookTitle?: string;
  bookAuthor?: string;
  commentsCount?: number;
  shopLink?: string;
}

export function SponsoredBookPost({ 
  authorId = "publisher-1",
  authorName = "Bloomsbury Publishing",
  authorIcon,
  roomName = "fantasy",
  content = "Discover the epic tale that started it all! Celaena Sardothien is her kingdom's most feared assassin. But she's also a prisoner, destined to serve hard labor in the salt mines of Endovier for life. When the Crown Prince offers her freedom in exchange for competing in a deadly tournament, she takes the chance...",
  bookId = "book-4",
  bookTitle = "Throne of Glass",
  bookAuthor = "Sarah J. Maas",
  commentsCount = 24,
  shopLink = "/shop"
}: SponsoredBookPostProps) {
  const [isSaved, setIsSaved] = useState(false);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="baebles-card overflow-hidden border border-baebles-gold/30"
      style={{ borderColor: 'hsl(var(--baebles-gold) / 0.35)' }}
    >
      {/* Sponsored label */}
      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-baebles-rose/10 border border-baebles-rose/20 w-fit mb-3">
        <Sparkles className="w-2.5 h-2.5 text-baebles-rose" />
        <span className="text-[9px] text-baebles-rose uppercase tracking-widest font-display">
          Sponsored
        </span>
      </div>

      {/* Header - same as ThreadCard */}
      <div className="flex items-start gap-3 mb-3">
        <Link to={`/profile/${authorId}`}>
          <motion.div 
            className="w-11 h-11 rounded-full bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center shrink-0 ring-2 ring-primary/20 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen className="w-5 h-5 text-primary" />
          </motion.div>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Link 
              to={`/profile/${authorId}`}
              className="font-display text-sm text-foreground truncate hover:text-primary transition-colors"
            >
              {authorName}
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-primary dark:text-baebles-gold font-medium">
              #{roomName}
            </span>
          </div>
        </div>
      </div>

      {/* Content - same as ThreadCard */}
      <p className="font-body text-foreground/90 mb-3 line-clamp-4 leading-relaxed">
        {content}
      </p>

      {/* Book attachment - links to book detail */}
      <Link
        to={`/books/${bookId}`}
        className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl mb-3 hover:bg-muted/50 transition-all group border border-transparent hover:border-primary/20"
      >
        <div className={`w-12 h-16 bg-gradient-to-br ${getBookColor(bookTitle)} rounded-lg flex items-center justify-center shrink-0 shadow-md relative overflow-hidden`}>
          {/* Book spine */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/20" />
          <span className="text-white text-xs font-display text-center px-1.5 drop-shadow-lg line-clamp-2">
            {bookTitle.split(' ').slice(0, 2).join(' ')}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-sm text-foreground truncate group-hover:text-primary transition-colors">
            {bookTitle}
          </h4>
          <p className="text-xs text-muted-foreground">by {bookAuthor}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </Link>

      {/* Footer - same as ThreadCard but with Shop link */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-3">
          {/* Comments */}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-body">{commentsCount}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Shop link */}
          <Link to={shopLink}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display"
              style={{ 
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--baebles-gold)))',
                color: 'hsl(var(--primary-foreground))',
                boxShadow: '0 2px 8px hsl(var(--primary) / 0.3)'
              }}
            >
              <ExternalLink className="w-3 h-3" />
              Shop
            </motion.button>
          </Link>

          {/* Save button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSaved(!isSaved)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              isSaved 
                ? 'text-baebles-orange bg-baebles-orange/10' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Bookmark className={`w-4 h-4 transition-all ${isSaved ? 'fill-current scale-110' : ''}`} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
