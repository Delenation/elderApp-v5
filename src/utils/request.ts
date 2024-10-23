import { CapacitorHttp } from '@capacitor/core';

// const baseURL = 'http://121.199.174.47:8080';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const request = {
  get: async (url: string, params = {}, headers = {}) => {
    const options = {
      url: `${baseURL}${url}`,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      params: params || {},
    };
    const response = await CapacitorHttp.get(options);
    return response.data;
  },
  post: async (url: string, data = {}, headers = {}) => {
    const options = {
      url: `${baseURL}${url}`,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      data: data || {},
    };
    const response = await CapacitorHttp.post(options);
    return response.data;
  },
  put: async (url: string, data = {}, headers = {}) => {
    const options = {
      url: `${baseURL}${url}`,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      data: data || {},
    };
    const response = await CapacitorHttp.put(options);
    return response.data;
  },
}

export default request;
