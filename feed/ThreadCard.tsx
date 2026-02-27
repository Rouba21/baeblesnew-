import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, MessageCircle, MoreHorizontal, Flag, Eye, AlertTriangle, Flame as FireIcon, Moon as MoonIcon } from 'lucide-react';
import { Thread, formatTimeAgo } from '@/data/mockData';
import { ReportModal } from '@/components/modals/ReportModal';
import { BookLinkCard } from '@/components/common/BookLinkCard';
import { getAvatarUrl } from '@/lib/avatarHelper';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ThreadCardProps {
  thread: Thread;
}

export function ThreadCard({ thread }: ThreadCardProps) {
  const [isSaved, setIsSaved] = useState(thread.isSaved);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [spoilerRevealed, setSpoilerRevealed] = useState(false);

  const hasSpoiler = thread.hasSpoilers && !spoilerRevealed;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="baebles-card-simple overflow-hidden relative"
      >
        {/* Spoiler Overlay */}
        {hasSpoiler && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card/90 backdrop-blur-lg rounded-2xl">
            {/* Decorative glow */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-baebles-purple/10 blur-3xl" />
            </div>
            
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-baebles-purple/15 flex items-center justify-center mb-3">
                <AlertTriangle className="w-6 h-6 text-baebles-purple" />
              </div>
              <p className="font-display text-base text-foreground mb-1">Spoiler Alert</p>
              <p className="text-xs text-muted-foreground mb-1 text-center px-8 leading-relaxed">
                This post contains spoilers{thread.book && (
                  <> about <span className="font-display text-baebles-purple">"{thread.book.title}"</span></>
                )}
              </p>
              {!thread.book && <div className="mb-2" />}
              {thread.book && <div className="mb-3" />}
              {!thread.book && <div className="mb-3" />}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSpoilerRevealed(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-baebles-purple/15 text-baebles-purple text-sm font-display border border-baebles-purple/30 hover:bg-baebles-purple/25 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Reveal Content
              </motion.button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className={`flex items-start gap-3 mb-3 ${hasSpoiler ? 'blur-md pointer-events-none select-none' : ''}`}>
          <Link to={`/profile/${thread.authorId}`}>
             <motion.div 
              className="w-11 h-11 rounded-full shrink-0 ring-2 ring-primary/20 cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={getAvatarUrl(thread.author.avatarId)} alt={thread.author.fantasyName} className="w-full h-full object-cover" />
            </motion.div>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link 
                to={`/profile/${thread.authorId}`}
                className="font-display text-sm text-foreground truncate hover:text-primary transition-colors"
              >
                {thread.author.fantasyName}
              </Link>
              <span className="text-muted-foreground text-xs">•</span>
              <span className="text-muted-foreground text-xs">
                {formatTimeAgo(thread.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <Link
                to={`/rooms/${thread.roomId}`}
                className="text-xs text-primary dark:text-baebles-gold hover:opacity-80 transition-colors font-medium"
              >
                #{thread.roomName}
              </Link>
              {/* Community Symbols */}
              {thread.hasSpoilers && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted/80 text-muted-foreground text-xs" title="Spoilers ahead">
                  <FireIcon className="w-3 h-3" />
                </span>
              )}
              {thread.isMature && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-baebles-purple/20 text-baebles-purple text-xs" title="Mature (18+) content">
                  <MoonIcon className="w-3 h-3" />
                </span>
              )}
            </div>
          </div>
          
          {/* Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem 
                onClick={() => setReportModalOpen(true)}
                className="text-destructive focus:text-destructive"
              >
                <Flag className="w-4 h-4 mr-2" />
                Report Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Content */}
        <Link to={`/threads/${thread.id}`} className={`block group ${hasSpoiler ? 'blur-md pointer-events-none select-none' : ''}`}>
          <p className="font-body text-foreground/90 mb-3 line-clamp-4 group-hover:text-foreground transition-colors leading-relaxed">
            {thread.content}
          </p>
        </Link>

        {/* Book attachment */}
        {thread.book && (
          <div className={`mb-3 ${hasSpoiler ? 'blur-md pointer-events-none select-none' : ''}`}>
            <BookLinkCard book={thread.book} variant="default" />
          </div>
        )}

        {/* Footer */}
        <div className={`flex items-center justify-between pt-3 border-t border-border ${hasSpoiler ? 'blur-md pointer-events-none select-none' : ''}`}>
          <div className="flex items-center gap-3">
            {/* Comments link */}
            <Link
              to={`/threads/${thread.id}`}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <MessageCircle className="w-4 h-4 text-primary dark:text-baebles-gold group-hover:scale-110 transition-transform" />
              <span className="text-sm font-body">{thread.commentsCount}</span>
            </Link>
          </div>

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
            <span className="text-sm font-body">{isSaved ? 'Saved' : 'Save'}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        type="post"
        targetId={thread.id}
        targetName={thread.content.slice(0, 50)}
      />
    </>
  );
}
