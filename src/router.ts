import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from './Layout.vue';
import Home from './Home.vue';
import ProductDetail from './ProductDetail.vue';
import Contact from './Contact.vue';

const scrollPositions = new Map();

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(savedPosition), 50);
      });
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        if (to.path === '/') {
          resolve({ top: scrollPositions.get('/') || 0, behavior: 'auto' });
        } else {
          resolve({ top: 0, behavior: 'auto' });
        }
      }, 50);
    });
  },
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '',            component: Home },
        { path: 'product/:id', name: 'Product', component: ProductDetail },
        { path: 'Contact',  component: Contact },
      ],
    },
  ],
});

// Save Home scroll position before leaving Home route
router.beforeEach((to, from) => {
  if (from.path === '/' && typeof window !== 'undefined') {
    scrollPositions.set('/', window.scrollY);
  }
  return true;
});

router.afterEach((to) => {
  if (to.path !== '/' && typeof window !== 'undefined') {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }
});

export default router;
