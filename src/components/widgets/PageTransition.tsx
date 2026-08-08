import type {} from "react/canary";
import { type PropsWithChildren, ViewTransition } from "react";

type PropsWithPageTransition = PropsWithChildren;

export function PageTransition({ children }: PropsWithPageTransition) {
  return (
    <ViewTransition
      default="none"
      enter={{
        "nav-forward": "page-forward",
        "nav-back": "page-back",
        "nav-swap": "page-swap",
        default: "none",
      }}
      exit={{
        "nav-forward": "page-forward",
        "nav-back": "page-back",
        "nav-swap": "page-swap",
        default: "none",
      }}
    >
      <div className="page-transition-content">{children}</div>
    </ViewTransition>
  );
}
