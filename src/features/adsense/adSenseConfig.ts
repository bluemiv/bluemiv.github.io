export function isAdSenseEnabled(nodeEnv: string | undefined): boolean {
  return nodeEnv === "production";
}

export const ADSENSE_CONFIG = {
  client: "ca-pub-9462926197232794",
  responsiveSlot: "9216376708",
  enabled: isAdSenseEnabled(process.env.NODE_ENV),
} as const;
