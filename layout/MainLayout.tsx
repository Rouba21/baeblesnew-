import { ReactNode } from 'react';
import { TopHeader } from './TopHeader';
import { BottomNav } from './BottomNav';
import { StarBackground } from '../onboarding/StarBackground';
import { ThemeToggle } from '../onboarding/ThemeToggle';
import { FeedbackButton } from '../feedback/FeedbackButton';

interface MainLayoutProps {
  children: ReactNode;
  showFAB?: ReactNode;
}

export function MainLayout({ children, showFAB }: MainLayoutProps) {
  return (
    <div className="min-h-[100dvh] relative overflow-x-hidden">
      <StarBackground />
      <ThemeToggle />
      <TopHeader />
      
      {/* Main content with safe area padding */}
      <main className="relative z-10 pt-[calc(3.5rem+env(safe-area-inset-top))] pb-[calc(5rem+env(safe-area-inset-bottom))] min-h-[100dvh]">
        <div className="w-full max-w-lg mx-auto px-4 sm:px-6">
          {children}
        </div>
      </main>

      {showFAB}
      <FeedbackButton />
      <BottomNav />
    </div>
  );
}
