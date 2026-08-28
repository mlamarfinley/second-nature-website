import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


/* BASE PATH.
 * The custom domain serves the site from the root, so this defaults to '/'.
 * The old github.io project URL served it from /second-nature-website/ — build
 * that variant with `npm run build:subpath` if it's ever needed again. The
 * router basename and the prerenderer both read this value, so nothing else
 * has to change.
 *
 * It used to be './' (relative), which works for a flat single page and breaks
 * the moment routes are nested: /business/index.html would resolve ./assets
 * to /business/assets. */
const base = process.env.SITE_BASE || '/'

export default defineConfig(({ command, isSsrBuild }) => ({
  // Dev runs at the root so localhost:5190 just works; only the build carries
  // the Pages subpath. The router reads import.meta.env.BASE_URL, so it follows
  // whichever one is in play without a second config to keep in sync.
  base: command === 'build' ? base : '/',
  plugins: [react()],
  server: { port: 5190 },
  build: {
    // Vendor splitting is a client-side concern. In the SSR build React is an
    // external, and asking Rollup to chunk an external is a build error.
    rollupOptions: isSsrBuild
      ? {}
      : { output: { manualChunks: { react: ['react', 'react-dom', 'react-router-dom'] } } },
  },
}))
