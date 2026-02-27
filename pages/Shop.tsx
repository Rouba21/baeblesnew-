import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Megaphone, Crown, Image, FileText, ShoppingCart, Store } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CollectionCard } from '@/components/shop/CollectionCard';
import { StarsBackground } from '@/components/shop/StarsBackground';
import { FilterTabs } from '@/components/common/FilterTabs';
import { collections, AvatarPack } from '@/components/shop/shopData';
import { usePurchasedAvatars } from '@/hooks/usePurchasedAvatars';
import { CreateCampaignModal, CampaignType } from '@/components/shop/CreateCampaignModal';
import { CartDrawer, CartItem } from '@/components/shop/CartDrawer';
import { toast } from '@/hooks/use-toast';

type ShopTab = 'avatars' | 'ads';
type GenderFilter = 'all' | 'female' | 'male' | 'non-binary';
type AdsTab = 'types' | 'campaigns';

export default function Shop() {
  const navigate = useNavigate();
  const [shopTab, setShopTab] = useState<ShopTab>('avatars');
  const [gender, setGender] = useState<GenderFilter>('all');
  const [adsTab, setAdsTab] = useState<AdsTab>('types');
  const { purchasedAvatars, addAvatarsFromPack } = usePurchasedAvatars();

  // Campaign modal
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [campaignType, setCampaignType] = useState<CampaignType>('header');

  // Cart state
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (c: typeof collections[0]) => {
    if (cartItems.some(item => item.id === c.id)) {
      toast({ title: 'Already in cart', description: `${c.name} is already in your cart.` });
      return;
    }
    setCartItems(prev => [...prev, {
      id: c.id,
      name: c.name,
      price: c.prices.small,
      avatarCount: c.avatars.length,
      icon: c.icon,
      gradient: c.gradient,
    }]);
    toast({ title: 'Added to cart', description: `${c.name} added to your cart.` });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    cartItems.forEach(item => {
      addAvatarsFromPack(item.id, item.name, item.avatarCount);
    });
    setCartItems([]);
    setCartOpen(false);
    toast({ title: 'Purchase complete!', description: 'Your new avatars are now available.' });
  };

  const shopTabs = [
    { id: 'avatars', label: 'Avatar Collections', icon: Sparkles },
    { id: 'ads', label: 'Advertising', icon: Megaphone },
  ];

  const genderTabs = [
    { id: 'all', label: 'All' },
    { id: 'female', label: 'Women' },
    { id: 'male', label: 'Men' },
    { id: 'non-binary', label: 'Non-Binary' },
  ];

  const filtered = gender === 'all'
    ? collections
    : collections.filter(c => c.gender === gender);

  const limited = collections.filter(c => c.isLimited);
  const regular = filtered.filter(c => !c.isLimited);

  function getProgress(collectionId: string) {
    return purchasedAvatars.filter(a => a.packId === collectionId).length;
  }

  const openCampaign = (type: CampaignType) => {
    setCampaignType(type);
    setCampaignModalOpen(true);
  };

  // Existing campaigns from localStorage
  const campaigns = JSON.parse(localStorage.getItem('baebles_campaigns') || '[]');

  return (
    <MainLayout>
      <StarsBackground />
      <div className="relative z-10 py-4 space-y-5">

        {/* Header — harmonized with other pages */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 sm:gap-3"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary/20 to-baebles-gold/15 flex items-center justify-center shadow-lg shrink-0">
            <Store className="w-4 h-4 sm:w-5 sm:h-5 text-baebles-gold" />
          </div>
          <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent flex-1">
            Shop
          </h1>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCartOpen(true)}
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-card/60 border border-border/40 flex items-center justify-center transition-colors hover:border-primary/30"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-baebles-gold text-background text-[10px] font-display flex items-center justify-center shadow-md">
                {cartItems.length}
              </span>
            )}
          </motion.button>
        </motion.div>

        {/* Shop Tabs: Avatars / Ads */}
        <FilterTabs
          tabs={shopTabs}
          activeTab={shopTab}
          onTabChange={(id) => setShopTab(id as ShopTab)}
          variant="badge"
        />

        {/* ═══════ AVATARS TAB ═══════ */}
        {shopTab === 'avatars' && (
          <motion.div
            key="avatars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            {/* Section intro */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="space-y-2.5 px-1"
            >
              <h3 className="font-display text-lg text-foreground tracking-wide">Avatar Collections</h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                Discover unique avatar packs for your fantasy profile.
              </p>
            </motion.div>

            {/* Gender filter */}
            <FilterTabs
              tabs={genderTabs}
              activeTab={gender}
              onTabChange={(id) => setGender(id as GenderFilter)}
            />

            {/* Limited Edition Hero Banner */}
            {limited.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-3"
              >
                {limited.map(c => (
                  <motion.div
                    key={c.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/shop/collection/${c.id}`)}
                    className="cursor-pointer rounded-2xl overflow-hidden border border-baebles-gold/40 relative group"
                    style={{
                      boxShadow: '0 4px 30px hsl(var(--baebles-gold) / 0.2), 0 0 60px hsl(var(--baebles-gold) / 0.1)',
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      {c.previewImage && (
                        <img
                          src={c.previewImage}
                          alt={c.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: 'linear-gradient(105deg, transparent 40%, hsl(var(--baebles-gold) / 0.5) 50%, transparent 60%)',
                          backgroundSize: '200% 100%',
                          animation: 'shimmer 3s ease-in-out infinite',
                        }}
                      />
                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-display text-white flex items-center gap-1.5 shadow-lg"
                            style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-gold)), hsl(var(--baebles-orange)))' }}
                          >
                            <Sparkles className="w-3 h-3" />
                            Limited Edition
                          </span>
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-display bg-white/15 backdrop-blur-sm text-white/90 flex items-center gap-1.5 border border-white/20">
                            <Clock className="w-3 h-3" />
                            {c.limitedDays} days left
                          </span>
                        </div>
                        <h3 className="font-display text-xl text-white tracking-wide mb-1">{c.name}</h3>
                        <p className="font-body text-xs text-white/70 leading-relaxed line-clamp-2 mb-3">{c.description}</p>
                        <div className="flex items-center gap-3">
                          <div
                            className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-sm text-white"
                            style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-gold)), hsl(var(--baebles-orange)))', boxShadow: '0 2px 12px hsl(var(--baebles-gold) / 0.4)' }}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            Explore Collection
                          </div>
                          <span className="font-display text-sm text-white/80">
                            From <span className="font-bold text-baebles-gold">€{c.prices.small.toFixed(2)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Collections Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-2 gap-3"
            >
              {regular.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <CollectionCard
                    id={c.id}
                    name={c.name}
                    race={c.race}
                    price={c.prices.small}
                    gradient={c.gradient}
                    previewImage={c.previewImage}
                    icon={c.icon}
                    progress={getProgress(c.id)}
                    total={c.avatars.length}
                    isLimited={c.isLimited}
                    onClick={() => navigate(`/shop/collection/${c.id}`)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* ═══════ ADS TAB ═══════ */}
        {shopTab === 'ads' && (
          <motion.div
            key="ads"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            {/* Section intro */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-1.5 px-1"
            >
              <h3 className="font-display text-lg text-foreground tracking-wide">Promote Your Content</h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                Boost your visibility with sponsored banners or in-feed posts.
              </p>
            </motion.div>

            {/* Ads sub-tabs */}
            <FilterTabs
              tabs={[
                { id: 'types', label: 'Campaign Types' },
                { id: 'campaigns', label: 'Your Campaigns' },
              ]}
              activeTab={adsTab}
              onTabChange={(id) => setAdsTab(id as AdsTab)}
            />

            {/* Campaign type cards */}
            {adsTab === 'types' && (
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openCampaign('header')}
                  className="rounded-2xl overflow-hidden border border-baebles-gold/30 bg-card/80 backdrop-blur-sm text-left transition-all hover:border-baebles-gold/50 group"
                  style={{ boxShadow: '0 2px 12px hsl(var(--baebles-gold) / 0.08)' }}
                >
                  <div className="h-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-baebles-purple/30 via-primary/15 to-baebles-gold/15" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image className="w-8 h-8 text-baebles-purple group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-display text-sm text-foreground tracking-wide mb-1">Header Banner</h4>
                    <p className="text-[10px] text-muted-foreground font-body leading-relaxed mb-2 line-clamp-2">
                      Top of the feed, in rotation with other banners.
                    </p>
                    <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-display text-white" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--baebles-gold)))' }}>
                      €1.00/day
                    </span>
                  </div>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openCampaign('in-feed')}
                  className="rounded-2xl overflow-hidden border border-baebles-gold/30 bg-card/80 backdrop-blur-sm text-left transition-all hover:border-baebles-gold/50 group"
                  style={{ boxShadow: '0 2px 12px hsl(var(--baebles-gold) / 0.08)' }}
                >
                  <div className="h-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-baebles-purple/15 to-baebles-gold/15" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-baebles-purple group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-display text-sm text-foreground tracking-wide mb-1">In-Feed Post</h4>
                    <p className="text-[10px] text-muted-foreground font-body leading-relaxed mb-2 line-clamp-2">
                      Blends naturally as a sponsored post.
                    </p>
                    <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-display text-white" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--baebles-gold)))' }}>
                      €0.50/day
                    </span>
                  </div>
                </motion.button>
              </div>
            )}

            {/* Your campaigns */}
            {adsTab === 'campaigns' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {campaigns.length > 0 ? (
                  <div className="space-y-2">
                    {campaigns.map((c: any) => (
                      <div key={c.id} className="rounded-xl border border-border/30 bg-card/60 p-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.1))' }}>
                          {c.type === 'header' ? <Image className="w-4 h-4 text-primary" /> : <FileText className="w-4 h-4 text-primary" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-sm text-foreground truncate">{c.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-muted-foreground capitalize font-body">{c.type}</span>
                            <span className="text-[10px] text-muted-foreground">·</span>
                            <span className={`text-[10px] font-display ${c.status === 'active' ? 'text-emerald-500' : 'text-baebles-gold'}`}>
                              {c.status}
                            </span>
                          </div>
                        </div>
                        <span className="font-display text-xs text-muted-foreground">
                          €{(c.totalCost || 0).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Crown className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="font-body text-sm text-muted-foreground">No campaigns yet</p>
                    <p className="font-body text-xs text-muted-foreground/60 mt-1">Create one from Campaign Types</p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Campaign creation modal */}
      <CreateCampaignModal
        isOpen={campaignModalOpen}
        onClose={() => setCampaignModalOpen(false)}
        type={campaignType}
      />

      {/* Cart drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </MainLayout>
  );
}
