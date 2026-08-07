import type { PropsWithChildren } from "react";

import type { PropsWithClassName } from "@/types/componentProps";

type ContainerProps = PropsWithClassName<PropsWithChildren>;

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1184px] px-5 md:px-8 ${className}`}>{children}</div>
  );
}
