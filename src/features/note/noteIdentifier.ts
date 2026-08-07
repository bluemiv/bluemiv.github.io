const NOTE_ID_PATTERN = /^note-(\d+)$/;

export function getNoteNumber(id: string): string {
  const digits = id.match(NOTE_ID_PATTERN)?.[1];

  if (!digits) return "00";

  return digits.replace(/^0+(?=\d)/, "").padStart(2, "0");
}
