'use client';

import { useState, useEffect } from 'react';
import { Trash } from 'lucide-react';
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
import { deleteProjectAction, DeleteProjectFormState } from '../action/delete-project.action';

type DeleteProjectButtonProps = {
  projectId: string;
  ownerId: string;
  currentUserId: string;
};

export function DeleteProjectButton({
  projectId,
  ownerId,
  currentUserId,
}: DeleteProjectButtonProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [formState, dispatch, isPending] = useActionState(
    deleteProjectAction,
    {} as DeleteProjectFormState
  );

  useEffect(() => {
    if (!isPending && formState && !formState.errors) {
      setOpen(false);
      router.refresh();
    }
  }, [isPending, formState, router]);

  if (currentUserId !== ownerId) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-12 h-12 rounded-full cursor-pointer"
          variant="destructive"
          size="sm"
          aria-label="Удалить проект"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удалить проект?</DialogTitle>
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
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData();
              formData.set('id', projectId);
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
