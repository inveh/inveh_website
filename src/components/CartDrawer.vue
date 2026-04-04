<script setup lang="ts">
import { ref } from 'vue';
import { cart, isCartOpen, type CartItem } from '../store/cart';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  return `Rs. ${item.model_price * item.quantity}`;
};

const formatPrice = (price: number) => {
  if (!price || price <= 0) return 'N/A';
  return `Rs. ${price}`;
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

  let grandTotal = 0;
  let grandTotalQty = 0;

  const tableData = cart.map((item) => {
    const lineTotal = (item.model_price || 0) * item.quantity;
    grandTotal += lineTotal;
    grandTotalQty += item.quantity;
    
    return [
      item.model_name,
      item.model_num,
      item.quantity.toString(),
      item.model_price && item.model_price > 0 ? `Rs. ${item.model_price}` : 'N/A',
      item.model_price && item.model_price > 0 ? `Rs. ${lineTotal}` : 'N/A'
    ];
  });

  autoTable(doc, {
    startY: startYPos + 10,
    head: [['Model Name', 'SKU', 'Quantity', 'Price', 'Total']],
    body: tableData,
    foot: [[
      { content: 'Grand Total', colSpan: 2, styles: { halign: 'right', fontStyle: 'bold' } },
      grandTotalQty.toString(),
      '',
      `Rs. ${grandTotal}`
    ]],
    theme: 'striped',
    headStyles: { fillColor: [26, 26, 26] },
    footStyles: { fillColor: [240, 240, 240], textColor: [26, 26, 26] },
  });

  doc.save('Inveh-Lighting-Quote.pdf');
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
          <span class="item-price">{{ getItemTotal(item) }}</span>
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
