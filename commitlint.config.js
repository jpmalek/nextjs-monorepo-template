export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-full-stop': [0], // 0 = disabled, 1 = warning, 2 = error
    'body-max-line-length': [2, 'always', 220], // Increased from default 100 to 120
    'type-enum': [
      2, // Level: 0 = disabled, 1 = warning, 2 = error
      'always', // Applicability: 'always' or 'never'
      [ // Allowed types
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'test',
      ],
    ],
  },
};
