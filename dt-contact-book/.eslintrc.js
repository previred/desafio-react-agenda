module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    './node_modules/standard/eslintrc.json',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
    'standard-with-typescript'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off'
  },
  globals: {
    React: 'writable'
  }
}
