import * as SecureStore from 'expo-secure-store';

const BASE_URL = process.env.API_BASE_URL;

export const apiFetch = async (url: string, options: any = {}) => {
  const token = await SecureStore.getItemAsync('accessToken');

  return fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};