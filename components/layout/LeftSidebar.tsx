'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Home,
  Clock,
  BookOpen,
  Landmark,
  Shield,
  UserCheck,
  Fingerprint,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';

const NAV_ITEMS = [
  {
    href: '/',
    label: 'The Hub',
    icon: Home,
    badge: null,
    section: 'Navigate',
  },
  {
    href: '/timeline',
    label: 'Time Machine',
    icon: Clock,
    badge: null,
    section: 'Navigate',
  },
  {
    href: '/machinery',
    label: 'The Machinery',
    icon: Shield,
    badge: null,
    section: 'Navigate',
  },
  {
    href: '/hall-of-democracy',
    label: 'Hall of Democracy',
    icon: UserCheck,
    badge: null,
    section: 'Navigate',
  },
  {
    href: '/glossary',
    label: 'The Vault',
    icon: BookOpen,
    badge: null,
    section: 'Navigate',
  },
  {
    href: '/polling-booth',
    label: 'The Polling Booth',
    icon: Fingerprint,
    badge: 'HOT',
    section: 'Playground',
  },
  {
    href: '/sandbox',
    label: 'Run for Office',
    icon: Landmark,
    badge: null,
    section: 'Playground',
  },
] as const;

export function LeftSidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar, isMobileSidebarOpen, closeMobileSidebar } =
    useAppStore();

  const getTricolorStyles = (index: number) => {
    if (index <= 2) return { bg: '#FFF7ED', text: '#EA580C', accent: '#F97316' }; // Saffron
    if (index <= 4) return { bg: '#F0F9FF', text: '#0369A1', accent: '#0EA5E9' }; // Blue/White
    return { bg: '#F0FDF4', text: '#15803D', accent: '#22C55E' }; // Green
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      <div
        className={`sidebar-overlay${isMobileSidebarOpen ? ' visible' : ''}`}
        onClick={closeMobileSidebar}
        aria-hidden="true"
      />

      <nav
        id="left-sidebar"
        className={`sidebar-left${isSidebarCollapsed ? ' collapsed' : ''}${isMobileSidebarOpen ? ' mobile-open' : ''}`}
        style={{ borderRight: 'none', background: 'transparent' }}
        aria-label="Main navigation"
      >
        {/* Group sections */}
        {['Navigate', 'Playground'].map((section) => {
          return (
            <div key={section}>
              <div className="sidebar-section-label" aria-hidden={isSidebarCollapsed}>
                {section}
              </div>
              {NAV_ITEMS.filter((i) => i.section === section).map((item) => {
                const globalIndex = NAV_ITEMS.findIndex(ni => ni.href === item.href);
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                const theme = getTricolorStyles(globalIndex);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`nav-item${isActive ? ' active' : ''}`}
                    onClick={closeMobileSidebar}
                    title={isSidebarCollapsed ? item.label : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    style={isActive ? {
                      background: theme.bg,
                      color: theme.text,
                      borderLeft: `3px solid ${theme.accent}`,
                      borderRadius: '0 10px 100px 0',
                      marginLeft: '-12px',
                      paddingLeft: '20px'
                    } : {}}
                  >
                    <item.icon className="nav-icon" aria-hidden="true" />
                    <span className="nav-label">{item.label}</span>
                    {item.badge && !isSidebarCollapsed && (
                      <span className="nav-badge" style={{ background: isActive ? 'transparent' : undefined, color: isActive ? theme.text : undefined, border: isActive ? `1px solid ${theme.text}40` : undefined }}>{item.badge}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}

        {/* Collapse toggle */}
        <button
          id="sidebar-collapse-btn"
          className="sidebar-collapse-btn"
          onClick={toggleSidebar}
          style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid var(--border-glass)', marginTop: 'auto' }}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!isSidebarCollapsed}
        >
          {isSidebarCollapsed ? (
            <ChevronRight size={14} aria-hidden="true" />
          ) : (
            <>
              <ChevronLeft size={14} aria-hidden="true" />
              <span style={{ fontSize: '0.75rem' }}>Collapse</span>
            </>
          )}
        </button>
      </nav>
    </>
  );
}
