import { createRouter, createWebHistory } from 'vue-router';
import Layout from './Layout.vue';
import Home from './Home.vue';
import ProductDetail from './ProductDetail.vue';
import Contact from './Contact.vue';

const scrollPositions = new Map();

const router = createRouter({
  history: createWebHistory(),
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
        {
          path: '',
          name: 'Home',
          component: Home,
          meta: {
            title: 'Inveh Lighting Solutions – Handcrafted Wooden LED Lamps | Udumalpet, India',
            description: 'Inveh Lighting Solutions crafts premium handmade wooden LED pendant lamps, tube lights, and personalised gifts. Shop unique eco-friendly lighting for homes and offices. Based in Udumalpet, Tamil Nadu, India.'
          }
        },
        {
          path: 'product/:id',
          name: 'Product',
          component: ProductDetail,
          // Title is set dynamically in ProductDetail.vue using the product name
        },
        {
          path: 'Contact',
          name: 'Contact',
          component: Contact,
          meta: {
            title: 'Contact Us – Inveh Lighting Solutions | Udumalpet, Tamil Nadu',
            description: 'Get in touch with Inveh Lighting Solutions. Reach us by email at info@inveh.in or call +91 94877 41183. Based in Udumalpet, Tamil Nadu, India.'
          }
        },
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
