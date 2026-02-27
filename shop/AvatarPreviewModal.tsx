import { motion } from 'framer-motion';
import { X, Sparkles, Clock, LucideIcon } from 'lucide-react';

interface AvatarPack {
  id: string;
  name: string;
  avatarCount: number;
  price: number;
  icon: LucideIcon;
  isLimited?: boolean;
  limitedDays?: number;
  stock?: number;
  gradient: string;
}

interface AvatarPreviewModalProps {
  pack: AvatarPack;
  onClose: () => void;
  onBuy: () => void;
}

export function AvatarPreviewModal({ pack, onClose, onBuy }: AvatarPreviewModalProps) {
  const PackIcon = pack.icon;
  
  // Generate silhouette variations based on pack
  const silhouetteVariants = [
    { pose: 'default', rotation: 0 },
    { pose: 'side', rotation: -15 },
    { pose: 'action', rotation: 10 },
    { pose: 'elegant', rotation: -5 },
  ].slice(0, pack.avatarCount);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed z-50 bg-card overflow-hidden rounded-2xl inset-x-4 mx-auto max-w-md max-h-[85vh] overflow-y-auto"
        style={{ 
          top: '8%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)' 
        }}
      >
        {/* Header with gradient background */}
        <div className={`relative p-6 pb-16 bg-gradient-to-br ${pack.gradient}`}>
          {/* Close button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm text-white"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Pack Icon */}
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
            <PackIcon className="w-8 h-8 text-white" />
          </div>

          {/* Pack Name */}
          <h2 className="font-display text-xl text-white mb-2">{pack.name}</h2>
          
          {/* Limited badge */}
          {pack.isLimited && (
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-display flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {pack.limitedDays} days left
              </span>
              <span className="text-xs text-white/80">
                Only {pack.stock} left!
              </span>
            </div>
          )}
        </div>

        {/* Avatar Previews */}
        <div className="p-6 -mt-10">
          <div className="bg-card rounded-2xl border border-border/50 p-4 shadow-lg">
            <h3 className="font-display text-sm text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              {pack.avatarCount} Avatars Included
            </h3>

            {/* Silhouette Grid */}
            <div className="grid grid-cols-3 gap-3">
              {silhouetteVariants.map((variant, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="aspect-square relative group"
                >
                  {/* Avatar silhouette card */}
                  <div 
                    className={`w-full h-full rounded-xl bg-gradient-to-br ${pack.gradient} relative overflow-hidden shadow-md`}
                    style={{ transform: `rotate(${variant.rotation}deg)` }}
                  >
                    {/* Silhouette figure */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-3/4 h-3/4">
                        {/* Head */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30" />
                        {/* Body */}
                        <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 w-10 h-14 sm:w-12 sm:h-16 bg-black/30 rounded-t-2xl" 
                          style={{ 
                            clipPath: variant.pose === 'action' 
                              ? 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' 
                              : variant.pose === 'elegant'
                                ? 'polygon(15% 0%, 85% 0%, 95% 100%, 5% 100%)'
                                : 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)'
                          }}
                        />
                        {/* Icon overlay */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <PackIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white/50" />
                        </div>
                      </div>
                    </div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Avatar number */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-display flex items-center justify-center shadow-md">
                    {index + 1}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Features */}
            <div className="mt-4 pt-4 border-t border-border/50 space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-baebles-teal" />
                Unique fantasy designs
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-baebles-teal" />
                High-resolution artwork
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-baebles-teal" />
                Exclusive to Baebles
              </div>
            </div>
          </div>
        </div>

        {/* Footer with price and buy button */}
        <div className="p-6 pt-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground">Total price</p>
              <p className="font-display text-2xl text-foreground">€{pack.price.toFixed(2)}</p>
            </div>
            {pack.isLimited && (
              <div className="text-right">
                <p className="text-xs text-baebles-orange font-display">Limited Edition</p>
                <p className="text-xs text-muted-foreground">{pack.stock} remaining</p>
              </div>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onBuy}
            className={`w-full py-3.5 rounded-xl font-display text-sm flex items-center justify-center gap-2 shadow-lg ${
              pack.isLimited
                ? 'bg-gradient-to-r from-baebles-orange to-baebles-gold text-white'
                : 'bg-primary text-primary-foreground'
            }`}
            style={pack.isLimited ? { boxShadow: '0 4px 15px hsl(var(--baebles-orange) / 0.4)' } : {}}
          >
            <Sparkles className="w-4 h-4" />
            Buy Now
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
