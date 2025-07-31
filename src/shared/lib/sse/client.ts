import { useState, useEffect } from 'react';

export function useEventsSource<T>(url: string, onData?: (data: T) => void) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>();
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const source = new EventSource(url);

    source.addEventListener('message', (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setData(parsed);
        onData?.(parsed);
        setIsPending(false);
      } catch (e) {
        setError(e);
      }
    });

    source.onerror = (e) => {
      setError(e);
    };

    return () => source.close();
  }, []);

  return { dataStream: data, error, isPending };
}
