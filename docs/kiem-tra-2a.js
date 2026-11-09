import { products } from '../js/products.js';
import { giftSets } from '../js/gift-sets.js';
import { getProductById, getItemsTotal, formatPrice } from '../js/product-utils.js';
import { renderProducts } from '../js/product-list.js';

const results = document.querySelector('[data-test-results]');
function check(name, test) {
  const row = document.createElement('li');
  try {
    if (!test()) throw new Error('Kết quả khác mong đợi');
    row.textContent = 'ĐẠT — ' + name;
  } catch (error) {
    row.textContent = 'LỖI — ' + name + ': ' + error.message;
  }
  results.append(row);
}
// Đường dẫn trong catalog tính từ gốc website; trang thử ở docs dùng base để
// trình duyệt tải đúng ảnh và link, không thay đổi catalog hoặc hàm render.
const base = document.createElement('base');
base.href = new URL('../', location.href).href;
document.head.append(base);

check('Có đúng tám sản phẩm và không trùng mã', () => products.length === 8 && new Set(products.map(p => p.id)).size === 8);
check('Tra đúng mã KC-001, sai mã trả null', () => getProductById('KC-001').price === 45000 && getProductById('SAI') === null);
check('Tổng ba bộ là 80.000 / 150.000 / 129.000 đồng', () => JSON.stringify(giftSets.map(g => getItemsTotal(g.items))) === '[80000,150000,129000]');
check('Bộ rỗng có tổng 0', () => getItemsTotal([]) === 0);
check('Mã sai bị từ chối', () => {
  try { getItemsTotal([{ productId: 'SAI', quantity: 1 }]); return false; }
  catch { return true; }
});
check('Số lượng 0 bị từ chối', () => {
  try { getItemsTotal([{ productId: 'KC-001', quantity: 0 }]); return false; }
  catch { return true; }
});
check('Render rỗng có thông báo, không còn thẻ cũ', () => {
  renderProducts([]);
  return document.querySelector('[data-products-list]').textContent.includes('Không có sản phẩm phù hợp.')
    && document.querySelectorAll('[data-products-list] article').length === 0;
});
check('Render lại không nhân đôi thẻ; đủ tám link đúng mã', () => {
  renderProducts(products); renderProducts(products);
  const links = [...document.querySelectorAll('[data-products-list] a')];
  return links.length === 8 && links.every((a, i) => a.getAttribute('href') === 'product-detail.html?id=' + products[i].id);
});
for (const gift of giftSets) {
  const li = document.createElement('li');
  li.textContent = gift.id + ' — ' + gift.name + ': ' + formatPrice(getItemsTotal(gift.items));
  document.querySelector('[data-gift-examples]').append(li);
}
const images = [...document.querySelectorAll('[data-products-list] img')];
await Promise.all(images.map(img => img.decode().catch(() => {})));
check('Tám ảnh tải thành công qua HTTP', () => images.length === 8 && images.every(img => img.naturalWidth > 0));
document.querySelector('[data-test-empty]').addEventListener('click', () => renderProducts([]));
document.querySelector('[data-test-restore]').addEventListener('click', () => renderProducts(products));
