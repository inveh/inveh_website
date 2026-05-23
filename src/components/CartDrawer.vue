<script setup lang="ts">
import { ref } from 'vue';
import { cart, isCartOpen, type CartItem, clearCart } from '../store/cart';

const showUserForm = ref(false);
const userName = ref('');
const userEmail = ref('');
const userPhone = ref('');

const closeCart = () => {
  isCartOpen.value = false;
  setTimeout(() => {
    showUserForm.value = false;
    userName.value = '';
    userEmail.value = '';
    userPhone.value = '';
  }, 300);
};

const getItemTotal = (item: CartItem) => {
  if (!item.model_price || item.model_price <= 0) return 'N/A';
  const price = item.model_price - (item.discount || 0);
  return `Rs. ${price * item.quantity}`;
};

const proceedToCheckout = () => {
  showUserForm.value = true;
};

const handleClearAll = () => {
  if (confirm('Are you sure you want to clear all items from your cart?')) {
    clearCart();
  }
};

const submitOrderViaWhatsApp = () => {
  if (!userName.value) {
    alert("Please enter your name to submit the order.");
    return;
  }
  if (!userEmail.value && !userPhone.value) {
    alert("Please provide at least one contact method (Email or Phone).");
    return;
  }

  let grandTotal = 0;
  let grandTotalQty = 0;

  const itemsDetails = cart.map((item) => {
    const finalPrice = item.model_price > 0 ? item.model_price - (item.discount || 0) : 0;
    const lineTotal = finalPrice * item.quantity;
    grandTotal += lineTotal;
    grandTotalQty += item.quantity;
    
    const priceText = item.model_price > 0 && finalPrice > 0 ? `Rs. ${finalPrice}` : 'N/A';
    const totalText = item.model_price > 0 && finalPrice > 0 ? `Rs. ${lineTotal}` : 'N/A';
    
    return `• *${item.model_name}*\n  SKU: ${item.model_num}\n  Qty: ${item.quantity} | Price: ${priceText} | Total: ${totalText}`;
  }).join('\n\n');

  // Build the elegant WhatsApp message
  let message = `*INVEH LIGHTING SOLUTIONS - NEW ORDER REQUEST*\n\n`;
  message += `*Customer Details:*\n`;
  message += `• *Name:* ${userName.value}\n`;
  if (userEmail.value) {
    message += `• *Email:* ${userEmail.value}\n`;
  }
  if (userPhone.value) {
    message += `• *Phone:* ${userPhone.value}\n`;
  }
  message += `\n*Order Items:*\n${itemsDetails}\n\n`;
  message += `*Total Quantity:* ${grandTotalQty}\n`;
  message += `*Grand Total:* Rs. ${grandTotal}\n\n`;
  message += `Please confirm my order. Thank you!`;

  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/919487741183?text=${encodedText}`;

  // Open WhatsApp in a new tab
  window.open(whatsappUrl, '_blank');

  // Clear cart and close drawer
  clearCart();
  closeCart();
};
</script>

<template>
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
        <div class="item-meta">
          <span class="item-quantity">Qty: {{ item.quantity }}</span>
          <div class="drawer-price-info">
            <span v-if="item.discount > 0 && item.model_price > 0" class="original-price">Rs. {{ item.model_price }}</span>
            <span class="item-price">{{ getItemTotal(item) }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="cart-items form-container" v-else-if="cart.length > 0 && showUserForm">
      <h3 class="form-title">Contact Details</h3>
      <p class="form-desc">Please provide your Name and at least one contact method (Email or Phone) to submit your order via WhatsApp.</p>
      
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
      <button class="checkout-btn" v-if="!showUserForm" @click="proceedToCheckout">Proceed to Checkout</button>
      <button class="checkout-btn" v-else @click="submitOrderViaWhatsApp">Submit Order via WhatsApp</button>
      <button class="clear-btn" v-if="!showUserForm" @click="handleClearAll">Clear All</button>
    </div>
  </div>
</template>

<style scoped>
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
.item-meta {
  display: flex;
  align-items: center;
  gap: 15px;
}
.item-quantity {
  font-weight: 500;
}
.drawer-price-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.85em;
}
.item-price {
  font-weight: 600;
  color: #1a1a1a;
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

.clear-btn {
  width: 100%;
  background: #f2f2f2;
  color: #1a1a1a;
  border: 1px solid #ddd;
  padding: 15px;
  font-size: 1rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 10px;
}
.clear-btn:hover {
  background: #e8e8e8;
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
