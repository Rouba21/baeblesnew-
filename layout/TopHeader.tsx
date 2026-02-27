import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, ShoppingBag, Settings, User, LogOut, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { notifications, currentUser } from '@/data/mockData';
import { NotificationsDropdown } from './NotificationsDropdown';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import baeblesLogo from '@/assets/baebles-logo.png';
import defaultAvatar from '@/assets/avatars/fae-female-1.png';

// Main nav pages that don't need a back button
const MAIN_PAGES = ['/feed', '/rooms', '/recommendations', '/new-releases', '/shop', '/activity'];

export function TopHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const location = useLocation();
  const navigate = useNavigate();
  
  const showBackButton = !MAIN_PAGES.includes(location.pathname);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/50">
        {/* Safe area padding at top */}
        <div className="h-[env(safe-area-inset-top)] bg-background/90" />
        <div className="flex items-center justify-between h-14 px-3 sm:px-4 max-w-lg mx-auto">
          {/* Left: Back button + Logo */}
          <div className="flex items-center gap-1">
            {showBackButton && (
              <motion.button
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (window.history.length > 2) {
                    navigate(-1);
                  } else {
                    navigate('/feed');
                  }
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full active:bg-muted/50 transition-colors -ml-1"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </motion.button>
            )}
            <Link to="/feed" className="touch-target flex items-center">
              <motion.img 
                src={baeblesLogo} 
                alt="Baebles" 
                className="h-7 sm:h-8 w-auto"
                whileTap={{ scale: 0.95 }}
              />
            </Link>
          </div>

          {/* Right icons - larger touch targets */}
          <div className="flex items-center gap-0">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-11 h-11 flex items-center justify-center rounded-full active:bg-muted/50 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-foreground" />
              {unreadCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 min-w-5 h-5 px-1 bg-baebles-orange text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            <Link
              to="/shop"
              className="w-11 h-11 flex items-center justify-center rounded-full active:bg-muted/50 transition-colors"
              aria-label="Shop"
            >
              <ShoppingBag className="w-5 h-5 text-foreground" />
            </Link>

            {/* Profile Avatar with Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-2" aria-label="Profile menu">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full ring-2 ring-baebles-gold/50 ring-offset-2 ring-offset-background overflow-hidden cursor-pointer"
                    style={{ boxShadow: '0 0 12px hsl(var(--baebles-gold) / 0.3)' }}
                  >
                    <img 
                      src={defaultAvatar} 
                      alt={currentUser.fantasyName}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-avatars" className="flex items-center gap-2 cursor-pointer">
                    <Crown className="w-4 h-4" />
                    My Avatars
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center gap-2 cursor-pointer text-muted-foreground">
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {showNotifications && (
          <NotificationsDropdown onClose={() => setShowNotifications(false)} />
        )}
      </AnimatePresence>

    </>
  );
}
