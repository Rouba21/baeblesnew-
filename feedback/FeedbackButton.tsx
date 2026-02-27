import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Lightbulb, Bug, Heart, HelpCircle } from 'lucide-react';

const categories = [
  { id: 'idea', icon: Lightbulb, label: 'Idea' },
  { id: 'bug', icon: Bug, label: 'Bug' },
  { id: 'love', icon: Heart, label: 'Love' },
  { id: 'confused', icon: HelpCircle, label: 'Confused' },
];

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [allowContact, setAllowContact] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!category || !message) return;
    // In a real app, this would send to backend
    console.log('Feedback:', { category, message, allowContact });
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setCategory('');
      setMessage('');
      setAllowContact(false);
    }, 2000);
  };

  return (
    <>
      {/* Floating button - more appealing with gradient and glow */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-3 sm:right-4 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-xl"
        style={{ 
          background: 'linear-gradient(135deg, hsl(var(--baebles-gold)), hsl(38 46% 40%))',
          boxShadow: '0 4px 20px hsl(var(--baebles-gold) / 0.4), 0 0 40px hsl(var(--baebles-gold) / 0.2), inset 0 1px 0 rgba(255,255,255,0.2)' 
        }}
      >
        <MessageSquare className="w-5 h-5 text-white" />
        
        {/* Animated ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-baebles-gold/50"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal - positioned higher on screen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed z-50 bg-card overflow-hidden rounded-2xl inset-x-4 mx-auto max-w-md max-h-[80vh]"
              style={{ 
                top: '10%',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)' 
              }}
            >
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[85vh]">
                {/* Header */}
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-gold) / 0.3), hsl(var(--primary) / 0.2))' }}>
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-baebles-gold" />
                    </div>
                    <h2 className="font-display text-lg sm:text-xl bg-gradient-to-r from-baebles-gold to-primary bg-clip-text text-transparent">Send Feedback</h2>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full active:bg-muted/80 transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </motion.button>
                </div>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 sm:py-12"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.1 }}
                      className="mb-4"
                    >
                      <Sparkles className="w-12 h-12 text-primary mx-auto" />
                    </motion.div>
                    <h3 className="font-display text-lg sm:text-xl text-primary mb-2">Thank you!</h3>
                    <p className="text-sm sm:text-base text-muted-foreground font-body">Your feedback helps us improve Baebles.</p>
                  </motion.div>
                ) : (
                  <>
                    {/* Category selection - responsive grid */}
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                      {categories.map((cat) => (
                        <motion.button
                          key={cat.id}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCategory(cat.id)}
                          className={`flex flex-col items-center gap-0.5 sm:gap-1 p-2.5 sm:p-3 rounded-xl transition-all ${
                            category === cat.id
                              ? 'bg-primary/20 border-2 border-primary shadow-lg'
                              : 'bg-muted/50 border-2 border-transparent active:border-primary/30'
                          }`}
                          style={category === cat.id ? { boxShadow: '0 0 15px hsl(var(--primary) / 0.3)' } : {}}
                        >
                          <cat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${category === cat.id ? 'text-primary' : 'text-muted-foreground'}`} />
                          <span className="text-[10px] sm:text-xs font-body text-foreground/80">{cat.label}</span>
                        </motion.button>
                      ))}
                    </div>

                    {/* Message - responsive sizing */}
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what's on your mind..."
                      className="w-full h-24 sm:h-32 p-3 sm:p-4 bg-muted/50 rounded-xl font-body text-sm sm:text-base text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 mb-3 sm:mb-4 border border-border/50"
                    />

                    {/* Contact checkbox - responsive */}
                    <label className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6 cursor-pointer py-1">
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setAllowContact(!allowContact)}
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${
                          allowContact
                            ? 'bg-primary border-primary'
                            : 'border-muted-foreground/50 bg-muted/30'
                        }`}
                      >
                        {allowContact && <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </motion.div>
                      <span className="text-xs sm:text-sm text-muted-foreground font-body">
                        You can contact me about this
                      </span>
                    </label>

                    {/* Submit button - responsive */}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={!category || !message}
                      className="baebles-btn-primary w-full py-3 sm:py-3.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      Submit Feedback
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
