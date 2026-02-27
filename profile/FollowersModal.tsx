import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, UserCheck } from 'lucide-react';
import { users } from '@/data/mockData';
import defaultAvatar from '@/assets/avatars/fae-female-1.png';

interface FollowersModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'followers' | 'following';
  userId: string;
  userName: string;
}

// Mock followers/following data (in real app, would come from backend)
const mockFollowers = users.slice(1, 4);
const mockFollowing = users.slice(2, 5);

export function FollowersModal({ isOpen, onClose, initialTab, userId, userName }: FollowersModalProps) {
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>(initialTab);
  const [followingStates, setFollowingStates] = useState<Record<string, boolean>>(() => {
    const states: Record<string, boolean> = {};
    mockFollowers.forEach(user => {
      states[user.id] = mockFollowing.some(f => f.id === user.id);
    });
    mockFollowing.forEach(user => {
      states[user.id] = true;
    });
    return states;
  });

  const toggleFollow = (targetUserId: string) => {
    setFollowingStates(prev => ({
      ...prev,
      [targetUserId]: !prev[targetUserId]
    }));
  };

  const renderUserList = (userList: typeof users) => (
    <div className="space-y-2 flex-1 overflow-y-auto px-3 sm:px-4 pb-4">
      {userList.length > 0 ? (
        userList.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-muted/30 active:bg-muted/50 sm:hover:bg-muted/50 transition-colors"
          >
            <Link 
              to={`/profile/${user.id}`} 
              onClick={onClose}
              className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 border-primary/20 flex-shrink-0">
                <img 
                  src={defaultAvatar} 
                  alt={user.fantasyName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-xs sm:text-sm text-foreground truncate">
                  {user.fantasyName}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate capitalize">
                  {user.race}
                </p>
              </div>
            </Link>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                toggleFollow(user.id);
              }}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 min-w-[36px] sm:min-w-[90px] px-2 sm:px-3 py-2 rounded-lg text-xs font-display transition-all flex-shrink-0 ${
                followingStates[user.id]
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              {followingStates[user.id] ? (
                <>
                  <UserCheck className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Following</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Follow</span>
                </>
              )}
            </motion.button>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No users yet</p>
        </div>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      {/* Modal Container */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-card w-full max-w-md rounded-2xl border border-border/50 flex flex-col max-h-[80vh] shadow-2xl pointer-events-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 flex-shrink-0">
            <h2 className="font-display text-base sm:text-lg text-foreground">
              {userName}
            </h2>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted active:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border/50 flex-shrink-0">
            <button
              onClick={() => setActiveTab('followers')}
              className={`flex-1 py-3 text-sm font-display transition-all relative ${
                activeTab === 'followers'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              Followers
              <span className="ml-1 text-xs text-muted-foreground">({mockFollowers.length})</span>
              {activeTab === 'followers' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`flex-1 py-3 text-sm font-display transition-all relative ${
                activeTab === 'following'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              Following
              <span className="ml-1 text-xs text-muted-foreground">({mockFollowing.length})</span>
              {activeTab === 'following' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-hidden pt-3 min-h-0">
            {activeTab === 'followers' 
              ? renderUserList(mockFollowers)
              : renderUserList(mockFollowing)
            }
          </div>
        </motion.div>
      </div>
    </div>
  );
}
