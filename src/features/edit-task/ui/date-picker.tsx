'use client';

import { Calendar } from '@/shared/ui/calendar';
import { Label } from '@/shared/ui/label';
import { Dispatch, SetStateAction } from 'react';

interface DeadlineDatePickerProps {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
}

export function DeadlineDatePicker({ date, setDate }: DeadlineDatePickerProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="calendar" className="px-1">
        Deadline
      </Label>
      <div className="border rounded-md p-2 w-fit">
        <Calendar
          id="calendar"
          mode="single"
          selected={date ?? undefined}
          onSelect={(value) => setDate(value ?? null)}
          captionLayout="dropdown"
          required={false}
        />
      </div>
    </div>
  );
}
