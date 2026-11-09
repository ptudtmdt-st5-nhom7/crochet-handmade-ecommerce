import { formatPrice, getProductDetailUrl } from './product-utils.js';

/**
 * Render vào [data-products-list] có sẵn, không gắn sự kiện hoặc tự chạy.
 * options là tùy chọn: 2A chưa nhận cart nên nút thêm giỏ hiển thị disabled.
 * 2B gọi với cartReady: true sau khi nối addSingle; detailReady: true
 * chỉ sau khi trang chi tiết của Khanh đã đọc và hiển thị đúng id.
 */
export function renderProducts(list, { cartReady = false, detailReady = false } = {}) {
  if (!Array.isArray(list)) throw new TypeError('Danh sách sản phẩm phải là mảng.');
  const container = document.querySelector('[data-products-list]');
  if (!container) throw new Error('Không tìm thấy vùng data-products-list.');
  const fragment = document.createDocumentFragment();
  const categories = new Set();
  for (const product of list) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    // Giữ điểm đến các liên kết danh mục từ trang chủ/giới thiệu.
    if (!categories.has(product.category)) {
      card.id = product.category;
      categories.add(product.category);
    }
    const image = document.createElement('img');
    image.className = 'product-card-image';
    image.src = product.image;
    image.alt = product.name;
    const content = document.createElement('div');
    content.className = 'product-card-content';
    for (const [tag, className, text] of [
      ['p', 'product-code', product.id],
      ['h2', 'product-name', product.name],
      ['p', 'product-price', formatPrice(product.price)],
    ]) {
      const element = document.createElement(tag);
      element.className = className;
      element.textContent = text;
      content.append(element);
    }
    const detail = document.createElement('a');
    detail.className = 'button button-secondary';
    detail.href = getProductDetailUrl(product.id, { detailReady });
    detail.textContent = 'Xem chi tiết';
    detail.setAttribute('aria-label', 'Xem chi tiết ' + product.name);
    const add = document.createElement('button');
    add.type = 'button';
    add.className = 'button button-primary';
    add.dataset.addProduct = product.id;
    add.textContent = 'Thêm vào giỏ';
    add.disabled = !cartReady || product.stockDemo < 1;
    add.setAttribute('aria-label', 'Thêm ' + product.name + ' vào giỏ');
    if (!cartReady) add.setAttribute('aria-describedby', 'products-integration-note');
    content.append(detail, add);
    card.append(image, content);
    fragment.append(card);
  }
  if (list.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'products-empty';
    empty.setAttribute('role', 'status');
    empty.textContent = 'Không có sản phẩm phù hợp.';
    fragment.append(empty);
  }
  container.replaceChildren(fragment);
  const count = document.querySelector('[data-products-count]');
  if (count) count.textContent = 'Hiển thị ' + list.length + ' sản phẩm.';
  return list.length;
}
