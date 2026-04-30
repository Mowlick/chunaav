'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  History,
  UserCircle,
  Award,
  ArrowRight,
  Fingerprint,
  Megaphone,
  FileSignature,
  Binoculars,
  UserCheck,
  Search,
  ShieldAlert,
  Cpu,
  BookOpenCheck,
  Beaker,
  Settings2,
  ListChecks,
  Eye,
  Droplets,
  Shield,
  Briefcase
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';

interface Profile {
  id: string;
  name: string;
  title: string;
  badge: string;
  bio: string;
  bioSimple: string;
  type: 'Historical' | 'Role';
  icon: any; // Lucide icon or emoji
  image?: string;
  interactions?: string[];
}

const PROFILES: Profile[] = [
  {
    id: 'sukumar-sen',
    name: 'Sukumar Sen',
    title: '1st Chief Election Commissioner',
    badge: 'Pioneer',
    type: 'Historical',
    icon: UserCheck,
    image: '/sukumar-sen.jpg',
    bio: 'Sukumar Sen managed India\'s first two general elections in 1951-52 and 1957. He faced the monumental task of organizing an election for 176 million citizens, most of whom were illiterate, with no prior roadmap.',
    bioSimple: 'The first person to ever organize a huge election in India. He had to figure out everything from scratch for millions of people!',
  },
  {
    id: 'shyam-saran-negi',
    name: 'Shyam Saran Negi',
    title: 'The First Voter of India',
    badge: 'Icon',
    type: 'Historical',
    icon: Fingerprint,
    image: '/shyam-saran-negi.jpg',
    bio: 'A schoolteacher from Kinnaur, Himachal Pradesh, who cast the very first vote in independent India\'s first general election in 1951. He voted in every single general election until his passing in 2022.',
    bioSimple: 'The first citizen to vote in independent India! He voted in every election for over 70 years, never missing a single one.',
  },
  {
    id: 'tn-seshan',
    name: 'T. N. Seshan',
    title: '10th Chief Election Commissioner',
    badge: 'The Enforcer',
    type: 'Historical',
    icon: ShieldAlert,
    image: '/tn-seshan.jpg',
    bio: 'T.N. Seshan is widely credited with cleaning up the Indian electoral system by ruthlessly enforcing the Model Code of Conduct. He introduced Voter ID cards and cracked down on candidate overspending and rule-breaking.',
    bioSimple: 'Imagine a game of cricket where players keep cheating and ignoring the umpire. T.N. Seshan was like the strictest, toughest umpire ever. He blew the whistle, handed out red cards, and made sure every single politician played fair and followed the rules!',
  },
  {
    id: 'vs-ramadevi',
    name: 'V. S. Ramadevi',
    title: '9th Chief Election Commissioner',
    badge: 'Trailblazer',
    type: 'Historical',
    icon: Award,
    image: '/vs-ramadevi.jpg',
    bio: 'She was the first woman to ever hold the office of the Chief Election Commissioner of India. Her tenure paved the way for female leadership at the highest levels of India\'s democratic machinery.',
    bioSimple: 'Running an election in India is like organizing the biggest party in the world. V.S. Ramadevi was the very first woman to be the absolute boss of this giant party, proving that women can lead the biggest teams in the country.',
  },
  {
    id: 'mb-haneefa',
    name: 'M. B. Haneefa',
    title: 'EVM Prototype Inventor',
    badge: 'Innovator',
    type: 'Historical',
    icon: Cpu,
    image: '/mb-haneefa.jpg',
    bio: 'Haneefa is credited with inventing the first electronic voting machine prototype in India in 1980. His early designs set the foundation for the modern EVMs that eventually phased out paper ballots.',
    bioSimple: 'A long time ago, people voted by dropping pieces of paper into a box, and counting them took forever! M.B. Haneefa was a smart inventor who built a special, super-fast calculator with buttons—the very first voting machine—so counting votes became quick and easy.',
  },
  {
    id: 'br-ambedkar',
    name: 'Dr. B.R. Ambedkar',
    title: 'Chairman, Drafting Committee',
    badge: 'The Architect',
    type: 'Historical',
    icon: BookOpenCheck,
    image: '/br-ambedkar.jpg',
    bio: 'He fiercely advocated for Universal Adult Franchise, giving every adult the right to vote regardless of literacy or wealth, and championed the creation of an independent Election Commission free from government control.',
    bioSimple: 'When India was making its big rulebook (the Constitution), Dr. Ambedkar stood up and said, "It doesn\'t matter if you are rich or poor, or if you can read or not—everyone gets to vote!" He also made sure the election umpires were completely independent, so nobody could boss them around.',
  },
  {
    id: 'csir-npl',
    name: 'Scientists of CSIR-NPL',
    title: 'Indelible Ink Researchers',
    badge: 'Mark Makers',
    type: 'Historical',
    icon: Beaker,
    image: '/csir-npl.jpg',
    bio: 'In the early 1960s, scientists at the National Physical Laboratory developed the chemical formula for India\'s indelible ink. This invention became the ultimate defense against fraudulent, repeat voting.',
    bioSimple: 'How do you stop a sneaky person from voting twice? You call in the scientists! They invented a magic purple ink that paints your fingernail and doesn\'t wash off for weeks. Once you get the purple mark, everyone knows you already took your turn!',
  },
  {
    id: 'voter',
    name: 'The Voter',
    title: 'The Heart of Democracy',
    badge: 'Core',
    type: 'Role',
    icon: UserCheck,
    bio: 'The foundational pillar of democracy. A voter is a citizen who exercises their sovereign right to choose representatives. Their role is not just to cast a vote, but to do so after informed deliberation, free from influence or coercion. In India, universal adult suffrage ensures every citizen above 18 has this power regardless of caste, creed, or gender.',
    bioSimple: 'That\'s you! When you grow up, you get a superpower called "Voting." You use it to pick the leaders who will make the rules for everyone. It\'s like picking the best teammate for a big game!',
    interactions: ['The Candidate', 'The Polling Agent']
  },
  {
    id: 'presiding-officer',
    name: 'Presiding Officer',
    title: 'The Booth Boss',
    badge: 'Authority',
    type: 'Role',
    icon: Briefcase,
    bio: 'The absolute authority inside the polling station. They are responsible for setting up the EVMs and VVPATs, ensuring the secrecy of the vote, managing the polling agents, and sealing the machines securely at the end of the day.',
    bioSimple: 'Think of them as the principal of the voting room! They unlock the doors in the morning, make sure all the voting machines are working perfectly, and keep the room quiet and organized so everyone can vote safely.',
    interactions: ['Polling Officer No. 2', 'Polling Agent']
  },
  {
    id: 'ero',
    name: 'Electoral Registration Officer',
    title: 'The List Keeper',
    badge: 'Administrator',
    type: 'Role',
    icon: ListChecks,
    bio: 'Responsible for preparing, revising, and updating the Electoral Roll. They process all the forms from citizens requesting to add their names, correct their details, or remove duplicate entries, ensuring a clean voter list.',
    bioSimple: 'They are the ultimate list-makers! Just like making a guest list for a giant party, the ERO writes down the names of every single person who is allowed to vote, making sure nobody gets left out.',
    interactions: ['The Voter']
  },
  {
    id: 'observer',
    name: 'General Observer',
    title: 'The ECI\'s Eyes & Ears',
    badge: 'Watchdog',
    type: 'Role',
    icon: Eye,
    bio: 'Senior civil servants deployed directly by the ECI. They monitor the entire process in a constituency to ensure strict adherence to the Model Code of Conduct, keeping an eye on campaign spending, fairness, and security.',
    bioSimple: 'Imagine a referee who is flown in from a different city just to watch the game and make sure nobody is cheating. If a politician breaks the rules, the Observer immediately calls the big bosses to stop them!',
    interactions: ['Returning Officer', 'The Candidate']
  },
  {
    id: 'po2',
    name: 'Polling Officer No. 2',
    title: 'The Ink Master',
    badge: 'Specialist',
    type: 'Role',
    icon: Droplets,
    bio: 'While the first polling officer checks your identity, Polling Officer No. 2 has two vital jobs: they inspect your left index finger for any existing marks, and then apply the indelible ink to your nail and skin to prevent duplicate voting.',
    bioSimple: 'This is the person with the magic purple ink! Before you press the button, they paint a little purple stripe on your finger. It doesn\'t wash off for weeks, which tells the whole world, "I already took your turn!"',
    interactions: ['The Voter', 'Presiding Officer']
  },
  {
    id: 'security',
    name: 'Security Personnel / CAPF',
    title: 'The Shield',
    badge: 'Guardian',
    type: 'Role',
    icon: Shield,
    bio: 'Deployed to maintain law and order, these forces secure the polling stations, protect the EVM strongrooms, and ensure that voters can cast their ballots without fear of intimidation or violence.',
    bioSimple: 'They are the brave guards who stand outside the voting rooms and walk with the machines to keep them safe. They make sure bullies can\'t scare anyone and that everyone feels safe while voting.',
    interactions: ['The Voter', 'Presiding Officer']
  },
  {
    id: 'ro',
    name: 'Returning Officer',
    title: 'The District Guardian',
    badge: 'Officer',
    type: 'Role',
    icon: FileSignature,
    bio: 'The statutory authority responsible for conducting elections in a constituency. From the moment the election is announced until the results are declared, the RO is the legal "referee." They scrutinize candidate nominations, oversee the counting of votes, and have the legal power to declare a winner. Their neutrality is the bedrock of election integrity.',
    bioSimple: 'The Election Referee. They check if the players (candidates) are allowed to play, count every single point (vote), and announce the winner. They make sure nobody breaks the rules!',
    interactions: ['The Candidate', 'The Polling Agent']
  },
  {
    id: 'candidate',
    name: 'The Candidate',
    title: 'The Representative',
    badge: 'Participant',
    type: 'Role',
    icon: Megaphone,
    bio: 'An aspiring representative who stands for election. Candidates must file detailed affidavits disclosing their criminal, financial, and educational background, ensuring transparency. They campaign to share their vision, but must strictly adhere to the Model Code of Conduct to ensure they don\'t unfairly influence voters.',
    bioSimple: 'The person who wants to be a leader. They give speeches to tell you their big ideas. They have to tell the truth about themselves and play fair to win your trust.',
    interactions: ['The Voter', 'Returning Officer']
  },
  {
    id: 'polling-agent',
    name: 'Polling Agent',
    title: 'The Party Watchdog',
    badge: 'Observer',
    type: 'Role',
    icon: Binoculars,
    bio: 'Appointed by candidates to observe the proceedings at a polling station. Their presence ensures that the polling process is transparent and that the identity of voters is verified correctly. They are the "eyes and ears" of the candidates, providing an additional layer of security and accountability to the process.',
    bioSimple: 'The Election Helper. They sit at the voting place and watch everything carefully to make sure every kid\'s mom and dad vote correctly and that everything is safe and fair.',
    interactions: ['The Voter', 'Returning Officer']
  }
];

export default function HallOfDemocracyPage() {
  const { isSimplifiedMode } = useAppStore();
  const [activeTab, setActiveTab] = useState<'Historical' | 'Role'>('Historical');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const filteredProfiles = PROFILES.filter(p => p.type === activeTab);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      {/* ── Header ────────────────────────────────────────── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🏛️</div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-primary)', fontFamily: 'Fira Code, monospace' }}>
            National Heritage
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Hall of <span className="gradient-text">Democracy</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 600, lineHeight: 1.6 }}>
          Honoring the pioneers of Indian suffrage and defining the essential roles that safeguard our democratic process.
        </p>
      </section>

      {/* ── Tabs ──────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.03)', padding: '0.4rem', borderRadius: 14, width: 'fit-content', marginBottom: '2.5rem' }}>
        {(['Historical', 'Role'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 10,
              border: 'none',
              background: activeTab === tab ? '#FFFFFF' : 'transparent',
              color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: activeTab === tab ? '0 4px 12px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem'
            }}
          >
            {tab === 'Historical' ? <History size={17} strokeWidth={activeTab === tab ? 2.5 : 2} /> : <Award size={17} strokeWidth={activeTab === tab ? 2.5 : 2} />}
            {tab === 'Historical' ? 'Historical Icons' : 'Key Roles'}
          </button>
        ))}
      </div>

      {/* ── Grid ──────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredProfiles.map(profile => (
          <motion.div
            key={profile.id}
            layoutId={profile.id}
            onClick={() => setSelectedProfile(profile)}
            whileHover={{ scale: 1.01, y: -2 }}
            className="glass card glass-hover"
            style={{ 
              padding: '1.75rem', 
              borderRadius: 24, 
              cursor: 'pointer', 
              position: 'relative', 
              overflow: 'hidden', 
              border: '1px solid var(--border-glass)',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              background: '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(249,115,22,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent-primary)',
                border: '1px solid rgba(249,115,22,0.1)',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                {profile.image ? (
                  <img src={profile.image} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <profile.icon size={28} />
                )}
              </div>
              <div style={{ minWidth: 0 }}>
                <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.name}</h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.title}</div>
              </div>
            </div>
            
            <div style={{ fontSize: '0.62rem', fontWeight: 800, background: 'rgba(16,185,129,0.1)', color: 'var(--accent-secondary)', padding: '3px 10px', borderRadius: 20, width: 'fit-content', marginBottom: '1rem', letterSpacing: '0.05em' }}>
              {profile.badge.toUpperCase()}
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {isSimplifiedMode ? profile.bioSimple : profile.bio}
            </p>

            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
              Read Journey <ArrowRight size={14} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Slide-over Detail View ────────────────────────── */}
      <AnimatePresence>
        {selectedProfile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProfile(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,4,53,0.15)', backdropFilter: 'blur(8px)', zIndex: 1000 }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              style={{
                position: 'fixed', right: 0, top: 0, bottom: 0,
                width: 'min(540px, 100%)', background: '#FFFFFF',
                zIndex: 1001, padding: '3rem', boxShadow: '-20px 0 60px rgba(0,0,0,0.08)',
                overflowY: 'auto'
              }}
            >
              <button
                onClick={() => setSelectedProfile(null)}
                style={{
                  position: 'absolute', top: '2rem', right: '2rem',
                  background: 'rgba(0,0,0,0.03)', border: 'none',
                  cursor: 'pointer', color: 'var(--text-secondary)',
                  width: 40, height: 40, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
              >
                <X size={20} />
              </button>

              <div style={{ marginTop: '1rem' }}>
                <div style={{
                  width: 120, height: 120, borderRadius: '50%',
                  background: 'rgba(249,115,22,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-primary)',
                  marginBottom: '2rem',
                  border: '1px solid rgba(249,115,22,0.1)',
                  overflow: 'hidden'
                }}>
                  {selectedProfile.image ? (
                    <img src={selectedProfile.image} alt={selectedProfile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <selectedProfile.icon size={48} />
                  )}
                </div>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem', letterSpacing: '-0.03em' }}>{selectedProfile.name}</h2>
                <div style={{ color: 'var(--accent-primary)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '2rem' }}>{selectedProfile.title}</div>
                
                <div style={{ height: 1, background: 'var(--border-glass)', marginBottom: '2.5rem' }} />

                <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{selectedProfile.type === 'Historical' ? 'Historical Perspective' : 'Role Responsibilities'}</h4>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
                  {isSimplifiedMode ? selectedProfile.bioSimple : selectedProfile.bio}
                </p>

                {selectedProfile.interactions && (
                  <div>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>Electoral Ecosystem</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
                      {selectedProfile.interactions.map(roleName => (
                        <div key={roleName} style={{
                          padding: '0.625rem 1.125rem', background: '#F8FAFC',
                          borderRadius: 14, fontSize: '0.9rem', fontWeight: 700,
                          color: 'var(--text-primary)', display: 'flex',
                          alignItems: 'center', gap: '0.625rem',
                          border: '1px solid var(--border-glass)'
                        }}>
                          <UserCircle size={18} color="var(--accent-secondary)" />
                          {roleName}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
