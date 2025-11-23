import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from "vite-plugin-pages";
import { extendRoutes } from "vitepress-pages";
import generateSitemap from "vite-plugin-pages-sitemap"; //optional;

export default defineConfig({
  base: '/ttwis',
  root: 'app',
  //publicDir: '../public',
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  alias: {
    '@/':        path.resolve(__dirname, './app'),
    '@assets/':  path.resolve(__dirname, './app/assets'),
    '@styles/':     path.resolve(__dirname, './app/styles'),
    '@js/':      path.resolve(__dirname, './app/js'),
  },
  plugins: [
    vue(),
    Pages({
      dirs: [{ dir: ".", baseRoute: "." }],
      extensions: ["md"],
      ...extendRoutes(),
      onRoutesGenerated: (routes) =>
        generateSitemap({
          routes,
          hostname: "http://localhost/"
        }), //provide a hostname and generate a `sitemap.xml` in the public folder
    }),
  ],
});
