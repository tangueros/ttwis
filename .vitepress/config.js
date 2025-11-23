import path from 'path';
<<<<<<< HEAD
import Tailwind from '@tailwindcss/vite'
=======
import tailwindcss from '@tailwindcss/vite'
>>>>>>> d61e44387e3a21223fe7404546a9caa3abd1e0ce
import { defineConfig } from 'vitepress'

//import content from '@originjs/vite-plugin-content'
//import Pages from "vite-plugin-pages";
//import generateSitemap from 'vite-plugin-pages-sitemap'
//import { extendRoutes } from "../src";

//const p = path.resolve(__dirname, '../src')
//console.log('Path is',p)


const places = [
  { text: 'Singapore', link: '/place/sin' },
  { text: 'Hong Kong', link: '/place/hkg' },
  { text: 'Kuala Lumpur', link: '/place/kul' },
  { text: 'Penang', link: '/place/pen' },
]
//{ text: 'Taiwan', link: '/place/tw' },
//{ text: 'UK', link: '/place/uk' },
//{ text: 'Argentina', link: '/place/ar' },

const themeConfig = {
  //logo: '/logo.svg',
  siteTitle: 'TTWIS-Cal Project',
  nav: [
    {
      text: 'Places',
      items: places,
    },
    { text: 'Guide', link: '/guide/introduction', activeMatch: '/guide/' },
    { text: 'Specification', link: '/specs/introduction', activeMatch: '/specs/' },
  ],
  sidebar: [
    {
      text: 'Demos',
      items: places,
    },
    {
      text: 'Specs',
      items: [
        { text: 'Venues (Cities)', link: '/specs/venues' },
        { text: 'Holidays (Countries)', link: '/specs/holidays' },
        { text: 'Producers', link: '/specs/producers' },
      ]
    },
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/guide/introduction' },
        { text: 'Motivation', link: '/guide/motivation' },
        { text: 'Strategies', link: '/guide/strategies' },
        { text: 'Datas', link: '/guide/datas' },
        { text: 'Sources', link: '/guide/sources' },
        { text: 'Formats', link: '/guide/formats' },
        { text: 'Libraries', link: '/guide/libraries' },
        { text: 'Team', link: '/guide/team' },
      ]
    },
    {
      text: 'About',
      items: [
        { text: 'About', link: '/about' },
        { text: 'Maps Only', link: '/maps' },
      ]
    },
  ],
  footer: {
    message: 'TTWIS-Cal Project',
    copyright: 'Copyright 2023 TTWIS',
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/tangueros/ttwis' },
  ],
  editLink: {
    pattern: 'https://github.com/tangueros/ttwis/edit/main/docs/:path',
    text: 'Edit this page on GitHub',
  },
  blog: {
    title: 'My Blog',
    description: 'Some Blog Articles',
  },
}

const vpconfig = {
  base: '/ttwis/',
  srcDir: './pages',
  //srcExclude
  //outDir: '',
  //cacheDir
  //shouldPreload?
  //mpa?
  //scrollOffset?
  //useWebFonts
  //rewrites
  lang: 'en-us',
  title: 'ttwis-cal-project',
  description: 'calendar aggregator toolkit',
  ignoreDeadLinks: true,
  cleanUrls: true,
  rewrites: {},

  async buildEnd(siteConfig) {
    // hooks to sitemap, search, pwa etc
    console.log('Build End Hook called!')
  },

  async postRender(context) {
    // teleport here
  },

  async transformHead(context) {
    // stuffs to insert to head
  },

  async transformHtml(code, id, context) {
    // changes before save
  },

  async transformPageData(pageData) {
    // stuffs more stuffs
  },
}


const viteconfig = {
  /*
      resolve: {
        alias: {
          '@src/': path.resolve(__dirname, '../src/'),
        },
      },
<<<<<<< HEAD
    },
*/
    //publicDir: './public',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      Tailwind(),
/*
=======
  */
  //publicDir: './public',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [
    /*
>>>>>>> d61e44387e3a21223fe7404546a9caa3abd1e0ce
      Pages({
        dirs: [
          { dir: ".", baseRoute: "." },
        ],
        exclude: [
          '** /node_modules/ ** / *.*',
          '** /!(index).md'],
        extensions: ['md'],
        ...extendRoutes(),
        // onRoutesGenerated: routes => (generateSitemap({ routes, hostname: 'http://localhost/' })),
      }),
    */
    //content(),
    tailwindcss(),
  ],
}




export default defineConfig({
  ...vpconfig,
  //markdown:
  //vue:
  vite: viteconfig,
  themeConfig: themeConfig,
})
