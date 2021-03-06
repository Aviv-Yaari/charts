import Axios, { AxiosError, Method } from 'axios';
const axios = Axios.create({ withCredentials: true });
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/';

async function ajax(endpoint: string, method: Method = 'GET', data: {} | null = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === 'GET' ? data : null,
    });
    return res.data;
  } catch (error) {
    const message = (error as AxiosError).response?.statusText || 'An error occured';
    throw new Error(message);
  }
}

export const httpService = {
  get(endpoint: string, data?: {}) {
    return ajax(endpoint, 'GET', data);
  },
  post(endpoint: string, data?: {} | null) {
    return ajax(endpoint, 'POST', data);
  },
  put(endpoint: string, data?: {} | null) {
    return ajax(endpoint, 'PUT', data);
  },
  delete(endpoint: string, data?: {}) {
    return ajax(endpoint, 'DELETE', data);
  },
};
