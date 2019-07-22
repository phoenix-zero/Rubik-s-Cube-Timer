module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:react/recommended'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    'no-use-before-define': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'react/no-access-state-in-setstate': 0,
    'react/destructuring-assignment': 0,
    'max-len': 1,
    'react/no-array-index-key': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'prettier/prettier': ['error'],
    'react/jsx-uses-vars': 1,
    'import/extensions': 'off',
  },
};
