import { useMemo } from 'react';

export function StarBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${3 + Math.random() * 4}s`,
      delay: `${Math.random() * 3}s`,
      size: Math.random() > 0.85 ? 4 : Math.random() > 0.6 ? 3 : 2,
      // Add color variation
      color: Math.random() > 0.7 
        ? 'hsl(var(--baebles-gold))' 
        : Math.random() > 0.5 
          ? 'hsl(var(--primary) / 0.8)' 
          : 'hsl(45 50% 80%)',
    }));
  }, []);

  // Add some larger "sparkle" stars
  const sparkles = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      duration: `${4 + Math.random() * 3}s`,
      delay: `${Math.random() * 2}s`,
    }));
  }, []);

  return (
    <>
      {/* Gradient overlays for depth */}
      <div className="fixed inset-0 pointer-events-none z-0 dark:block hidden">
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(ellipse at 20% 20%, hsl(280 50% 20% / 0.4) 0%, transparent 50%)' 
        }} />
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(ellipse at 80% 70%, hsl(var(--baebles-gold) / 0.08) 0%, transparent 50%)' 
        }} />
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(ellipse at 50% 100%, hsl(var(--primary) / 0.1) 0%, transparent 40%)' 
        }} />
      </div>
      
      {/* Stars container */}
      <div className="stars-bg">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              background: star.color,
              '--duration': star.duration,
              '--delay': star.delay,
            } as React.CSSProperties}
          />
        ))}
        
        {/* Sparkle stars with glow */}
        {sparkles.map(sparkle => (
          <div
            key={`sparkle-${sparkle.id}`}
            className="absolute animate-twinkle"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              width: 6,
              height: 6,
              background: 'radial-gradient(circle, hsl(var(--baebles-gold)), transparent)',
              borderRadius: '50%',
              boxShadow: '0 0 10px hsl(var(--baebles-gold) / 0.6), 0 0 20px hsl(var(--baebles-gold) / 0.3)',
              animationDuration: sparkle.duration,
              animationDelay: sparkle.delay,
            }}
          />
        ))}
      </div>
    </>
  );
}
