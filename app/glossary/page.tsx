'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES, type GlossaryTerm, type GlossaryCategory } from '@/data/glossaryData';
import { useAppStore } from '@/store/appStore';

interface JargonPopoverProps {
  term: GlossaryTerm;
  isSimplified: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLSpanElement | null>;
}

function JargonPopover({ term, isSimplified, onClose, anchorRef }: JargonPopoverProps) {
  const popRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const anchor = anchorRef.current;
    const pop = popRef.current;
    if (!anchor || !pop) return;

    const rect = anchor.getBoundingClientRect();
    const popW = 300;
    let left = rect.left + rect.width / 2 - popW / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - popW - 12));
    setPos({ top: rect.bottom + window.scrollY + 8, left });
  }, [anchorRef]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const onClick = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, [onClose]);

  return (
    <div
      ref={popRef}
      role="tooltip"
      style={{
        position: 'absolute',
        top: pos.top,
        left: pos.left,
        width: 300,
        zIndex: 500,
        background: 'rgba(15,18,26,0.97)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(249,115,22,0.35)',
        borderRadius: 14,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 20px rgba(249,115,22,0.1)',
        padding: '1rem 1.125rem',
        animation: 'fadeInUp 0.18s ease-out both',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem', gap: '0.5rem' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FDBA74' }}>{term.term}</div>
          {term.phonetic && <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.68rem', color: 'var(--text-secondary)', marginTop: 1 }}>/{term.phonetic}/</div>}
        </div>
        <button onClick={onClose} aria-label="Close definition" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '2px', lineHeight: 1, marginTop: 2 }}>
          ✕
        </button>
      </div>
      <div style={{ height: 1, background: 'var(--border-glass)', marginBottom: '0.625rem' }} />
      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
        {isSimplified ? term.shortDefSimple : term.shortDef}
      </p>
      {term.relatedTerms && term.relatedTerms.length > 0 && (
        <div style={{ marginTop: '0.625rem', display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
          {term.relatedTerms.map((r) => (
            <span key={r} style={{ fontSize: '0.65rem', background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)', color: '#FDBA74', borderRadius: 20, padding: '2px 7px' }}>
              {r}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Core: JargonRenderer — parses text and wraps known terms
// ─────────────────────────────────────────────────────────
interface JargonRendererProps {
  text: string;
  terms: GlossaryTerm[];
  isSimplified: boolean;
}

function JargonRenderer({ text, terms, isSimplified }: JargonRendererProps) {
  const [openTerm, setOpenTerm] = useState<GlossaryTerm | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  // Build a sorted list of terms by length (longest first) so multi-word terms match before single words
  const sortedTerms = [...terms].sort((a, b) => b.term.length - a.term.length);

  // Tokenise text into segments: { text, term? }
  const segments: Array<{ text: string; term?: GlossaryTerm }> = [];
  let remaining = text;

  while (remaining.length > 0) {
    let matched = false;
    for (const glossaryTerm of sortedTerms) {
      const idx = remaining.toLowerCase().indexOf(glossaryTerm.term.toLowerCase());
      if (idx === -1) continue;
      if (idx > 0) segments.push({ text: remaining.slice(0, idx) });
      segments.push({ text: remaining.slice(idx, idx + glossaryTerm.term.length), term: glossaryTerm });
      remaining = remaining.slice(idx + glossaryTerm.term.length);
      matched = true;
      break;
    }
    if (!matched) {
      segments.push({ text: remaining });
      break;
    }
  }

  return (
    <span style={{ position: 'relative' }}>
      {segments.map((seg, i) =>
        seg.term ? (
          <span
            key={i}
            role="button"
            tabIndex={0}
            aria-label={`Definition: ${seg.term.term}`}
            style={{
              color: '#FDBA74',
              borderBottom: '1px dashed rgba(249,115,22,0.6)',
              cursor: 'pointer',
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onClick={(e) => {
              e.stopPropagation();
              spanRef.current = e.currentTarget as HTMLSpanElement;
              setOpenTerm(openTerm?.id === seg.term!.id ? null : seg.term!);
            }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); spanRef.current = e.currentTarget as HTMLSpanElement; setOpenTerm(seg.term!); } }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#FED7AA'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#FDBA74'; }}
          >
            {seg.text}
          </span>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
      {openTerm && (
        <JargonPopover
          term={openTerm}
          isSimplified={isSimplified}
          onClose={() => setOpenTerm(null)}
          anchorRef={spanRef}
        />
      )}
    </span>
  );
}

// ─────────────────────────────────────────────────────────
// Term Card
// ─────────────────────────────────────────────────────────
interface TermCardProps {
  term: GlossaryTerm;
  isSimplified: boolean;
  isLearned: boolean;
  onMarkLearned: () => void;
}

function TermCard({ term, isSimplified, isLearned, onMarkLearned }: TermCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      id={`term-${term.id}`}
      className="glass glass-hover card"
      style={{ borderRadius: 16, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', border: isLearned ? '1px solid rgba(16,185,129,0.3)' : '1px solid var(--border-glass)', transition: 'border-color 0.3s' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#FDBA74' }}>{term.term}</h3>
            {term.phonetic && (
              <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.68rem', color: 'var(--text-secondary)' }}>/{term.phonetic}/</span>
            )}
            {isLearned && <span style={{ fontSize: '0.65rem', color: '#34d399', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 20, padding: '1px 7px', fontWeight: 600 }}>✓ Learned</span>}
          </div>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginTop: '0.15rem' }}>
            {term.category}
          </span>
        </div>
        {/* Mark as learned */}
        <button
          onClick={onMarkLearned}
          title={isLearned ? 'Already learned' : 'Mark as learned (+10 points)'}
          aria-label={isLearned ? 'Term marked as learned' : 'Mark term as learned'}
          style={{ background: 'none', border: 'none', cursor: isLearned ? 'default' : 'pointer', padding: '4px', color: isLearned ? '#34d399' : 'var(--text-secondary)', transition: 'color 0.2s', fontSize: '1rem', lineHeight: 1 }}
        >
          {isLearned ? '👁️' : '○'}
        </button>
      </div>

      {/* Short definition */}
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
        {isSimplified ? term.shortDefSimple : term.shortDef}
      </p>

      {/* Context sentence */}
      {term.usedInContext && (
        <div style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.12)', borderRadius: 8, padding: '0.625rem 0.875rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>In Context</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>
            <JargonRenderer text={term.usedInContext} terms={GLOSSARY_TERMS} isSimplified={isSimplified} />
          </p>
        </div>
      )}

      {/* Expand for full definition */}
      <button
        className="btn btn-ghost"
        onClick={() => setExpanded((e) => !e)}
        style={{ alignSelf: 'flex-start', padding: '0.3rem 0.75rem', fontSize: '0.78rem', gap: '0.3rem' }}
        aria-expanded={expanded}
      >
        {expanded ? '▲ Less' : '▼ Full Definition'}
      </button>

      {expanded && (
        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '0.875rem' }}>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.75, margin: 0 }}>
            {isSimplified ? term.longDefSimple : term.longDef}
          </p>
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>See also:</span>
              {term.relatedTerms.map((r) => (
                <button
                  key={r}
                  onClick={() => document.getElementById(`term-${GLOSSARY_TERMS.find(t => t.term === r)?.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  style={{ fontSize: '0.72rem', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', color: '#FDBA74', borderRadius: 20, padding: '2px 9px', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Main Vault Page
// ─────────────────────────────────────────────────────────
export default function GlossaryPage() {
  const { isSimplifiedMode, civicPoints, addPoints } = useAppStore();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | 'All'>('All');
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredTerms = GLOSSARY_TERMS.filter((t) => {
    const matchSearch = search.length === 0 ||
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.shortDef.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    return matchSearch && matchCat;
  });

  const handleMarkLearned = (id: string) => {
    if (learnedIds.has(id)) return;
    setLearnedIds((prev) => new Set([...prev, id]));
    addPoints(10);
  };

  // Keyboard shortcut: /
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') { e.preventDefault(); searchRef.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>📚</div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-secondary)', fontFamily: 'Fira Code, monospace' }}>
            Jargon Buster
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          The <span className="gradient-text">Vault</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 520 }}>
          {isSimplifiedMode
            ? 'Learn what tricky election words mean in easy language! Click the purple words to see their meaning. 🟣'
            : 'Every political and electoral term demystified. Click highlighted terms within any definition to trigger inline tooltips.'}
        </p>
      </div>

      {/* Search bar */}
      <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
        <span style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', pointerEvents: 'none', fontSize: '1rem' }}>🔍</span>
        <input
          ref={searchRef}
          id="vault-search"
          type="search"
          placeholder='Search terms or definitions… (press / to focus)'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search glossary terms"
          style={{ width: '100%', background: '#FFFFFF', border: '1px solid var(--border-glass)', borderRadius: 12, padding: '0.75rem 1rem 0.75rem 2.75rem', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s' }}
          onFocus={(e) => { e.target.style.borderColor = 'rgba(249,115,22,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.12)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'var(--border-glass)'; e.target.style.boxShadow = 'none'; }}
        />
        {search && (
          <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.85rem' }} aria-label="Clear search">✕</button>
        )}
      </div>

      {/* Layout: left category filter + right term grid */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        {/* Left category nav */}
        <div style={{ width: 200, flexShrink: 0, position: 'sticky', top: 80 }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.625rem' }}>Categories</div>
          {(['All', ...GLOSSARY_CATEGORIES] as const).map((cat) => {
            const count = cat === 'All' ? GLOSSARY_TERMS.length : GLOSSARY_TERMS.filter(t => t.category === cat).length;
            return (
              <button
                key={cat}
                id={`cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '0.5rem 0.75rem', borderRadius: 8,
                  background: activeCategory === cat ? 'rgba(249,115,22,0.12)' : 'transparent',
                  border: `1px solid ${activeCategory === cat ? 'rgba(249,115,22,0.3)' : 'transparent'}`,
                  color: activeCategory === cat ? '#FDBA74' : 'var(--text-secondary)',
                  cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: activeCategory === cat ? 600 : 400,
                  textAlign: 'left', marginBottom: '0.25rem', transition: 'all 0.18s',
                }}
              >
                <span>{cat}</span>
                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.7rem', opacity: 0.7 }}>{count}</span>
              </button>
            );
          })}

          {/* Learned progress */}
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12 }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-secondary)', marginBottom: '0.5rem' }}>Progress</div>
            <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '1.1rem', fontWeight: 700, color: '#34d399', marginBottom: '0.25rem' }}>
              {learnedIds.size} / {GLOSSARY_TERMS.length}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Terms learned</div>
            <div style={{ height: 4, background: 'rgba(16,185,129,0.15)', borderRadius: 2, marginTop: '0.625rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(learnedIds.size / GLOSSARY_TERMS.length) * 100}%`, background: 'var(--accent-secondary)', borderRadius: 2, transition: 'width 0.4s ease' }} />
            </div>
          </div>
        </div>

        {/* Term grid */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontFamily: 'Fira Code, monospace' }}>
            {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} found
            {search && ` for "${search}"`}
          </div>

          {filteredTerms.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
              <p>No terms found. Try a different search.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>
              {filteredTerms.map((term) => (
                <TermCard
                  key={term.id}
                  term={term}
                  isSimplified={isSimplifiedMode}
                  isLearned={learnedIds.has(term.id)}
                  onMarkLearned={() => handleMarkLearned(term.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
