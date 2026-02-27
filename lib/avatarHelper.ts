import faeF1 from '@/assets/avatars/fae-female-1.png';
import classicVampire from '@/assets/avatars/preview-classic-vampire.jpg';
import goldenDragon from '@/assets/avatars/preview-golden-dragon.jpg';
import springFae from '@/assets/avatars/preview-spring-fae.jpg';
import wildGrove from '@/assets/avatars/preview-wild-grove.jpg';
import springBloom from '@/assets/avatars/preview-spring-bloom.jpg';
import nobleBlood from '@/assets/avatars/preview-noble-blood.jpg';
import shadowCourt from '@/assets/avatars/preview-shadow-court.jpg';
import moonlitCoven from '@/assets/avatars/preview-moonlit-coven.jpg';
import winterFae from '@/assets/avatars/preview-winter-fae.jpg';
import goldenFlame from '@/assets/avatars/preview-golden-flame.jpg';
import duskCourt from '@/assets/avatars/preview-dusk-court.jpg';

const AVATAR_MAP: Record<string, string> = {
  'fae-female-1': faeF1,
  'vampire-female-1': classicVampire,
  'dragon-rider-male-1': goldenDragon,
  'fae-female-2': springFae,
  'werewolf-male-1': wildGrove,
  'angel-female-1': springBloom,
  'demon-male-1': nobleBlood,
  'siren-female-1': shadowCourt,
  'witch-mage-male-1': moonlitCoven,
  'publisher-1': goldenFlame,
  'default': winterFae,
};

export function getAvatarUrl(avatarId: string): string {
  return AVATAR_MAP[avatarId] || AVATAR_MAP['default'];
}
