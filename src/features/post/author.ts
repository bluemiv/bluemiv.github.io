const DEFAULT_AUTHOR_NICKNAME = 'bluemiv';

export const getAuthorDisplayName = (author?: string) => {
  const trimmedAuthor = author?.trim();

  if (!trimmedAuthor) return DEFAULT_AUTHOR_NICKNAME;

  const nickname = trimmedAuthor.match(/\(([^)]+)\)$/)?.[1]?.trim();
  if (nickname) return nickname;

  if (trimmedAuthor === 'Taehong Kim' || trimmedAuthor === '김태홍') {
    return DEFAULT_AUTHOR_NICKNAME;
  }

  return trimmedAuthor;
};
