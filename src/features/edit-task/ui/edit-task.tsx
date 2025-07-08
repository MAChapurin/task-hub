import { useState } from 'react';
import { Pencil } from 'lucide-react';

import { useTaskStore } from '@/entities';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { DeadlineDatePicker } from './date-picker';
import { toast } from 'sonner';

export function EditTaskDialog({ taskId }: { taskId: string }) {
  const task = useTaskStore((state) => state.getTaskById(taskId));
  const updateTask = useTaskStore((state) => state.updateTask);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(task?.title ?? '');
  const [dueDate, setDueDate] = useState<Date | null>(task?.dueDate ?? null);

  const onSave = () => {
    if (!task) return;

    updateTask(taskId, {
      title,
      dueDate: dueDate ?? task.dueDate,
    });

    toast(`Task "${title}" successfully updated`, {
      icon: '✅',
      className: 'bg-green-600 text-white border-none',
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-12 h-12 rounded-full" variant="outline" size="sm">
          <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <DeadlineDatePicker date={dueDate} setDate={setDueDate} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={onSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
