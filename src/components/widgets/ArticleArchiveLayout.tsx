import type { ReactNode } from "react";

type ArticleArchiveLayoutProps = {
  children: ReactNode;
  sidebar: ReactNode;
};

export function ArticleArchiveLayout({ children, sidebar }: ArticleArchiveLayoutProps) {
  return (
    <div className="grid items-start gap-16 xl:grid-cols-[minmax(0,760px)_300px] xl:gap-[60px]">
      <div className="w-full max-w-[760px] min-w-0">{children}</div>
      {sidebar}
    </div>
  );
}
