import { classAccessConfig } from "@/config/classAccess";
import { getProgramFeeForCollege } from "@/data/collegeFees";

export const COLLEGE_FEE_UPDATED_SOON_MESSAGE =
  "Fee for your college will be updated soon. Please contact admissions support.";

export const COLLEGE_FEE_NOT_CONFIGURED_MESSAGE =
  "Your college-wise program fee is not configured yet. Please contact admissions support or wait for fee confirmation.";

export function getCollegeFeeDetails(collegeName: string | null | undefined) {
  const normalizedCollegeName = collegeName?.trim() ?? "";
  const fee = getProgramFeeForCollege(normalizedCollegeName || null);

  return {
    collegeName: normalizedCollegeName || null,
    fee,
    isConfigured: fee !== null,
  };
}

export function formatIndianCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getClassAccessDetails() {
  const hasLiveClassLink =
    !classAccessConfig.isPlaceholder &&
    classAccessConfig.googleMeetLink.trim().length > 0;

  return {
    googleMeetLink: classAccessConfig.googleMeetLink,
    hasLiveClassLink,
    isPlaceholder: classAccessConfig.isPlaceholder,
    isDevelopment: process.env.NODE_ENV !== "production",
  };
}
