import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { currentUser, getUserById, threads, books, recommendationRequests, formatTimeAgo } from '@/data/mockData';
import { TROPES, RACES } from '@/types/onboarding';
import { RaceIcon } from '@/components/common/RaceIcon';
import { Settings, BookOpen, Star, Heart, Flag, MoreHorizontal, ChevronRight, Pencil, Sparkles, UserPlus, UserCheck, Camera, MessageSquare, BookmarkCheck, Lightbulb, Lock, Library, Calendar } from 'lucide-react';
import { ReportModal } from '@/components/modals/ReportModal';
import { AvatarChangeModal } from '@/components/profile/AvatarChangeModal';
import { FollowersModal } from '@/components/profile/FollowersModal';
import defaultAvatar from '@/assets/avatars/fae-female-1.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock privacy settings per user (in real app, would come from backend)
const mockPrivacySettings: Record<string, { threads: boolean; tbr: boolean; reco: boolean; series: boolean }> = {
  'user-1': { threads: true, tbr: true, reco: false, series: true },
  'user-2': { threads: true, tbr: false, reco: true, series: true },
  'user-3': { threads: false, tbr: true, reco: true, series: false },
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

export default function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'threads' | 'tbr' | 'reco' | 'series'>('threads');
  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followersModalTab, setFollowersModalTab] = useState<'followers' | 'following'>('followers');

  // Check if viewing own profile (mock - in real app would compare with auth user)
  const isOwnProfile = !userId || userId === 'user-1';
  
  // Get the profile user data
  const profileUser = userId ? getUserById(userId) : currentUser;
  const displayUser = profileUser || currentUser;
  
  // Get privacy settings for this user
  const userPrivacy = mockPrivacySettings[displayUser.id] || { threads: true, tbr: true, reco: true, series: true };
  
  // Get favorite trope for this user
  const favTrope = TROPES.find(t => t.id === displayUser.favoriteTropes[0]);

  // Get user's content
  const userThreads = threads.filter(t => t.authorId === displayUser.id);
  const userTBR = books.filter(b => b.isInTBR);
  const userRecos = recommendationRequests.filter(r => r.authorId === displayUser.id);
  
  // Get coming soon books from followed series (future release dates)
  const now = new Date();
  const comingSoonBooks = books.filter(b => 
    b.isFollowingSeries && 
    b.seriesName && 
    b.releaseDate > now
  ).sort((a, b) => a.releaseDate.getTime() - b.releaseDate.getTime());

  // Check if content is visible based on privacy
  const canSeeThreads = isOwnProfile || userPrivacy.threads;
  const canSeeTBR = isOwnProfile || userPrivacy.tbr;
  const canSeeReco = isOwnProfile || userPrivacy.reco;
  const canSeeSeries = isOwnProfile || userPrivacy.series;


  return (
    <MainLayout>
      <div className="py-4">
        {/* Header with Edit Profile & Settings - larger touch targets */}
        <div className="flex justify-between items-center gap-2 mb-2">
          {/* Follow button for other profiles */}
          {!isOwnProfile ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFollowing(!isFollowing)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-display transition-all ${
                isFollowing
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-primary text-primary-foreground shadow-lg'
              }`}
              style={!isFollowing ? { boxShadow: '0 4px 15px hsl(var(--primary) / 0.3)' } : {}}
            >
              {isFollowing ? (
                <>
                  <UserCheck className="w-4 h-4" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Follow
                </>
              )}
            </motion.button>
          ) : (
            <div />
          )}
          
          <div className="flex items-center gap-1">
            {!isOwnProfile && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-11 h-11 flex items-center justify-center rounded-full active:bg-muted/50 transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem 
                    onClick={() => setReportModalOpen(true)}
                    className="text-destructive focus:text-destructive py-3"
                  >
                    <Flag className="w-4 h-4 mr-2" />
                    Report Profile
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {isOwnProfile && (
              <Link 
                to="/settings"
                className="w-11 h-11 flex items-center justify-center rounded-full active:bg-muted/50 transition-colors"
                aria-label="Edit Profile"
              >
                <Pencil className="w-5 h-5 text-muted-foreground" />
              </Link>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="baebles-card-ornate py-6 px-4 relative overflow-hidden"
        >
          <div className="corner-br" />
          
          {/* Name & Race Header with gradient text */}
          <div className="text-center mb-6">
            <h1 className="font-display text-2xl tracking-wide bg-gradient-to-r from-baebles-gold via-primary to-baebles-gold bg-clip-text text-transparent" style={{ textShadow: '0 0 40px hsl(var(--primary) / 0.3)' }}>
              {displayUser.fantasyName}
            </h1>
            <div className="mt-2 flex justify-center">
              {(() => {
                const raceData = RACES.find(r => r.id === displayUser.race);
                return (
                  <div 
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-display text-[10px] uppercase tracking-widest"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--baebles-gold) / 0.1))',
                      border: '1px solid hsl(var(--baebles-gold) / 0.3)',
                    }}
                  >
                    {raceData && <RaceIcon icon={raceData.icon} className="w-3.5 h-3.5 text-baebles-gold" />}
                    <span className="text-baebles-gold">{displayUser.race}</span>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Avatar Frame - Simplified */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Tarot card frame */}
              <div 
                className="relative w-44 aspect-[2/3] rounded-md overflow-hidden"
                style={{
                  background: 'var(--tarot-frame-bg)',
                  boxShadow: 'var(--tarot-frame-shadow)',
                }}
              >
                {/* Dynamic theme styles */}
                <style>{`
                  :root {
                    --tarot-frame-bg: linear-gradient(160deg, hsl(40 30% 92%), hsl(35 25% 85%), hsl(40 20% 80%));
                    --tarot-frame-shadow: 0 4px 20px hsl(280 60% 45% / 0.12), inset 0 1px 0 hsl(40 40% 95% / 0.6);
                    --tarot-border-color: hsl(35 30% 65% / 0.4);
                    --tarot-filigree-color: hsl(35 30% 60% / 0.5);
                    --tarot-cartouche-bg: linear-gradient(180deg, hsl(40 35% 88%), hsl(35 30% 82%));
                    --tarot-cartouche-border: hsl(35 25% 70% / 0.6);
                    --tarot-cartouche-shadow: inset 0 1px 0 hsl(40 40% 95% / 0.5), 0 1px 3px hsl(35 20% 40% / 0.15);
                    --tarot-name-color: hsl(35 25% 35%);
                    --tarot-dot-color: hsl(35 30% 60% / 0.5);
                  }
                  .dark {
                    --tarot-frame-bg: linear-gradient(160deg, hsl(35 20% 20%), hsl(30 15% 16%), hsl(25 12% 12%));
                    --tarot-frame-shadow: 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 hsl(38 30% 30% / 0.4);
                    --tarot-border-color: hsl(38 35% 35% / 0.5);
                    --tarot-filigree-color: hsl(38 40% 50% / 0.5);
                    --tarot-cartouche-bg: linear-gradient(180deg, hsl(35 18% 18%), hsl(30 14% 14%));
                    --tarot-cartouche-border: hsl(38 30% 32% / 0.6);
                    --tarot-cartouche-shadow: inset 0 1px 0 hsl(38 25% 28% / 0.4), 0 1px 3px rgba(0,0,0,0.3);
                    --tarot-name-color: hsl(38 30% 72%);
                    --tarot-dot-color: hsl(38 40% 50% / 0.5);
                  }
                `}</style>

                {/* Race icon at top */}
                {(() => {
                  const raceData = RACES.find(r => r.id === displayUser.race);
                  return raceData ? (
                    <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: '1%', color: 'var(--tarot-filigree-color)' }}>
                      <RaceIcon icon={raceData.icon} className="w-4 h-4" />
                    </div>
                  ) : null;
                })()}

                {/* Filigree corners */}
                <div className="absolute top-[2px] left-[4px] text-[11px]" style={{ color: 'var(--tarot-filigree-color)' }}>❧</div>
                <div className="absolute top-[2px] right-[4px] text-[11px]" style={{ color: 'var(--tarot-filigree-color)', transform: 'scaleX(-1)' }}>❧</div>
                <div className="absolute bottom-[2px] left-[4px] text-[11px]" style={{ color: 'var(--tarot-filigree-color)', transform: 'scaleY(-1)' }}>❧</div>
                <div className="absolute bottom-[2px] right-[4px] text-[11px]" style={{ color: 'var(--tarot-filigree-color)', transform: 'scale(-1)' }}>❧</div>

                {/* Top/bottom lines */}
                <div className="absolute left-1/4 right-1/4 h-px" style={{ top: '3%', background: `linear-gradient(90deg, transparent, var(--tarot-filigree-color), transparent)` }} />
                <div className="absolute left-1/4 right-1/4 h-px" style={{ bottom: '3%', background: `linear-gradient(90deg, transparent, var(--tarot-filigree-color), transparent)` }} />

                {/* Inner border */}
                <div className="absolute pointer-events-none" style={{
                  top: '4%', left: '4%', right: '4%', bottom: '4%',
                  border: '1px solid var(--tarot-border-color)',
                  borderRadius: '6px',
                }} />

                {/* Gothic arch image area */}
                <div className="absolute overflow-hidden" style={{
                  top: '8%', left: '8%', right: '8%', bottom: '20%',
                  borderRadius: '8px 8px 4px 4px',
                  clipPath: 'polygon(0% 12%, 2% 6%, 6% 2%, 12% 0%, 88% 0%, 94% 2%, 98% 6%, 100% 12%, 100% 100%, 0% 100%)',
                }}>
                  <img 
                    src={defaultAvatar} 
                    alt={displayUser.fantasyName}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
                </div>

                {/* Name cartouche */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ bottom: '3%', width: '85%' }}>
                  <div className="text-center relative py-1 px-2" style={{
                    background: 'var(--tarot-cartouche-bg)',
                    borderRadius: '6px',
                    border: '1px solid var(--tarot-cartouche-border)',
                    boxShadow: 'var(--tarot-cartouche-shadow)',
                  }}>
                    <span className="absolute left-1.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--tarot-dot-color)', fontSize: '7px' }}>✦</span>
                    <span className="absolute right-1.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--tarot-dot-color)', fontSize: '7px' }}>✦</span>
                    <span className="block font-display leading-[1.2] text-[10px] tracking-wide" style={{ color: 'var(--tarot-name-color)' }}>
                      {displayUser.race}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* CTA to buy limited avatars */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <Link
              to="/shop"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full font-display text-sm transition-all"
              style={{ 
                background: 'linear-gradient(135deg, hsl(var(--baebles-gold) / 0.15), hsl(var(--primary) / 0.1))',
                border: '1px solid hsl(var(--baebles-gold) / 0.3)'
              }}
            >
              <Sparkles className="w-4 h-4 text-baebles-gold" />
              <span className="bg-gradient-to-r from-baebles-gold to-primary bg-clip-text text-transparent">
                Discover Limited Avatars
              </span>
              <ChevronRight className="w-4 h-4 text-baebles-gold group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Favorites Section with colorful icons */}
          <div className="mt-8 space-y-3">
            {/* Favorite Author */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl border border-primary/20"
              style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--muted) / 0.5))' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--baebles-purple) / 0.2))', boxShadow: '0 0 15px hsl(var(--primary) / 0.2)' }}>
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Favorite Author</p>
                <p className="font-display text-foreground">{displayUser.favoriteAuthors[0] || 'Not set'}</p>
              </div>
            </motion.div>

            {/* Favorite Book */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 p-4 rounded-xl border border-baebles-orange/20"
              style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-orange) / 0.1), hsl(var(--muted) / 0.5))' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-orange) / 0.4), hsl(var(--baebles-gold) / 0.3))', boxShadow: '0 0 15px hsl(var(--baebles-orange) / 0.2)' }}>
                <Star className="w-5 h-5 text-baebles-orange fill-baebles-orange" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Favorite Book</p>
                <p className="font-display text-foreground">{displayUser.favoriteBooks[0] || 'Not set'}</p>
              </div>
            </motion.div>

            {/* Favorite Trope */}
            {favTrope && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-baebles-rose/20"
                style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-rose) / 0.1), hsl(var(--muted) / 0.5))' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-rose) / 0.4), hsl(var(--primary) / 0.3))', boxShadow: '0 0 15px hsl(var(--baebles-rose) / 0.2)' }}>
                  <Heart className="w-5 h-5 text-baebles-rose fill-baebles-rose" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Favorite Trope</p>
                  <p className="font-display text-foreground">{favTrope.name}</p>
                </div>
              </motion.div>
            )}

            {/* My Intentions */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 p-4 rounded-xl border border-baebles-teal/20"
              style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-teal) / 0.1), hsl(var(--muted) / 0.5))' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-teal) / 0.4), hsl(var(--primary) / 0.3))', boxShadow: '0 0 15px hsl(var(--baebles-teal) / 0.2)' }}>
                <Sparkles className="w-5 h-5 text-baebles-teal" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{isOwnProfile ? 'My Intentions' : 'Intentions'}</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {displayUser.intentions.length > 0 ? displayUser.intentions.map((intention) => (
                    <span 
                      key={intention}
                      className="px-2 py-0.5 rounded-full text-xs font-display capitalize"
                      style={{ 
                        background: 'hsl(var(--baebles-teal) / 0.15)',
                        color: 'hsl(var(--baebles-teal))'
                      }}
                    >
                      {intention === 'community' ? 'Community' : intention === 'matchmaking' ? 'Matchmaking' : 'Professional'}
                    </span>
                  )) : (
                    <span className="text-xs text-muted-foreground">Not set</span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-12 mt-8 pt-6 border-t border-border/50"
          >
            <button 
              onClick={() => {
                setFollowersModalTab('followers');
                setFollowersModalOpen(true);
              }}
              className="text-center hover:opacity-80 transition-opacity"
            >
              <p className="font-display text-2xl text-foreground">{displayUser.followersCount}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Followers</p>
            </button>
            <button 
              onClick={() => {
                setFollowersModalTab('following');
                setFollowersModalOpen(true);
              }}
              className="text-center hover:opacity-80 transition-opacity"
            >
              <p className="font-display text-2xl text-foreground">{displayUser.followingCount}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Following</p>
            </button>
          </motion.div>

        </motion.div>

        {/* Activity Tabs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          {/* Tabs Header */}
          <div className="grid grid-cols-4 gap-1.5 mb-4">
            {[
              { id: 'threads', label: 'Threads', icon: MessageSquare, count: userThreads.length, canSee: canSeeThreads },
              { id: 'tbr', label: 'TBR', icon: BookmarkCheck, count: userTBR.length, canSee: canSeeTBR },
              { id: 'reco', label: 'Reco', icon: Lightbulb, count: userRecos.length, canSee: canSeeReco },
              { id: 'series', label: 'Soon', icon: Calendar, count: comingSoonBooks.length, canSee: canSeeSeries },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-full text-[10px] sm:text-xs font-body transition-all relative ${
                  activeTab === tab.id
                    ? 'text-primary dark:text-baebles-gold shadow-sm'
                    : 'text-muted-foreground active:bg-muted/80'
                }`}
                style={activeTab === tab.id ? {
                  background: 'linear-gradient(135deg, hsl(var(--primary) / 0.25), hsl(var(--baebles-gold) / 0.15))',
                  border: '1px solid hsl(var(--primary) / 0.4)'
                } : {
                  background: 'hsl(var(--muted) / 0.5)',
                  border: '1px solid hsl(var(--border) / 0.3)'
                }}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {!tab.canSee && (
                  <Lock className="w-3 h-3 absolute top-1 right-1 text-muted-foreground" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Threads Tab */}
            {activeTab === 'threads' && (
              canSeeThreads ? (
                userThreads.length > 0 ? (
                  <div className="space-y-3">
                    {userThreads.map((thread) => (
                      <Link
                        key={thread.id}
                        to={`/threads/${thread.id}`}
                        className="block baebles-card-simple p-4 active:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-primary dark:text-baebles-gold font-medium">#{thread.roomName}</span>
                          {thread.hasSpoilers && <span title="Spoilers">🕯️</span>}
                          {thread.isMature && <span title="Mature">🌙</span>}
                        </div>
                        <p className="text-sm font-body text-foreground line-clamp-2">{thread.content}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3 text-baebles-gold" />
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
                  </div>
                )
              ) : (
                <div className="baebles-card-simple p-6 text-center">
                  <Lock className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground font-body">Threads are private</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">This user has set their threads to private</p>
                </div>
              )
            )}

            {/* TBR Tab */}
            {activeTab === 'tbr' && (
              canSeeTBR ? (
                userTBR.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {userTBR.map((book, index) => (
                      <motion.div
                        key={book.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => navigate(`/books/${book.id}`)}
                        className="baebles-card-simple p-3 cursor-pointer"
                      >
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
                        <h4 className="font-display text-xs text-foreground line-clamp-2 mb-0.5 leading-tight">
                          {book.title}
                        </h4>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {book.author}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="baebles-card-simple p-6 text-center">
                    <BookmarkCheck className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground font-body">TBR is empty</p>
                  </div>
                )
              ) : (
                <div className="baebles-card-simple p-6 text-center">
                  <Lock className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground font-body">TBR is private</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">This user has set their TBR to private</p>
                </div>
              )
            )}

            {/* Reco Tab */}
            {activeTab === 'reco' && (
              canSeeReco ? (
                userRecos.length > 0 ? (
                  <div className="space-y-3">
                    {userRecos.map((reco) => (
                      <Link
                        key={reco.id}
                        to={`/recommendations/${reco.id}`}
                        className="block baebles-card-simple p-4 active:bg-muted/50 transition-colors"
                      >
                        <p className="text-sm font-body text-foreground line-clamp-2 italic">"{reco.content}"</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Lightbulb className="w-3 h-3 text-baebles-gold" />
                            {reco.responsesCount} responses
                          </span>
                          <span>{formatTimeAgo(reco.createdAt)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="baebles-card-simple p-6 text-center">
                    <Lightbulb className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground font-body">No recommendations yet</p>
                  </div>
                )
              ) : (
                <div className="baebles-card-simple p-6 text-center">
                  <Lock className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground font-body">Recommendations are private</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">This user has set their recommendations to private</p>
                </div>
              )
            )}

            {/* Coming Soon Tab */}
            {activeTab === 'series' && (
              canSeeSeries ? (
                comingSoonBooks.length > 0 ? (
                  <div className="space-y-3">
                    {comingSoonBooks.map((book) => (
                      <Link
                        key={book.id}
                        to={`/books/${book.id}`}
                        className="block baebles-card-simple p-4 active:bg-muted/50 transition-colors"
                      >
                        <div className="flex gap-3">
                          <div className={`w-14 aspect-[2/3] bg-gradient-to-br ${getBookColor(book.title)} rounded-lg relative overflow-hidden shadow-md flex-shrink-0`}>
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/20" />
                            {book.seriesPosition && (
                              <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-black/40 backdrop-blur-sm rounded-full">
                                <span className="text-white text-[8px] font-medium">#{book.seriesPosition}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-display text-sm text-foreground line-clamp-1">{book.title}</h4>
                            <p className="text-xs text-muted-foreground">{book.author}</p>
                            <p className="text-xs text-primary mt-1">{book.seriesName}</p>
                            <div className="flex items-center gap-1 mt-2 text-xs text-baebles-gold">
                              <Calendar className="w-3 h-3" />
                              <span>{book.releaseDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="baebles-card-simple p-6 text-center">
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground font-body">No upcoming releases</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Follow series to see coming soon books</p>
                  </div>
                )
              ) : (
                <div className="baebles-card-simple p-6 text-center">
                  <Lock className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground font-body">Coming soon is private</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">This user has set their followed series to private</p>
                </div>
              )
            )}
          </motion.div>
        </motion.div>

      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        type="profile"
        targetId={currentUser.id}
        targetName={currentUser.fantasyName}
      />

      {/* Avatar Change Modal */}
      <AvatarChangeModal
        isOpen={avatarModalOpen}
        onClose={() => setAvatarModalOpen(false)}
        currentAvatar="fae-female-1"
        onAvatarChange={(avatarId) => {
          console.log('Avatar changed to:', avatarId);
          // In real app, would save to backend
        }}
      />

      {/* Followers/Following Modal */}
      <FollowersModal
        isOpen={followersModalOpen}
        onClose={() => setFollowersModalOpen(false)}
        initialTab={followersModalTab}
        userId={displayUser.id}
        userName={displayUser.fantasyName}
      />
    </MainLayout>
  );
}
