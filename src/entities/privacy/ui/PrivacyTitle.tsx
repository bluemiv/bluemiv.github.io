import clsx from 'clsx';
import { PropsWithComponent } from '@/shared/types/props';

export const PrivacyTitle = ({ children, className }: PropsWithComponent) => {
  return (
    <h2
      className={clsx(
        className,
        'text-lg font-semibold text-app-sub-text dark:text-app-dark-sub-text',
      )}
    >
      {children}
    </h2>
  );
};
