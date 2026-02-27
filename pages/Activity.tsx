import { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { currentUser, books, recommendationRequests, comments, threads, users, formatTimeAgo } from '@/data/mockData';
import { MessageSquare, Lightbulb, BookmarkCheck, Activity, ChevronRight, Heart, Users, UserPlus, UserCheck, AlertTriangle, Moon } from 'lucide-react';
import defaultAvatar from '@/assets/avatars/fae-female-1.png';
import { getAvatarUrl } from '@/lib/avatarHelper';

const TAB_ORDER = ['threads', 'comments', 'reco', 'tbr', 'followers'] as const;
type TabId = typeof TAB_ORDER[number];

export default function ActivityPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('threads');
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right'>('right');
  const [followingStates, setFollowingStates] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    const currentIndex = TAB_ORDER.indexOf(activeTab);
    if (direction === 'left' && currentIndex < TAB_ORDER.length - 1) {
      setSwipeDirection('left');
      setActiveTab(TAB_ORDER[currentIndex + 1]);
    } else if (direction === 'right' && currentIndex > 0) {
      setSwipeDirection('right');
      setActiveTab(TAB_ORDER[currentIndex - 1]);
    }
  }, [activeTab]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    // Only swipe if horizontal movement > 50px and greater than vertical
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      handleSwipe(deltaX < 0 ? 'left' : 'right');
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Get TBR books
  const tbrBooks = books.filter(b => b.isInTBR);

  // Mock followers (users who follow current user)
  const myFollowers = users.slice(1, 5);

  const toggleFollow = (userId: string) => {
    setFollowingStates(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

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

  // Get user data
  const myThreads = threads.filter(t => t.authorId === 'user-1');
  const myComments = comments.filter(c => c.authorId === 'user-1');
  const followedRecos = recommendationRequests.filter(r => r.isFollowing);

  const getThreadTitle = (threadId: string) => {
    const thread = threads.find(t => t.id === threadId);
    return thread ? thread.content.slice(0, 50) + '...' : 'Thread';
  };

  return (
    <MainLayout>
      <div className="py-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-5"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.25), hsl(var(--baebles-gold) / 0.15))' }}>
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent">
            My Activity
          </h1>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-1.5 mb-5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide"
        >
          {[
            { id: 'threads', label: 'Threads', icon: MessageSquare, count: myThreads.length },
            { id: 'comments', label: 'Comments', icon: MessageSquare, count: myComments.length },
            { id: 'reco', label: 'Recs', icon: Lightbulb, count: followedRecos.length },
            { id: 'tbr', label: 'TBR', icon: BookmarkCheck, count: tbrBooks.length },
            { id: 'followers', label: 'Followers', icon: Users, count: myFollowers.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                const newIndex = TAB_ORDER.indexOf(tab.id as TabId);
                const oldIndex = TAB_ORDER.indexOf(activeTab);
                setSwipeDirection(newIndex > oldIndex ? 'left' : 'right');
                setActiveTab(tab.id as TabId);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-display transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                activeTab === tab.id
                  ? 'text-primary-foreground shadow-lg'
                  : 'text-foreground/70 active:bg-muted/80'
              }`}
              style={activeTab === tab.id ? {
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--baebles-gold)))'
              } : {
                background: 'hsl(var(--muted) / 0.6)',
                border: '1px solid hsl(var(--border) / 0.5)'
              }}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
              {tab.count > 0 && (
                <span className={`min-w-[18px] h-[18px] rounded-full text-[10px] flex items-center justify-center font-medium ${
                  activeTab === tab.id ? 'bg-white/25 text-white' : 'bg-primary/15 text-primary'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className="min-h-[200px]">
        <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: swipeDirection === 'left' ? 60 : -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: swipeDirection === 'left' ? -60 : 60 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {activeTab === 'threads' && (
            myThreads.length > 0 ? (
              <div className="space-y-3">
                {myThreads.map((thread) => (
                  <Link
                    key={thread.id}
                    to={`/threads/${thread.id}`}
                    className="block baebles-card-simple p-4 active:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-primary dark:text-baebles-gold font-medium">#{thread.roomName}</span>
                      {thread.hasSpoilers && <span title="Spoilers" className="text-muted-foreground"><AlertTriangle className="w-3 h-3 inline" /></span>}
                      {thread.isMature && <span title="Mature" className="text-baebles-purple"><Moon className="w-3 h-3 inline" /></span>}
                    </div>
                    <p className="text-sm font-body text-foreground leading-relaxed line-clamp-2">{thread.content}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {thread.commentsCount}
                      </span>
                      <span>{formatTimeAgo(thread.createdAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="baebles-card-simple p-6 text-center">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground font-body">No threads yet</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Start a discussion in the Feed</p>
              </div>
            )
          )}

          {activeTab === 'comments' && (
            myComments.length > 0 ? (
              <div className="space-y-3">
                {myComments.map((comment) => (
                  <Link
                    key={comment.id}
                    to={`/threads/${comment.threadId}`}
                    className="block baebles-card-simple p-4 active:bg-muted/50 transition-colors"
                  >
                    <p className="text-sm font-body text-foreground leading-relaxed line-clamp-2">"{comment.content}"</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">on</span>
                      <span className="text-xs text-primary truncate flex-1">{getThreadTitle(comment.threadId)}</span>
                      <span className="text-xs text-muted-foreground">{formatTimeAgo(comment.createdAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="baebles-card-simple p-6 text-center">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground font-body">No comments yet</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Join conversations in threads</p>
              </div>
            )
          )}

          {activeTab === 'reco' && (
            followedRecos.length > 0 ? (
              <div className="space-y-3">
                {followedRecos.map((reco) => (
                  <Link
                    key={reco.id}
                    to={`/recommendations/${reco.id}`}
                    className="flex items-start gap-3 baebles-card-simple p-4 active:bg-muted/50 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                      <img src={getAvatarUrl(reco.author.avatarId)} alt={reco.author.fantasyName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body text-foreground leading-relaxed line-clamp-2 italic">"{reco.content}"</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{reco.author.fantasyName}</span>
                        <span className="flex items-center gap-1 text-xs text-baebles-orange">
                          <Heart className="w-3 h-3" />
                          Following
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="baebles-card-simple p-6 text-center">
                <Lightbulb className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground font-body">No followed recommendations</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Follow recs requests to see updates here</p>
              </div>
            )
          )}

          {activeTab === 'tbr' && (
            tbrBooks.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {tbrBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -2 }}
                    onClick={() => navigate(`/books/${book.id}`)}
                    className="baebles-card-simple p-3 cursor-pointer"
                  >
                    {/* Book Cover */}
                    <div className={`w-full aspect-[2/3] bg-gradient-to-br ${getBookColor(book.title)} rounded-xl mb-2.5 relative overflow-hidden shadow-lg`}>
                      <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/20" />
                      {book.seriesName && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded-full">
                          <span className="text-white text-[10px] font-medium">#{book.seriesPosition}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center p-3 pl-5">
                        <span className="text-white text-xs font-display text-center line-clamp-3 leading-tight drop-shadow-lg">
                          {book.title}
                        </span>
                      </div>
                    </div>
                    
                    {/* Book Info */}
                    <h4 className="font-display text-xs text-foreground line-clamp-2 mb-0.5 leading-tight">
                      {book.title}
                    </h4>
                    <p className="text-[10px] text-muted-foreground truncate mb-1.5">
                      {book.author}
                    </p>
                    
                    {/* Series Info */}
                    {book.seriesName && (
                      <p className="text-[10px] text-primary/70 truncate flex items-center gap-1">
                        <span>📚</span>
                        <span>{book.seriesName}</span>
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="baebles-card-simple p-6 text-center">
                <BookmarkCheck className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground font-body">Your TBR is empty</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Add books from New Releases or Recommendations</p>
              </div>
            )
          )}

          {activeTab === 'followers' && (
            myFollowers.length > 0 ? (
              <div className="space-y-2">
                {myFollowers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 baebles-card-simple p-3"
                  >
                    <Link 
                      to={`/profile/${user.id}`}
                      className="flex items-center gap-3 flex-1 min-w-0"
                    >
                      <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-primary/20 flex-shrink-0">
                        <img 
                          src={defaultAvatar} 
                          alt={user.fantasyName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-sm text-foreground truncate">
                          {user.fantasyName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate capitalize">
                          {user.race}
                        </p>
                      </div>
                    </Link>
                    
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleFollow(user.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-display transition-all flex-shrink-0 ${
                        followingStates[user.id]
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'bg-primary text-primary-foreground shadow-md'
                      }`}
                    >
                      {followingStates[user.id] ? (
                        <>
                          <UserCheck className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Following</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Follow</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="baebles-card-simple p-6 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground font-body">No followers yet</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Share your profile to get followers</p>
              </div>
            )
          )}
        </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  );
}
