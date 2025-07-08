import { PATHNAMES } from '@/shared/constants/pathnames';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl">Home page</h1>
      <Link
        className="bg-accent text-foreground p-2 flex items-center gap-2 rounded-xl"
        href={PATHNAMES.DASHBOARD}
      >
        TO DASHBOARD <ArrowRight className="text-foreground" />
      </Link>
    </div>
  );
}
