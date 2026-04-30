'use client';

import { useRef } from 'react';
import { Zap } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export function CivicPointsPill() {
  const civicPoints = useAppStore((s) => s.civicPoints);
  const pillRef = useRef<HTMLDivElement>(null);

  // Trigger pop animation when points change
  const handleClick = () => {
    const el = pillRef.current;
    if (!el) return;
    el.classList.remove('points-pop');
    void el.offsetWidth; // reflow
    el.classList.add('points-pop');
  };

  return (
    <div
      ref={pillRef}
      id="civic-points-display"
      className="civic-points-pill"
      onClick={handleClick}
      title="Your Civic Points — earned by completing quizzes"
      role="status"
      aria-label={`${civicPoints} Civic Points`}
    >
      <Zap size={13} fill="currentColor" aria-hidden="true" />
      <span>{civicPoints.toLocaleString()}</span>
      <span style={{ opacity: 0.6, fontSize: '0.7rem' }}>pts</span>
    </div>
  );
}
