import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { FilterTabs } from '@/components/common/FilterTabs';
import { books } from '@/data/mockData';
import { Calendar, Clock, Bell, BellOff, Sparkles, Star, BookmarkPlus, Bookmark, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function NewReleases() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'coming' | 'released' | 'followed'>('coming');
  const [followedSeries, setFollowedSeries] = useState<string[]>([]);
  const [tbrBooks, setTbrBooks] = useState<string[]>([]);
  
  const now = new Date();
  const comingSoon = books.filter(b => b.releaseDate > now).sort((a, b) => a.releaseDate.getTime() - b.releaseDate.getTime());
  const justReleased = books.filter(b => b.releaseDate <= now).sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime());
  const followedBooks = books.filter(b => followedSeries.includes(b.id)).sort((a, b) => a.releaseDate.getTime() - b.releaseDate.getTime());
  const displayBooks = tab === 'coming' ? comingSoon : tab === 'released' ? justReleased : followedBooks;

  const toggleFollow = (bookId: string) => {
    setFollowedSeries(prev => 
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const toggleTbr = (bookId: string, bookTitle: string) => {
    const isAdding = !tbrBooks.includes(bookId);
    setTbrBooks(prev => 
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
    toast({
      title: isAdding ? "Added to TBR" : "Removed from TBR",
      description: isAdding ? `"${bookTitle}" added to your reading list` : `"${bookTitle}" removed from your list`,
    });
  };

  const getBookColor = (title: string) => {
    const colors = [
      'from-violet-500 via-purple-600 to-indigo-700',
      'from-rose-400 via-pink-500 to-purple-600',
      'from-amber-400 via-orange-500 to-red-600',
      'from-emerald-400 via-teal-500 to-cyan-600',
      'from-blue-400 via-indigo-500 to-violet-600',
      'from-fuchsia-400 via-pink-500 to-rose-600',
      'from-cyan-400 via-teal-500 to-emerald-600',
      'from-yellow-400 via-amber-500 to-orange-600',
    ];
    const index = title.length % colors.length;
    return colors[index];
  };

  const getDaysUntil = (date: Date) => {
    const diff = date.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <MainLayout>
      <div className="py-4">
        {/* Header with magical styling */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 sm:gap-3 mb-5"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary/30 to-baebles-purple/20 flex items-center justify-center shadow-lg shrink-0" style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' }}>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent">Releases</h1>
        </motion.div>

        {/* Tabs */}
        <FilterTabs
          tabs={[
            { id: 'coming', label: 'Coming', icon: Clock },
            { id: 'released', label: 'Released', icon: Calendar },
            { id: 'followed', label: 'Followed', icon: Heart },
          ]}
          activeTab={tab}
          onTabChange={(id) => setTab(id as 'coming' | 'released' | 'followed')}
          variant="badge"
        />

        {/* Books List */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={tab}
            className="grid grid-cols-2 gap-2 sm:gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayBooks.map((book) => {
              const daysUntil = getDaysUntil(book.releaseDate);
              const isFollowed = followedSeries.includes(book.id);
              const isInTbr = tbrBooks.includes(book.id);
              
              // Compact 2-column layout for "Just Released" and "Followed"
              if (tab === 'released' || tab === 'followed') {
                const isFuture = book.releaseDate > now;
                return (
                  <motion.div
                    key={book.id}
                    variants={itemVariants}
                    className="baebles-card-simple p-2 sm:p-3 cursor-pointer"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/books/${book.id}`)}
                  >
                    {/* Book Cover */}
                    <div className={`w-full aspect-[2/3] bg-gradient-to-br ${getBookColor(book.title)} rounded-lg relative overflow-hidden shadow-lg mb-1.5 sm:mb-2`}>
                      <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-black/20" />
                      {book.seriesName && (
                        <div className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 px-1 sm:px-1.5 py-0.5 bg-black/40 backdrop-blur-sm rounded-full">
                          <span className="text-white text-[7px] sm:text-[8px] font-medium">#{book.seriesPosition}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center p-1.5 sm:p-2 pl-3 sm:pl-4">
                        <span className="text-white text-xs sm:text-sm font-display text-center line-clamp-3 leading-tight drop-shadow-lg">
                          {book.title}
                        </span>
                      </div>
                    </div>
                    
                    {/* Book Info */}
                    <h3 className="font-display text-xs sm:text-sm text-foreground line-clamp-2 leading-tight mb-0.5">
                      {book.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate mb-1">
                      {book.author}
                    </p>
                    
                    {/* Series name - hidden on very small screens */}
                    {book.seriesName && (
                      <p className="hidden sm:flex text-xs text-primary/70 mb-1 items-center gap-1 truncate">
                        <Star className="w-3 h-3 shrink-0" />
                        <span className="truncate">{book.seriesName}</span>
                      </p>
                    )}
                    
                    {/* Release date */}
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-baebles-gold mb-2">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{book.releaseDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    
                    {/* TBR Button */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTbr(book.id, book.title);
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs sm:text-sm font-display transition-all ${
                        isInTbr
                          ? 'bg-baebles-teal text-white shadow-md'
                          : 'bg-primary/15 text-primary active:bg-primary/25'
                      }`}
                    >
                      {isInTbr ? <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <BookmarkPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      <span>{isInTbr ? 'In TBR' : 'TBR'}</span>
                    </motion.button>
                  </motion.div>
                );
               }
              
              // Same compact 2-column layout for "Coming Soon"
              return (
                <motion.div
                  key={book.id}
                  variants={itemVariants}
                  className="baebles-card-simple p-2 sm:p-3 cursor-pointer"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/books/${book.id}`)}
                >
                  {/* Book Cover */}
                  <div className={`w-full aspect-[2/3] bg-gradient-to-br ${getBookColor(book.title)} rounded-lg relative overflow-hidden shadow-lg mb-1.5 sm:mb-2`}>
                    <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-black/20" />
                    {book.seriesName && (
                      <div className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 px-1 sm:px-1.5 py-0.5 bg-black/40 backdrop-blur-sm rounded-full">
                        <span className="text-white text-[7px] sm:text-[8px] font-medium">#{book.seriesPosition}</span>
                      </div>
                    )}
                    {daysUntil <= 7 && (
                      <div className="absolute bottom-1 left-1 sm:bottom-1.5 sm:left-1.5 px-1 sm:px-1.5 py-0.5 bg-baebles-orange/90 rounded-full">
                        <span className="text-white text-[7px] sm:text-[8px] font-medium">Soon!</span>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center p-1.5 sm:p-2 pl-3 sm:pl-4">
                      <span className="text-white text-xs sm:text-sm font-display text-center line-clamp-3 leading-tight drop-shadow-lg">
                        {book.title}
                      </span>
                    </div>
                  </div>
                  
                  {/* Book Info */}
                  <h3 className="font-display text-xs sm:text-sm text-foreground line-clamp-2 leading-tight mb-0.5">
                    {book.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate mb-1">
                    {book.author}
                  </p>
                  
                  {/* Series name - hidden on very small screens */}
                  {book.seriesName && (
                    <p className="hidden sm:flex text-xs text-primary/70 mb-1 items-center gap-1 truncate">
                      <Star className="w-3 h-3 shrink-0" />
                      <span className="truncate">{book.seriesName}</span>
                    </p>
                  )}
                  
                  {/* Release date */}
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-baebles-gold mb-2">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{book.releaseDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                  </div>
                  
                  {/* Follow Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFollow(book.id);
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs sm:text-sm font-display transition-all ${
                      isFollowed
                        ? 'bg-baebles-orange text-white shadow-md'
                        : 'bg-primary/25 text-primary border border-primary/40 active:bg-primary/35'
                    }`}
                  >
                    {isFollowed ? 'Unfollow' : 'Follow'}
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {displayBooks.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-body">No books in this category</p>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
