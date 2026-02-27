import { motion } from 'framer-motion';
import { UserOnboarding, RACES, SUBGENRES, TROPES, INTENTIONS } from '@/types/onboarding';
import { 
  Star, Castle, Crown, Moon, Heart, Building2, Coffee, Columns3, 
  Sparkles, Sword, Map, Wand2, Sprout, Eclipse, Flame, Users, 
  Hourglass, Lock, Scale, Shield, Compass, GraduationCap, Swords, 
  Gem, ScrollText, Unlock, Sunrise, Skull, Flower2, Dog, User,
  TreeDeciduous, Sun, Waves, LucideIcon, ArrowRight, BookOpen
} from 'lucide-react';
import defaultAvatar from '@/assets/avatars/fae-female-1.png';

interface Step7Props {
  data: UserOnboarding;
  onComplete: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  Castle, Crown, Moon, Heart, Building2, Coffee, Columns3, Sparkles,
  Sword, Map, Wand2, Sprout, Eclipse, Flame, Users, Star, Hourglass,
  Lock, Scale, Shield, Compass, GraduationCap, Swords, Gem, ScrollText,
  Unlock, Sunrise, Skull, Flower2, Dog, User, TreeDeciduous, Sun, Waves
};

const getIcon = (iconName: string, className = "w-4 h-4") => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
};

export function Step7Complete({ data, onComplete }: Step7Props) {
  const race = RACES.find(r => r.id === data.race);
  const favoriteSubgenre = SUBGENRES.find(s => s.id === data.favoriteSubgenres[0]);
  const favoriteTrope = TROPES.find(t => t.id === data.favoriteTropes[0]);
  const favoriteAuthor = data.favoriteAuthors[0];
  const favoriteBook = data.favoriteBooks[0];

  return (
    <div className="animate-fade-in">
      {/* Profile Card - Tarot Style like Profile page */}
      <motion.div 
        className="baebles-card-ornate py-5 px-4 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <div className="corner-br" />
        
        {/* Name & Race Header */}
        <div className="text-center mb-5">
          <motion.h1 
            className="font-display text-xl sm:text-2xl tracking-wide bg-gradient-to-r from-baebles-gold via-primary to-baebles-gold bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {data.fantasyName}
          </motion.h1>
          <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 text-baebles-gold" />
            <span className="uppercase tracking-widest text-[10px]">{race?.name?.toUpperCase()}</span>
            <Sparkles className="w-3 h-3 text-baebles-gold" />
          </p>
        </div>

        {/* Avatar Frame */}
        <motion.div 
          className="flex justify-center mb-5"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-2xl blur-2xl scale-110" style={{ background: 'radial-gradient(circle, hsl(var(--baebles-gold) / 0.4), transparent)' }} />
            
            {/* Ornate frame */}
            <div className="relative w-36 h-36 rounded-2xl p-1.5" style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-gold)), hsl(var(--baebles-orange)), hsl(var(--baebles-gold)))' }}>
              <div className="w-full h-full rounded-xl bg-card flex items-center justify-center overflow-hidden">
                <img 
                  src={defaultAvatar} 
                  alt={data.fantasyName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Corner ornaments */}
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-baebles-orange rounded-tl-lg" />
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-baebles-orange rounded-tr-lg" />
              <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-baebles-orange rounded-bl-lg" />
              <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-baebles-orange rounded-br-lg" />
            </div>
          </div>
        </motion.div>

        {/* Favorites Section */}
        <div className="space-y-2">
          {/* Favorite Author */}
          {favoriteAuthor && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 p-3 rounded-xl border border-primary/20"
              style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--muted) / 0.5))' }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--primary) / 0.2)' }}>
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Favorite Author</p>
                <p className="font-display text-sm text-foreground">{favoriteAuthor}</p>
              </div>
            </motion.div>
          )}

          {/* Favorite Book */}
          {favoriteBook && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-3 p-3 rounded-xl border border-baebles-orange/20"
              style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-orange) / 0.1), hsl(var(--muted) / 0.5))' }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--baebles-orange) / 0.2)' }}>
                <Star className="w-4 h-4 text-baebles-orange fill-baebles-orange" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Favorite Book</p>
                <p className="font-display text-sm text-foreground">{favoriteBook}</p>
              </div>
            </motion.div>
          )}

          {/* Favorite Trope */}
          {favoriteTrope && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 p-3 rounded-xl border border-baebles-rose/20"
              style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-rose) / 0.1), hsl(var(--muted) / 0.5))' }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--baebles-rose) / 0.2)' }}>
                <Heart className="w-4 h-4 text-baebles-rose fill-baebles-rose" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Favorite Trope</p>
                <p className="font-display text-sm text-foreground">{favoriteTrope.name}</p>
              </div>
            </motion.div>
          )}

          {/* Intentions */}
          {data.intentions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-3 p-3 rounded-xl border border-baebles-teal/20"
              style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-teal) / 0.1), hsl(var(--muted) / 0.5))' }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--baebles-teal) / 0.2)' }}>
                <Sparkles className="w-4 h-4 text-baebles-teal" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">My Intentions</p>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {data.intentions.map((intention) => {
                    const intentionData = INTENTIONS.find(i => i.id === intention);
                    return (
                      <span 
                        key={intention}
                        className="px-2 py-0.5 rounded-full text-[10px] font-display"
                        style={{ 
                          background: 'hsl(var(--baebles-teal) / 0.15)',
                          color: 'hsl(var(--baebles-teal))'
                        }}
                      >
                        {intentionData?.title || intention}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Stats placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center gap-10 mt-5 pt-4 border-t border-border/50"
        >
          <div className="text-center">
            <p className="font-display text-xl text-foreground">0</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-display text-xl text-foreground">0</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Following</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Welcome message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-4 mb-4"
      >
        <p className="text-muted-foreground font-body text-sm flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-primary" /> Welcome to Baebles, <span className="text-foreground font-display">{data.fantasyName}</span>!
        </p>
      </motion.div>

      {/* CTA */}
      <motion.button
        onClick={onComplete}
        className="baebles-btn-primary w-full flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        whileTap={{ scale: 0.98 }}
      >
        Enter the Realm <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
