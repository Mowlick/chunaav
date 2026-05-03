'use client';

import { useState, useRef, useEffect } from 'react';
import { CheckCircle, XCircle, Zap } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizBlockProps {
  questions: QuizQuestion[];
  pointsPerQuestion?: number;
  onComplete?: (score: number, total: number) => void;
  limit?: number; // Only show X questions from the pool
  shuffle?: boolean; // Whether to shuffle the questions
}

type AnswerState = 'unanswered' | 'correct' | 'wrong';

export function QuizBlock({ 
  questions, 
  pointsPerQuestion = 30, 
  onComplete,
  limit,
  shuffle = true
}: QuizBlockProps) {
  const addPoints = useAppStore((s) => s.addPoints);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const pointsPopRef = useRef<HTMLDivElement>(null);

  // Initialize/Shuffle questions
  useEffect(() => {
    let pool = [...questions];
    if (shuffle) {
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
    }
    if (limit) {
      pool = pool.slice(0, limit);
    }
    setShuffledQuestions(pool);
  }, [questions, limit, shuffle]);

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswerState('unanswered');
    setShowExplanation(false);
    setScore(0);
    setDone(false);
    
    // Reshuffle for next time
    let pool = [...questions];
    if (shuffle) {
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
    }
    if (limit) pool = pool.slice(0, limit);
    setShuffledQuestions(pool);
  };

  const q = shuffledQuestions[currentQ];

  const handleSelect = (idx: number) => {
    if (!q || answerState !== 'unanswered') return;
    setSelected(idx);
    const correct = idx === q.correctIndex;
    setAnswerState(correct ? 'correct' : 'wrong');
    setShowExplanation(true);
    if (correct) {
      addPoints(pointsPerQuestion);
      setScore((s) => s + 1);
      // animate points pill
      const el = pointsPopRef.current;
      if (el) {
        el.classList.remove('points-pop');
        void el.offsetWidth;
        el.classList.add('points-pop');
      }
    }
  };

  const handleNext = () => {
    if (currentQ < shuffledQuestions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswerState('unanswered');
      setShowExplanation(false);
    } else {
      setDone(true);
      onComplete?.(score + (answerState === 'correct' ? 1 : 0), shuffledQuestions.length);
    }
  };

  if (shuffledQuestions.length === 0) return null;

  if (done) {
    const finalScore = score;
    const total = shuffledQuestions.length;
    const pct = Math.round((finalScore / total) * 100);
    const isGreat = pct >= 70;

    return (
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{isGreat ? '🏆' : '📚'}</div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.3rem' }}>
          {isGreat ? 'Excellent Work!' : 'Keep Learning!'}
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
          You got <strong style={{ color: isGreat ? '#34d399' : '#F59E0B' }}>{finalScore}/{total}</strong> correct ({pct}%)
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#34d399', fontFamily: 'Fira Code, monospace', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          <Zap size={14} fill="currentColor" />
          +{finalScore * pointsPerQuestion} Civic Points earned
        </div>
        <button
          className="btn btn-ghost"
          onClick={resetQuiz}
          style={{ fontSize: '0.85rem' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'Fira Code, monospace' }}>
          Question {currentQ + 1} of {shuffledQuestions.length}
        </span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {shuffledQuestions.map((_, i) => (
            <div key={i} style={{ width: 24, height: 4, borderRadius: 2, background: i <= currentQ ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)', transition: 'background 0.3s' }} />
          ))}
        </div>
      </div>

      {/* Question */}
      <p style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
        {q.question}
      </p>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {q.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === q.correctIndex;
          const revealed = answerState !== 'unanswered';

          let borderColor = 'var(--border-glass)';
          let bg = 'transparent';
          let textColor = 'var(--text-secondary)';
          let extraClass = '';

          if (revealed) {
            if (isCorrect) {
              borderColor = '#10B981';
              bg = 'rgba(16,185,129,0.1)';
              textColor = '#34d399';
              extraClass = 'correct-answer';
            } else if (isSelected && !isCorrect) {
              borderColor = '#EF4444';
              bg = 'rgba(239,68,68,0.1)';
              textColor = '#f87171';
            } else {
              textColor = 'rgba(156,163,175,0.4)';
            }
          } else if (isSelected) {
            borderColor = 'var(--accent-primary)';
            bg = 'rgba(249,115,22,0.1)';
            textColor = '#FDBA74';
          }

          return (
            <button
              key={idx}
              id={`quiz-option-${currentQ}-${idx}`}
              className={extraClass}
              onClick={() => handleSelect(idx)}
              disabled={revealed}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '0.75rem 1rem',
                borderRadius: 10,
                border: `1px solid ${borderColor}`,
                background: bg,
                color: textColor,
                cursor: revealed ? 'default' : 'pointer',
                fontSize: '0.875rem',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
              }}
            >
              <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.75rem', opacity: 0.6, flexShrink: 0 }}>
                {String.fromCharCode(65 + idx)}.
              </span>
              <span style={{ flex: 1 }}>{opt}</span>
              {revealed && isCorrect && <CheckCircle size={16} color="#10B981" style={{ flexShrink: 0 }} />}
              {revealed && isSelected && !isCorrect && <XCircle size={16} color="#EF4444" style={{ flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div style={{ marginTop: '1rem', padding: '0.875rem 1rem', borderRadius: 10, background: answerState === 'correct' ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${answerState === 'correct' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.2)'}`, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, display: 'flex', gap: '0.5rem' }}>
          <span style={{ flexShrink: 0 }}>{answerState === 'correct' ? '✅' : '💡'}</span>
          <span>{q.explanation}</span>
        </div>
      )}

    {/* Next button */}
    {answerState !== 'unanswered' && (
      <button
        className="btn btn-primary"
        onClick={handleNext}
        style={{ marginTop: '1.25rem', width: '100%', justifyContent: 'center' }}
      >
        {currentQ < shuffledQuestions.length - 1 ? 'Next Question →' : 'See Results'}
      </button>
    )}

      <div ref={pointsPopRef} />
    </div>
  );
}
