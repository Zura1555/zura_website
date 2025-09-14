import sanityConfig from '@sanity/eslint-config-studio';

export default [
  ...sanityConfig,
  {
    ignores: ['dist/**', 'node_modules/**', '.sanity/**'],
  },
];