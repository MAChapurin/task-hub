import { useDroppable } from '@dnd-kit/core';
import { TaskStatus } from '../types';

export function EmptyDroppable({ id }: { id: TaskStatus }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="h-20 rounded-md border border-dashed border-gray-300 flex items-center justify-center text-sm text-muted-foreground"
    >
      Нет задач
    </div>
  );
}
