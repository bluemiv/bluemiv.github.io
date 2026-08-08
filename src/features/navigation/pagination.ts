export type PaginationItem = number | "ellipsis";

function assertPositiveInteger(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new RangeError(`${name} must be a positive safe integer`);
  }
}

export function getPaginationItems(currentPage: number, totalPages: number): PaginationItem[] {
  assertPositiveInteger(currentPage, "currentPage");
  assertPositiveInteger(totalPages, "totalPages");

  if (currentPage > totalPages) {
    throw new RangeError("currentPage must not exceed totalPages");
  }

  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);

  if (currentPage <= 4) return [1, 2, 3, 4, 5, "ellipsis", totalPages];

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
}
