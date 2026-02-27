import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, Gem, Check, Sparkles } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { usePurchasedAvatars } from '@/hooks/usePurchasedAvatars';
import { collections } from '@/components/shop/shopData';
import { CollectionProgressBar } from '@/components/shop/CollectionProgressBar';
import { toast } from '@/hooks/use-toast';

export default function MyAvatars() {
  const { purchasedAvatars } = usePurchasedAvatars();

  const [selectedId, setSelectedId] = useState(() => {
    const saved = localStorage.getItem('baebles_onboarding');
    if (saved) {
      try { return JSON.parse(saved).avatarId || ''; } catch { return ''; }
    }
    return '';
  });

  const handleSelect = (avatarId: string, avatarName?: string) => {
    setSelectedId(avatarId);
    const saved = localStorage.getItem('baebles_onboarding');
    const data = saved ? JSON.parse(saved) : {};
    localStorage.setItem('baebles_onboarding', JSON.stringify({ ...data, avatarId }));
    toast({ title: "Avatar selected! ✨", description: avatarName ? `${avatarName} is now your avatar.` : "Avatar updated." });
  };

  // Group purchased avatars by collection
  const ownedByCollection = useMemo(() => {
    const map = new Map<string, Set<string>>();
    purchasedAvatars.forEach(a => {
      if (a.packId) {
        if (!map.has(a.packId)) map.set(a.packId, new Set());
        map.get(a.packId)!.add(a.id);
      }
    });
    return map;
  }, [purchasedAvatars]);

  // Collections that the user owns at least 1 avatar from
  const ownedCollections = useMemo(() => {
    return collections.filter(c => ownedByCollection.has(c.id));
  }, [ownedByCollection]);

  // Standalone avatars (no packId, like default ones)
  const standalone = useMemo(() => {
    return purchasedAvatars.filter(a => !a.packId);
  }, [purchasedAvatars]);

  const totalOwned = purchasedAvatars.length;

  return (
    <MainLayout>
      <div className="py-4 space-y-5">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 sm:gap-3"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary/20 to-baebles-gold/15 flex items-center justify-center shadow-lg shrink-0">
            <Crown className="w-5 h-5 text-baebles-gold" />
          </div>
          <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent">
            My Avatars
          </h1>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="baebles-card-simple p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-baebles-gold/20 to-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-baebles-gold" />
              </div>
              <div>
                <p className="font-display text-2xl text-foreground">{totalOwned}</p>
                <p className="text-xs text-muted-foreground">avatars collected</p>
              </div>
            </div>
            <Link
              to="/shop"
              className="px-4 py-2 rounded-xl font-display text-xs bg-gradient-to-r from-baebles-gold to-baebles-orange text-white flex items-center gap-1.5"
              style={{ boxShadow: '0 4px 15px hsl(var(--baebles-gold) / 0.3)' }}
            >
              <Gem className="w-3.5 h-3.5" />
              Shop
            </Link>
          </div>
        </motion.div>

        {/* Empty state */}
        {totalOwned === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="baebles-card-simple p-8 text-center"
          >
            <Crown className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-body mb-2">No avatars yet</p>
            <p className="text-xs text-muted-foreground/70 mb-4">Visit the shop to get your first avatars!</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-display text-sm bg-primary text-primary-foreground"
            >
              <Gem className="w-4 h-4" />
              Go to Shop
            </Link>
          </motion.div>
        )}

        {/* Standalone avatars (defaults, no collection) */}
        {standalone.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3 px-1">
              <Sparkles className="w-4 h-4 text-baebles-gold" />
              <h3 className="font-display text-sm uppercase tracking-wider text-foreground/70">
                Starter Avatars
              </h3>
            </div>
            <div className="baebles-card-simple p-3">
              <div className="grid grid-cols-4 gap-2">
                {standalone.map((avatar, i) => (
                  <AvatarTile
                    key={avatar.id}
                    avatar={avatar}
                    isSelected={selectedId === avatar.id}
                    onSelect={() => handleSelect(avatar.id, avatar.name)}
                    delay={i * 0.03}
                  />
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Collections */}
        {ownedCollections.map((collection, ci) => {
          const ownedIds = ownedByCollection.get(collection.id) ?? new Set();
          const unlocked = ownedIds.size;
          const total = collection.avatars.length;
          const Icon = collection.icon;

          return (
            <motion.section
              key={collection.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + ci * 0.08 }}
            >
              {/* Collection header */}
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.15))` }}
                  >
                    <Icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="font-display text-sm uppercase tracking-wider text-foreground/80">
                    {collection.name}
                  </h3>
                  {collection.isLimited && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-display bg-gradient-to-r from-primary to-accent text-primary-foreground">
                      Limited
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground font-body">
                  {unlocked}/{total}
                </span>
              </div>

              {/* Progress bar */}
              <CollectionProgressBar unlocked={unlocked} total={total} />

              {/* Avatar grid */}
              <div className="baebles-card-simple p-3 mt-2">
                <div className="grid grid-cols-4 gap-2">
                  {collection.avatars.map((avatar, i) => {
                    const isOwned = ownedIds.has(avatar.id);
                    const purchased = purchasedAvatars.find(a => a.id === avatar.id);

                    if (!isOwned) {
                      // Locked placeholder
                      return (
                        <div
                          key={avatar.id}
                          className="aspect-square rounded-xl bg-muted/50 border border-border/30 flex items-center justify-center"
                        >
                          <span className="text-lg opacity-30">🔒</span>
                        </div>
                      );
                    }

                    return (
                      <AvatarTile
                        key={avatar.id}
                        avatar={purchased ?? { id: avatar.id, name: avatar.name, emoji: avatar.symbol, rarity: 'Common' }}
                        isSelected={selectedId === avatar.id}
                        onSelect={() => handleSelect(avatar.id, avatar.name)}
                        delay={i * 0.02}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Complete CTA */}
              {unlocked < total && (
                <Link
                  to={`/shop/collection/${collection.id}`}
                  className="block mt-2 text-center py-2 rounded-xl text-xs font-display text-primary hover:bg-primary/5 transition-colors border border-border/30"
                >
                  Complete collection → {total - unlocked} remaining
                </Link>
              )}
            </motion.section>
          );
        })}

        {/* Shop CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/shop"
            className="block rounded-xl p-4 text-center transition-all"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--baebles-gold) / 0.1), hsl(var(--primary) / 0.1))',
              border: '1px dashed hsl(var(--baebles-gold) / 0.5)',
            }}
          >
            <Gem className="w-6 h-6 text-baebles-gold mx-auto mb-2" />
            <p className="font-display text-sm text-foreground mb-1">Expand your collection!</p>
            <p className="text-xs text-muted-foreground">Discover new avatars in the shop →</p>
          </Link>
        </motion.div>
      </div>
    </MainLayout>
  );
}

/* ── tiny reusable tile ── */
function AvatarTile({
  avatar,
  isSelected,
  onSelect,
  delay = 0,
}: {
  avatar: { id: string; name: string; emoji?: string; src?: string; rarity?: string };
  isSelected: boolean;
  onSelect: () => void;
  delay?: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileTap={{ scale: 0.9 }}
      onClick={onSelect}
      className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
        isSelected ? 'ring-2 ring-baebles-gold shadow-lg' : 'hover:bg-muted/80'
      }`}
      style={isSelected ? { boxShadow: '0 0 15px hsl(var(--baebles-gold) / 0.3)' } : {}}
    >
      {avatar.src ? (
        <img src={avatar.src} alt={avatar.name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-baebles-gold/20 to-primary/10 flex items-center justify-center">
          <span className="text-2xl">{avatar.emoji}</span>
        </div>
      )}

      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-baebles-gold rounded-full flex items-center justify-center shadow-md"
        >
          <Check className="w-3 h-3 text-background" />
        </motion.div>
      )}

      <div className="absolute bottom-0 inset-x-0 p-1 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-[8px] text-white font-display text-center truncate">{avatar.name}</p>
      </div>
    </motion.button>
  );
}
