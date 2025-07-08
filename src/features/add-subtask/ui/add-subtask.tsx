'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { nanoid } from 'nanoid';

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
import { toast } from 'sonner';
import { cn } from '@/shared/lib/css';

export function AddSubTaskDialog({ taskId }: { taskId: string }) {
  const task = useTaskStore((state) => state.getTaskById(taskId));
  const addSubTask = useTaskStore((state) => state.addSubTask);

  const [open, setOpen] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState('');

  const onSave = () => {
    if (!task || !subtaskTitle.trim()) return;

    addSubTask(taskId, {
      id: nanoid(),
      title: subtaskTitle.trim(),
    });

    toast(`Subtask added to "${task.title}"`, {
      icon: '✅',
      className: 'bg-green-600 text-white border-none',
    });

    setSubtaskTitle('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn('w-12 h-12 rounded-full bg-chart-1')} variant="outline" size="sm">
          <Plus className="text-background" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add subtask to: {task?.title}</DialogTitle>
          <DialogDescription>
            Enter the subtask title. Click save to add it to this task.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="subtask-title">Subtask Title</Label>
            <Input
              id="subtask-title"
              name="subtask-title"
              value={subtaskTitle}
              onChange={(e) => setSubtaskTitle(e.target.value)}
              placeholder="e.g. Create wireframes"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={onSave} disabled={!subtaskTitle.trim()}>
            Save Subtask
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
