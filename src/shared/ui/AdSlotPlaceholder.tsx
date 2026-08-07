type AdSlotPlaceholderProps = {
  format: "banner" | "sidebar";
};

export function AdSlotPlaceholder({ format }: AdSlotPlaceholderProps) {
  const isSidebar = format === "sidebar";

  return (
    <section
      className={
        isSidebar
          ? "border-t border-border pt-8"
          : "border-y border-border py-10"
      }
      aria-label="광고 영역 미리보기"
    >
      <p className="mb-3 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-subtle">
        Advertisements
      </p>
      <div
        className={
          isSidebar
            ? "flex h-[250px] w-[300px] items-center justify-center bg-surface-muted"
            : "mx-auto flex h-[100px] w-full max-w-[320px] items-center justify-center bg-surface-muted min-[520px]:h-[60px] min-[520px]:max-w-[468px] min-[800px]:h-[90px] min-[800px]:max-w-[728px]"
        }
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] tracking-[0.12em] text-subtle">
          {isSidebar ? "300 × 250 / AD SLOT" : "RESPONSIVE / AD SLOT"}
        </span>
      </div>
    </section>
  );
}
