"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

import { ADSENSE_CONFIG } from "./adSenseConfig";
import { AdSlotPlaceholder } from "./AdSlotPlaceholder";

type AdSenseSlotProps = {
  format: "banner" | "sidebar";
};

type AdsWindow = Window &
  typeof globalThis & {
    adsbygoogle?: Record<string, never>[];
  };

function getServerViewportSnapshot(): null {
  return null;
}

function useMediaQuery(query: string): boolean | null {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", onStoreChange);

      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    [query],
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerViewportSnapshot);
}

export function AdSenseSlot({ format }: AdSenseSlotProps) {
  const isSidebar = format === "sidebar";
  const matchesViewport = useMediaQuery(isSidebar ? "(min-width: 1280px)" : "(max-width: 1279px)");
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (
      !ADSENSE_CONFIG.enabled ||
      matchesViewport !== true ||
      !adRef.current ||
      adRef.current.dataset.adInitialized
    ) {
      return;
    }

    try {
      const adsWindow = window as AdsWindow;
      (adsWindow.adsbygoogle ??= []).push({});
      adRef.current.dataset.adInitialized = "true";
    } catch (error) {
      console.warn("[AdSense] Failed to initialize ad slot", error);
    }
  }, [matchesViewport]);

  if (!ADSENSE_CONFIG.enabled) {
    return <AdSlotPlaceholder format={format} />;
  }

  if (matchesViewport === false) return null;

  return (
    <section
      className={isSidebar ? "border-border border-t pt-8" : "border-border border-y py-10"}
      aria-label="광고"
    >
      <p className="text-subtle mb-3 text-center font-mono text-[9px] tracking-[0.16em] uppercase">
        Advertisements
      </p>
      <div
        className={
          isSidebar
            ? "h-[250px] w-[300px] overflow-hidden"
            : "mx-auto h-[100px] w-full max-w-[320px] overflow-hidden min-[520px]:h-[60px] min-[520px]:max-w-[468px] min-[800px]:h-[90px] min-[800px]:max-w-[728px]"
        }
      >
        <ins
          ref={adRef}
          className="adsbygoogle block h-full w-full"
          data-ad-client={ADSENSE_CONFIG.client}
          data-ad-slot={ADSENSE_CONFIG.responsiveSlot}
          data-ad-format="auto"
          data-full-width-responsive={isSidebar ? undefined : "true"}
        />
      </div>
    </section>
  );
}
