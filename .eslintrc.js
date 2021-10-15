module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
    project: ['./tsconfig.base.json'],
  },
  plugins: ['react', 'import'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    window: true,
  },
  rules: {
    'import/no-relative-parent-imports': ['warn'],
    'import/no-relative-packages': ['warn'],
    'import/no-unassigned-import': ['warn'],
  },
};
