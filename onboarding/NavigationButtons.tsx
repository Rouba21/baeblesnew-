import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationButtonsProps {
  onBack?: () => void;
  onContinue: () => void;
  continueDisabled?: boolean;
  continueLabel?: string;
  showBack?: boolean;
}

export function NavigationButtons({
  onBack,
  onContinue,
  continueDisabled = false,
  continueLabel = 'Continue',
  showBack = true,
}: NavigationButtonsProps) {
  return (
    <div className="flex gap-3 mt-6">
      {showBack && onBack && (
        <motion.button 
          onClick={onBack} 
          className="baebles-btn-secondary flex-1 flex items-center justify-center gap-2"
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>
      )}
      <motion.button
        onClick={onContinue}
        disabled={continueDisabled}
        className="baebles-btn-primary flex-1 flex items-center justify-center gap-2"
        whileTap={{ scale: 0.98 }}
      >
        {continueLabel}
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
