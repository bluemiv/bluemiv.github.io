type LegacyArticle = {
  slug: string;
  legacyPaths: readonly string[];
};

type LegacyNote = {
  slug: string;
  legacyPaths: readonly string[];
};

export type LegacyRedirect = {
  legacySection: string;
  legacyId: string;
  destination: string;
};

const LEGACY_PATH_PATTERN = /^\/blog\/([^/]+)\/([^/]+)\/$/;

function parseLegacyPath(legacyPath: string) {
  const match = legacyPath.match(LEGACY_PATH_PATTERN);

  if (!match) throw new Error(`Unsupported legacy path: ${legacyPath}`);

  return {
    legacySection: match[1],
    legacyId: match[2],
  };
}

export function createLegacyRedirects(
  articles: readonly LegacyArticle[],
  notes: readonly LegacyNote[],
  getArticlePath: (slug: string) => string,
  getNotePath: (slug: string) => string,
): LegacyRedirect[] {
  const sources = [
    ...articles.flatMap((article) =>
      article.legacyPaths.map((legacyPath) => ({
        legacyPath,
        destination: getArticlePath(article.slug),
      })),
    ),
    ...notes.flatMap((note) =>
      note.legacyPaths.map((legacyPath) => ({
        legacyPath,
        destination: getNotePath(note.slug),
      })),
    ),
  ];

  const redirects = sources.map(({ legacyPath, destination }) => ({
    ...parseLegacyPath(legacyPath),
    destination,
  }));
  const keys = redirects.map(({ legacySection, legacyId }) => `${legacySection}/${legacyId}`);

  if (new Set(keys).size !== keys.length) {
    throw new Error("Duplicate legacy redirect path");
  }

  return redirects;
}

export function findLegacyRedirect(
  redirects: readonly LegacyRedirect[],
  legacySection: string,
  legacyId: string,
): LegacyRedirect | undefined {
  return redirects.find(
    (redirect) => redirect.legacySection === legacySection && redirect.legacyId === legacyId,
  );
}
