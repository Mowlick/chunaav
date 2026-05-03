'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;         // emoji or lucide icon name
  earnedAt: number;     // timestamp
}

export type LanguageCode = 'en' | 'hi' | 'ta' | 'bn' | 'te';

interface AppState {
  /** ELI5 "Explain Like I'm 5" simplified mode toggle */
  isSimplifiedMode: boolean;
  toggleSimplifiedMode: () => void;

  /** Language state */
  currentLanguage: LanguageCode;
  isTranslating: boolean;
  setLanguage: (lang: LanguageCode) => void;
  
  /** Translation helper */
  t: (key: string) => string;

  /** Gamified score */
  civicPoints: number;
  addPoints: (amount: number) => void;

  /** Achievements */
  unlockedBadges: Badge[];
  unlockBadge: (badge: Omit<Badge, 'earnedAt'>) => void;

  /** Sidebar collapsed state */
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;

  /** Mobile sidebar open */
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

const DICTIONARY: Record<LanguageCode, Record<string, string>> = {
  en: {
    heroTitle: 'Democracy is not a spectator sport.',
    heroSub: 'An immersive, gamified learning experience covering every dimension of the electoral process — history, jargon, simulation, and more.',
    exploreHub: 'Explore the Hub',
    assistantName: 'Chunaav Assistant',
    greeting: "Namaste! I'm your Chunaav Assistant. How can I help you today?",
  },
  hi: {
    heroTitle: 'लोकतंत्र कोई मूकदर्शक खेल नहीं है।',
    heroSub: 'चुनावी प्रक्रिया के हर आयाम — इतिहास, शब्दावली, सिमुलेशन और बहुत कुछ को कवर करने वाला एक गहन, गेमिफाइड सीखने का अनुभव।',
    exploreHub: 'हब का अन्वेषण करें',
    assistantName: 'चुनाव सहायक',
    greeting: "नमस्ते! मैं आपका चुनाव सहायक हूँ। आज मैं आपकी क्या सहायता कर सकता हूँ?",
  },
  ta: {
    heroTitle: 'ஜனநாயகம் ஒரு வேடிக்கை பார்க்கும் விளையாட்டு அல்ல.',
    heroSub: 'தேர்தல் செயல்முறையின் ஒவ்வொரு பரிமாணத்தையும் உள்ளடக்கிய ஒரு அதிவேக, கேமிஃபைட் கற்றல் அனுபவம் — வரலாறு, வாசகங்கள், உருவகப்படுத்துதல் மற்றும் பல.',
    exploreHub: 'மையத்தை ஆராயுங்கள்',
    assistantName: 'தேர்தல் உதவியாளர்',
    greeting: "வணக்கம்! நான் உங்கள் தேர்தல் உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
  },
  bn: {
    heroTitle: 'গণতন্ত্র কোনো দর্শক খেলা নয়।',
    heroSub: 'নির্বাচনী প্রক্রিয়ার প্রতিটি মাত্রা কভার করে একটি নিমজ্জিত, গ্যামিফাইড শেখার অভিজ্ঞতা — ইতিহাস, জারগন, সিমুলেশন এবং আরও অনেক কিছু।',
    exploreHub: 'হাব অন্বেষণ করুন',
    assistantName: 'নির্বাচন সহকারী',
    greeting: "নমস্কার! আমি আপনার নির্বাচন সহকারী। আজ আমি আপনাকে কিভাবে সাহায্য করতে পারি?",
  },
  te: {
    heroTitle: 'ప్రజాస్వామ్యం ఒక ప్రేక్షక క్రీడ కాదు.',
    heroSub: 'ఎన్నికల ప్రక్రియలోని ప్రతి కోణాన్ని కవర్ చేసే లీనమయ్యే, గేమిఫైడ్ అభ్యాస అనుభవం — చరిత్ర, పరిభాష, అనుకరణ మరియు మరిన్ని.',
    exploreHub: 'హబ్‌ని అన్వేషించండి',
    assistantName: 'ఎన్నికల సహాయకుడు',
    greeting: "నమస్తే! నేను మీ ఎన్నికల సహాయకుడిని. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?",
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isSimplifiedMode: false,
      toggleSimplifiedMode: () =>
        set((s) => ({ isSimplifiedMode: !s.isSimplifiedMode })),

      currentLanguage: 'en',
      isTranslating: false,
      setLanguage: (lang) => {
        const prevLang = get().currentLanguage;
        if (lang === prevLang) return;
        
        set({ isTranslating: true });
        
        // --- LIVE TRANSLATION ENGINE ---
        const translatePage = async () => {
          const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
              acceptNode: (node) => {
                let parent = node.parentElement;
                while (parent) {
                  if (parent.getAttribute('translate') === 'no') return NodeFilter.FILTER_REJECT;
                  parent = parent.parentElement;
                }
                if (!node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
              }
            }
          );

          const nodeMap: { node: Text; original: string }[] = [];
          let currentNode = walker.nextNode();
          while (currentNode) {
            nodeMap.push({ 
              node: currentNode as Text, 
              original: currentNode.nodeValue?.trim() || '' 
            });
            currentNode = walker.nextNode();
          }

          // Gather unique strings to translate
          const uniqueTexts = Array.from(new Set(nodeMap.map(m => m.original)));
          
          try {
            const response = await fetch('/api/translate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ texts: uniqueTexts, targetLanguage: lang })
            });

            if (!response.ok) throw new Error('Translation API failed');
            
            const { translations } = await response.json();
            
            // Create a lookup map
            const translationLookup: Record<string, string> = {};
            uniqueTexts.forEach((text, i) => {
              translationLookup[text] = translations[i];
            });

            // Update DOM nodes
            nodeMap.forEach(({ node, original }) => {
              if (translationLookup[original]) {
                node.nodeValue = node.nodeValue?.replace(original, translationLookup[original]) || null;
              }
            });
          } catch (error) {
            console.error('Translation failed:', error);
          }
        };

        // Execute translation with micro-interaction
        setTimeout(async () => {
          await translatePage();
          set({ 
            currentLanguage: lang,
            isTranslating: false 
          });
        }, 300);
      },
      
      t: (key) => {
        const lang = get().currentLanguage;
        return DICTIONARY[lang][key] || DICTIONARY['en'][key] || key;
      },

      civicPoints: 0,
      addPoints: (amount) =>
        set((s) => ({ civicPoints: s.civicPoints + amount })),

      unlockedBadges: [],
      unlockBadge: (badge) => {
        const existing = get().unlockedBadges.find((b) => b.id === badge.id);
        if (existing) return;
        set((s) => ({
          unlockedBadges: [
            ...s.unlockedBadges,
            { ...badge, earnedAt: Date.now() },
          ],
        }));
      },

      isSidebarCollapsed: false,
      toggleSidebar: () =>
        set((s) => ({ isSidebarCollapsed: !s.isSidebarCollapsed })),

      isMobileSidebarOpen: false,
      toggleMobileSidebar: () =>
        set((s) => ({ isMobileSidebarOpen: !s.isMobileSidebarOpen })),
      closeMobileSidebar: () => set({ isMobileSidebarOpen: false }),
    }),
    {
      name: 'chunaav-state',
      partialize: (s) => ({
        isSimplifiedMode: s.isSimplifiedMode,
        currentLanguage: s.currentLanguage,
        civicPoints: s.civicPoints,
        unlockedBadges: s.unlockedBadges,
      }),
    }
  )
);
