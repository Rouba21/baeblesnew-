import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X } from 'lucide-react';
import { Avatar as AvatarType } from './shopData';

interface TarotAvatarCardProps {
  avatar: AvatarType;
  isUnlocked: boolean;
  size: 'large' | 'small';
  delay?: number;
  showPreview?: boolean;
  showBlurred?: boolean;
  gradient?: string;
  previewImage?: string;
}

// Dark mode: rich dark brown/gold frame like the reference tarot card
// Light mode: warm parchment/cream frame
function useCardTheme() {
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  return {
    isDark,
    frame: isDark
      ? {
          background: 'linear-gradient(160deg, hsl(35 20% 20%), hsl(30 15% 16%), hsl(25 12% 12%))',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 hsl(38 30% 30% / 0.4)',
        }
      : {
          background: 'linear-gradient(160deg, hsl(40 30% 92%), hsl(35 25% 85%), hsl(40 20% 80%))',
          boxShadow: '0 4px 20px hsl(var(--primary) / 0.12), inset 0 1px 0 hsl(40 40% 95% / 0.6)',
        },
    modalFrame: isDark
      ? {
          background: 'linear-gradient(160deg, hsl(35 20% 20%), hsl(30 15% 16%), hsl(25 12% 12%))',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 hsl(38 30% 30% / 0.4)',
        }
      : {
          background: 'linear-gradient(160deg, hsl(40 30% 92%), hsl(35 25% 85%), hsl(40 20% 80%))',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 hsl(40 40% 95% / 0.6)',
        },
    border: isDark ? 'hsl(38 35% 35% / 0.5)' : 'hsl(35 30% 65% / 0.4)',
    borderSmall: isDark ? 'hsl(38 30% 30% / 0.4)' : 'hsl(35 30% 65% / 0.25)',
    filigree: isDark ? 'hsl(38 40% 50% / 0.5)' : 'hsl(35 30% 60% / 0.5)',
    symbol: isDark ? 'hsl(38 45% 55% / 0.7)' : 'hsl(35 30% 50% / 0.7)',
    cartoucheBg: isDark
      ? 'linear-gradient(180deg, hsl(35 18% 18%), hsl(30 14% 14%))'
      : 'linear-gradient(180deg, hsl(40 35% 88%), hsl(35 30% 82%))',
    cartoucheBorder: isDark ? 'hsl(38 30% 32% / 0.6)' : 'hsl(35 25% 70% / 0.6)',
    cartoucheBorderSmall: isDark ? 'hsl(38 25% 28% / 0.4)' : 'hsl(35 25% 70% / 0.4)',
    cartoucheShadow: isDark
      ? 'inset 0 1px 0 hsl(38 25% 28% / 0.4), 0 1px 3px rgba(0,0,0,0.3)'
      : 'inset 0 1px 0 hsl(40 40% 95% / 0.5), 0 1px 3px hsl(35 20% 40% / 0.15)',
    nameColor: isDark ? 'hsl(38 30% 72%)' : 'hsl(35 25% 35%)',
    dotColor: isDark ? 'hsl(38 40% 50% / 0.5)' : 'hsl(35 30% 60% / 0.5)',
  };
}

export function TarotAvatarCard({ avatar, isUnlocked, size, delay = 0, showPreview, showBlurred, gradient, previewImage }: TarotAvatarCardProps) {
  const [showFullPreview, setShowFullPreview] = useState(false);
  const isLarge = size === 'large';
  const imgSrc = avatar.imageUrl || previewImage;
  const canPreview = !!imgSrc;
  const theme = useCardTheme();

  const cardFrameStyle: React.CSSProperties = theme.frame;
  const cardFrameClass = `relative w-full aspect-[2/3] rounded-md overflow-hidden`;

  // === LOCKED PREVIEW ===
  if (!isUnlocked && showPreview) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="flex flex-col items-center"
      >
        <div className={cardFrameClass} style={cardFrameStyle}>
          <CardInner imgSrc={imgSrc} gradient={gradient} symbol={avatar.symbol} name={avatar.name} isLarge={isLarge} theme={theme} />
        </div>
      </motion.div>
    );
  }

  // === LOCKED BLURRED ===
  if (!isUnlocked && showBlurred) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="flex flex-col items-center"
      >
        <div className={cardFrameClass} style={cardFrameStyle}>
          <CardInner imgSrc={imgSrc} gradient={gradient} symbol={avatar.symbol} name={avatar.name} isLarge={isLarge} locked blurred theme={theme} />
        </div>
      </motion.div>
    );
  }

  // === LOCKED (no image) ===
  if (!isUnlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="flex flex-col items-center"
      >
        <div className={cardFrameClass} style={{ ...cardFrameStyle, opacity: 0.6 }}>
          <CardInner gradient={gradient} symbol={avatar.symbol} name={avatar.name} isLarge={isLarge} locked theme={theme} />
        </div>
      </motion.div>
    );
  }

  // === UNLOCKED ===
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', damping: 20 }}
      className="flex flex-col items-center"
    >
      <div className={`${cardFrameClass} cursor-pointer`} style={cardFrameStyle} onClick={() => setShowFullPreview(true)}>
        <CardInner imgSrc={imgSrc} gradient={gradient} symbol={avatar.symbol} name={avatar.name} isLarge={isLarge} theme={theme} />
      </div>
      <FullPreviewModal open={showFullPreview} onClose={() => setShowFullPreview(false)} imgSrc={imgSrc} name={avatar.name} symbol={avatar.symbol} gradient={gradient} theme={theme} />
    </motion.div>
  );
}

type CardTheme = ReturnType<typeof useCardTheme>;

interface CardInnerProps {
  imgSrc?: string;
  gradient?: string;
  symbol: string;
  name: string;
  isLarge: boolean;
  isModal?: boolean;
  locked?: boolean;
  blurred?: boolean;
  theme: CardTheme;
}

function CardInner({ imgSrc, gradient, symbol, name, isLarge, isModal, locked, blurred, theme }: CardInnerProps) {
  const nameSize = isModal ? 'text-sm' : isLarge ? 'text-[10px]' : 'text-[6px]';
  const cartouchePy = isModal ? 'py-1.5 px-3' : isLarge ? 'py-1 px-2' : 'py-[2px] px-[3px]';
  return (
    <>
      {/* Inner image area with arch top */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: isLarge ? '8%' : '4%',
          left: isLarge ? '8%' : '4%',
          right: isLarge ? '8%' : '4%',
          bottom: isLarge ? '20%' : '22%',
          borderRadius: isLarge ? '8px 8px 4px 4px' : '4px 4px 2px 2px',
          clipPath: isLarge
            ? 'polygon(0% 12%, 2% 6%, 6% 2%, 12% 0%, 88% 0%, 94% 2%, 98% 6%, 100% 12%, 100% 100%, 0% 100%)'
            : 'polygon(0% 8%, 2% 4%, 5% 1%, 10% 0%, 90% 0%, 95% 1%, 98% 4%, 100% 8%, 100% 100%, 0% 100%)',
        }}
      >
        {imgSrc && !blurred ? (
          <img src={imgSrc} alt={name} className="absolute inset-0 w-full h-full object-cover" />
        ) : imgSrc && blurred ? (
          <img src={imgSrc} alt={name} className="absolute inset-0 w-full h-full object-cover blur-[3px] brightness-[0.4]" />
        ) : gradient ? (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60`} />
        ) : (
          <div className="absolute inset-0 bg-muted/40" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

        {locked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Lock className={`${isLarge ? 'w-6 h-6' : 'w-4 h-4'} text-white/50`} />
          </div>
        )}
      </div>

      {/* Top symbol */}
      {isLarge && (
        <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: '1%' }}>
          <span className="text-base drop-shadow-sm" style={{ color: theme.symbol }}>
            {symbol}
          </span>
        </div>
      )}

      <Filigree isLarge={isLarge} color={theme.filigree} />

      {/* Ornamental border */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: isLarge ? '4%' : '2%',
          left: isLarge ? '4%' : '2%',
          right: isLarge ? '4%' : '2%',
          bottom: isLarge ? '4%' : '2%',
          border: `1px solid ${isLarge ? theme.border : theme.borderSmall}`,
          borderRadius: isLarge ? '6px' : '3px',
        }}
      />

      {/* Name cartouche */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-10"
        style={{
          bottom: isModal ? '4%' : isLarge ? '3%' : '3%',
          width: isModal ? '75%' : isLarge ? '85%' : '94%',
        }}
      >
        <div
          className={`text-center relative ${cartouchePy}`}
          style={{
            background: theme.cartoucheBg,
            borderRadius: isLarge ? '6px' : '3px',
            border: `1px solid ${isLarge ? theme.cartoucheBorder : theme.cartoucheBorderSmall}`,
            boxShadow: isLarge ? theme.cartoucheShadow : 'none',
          }}
        >
          {isLarge && (
            <>
              <span className="absolute left-1.5 top-1/2 -translate-y-1/2" style={{ color: theme.dotColor, fontSize: '7px' }}>✦</span>
              <span className="absolute right-1.5 top-1/2 -translate-y-1/2" style={{ color: theme.dotColor, fontSize: '7px' }}>✦</span>
            </>
          )}

          <span
            className={`block ${isModal ? 'font-display truncate leading-tight tracking-wide text-sm' : isLarge ? 'font-display leading-[1.2] line-clamp-2 text-center tracking-wide text-[10px]' : 'font-body leading-[1.2] line-clamp-2 text-center tracking-normal text-[6px]'}`}
            style={{ color: theme.nameColor, wordBreak: isModal ? undefined : 'break-word' }}
          >
            {name}
          </span>
        </div>
      </div>
    </>
  );
}

/* ─── Full-screen preview modal ─── */
interface FullPreviewModalProps {
  open: boolean;
  onClose: () => void;
  imgSrc?: string;
  name: string;
  symbol: string;
  gradient?: string;
  blurred?: boolean;
  theme: CardTheme;
}

function FullPreviewModal({ open, onClose, imgSrc, name, symbol, gradient, blurred, theme }: FullPreviewModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed z-50 inset-0 flex items-center justify-center p-8"
            onClick={onClose}
          >
            <div
              className="relative w-full max-w-[280px] aspect-[2/3] rounded-lg overflow-hidden"
              style={theme.modalFrame}
              onClick={(e) => e.stopPropagation()}
            >
              <CardInner imgSrc={imgSrc} gradient={gradient} symbol={symbol} name={name} isLarge isModal blurred={blurred} theme={theme} />
              <button
                onClick={onClose}
                className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Filigree({ isLarge, color }: { isLarge: boolean; color: string }) {
  const s = isLarge ? 'text-[11px]' : 'text-[8px]';

  return (
    <>
      <div className={`absolute top-[2px] left-[4px] ${s}`} style={{ color }}>❧</div>
      <div className={`absolute top-[2px] right-[4px] ${s}`} style={{ color, transform: 'scaleX(-1)' }}>❧</div>
      <div className={`absolute bottom-[2px] left-[4px] ${s}`} style={{ color, transform: 'scaleY(-1)' }}>❧</div>
      <div className={`absolute bottom-[2px] right-[4px] ${s}`} style={{ color, transform: 'scale(-1)' }}>❧</div>

      <div
        className="absolute left-1/4 right-1/4 h-px"
        style={{ top: isLarge ? '3%' : '2.5%', background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
      <div
        className="absolute left-1/4 right-1/4 h-px"
        style={{ bottom: isLarge ? '3%' : '2.5%', background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </>
  );
}
