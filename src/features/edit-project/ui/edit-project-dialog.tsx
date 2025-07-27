'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { CalendarIcon, Pencil } from 'lucide-react';

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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/select';

import { cn } from '@/shared/lib/css';
import { useActionState } from '@/shared/lib/react';
import { editProjectAction, EditProjectFormState } from '../action/edit-project.action';
import { EMOJIS } from '@/shared/constants/emojis';

type StatusUnion = 'BACKLOG' | 'IN_PROGRESS' | 'DONE';

type EditProjectDialogProps = {
  project: {
    id: string;
    title: string;
    dueDate: Date;
    icon: string;
    status: StatusUnion;
  };
};

export function EditProjectDialog({ project }: EditProjectDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [emojiDialogOpen, setEmojiDialogOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(project.icon);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(project.dueDate));
  const [selectedStatus, setSelectedStatus] = useState<StatusUnion>(project.status);

  const [formState, dispatch, isPending] = useActionState(
    editProjectAction,
    {} as EditProjectFormState
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
        <Button className="w-12 h-12 rounded-full" variant="outline" size="sm">
          <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование проекта</DialogTitle>
        </DialogHeader>

        <form
          action={(formData) => {
            formData.set('id', project.id);
            formData.set('icon', selectedEmoji);
            formData.set('status', selectedStatus);
            if (selectedDate) {
              formData.set('dueDate', selectedDate.toISOString());
            }
            return dispatch(formData);
          }}
          className="grid gap-4"
        >
          {/* Название */}
          <div className="grid gap-2">
            <Label htmlFor="title">Название</Label>
            <Input
              id="title"
              name="title"
              defaultValue={project.title}
              className={cn({ 'border-red-500': formState.errors?.title })}
            />
            {formState.errors?.title && (
              <p className="text-sm text-red-500">{formState.errors.title}</p>
            )}
          </div>

          {/* Дата + Логотип */}
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
                  <span className="ml-2 text-muted-foreground">(изменить)</span>
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

          <div className="grid gap-2">
            <Label htmlFor="status">Статус</Label>
            <Select
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value as StatusUnion)}
            >
              <SelectTrigger className={cn(formState.errors?.status && 'border-red-500')}>
                <SelectValue placeholder="Выберите статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BACKLOG">Backlog</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="DONE">Done</SelectItem>
              </SelectContent>
            </Select>
            {formState.errors?.status && (
              <p className="text-sm text-red-500">{formState.errors.status}</p>
            )}
          </div>

          {formState.errors?._form && (
            <p className="text-sm text-red-500">{formState.errors._form}</p>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? 'Сохранение...' : 'Сохранить'}
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
