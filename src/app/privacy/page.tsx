import { redirect } from 'next/navigation';
import { ROUTE_PATH } from '@/shared/constants/route';

export default function Page() {
  redirect(ROUTE_PATH.PRIVACY_KPOP_EN);
  return null;
}
