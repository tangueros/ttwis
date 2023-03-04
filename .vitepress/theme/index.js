import DefaultTheme from 'vitepress/theme'
import browser from './components/browser.vue'
import calview from './components/calview.vue'

//import routes from "~pages";
//import { getPages } from '../../src/browser'

//const pages = getPages(routes)

//export { routes, pages };

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // register global components
    app.component('browser', browser)
    app.component('calview', calview)
  }
}
