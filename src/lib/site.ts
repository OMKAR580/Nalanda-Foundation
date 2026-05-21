import { sites, type SiteConfig, type SiteVariant } from "@/config/sites";

export function getSiteVariant(): SiteVariant {
  const variant = process.env.NEXT_PUBLIC_SITE_VARIANT;

  if (variant === "tech") {
    return "tech";
  }
  if (variant === "krishana") {
    return "krishana";
  }

  return "nalanda";
}

export function getSiteConfig(): SiteConfig {
  return sites[getSiteVariant()];
}