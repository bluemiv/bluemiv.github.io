import type { PropsWithClassName } from "@/types/componentProps";

type PropsWithBrandMark = PropsWithClassName;

export function BrandMark({ className }: PropsWithBrandMark) {
  return (
    <svg aria-hidden="true" className={className} fill="none" focusable="false" viewBox="0 0 64 64">
      <path d="M8 8H40V16H16V36H8V8Z" fill="currentColor" />
      <path d="M56 28V56H24V48H48V28H56Z" fill="currentColor" />
      <g className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none">
        <path d="M28 23H36V31H28V23Z" fill="currentColor" />
        <path d="M28 35H36V43H28V35Z" fill="currentColor" />
      </g>
    </svg>
  );
}
