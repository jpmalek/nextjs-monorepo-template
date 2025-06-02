import { describe, it, expect } from 'vitest';
import handler from '../pages/api/index';

describe('api handler', () => {
  it('should be a function', () => {
    expect(typeof handler).toBe('function');
  });
}); 