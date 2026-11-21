import { getProductById } from './product-utils.js';

const validProductId = /^[A-Z]{2}-[0-9]{3}$/;
const validCategory = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const validImage = /^images\/(?:[a-z0-9_-]+\/)*[a-z0-9_.-]+\.(?:webp|png|jpe?g|avif)$/i;

function isNonNegativeInteger(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

function toProductCard(product) {
  if (!product || typeof product.id !== 'string' || !validProductId.test(product.id)
    || typeof product.name !== 'string' || !product.name.trim()
    || typeof product.category !== 'string' || !validCategory.test(product.category)
    || typeof product.categoryLabel !== 'string' || !product.categoryLabel.trim()
    || typeof product.image !== 'string' || !validImage.test(product.image)
    || !Array.isArray(product.variants) || product.variants.length === 0) {
    throw new Error('Sản phẩm API không đúng định dạng.');
  }

  // DA05.2 hiển thị một biến thể, ưu tiên biến thể mặc định từ dữ liệu mẫu.
  const defaultId = product.id + '-DEFAULT';
  const variant = product.variants.find(item => item?.id === defaultId) ?? product.variants[0];
  if (!variant || typeof variant.id !== 'string' || !variant.id
    || !isNonNegativeInteger(variant.price) || !isNonNegativeInteger(variant.stockQuantity)) {
    throw new Error('Biến thể API không đúng định dạng.');
  }

  const legacy = getProductById(product.id);
  // Chi tiết và giỏ cũ chưa đọc API. Chỉ nối khi cùng mặt hàng và cùng giá.
  const detailAvailable = Boolean(legacy && variant.id === defaultId
    && legacy.name === product.name && legacy.price === variant.price);
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    categoryLabel: product.categoryLabel,
    image: product.image,
    price: variant.price,
    stockDemo: variant.stockQuantity,
    detailAvailable,
    cartAvailable: detailAvailable && legacy.stockDemo === variant.stockQuantity,
  };
}

export async function fetchProductCards() {
  const response = await fetch('./api/products', {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error('Không tải được sản phẩm.');
  const payload = await response.json();
  if (!Array.isArray(payload?.data)) throw new Error('Danh sách API không đúng định dạng.');
  const cards = payload.data.map(toProductCard);
  if (new Set(cards.map(card => card.id)).size !== cards.length) {
    throw new Error('Danh sách API có mã sản phẩm trùng.');
  }
  return cards;
}
