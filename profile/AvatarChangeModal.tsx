import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Gem, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

// Available avatars - in real app would come from backend
const AVAILABLE_AVATARS = [
  { id: 'fae-female-1', src: '/src/assets/avatars/fae-female-1.png', name: 'Fae Guardian' },
];

// Placeholder avatars using emojis for demo
const RACE_AVATARS = [
  { id: 'fae-1', emoji: '🧚', name: 'Fae' },
  { id: 'elf-1', emoji: '🧝', name: 'Elf' },
  { id: 'dragon-1', emoji: '🐉', name: 'Dragon' },
  { id: 'vampire-1', emoji: '🧛', name: 'Vampire' },
  { id: 'mermaid-1', emoji: '🧜', name: 'Mermaid' },
  { id: 'witch-1', emoji: '🧙', name: 'Witch' },
  { id: 'angel-1', emoji: '👼', name: 'Angel' },
  { id: 'demon-1', emoji: '😈', name: 'Demon' },
];

interface AvatarChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar?: string;
  onAvatarChange: (avatarId: string) => void;
}

export function AvatarChangeModal({ 
  isOpen, 
  onClose, 
  currentAvatar,
  onAvatarChange 
}: AvatarChangeModalProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar || 'fae-female-1');

  const handleSave = () => {
    onAvatarChange(selectedAvatar);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[10%] max-h-[80vh] overflow-y-auto z-50 mx-auto max-w-md"
          >
            <div className="baebles-card-ornate p-5">
              <div className="corner-br" />

              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--baebles-gold) / 0.1))' }}
                  >
                    <Camera className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg text-foreground">Change Avatar</h2>
                    <p className="text-xs text-muted-foreground">Select your new look</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-muted/50 active:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Current Avatar Preview */}
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div 
                    className="w-24 h-24 rounded-2xl p-0.5"
                    style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-gold)), hsl(var(--baebles-orange)))' }}
                  >
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center overflow-hidden">
                      {selectedAvatar === 'fae-female-1' ? (
                        <img 
                          src="/src/assets/avatars/fae-female-1.png"
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl">
                          {RACE_AVATARS.find(a => a.id === selectedAvatar)?.emoji || '🧚'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div 
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-display uppercase tracking-wider"
                    style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--baebles-purple)))', color: 'white' }}
                  >
                    Preview
                  </div>
                </div>
              </div>

              {/* Avatar Grid */}
              <div className="mb-4">
                <h3 className="font-display text-sm text-primary mb-3">Your Avatars</h3>
                <div className="grid grid-cols-4 gap-2">
                  {/* Real avatar */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAvatar('fae-female-1')}
                    className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                      selectedAvatar === 'fae-female-1'
                        ? 'ring-2 ring-baebles-gold ring-offset-2 ring-offset-background'
                        : 'active:opacity-80'
                    }`}
                  >
                    <img 
                      src="/src/assets/avatars/fae-female-1.png"
                      alt="Fae Guardian"
                      className="w-full h-full object-cover"
                    />
                    {selectedAvatar === 'fae-female-1' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1 right-1 w-5 h-5 bg-baebles-gold rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-background" />
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Emoji avatars */}
                  {RACE_AVATARS.map((avatar) => {
                    const isSelected = selectedAvatar === avatar.id;
                    return (
                      <motion.button
                        key={avatar.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedAvatar(avatar.id)}
                        className={`relative aspect-square rounded-xl bg-muted/50 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'ring-2 ring-baebles-gold ring-offset-2 ring-offset-background bg-baebles-gold/10'
                            : 'active:bg-muted'
                        }`}
                      >
                        <span className="text-2xl">{avatar.emoji}</span>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-1 right-1 w-5 h-5 bg-baebles-gold rounded-full flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-background" />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Shop CTA */}
              <Link
                to="/shop"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border-2 border-dashed border-primary/30 text-center mb-5 active:bg-primary/5 transition-colors"
              >
                <Gem className="w-4 h-4 text-primary" />
                <span className="font-body text-sm text-muted-foreground">
                  Discover more avatars in the shop! →
                </span>
              </Link>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="baebles-btn-secondary flex-1"
                >
                  Cancel
                </button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="baebles-btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Save
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}