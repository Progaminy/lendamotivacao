(() => {
  'use strict';

  const PRODUCT_KEY = 'lm_products_v1';
  const CART_KEY = 'lm_cart_v1';

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

  const categoryNames = {
    perfumes: 'Perfumes',
    cremes: 'Cremes',
    acessorios: 'Acessórios',
    celulares: 'Celulares'
  };

  let products = [];
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
    const data = readJson(PRODUCT_KEY, null);
    if (!Array.isArray(data) || !data.length) {
      products = JSON.parse(JSON.stringify(seedProducts));
      writeJson(PRODUCT_KEY, products);
    } else products = data;
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

  function saveProducts(message) {
    writeJson(PRODUCT_KEY, products);
    renderAll();
    if (message) showToast(message);
  }

  function renderStats() {
    const active = products.filter((p) => p.active !== false).length;
    const units = products.reduce((sum, p) => sum + Math.max(0, Number(p.stock) || 0), 0);
    const value = products.reduce((sum, p) => sum + (Math.max(0, Number(p.stock) || 0) * Math.max(0, Number(p.price) || 0)), 0);
    $('stats').innerHTML = `
      <div class="stat"><small>Produtos</small><strong>${products.length}</strong></div>
      <div class="stat"><small>Visíveis</small><strong>${active}</strong></div>
      <div class="stat"><small>Unidades em stock</small><strong>${units}</strong></div>
      <div class="stat"><small>Valor do stock</small><strong>${money(value)}</strong></div>`;
  }

  function renderRows() {
    const query = $('searchInput').value.trim().toLowerCase();
    const filtered = products
      .filter((p) => `${p.id} ${p.name} ${categoryNames[p.category] || p.category}`.toLowerCase().includes(query))
      .sort((a, b) => Number(a.featured || 999) - Number(b.featured || 999));

    $('emptyState').classList.toggle('hidden', filtered.length > 0);
    $('productRows').innerHTML = filtered.map((p) => {
      const stock = Number(p.stock) || 0;
      const stockClass = stock === 0 ? 'zero' : stock <= 5 ? 'low' : '';
      return `<tr>
        <td class="product-cell"><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.id)} · ${escapeHtml(p.description || '')}</small></td>
        <td>${escapeHtml(categoryNames[p.category] || p.category)}</td>
        <td class="price">${money(p.price)}</td>
        <td class="stock ${stockClass}">${stock}</td>
        <td><span class="status ${p.active !== false ? 'on' : 'off'}">${p.active !== false ? 'Visível' : 'Oculto'}</span></td>
        <td><div class="actions">
          <button class="action-btn" type="button" data-edit="${escapeHtml(p.id)}">Editar</button>
          <button class="action-btn" type="button" data-toggle="${escapeHtml(p.id)}">${p.active !== false ? 'Ocultar' : 'Mostrar'}</button>
          <button class="action-btn delete" type="button" data-delete="${escapeHtml(p.id)}">Eliminar</button>
        </div></td>
      </tr>`;
    }).join('');

    $('productRows').querySelectorAll('[data-edit]').forEach((b) => b.addEventListener('click', () => openEdit(b.dataset.edit)));
    $('productRows').querySelectorAll('[data-toggle]').forEach((b) => b.addEventListener('click', () => toggleProduct(b.dataset.toggle)));
    $('productRows').querySelectorAll('[data-delete]').forEach((b) => b.addEventListener('click', () => deleteProduct(b.dataset.delete)));
  }

  function renderAll() {
    renderStats();
    renderRows();
  }

  function openModal() {
    $('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    $('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }

  function clearForm() {
    $('productForm').reset();
    $('originalId').value = '';
    $('productId').value = suggestId('perfumes');
    $('category').value = 'perfumes';
    $('unit').value = 'un';
    $('featured').value = String(products.length + 1);
    $('active').checked = true;
  }

  function suggestId(category) {
    const prefix = { perfumes: 'PF', cremes: 'CR', acessorios: 'AC', celulares: 'CL' }[category] || 'PR';
    let n = 1;
    while (products.some((p) => p.id === `${prefix}${String(n).padStart(3, '0')}`)) n++;
    return `${prefix}${String(n).padStart(3, '0')}`;
  }

  function openNew() {
    clearForm();
    $('formTitle').textContent = 'Novo produto';
    openModal();
    setTimeout(() => $('name').focus(), 50);
  }

  function openEdit(id) {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    $('formTitle').textContent = 'Editar produto';
    $('originalId').value = p.id;
    $('productId').value = p.id;
    $('category').value = p.category;
    $('name').value = p.name;
    $('description').value = p.description || '';
    $('price').value = Number(p.price) || 0;
    $('stock').value = Number(p.stock) || 0;
    $('unit').value = p.unit || 'un';
    $('featured').value = Number(p.featured) || 99;
    $('active').checked = p.active !== false;
    openModal();
  }

  function submitProduct(event) {
    event.preventDefault();
    const originalId = $('originalId').value.trim();
    const id = $('productId').value.trim().toUpperCase().replace(/\s+/g, '-');
    const name = $('name').value.trim();
    const price = Math.max(0, Number($('price').value) || 0);
    const stock = Math.max(0, Math.floor(Number($('stock').value) || 0));

    if (!id || !name) return showToast('Preencha ID e nome do produto.');
    if (products.some((p) => p.id === id && p.id !== originalId)) return showToast('Já existe um produto com este ID.');

    const next = {
      id,
      name,
      category: $('category').value,
      description: $('description').value.trim(),
      price,
      stock,
      unit: $('unit').value.trim() || 'un',
      active: $('active').checked,
      featured: Math.max(1, Math.floor(Number($('featured').value) || 99))
    };

    const index = products.findIndex((p) => p.id === originalId);
    if (index >= 0) products[index] = next;
    else products.push(next);

    if (originalId && originalId !== id) {
      const cart = readJson(CART_KEY, []);
      cart.forEach((item) => { if (item.id === originalId) item.id = id; });
      writeJson(CART_KEY, cart);
    }

    closeModal();
    saveProducts(index >= 0 ? 'Produto atualizado.' : 'Produto criado.');
  }

  function toggleProduct(id) {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    p.active = p.active === false;
    saveProducts(p.active ? 'Produto visível na loja.' : 'Produto ocultado.');
  }

  function deleteProduct(id) {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    if (!window.confirm(`Eliminar "${p.name}"?`)) return;
    products = products.filter((x) => x.id !== id);
    const cart = readJson(CART_KEY, []).filter((item) => item.id !== id);
    writeJson(CART_KEY, cart);
    saveProducts('Produto eliminado.');
  }

  function resetDemo() {
    if (!window.confirm('Restaurar os produtos e preços de demonstração? As alterações locais serão substituídas.')) return;
    products = JSON.parse(JSON.stringify(seedProducts));
    writeJson(CART_KEY, []);
    saveProducts('Demonstração restaurada.');
  }

  function showToast(message) {
    const toast = $('toast');
    toast.textContent = message;
    toast.classList.add('active');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('active'), 2300);
  }

  function bindEvents() {
    $('newProductBtn').addEventListener('click', openNew);
    $('resetBtn').addEventListener('click', resetDemo);
    $('searchInput').addEventListener('input', renderRows);
    $('productForm').addEventListener('submit', submitProduct);
    $('closeModalBtn').addEventListener('click', closeModal);
    $('cancelBtn').addEventListener('click', closeModal);
    $('modalOverlay').addEventListener('click', (event) => { if (event.target === $('modalOverlay')) closeModal(); });
    $('category').addEventListener('change', () => {
      if (!$('originalId').value) $('productId').value = suggestId($('category').value);
    });
    window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
    window.addEventListener('storage', (event) => {
      if (event.key === PRODUCT_KEY) {
        ensureProducts();
        renderAll();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    ensureProducts();
    renderAll();
    bindEvents();
  });
})();
