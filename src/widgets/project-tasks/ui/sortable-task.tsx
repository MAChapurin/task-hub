import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types';
import { TaskCard } from './task-card';
import { useSortable } from '@dnd-kit/sortable';

export function SortableTask({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="space-y-1">
      <TaskCard task={task} />
    </div>
  );
}
