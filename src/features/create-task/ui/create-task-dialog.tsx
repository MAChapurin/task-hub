'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Button } from '@/shared/ui/button';

import { cn } from '@/shared/lib/css';
import { useActionState } from '@/shared/lib/react';
import { createTaskAction } from '../action/create-task.action';
import { Plus } from 'lucide-react';
import { CreateTaskFormState } from '../model/create-task.schema';

type CreateTaskDialogProps = {
  projectId: string;
};

export function CreateTaskDialog({ projectId }: CreateTaskDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [formState, dispatch, isPending] = useActionState<
    CreateTaskFormState,
    CreateTaskFormState,
    FormData
  >(
    (prev: CreateTaskFormState, formData: FormData) => createTaskAction(prev, formData, projectId),
    {} as CreateTaskFormState
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
          className={cn('w-12 h-12 rounded-full bg-chart-1 cursor-pointer')}
          variant="outline"
          size="sm"
        >
          <Plus className="text-background" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание задачи</DialogTitle>
        </DialogHeader>

        <form action={(formData) => dispatch(formData)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Название</Label>
            <Input
              id="title"
              name="title"
              placeholder="Задача 1"
              className={cn({ 'border-red-500': formState.errors?.title })}
            />
            {formState.errors?.title && (
              <p className="text-sm text-red-500">{formState.errors.title}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="durationHours">Продолжительность (часы)</Label>
            <Input
              id="durationHours"
              name="durationHours"
              type="number"
              min={1}
              placeholder="4"
              className={cn({ 'border-red-500': formState.errors?.durationHours })}
            />
            {formState.errors?.durationHours && (
              <p className="text-sm text-red-500">{formState.errors.durationHours}</p>
            )}
          </div>

          {formState.errors?._form && (
            <p className="text-sm text-red-500">{formState.errors._form}</p>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? 'Создание...' : 'Создать'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
