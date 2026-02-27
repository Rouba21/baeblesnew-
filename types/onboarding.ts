export interface UserOnboarding {
  agreedToGuidelines: boolean;
  intentions: ('community' | 'matchmaking' | 'professional')[];
  race: string;
  gender: 'male' | 'female' | 'nonbinary';
  avatarId: string;
  fantasyName: string;
  favoriteSubgenres: string[];
  favoriteTropes: string[];
  favoriteAuthors: string[];
  favoriteBooks: string[];
}

export const RACES = [
  { id: 'fae', icon: 'Flower2', name: 'Fae' },
  { id: 'dragon-rider', icon: 'Flame', name: 'Dragon Rider' },
  { id: 'vampire', icon: 'Moon', name: 'Vampire' },
  { id: 'werewolf', icon: 'Dog', name: 'Werewolf' },
  { id: 'human', icon: 'User', name: 'Human' },
  { id: 'nymph', icon: 'TreeDeciduous', name: 'Nymph' },
  { id: 'angel', icon: 'Sun', name: 'Angel' },
  { id: 'demon', icon: 'Skull', name: 'Demon' },
  { id: 'witch-mage', icon: 'Wand2', name: 'Witch & Mage' },
  { id: 'siren', icon: 'Waves', name: 'Siren' },
] as const;

export const GENDERS = [
  { id: 'male', icon: 'CircleDot', name: 'Male' },
  { id: 'female', icon: 'Circle', name: 'Female' },
  { id: 'nonbinary', icon: 'Hexagon', name: 'Non-binary' },
] as const;

export const SUBGENRES = [
  { id: 'epic-fantasy', icon: 'Castle', name: 'Epic Fantasy' },
  { id: 'high-fantasy', icon: 'Crown', name: 'High Fantasy' },
  { id: 'dark-fantasy', icon: 'Moon', name: 'Dark Fantasy' },
  { id: 'romantasy', icon: 'Heart', name: 'Romantasy' },
  { id: 'urban-fantasy', icon: 'Building2', name: 'Urban Fantasy' },
  { id: 'cozy-fantasy', icon: 'Coffee', name: 'Cozy Fantasy' },
  { id: 'mythological', icon: 'Columns3', name: 'Mythological' },
  { id: 'fairy-tale-retellings', icon: 'Sparkles', name: 'Fairy Tale Retellings' },
  { id: 'grimdark', icon: 'Sword', name: 'Grimdark' },
  { id: 'fantasy-adventure', icon: 'Map', name: 'Fantasy Adventure' },
  { id: 'magical-realism', icon: 'Wand2', name: 'Magical Realism' },
  { id: 'young-adult-fantasy', icon: 'Sprout', name: 'Young Adult Fantasy' },
  { id: 'new-adult-fantasy', icon: 'Eclipse', name: 'New Adult Fantasy' },
] as const;

export const TROPES = [
  { id: 'enemies-to-lovers', icon: 'Flame', name: 'Enemies to Lovers' },
  { id: 'found-family', icon: 'Users', name: 'Found Family' },
  { id: 'chosen-one', icon: 'Star', name: 'The Chosen One' },
  { id: 'slow-burn', icon: 'Hourglass', name: 'Slow Burn' },
  { id: 'forbidden-love', icon: 'Lock', name: 'Forbidden Love' },
  { id: 'morally-grey', icon: 'Scale', name: 'Morally Grey Characters' },
  { id: 'strong-female-lead', icon: 'Shield', name: 'Strong Female Lead' },
  { id: 'quest-journey', icon: 'Compass', name: 'Quest / Journey' },
  { id: 'magic-schools', icon: 'GraduationCap', name: 'Magic Schools' },
  { id: 'political-intrigue', icon: 'Swords', name: 'Political Intrigue' },
  { id: 'court-drama', icon: 'Gem', name: 'Court Drama' },
  { id: 'ancient-prophecies', icon: 'ScrollText', name: 'Ancient Prophecies' },
  { id: 'hidden-powers', icon: 'Unlock', name: 'Hidden Powers' },
  { id: 'redemption-arc', icon: 'Sunrise', name: 'Redemption Arc' },
  { id: 'villain-you-love', icon: 'Skull', name: 'Villain You Love' },
] as const;

export const AUTHORS = [
  'J.R.R. Tolkien',
  'George R.R. Martin',
  'Sarah J. Maas',
  'Brandon Sanderson',
  'J.K. Rowling',
  'Leigh Bardugo',
  'Robin Hobb',
  'Neil Gaiman',
  'Holly Black',
  'V.E. Schwab',
  'Naomi Novik',
  'Patrick Rothfuss',
  'Rebecca Yarros',
  'Samantha Shannon',
  'Ursula K. Le Guin',
] as const;

export const BOOKS = [
  'The Lord of the Rings',
  'A Song of Ice and Fire',
  'A Court of Thorns and Roses',
  'Throne of Glass',
  'Mistborn',
  'The Stormlight Archive',
  'Six of Crows',
  'The Cruel Prince',
  'The Name of the Wind',
  'The Wheel of Time',
  'The Hobbit',
  'The Chronicles of Narnia',
  'From Blood and Ash',
  'The Witcher',
  'Fourth Wing',
] as const;

export const FANTASY_NAME_PARTS = {
  prefixes: ['Ael', 'Thal', 'Mor', 'Lyra', 'Vel', 'Zeph', 'Nym', 'Ash', 'Rav', 'Sol', 'Mal', 'Ser', 'Kor', 'Val', 'Dra'],
  middles: ['ith', 'or', 'wyn', 'ara', 'on', 'ia', 'ius', 'en', 'is', 'el'],
  surnames: ['Shadowsong', 'Nightwhisper', 'Starweaver', 'Moonshadow', 'Flameheart', 'Frostborne', 'Stormcaller', 'Dawnbreaker', 'Darkhollow', 'Silverveil', 'Thornwood', 'Ironblood', 'Windrider', 'Embercrown', 'Ravenscar'],
};

export const INTENTIONS = [
  {
    id: 'community' as const,
    icon: 'MessageCircle',
    title: 'Join the Community',
    description: 'Discuss books, share recommendations, connect with fantasy lovers',
  },
  {
    id: 'matchmaking' as const,
    icon: 'Heart',
    title: 'Find Reading Partners',
    description: 'Discover your perfect book buddy through matchmaking (coming soon)',
  },
  {
    id: 'professional' as const,
    icon: 'Pen',
    title: 'Professional Collaboration',
    description: "I'm an author, publisher, or creator looking to connect",
  },
] as const;
