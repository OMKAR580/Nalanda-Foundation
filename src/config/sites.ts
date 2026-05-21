import { siteConfig, type SiteVariant } from "./site";

export type { SiteVariant };

export type SiteConfig = {
  variant: SiteVariant;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  logo: string;
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
    name: siteConfig.nalanda.name,
    shortName: siteConfig.nalanda.shortName,
    tagline: siteConfig.nalanda.tagline,
    description: siteConfig.nalanda.description,
    logo: siteConfig.nalanda.logo,
    theme: {
      background: siteConfig.nalanda.theme.bg,
      foreground: siteConfig.nalanda.theme.foreground,
      primary: siteConfig.nalanda.theme.primary,
      secondary: siteConfig.nalanda.theme.secondary,
      accent: siteConfig.nalanda.theme.accent,
      card: siteConfig.nalanda.theme.card,
    },
    hero: siteConfig.nalanda.hero,
    contact: siteConfig.nalanda.contact,
  },
  krishana: {
    variant: "krishana",
    name: siteConfig.krishana.name,
    shortName: siteConfig.krishana.shortName,
    tagline: siteConfig.krishana.tagline,
    description: siteConfig.krishana.description,
    logo: siteConfig.krishana.logo,
    theme: {
      background: siteConfig.krishana.theme.bg,
      foreground: siteConfig.krishana.theme.foreground,
      primary: siteConfig.krishana.theme.primary,
      secondary: siteConfig.krishana.theme.secondary,
      accent: siteConfig.krishana.theme.accent,
      card: siteConfig.krishana.theme.card,
    },
    hero: siteConfig.krishana.hero,
    contact: siteConfig.krishana.contact,
  },
  tech: {
    variant: "tech",
    name: siteConfig.tech.name,
    shortName: siteConfig.tech.shortName,
    tagline: siteConfig.tech.tagline,
    description: siteConfig.tech.description,
    logo: siteConfig.tech.logo,
    theme: {
      background: siteConfig.tech.theme.bg,
      foreground: siteConfig.tech.theme.foreground,
      primary: siteConfig.tech.theme.primary,
      secondary: siteConfig.tech.theme.secondary,
      accent: siteConfig.tech.theme.accent,
      card: siteConfig.tech.theme.card,
    },
    hero: siteConfig.tech.hero,
    contact: siteConfig.tech.contact,
  },
};