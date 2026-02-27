import { ShoppingCart, Trash2, Sparkles } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  avatarCount: number;
  icon: LucideIcon;
  gradient: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, items, onRemoveItem, onCheckout }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full max-w-sm p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="p-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <span className="font-display text-lg">My Cart</span>
            <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs font-display">
              {items.length}
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingCart className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground font-body">Your cart is empty</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Add avatars to get started</p>
            </div>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border/50"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md shrink-0`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-sm text-foreground truncate">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.avatarCount} avatars</p>
                </div>

                {/* Price & Remove */}
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm text-primary">€{item.price.toFixed(2)}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRemoveItem(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground active:text-destructive active:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-border space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-body">Total</span>
              <span className="font-display text-xl text-baebles-gold">€{total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onCheckout}
              className="w-full py-3 rounded-xl font-display text-sm text-white flex items-center justify-center gap-2"
              style={{ 
                background: 'linear-gradient(135deg, hsl(var(--baebles-gold)), hsl(var(--baebles-orange)))',
                boxShadow: '0 4px 20px hsl(var(--baebles-gold) / 0.4)'
              }}
            >
              <Sparkles className="w-4 h-4" />
              Buy Now
            </motion.button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
