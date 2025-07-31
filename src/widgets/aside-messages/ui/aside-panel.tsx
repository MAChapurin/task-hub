import { UserSearchWrapper } from '@/features/user-search/ui/user-search-wrapper';
import { cn } from '@/shared/lib/css';

export const AsidePanel = ({
  className,
  allUsers,
  currentUserId,
}: {
  allUsers: {
    id: string;
    name: string;
  }[];
  className?: string;
  currentUserId: string;
}) => {
  return (
    <aside className={cn('hidden xl:block w-80 shrink-0 h-screen', className)}>
      <div className="flex h-full items-center justify-center p-6 bg-chart-1 bg-[url(/message-bg.jpeg)] bg-top bg-no-repeat bg-contain w-full aspect-[16/9]">
        <div className="">
          <UserSearchWrapper users={allUsers} currentUserId={currentUserId} />
          <p className="text-gray-600">Выберите пользователя для начала общения.</p>
        </div>
      </div>
    </aside>
  );
};
