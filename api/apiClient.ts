import Constants from "expo-constants";

const BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl;

export const apiFetch = async (url: string, options: any = {}) => {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0Mzg0NjUzMTI3IiwiaWF0IjoxNzU2NTAzNjE3LCJleHAiOjE3NTY1OTAwMTd9.x8IMhuyZLiIOfLm0jJAIyOo-YSQfwf44wzYqNgFcvFA';

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