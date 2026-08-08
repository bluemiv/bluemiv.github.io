export type NavigationTransitionDirection = "back" | "forward" | "swap";

export const NAVIGATION_TRANSITION_TYPES: Record<NavigationTransitionDirection, string[]> = {
  back: ["nav-back"],
  forward: ["nav-forward"],
  swap: ["nav-swap"],
};
