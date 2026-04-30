'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  FileText, 
  Map, 
  Search, 
  ChevronRight, 
  Zap,
  Info,
  Landmark,
  Building2,
  ChevronDown
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';

const ECI_STATS = [
  { label: 'Polling Stations', value: '1M+', icon: Map },
  { label: 'Polling Staff', value: '15M', icon: Users },
  { label: 'Voters Managed', value: '960M+', icon: Users },
];

const HIERARCHY = [
  {
    id: 'cec',
    role: 'Chief Election Commissioner (CEC)',
    level: 'Top Level',
    duties: 'The constitutional head of the Election Commission. They have the final authority on election schedules, enforcing the Model Code of Conduct, and resolving high-level disputes. They cannot be removed from office except through impeachment by Parliament, ensuring total independence.',
    dutiesSimple: 'The Grand Umpire of India! They are the big boss who makes sure every game (election) is played by the rules. They are so important that nobody can fire them easily.',
  },
  {
    id: 'ec',
    role: 'Election Commissioners (ECs)',
    level: 'National Level',
    duties: 'Two commissioners who assist the CEC in all decision-making. They have equal voting power as the CEC. Together, they form the three-member Commission that manages the world\'s largest democratic exercise.',
    dutiesSimple: 'The Chief\'s best helpers. Think of them as the other two judges on a panel. They help decide everything together so the choice is always fair.',
  },
  {
    id: 'ceo',
    role: 'Chief Electoral Officers (CEOs)',
    level: 'State Level',
    duties: 'An officer of the State Government designated by the ECI for each State/UT. They supervise the preparation of electoral rolls and the conduct of all elections to Parliament and State Legislatures within their state.',
    dutiesSimple: 'The State Captains. Every state has one person in charge who makes sure the voting booths are ready and every grown-up is on the list to vote.',
  },
  {
    id: 'ro',
    role: 'Returning Officers (ROs)',
    level: 'Constituency Level',
    duties: 'The officer responsible for conducting elections in a specific constituency. They accept and scrutinize nomination papers, allot symbols, oversee the polling booths, and officially declare the result of the election.',
    dutiesSimple: 'The Ground Managers. They are the ones who count the actual votes for your neighborhood and announce the winner with a loud cheer!',
  }
];

const POWERS = [
  {
    title: 'Model Code of Conduct',
    desc: 'A set of guidelines for political parties and candidates during elections. It ensures a level playing field by preventing the party in power from using government resources for campaigning.',
    descSimple: 'The Fairness Rules. It stops the people in charge from using their big powers to win again unfairly.',
    icon: ShieldCheck,
    color: '#F97316'
  },
  {
    title: 'Party Registration',
    desc: 'The ECI registers political parties for the purpose of elections. It grants recognition to national and state parties based on their poll performance and allots unique symbols to them.',
    descSimple: 'Team Registration. Just like sports teams, political groups need to sign up and get a special logo (like a Lotus, Hand, or Cycle).',
    icon: FileText,
    color: '#10B981'
  },
  {
    title: 'Delimitation',
    desc: 'The process of fixing limits or boundaries of territorial constituencies in a country or a province having a legislative body. This ensures each seat represents an equal number of voters.',
    descSimple: 'Map Drawing. They draw lines on the map to make sure every area has just the right amount of people voting.',
    icon: Map,
    color: '#0EA5E9'
  },
  {
    title: 'Voter Education (SVEEP)',
    desc: 'Systematic Voters\' Education and Electoral Participation is a program to educate citizens about the electoral process and increase awareness to ensure maximum participation.',
    descSimple: 'Teaching the Voters. They go around telling everyone how important and cool it is to vote!',
    icon: Search,
    color: '#8B5CF6'
  }
];

export default function MachineryPage() {
  const { isSimplifiedMode } = useAppStore();
  const [hoveredRole, setHoveredRole] = useState<typeof HIERARCHY[0] | null>(null);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      {/* ── Hero Section ───────────────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>⚙️</div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-secondary)', fontFamily: 'Fira Code, monospace' }}>
            Infrastructure
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          The <span className="gradient-text">Machinery</span> of Democracy
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 600, lineHeight: 1.65, marginBottom: '2rem' }}>
          {isSimplifiedMode 
            ? "Meet the super-team that makes sure every vote is counted. It's like a giant school project for the whole country!" 
            : "The Election Commission of India (ECI) is the constitutional body that ensures your vote is safe, secret, and significant."}
        </p>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {ECI_STATS.map((stat, i) => (
            <div key={i} className="glass" style={{ padding: '1.5rem', borderRadius: 16, display: 'flex', alignItems: 'center', gap: '1rem', height: '100%', border: '1px solid var(--border-glass)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(249,115,22,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <stat.icon color="var(--accent-primary)" size={24} />
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.25rem' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Pyramid Section ────────────────────────────── */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--text-primary)' }}>Hierarchy of Oversight</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start' }}>
          
          {/* Visual Org Chart (True Pyramid) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            {HIERARCHY.map((role, i) => (
              <div key={role.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <motion.div
                  onMouseEnter={() => setHoveredRole(role)}
                  onMouseLeave={() => setHoveredRole(null)}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 20,
                    background: hoveredRole?.id === role.id ? 'rgba(249,115,22,0.05)' : '#FFFFFF',
                    border: `1px solid ${hoveredRole?.id === role.id ? 'var(--accent-primary)' : 'var(--border-glass)'}`,
                    cursor: 'default',
                    transition: 'all 0.25s ease',
                    width: '100%',
                    maxWidth: i === 0 ? 320 : i === 1 ? 380 : i === 2 ? 440 : 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: hoveredRole?.id === role.id ? '0 12px 40px rgba(249,115,22,0.12)' : '0 2px 10px rgba(0,0,0,0.02)',
                    zIndex: 2,
                    position: 'relative'
                  }}
                >
                  <div style={{ paddingRight: '1rem' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.25rem', letterSpacing: '0.08em' }}>{role.level}</div>
                    <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1rem' }}>{role.role}</div>
                  </div>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: hoveredRole?.id === role.id ? 'var(--accent-primary)' : 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                    <ChevronRight size={18} color={hoveredRole?.id === role.id ? '#FFFFFF' : 'var(--text-secondary)'} />
                  </div>
                </motion.div>
                
                {/* Visual connectors */}
                {i < HIERARCHY.length - 1 && (
                  <div style={{ width: 2, height: 24, background: 'var(--border-glass)', margin: '4px 0' }} />
                )}
              </div>
            ))}
          </div>

          {/* Info Panel with Premium Empty State */}
          <div className="glass" style={{ padding: '2rem', borderRadius: 24, minHeight: 440, display: 'flex', flexDirection: 'column', position: 'sticky', top: 100, justifyContent: 'center', border: '1px solid var(--border-glass)', background: '#FFFFFF' }}>
            <AnimatePresence mode="wait">
              {hoveredRole ? (
                <motion.div
                  key={hoveredRole.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(249,115,22,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <Zap size={26} color="var(--accent-primary)" />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{isSimplifiedMode ? 'What they do' : 'Constitutional Mandate'}</h3>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.75, flex: 1 }}>
                    {isSimplifiedMode ? hoveredRole.dutiesSimple : hoveredRole.duties}
                  </p>
                  
                  <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-glass)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>Chain of Command</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {HIERARCHY.map((_, dotIdx) => (
                        <div key={dotIdx} style={{ flex: 1, height: 6, borderRadius: 3, background: dotIdx <= HIERARCHY.indexOf(hoveredRole) ? 'var(--accent-primary)' : 'var(--border-glass)', transition: 'background 0.3s' }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{ position: 'relative', width: 'fit-content', margin: '0 auto 1.5rem' }}>
                    <Landmark size={88} style={{ color: 'var(--accent-primary)', opacity: 0.1 }} />
                    <div style={{ position: 'absolute', bottom: -5, right: -5, width: 44, height: 44, borderRadius: 12, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                      <Building2 size={24} style={{ color: 'var(--accent-secondary)' }} />
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Nirvachan Sadan</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: 220, margin: '0 auto', lineHeight: 1.7 }}>
                    Select a role from the organizational pyramid to explore their essential duties.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Powers Section ─────────────────────────────────── */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--text-primary)' }}>Foundational Powers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {POWERS.map((p, i) => (
            <div key={i} className="glass card glass-hover" style={{ padding: '1.75rem', borderRadius: 24, border: '1px solid var(--border-glass)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${p.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', flexShrink: 0 }}>
                <p.icon color={p.color} size={24} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{p.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
                {isSimplifiedMode ? p.descSimple : p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)', fontSize: '0.85rem', borderTop: '1px solid var(--border-glass)', marginTop: '2rem' }}>
        <strong>Election Commission of India</strong><br />
        Constitutional Authority Established Under Article 324 of the Indian Constitution
      </footer>
    </div>
  );
}
