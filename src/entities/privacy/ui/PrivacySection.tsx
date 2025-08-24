import { PropsWithChildren, ReactNode } from 'react';
import { PrivacyTitle } from '@/entities/privacy';

export const PrivacySection = ({ title, children }: PropsWithChildren<{ title: ReactNode }>) => {
  return (
    <div>
      {title && <PrivacyTitle className="my-sm">{title}</PrivacyTitle>}
      {children}
    </div>
  );
};
