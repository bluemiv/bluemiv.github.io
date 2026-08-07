export type HeaderScrollDirection = "up" | "down";

export type HeaderScrollState = {
  direction: HeaderScrollDirection;
  directionOriginY: number;
  isCompact: boolean;
  previousScrollY: number;
};

const HEADER_TOP_THRESHOLD = 24;
const HEADER_COMPACT_DISTANCE = 32;
const HEADER_EXPAND_DISTANCE = 16;

export function createHeaderScrollState(scrollY = 0): HeaderScrollState {
  const normalizedScrollY = Math.max(0, scrollY);

  return {
    direction: "up",
    directionOriginY: normalizedScrollY,
    isCompact: normalizedScrollY > HEADER_TOP_THRESHOLD,
    previousScrollY: normalizedScrollY,
  };
}

export function resolveHeaderScrollState(
  state: HeaderScrollState,
  scrollY: number,
): HeaderScrollState {
  const normalizedScrollY = Math.max(0, scrollY);

  if (normalizedScrollY <= HEADER_TOP_THRESHOLD) {
    return {
      direction: "up",
      directionOriginY: normalizedScrollY,
      isCompact: false,
      previousScrollY: normalizedScrollY,
    };
  }

  if (normalizedScrollY === state.previousScrollY) return state;

  const direction = normalizedScrollY > state.previousScrollY ? "down" : "up";
  const directionOriginY =
    direction === state.direction ? state.directionOriginY : state.previousScrollY;
  const directionDistance = Math.abs(normalizedScrollY - directionOriginY);
  let isCompact = state.isCompact;

  if (direction === "down" && directionDistance >= HEADER_COMPACT_DISTANCE) {
    isCompact = true;
  }

  if (direction === "up" && directionDistance >= HEADER_EXPAND_DISTANCE) {
    isCompact = false;
  }

  return {
    direction,
    directionOriginY,
    isCompact,
    previousScrollY: normalizedScrollY,
  };
}

export function isNavigationPathActive(pathname: string, href: string): boolean {
  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";
  const normalizedHref = href.replace(/\/+$/, "") || "/";

  return (
    normalizedPathname === normalizedHref || normalizedPathname.startsWith(`${normalizedHref}/`)
  );
}
