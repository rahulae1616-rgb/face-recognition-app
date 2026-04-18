import axios from 'axios';

export const api = axios.create({
  baseURL: '/api/users',
  timeout: 120000,
});

export async function fetchCountries() {
  const { data } = await api.get('/countries');
  if (!data?.ok) throw new Error('Failed to load countries');
  return data.countries;
}

export async function registerUser(formData) {
  const { data } = await api.post('/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function recognizeUser(formData) {
  const { data } = await api.post('/recognize', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
