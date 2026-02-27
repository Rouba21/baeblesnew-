import { motion } from 'framer-motion';
import { Check, LucideIcon, Sparkles, Snowflake, Flame, Moon, Crown, Skull, Flower2, TreeDeciduous, Wand2, Waves, Feather, Bird, User } from 'lucide-react';

const RACE_ICONS: Record<string, { label: string; icon: LucideIcon }> = {
  fae: { label: 'Fae', icon: Flower2 },
  vampire: { label: 'Vampire', icon: Moon },
  dragon: { label: 'Dragon', icon: Flame },
  witch: { label: 'Witch', icon: Wand2 },
  wolf: { label: 'Wolf', icon: Feather },
  human: { label: 'Human', icon: User },
  elf: { label: 'Elf', icon: TreeDeciduous },
  mermaid: { label: 'Mermaid', icon: Waves },
  angel: { label: 'Angel', icon: Bird },
  shifter: { label: 'Shifter', icon: Sparkles },
};

interface CollectionCardProps {
  id: string;
  name: string;
  race: string;
  price: number;
  gradient: string;
  previewImage?: string;
  icon: LucideIcon;
  progress: number;
  total: number;
  isLimited?: boolean;
  onClick: () => void;
}

export function CollectionCard({
  name, race, price, gradient, previewImage, icon: Icon,
  progress, total, isLimited, onClick,
}: CollectionCardProps) {
  const isComplete = progress >= total;
  const pct = total > 0 ? (progress / total) * 100 : 0;
  const raceInfo = RACE_ICONS[race] || { label: race, icon: Sparkles };
  const RaceIcon = raceInfo.icon;
  const hasStarted = progress > 0;

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div
        className="relative rounded-2xl overflow-hidden bg-card transition-all duration-300"
        style={{
          border: '1.5px solid hsl(var(--baebles-gold) / 0.4)',
          boxShadow: '0 2px 16px hsl(var(--baebles-gold) / 0.12), inset 0 0 20px hsl(var(--baebles-gold) / 0.05)',
        }}
      >
        {/* Image area - 3:4 aspect */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
          {previewImage && (
            <img src={previewImage} alt={name} className="absolute inset-0 w-full h-full object-cover" />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Ornate corner filigree */}
          <div className="absolute top-1.5 left-1.5 text-baebles-gold/50 text-xs leading-none">◆</div>
          <div className="absolute top-1.5 right-1.5 text-baebles-gold/50 text-xs leading-none">◆</div>
          <div className="absolute bottom-1.5 left-1.5 text-baebles-gold/50 text-xs leading-none">◆</div>
          <div className="absolute bottom-1.5 right-1.5 text-baebles-gold/50 text-xs leading-none">◆</div>

          {/* Top decorative line */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-baebles-gold/30 to-transparent" />

          {/* Race tag */}
          <div className="absolute top-2.5 left-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-display backdrop-blur-md bg-black/30 text-white/90 border border-baebles-gold/30 flex items-center gap-1">
              <RaceIcon className="w-3 h-3" /> {raceInfo.label}
            </span>
          </div>

          {/* Limited badge */}
          {isLimited && (
            <div className="absolute top-2.5 right-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-display bg-gradient-to-r from-baebles-orange to-baebles-gold text-primary-foreground flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Limited
              </span>
            </div>
          )}


          {/* Collection name overlay - tarot style */}
          <div className="absolute bottom-0 left-0 right-0 p-2.5 text-center">
            <div className="absolute bottom-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-baebles-gold/40 to-transparent" />
            <h3 className="font-display text-sm text-white tracking-widest uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              {name}
            </h3>
          </div>

          {/* Shine on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Status / price below image */}
        <div className="p-2 space-y-1.5 relative">
          {isComplete ? (
            <div className="flex items-center justify-center gap-1 py-1 rounded-lg bg-baebles-gold/10 border border-baebles-gold/30">
              <Check className="w-3.5 h-3.5 text-baebles-gold" />
              <span className="text-[11px] font-display text-baebles-gold">Complete</span>
            </div>
          ) : hasStarted ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-center gap-1 py-1 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-[11px] font-display text-primary">{progress}/{total} unlocked</span>
              </div>
              <div className="w-full h-1 rounded-full bg-muted/50 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, hsl(var(--baebles-gold)), hsl(var(--baebles-orange)))',
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1.5 py-1 rounded-lg bg-primary/10 border border-primary/20">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[11px] font-display text-foreground">
                From €{price.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
