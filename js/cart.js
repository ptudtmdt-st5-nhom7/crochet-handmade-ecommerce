import { getProductById, getItemsTotal } from './product-utils.js';
import { loadCart, saveCart } from './storage.js';

// storage.js kiểm tra cấu trúc; cart.js đối chiếu mã với catalog hiện tại.
function restoreAvailableCart() {
    const savedCart = loadCart();
    const lines = savedCart.lines.filter((line) => {
        const items = line.type === 'single'
            ? [{ productId: line.productId }]
            : line.items;
        const missingIds = items
            .filter((item) => !getProductById(item.productId))
            .map((item) => item.productId);

        if (missingIds.length === 0) return true;

        // Bỏ nguyên dòng/bộ lỗi, không tách bớt món làm thay cấu hình bộ quà.
        console.warn(
            '[Lenly cart] Bỏ qua dòng có mã sản phẩm không còn trong danh sách:',
            line.lineId,
            missingIds
        );
        return false;
    });

    // Không tự ghi lại/xóa localStorage khi mở trang.
    // Các dòng còn hợp lệ được giữ; chỉ lưu sau thao tác thành công.
    return { version: savedCart.version, lines };
}

let cart = restoreAvailableCart();

function copyData(value) {
    return JSON.parse(JSON.stringify(value));
}

export function getCart() {
    return copyData(cart);
}
const CART_CODES = {
    OK: 'OK',
    INVALID_INPUT: 'INVALID_INPUT',
    NOT_FOUND: 'NOT_FOUND',
    OUT_OF_STOCK: 'OUT_OF_STOCK',
    STORAGE_ERROR: 'STORAGE_ERROR'
};

function createResult(ok, code, message, currentCart = cart) {
    return {
        ok,
        code,
        message,
        cart: copyData(currentCart)
    };
}

function commitCart(nextCart, message) {
    const saved = saveCart(nextCart);

    if (!saved.ok) {
        return createResult(
            false,
            CART_CODES.STORAGE_ERROR,
            saved.message,
            cart
        );
    }

    cart = nextCart;
    updateCartBadge();

    return createResult(
        true,
        CART_CODES.OK,
        message,
        cart
    );
}
function isPositiveInteger(value) {
    return Number.isSafeInteger(value) && value > 0;
}

function addRequiredQuantity(required, productId, quantity) {
    if (!isPositiveInteger(quantity)) {
        throw new TypeError('Số lượng sản phẩm phải là số nguyên dương.');
    }

    const currentQuantity = required.get(productId) ?? 0;
    const newQuantity = currentQuantity + quantity;

    if (!Number.isSafeInteger(newQuantity)) {
        throw new RangeError('Tổng số lượng vượt giới hạn an toàn.');
    }

    required.set(productId, newQuantity);
}

function validateCartStock(candidateCart) {
    try {
        const required = new Map();

        for (const line of candidateCart.lines) {
            if (line.type === 'single') {
                addRequiredQuantity(
                    required,
                    line.productId,
                    line.quantity
                );
                continue;
            }

            if (line.type === 'gift') {
                for (const item of line.items) {
                    const quantityInAllSets =
                        item.quantity * line.setQuantity;

                    if (!Number.isSafeInteger(quantityInAllSets)) {
                        throw new RangeError(
                            'Tổng số lượng trong bộ quà vượt giới hạn an toàn.'
                        );
                    }

                    addRequiredQuantity(
                        required,
                        item.productId,
                        quantityInAllSets
                    );
                }

                continue;
            }

            throw new TypeError('Loại dòng giỏ hàng không hợp lệ.');
        }

        for (const [productId, quantity] of required) {
            const product = getProductById(productId);

            if (!product) {
                return {
                    ok: false,
                    code: CART_CODES.NOT_FOUND,
                    message: `Không tìm thấy sản phẩm ${productId}.`
                };
            }

            if (quantity > product.stockDemo) {
                return {
                    ok: false,
                    code: CART_CODES.OUT_OF_STOCK,
                    message:
                        `${product.name} chỉ còn lượng minh họa ` +
                        `${product.stockDemo}, nhưng giỏ cần ${quantity}.`
                };
            }
        }

        return {
            ok: true,
            code: CART_CODES.OK,
            message: 'Số lượng trong giỏ hợp lệ.'
        };
    } catch (error) {
        return {
            ok: false,
            code: CART_CODES.INVALID_INPUT,
            message: error.message
        };
    }
}
export function addSingle(productId, quantity = 1) {
    if (
        typeof productId !== 'string' ||
        productId.trim().length === 0 ||
        !isPositiveInteger(quantity)
    ) {
        return createResult(
            false,
            CART_CODES.INVALID_INPUT,
            'Mã sản phẩm và số lượng mua không hợp lệ.'
        );
    }

    const product = getProductById(productId);

    if (!product) {
        return createResult(
            false,
            CART_CODES.NOT_FOUND,
            `Không tìm thấy sản phẩm ${productId}.`
        );
    }

    const nextCart = copyData(cart);
    const lineId = `single:${productId}`;

    const existingLine = nextCart.lines.find(
        (line) => line.lineId === lineId
    );

    if (existingLine) {
        const newQuantity = existingLine.quantity + quantity;

        if (!Number.isSafeInteger(newQuantity)) {
            return createResult(
                false,
                CART_CODES.INVALID_INPUT,
                'Tổng số lượng sản phẩm vượt giới hạn an toàn.'
            );
        }

        existingLine.quantity = newQuantity;
    } else {
        nextCart.lines.push({
            lineId,
            type: 'single',
            productId,
            quantity
        });
    }

    const stockResult = validateCartStock(nextCart);

    if (!stockResult.ok) {
        return createResult(
            false,
            stockResult.code,
            stockResult.message
        );
    }

    return commitCart(
        nextCart,
        `Đã thêm ${product.name} vào giỏ.`
    );
}
function normalizeGiftItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return {
      ok: false,
      code: CART_CODES.INVALID_INPUT,
      message: 'Bộ quà phải có ít nhất một sản phẩm.'
    };
  }

  const quantityByProductId = new Map();

  for (const item of items) {
    if (
      !item ||
      typeof item.productId !== 'string' ||
      item.productId.trim().length === 0 ||
      !isPositiveInteger(item.quantity)
    ) {
      return {
        ok: false,
        code: CART_CODES.INVALID_INPUT,
        message: 'Mã hoặc số lượng sản phẩm trong bộ không hợp lệ.'
      };
    }

    const product = getProductById(item.productId);

    if (!product) {
      return {
        ok: false,
        code: CART_CODES.NOT_FOUND,
        message: `Không tìm thấy sản phẩm ${item.productId}.`
      };
    }

    const currentQuantity =
      quantityByProductId.get(item.productId) ?? 0;

    const newQuantity = currentQuantity + item.quantity;

    if (!Number.isSafeInteger(newQuantity)) {
      return {
        ok: false,
        code: CART_CODES.INVALID_INPUT,
        message: 'Tổng số lượng trong bộ vượt giới hạn an toàn.'
      };
    }

    quantityByProductId.set(
      item.productId,
      newQuantity
    );
  }

  const normalizedItems = Array.from(
    quantityByProductId,
    ([productId, quantity]) => ({
      productId,
      quantity
    })
  ).sort((firstItem, secondItem) =>
    firstItem.productId.localeCompare(secondItem.productId)
  );

  return {
    ok: true,
    code: CART_CODES.OK,
    message: 'Cấu hình bộ quà hợp lệ.',
    items: normalizedItems
  };
}

function createGiftLineId(items) {
  const configuration = items
    .map((item) => `${item.productId}=${item.quantity}`)
    .join('|');

  return `gift:${configuration}`;
}
export function addGiftSet(selection) {
  if (
    !selection ||
    typeof selection !== 'object' ||
    Array.isArray(selection)
  ) {
    return createResult(
      false,
      CART_CODES.INVALID_INPUT,
      'Thông tin bộ quà không hợp lệ.'
    );
  }

  const {
    giftSetId,
    name,
    budget,
    items,
    setQuantity = 1
  } = selection;

  if (
    typeof giftSetId !== 'string' ||
    giftSetId.trim().length === 0 ||
    typeof name !== 'string' ||
    name.trim().length === 0 ||
    !isPositiveInteger(budget) ||
    !isPositiveInteger(setQuantity)
  ) {
    return createResult(
      false,
      CART_CODES.INVALID_INPUT,
      'Mã bộ, tên, ngân sách hoặc số bộ không hợp lệ.'
    );
  }

  const normalizedResult = normalizeGiftItems(items);

  if (!normalizedResult.ok) {
    return createResult(
      false,
      normalizedResult.code,
      normalizedResult.message
    );
  }

  const normalizedItems = normalizedResult.items;

  try {
    getItemsTotal(normalizedItems);
  } catch (error) {
    return createResult(
      false,
      CART_CODES.INVALID_INPUT,
      error.message
    );
  }

  const nextCart = copyData(cart);
  const lineId = createGiftLineId(normalizedItems);

  const existingLine = nextCart.lines.find(
    (line) => line.lineId === lineId
  );

  if (existingLine) {
    const newSetQuantity =
      existingLine.setQuantity + setQuantity;

    if (!Number.isSafeInteger(newSetQuantity)) {
      return createResult(
        false,
        CART_CODES.INVALID_INPUT,
        'Tổng số bộ quà vượt giới hạn an toàn.'
      );
    }

    existingLine.setQuantity = newSetQuantity;
  } else {
    nextCart.lines.push({
      lineId,
      type: 'gift',
      giftSetId,
      name,
      budget,
      items: normalizedItems,
      setQuantity
    });
  }

  const stockResult = validateCartStock(nextCart);

  if (!stockResult.ok) {
    return createResult(
      false,
      stockResult.code,
      stockResult.message
    );
  }

  return commitCart(
    nextCart,
    `Đã thêm bộ quà ${name} vào giỏ.`
  );
}
export function setSingleQuantity(lineId, quantity) {
  if (
    typeof lineId !== 'string' ||
    lineId.trim().length === 0 ||
    !isPositiveInteger(quantity)
  ) {
    return createResult(
      false,
      CART_CODES.INVALID_INPUT,
      'Mã dòng hoặc số lượng sản phẩm không hợp lệ.'
    );
  }

  const nextCart = copyData(cart);

  const line = nextCart.lines.find(
    (cartLine) =>
      cartLine.lineId === lineId &&
      cartLine.type === 'single'
  );

  if (!line) {
    return createResult(
      false,
      CART_CODES.NOT_FOUND,
      'Không tìm thấy dòng sản phẩm mua lẻ.'
    );
  }

  line.quantity = quantity;

  const stockResult = validateCartStock(nextCart);

  if (!stockResult.ok) {
    return createResult(
      false,
      stockResult.code,
      stockResult.message
    );
  }

  return commitCart(
    nextCart,
    'Đã cập nhật số lượng sản phẩm.'
  );
}

export function setGiftQuantity(lineId, setQuantity) {
  if (
    typeof lineId !== 'string' ||
    lineId.trim().length === 0 ||
    !isPositiveInteger(setQuantity)
  ) {
    return createResult(
      false,
      CART_CODES.INVALID_INPUT,
      'Mã dòng hoặc số bộ quà không hợp lệ.'
    );
  }

  const nextCart = copyData(cart);

  const line = nextCart.lines.find(
    (cartLine) =>
      cartLine.lineId === lineId &&
      cartLine.type === 'gift'
  );

  if (!line) {
    return createResult(
      false,
      CART_CODES.NOT_FOUND,
      'Không tìm thấy nhóm bộ quà.'
    );
  }

  line.setQuantity = setQuantity;

  const stockResult = validateCartStock(nextCart);

  if (!stockResult.ok) {
    return createResult(
      false,
      stockResult.code,
      stockResult.message
    );
  }

  return commitCart(
    nextCart,
    'Đã cập nhật số lượng bộ quà.'
  );
}
export function removeCartLine(lineId) {
  if (
    typeof lineId !== 'string' ||
    lineId.trim().length === 0
  ) {
    return createResult(
      false,
      CART_CODES.INVALID_INPUT,
      'Mã dòng giỏ hàng không hợp lệ.'
    );
  }

  const nextCart = copyData(cart);

  const lineIndex = nextCart.lines.findIndex(
    (line) => line.lineId === lineId
  );

  if (lineIndex === -1) {
    return createResult(
      false,
      CART_CODES.NOT_FOUND,
      'Không tìm thấy dòng cần xóa trong giỏ.'
    );
  }

  nextCart.lines.splice(lineIndex, 1);

  return commitCart(
    nextCart,
    'Đã xóa sản phẩm khỏi giỏ.'
  );
}
export function getCartSummary() {
  let totalQuantity = 0;
  let totalAmount = 0;
  let totalSets = 0;

  for (const line of cart.lines) {
    if (line.type === 'single') {
      const product = getProductById(line.productId);

      if (!product) {
        throw new Error(
          `Không tìm thấy sản phẩm ${line.productId}.`
        );
      }

      totalQuantity += line.quantity;
      totalAmount += product.price * line.quantity;
      continue;
    }

    if (line.type === 'gift') {
      const itemsPerSet = line.items.reduce(
        (total, item) => total + item.quantity,
        0
      );

      const unitAmount = getItemsTotal(line.items);

      totalQuantity +=
        itemsPerSet * line.setQuantity;

      totalAmount +=
        unitAmount * line.setQuantity;

      totalSets += line.setQuantity;
    }
  }

  if (
    !Number.isSafeInteger(totalQuantity) ||
    !Number.isSafeInteger(totalAmount) ||
    !Number.isSafeInteger(totalSets)
  ) {
    throw new RangeError(
      'Tổng giỏ hàng vượt giới hạn an toàn.'
    );
  }

  return {
    totalQuantity,
    totalAmount,
    totalSets
  };
}

export function updateCartBadge() {
  const { totalQuantity } = getCartSummary();

  if (typeof document === 'undefined') {
    return totalQuantity;
  }

  const badges = document.querySelectorAll(
    '[data-cart-count]'
  );

  for (const badge of badges) {
    badge.textContent = String(totalQuantity);
  }

  return totalQuantity;
}