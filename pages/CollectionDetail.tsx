import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowLeft, Clock } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CollectionBackground } from '@/components/shop/CollectionBackground';
import { CollectionProgressBar } from '@/components/shop/CollectionProgressBar';
import { TarotAvatarCard } from '@/components/shop/TarotAvatarCard';
import { PriceButton } from '@/components/shop/PriceButton';
import { getCollectionById } from '@/components/shop/shopData';
import { usePurchasedAvatars, getPackRarity } from '@/hooks/usePurchasedAvatars';
import { toast } from '@/hooks/use-toast';

export default function CollectionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { purchasedAvatars, addAvatarsFromPack, hasPack } = usePurchasedAvatars();

  const collection = id ? getCollectionById(id) : undefined;

  if (!collection) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-muted-foreground font-body">Collection not found</p>
          <button onClick={() => navigate('/shop')} className="mt-4 text-primary font-display text-sm">
            ← Back to shop
          </button>
        </div>
      </MainLayout>
    );
  }

  const Icon = collection.icon;
  const total = collection.avatars.length;
  const unlockedIds = new Set(
    purchasedAvatars.filter(a => a.packId === collection.id).map(a => a.id)
  );
  const unlocked = unlockedIds.size;
  const locked = total - unlocked;
  const isFullyOwned = unlocked >= total;
  const hasNone = unlocked === 0;

  const unlockedAvatars = collection.avatars.filter(a => unlockedIds.has(a.id));
  const lockedAvatars = collection.avatars.filter(a => !unlockedIds.has(a.id));

  const handleBuySmall = () => {
    const rarity = getPackRarity(collection.id, collection.isLimited);
    addAvatarsFromPack(collection.id, collection.name, 3, rarity);
    toast({ title: 'Purchase successful!', description: `3 avatars from ${collection.name} unlocked.` });
  };

  const handleBuyFull = () => {
    const rarity = getPackRarity(collection.id, collection.isLimited);
    addAvatarsFromPack(collection.id, collection.name, total, rarity);
    toast({ title: 'Purchase successful!', description: `Full ${collection.name} collection unlocked!` });
  };

  const handleBuyRemaining = () => {
    const rarity = getPackRarity(collection.id, collection.isLimited);
    addAvatarsFromPack(collection.id, collection.name, total, rarity);
    toast({ title: 'Purchase successful!', description: `${locked} remaining avatars unlocked!` });
  };

  return (
    <MainLayout>
      <CollectionBackground race={collection.race} collectionId={collection.id} />
      <div className="relative z-10 py-2 space-y-4">

        {/* ─── Hero Banner ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative -mx-4 -mt-2 overflow-hidden"
          style={{ minHeight: '200px' }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/shop')}
            className="absolute top-3 left-3 z-20 p-2 rounded-full bg-background/30 backdrop-blur-md border border-border/20 text-foreground/80 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>

          {/* Limited badge */}
          {collection.isLimited && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-3 right-3 z-20"
            >
              <span className="px-3 py-1.5 rounded-full text-[11px] font-display bg-primary text-primary-foreground flex items-center gap-1.5 shadow-lg">
                <Clock className="w-3 h-3" />
                {collection.limitedDays} days left
              </span>
            </motion.div>
          )}

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="flex justify-center mb-2"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center border border-border/30 bg-card/50 backdrop-blur-sm">
                <Icon className="w-5 h-5 text-muted-foreground" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-2xl sm:text-3xl text-center tracking-[0.15em] uppercase text-foreground"
            >
              {collection.name}
            </motion.h1>

            <SectionDivider className="mt-2" />
          </div>
        </motion.div>

        {/* ─── Description ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mx-2"
        >
          <div className="px-5 py-4 rounded-lg border border-border/40 bg-card/60 backdrop-blur-sm">
            <p className="text-center font-body text-sm text-muted-foreground leading-relaxed italic">
              "{collection.description}"
            </p>
            {collection.isLimited && (
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-[11px] font-display text-primary">Limited Edition Collection</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* ─── Progress Bar ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <CollectionProgressBar unlocked={unlocked} total={total} />
        </motion.div>

        {/* ═══════════ NOT STARTED ═══════════ */}
        {hasNone && (
          <>
            <SectionTitle label="Preview" delay={0.35} />

            {/* Top 3 preview avatars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <div className="grid grid-cols-3 gap-3">
                {collection.avatars.slice(0, 3).map((avatar, i) => (
                  <TarotAvatarCard
                    key={avatar.id}
                    avatar={avatar}
                    isUnlocked={false}
                    size="large"
                    showPreview
                    previewImage={collection.previewImage}
                    gradient={collection.gradient}
                    delay={0.4 + i * 0.05}
                  />
                ))}
              </div>
            </motion.div>

            {/* Small Pack CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <PriceButton
                label={`Small Pack (3 avatars)`}
                price={collection.prices.small}
                variant="secondary"
                onClick={handleBuySmall}
              />
            </motion.div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-1">
              <div className="w-16 h-px bg-border/40" />
              <span className="text-muted-foreground/50 text-[10px] font-display tracking-widest uppercase">
                {total - 3} more
              </span>
              <div className="w-16 h-px bg-border/40" />
            </div>

            {/* Remaining avatars in fan layout */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex justify-center items-end py-2">
                {collection.avatars.slice(3).map((avatar, i) => {
                  const count = total - 3;
                  const mid = (count - 1) / 2;
                  const offset = i - mid;
                  const rotate = offset * 8;
                  const translateY = Math.abs(offset) * 6;
                  return (
                    <motion.div
                      key={avatar.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65 + i * 0.06 }}
                      className="w-20 -mx-2 flex-shrink-0"
                      style={{
                        transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
                        transformOrigin: 'bottom center',
                        zIndex: i,
                      }}
                    >
                      <TarotAvatarCard
                        avatar={avatar}
                        isUnlocked={false}
                        size="small"
                        previewImage={collection.previewImage}
                        gradient={collection.gradient}
                        showBlurred
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Full collection CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pb-4"
            >
              <PriceButton
                label={`Full Collection (${total} avatars)`}
                price={collection.prices.full}
                variant="primary"
                onClick={handleBuyFull}
              />
            </motion.div>
          </>
        )}

        {/* ═══════════ PARTIAL OWNERSHIP ═══════════ */}
        {!isFullyOwned && !hasNone && (
          <>
            {/* Unlocked section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <SectionTitle label="Unlocked" delay={0.2} />
              <div className="grid grid-cols-3 gap-3">
                {unlockedAvatars.map((avatar, i) => (
                  <TarotAvatarCard
                    key={avatar.id}
                    avatar={avatar}
                    isUnlocked
                    size="large"
                    previewImage={collection.previewImage}
                    gradient={collection.gradient}
                    delay={0.25 + i * 0.06}
                  />
                ))}
              </div>
            </motion.div>

            {/* Locked section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="space-y-3"
            >
              <SectionTitle label={`${locked} still sealed`} delay={0.35} muted />
              <div className="grid grid-cols-5 gap-2">
                {lockedAvatars.map((avatar, i) => (
                  <TarotAvatarCard
                    key={avatar.id}
                    avatar={avatar}
                    isUnlocked={false}
                    size="small"
                    previewImage={collection.previewImage}
                    gradient={collection.gradient}
                    showBlurred
                    delay={0.4 + i * 0.04}
                  />
                ))}
              </div>
            </motion.div>

            {/* Unlock remaining CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pb-4"
            >
              <PriceButton
                label={`Unlock ${locked} remaining avatars`}
                price={Math.round(collection.prices.full * 0.6 * 100) / 100}
                originalPrice={collection.prices.full}
                variant="primary"
                onClick={handleBuyRemaining}
              />
            </motion.div>
          </>
        )}

        {/* ═══════════ FULLY OWNED ═══════════ */}
        {isFullyOwned && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <div className="grid grid-cols-4 gap-2">
                {collection.avatars.map((avatar, i) => (
                  <TarotAvatarCard
                    key={avatar.id}
                    avatar={avatar}
                    isUnlocked
                    size="large"
                    previewImage={collection.previewImage}
                    gradient={collection.gradient}
                    delay={0.25 + i * 0.04}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-4"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/40 bg-card/60">
                <Check className="w-4 h-4 text-primary" />
                <span className="font-display text-sm text-foreground tracking-wide">Collection Complete</span>
                <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </motion.div>
          </>
        )}
      </div>
    </MainLayout>
  );
}

/* ─── Reusable section helpers ─── */

function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="w-12 h-px bg-border/40" />
      <span className="text-muted-foreground/40 text-[10px]">✦</span>
      <div className="w-12 h-px bg-border/40" />
    </div>
  );
}

function SectionTitle({ label, delay = 0, muted = false }: { label: string; delay?: number; muted?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="flex items-center justify-center gap-3"
    >
      <div className="w-10 h-px bg-border/40" />
      <span className={`font-display text-xs uppercase tracking-[0.2em] ${muted ? 'text-muted-foreground' : 'text-foreground/70'}`}>
        {label}
      </span>
      <div className="w-10 h-px bg-border/40" />
    </motion.div>
  );
}
