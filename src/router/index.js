import { createRouter, createWebHistory } from 'vue-router';
import WorkThumbnail from '@/components/WorkThumbnail.vue';
import WorkPage from '@/components/WorkPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: WorkThumbnail
  },
  {
    path: '/work/:id',
    name: 'WorkPage',
    component: WorkPage,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
