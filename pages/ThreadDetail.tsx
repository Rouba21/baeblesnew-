import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { threads, comments, books, formatTimeAgo, Comment } from '@/data/mockData';
import { 
  ArrowLeft, Bookmark, MessageCircle, Key, Send, 
  Heart, MoreHorizontal, Flag, BookOpen
} from 'lucide-react';
import { getAvatarUrl } from '@/lib/avatarHelper';
import { Textarea } from '@/components/ui/textarea';
import { ReportModal, ReportType } from '@/components/modals/ReportModal';
import { BookLinkPicker } from '@/components/common/BookLinkPicker';
import { BookLinkCard } from '@/components/common/BookLinkCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ThreadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const thread = threads.find(t => t.id === id);
  const threadComments = comments.filter(c => c.threadId === id);
  
  const [isSaved, setIsSaved] = useState(thread?.isSaved || false);
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(threadComments);
  
  
  // Book linking state
  const [showBookSearch, setShowBookSearch] = useState(false);
  const [selectedBook, setSelectedBook] = useState('');
  
  const selectedBookData = books.find((b) => b.id === selectedBook);
  
  // Report modal state
  const [reportModal, setReportModal] = useState<{
    isOpen: boolean;
    type: ReportType;
    targetId: string;
    targetName?: string;
  }>({ isOpen: false, type: 'post', targetId: '' });

  if (!thread) {
    return (
      <MainLayout>
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Thread not found</p>
          <button onClick={() => navigate('/feed')} className="text-primary mt-4">
            Go back to feed
          </button>
        </div>
      </MainLayout>
    );
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

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `comment-new-${Date.now()}`,
      threadId: thread.id,
      authorId: 'user-1',
      author: {
        fantasyName: 'Aelith Shadowsong',
        raceEmoji: 'Flower2',
        avatarId: 'fae-female-1',
      },
      content: newComment,
      createdAt: new Date(),
      book: selectedBookData ? { id: selectedBookData.id, title: selectedBookData.title, author: selectedBookData.author } : undefined,
    };
    
    setLocalComments([...localComments, comment]);
    setNewComment('');
    setSelectedBook('');
    setShowBookSearch(false);
  };

  const openReportModal = (type: ReportType, targetId: string, targetName?: string) => {
    setReportModal({ isOpen: true, type, targetId, targetName });
  };

  const allComments = localComments;

  const CommentItem = ({ comment }: { comment: Comment }) => {
    
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="py-3">
          {/* Comment Header */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
              <img src={getAvatarUrl(comment.author.avatarId)} alt={comment.author.fantasyName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-display text-sm text-foreground">
                  {comment.author.fantasyName}
                </span>
                <span className="text-muted-foreground text-xs">
                  {formatTimeAgo(comment.createdAt)}
                </span>
              </div>
              <p className="font-body text-foreground/90 text-sm leading-relaxed">
                {comment.content}
              </p>
              
              {/* Linked book in comment */}
              {comment.book && (
                <div className="mt-2">
                  <BookLinkCard book={comment.book} variant="compact" />
                </div>
              )}
              
              {/* Comment Actions - intentionally empty, reply could go here */}
            </div>
            
            {/* Comment Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2.5 text-muted-foreground active:text-foreground rounded-lg active:bg-muted/50 transition-colors -mr-1">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem 
                  onClick={() => openReportModal('comment', comment.id, comment.content.slice(0, 50))}
                  className="text-destructive focus:text-destructive"
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <MainLayout>
      {/* Add padding at bottom for fixed input */}
      <div className="py-4 pb-24">



        {/* Thread Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="baebles-card-simple mb-4"
        >
          {/* Author Header */}
          <div className="flex items-start gap-3 mb-4">
            <motion.div 
              className="w-12 h-12 rounded-full ring-2 ring-primary/20 overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img src={getAvatarUrl(thread.author.avatarId)} alt={thread.author.fantasyName} className="w-full h-full object-cover" />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-foreground">
                  {thread.author.fantasyName}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to={`/rooms/${thread.roomId}`} className="text-primary dark:text-baebles-gold hover:opacity-80 font-medium">
                  #{thread.roomName}
                </Link>
                <span>•</span>
                <span>{formatTimeAgo(thread.createdAt)}</span>
                {thread.isMature && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-baebles-orange">
                      <Key className="w-3 h-3" />
                      18+
                    </span>
                  </>
                )}
              </div>
            </div>
            
            {/* Post Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem 
                  onClick={() => openReportModal('post', thread.id, thread.content.slice(0, 50))}
                  className="text-destructive focus:text-destructive"
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Report Post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Full Content */}
          <p className="font-body text-foreground/90 leading-relaxed text-base mb-4">
            {thread.content}
          </p>

          {/* Book Attachment */}
          {thread.book && (
            <div className="mb-4">
              <BookLinkCard book={thread.book} variant="default" />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageCircle className="w-5 h-5" />
              <span className="font-body">{localComments.length} comments</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isSaved 
                  ? 'text-baebles-orange bg-baebles-orange/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              <span className="font-body">{isSaved ? 'Saved' : 'Save'}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Comments List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="baebles-card-simple"
        >
          <h3 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-baebles-gold" />
            Comments
          </h3>
          
          {allComments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8 font-body">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            <div className="divide-y divide-border/50">
              {allComments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Fixed Comment Input at Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-16 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border/50"
        style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}
      >
        {/* Book Link Picker - Inline variant */}
        <AnimatePresence>
          {(showBookSearch || selectedBookData) && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden px-4 py-2 border-b border-border/30"
            >
              <BookLinkPicker
                selectedBookId={selectedBook}
                onSelectBook={(bookId) => {
                  setSelectedBook(bookId);
                  setShowBookSearch(false);
                }}
                onClear={() => {
                  setSelectedBook('');
                  setShowBookSearch(false);
                }}
                showToggleButton={false}
                variant="inline"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="max-w-lg mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Avatar */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden ring-1 ring-primary/20 shrink-0">
              <img src={getAvatarUrl('fae-female-1')} alt="You" className="w-full h-full object-cover" />
            </div>
            
            {/* Book link button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowBookSearch(!showBookSearch)}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                showBookSearch || selectedBookData
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted/50 text-muted-foreground'
              }`}
            >
              <BookOpen className="w-4 h-4" />
            </motion.button>
            
            {/* Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitComment();
                  }
                }}
                className="w-full py-2.5 sm:py-3 px-4 pr-12 bg-muted/50 border border-border/50 rounded-full text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
              
              {/* Send button inside input */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${
                  newComment.trim() 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-muted text-muted-foreground'
                }`}
                style={newComment.trim() ? { boxShadow: '0 2px 10px hsl(var(--primary) / 0.3)' } : {}}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Safe area padding */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </motion.div>

      {/* Report Modal */}
      <ReportModal
        isOpen={reportModal.isOpen}
        onClose={() => setReportModal({ ...reportModal, isOpen: false })}
        type={reportModal.type}
        targetId={reportModal.targetId}
        targetName={reportModal.targetName}
      />
    </MainLayout>
  );
}
