/**
 * Lưu trữ dùng chung Buổi 3 — Đức phụ trách.
 * Chỉ lưu/đọc dữ liệu, không sửa HTML, tính giá hoặc kiểm tra tồn kho.
 * Cách dùng và dữ liệu mẫu: docs/ban-giao-ban-nen-buoi3.md.
 */
export const CART_STORAGE_KEY = 'lenly.cart.v1';
export const GIFT_DRAFT_STORAGE_KEY = 'lenly.giftDraft.v1';

const emptyCart = () => ({ version: 1, lines: [] });
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const isText = (value) => typeof value === 'string' && value.trim().length > 0;
const isQuantity = (value) => Number.isSafeInteger(value) && value > 0;
const isBudget = (value) => Number.isSafeInteger(value) && value > 0;

function check(condition, message) {
  if (!condition) throw new Error(message);
}

function copyItems(items, allowEmpty = false) {
  check(Array.isArray(items) && (allowEmpty || items.length > 0), 'Danh sách sản phẩm không hợp lệ.');
  return items.map((item) => {
    check(isObject(item) && isText(item.productId) && isQuantity(item.quantity),
      'Mã hoặc số lượng sản phẩm không hợp lệ.');
    return { productId: item.productId, quantity: item.quantity };
  });
}

function copyCart(cart) {
  check(isObject(cart) && cart.version === 1 && Array.isArray(cart.lines), 'Cấu trúc giỏ phải có version: 1 và lines.');
  const lineIds = new Set();
  const lines = cart.lines.map((line) => {
    check(isObject(line) && isText(line.lineId) && !lineIds.has(line.lineId), 'Mã dòng giỏ trống hoặc bị trùng.');
    lineIds.add(line.lineId);
    if (line.type === 'single') {
      check(isText(line.productId) && isQuantity(line.quantity), 'Sản phẩm mua lẻ không hợp lệ.');
      return { lineId: line.lineId, type: 'single', productId: line.productId, quantity: line.quantity };
    }
    check(line.type === 'gift', 'Loại dòng giỏ không hợp lệ.');
    check(isText(line.giftSetId) && isText(line.name) && isBudget(line.budget) && isQuantity(line.setQuantity),
      'Thông tin bộ quà không hợp lệ.');
    return {
      lineId: line.lineId, type: 'gift', giftSetId: line.giftSetId,
      name: line.name, budget: line.budget,
      items: copyItems(line.items), setQuantity: line.setQuantity,
    };
  });
  return { version: 1, lines };
}

function copyDraft(draft) {
  check(isObject(draft) && draft.version === 1, 'Bản đang soạn phải có version: 1.');
  // Bản đang chỉnh có thể chưa nhập ngân sách hoặc đã bỏ hết món.
  // Bảo/Châu vẫn phải kiểm tra đủ điều kiện trước khi xác nhận thêm giỏ.
  check(draft.budget === null || isBudget(draft.budget), 'Ngân sách bản soạn phải là số nguyên dương hoặc null.');
  check(draft.sourceGiftSetId === null || isText(draft.sourceGiftSetId), 'Mã bộ mẫu của bản soạn không hợp lệ.');
  check(typeof draft.name === 'string' && isQuantity(draft.setQuantity), 'Tên hoặc số bộ của bản soạn không hợp lệ.');
  check(draft.copiedFromLineId === null || isText(draft.copiedFromLineId), 'Mã dòng gốc của bản soạn không hợp lệ.');
  return {
    version: 1, budget: draft.budget, sourceGiftSetId: draft.sourceGiftSetId,
    name: draft.name, items: copyItems(draft.items, true),
    setQuantity: draft.setQuantity, copiedFromLineId: draft.copiedFromLineId,
  };
}

function getStorage() {
  // Việc truy cập thuộc tính localStorage cũng có thể bị trình duyệt chặn.
  const storage = globalThis.localStorage;
  check(storage && typeof storage.getItem === 'function' && typeof storage.setItem === 'function'
    && typeof storage.removeItem === 'function', 'Trình duyệt không cung cấp localStorage.');
  return storage;
}

function load(key, validateAndCopy, fallback) {
  try {
    const raw = getStorage().getItem(key);
    if (raw === null) return fallback();
    return validateAndCopy(JSON.parse(raw));
  } catch (error) {
    // Giữ nguyên dữ liệu lỗi để có thể xem trong DevTools; không tự xóa dữ liệu khác.
    console.warn(`[Lenly storage] Không đọc được ${key}; dùng dữ liệu mặc định.`, error);
    return fallback();
  }
}

function save(key, value, validateAndCopy) {
  let serialized;
  try {
    serialized = JSON.stringify(validateAndCopy(value));
  } catch (error) {
    return { ok: false, message: `Dữ liệu chưa được lưu: ${error?.message ?? 'Cấu trúc không hợp lệ.'}` };
  }
  try {
    getStorage().setItem(key, serialized);
    return { ok: true, message: 'Đã lưu dữ liệu.' };
  } catch (error) {
    console.warn(`[Lenly storage] Không lưu được ${key}.`, error);
    return { ok: false, message: 'Không lưu được dữ liệu trong trình duyệt. Kiểm tra quyền lưu trữ hoặc dung lượng, rồi thử lại.' };
  }
}

/** Đọc giỏ mới từ localStorage; không có/hỏng/sai cấu trúc thì trả giỏ rỗng mới. */
export function loadCart() {
  return load(CART_STORAGE_KEY, copyCart, emptyCart);
}

/** Lưu giỏ đã được Bảo kiểm tra nghiệp vụ; trả {ok, message}. */
export function saveCart(cart) {
  return save(CART_STORAGE_KEY, cart, copyCart);
}

/** Đọc bản đang soạn; chưa có/hỏng thì trả null. Không tự thêm vào giỏ. */
export function loadGiftDraft() {
  return load(GIFT_DRAFT_STORAGE_KEY, copyDraft, () => null);
}

/** Lưu riêng bản đang soạn, không thay đổi hoặc thêm dòng vào giỏ. */
export function saveGiftDraft(draft) {
  return save(GIFT_DRAFT_STORAGE_KEY, draft, copyDraft);
}

/** Chỉ xóa bản đang soạn sau xác nhận thành công hoặc khi khách chủ động bỏ. */
export function clearGiftDraft() {
  try {
    getStorage().removeItem(GIFT_DRAFT_STORAGE_KEY);
    return { ok: true, message: 'Đã xóa bản quà đang soạn.' };
  } catch (error) {
    console.warn('[Lenly storage] Không xóa được bản quà đang soạn.', error);
    return { ok: false, message: 'Không xóa được bản quà đang soạn trong trình duyệt.' };
  }
}
