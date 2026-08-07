import type { ReactNode } from "react";

type BlogGridProps = {
  children: ReactNode;
  sidebar: ReactNode;
};

export function BlogGrid({ children, sidebar }: BlogGridProps) {
  return (
    <div className="grid items-start gap-16 xl:grid-cols-[minmax(0,760px)_300px] xl:gap-[60px]">
      <div className="w-full max-w-[760px] min-w-0">{children}</div>
      {sidebar}
    </div>
  );
}
