export const getApiBaseUrl = (): string => {
  return import.meta.env.OIKOS_API_URL || 'http://localhost:51730';
};