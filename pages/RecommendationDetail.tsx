import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { recommendationRequests, recommendationResponses, books, formatTimeAgo } from '@/data/mockData';
import { SUBGENRES, TROPES } from '@/types/onboarding';
import { getAvatarUrl } from '@/lib/avatarHelper';
import { 
  ArrowLeft, Bell, BellOff, BookOpen, Lock, Search, Send, X,
  Castle, Crown, Moon, Heart, Building2, Coffee, Columns3, 
  Sparkles, Sword, Map, Wand2, Sprout, Eclipse, Flame, Users, Star, 
  Hourglass, Scale, Shield, Compass, GraduationCap, Swords, 
  Gem, ScrollText, Unlock, Sunrise, Skull, LucideIcon, MessageSquare
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { BookLinkCard } from '@/components/common/BookLinkCard';
import { AskErikaModal } from '@/components/modals/AskErikaModal';

const iconMap: Record<string, LucideIcon> = {
  Castle, Crown, Moon, Heart, Building2, Coffee, Columns3, Sparkles,
  Sword, Map, Wand2, Sprout, Eclipse, Flame, Users, Star, Hourglass,
  Lock, Scale, Shield, Compass, GraduationCap, Swords, Gem, ScrollText,
  Unlock, Sunrise, Skull
};

const getIcon = (iconName: string, className = "w-3.5 h-3.5") => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
};

export default function RecommendationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const request = recommendationRequests.find(r => r.id === id);
  const responses = recommendationResponses.filter(r => r.requestId === id);
  
  const [isFollowing, setIsFollowing] = useState(request?.isFollowing || false);
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState('');
  const [reason, setReason] = useState('');
  const [bookQuery, setBookQuery] = useState('');
  const [showBookSearch, setShowBookSearch] = useState(false);
  const [erikaModalOpen, setErikaModalOpen] = useState(false);
  const [tbrBooks, setTbrBooks] = useState<string[]>([]);

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(bookQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(bookQuery.toLowerCase())
  );

  const selectedBookData = books.find((b) => b.id === selectedBook);

  if (!request) {
    return (
      <MainLayout>
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Request not found</p>
          <button onClick={() => navigate('/recommendations')} className="text-primary mt-4">
            Go back to recommendations
          </button>
        </div>
      </MainLayout>
    );
  }

  const subgenre = SUBGENRES.find(s => s.id === request.subgenre);

  const handleSubmitRecommendation = () => {
    if (!selectedBook) return;
    console.log('Submit recommendation:', { requestId: id, bookId: selectedBook, reason });
    setShowRecommendModal(false);
    setSelectedBook('');
    setReason('');
  };

  const addToTbr = (bookId: string, bookTitle: string) => {
    if (tbrBooks.includes(bookId)) {
      toast({
        title: "Already in TBR",
        description: `${bookTitle} is already in your TBR.`,
      });
      return;
    }
    setTbrBooks(prev => [...prev, bookId]);
    toast({
      title: "Added to TBR",
      description: `${bookTitle} has been added to your reading list.`,
    });
  };

  const isInTbr = (bookId: string) => tbrBooks.includes(bookId);

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

  return (
    <MainLayout>
      {/* Add padding at bottom for fixed input */}
      <div className="py-4 pb-24">



        {/* Request Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="baebles-card-simple mb-4"
        >
          {/* Author Header */}
          <div className="flex items-start gap-3 mb-4">
            <motion.div 
              className="w-12 h-12 rounded-full ring-2 ring-primary/30 overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img src={getAvatarUrl(request.author.avatarId)} alt={request.author.fantasyName} className="w-full h-full object-cover" />
            </motion.div>
            <div className="flex-1">
              <span className="font-display text-foreground">
                {request.author.fantasyName}
              </span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{formatTimeAgo(request.createdAt)}</span>
                {request.isMature && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-baebles-orange">
                      <Lock className="w-3 h-3" />
                      18+
                    </span>
                  </>
                )}
              </div>
            </div>
            
            {/* Follow Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-3 py-2 rounded-full text-xs font-display transition-all flex items-center gap-1.5 ${
                isFollowing
                  ? 'bg-baebles-orange/20 text-baebles-orange border border-baebles-orange/30'
                  : 'bg-primary/25 text-primary border border-primary/40 active:bg-primary/35'
              }`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </motion.button>
          </div>

          {/* Request Content */}
          <div className="relative pl-4 mb-4">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{ background: 'linear-gradient(to bottom, hsl(var(--baebles-gold)), hsl(var(--primary)))' }} />
            <p className="font-body text-lg text-foreground/90 italic leading-relaxed">
              "{request.content}"
            </p>
          </div>

          {/* Tags - Light gradient style */}
          <div className="flex flex-wrap gap-2">
            {subgenre && (
              <span className="baebles-pill">
                {getIcon(subgenre.icon)} {subgenre.name}
              </span>
            )}
            {request.tropes?.map(t => {
              const trope = TROPES.find(tr => tr.id === t);
              return trope && (
                <span 
                  key={t} 
                  className="baebles-pill"
                >
                  {getIcon(trope.icon)} {trope.name}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* Recommendations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="baebles-card-simple"
        >
          <h3 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Recommendations ({responses.length})
          </h3>

          {responses.length === 0 ? (
            <p className="text-muted-foreground text-center py-8 font-body">
              No recommendations yet. Be the first to suggest a book!
            </p>
          ) : (
            <div className="divide-y divide-border/50">
              {responses.map((response, index) => (
                <motion.div
                  key={response.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="py-3"
                >
                  {/* Recommender */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                      <img src={getAvatarUrl(response.author.avatarId)} alt={response.author.fantasyName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display text-sm text-foreground">{response.author.fantasyName}</span>
                        <span className="text-xs text-muted-foreground">{formatTimeAgo(response.createdAt)}</span>
                      </div>

                      {/* Book Card */}
                      <div className="mt-2">
                        <BookLinkCard book={response.book} variant="compact" />
                      </div>

                      {response.reason && (
                        <p className="text-sm text-foreground/90 font-body mt-2 leading-relaxed">
                          "{response.reason}"
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Fixed Recommend Button at Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-16 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border/50"
        style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}
      >
        <div className="max-w-lg mx-auto px-3 sm:px-4 py-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowRecommendModal(true)}
            className="baebles-btn-primary w-full py-3 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Recommend a Book
          </motion.button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </motion.div>

      {/* Recommend Modal */}
      <AnimatePresence>
        {showRecommendModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setShowRecommendModal(false)}
            />

            {/* Modal */}
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
                {/* Header */}
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-teal) / 0.3), hsl(var(--primary) / 0.2))' }}>
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-baebles-teal" />
                    </div>
                    <h2 className="font-display text-lg sm:text-xl bg-gradient-to-r from-baebles-teal via-primary to-baebles-teal bg-clip-text text-transparent">Recommend</h2>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowRecommendModal(false)}
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full active:bg-muted/80 transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Book selector */}
                  <div>
                    <label className="block text-xs sm:text-sm font-body text-muted-foreground mb-2">
                      Select a book to recommend *
                    </label>
                    {selectedBookData ? (
                      <div className="flex items-center gap-3 p-3 bg-muted/50 border border-border/50 rounded-xl">
                        <div className={`w-10 h-14 bg-gradient-to-br ${getBookColor(selectedBookData.title)} rounded-lg flex items-center justify-center shrink-0 shadow-md relative overflow-hidden`}>
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/20" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-sm truncate">{selectedBookData.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{selectedBookData.author}</p>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedBook('')}
                          className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground active:text-foreground active:bg-muted/80 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </div>
                    ) : showBookSearch ? (
                      <div className="bg-muted/50 border border-border/50 rounded-xl p-3">
                        <div className="relative mb-2">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            value={bookQuery}
                            onChange={(e) => setBookQuery(e.target.value)}
                            placeholder="Search books..."
                            autoFocus
                            className="w-full h-10 pl-9 pr-4 bg-card rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
                          />
                        </div>
                        <div className="max-h-40 overflow-y-auto space-y-1">
                          {filteredBooks.slice(0, 5).map((book) => (
                            <motion.button
                              key={book.id}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                setSelectedBook(book.id);
                                setShowBookSearch(false);
                                setBookQuery('');
                              }}
                              className="w-full flex items-center gap-2 p-2 rounded-lg active:bg-card text-left transition-colors"
                            >
                              <div className={`w-8 h-11 bg-gradient-to-br ${getBookColor(book.title)} rounded-md shrink-0`} />
                              <div className="min-w-0">
                                <p className="text-sm font-display truncate">{book.title}</p>
                                <p className="text-xs text-muted-foreground truncate">{book.author}</p>
                              </div>
                            </motion.button>
                          ))}
                          
                          {/* Ask Erika option - shown when no results or always as fallback */}
                          {(filteredBooks.length === 0 || bookQuery.length > 0) && (
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
                                <p className="text-xs text-muted-foreground truncate">
                                  {bookQuery ? `"${bookQuery}"` : "Can't find your book?"}
                                </p>
                              </div>
                            </motion.button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowBookSearch(true)}
                        className="w-full h-11 sm:h-12 px-3 sm:px-4 bg-muted/50 border border-border/50 rounded-xl font-body text-sm text-muted-foreground active:text-foreground text-left flex items-center gap-2 transition-all"
                      >
                        <Search className="w-4 h-4" />
                        Search for a book...
                      </motion.button>
                    )}
                  </div>

                  {/* Reason textarea */}
                  <div>
                    <label className="block text-xs sm:text-sm font-body text-muted-foreground mb-2">
                      Why do you recommend this? (optional)
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value.slice(0, 200))}
                      placeholder="This book is perfect because..."
                      className="w-full h-20 sm:h-24 p-3 sm:p-4 bg-muted/50 border border-border/50 rounded-xl font-body text-sm sm:text-base text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-6">
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowRecommendModal(false)} 
                    className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl font-display text-sm bg-muted/50 border border-border/50 text-muted-foreground active:bg-muted transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmitRecommendation}
                    disabled={!selectedBook}
                    className="baebles-btn-primary flex-1 py-2.5 sm:py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Ask Erika Modal */}
      <AskErikaModal
        isOpen={erikaModalOpen}
        onClose={() => setErikaModalOpen(false)}
        prefillTitle={bookQuery}
      />
    </MainLayout>
  );
}
