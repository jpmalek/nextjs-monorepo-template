import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import tsEslintParser from '@typescript-eslint/parser';
import nextPlugin from '@next/eslint-plugin-next';
import js from '@eslint/js';
import globals from 'globals';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  // Base configuration
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/build',
      '**/.next',
      '**/out',
      '**/*.test.ts',
      '**/*.spec.ts',
      '**/*.test.tsx',
      '**/*.spec.tsx'
    ],
  },
  
  // Next.js config files - must come before TypeScript config
  {
    files: ['**/next.config.{js,ts}'],
    languageOptions: {
      sourceType: 'commonjs',  // Allow require() in config files
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // Disable rules that conflict with Next.js config files
      'import/no-commonjs': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true
      }]
    }
  },
  
  // JavaScript/TypeScript base config
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['**/*.test.ts', '**/*.spec.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parser: tsEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        // Use the tsconfig.json from the package directory
        project: path.join(path.dirname(__filename), 'packages', '**', 'tsconfig.json'),
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
      '@next/next': nextPlugin,
    },
    rules: {
      // Base ESLint recommended rules
      ...js.configs.recommended.rules,
      
      // TypeScript recommended rules
      ...eslintPluginTs.configs['recommended'].rules,
      
      // Next.js recommended rules
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals']?.rules || {},
      
      // Custom rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      
      // Next.js specific rules
      '@next/next/no-html-link-for-pages': ['error', path.join('packages', 'web', 'pages')],
      '@next/next/no-sync-scripts': 'error',
      // Allow test files to use 'any' type
      '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    },
  },
];
