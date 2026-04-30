'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, CheckCircle, ChevronRight, X, Zap, Trophy } from 'lucide-react';
import { CANDIDACY_STEPS, CANDIDATE_BADGE } from '@/data/sandboxData';
import { useAppStore } from '@/store/appStore';

// ─────────────────────────────────────────────────────────
// Confetti (pure CSS particles)
// ─────────────────────────────────────────────────────────
function Confetti() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 1.5}s`,
    duration: `${1.5 + Math.random() * 2}s`,
    color: ['#F97316', '#10B981', '#F59E0B', '#EC4899', '#34D399', '#FDBA74'][Math.floor(Math.random() * 6)],
    size: `${4 + Math.random() * 6}px`,
  }));

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }} aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: '-10px',
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `confetti-fall ${p.duration} ${p.delay} ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SVG connector lines between steps
// ─────────────────────────────────────────────────────────
interface ConnectorProps {
  unlocked: boolean;
  index: number;
}

function StepConnector({ unlocked, index }: ConnectorProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: 48, position: 'relative' }}>
      <svg width="4" height="48" style={{ overflow: 'visible' }}>
        <line
          x1="2" y1="0" x2="2" y2="48"
          stroke={unlocked ? 'var(--accent-primary)' : 'rgba(255,255,255,0.08)'}
          strokeWidth="2"
          strokeDasharray={unlocked ? 'none' : '6 4'}
          style={{
            transition: 'stroke 0.4s ease',
            ...(unlocked ? {
              strokeDasharray: '48',
              strokeDashoffset: '0',
              animation: 'draw-line 0.5s ease forwards',
            } : {}),
          }}
        />
        {unlocked && (
          <circle cx="2" cy="24" r="3" fill="var(--accent-primary)" style={{ animation: 'fadeInUp 0.3s ease 0.3s both' }} />
        )}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Step Modal
// ─────────────────────────────────────────────────────────
interface StepModalProps {
  step: typeof CANDIDACY_STEPS[0];
  isSimplified: boolean;
  onComplete: () => void;
  onClose: () => void;
}

function StepModal({ step, isSimplified, onComplete, onClose }: StepModalProps) {
  const [acknowledged, setAcknowledged] = useState(false);

  const requirements = isSimplified ? step.requirementsSimple : step.requirements;
  const details = isSimplified ? step.detailsSimple : step.details;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Step ${step.stepNumber}: ${step.title}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="glass"
        style={{ maxWidth: 560, width: '100%', borderRadius: 20, overflow: 'hidden', border: `1px solid ${step.color}40` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div style={{ background: `linear-gradient(135deg, ${step.color}20, transparent)`, borderBottom: '1px solid var(--border-glass)', padding: '1.375rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
          <div style={{ fontSize: '2rem', lineHeight: 1, flexShrink: 0 }}>{step.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.7rem', color: step.color, fontWeight: 600, marginBottom: '0.2rem' }}>
              STEP {step.stepNumber} OF {CANDIDACY_STEPS.length}
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.01em', marginBottom: '0.1rem' }}>{step.title}</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{step.subtitle}</p>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '0.375rem', flexShrink: 0 }} aria-label="Close step modal">
            <X size={16} />
          </button>
        </div>

        {/* Modal body */}
        <div style={{ padding: '1.375rem 1.5rem', maxHeight: '60vh', overflowY: 'auto' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
            {details}
          </p>

          {/* Requirements checklist */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.625rem' }}>Key Requirements</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {requirements.map((req, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.83rem', color: 'var(--text-secondary)', padding: '0.4rem 0.625rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                  <span style={{ color: step.color, flexShrink: 0, fontSize: '0.7rem', marginTop: '0.15rem' }}>▸</span>
                  {req}
                </div>
              ))}
            </div>
          </div>

          {/* Points badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 0.875rem', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, marginBottom: '1.25rem', fontSize: '0.82rem' }}>
            <Zap size={14} color="#10B981" fill="#10B981" />
            <span style={{ color: '#34d399', fontFamily: 'Fira Code, monospace', fontWeight: 600 }}>+{step.pointsAwarded}</span>
            <span style={{ color: 'var(--text-secondary)' }}>Civic Points awarded on completion</span>
          </div>

          {/* Acknowledge checkbox */}
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', cursor: 'pointer', marginBottom: '1rem' }}>
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              style={{ marginTop: 3, width: 16, height: 16, accentColor: step.color, cursor: 'pointer', flexShrink: 0 }}
            />
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              I understand the requirements for <strong style={{ color: 'var(--text-primary)' }}>{step.title}</strong>
            </span>
          </label>
        </div>

        {/* Modal footer */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-glass)' }}>
          <button
            className="btn btn-primary"
            onClick={onComplete}
            disabled={!acknowledged}
            style={{ width: '100%', justifyContent: 'center', opacity: acknowledged ? 1 : 0.4, cursor: acknowledged ? 'pointer' : 'not-allowed', background: acknowledged ? `linear-gradient(135deg, ${step.color}, ${step.color}CC)` : undefined, boxShadow: acknowledged ? `0 4px 16px ${step.color}40` : 'none' }}
            aria-disabled={!acknowledged}
          >
            <CheckCircle size={15} />
            {step.acknowledgementCta}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// Step Node
// ─────────────────────────────────────────────────────────
interface StepNodeProps {
  step: typeof CANDIDACY_STEPS[0];
  status: 'locked' | 'unlocked' | 'completed';
  onClick: () => void;
}

function StepNode({ step, status, onClick }: StepNodeProps) {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isUnlocked = status === 'unlocked';

  return (
    <motion.button
      id={`step-node-${step.id}`}
      onClick={isLocked ? undefined : onClick}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: isLocked ? 0.4 : 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      whileHover={!isLocked ? { scale: 1.02, y: -2 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      disabled={isLocked}
      aria-label={`Step ${step.stepNumber}: ${step.title} — ${status}`}
      aria-disabled={isLocked}
      style={{
        width: '100%',
        background: 'none',
        border: 'none',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        padding: 0,
        display: 'block',
        textAlign: 'left',
      }}
    >
      <div style={{
        padding: '1.125rem 1.375rem',
        borderRadius: 16,
        background: isCompleted
          ? 'rgba(16,185,129,0.08)'
          : isUnlocked
            ? 'rgba(249,115,22,0.08)'
            : 'rgba(0,0,0,0.02)',
        border: `1px solid ${isCompleted
          ? 'rgba(16,185,129,0.4)'
          : isUnlocked
            ? `${step.color}60`
            : 'rgba(0,0,0,0.05)'}`,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: isUnlocked ? `0 0 20px ${step.color}15` : 'none',
        transition: 'all 0.25s ease',
        filter: isLocked ? 'grayscale(0.8)' : 'none',
      }}>
        {/* Step icon bubble */}
        <div style={{
          width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
          background: isCompleted
            ? 'rgba(16,185,129,0.2)'
            : isUnlocked
              ? `${step.color}20`
              : 'rgba(0,0,0,0.03)',
          border: `2px solid ${isCompleted ? '#10B981' : isUnlocked ? step.color : 'rgba(0,0,0,0.05)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem', position: 'relative',
          boxShadow: isUnlocked ? `0 0 16px ${step.color}40` : 'none',
          animation: isUnlocked ? 'pulse-node 2.5s ease-in-out infinite' : 'none',
        }}>
          {isCompleted ? <CheckCircle size={22} color="#10B981" /> : isLocked ? <Lock size={18} color="rgba(255,255,255,0.3)" /> : step.icon}
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.68rem', color: isCompleted ? '#34d399' : isUnlocked ? step.color : 'var(--text-secondary)', fontWeight: 600 }}>
              {String(step.stepNumber).padStart(2, '0')}
            </span>
            {isCompleted && <span style={{ fontSize: '0.65rem', color: '#34d399', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 20, padding: '1px 7px', fontWeight: 600 }}>DONE</span>}
            {isUnlocked && <span style={{ fontSize: '0.65rem', color: step.color, background: `${step.color}15`, border: `1px solid ${step.color}40`, borderRadius: 20, padding: '1px 7px', fontWeight: 600, animation: 'pulse-badge 1.5s ease-in-out infinite' }}>ACTIVE</span>}
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: isLocked ? 'rgba(0,0,0,0.2)' : 'var(--text-primary)', marginBottom: '0.15rem' }}>{step.title}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{step.subtitle}</div>
        </div>

        {/* Arrow or lock */}
        <div style={{ flexShrink: 0, color: isCompleted ? '#10B981' : isUnlocked ? step.color : 'rgba(0,0,0,0.1)' }}>
          {isCompleted ? <CheckCircle size={18} color="#10B981" /> : isLocked ? <Lock size={15} /> : <ChevronRight size={18} />}
        </div>
      </div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────
// Main Sandbox Page
// ─────────────────────────────────────────────────────────
export default function SandboxPage() {
  const { isSimplifiedMode, addPoints, unlockBadge } = useAppStore();
  const [currentStep, setCurrentStep] = useState(0); // index of current active step (0-based)
  const [modalStep, setModalStep] = useState<typeof CANDIDACY_STEPS[0] | null>(null);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const totalPoints = CANDIDACY_STEPS.reduce((sum, s) => sum + s.pointsAwarded, 0);
  const earnedPoints = CANDIDACY_STEPS
    .filter((_, i) => completed.has(i))
    .reduce((sum, s) => sum + s.pointsAwarded, 0);
  const progressPct = (completed.size / CANDIDACY_STEPS.length) * 100;

  const handleStepClick = (stepIdx: number) => {
    const step = CANDIDACY_STEPS[stepIdx];
    setModalStep(step);
  };

  const handleComplete = () => {
    if (!modalStep) return;
    const stepIdx = CANDIDACY_STEPS.indexOf(modalStep);
    addPoints(modalStep.pointsAwarded);
    setCompleted((prev) => new Set([...prev, stepIdx]));
    setCurrentStep(stepIdx + 1);
    setModalStep(null);

    if (stepIdx === CANDIDACY_STEPS.length - 1) {
      setTimeout(() => {
        setAllDone(true);
        setShowConfetti(true);
        unlockBadge(CANDIDATE_BADGE);
        setTimeout(() => setShowConfetti(false), 4000);
      }, 300);
    }
  };

  const resetSimulation = () => {
    setCurrentStep(0);
    setCompleted(new Set());
    setAllDone(false);
    setShowConfetti(false);
  };

  const getStepStatus = (idx: number): 'locked' | 'unlocked' | 'completed' => {
    if (completed.has(idx)) return 'completed';
    if (idx === currentStep) return 'unlocked';
    return 'locked';
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      {showConfetti && <Confetti />}

      {/* Modal */}
      <AnimatePresence>
        {modalStep && (
          <StepModal
            step={modalStep}
            isSimplified={isSimplifiedMode}
            onComplete={handleComplete}
            onClose={() => setModalStep(null)}
          />
        )}
      </AnimatePresence>

      {/* Page header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🏛️</div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F59E0B', fontFamily: 'Fira Code, monospace' }}>
            Simulation
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Path to the <span className="gradient-text">Parliament</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 520, lineHeight: 1.65 }}>
          {isSimplifiedMode
            ? 'Pretend you\'re running for election! Complete each step to become an MP. Click the glowing step to begin! 🏆'
            : 'An interactive, step-by-step simulation of running for Lok Sabha. Unlock each stage by completing the previous one.'}
        </p>
      </div>

      {/* Progress bar */}
      <div className="glass" style={{ padding: '1rem 1.25rem', borderRadius: 14, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {completed.size === 0 ? 'Not started' : completed.size === CANDIDACY_STEPS.length ? '🎉 Complete!' : `Step ${currentStep} of ${CANDIDACY_STEPS.length}`}
            </span>
            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.75rem', color: '#34d399' }}>
              {earnedPoints} / {totalPoints} pts
            </span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', borderRadius: 3 }}
            />
          </div>
        </div>
        <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '1rem', fontWeight: 700, color: progressPct === 100 ? '#34d399' : 'var(--accent-primary)', flexShrink: 0 }}>
          {Math.round(progressPct)}%
        </div>
      </div>

      {/* All done celebration */}
      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass"
            style={{ padding: '2rem', borderRadius: 20, textAlign: 'center', marginBottom: '2rem', border: '1px solid rgba(16,185,129,0.5)', boxShadow: '0 0 40px rgba(16,185,129,0.2)' }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🏆</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              You're <span className="emerald-text">Elected!</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', maxWidth: 380, margin: '0 auto 1rem' }}>
              You've completed the full candidacy simulation. The "Candidate" badge has been added to your profile!
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#34d399', fontFamily: 'Fira Code, monospace', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              <Zap size={15} fill="currentColor" />
              <span>+{totalPoints} Civic Points Earned</span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <div style={{ fontSize: '2.5rem', padding: '0.75rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 14 }}>
                {CANDIDATE_BADGE.icon}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700 }}>{CANDIDATE_BADGE.name} Badge</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{CANDIDATE_BADGE.description}</div>
              </div>
            </div>
            <button className="btn btn-ghost" onClick={resetSimulation} style={{ marginTop: '1.25rem' }}>
              ↺ Run Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Steps flowchart */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {CANDIDACY_STEPS.map((step, idx) => (
          <div key={step.id}>
            <StepNode
              step={step}
              status={getStepStatus(idx)}
              onClick={() => handleStepClick(idx)}
            />
            {idx < CANDIDACY_STEPS.length - 1 && (
              <StepConnector unlocked={completed.has(idx)} index={idx} />
            )}
          </div>
        ))}
      </div>

      {/* Hint */}
      {completed.size === 0 && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          👆 Click the glowing <strong style={{ color: 'var(--accent-primary)' }}>Step 1</strong> to begin your journey
        </div>
      )}
    </div>
  );
}
