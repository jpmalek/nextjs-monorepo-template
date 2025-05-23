export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-full-stop': [0], // 0 = disabled, 1 = warning, 2 = error
  },
};
