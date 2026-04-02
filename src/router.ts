import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from './Layout.vue';
import Home from './Home.vue';
import ProductDetail from './ProductDetail.vue';
import Contact from './Contact.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Layout,       // parent route — renders banner + nav + <router-view />
      children: [
        { path: '',            component: Home },        // /
        { path: 'product/:id', name: 'Product', component: ProductDetail }, // /product/:id
        { path: 'Contact',  component: Contact },  // /Contact
      ],
    },
  ],
});

export default router;
