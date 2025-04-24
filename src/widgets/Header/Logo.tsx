import Image from 'next/image';
import Link from 'next/link';
import { ROUTE_PATH } from '@/shared/constants/route';

export default function Logo() {
  return (
    <Link href={ROUTE_PATH.ROOT} className="font-semibold italic flex items-center gap-xs">
      <Image
        src="/icon-192x192.png"
        alt="Bluemiv"
        width={50}
        height={50}
        className="min-w-[1.5rem] w-auto h-[1.5rem]"
      />
      <span className="hidden md:inline">Bluemiv.</span>
    </Link>
  );
}
