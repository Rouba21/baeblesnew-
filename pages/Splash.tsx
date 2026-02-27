import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/onboarding/ThemeToggle';
import { StarBackground } from '@/components/onboarding/StarBackground';
import baeblesLogo from '@/assets/baebles-logo.png';

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col bg-background overflow-hidden">
      <StarBackground />
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Decorative sparkles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.5 }}
        className="absolute top-20 right-16 text-primary/40"
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-1/3 left-4 text-primary/40"
      >
        <Sparkles className="w-5 h-5" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <img 
            src={baeblesLogo} 
            alt="Baebles" 
            className="w-48 md:w-64 h-auto"
          />
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-12 max-w-sm"
        >
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
            Welcome to Your Realm
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            Connect with fellow fantasy book lovers, discover enchanted worlds, and share your favorite tropes
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col gap-4 w-full max-w-xs"
        >
          <button
            onClick={() => navigate('/signup')}
            className="baebles-btn-primary w-full"
          >
            Create Account
          </button>
          <button
            onClick={() => navigate('/login')}
            className="baebles-btn-secondary w-full"
          >
            Log In
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Splash;
