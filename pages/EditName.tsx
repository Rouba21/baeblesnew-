import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Sparkles, ChevronLeft, Check } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { FANTASY_NAME_PARTS } from '@/types/onboarding';
import { toast } from '@/hooks/use-toast';

export default function EditName() {
  const navigate = useNavigate();
  const [currentName, setCurrentName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    // Load current name from localStorage
    const saved = localStorage.getItem('baebles_onboarding');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCurrentName(parsed.fantasyName || '');
      } catch {
        // Generate if no saved name
        handleGenerate();
      }
    } else {
      handleGenerate();
    }
  }, []);

  const generateFantasyName = () => {
    const { prefixes, middles, surnames } = FANTASY_NAME_PARTS;
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const middle = middles[Math.floor(Math.random() * middles.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    return `${prefix}${middle} ${surname}`;
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowSparkles(false);
    
    setTimeout(() => {
      const newName = generateFantasyName();
      setCurrentName(newName);
      setIsGenerating(false);
      setShowSparkles(true);
      
      setTimeout(() => setShowSparkles(false), 1000);
    }, 1200);
  };

  const handleSave = () => {
    // Save to localStorage
    const saved = localStorage.getItem('baebles_onboarding');
    const data = saved ? JSON.parse(saved) : {};
    localStorage.setItem('baebles_onboarding', JSON.stringify({
      ...data,
      fantasyName: currentName
    }));

    toast({
      title: "Name Updated",
      description: `Your new name is ${currentName}`,
    });
    navigate('/settings');
  };

  return (
    <MainLayout>
      <div className="py-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 sm:gap-3 mb-6"
        >
          <motion.div 
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary/20 to-baebles-gold/15 flex items-center justify-center shadow-lg shrink-0"
            animate={{ rotate: isGenerating ? 360 : 0 }}
            transition={{ duration: 1, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-baebles-gold" />
          </motion.div>
          <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent">
            Change Name
          </h1>
        </motion.div>

        {/* Name Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="baebles-card-simple p-6 mb-4"
        >
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
                  className="font-display text-2xl sm:text-3xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent text-center"
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
        </motion.div>

        {/* AI Badge */}
        <div 
          className="flex items-center gap-2 p-3 rounded-xl text-xs mb-4"
          style={{ 
            background: 'hsl(var(--baebles-gold) / 0.1)', 
            border: '1px solid hsl(var(--baebles-gold) / 0.3)' 
          }}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-baebles-gold" />
          <span className="font-body text-baebles-gold">
            Generated by AI based on your race & preferences
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-3">
          <motion.button
            onClick={() => navigate('/settings')}
            className="flex-1 py-3 px-4 rounded-xl font-display text-sm bg-muted/50 border border-border/50 text-muted-foreground active:bg-muted transition-all flex items-center justify-center gap-2"
            whileTap={{ scale: 0.98 }}
          >
            Cancel
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
          onClick={handleSave}
          disabled={isGenerating || !currentName}
          className="baebles-btn-primary w-full flex items-center justify-center gap-2"
          whileTap={{ scale: 0.98 }}
        >
          <Check className="w-4 h-4" />
          Save Name
        </motion.button>
      </div>
    </MainLayout>
  );
}
