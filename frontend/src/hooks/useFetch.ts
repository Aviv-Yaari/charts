import { Alert } from '../App';

export const useFetch = (setAlert: React.Dispatch<React.SetStateAction<Alert | null>>) => {
  async function fetchData(func: Function, errorMessage: string = 'An error occured') {
    try {
      const response = await func();
      return response;
    } catch (error) {
      setAlert({ message: errorMessage, type: 'error' });
    }
  }

  return { fetchData };
};
