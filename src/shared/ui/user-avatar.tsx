import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

interface UserAvatarProps {
  name: string;
  surname: string;
  src?: string | null;
}

export function UserAvatar({ name, surname, src }: UserAvatarProps) {
  const initials = `${name?.[0] ?? ''}${surname?.[0] ?? ''}`.toUpperCase();

  return (
    <Avatar>
      <AvatarImage src={src ?? undefined} alt={`${name} ${surname}`} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
