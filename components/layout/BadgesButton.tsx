'use client';

import { useState } from 'react';
import { Trophy, X } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export function BadgesButton() {
  const [open, setOpen] = useState(false);
  const unlockedBadges = useAppStore((s) => s.unlockedBadges);

  return (
    <>
      <button
        id="badges-button"
        onClick={() => setOpen(true)}
        className="btn-ghost btn"
        style={{ padding: '0.3rem 0.75rem', position: 'relative', gap: '0.4rem' }}
        title="View your earned badges"
        aria-label={`Badges — ${unlockedBadges.length} earned`}
      >
        <Trophy size={14} />
        <span style={{ fontSize: '0.8rem' }}>Badges</span>
        {unlockedBadges.length > 0 && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute', top: -4, right: -4,
              background: 'var(--accent-secondary)',
              color: 'white',
              fontSize: '0.6rem', fontWeight: 700,
              width: 16, height: 16,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {unlockedBadges.length}
          </span>
        )}
      </button>

      {/* Badges modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Your Badges"
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setOpen(false)}
        >
          <div
            className="glass card"
            style={{ width: 400, maxWidth: '90vw', maxHeight: '80vh', overflowY: 'auto', zIndex: 201 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Trophy size={18} color="#10B981" />
                Your Badges
              </h2>
              <button onClick={() => setOpen(false)} className="btn-ghost btn" style={{ padding: '0.25rem 0.5rem' }} aria-label="Close badges modal">
                <X size={16} />
              </button>
            </div>

            {unlockedBadges.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏅</p>
                <p>No badges yet! Complete quizzes to earn achievements.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {unlockedBadges.map((badge) => (
                  <div key={badge.id} className="glass glass-hover" style={{ padding: '0.875rem', borderRadius: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>{badge.icon}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.2rem' }}>{badge.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{badge.description}</div>
                    <div style={{ fontSize: '0.65rem', fontFamily: 'Fira Code, monospace', color: 'var(--accent-secondary)', marginTop: '0.4rem', opacity: 0.7 }}>
                      {new Date(badge.earnedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
