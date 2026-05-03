'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: number;
}

interface AppState {
  isSimplifiedMode: boolean;
  toggleSimplifiedMode: () => void;
  civicPoints: number;
  addPoints: (amount: number) => void;
  unlockedBadges: Badge[];
  unlockBadge: (badge: Omit<Badge, 'earnedAt'>) => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isSimplifiedMode: false,
      toggleSimplifiedMode: () =>
        set((s) => ({ isSimplifiedMode: !s.isSimplifiedMode })),

      civicPoints: 0,
      addPoints: (amount) =>
        set((s) => ({ civicPoints: s.civicPoints + amount })),

      unlockedBadges: [],
      unlockBadge: (badge) => {
        const existing = get().unlockedBadges.find((b) => b.id === badge.id);
        if (existing) return;
        set((s) => ({
          unlockedBadges: [...s.unlockedBadges, { ...badge, earnedAt: Date.now() }],
        }));
      },

      isSidebarCollapsed: false,
      toggleSidebar: () =>
        set((s) => ({ isSidebarCollapsed: !s.isSidebarCollapsed })),

      isMobileSidebarOpen: false,
      toggleMobileSidebar: () =>
        set((s) => ({ isMobileSidebarOpen: !s.isMobileSidebarOpen })),
      closeMobileSidebar: () => set({ isMobileSidebarOpen: false }),
    }),
    {
      name: 'chunaav-state',
      partialize: (s) => ({
        isSimplifiedMode: s.isSimplifiedMode,
        civicPoints: s.civicPoints,
        unlockedBadges: s.unlockedBadges,
      }),
    }
  )
);