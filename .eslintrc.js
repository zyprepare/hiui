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
    'comma-dangle': [0]
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
        'react/prop-types': 0,
        'import/no-named-as-default': 0,
        'react/static-property-placement': [0],
        'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
        'no-unused-expressions': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/anchor-has-content': 0,
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off'
      }
    }
  ]
}
