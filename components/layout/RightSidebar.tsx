'use client';

import { useEffect, useRef, useState } from 'react';

export interface TocHeading {
  id: string;
  label: string;
  level: 1 | 2 | 3;
}

export interface QuickFact {
  key: string;
  value: string;
}

interface RightSidebarProps {
  headings: TocHeading[];
  quickFacts?: QuickFact[];
}

export function RightSidebar({ headings, quickFacts }: RightSidebarProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer — auto-update active TOC entry
  useEffect(() => {
    if (!headings.length) return;

    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-64px 0px -60% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    observerRef.current = observer;
    return () => observer.disconnect();
  }, [headings]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setActiveId(id);
  };

  return (
    <aside id="right-sidebar" className="sidebar-right" aria-label="Table of contents">
      {headings.length > 0 && (
        <nav aria-label="On this page">
          <p className="toc-title">On this page</p>
          {headings.map(({ id, label, level }) => (
            <button
              key={id}
              className={`toc-item${activeId === id ? ' active' : ''}`}
              onClick={() => scrollTo(id)}
              style={{ paddingLeft: level === 1 ? '0.5rem' : level === 2 ? '1rem' : '1.5rem' }}
              aria-current={activeId === id ? 'true' : undefined}
            >
              {label}
            </button>
          ))}
        </nav>
      )}

      {quickFacts && quickFacts.length > 0 && (
        <div className="quick-facts-card glass" role="complementary" aria-label="Quick facts">
          <h4>⚡ Quick Facts</h4>
          {quickFacts.map(({ key, value }) => (
            <div key={key} className="quick-fact-row">
              <span className="quick-fact-key">{key}</span>
              <span className="quick-fact-val">{value}</span>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
