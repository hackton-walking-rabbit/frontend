import Constants from 'expo-constants';
const BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl;

export const apiFetch = async (url: string, options: any = {}) => {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NDE5OTUyMjAzIiwiaWF0IjoxNzU2NDY2NTYwLCJleHAiOjE3NTY1NTI5NjB9.JO-F4boeZaABGUTuExqZp-mT2tXB8XiTsadlgkpT1_s';

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