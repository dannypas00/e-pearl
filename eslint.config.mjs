// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { globalIgnores } from 'eslint/config';

export default withNuxt([
  globalIgnores(['components/ui', 'lib']),
  eslintPluginPrettierRecommended,
]);
// Your custom configs here
