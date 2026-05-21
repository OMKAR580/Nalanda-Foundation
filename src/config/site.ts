export type SiteVariant = 'nalanda' | 'tech' | 'krishana';

export const SITE_VARIANT = (process.env.NEXT_PUBLIC_SITE_VARIANT || 'nalanda') as SiteVariant;

export const siteConfig = {
  nalanda: {
    name: 'Nalanda Foundation',
    shortName: 'Nalanda',
    programName: 'Nalanda Foundation Learning Portal',
    tagline: 'Ancient Wisdom. Modern Skills. | Learn. Grow. Build Your Future.',
    description: 'An ancient academic legacy meets modern innovation. Explore premium skill-based internship & certification programs, gain verified credentials, and accelerate your career pathway.',
    logo: '/nalanda/logo.jpeg',
    theme: {
      primary: '#800020', // deep maroon
      secondary: '#C35237', // terracotta
      accent: '#D97706', // saffron/gold
      bg: '#FAF6EE', // warm cream
      foreground: '#2E1E1E', // dark brown text
      card: '#FFFDF9', // warm ivory card
      border: '#D6C7B2' // soft warm tan border
    },
    hero: {
      badge: 'Verified Skill-Based Programs',
      title: 'Ancient Wisdom, Modern Career Skills',
      subtitle: 'Explore premium internship and certification programs designed to help students and young professionals build practical skills, confidence, and career-ready portfolios.',
      primaryCta: 'Explore Programs',
      secondaryCta: 'Complete Registration'
    },
    contact: {
      email: 'admissions@nalandafoundation.edu.in',
      phone: '+91 99999 88888',
      whatsapp: 'https://chat.whatsapp.com/L2KsdJ5Fm4P8xQfGk8Vl7t', // Configurable official group
      address: 'Nalanda Ancient University Heritage Campus, Rajgir, Bihar, India'
    }
  },
  krishana: {
    name: 'KRISHANA JAN UTHAN SANSTHAN',
    shortName: 'KJUS',
    programName: 'KJUS Skill & Digital Training Programs',
    tagline: 'Empowering Youth Through Skills, Education & Digital Growth',
    description: 'KRISHANA JAN UTHAN SANSTHAN helps students and young learners access practical programs, digital education, mentorship, and career-focused opportunities.',
    logo: '/krishana/logo.png',
    theme: {
      primary: '#0EA5E9', // Tech blue
      secondary: '#10B981', // Emerald green
      accent: '#22D3EE', // Cyan
      bg: '#EAF6FF', // Soft blue background
      foreground: '#0F172A', // Dark text
      card: '#FFFFFF', // White
      border: '#CBD5E1'
    },
    hero: {
      badge: 'Skill-Based Programs',
      title: 'Empowering Youth With Digital Skills & Career Growth',
      subtitle: 'KRISHANA JAN UTHAN SANSTHAN helps students and young learners access practical programs, digital education, mentorship, and career-focused opportunities.',
      primaryCta: 'Explore Programs',
      secondaryCta: 'Complete Registration'
    },
    contact: {
      email: 'admissions@krishanajanuthan.org',
      phone: '+91 99999 88888',
      whatsapp: 'https://chat.whatsapp.com/placeholder-krishana',
      address: 'Krishana Campus, India'
    }
  },
  tech: {
    name: 'Modern Tech Academy',
    shortName: 'MTA',
    programName: 'Tech Training Programs 2026',
    tagline: 'Future-Ready Technology Training',
    description: 'Next-generation tech education and advanced skill development.',
    logo: '/krishana/logo.png', // Fallback or placeholder
    theme: {
      primary: '#06b6d4',
      secondary: '#8b5cf6',
      accent: '#22d3ee',
      bg: '#020617',
      foreground: '#f8fafc',
      card: '#0f172a',
      border: '#1e293b'
    },
    hero: {
      badge: 'Skill-Based Programs',
      title: 'Learn Modern Skills For The Digital Future',
      subtitle: 'Join practical technology programs with hands-on projects, mentorship, and industry-focused learning.',
      primaryCta: 'View Programs',
      secondaryCta: 'Get Started'
    },
    contact: {
      email: 'hello@moderntech.academy',
      phone: '+91 8765432109',
      whatsapp: 'https://chat.whatsapp.com/placeholder-tech',
      address: 'Tech Innovation Hub, Bangalore, India'
    }
  }
};

export const currentSite = siteConfig[SITE_VARIANT] || siteConfig.nalanda;

