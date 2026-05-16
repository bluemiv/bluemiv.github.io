import Image from 'next/image';
import { SITE_METADATA } from '@/shared/constants/site';

export default function AboutProfile() {
  return (
    <div className="relative shrink-0">
      <div className="absolute inset-[-6px] rounded-3xl bg-gradient-to-br from-app-primary-soft via-app-accent-soft to-transparent dark:from-app-dark-primary-soft dark:via-app-dark-accent-soft opacity-90" />
      <div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-3xl overflow-hidden ring-1 ring-app-border dark:ring-app-dark-border">
        <Image
          className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-105"
          width={400}
          height={400}
          src="/r/i/profile.webp"
          alt={SITE_METADATA.author}
          priority
        />
      </div>
    </div>
  );
}
