module.exports = {
  root: true,
  settings: {
    'import/resolver': {
      webpack: {
        config: './build/webpack.config.base.js'
      }
    }
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'eslint-config-airbnb'],
  plugins: ['react'],
  parser: 'babel-eslint',
  env: {
    browser: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    semi: [0],
    'comma-dangle': [0],
    'react/jsx-one-expression-per-line': [0],
    'react/static-property-placement': [0]
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'eslint-config-airbnb',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'prettier',
        'prettier/react'
      ],
      rules: {
        'react/static-property-placement': [0],
        'react/jsx-filename-extension': [0]
      }
    }
  ]
}
