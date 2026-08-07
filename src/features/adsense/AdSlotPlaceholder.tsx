type AdSlotPlaceholderProps = {
  format: "banner" | "sidebar";
};

export function AdSlotPlaceholder({ format }: AdSlotPlaceholderProps) {
  const isSidebar = format === "sidebar";

  return (
    <section
      className={
        isSidebar
          ? "border-border border-t pt-8"
          : "border-border border-y py-10"
      }
      aria-label="광고 영역 미리보기"
    >
      <p className="text-subtle mb-3 text-center font-mono text-[9px] tracking-[0.16em] uppercase">
        Advertisements
      </p>
      <div
        className={
          isSidebar
            ? "bg-surface-muted flex h-[250px] w-[300px] items-center justify-center"
            : "bg-surface-muted mx-auto flex h-[100px] w-full max-w-[320px] items-center justify-center min-[520px]:h-[60px] min-[520px]:max-w-[468px] min-[800px]:h-[90px] min-[800px]:max-w-[728px]"
        }
        aria-hidden="true"
      >
        <span className="text-subtle font-mono text-[10px] tracking-[0.12em]">
          {isSidebar ? "300 × 250 / AD SLOT" : "RESPONSIVE / AD SLOT"}
        </span>
      </div>
    </section>
  );
}
