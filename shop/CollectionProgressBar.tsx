import { motion } from 'framer-motion';

interface CollectionProgressBarProps {
  unlocked: number;
  total: number;
}

export function CollectionProgressBar({ unlocked, total }: CollectionProgressBarProps) {
  return (
    <div className="px-1">
      <div className="flex gap-1.5 p-2 rounded-lg border border-border/30 bg-card/40 backdrop-blur-sm">
        {Array.from({ length: total }, (_, i) => {
          const isFilled = i < unlocked;
          return (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
              className="flex-1 h-2 rounded-full relative overflow-hidden"
              style={{
                background: isFilled
                  ? 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--baebles-gold)))'
                  : 'hsl(var(--muted))',
                boxShadow: isFilled ? '0 0 6px hsl(var(--primary) / 0.3)' : 'none',
              }}
            >
              {isFilled && (
                <span className="absolute right-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary-foreground/60" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
