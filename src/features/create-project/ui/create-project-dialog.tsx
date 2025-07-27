'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

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
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Calendar } from '@/shared/ui/calendar';

import { cn } from '@/shared/lib/css';
import { useActionState } from '@/shared/lib/react';
import { createProjectAction, CreateProjectFormState } from '../action/create-project.action';
import { EMOJIS } from '@/shared/constants/emojis';

export function CreateProjectDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [emojiDialogOpen, setEmojiDialogOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJIS[0]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [formState, dispatch, isPending] = useActionState(
    createProjectAction,
    {} as CreateProjectFormState
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
        <Button>Создать проект</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание проекта</DialogTitle>
        </DialogHeader>

        <form
          action={(formData) => {
            formData.set('icon', selectedEmoji);
            if (selectedDate) {
              formData.set('dueDate', selectedDate.toISOString());
            }
            return dispatch(formData);
          }}
          className="grid gap-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="title">Название</Label>
            <Input
              id="title"
              name="title"
              placeholder="Проект X"
              className={cn({ 'border-red-500': formState.errors?.title })}
            />
            {formState.errors?.title && (
              <p className="text-sm text-red-500">{formState.errors.title}</p>
            )}
          </div>

          <div className="grid gap-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label className="mb-2">Дедлайн</Label>
                <Popover>
                  <PopoverTrigger asChild className="w-full">
                    <Button
                      variant="outline"
                      className={cn(
                        'flex-1 justify-start text-left font-normal',
                        !selectedDate && 'text-muted-foreground',
                        formState.errors?.dueDate && 'border-red-500'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PPP') : 'Выбери дату'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex-1">
                <Label className="mb-2">Логотип</Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEmojiDialogOpen(true)}
                  className={cn('w-full justify-start', formState.errors?.icon && 'border-red-500')}
                >
                  {selectedEmoji}
                  <span className="ml-2 text-muted-foreground">(выбрать)</span>
                </Button>
              </div>
            </div>

            {formState.errors?.dueDate && (
              <p className="text-sm text-red-500">{formState.errors.dueDate}</p>
            )}
            {formState.errors?.icon && (
              <p className="text-sm text-red-500">{formState.errors.icon}</p>
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

      <Dialog open={emojiDialogOpen} onOpenChange={setEmojiDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Выбери иконку</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-10 gap-2">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                className="text-2xl hover:scale-110 transition"
                onClick={() => {
                  setSelectedEmoji(emoji);
                  setEmojiDialogOpen(false);
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
