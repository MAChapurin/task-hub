'use client';

import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/shared/ui/dialog';
import { useRouter } from 'next/navigation';
import { useActionState } from '@/shared/lib/react';
import { deleteTaskAction, DeleteTaskFormState } from '../action/delete-task.action';

type DeleteTaskButtonProps = {
  taskId: string;
};

export function DeleteTaskDialog({ taskId }: DeleteTaskButtonProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [formState, dispatch, isPending] = useActionState(
    deleteTaskAction,
    {} as DeleteTaskFormState
  );

  useEffect(() => {
    if (!isPending && formState && !formState.errors) {
      setOpen(false);
      router.refresh();
    }
  }, [isPending, formState, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          className="w-10 h-10 rounded-full cursor-pointer"
          variant="destructive"
          size="sm"
          aria-label="Удалить задачу"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удалить задачу?</DialogTitle>
          <DialogDescription>Это действие нельзя отменить. Вы уверены?</DialogDescription>
          {formState.errors?._form && (
            <p className="text-sm text-red-500 mt-2" role="alert" aria-live="assertive">
              {formState.errors._form}
            </p>
          )}
        </DialogHeader>
        <DialogFooter className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
            Отмена
          </Button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData();
              formData.set('id', taskId);
              dispatch(formData);
            }}
          >
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending ? 'Удаление...' : 'Удалить'}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
