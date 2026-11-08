import test, { beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import {
  CART_STORAGE_KEY, GIFT_DRAFT_STORAGE_KEY,
  loadCart, saveCart, loadGiftDraft, saveGiftDraft, clearGiftDraft,
} from '../js/storage.js';

const originalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
const originalWarn = console.warn;
let memory, warnings;
const cart = () => ({ version: 1, lines: [
  { lineId: 'single:KC-001', type: 'single', productId: 'KC-001', quantity: 2 },
  { lineId: 'gift:HL-001=1|KC-001=1', type: 'gift', giftSetId: 'GIFT-01',
    name: 'Món quà nhỏ', budget: 100000,
    items: [{ productId: 'KC-001', quantity: 1 }, { productId: 'HL-001', quantity: 1 }], setQuantity: 2 },
] });
const draft = () => ({ version: 1, budget: 100000, sourceGiftSetId: 'GIFT-01', name: 'Món quà nhỏ',
  items: [{ productId: 'KC-001', quantity: 1 }], setQuantity: 1,
  copiedFromLineId: 'gift:HL-001=1|KC-001=1' });

beforeEach(() => {
  memory = new Map(); warnings = [];
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: (key) => memory.get(key) ?? null,
    setItem: (key, value) => memory.set(key, String(value)),
    removeItem: (key) => memory.delete(key),
  } });
  console.warn = (...args) => warnings.push(args);
});
after(() => {
  console.warn = originalWarn;
  if (originalStorage) Object.defineProperty(globalThis, 'localStorage', originalStorage);
  else delete globalThis.localStorage;
});

test('chưa có dữ liệu: giỏ rỗng mới và bản soạn null', () => {
  const first = loadCart(); first.lines.push({});
  assert.deepEqual(loadCart(), { version: 1, lines: [] });
  assert.equal(loadGiftDraft(), null); assert.equal(warnings.length, 0);
});
test('khôi phục nguyên hàng lẻ, nhóm bộ, số món và số bộ', () => {
  assert.equal(saveCart(cart()).ok, true);
  assert.deepEqual(loadCart(), cart());
  assert.equal(memory.size, 1);
});
test('đọc lại không dùng tham chiếu chung hoặc bộ nhớ cache', () => {
  const input = cart(); saveCart(input); input.lines[1].items[0].quantity = 99;
  const read = loadCart(); read.lines[1].items[0].quantity = 88;
  assert.deepEqual(loadCart(), cart());
  memory.set(CART_STORAGE_KEY, JSON.stringify({ version: 1, lines: [] }));
  assert.equal(loadCart().lines.length, 0);
});
test('lưu bản nhân bản không sửa dòng gốc hay tự thêm giỏ', () => {
  saveCart(cart()); const copy = draft(); saveGiftDraft(copy);
  copy.items[0].quantity = 9;
  assert.equal(loadGiftDraft().items[0].quantity, 1);
  assert.deepEqual(loadCart(), cart());
});
test('hai khóa riêng; xóa bản soạn không xóa giỏ hoặc khóa khác', () => {
  saveCart(cart()); saveGiftDraft(draft()); memory.set('other', 'keep');
  assert.equal(clearGiftDraft().ok, true); assert.equal(loadGiftDraft(), null);
  assert.deepEqual(loadCart(), cart()); assert.equal(memory.get('other'), 'keep');
});
test('bản đang chỉnh được rỗng và chưa nhập ngân sách', () => {
  const editing = { version: 1, budget: null, sourceGiftSetId: null, name: '', items: [], setQuantity: 1, copiedFromLineId: null };
  assert.equal(saveGiftDraft(editing).ok, true); assert.deepEqual(loadGiftDraft(), editing);
});
for (const [label, raw] of [['JSON hỏng', '{bad'], ['sai phiên bản', '{"version":2,"lines":[]}'], ['sai lines', '{"version":1,"lines":{}}'], ['null', 'null']]) {
  test(`dữ liệu giỏ ${label}: không ném lỗi, trả mặc định và giữ dữ liệu để kiểm tra`, () => {
    memory.set(CART_STORAGE_KEY, raw);
    assert.deepEqual(loadCart(), { version: 1, lines: [] });
    assert.equal(memory.get(CART_STORAGE_KEY), raw); assert.equal(warnings.length, 1);
  });
}
test('bản soạn hỏng trả null và không xóa giỏ', () => {
  saveCart(cart()); memory.set(GIFT_DRAFT_STORAGE_KEY, '{bad');
  assert.equal(loadGiftDraft(), null); assert.deepEqual(loadCart(), cart());
});
for (const quantity of [0, -1, 1.5, '2', Infinity, Number.MAX_SAFE_INTEGER + 1]) {
  test(`từ chối số lượng sai ${String(quantity)}, giữ giỏ đã lưu`, () => {
    saveCart(cart()); const bad = cart(); bad.lines[0].quantity = quantity;
    assert.equal(saveCart(bad).ok, false); assert.deepEqual(loadCart(), cart());
  });
}
test('từ chối bộ trống, dòng trùng, kiểu dòng lạ, số bộ sai và mã trống', () => {
  saveCart(cart());
  const cases = [cart(), cart(), cart(), cart(), cart()];
  cases[0].lines[1].items = [];
  cases[1].lines.push({ ...cases[1].lines[0] });
  cases[2].lines[0].type = 'unknown';
  cases[3].lines[1].setQuantity = 0;
  cases[4].lines[0].productId = '';
  for (const bad of cases) assert.equal(saveCart(bad).ok, false);
  assert.deepEqual(loadCart(), cart());
});
test('không lưu giá/tổng tiền; tính giá và lượng tồn thuộc module nghiệp vụ', () => {
  const input = cart(); input.totalAmount = 1; input.lines[0].price = 1;
  saveCart(input); assert.deepEqual(loadCart(), cart());
  input.lines[0].productId = 'MA-CHUA-CO-TRONG-CATALOG';
  assert.equal(saveCart(input).ok, true); // Module giỏ phải kiểm tra với products.
});
test('bản soạn sai dữ liệu không ghi đè bản tốt', () => {
  saveGiftDraft(draft()); const bad = draft(); bad.budget = -1;
  assert.equal(saveGiftDraft(bad).ok, false); assert.deepEqual(loadGiftDraft(), draft());
});
test('lỗi dung lượng khi ghi: trả ok false, giữ giỏ trước đó', () => {
  saveCart(cart()); globalThis.localStorage.setItem = () => { throw new Error('QuotaExceededError'); };
  assert.equal(saveCart({ version: 1, lines: [] }).ok, false);
  assert.deepEqual(loadCart(), cart());
});
test('bị chặn truy cập localStorage: đọc mặc định, lưu/xóa báo lỗi', () => {
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('SecurityError'); } });
  assert.deepEqual(loadCart(), { version: 1, lines: [] }); assert.equal(loadGiftDraft(), null);
  assert.equal(saveCart(cart()).ok, false); assert.equal(saveGiftDraft(draft()).ok, false);
  assert.equal(clearGiftDraft().ok, false);
});
test('lỗi xóa bản soạn không báo thành công và giữ dữ liệu', () => {
  saveGiftDraft(draft()); globalThis.localStorage.removeItem = () => { throw new Error('SecurityError'); };
  assert.equal(clearGiftDraft().ok, false); assert.deepEqual(loadGiftDraft(), draft());
});
