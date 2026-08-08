import type { ReactNode } from "react";

import type { LucideIcon } from "lucide-react";

export type MetadataListItem = {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
};

type PropsWithMetadataList = {
  items: readonly MetadataListItem[];
};

export function MetadataList({ items }: PropsWithMetadataList) {
  return (
    <dl className="text-muted border-border mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t pt-5 text-sm">
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex min-h-6 items-center gap-2">
          <Icon aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
          <dt className="sr-only">{label}</dt>
          <dd className="text-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
