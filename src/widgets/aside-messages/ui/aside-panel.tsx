import { cn } from '@/shared/lib/css';

export const AsidePanel = ({ className }: { className?: string }) => {
  return (
    <aside className={cn('hidden xl:block w-80 shrink-0 h-screen', className)}>
      <div className="flex h-full items-center justify-center p-6 bg-violet-400 bg-[url(/message-bg.jpeg)] bg-top bg-no-repeat bg-contain w-full aspect-[16/9]">
        <span className="font-semibold">Messages</span>
      </div>
    </aside>
  );
};
