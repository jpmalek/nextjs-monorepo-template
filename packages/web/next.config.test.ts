import { describe, it, expect } from 'vitest';
import nextConfig from './next.config';

describe('Next.js config', () => {
  it('should have standalone output', () => {
    expect(nextConfig.output).toBe('standalone');
  });
});
