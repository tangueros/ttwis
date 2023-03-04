// composables

import routes from "~pages"; // all routes list from `vite-plugin-pages`
import {
	getPage,
	getPages,
	getParents,
	getSiblings,
} from "vitepress-pages/browser";

const pages = getPages(routes); // hierarchical structure of the pages

const usePage = (path) => getPage(path, routes); // current page data object
const useParents = (path) => getParents(path, routes); // An array of parent routes starting from the root
const useSiblings = (path) => getSiblings(path, routes); // { prev, next, index, total }

export { routes, pages, usePage, useParents, useSiblings };
