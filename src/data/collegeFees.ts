export const collegeFeeConfig = {
  default: null,
  colleges: {
    // Client will provide exact fees later.
    // "A. N. D. College, Shahpur Patory, Samastipur": 0,
  } as Record<string, number>,
} as const;

export function getProgramFeeForCollege(collegeName: string | null | undefined) {
  const normalizedCollegeName = collegeName?.trim();

  if (!normalizedCollegeName) {
    return collegeFeeConfig.default;
  }

  const configuredFee = collegeFeeConfig.colleges[normalizedCollegeName];

  if (typeof configuredFee === "number" && configuredFee > 0) {
    return configuredFee;
  }

  return collegeFeeConfig.default;
}
