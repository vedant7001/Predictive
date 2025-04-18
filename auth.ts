import { User } from '~/types';

const STORAGE_KEY = 'patient-care-auth';

// Client-side only functions
export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (e) {
    return null;
  }
};

export const storeUser = (user: User) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const removeStoredUser = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!getStoredUser();
};

export const isDoctor = (): boolean => {
  if (typeof window === 'undefined') return false;
  const user = getStoredUser();
  return user?.role === 'doctor';
};
