// import * as SecureStore from 'expo-secure-store';

const BASE_URL = process.env.API_BASE_URL;

export const apiFetch = async (url: string, options: any = {}) => {
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0Mzg0NjUzMTI3IiwiaWF0IjoxNzU2NTAwOTczLCJleHAiOjE3NTY1ODczNzN9.qY-8kfwJj90uRN-IwO7I3wqFuv_44pWqKJjtlL-aDtE";

  // headers가 FormData일 경우 Content-Type 제거
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...options.headers,
  };

  return fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });
};