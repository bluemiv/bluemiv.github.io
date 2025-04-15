import { PropsWithChildren } from 'react';

export default function SectionTitle({ children }: PropsWithChildren) {
  return (
    <h6 className="text-sm text-app-sub-text dark:text-app-dark-sub-text font-semibold mb-md">
      {children}
    </h6>
  );
}
