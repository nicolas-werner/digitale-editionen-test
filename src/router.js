import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './components/LandingPage.vue'
import Introduction from './components/Introduction.vue'
import ManuscriptComparison from './components/ManuscriptComparison.vue'
import ManuscriptViewer from './components/ManuscriptViewer.vue'
import TextUnderstanding from './components/TextUnderstanding.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/introduction',
    name: 'Introduction',
    component: Introduction
  },
  {
    path: '/manuscript-comparison',
    name: 'ManuscriptComparison',
    component: ManuscriptComparison
  },
  {
    path: '/manuscript-viewer',
    name: 'ManuscriptViewer',
    component: ManuscriptViewer
  },
  {
    path: '/manuscript-text-understanding',
    name: 'TextUnderstanding',
    component: TextUnderstanding
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router