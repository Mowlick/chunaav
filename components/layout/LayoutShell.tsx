'use client';

import { useAppStore } from '@/store/appStore';
import { TopNav } from '@/components/layout/TopNav';
import { LeftSidebar } from '@/components/layout/LeftSidebar';

interface ShellProps {
  children: React.ReactNode;
}

export function LayoutShell({ children }: ShellProps) {
  const isSidebarCollapsed = useAppStore((s) => s.isSidebarCollapsed);

  return (
    <>
      {/* ── Atmospheric layer ─────────────────────────────── */}
      <div className="grid-overlay" aria-hidden="true" />
      <div className="flag-bg-glow saffron" aria-hidden="true" />
      <div className="flag-bg-glow green" aria-hidden="true" />
      <img src="/chakra.svg" className="flag-chakra" alt="" aria-hidden="true" />

      {/* ── App Shell ─────────────────────────────────────── */}
      <div className="layout-root">
        <TopNav />

        <div className="layout-body">
          <LeftSidebar />

          <main
            id="main-content"
            className={`main-content with-left${isSidebarCollapsed ? ' collapsed' : ''}`}
            aria-label="Main content"
          >
            <div className="fade-in-up">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
