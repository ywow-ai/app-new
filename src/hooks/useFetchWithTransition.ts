import { useState, useTransition, useCallback } from "react";

interface UseFetchWithTransitionReturn<T> {
  data: T | null;
  error: string | null;
  isPending: boolean;
  isLoading: boolean;
  fetchData: (fetchFn: () => Promise<T>) => Promise<void>;
  refetch: () => void;
  reset: () => void;
}

export const useFetchWithTransition = <T,>(): UseFetchWithTransitionReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [fetchFnRef, setFetchFnRef] = useState<(() => Promise<T>) | null>(null);

  const fetchData = useCallback(
    async (fetchFn: () => Promise<T>) => {
      setError(null);
      setFetchFnRef(() => fetchFn);

      return new Promise<void>((resolve, reject) => {
        startTransition(async () => {
          try {
            const result = await fetchFn();
            setData(result);
            resolve();
          } catch (err) {
            const errorMessage =
              err instanceof Error ? err.message : "An error occurred";
            setError(errorMessage);
            reject(err);
          }
        });
      });
    },
    [startTransition]
  );

  const refetch = useCallback(() => {
    if (fetchFnRef) {
      fetchData(fetchFnRef);
    }
  }, [fetchFnRef, fetchData]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setFetchFnRef(null);
  }, []);

  return {
    data,
    error,
    isPending,
    isLoading: isPending && !data && !error,
    fetchData,
    refetch,
    reset,
  };
};

