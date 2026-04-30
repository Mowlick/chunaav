export interface CandidacyStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  pointsAwarded: number;
  details: string;
  detailsSimple: string;
  requirements: string[];
  requirementsSimple: string[];
  acknowledgementCta: string;
}

export const CANDIDACY_STEPS: CandidacyStep[] = [
  {
    id: 'eligibility',
    stepNumber: 1,
    title: 'Meet Eligibility',
    subtitle: 'Confirm You Qualify',
    icon: '✅',
    color: '#F97316',
    pointsAwarded: 50,
    details: `Before filing your nomination, you must satisfy constitutional eligibility requirements under Articles 84 (Lok Sabha) and 173 (State Assembly). For Lok Sabha, a candidate must be a citizen of India, at least 25 years of age, and their name must appear on an electoral roll in any constituency in India. They must not hold any office of profit under the government, must not have been declared of unsound mind by a court, and must not be an undischarged insolvent. Additionally, certain convictions carrying sentences of 2+ years disqualify a candidate (with some exceptions).`,
    detailsSimple: `Think of eligibility like the rules to join a school team. To run for Lok Sabha (India's Parliament), you must: be Indian, be at least 25 years old, be a registered voter, not work for the government in a paid job, and not have done serious crimes. If you check all these boxes — congratulations, you can try to become an MP! 🏆`,
    requirements: [
      'Indian citizen',
      'Minimum age: 25 years (Lok Sabha) / 30 years (Rajya Sabha)',
      'Name on electoral roll of any constituency',
      'Not holding office of profit under the Government',
      'Not declared insolvent or of unsound mind',
      'No conviction with sentence of 2+ years (unless exception applies)',
    ],
    requirementsSimple: [
      '🇮🇳 You must be Indian',
      '🎂 You must be at least 25 years old',
      '📋 Your name must be on the voter list',
      '💼 You can\'t have a government salary job',
      '⚖️ No serious crimes on your record',
    ],
    acknowledgementCta: 'I Meet All Requirements →',
  },
  {
    id: 'proposers',
    stepNumber: 2,
    title: 'Gather Proposers',
    subtitle: 'Build Your Support Base',
    icon: '🤝',
    color: '#8B5CF6',
    pointsAwarded: 75,
    details: `A nomination paper must be proposed and seconded by registered voters in the constituency. For a Lok Sabha election, you need at least one proposer (a registered voter in the constituency). However, for candidates not belonging to a recognised national or state party, the number of required proposers may be ten. Securing proposers requires demonstrating that real constituents support your candidacy — it is the first test of public backing. A party candidate also needs the official symbol allotment letter from their party's authorised representative.`,
    detailsSimple: `You need supporters! Your "proposers" are regular voters in your area who officially back you and sign your nomination form. Think of it like needing signatures to start a petition — you need people to say "Yes, we support this person running." If you're running without a big party's support, you might need 10 people to sign instead of 1. ✍️`,
    requirements: [
      'Minimum 1 proposer who is a registered voter in the constituency',
      '10 proposers if contesting as an independent (non-recognised party)',
      'Proposer must sign the nomination form in the Returning Officer\'s presence',
      'Party candidates need party authorisation letter with allotted symbol',
    ],
    requirementsSimple: [
      '✍️ Get at least 1 voter in your area to officially support you',
      '10 supporters needed if you\'re running without a major party',
      '📜 They must sign your form in front of the election officer',
      '🎨 Party candidates also need their party\'s official symbol assigned',
    ],
    acknowledgementCta: 'Proposers Secured →',
  },
  {
    id: 'nomination',
    stepNumber: 3,
    title: 'File Nomination & Affidavit',
    subtitle: 'The Official Declaration',
    icon: '📋',
    color: '#3B82F6',
    pointsAwarded: 100,
    details: `The nomination must be filed with the Returning Officer in the prescribed Form 1 within the notified time period (usually 2 weeks after election announcement). Simultaneously, Form 26 (the affidavit) must be submitted, declaring criminal antecedents, educational qualifications, assets and liabilities (of both the candidate and spouse), and sources of income. The Returning Officer scrutinises all nominations. Incomplete or falsified documents result in rejection. Valid nominations can also be withdrawn within the stipulated withdrawal period. After withdrawal, the final list of contesting candidates and their ballot positions are determined by draw of lots.`,
    detailsSimple: `This is the official step where you go to the election office and hand in your forms! You fill in a big "nomination paper" and a truth document called an affidavit (where you declare all your money, any crimes, etc.). The election officer checks everything — and if something's wrong or you lied, they'll reject your form. Scary but important! 📝`,
    requirements: [
      'File Form 1 (Nomination Paper) with Returning Officer',
      'Submit Form 26 (Affidavit) disclosing criminal cases, assets, liabilities',
      'File within the prescribed nomination window',
      'All signatures must be verified',
      'Option to withdraw candidacy within withdrawal period',
    ],
    requirementsSimple: [
      '📄 Fill and submit the official nomination form',
      '🔍 Declare all your money, property, and any past crimes — honestly',
      '⏰ Submit within the deadline (usually a 2-week window)',
      '🚫 You can still change your mind and withdraw during the withdrawal period',
    ],
    acknowledgementCta: 'Nomination Filed →',
  },
  {
    id: 'deposit',
    stepNumber: 4,
    title: 'Pay Security Deposit',
    subtitle: 'Putting Skin in the Game',
    icon: '💰',
    color: '#F59E0B',
    pointsAwarded: 50,
    details: `Every candidate must pay a security deposit to the Returning Officer as a financial commitment. For Lok Sabha elections, the deposit is ₹25,000 for general candidates and ₹12,500 for SC/ST candidates. For state assembly elections, these amounts are ₹10,000 and ₹5,000 respectively. The deposit is refunded if the candidate polls more than 1/6th of the total valid votes in the constituency. If they poll less than 1/6th, the deposit is forfeited to the government. This mechanism discourages frivolous candidatures that would otherwise clutter the ballot and confuse voters.`,
    detailsSimple: `You need to put down a "security deposit" — like leaving a down payment. For Parliament elections, that's ₹25,000 (₹12,500 if you're from SC/ST community). Think of it like a bet: if you get enough votes (1/6 of all votes), you get your money back. If you get very few votes, the government keeps your deposit. It stops people from entering elections just for fun! 💸`,
    requirements: [
      '₹25,000 deposit for Lok Sabha (₹12,500 for SC/ST candidates)',
      '₹10,000 deposit for State Assembly (₹5,000 for SC/ST)',
      'Paid at time of filing nomination',
      'Refunded if candidate receives > 1/6 of total valid votes',
      'Forfeited if candidate receives ≤ 1/6 of total valid votes',
    ],
    requirementsSimple: [
      '💰 Pay ₹25,000 for a Parliament election (half price for SC/ST)',
      '✅ Get it back if you get enough votes (1/6 of total)',
      '❌ Government keeps it if you get too few votes',
      '🎯 This stops people from entering elections just for fun',
    ],
    acknowledgementCta: 'Deposit Paid →',
  },
  {
    id: 'campaign',
    stepNumber: 5,
    title: 'Campaign!',
    subtitle: 'Win Hearts and Minds',
    icon: '📢',
    color: '#10B981',
    pointsAwarded: 100,
    details: `Campaigning is the period between filing nominations and the campaign "silence period" (48 hours before polling). Candidates hold public meetings (jansabhas), door-to-door visits, vehicle rallies, and distribute manifesto materials. All campaign expenditure must be accounted for in a diary maintained for the Returning Officer — the limit for Lok Sabha candidates is currently ₹95 lakhs in large states. The Model Code of Conduct is strictly in force throughout this period. Paid media advertisements must include disclaimers. Social media campaigns are now heavily monitored by the ECI's special Media Certification and Monitoring Committees (MCMCs).`,
    detailsSimple: `Campaigning is where the real work happens! You travel around your area, give speeches, knock on doors, put up posters, and tell people why they should vote for you. But there are rules — you can only spend a certain amount of money, you must stop campaigning 48 hours before voting day, and you can't say mean things about others. Think of it like a school election speech — but much bigger! 📣`,
    requirements: [
      'All expenses recorded in expenditure diary',
      'Lok Sabha spending limit: ₹95 lakhs (large states)',
      'Campaign silence mandatory 48 hours before polling',
      'No hate speech, communal appeals, or bribery',
      'Social media advertisements require MCMC approval',
      'Model Code of Conduct compliance throughout',
    ],
    requirementsSimple: [
      '📊 Write down every rupee you spend on campaigns',
      '💸 You can\'t spend more than ₹95 lakh total',
      '🔇 Stop all campaigning 2 days before voting',
      '🚫 No bribing voters or saying mean things about religion',
      '📱 Your social media ads need government approval',
    ],
    acknowledgementCta: 'Campaign Complete →',
  },
  {
    id: 'polling',
    stepNumber: 6,
    title: 'Election Day',
    subtitle: 'The People Decide',
    icon: '🗳️',
    color: '#8B5CF6',
    pointsAwarded: 75,
    details: `On polling day, booths open at 7 AM and close at 6 PM (timings may vary by constituency). Voters present their EPIC card (or alternative documents) to the Presiding Officer, have their name checked on the electoral roll, receive a voter slip, and then approach the Balloting Unit to cast their vote. Candidates are permitted to have Polling Agents inside booths who watch the process and can raise objections. Prohibited activities within 100 metres of polling stations include campaigning, displaying party symbols, and carrying weapons. The Presiding Officer has powers to suspend voting if violence or impersonation is detected.`,
    detailsSimple: `Election day is the BIG day! Voters bring their ID cards to voting booths (which open at 7 AM), get their name checked, and then press a button on the EVM to choose YOU (or someone else 😅). You can have a trusted person called a "Polling Agent" watching inside the booth to make sure everything is fair. Nobody can campaign or wear party logos near the booth on this day. 🗳️`,
    requirements: [
      'Polling booths open 7 AM to 6 PM',
      'Candidate\'s Polling Agents allowed one per booth',
      'No campaigning within 100m of polling stations',
      'Voter impersonation complaints filed with Presiding Officer',
      'EVM sealed and accounted for after polling ends',
    ],
    requirementsSimple: [
      '⏰ Booths are open from 7 AM to 6 PM',
      '👁️ You can have a trusted "watcher" inside every booth',
      '🚫 No parties, slogans or campaigning near the booth',
      '📦 Voting machines are sealed at the end of the day',
    ],
    acknowledgementCta: 'Polling Day Done →',
  },
  {
    id: 'counting',
    stepNumber: 7,
    title: 'Counting & Result',
    subtitle: 'The Final Verdict',
    icon: '🏆',
    color: '#34D399',
    pointsAwarded: 150,
    details: `Counting takes place at a designated counting centre on the date announced by the Election Commission — typically 1-2 days after the final phase of polling. Postal ballots (from service voters and absentees) are counted first. EVM memory units are extracted and votes tallied round-by-round, with all candidates' Counting Agents present. Once all rounds are complete, the Returning Officer announces the total votes secured by each candidate, declares the candidate with the highest vote tally as the winner, and issues a Certificate of Election. The winner then takes oath in the legislature. Disputes can be challenged in an Election Petition before the High Court.`,
    detailsSimple: `Counting day is like waiting for exam results! All the EVM machines are brought to one big room. Each machine's votes are counted one by one, with everyone watching. When all the counting is done, the Returning Officer officially announces who got the most votes — that's the winner! They get a certificate and go to Parliament. If someone thinks there was cheating, they can go to court. 🎉`,
    requirements: [
      'Postal ballots counted first',
      'EVM data extracted round-by-round with Counting Agents present',
      'Returning Officer declares result officially',
      'Certificate of Election issued to winner',
      'Election Petition in High Court for disputes (within 45 days)',
    ],
    requirementsSimple: [
      '📮 Mail-in votes counted first',
      '🔢 Machine votes counted round by round — everyone watches!',
      '🏅 Winner gets an official certificate from the election officer',
      '⚖️ If you think there was cheating, you can go to court within 45 days',
    ],
    acknowledgementCta: 'You\'re Elected! 🎉',
  },
];

export const CANDIDATE_BADGE = {
  id: 'candidate-badge',
  name: 'Candidate',
  description: 'Completed the full Run for Office simulation',
  icon: '🏛️',
};
