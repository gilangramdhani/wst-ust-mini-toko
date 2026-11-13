import { addProduct, calculateTotal } from "../src/cart.js";

const productsContainer = document.querySelector("#products");
const productStatus = document.querySelector("#product-status");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const totalLabel = document.querySelector("#total");
const clearCartButton = document.querySelector("#clear-cart");

let products = [];
let cart = [];

const rupiah = (value) => new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", maximumFractionDigits: 0,
}).format(value);

function renderProducts() {
  productsContainer.innerHTML = products.map((product) => `
    <article class="product-card">
      <div class="product-illustration">${product.icon}</div>
      <div class="product-tag">${product.tag}</div>
      <h3>${product.name}</h3>
      <p class="product-price">${rupiah(product.price)}</p>
      <button class="add-button" data-id="${product.id}" type="button">+ Tambah ke Keranjang</button>
    </article>
  `).join("");
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const product = products.find((item) => item.id === Number(button.dataset.id));
      if (product) {
        cart = addProduct(cart, product);
        renderCart();
      }
    });
  });
}

function renderCart() {
  cartCount.textContent = `${cart.reduce((count, item) => count + item.quantity, 0)} barang`;
  cartItems.innerHTML = cart.length
    ? cart.map((item) => `<div class="cart-line"><span>${item.name}<small>${item.quantity} × ${rupiah(item.price)}</small></span><strong>${rupiah(item.price * item.quantity)}</strong></div>`).join("")
    : "<p>Belum ada barang.</p>";
  totalLabel.textContent = rupiah(calculateTotal(cart));
}

async function loadProducts() {
  try {
    const response = await fetch("/api/barang");
    if (!response.ok) throw new Error(`Permintaan gagal dengan status ${response.status}`);
    products = await response.json();
    productStatus.textContent = `${products.length} produk tersedia`;
    renderProducts();
  } catch (error) {
    productStatus.textContent = "Gagal memuat produk";
    productsContainer.innerHTML = "<p>Produk belum dapat ditampilkan. Periksa hasil pemeriksaan browser.</p>";
    console.error("Gagal mengambil daftar produk:", error);
  }
}

clearCartButton.addEventListener("click", () => { cart = []; renderCart(); });
renderCart();
loadProducts();
