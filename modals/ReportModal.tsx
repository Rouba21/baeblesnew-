import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flag, AlertTriangle, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export type ReportType = 'post' | 'comment' | 'profile' | 'room';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ReportType;
  targetId: string;
  targetName?: string;
}

const reportReasons: Record<ReportType, string[]> = {
  post: [
    'Spam or misleading',
    'Harassment or bullying',
    'Hate speech',
    'Inappropriate content',
    'Spoilers without warning',
    'Off-topic for the room',
    'Other',
  ],
  comment: [
    'Spam or misleading',
    'Harassment or bullying',
    'Hate speech',
    'Inappropriate content',
    'Spoilers without warning',
    'Other',
  ],
  profile: [
    'Fake account or impersonation',
    'Harassment or bullying',
    'Inappropriate username or avatar',
    'Spam behavior',
    'Underage user',
    'Other',
  ],
  room: [
    'Inappropriate content',
    'Harassment or bullying',
    'Spam or misleading',
    'Violates community guidelines',
    'Other',
  ],
};

const typeLabels: Record<ReportType, string> = {
  post: 'Post',
  comment: 'Comment',
  profile: 'Profile',
  room: 'Room',
};

export function ReportModal({ isOpen, onClose, type, targetId, targetName }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedReason) {
      toast.error('Please select a reason for your report');
      return;
    }

    setIsSubmitting(true);

    // Mock API call - in production, this would send to backend
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Report submitted:', {
      type,
      targetId,
      reason: selectedReason,
      additionalInfo,
    });

    setIsSubmitting(false);
    toast.success('Report submitted successfully. Our team will review it shortly.');
    onClose();
    
    // Reset form
    setSelectedReason(null);
    setAdditionalInfo('');
  };

  const reasons = reportReasons[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card overflow-hidden rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
            >
              <div className="p-4 sm:p-6">
              {/* Header - harmonized style */}
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(var(--destructive) / 0.3), hsl(var(--baebles-rose) / 0.2))' }}>
                    <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg sm:text-xl bg-gradient-to-r from-destructive via-baebles-rose to-destructive bg-clip-text text-transparent">Report {typeLabels[type]}</h2>
                    {targetName && (
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {targetName}...
                      </p>
                    )}
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full active:bg-muted/80 transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-baebles-orange/10 border border-baebles-orange/20 mb-4">
                <AlertTriangle className="w-4 h-4 text-baebles-orange shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  False reports may result in action against your account. Please only report genuine violations.
                </p>
              </div>

              {/* Reason Selection */}
              <div className="space-y-2 mb-4">
                <label className="text-xs sm:text-sm font-body text-muted-foreground">
                  Reason for report *
                </label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {reasons.map((reason) => (
                    <motion.button
                      key={reason}
                      onClick={() => setSelectedReason(reason)}
                      className={`w-full text-left p-2.5 sm:p-3 rounded-xl border transition-all ${
                        selectedReason === reason
                          ? 'bg-primary/10 border-primary/50 text-foreground'
                          : 'bg-muted/30 border-border/50 text-muted-foreground active:border-border'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-body text-xs sm:text-sm">{reason}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-2 mb-5">
                <label className="text-xs sm:text-sm font-body text-muted-foreground">
                  Additional details (optional) - {additionalInfo.length}/500
                </label>
                <Textarea
                  placeholder="Provide any additional context..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="min-h-[70px] bg-muted/50 border-border/50 resize-none text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                  maxLength={500}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 sm:gap-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl font-display text-sm bg-muted/50 border border-border/50 text-muted-foreground active:bg-muted transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSubmit}
                  disabled={!selectedReason || isSubmitting}
                  className="baebles-btn-primary flex-1 py-2.5 sm:py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      ✨
                    </motion.span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
