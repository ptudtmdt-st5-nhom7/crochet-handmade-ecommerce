import { products } from './products.js';
import { fetchProductCards } from './product-api.js';
import { renderProducts } from './product-list.js';
import { initProductFilters } from './product-filters.js';
import { addSingle, updateCartBadge } from './cart.js';

export function initProductsPage() {
  const list = document.querySelector('[data-products-list]');
  if (!list || list.dataset.productsPageReady === 'true') return;

  // Chỉ khởi tạo một lần; render lại danh sách không gắn thêm sự kiện.
  list.dataset.productsPageReady = 'true';
  const parameters = new URLSearchParams(location.search);
  const useStaticCatalog = location.hostname.endsWith('.github.io') || parameters.get('catalog') === 'static';
  updateCartBadge();

  const search = document.querySelector('[data-product-search]');
  const category = document.querySelector('[data-category-filter]');
  const sort = document.querySelector('[data-sort-select]');
  const siteSearch = document.getElementById('site-search');
  const searchButton = document.querySelector('[data-site-search-button]');
  const feedback = document.querySelector('[data-cart-feedback]');
  const status = document.querySelector('[data-products-status]');
  const retry = document.querySelector('[data-retry-products]');
  let sourceProducts = [];
  const initialQuery = parameters.get('q');
  if (initialQuery !== null) search.value = initialQuery;
  if (siteSearch) siteSearch.value = search.value;

  const applySiteSearch = () => {
    search.value = siteSearch.value;
    search.dispatchEvent(new Event('input', { bubbles: true }));
  };
  if (siteSearch && searchButton) {
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
    const product = sourceProducts.find((item) => item.id === button.dataset.addProduct);
    if (!product || product.cartAvailable === false || product.stockDemo < 1) return;
    const result = addSingle(button.dataset.addProduct, 1);
    if (feedback) {
      feedback.textContent = result.ok
        ? `Đã thêm ${product.name} vào giỏ.`
        : result.message;
    }
  });

  function showProducts() {
    list.setAttribute('aria-busy', 'false');
    if (searchButton) searchButton.disabled = false;
    initProductFilters({
      products: sourceProducts,
      renderProducts: (filtered, options) => renderProducts(filtered, {
        ...options,
        emptyMessage: sourceProducts.length === 0 ? 'Hiện chưa có sản phẩm.' : undefined,
      }),
      cartReady: true,
      detailReady: true,
    });
    const anchor = document.getElementById(location.hash.slice(1));
    if (anchor) anchor.scrollIntoView();
  }

  async function loadProducts() {
    status.textContent = 'Đang tải sản phẩm…';
    retry.hidden = true;
    list.setAttribute('aria-busy', 'true');
    try {
      sourceProducts = await fetchProductCards();
    } catch {
      status.textContent = 'Không tải được danh sách sản phẩm. Vui lòng thử lại.';
      retry.hidden = false;
      list.setAttribute('aria-busy', 'false');
      return;
    }

    const categories = new Map(sourceProducts.map(product => [product.category, product.categoryLabel]));
    category.length = 1; // Giữ lựa chọn “Tất cả danh mục”.
    for (const [id, label] of categories) {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = label;
      category.append(option);
    }
    status.textContent = '';
    showProducts();
  }

  if (useStaticCatalog) {
    sourceProducts = products;
    if (status) status.textContent = 'Bạn đang xem dữ liệu sản phẩm mẫu.';
    const summary = document.querySelector('[data-static-product-summary]');
    if (summary) summary.hidden = false;
    showProducts();
  } else {
    retry.addEventListener('click', loadProducts);
    return loadProducts();
  }
}

initProductsPage();
