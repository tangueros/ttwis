import { createPinia } from 'pinia'
import DefaultTheme from 'vitepress/theme'
import './tailwind.css'

const pinia = createPinia()

const componentFiles = import.meta.glob([
  //'./components/*.vue',
  '../../app/components/*.vue',
], {eager:true})

//import routes from "~pages";
//import { getPages } from '../../src/browser'
//const pages = getPages(routes)
//export { routes, pages };

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.use(pinia)
    DefaultTheme.enhanceApp({ app, router, siteData })
    console.log('Inside enhanceApp of Theme')

    return
    // register global components
    Object.entries(componentFiles)
    .forEach(([path, definition]) => {
      const componentName = path.split('/').pop().replace(/\.\w+$/, '')
      //const kebab = fileName.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase()
      app.component(componentName, definition.default)
      console.log('Registered ', componentName)
    })

    // ignore these
    //console.log(router, siteData)
  },
  setup() {
    console.log('Inside setup of Theme')

  },
}
