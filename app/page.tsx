'use client';

import Link from 'next/link';
import {
  Clock,
  BookOpen,
  Landmark,
  ArrowRight,
  Zap,
  Users,
  Globe2,
  CheckSquare,
  Shield,
  UserCheck,
  Fingerprint
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';

const FEATURE_CARDS = [
  {
    href: '/timeline',
    icon: Clock,
    color: '#EA580C',
    colorDim: '#FFEDD5',
    title: 'Time Machine',
    subtitle: 'Electoral History',
    description:
      'Travel through decades of elections — explore pivotal moments that shaped democracy.',
    badge: 'INTERACTIVE',
  },
  {
    href: '/machinery',
    icon: Shield,
    color: '#1E40AF',
    colorDim: '#DBEAFE',
    title: 'The Machinery',
    subtitle: 'The Oversight',
    description:
      'Explore the structural hierarchy of the ECI and how they manage 1.4 billion people.',
    badge: 'SYSTEM',
  },
  {
    href: '/hall-of-democracy',
    icon: UserCheck,
    color: '#B45309',
    colorDim: '#FEF3C7',
    title: 'Hall of Democracy',
    subtitle: 'National Icons',
    description:
      'Honoring the pioneers and defining the essential roles that safeguard our process.',
    badge: 'HERITAGE',
  },
  {
    href: '/polling-booth',
    icon: Fingerprint,
    color: '#0891B2',
    colorDim: '#CFFAFE',
    title: 'The Polling Booth',
    subtitle: 'Tactile Simulation',
    description:
      'Experience the journey of a single vote from ink to VVPAT in a 1:1 EVM simulator.',
    badge: 'VIRTUAL',
    badgeColor: '#0891B2',
    badgeBg: '#CFFAFE'
  },
  {
    href: '/sandbox',
    icon: Landmark,
    color: '#059669',
    colorDim: '#D1FAE5',
    title: 'Run for Office',
    subtitle: 'Candidacy Sandbox',
    description:
      'Walk through the entire candidacy flowchart — from filing nomination to election day.',
    badge: 'GAMIFIED',
    badgeColor: '#059669',
    badgeBg: '#D1FAE5'
  },
  {
    href: '/glossary',
    icon: BookOpen,
    color: '#6366F1',
    colorDim: '#EEF2FF',
    title: 'The Vault',
    subtitle: 'Jargon Buster',
    description:
      'Every political term explained with hover-tooltips. No dictionary needed.',
    badge: 'REFERENCE',
  },
];

const STATS = [
  { icon: Users, value: '960M+', label: 'Eligible Voters' },
  { icon: Globe2, value: '543', label: 'Lok Sabha Seats' },
  { icon: CheckSquare, value: '7', label: 'Max Phases' },
  { icon: Zap, value: '1951', label: 'First Election' },
];

export default function HomePage() {
  const { isSimplifiedMode, civicPoints } = useAppStore();

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section aria-labelledby="hero-heading" style={{ textAlign: 'center', padding: '3.5rem 0 2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 20, padding: '0.3rem 1rem', marginBottom: '1.5rem', fontSize: '0.78rem', fontWeight: 600, color: '#C2410C' }}>
          <Zap size={12} fill="currentColor" />
          <span>Your election education hub</span>
        </div>

        <h1 id="hero-heading" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
          Democracy is not a spectator<br />sport.
        </h1>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto 2rem', lineHeight: 1.7 }}>
          {isSimplifiedMode
            ? 'Learn how elections work in a fun, easy way. No confusing words!'
            : 'An immersive, gamified learning experience covering every dimension of the electoral process — history, jargon, simulation, and more.'}
        </p>

        <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/timeline" className="btn btn-primary" style={{ background: 'var(--text-primary)', color: '#FFFFFF', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <Clock size={16} aria-hidden="true" />
            Explore the Timeline
          </Link>
          <Link href="/polling-booth" className="btn btn-ghost" style={{ background: '#FFFFFF', color: 'var(--text-primary)', borderColor: 'rgba(0,0,0,0.1)' }}>
            Try the EVM Simulator
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        {civicPoints > 0 && (
          <p style={{ marginTop: '1.25rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            You have{' '}
            <span className="emerald-text" style={{ fontWeight: 700, fontFamily: 'Fira Code, monospace' }}>
              {civicPoints} Civic Points
            </span>{' '}
            — keep learning!
          </p>
        )}
      </section>

      {/* ── Stats strip ─────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.75rem', marginBottom: '3.5rem' }}>
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="glass glass-hover card" style={{ padding: '1.25rem 1rem', textAlign: 'center', borderRadius: 12 }}>
            <Icon size={18} color="#475569" style={{ margin: '0 auto 0.5rem' }} aria-hidden="true" />
            <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '1.15rem', fontWeight: 700, color: '#C2410C', marginBottom: 2 }}>{value}</div>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ── Feature cards ───────────────────────────────────── */}
      <section aria-labelledby="features-heading">
        <h2 id="features-heading" style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>
          Explore the Hub
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {FEATURE_CARDS.map(({ href, icon: Icon, color, colorDim, title, subtitle, description, badge }) => (
            <Link
              key={href}
              href={href}
              id={`feature-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
              className="glass glass-hover card"
              style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '0.875rem', padding: '1.5rem', borderRadius: 20, transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', height: '100%', border: '1px solid var(--border-glass)' }}
            >
              {/* Icon + badge row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: colorDim, border: `1px solid rgba(0,0,0,0.04)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} color={color} aria-hidden="true" />
                </div>
                {badge && (
                  <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', background: (FEATURE_CARDS.find(f => f.title === title) as any).badgeBg || colorDim, border: `1px solid rgba(0,0,0,0.04)`, color: (FEATURE_CARDS.find(f => f.title === title) as any).badgeColor || color, borderRadius: 20, padding: '2px 8px', fontFamily: 'Fira Code, monospace' }}>
                    {badge}
                  </span>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color, marginBottom: '0.2rem' }}>{subtitle}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.01em', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>{title}</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{description}</div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', fontWeight: 700, color }}>
                <span>Explore</span>
                <ArrowRight size={13} aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── ELI5 callout ────────────────────────────────────── */}
      {!isSimplifiedMode && (
        <div className="glass" style={{ marginTop: '2.5rem', borderRadius: 16, padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
          <span style={{ fontSize: '1.75rem' }}>👦</span>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 2, color: 'var(--text-primary)' }}>New to all this?</div>
            <div style={{ fontSize: '0.85rem', color: '#475569' }}>
              Toggle <strong style={{ color: '#EA580C' }}>ELI5 mode</strong> in the top bar to get kid-friendly explanations everywhere.
            </div>
          </div>
        </div>
      )}

      <div className="divider" style={{ marginTop: '3rem' }} />

      <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-secondary)', paddingBottom: '1rem' }}>
        Built for civic learning • No account required • 100% free
      </p>
    </div>
  );
}
