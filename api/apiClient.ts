// import * as SecureStore from 'expo-secure-store';

const BASE_URL = process.env.API_BASE_URL;

export const apiFetch = async (url: string, options: any = {}) => {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0Mzg0NjUzMTI3IiwiaWF0IjoxNzU2NTAwOTczLCJleHAiOjE3NTY1ODczNzN9.qY-8kfwJj90uRN-IwO7I3wqFuv_44pWqKJjtlL-aDtE';

  if (!token) {
    throw new Error('accessToken이 없습니다. 로그인 후 다시 시도하세요.');
  }

  return fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};