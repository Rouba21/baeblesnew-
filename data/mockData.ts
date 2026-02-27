// Mock data for the Baebles app

export interface User {
  id: string;
  fantasyName: string;
  race: string;
  raceEmoji: string;
  avatarId: string;
  avatarUrl?: string;
  intentions: string[];
  favoriteSubgenres: string[];
  favoriteTropes: string[];
  favoriteAuthors: string[];
  favoriteBooks: string[];
  followersCount: number;
  followingCount: number;
  isAdvertiser?: boolean;
}

export interface Thread {
  id: string;
  authorId: string;
  author: {
    fantasyName: string;
    raceEmoji: string;
    avatarId: string;
  };
  roomId: string;
  roomName: string;
  content: string;
  bookId?: string;
  book?: {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
  };
  tags?: string[];
  isMature: boolean;
  hasSpoilers?: boolean;
  commentsCount: number;
  isSaved: boolean;
  createdAt: Date;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  icon: string;
  isMature: boolean;
  membersCount: number;
  isJoined: boolean;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  seriesId?: string;
  seriesName?: string;
  seriesPosition?: number;
  releaseDate: Date;
  subgenres: string[];
  tropes: string[];
  isInTBR: boolean;
  isFollowingSeries: boolean;
}

export interface RecommendationRequest {
  id: string;
  authorId: string;
  author: {
    fantasyName: string;
    raceEmoji: string;
    avatarId: string;
  };
  content: string;
  subgenre?: string;
  tropes?: string[];
  isMature: boolean;
  hasSpoilers?: boolean;
  responsesCount: number;
  isFollowing: boolean;
  createdAt: Date;
}

export interface RecommendationResponse {
  id: string;
  requestId: string;
  authorId: string;
  author: {
    fantasyName: string;
    raceEmoji: string;
    avatarId: string;
  };
  book: {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
  };
  reason?: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'comment_reply' | 'new_recommendation' | 'followed_request' | 'new_follower' | 'series_release';
  content: string;
  link: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Banner {
  id: string;
  imageUrl: string;
  link: string;
  isExternal: boolean;
}

export interface Comment {
  id: string;
  threadId: string;
  authorId: string;
  author: {
    fantasyName: string;
    raceEmoji: string;
    avatarId: string;
  };
  content: string;
  parentId?: string;
  book?: {
    id: string;
    title: string;
    author: string;
  };
  createdAt: Date;
}

// Current user (simulating logged-in state after onboarding)
export const currentUser: User = {
  id: 'user-1',
  fantasyName: 'Aelith Shadowsong',
  race: 'fae',
  raceEmoji: 'Flower2',
  avatarId: 'fae-female-1',
  avatarUrl: '/src/assets/avatars/fae-female-1.png',
  intentions: ['community', 'matchmaking'],
  favoriteSubgenres: ['romantasy', 'dark-fantasy'],
  favoriteTropes: ['enemies-to-lovers', 'slow-burn', 'morally-grey'],
  favoriteAuthors: ['Sarah J. Maas', 'Rebecca Yarros'],
  favoriteBooks: ['A Court of Thorns and Roses', 'Fourth Wing'],
  followersCount: 247,
  followingCount: 89,
  isAdvertiser: false,
};

// All users (for profile viewing)
export const users: User[] = [
  currentUser,
  {
    id: 'user-2',
    fantasyName: 'Lyraen Moonshadow',
    race: 'vampire',
    raceEmoji: 'Moon',
    avatarId: 'vampire-female-1',
    intentions: ['community'],
    favoriteSubgenres: ['dark-fantasy', 'gothic-horror'],
    favoriteTropes: ['forbidden-love', 'morally-grey', 'redemption-arc'],
    favoriteAuthors: ['Carissa Broadbent', 'Jennifer L. Armentrout'],
    favoriteBooks: ['The Serpent and the Wings of Night', 'From Blood and Ash'],
    followersCount: 1289,
    followingCount: 156,
    isAdvertiser: false,
  },
  {
    id: 'user-3',
    fantasyName: 'Thalorin Flameheart',
    race: 'dragon-rider',
    raceEmoji: 'Flame',
    avatarId: 'dragon-rider-male-1',
    intentions: ['community', 'matchmaking'],
    favoriteSubgenres: ['romantasy', 'fantasy-adventure'],
    favoriteTropes: ['enemies-to-lovers', 'strong-female-lead', 'dragons'],
    favoriteAuthors: ['Rebecca Yarros', 'Holly Black'],
    favoriteBooks: ['Fourth Wing', 'The Cruel Prince'],
    followersCount: 892,
    followingCount: 234,
    isAdvertiser: false,
  },
  {
    id: 'user-4',
    fantasyName: 'Velora Nightwhisper',
    race: 'fae',
    raceEmoji: 'Flower2',
    avatarId: 'fae-female-2',
    intentions: ['matchmaking'],
    favoriteSubgenres: ['romantasy', 'fairy-tale-retellings'],
    favoriteTropes: ['slow-burn', 'fake-dating', 'royalty'],
    favoriteAuthors: ['Sarah J. Maas', 'Elise Kova'],
    favoriteBooks: ['A Court of Mist and Fury', 'An Enchantment of Ravens'],
    followersCount: 567,
    followingCount: 312,
    isAdvertiser: false,
  },
  {
    id: 'user-5',
    fantasyName: 'Malion Ironblood',
    race: 'werewolf',
    raceEmoji: 'Dog',
    avatarId: 'werewolf-male-1',
    intentions: ['community'],
    favoriteSubgenres: ['dark-fantasy', 'paranormal-romance'],
    favoriteTropes: ['fated-mates', 'possessive-hero', 'alpha-hero'],
    favoriteAuthors: ['Danielle Lori', 'Penelope Douglas'],
    favoriteBooks: ['The Sweetest Oblivion', 'Punk 57'],
    followersCount: 423,
    followingCount: 189,
    isAdvertiser: false,
  },
  {
    id: 'user-6',
    fantasyName: 'Seraphina Starweaver',
    race: 'angel',
    raceEmoji: 'Sun',
    avatarId: 'angel-female-1',
    intentions: ['community', 'matchmaking'],
    favoriteSubgenres: ['cozy-fantasy', 'high-fantasy'],
    favoriteTropes: ['found-family', 'quest-journey', 'chosen-one'],
    favoriteAuthors: ['Leigh Bardugo', 'V.E. Schwab'],
    favoriteBooks: ['Six of Crows', 'A Darker Shade of Magic'],
    followersCount: 2134,
    followingCount: 445,
    isAdvertiser: false,
  },
  {
    id: 'publisher-1',
    fantasyName: 'Bloomsbury Publishing',
    race: 'publisher',
    raceEmoji: 'BookOpen',
    avatarId: 'publisher-1',
    intentions: ['community'],
    favoriteSubgenres: ['romantasy', 'fantasy-adventure'],
    favoriteTropes: [],
    favoriteAuthors: ['Sarah J. Maas'],
    favoriteBooks: [],
    followersCount: 15420,
    followingCount: 12,
    isAdvertiser: true,
  },
];

// Helper to get user by ID
export function getUserById(userId: string): User | undefined {
  return users.find(u => u.id === userId);
}

// Rooms data
export const rooms: Room[] = [
  { id: 'room-1', name: 'Romantasy', description: 'Where magic and longing intertwine.', icon: 'heart', isMature: false, membersCount: 5120, isJoined: true },
  { id: 'room-2', name: 'Dark Fantasy', description: 'Shadows, sacrifice, and stories that linger.', icon: 'skull', isMature: false, membersCount: 3420, isJoined: true },
  { id: 'room-3', name: 'Cozy Fantasy', description: 'Soft worlds to rest your heart in.', icon: 'coffee', isMature: false, membersCount: 2890, isJoined: false },
  { id: 'room-4', name: 'Epic Fantasy', description: 'Worlds vast enough to get lost in.', icon: 'swords', isMature: false, membersCount: 4230, isJoined: false },
  { id: 'room-5', name: 'Mood Reads', description: 'Stories chosen by feeling, not genre.', icon: 'moon', isMature: false, membersCount: 1950, isJoined: true },
  { id: 'room-6', name: 'Help Me Find That Book', description: 'Lost stories rarely want to stay lost.', icon: 'search', isMature: false, membersCount: 6780, isJoined: false },
  { id: 'room-7', name: 'Currently Reading', description: "What's open on your nightstand right now?", icon: 'book-open', isMature: false, membersCount: 8450, isJoined: true },
  { id: 'room-8', name: 'Fanfiction & Fandom Worlds', description: 'Where stories keep growing.', icon: 'sparkles', isMature: false, membersCount: 3100, isJoined: true },
  { id: 'room-9', name: 'Book Talk', description: "For everything that doesn't fit elsewhere.", icon: 'message-circle', isMature: false, membersCount: 4560, isJoined: false },
  { id: 'room-10', name: 'Audiobook Lounge', description: 'Narrators, voices, and stories that speak to you.', icon: 'headphones', isMature: false, membersCount: 2740, isJoined: false },
];

// Threads data
export const threads: Thread[] = [
  {
    id: 'thread-1',
    authorId: 'user-2',
    author: { fantasyName: 'Lyraen Moonshadow', raceEmoji: 'Moon', avatarId: 'vampire-female-1' },
    roomId: 'room-1',
    roomName: 'DarkFantasyLovers',
    content: 'Just finished The Poppy War and I am DESTROYED. The way R.F. Kuang writes trauma and war... I need to lie down for a week. Anyone else have book hangover from this one?',
    bookId: 'book-poppy',
    book: { id: 'book-poppy', title: 'The Poppy War', author: 'R.F. Kuang', coverUrl: '/placeholder.svg' },
    isMature: false,
    hasSpoilers: true,
    commentsCount: 42,
    isSaved: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'thread-2',
    authorId: 'user-3',
    author: { fantasyName: 'Thalorin Flameheart', raceEmoji: 'Flame', avatarId: 'dragon-rider-male-1' },
    roomId: 'room-8',
    roomName: 'DragonRiders',
    content: 'Fourth Wing changed my life. The way Yarros writes the bond between dragon and rider is just *chef\'s kiss*. Who else is counting down to Iron Flame?',
    bookId: 'book-1',
    book: { id: 'book-1', title: 'Fourth Wing', author: 'Rebecca Yarros', coverUrl: '/placeholder.svg' },
    isMature: false,
    commentsCount: 128,
    isSaved: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 'thread-3',
    authorId: 'user-4',
    author: { fantasyName: 'Velora Nightwhisper', raceEmoji: 'Flower2', avatarId: 'fae-female-2' },
    roomId: 'room-2',
    roomName: 'RomanticFantasy',
    content: 'Unpopular opinion: Rhysand is actually problematic but we love him anyway because he\'s fictional. Change my mind.',
    isMature: false,
    commentsCount: 256,
    isSaved: false,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: 'thread-4',
    authorId: 'user-5',
    author: { fantasyName: 'Malion Ironblood', raceEmoji: 'Dog', avatarId: 'werewolf-male-1' },
    roomId: 'room-10',
    roomName: 'SpicyReads',
    content: 'Looking for recommendations for spicy fantasy with werewolf romance. Please drop your favorites!',
    isMature: true,
    hasSpoilers: false,
    commentsCount: 89,
    isSaved: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: 'thread-5',
    authorId: 'user-6',
    author: { fantasyName: 'Seraphina Starweaver', raceEmoji: 'Sun', avatarId: 'angel-female-1' },
    roomId: 'room-5',
    roomName: 'FoundFamily',
    content: 'The Six of Crows crew has my whole heart. Kaz, Inej, Jesper, Wylan, Nina, Matthias... they just GET each other. Found family done RIGHT.',
    bookId: 'book-2',
    book: { id: 'book-2', title: 'Six of Crows', author: 'Leigh Bardugo', coverUrl: '/placeholder.svg' },
    isMature: false,
    commentsCount: 167,
    isSaved: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 'thread-6',
    authorId: 'user-1',
    author: { fantasyName: 'Aelith Shadowsong', raceEmoji: 'Flower2', avatarId: 'fae-female-1' },
    roomId: 'room-1',
    roomName: 'Romantasy',
    content: 'Just finished A Court of Silver Flames and I am OBSESSED with Nesta\'s character arc! The way she goes from broken to powerful is everything. Who else loved her journey?',
    bookId: 'book-acosf',
    book: { id: 'book-acosf', title: 'A Court of Silver Flames', author: 'Sarah J. Maas', coverUrl: '/placeholder.svg' },
    isMature: false,
    hasSpoilers: true,
    commentsCount: 34,
    isSaved: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
];

// Books data
export const books: Book[] = [
  {
    id: 'book-1',
    title: 'Fourth Wing',
    author: 'Rebecca Yarros',
    coverUrl: '/placeholder.svg',
    description: 'Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general—also known as her tough-as-talons mother—has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders.',
    seriesId: 'series-1',
    seriesName: 'The Empyrean',
    seriesPosition: 1,
    releaseDate: new Date('2023-05-02'),
    subgenres: ['romantasy', 'fantasy-adventure'],
    tropes: ['enemies-to-lovers', 'strong-female-lead', 'morally-grey'],
    isInTBR: true,
    isFollowingSeries: true,
  },
  {
    id: 'book-2',
    title: 'Iron Flame',
    author: 'Rebecca Yarros',
    coverUrl: '/placeholder.svg',
    description: 'The sequel to Fourth Wing. The stakes are even higher as Violet faces new challenges at Basgiath War College.',
    seriesId: 'series-1',
    seriesName: 'The Empyrean',
    seriesPosition: 2,
    releaseDate: new Date('2023-11-07'),
    subgenres: ['romantasy', 'fantasy-adventure'],
    tropes: ['enemies-to-lovers', 'strong-female-lead'],
    isInTBR: true,
    isFollowingSeries: true,
  },
  {
    id: 'book-3',
    title: 'Onyx Storm',
    author: 'Rebecca Yarros',
    coverUrl: '/placeholder.svg',
    description: 'The third installment in The Empyrean series.',
    seriesId: 'series-1',
    seriesName: 'The Empyrean',
    seriesPosition: 3,
    releaseDate: new Date('2025-01-21'),
    subgenres: ['romantasy', 'fantasy-adventure'],
    tropes: ['enemies-to-lovers', 'strong-female-lead'],
    isInTBR: false,
    isFollowingSeries: true,
  },
  {
    id: 'book-4',
    title: 'A Court of Thorns and Roses',
    author: 'Sarah J. Maas',
    coverUrl: '/placeholder.svg',
    description: 'When nineteen-year-old huntress Feyre kills a wolf in the woods, a terrifying creature arrives to demand retribution. Dragged to a treacherous magical land she knows about only from legends, Feyre discovers that her captor is not truly a beast, but one of the lethal, immortal faeries who once ruled her world.',
    seriesId: 'series-2',
    seriesName: 'A Court of Thorns and Roses',
    seriesPosition: 1,
    releaseDate: new Date('2015-05-05'),
    subgenres: ['romantasy', 'fairy-tale-retellings'],
    tropes: ['enemies-to-lovers', 'slow-burn', 'morally-grey'],
    isInTBR: false,
    isFollowingSeries: true,
  },
  {
    id: 'book-5',
    title: 'House of Flame and Shadow',
    author: 'Sarah J. Maas',
    coverUrl: '/placeholder.svg',
    description: 'The third book in the Crescent City series.',
    seriesId: 'series-3',
    seriesName: 'Crescent City',
    seriesPosition: 3,
    releaseDate: new Date('2024-01-30'),
    subgenres: ['urban-fantasy', 'romantasy'],
    tropes: ['found-family', 'strong-female-lead'],
    isInTBR: true,
    isFollowingSeries: true,
  },
  {
    id: 'book-6',
    title: 'The Serpent and the Wings of Night',
    author: 'Carissa Broadbent',
    coverUrl: '/placeholder.svg',
    description: 'The first book in the Crowns of Nyaxia series. A human girl raised by a vampire king must compete in a deadly tournament.',
    seriesId: 'series-4',
    seriesName: 'Crowns of Nyaxia',
    seriesPosition: 1,
    releaseDate: new Date('2022-08-30'),
    subgenres: ['romantasy', 'dark-fantasy'],
    tropes: ['enemies-to-lovers', 'slow-burn', 'forbidden-love'],
    isInTBR: false,
    isFollowingSeries: false,
  },
  {
    id: 'book-7',
    title: 'Blade of Secrets',
    author: 'Traci Loudin',
    coverUrl: '/placeholder.svg',
    description: 'A young blacksmith with social anxiety discovers she can forge magic into her blades, but a powerful warlord wants to use her gift for conquest.',
    seriesId: 'series-5',
    seriesName: 'Bladesmith',
    seriesPosition: 1,
    releaseDate: new Date('2026-03-15'),
    subgenres: ['romantasy', 'fantasy-adventure'],
    tropes: ['slow-burn', 'found-family', 'hidden-powers'],
    isInTBR: false,
    isFollowingSeries: false,
  },
  {
    id: 'book-8',
    title: 'The Foxglove King',
    author: 'Hannah Whitten',
    coverUrl: '/placeholder.svg',
    description: 'In a world where poison is power, a woman who can raise the dead must navigate court intrigue and forbidden magic.',
    seriesId: 'series-6',
    seriesName: 'The Nightshade Crown',
    seriesPosition: 1,
    releaseDate: new Date('2026-02-20'),
    subgenres: ['dark-fantasy', 'romantasy'],
    tropes: ['morally-grey', 'forbidden-love', 'political-intrigue'],
    isInTBR: false,
    isFollowingSeries: true,
  },
  {
    id: 'book-9',
    title: 'Throne of the Fallen',
    author: 'Kerri Maniscalco',
    coverUrl: '/placeholder.svg',
    description: 'A prince of Hell and a talented artist are drawn into a deadly game of passion and power.',
    seriesId: 'series-7',
    seriesName: 'Kingdom of the Wicked',
    seriesPosition: 4,
    releaseDate: new Date('2026-04-08'),
    subgenres: ['romantasy', 'dark-fantasy'],
    tropes: ['enemies-to-lovers', 'slow-burn', 'morally-grey'],
    isInTBR: true,
    isFollowingSeries: true,
  },
  {
    id: 'book-10',
    title: 'A Dawn of Onyx',
    author: 'Kate Golden',
    coverUrl: '/placeholder.svg',
    description: 'A healer captured by enemy forces discovers dark secrets about her power and an unexpected connection to a brooding commander.',
    seriesId: 'series-8',
    seriesName: 'The Sacred Stones',
    seriesPosition: 1,
    releaseDate: new Date('2026-05-12'),
    subgenres: ['romantasy', 'high-fantasy'],
    tropes: ['enemies-to-lovers', 'hidden-powers', 'slow-burn'],
    isInTBR: false,
    isFollowingSeries: false,
  },
  {
    id: 'book-11',
    title: 'Daughter of No Worlds',
    author: 'Carissa Broadbent',
    coverUrl: '/placeholder.svg',
    description: 'A magically crippled woman and an infamous vampire must work together to survive a deadly magical competition.',
    seriesId: 'series-4',
    seriesName: 'Crowns of Nyaxia',
    seriesPosition: 2,
    releaseDate: new Date('2026-06-01'),
    subgenres: ['romantasy', 'dark-fantasy'],
    tropes: ['slow-burn', 'found-family', 'redemption-arc'],
    isInTBR: false,
    isFollowingSeries: true,
  },
  {
    id: 'book-12',
    title: 'The Hurricane Wars',
    author: 'Thea Guanzon',
    coverUrl: '/placeholder.svg',
    description: 'In a world torn by war, a soldier and an enemy prince forge an unlikely alliance that could change everything.',
    seriesId: 'series-9',
    seriesName: 'The Hurricane Wars',
    seriesPosition: 1,
    releaseDate: new Date('2026-02-28'),
    subgenres: ['romantasy', 'epic-fantasy'],
    tropes: ['enemies-to-lovers', 'political-intrigue', 'slow-burn'],
    isInTBR: true,
    isFollowingSeries: false,
  },
];

// Recommendation requests
export const recommendationRequests: RecommendationRequest[] = [
  {
    id: 'reco-1',
    authorId: 'user-7',
    author: { fantasyName: 'Korven Darkhollow', raceEmoji: 'Skull', avatarId: 'demon-male-1' },
    content: 'Looking for a dark fantasy with enemies to lovers and morally grey FMC. Something like ACOTAR but darker.',
    subgenre: 'dark-fantasy',
    tropes: ['enemies-to-lovers', 'morally-grey', 'slow-burn'],
    isMature: false,
    responsesCount: 12,
    isFollowing: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 'reco-2',
    authorId: 'user-8',
    author: { fantasyName: 'Nymara Silverveil', raceEmoji: 'Waves', avatarId: 'siren-female-1' },
    content: 'Need cozy fantasy recommendations! Something with low stakes, found family vibes, and maybe a cute romance subplot?',
    subgenre: 'cozy-fantasy',
    tropes: ['found-family', 'slow-burn'],
    isMature: false,
    hasSpoilers: true,
    responsesCount: 24,
    isFollowing: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'reco-3',
    authorId: 'user-9',
    author: { fantasyName: 'Zephyris Stormcaller', raceEmoji: 'Wand2', avatarId: 'witch-mage-male-1' },
    content: 'Looking for fantasy books with amazing magic systems! Something like Sanderson but with more romance.',
    subgenre: 'high-fantasy',
    tropes: ['magic-schools', 'quest-journey'],
    isMature: false,
    responsesCount: 18,
    isFollowing: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
];

// Recommendation responses (books recommended for requests)
export const recommendationResponses: RecommendationResponse[] = [
  {
    id: 'resp-1',
    requestId: 'reco-1',
    authorId: 'user-3',
    author: { fantasyName: 'Thalorin Flameheart', raceEmoji: 'Flame', avatarId: 'dragon-rider-male-1' },
    book: { id: 'book-6', title: 'The Serpent and the Wings of Night', author: 'Carissa Broadbent', coverUrl: '/placeholder.svg' },
    reason: 'This one is SO dark and the enemies to lovers is *chefs kiss*. The FMC is definitely morally grey!',
    createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
  },
  {
    id: 'resp-2',
    requestId: 'reco-1',
    authorId: 'user-4',
    author: { fantasyName: 'Velora Nightwhisper', raceEmoji: 'Flower2', avatarId: 'fae-female-2' },
    book: { id: 'book-4', title: 'A Court of Thorns and Roses', author: 'Sarah J. Maas', coverUrl: '/placeholder.svg' },
    reason: 'Classic recommendation but the series gets darker as it goes on!',
    createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000),
  },
  {
    id: 'resp-3',
    requestId: 'reco-1',
    authorId: 'user-5',
    author: { fantasyName: 'Malion Ironblood', raceEmoji: 'Dog', avatarId: 'werewolf-male-1' },
    book: { id: 'book-1', title: 'Fourth Wing', author: 'Rebecca Yarros', coverUrl: '/placeholder.svg' },
    reason: 'Not as dark but the morally grey elements are there. Plus dragons!',
    createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000),
  },
  {
    id: 'resp-4',
    requestId: 'reco-2',
    authorId: 'user-2',
    author: { fantasyName: 'Lyraen Moonshadow', raceEmoji: 'Moon', avatarId: 'vampire-female-1' },
    book: { id: 'book-2', title: 'Iron Flame', author: 'Rebecca Yarros', coverUrl: '/placeholder.svg' },
    reason: 'The found family vibes in this series are amazing!',
    createdAt: new Date(Date.now() - 40 * 60 * 60 * 1000),
  },
];

// Notifications
export const notifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'comment_reply',
    content: 'Lyraen Moonshadow replied to your thread',
    link: '/threads/thread-1',
    isRead: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: 'notif-2',
    type: 'new_recommendation',
    content: 'Thalorin Flameheart recommended a book on your request',
    link: '/recommendations/reco-1',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'notif-3',
    type: 'new_follower',
    content: 'Velora Nightwhisper started following you',
    link: '/profile/user-4',
    isRead: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 'notif-4',
    type: 'series_release',
    content: 'Onyx Storm from The Empyrean is now available!',
    link: '/books/book-3',
    isRead: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

// Banners
export const banners: Banner[] = [
  { id: 'banner-1', imageUrl: '/placeholder.svg', link: 'https://example.com', isExternal: true },
  { id: 'banner-2', imageUrl: '/placeholder.svg', link: '/books/book-3', isExternal: false },
  { id: 'banner-3', imageUrl: '/placeholder.svg', link: 'https://example.com', isExternal: true },
];

// Comments
export const comments: Comment[] = [
  {
    id: 'comment-1',
    threadId: 'thread-1',
    authorId: 'user-3',
    author: { fantasyName: 'Thalorin Flameheart', raceEmoji: 'Flame', avatarId: 'dragon-rider-male-1' },
    content: 'Same! I couldn\'t sleep for days after finishing it. The ending broke me.',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: 'comment-2',
    threadId: 'thread-1',
    authorId: 'user-4',
    author: { fantasyName: 'Velora Nightwhisper', raceEmoji: 'Flower2', avatarId: 'fae-female-2' },
    content: 'The Poppy War trilogy is devastating. But so well written!',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: 'comment-3',
    threadId: 'thread-1',
    authorId: 'user-5',
    author: { fantasyName: 'Malion Ironblood', raceEmoji: 'Dog', avatarId: 'werewolf-male-1' },
    content: 'One of the best fantasy series ever written imo',
    parentId: 'comment-2',
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: 'comment-4',
    threadId: 'thread-2',
    authorId: 'user-1',
    author: { fantasyName: 'Aelith Shadowsong', raceEmoji: 'Flower2', avatarId: 'fae-female-1' },
    content: 'Fourth Wing is absolutely incredible! The bond between Violet and Tairn gives me all the feels.',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: 'comment-5',
    threadId: 'thread-5',
    authorId: 'user-1',
    author: { fantasyName: 'Aelith Shadowsong', raceEmoji: 'Flower2', avatarId: 'fae-female-1' },
    content: 'Kaz Brekker has my whole heart. "No mourners, no funerals" hits different every time.',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
];

// Helper function to format time ago
export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString();
}

// Helper to format member count
export function formatCount(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return count.toString();
}
