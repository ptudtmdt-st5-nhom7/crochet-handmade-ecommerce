import { products } from './products.js';
import { renderProducts } from './product-list.js';
import { initProductFilters } from './product-filters.js';
import { addSingle, updateCartBadge } from './cart.js';

export function initProductsPage() {
  const list = document.querySelector('[data-products-list]');
  if (!list || list.dataset.productsPageReady === 'true') return;

  // Chỉ khởi tạo một lần; render lại danh sách không gắn thêm sự kiện.
  list.dataset.productsPageReady = 'true';
  initProductFilters({ products, renderProducts, cartReady: true, detailReady: false });
  updateCartBadge();

  const search = document.querySelector('[data-product-search]');
  const category = document.querySelector('[data-category-filter]');
  const sort = document.querySelector('[data-sort-select]');
  const siteSearch = document.getElementById('site-search');
  const searchButton = document.querySelector('[data-site-search-button]');
  const feedback = document.querySelector('[data-cart-feedback]');

  const applySiteSearch = () => {
    search.value = siteSearch.value;
    search.dispatchEvent(new Event('input', { bubbles: true }));
  };
  if (siteSearch && searchButton) {
    searchButton.disabled = false;
    searchButton.addEventListener('click', applySiteSearch);
    siteSearch.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        applySiteSearch();
      }
    });
    search.addEventListener('input', () => { siteSearch.value = search.value; });
  }

  document.querySelector('[data-reset-products]')?.addEventListener('click', () => {
    search.value = '';
    category.value = '';
    sort.value = 'default';
    search.dispatchEvent(new Event('input', { bubbles: true }));
  });

  // Bắt sự kiện trên vùng danh sách để nút mới sau khi lọc vẫn hoạt động.
  list.addEventListener('click', (event) => {
    const button = event.target.closest('[data-add-product]');
    if (!button || !list.contains(button) || button.disabled) return;
    const result = addSingle(button.dataset.addProduct, 1);
    if (feedback) {
      const product = products.find((item) => item.id === button.dataset.addProduct);
      feedback.textContent = result.ok
        ? `Đã thêm ${product.name} vào giỏ.`
        : result.message;
    }
  });

  const anchor = document.getElementById(location.hash.slice(1));
  if (anchor) anchor.scrollIntoView();
}

initProductsPage();
