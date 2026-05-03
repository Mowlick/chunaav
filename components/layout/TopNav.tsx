'use client';

import { useAppStore } from '@/store/appStore';
import { ELI5Toggle } from './ELI5Toggle';
import { CivicPointsPill } from './CivicPointsPill';
import { BadgesButton } from './BadgesButton';
import { MenuButton } from './MenuButton';

export function TopNav() {
  return (
    <header className="topnav" role="banner" style={{ background: 'transparent', borderBottom: 'none', backdropFilter: 'none', boxShadow: 'none' }}>
      {/* Logo */}
      <a href="/" className="topnav-logo" aria-label="Chunaav Home">
        <div className="topnav-logo-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
            <rect x="9" y="3" width="6" height="4" rx="2"/>
            <path d="M9 12h6M9 16h4"/>
          </svg>
        </div>
        <span className="topnav-logo-text">Chunaav</span>
      </a>

      {/* Spacer to push actions to the right */}
      <div style={{ flex: 1 }} />

      {/* Right actions */}
      <div className="topnav-actions">
        <ELI5Toggle />
        <CivicPointsPill />
        <BadgesButton />
        <MenuButton />
      </div>
    </header>
  );
}
