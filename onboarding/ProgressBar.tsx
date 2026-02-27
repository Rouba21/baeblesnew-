import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export function ProgressBar({ currentStep, totalSteps = 7 }: ProgressBarProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex gap-2 mb-2">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          
          return (
            <motion.div 
              key={i} 
              className="h-1.5 flex-1 rounded-full overflow-hidden"
              style={{ background: 'hsl(var(--muted))' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ 
                  background: isCompleted || isCurrent 
                    ? 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--baebles-gold)))' 
                    : 'transparent'
                }}
                initial={{ width: 0 }}
                animate={{ 
                  width: isCompleted ? '100%' : isCurrent ? '60%' : '0%'
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </motion.div>
          );
        })}
      </div>
      <p className="text-center font-display text-xs tracking-widest text-muted-foreground uppercase">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
