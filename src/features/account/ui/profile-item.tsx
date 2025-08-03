import { Avatar, AvatarImage } from '@/shared/ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';

export function ProfileItem({
  src = 'https://github.com/shadcn.png',
  fallback = 'CN',
  name,
  mail,
}: {
  src?: string;
  fallback?: string;
  name: string;
  mail: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={src} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <span className="text-sm">{name}</span>
        <a className="text-xs" href={`mailto:${mail}`}>
          {mail}
        </a>
      </div>
    </div>
  );
}
