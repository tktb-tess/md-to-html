import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import twcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), twcss()],
  base: '/md-to-html/',
});
