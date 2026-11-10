import { products } from './products.js';

/** Mã không tồn tại hoặc sai kiểu trả null; không tự sửa mã người gọi. */
export function getProductById(id) {
  return products.find((product) => product.id === id) ?? null;
}

/** Trang động đã ghép; detailReady: false chỉ dành cho bản tĩnh lịch sử. */
export function getProductDetailUrl(id, { detailReady = true } = {}) {
  if (!getProductById(id)) throw new RangeError('Mã sản phẩm không tồn tại.');
  if (detailReady || id === 'TL-001') {
    return 'product-detail.html?id=' + encodeURIComponent(id);
  }
  return 'pages/product-details/product-' + id.toLowerCase() + '.html';
}

/**
 * Giá tiền của các món trong MỘT bộ, không nhân số bộ.
 * Mã lặp được cộng đủ; không sửa items, products hay stockDemo.
 * Bộ rỗng trả 0; sai cấu trúc/mã/số lượng ném lỗi cho UI xử lý.
 */
export function getItemsTotal(items) {
  if (!Array.isArray(items)) throw new TypeError('Danh sách món phải là mảng.');
  let total = 0;
  for (const item of items) {
    if (!item || !Number.isSafeInteger(item.quantity) || item.quantity <= 0) {
      throw new TypeError('Số lượng mỗi món phải là số nguyên dương an toàn.');
    }
    const product = getProductById(item.productId);
    if (!product) throw new RangeError('Mã sản phẩm không tồn tại.');
    if (!Number.isSafeInteger(product.price) || product.price < 0) {
      throw new RangeError('Giá sản phẩm không hợp lệ.');
    }
    total += product.price * item.quantity;
    if (!Number.isSafeInteger(total)) throw new RangeError('Tổng tiền vượt giới hạn an toàn.');
  }
  return total;
}

export function formatPrice(value) {
  if (!Number.isSafeInteger(value) || value < 0) throw new RangeError('Giá tiền không hợp lệ.');
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}
