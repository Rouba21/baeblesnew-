import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface FilterTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'badge';
}

export function FilterTabs({ tabs, activeTab, onTabChange, variant = 'default' }: FilterTabsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="flex gap-1.5 sm:gap-2 mb-5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        const isBadge = variant === 'badge';
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 active:scale-95 whitespace-nowrap shrink-0 ${
              isBadge ? 'font-display' : 'font-body'
            } ${
              isActive
                ? isBadge
                  ? 'text-primary-foreground shadow-lg'
                  : 'text-primary font-medium shadow-sm'
                : 'text-foreground/70 active:bg-muted/80'
            }`}
            style={isActive ? (
              isBadge
                ? { background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--baebles-gold)))' }
                : { 
                    background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--baebles-gold) / 0.12))',
                    border: '1px solid hsl(var(--primary) / 0.3)'
                  }
            ) : {
              background: 'hsl(var(--muted) / 0.6)',
              border: '1px solid hsl(var(--border) / 0.5)'
            }}
          >
            {Icon && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            {tab.label}
          </button>
        );
      })}
    </motion.div>
  );
}
