module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier',
  ],
  plugins: ['prettier', 'react', 'react-hooks'],
  rules: {
    "prettier/prettier": ["error", {
      "semi": false,
      "singleQuote": true,
      "trailingComma": "all",
    }],
  },
};
