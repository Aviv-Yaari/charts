import { useCallback, useState } from 'react';
import { Alert } from '../App';

export const useFetch = (setAlert: React.Dispatch<React.SetStateAction<Alert | null>>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(
    async (func: Function, errorMessage: string = 'An error occured', successMessage?: string) => {
      try {
        setIsLoading(true);
        const response = await func();
        setIsLoading(false);
        if (successMessage) setAlert({ message: successMessage, type: 'success' });
        return response;
      } catch (error) {
        setError(error);
        setAlert({ message: errorMessage, type: 'error' });
        setIsLoading(false);
      }
    },
    [setAlert]
  );

  return { fetchData, isLoading, error };
};
