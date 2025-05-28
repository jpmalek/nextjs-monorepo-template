import { describe, it, expect } from 'vitest';
import handler from './index';

describe('api handler', () => {
  it('should be a function', () => {
    expect(typeof handler).toBe('function');
  });
});
