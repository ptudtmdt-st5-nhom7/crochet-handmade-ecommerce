import { products } from './products.js';
import { renderProducts } from './product-list.js';

/**
 * Lọc và sắp xếp danh sách sản phẩm mà không làm thay đổi mảng gốc.
 * @param {Array} list - Mảng sản phẩm ban đầu
 * @param {Object} options - { query, category, sort }
 * @returns {Array} Mảng sản phẩm mới đã lọc và sắp xếp
 */
export function filterAndSortProducts(list, { query = '', category = '', sort = 'default' } = {}) {
  if (!Array.isArray(list)) throw new TypeError('Danh sách sản phẩm phải là mảng.');
  
  // Tạo bản sao để không làm đổi thứ tự mảng gốc (products)
  let result = [...list];

  // 1. Lọc theo tên sản phẩm hoặc mã sản phẩm
  const trimmedQuery = query.trim().toLowerCase();
  if (trimmedQuery) {
    result = result.filter(p => 
      p.name.toLowerCase().includes(trimmedQuery) || 
      p.id.toLowerCase().includes(trimmedQuery)
    );
  }

  // 2. Lọc theo danh mục
  const trimmedCategory = category.trim();
  if (trimmedCategory) {
    result = result.filter(p => p.category === trimmedCategory);
  }

  // 3. Sắp xếp theo giá
  if (sort === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  }
  // 'default' giữ nguyên thứ tự ban đầu

  return result;
}

/**
 * Khởi tạo bộ lọc và gắn sự kiện cho trang danh sách sản phẩm (products.html).
 * @param {Object} param0 - { products, renderProducts, cartReady, detailReady }
 */
export function initProductFilters({ products: sourceProducts = products, renderProducts: render = renderProducts, cartReady = false, detailReady = false } = {}) {
  const searchInput = document.querySelector('[data-product-search]');
  const categorySelect = document.querySelector('[data-category-filter]');
  const sortSelect = document.querySelector('[data-sort-select]');

  if (!searchInput || !categorySelect || !sortSelect) {
    return;
  }

  // Bỏ trạng thái disabled trên fieldset giao diện
  const fieldset = searchInput.closest('fieldset');
  if (fieldset) {
    fieldset.removeAttribute('disabled');
  }

  const handleUpdate = () => {
    const query = searchInput.value;
    const category = categorySelect.value;
    const sort = sortSelect.value;

    const filtered = filterAndSortProducts(sourceProducts, { query, category, sort });
    render(filtered, { cartReady, detailReady });
  };

  searchInput.addEventListener('input', handleUpdate);
  categorySelect.addEventListener('change', handleUpdate);
  sortSelect.addEventListener('change', handleUpdate);

  // Render lần đầu khi khởi tạo
  handleUpdate();
}