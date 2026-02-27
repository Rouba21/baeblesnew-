import { motion } from 'framer-motion';
import { Sparkles, ExternalLink, Star, Snowflake, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export function InFeedBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl"
      style={{ 
        background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--card) / 0.95))',
        boxShadow: '0 4px 20px hsl(var(--primary) / 0.15), 0 0 0 1px hsl(var(--border) / 0.5)'
      }}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-baebles-gold/40 to-transparent blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-3xl" />
      </div>

      {/* Sponsored label - subtle */}
      <div className="relative px-4 pt-3 pb-2 flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-muted/50 backdrop-blur-sm">
          <Sparkles className="w-2.5 h-2.5 text-baebles-gold" />
          <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-display">
            Sponsored
          </span>
        </div>
      </div>

      {/* Main Banner Content */}
      <div className="relative px-4 pb-4">
        <div className="relative rounded-xl overflow-hidden" style={{ boxShadow: '0 8px 30px hsl(var(--primary) / 0.2)' }}>
          {/* Gradient Background */}
          <div className="h-36 sm:h-40 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 relative overflow-hidden">
            {/* Animated floating elements */}
            <motion.div 
              animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 right-6"
            >
              <Snowflake className="w-8 h-8 text-white/40" />
            </motion.div>
            <motion.div 
              animate={{ y: [5, -5, 5], rotate: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-8 left-8"
            >
              <Snowflake className="w-5 h-5 text-white/30" />
            </motion.div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-6 right-12"
            >
              <Star className="w-4 h-4 text-baebles-gold fill-baebles-gold" />
            </motion.div>
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="absolute top-12 left-1/3"
            >
              <Star className="w-3 h-3 text-baebles-gold fill-baebles-gold" />
            </motion.div>

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
            
            {/* Glass morphism overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              {/* Badge */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="px-3 py-1 rounded-full mb-3"
                style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-gold)), hsl(var(--baebles-orange)))' }}
              >
                <span className="text-[10px] font-display text-white uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Limited Edition
                </span>
              </motion.div>
              
              <h3 className="font-display text-xl sm:text-2xl text-white mb-1 drop-shadow-lg">
                Winter Fae Collection
              </h3>
              <p className="text-xs sm:text-sm text-white/90 font-body max-w-[200px]">
                3 exclusive avatars • Only 12 left!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative px-4 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-gold) / 0.3), hsl(var(--baebles-orange) / 0.2))', boxShadow: '0 0 15px hsl(var(--baebles-gold) / 0.2)' }}>
            <ShoppingBag className="w-5 h-5 text-baebles-gold" />
          </div>
          <div>
            <p className="text-sm font-display text-foreground">Baebles Shop</p>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-baebles-teal animate-pulse" />
              New arrivals
            </p>
          </div>
        </div>
        <Link to="/shop">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 rounded-xl text-xs font-display flex items-center gap-2 shadow-lg"
            style={{ 
              background: 'linear-gradient(135deg, hsl(var(--baebles-gold)), hsl(var(--baebles-orange)))',
              color: 'white',
              boxShadow: '0 4px 15px hsl(var(--baebles-orange) / 0.4)'
            }}
          >
            Shop Now
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
