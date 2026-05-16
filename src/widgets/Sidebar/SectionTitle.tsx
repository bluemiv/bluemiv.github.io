import { PropsWithChildren } from 'react';

export default function SectionTitle({ children }: PropsWithChildren) {
  return (
    <h2 className="text-xs tracking-wide text-app-text-subtle dark:text-app-dark-text-subtle font-bold mb-sm">
      {children}
    </h2>
  );
}
