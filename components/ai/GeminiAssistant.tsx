'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/appStore';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export function GeminiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isSimplifiedMode } = useAppStore();

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Contextual initial greeting
  useEffect(() => {
    if (isOpen) {
      let greeting = "Namaste! I'm your Chunaav Assistant. How can I help you today?";

      if (pathname === '/timeline') {
        greeting = "Curious about electoral history? Ask me anything about the milestones of Indian democracy!";
      } else if (pathname === '/machinery') {
        greeting = "The ECI machinery is massive! Want to know more about specific roles or powers?";
      }

      setMessages([{ role: 'ai', content: greeting }]);
    }
  }, [isOpen, pathname]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userQuery = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userQuery }]);

    setIsTyping(true);

    // Real API Call
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userQuery }],
          context: pathname
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'AI search failed');
      }

      setMessages((prev) => [...prev, { role: 'ai', content: data.text }]);
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'ai', content: error.message || "I'm sorry, I encountered an error. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '2.0rem', right: '1.5rem', zIndex: 2000 }}>
      {/* Chat Window */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100, x: 50, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100, x: 50 }}
            style={{
              position: 'absolute',
              bottom: '4rem',
              right: 0,
              width: 'min(380px, 85vw)',
              height: '480px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid var(--border-glass)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1rem',
              borderBottom: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(to right, #FFF7ED, #F0FDF4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, var(--accent-primary), #FB923C)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(249, 115, 22, 0.2)'
                }}>
                  <Sparkles size={16} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Chunaav Assistant</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.6rem', color: 'var(--accent-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-secondary)' }} />
                    Active
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(0,0,0,0.04)', border: 'none', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <X size={16} />
              </button>
            </div>

            {/* Chat Content */}
            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#FAFAFA' }}>
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2, delay: i === messages.length - 1 ? 0.1 : 0 }}
                  style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
                >
                  <div style={{
                    maxWidth: '85%',
                    padding: '0.75rem 1rem',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.role === 'user' ? 'var(--text-primary)' : '#FFFFFF',
                    color: msg.role === 'user' ? '#FFFFFF' : 'var(--text-primary)',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    boxShadow: msg.role === 'ai' ? '0 3px 8px rgba(0,0,0,0.03)' : '0 3px 8px rgba(0,0,0,0.1)',
                    border: msg.role === 'ai' ? '1px solid var(--border-glass)' : 'none'
                  }}>
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => <p style={{ margin: '0 0 0.75rem 0' }}>{children}</p>,
                          ul: ({ children }) => <ul style={{ margin: '0 0 0.75rem 0', paddingLeft: '1.2rem' }}>{children}</ul>,
                          ol: ({ children }) => <ol style={{ margin: '0 0 0.75rem 0', paddingLeft: '1.2rem' }}>{children}</ol>,
                          li: ({ children }) => <li style={{ marginBottom: '0.25rem' }}>{children}</li>,
                          strong: ({ children }) => <strong style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{children}</strong>,
                          code: ({ children }) => (
                            <code style={{ 
                              background: 'rgba(0,0,0,0.05)', 
                              padding: '0.2rem 0.4rem', 
                              borderRadius: '4px', 
                              fontSize: '0.9em',
                              fontFamily: 'monospace'
                            }}>
                              {children}
                            </code>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ padding: '0.75rem 1rem', borderRadius: '16px 16px 16px 4px', background: '#FFFFFF', border: '1px solid var(--border-glass)' }}>
                    <Loader2 size={16} color="var(--accent-primary)" className="animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} style={{ padding: '1rem', background: '#FFFFFF', borderTop: '1px solid var(--border-glass)' }}>
              <div style={{ display: 'flex', gap: '0.5rem', background: '#F8FAFC', padding: '0.4rem', borderRadius: '14px', border: '1px solid var(--border-glass)' }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask..."
                  style={{ flex: 1, border: 'none', background: 'none', padding: '0.4rem 0.6rem', fontSize: '0.85rem', color: 'var(--text-primary)', outline: 'none' }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '10px',
                    background: input.trim() ? 'var(--accent-primary)' : '#E2E8F0',
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: input.trim() ? 'pointer' : 'default',
                    transition: 'all 0.2s'
                  }}
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-primary), #FB923C)',
          border: 'none',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(249, 115, 22, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
        }}
      >
        {isOpen ? <X size={20} /> : <Sparkles size={20} />}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            style={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              background: 'var(--accent-primary)',
              zIndex: -1,
            }}
          />
        )}
      </button>
    </div>
  );
}
