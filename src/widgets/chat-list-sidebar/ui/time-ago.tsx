'use client';

import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface TimeAgoProps {
  date: Date;
}

export function TimeAgo({ date }: TimeAgoProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTimeAgo(
        formatDistanceToNow(date, {
          addSuffix: true,
          locale: ru,
        })
      );
    };

    updateTime();

    const intervalId = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId);
  }, [date]);

  return (
    <span
      className="text-xs text-[var(--sidebar-accent-foreground)] whitespace-nowrap ml-2"
      title={date.toLocaleString('ru-RU')}
    >
      {timeAgo}
    </span>
  );
}
