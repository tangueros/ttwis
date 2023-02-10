import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/ttwis',
  //root: 'web',
  //publicDir: '/public',
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  plugins: [
    vue(),
  ],
  alias: {
    // '/@/':        path.resolve(__dirname, './app'),
    // '/@assets/':  path.resolve(__dirname, './app/assets'),
    // '/@js/':      path.resolve(__dirname, './app/js'),
    // '/@css/':     path.resolve(__dirname, './app/css'),
  },
})
