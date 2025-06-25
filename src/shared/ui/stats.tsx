import Image from 'next/image';
import { cn } from '../lib/css';

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
    <div
      className={cn(
        'min-w-2xs w-full flex items-center justify-between rounded-2xl p-4',
        backgroundColor
      )}
    >
      <div className="flex flex-col gap-2">
        <p className="font-bold text-4xl">{stats}</p>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <div className="min-w-min">
        <Image src={src} alt={title} title={title} width={100} height={100} />
      </div>
    </div>
  );
};
