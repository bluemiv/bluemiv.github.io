import localFont from "next/font/local";

export const ibmPlexMono = localFont({
  src: [
    {
      path: "../../node_modules/@ibm/plex-mono/fonts/complete/woff2/IBMPlexMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@ibm/plex-mono/fonts/complete/woff2/IBMPlexMono-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  preload: false,
  fallback: ["SFMono-Regular", "Consolas", "monospace"],
  adjustFontFallback: false,
});
