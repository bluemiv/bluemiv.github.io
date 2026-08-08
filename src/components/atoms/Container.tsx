import type { PropsWithChildren } from "react";

import type { PropsWithClassName } from "@/types/componentProps";

type PropsWithContainer = PropsWithClassName<PropsWithChildren>;

export function Container({ children, className = "" }: PropsWithContainer) {
  return (
    <div className={`mx-auto w-full max-w-[1184px] px-5 md:px-8 ${className}`}>{children}</div>
  );
}
