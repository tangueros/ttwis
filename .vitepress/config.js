export default {
  base: '/ttwis/',
  srcDir: './docs',
  //outDir: '',
  port: 3333,
  host: '0.0.0.0',

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

////////////////////////////////////////////////

  themeConfig: {
    //logo: '/logo.svg',
    siteTitle: 'TTWIS Data Project',
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
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
          { text: 'Datas', link: '/guide/datas' },
          { text: 'Displays', link: '/guide/displays' },
          { text: 'Sources', link: '/guide/sources' },
          { text: 'Formats', link: '/guide/formats' },
          { text: 'Libraries', link: '/guide/libraries' },
          { text: 'Team', link: '/guide/team' },
        ]
      }
    ],

  },
}

