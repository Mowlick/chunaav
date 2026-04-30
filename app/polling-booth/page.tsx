'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Fingerprint, 
  CheckCircle2, 
  RotateCcw, 
  Zap,
  Info,
  ChevronRight
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';

const CANDIDATES = [
  { id: 'apple', name: 'Fruit Party', symbol: '🍎' },
  { id: 'star', name: 'Cosmic Front', symbol: '⭐' },
  { id: 'sun', name: 'Solar Alliance', symbol: '☀️' },
  { id: 'nota', name: 'None of the Above', symbol: '🚫' },
];

export default function PollingBoothPage() {
  const { addPoints, unlockBadge, civicPoints, isSimplifiedMode } = useAppStore();
  const [step, setStep] = useState(1); // 1: Ink, 2: Ready, 3: Voting, 4: VVPAT, 5: Done
  const [selectedCandidate, setSelectedCandidate] = useState<typeof CANDIDATES[0] | null>(null);
  const [isInkApplied, setIsInkApplied] = useState(false);
  const [vvpatActive, setVvpatActive] = useState(false);
  
  const beepRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Basic oscillator-based beep for Step 4
    if (step === 4) {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        audioCtx.close();
      }, 1000);
    }
  }, [step]);

  const applyInk = () => {
    setIsInkApplied(true);
    setTimeout(() => setStep(2), 1500);
  };

  const handleVote = (candidate: typeof CANDIDATES[0]) => {
    if (step !== 2) return;
    setSelectedCandidate(candidate);
    setStep(3);
    
    // RED LIGHT animation then BEEP
    setTimeout(() => {
      setStep(4);
      setVvpatActive(true);
      
      // VVPAT slip falls after 7 seconds
      setTimeout(() => {
        setVvpatActive(false);
        setStep(5);
        addPoints(50);
        unlockBadge({
          id: 'first-voter',
          name: 'First Time Voter',
          description: 'Casted a successful vote in the polling booth simulation.',
          icon: '🗳️'
        });
      }, 7000);
    }, 1000);
  };

  const reset = () => {
    setStep(1);
    setSelectedCandidate(null);
    setIsInkApplied(false);
    setVvpatActive(false);
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      {/* ── Page Header ─────────────────────────────────────── */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          The <span className="gradient-text">Polling Booth</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          {isSimplifiedMode 
            ? "Step inside and try out the special voting machines. It's like a real-life video game where you pick the winners!"
            : "Experience the journey of a single vote. From indelible ink to the VVPAT audit."}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
        
        {/* ── Left: EVM Ballot Unit ─────────────────────────── */}
        <div 
          className="glass" 
          style={{ 
            background: '#E2E8F0', 
            borderRadius: 24, 
            padding: '2rem', 
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.1), 0 10px 30px rgba(0,0,0,0.1)',
            border: '8px solid #94A3B8',
            position: 'relative'
          }}
        >
          {/* EVM Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', background: '#94A3B8', padding: '0.5rem 1rem', borderRadius: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: step >= 2 && step < 5 ? '#22C55E' : '#475569', boxShadow: step >= 2 && step < 5 ? '0 0 10px #22C55E' : 'none' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#F8FAFC', textTransform: 'uppercase' }}>{isSimplifiedMode ? 'GAME ON' : 'Ready'}</span>
            </div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#F8FAFC' }}>BALLOT UNIT NO: ECI-2024-X</div>
          </div>

          {/* Candidate Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {CANDIDATES.map((c) => (
              <div 
                key={c.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  background: '#FFFFFF', 
                  padding: '0.75rem', 
                  borderRadius: 8,
                  border: '1px solid #CBD5E1',
                  opacity: step === 1 || step >= 4 ? 0.6 : 1
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 6, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                  {c.symbol}
                </div>
                <div style={{ flex: 1, fontWeight: 700, fontSize: '0.9rem', color: '#1E293B' }}>{c.name}</div>
                
                {/* Voting Button Area */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {/* Red Light */}
                  <div style={{ 
                    width: 14, height: 14, borderRadius: '50%', 
                    background: (selectedCandidate?.id === c.id && step >= 3 && step < 5) ? '#EF4444' : '#475569',
                    boxShadow: (selectedCandidate?.id === c.id && step >= 3 && step < 5) ? '0 0 12px #EF4444' : 'none'
                  }} />
                  {/* Blue Button */}
                  <button 
                    onClick={() => handleVote(c)}
                    disabled={step !== 2}
                    style={{ 
                      width: 44, height: 32, borderRadius: 4, 
                      background: '#1E40AF', 
                      border: 'none', 
                      boxShadow: '0 4px 0 #172554', 
                      cursor: step === 2 ? 'pointer' : 'default',
                      transition: 'all 0.1s',
                    }}
                    onMouseDown={(e) => { if(step === 2) (e.currentTarget as any).style.transform = 'translateY(2px)'; (e.currentTarget as any).style.boxShadow = '0 2px 0 #172554'; }}
                    onMouseUp={(e) => { (e.currentTarget as any).style.transform = 'translateY(0)'; (e.currentTarget as any).style.boxShadow = '0 4px 0 #172554'; }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: VVPAT & Instructions ──────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* VVPAT Machine */}
          <div 
            className="glass" 
            style={{ 
              height: 300, 
              background: '#94A3B8', 
              borderRadius: 20, 
              position: 'relative', 
              overflow: 'hidden',
              border: '10px solid #64748B',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ 
              position: 'absolute', inset: '2rem', background: '#334155', 
              borderRadius: 8, border: '4px solid #475569',
              display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
              overflow: 'hidden'
            }}>
              <AnimatePresence>
                {vvpatActive && selectedCandidate && (
                  <motion.div
                    initial={{ y: -200 }}
                    animate={{ y: 0 }}
                    exit={{ y: 300 }}
                    transition={{ duration: 1 }}
                    style={{ 
                      width: 140, height: 180, background: '#FFFFFF', 
                      padding: '1rem', display: 'flex', flexDirection: 'column', 
                      alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' 
                    }}
                  >
                    <div style={{ fontSize: '0.6rem', color: '#64748B', fontWeight: 800 }}>VVPAT AUDIT SLIP</div>
                    <div style={{ fontSize: '3rem', margin: '0.5rem 0' }}>{selectedCandidate.symbol}</div>
                    <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#1E293B', textAlign: 'center' }}>{selectedCandidate.name}</div>
                    <div style={{ height: 1, width: '100%', background: '#E2E8F0', margin: '0.5rem 0' }} />
                    <div style={{ fontSize: '0.5rem', color: '#94A3B8' }}>{isSimplifiedMode ? 'RECEIPT PRINTED' : 'SECURE TRANSACTION'}</div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Glass Reflection */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)', pointerEvents: 'none' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '0.5rem', left: '50%', transform: 'translateX(-50%)', fontSize: '0.6rem', fontWeight: 800, color: '#F1F5F9', opacity: 0.5 }}>VVPAT UNIT</div>
          </div>

          {/* Instructions Box */}
          <div className="glass" style={{ padding: '1.5rem', borderRadius: 20, flex: 1 }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info size={18} color="var(--accent-primary)" />
              {step === 5 ? (isSimplifiedMode ? 'YOU DID IT!' : 'Voting Successful') : (isSimplifiedMode ? 'YOUR MISSION' : 'Action Required')}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {isSimplifiedMode ? 'First, you need the special purple mark on your finger to show you are a hero voter!' : 'Every voter must be identified by a mark of indelible ink on their left forefinger before voting.'}
                  </p>
                  <motion.button 
                    initial={{ scale: 0.95 }} animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={applyInk}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', gap: '0.75rem', height: 54 }}
                  >
                    <Fingerprint size={20} />
                    {isSimplifiedMode ? 'Get My Ink Mark' : 'Apply Indelible Ink'}
                  </motion.button>
                </div>
              )}

              {step === 2 && (
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {isSimplifiedMode ? (
                    <>Ink applied! Now the machine is <strong>READY</strong>. Pick your favorite team and press their blue button!</>
                  ) : (
                    <>Ink applied! The EVM is now <strong style={{ color: '#22C55E' }}>READY</strong>. Please click the blue button next to your chosen candidate.</>
                  )}
                </div>
              )}

              {step > 2 && step < 5 && (
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {isSimplifiedMode ? (
                    <>Beep! Your choice is moving to the screen. <strong>Look at the little window for 7 seconds!</strong></>
                  ) : (
                    <>Vote recorded. Verifying on VVPAT screen. <strong>Please wait 7 seconds...</strong></>
                  )}
                </div>
              )}

              {step === 5 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', fontWeight: 800, marginBottom: '0.5rem' }}>
                    <CheckCircle2 size={20} />
                    {isSimplifiedMode ? 'MISSION COMPLETE' : 'Vote Cast Securely'}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    {isSimplifiedMode 
                      ? "You used your superpower! You helped pick a leader and earned 50 points!"
                      : "Democracy in Action: Your vote is securely recorded. You've earned 50 Civic Points!"}
                  </p>
                  <button onClick={reset} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                    <RotateCcw size={15} />
                    {isSimplifiedMode ? 'Play Again' : 'Vote Again'}
                  </button>
                </motion.div>
              )}

              {/* Progress Visual */}
              <div style={{ marginTop: 'auto', display: 'flex', gap: '0.25rem' }}>
                {[1,2,3,4,5].map(s => (
                  <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: step >= s ? (step === 5 ? '#10B981' : 'var(--accent-primary)') : 'var(--border-glass)' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
