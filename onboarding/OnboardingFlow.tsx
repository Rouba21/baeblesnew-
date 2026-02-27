import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '@/hooks/useOnboarding';
import { ThemeToggle } from './ThemeToggle';
import { ProgressBar } from './ProgressBar';
import { StarBackground } from './StarBackground';
import { Step1Guidelines } from './steps/Step1Guidelines';
import { Step2Intentions } from './steps/Step2Intentions';
import { Step3RaceAvatar } from './steps/Step3RaceAvatar';
import { Step4FantasyName } from './steps/Step4FantasyName';
import { Step5Tastes } from './steps/Step5Tastes';
import { Step6Favorites } from './steps/Step6Favorites';
import { Step7Complete } from './steps/Step7Complete';

const pageVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  }),
};

export function OnboardingFlow() {
  const {
    step,
    data,
    updateData,
    nextStep,
    prevStep,
    generateFantasyName,
    resetOnboarding,
  } = useOnboarding();

  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    nextStep();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevStep();
  };

  const navigate = useNavigate();

  const handleComplete = () => {
    console.log('Onboarding complete!', data);
    navigate('/feed');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Guidelines
            key="step1"
            onAgree={() => {
              updateData({ agreedToGuidelines: true });
              handleNext();
            }}
          />
        );
      case 2:
        return (
          <Step2Intentions
            key="step2"
            selected={data.intentions}
            onSelect={(intentions) => updateData({ intentions: intentions as any })}
            onBack={handlePrev}
            onContinue={handleNext}
          />
        );
      case 3:
        return (
          <Step3RaceAvatar
            key="step3"
            race={data.race}
            gender={data.gender}
            avatarId={data.avatarId}
            onRaceChange={(race) => updateData({ race, avatarId: '' })}
            onGenderChange={(gender) => updateData({ gender: gender as any, avatarId: '' })}
            onAvatarChange={(avatarId) => updateData({ avatarId })}
            onBack={handlePrev}
            onContinue={handleNext}
          />
        );
      case 4:
        return (
          <Step4FantasyName
            key="step4"
            name={data.fantasyName}
            onGenerate={generateFantasyName}
            onAccept={(fantasyName) => {
              updateData({ fantasyName });
              handleNext();
            }}
            onBack={handlePrev}
          />
        );
      case 5:
        return (
          <Step5Tastes
            key="step5"
            subgenres={data.favoriteSubgenres}
            tropes={data.favoriteTropes}
            onSubgenresChange={(favoriteSubgenres) => updateData({ favoriteSubgenres })}
            onTropesChange={(favoriteTropes) => updateData({ favoriteTropes })}
            onBack={handlePrev}
            onContinue={handleNext}
          />
        );
      case 6:
        return (
          <Step6Favorites
            key="step6"
            authors={data.favoriteAuthors}
            books={data.favoriteBooks}
            onAuthorsChange={(favoriteAuthors) => updateData({ favoriteAuthors })}
            onBooksChange={(favoriteBooks) => updateData({ favoriteBooks })}
            onBack={handlePrev}
            onContinue={handleNext}
          />
        );
      case 7:
        return (
          <Step7Complete
            key="step7"
            data={data}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground />
      <ThemeToggle />

      <div className="relative z-10 min-h-screen flex flex-col px-4 py-6 safe-area-inset">
        <div className="w-full max-w-lg mx-auto flex-1 flex flex-col">
          {step < 7 && <ProgressBar currentStep={step} />}

          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
