import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Relative base so the site works whether it is served from a user/org
// root page (https://user.github.io/) or a project page
// (https://user.github.io/repo/).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});
