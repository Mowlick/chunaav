'use client';

import { useAppStore } from '@/store/appStore';

export function ELI5Toggle() {
  const { isSimplifiedMode, toggleSimplifiedMode } = useAppStore();

  return (
    <button
      id="eli5-toggle"
      className={`eli5-toggle${isSimplifiedMode ? ' active' : ''}`}
      onClick={toggleSimplifiedMode}
      aria-pressed={isSimplifiedMode}
      title="Explain Like I'm 5 — simplify all text"
    >
      <span aria-hidden="true">🧒</span>
      <span>ELI5</span>
      <div className={`toggle-track${isSimplifiedMode ? ' on' : ''}`} aria-hidden="true">
        <div className="toggle-thumb" />
      </div>
    </button>
  );
}
