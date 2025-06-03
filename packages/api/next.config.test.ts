import { describe, it, expect } from 'vitest';
import nextConfig from './next.config';

describe('API Next.js config', () => {
  it('should have standalone output', () => {
    expect(nextConfig.output).toBe('standalone');
  });

  it('should include proper page extensions', () => {
    expect(nextConfig.pageExtensions).toEqual(['page.tsx', 'page.ts', 'page.jsx', 'page.js']);
  });
});
