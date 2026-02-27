import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { FilterTabs } from '@/components/common/FilterTabs';
import { rooms, formatCount } from '@/data/mockData';
import { 
  Users, Sparkles, ShieldAlert, DoorOpen, LayoutGrid, Check, Compass,
  Heart, Skull, Coffee, Swords, Moon, Search, BookOpen, MessageCircle, Headphones, LucideIcon
} from 'lucide-react';
import { AgeVerificationModal } from '@/components/modals/AgeVerificationModal';

// Session storage key for age verification
const AGE_VERIFIED_KEY = 'baebles_age_verified';

// Icon map for rooms
const roomIconMap: Record<string, LucideIcon> = {
  heart: Heart,
  skull: Skull,
  coffee: Coffee,
  swords: Swords,
  moon: Moon,
  search: Search,
  'book-open': BookOpen,
  sparkles: Sparkles,
  'message-circle': MessageCircle,
  headphones: Headphones,
};

// Room color themes based on icon key
const getColorForRoom = (icon: string): { bg: string; accent: string; text: string; darkBg: string } => {
  const colorMap: Record<string, { bg: string; accent: string; text: string; darkBg: string }> = {
    heart: { bg: 'from-pink-400/15 to-rose-300/20', accent: 'hsl(340, 80%, 65%)', text: 'text-pink-200', darkBg: 'from-pink-900/95 via-pink-800/80' },
    skull: { bg: 'from-slate-600/20 to-gray-500/25', accent: 'hsl(240, 10%, 40%)', text: 'text-slate-200', darkBg: 'from-slate-900/95 via-slate-800/80' },
    coffee: { bg: 'from-amber-500/15 to-orange-400/20', accent: 'hsl(30, 70%, 50%)', text: 'text-amber-200', darkBg: 'from-amber-900/95 via-amber-800/80' },
    swords: { bg: 'from-red-500/15 to-orange-400/20', accent: 'hsl(15, 75%, 55%)', text: 'text-red-200', darkBg: 'from-red-900/95 via-red-800/80' },
    moon: { bg: 'from-indigo-500/15 to-purple-400/20', accent: 'hsl(250, 70%, 60%)', text: 'text-indigo-200', darkBg: 'from-indigo-900/95 via-indigo-800/80' },
    search: { bg: 'from-sky-500/15 to-blue-400/20', accent: 'hsl(200, 70%, 55%)', text: 'text-sky-200', darkBg: 'from-sky-900/95 via-sky-800/80' },
    'book-open': { bg: 'from-emerald-500/15 to-teal-400/20', accent: 'hsl(160, 60%, 45%)', text: 'text-emerald-200', darkBg: 'from-emerald-900/95 via-emerald-800/80' },
    sparkles: { bg: 'from-yellow-400/15 to-amber-300/20', accent: 'hsl(45, 90%, 55%)', text: 'text-yellow-200', darkBg: 'from-yellow-900/95 via-yellow-800/80' },
    'message-circle': { bg: 'from-violet-500/15 to-purple-400/20', accent: 'hsl(270, 65%, 60%)', text: 'text-violet-200', darkBg: 'from-violet-900/95 via-violet-800/80' },
    headphones: { bg: 'from-cyan-500/15 to-teal-400/20', accent: 'hsl(185, 65%, 50%)', text: 'text-cyan-200', darkBg: 'from-cyan-900/95 via-cyan-800/80' },
  };
  return colorMap[icon] || { bg: 'from-primary/15 to-baebles-purple/20', accent: 'hsl(var(--primary))', text: 'text-primary-foreground', darkBg: 'from-primary/95 via-primary/80' };
};

export default function Rooms() {
  const navigate = useNavigate();
  const [roomsData, setRoomsData] = useState(rooms);
  const [filter, setFilter] = useState<'all' | 'joined' | 'discover'>('all');
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [pendingMatureRoomId, setPendingMatureRoomId] = useState<string | null>(null);

  const handleRoomClick = (roomId: string, isMature: boolean) => {
    if (isMature) {
      const verified = sessionStorage.getItem(AGE_VERIFIED_KEY);
      if (verified === 'true') {
        navigate(`/rooms/${roomId}`);
      } else {
        setPendingMatureRoomId(roomId);
        setShowAgeModal(true);
      }
    } else {
      navigate(`/rooms/${roomId}`);
    }
  };

  const handleAgeConfirm = () => {
    sessionStorage.setItem(AGE_VERIFIED_KEY, 'true');
    setShowAgeModal(false);
    if (pendingMatureRoomId) {
      navigate(`/rooms/${pendingMatureRoomId}`);
      setPendingMatureRoomId(null);
    }
  };

  const handleAgeDecline = () => {
    setShowAgeModal(false);
    setPendingMatureRoomId(null);
  };

  const toggleJoin = (roomId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRoomsData(prev => prev.map(r => 
      r.id === roomId ? { ...r, isJoined: !r.isJoined } : r
    ));
  };

  const filteredRooms = roomsData.filter(room => {
    return filter === 'all' || 
           (filter === 'joined' && room.isJoined) ||
           (filter === 'discover' && !room.isJoined);
  });

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
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 sm:gap-3 mb-5"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary/30 to-baebles-purple/20 flex items-center justify-center shadow-lg shrink-0" style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' }}>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent">Rooms</h1>
        </motion.div>

        {/* Filter Tabs */}
        <FilterTabs
          tabs={[
            { id: 'all', label: 'All', icon: LayoutGrid },
            { id: 'joined', label: 'Joined', icon: Check },
            { id: 'discover', label: 'Discover', icon: Compass },
          ]}
          activeTab={filter}
          onTabChange={(id) => setFilter(id as 'all' | 'joined' | 'discover')}
          variant="badge"
        />

        {/* Rooms Grid */}
        <motion.div 
          className="grid grid-cols-2 gap-2.5 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredRooms.map((room) => {
            const colors = getColorForRoom(room.icon);
            const RoomIcon = roomIconMap[room.icon] || Sparkles;
            return (
              <motion.div 
                key={room.id} 
                variants={itemVariants}
                className="relative cursor-pointer group"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={() => handleRoomClick(room.id, room.isMature)}
              >
                <div 
                  className={`relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/5] bg-gradient-to-b ${colors.bg}`}
                  style={{
                    boxShadow: `0 8px 32px ${colors.accent}20, inset 0 1px 0 hsl(0 0% 100% / 0.1)`
                  }}
                >
                  {/* Room Icon - Centered */}
                  <div className="absolute inset-0 flex items-center justify-center pb-16">
                    <motion.div 
                      className="drop-shadow-lg"
                      style={{ filter: `drop-shadow(0 0 12px ${colors.accent}60)` }}
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      <RoomIcon className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: colors.accent }} />
                    </motion.div>
                  </div>
                  
                  {/* 18+ Badge */}
                  {room.isMature && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-baebles-orange/90 text-white text-[10px] sm:text-xs font-display shadow-lg">
                      <ShieldAlert className="w-3 h-3" />
                      18+
                    </div>
                  )}
                  
                  {/* Bottom Info Panel */}
                  <div className={`absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 bg-gradient-to-t ${colors.darkBg} to-transparent pt-6 sm:pt-10`}>
                    <h3 className={`font-display text-sm sm:text-lg font-semibold mb-0.5 sm:mb-1 ${colors.text} break-words leading-tight`}>
                      #{room.name}
                    </h3>
                    <p className="text-[11px] sm:text-sm text-white/90 font-body line-clamp-2 mb-1.5 sm:mb-2 leading-snug">
                      {room.description}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs text-white/80">
                      <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{formatCount(room.membersCount)}</span>
                    </div>
                  </div>
                  
                  {/* Enter Room Button on Hover */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <div 
                      className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-display text-white shadow-xl"
                      style={{ backgroundColor: colors.accent }}
                    >
                      <DoorOpen className="w-4 h-4" />
                      Enter Room
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredRooms.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-body">No rooms found</p>
          </motion.div>
        )}
      </div>

      <AgeVerificationModal
        isOpen={showAgeModal}
        onConfirm={handleAgeConfirm}
        onDecline={handleAgeDecline}
      />
    </MainLayout>
  );
}
