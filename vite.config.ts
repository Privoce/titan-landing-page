import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Auto-detect correct base for GitHub Pages in CI.
  // - User/Org site repo (e.g. username.github.io) => '/'
  // - Project site repo (e.g. my-app) => '/my-app/'
  base:
    (() => {
      const repo = process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? '';
      const isUserOrOrgSite = repo.toLowerCase().endsWith('.github.io');
      if (isUserOrOrgSite || repo === '') return '/';
      return `/${repo}/`;
    })(),
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
