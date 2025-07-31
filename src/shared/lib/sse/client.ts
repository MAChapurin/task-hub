import { useState, useEffect, useRef } from 'react';

export function useEventsSource<T>(url: string, onData?: (data: T) => void) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>();
  const [isPending, setIsPending] = useState(true);

  const onDataRef = useRef(onData);
  useEffect(() => {
    onDataRef.current = onData;
  }, [onData]);

  useEffect(() => {
    if (!url) return;

    const source = new EventSource(url);

    source.onopen = () => {
      setIsPending(false);
      setError(undefined);
    };

    source.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setData(parsed);
        onDataRef.current?.(parsed);
      } catch (e) {
        setError(e);
      }
    };

    source.onerror = (e) => {
      setError(e);

      // source.close();
    };

    return () => {
      source.close();
    };
  }, [url]);

  return { dataStream: data, error, isPending };
}
