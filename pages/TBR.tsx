import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { books } from '@/data/mockData';
import { SUBGENRES } from '@/types/onboarding';
import { 
  ArrowLeft, BookmarkCheck, Filter, SortAsc, Check, X, 
  ChevronDown, Trash2, BookOpen
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

type SortOption = 'added' | 'title' | 'author' | 'release';
type ReadingStatus = 'all' | 'not-started' | 'reading' | 'completed';

interface TBRBook {
  id: string;
  title: string;
  author: string;
  seriesName?: string;
  seriesPosition?: number;
  subgenres: string[];
  releaseDate: Date;
  readingProgress: number; // 0-100
  addedAt: Date;
}

export default function TBR() {
  const navigate = useNavigate();
  
  // Mock TBR data with reading progress
  const [tbrBooks, setTbrBooks] = useState<TBRBook[]>(
    books.filter(b => b.isInTBR).map((book, index) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      seriesName: book.seriesName,
      seriesPosition: book.seriesPosition,
      subgenres: book.subgenres,
      releaseDate: book.releaseDate,
      readingProgress: [0, 35, 100, 0][index % 4], // Mock progress
      addedAt: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)), // Mock added dates
    }))
  );

  const [sortBy, setSortBy] = useState<SortOption>('added');
  const [statusFilter, setStatusFilter] = useState<ReadingStatus>('all');
  const [subgenreFilter, setSubgenreFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  // Get status from progress
  const getStatus = (progress: number): ReadingStatus => {
    if (progress === 0) return 'not-started';
    if (progress === 100) return 'completed';
    return 'reading';
  };

  // Filter books
  const filteredBooks = tbrBooks.filter(book => {
    if (statusFilter !== 'all' && getStatus(book.readingProgress) !== statusFilter) return false;
    if (subgenreFilter && !book.subgenres.includes(subgenreFilter)) return false;
    return true;
  });

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      case 'release':
        return b.releaseDate.getTime() - a.releaseDate.getTime();
      case 'added':
      default:
        return b.addedAt.getTime() - a.addedAt.getTime();
    }
  });

  const getBookColor = (title: string) => {
    const colors = [
      'from-violet-500 via-purple-600 to-indigo-700',
      'from-rose-400 via-pink-500 to-purple-600',
      'from-amber-400 via-orange-500 to-red-600',
      'from-emerald-400 via-teal-500 to-cyan-600',
      'from-blue-400 via-indigo-500 to-violet-600',
    ];
    const index = title.length % colors.length;
    return colors[index];
  };

  const updateProgress = (bookId: string, progress: number) => {
    setTbrBooks(prev => prev.map(book => 
      book.id === bookId ? { ...book, readingProgress: progress } : book
    ));
    toast({
      title: progress === 100 ? "Book completed!" : "Progress updated",
      description: progress === 100 ? "Congratulations on finishing!" : `${progress}% complete`,
    });
  };

  const removeFromTBR = (bookId: string, bookTitle: string) => {
    setTbrBooks(prev => prev.filter(book => book.id !== bookId));
    toast({
      title: "Removed from TBR",
      description: `"${bookTitle}" removed from your list`,
    });
  };

  const sortLabels: Record<SortOption, string> = {
    added: 'Date Added',
    title: 'Title',
    author: 'Author',
    release: 'Release Date',
  };

  const statusLabels: Record<ReadingStatus, string> = {
    all: 'All',
    'not-started': 'Not Started',
    reading: 'Reading',
    completed: 'Completed',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      <div className="py-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-baebles-teal/30 to-primary/20 flex items-center justify-center shadow-lg shrink-0" style={{ boxShadow: '0 0 20px hsl(var(--baebles-teal) / 0.3)' }}>
              <BookmarkCheck className="w-4 h-4 sm:w-5 sm:h-5 text-baebles-teal" />
            </div>
            <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-baebles-teal via-primary to-baebles-teal bg-clip-text text-transparent">
              My TBR ({tbrBooks.length})
            </h1>
          </div>
        </div>

        {/* Sort & Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mb-4"
        >
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex-1 h-10 px-3 bg-muted/50 border border-border/50 rounded-xl text-sm font-body flex items-center justify-between gap-2 active:bg-muted transition-colors">
                <div className="flex items-center gap-2">
                  <SortAsc className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{sortLabels[sortBy]}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              {(Object.keys(sortLabels) as SortOption[]).map(option => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setSortBy(option)}
                  className="py-2.5"
                >
                  <span className={sortBy === option ? 'text-primary font-medium' : ''}>
                    {sortLabels[option]}
                  </span>
                  {sortBy === option && <Check className="w-4 h-4 ml-auto text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`h-10 px-4 rounded-xl text-sm font-display flex items-center gap-2 transition-all ${
              showFilters || statusFilter !== 'all' || subgenreFilter
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 border border-border/50 text-muted-foreground active:bg-muted'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filter
          </motion.button>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="baebles-card p-4 space-y-4">
                {/* Status Filter */}
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(statusLabels) as ReadingStatus[]).map(status => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-3 py-1.5 rounded-full text-xs font-display transition-all ${
                          statusFilter === status
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted/50 text-muted-foreground active:bg-muted border border-border/50'
                        }`}
                      >
                        {statusLabels[status]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subgenre Filter */}
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Subgenre</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSubgenreFilter('')}
                      className={`px-3 py-1.5 rounded-full text-xs font-display transition-all ${
                        !subgenreFilter
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/50 text-muted-foreground active:bg-muted border border-border/50'
                      }`}
                    >
                      All
                    </button>
                    {SUBGENRES.slice(0, 6).map(subgenre => (
                      <button
                        key={subgenre.id}
                        onClick={() => setSubgenreFilter(subgenre.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-display transition-all ${
                          subgenreFilter === subgenre.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted/50 text-muted-foreground active:bg-muted border border-border/50'
                        }`}
                      >
                        {subgenre.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(statusFilter !== 'all' || subgenreFilter) && (
                  <button
                    onClick={() => {
                      setStatusFilter('all');
                      setSubgenreFilter('');
                    }}
                    className="text-xs text-primary flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Clear filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Books List */}
        <AnimatePresence mode="wait">
          {sortedBooks.length > 0 ? (
            <>
              {/* Not Started Books - 2 Column Grid */}
              {sortedBooks.filter(b => b.readingProgress === 0).length > 0 && (
                <motion.div
                  key="not-started-section"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-6"
                >
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-display">Not Started</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {sortedBooks.filter(b => b.readingProgress === 0).map((book) => (
                      <motion.div
                        key={book.id}
                        variants={itemVariants}
                        className="baebles-card p-3 cursor-pointer"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(`/books/${book.id}`)}
                      >
                        {/* Book Cover */}
                        <div className={`w-full aspect-[2/3] bg-gradient-to-br ${getBookColor(book.title)} rounded-lg relative overflow-hidden shadow-lg mb-2`}>
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/20" />
                          {book.seriesName && (
                            <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-black/40 backdrop-blur-sm rounded-full">
                              <span className="text-white text-[8px] font-medium">#{book.seriesPosition}</span>
                            </div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center p-2 pl-4">
                            <span className="text-white text-xs font-display text-center line-clamp-3 leading-tight drop-shadow-lg">
                              {book.title}
                            </span>
                          </div>
                        </div>
                        
                        {/* Book Info */}
                        <h3 className="font-display text-xs text-foreground line-clamp-2 leading-tight mb-0.5">
                          {book.title}
                        </h3>
                        <p className="text-[10px] text-muted-foreground truncate mb-2">
                          {book.author}
                        </p>
                        
                        {/* Start Reading Button */}
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateProgress(book.id, 5);
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-display transition-all bg-primary/15 text-primary active:bg-primary/25"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Start Reading</span>
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* In Progress / Completed Books - List Layout */}
              {sortedBooks.filter(b => b.readingProgress > 0).length > 0 && (
                <motion.div
                  key="in-progress-section"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-display">
                    {sortedBooks.some(b => b.readingProgress > 0 && b.readingProgress < 100) ? 'Reading' : 'Completed'}
                  </h3>
                  <div className="space-y-3">
                    {sortedBooks.filter(b => b.readingProgress > 0).map((book) => {
                      const status = getStatus(book.readingProgress);
                      
                      return (
                        <motion.div
                          key={book.id}
                          variants={itemVariants}
                          className="baebles-card p-3 sm:p-4"
                        >
                          <div className="flex gap-3 sm:gap-4">
                            {/* Book Cover */}
                            <div className={`w-16 sm:w-20 aspect-[2/3] bg-gradient-to-br ${getBookColor(book.title)} rounded-lg sm:rounded-xl relative overflow-hidden shadow-lg shrink-0`}>
                              <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/20" />
                              {book.seriesName && (
                                <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-black/40 backdrop-blur-sm rounded-full">
                                  <span className="text-white text-[8px] font-medium">#{book.seriesPosition}</span>
                                </div>
                              )}
                              <div className="absolute inset-0 flex items-center justify-center p-2 pl-4">
                                <span className="text-white text-[10px] sm:text-xs font-display text-center line-clamp-3 leading-tight drop-shadow-lg">
                                  {book.title}
                                </span>
                              </div>
                              
                              {/* Progress overlay at bottom */}
                              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/30">
                                <div 
                                  className="h-full bg-baebles-teal transition-all"
                                  style={{ width: `${book.readingProgress}%` }}
                                />
                              </div>
                            </div>

                            {/* Book Info */}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-display text-sm sm:text-base text-foreground truncate mb-0.5">
                                {book.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-muted-foreground truncate mb-2">
                                {book.author}
                              </p>
                              
                              {/* Status Badge */}
                              <div className="flex items-center gap-2 mb-3">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-display ${
                                  status === 'completed' 
                                    ? 'bg-baebles-teal/20 text-baebles-teal' 
                                    : 'bg-baebles-orange/20 text-baebles-orange'
                                }`}>
                                  {status === 'completed' ? '✓ Completed' : `📖 ${book.readingProgress}%`}
                                </span>
                              </div>

                              {/* Progress Slider */}
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
                                  <span>Reading progress</span>
                                  <span className="font-display">{book.readingProgress}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  step="5"
                                  value={book.readingProgress}
                                  onChange={(e) => updateProgress(book.id, parseInt(e.target.value))}
                                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md"
                                />
                              </div>
                            </div>

                            {/* Remove Button */}
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFromTBR(book.id, book.title)}
                              className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full text-muted-foreground active:text-destructive active:bg-destructive/10 transition-colors self-start"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="baebles-card p-8 text-center"
            >
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-base text-muted-foreground font-body mb-1">
                {statusFilter !== 'all' || subgenreFilter ? 'No books match your filters' : 'Your TBR is empty'}
              </p>
              <p className="text-sm text-muted-foreground/70">
                {statusFilter !== 'all' || subgenreFilter 
                  ? 'Try adjusting your filters' 
                  : 'Add books from New Releases or Recommendations'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}
