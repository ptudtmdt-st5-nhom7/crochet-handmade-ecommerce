import { giftSets } from './gift-sets.js';
import { getItemsTotal, getProductById, formatPrice } from './product-utils.js';

/**
 * Gợi ý các bộ quà tặng (gift sets) có tổng giá không vượt quá ngân sách cho MỘT bộ
 * và đủ số lượng hàng mẫu (stockDemo) cho từng sản phẩm trong bộ.
 * Kết quả được sắp xếp theo giá một bộ (unitTotal) tăng dần; nếu cùng giá thì sắp theo mã bộ (giftSetId).
 *
 * @param {number} budget - Ngân sách tối đa cho một bộ (số nguyên dương VND)
 * @returns {Array} Mảng các bộ quà thỏa mãn điều kiện ({ giftSetId, name, items, unitTotal, remainingBudget, ... })
 */
export function recommendGiftSets(budget) {
  // Kiểm tra ngân sách hợp lệ: phải là số nguyên dương an toàn
  if (!Number.isSafeInteger(budget) || budget <= 0) {
    return [];
  }

  const recommendations = [];

  for (const giftSet of giftSets) {
    try {
      if (!giftSet || !Array.isArray(giftSet.items) || giftSet.items.length === 0) {
        continue;
      }

      // 1. Tính tổng giá 1 bộ quà sử dụng hàm getItemsTotal từ product-utils.js
      const unitTotal = getItemsTotal(giftSet.items);

      // 2. Kiểm tra điều kiện giá một bộ không vượt ngân sách
      if (unitTotal > budget) {
        continue;
      }

      // 3. Kiểm tra từng sản phẩm tồn tại và đủ lượng hàng mẫu (stockDemo) cho 1 bộ
      // (Cộng dồn số lượng theo productId phòng trường hợp một mã xuất hiện nhiều lần trong bộ)
      const requiredQuantities = new Map();
      let isValidItems = true;

      for (const item of giftSet.items) {
        if (
          !item ||
          typeof item.productId !== 'string' ||
          !Number.isSafeInteger(item.quantity) ||
          item.quantity <= 0
        ) {
          isValidItems = false;
          break;
        }
        requiredQuantities.set(
          item.productId,
          (requiredQuantities.get(item.productId) ?? 0) + item.quantity
        );
      }

      if (!isValidItems) {
        continue;
      }

      let hasEnoughStock = true;
      for (const [productId, requiredQty] of requiredQuantities.entries()) {
        const product = getProductById(productId);
        if (
          !product ||
          !Number.isSafeInteger(product.stockDemo) ||
          product.stockDemo < requiredQty
        ) {
          hasEnoughStock = false;
          break;
        }
      }

      if (!hasEnoughStock) {
        continue;
      }

      const remainingBudget = budget - unitTotal;

      // 4. Đóng gói kết quả theo đúng quy ước tên trường: giftSetId, unitTotal, remainingBudget
      recommendations.push({
        giftSetId: giftSet.id,
        name: giftSet.name,
        items: giftSet.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          product: getProductById(item.productId),
        })),
        unitTotal,
        formattedUnitTotal: formatPrice(unitTotal),
        remainingBudget,
        formattedRemainingBudget: formatPrice(remainingBudget),
        allowedProductIds: Array.isArray(giftSet.allowedProductIds)
          ? [...giftSet.allowedProductIds]
          : [],
      });
    } catch (err) {
      // Bỏ qua bộ quà nếu cấu trúc dữ liệu bên trong có lỗi phát sinh
      console.warn(`[Gift Recommendations] Lỗi khi xử lý bộ quà ${giftSet?.id}:`, err);
    }
  }

  // 5. Sắp xếp theo giá tăng dần (unitTotal); nếu hai bộ cùng giá thì sắp theo mã bộ (giftSetId)
  recommendations.sort((a, b) => {
    if (a.unitTotal !== b.unitTotal) {
      return a.unitTotal - b.unitTotal;
    }
    return String(a.giftSetId).localeCompare(String(b.giftSetId));
  });

  return recommendations;
}