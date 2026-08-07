import type { ReactNode } from "react";

type BlogGridProps = {
  children: ReactNode;
  sidebar: ReactNode;
};

export function BlogGrid({ children, sidebar }: BlogGridProps) {
  return (
    <div className="grid items-start gap-16 xl:grid-cols-[minmax(0,760px)_300px] xl:gap-[60px]">
      <div className="min-w-0 w-full max-w-[760px]">{children}</div>
      {sidebar}
    </div>
  );
}
