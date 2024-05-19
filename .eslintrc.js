module.exports = {
  root: true,
  extends: '@arcblock/eslint-config',
  globals: {
    logger: true,
  },
  rules: {
    'react/prop-types': 'off',
    'unicorn/filename-case': 'off',
  },
};
