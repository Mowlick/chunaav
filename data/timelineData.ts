export interface TimelineFact {
  label: string;
  value: string;
}

export interface TimelineMilestone {
  id: string;
  year: number;
  title: string;
  subtitle: string;
  era: 'foundation' | 'growth' | 'reform' | 'digital' | 'modern';
  color: string;
  facts: TimelineFact[];
  text: string;
  textSimple: string;
  icon: string; // emoji
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const ERAS: Record<TimelineMilestone['era'], { label: string; color: string }> = {
  foundation: { label: 'Foundation', color: '#F97316' },
  growth:     { label: 'Growth',     color: '#F59E0B' },
  reform:     { label: 'Reform',     color: '#EF4444' },
  digital:    { label: 'Digital',    color: '#3B82F6' },
  modern:     { label: 'Modern',     color: '#10B981' },
};

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: '1951',
    year: 1951,
    title: 'First General Election',
    subtitle: "Democracy's Dawn",
    era: 'foundation',
    color: '#F97316',
    icon: '🗳️',
    facts: [
      { label: 'Eligible Voters', value: '~173M' },
      { label: 'Turnout', value: '45.7%' },
      { label: 'Parties Contesting', value: '53' },
      { label: 'Seats', value: '489' },
    ],
    text: `India's first general election — held between October 1951 and February 1952 — was the world's largest democratic experiment at the time. With a largely illiterate electorate, the Election Commission, led by Sukumar Sen, devised a unique ballot-box system: each candidate was assigned a distinct symbol and a dedicated box, allowing voters to drop their ballot without needing to read. Over 225,000 polling stations were established across a vast and newly-independent nation. The Indian National Congress, led by Jawaharlal Nehru, won a landslide majority with 364 of 489 seats, establishing the template for parliamentary democracy in India.`,
    textSimple: `India had its first big vote in 1951! It was like the country's very first "pick your favourite leader" day. Because many people couldn't read, each candidate got their own special picture — like a cow or a bicycle — so voters just dropped a ball into the right box. Nehru's party won, and democracy in India began! 🎉`,
  },
  {
    id: '1967',
    year: 1967,
    title: 'Congress Loses Many States',
    subtitle: 'Rise of Regional Parties',
    era: 'growth',
    color: '#F59E0B',
    icon: '🗺️',
    facts: [
      { label: 'Turnout', value: '61.3%' },
      { label: 'Congress Seats', value: '283 (↓)' },
      { label: 'Regional Parties', value: 'Rise' },
      { label: 'Defections', value: 'Widespread' },
    ],
    text: `The 1967 elections marked a seismic shift in Indian politics. The Congress party, long dominant since independence, saw its majority sharply eroded at the national level and lost power in several key states including Tamil Nadu, Kerala, Rajasthan, and West Bengal. Regional parties and coalitions surged. This election also triggered a wave of political defections — MLAs switching parties for money or power — a phenomenon so rampant it earned the nickname "Aaya Ram Gaya Ram" after a Haryana MLA who switched parties three times in a single day. This would eventually lead to the Anti-Defection Law of 1985.`,
    textSimple: `In 1967, the big Congress party started losing to smaller regional parties — teams that cared more about their own state than the whole country. This was also the time when politicians started switching teams a lot, like players changing football clubs! That was called "Aaya Ram Gaya Ram." It was so messy they later made a rule to stop it. 🔄`,
  },
  {
    id: '1975',
    year: 1975,
    title: 'Emergency Declared',
    subtitle: 'Democracy Suspended',
    era: 'reform',
    color: '#EF4444',
    icon: '🚨',
    facts: [
      { label: 'Duration', value: '21 months' },
      { label: 'PM', value: 'Indira Gandhi' },
      { label: 'Jailed Leaders', value: '100,000+' },
      { label: 'Press Freedom', value: 'Suspended' },
    ],
    text: `On June 25, 1975, Prime Minister Indira Gandhi declared a State of Emergency across India, citing internal disturbance. Elections were suspended, civil liberties curtailed, the press censored, and thousands of political opponents — including opposition leaders like Jayaprakash Narayan — were imprisoned under the Maintenance of Internal Security Act (MISA). The 21-month Emergency (1975–77) remains the most severe test of India's democratic institutions. The Supreme Court controversially upheld the detentions. When elections were finally held in 1977, the electorate voted resoundingly against the Congress, electing the Janata Party — India's first non-Congress government.`,
    textSimple: `In 1975, India's Prime Minister Indira Gandhi did something scary — she said "No more elections!" and put many people in jail who disagreed with her. It was like the class bully taking away everyone's right to vote for class captain. But when elections came back in 1977, people voted her OUT! Democracy won. 💪`,
  },
  {
    id: '1977',
    year: 1977,
    title: 'Return of Democracy',
    subtitle: 'First Non-Congress Government',
    era: 'reform',
    color: '#8B5CF6',
    icon: '🕊️',
    facts: [
      { label: 'Turnout', value: '60.5%' },
      { label: 'Janata Party Seats', value: '295' },
      { label: 'Congress Seats', value: '154 (↓)' },
      { label: 'PM Elected', value: 'Morarji Desai' },
    ],
    text: `The 1977 general election stands as one of India's most powerful democratic moments. After 21 months of Emergency, voters went to the polls in massive numbers to rebuke Indira Gandhi's Congress party. Multiple opposition groups united under the Janata Party banner — a coalition of disparate ideologies bound by a shared purpose: restoring democracy. Congress was routed, winning only 154 seats against Janata's 295. Morarji Desai became India's first non-Congress Prime Minister. The election proved that despite suppression, India's democratic spirit remained unbroken — a lesson that continues to resonate.`,
    textSimple: `After the scary Emergency period, people got to vote again in 1977. Everyone was SO excited to vote that millions showed up. They voted the bully OUT and chose a new leader — Morarji Desai! It was like the whole class finally getting their captain vote back and choosing someone new. India's democracy survived! 🗳️✨`,
  },
  {
    id: '1982',
    year: 1982,
    title: 'First EVM Pilot',
    subtitle: 'Technology Enters the Booth',
    era: 'digital',
    color: '#3B82F6',
    icon: '💻',
    facts: [
      { label: 'Location', value: 'North Paravur, Kerala' },
      { label: 'Inventor', value: 'M.B. Haneefa' },
      { label: 'Full Rollout', value: '2000 Onwards' },
      { label: 'Battery Life', value: '5 years' },
    ],
    text: `The Electronic Voting Machine (EVM) made its quiet debut in a single constituency — North Paravur in Kerala — during a state assembly by-election in 1982. Designed by Electronics Corporation of India Ltd (ECIL) and Bharat Electronics Limited (BEL), the EVM was engineered to eliminate the chaos of traditional paper ballots: fraudulent votes, booth capturing, and the slow manual counting process. The machine could record 3,840 votes per unit. Though this pilot was mired in legal controversy (the Supreme Court initially stayed EVM use, citing lack of statutory backing), it planted the seed for what would become one of the most trusted electoral technologies in the world.`,
    textSimple: `In 1982, India tried something new in voting — a machine! Instead of putting a paper in a box, you pressed a button. It was like switching from writing answers on paper to using a calculator. At first some people didn't trust it, but it turned out to be really reliable! Now India uses these machines in every election. 🔘`,
  },
  {
    id: '1989',
    year: 1989,
    title: 'Voter ID Cards Introduced',
    subtitle: 'Identity in Democracy',
    era: 'digital',
    color: '#06B6D4',
    icon: '🪪',
    facts: [
      { label: 'Program Name', value: 'EPIC Scheme' },
      { label: 'Target', value: '600M cards' },
      { label: 'Chief Election Commr', value: 'T.N. Seshan' },
      { label: 'Unique Feature', value: 'Photo ID' },
    ],
    text: `The introduction of the Elector's Photo Identity Card (EPIC) — commonly called the Voter ID — was championed vigorously by Chief Election Commissioner T.N. Seshan in the early 1990s. Seshan's tenure (1990–96) transformed the Election Commission from a largely ceremonial body into a powerful, independent institution. He enforced the Model Code of Conduct with unprecedented strictness, used EPIC to curb bogus voting, and made politicians genuinely fearful of electoral rules. The Supreme Court described him as "a one-man army." His tenure is widely credited with professionalising Indian elections and dramatically reducing booth capturing and voter impersonation.`,
    textSimple: `Getting a Voter ID card was a BIG deal! Chief Election Commissioner T.N. Seshan was like the strict referee of Indian elections. He made sure everyone had their own special ID card to prove who they were before voting. This stopped cheaters from voting as someone else. He was so strict that even politicians were a little scared of him! 😄`,
  },
  {
    id: '1999',
    year: 1999,
    title: 'EVMs Used Nationwide',
    subtitle: 'Full Digital Transition',
    era: 'digital',
    color: '#3B82F6',
    icon: '🖥️',
    facts: [
      { label: 'Year of Full Rollout', value: '1999–2004' },
      { label: 'EVMs Deployed', value: '1 Million+' },
      { label: 'Ballot Papers', value: 'Eliminated' },
      { label: 'Count Time', value: 'Hours (↓ Days)' },
    ],
    text: `After years of pilots and legal battles, the 1999 general election saw EVMs deployed across a majority of constituencies, with the 2004 election completing the nationwide rollout. This was a monumental logistical achievement: over one million machines, transported by government vehicles, helicopters, and boats to every corner of India — from the Himalayan foothills to the Andaman Islands. Result counting, which previously took multiple days with manual ballots, could now be completed within hours. The EVM also significantly reduced invalid/spoilt votes, as voters could no longer make ambiguous marks. International observers consistently praised India's EVM system as robust and tamper-resistant.`,
    textSimple: `By 1999, ALL of India was using EVM voting machines — no more paper ballots! It was like going from writing letters to sending emails. It was faster, cleaner, and harder to cheat. Counting votes that used to take DAYS now took just a few hours! Imagine finishing your exam and knowing your score the same day. 🏆`,
  },
  {
    id: '2009',
    year: 2009,
    title: 'VVPATs Conceptualised',
    subtitle: 'Adding a Paper Trail',
    era: 'digital',
    color: '#8B5CF6',
    icon: '🧾',
    facts: [
      { label: 'Full Form', value: 'Voter Verifiable Paper Audit Trail' },
      { label: 'Pilot Year', value: '2013 By-elections' },
      { label: 'Full Rollout', value: '2019' },
      { label: 'Purpose', value: 'Verify EVM votes' },
    ],
    text: `Following years of public debate about EVM tamperability, the Election Commission of India proposed the Voter Verifiable Paper Audit Trail (VVPAT) system. A VVPAT unit, attached to the EVM, prints a paper slip showing the candidate's name and symbol when a voter casts their vote. This slip is visible for 7 seconds behind a glass screen before falling into a sealed container — giving voters visual confirmation that their vote was cast correctly. The system was first tested in the 2013 Noksen assembly by-election in Nagaland and scaled to all constituencies by the 2019 Lok Sabha elections, addressing concerns about electronic verifiability.`,
    textSimple: `Some people were worried: "How do I know the machine counted my vote right?" So they invented VVPAT — a machine that shows you a paper slip for 7 seconds showing who you voted for! It's like a receipt from a shop. You press a button, see your "vote receipt," and it falls into a locked box. Smart, right? 🧾✅`,
  },
  {
    id: '2013',
    year: 2013,
    title: 'NOTA Introduced',
    subtitle: 'The Right to Reject',
    era: 'modern',
    color: '#10B981',
    icon: '❌',
    facts: [
      { label: 'Supreme Court Order', value: 'PUCL vs. UoI' },
      { label: 'Introduced In', value: '5 State Elections' },
      { label: 'Symbol', value: 'Ballot with X mark' },
      { label: 'Effect on Result', value: 'None (yet)' },
    ],
    text: `On September 27, 2013, the Supreme Court of India, in the landmark PUCL vs. Union of India case, directed the Election Commission to include a "None of the Above" (NOTA) option on EVMs. This landmark ruling recognised voters' right to express dissatisfaction with all available candidates — a form of negative voting. First used in five state assembly elections in November 2013, NOTA appeared as the last option on the ballot with a distinctive symbol (a ballot paper with a cross). While NOTA votes do not currently affect the electoral outcome (the candidate with the most votes wins regardless), it empowers citizens to make a democratic statement of rejection.`,
    textSimple: `What if you don't like ANY of the choices? NOTA lets you say "None of these people!" It's like being at a restaurant and being allowed to say "I don't want anything on this menu." India's Supreme Court said voters should have this right! It doesn't change who wins yet, but it tells politicians: "Do better!" 🚫`,
  },
  {
    id: '2019',
    year: 2019,
    title: "World's Largest Election",
    subtitle: 'An Unprecedented Scale',
    era: 'modern',
    color: '#10B981',
    icon: '🌏',
    facts: [
      { label: 'Eligible Voters', value: '900 Million' },
      { label: 'Turnout', value: '67.4% (record)' },
      { label: 'Phases', value: '7' },
      { label: 'Polling Stations', value: '1,000,000+' },
    ],
    text: `The 2019 Indian general election shattered every previous record to become the largest democratic exercise in human history. With 900 million eligible voters — more than the entire population of Europe — spread across 1.3 million polling stations over 7 phases spanning 39 days, the logistical complexity was staggering. The Election Commission deployed 11 million polling officials and security personnel. Voter turnout hit a historic high of 67.4%. The BJP-led NDA, under Prime Minister Narendra Modi, returned to power with a sweeping majority of 352 seats. The election also saw record participation by women voters, closing the gender turnout gap for the first time.`,
    textSimple: `In 2019, India held the BIGGEST election in human history! 900 MILLION people could vote — that's more people than all of Europe! Voting happened over 39 days in 7 rounds across the whole country. Imagine if your school had a million students and all of them voted for class captain — that's kind of what happened, but with a whole country! 🌟`,
  },
  {
    id: '2024',
    year: 2024,
    title: '18th General Election',
    subtitle: 'Democracy Deepens',
    era: 'modern',
    color: '#34D399',
    icon: '🗳️',
    facts: [
      { label: 'Eligible Voters', value: '970 Million' },
      { label: 'Phases', value: '7' },
      { label: 'First-time Voters', value: '18.4 Million' },
      { label: 'Women Candidates', value: '797' },
    ],
    text: `The 2024 Lok Sabha elections — India's 18th general election — saw an electorate of nearly 970 million registered voters, making it once again the largest democratic exercise on Earth. 18.4 million first-time voters between 18–19 years of age participated. The election also recorded the highest ever number of women candidates at 797. The result produced a more competitive outcome than 2019: the BJP-led NDA retained power but with a reduced majority, requiring coalition partners. The opposition INDIA bloc performed significantly better than polls predicted, winning 232 seats. Political analysts described the result as a reaffirmation of the electorate's sophisticated, nuanced judgement.`,
    textSimple: `In 2024, nearly a BILLION people voted! That's like everyone in a huge country choosing who their leader should be. 18.4 million teenagers voted for the very first time — maybe like your older siblings! The election showed that even in a giant country, every vote counts because the result was much closer than people expected! 🎯`,
  },
];

export const TIMELINE_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'In what year was India\'s first general election held?',
    options: ['1947', '1950', '1951', '1955'],
    correctIndex: 2,
    explanation: 'India\'s first general election was held from October 1951 to February 1952, just after the Constitution came into force.',
  },
  {
    id: 'q2',
    question: 'What does NOTA stand for?',
    options: [
      'National Online Tallying Authority',
      'None of the Above',
      'Neutral Option Terminal Access',
      'National Open Transparency Act',
    ],
    correctIndex: 1,
    explanation: 'NOTA — "None of the Above" — was introduced by a 2013 Supreme Court order, giving voters the right to reject all candidates.',
  },
  {
    id: 'q3',
    question: 'Where was the first EVM pilot conducted in India?',
    options: [
      'Mumbai, Maharashtra',
      'New Delhi',
      'North Paravur, Kerala',
      'Chennai, Tamil Nadu',
    ],
    correctIndex: 2,
    explanation: 'The very first EVM trial was conducted in North Paravur constituency in Kerala during the 1982 state assembly by-election.',
  },
];
