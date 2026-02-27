import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, BookmarkCheck, Lightbulb, Heart } from 'lucide-react';
import { threads, books, recommendationRequests, users, formatTimeAgo } from '@/data/mockData';
import { ThreadCard } from './ThreadCard';
import defaultAvatar from '@/assets/avatars/fae-female-1.png';

// Mock: users the current user is following (user-2, user-3, user-4)
const followingIds = ['user-2', 'user-3', 'user-4'];

// Get content from followed users
const followedThreads = threads.filter(t => followingIds.includes(t.authorId));
const followedTBR = books.filter(b => b.isInTBR).slice(0, 4); // Mock: TBR from followed users
const followedRecos = recommendationRequests.filter(r => followingIds.includes(r.authorId));

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

type ContentType = 'all' | 'threads' | 'tbr' | 'reco';

export function ForYouFeed() {
  const [contentFilter, setContentFilter] = useState<ContentType>('all');

  const filters: { id: ContentType; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'All', icon: Heart },
    { id: 'threads', label: 'Threads', icon: MessageSquare },
    { id: 'tbr', label: 'TBR', icon: BookmarkCheck },
    { id: 'reco', label: 'Recs', icon: Lightbulb },
  ];

  // Build mixed feed for "All"
  const buildMixedFeed = () => {
    const items: { type: 'thread' | 'tbr' | 'reco'; data: any; date: Date }[] = [];
    
    followedThreads.forEach(t => items.push({ type: 'thread', data: t, date: t.createdAt }));
    followedRecos.forEach(r => items.push({ type: 'reco', data: r, date: r.createdAt }));
    // TBR doesn't have dates, use mock dates
    followedTBR.forEach((b, i) => items.push({ 
      type: 'tbr', 
      data: { book: b, user: users[i % users.length] }, 
      date: new Date(Date.now() - (i + 1) * 3 * 60 * 60 * 1000) 
    }));
    
    return items.sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const renderTBRItem = (book: typeof books[0], user: typeof users[0], index: number) => (
    <motion.div
      key={`tbr-${book.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="baebles-card-simple p-4"
    >
      {/* User info */}
      <div className="flex items-center gap-2 mb-3">
        <Link to={`/profile/${user.id}`} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-primary/20">
            <img src={defaultAvatar} alt={user.fantasyName} className="w-full h-full object-cover" />
          </div>
          <span className="font-display text-sm text-foreground">{user.fantasyName}</span>
        </Link>
        <span className="text-xs text-muted-foreground">added to TBR</span>
      </div>
      
      {/* Book */}
      <Link to={`/books/${book.id}`} className="flex gap-3">
        <div className={`w-16 aspect-[2/3] bg-gradient-to-br ${getBookColor(book.title)} rounded-lg relative overflow-hidden shadow-md flex-shrink-0`}>
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <span className="text-white text-[10px] font-display text-center line-clamp-3 leading-tight drop-shadow-lg">
              {book.title}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-sm text-foreground line-clamp-2">{book.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
          {book.seriesName && (
            <p className="text-xs text-primary mt-1">{book.seriesName} #{book.seriesPosition}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );

  const renderRecoItem = (reco: typeof recommendationRequests[0], index: number) => (
    <motion.div
      key={reco.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/recommendations/${reco.id}`}
        className="block baebles-card-simple p-4"
      >
        {/* User info */}
        <div className="flex items-center gap-2 mb-2">
          <Link to={`/profile/${reco.authorId}`} onClick={e => e.stopPropagation()} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-primary/20">
              <img src={defaultAvatar} alt={reco.author.fantasyName} className="w-full h-full object-cover" />
            </div>
            <span className="font-display text-sm text-foreground">{reco.author.fantasyName}</span>
          </Link>
          <span className="text-xs text-muted-foreground">asked for recommendations</span>
        </div>
        
        <p className="text-base font-body text-foreground line-clamp-2 italic">"{reco.content}"</p>
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-baebles-gold" />
            {reco.responsesCount} responses
          </span>
          <span>{formatTimeAgo(reco.createdAt)}</span>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <div className="space-y-4">
      {/* Content Type Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setContentFilter(filter.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-display whitespace-nowrap transition-all ${
              contentFilter === filter.id
                ? 'from-primary/20 to-baebles-gold/12 text-primary font-medium border border-primary/30'
                : 'bg-muted/60 text-foreground/70 border border-border/50'
            }`}
          >
            <filter.icon className="w-3.5 h-3.5" />
            {filter.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {contentFilter === 'all' && (
        <div className="space-y-4">
          {buildMixedFeed().length > 0 ? (
            buildMixedFeed().map((item, index) => {
              if (item.type === 'thread') {
                return <ThreadCard key={item.data.id} thread={item.data} />;
              } else if (item.type === 'tbr') {
                return renderTBRItem(item.data.book, item.data.user, index);
              } else {
                return renderRecoItem(item.data, index);
              }
            })
          ) : (
            <div className="baebles-card-simple p-8 text-center">
              <Heart className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground font-body">No content from people you follow yet</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Follow more people to see their activity here</p>
            </div>
          )}
        </div>
      )}

      {contentFilter === 'threads' && (
        <div className="space-y-4">
          {followedThreads.length > 0 ? (
            followedThreads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))
          ) : (
            <div className="baebles-card-simple p-8 text-center">
              <MessageSquare className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground font-body">No threads from people you follow</p>
            </div>
          )}
        </div>
      )}

      {contentFilter === 'tbr' && (
        <div className="space-y-4">
          {followedTBR.length > 0 ? (
            followedTBR.map((book, index) => renderTBRItem(book, users[index % users.length], index))
          ) : (
            <div className="baebles-card-simple p-8 text-center">
              <BookmarkCheck className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground font-body">No TBR updates from people you follow</p>
            </div>
          )}
        </div>
      )}

      {contentFilter === 'reco' && (
        <div className="space-y-4">
          {followedRecos.length > 0 ? (
            followedRecos.map((reco, index) => renderRecoItem(reco, index))
          ) : (
            <div className="baebles-card-simple p-8 text-center">
              <Lightbulb className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground font-body">No recommendations from people you follow</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
