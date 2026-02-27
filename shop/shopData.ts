import { Snowflake, Flame, Moon, Crown, Skull, Flower2, TreeDeciduous, LucideIcon, Wand2, Waves, Feather } from 'lucide-react';

import previewWinterFae from '@/assets/avatars/preview-winters-end.jpg';
import previewGoldenDragon from '@/assets/avatars/preview-golden-flame.jpg';
import previewClassicVampire from '@/assets/avatars/preview-dusk-court.jpg';
import previewNobleVampire from '@/assets/avatars/preview-noble-blood.jpg';
import previewDarkVampire from '@/assets/avatars/preview-shadow-court.jpg';
import previewSpringFae from '@/assets/avatars/preview-spring-bloom.jpg';
import previewForestFae from '@/assets/avatars/preview-wild-grove.jpg';
import previewMoonlitCoven from '@/assets/avatars/preview-moonlit-coven.jpg';

export type AvatarSymbol = '🌙' | '✦' | '✧' | '⚝' | '☽' | '⟡' | '◈' | '❋';

export interface Avatar {
  id: string;
  name: string;
  symbol: AvatarSymbol;
  imageUrl?: string;
  isLocked: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  race: 'fae' | 'vampire' | 'human' | 'elf' | 'dragon' | 'wolf' | 'witch' | 'mermaid' | 'angel' | 'shifter';
  gender: 'female' | 'male' | 'non-binary';
  icon: LucideIcon;
  gradient: string;
  previewImage?: string;
  avatars: Avatar[];
  isLimited?: boolean;
  limitedDays?: number;
  prices: {
    small: number;  // 3 avatars
    full: number;   // all avatars
    unlock?: number; // remaining (discounted)
  };
}

// Keep old interface for backward compat with cart
export interface AvatarPack {
  id: string;
  name: string;
  avatarCount: number;
  price: number;
  icon: LucideIcon;
  isLimited?: boolean;
  limitedDays?: number;
  stock?: number;
  gradient: string;
  description?: string;
  features?: string[];
  previewImage?: string;
}

export const PACK_PRICING: Record<number, number> = {
  3: 2.99,
  10: 4.99,
  20: 7.99,
};

export function getPriceForCount(count: number): number {
  return PACK_PRICING[count] ?? 2.99;
}

const AVATAR_SYMBOLS: AvatarSymbol[] = ['🌙', '✦', '✧', '⚝', '☽', '⟡', '◈', '❋'];

function generateAvatars(collectionId: string, names: string[]): Avatar[] {
  return names.map((name, i) => ({
    id: `${collectionId}-${i + 1}`,
    name,
    symbol: AVATAR_SYMBOLS[i % AVATAR_SYMBOLS.length],
    isLocked: true, // default locked, user state overrides
  }));
}

export const collections: Collection[] = [
  // LIMITED
  {
    id: 'winters-end',
    name: "Winter's End",
    description: 'Born from the silence of the last snowfall, these fae carry the memory of frozen lakes and starlit frost.',
    race: 'fae',
    gender: 'female',
    icon: Snowflake,
    gradient: 'from-blue-400/70 via-indigo-500/60 to-purple-600/50',
    previewImage: previewWinterFae,
    isLimited: true,
    limitedDays: 12,
    prices: { small: 1.99, full: 4.99 },
    avatars: generateAvatars('winters-end', [
      'Lyra of Shadows', 'Elowen Frostbloom', 'Nimue Starwhisper',
      'Seraphina Coldlight', 'Celeste Iceveil', 'Isolde Snowthorn',
      'Aurelia Wintermoon', 'Briar Crystalsong',
    ]),
  },
  // VAMPIRE - FEMALE
  {
    id: 'dusk-court',
    name: 'Dusk Court',
    description: 'Elegant immortals draped in crimson velvet, their beauty is a weapon sharpened over centuries.',
    race: 'vampire',
    gender: 'female',
    icon: Moon,
    gradient: 'from-rose-500/60 via-purple-600/50 to-indigo-700/40',
    previewImage: previewClassicVampire,
    prices: { small: 1.99, full: 4.99 },
    avatars: generateAvatars('dusk-court', [
      'Carmilla von Dracul', 'Selene Nightblood', 'Morgana Ashveil',
      'Lilith Crimsonrose', 'Ravenna Darkthorn', 'Vesper Shadowmere',
      'Nyx Bloodmoon', 'Thana Nightshade',
    ]),
  },
  // VAMPIRE - MALE
  {
    id: 'noble-blood',
    name: 'Noble Blood',
    description: 'The aristocracy of the night — regal, commanding, and devastatingly beautiful.',
    race: 'vampire',
    gender: 'male',
    icon: Crown,
    gradient: 'from-violet-500/60 via-purple-600/50 to-indigo-700/40',
    previewImage: previewNobleVampire,
    prices: { small: 1.99, full: 4.99 },
    avatars: generateAvatars('noble-blood', [
      'Lord Valerian', 'Count Aldric', 'Prince Dorian',
      'Baron Marcellus', 'Duke Lazarus', 'Sir Obsidian',
      'Lord Cassius', 'Baron Theron',
    ]),
  },
  // VAMPIRE - NON-BINARY
  {
    id: 'shadow-court',
    name: 'Shadow Court',
    description: 'From the deepest shadows they emerge — untamed and utterly mesmerizing.',
    race: 'vampire',
    gender: 'non-binary',
    icon: Skull,
    gradient: 'from-slate-500/50 via-purple-700/40 to-zinc-700/30',
    previewImage: previewDarkVampire,
    prices: { small: 1.99, full: 4.99 },
    avatars: generateAvatars('shadow-court', [
      'Ash Voidwalker', 'Raven Nightshade', 'Storm Darkbloom',
      'Onyx Shadowmere', 'Ember Ashborn', 'Sable Duskweaver',
      'Wren Gravesong', 'Frost Palefire',
    ]),
  },
  // FAE - FEMALE
  {
    id: 'spring-bloom',
    name: 'Spring Bloom',
    description: 'Where cherry blossoms dance on warm breeze, the spring fae awaken crowned with flowers that never wilt.',
    race: 'fae',
    gender: 'female',
    icon: Flower2,
    gradient: 'from-pink-400/60 via-fuchsia-500/50 to-purple-600/40',
    previewImage: previewSpringFae,
    prices: { small: 1.99, full: 4.99 },
    avatars: generateAvatars('spring-bloom', [
      'Rosalind Dewdrop', 'Primrose Sunpetal', 'Dahlia Windchime',
      'Iris Goldleaf', 'Jasmine Stardust', 'Wisteria Moonbloom',
      'Violet Raindancer', 'Lily Evergreen',
    ]),
  },
  // FAE - MALE
  {
    id: 'wild-grove',
    name: 'Wild Grove',
    description: 'Guardians of the ancient groves, their eyes hold the wisdom of thousand-year oaks.',
    race: 'fae',
    gender: 'male',
    icon: TreeDeciduous,
    gradient: 'from-emerald-400/50 via-teal-500/40 to-purple-600/30',
    previewImage: previewForestFae,
    prices: { small: 1.99, full: 4.99 },
    avatars: generateAvatars('wild-grove', [
      'Thorne Mossbeard', 'Rowan Oakenshield', 'Alder Greenveil',
      'Fennel Stormroot', 'Birch Willowshade', 'Cedar Dawnwalker',
      'Hawthorne Ironbark', 'Sage Deepwood',
    ]),
  },
  // DRAGON - FEMALE
  {
    id: 'golden-flame',
    name: 'Golden Flame',
    description: 'Forged in the heart of dying stars, the golden dragons embody raw power and ancient wisdom.',
    race: 'dragon',
    gender: 'female',
    icon: Flame,
    gradient: 'from-amber-400/60 via-orange-500/50 to-purple-600/40',
    previewImage: previewGoldenDragon,
    prices: { small: 1.99, full: 4.99 },
    avatars: generateAvatars('golden-flame', [
      'Pyrra Sunscale', 'Ignis Starfire', 'Ember Goldwing',
      'Scorch Flameheart', 'Cinder Ashborn', 'Blaze Dragonmere',
      'Sola Firebrand', 'Aura Dawnflame',
    ]),
  },
  // WITCH - FEMALE
  {
    id: 'moonlit-coven',
    name: 'Moonlit Coven',
    description: 'Under the silver light of a crescent moon, the coven gathers. Their magic is ancient and unbound.',
    race: 'witch',
    gender: 'female',
    icon: Wand2,
    gradient: 'from-violet-400/60 via-purple-600/50 to-indigo-800/40',
    previewImage: previewMoonlitCoven,
    prices: { small: 1.99, full: 4.99 },
    avatars: generateAvatars('moonlit-coven', [
      'Rowena Hexwood', 'Morgause Spellfire', 'Circe Nightweave',
      'Hecate Shadowbind', 'Elara Moonchant', 'Astrid Stormhex',
      'Freya Thornspell', 'Sibyl Darkvow',
    ]),
  },
];

// Backward compatible helpers
export const limitedPacks: AvatarPack[] = collections
  .filter(c => c.isLimited)
  .map(c => ({
    id: c.id, name: c.name, avatarCount: c.avatars.length, price: c.prices.full,
    icon: c.icon, isLimited: true, limitedDays: c.limitedDays, stock: 12,
    gradient: c.gradient, description: c.description, previewImage: c.previewImage,
    features: [`${c.avatars.length} unique avatars`, 'Ornate golden frames', 'Exclusive limited badge'],
  }));

export const vampirePacks: AvatarPack[] = collections
  .filter(c => c.race === 'vampire' && !c.isLimited)
  .map(c => ({
    id: c.id, name: c.name, avatarCount: c.avatars.length, price: c.prices.full,
    icon: c.icon, gradient: c.gradient, description: c.description, previewImage: c.previewImage,
    features: [`${c.avatars.length} unique avatars`, 'Ornate frames', 'Collection badge'],
  }));

export const faePacks: AvatarPack[] = collections
  .filter(c => c.race === 'fae' && !c.isLimited)
  .map(c => ({
    id: c.id, name: c.name, avatarCount: c.avatars.length, price: c.prices.full,
    icon: c.icon, gradient: c.gradient, description: c.description, previewImage: c.previewImage,
    features: [`${c.avatars.length} unique avatars`, 'Ornate frames', 'Collection badge'],
  }));

export function getPackById(id: string): AvatarPack | undefined {
  const c = collections.find(c => c.id === id);
  if (!c) return undefined;
  return {
    id: c.id, name: c.name, avatarCount: c.avatars.length, price: c.prices.full,
    icon: c.icon, isLimited: c.isLimited, limitedDays: c.limitedDays,
    gradient: c.gradient, description: c.description, previewImage: c.previewImage,
    features: [`${c.avatars.length} unique avatars`, 'Ornate frames'],
  };
}

export function getCollectionById(id: string): Collection | undefined {
  return collections.find(c => c.id === id);
}
