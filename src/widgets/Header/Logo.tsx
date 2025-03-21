import Link from 'next/link';
import { ROUTE_PATH } from '@/shared/constants/route';

export default function Logo() {
  return (
    <Link href={ROUTE_PATH.ROOT} className="font-semibold italic">
      Bluemiv.
    </Link>
  );
}
