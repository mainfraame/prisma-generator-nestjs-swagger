module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-plugin/recommended',
    'plugin:import/recommended',
  ],
  env: {
    amd: true,
    browser: true,
    node: true
  },
  globals: {
    module: true,
    process: true,
    window: true
  },
  overrides: [
    {
      files: ['**/src/graphql/**/*.*'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/ban-types': 'warn',
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      experimentalDecorators: true,
      legacyDecorators: true,
      jsx: true
    },
    sourceType: 'module'
  },
  rules: {
    'import/no-anonymous-default-export': 'off',
    'no-useless-escape': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true }
    ],
    '@typescript-eslint/no-var-requires': 'off'
  },
  settings: {
    react: {
      version: '16.14'
    },
    'import/resolver': {
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    }
  }
};
