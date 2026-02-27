import { motion } from 'framer-motion';
import { SUBGENRES, TROPES } from '@/types/onboarding';
import { NavigationButtons } from '../NavigationButtons';
import { 
  Check, Castle, Crown, Moon, Heart, Building2, Coffee, Columns3, 
  Sparkles, Sword, Map, Wand2, Sprout, Eclipse, Flame, Users, Star, 
  Hourglass, Lock, Scale, Shield, Compass, GraduationCap, Swords, 
  Gem, ScrollText, Unlock, Sunrise, Skull, BookOpen, Zap, LucideIcon
} from 'lucide-react';

interface Step5Props {
  subgenres: string[];
  tropes: string[];
  onSubgenresChange: (subgenres: string[]) => void;
  onTropesChange: (tropes: string[]) => void;
  onBack: () => void;
  onContinue: () => void;
}

// Icon map for dynamic rendering
const iconMap: Record<string, LucideIcon> = {
  Castle, Crown, Moon, Heart, Building2, Coffee, Columns3, Sparkles,
  Sword, Map, Wand2, Sprout, Eclipse, Flame, Users, Star, Hourglass,
  Lock, Scale, Shield, Compass, GraduationCap, Swords, Gem, ScrollText,
  Unlock, Sunrise, Skull
};

interface TagSectionProps {
  title: string;
  TitleIcon: LucideIcon;
  items: readonly { id: string; icon: string; name: string }[];
  selected: string[];
  onToggle: (id: string) => void;
  maxItems?: number;
}

function TagSection({ title, TitleIcon, items, selected, onToggle, maxItems = 5 }: TagSectionProps) {
  const isMaxReached = selected.length >= maxItems;

  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      onToggle(id);
    } else if (selected.length < maxItems) {
      onToggle(id);
    }
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
  };

  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base text-primary flex items-center gap-2">
          <TitleIcon className="w-5 h-5" />
          <span>{title}</span>
        </h3>
        <span className={`text-xs font-body px-2 py-1 rounded-full ${
          isMaxReached ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
        }`}>
          {selected.length}/{maxItems}
        </span>
      </div>

      {/* All Tags Grid */}
      <div className="grid grid-cols-2 gap-2">
        {items.map(item => {
          const isSelected = selected.includes(item.id);
          const isFavorite = selected[0] === item.id;
          const isDisabled = isMaxReached && !isSelected;
          
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleToggle(item.id)}
              disabled={isDisabled}
              className={`relative flex items-center gap-2 p-3 rounded-xl text-left transition-all ${
                isSelected
                  ? isFavorite
                    ? 'bg-gradient-to-br from-baebles-gold/15 to-baebles-gold/10 ring-2 ring-baebles-gold'
                    : 'bg-gradient-to-br from-primary/15 to-baebles-gold/10 ring-2 ring-primary'
                  : isDisabled
                    ? 'bg-muted/30 opacity-50 cursor-not-allowed'
                    : 'bg-muted/50 hover:bg-muted/80 active:bg-muted'
              }`}
            >
              <span className={`shrink-0 ${isSelected ? (isFavorite ? 'text-baebles-gold' : 'text-primary') : 'text-muted-foreground'}`}>
                {getIcon(item.icon)}
              </span>
              <span className="font-body text-sm text-foreground/90 flex-1 leading-tight">
                {item.name}
              </span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                    isFavorite ? 'bg-baebles-gold' : 'bg-primary'
                  }`}
                >
                  {isFavorite ? (
                    <Star className="w-3 h-3 text-white fill-white" />
                  ) : (
                    <Check className="w-3 h-3 text-primary-foreground" />
                  )}
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export function Step5Tastes({
  subgenres,
  tropes,
  onSubgenresChange,
  onTropesChange,
  onBack,
  onContinue,
}: Step5Props) {
  const toggleSubgenre = (id: string) => {
    if (subgenres.includes(id)) {
      onSubgenresChange(subgenres.filter(s => s !== id));
    } else {
      onSubgenresChange([...subgenres, id]);
    }
  };

  const toggleTrope = (id: string) => {
    if (tropes.includes(id)) {
      onTropesChange(tropes.filter(t => t !== id));
    } else {
      onTropesChange([...tropes, id]);
    }
  };

  const canContinue = subgenres.length >= 1 && tropes.length >= 1;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-baebles-gold/12 flex items-center justify-center">
          <BookOpen className="w-7 h-7 text-primary" />
        </div>
        <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent tracking-wide mb-1">
          Your Tastes
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-body">
          Select your favorite subgenres and tropes
        </p>
      </div>

      {/* Info Note */}
      <div 
        className="flex items-center gap-2 p-3 rounded-xl text-xs mb-4"
        style={{ 
          background: 'hsl(var(--baebles-purple) / 0.1)', 
          border: '1px solid hsl(var(--baebles-purple) / 0.3)' 
        }}
      >
        <Star className="w-3.5 h-3.5 shrink-0 text-baebles-purple" />
        <span className="font-body text-baebles-purple">
          The first one you select will be your favorite!
        </span>
      </div>

      {/* Subgenres */}
      <div className="baebles-card-simple p-4 mb-4">
        <TagSection
          title="Subgenres"
          TitleIcon={BookOpen}
          items={SUBGENRES}
          selected={subgenres}
          onToggle={toggleSubgenre}
        />
      </div>

      {/* Tropes */}
      <div className="baebles-card-simple p-4 mb-4">
        <TagSection
          title="Tropes"
          TitleIcon={Zap}
          items={TROPES}
          selected={tropes}
          onToggle={toggleTrope}
        />
      </div>

      <NavigationButtons
        onBack={onBack}
        onContinue={onContinue}
        continueDisabled={!canContinue}
      />
    </div>
  );
}
