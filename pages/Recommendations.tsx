import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { FilterTabs } from '@/components/common/FilterTabs';
import { AskRecommendationModal } from '@/components/recommendations/AskRecommendationModal';
import { recommendationRequests, formatTimeAgo } from '@/data/mockData';
import { SUBGENRES, TROPES } from '@/types/onboarding';
import { getAvatarUrl } from '@/lib/avatarHelper';
import { 
  Castle, Crown, Moon, Heart, Building2, Coffee, Columns3, 
  Sparkles, Sword, Map, Wand2, Sprout, Eclipse, Flame, Users, Star, 
  Hourglass, Lock, Scale, Shield, Compass, GraduationCap, Swords, 
  Gem, ScrollText, Unlock, Sunrise, Skull, LucideIcon, BookOpen,
  MessageSquare, Plus, Bell, BellOff
} from 'lucide-react';

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

export default function Recommendations() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(recommendationRequests);
  const [filter, setFilter] = useState<'community' | 'yours' | 'following'>('community');
  const [isAskOpen, setIsAskOpen] = useState(false);

  // Mock current user id
  const currentUserId = 'user-1';

  const toggleFollow = (requestId: string) => {
    setRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, isFollowing: !r.isFollowing } : r
    ));
  };

  const filteredRequests = filter === 'community' 
    ? requests 
    : filter === 'yours'
      ? requests.filter(r => r.author.fantasyName === 'Aelith Shadowsong') // Mock: filter by current user
      : requests.filter(r => r.isFollowing);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const tabsConfig = [
    { id: 'community', label: 'Community', icon: Users },
    { id: 'yours', label: 'Yours', icon: Star },
    { id: 'following', label: 'Following', icon: Heart },
  ];

  return (
    <MainLayout>
      <div className="py-4">
        {/* Header with magical styling - responsive */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-3 mb-5"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary/30 to-baebles-purple/20 flex items-center justify-center shadow-lg shrink-0" style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' }}>
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent">Recs</h1>
          </div>
          <motion.button 
            onClick={() => setIsAskOpen(true)}
            className="baebles-btn-primary text-[10px] sm:text-xs px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-1 sm:gap-1.5 shrink-0"
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Ask
          </motion.button>
        </motion.div>

        {/* Filter Tabs */}
        <FilterTabs
          tabs={tabsConfig}
          activeTab={filter}
          onTabChange={(id) => setFilter(id as 'community' | 'yours' | 'following')}
          variant="badge"
        />

        {/* Requests List */}
        <motion.div 
          className="space-y-3 sm:space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredRequests.map((req) => {
              const subgenre = SUBGENRES.find(s => s.id === req.subgenre);
              
              return (
                <motion.div 
                  key={req.id} 
                  variants={itemVariants}
                  className="baebles-card-simple overflow-hidden cursor-pointer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate(`/recommendations/${req.id}`)}
                  layout
                >
                  {/* Header with colorful avatar - responsive */}
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                    <motion.div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-baebles-gold/30 shrink-0 overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img src={getAvatarUrl(req.author.avatarId)} alt={req.author.fantasyName} className="w-full h-full object-cover" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <span className="font-display text-xs sm:text-sm text-foreground truncate block">{req.author.fantasyName}</span>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground flex-wrap">
                        <span>•</span>
                        <span>{formatTimeAgo(req.createdAt)}</span>
                        {/* Community Symbols */}
                        {req.hasSpoilers && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-0.5" title="Spoilers ahead">
                              🌫️
                            </span>
                          </>
                        )}
                        {req.isMature && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-0.5 text-baebles-purple" title="Mature (18+) content">
                              🌙
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Quote-style content with colorful accent - responsive */}
                  <div className="relative pl-3 sm:pl-4 mb-3 sm:mb-4">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 sm:w-1 rounded-full" style={{ background: 'linear-gradient(to bottom, hsl(var(--baebles-gold)), hsl(var(--primary)), hsl(var(--baebles-teal)))' }} />
                    <p className="font-body text-base sm:text-lg text-foreground/90 italic leading-relaxed">
                      "{req.content}"
                    </p>
                  </div>
                  
                  {/* Tags with light gradient - auto width */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {subgenre && (
                      <motion.span 
                        className="baebles-pill"
                        whileHover={{ scale: 1.02 }}
                      >
                        {getIcon(subgenre.icon, "w-3.5 h-3.5")} 
                        {subgenre.name}
                      </motion.span>
                    )}
                    {req.tropes?.slice(0, 2).map(t => {
                      const trope = TROPES.find(tr => tr.id === t);
                      return trope && (
                        <motion.span 
                          key={t} 
                          className="baebles-pill"
                          whileHover={{ scale: 1.02 }}
                        >
                          {getIcon(trope.icon, "w-3.5 h-3.5")} 
                          {trope.name}
                        </motion.span>
                      );
                    })}
                  </div>
                  
                  {/* Footer - responsive */}
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border gap-2">
                    <motion.div 
                      className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground cursor-pointer active:text-foreground transition-colors min-w-0"
                      whileHover={{ x: 2 }}
                    >
                      <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-baebles-gold" />
                      <span className="font-medium">{req.responsesCount}</span>
                      <span className="hidden xs:inline">recommendations</span>
                      <span className="xs:hidden">recs</span>
                    </motion.div>
                    
                    <motion.button
                      onClick={() => toggleFollow(req.id)}
                      className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-display transition-all flex items-center gap-1.5 sm:gap-2 active:scale-95 shrink-0 ${
                        req.isFollowing
                          ? 'bg-baebles-orange/20 text-baebles-orange border border-baebles-orange/30'
                          : 'bg-primary/25 text-primary border border-primary/40 active:bg-primary/35'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {req.isFollowing ? (
                        <>
                          <span className="hidden xs:inline">Unfollow</span>
                          <span className="xs:hidden">✓</span>
                        </>
                      ) : (
                        <>
                          Follow
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-body">No requests found</p>
          </motion.div>
        )}
      </div>

      {/* Ask Recommendation Modal */}
      <AnimatePresence>
        {isAskOpen && (
          <AskRecommendationModal onClose={() => setIsAskOpen(false)} />
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
