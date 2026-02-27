import { useState, useEffect, useCallback } from 'react';

export interface PurchasedAvatar {
  id: string;
  name: string;
  emoji: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Limited';
  src?: string;
  packId?: string;
}

const STORAGE_KEY = 'baebles_purchased_avatars';

// Default avatars that come with the app (free starter avatars)
const DEFAULT_AVATARS: PurchasedAvatar[] = [
  { id: 'fae-female-1', name: 'Fae Guardian', emoji: '🧚', rarity: 'Limited', src: '/src/assets/avatars/fae-female-1.png' },
];

// Migrate old ID format (packId-avatar-N) to new format (packId-N)
function migrateAvatarIds(avatars: PurchasedAvatar[]): PurchasedAvatar[] {
  return avatars.map(a => ({
    ...a,
    id: a.id.replace(/-avatar-(\d+)$/, '-$1'),
  }));
}

export function usePurchasedAvatars() {
  const [purchasedAvatars, setPurchasedAvatars] = useState<PurchasedAvatar[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = migrateAvatarIds(JSON.parse(saved));
          return [...DEFAULT_AVATARS, ...parsed];
        } catch {
          return DEFAULT_AVATARS;
        }
      }
    }
    return DEFAULT_AVATARS;
  });

  // Persist to localStorage (only user-purchased, not defaults)
  useEffect(() => {
    const userPurchased = purchasedAvatars.filter(
      avatar => !DEFAULT_AVATARS.some(def => def.id === avatar.id)
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userPurchased));
  }, [purchasedAvatars]);

  const addAvatarsFromPack = useCallback((packId: string, packName: string, avatarCount: number, rarity: PurchasedAvatar['rarity'] = 'Rare') => {
    const newAvatars: PurchasedAvatar[] = Array.from({ length: avatarCount }).map((_, i) => ({
      id: `${packId}-${i + 1}`,
      name: `${packName} #${i + 1}`,
      emoji: getPackEmoji(packId),
      rarity,
      packId,
    }));

    setPurchasedAvatars(prev => {
      // Filter out duplicates
      const existingIds = new Set(prev.map(a => a.id));
      const uniqueNew = newAvatars.filter(a => !existingIds.has(a.id));
      return [...prev, ...uniqueNew];
    });

    return newAvatars;
  }, []);

  const hasAvatar = useCallback((avatarId: string) => {
    return purchasedAvatars.some(a => a.id === avatarId);
  }, [purchasedAvatars]);

  const hasPack = useCallback((packId: string) => {
    return purchasedAvatars.some(a => a.packId === packId);
  }, [purchasedAvatars]);

  return {
    purchasedAvatars,
    addAvatarsFromPack,
    hasAvatar,
    hasPack,
  };
}

// Helper to get emoji based on pack type
function getPackEmoji(packId: string): string {
  if (packId.includes('fae') || packId.includes('spring') || packId.includes('forest')) return '🧚';
  if (packId.includes('vampire')) return '🧛';
  if (packId.includes('dragon')) return '🐉';
  if (packId.includes('winter')) return '❄️';
  if (packId.includes('werewolf')) return '🐺';
  return '✨';
}

// Helper to determine rarity from pack
export function getPackRarity(packId: string, isLimited?: boolean): PurchasedAvatar['rarity'] {
  if (isLimited) return 'Limited';
  if (packId.includes('noble') || packId.includes('golden')) return 'Epic';
  if (packId.includes('classic') || packId.includes('dark')) return 'Rare';
  return 'Common';
}
