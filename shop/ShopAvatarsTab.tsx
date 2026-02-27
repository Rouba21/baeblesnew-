import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, Clock, Moon, Snowflake, Flame, Crown, Skull, Flower2, TreeDeciduous,
} from 'lucide-react';
import { AvatarCard } from './AvatarCard';
import { AvatarPack } from './shopData';

interface ShopAvatarsTabProps {
  limitedPacks: AvatarPack[];
  vampirePacks: AvatarPack[];
  faePacks: AvatarPack[];
  isDisabled: (id: string) => boolean;
  getButtonLabel: (id: string) => string | null;
  onAddToCart: (pack: AvatarPack) => void;
  onSelectPack: (pack: AvatarPack) => void;
}

export function ShopAvatarsTab({
  limitedPacks,
  vampirePacks,
  faePacks,
  isDisabled,
  getButtonLabel,
  onAddToCart,
  onSelectPack,
}: ShopAvatarsTabProps) {
  const navigate = useNavigate();
  const limitedRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);

  const allPopular = [...vampirePacks, ...faePacks];

  return (
    <div className="space-y-8">

      {/* LIMITED RELEASE */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-baebles-orange to-baebles-gold rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-display text-white uppercase tracking-wider">Limited Release</span>
          </div>
          <div className="flex items-center gap-1 text-baebles-orange">
            <Clock className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          ref={limitedRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {limitedPacks.map((pack) => (
            <div key={pack.id} className="w-[180px] sm:w-[200px] shrink-0 snap-start">
              <AvatarCard
                id={pack.id}
                name={pack.name}
                avatarCount={pack.avatarCount}
                price={pack.price}
                icon={pack.icon}
                gradient={pack.gradient}
                previewImage={pack.previewImage}
                isLimited={pack.isLimited}
                limitedDays={pack.limitedDays}
                stock={pack.stock}
                isDisabled={isDisabled(pack.id)}
                buttonLabel={getButtonLabel(pack.id)}
                onAdd={() => onAddToCart(pack)}
                onClick={() => navigate(`/shop/collection/${pack.id}`)}
              />
            </div>
          ))}
        </div>
      </motion.section>

      {/* POPULAR COLLECTIONS */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-3 px-1">
          <Flower2 className="w-5 h-5 text-baebles-rose" />
          <h3 className="font-display text-base sm:text-lg text-foreground uppercase tracking-wider">
            Popular Collections
          </h3>
        </div>

        <div
          ref={popularRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {allPopular.map((pack) => (
            <div key={pack.id} className="w-[180px] sm:w-[200px] shrink-0 snap-start">
              <AvatarCard
                id={pack.id}
                name={pack.name}
                avatarCount={pack.avatarCount}
                price={pack.price}
                icon={pack.icon}
                gradient={pack.gradient}
                previewImage={pack.previewImage}
                isDisabled={isDisabled(pack.id)}
                buttonLabel={getButtonLabel(pack.id)}
                onAdd={() => onAddToCart(pack)}
                onClick={() => navigate(`/shop/collection/${pack.id}`)}
              />
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
