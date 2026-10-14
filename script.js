/* ============================================
   LokalPreneur - UMKM Marketplace Script
   Fitur: Admin, Rating, Komentar
   ============================================ */

const DEFAULT_PRODUCTS = [
  { id: 1, name: "Keripik Singkong Original", category: "makanan", price: 25000, icon: "fa-cookie-bite", badge: "Best Seller", desc: "Keripik singkong renyah khas Jawa Tengah. Dibuat dari singkong pilihan tanpa pengawet.", variants: [{ name: "Rasa", options: ["Original", "Pedas", "Balado", "Keju"] }, { name: "Ukuran Pack", options: ["100g", "250g", "500g"] }] },
  { id: 2, name: "Tas Anyaman Pandan", category: "kerajinan", price: 85000, icon: "fa-shopping-bag", badge: "Handmade", desc: "Tas anyaman pandan asli dari pengrajin Lombok. Kuat, stylish, dan ramah lingkungan.", variants: [{ name: "Warna", options: ["Natural", "Coklat", "Hitam"] }] },
  { id: 3, name: "Batik Tulis Solo", category: "fashion", price: 350000, icon: "fa-shirt", badge: "Premium", desc: "Kain batik tulis asli Solo dengan motif klasik. Setiap helai dikerjakan secara manual.", variants: [{ name: "Ukuran", options: ["S", "M", "L", "XL", "XXL"] }, { name: "Motif", options: ["Parang", "Kawung", "Truntum"] }] },
  { id: 4, name: "Sabun Herbal Daun Sirih", category: "kecantikan", price: 32000, icon: "fa-spa", badge: "Natural", desc: "Sabun herbal alami dari daun sirih dan minyak kelapa. Cocok untuk kulit sensitif.", variants: [{ name: "Isi", options: ["1 pcs", "3 pcs", "5 pcs"] }] },
  { id: 5, name: "Kopi Arabika Gayo", category: "makanan", price: 75000, icon: "fa-mug-hot", badge: "Premium", desc: "Kopi arabika Gayo single origin. Rasa fruity dengan aroma yang kuat dan lasting.", variants: [{ name: "Bentuk", options: ["Biji", "Bubuk"] }, { name: "Berat", options: ["100g", "250g", "500g", "1kg"] }] },
  { id: 6, name: "Kalung Manik Kayu", category: "fashion", price: 45000, icon: "fa-gem", badge: null, desc: "Kalung manik kayu jati dengan sentuhan modern. Ringan dan nyaman dipakai sehari-hari.", variants: [{ name: "Panjang", options: ["40cm", "50cm", "60cm"] }] },
  { id: 7, name: "Madu Hutan Asli", category: "makanan", price: 120000, icon: "fa-jar", badge: "Organik", desc: "Madu hutan murni dari lebah liar Kalimantan. Tanpa campuran gula atau bahan kimia.", variants: [{ name: "Ukuran", options: ["250ml", "500ml", "1 Liter"] }] },
  { id: 8, name: "Topi Rajut Tradisional", category: "fashion", price: 55000, icon: "fa-hat-cowboy", badge: null, desc: "Topi rajut handmade dari benang lokal. Hangat dan cocok untuk segala cuaca.", variants: [{ name: "Ukuran", options: ["Anak", "Dewasa"] }, { name: "Warna", options: ["Hitam", "Abu", "Coklat", "Merah"] }] },
  { id: 9, name: "Minyak Atsiri Serai", category: "kecantikan", price: 65000, icon: "fa-leaf", badge: "Aromaterapi", desc: "Minyak atsiri serai murni untuk aromaterapi dan perawatan kulit. 100% natural.", variants: [{ name: "Ukuran", options: ["10ml", "30ml", "50ml"] }] },
  { id: 10, name: "Pupuk Organik Cair", category: "pertanian", price: 40000, icon: "fa-seedling", badge: "Eco", desc: "Pupuk organik cair untuk tanaman hias dan sayur. Meningkatkan pertumbuhan secara alami.", variants: [{ name: "Volume", options: ["500ml", "1 Liter", "5 Liter"] }] },
  { id: 11, name: "Sambal Pecel Instant", category: "makanan", price: 18000, icon: "fa-bowl-food", badge: "Best Seller", desc: "Bumbu pecel siap saji dari resep turun-temurun. Pedas manis yang bikin nagih.", variants: [{ name: "Level Pedas", options: ["Tidak Pedas", "Sedang", "Pedas", "Extra Pedas"] }, { name: "Isi", options: ["1 bungkus", "3 bungkus", "5 bungkus"] }] },
  { id: 12, name: "Vas Keramik Lukis", category: "kerajinan", price: 175000, icon: "fa-vase", badge: "Handmade", desc: "Vas keramik lukis tangan motif flora nusantara. Cocok untuk dekorasi rumah modern.", variants: [{ name: "Ukuran", options: ["Kecil", "Sedang", "Besar"] }] }
];

const testimonials = [
  { name: "Siti Aminah", role: "Pelanggan", text: "Produknya bagus banget! Keripik singkongnya renyah dan pengiriman cepat.", initial: "S", rating: 5 },
  { name: "Budi Santoso", role: "Mitra UMKM", text: "Sejak gabung LokalPreneur, omzet toko saya naik signifikan.", initial: "B", rating: 5 },
  { name: "Rina Wulandari", role: "Pelanggan", text: "Tas anyaman pandannya cantik dan kuat. Recommended!", initial: "R", rating: 5 },
  { name: "Ahmad Fauzi", role: "Mitra UMKM", text: "Support tim LokalPreneur sangat membantu dari listing sampai marketing.", initial: "A", rating: 4 },
  { name: "Dewi Lestari", role: "Pelanggan", text: "Batik tulis Solo yang saya beli kualitasnya premium!", initial: "D", rating: 5 }
];

const faqs = [
  { q: "Bagaimana cara memesan produk?", a: "Pilih produk, klik 'Tambah ke Keranjang', buka keranjang lalu Checkout." },
  { q: "Apakah pengiriman tersedia ke seluruh Indonesia?", a: "Ya, kami bekerja sama dengan berbagai jasa kurir ke seluruh Indonesia." },
  { q: "Bagaimana cara menjadi mitra UMKM?", a: "Hubungi kami melalui form kontak. Tim akan bantu verifikasi dan onboarding." },
  { q: "Apakah produk dijamin original?", a: "Semua produk berasal dari pelaku UMKM yang telah diverifikasi." },
  { q: "Bagaimana sistem pembayarannya?", a: "Transfer bank, e-wallet (OVO, GoPay, Dana, ShopeePay), dan COD area tertentu." }
];

// Admin credentials
const ADMIN_USER = "admin";
const ADMIN_PASS = "200921";

// Varian default per kategori (otomatis jika admin tidak isi)
const CATEGORY_DEFAULT_VARIANTS = {
  fashion: [
    { name: "Ukuran", options: ["S", "M", "L", "XL", "XXL"] },
    { name: "Warna", options: ["Hitam", "Putih", "Navy", "Coklat", "Abu-abu"] }
  ],
  makanan: [
    { name: "Rasa", options: ["Original", "Pedas", "Manis", "Asin"] },
    { name: "Ukuran Pack", options: ["Kecil", "Sedang", "Besar"] }
  ],
  kecantikan: [
    { name: "Ukuran", options: ["Travel Size", "Regular", "Family Size"] },
    { name: "Varian", options: ["Normal", "Sensitif", "Kering", "Berminyak"] }
  ],
  kerajinan: [
    { name: "Ukuran", options: ["Kecil", "Sedang", "Besar"] },
    { name: "Warna", options: ["Natural", "Coklat", "Hitam", "Custom"] }
  ],
  pertanian: [
    { name: "Volume", options: ["250ml", "500ml", "1 Liter", "5 Liter"] },
    { name: "Kemasan", options: ["Botol", "Jerigen", "Paket"] }
  ]
};

function getProductVariants(product) {
  if (product.variants && product.variants.length > 0) return product.variants;
  return CATEGORY_DEFAULT_VARIANTS[product.category] || [];
}

// State
let products = JSON.parse(localStorage.getItem("lp_products"));
if (!products || !products.length) {
  products = [...DEFAULT_PRODUCTS];
  localStorage.setItem("lp_products", JSON.stringify(products));
} else {
  // pastikan field variants ada
  products = products.map(p => ({ ...p, variants: p.variants || [] }));
}
let cart = JSON.parse(localStorage.getItem("lp_cart")) || [];
let reviews = JSON.parse(localStorage.getItem("lp_reviews")) || {};
let orders = JSON.parse(localStorage.getItem("lp_orders")) || [];
let currentTheme = localStorage.getItem("lp_theme") || "light";
let isAdmin = sessionStorage.getItem("lp_admin") === "true";
let selectedRating = 0;
let currentModalProductId = null;
let pendingVariantProduct = null;
let selectedVariants = {};

// DOM
const $ = (id) => document.getElementById(id);
const productsGrid = $("productsGrid");
const searchInput = $("searchInput");
const categoryFilter = $("categoryFilter");
const priceFilter = $("priceFilter");
const cartBtn = $("cartBtn");
const closeCart = $("closeCart");
const cartSidebar = $("cartSidebar");
const overlay = $("overlay");
const cartItems = $("cartItems");
const cartCount = $("cartCount");
const cartTotal = $("cartTotal");
const checkoutBtn = $("checkoutBtn");
const productModal = $("productModal");
const closeModal = $("closeModal");
const modalBody = $("modalBody");
const themeToggle = $("themeToggle");
const menuToggle = $("menuToggle");
const navLinks = $("navLinks");
const toast = $("toast");
const toastMessage = $("toastMessage");
const backToTop = $("backToTop");
const contactForm = $("contactForm");
const testimonialSlider = $("testimonialSlider");
const faqList = $("faqList");
const adminBtn = $("adminBtn");
const adminLoginModal = $("adminLoginModal");
const adminPanelModal = $("adminPanelModal");
const closeAdminLogin = $("closeAdminLogin");
const closeAdminPanel = $("closeAdminPanel");
const adminLoginForm = $("adminLoginForm");
const adminLogoutBtn = $("adminLogoutBtn");
const productForm = $("productForm");
const cancelEditBtn = $("cancelEditBtn");
const adminProductList = $("adminProductList");

// Utils
function formatRupiah(num) {
  return "Rp " + Number(num).toLocaleString("id-ID");
}

function showToast(msg, isError = false) {
  toastMessage.textContent = msg;
  toast.classList.toggle("error", isError);
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

function saveProducts() {
  localStorage.setItem("lp_products", JSON.stringify(products));
}

function saveCart() {
  localStorage.setItem("lp_cart", JSON.stringify(cart));
  updateCartUI();
}

function saveReviews() {
  localStorage.setItem("lp_reviews", JSON.stringify(reviews));
}

function getReviews(productId) {
  return reviews[productId] || [];
}

function getAvgRating(productId) {
  const list = getReviews(productId);
  if (!list.length) return 0;
  return list.reduce((s, r) => s + r.rating, 0) / list.length;
}

function starsHTML(rating, max = 5) {
  let html = "";
  for (let i = 1; i <= max; i++) {
    html += i <= Math.round(rating) ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
  }
  return html;
}

// Render Products
function renderProducts(list = products) {
  if (!list.length) {
    productsGrid.innerHTML = '<div class="no-products"><i class="fas fa-search" style="font-size:2.5rem;opacity:0.4;display:block;margin-bottom:1rem"></i>Tidak ada produk ditemukan</div>';
    return;
  }
  productsGrid.innerHTML = list.map((p) => {
    const avg = getAvgRating(p.id);
    const count = getReviews(p.id).length;
    return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img">
        <i class="fas ${p.icon}"></i>
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <h3 class="product-title">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-rating-preview">
          <span class="stars">${starsHTML(avg)}</span>
          <span class="count">(${count})</span>
        </div>
        ${(getProductVariants(p).length) ? '<div class="product-has-variant"><i class="fas fa-tags"></i> Pilih varian saat beli</div>' : ""}
        <div class="product-price">${formatRupiah(p.price)}</div>
        <div class="product-actions">
          <button class="btn-sm btn-cart" onclick="addToCart(${p.id})"><i class="fas fa-cart-plus"></i> Keranjang</button>
          <button class="btn-sm btn-detail" onclick="openModal(${p.id})"><i class="fas fa-eye"></i></button>
        </div>
      </div>
    </div>`;
  }).join("");
}

function filterProducts() {
  const search = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  const priceRange = priceFilter.value;
  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search) || p.category.toLowerCase().includes(search);
    const matchCategory = category === "all" || p.category === category;
    let matchPrice = true;
    if (priceRange === "0-50000") matchPrice = p.price < 50000;
    else if (priceRange === "50000-150000") matchPrice = p.price >= 50000 && p.price <= 150000;
    else if (priceRange === "150000-500000") matchPrice = p.price > 150000 && p.price <= 500000;
    else if (priceRange === "500000+") matchPrice = p.price > 500000;
    return matchSearch && matchCategory && matchPrice;
  });
  renderProducts(filtered);
}

// Cart
function addToCart(id, chosenVariants = null, qty = 1) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  // Selalu minta pilih varian (dari produk atau default kategori)
  const vars = getProductVariants(product);
  if (vars.length > 0 && !chosenVariants) {
    openVariantModal(product);
    return;
  }

  const variantKey = chosenVariants
    ? Object.entries(chosenVariants).map(([k, v]) => `${k}:${v}`).join("|")
    : "";

  const existing = cart.find((i) => i.id === id && (i.variantKey || "") === variantKey);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      ...product,
      qty,
      chosenVariants: chosenVariants || null,
      variantKey,
      variantLabel: chosenVariants
        ? Object.entries(chosenVariants).map(([k, v]) => `${k}: ${v}`).join(", ")
        : ""
    });
  }
  saveCart();
  const label = chosenVariants
    ? `${product.name} (${Object.values(chosenVariants).join(", ")})`
    : product.name;
  showToast(`${label} ditambahkan ke keranjang!`);
}

function parseVariantsText(text) {
  if (!text || !text.trim()) return [];
  return text.trim().split("\n").map(line => {
    line = line.trim();
    if (!line) return null;
    const idx = line.indexOf(":");
    if (idx === -1) return null;
    const name = line.slice(0, idx).trim();
    const options = line.slice(idx + 1).split(",").map(o => o.trim()).filter(Boolean);
    if (!name || !options.length) return null;
    return { name, options };
  }).filter(Boolean);
}

function variantsToText(variants) {
  if (!variants || !variants.length) return "";
  return variants.map(v => `${v.name}: ${v.options.join(", ")}`).join("\n");
}

function openVariantModal(product) {
  pendingVariantProduct = product;
  selectedVariants = {};
  $("variantProductName").textContent = product.name;
  const container = $("variantOptions");
  const variantList = getProductVariants(product);
  container.innerHTML = variantList.map((g, gi) => `
    <div class="variant-group" data-group="${escapeHtml(g.name)}">
      <label>${escapeHtml(g.name)}</label>
      <div class="variant-options">
        ${g.options.map((opt, oi) => `
          <button type="button" class="variant-opt" data-group="${escapeHtml(g.name)}" data-opt="${escapeHtml(opt)}"
            onclick="selectVariant(this, '${escapeHtml(g.name).replace(/'/g, "\\'")}', '${escapeHtml(opt).replace(/'/g, "\\'")}')">${escapeHtml(opt)}</button>
        `).join("")}
      </div>
    </div>
  `).join("");
  $("variantQty").value = 1;
  $("variantModal").classList.add("show");
  document.body.style.overflow = "hidden";
}

function selectVariant(btn, group, opt) {
  selectedVariants[group] = opt;
  // highlight
  btn.closest(".variant-options").querySelectorAll(".variant-opt").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}

function closeVariantModal() {
  $("variantModal").classList.remove("show");
  document.body.style.overflow = "";
  pendingVariantProduct = null;
  selectedVariants = {};
}

function confirmVariantAdd() {
  if (!pendingVariantProduct) return;
  const groups = getProductVariants(pendingVariantProduct);
  for (const g of groups) {
    if (!selectedVariants[g.name]) {
      showToast(`Pilih ${g.name} terlebih dahulu!`, true);
      return;
    }
  }
  const qty = Math.max(1, Math.min(99, +$("variantQty").value || 1));
  addToCart(pendingVariantProduct.id, { ...selectedVariants }, qty);
  closeVariantModal();
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  showToast("Produk dihapus dari keranjang");
}

function removeFromCartByIndex(idx) {
  cart.splice(idx, 1);
  saveCart();
  showToast("Produk dihapus dari keranjang");
}

function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  saveCart();
}

function changeQtyByIndex(idx, delta) {
  if (!cart[idx]) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) { removeFromCartByIndex(idx); return; }
  saveCart();
}

function updateCartUI() {
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  cartCount.textContent = totalItems;
  if (!cart.length) {
    cartItems.innerHTML = '<div class="cart-empty"><i class="fas fa-shopping-basket"></i><p>Keranjang masih kosong</p></div>';
    cartTotal.textContent = "Rp 0";
    return;
  }
  cartItems.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-img"><i class="fas ${item.icon}"></i></div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        ${item.variantLabel ? `<div class="cart-item-variant">${item.variantLabel}</div>` : ""}
        <div class="price">${formatRupiah(item.price)}</div>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="changeQtyByIndex(${idx},-1)">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" onclick="changeQtyByIndex(${idx},1)">+</button>
          <button class="remove-btn" onclick="removeFromCartByIndex(${idx})"><i class="fas fa-trash-alt"></i></button>
        </div>
      </div>
    </div>`).join("");
  cartTotal.textContent = formatRupiah(cart.reduce((s, i) => s + i.price * i.qty, 0));
}

function openCart() {
  cartSidebar.classList.add("open");
  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeCartSidebar() {
  cartSidebar.classList.remove("open");
  overlay.classList.remove("show");
  document.body.style.overflow = "";
}

// Modal Product + Rating + Comments
function openModal(id) {
  const p = products.find((item) => item.id === id);
  if (!p) return;
  currentModalProductId = id;
  selectedRating = 0;
  const avg = getAvgRating(id);
  const list = getReviews(id);

  modalBody.innerHTML = `
    <div class="modal-img"><i class="fas ${p.icon}"></i></div>
    <div class="modal-info">
      <div class="category">${p.category}</div>
      <h2>${p.name}</h2>
      <div class="price">${formatRupiah(p.price)}</div>
      <p>${p.desc}</p>
      <button class="btn btn-primary" onclick="addToCart(${p.id}); closeProductModal();">
        <i class="fas fa-cart-plus"></i> Tambah ke Keranjang
      </button>
    </div>
    <div class="rating-section" style="padding:0 2rem 2rem;width:100%">
      <h3 style="margin-bottom:1rem"><i class="fas fa-star" style="color:var(--secondary)"></i> Rating & Ulasan</h3>
      <div class="rating-summary">
        <span class="avg-rating">${avg ? avg.toFixed(1) : "–"}</span>
        <span class="avg-stars">${starsHTML(avg)}</span>
        <span class="rating-count">${list.length} ulasan</span>
      </div>

      <div class="comment-form">
        <h4 style="margin-bottom:0.8rem">Tulis Ulasan</h4>
        <div class="star-input" id="starInput">
          <i class="far fa-star" data-val="1"></i>
          <i class="far fa-star" data-val="2"></i>
          <i class="far fa-star" data-val="3"></i>
          <i class="far fa-star" data-val="4"></i>
          <i class="far fa-star" data-val="5"></i>
        </div>
        <div class="form-group">
          <input type="text" id="reviewerName" placeholder="Nama Anda" />
        </div>
        <div class="form-group">
          <textarea id="reviewText" rows="2" placeholder="Tulis komentar Anda..."></textarea>
        </div>
        <button class="btn btn-primary btn-sm" onclick="submitReview()">
          <i class="fas fa-paper-plane"></i> Kirim Ulasan
        </button>
      </div>

      <div class="comments-list" id="commentsList">
        ${list.length === 0
          ? '<div class="no-comments">Belum ada ulasan. Jadilah yang pertama!</div>'
          : list.slice().reverse().map((r) => `
            <div class="comment-item">
              <div class="comment-header">
                <span class="comment-author">${escapeHtml(r.name)}</span>
                <span class="comment-stars">${starsHTML(r.rating)}</span>
              </div>
              <div class="comment-date">${r.date}</div>
              <div class="comment-text">${escapeHtml(r.text)}</div>
            </div>`).join("")}
      </div>
    </div>`;

  // Star input events
  document.querySelectorAll("#starInput i").forEach((star) => {
    star.addEventListener("click", () => {
      selectedRating = +star.dataset.val;
      document.querySelectorAll("#starInput i").forEach((s) => {
        const v = +s.dataset.val;
        s.className = v <= selectedRating ? "fas fa-star active" : "far fa-star";
      });
    });
  });

  productModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function submitReview() {
  if (!currentModalProductId) return;
  const name = ($("reviewerName")?.value || "").trim();
  const text = ($("reviewText")?.value || "").trim();
  if (!selectedRating) { showToast("Pilih rating bintang dulu!", true); return; }
  if (!name) { showToast("Masukkan nama Anda!", true); return; }
  if (!text) { showToast("Tulis komentar Anda!", true); return; }

  if (!reviews[currentModalProductId]) reviews[currentModalProductId] = [];
  reviews[currentModalProductId].push({
    name,
    text,
    rating: selectedRating,
    date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
  });
  saveReviews();
  showToast("Ulasan berhasil dikirim! Terima kasih.");
  openModal(currentModalProductId);
  renderProducts();
  filterProducts();
}

function closeProductModal() {
  productModal.classList.remove("show");
  document.body.style.overflow = "";
  currentModalProductId = null;
}

// Theme
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.querySelector("i").className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  localStorage.setItem("lp_theme", theme);
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(currentTheme);
}

// Testimonials & FAQ
function renderTestimonials() {
  testimonialSlider.innerHTML = testimonials.map((t) => `
    <div class="testimonial-card">
      <div class="stars">${starsHTML(t.rating)}</div>
      <p>"${t.text}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.initial}</div>
        <div class="author-info"><h4>${t.name}</h4><span>${t.role}</span></div>
      </div>
    </div>`).join("");
}

function renderFAQ() {
  faqList.innerHTML = faqs.map((f, i) => `
    <div class="faq-item" data-index="${i}">
      <div class="faq-question"><span>${f.q}</span><i class="fas fa-chevron-down"></i></div>
      <div class="faq-answer">${f.a}</div>
    </div>`).join("");
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      const was = item.classList.contains("active");
      document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("active"));
      if (!was) item.classList.add("active");
    });
  });
}

// Counters
function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const step = target / (1800 / 16);
      let cur = 0;
      const update = () => {
        cur += step;
        if (cur < target) { el.textContent = Math.floor(cur).toLocaleString("id-ID"); requestAnimationFrame(update); }
        else el.textContent = target.toLocaleString("id-ID");
      };
      update();
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => observer.observe(c));
}

// ========== ADMIN ==========
function openAdminLogin() {
  if (isAdmin) {
    openAdminPanel();
    return;
  }
  adminLoginModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeAdminLoginModal() {
  adminLoginModal.classList.remove("show");
  document.body.style.overflow = "";
}

function openAdminPanel() {
  adminLoginModal.classList.remove("show");
  adminPanelModal.classList.add("show");
  document.body.style.overflow = "hidden";
  renderAdminProductList();
  resetProductForm();
}

function closeAdminPanelModal() {
  adminPanelModal.classList.remove("show");
  document.body.style.overflow = "";
}

function handleAdminLogin(e) {
  e.preventDefault();
  const user = $("adminUsername").value.trim();
  const pass = $("adminPassword").value;
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    isAdmin = true;
    sessionStorage.setItem("lp_admin", "true");
    showToast("Login berhasil! Selamat datang, Admin.");
    $("adminUsername").value = "";
    $("adminPassword").value = "";
    openAdminPanel();
  } else {
    showToast("Username atau password salah!", true);
  }
}

function handleAdminLogout() {
  isAdmin = false;
  sessionStorage.removeItem("lp_admin");
  closeAdminPanelModal();
  showToast("Anda telah logout.");
}

function switchAdminTab(tabName) {
  document.querySelectorAll(".admin-tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === tabName));
  document.querySelectorAll(".admin-tab-content").forEach((c) => c.classList.remove("active"));
  const tabMap = { add: "tabAdd", list: "tabList", orders: "tabOrders" };
  $(tabMap[tabName] || "tabAdd").classList.add("active");
  if (tabName === "list") renderAdminProductList();
  if (tabName === "orders") renderAdminOrders();
}

function resetProductForm() {
  productForm.reset();
  $("editProductId").value = "";
  $("saveBtnText").textContent = "Tambah Produk";
  cancelEditBtn.style.display = "none";
}

function handleProductForm(e) {
  e.preventDefault();
  if (!isAdmin) { showToast("Akses ditolak!", true); return; }

  const name = $("prodName").value.trim();
  const category = $("prodCategory").value;
  const price = +$("prodPrice").value;
  const badge = $("prodBadge").value.trim() || null;
  const icon = $("prodIcon").value;
  const desc = $("prodDesc").value.trim();
  const variants = parseVariantsText($("prodVariants") ? $("prodVariants").value : "");
  const editId = $("editProductId").value;

  if (!name || !desc || price < 1000) {
    showToast("Lengkapi data produk dengan benar!", true);
    return;
  }

  if (editId) {
    const idx = products.findIndex((p) => p.id === +editId);
    if (idx !== -1) {
      products[idx] = { ...products[idx], name, category, price, badge, icon, desc, variants };
      showToast("Produk berhasil diperbarui!");
    }
  } else {
    const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    products.push({ id: newId, name, category, price, badge, icon, desc, variants });
    showToast("Produk berhasil ditambahkan!");
  }

  saveProducts();
  renderProducts();
  filterProducts();
  resetProductForm();
  switchAdminTab("list");
}

function editProduct(id) {
  const p = products.find((item) => item.id === id);
  if (!p) return;
  $("editProductId").value = p.id;
  $("prodName").value = p.name;
  $("prodCategory").value = p.category;
  $("prodPrice").value = p.price;
  $("prodBadge").value = p.badge || "";
  $("prodIcon").value = p.icon;
  $("prodDesc").value = p.desc;
  if ($("prodVariants")) $("prodVariants").value = variantsToText(p.variants);
  $("saveBtnText").textContent = "Simpan Perubahan";
  cancelEditBtn.style.display = "inline-flex";
  switchAdminTab("add");
}

function deleteProduct(id) {
  if (!confirm("Yakin ingin menghapus produk ini?")) return;
  products = products.filter((p) => p.id !== id);
  saveProducts();
  // Hapus juga dari cart jika ada
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  renderProducts();
  filterProducts();
  renderAdminProductList();
  showToast("Produk berhasil dihapus.");
}

function renderAdminProductList() {
  if (!products.length) {
    adminProductList.innerHTML = '<div class="no-comments">Belum ada produk.</div>';
    return;
  }
  adminProductList.innerHTML = products.map((p) => `
    <div class="admin-product-item">
      <div class="icon"><i class="fas ${p.icon}"></i></div>
      <div class="info">
        <h4>${p.name}</h4>
        <span>${p.category} · ${formatRupiah(p.price)}</span>
      </div>
      <div class="actions">
        <button class="btn-edit" onclick="editProduct(${p.id})" title="Edit"><i class="fas fa-edit"></i></button>
        <button class="btn-delete" onclick="deleteProduct(${p.id})" title="Hapus"><i class="fas fa-trash"></i></button>
      </div>
    </div>`).join("");
}

// Events
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);
cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartSidebar);
overlay.addEventListener("click", () => { closeCartSidebar(); closeProductModal(); closeAdminLoginModal(); closeAdminPanelModal(); closeCheckoutModal(); closeMyOrdersModal(); closeVariantModal(); });
closeModal.addEventListener("click", closeProductModal);
productModal.addEventListener("click", (e) => { if (e.target === productModal) closeProductModal(); });
themeToggle.addEventListener("click", toggleTheme);
menuToggle.addEventListener("click", () => navLinks.classList.toggle("active"));
navLinks.querySelectorAll("a").forEach((l) => l.addEventListener("click", () => navLinks.classList.remove("active")));
checkoutBtn.addEventListener("click", () => {
  if (!cart.length) { showToast("Keranjang masih kosong!", true); return; }
  openCheckout();
});
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  showToast(`Terima kasih ${$("name").value.trim()}! Pesan Anda telah terkirim.`);
  contactForm.reset();
});
window.addEventListener("scroll", () => backToTop.classList.toggle("show", window.scrollY > 400));
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeCartSidebar(); closeProductModal(); closeAdminLoginModal(); closeAdminPanelModal(); closeCheckoutModal(); closeMyOrdersModal(); closeOrderSuccessModal(); closeVariantModal(); }
});

// Admin events
adminBtn.addEventListener("click", openAdminLogin);
closeAdminLogin.addEventListener("click", closeAdminLoginModal);
closeAdminPanel.addEventListener("click", closeAdminPanelModal);
adminLoginForm.addEventListener("submit", handleAdminLogin);
adminLogoutBtn.addEventListener("click", handleAdminLogout);
productForm.addEventListener("submit", handleProductForm);
cancelEditBtn.addEventListener("click", resetProductForm);
document.querySelectorAll(".admin-tab").forEach((tab) => {
  tab.addEventListener("click", () => switchAdminTab(tab.dataset.tab));
});
adminLoginModal.addEventListener("click", (e) => { if (e.target === adminLoginModal) closeAdminLoginModal(); });
adminPanelModal.addEventListener("click", (e) => { if (e.target === adminPanelModal) closeAdminPanelModal(); });


// ========== CHECKOUT & ORDERS ==========
function saveOrders() {
  localStorage.setItem("lp_orders", JSON.stringify(orders));
}

function generateOrderId() {
  const d = new Date();
  const date = d.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return "LP-" + date + "-" + rand;
}

function openCheckout() {
  closeCartSidebar();
  const itemsEl = $("checkoutItems");
  itemsEl.innerHTML = cart.map((item) => {
    const vLabel = item.variantLabel ? `<br><small style="color:var(--text-muted)">${item.variantLabel}</small>` : "";
    return `<div class="checkout-item">
      <span class="ci-name">${item.name}${vLabel}</span>
      <span class="ci-qty">x${item.qty}</span>
      <span class="ci-price">${formatRupiah(item.price * item.qty)}</span>
    </div>`;
  }).join("");
  $("checkoutTotal").textContent = formatRupiah(cart.reduce((s, i) => s + i.price * i.qty, 0));
  $("checkoutModal").classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal() {
  $("checkoutModal").classList.remove("show");
  document.body.style.overflow = "";
}

function handleCheckout(e) {
  e.preventDefault();
  if (!cart.length) { showToast("Keranjang kosong!", true); return; }

  const name = $("buyerName").value.trim();
  const phone = $("buyerPhone").value.trim();
  const address = $("buyerAddress").value.trim();
  const payment = $("paymentMethod").value;
  const note = $("buyerNote").value.trim();

  if (!name || !phone || !address) {
    showToast("Lengkapi data pengiriman!", true);
    return;
  }

  const orderId = generateOrderId();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const paymentLabels = { transfer: "Transfer Bank", ewallet: "E-Wallet", cod: "COD" };

  const order = {
    id: orderId,
    date: new Date().toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    timestamp: Date.now(),
    buyer: { name, phone, address, note },
    payment: payment,
    paymentLabel: paymentLabels[payment] || payment,
    items: cart.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty, icon: i.icon, variantLabel: i.variantLabel || "" })),
    total: total,
    status: "pending"
  };

  orders.unshift(order);
  saveOrders();

  // Kosongkan keranjang
  cart = [];
  saveCart();

  closeCheckoutModal();
  $("checkoutForm").reset();

  // Tampilkan sukses
  $("orderSuccessId").textContent = orderId;
  $("orderSuccessMsg").textContent = `Pesanan atas nama ${name} sedang diproses. Total: ${formatRupiah(total)}.`;
  $("orderSuccessModal").classList.add("show");
  document.body.style.overflow = "hidden";
  showToast("Pesanan berhasil dibuat!");
}

function closeOrderSuccessModal() {
  $("orderSuccessModal").classList.remove("show");
  document.body.style.overflow = "";
}

function openMyOrders() {
  renderMyOrders();
  $("myOrdersModal").classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeMyOrdersModal() {
  $("myOrdersModal").classList.remove("show");
  document.body.style.overflow = "";
}

function statusLabel(s) {
  const map = { pending: "Menunggu", diproses: "Diproses", dikirim: "Dikirim", selesai: "Selesai", dibatalkan: "Dibatalkan" };
  return map[s] || s;
}

function renderMyOrders() {
  const el = $("myOrdersList");
  if (!orders.length) {
    el.innerHTML = '<div class="no-orders"><i class="fas fa-receipt" style="font-size:2.5rem;opacity:0.3;display:block;margin-bottom:0.8rem"></i>Belum ada pesanan</div>';
    return;
  }
  el.innerHTML = orders.map((o) => `
    <div class="order-card">
      <div class="order-card-header">
        <span class="order-card-id">${o.id}</span>
        <span class="order-status ${o.status}">${statusLabel(o.status)}</span>
      </div>
      <div class="order-card-meta">${o.date} · ${o.paymentLabel}</div>
      <div class="order-card-items">
        ${o.items.map((i) => `${i.name}${i.variantLabel ? " (" + i.variantLabel + ")" : ""} x${i.qty}`).join(", ")}
      </div>
      <div class="order-card-total">${formatRupiah(o.total)}</div>
      <div class="order-card-meta" style="margin-top:0.5rem">
        ${o.buyer.name} · ${o.buyer.phone}<br>${o.buyer.address}
      </div>
    </div>`).join("");
}

function renderAdminOrders() {
  const el = $("adminOrdersList");
  if (!el) return;
  if (!orders.length) {
    el.innerHTML = '<div class="no-orders">Belum ada pesanan masuk.</div>';
    return;
  }
  el.innerHTML = orders.map((o) => `
    <div class="admin-order-card">
      <div class="admin-order-top">
        <strong style="color:var(--primary)">${o.id}</strong>
        <span class="order-status ${o.status}">${statusLabel(o.status)}</span>
      </div>
      <div class="admin-order-buyer">
        <strong>${escapeHtml(o.buyer.name)}</strong> · ${escapeHtml(o.buyer.phone)}<br>
        ${escapeHtml(o.buyer.address)}
        ${o.buyer.note ? "<br>Catatan: " + escapeHtml(o.buyer.note) : ""}
      </div>
      <div style="font-size:0.9rem;margin-bottom:0.4rem">
        ${o.items.map((i) => `${i.name}${i.variantLabel ? " (" + i.variantLabel + ")" : ""} x${i.qty}`).join(", ")}
      </div>
      <div style="font-weight:700;color:var(--primary)">${formatRupiah(o.total)} · ${o.paymentLabel}</div>
      <div class="admin-order-actions">
        <select onchange="updateOrderStatus('${o.id}', this.value)">
          <option value="pending" ${o.status === "pending" ? "selected" : ""}>Menunggu</option>
          <option value="diproses" ${o.status === "diproses" ? "selected" : ""}>Diproses</option>
          <option value="dikirim" ${o.status === "dikirim" ? "selected" : ""}>Dikirim</option>
          <option value="selesai" ${o.status === "selesai" ? "selected" : ""}>Selesai</option>
          <option value="dibatalkan" ${o.status === "dibatalkan" ? "selected" : ""}>Dibatalkan</option>
        </select>
      </div>
    </div>`).join("");
}

function updateOrderStatus(orderId, status) {
  const o = orders.find((x) => x.id === orderId);
  if (!o) return;
  o.status = status;
  saveOrders();
  renderAdminOrders();
  showToast(`Status pesanan ${orderId} diubah menjadi ${statusLabel(status)}`);
}

// Checkout & Orders events
const checkoutForm = $("checkoutForm");
if (checkoutForm) checkoutForm.addEventListener("submit", handleCheckout);
const closeCheckout = $("closeCheckout");
if (closeCheckout) closeCheckout.addEventListener("click", closeCheckoutModal);
const closeOrderSuccess = $("closeOrderSuccess");
if (closeOrderSuccess) closeOrderSuccess.addEventListener("click", closeOrderSuccessModal);
const ordersBtn = $("ordersBtn");
if (ordersBtn) ordersBtn.addEventListener("click", openMyOrders);
const closeMyOrders = $("closeMyOrders");
if (closeMyOrders) closeMyOrders.addEventListener("click", closeMyOrdersModal);
const checkoutModal = $("checkoutModal");
if (checkoutModal) checkoutModal.addEventListener("click", (e) => { if (e.target === checkoutModal) closeCheckoutModal(); });
const myOrdersModal = $("myOrdersModal");
if (myOrdersModal) myOrdersModal.addEventListener("click", (e) => { if (e.target === myOrdersModal) closeMyOrdersModal(); });
const orderSuccessModal = $("orderSuccessModal");
if (orderSuccessModal) orderSuccessModal.addEventListener("click", (e) => { if (e.target === orderSuccessModal) closeOrderSuccessModal(); });

// Variant modal events
const closeVariant = $("closeVariant");
if (closeVariant) closeVariant.addEventListener("click", closeVariantModal);
const confirmVariantBtn = $("confirmVariantBtn");
if (confirmVariantBtn) confirmVariantBtn.addEventListener("click", confirmVariantAdd);
const variantModal = $("variantModal");
if (variantModal) variantModal.addEventListener("click", (e) => { if (e.target === variantModal) closeVariantModal(); });
const varQtyMinus = $("varQtyMinus");
const varQtyPlus = $("varQtyPlus");
if (varQtyMinus) varQtyMinus.addEventListener("click", () => { const inp = $("variantQty"); inp.value = Math.max(1, (+inp.value || 1) - 1); });
if (varQtyPlus) varQtyPlus.addEventListener("click", () => { const inp = $("variantQty"); inp.value = Math.min(99, (+inp.value || 1) + 1); });


// Init
function init() {
  applyTheme(currentTheme);
  renderProducts();
  renderTestimonials();
  renderFAQ();
  updateCartUI();
  animateCounters();
}
init();