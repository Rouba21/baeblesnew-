import { useState } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { BannerCarousel } from '@/components/feed/BannerCarousel';
import { ThreadCard } from '@/components/feed/ThreadCard';
import { CreateThreadModal } from '@/components/feed/CreateThreadModal';
import { SponsoredBookPost } from '@/components/feed/SponsoredBookPost';
import { ForYouFeed } from '@/components/feed/ForYouFeed';
import { FilterTabs } from '@/components/common/FilterTabs';
import { threads } from '@/data/mockData';
import { Plus, Feather, Sparkles, Globe } from 'lucide-react';

export default function Feed() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [feedTab, setFeedTab] = useState<'discover' | 'foryou'>('discover');

  return (
    <MainLayout>
      <div className="py-4">
        {/* Header with Post button */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-3 mb-5"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary/30 to-baebles-purple/20 flex items-center justify-center shadow-lg shrink-0" style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' }}>
              <Feather className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent">Feed</h1>
          </div>
          <motion.button 
            onClick={() => setIsCreateOpen(true)}
            className="baebles-btn-primary text-[10px] sm:text-xs px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-1 sm:gap-1.5 shrink-0"
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Post
          </motion.button>
        </motion.div>

        {/* Feed Tabs */}
        <FilterTabs
          tabs={[
            { id: 'discover', label: 'Discover', icon: Globe },
            { id: 'foryou', label: 'For You', icon: Sparkles },
          ]}
          activeTab={feedTab}
          onTabChange={(id) => setFeedTab(id as 'discover' | 'foryou')}
          variant="badge"
        />

        {/* Feed Content */}
        {feedTab === 'discover' ? (
          <>
            <BannerCarousel />
            <div className="space-y-4">
              {threads.slice(0, 3).map((thread) => (
                <ThreadCard key={thread.id} thread={thread} />
              ))}
              
              {/* Sponsored Book Post */}
              <SponsoredBookPost />
              
              {threads.slice(3).map((thread) => (
                <ThreadCard key={thread.id} thread={thread} />
              ))}
            </div>
          </>
        ) : (
          <ForYouFeed />
        )}
      </div>

      {/* Create Thread Modal */}
      {isCreateOpen && (
        <CreateThreadModal onClose={() => setIsCreateOpen(false)} />
      )}
    </MainLayout>
  );
}
