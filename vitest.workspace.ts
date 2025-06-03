import { defineWorkspace } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineWorkspace([
  // Node.js environment for API and utility tests
  {
    test: {
      name: 'node',
      environment: 'node',
      include: [
        '**/tests/**/*.test.js',
        '**/packages/api/**/*.test.ts',
        '**/packages/web/**/*.test.ts',
        '**/*.test.ts'
      ],
      exclude: ['**/node_modules/**'],
    },
  },
  // jsdom environment for React component tests
  {
    plugins: [react()],
    test: {
      name: 'jsdom',
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      include: ['**/*.test.tsx'],
      exclude: ['**/node_modules/**'],
    },
  },
]);
