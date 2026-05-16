const WORDS_PER_MINUTE = 220;
const CJK_CHARS_PER_MINUTE = 500;

const stripMdxSyntax = (content: string) =>
  content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|=-]/g, ' ');

export const calculateReadingTimeMinutes = (content: string) => {
  const plainText = stripMdxSyntax(content);
  const cjkCharCount = plainText.match(/[\u3131-\u318e\uac00-\ud7a3\u3040-\u30ff\u3400-\u9fff]/g)?.length ?? 0;
  const latinWordCount =
    plainText
      .replace(/[\u3131-\u318e\uac00-\ud7a3\u3040-\u30ff\u3400-\u9fff]/g, ' ')
      .match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g)?.length ?? 0;

  const minutes = cjkCharCount / CJK_CHARS_PER_MINUTE + latinWordCount / WORDS_PER_MINUTE;

  return Math.max(1, Math.ceil(minutes));
};
