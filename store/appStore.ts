'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;         // emoji or lucide icon name
  earnedAt: number;     // timestamp
}

interface AppState {
  /** ELI5 "Explain Like I'm 5" simplified mode toggle */
  isSimplifiedMode: boolean;
  toggleSimplifiedMode: () => void;

  /** Gamified score */
  civicPoints: number;
  addPoints: (amount: number) => void;

  /** Achievements */
  unlockedBadges: Badge[];
  unlockBadge: (badge: Omit<Badge, 'earnedAt'>) => void;

  /** Sidebar collapsed state */
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;

  /** Mobile sidebar open */
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
          unlockedBadges: [
            ...s.unlockedBadges,
            { ...badge, earnedAt: Date.now() },
          ],
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
