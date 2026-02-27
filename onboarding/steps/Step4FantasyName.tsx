import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Sparkles, Wand2, ArrowLeft, ArrowRight } from 'lucide-react';

interface Step4Props {
  name: string;
  onGenerate: () => string;
  onAccept: (name: string) => void;
  onBack: () => void;
}

export function Step4FantasyName({ name, onGenerate, onAccept, onBack }: Step4Props) {
  const [currentName, setCurrentName] = useState(name || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    if (!currentName) {
      handleGenerate();
    }
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowSparkles(false);
    
    setTimeout(() => {
      const newName = onGenerate();
      setCurrentName(newName);
      setIsGenerating(false);
      setShowSparkles(true);
      
      setTimeout(() => setShowSparkles(false), 1000);
    }, 1200);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-5">
        <motion.div 
          className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-baebles-gold/20 to-primary/20 flex items-center justify-center"
          animate={{ rotate: isGenerating ? 360 : 0 }}
          transition={{ duration: 1, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
        >
          <Wand2 className="w-7 h-7 text-baebles-gold" />
        </motion.div>
        <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent tracking-wide mb-1">
          Your Fantasy Name
        </h1>
        <p className="text-muted-foreground font-body text-xs sm:text-sm">
          The scrolls reveal your name...
        </p>
      </div>

      {/* Name Card */}
      <div className="baebles-card-simple p-6 mb-4">
        {/* Decorative line */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-baebles-gold to-transparent mx-auto mb-4" />
        
        {/* Name Display */}
        <div className="relative min-h-[48px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5 text-primary animate-spin" />
                <span className="font-display text-lg text-muted-foreground">Summoning...</span>
              </motion.div>
            ) : (
              <motion.h2 
                key={currentName}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="font-display text-2xl sm:text-3xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent"
              >
                {currentName}
              </motion.h2>
            )}
          </AnimatePresence>
          
          {/* Sparkles */}
          <AnimatePresence>
            {showSparkles && (
              <>
                <motion.span 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-2 -left-4 text-baebles-gold"
                >
                  <Sparkles className="w-4 h-4" />
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  className="absolute -top-4 right-0 text-baebles-gold"
                >
                  <Sparkles className="w-3 h-3" />
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -bottom-2 -right-4 text-baebles-gold"
                >
                  <Sparkles className="w-4 h-4" />
                </motion.span>
              </>
            )}
          </AnimatePresence>
        </div>
        
        {/* Decorative line */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-baebles-gold to-transparent mx-auto mt-4" />
      </div>

      {/* AI Badge */}
      <div 
        className="flex items-center gap-2 p-3 rounded-xl text-xs mb-4"
        style={{ 
          background: 'hsl(var(--baebles-purple) / 0.1)', 
          border: '1px solid hsl(var(--baebles-purple) / 0.3)' 
        }}
      >
        <Sparkles className="w-3.5 h-3.5 shrink-0 text-baebles-purple" />
        <span className="font-body text-baebles-purple">
          Generated by AI based on your race & preferences
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <motion.button
          onClick={onBack}
          className="flex-1 py-3 px-4 rounded-xl font-display text-sm bg-muted/50 border border-border/50 text-muted-foreground active:bg-muted transition-all flex items-center justify-center gap-2"
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>
        <motion.button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex-1 py-3 px-4 rounded-xl font-display text-sm bg-muted/50 border border-border/50 text-muted-foreground active:bg-muted transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          Regenerate
        </motion.button>
      </div>
      
      <motion.button
        onClick={() => onAccept(currentName)}
        disabled={isGenerating || !currentName}
        className="baebles-btn-primary w-full mt-3 flex items-center justify-center gap-2"
        whileTap={{ scale: 0.98 }}
      >
        Accept Name <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
