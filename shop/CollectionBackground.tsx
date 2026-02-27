import { useMemo } from 'react';

type CollectionTheme = 'fae' | 'vampire' | 'dragon' | 'witch' | 'wolf' | 'human' | 'elf' | 'mermaid' | 'angel' | 'shifter';

interface ThemeConfig {
  particles: string; // CSS color for particles
  orbs: string;      // CSS color for orbs
  symbol: string;    // floating symbol
  bgGradient: string; // subtle background tint
}

const THEMES: Record<CollectionTheme, ThemeConfig> = {
  fae: {
    particles: 'hsl(280 60% 70% / 0.6)',
    orbs: 'hsl(280 50% 65% / 0.06)',
    symbol: '◆',
    bgGradient: 'radial-gradient(ellipse at 30% 20%, hsl(280 50% 50% / 0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, hsl(320 50% 50% / 0.04) 0%, transparent 60%)',
  },
  vampire: {
    particles: 'hsl(0 60% 50% / 0.5)',
    orbs: 'hsl(0 40% 40% / 0.06)',
    symbol: '◇',
    bgGradient: 'radial-gradient(ellipse at 50% 30%, hsl(0 50% 30% / 0.08) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, hsl(280 30% 20% / 0.06) 0%, transparent 60%)',
  },
  dragon: {
    particles: 'hsl(30 90% 55% / 0.6)',
    orbs: 'hsl(20 80% 50% / 0.06)',
    symbol: '◈',
    bgGradient: 'radial-gradient(ellipse at 60% 40%, hsl(30 80% 50% / 0.07) 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, hsl(0 60% 40% / 0.05) 0%, transparent 60%)',
  },
  witch: {
    particles: 'hsl(270 60% 60% / 0.5)',
    orbs: 'hsl(270 40% 50% / 0.06)',
    symbol: '☽',
    bgGradient: 'radial-gradient(ellipse at 40% 20%, hsl(270 50% 40% / 0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, hsl(250 40% 30% / 0.06) 0%, transparent 60%)',
  },
  wolf: {
    particles: 'hsl(200 30% 60% / 0.5)',
    orbs: 'hsl(200 20% 50% / 0.05)',
    symbol: '◇',
    bgGradient: 'radial-gradient(ellipse at 50% 30%, hsl(210 30% 40% / 0.06) 0%, transparent 60%)',
  },
  human: {
    particles: 'hsl(40 50% 60% / 0.5)',
    orbs: 'hsl(40 40% 50% / 0.05)',
    symbol: '◆',
    bgGradient: 'radial-gradient(ellipse at 50% 50%, hsl(40 40% 50% / 0.05) 0%, transparent 60%)',
  },
  elf: {
    particles: 'hsl(140 50% 55% / 0.5)',
    orbs: 'hsl(140 40% 45% / 0.06)',
    symbol: '❋',
    bgGradient: 'radial-gradient(ellipse at 30% 40%, hsl(140 40% 40% / 0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 60%, hsl(160 30% 40% / 0.05) 0%, transparent 60%)',
  },
  mermaid: {
    particles: 'hsl(190 60% 60% / 0.5)',
    orbs: 'hsl(190 50% 50% / 0.06)',
    symbol: '⟡',
    bgGradient: 'radial-gradient(ellipse at 50% 60%, hsl(190 50% 45% / 0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 20%, hsl(210 40% 50% / 0.05) 0%, transparent 60%)',
  },
  angel: {
    particles: 'hsl(45 70% 70% / 0.6)',
    orbs: 'hsl(45 60% 60% / 0.06)',
    symbol: '◆',
    bgGradient: 'radial-gradient(ellipse at 50% 20%, hsl(45 60% 60% / 0.08) 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, hsl(0 0% 100% / 0.03) 0%, transparent 60%)',
  },
  shifter: {
    particles: 'hsl(260 50% 60% / 0.5)',
    orbs: 'hsl(260 40% 50% / 0.06)',
    symbol: '◈',
    bgGradient: 'radial-gradient(ellipse at 40% 30%, hsl(260 40% 45% / 0.07) 0%, transparent 60%), radial-gradient(ellipse at 60% 70%, hsl(300 30% 40% / 0.05) 0%, transparent 60%)',
  },
};

// Special snowfall for winter/fae collections
const SNOW_IDS = new Set(['winters-end']);

interface CollectionBackgroundProps {
  race: CollectionTheme;
  collectionId?: string;
}

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  type: 'dot' | 'symbol' | 'orb' | 'snow';
}

export function CollectionBackground({ race, collectionId }: CollectionBackgroundProps) {
  const theme = THEMES[race] || THEMES.fae;
  const isSnow = collectionId ? SNOW_IDS.has(collectionId) : false;

  const particles = useMemo<Particle[]>(() => {
    const items: Particle[] = [];

    // Snow particles for winter collections
    if (isSnow) {
      for (let i = 0; i < 35; i++) {
        items.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${-10 + Math.random() * 10}%`,
          size: 2 + Math.random() * 4,
          delay: Math.random() * 8,
          duration: 5 + Math.random() * 8,
          type: 'snow',
        });
      }
    }

    // Themed dots
    for (let i = 50; i < 80; i++) {
      items.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
        type: 'dot',
      });
    }

    // Floating symbols
    for (let i = 80; i < 90; i++) {
      items.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 8 + Math.random() * 6,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 6,
        type: 'symbol',
      });
    }

    // Orbs
    for (let i = 90; i < 96; i++) {
      items.push({
        id: i,
        left: `${5 + Math.random() * 90}%`,
        top: `${5 + Math.random() * 90}%`,
        size: 50 + Math.random() * 100,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 6,
        type: 'orb',
      });
    }

    return items;
  }, [isSnow]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ background: theme.bgGradient }}>
      {particles.map(p => {
        if (p.type === 'snow') {
          return (
            <div
              key={p.id}
              className="absolute rounded-full opacity-70"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                background: 'hsl(210 30% 95% / 0.8)',
                boxShadow: '0 0 4px hsl(210 30% 95% / 0.4)',
                animation: `snowfall ${p.duration}s linear ${p.delay}s infinite`,
              }}
            />
          );
        }
        if (p.type === 'orb') {
          return (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                background: theme.orbs,
                filter: 'blur(20px)',
                animation: `float-orb ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
              }}
            />
          );
        }
        if (p.type === 'symbol') {
          return (
            <div
              key={p.id}
              className="absolute font-display opacity-[0.08]"
              style={{
                left: p.left,
                top: p.top,
                fontSize: p.size,
                color: theme.particles,
                animation: `float-symbol ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
              }}
            >
              {theme.symbol}
            </div>
          );
        }
        return (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: theme.particles,
              animation: `twinkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        );
      })}

      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(0) translateX(0); opacity: 0.8; }
          25% { transform: translateY(25vh) translateX(10px); opacity: 0.9; }
          50% { transform: translateY(50vh) translateX(-5px); opacity: 0.7; }
          75% { transform: translateY(75vh) translateX(8px); opacity: 0.6; }
          100% { transform: translateY(110vh) translateX(-3px); opacity: 0; }
        }
        @keyframes float-orb {
          0% { transform: translateY(0) scale(1); opacity: 0.4; }
          100% { transform: translateY(-20px) scale(1.1); opacity: 0.7; }
        }
        @keyframes float-symbol {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-15px) rotate(10deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
