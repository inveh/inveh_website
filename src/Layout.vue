<script setup lang="ts">
import { computed, ref } from 'vue';
import { cart, isCartOpen } from './store/cart';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const cartTotal = computed(() => cart.reduce((total, item) => total + item.quantity, 0));

const showUserForm = ref(false);
const userName = ref('');
const userEmail = ref('');
const userPhone = ref('');

const openCart = () => {
  isCartOpen.value = true;
};
const closeCart = () => {
  isCartOpen.value = false;
  setTimeout(() => {
    showUserForm.value = false;
    userName.value = '';
    userEmail.value = '';
    userPhone.value = '';
  }, 300);
};

const proceedToDownload = () => {
  showUserForm.value = true;
};

const downloadPDF = () => {
  if (!userName.value) {
    alert("Please enter a name to generate the quote.");
    return;
  }
  if (!userEmail.value && !userPhone.value) {
    alert("Please provide at least one contact method (Email or Phone).");
    return;
  }

  const doc = new jsPDF();
  
  doc.setFontSize(22);
  doc.text('Inveh Lighting Solutions', 14, 22);
  
  doc.setFontSize(14);
  doc.text('Cart Quote Request', 14, 32);

  doc.setFontSize(11);
  doc.text(`Requested By: ${userName.value}`, 14, 42);
  
  let startYPos = 42;
  if (userEmail.value) {
    startYPos += 6;
    doc.text(`Email: ${userEmail.value}`, 14, startYPos);
  }
  if (userPhone.value) {
    startYPos += 6;
    doc.text(`Phone: ${userPhone.value}`, 14, startYPos);
  }

  const tableData = cart.map(item => [
    item.model_name,
    item.model_num,
    item.quantity.toString()
  ]);

  autoTable(doc, {
    startY: startYPos + 10,
    head: [['Model Name', 'SKU', 'Quantity']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [26, 26, 26] },
  });

  doc.save('Inveh-Lighting-Quote.pdf');
  closeCart();
};
</script>

<template>
  <div class="layout-wrapper">
    <!-- Announcement Bar -->
    <div class="announcement-bar">
      <span>Welcome to Inveh Lighting Solutions</span>
    </div>

    <!-- Main Header -->
    <header class="oorjaa-header">
      <div class="header-inner">
        <!-- Left: Brand image logo -->
        <div class="header-item left">
          <img class="header-logo-img" src="/inveh_logo.webp" alt="Inveh Logo" />
        </div>

        <!-- Center: Logo -->
        <div class="header-item center">
          <router-link to="/" class="brand-logo">INVEH</router-link>
        </div>

        <!-- Right: Cart -->
        <div class="header-item right">
          <div class="cart-icon-wrapper" @click="openCart">
            <svg class="icon cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span v-if="cartTotal > 0" class="cart-badge">{{ cartTotal }}</span>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="main-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/Contact">Contact</router-link>
      </nav>
    </header>

    <!-- Child route renders here -->
    <main class="main-content">
      <router-view />
    </main>
    
    <footer class="site-footer">
      <p>&copy; 2026 Inveh Lighting. All Rights Reserved.</p>
    </footer>

    <!-- Cart Drawer -->
    <div class="cart-overlay" :class="{ open: isCartOpen }" @click="closeCart"></div>
    <div class="cart-drawer" :class="{ open: isCartOpen }">
      <div class="cart-header">
        <h2>Your Cart</h2>
        <button class="close-btn" @click="closeCart">&times;</button>
      </div>
      
      <div class="cart-items" v-if="cart.length > 0 && !showUserForm">
        <div class="cart-item" v-for="(item, idx) in cart" :key="idx">
          <div class="item-info">
            <h4>{{ item.model_name }}</h4>
            <p>SKU: {{ item.model_num }}</p>
          </div>
          <div class="item-quantity">
            Qty: {{ item.quantity }}
          </div>
        </div>
      </div>
      
      <div class="cart-items form-container" v-else-if="cart.length > 0 && showUserForm">
        <h3 class="form-title">Contact Details</h3>
        <p class="form-desc">Please provide your Name and at least one contact method (Email or Phone).</p>
        
        <div class="form-group">
          <label>Name *</label>
          <input type="text" v-model="userName" placeholder="Your Name" required />
        </div>
        <div class="form-group">
          <label>Email * (or Phone)</label>
          <input type="email" v-model="userEmail" placeholder="Your Email" />
        </div>
        <div class="form-group">
          <label>Phone Number * (or Email)</label>
          <input type="tel" v-model="userPhone" placeholder="Your Phone Number" />
        </div>
      </div>
      <div class="empty-cart-msg" v-else>
        Your cart is currently empty.
      </div>
      
      <div class="cart-footer" v-if="cart.length > 0">
        <button class="checkout-btn" v-if="!showUserForm" @click="proceedToDownload">Proceed to Download</button>
        <button class="checkout-btn" v-else @click="downloadPDF">Generate PDF</button>
      </div>
    </div>
  </div>
</template>

<style>
/* Global imports for the target typography */
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600&display=swap');

body {
  margin: 0;
  padding: 0;
  color: #1a1a1a;
  background-color: #ffffff;
  font-family: 'Work Sans', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.announcement-bar {
  background-color: #f7f7f7;
  color: #1a1a1a;
  text-align: center;
  padding: 8px 15px;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.oorjaa-header {
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 20px;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 1000;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 40px 15px;
}

.header-item {
  flex: 1;
  display: flex;
  align-items: center;
}

.header-item.left {
  justify-content: flex-start;
}

.header-item.center {
  justify-content: center;
}

.header-item.right {
  justify-content: flex-end;
  gap: 24px;
}

.header-logo-img {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.brand-logo {
  font-size: 32px;
  font-weight: 300;
  letter-spacing: 0.25em;
  color: #1a1a1a;
  text-decoration: none;
  text-transform: uppercase;
}

.icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: #1a1a1a;
  transition: opacity 0.2s ease;
}

.icon:hover {
  opacity: 0.6;
}

.cart-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #1a1a1a;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.main-nav {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 5px;
}

.main-nav a {
  /* Exactly mimicking Oorjaa's font-size and color */
  color: #1a1a1a;
  font-size: 14px;
  text-decoration: none;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color 0.2s ease;
  position: relative;
}

.main-nav a::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: -4px;
  left: 0;
  background-color: #1a1a1a;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease-out;
}

.main-nav a:hover::after,
.main-nav a.router-link-exact-active::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.main-content {
  flex: 1;
  padding: 0;
}

.site-footer {
  text-align: center;
  padding: 40px 20px;
  font-size: 12px;
  color: #888;
  border-top: 1px solid #eaeaea;
  margin-top: auto;
}

/* Cart Drawer */
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.cart-overlay.open {
  opacity: 1;
  pointer-events: auto;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: #fff;
  z-index: 2001;
  box-shadow: -2px 0 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  transition: right 0.3s ease;
  max-width: 100vw;
}
.cart-drawer.open {
  right: 0;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eaeaea;
}
.cart-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
}
.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  color: #333;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f2f2f2;
}
.item-info h4 {
  margin: 0 0 5px 0;
  font-weight: 500;
  font-size: 1rem;
}
.item-info p {
  margin: 0;
  font-size: 0.85rem;
  color: #666;
}
.item-quantity {
  font-weight: 500;
}
.empty-cart-msg {
  padding: 20px;
  color: #666;
  text-align: center;
  margin-top: 2rem;
}

.cart-footer {
  padding: 20px;
  border-top: 1px solid #eaeaea;
}
.checkout-btn {
  width: 100%;
  background: #1a1a1a;
  color: #fff;
  border: none;
  padding: 15px;
  font-size: 1rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.checkout-btn:hover {
  background: #333;
}

.form-container {
  padding: 20px;
}
.form-title {
  margin: 0 0 5px;
  font-weight: 500;
  font-size: 1.1rem;
}
.form-desc {
  margin: 0 0 20px;
  font-size: 0.85rem;
  color: #666;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  font-size: 0.85rem;
  margin-bottom: 5px;
  color: #1a1a1a;
  font-weight: 500;
}
.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  font-family: inherit;
  font-size: 0.9rem;
}
.form-group input:focus {
  outline: none;
  border-color: #1a1a1a;
}
</style>
