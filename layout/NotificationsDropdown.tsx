import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { notifications, formatTimeAgo } from '@/data/mockData';

interface NotificationsDropdownProps {
  onClose: () => void;
}

const notificationIcons = {
  comment_reply: '💬',
  new_recommendation: '📚',
  followed_request: '🔔',
  new_follower: '👤',
  series_release: '📅',
};

export function NotificationsDropdown({ onClose }: NotificationsDropdownProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/50 z-50"
        onClick={onClose}
      />

      {/* Dropdown */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="fixed top-14 right-2 w-80 max-h-[70vh] bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-display text-lg text-primary">Notifications</h3>
          <div className="flex items-center gap-2">
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted/50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications list */}
        <div className="overflow-y-auto max-h-[calc(70vh-60px)]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification) => (
              <Link
                key={notification.id}
                to={notification.link}
                onClick={onClose}
                className={`flex items-start gap-3 p-4 border-b border-border hover:bg-muted/50 transition-colors ${
                  !notification.isRead ? 'bg-primary/5' : ''
                }`}
              >
                <span className="text-xl shrink-0">
                  {notificationIcons[notification.type]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body text-foreground">
                    {notification.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTimeAgo(notification.createdAt)}
                  </p>
                </div>
                {!notification.isRead && (
                  <div className="w-2 h-2 rounded-full bg-baebles-orange shrink-0 mt-1.5" />
                )}
              </Link>
            ))
          )}
        </div>
      </motion.div>
    </>
  );
}
