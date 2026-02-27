import { useState, useCallback, useEffect } from 'react';
import { UserOnboarding, FANTASY_NAME_PARTS } from '@/types/onboarding';

const STORAGE_KEY = 'baebles_onboarding';

const initialState: UserOnboarding = {
  agreedToGuidelines: false,
  intentions: [],
  race: '',
  gender: 'female',
  avatarId: '',
  fantasyName: '',
  favoriteSubgenres: [],
  favoriteTropes: [],
  favoriteAuthors: [],
  favoriteBooks: [],
};

export function useOnboarding() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<UserOnboarding>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return { ...initialState, ...parsed };
        } catch {
          return initialState;
        }
      }
    }
    return initialState;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = useCallback((updates: Partial<UserOnboarding>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    setStep(prev => Math.min(prev + 1, 7));
  }, []);

  const prevStep = useCallback(() => {
    setStep(prev => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((newStep: number) => {
    setStep(Math.max(1, Math.min(newStep, 7)));
  }, []);

  const generateFantasyName = useCallback(() => {
    const { prefixes, middles, surnames } = FANTASY_NAME_PARTS;
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const middle = middles[Math.floor(Math.random() * middles.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    return `${prefix}${middle} ${surname}`;
  }, []);

  const resetOnboarding = useCallback(() => {
    setData(initialState);
    setStep(1);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    step,
    data,
    updateData,
    nextStep,
    prevStep,
    goToStep,
    generateFantasyName,
    resetOnboarding,
  };
}
