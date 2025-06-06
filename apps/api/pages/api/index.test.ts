import { describe, it, expect } from 'vitest';
import handler from './index.page';

describe('api handler', () => {
  it('should be a function', () => {
    expect(typeof handler).toBe('function');
  });
}); 