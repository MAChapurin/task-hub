import { useDroppable } from '@dnd-kit/core';
import { TaskStatus } from '../types';

export function Column({ id, children }: { id: TaskStatus; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="bg-muted/10 border rounded-md p-4 h-full space-y-2">
      <h3 className="font-semibold mb-2">
        {id === 'BACKLOG' ? 'Бэклог' : id === 'IN_PROGRESS' ? 'В процессе' : 'Завершено'}
      </h3>
      {children}
    </div>
  );
}
