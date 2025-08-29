import * as SecureStore from 'expo-secure-store';

export const apiFetch = async (url: string, options: any = {}) => {
  const token = await SecureStore.getItemAsync('accessToken');

  return fetch(url, {
    ...options,
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};