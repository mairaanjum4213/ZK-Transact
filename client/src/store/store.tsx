import { create } from 'zustand';

type AuthState = {
  username: string;
  active: boolean;
  isAuthenticated: boolean; // New property to indicate if the user is authenticated
  isRecovery:boolean;
};

type AuthStore = {
  auth: AuthState;
  setUsername: (name: string) => void;
  setIsAuthenticated: (status: boolean) => void; // New method to update isAuthenticated
  setIsRecovery: (status: boolean) => void; 
};

export const useAuthStore = create<AuthStore>((set) => ({
  auth: {
    username: '',
    active: false,
    isAuthenticated: false,// Initialize isAuthenticated as false
    isRecovery:false,
  },
  setUsername: (name) =>
    set((state) => ({ auth: { ...state.auth, username: name } })),
  setIsAuthenticated: (status) =>
    set((state) => ({ auth: { ...state.auth, isAuthenticated: status } })), // Update isAuthenticated
  setIsRecovery: (status) =>
    set((state) => ({ auth: { ...state.auth, isRecovery: status } })), 
}));
