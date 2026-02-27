import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Calendar, Image, Link2, Sparkles, Type, Eye, Heart, MessageCircle, Bookmark, ChevronRight, BookOpen, FileText, Plus, Star, Flame, Moon, Wand2, Crown, Shield } from 'lucide-react';
import { RaceIcon } from '@/components/common/RaceIcon';
import { getAvatarUrl } from '@/lib/avatarHelper';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { BookLinkPicker } from '@/components/common/BookLinkPicker';
import { BookLinkCard } from '@/components/common/BookLinkCard';
import { books, threads, formatTimeAgo } from '@/data/mockData';

export type CampaignType = 'header' | 'in-feed';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: CampaignType;
}

const CAMPAIGN_CONFIG = {
  header: {
    title: 'Header Banner',
    description: 'Appears at the top of the feed, in rotation with other banners',
    price: 1.00,
    dimensions: '1200 x 300 px',
  },
  'in-feed': {
    title: 'In-Feed Post',
    description: 'Displayed as a sponsored post in the feed',
    price: 0.50,
    dimensions: 'Standard post format',
  },
};

const ICON_OPTIONS = [
  { name: 'BookOpen', icon: BookOpen },
  { name: 'Sparkles', icon: Sparkles },
  { name: 'Flame', icon: Flame },
  { name: 'Heart', icon: Heart },
  { name: 'Star', icon: Star },
  { name: 'Moon', icon: Moon },
  { name: 'Wand2', icon: Wand2 },
  { name: 'Crown', icon: Crown },
  { name: 'Shield', icon: Shield },
  { name: 'Eye', icon: Eye },
  { name: 'FileText', icon: FileText },
  { name: 'Plus', icon: Plus },
];

export function CreateCampaignModal({ isOpen, onClose, type }: CreateCampaignModalProps) {
  const [step, setStep] = useState(1);
  const [postMode, setPostMode] = useState<'new' | 'existing'>('new');
  const [selectedThreadId, setSelectedThreadId] = useState('');
  const [visualType, setVisualType] = useState<'image' | 'emoji'>('emoji');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetUrl: '',
    imageUrl: '',
    emoji: 'BookOpen',
    authorName: '',
    bookId: '',
    startDate: '',
    duration: 7,
  });

  const config = CAMPAIGN_CONFIG[type];
  const selectedBook = formData.bookId ? books.find(b => b.id === formData.bookId) : null;
  const selectedThread = selectedThreadId ? threads.find(t => t.id === selectedThreadId) : null;
  
  const userThreads = threads.slice(0, 5);

  const handleSubmit = () => {
    if (!formData.title || !formData.targetUrl) {
      toast({
        title: "Required fields",
        description: "Please fill in the title and destination URL.",
        variant: "destructive",
      });
      return;
    }

    const campaigns = JSON.parse(localStorage.getItem('baebles_campaigns') || '[]');
    const newCampaign = {
      id: `campaign-${Date.now()}`,
      type,
      visualType,
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      totalCost: config.price * formData.duration,
    };
    campaigns.push(newCampaign);
    localStorage.setItem('baebles_campaigns', JSON.stringify(campaigns));

    toast({
      title: "Campaign created",
      description: `Your ${config.title} will be reviewed within 24h.`,
    });

    setFormData({
      title: '',
      description: '',
      targetUrl: '',
      imageUrl: '',
      emoji: 'BookOpen',
      authorName: '',
      bookId: '',
      startDate: '',
      duration: 7,
    });
    setStep(1);
    setPostMode('new');
    setSelectedThreadId('');
    setVisualType('emoji');
    onClose();
  };

  const totalCost = config.price * formData.duration;

  /* ── Step indicator ── */
  const StepIndicator = () => (
    <div className="flex items-center gap-2 justify-center mb-2">
      {[1, 2].map(s => (
        <div
          key={s}
          className={`h-1.5 rounded-full transition-all ${
            s === step ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/20'
          }`}
        />
      ))}
    </div>
  );

  /* ── Option card (reusable for visual type / post mode selection) ── */
  const OptionCard = ({ selected, onClick, icon: Icon, label }: {
    selected: boolean;
    onClick: () => void;
    icon: React.ElementType;
    label: string;
  }) => (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`p-3.5 rounded-xl flex flex-col items-center gap-2 transition-all border ${
        selected
          ? 'border-primary/40 shadow-sm'
          : 'border-border/40 hover:border-border/60'
      }`}
      style={selected ? {
        background: 'linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--baebles-purple) / 0.08))'
      } : {
        background: 'hsl(var(--muted) / 0.4)'
      }}
    >
      <Icon className={`w-5 h-5 ${selected ? 'text-primary' : 'text-muted-foreground'}`} />
      <span className={`text-xs font-display ${selected ? 'text-primary' : 'text-muted-foreground'}`}>{label}</span>
    </motion.button>
  );

  /* ── Label ── */
  const Label = ({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ElementType }) => (
    <label className="text-xs font-display text-muted-foreground mb-2 flex items-center gap-1.5">
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </label>
  );

  const renderPreview = () => {
    if (type === 'header') {
      return (
        <div className="relative w-full aspect-[2.5/1] rounded-2xl overflow-hidden shadow-lg">
          {visualType === 'image' && formData.imageUrl ? (
            <img src={formData.imageUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-baebles-purple via-primary/80 to-baebles-gold/40" />
          )}
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-2 right-4 text-white/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <RaceIcon icon={formData.emoji} className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <p className="text-white/70 text-[10px] font-display uppercase tracking-wider">
                  Sponsored
                </p>
                <h3 className="text-white font-display text-sm drop-shadow-lg">
                  {formData.title || 'Your banner title'}
                </h3>
                {formData.description && (
                  <p className="text-white/80 text-[10px] mt-0.5 font-body">{formData.description}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-white/80 text-xs font-display">
              <span>View</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            <div className="h-1.5 w-4 rounded-full bg-white" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
          </div>
        </div>
      );
    }

    if (postMode === 'existing' && selectedThread) {
      return (
        <div className="rounded-xl border border-border/40 bg-card/60 p-3.5">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20 shrink-0">
              <img src={getAvatarUrl(selectedThread.author.avatarId)} alt={selectedThread.author.fantasyName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm text-foreground truncate">
                  {selectedThread.author.fantasyName}
                </span>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-muted-foreground text-xs font-body">{formatTimeAgo(selectedThread.createdAt)}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-baebles-gold/15 text-baebles-gold text-[10px] font-display mt-0.5 inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Sponsored
              </span>
            </div>
          </div>

          <p className="font-body text-sm text-foreground/90 mb-3 leading-relaxed line-clamp-3">
            {selectedThread.content}
          </p>

          {selectedThread.book && (
            <div className="mb-3">
              <BookLinkCard book={selectedThread.book} showTbrButton={false} />
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-border/40">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Heart className="w-4 h-4" />
                <span className="text-xs font-body">24</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs font-body">{selectedThread.commentsCount}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Bookmark className="w-4 h-4" />
              <span className="text-xs font-body">Save</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-xl border border-border/40 bg-card/60 p-3.5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center text-lg shrink-0 ring-2 ring-primary/20">
            {visualType === 'image' && formData.imageUrl ? (
              <img src={formData.imageUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <RaceIcon icon={formData.emoji} className="w-5 h-5 text-primary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm text-foreground truncate">
                {formData.authorName || 'Author name'}
              </span>
              <span className="text-muted-foreground text-xs">•</span>
              <span className="text-muted-foreground text-xs font-body">now</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-baebles-gold/15 text-baebles-gold text-[10px] font-display mt-0.5 inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Sponsored
            </span>
          </div>
        </div>

        <p className="font-body text-sm text-foreground/90 mb-3 leading-relaxed">
          {formData.title || 'Your sponsored post content...'}
        </p>
        
        {formData.description && (
          <p className="text-xs text-muted-foreground font-body mb-3">{formData.description}</p>
        )}

        {selectedBook && (
          <div className="mb-3">
            <BookLinkCard book={selectedBook} showTbrButton={false} />
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-border/40">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Heart className="w-4 h-4" />
              <span className="text-xs font-body">24</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-body">8</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Bookmark className="w-4 h-4" />
            <span className="text-xs font-body">Save</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden max-h-[85vh] overflow-y-auto bg-background border-border/50 rounded-2xl sm:rounded-3xl">
        {/* Header */}
        <DialogHeader className="p-5 pb-4 border-b border-border/40 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
          <DialogTitle className="flex items-center gap-2.5 font-display text-base">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-baebles-gold/15 flex items-center justify-center shadow-sm">
              {type === 'header' ? <Image className="w-4 h-4 text-baebles-gold" /> : <FileText className="w-4 h-4 text-baebles-gold" />}
            </div>
            Create {config.title}
          </DialogTitle>
          <StepIndicator />
        </DialogHeader>

        <div className="p-5 space-y-4">
          {/* Campaign Info */}
          <div className="p-3 rounded-xl border border-border/30 bg-card/60">
            <p className="text-xs text-muted-foreground font-body leading-relaxed">{config.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] text-muted-foreground font-body">{config.dimensions}</span>
              <span className="font-display text-xs text-primary">€{config.price.toFixed(2)}/day</span>
            </div>
          </div>

          {/* ═══ STEP 1: IN-FEED ═══ */}
          {step === 1 && type === 'in-feed' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Post Mode */}
              <div>
                <Label>Post type</Label>
                <div className="grid grid-cols-2 gap-2">
                  <OptionCard selected={postMode === 'new'} onClick={() => { setPostMode('new'); setSelectedThreadId(''); }} icon={Plus} label="New post" />
                  <OptionCard selected={postMode === 'existing'} onClick={() => setPostMode('existing')} icon={FileText} label="Existing post" />
                </div>
              </div>

              {/* Existing Post Selection */}
              {postMode === 'existing' && (
                <div>
                  <Label>Choose one of your posts</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {userThreads.map((thread) => (
                      <motion.button
                        key={thread.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedThreadId(thread.id)}
                        className={`w-full p-3 rounded-xl text-left transition-all border ${
                          selectedThreadId === thread.id
                            ? 'border-primary/40'
                            : 'border-border/30 hover:border-border/50'
                        }`}
                        style={selectedThreadId === thread.id ? {
                          background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--baebles-purple) / 0.06))'
                        } : {
                          background: 'hsl(var(--muted) / 0.3)'
                        }}
                      >
                        <div className="flex items-start gap-2">
                          <img src={getAvatarUrl(thread.author.avatarId)} alt="" className="w-4 h-4 rounded-full object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-body text-foreground line-clamp-2">{thread.content}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-muted-foreground font-body">#{thread.roomName}</span>
                              <span className="text-[10px] text-muted-foreground">•</span>
                              <span className="text-[10px] text-muted-foreground font-body">{formatTimeAgo(thread.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* New post options */}
              {postMode === 'new' && (
                <>
                  {/* Visual Type */}
                  <div>
                    <Label>Visual type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <OptionCard selected={visualType === 'emoji'} onClick={() => setVisualType('emoji')} icon={Type} label="Icon" />
                      <OptionCard selected={visualType === 'image'} onClick={() => setVisualType('image')} icon={Image} label="Image" />
                    </div>
                  </div>

                  {/* Icon Selection */}
                  {visualType === 'emoji' && (
                    <div>
                      <Label>Choose an icon</Label>
                      <div className="grid grid-cols-6 gap-2">
                        {ICON_OPTIONS.map((opt) => {
                          const IconComp = opt.icon;
                          return (
                            <motion.button
                              key={opt.name}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setFormData(prev => ({ ...prev, emoji: opt.name }))}
                              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
                                formData.emoji === opt.name
                                  ? 'border-primary/40 shadow-sm'
                                  : 'border-border/30 hover:border-border/50'
                              }`}
                              style={formData.emoji === opt.name ? {
                                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--baebles-purple) / 0.08))'
                              } : {
                                background: 'hsl(var(--muted) / 0.4)'
                              }}
                            >
                              <IconComp className={`w-5 h-5 ${formData.emoji === opt.name ? 'text-primary' : 'text-muted-foreground'}`} />
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Image URL */}
                  {visualType === 'image' && (
                    <div>
                      <Label icon={Image}>Image URL</Label>
                      <div className="border-2 border-dashed border-border/40 rounded-xl p-4 text-center cursor-pointer hover:border-primary/30 transition-colors mb-2">
                        <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                        <p className="text-[10px] text-muted-foreground font-body">
                          Drag an image or paste a URL
                        </p>
                      </div>
                      <Input
                        value={formData.imageUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="https://..."
                        className="bg-card/60 border-border/30"
                      />
                    </div>
                  )}

                  {/* Author Name */}
                  <div>
                    <Label>Display name</Label>
                    <Input
                      value={formData.authorName}
                      onChange={(e) => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
                      placeholder="Ex: Fantasy Editions"
                      className="bg-card/60 border-border/30"
                    />
                  </div>

                  {/* Post content */}
                  <div>
                    <Label>Post content *</Label>
                    <Textarea
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Discover our new novel..."
                      className="bg-card/60 border-border/30 min-h-[60px]"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Label>Additional description (optional)</Label>
                    <Input
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Short description..."
                      className="bg-card/60 border-border/30"
                    />
                  </div>

                  {/* Book Link */}
                  <div>
                    <Label icon={BookOpen}>Attach a book (optional)</Label>
                    <BookLinkPicker
                      selectedBookId={formData.bookId}
                      onSelectBook={(bookId) => setFormData(prev => ({ ...prev, bookId }))}
                      onClear={() => setFormData(prev => ({ ...prev, bookId: '' }))}
                      showToggleButton={false}
                      variant="inline"
                      placeholder="Search for a book..."
                    />
                  </div>
                </>
              )}

              {/* Target URL */}
              <div>
                <Label icon={Link2}>Destination URL *</Label>
                <Input
                  value={formData.targetUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetUrl: e.target.value }))}
                  placeholder="https://..."
                  className="bg-card/60 border-border/30"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(2)}
                disabled={postMode === 'existing' && !selectedThreadId}
                className="w-full py-3 rounded-xl font-display text-sm text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                  boxShadow: '0 2px 12px hsl(var(--primary) / 0.3)'
                }}
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {/* ═══ STEP 1: HEADER ═══ */}
          {step === 1 && type === 'header' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Visual Type */}
              <div>
                <Label>Visual type</Label>
                <div className="grid grid-cols-2 gap-2">
                  <OptionCard selected={visualType === 'emoji'} onClick={() => setVisualType('emoji')} icon={Type} label="Emoji" />
                <OptionCard selected={visualType === 'emoji'} onClick={() => setVisualType('emoji')} icon={Type} label="Icon" />
                <OptionCard selected={visualType === 'image'} onClick={() => setVisualType('image')} icon={Image} label="Image" />
                </div>
              </div>

              {/* Icon Selection */}
              {visualType === 'emoji' && (
                <div>
                  <Label>Choose an icon</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {ICON_OPTIONS.map((opt) => {
                      const IconComp = opt.icon;
                      return (
                        <motion.button
                          key={opt.name}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setFormData(prev => ({ ...prev, emoji: opt.name }))}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
                            formData.emoji === opt.name
                              ? 'border-primary/40 shadow-sm'
                              : 'border-border/30 hover:border-border/50'
                          }`}
                          style={formData.emoji === opt.name ? {
                            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--baebles-purple) / 0.08))'
                          } : {
                            background: 'hsl(var(--muted) / 0.4)'
                          }}
                        >
                          <IconComp className={`w-5 h-5 ${formData.emoji === opt.name ? 'text-primary' : 'text-muted-foreground'}`} />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Image URL */}
              {visualType === 'image' && (
                <div>
                  <Label icon={Image}>Image URL</Label>
                  <div className="border-2 border-dashed border-border/40 rounded-xl p-4 text-center cursor-pointer hover:border-primary/30 transition-colors mb-2">
                    <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-[10px] text-muted-foreground font-body">
                      Drag an image or paste a URL
                    </p>
                  </div>
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://..."
                    className="bg-card/60 border-border/30"
                  />
                </div>
              )}

              {/* Title */}
              <div>
                <Label>Title *</Label>
                <Textarea
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: New book available!"
                  className="bg-card/60 border-border/30 min-h-[60px]"
                />
              </div>

              {/* Description */}
              <div>
                <Label>Description (optional)</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Short description..."
                  className="bg-card/60 border-border/30"
                />
              </div>

              {/* Target URL */}
              <div>
                <Label icon={Link2}>Destination URL *</Label>
                <Input
                  value={formData.targetUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetUrl: e.target.value }))}
                  placeholder="https://..."
                  className="bg-card/60 border-border/30"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-xl font-display text-sm text-primary-foreground flex items-center justify-center gap-2 transition-all"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                  boxShadow: '0 2px 12px hsl(var(--primary) / 0.3)'
                }}
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {/* ═══ STEP 2: PREVIEW & SCHEDULING ═══ */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Preview */}
              <div>
                <Label icon={Eye}>Preview</Label>
                {renderPreview()}
              </div>

              {/* Start Date */}
              <div>
                <Label icon={Calendar}>Start date</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="bg-card/60 border-border/30"
                />
              </div>

              {/* Duration */}
              <div>
                <Label>Duration (days)</Label>
                <div className="flex gap-2">
                  {[3, 7, 14, 30].map((days) => (
                    <motion.button
                      key={days}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData(prev => ({ ...prev, duration: days }))}
                      className={`flex-1 py-2.5 rounded-xl font-display text-sm transition-all border ${
                        formData.duration === days
                          ? 'text-primary-foreground border-transparent'
                          : 'text-muted-foreground border-border/30'
                      }`}
                      style={formData.duration === days ? {
                        background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                      } : {
                        background: 'hsl(var(--muted) / 0.4)'
                      }}
                    >
                      {days}d
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-xl border border-baebles-gold/20 bg-card/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-body">Duration</span>
                  <span className="font-display text-xs">{formData.duration} days</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-body">Price / day</span>
                  <span className="font-display text-xs">€{config.price.toFixed(2)}</span>
                </div>
                <div className="border-t border-border/30 pt-2 mt-2 flex items-center justify-between">
                  <span className="font-display text-sm">Total</span>
                  <span className="font-display text-lg text-baebles-gold">€{totalCost.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl font-display text-sm text-muted-foreground border border-border/30 bg-card/60 transition-all"
                >
                  ← Back
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="flex-1 py-3 rounded-xl font-display text-sm text-white flex items-center justify-center gap-2 transition-all"
                  style={{ 
                    background: 'linear-gradient(135deg, hsl(var(--baebles-gold)), hsl(var(--baebles-orange)))',
                    boxShadow: '0 4px 20px hsl(var(--baebles-gold) / 0.4)'
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  Create
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
