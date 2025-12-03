import { useTransition } from "react";

export const useAsyncTransition = () => {
  const [isPending, startTransition] = useTransition();

  const runAsync = async <T,>(asyncFn: () => Promise<T>): Promise<T> => {
    return new Promise((resolve, reject) => {
      startTransition(async () => {
        try {
          const result = await asyncFn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  return { isPending, runAsync };
};
