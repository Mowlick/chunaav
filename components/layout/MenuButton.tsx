'use client';

import { Menu } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export function MenuButton() {
  const toggleMobileSidebar = useAppStore((s) => s.toggleMobileSidebar);

  return (
    <button
      id="mobile-menu-btn"
      className="btn-ghost btn"
      onClick={toggleMobileSidebar}
      style={{ padding: '0.4rem 0.5rem', display: 'none' }}
      aria-label="Open navigation menu"
    >
      <Menu size={18} />
    </button>
  );
}
