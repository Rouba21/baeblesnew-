import { motion } from 'framer-motion';
import { Sparkles, ShoppingCart } from 'lucide-react';

interface PriceButtonProps {
  label: string;
  price: number;
  originalPrice?: number;
  variant: 'primary' | 'secondary';
  onClick: () => void;
  disabled?: boolean;
}

export function PriceButton({ label, price, originalPrice, variant, onClick, disabled }: PriceButtonProps) {
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

  if (variant === 'primary') {
    return (
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.01 }}
        onClick={onClick}
        disabled={disabled}
        className="relative w-full overflow-hidden rounded-xl disabled:opacity-50"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--baebles-gold)), hsl(var(--primary)))',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 4s ease infinite',
          boxShadow: '0 4px 20px hsl(var(--primary) / 0.3), 0 1px 3px hsl(var(--primary) / 0.2)',
        }}
      >
        {/* Shimmer sweep */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, hsl(0 0% 100% / 0.15) 50%, transparent 60%)',
            backgroundSize: '250% 100%',
            animation: 'shimmer 3s ease-in-out infinite',
          }}
        />

        <div className="relative z-10 py-3.5 px-6 flex items-center justify-between">
          {/* Left: icon + label */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="text-left">
              <span className="font-display text-sm text-primary-foreground block leading-tight">{label}</span>
              {discount > 0 && (
                <span className="text-[10px] text-primary-foreground/60 font-body">Save {discount}%</span>
              )}
            </div>
          </div>

          {/* Right: price */}
          <div className="flex flex-col items-end">
            {originalPrice && originalPrice !== price && (
              <span className="line-through text-primary-foreground/40 text-[11px] font-body leading-none">€{originalPrice.toFixed(2)}</span>
            )}
            <span className="font-display text-xl text-primary-foreground leading-tight">€{price.toFixed(2)}</span>
          </div>
        </div>
      </motion.button>
    );
  }

  // Secondary variant
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      disabled={disabled}
      className="relative w-full overflow-hidden rounded-xl border border-primary/25 disabled:opacity-50"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--primary) / 0.08))',
        boxShadow: '0 2px 10px hsl(var(--primary) / 0.08)',
      }}
    >
      <div className="relative z-10 py-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <ShoppingCart className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="font-display text-sm text-foreground">{label}</span>
        </div>
        <span className="font-display text-lg text-primary">€{price.toFixed(2)}</span>
      </div>
    </motion.button>
  );
}
