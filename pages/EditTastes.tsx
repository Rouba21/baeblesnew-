import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Check, BookOpen, Zap, Star, LucideIcon, Castle, Crown, Moon, Heart, Building2, Coffee, Columns3, Sparkles, Sword, Map, Wand2, Sprout, Eclipse, Flame, Users, Hourglass, Lock, Scale, Shield, Compass, GraduationCap, Swords, Gem, ScrollText, Unlock, Sunrise, Skull } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SUBGENRES, TROPES } from '@/types/onboarding';
import { toast } from '@/hooks/use-toast';

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
                    ? 'bg-baebles-orange/10 border-2 border-baebles-orange'
                    : 'bg-primary/10 border-2 border-primary'
                  : isDisabled
                    ? 'bg-muted/30 border-2 border-transparent opacity-50 cursor-not-allowed'
                    : 'bg-muted/50 border-2 border-transparent hover:border-primary/30 active:bg-muted'
              }`}
            >
              <span className={`shrink-0 ${isSelected ? (isFavorite ? 'text-baebles-orange' : 'text-primary') : 'text-muted-foreground'}`}>
                {getIcon(item.icon)}
              </span>
              <span className="font-body text-sm text-foreground/90 line-clamp-1 flex-1">
                {item.name}
              </span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                    isFavorite ? 'bg-baebles-orange' : 'bg-primary'
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

export default function EditTastes() {
  const navigate = useNavigate();
  const [subgenres, setSubgenres] = useState<string[]>([]);
  const [tropes, setTropes] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('baebles_onboarding');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSubgenres(parsed.favoriteSubgenres || []);
        setTropes(parsed.favoriteTropes || []);
      } catch {
        // Keep empty
      }
    }
  }, []);

  const toggleSubgenre = (id: string) => {
    if (subgenres.includes(id)) {
      setSubgenres(subgenres.filter(s => s !== id));
    } else {
      setSubgenres([...subgenres, id]);
    }
  };

  const toggleTrope = (id: string) => {
    if (tropes.includes(id)) {
      setTropes(tropes.filter(t => t !== id));
    } else {
      setTropes([...tropes, id]);
    }
  };

  const handleSave = () => {
    const saved = localStorage.getItem('baebles_onboarding');
    const data = saved ? JSON.parse(saved) : {};
    localStorage.setItem('baebles_onboarding', JSON.stringify({
      ...data,
      favoriteSubgenres: subgenres,
      favoriteTropes: tropes
    }));

    toast({
      title: "Tastes Updated",
      description: "Your subgenres and tropes have been saved",
    });
    navigate('/settings');
  };

  const canSave = subgenres.length >= 1 && tropes.length >= 1;

  return (
    <MainLayout>
      <div className="py-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 sm:gap-3 mb-6"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary/30 to-baebles-purple/20 flex items-center justify-center shadow-lg shrink-0">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent">
            Edit Tastes
          </h1>
        </motion.div>

        {/* Subgenres */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="baebles-card-simple p-4 mb-4"
        >
          <TagSection
            title="Subgenres"
            TitleIcon={BookOpen}
            items={SUBGENRES}
            selected={subgenres}
            onToggle={toggleSubgenre}
          />
        </motion.div>

        {/* Tropes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="baebles-card-simple p-4 mb-4"
        >
          <TagSection
            title="Tropes"
            TitleIcon={Zap}
            items={TROPES}
            selected={tropes}
            onToggle={toggleTrope}
          />
        </motion.div>

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
