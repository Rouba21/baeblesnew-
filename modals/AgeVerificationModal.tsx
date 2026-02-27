import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X, ArrowLeft } from 'lucide-react';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onDecline: () => void;
}

export function AgeVerificationModal({ isOpen, onConfirm, onDecline }: AgeVerificationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - no close on click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-[20%] z-50 mx-auto max-w-sm"
          >
            <div className="baebles-card-ornate p-6 text-center">
              <div className="corner-br" />

              {/* Icon */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(135deg, hsl(var(--baebles-orange) / 0.2), hsl(var(--destructive) / 0.1))',
                  boxShadow: '0 0 40px hsl(var(--baebles-orange) / 0.3)'
                }}
              >
                <ShieldAlert className="w-10 h-10 text-baebles-orange" />
              </motion.div>

              {/* Title */}
              <h2 className="font-display text-2xl bg-gradient-to-r from-baebles-orange via-baebles-gold to-baebles-orange bg-clip-text text-transparent mb-2">
                18+ Content
              </h2>

              {/* Description */}
              <p className="text-muted-foreground font-body text-sm mb-6 leading-relaxed">
                This section contains mature content intended for adults only. 
                By continuing, you confirm that you are <span className="text-foreground font-semibold">18 years of age or older</span>.
              </p>

              {/* Warning Box */}
              <div 
                className="p-3 rounded-xl mb-6 text-sm font-body"
                style={{ 
                  background: 'hsl(var(--baebles-orange) / 0.1)',
                  border: '1px solid hsl(var(--baebles-orange) / 0.3)'
                }}
              >
                <p className="text-baebles-orange">
                  You must be of legal age in your country to access this content.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  className="w-full py-3 rounded-xl font-display text-sm text-white transition-all"
                  style={{ 
                    background: 'linear-gradient(135deg, hsl(var(--baebles-orange)), hsl(var(--destructive)))',
                    boxShadow: '0 4px 20px hsl(var(--baebles-orange) / 0.4)'
                  }}
                >
                  I am 18 or older — Enter
                </motion.button>

                <button
                  onClick={onDecline}
                  className="w-full py-3 rounded-xl font-display text-sm bg-muted/50 text-muted-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </button>
              </div>

              {/* Footer note */}
              <p className="text-[10px] text-muted-foreground/70 mt-4 font-body">
                Your choice will be remembered for this session.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}