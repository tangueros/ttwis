import { defineConfig } from 'vitepress'
import { version } from '../package.json'

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
  title: 'ttwis-data',
  description: 'producer-data-catalog',
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
    //publicDir: './public',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
  },

////////////////////////////////////////////////

  themeConfig: {
    //logo: '/logo.svg',
    siteTitle: 'TTWIS Data Project',
    nav: [
      { text: 'Guide', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: 'Blog', link: '/blog/', activeMatch: '/blog/' },
      {
        text: 'Producer Data',
        items: [
          { text: 'Singapore', link: '/singapore' },
          { text: 'Malaysia', link: '/malaysia' },
          { text: 'Thailand', link: '/thailand' }
        ]
      }
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
      message: 'TTWIS Data',
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
