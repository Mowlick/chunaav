'use client';

import { useState, useRef, useEffect } from 'react';
import { Languages, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, LanguageCode } from '@/store/appStore';

const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi (हिन्दी)' },
  { code: 'ta', label: 'Tamil (தமிழ்)' },
  { code: 'bn', label: 'Bengali (বাংলা)' },
  { code: 'te', label: 'Telugu (తెలుగు)' },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = useAppStore((s) => s.currentLanguage);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 0.8rem',
          borderRadius: '20px',
          border: '1px solid var(--border-glass)',
          background: 'rgba(255, 255, 255, 0.5)',
          cursor: 'pointer',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--text-secondary)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)')}
      >
        <Languages size={14} color="var(--accent-primary)" />
        <span style={{ textTransform: 'uppercase' }}>{currentLanguage}</span>
        <ChevronDown size={12} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 0.5rem)',
              right: 0,
              width: '180px',
              background: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              border: '1px solid rgba(0,0,0,0.05)',
              padding: '0.5rem',
              zIndex: 1000,
            }}
          >
            <div style={{ padding: '0.5rem', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
              Select Language
            </div>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: currentLanguage === lang.code ? 'rgba(249, 115, 22, 0.08)' : 'transparent',
                  color: currentLanguage === lang.code ? 'var(--accent-primary)' : 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontWeight: currentLanguage === lang.code ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (currentLanguage !== lang.code) e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)';
                }}
                onMouseLeave={(e) => {
                  if (currentLanguage !== lang.code) e.currentTarget.style.background = 'transparent';
                }}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        DOM PREPARATION FOR TRANSLATION:
        All proper nouns and abbreviations must be wrapped in <span translate="no">.
        Example: <span translate="no">Lok Sabha</span> or <span translate="no">EVM</span>.
        This prevents the Google Cloud Translation API from translating them literally into target languages.
      */}
    </div>
  );
}
