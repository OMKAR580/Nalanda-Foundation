export type SiteVariant = "nalanda" | "tech";

export type SiteConfig = {
  variant: SiteVariant;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  theme: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    card: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
  };
};

export const sites: Record<SiteVariant, SiteConfig> = {
  nalanda: {
    variant: "nalanda",
    name: "Nalanda Career Academy",
    shortName: "Nalanda",
    tagline: "Premium Academic Learning Platform",
    description:
      "A modern learning platform for students to explore courses, enroll online, and build career-ready skills.",
    theme: {
      background: "#FFFBF2",
      foreground: "#111827",
      primary: "#1E3A8A",
      secondary: "#0F172A",
      accent: "#F59E0B",
      card: "#FFFFFF",
    },
    hero: {
      badge: "Admissions Open",
      title: "Build Your Future With Guided Learning",
      subtitle:
        "Explore career-focused courses, expert mentorship, and certified learning programs designed for ambitious students.",
      primaryCta: "Explore Courses",
      secondaryCta: "Contact Us",
    },
    contact: {
      email: "support@example.com",
      phone: "+91 00000 00000",
      whatsapp: "+91 00000 00000",
      address: "India",
    },
  },

  tech: {
    variant: "tech",
    name: "Modern Tech Academy",
    shortName: "Tech Academy",
    tagline: "Future-Ready Technology Training",
    description:
      "A futuristic training platform for learners who want practical skills, internships, and career-focused programs.",
    theme: {
      background: "#020617",
      foreground: "#F8FAFC",
      primary: "#06B6D4",
      secondary: "#8B5CF6",
      accent: "#22C55E",
      card: "#0F172A",
    },
    hero: {
      badge: "Skill-Based Programs",
      title: "Learn Modern Skills For The Digital Future",
      subtitle:
        "Join practical technology programs with hands-on projects, mentorship, and industry-focused learning.",
      primaryCta: "View Programs",
      secondaryCta: "Get Started",
    },
    contact: {
      email: "support@example.com",
      phone: "+91 00000 00000",
      whatsapp: "+91 00000 00000",
      address: "India",
    },
  },
};