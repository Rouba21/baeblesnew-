import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { ChevronLeft, BookOpen, User, Calendar, Tag, Heart, Plus, Check, BookmarkPlus, Bell, BellOff } from 'lucide-react';
import { books, Book } from '@/data/mockData';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function BookDetail() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  
  const book = books.find(b => b.id === bookId);
  
  const [isInTBR, setIsInTBR] = useState(book?.isInTBR || false);
  const [isFollowingSeries, setIsFollowingSeries] = useState(book?.isFollowingSeries || false);

  if (!book) {
    return (
      <MainLayout>
        <div className="py-8 text-center">
          <p className="text-muted-foreground">Book not found</p>
          <Link to="/feed" className="text-primary underline mt-4 inline-block">
            Return to Feed
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleAddToTBR = () => {
    setIsInTBR(!isInTBR);
    toast({
      title: isInTBR ? "Removed from TBR" : "Added to TBR",
      description: isInTBR ? `${book.title} removed from your reading list` : `${book.title} added to your reading list`,
    });
  };

  const handleFollowSeries = () => {
    if (!book.seriesName) return;
    setIsFollowingSeries(!isFollowingSeries);
    toast({
      title: isFollowingSeries ? "Unfollowed Series" : "Following Series",
      description: isFollowingSeries ? `You unfollowed ${book.seriesName}` : `You'll be notified about ${book.seriesName} releases`,
    });
  };

  // Get other books in the same series
  const seriesBooks = book.seriesId 
    ? books.filter(b => b.seriesId === book.seriesId && b.id !== book.id).sort((a, b) => (a.seriesPosition || 0) - (b.seriesPosition || 0))
    : [];

  return (
    <MainLayout>
      <div className="py-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary/30 to-baebles-purple/20 flex items-center justify-center shadow-lg shrink-0" style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' }}>
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <h1 className="font-display text-lg sm:text-xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent truncate">Book Details</h1>
        </motion.div>

        {/* Book Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="baebles-card-simple"
        >
          
          {/* Cover & Basic Info */}
          <div className="flex gap-4 mb-5">
            {/* Book Cover - Colored background */}
            <div 
              className="w-28 h-40 sm:w-32 sm:h-48 rounded-xl overflow-hidden flex-shrink-0 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--baebles-purple) / 0.4))'
              }}
            >
              <img 
                src={book.coverUrl} 
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title, Author, Series */}
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-xl sm:text-2xl text-foreground leading-tight mb-1">
                {book.title}
              </h2>
              
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <User className="w-4 h-4" />
                <span className="font-body text-sm">{book.author}</span>
              </div>

              {book.seriesName && (
                <div className="mb-3">
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                    📚 {book.seriesName} #{book.seriesPosition}
                  </Badge>
                </div>
              )}

              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <Calendar className="w-3 h-3" />
                <span>{new Date(book.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-5">
            <button
              onClick={handleAddToTBR}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-display text-sm transition-all ${
                isInTBR 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted/50 text-foreground border border-border hover:border-primary/50'
              }`}
            >
              {isInTBR ? <Check className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
              {isInTBR ? 'In TBR' : 'Add to TBR'}
            </button>

            {book.seriesName && (
              <button
                onClick={handleFollowSeries}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-display text-sm transition-all ${
                  isFollowingSeries 
                    ? 'bg-baebles-gold/20 text-baebles-gold border border-baebles-gold/50' 
                    : 'bg-muted/50 text-foreground border border-border hover:border-baebles-gold/50'
                }`}
              >
                {isFollowingSeries ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>

          {/* Description */}
          <div className="mb-5">
            <h3 className="font-display text-sm text-primary mb-2">Synopsis</h3>
            <p className="font-body text-sm text-foreground/80 leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* Subgenres */}
          {book.subgenres.length > 0 && (
            <div className="mb-4">
              <h3 className="font-display text-sm text-primary mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {book.subgenres.map(genre => (
                  <span 
                    key={genre} 
                    className="baebles-pill capitalize"
                  >
                    {genre.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tropes */}
          {book.tropes.length > 0 && (
            <div>
              <h3 className="font-display text-sm text-primary mb-2">Tropes</h3>
              <div className="flex flex-wrap gap-2">
                {book.tropes.map(trope => (
                  <span 
                    key={trope} 
                    className="baebles-pill capitalize"
                  >
                    <Heart className="w-3 h-3" />
                    {trope.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Series Books */}
        {seriesBooks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <h3 className="font-display text-sm text-primary uppercase tracking-wider mb-3">
              More in {book.seriesName}
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
              {seriesBooks.map(seriesBook => (
                <Link 
                  key={seriesBook.id}
                  to={`/books/${seriesBook.id}`}
                  className="flex-shrink-0 w-20"
                >
                  <div className="w-20 h-28 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-baebles-gold/15 mb-2 shadow-md hover:shadow-lg transition-shadow">
                    <img 
                      src={seriesBook.coverUrl} 
                      alt={seriesBook.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-body text-xs text-foreground truncate">{seriesBook.title}</p>
                  <p className="font-body text-xs text-muted-foreground">Book {seriesBook.seriesPosition}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
