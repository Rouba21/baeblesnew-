import { useMemo } from 'react';

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  type: 'star' | 'sparkle' | 'orb';
}

export function StarsBackground() {
  const particles = useMemo<Particle[]>(() => {
    const items: Particle[] = [];
    // Stars
    for (let i = 0; i < 40; i++) {
      items.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
        type: 'star',
      });
    }
    // Sparkles (floating golden dust)
    for (let i = 40; i < 60; i++) {
      items.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        type: 'sparkle',
      });
    }
    // Orbs (soft glowing circles)
    for (let i = 60; i < 68; i++) {
      items.push({
        id: i,
        left: `${5 + Math.random() * 90}%`,
        top: `${5 + Math.random() * 90}%`,
        size: 40 + Math.random() * 80,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 6,
        type: 'orb',
      });
    }
    return items;
  }, []);

  return (
    <div className="shop-fairy-bg">
      {particles.map(p => {
        if (p.type === 'orb') {
          return (
            <div
              key={p.id}
              className="shop-orb"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                '--delay': `${p.delay}s`,
                '--duration': `${p.duration}s`,
              } as React.CSSProperties}
            />
          );
        }
        if (p.type === 'sparkle') {
          return (
            <div
              key={p.id}
              className="shop-sparkle"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                '--delay': `${p.delay}s`,
                '--duration': `${p.duration}s`,
              } as React.CSSProperties}
            />
          );
        }
        return (
          <div
            key={p.id}
            className="star text-white/60"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              '--delay': `${p.delay}s`,
              '--duration': `${p.duration}s`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}
