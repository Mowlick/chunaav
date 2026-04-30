'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronLeft, ChevronRight, BrainCircuit, BarChart3, X, Zap } from 'lucide-react';
import { TIMELINE_MILESTONES, TIMELINE_QUIZ, ERAS, type TimelineMilestone } from '@/data/timelineData';
import { QuizBlock } from '@/components/shared/QuizBlock';
import { useAppStore } from '@/store/appStore';
import { RightSidebar } from '@/components/layout/RightSidebar';

const TOC_HEADINGS = [
  { id: 'timeline-track', label: 'Timeline Track', level: 1 as const },
  { id: 'era-detail', label: 'Era Details', level: 2 as const },
  { id: 'quick-facts', label: 'Quick Stats', level: 2 as const },
  { id: 'test-knowledge', label: 'Knowledge Check', level: 2 as const },
];

const QUICK_FACTS = [
  { key: 'Milestones', value: '11' },
  { key: 'Years Covered', value: '1951–2024' },
  { key: 'Quiz Questions', value: '3' },
];

export default function TimelinePage() {
  const { isSimplifiedMode } = useAppStore();
  const [activeId, setActiveId] = useState<string>(TIMELINE_MILESTONES[0].id);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeNode = TIMELINE_MILESTONES.find((m) => m.id === activeId)!;

  const scrollTrack = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  const handleNodeClick = (id: string, preventScroll: boolean = false) => {
    setActiveId(id);
    setShowQuiz(false);
    if (!preventScroll) {
      document.getElementById('era-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeIndex = TIMELINE_MILESTONES.findIndex((m) => m.id === activeId);

  return (
    <div style={{ display: 'flex', gap: '1.5rem', maxWidth: 1200, margin: '0 auto' }}>
      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Page header */}
        <section style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} color="var(--accent-primary)" />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-primary)', fontFamily: 'Fira Code, monospace' }}>
              Electoral History
            </span>
          </div>
          <h1 id="timeline-track" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '0.625rem' }}>
            The <span className="gradient-text">Time Machine</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 560, lineHeight: 1.65 }}>
            {isSimplifiedMode
              ? 'Click on any year to learn what happened in that election! Travel through Indian history. 🕰️'
              : 'Explore pivotal milestones in Indian electoral history — from the first ballot cast in 1951 to the world\'s largest election in 2024.'}
          </p>
        </section>

        {/* ── Timeline Track ──────────────────────────────── */}
        <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
          {/* Scroll buttons */}
          <button onClick={() => scrollTrack('left')} className="btn btn-ghost" aria-label="Scroll timeline left" style={{ position: 'absolute', left: -16, top: '50%', transform: 'translateY(-50%)', zIndex: 10, padding: '0.4rem', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => scrollTrack('right')} className="btn btn-ghost" aria-label="Scroll timeline right" style={{ position: 'absolute', right: -16, top: '50%', transform: 'translateY(-50%)', zIndex: 10, padding: '0.4rem', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={16} />
          </button>

          {/* Track container */}
          <div ref={trackRef} style={{ overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '0.5rem 2rem', minWidth: 'max-content', position: 'relative' }}>
              {TIMELINE_MILESTONES.map((milestone, idx) => {
                const isActive = milestone.id === activeId;
                const era = ERAS[milestone.era];
                return (
                  <div key={milestone.id} style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Connector line */}
                    {idx > 0 && (
                      <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, rgba(249,115,22,0.3), rgba(249,115,22,0.1))', flexShrink: 0 }} />
                    )}
                    {/* Node */}
                    <button
                      id={`timeline-node-${milestone.id}`}
                      onClick={() => handleNodeClick(milestone.id)}
                      aria-label={`${milestone.year}: ${milestone.title}`}
                      aria-pressed={isActive}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: 12,
                        transition: 'transform 0.2s',
                        transform: isActive ? 'translateY(-4px)' : 'none',
                        flexShrink: 0,
                      }}
                    >
                      {/* Icon bubble */}
                      <div style={{
                        width: isActive ? 52 : 44,
                        height: isActive ? 52 : 44,
                        borderRadius: '50%',
                        background: isActive ? era.color : 'rgba(31,40,51,0.8)',
                        border: `2px solid ${isActive ? era.color : 'rgba(255,255,255,0.12)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: isActive ? '1.3rem' : '1.1rem',
                        transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                        boxShadow: isActive ? `0 0 20px ${era.color}60, 0 0 6px ${era.color}40` : 'none',
                        animation: isActive ? 'pulse-node 2s ease-in-out infinite' : 'none',
                      }}>
                        {milestone.icon}
                      </div>
                      {/* Year label */}
                      <div style={{
                        fontFamily: 'Fira Code, monospace',
                        fontSize: '0.75rem',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? era.color : 'var(--text-secondary)',
                        transition: 'color 0.2s',
                      }}>
                        {milestone.year}
                      </div>
                    </button>
                  </div>
                );
              })}

              {/* End node — quiz */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, rgba(249,115,22,0.1), rgba(16,185,129,0.4))', flexShrink: 0 }} />
                <button
                  id="timeline-quiz-trigger"
                  onClick={() => { setShowQuiz(true); document.getElementById('test-knowledge')?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', flexShrink: 0 }}
                  aria-label="Test Your Knowledge quiz"
                >
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px rgba(16,185,129,0.2)' }}>
                    <BrainCircuit size={20} color="#10B981" />
                  </div>
                  <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.7rem', color: '#10B981', fontWeight: 600, whiteSpace: 'nowrap' }}>Quiz</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Era Detail Card ──────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            id="era-detail"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="glass card" style={{ borderRadius: 20, overflow: 'hidden', padding: 0 }}>
              {/* Card header strip */}
              <div style={{ background: `linear-gradient(135deg, ${ERAS[activeNode.era].color}20, transparent)`, borderBottom: '1px solid var(--border-glass)', padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{activeNode.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.78rem', fontWeight: 700, color: ERAS[activeNode.era].color, background: `${ERAS[activeNode.era].color}18`, border: `1px solid ${ERAS[activeNode.era].color}40`, padding: '2px 8px', borderRadius: 20 }}>
                      {activeNode.year}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                      {ERAS[activeNode.era].label} Era
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.01em', marginBottom: '0.2rem' }}>{activeNode.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{activeNode.subtitle}</p>
                </div>

                {/* Nav arrows */}
                <div style={{ display: 'flex', gap: '0.375rem', flexShrink: 0 }}>
                  <button onClick={() => activeIndex > 0 && handleNodeClick(TIMELINE_MILESTONES[activeIndex - 1].id, true)} disabled={activeIndex === 0} className="btn btn-ghost" style={{ padding: '0.375rem 0.5rem', opacity: activeIndex === 0 ? 0.3 : 1 }} aria-label="Previous milestone">
                    <ChevronLeft size={15} />
                  </button>
                  <button onClick={() => activeIndex < TIMELINE_MILESTONES.length - 1 && handleNodeClick(TIMELINE_MILESTONES[activeIndex + 1].id, true)} disabled={activeIndex === TIMELINE_MILESTONES.length - 1} className="btn btn-ghost" style={{ padding: '0.375rem 0.5rem', opacity: activeIndex === TIMELINE_MILESTONES.length - 1 ? 0.3 : 1 }} aria-label="Next milestone">
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>

              {/* Quick facts row */}
              <div id="quick-facts" style={{ display: 'grid', gridTemplateColumns: `repeat(${activeNode.facts.length}, 1fr)`, borderBottom: '1px solid var(--border-glass)' }}>
                {activeNode.facts.map((fact, i) => (
                  <div key={i} style={{ padding: '1rem 1.25rem', borderRight: i < activeNode.facts.length - 1 ? '1px solid var(--border-glass)' : 'none', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '1.1rem', fontWeight: 700, color: ERAS[activeNode.era].color, marginBottom: '0.2rem' }}>{fact.value}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{fact.label}</div>
                  </div>
                ))}
              </div>

              {/* Main text */}
              <div style={{ padding: '1.5rem 1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.875rem' }}>
                  <BarChart3 size={14} color="var(--text-secondary)" />
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                    {isSimplifiedMode ? '🧒 Simple Version' : 'Historical Account'}
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9rem' }}>
                  {isSimplifiedMode ? activeNode.textSimple : activeNode.text}
                </p>

                {/* Navigation hint */}
                <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {activeIndex + 1} of {TIMELINE_MILESTONES.length} milestones
                  </span>
                  {activeIndex < TIMELINE_MILESTONES.length - 1 && (
                    <button
                      className="btn btn-ghost"
                      onClick={() => handleNodeClick(TIMELINE_MILESTONES[activeIndex + 1].id, true)}
                      style={{ fontSize: '0.8rem', gap: '0.375rem' }}
                    >
                      Next: {TIMELINE_MILESTONES[activeIndex + 1].year} →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Quiz Section ─────────────────────────────────── */}
        <div id="test-knowledge" style={{ marginTop: '2rem' }}>
          {!showQuiz ? (
            <div className="glass card glass-hover" style={{ borderRadius: 16, padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', cursor: 'pointer', border: '1px solid rgba(16,185,129,0.2)' }} onClick={() => setShowQuiz(true)} role="button" tabIndex={0} aria-label="Start knowledge quiz" onKeyDown={(e) => e.key === 'Enter' && setShowQuiz(true)}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <BrainCircuit size={24} color="#10B981" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>Test Your Knowledge</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>3 questions • Earn up to 90 Civic Points</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#10B981', fontSize: '0.85rem', fontWeight: 600 }}>
                <Zap size={14} fill="currentColor" />
                Start Quiz
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass card"
              style={{ borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BrainCircuit size={18} color="#10B981" />
                  <span style={{ fontWeight: 700 }}>Knowledge Check</span>
                </div>
                <button className="btn btn-ghost" onClick={() => setShowQuiz(false)} style={{ padding: '0.25rem 0.5rem' }} aria-label="Close quiz">
                  <X size={15} />
                </button>
              </div>
              <QuizBlock
                questions={TIMELINE_QUIZ}
                pointsPerQuestion={30}
                onComplete={(score, total) => setQuizDone(true)}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Right sidebar */}
      <div style={{ flexShrink: 0 }}>
        <RightSidebar headings={TOC_HEADINGS} quickFacts={QUICK_FACTS} />
      </div>
    </div>
  );
}
