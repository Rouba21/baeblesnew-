import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { AvatarChangeModal } from '@/components/profile/AvatarChangeModal';
import { ChevronLeft, ChevronRight, User, Image, Pencil, Heart, Eye, Lock, Trash2, LogOut, Settings as SettingsIcon, Sun, Moon, Monitor, Sparkles, BookOpen } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { useTheme, ThemeMode } from '@/hooks/useTheme';

export default function Settings() {
  const navigate = useNavigate();
  const { themeMode, setThemeMode } = useTheme();
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  
  // Privacy toggles state
  const [privacySettings, setPrivacySettings] = useState({
    profileCard: true,
    threads: true,
    tbr: true,
    reco: false,
    followedSeries: true,
  });

  const privacyLabels: Record<keyof typeof privacySettings, string> = {
    profileCard: 'Profile Card',
    threads: 'Threads',
    tbr: 'TBR',
    reco: 'Reco Requests',
    followedSeries: 'Followed Series',
  };

  const handlePrivacyToggle = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast({
      title: "Settings Updated",
      description: `${privacyLabels[key]} visibility changed to ${!privacySettings[key] ? 'Public' : 'Private'}`,
    });
  };

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    const labels = { auto: 'Automatic', dark: 'Dark', light: 'Light' };
    toast({
      title: "Theme Updated",
      description: `Theme changed to ${labels[mode]}`,
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  const handleAvatarChange = (avatarId: string) => {
    // Save to localStorage
    const saved = localStorage.getItem('baebles_onboarding');
    const data = saved ? JSON.parse(saved) : {};
    localStorage.setItem('baebles_onboarding', JSON.stringify({
      ...data,
      avatarId
    }));
    toast({
      title: "Avatar Updated",
      description: "Your avatar has been changed successfully.",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      <div className="py-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 sm:gap-3 mb-6"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary/30 to-baebles-purple/20 flex items-center justify-center shadow-lg shrink-0" style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' }}>
            <SettingsIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <h1 className="font-display text-xl sm:text-2xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent">Settings</h1>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* PROFILE Section */}
          <motion.div variants={itemVariants} className="baebles-card-simple p-5">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h3 className="font-display text-base sm:text-lg text-primary uppercase tracking-wider">Profile</h3>
            </div>
            <div className="space-y-2">
              <button 
                onClick={() => navigate('/edit-race')}
                className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted rounded-xl transition-colors min-h-[52px] group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-baebles-gold/15 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-baebles-gold" />
                  </div>
                  <span className="font-body text-sm text-foreground">Change Race & Avatar</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
              
              <button 
                onClick={() => navigate('/edit-name')}
                className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted rounded-xl transition-colors min-h-[52px] group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-baebles-gold/30 to-baebles-orange/20 flex items-center justify-center">
                    <Pencil className="w-4 h-4 text-baebles-gold" />
                  </div>
                  <span className="font-body text-sm text-foreground">Change Name</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
              
              <button 
                onClick={() => navigate('/edit-tastes')}
                className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted rounded-xl transition-colors min-h-[52px] group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/30 to-baebles-teal/20 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-body text-sm text-foreground">Edit Tastes</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
              
              <button 
                onClick={() => navigate('/edit-favorites')}
                className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted rounded-xl transition-colors min-h-[52px] group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-baebles-rose/30 to-primary/20 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-baebles-rose" />
                  </div>
                  <span className="font-body text-sm text-foreground">Edit Favorites</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            </div>
          </motion.div>

          {/* APPEARANCE Section */}
          <motion.div variants={itemVariants} className="baebles-card-simple p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sun className="w-5 h-5 text-primary" />
              <h3 className="font-display text-base sm:text-lg text-primary uppercase tracking-wider">Appearance</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Choose your preferred theme</p>
            
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => handleThemeChange('auto')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all min-h-[80px] ${
                  themeMode === 'auto' 
                    ? 'bg-primary/20 border-2 border-primary' 
                    : 'bg-muted/50 border-2 border-transparent hover:bg-muted'
                }`}
              >
                <Monitor className={`w-5 h-5 ${themeMode === 'auto' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-xs font-display ${themeMode === 'auto' ? 'text-primary' : 'text-muted-foreground'}`}>Auto</span>
              </button>
              
              <button 
                onClick={() => handleThemeChange('light')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all min-h-[80px] ${
                  themeMode === 'light' 
                    ? 'bg-primary/20 border-2 border-primary' 
                    : 'bg-muted/50 border-2 border-transparent hover:bg-muted'
                }`}
              >
                <Sun className={`w-5 h-5 ${themeMode === 'light' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-xs font-display ${themeMode === 'light' ? 'text-primary' : 'text-muted-foreground'}`}>Light</span>
              </button>
              
              <button 
                onClick={() => handleThemeChange('dark')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all min-h-[80px] ${
                  themeMode === 'dark' 
                    ? 'bg-primary/20 border-2 border-primary' 
                    : 'bg-muted/50 border-2 border-transparent hover:bg-muted'
                }`}
              >
                <Moon className={`w-5 h-5 ${themeMode === 'dark' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-xs font-display ${themeMode === 'dark' ? 'text-primary' : 'text-muted-foreground'}`}>Dark</span>
              </button>
            </div>
          </motion.div>

          {/* PRIVACY Section */}
          <motion.div variants={itemVariants} className="baebles-card-simple p-5">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-primary" />
              <h3 className="font-display text-base sm:text-lg text-primary uppercase tracking-wider">Privacy</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Control what others can see on your profile</p>
            
            <div className="space-y-3">
              {/* Profile Card Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl min-h-[52px]">
                <div className="flex items-center gap-3">
                  <span className="font-body text-sm text-foreground">Profile Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-display ${privacySettings.profileCard ? 'text-baebles-purple' : 'text-muted-foreground'}`}>
                    {privacySettings.profileCard ? 'Public' : 'Private'}
                  </span>
                  <Switch 
                    checked={privacySettings.profileCard}
                    onCheckedChange={() => handlePrivacyToggle('profileCard')}
                  />
                </div>
              </div>

              {/* Threads Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl min-h-[52px]">
                <div className="flex items-center gap-3">
                  <span className="font-body text-sm text-foreground">Threads</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-display ${privacySettings.threads ? 'text-baebles-purple' : 'text-muted-foreground'}`}>
                    {privacySettings.threads ? 'Public' : 'Private'}
                  </span>
                  <Switch 
                    checked={privacySettings.threads}
                    onCheckedChange={() => handlePrivacyToggle('threads')}
                  />
                </div>
              </div>

              {/* TBR Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl min-h-[52px]">
                <div className="flex items-center gap-3">
                  <span className="font-body text-sm text-foreground">TBR</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-display ${privacySettings.tbr ? 'text-baebles-purple' : 'text-muted-foreground'}`}>
                    {privacySettings.tbr ? 'Public' : 'Private'}
                  </span>
                  <Switch 
                    checked={privacySettings.tbr}
                    onCheckedChange={() => handlePrivacyToggle('tbr')}
                  />
                </div>
              </div>

              {/* Reco Requests Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl min-h-[52px]">
                <div className="flex items-center gap-3">
                  <span className="font-body text-sm text-foreground">Reco Requests</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-display ${privacySettings.reco ? 'text-baebles-purple' : 'text-muted-foreground'}`}>
                    {privacySettings.reco ? 'Public' : 'Private'}
                  </span>
                  <Switch 
                    checked={privacySettings.reco}
                    onCheckedChange={() => handlePrivacyToggle('reco')}
                  />
                </div>
              </div>

              {/* Followed Series Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl min-h-[52px]">
                <div className="flex items-center gap-3">
                  <span className="font-body text-sm text-foreground">Followed Series</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-display ${privacySettings.followedSeries ? 'text-baebles-purple' : 'text-muted-foreground'}`}>
                    {privacySettings.followedSeries ? 'Public' : 'Private'}
                  </span>
                  <Switch 
                    checked={privacySettings.followedSeries}
                    onCheckedChange={() => handlePrivacyToggle('followedSeries')}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ACCOUNT Section */}
          <motion.div variants={itemVariants} className="baebles-card-simple p-5">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-primary" />
              <h3 className="font-display text-base sm:text-lg text-primary uppercase tracking-wider">Account</h3>
            </div>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted rounded-xl transition-colors min-h-[52px] group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-baebles-orange/30 to-baebles-gold/20 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-baebles-orange" />
                  </div>
                  <span className="font-body text-sm text-foreground">Change Password</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 bg-destructive/10 hover:bg-destructive/20 rounded-xl transition-colors min-h-[52px] group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-destructive/20 flex items-center justify-center">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="font-body text-sm text-destructive">Delete Account</span>
                </div>
                <ChevronRight className="w-4 h-4 text-destructive/50 group-hover:text-destructive transition-colors" />
              </button>
            </div>
          </motion.div>

          {/* LOG OUT Button */}
          <motion.div variants={itemVariants}>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-4 baebles-card-simple hover:bg-muted/50 rounded-2xl transition-colors min-h-[52px]"
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
              <span className="font-display text-sm text-muted-foreground">Log Out</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Avatar Change Modal */}
        <AvatarChangeModal
          isOpen={avatarModalOpen}
          onClose={() => setAvatarModalOpen(false)}
          onAvatarChange={handleAvatarChange}
        />
      </div>
    </MainLayout>
  );
}
