import { create } from 'zustand';

export interface Profile {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'staff' | 'student' | 'beneficiary' | 'volunteer';
  phone?: string;
  address?: string;
  education?: string;
  healthInfo?: string;
  socialBackground?: string;
  skills?: string[];
  certifications?: string[];
}

export interface Program {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming';
}

interface AuthState {
  user: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  signIn: async (email: string, password: string) => {
    // Mock authentication
    set({
      user: {
        id: '1',
        email,
        fullName: 'Demo User',
        role: 'admin',
      },
    });
  },
  signUp: async (email: string, password: string) => {
    // Mock sign up
    set({
      user: {
        id: '1',
        email,
        fullName: 'Demo User',
        role: 'admin',
      },
    });
  },
  signOut: () => set({ user: null }),
}));