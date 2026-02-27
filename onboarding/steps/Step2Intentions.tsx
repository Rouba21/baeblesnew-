import { motion } from 'framer-motion';
import { INTENTIONS } from '@/types/onboarding';
import { NavigationButtons } from '../NavigationButtons';
import { Sparkles, MessageCircle, Heart, Pen, Users, LucideIcon, Check } from 'lucide-react';

interface Step2Props {
  selected: string[];
  onSelect: (intentions: string[]) => void;
  onBack: () => void;
  onContinue: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  MessageCircle,
  Heart,
  Pen,
  Users,
};

export function Step2Intentions({ selected, onSelect, onBack, onContinue }: Step2Props) {
  const toggleIntention = (id: string) => {
    if (selected.includes(id)) {
      onSelect(selected.filter(s => s !== id));
    } else {
      onSelect([...selected, id]);
    }
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-baebles-gold/12 flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-primary" />
        </div>
        <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent tracking-wide mb-1">
          What Brings You Here?
        </h1>
        <p className="text-muted-foreground font-body text-xs sm:text-sm">
          Tell us your intentions so we can tailor your experience
        </p>
      </div>

      {/* Options */}
      <div className="baebles-card-simple p-4 mb-4">
        <div className="space-y-3">
          {INTENTIONS.map((intention, index) => {
            const isSelected = selected.includes(intention.id);
            return (
              <motion.button
                key={intention.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleIntention(intention.id)}
                className={`w-full flex gap-3 items-center p-3 rounded-xl transition-all text-left ${
                  isSelected
                    ? 'bg-gradient-to-br from-primary/20 to-baebles-gold/15 ring-2 ring-primary'
                    : 'bg-muted/50 active:bg-muted'
                }`}
                style={isSelected ? { boxShadow: '0 0 15px hsl(var(--primary) / 0.2)' } : {}}
              >
                <div 
                  className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  style={{
                    background: isSelected 
                      ? 'hsl(var(--primary) / 0.15)'
                      : 'hsl(var(--muted))'
                  }}
                >
                  {getIcon(intention.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-display text-sm ${isSelected ? 'text-foreground' : 'text-foreground/80'}`}>
                    {intention.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-body line-clamp-1">
                    {intention.description}
                  </p>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Info Note */}
      <div 
        className="flex items-center gap-2 p-3 rounded-xl text-xs mb-4"
        style={{ 
          background: 'hsl(var(--baebles-purple) / 0.1)', 
          border: '1px solid hsl(var(--baebles-purple) / 0.3)' 
        }}
      >
        <Sparkles className="w-3.5 h-3.5 shrink-0 text-baebles-purple" />
        <span className="font-body text-baebles-purple">
          Select multiple options to personalize your journey.
        </span>
      </div>

      <NavigationButtons
        onBack={onBack}
        onContinue={onContinue}
        continueDisabled={selected.length === 0}
      />
    </div>
  );
}
