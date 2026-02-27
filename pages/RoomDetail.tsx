import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { rooms, threads, formatCount, formatTimeAgo } from '@/data/mockData';
import { ArrowLeft, Users, Key, Check, MessageSquare, Bookmark, BookmarkCheck, MoreHorizontal, Flag, Heart, Skull, Coffee, Swords, Moon, Search, BookOpen, Sparkles, MessageCircle, Feather, LucideIcon } from 'lucide-react';
import { ThreadCard } from '@/components/feed/ThreadCard';
import { CreateThreadModal } from '@/components/feed/CreateThreadModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ReportModal } from '@/components/modals/ReportModal';

// Icon map for rooms
const roomIconMap: Record<string, LucideIcon> = {
  heart: Heart, skull: Skull, coffee: Coffee, swords: Swords, moon: Moon,
  search: Search, 'book-open': BookOpen, sparkles: Sparkles, 'message-circle': MessageCircle,
};

const getColorForRoom = (icon: string): { bg: string; accent: string; text: string; darkBg: string; lightAccent: string } => {
  const colorMap: Record<string, { bg: string; accent: string; text: string; darkBg: string; lightAccent: string }> = {
    heart: { bg: 'from-pink-400/15 to-rose-300/20', accent: 'hsl(340, 80%, 65%)', text: 'text-pink-200', darkBg: 'from-pink-900/95 via-pink-800/80', lightAccent: 'pink-400' },
    skull: { bg: 'from-slate-600/20 to-gray-500/25', accent: 'hsl(240, 10%, 40%)', text: 'text-slate-200', darkBg: 'from-slate-900/95 via-slate-800/80', lightAccent: 'slate-400' },
    coffee: { bg: 'from-amber-500/15 to-orange-400/20', accent: 'hsl(30, 70%, 50%)', text: 'text-amber-200', darkBg: 'from-amber-900/95 via-amber-800/80', lightAccent: 'amber-400' },
    swords: { bg: 'from-red-500/15 to-orange-400/20', accent: 'hsl(15, 75%, 55%)', text: 'text-red-200', darkBg: 'from-red-900/95 via-red-800/80', lightAccent: 'red-400' },
    moon: { bg: 'from-indigo-500/15 to-purple-400/20', accent: 'hsl(250, 70%, 60%)', text: 'text-indigo-200', darkBg: 'from-indigo-900/95 via-indigo-800/80', lightAccent: 'indigo-400' },
    search: { bg: 'from-sky-500/15 to-blue-400/20', accent: 'hsl(200, 70%, 55%)', text: 'text-sky-200', darkBg: 'from-sky-900/95 via-sky-800/80', lightAccent: 'sky-400' },
    'book-open': { bg: 'from-emerald-500/15 to-teal-400/20', accent: 'hsl(160, 60%, 45%)', text: 'text-emerald-200', darkBg: 'from-emerald-900/95 via-emerald-800/80', lightAccent: 'emerald-400' },
    sparkles: { bg: 'from-yellow-400/15 to-amber-300/20', accent: 'hsl(45, 90%, 55%)', text: 'text-yellow-200', darkBg: 'from-yellow-900/95 via-yellow-800/80', lightAccent: 'yellow-400' },
    'message-circle': { bg: 'from-violet-500/15 to-purple-400/20', accent: 'hsl(270, 65%, 60%)', text: 'text-violet-200', darkBg: 'from-violet-900/95 via-violet-800/80', lightAccent: 'violet-400' },
  };
  return colorMap[icon] || { bg: 'from-primary/15 to-baebles-purple/20', accent: 'hsl(var(--primary))', text: 'text-primary-foreground', darkBg: 'from-primary/95 via-primary/80', lightAccent: 'primary' };
};

export default function RoomDetail() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [reportModalOpen, setReportModalOpen] = useState(false);
  
  // Find the room
  const room = rooms.find(r => r.id === roomId);
  
  // Get threads for this room
  const roomThreads = threads.filter(t => t.roomId === roomId);
  
  // Local state for join toggle
  const [isJoined, setIsJoined] = useState(room?.isJoined ?? false);
  const [showCreateThread, setShowCreateThread] = useState(false);

  if (!room) {
    return (
      <MainLayout>
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Room not found</p>
          <button 
            onClick={() => navigate('/rooms')}
            className="mt-4 text-primary underline"
          >
            Back to Rooms
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-4">



        {/* Room Header Card */}
        {(() => {
          const colors = getColorForRoom(room.icon);
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative overflow-hidden rounded-2xl p-5 mb-6 bg-gradient-to-br ${colors.bg}`}
              style={{ 
                boxShadow: `0 8px 32px ${colors.accent}20, inset 0 1px 0 hsl(0 0% 100% / 0.1)`
              }}
            >
              <div className="flex items-start gap-4">
                {/* Room Icon */}
              <motion.div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.accent}30, ${colors.accent}15)`,
                    boxShadow: `0 0 30px ${colors.accent}30`
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {(() => { const RIcon = roomIconMap[room.icon] || Sparkles; return <RIcon className="w-8 h-8" style={{ color: colors.accent }} />; })()}
                </motion.div>

                {/* Room Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 
                      className="font-display text-xl font-semibold"
                      style={{ color: colors.accent }}
                    >
                      #{room.name}
                    </h1>
                    {room.isMature && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-baebles-orange/20 text-baebles-orange text-xs">
                        <Key className="w-3 h-3" />
                        18+
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-foreground/80 font-body mt-1">
                    {room.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-sm text-foreground/70">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">{formatCount(room.membersCount)}</span>
                      <span>members</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-foreground/70">
                      <MessageSquare className="w-4 h-4" />
                      <span className="font-medium">{roomThreads.length}</span>
                      <span>threads</span>
                    </div>
                  </div>
                </div>

                {/* More Options */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-9 h-9 flex items-center justify-center rounded-full active:bg-white/10 transition-colors shrink-0">
                      <MoreHorizontal className="w-5 h-5 text-foreground/60" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem 
                      onClick={() => setReportModalOpen(true)}
                      className="text-destructive focus:text-destructive py-3"
                    >
                      <Flag className="w-4 h-4 mr-2" />
                      Report Room
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Join Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsJoined(!isJoined)}
                className="w-full mt-4 py-3 rounded-xl font-display text-sm font-semibold transition-all flex items-center justify-center gap-2"
                style={isJoined 
                  ? { 
                      backgroundColor: `${colors.accent}35`, 
                      color: 'hsl(var(--foreground))', 
                      border: `1.5px solid ${colors.accent}60`,
                    } 
                  : { 
                      backgroundColor: colors.accent, 
                      color: 'white',
                      boxShadow: `0 4px 20px ${colors.accent}50` 
                    }
                }
              >
                {isJoined ? (
                  <>
                    <Check className="w-4 h-4" style={{ color: colors.accent }} />
                    Joined
                  </>
                ) : (
                  'Join Room'
                )}
              </motion.button>
            </motion.div>
          );
        })()}

        {/* Threads Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg text-foreground flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Discussions
          </h2>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateThread(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-sm baebles-btn-primary"
          >
            <Feather className="w-4 h-4" />
            Publish
          </motion.button>
        </div>

        {/* Threads List */}
        {roomThreads.length > 0 ? (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {roomThreads.map((thread, index) => (
              <motion.div
                key={thread.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <ThreadCard thread={thread} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="baebles-card p-8 text-center"
          >
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-muted-foreground font-body mb-1">No discussions yet</p>
            <p className="text-sm text-muted-foreground/70">Be the first to start a conversation!</p>
          </motion.div>
        )}
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        type="room"
        targetId={room.id}
        targetName={`#${room.name}`}
      />

      {/* Create Thread Modal */}
      <AnimatePresence>
        {showCreateThread && (
          <CreateThreadModal
            onClose={() => setShowCreateThread(false)}
            preselectedRoomId={room.id}
          />
        )}
      </AnimatePresence>
    </MainLayout>
  );
}