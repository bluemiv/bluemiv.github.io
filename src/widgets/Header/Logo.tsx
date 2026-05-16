import Image from 'next/image';
import Link from 'next/link';
import { ROUTE_PATH } from '@/shared/constants/route';

export default function Logo() {
  return (
    <Link
      href={ROUTE_PATH.ROOT}
      className="group font-bold italic flex items-center gap-sm text-app-text dark:text-app-dark-text"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-app-primary-soft dark:bg-app-dark-primary-soft ring-1 ring-app-border dark:ring-app-dark-border transition-transform duration-150 group-hover:-rotate-3">
        <Image
          src="/icon-192x192.png"
          alt="Bluemiv"
          width={50}
          height={50}
          className="h-5 w-5"
        />
      </span>
      <span className="hidden md:inline tracking-tight">Bluemiv.</span>
    </Link>
  );
}
