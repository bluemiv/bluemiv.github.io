export const POLICY_REDIRECTS = {
  "/privacy/": "/privacy/kpop/en/",
  "/privacy/blim/": "/privacy/blim/en/",
  "/privacy/easy-dots/": "/privacy/easy-dots/en/",
  "/privacy/musepiece/": "/privacy/musepiece/en/",
  "/privacy/pixel-blur/": "/privacy/pixel-blur/en/",
  "/privacy/pomodoro-flow/": "/privacy/pomodoro-flow/en/",
} as const;

export function getPolicyRedirect(source: string): string | undefined {
  return POLICY_REDIRECTS[source as keyof typeof POLICY_REDIRECTS];
}

export function getLegacyPolicyRedirectParams() {
  return Object.keys(POLICY_REDIRECTS).flatMap((path) => {
    const match = path.match(/^\/privacy\/([^/]+)\/$/);
    return match ? [{ appSlug: match[1] }] : [];
  });
}
