import NewPublisherPage from '@/pages/NewPublisherPage.vue'
import PublisherPage from '@/pages/PublisherPage.vue'

export const mainRoutes = [
  {
      path: '/publisher/:id',
      component: PublisherPage,
      name: 'Publisher Page',
  },
  {
    path: '/publisher',
    component: NewPublisherPage,
    name: 'New Publisher Page',
  }
]
