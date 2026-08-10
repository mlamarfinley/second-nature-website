import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


/* BASE PATH.
 * GitHub Pages serves this repo at /second-nature-website/, so assets and
 * routes have to be prefixed. The day the custom domain is connected the site
 * sits at the root instead — build with SITE_BASE=/ and everything follows,
 * because the router basename and the prerenderer both read this value.
 *
 * It used to be './' (relative), which works for a flat single page and breaks
 * the moment routes are nested: /business/index.html would resolve ./assets
 * to /business/assets. */
const base = process.env.SITE_BASE || '/second-nature-website/'

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
