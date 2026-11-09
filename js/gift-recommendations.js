import { giftSets } from './gift-sets.js';
import { getItemsTotal, getProductById, formatPrice } from './product-utils.js';

/**
 * Gợi ý các bộ quà tặng (gift sets) có tổng giá không vượt quá ngân sách cho MỘT bộ.
 * @param {number} budget - Ngân sách tối đa (số nguyên dương VND)
 * @returns {Array} Mảng các bộ quà thỏa mãn điều kiện
 */
export function recommendGiftSets(budget) {
  // Kiểm tra ngân sách hợp lệ: phải là số nguyên dương an toàn
  if (!Number.isSafeInteger(budget) || budget <= 0) {
    return [];
  }

  const recommendations = [];

  for (const giftSet of giftSets) {
    try {
      // Tính tổng giá 1 bộ quà sử dụng hàm getItemsTotal từ product-utils.js
      const totalPrice = getItemsTotal(giftSet.items);

      // Kiểm tra xem bộ quà có chứa sản phẩm và tổng giá <= ngân sách
      if (totalPrice <= budget && giftSet.items.length > 0) {
        // Kiểm tra tất cả các sản phẩm trong bộ đều tồn tại trong danh mục products
        const isValidSet = giftSet.items.every(item => getProductById(item.productId) !== null);

        if (isValidSet) {
          const remainingBudget = budget - totalPrice;
          recommendations.push({
            id: giftSet.id,
            name: giftSet.name,
            items: giftSet.items.map(item => ({ ...item, product: getProductById(item.productId) })),
            totalPrice,
            formattedTotalPrice: formatPrice(totalPrice),
            remainingBudget,
            formattedRemainingBudget: formatPrice(remainingBudget),
            allowedProductIds: giftSet.allowedProductIds || []
          });
        }
      }
    } catch (err) {
      // Bỏ qua bộ quà nếu cấu trúc dữ liệu bên trong có lỗi phát sinh
      console.warn(`[Gift Recommendations] Lỗi khi xử lý bộ quà ${giftSet.id}:`, err);
    }
  }

  return recommendations;
}