import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Check, Users, Sparkles, Gem, Flower2, Flame, Moon, Dog, User, TreeDeciduous, Sun, Skull, Wand2, Waves, LucideIcon, Crown } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { RACES, GENDERS } from '@/types/onboarding';
import { toast } from '@/hooks/use-toast';
import { usePurchasedAvatars } from '@/hooks/usePurchasedAvatars';

const iconMap: Record<string, LucideIcon> = {
  Flower2, Flame, Moon, Dog, User, TreeDeciduous, Sun, Skull, Wand2, Waves,
};

const getIcon = (iconName: string, className = "w-6 h-6") => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
};

// Race icons for avatar display
const raceIconMap: Record<string, LucideIcon> = {
  fae: Flower2,
  'dragon-rider': Flame,
  vampire: Moon,
  werewolf: Dog,
  human: User,
  nymph: TreeDeciduous,
  angel: Sun,
  demon: Skull,
  'witch-mage': Wand2,
  siren: Waves,
};

// Generate placeholder avatar IDs based on race and gender
const getAvatars = (race: string, gender: string) => {
  if (!race || !gender) return [];
  return Array.from({ length: 3 }).map((_, i) => `${race}-${gender}-${i + 1}`);
};

export default function EditRace() {
  const navigate = useNavigate();
  const { purchasedAvatars } = usePurchasedAvatars();
  const [race, setRace] = useState('');
  const [gender, setGender] = useState('');
  const [avatarId, setAvatarId] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('baebles_onboarding');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setRace(parsed.race || '');
        setGender(parsed.gender || '');
        setAvatarId(parsed.avatarId || '');
      } catch {
        // Keep empty
      }
    }
  }, []);

  const avatars = getAvatars(race, gender);
  const canSave = race && gender && avatarId;

  const handleSave = () => {
    const saved = localStorage.getItem('baebles_onboarding');
    const data = saved ? JSON.parse(saved) : {};
    localStorage.setItem('baebles_onboarding', JSON.stringify({
      ...data,
      race,
      gender,
      avatarId
    }));

    const selectedRace = RACES.find(r => r.id === race);
    toast({
      title: "Avatar Updated",
      description: `You are now a ${selectedRace?.name || race}`,
    });
    navigate('/settings');
  };

  return (
    <MainLayout>
      <div className="py-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 sm:gap-3 mb-6"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary/20 to-baebles-gold/15 flex items-center justify-center shadow-lg shrink-0">
            <Sparkles className="w-5 h-5 text-baebles-gold" />
          </div>
          <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent">
            Edit Avatar
          </h1>
        </motion.div>

        {/* Purchased Avatars Section */}
        {purchasedAvatars.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="baebles-card-simple p-4 mb-4"
          >
            <h3 className="font-display text-sm text-baebles-gold mb-3 flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Your Avatars
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {purchasedAvatars.map((avatar, index) => {
                const isSelected = avatarId === avatar.id;
                return (
                  <motion.button
                    key={avatar.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setAvatarId(avatar.id)}
                    className={`relative aspect-square rounded-xl flex flex-col items-center justify-center transition-all overflow-hidden ${
                      isSelected
                        ? 'ring-2 ring-baebles-gold shadow-lg'
                        : 'active:bg-muted hover:bg-muted/80'
                    }`}
                    style={isSelected ? { boxShadow: '0 0 15px hsl(var(--baebles-gold) / 0.3)' } : {}}
                  >
                    {avatar.src ? (
                      <img 
                        src={avatar.src} 
                        alt={avatar.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/15 to-baebles-gold/10 flex items-center justify-center">
                        <span className="text-2xl">{avatar.emoji}</span>
                      </div>
                    )}
                    
                    {isSelected && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-baebles-gold rounded-full flex items-center justify-center shadow-md"
                      >
                        <Check className="w-3 h-3 text-background" />
                      </motion.div>
                    )}

                    {/* Name overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-1 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-[8px] text-white font-display text-center truncate">{avatar.name}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Shop CTA */}
            <Link 
              to="/shop"
              className="mt-3 rounded-xl p-2.5 text-center transition-all flex items-center justify-center gap-2"
              style={{ 
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--baebles-gold) / 0.08))',
                border: '1px dashed hsl(var(--baebles-gold) / 0.5)'
              }}
            >
              <Gem className="w-4 h-4 text-baebles-gold" />
              <span className="font-body text-xs text-muted-foreground">
                Get more avatars in the shop →
              </span>
            </Link>
          </motion.div>
        )}

        {/* Race Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="baebles-card-simple p-4 mb-4"
        >
          <h3 className="font-display text-sm text-primary mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Choose your race
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {RACES.map((r, index) => {
              const isSelected = race === r.id;
              return (
                <motion.button
                  key={r.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setRace(r.id);
                    setAvatarId(''); // Reset avatar when race changes
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all aspect-square ${
                    isSelected
                      ? 'bg-gradient-to-br from-primary/20 to-baebles-gold/15 ring-2 ring-baebles-gold shadow-lg'
                      : 'bg-muted/50 active:bg-muted hover:bg-muted/80'
                  }`}
                  style={isSelected ? { boxShadow: '0 0 15px hsl(var(--baebles-gold) / 0.3)' } : {}}
                >
                  <span className={`mb-0.5 ${isSelected ? 'text-baebles-gold' : 'text-muted-foreground'}`}>
                    {getIcon(r.icon, "w-5 h-5")}
                  </span>
                  <span className={`text-[9px] font-body text-center leading-tight ${isSelected ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {r.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Gender Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="baebles-card-simple p-4 mb-4"
        >
          <h3 className="font-display text-sm text-primary mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Choose your style
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {GENDERS.map((g, index) => {
              const isSelected = gender === g.id;
              return (
                <motion.button
                  key={g.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setGender(g.id);
                    setAvatarId(''); // Reset avatar when gender changes
                  }}
                  className={`flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br from-primary/20 to-baebles-gold/12 ring-2 ring-primary shadow-lg'
                      : 'bg-muted/50 active:bg-muted hover:bg-muted/80'
                  }`}
                  style={isSelected ? { boxShadow: '0 0 15px hsl(var(--primary) / 0.3)' } : {}}
                >
                  <span className={`${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                    {g.id === 'female' ? <Flower2 className="w-5 h-5" /> : g.id === 'male' ? <Flame className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                  </span>
                  <span className={`font-body text-xs ${isSelected ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {g.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Avatar Selection */}
        {race && gender && (
          <motion.div 
            className="baebles-card-simple p-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-display text-sm text-primary mb-3 flex items-center gap-2">
              <Gem className="w-4 h-4" />
              Choose your avatar
            </h3>
            
            {/* Avatar Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {avatars.map((id, index) => {
                const isSelected = avatarId === id;
                const variation = index + 1;
                return (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setAvatarId(id)}
                    className={`relative aspect-square rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-primary/20 to-baebles-gold/15 ring-2 ring-baebles-gold shadow-lg'
                        : 'bg-muted/50 active:bg-muted hover:bg-muted/80'
                    }`}
                    style={isSelected ? { boxShadow: '0 0 15px hsl(var(--baebles-gold) / 0.3)' } : {}}
                  >
                    {(() => { const RIcon = raceIconMap[race] || Sparkles; return <RIcon className="w-6 h-6 text-primary" />; })()}
                    
                    {/* Variation number */}
                    <span className={`absolute bottom-1 right-1 text-[8px] font-display px-1 rounded ${
                      isSelected ? 'bg-baebles-gold text-background' : 'bg-muted-foreground/20 text-muted-foreground'
                    }`}>
                      #{variation}
                    </span>
                    
                    {isSelected && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-baebles-gold rounded-full flex items-center justify-center shadow-md"
                      >
                        <Check className="w-3 h-3 text-background" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Premium CTA */}
            <Link 
              to="/shop"
              className="rounded-xl p-3 text-center transition-all flex items-center justify-center gap-2"
              style={{ 
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--baebles-gold) / 0.1))',
                border: '1px dashed hsl(var(--baebles-gold) / 0.5)'
              }}
            >
              <Gem className="w-4 h-4 text-baebles-gold" />
              <span className="font-body text-sm text-muted-foreground">
                More avatars await in the shop! →
              </span>
            </Link>
          </motion.div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <motion.button
            onClick={() => navigate('/settings')}
            className="flex-1 py-3 px-4 rounded-xl font-display text-sm bg-muted/50 border border-border/50 text-muted-foreground active:bg-muted transition-all"
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={handleSave}
            disabled={!canSave}
            className="flex-1 baebles-btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            whileTap={{ scale: 0.98 }}
          >
            <Check className="w-4 h-4" />
            Save
          </motion.button>
        </div>
      </div>
    </MainLayout>
  );
}
