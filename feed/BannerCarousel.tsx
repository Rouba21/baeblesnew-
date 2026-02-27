import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { banners } from '@/data/mockData';
import { Sparkles, ExternalLink, ChevronRight, Flame, BookOpen, type LucideIcon } from 'lucide-react';

export function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleClick = (link: string, isExternal: boolean) => {
    if (isExternal) {
      window.open(link, '_blank');
    } else {
      window.location.href = link;
    }
  };

  // Mock promotional content for banners
  const promoContent = [
    { title: 'New Release', subtitle: 'Onyx Storm is here!', icon: Flame },
    { title: 'Author Spotlight', subtitle: 'Sarah J. Maas Week', icon: Sparkles },
    { title: 'Community Event', subtitle: 'Book Club Starting', icon: BookOpen },
  ] satisfies { title: string; subtitle: string; icon: LucideIcon }[];

  return (
    <div className="relative w-full aspect-[2.5/1] rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 mb-6 shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onClick={() => handleClick(banners[currentIndex].link, banners[currentIndex].isExternal)}
          className="absolute inset-0 cursor-pointer group"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-baebles-purple via-primary/80 to-baebles-gold/40" />
          
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-4 right-8 text-white/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-16 h-16" />
            </motion.div>
            <motion.div 
              className="absolute bottom-4 left-12 text-white/10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="w-10 h-10" />
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              {(() => {
                const IconComp = promoContent[currentIndex % promoContent.length].icon;
                return (
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <IconComp className="w-7 h-7 text-white" />
                  </motion.div>
                );
              })()}
              <div>
                <p className="text-white/70 text-xs font-display uppercase tracking-wider">
                  {promoContent[currentIndex % promoContent.length].title}
                </p>
                <h3 className="text-white font-display text-lg drop-shadow-lg">
                  {promoContent[currentIndex % promoContent.length].subtitle}
                </h3>
              </div>
            </div>
            
            {/* CTA */}
            <motion.div 
              className="flex items-center gap-1 text-white/80 text-sm font-display group-hover:text-white transition-colors"
              whileHover={{ x: 4 }}
            >
              {banners[currentIndex].isExternal ? (
                <>
                  <span>Visit</span>
                  <ExternalLink className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>View</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <motion.button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-6'
                : 'bg-white/40 hover:bg-white/60 w-2'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}
