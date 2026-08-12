(() => {
  'use strict';

  const PRODUCT_KEY = 'lm_products_v1';
  const CART_KEY = 'lm_cart_v1';
  const WHATSAPP = '25872599084';

  const categories = [
    { id: 'perfumes', name: 'Perfumes', icon: '✦', subtitle: 'Fragrâncias para todos os estilos' },
    { id: 'cremes', name: 'Cremes', icon: '●', subtitle: 'Hidratação e cuidado pessoal' },
    { id: 'acessorios', name: 'Acessórios', icon: '⌁', subtitle: 'Capas, carregadores, áudio e mais' },
    { id: 'celulares', name: 'Celulares', icon: '▣', subtitle: 'Smartphones para o dia a dia' }
  ];

  const seedProducts = [
    { id: 'PF001', name: 'Essência Dourada 100 ml', category: 'perfumes', description: 'Fragrância elegante com notas quentes e acabamento sofisticado.', price: 1850, stock: 12, unit: 'un', active: true, featured: 1 },
    { id: 'PF002', name: 'Brisa Noturna 100 ml', category: 'perfumes', description: 'Perfume intenso e moderno para noite e ocasiões especiais.', price: 2200, stock: 8, unit: 'un', active: true, featured: 2 },
    { id: 'PF003', name: 'Rosa Imperial 50 ml', category: 'perfumes', description: 'Aroma floral suave, leve e marcante.', price: 1350, stock: 15, unit: 'un', active: true, featured: 3 },
    { id: 'CR001', name: 'Creme Karité Nutritivo', category: 'cremes', description: 'Creme corporal hidratante com toque macio.', price: 500, stock: 24, unit: 'un', active: true, featured: 4 },
    { id: 'CR002', name: 'Body Cream Coco 250 ml', category: 'cremes', description: 'Hidratação diária com aroma suave de coco.', price: 650, stock: 18, unit: 'un', active: true, featured: 5 },
    { id: 'CR003', name: 'Creme Facial Aloe 100 ml', category: 'cremes', description: 'Textura leve para rotina de cuidado facial.', price: 450, stock: 20, unit: 'un', active: true, featured: 6 },
    { id: 'AC001', name: 'Capa Silicone Premium', category: 'acessorios', description: 'Proteção leve com acabamento macio e boa aderência.', price: 350, stock: 30, unit: 'un', active: true, featured: 7 },
    { id: 'AC002', name: 'Carregador USB-C 20W', category: 'acessorios', description: 'Carregamento rápido para aparelhos compatíveis.', price: 900, stock: 16, unit: 'un', active: true, featured: 8 },
    { id: 'AC003', name: 'Fones Bluetooth Air', category: 'acessorios', description: 'Áudio sem fios com estojo de carregamento.', price: 1500, stock: 11, unit: 'un', active: true, featured: 9 },
    { id: 'CL001', name: 'Smart X1 128 GB', category: 'celulares', description: 'Smartphone 4G, 128 GB, ecrã amplo e bateria para o dia inteiro.', price: 8990, stock: 7, unit: 'un', active: true, featured: 10 },
    { id: 'CL002', name: 'Smart Pro 256 GB', category: 'celulares', description: 'Modelo de demonstração com mais memória e desempenho.', price: 14990, stock: 4, unit: 'un', active: true, featured: 11 },
    { id: 'CL003', name: 'Smart Mini 64 GB', category: 'celulares', description: 'Opção compacta e económica para chamadas, apps e internet.', price: 5990, stock: 9, unit: 'un', active: true, featured: 12 }
  ];

  let products = [];
  let cart = readJson(CART_KEY, []);
  let selectedCategory = 'all';
  let toastTimer;

  const $ = (id) => document.getElementById(id);

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function ensureProducts() {
    const current = readJson(PRODUCT_KEY, null);
    if (!Array.isArray(current) || !current.length) {
      writeJson(PRODUCT_KEY, seedProducts);
      products = structuredCloneSafe(seedProducts);
    } else {
      products = current;
    }
  }

  function structuredCloneSafe(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function money(value) {
    return new Intl.NumberFormat('pt-MZ', { maximumFractionDigits: 0 }).format(Number(value) || 0) + ' MT';
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function svgData(product) {
    const cat = product.category;
    const palette = {
      perfumes: ['#6f3451', '#2a1724', '#f2c4d1'],
      cremes: ['#765a3d', '#2d2116', '#f4d9a8'],
      acessorios: ['#275b62', '#10272a', '#9fe3e9'],
      celulares: ['#3a3476', '#16142d', '#bcb3ff']
    }[cat] || ['#555', '#222', '#ddd'];

    let drawing = '';
    if (cat === 'perfumes') {
      drawing = `
        <rect x="116" y="88" width="68" height="26" rx="8" fill="${palette[2]}" opacity=".88"/>
        <rect x="104" y="112" width="92" height="112" rx="24" fill="none" stroke="${palette[2]}" stroke-width="8"/>
        <rect x="125" y="135" width="50" height="54" rx="12" fill="${palette[2]}" opacity=".24"/>
        <circle cx="150" cy="162" r="12" fill="${palette[2]}" opacity=".75"/>`;
    } else if (cat === 'cremes') {
      drawing = `
        <ellipse cx="150" cy="126" rx="66" ry="24" fill="${palette[2]}" opacity=".9"/>
        <path d="M84 126v78c0 24 132 24 132 0v-78" fill="${palette[2]}" opacity=".2" stroke="${palette[2]}" stroke-width="8"/>
        <ellipse cx="150" cy="203" rx="62" ry="19" fill="${palette[2]}" opacity=".35"/>
        <circle cx="150" cy="166" r="18" fill="${palette[2]}" opacity=".75"/>`;
    } else if (cat === 'acessorios') {
      drawing = `
        <rect x="103" y="72" width="94" height="170" rx="26" fill="none" stroke="${palette[2]}" stroke-width="8"/>
        <rect x="117" y="92" width="66" height="104" rx="14" fill="${palette[2]}" opacity=".16"/>
        <path d="M62 128c22-28 44-28 64 0M238 128c-22-28-44-28-64 0" fill="none" stroke="${palette[2]}" stroke-width="10" stroke-linecap="round"/>
        <circle cx="62" cy="140" r="15" fill="${palette[2]}"/><circle cx="238" cy="140" r="15" fill="${palette[2]}"/>`;
    } else {
      drawing = `
        <rect x="95" y="50" width="110" height="210" rx="28" fill="#09090c" stroke="${palette[2]}" stroke-width="7"/>
        <rect x="107" y="76" width="86" height="144" rx="13" fill="url(#screen)"/>
        <rect x="132" y="60" width="36" height="6" rx="3" fill="${palette[2]}" opacity=".6"/>
        <circle cx="150" cy="240" r="8" fill="${palette[2]}" opacity=".8"/>`;
    }

    const initials = escapeXml(product.name.split(/\s+/).slice(0, 2).map(x => x[0]).join('').toUpperCase());
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 270">
      <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${palette[0]}"/><stop offset="1" stop-color="${palette[1]}"/></linearGradient><linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${palette[2]}" stop-opacity=".8"/><stop offset="1" stop-color="#6fe1ff" stop-opacity=".35"/></linearGradient></defs>
      <rect width="300" height="270" rx="32" fill="url(#bg)"/>
      <circle cx="245" cy="42" r="80" fill="#fff" opacity=".06"/><circle cx="40" cy="235" r="90" fill="#fff" opacity=".035"/>
      ${drawing}
      <text x="24" y="246" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#fff" opacity=".72">${initials}</text>
    </svg>`;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  function escapeXml(value) {
    return String(value).replace(/[<>&'\"]/g, (c) => ({ '<':'&lt;', '>':'&gt;', '&':'&amp;', "'":'&apos;', '"':'&quot;' }[c]));
  }

  function categoryName(id) {
    return categories.find((c) => c.id === id)?.name || id;
  }

  function renderCategories() {
    const grid = $('categoryGrid');
    grid.innerHTML = categories.map((cat) => {
      const count = products.filter((p) => p.active !== false && p.category === cat.id).length;
      const active = selectedCategory === cat.id ? ' active' : '';
      return `<button class="category-card${active}" data-category="${cat.id}" type="button">
        <span class="cat-icon">${cat.icon}</span>
        <strong>${escapeHtml(cat.name)}</strong>
        <small>${count} produto${count === 1 ? '' : 's'} · ${escapeHtml(cat.subtitle)}</small>
      </button>`;
    }).join('');

    grid.querySelectorAll('[data-category]').forEach((button) => {
      button.addEventListener('click', () => {
        selectedCategory = button.dataset.category;
        $('categoryFilter').value = selectedCategory;
        renderCategories();
        renderProducts();
        $('produtos').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function populateCategoryFilter() {
    $('categoryFilter').innerHTML = '<option value="all">Todas as categorias</option>' + categories
      .map((cat) => `<option value="${cat.id}">${escapeHtml(cat.name)}</option>`).join('');
  }

  function filteredProducts() {
    const query = $('searchInput').value.trim().toLowerCase();
    const sort = $('sortFilter').value;
    selectedCategory = $('categoryFilter').value;

    const result = products.filter((p) => {
      if (p.active === false) return false;
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (!query) return true;
      return `${p.id} ${p.name} ${p.description}`.toLowerCase().includes(query);
    });

    if (sort === 'price-asc') result.sort((a, b) => Number(a.price) - Number(b.price));
    else if (sort === 'price-desc') result.sort((a, b) => Number(b.price) - Number(a.price));
    else if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name, 'pt'));
    else result.sort((a, b) => Number(a.featured || 999) - Number(b.featured || 999));
    return result;
  }

  function renderProducts() {
    const list = filteredProducts();
    const grid = $('productGrid');
    $('emptyState').classList.toggle('hidden', list.length > 0);
    renderCategories();

    grid.innerHTML = list.map((p) => {
      const stock = Number(p.stock) || 0;
      const stockClass = stock === 0 ? 'out' : stock <= 5 ? 'low' : '';
      const stockText = stock === 0 ? 'Esgotado' : stock <= 5 ? `Últimas ${stock}` : 'Disponível';
      const maxQty = Math.max(1, Math.min(stock, 10));
      const qtyOptions = Array.from({ length: maxQty }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');
      return `<article class="product-card">
        <div class="product-image">
          <img src="${svgData(p)}" alt="Imagem ilustrativa de ${escapeHtml(p.name)}" loading="lazy" />
          <span class="badge ${stockClass}">${stockText}</span>
        </div>
        <div class="product-body">
          <div class="product-meta">${escapeHtml(categoryName(p.category))} · ${escapeHtml(p.id)}</div>
          <div class="product-name">${escapeHtml(p.name)}</div>
          <div class="product-desc">${escapeHtml(p.description || '')}</div>
          <div class="product-price"><strong>${money(p.price)}</strong><small>/ ${escapeHtml(p.unit || 'un')}</small></div>
          <div class="product-actions">
            <select class="qty-select" id="qty-${escapeHtml(p.id)}" ${stock === 0 ? 'disabled' : ''}>${qtyOptions}</select>
            <button class="add-btn" data-add="${escapeHtml(p.id)}" ${stock === 0 ? 'disabled' : ''}>${stock === 0 ? 'Esgotado' : '+ Carrinho'}</button>
          </div>
        </div>
      </article>`;
    }).join('');

    grid.querySelectorAll('[data-add]').forEach((button) => {
      button.addEventListener('click', () => addToCart(button.dataset.add));
    });
  }

  function findProduct(id) {
    return products.find((p) => String(p.id) === String(id));
  }

  function addToCart(id) {
    const product = findProduct(id);
    if (!product || Number(product.stock) <= 0) return;
    const qty = Number($(`qty-${id}`)?.value || 1);
    const existing = cart.find((item) => item.id === id);
    const current = existing?.qty || 0;
    const allowed = Math.max(0, Number(product.stock) - current);
    if (!allowed) return showToast('Quantidade máxima em estoque já está no carrinho.');
    const add = Math.min(qty, allowed);
    if (existing) existing.qty += add;
    else cart.push({ id, qty: add });
    saveCart();
    showToast(`${product.name} adicionado ao carrinho.`);
  }

  function saveCart() {
    cart = cart.filter((item) => item.qty > 0 && findProduct(item.id));
    writeJson(CART_KEY, cart);
    renderCart();
  }

  function cartTotal() {
    return cart.reduce((sum, item) => {
      const p = findProduct(item.id);
      return sum + (p ? Number(p.price) * item.qty : 0);
    }, 0);
  }

  function renderCart() {
    const itemsEl = $('cartItems');
    const valid = cart.filter((item) => findProduct(item.id));
    const count = valid.reduce((sum, item) => sum + item.qty, 0);
    $('cartCount').textContent = count;
    $('cartTotal').textContent = money(cartTotal());
    $('cartEmpty').classList.toggle('hidden', valid.length > 0);
    itemsEl.classList.toggle('hidden', valid.length === 0);

    itemsEl.innerHTML = valid.map((item) => {
      const p = findProduct(item.id);
      return `<div class="cart-item">
        <div class="cart-thumb"><img src="${svgData(p)}" alt="" /></div>
        <div class="cart-info">
          <strong>${escapeHtml(p.name)}</strong>
          <small>${money(p.price)} · subtotal ${money(Number(p.price) * item.qty)}</small>
          <div class="cart-qty">
            <button type="button" data-dec="${escapeHtml(p.id)}">−</button>
            <span>${item.qty}</span>
            <button type="button" data-inc="${escapeHtml(p.id)}">+</button>
          </div>
        </div>
        <button class="remove-btn" type="button" data-remove="${escapeHtml(p.id)}" aria-label="Remover">×</button>
      </div>`;
    }).join('');

    itemsEl.querySelectorAll('[data-dec]').forEach((b) => b.addEventListener('click', () => changeCartQty(b.dataset.dec, -1)));
    itemsEl.querySelectorAll('[data-inc]').forEach((b) => b.addEventListener('click', () => changeCartQty(b.dataset.inc, 1)));
    itemsEl.querySelectorAll('[data-remove]').forEach((b) => b.addEventListener('click', () => removeCartItem(b.dataset.remove)));
  }

  function changeCartQty(id, delta) {
    const item = cart.find((x) => x.id === id);
    const p = findProduct(id);
    if (!item || !p) return;
    const next = item.qty + delta;
    if (next <= 0) return removeCartItem(id);
    if (next > Number(p.stock)) return showToast('Limite de estoque atingido.');
    item.qty = next;
    saveCart();
  }

  function removeCartItem(id) {
    cart = cart.filter((x) => x.id !== id);
    saveCart();
  }

  function clearCart() {
    cart = [];
    saveCart();
  }

  function toggleCart(force) {
    const open = typeof force === 'boolean' ? force : !$('cartDrawer').classList.contains('active');
    $('cartDrawer').classList.toggle('active', open);
    $('cartOverlay').classList.toggle('active', open);
    document.body.classList.toggle('no-scroll', open);
  }

  function checkoutWhatsApp() {
    if (!cart.length) return showToast('Adicione produtos ao carrinho primeiro.');
    const lines = cart.map((item, index) => {
      const p = findProduct(item.id);
      return `${index + 1}. ${p.name} — ${item.qty} x ${money(p.price)} = ${money(Number(p.price) * item.qty)}`;
    });
    const message = [
      'Olá! Quero fazer um pedido na Lenda Motivação Store:',
      '',
      ...lines,
      '',
      `TOTAL: ${money(cartTotal())}`,
      '',
      'Por favor, confirme disponibilidade, entrega e forma de pagamento.'
    ].join('\n');
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  }

  function showToast(message) {
    const toast = $('toast');
    toast.textContent = message;
    toast.classList.add('active');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('active'), 2500);
  }

  function bindEvents() {
    $('searchInput').addEventListener('input', renderProducts);
    $('categoryFilter').addEventListener('change', renderProducts);
    $('sortFilter').addEventListener('change', renderProducts);
    $('cartBtn').addEventListener('click', () => toggleCart(true));
    $('closeCartBtn').addEventListener('click', () => toggleCart(false));
    $('cartOverlay').addEventListener('click', () => toggleCart(false));
    $('checkoutBtn').addEventListener('click', checkoutWhatsApp);
    $('printBtn').addEventListener('click', () => {
      if (!cart.length) return showToast('Carrinho vazio.');
      window.print();
    });
    $('clearCartBtn').addEventListener('click', clearCart);
    $('menuBtn').addEventListener('click', () => $('mainNav').classList.toggle('open'));
    $('mainNav').querySelectorAll('a').forEach((a) => a.addEventListener('click', () => $('mainNav').classList.remove('open')));

    window.addEventListener('storage', (event) => {
      if (event.key === PRODUCT_KEY) {
        ensureProducts();
        renderProducts();
      }
      if (event.key === CART_KEY) {
        cart = readJson(CART_KEY, []);
        renderCart();
      }
    });
  }

  function init() {
    ensureProducts();
    populateCategoryFilter();
    renderProducts();
    renderCart();
    bindEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
