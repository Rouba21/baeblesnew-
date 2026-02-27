import {
  Flower2, Flame, Moon, Dog, User, TreeDeciduous, Sun, Skull,
  Wand2, Waves, BookOpen, type LucideIcon
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Flower2, Flame, Moon, Dog, User, TreeDeciduous, Sun, Skull,
  Wand2, Waves, BookOpen,
};

interface RaceIconProps {
  icon: string;
  className?: string;
}

export function RaceIcon({ icon, className = 'w-5 h-5' }: RaceIconProps) {
  const IconComponent = ICON_MAP[icon];
  if (!IconComponent) return <User className={className} />;
  return <IconComponent className={className} />;
}
