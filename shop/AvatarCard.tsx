import { motion } from 'framer-motion';
import { Clock, Plus, Sparkles, LucideIcon } from 'lucide-react';

interface AvatarCardProps {
  id: string;
  name: string;
  avatarCount: number;
  price: number;
  icon: LucideIcon;
  gradient: string;
  previewImage?: string;
  isLimited?: boolean;
  limitedDays?: number;
  stock?: number;
  isDisabled?: boolean;
  buttonLabel?: string | null;
  onAdd: () => void;
  onClick: () => void;
}

export function AvatarCard({
  name,
  avatarCount,
  price,
  icon: Icon,
  gradient,
  previewImage,
  isLimited,
  limitedDays,
  stock,
  isDisabled,
  buttonLabel,
  onAdd,
  onClick,
}: AvatarCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative cursor-pointer group"
    >
      {/* Card */}
      <div className="relative rounded-2xl overflow-hidden bg-card shadow-md border border-border/50">
          {/* Illustration area */}
          <div className={`relative h-32 sm:h-40 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
            {/* Decorative corner ornaments */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-baebles-gold/60 rounded-tl-lg z-10" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-baebles-gold/60 rounded-tr-lg z-10" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-baebles-gold/60 rounded-bl-lg z-10" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-baebles-gold/60 rounded-br-lg z-10" />

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

            {/* Preview image or icon fallback */}
            {previewImage ? (
              <img src={previewImage} alt={name} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <Icon className="w-14 h-14 sm:w-18 sm:h-18 text-white/90 drop-shadow-lg" />
            )}

            {/* Limited badge */}
            {isLimited && (
              <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-baebles-orange to-baebles-gold rounded-full shadow-md">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-[10px] font-display text-white uppercase tracking-wider">Limited</span>
              </div>
            )}

            {/* Stock counter */}
            {isLimited && stock !== undefined && (
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-background/80 backdrop-blur-sm rounded-full">
                <span className="text-[10px] font-display text-baebles-rose">{stock} left</span>
              </div>
            )}

            {/* Name overlay at bottom */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pt-8 pb-2 px-3">
              <h3 className="font-display text-sm sm:text-base text-white truncate tracking-wide">
                {name}
              </h3>
            </div>
          </div>

          {/* Info footer */}
          <div className="p-3 flex items-center justify-between gap-2">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-xs text-muted-foreground font-body">
                {avatarCount} avatar{avatarCount > 1 ? 's' : ''}
              </span>
              {isLimited && limitedDays !== undefined && (
                <span className="text-[10px] text-baebles-orange font-display flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {limitedDays}d left
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="font-display text-lg text-baebles-gold">
                €{price.toFixed(2)}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onAdd(); }}
                disabled={isDisabled}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display transition-colors ${
                  isDisabled
                    ? 'bg-muted text-muted-foreground'
                    : 'bg-gradient-to-br from-baebles-gold to-baebles-orange text-white shadow-md'
                }`}
                style={!isDisabled ? { boxShadow: '0 2px 10px hsl(45 85% 55% / 0.4)' } : {}}
              >
                {buttonLabel ? <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : <Plus className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
      </div>
    </motion.div>
  );
}
