type PropsWithAdSlotPlaceholder = {
  format: "banner" | "sidebar";
};

export function AdSlotPlaceholder({ format }: PropsWithAdSlotPlaceholder) {
  const isSidebar = format === "sidebar";

  return (
    <section
      className={isSidebar ? undefined : "border-border border-y py-10"}
      aria-label="광고 영역 미리보기"
    >
      <div
        className={
          isSidebar
            ? "bg-surface-muted flex h-[250px] w-[300px] items-center justify-center"
            : "bg-surface-muted mx-auto flex h-[100px] w-full max-w-[320px] items-center justify-center min-[520px]:h-[60px] min-[520px]:max-w-[468px] min-[800px]:h-[90px] min-[800px]:max-w-[728px]"
        }
        aria-hidden="true"
      >
        <span className="text-subtle font-mono text-xs tracking-[0.12em]">
          {isSidebar ? "300 × 250 / AD SLOT" : "RESPONSIVE / AD SLOT"}
        </span>
      </div>
    </section>
  );
}
