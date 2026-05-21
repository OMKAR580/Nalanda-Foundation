const googleMeetLink = process.env.NEXT_PUBLIC_GOOGLE_MEET_LINK?.trim();

export const classAccessConfig = {
  googleMeetLink: googleMeetLink || "https://meet.google.com/abc-defg-hij",
  isPlaceholder: !googleMeetLink,
};
