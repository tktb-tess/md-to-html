// @ts-check
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter({
      pages: 'dist',
      fallback: undefined,
      strict: true,
    }),
    paths: {
      base: '/md-to-html'
    }
  },
  extensions: ['.svelte'],
  compilerOptions: {
    // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
    runes: (o) => (o.filename.split(/[/\\]/).includes('node_modules') ? undefined : true),
  }
};
