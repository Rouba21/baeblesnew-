import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { CreateThreadModal } from './CreateThreadModal';

interface CreateThreadFABProps {
  preselectedRoomId?: string;
}

export function CreateThreadFAB({ preselectedRoomId }: CreateThreadFABProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-primary active:opacity-90"
        style={{
          boxShadow: '0 4px 20px hsl(var(--primary) / 0.4)',
          bottom: 'calc(5.5rem + env(safe-area-inset-bottom))',
          right: '1rem',
        }}
        aria-label="Create new thread"
      >
        <Plus className="w-6 h-6 text-primary-foreground" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <CreateThreadModal
            onClose={() => setIsOpen(false)}
            preselectedRoomId={preselectedRoomId}
          />
        )}
      </AnimatePresence>
    </>
  );
}
