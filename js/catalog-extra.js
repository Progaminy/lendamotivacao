(() => {
  'use strict';

  const PRODUCT_KEY = 'lm_products_v1';
  const MIGRATION_KEY = 'lm_catalog_examples_v2';

  const catalog = [
    { id: 'PF001', name: 'Essência Dourada 100 ml', category: 'perfumes', description: 'Fragrância elegante com notas quentes e acabamento sofisticado.', price: 1850, stock: 12, unit: 'un', active: true, featured: 1, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80' },
    { id: 'PF002', name: 'Brisa Noturna 100 ml', category: 'perfumes', description: 'Perfume intenso e moderno para noite e ocasiões especiais.', price: 2200, stock: 8, unit: 'un', active: true, featured: 2, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80' },
    { id: 'PF003', name: 'Rosa Imperial 50 ml', category: 'perfumes', description: 'Aroma floral suave, leve e marcante.', price: 1350, stock: 15, unit: 'un', active: true, featured: 3, image: 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&w=900&q=80' },
    { id: 'CR001', name: 'Creme Karité Nutritivo', category: 'cremes', description: 'Creme corporal hidratante com toque macio.', price: 500, stock: 24, unit: 'un', active: true, featured: 4, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80' },
    { id: 'CR002', name: 'Body Cream Coco 250 ml', category: 'cremes', description: 'Hidratação diária com aroma suave de coco.', price: 650, stock: 18, unit: 'un', active: true, featured: 5, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=900&q=80' },
    { id: 'CR003', name: 'Creme Facial Aloe 100 ml', category: 'cremes', description: 'Textura leve para rotina de cuidado facial.', price: 450, stock: 20, unit: 'un', active: true, featured: 6, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=900&q=80' },
    { id: 'AC001', name: 'Capa Silicone Premium', category: 'acessorios', description: 'Proteção leve com acabamento macio e boa aderência.', price: 350, stock: 30, unit: 'un', active: true, featured: 7, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80' },
    { id: 'AC002', name: 'Carregador USB-C 20W', category: 'acessorios', description: 'Carregamento rápido para aparelhos compatíveis.', price: 900, stock: 16, unit: 'un', active: true, featured: 8, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80' },
    { id: 'AC003', name: 'Fones Bluetooth Air', category: 'acessorios', description: 'Áudio sem fios com estojo de carregamento.', price: 1500, stock: 11, unit: 'un', active: true, featured: 9, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80' },
    { id: 'CL001', name: 'Smart X1 128 GB', category: 'celulares', description: 'Smartphone 4G, 128 GB, ecrã amplo e bateria para o dia inteiro.', price: 8990, stock: 7, unit: 'un', active: true, featured: 10, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80' },
    { id: 'CL002', name: 'Smart Pro 256 GB', category: 'celulares', description: 'Modelo de demonstração com mais memória e desempenho.', price: 14990, stock: 4, unit: 'un', active: true, featured: 11, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80' },
    { id: 'CL003', name: 'Smart Mini 64 GB', category: 'celulares', description: 'Opção compacta e económica para chamadas, apps e internet.', price: 5990, stock: 9, unit: 'un', active: true, featured: 12, image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=900&q=80' },

    { id: 'PF004', name: 'Oud Majestic 100 ml', category: 'perfumes', description: 'Fragrância amadeirada intensa, elegante e envolvente.', price: 2500, stock: 10, unit: 'un', active: true, featured: 13, image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80' },
    { id: 'PF005', name: 'Fresh Blue 100 ml', category: 'perfumes', description: 'Perfume fresco e versátil para uso diário.', price: 1750, stock: 14, unit: 'un', active: true, featured: 14, image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=900&q=80' },
    { id: 'PF006', name: 'Vanilla Velvet 75 ml', category: 'perfumes', description: 'Notas doces e suaves com presença aconchegante.', price: 1600, stock: 13, unit: 'un', active: true, featured: 15, image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80' },
    { id: 'PF007', name: 'Intense Black 100 ml', category: 'perfumes', description: 'Fragrância marcante para noite e ocasiões especiais.', price: 2850, stock: 7, unit: 'un', active: true, featured: 16, image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&q=80' },

    { id: 'CR004', name: 'Loção Corporal Baunilha 400 ml', category: 'cremes', description: 'Loção hidratante com aroma suave de baunilha.', price: 750, stock: 19, unit: 'un', active: true, featured: 17, image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80' },
    { id: 'CR005', name: 'Creme de Mãos Karité 75 ml', category: 'cremes', description: 'Hidratação prática para mãos secas e rotina diária.', price: 300, stock: 28, unit: 'un', active: true, featured: 18, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80' },
    { id: 'CR006', name: 'Gel Facial Vitamina C 100 ml', category: 'cremes', description: 'Gel leve para cuidado facial com sensação refrescante.', price: 600, stock: 17, unit: 'un', active: true, featured: 19, image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=80' },
    { id: 'CR007', name: 'Body Butter Cacau 250 ml', category: 'cremes', description: 'Creme corporal rico para hidratação intensa.', price: 800, stock: 12, unit: 'un', active: true, featured: 20, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80' },

    { id: 'AC004', name: 'Power Bank 10.000 mAh', category: 'acessorios', description: 'Bateria portátil para carregar o celular fora de casa.', price: 1800, stock: 10, unit: 'un', active: true, featured: 21, image: 'https://images.unsplash.com/photo-1609592424824-0f8b3f8f2d60?auto=format&fit=crop&w=900&q=80' },
    { id: 'AC005', name: 'Cabo USB-C Reforçado', category: 'acessorios', description: 'Cabo resistente para carregamento e transferência de dados.', price: 500, stock: 32, unit: 'un', active: true, featured: 22, image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80' },
    { id: 'AC006', name: 'Suporte Veicular para Celular', category: 'acessorios', description: 'Suporte ajustável para uso seguro do celular no automóvel.', price: 700, stock: 15, unit: 'un', active: true, featured: 23, image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=900&q=80' },
    { id: 'AC007', name: 'Película de Vidro Temperado', category: 'acessorios', description: 'Proteção extra contra riscos e pequenos impactos no ecrã.', price: 250, stock: 45, unit: 'un', active: true, featured: 24, image: 'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&w=900&q=80' },

    { id: 'CL004', name: 'Smart A 128 GB', category: 'celulares', description: 'Smartphone 4G equilibrado para redes sociais, chamadas e vídeos.', price: 7490, stock: 8, unit: 'un', active: true, featured: 25, image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80' },
    { id: 'CL005', name: 'Smart Max 256 GB', category: 'celulares', description: 'Ecrã amplo, maior armazenamento e desempenho para uso intenso.', price: 18990, stock: 5, unit: 'un', active: true, featured: 26, image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=900&q=80' },
    { id: 'CL006', name: 'Smart Lite 64 GB', category: 'celulares', description: 'Modelo económico para comunicação, internet e aplicações essenciais.', price: 4990, stock: 11, unit: 'un', active: true, featured: 27, image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80' },
    { id: 'CL007', name: 'Smart 5G 128 GB', category: 'celulares', description: 'Conectividade 5G, boa autonomia e desempenho para o dia a dia.', price: 11990, stock: 6, unit: 'un', active: true, featured: 28, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80' }
  ];

  function readProducts() {
    try {
      const value = JSON.parse(localStorage.getItem(PRODUCT_KEY) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (_) {
      return [];
    }
  }

  function migrateCatalog() {
    if (localStorage.getItem(MIGRATION_KEY) === '1') return;

    const current = readProducts();
    const knownIds = new Set(current.map((item) => String(item.id)));
    const merged = current.slice();

    catalog.forEach((item) => {
      if (!knownIds.has(item.id)) merged.push({ ...item });
    });

    localStorage.setItem(PRODUCT_KEY, JSON.stringify(merged));
    localStorage.setItem(MIGRATION_KEY, '1');

    try {
      window.dispatchEvent(new StorageEvent('storage', {
        key: PRODUCT_KEY,
        newValue: JSON.stringify(merged),
        storageArea: localStorage
      }));
    } catch (_) {
      window.dispatchEvent(new Event('storage'));
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(migrateCatalog, 0);
  });
})();
