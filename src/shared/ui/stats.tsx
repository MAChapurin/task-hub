import Image from 'next/image';
import { cn } from '../lib/css';
import { Card, CardContent } from '@/shared/ui/card';

export const Stats = ({
  title,
  stats,
  src,
  backgroundColor,
}: {
  title: string;
  stats: string;
  src: string;
  backgroundColor: string;
}) => {
  return (
    <Card className={cn('min-w-2xs w-full rounded-2xl p-0 border-0', backgroundColor)}>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-4xl">{stats}</p>
          <h3 className="text-base font-semibold">{title}</h3>
        </div>
        <div className="min-w-min">
          <Image src={src} alt={title} title={title} width={100} height={100} />
        </div>
      </CardContent>
    </Card>
  );
};
