import { motion } from 'framer-motion';
import { RACES, GENDERS } from '@/types/onboarding';
import { NavigationButtons } from '../NavigationButtons';
import { 
  Users, Flower2, Flame, Moon, Dog, User, TreeDeciduous, Sun, 
  Skull, Wand2, Waves, CircleDot, Circle, Hexagon, Check, Gem, LucideIcon, Sparkles
} from 'lucide-react';

interface Step3Props {
  race: string;
  gender: string;
  avatarId: string;
  onRaceChange: (race: string) => void;
  onGenderChange: (gender: string) => void;
  onAvatarChange: (avatarId: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  Flower2, Flame, Moon, Dog, User, TreeDeciduous, Sun, Skull, Wand2, Waves,
  CircleDot, Circle, Hexagon
};

const getIcon = (iconName: string, className = "w-6 h-6") => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
};

// Race icons for avatar display
const raceIconMap: Record<string, LucideIcon> = {
  fae: Flower2,
  dragon: Flame,
  vampire: Moon,
  werewolf: Dog,
  human: User,
  elf: TreeDeciduous,
  angel: Sun,
  demon: Skull,
  witch: Wand2,
  mermaid: Waves,
};

// Generate placeholder avatar IDs based on race and gender
const getAvatars = (race: string, gender: string) => {
  if (!race || !gender) return [];
  return Array.from({ length: 3 }).map((_, i) => `${race}-${gender}-${i + 1}`);
};

export function Step3RaceAvatar({
  race,
  gender,
  avatarId,
  onRaceChange,
  onGenderChange,
  onAvatarChange,
  onBack,
  onContinue,
}: Step3Props) {
  const avatars = getAvatars(race, gender);
  const canContinue = race && gender && avatarId;
  const selectedRace = RACES.find(r => r.id === race);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-baebles-gold/20 to-primary/20 flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-baebles-gold" />
        </div>
        <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent tracking-wide mb-1">
          Create Your Avatar
        </h1>
        <p className="text-muted-foreground font-body text-xs sm:text-sm">
          What creature will you embody?
        </p>
      </div>


      {/* Race Selection */}
      <div className="baebles-card-simple p-4 mb-4">
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
                onClick={() => onRaceChange(r.id)}
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
      </div>

      {/* Gender Selection */}
      <div className="baebles-card-simple p-4 mb-4">
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
                onClick={() => onGenderChange(g.id)}
                className={`flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-primary/20 to-baebles-gold/15 ring-2 ring-primary shadow-lg'
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
      </div>

      {/* Avatar Selection */}
      {race && gender && (
        <motion.div 
          className="baebles-card-simple p-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
                  onClick={() => onAvatarChange(id)}
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
          <motion.div 
            className="rounded-xl p-3 text-center cursor-pointer transition-all flex items-center justify-center gap-2"
            style={{ 
              background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--baebles-gold) / 0.1))',
              border: '1px dashed hsl(var(--baebles-gold) / 0.5)'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Gem className="w-4 h-4 text-baebles-gold" />
            <span className="font-body text-sm text-muted-foreground">
              More avatars await in the shop! →
            </span>
          </motion.div>
        </motion.div>
      )}

      <NavigationButtons
        onBack={onBack}
        onContinue={onContinue}
        continueDisabled={!canContinue}
      />
    </div>
  );
}
