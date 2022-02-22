import Main from './views/Main.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'
import Empty from './views/Empty.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { 
    path: '/', component: Main, name: "Main", 
    meta: { title: 'Main' } 
  },
  {
    path: '/about', name: "About",
    meta: { title: 'About' },
    component: About,
  },
  {
    path: '/input/:expr', name: "Output",
    component: Empty
  },
  { path: '/:path(.*)', component: NotFound },
]
