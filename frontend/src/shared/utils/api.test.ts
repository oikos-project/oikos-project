import { describe, it, expect, vi } from 'vitest';
import { getApiBaseUrl } from './api';

describe('api utility', () => {
  it('should return OIKOS_API_URL from environment if set', () => {
    vi.stubEnv('OIKOS_API_URL', 'http://test-api.com');
    expect(getApiBaseUrl()).toBe('http://test-api.com');
  });

  it('should return default URL if OIKOS_API_URL is not set', () => {
    // Ensure no env var is set from previous tests by explicitly setting it to undefined
    vi.stubEnv('OIKOS_API_URL', undefined);
    expect(getApiBaseUrl()).toBe('http://localhost:51730');
  });
});