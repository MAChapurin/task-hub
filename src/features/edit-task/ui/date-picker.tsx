'use client';

import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Calendar } from '@/shared/ui/calendar';
import { Label } from '@/shared/ui/label';
import { Button } from '@/shared/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

interface DeadlineDatePickerProps {
  date: Date | string | null;
  setDate: (value: Date | null) => void;
}

export function DeadlineDatePicker({ date, setDate }: DeadlineDatePickerProps) {
  const [open, setOpen] = useState(false);

  const parsedDate: Date | null = typeof date === 'string' ? new Date(date) : date;

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="calendar" className="px-1">
        Deadline
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="w-48 justify-between font-normal">
            {parsedDate instanceof Date && !isNaN(parsedDate.getTime())
              ? parsedDate.toLocaleDateString()
              : 'Select date'}
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            id="calendar"
            mode="single"
            selected={parsedDate || undefined}
            onSelect={(selectedDate) => {
              setDate(selectedDate ?? null);
              setOpen(false);
            }}
            captionLayout="label"
            required={false}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
