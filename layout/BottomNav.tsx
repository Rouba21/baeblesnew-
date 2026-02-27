import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Feather, Sparkles, MessageSquare, Calendar, Activity } from 'lucide-react';

const navItems = [
  { icon: Feather, label: 'Feed', path: '/feed' },
  { icon: Sparkles, label: 'Rooms', path: '/rooms' },
  { icon: MessageSquare, label: 'Recs', path: '/recommendations' },
  { icon: Calendar, label: 'New', path: '/new-releases' },
  { icon: Activity, label: 'Activity', path: '/activity' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Glassmorphism background */}
      <div 
        className="absolute inset-0 backdrop-blur-xl"
        style={{ 
          background: 'linear-gradient(to top, hsl(var(--card)) 60%, hsl(var(--card) / 0.95) 80%, hsl(var(--card) / 0.9))',
        }}
      />
      
      {/* Top border glow */}
      <div 
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 10%, hsl(var(--baebles-gold) / 0.4) 30%, hsl(var(--primary) / 0.5) 50%, hsl(var(--baebles-gold) / 0.4) 70%, transparent 90%)' }}
      />
      
      {/* Navigation items */}
      <div className="relative flex items-stretch justify-around h-[68px] max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === '/feed' && location.pathname === '/');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex-1 flex items-center justify-center min-w-[64px]"
            >
              <motion.div
                whileTap={{ scale: 0.92 }}
                className="flex flex-col items-center justify-center w-full py-2"
              >
                {/* Active pill background */}
                {isActive && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-x-2 top-1.5 bottom-1.5 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--baebles-gold) / 0.1))',
                      boxShadow: '0 0 20px hsl(var(--primary) / 0.2), inset 0 0 0 1px hsl(var(--primary) / 0.2)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                
                {/* Icon */}
                <motion.div
                  className="relative z-10"
                  animate={isActive ? { y: -2 } : { y: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Icon 
                    className={`w-6 h-6 transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                  
                  {/* Active dot indicator */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-baebles-gold"
                      style={{ boxShadow: '0 0 6px hsl(var(--baebles-gold))' }}
                    />
                  )}
                </motion.div>
                
                {/* Label */}
                <motion.span 
                  className={`relative z-10 text-[11px] mt-1 font-body transition-colors duration-200 ${
                    isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}
                  animate={isActive ? { y: -1 } : { y: 0 }}
                >
                  {item.label}
                </motion.span>
              </motion.div>
            </Link>
          );
        })}
      </div>
      
      {/* Safe area padding at bottom */}
      <div className="h-[env(safe-area-inset-bottom)]" style={{ background: 'hsl(var(--card))' }} />
    </nav>
  );
}
