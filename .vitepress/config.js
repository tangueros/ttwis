import path from 'path';
import { defineConfig } from 'vitepress'
//import Pages from "vite-plugin-pages";
//import generateSitemap from 'vite-plugin-pages-sitemap'
//import { extendRoutes } from "../src";

//const p = path.resolve(__dirname, '../src')
//console.log('Path is',p)

export default defineConfig({
  base: '/ttwis/',
  srcDir: './docs',
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
  description: 'calendar aggregator toolkitg',
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

  //markdown:
  //vue:
  vite: {
/*
    resolve: {
      alias: {
        '@src/': path.resolve(__dirname, '../src/'),
      },
    },
*/
    //publicDir: './public',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
/*
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
    ],
  },

////////////////////////////////////////////////

  themeConfig: {
    //logo: '/logo.svg',
    siteTitle: 'TTWIS Calendar Project',
    nav: [
      {
        text: 'Places',
        items: [
          { text: 'Singapore', link: '/place/sg' },
          { text: 'Malaysia', link: '/place/my' },
          { text: 'Hong Kong', link: '/place/hk/' }
        ]
      },
      { text: 'Guide', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: 'Specification', link: '/specs/introduction', activeMatch: '/specs/' },
    ],
    sidebar: [
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
      }
    ],
    footer: {
      message: 'TTWIS Calendar Project',
      copyright: 'Copyright 2023 TTWIS',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tangueros/ttwis'},
    ],
    editLink: {
      pattern: 'https://github.com/tangueros/ttwis/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    blog: {
      title: 'My Blog',
      description: 'Some Blog Articles',
    },

  },
})
