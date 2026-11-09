import test from 'node:test';
import assert from 'node:assert/strict';

const memory = new Map();

Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: {
    getItem: (key) => memory.get(key) ?? null,
    setItem: (key, value) =>
      memory.set(key, String(value)),
    removeItem: (key) => memory.delete(key)
  }
});

const {
  getCart,
  addSingle,
  addGiftSet,
  setSingleQuantity,
  setGiftQuantity,
  removeCartLine,
  getCartSummary
} = await import('../js/cart.js');

test('nghiệp vụ chính của giỏ hàng', () => {
  let result = addSingle('KC-001', 2);

  assert.equal(result.ok, true);
  assert.deepEqual(getCartSummary(), {
    totalQuantity: 2,
    totalAmount: 90000,
    totalSets: 0
  });

  const snapshot = getCart();
  snapshot.lines[0].quantity = 99;
  assert.equal(getCart().lines[0].quantity, 2);

  result = addGiftSet({
    giftSetId: 'GIFT-01',
    name: 'Món quà nhỏ',
    budget: 100000,
    items: [
      { productId: 'KC-001', quantity: 1 },
      { productId: 'HL-001', quantity: 1 }
    ],
    setQuantity: 2
  });

  assert.equal(result.ok, true);
  assert.deepEqual(getCartSummary(), {
    totalQuantity: 6,
    totalAmount: 250000,
    totalSets: 2
  });

  result = addGiftSet({
    giftSetId: 'GIFT-KHAC',
    name: 'Bộ cùng cấu hình',
    budget: 120000,
    items: [
      { productId: 'HL-001', quantity: 1 },
      { productId: 'KC-001', quantity: 1 }
    ],
    setQuantity: 1
  });

  assert.equal(result.ok, true);
  assert.equal(getCart().lines.length, 2);

  const giftLineId =
    'gift:HL-001=1|KC-001=1';

  const giftLine = getCart().lines.find(
    (line) => line.lineId === giftLineId
  );

  assert.equal(giftLine.setQuantity, 3);

  result = setSingleQuantity(
    'single:KC-001',
    18
  );

  assert.equal(result.ok, false);
  assert.equal(result.code, 'OUT_OF_STOCK');
  assert.equal(getCart().lines[0].quantity, 2);

  result = setGiftQuantity(giftLineId, 4);

  assert.equal(result.ok, true);
  assert.deepEqual(getCartSummary(), {
    totalQuantity: 10,
    totalAmount: 410000,
    totalSets: 4
  });

  result = removeCartLine(giftLineId);

  assert.equal(result.ok, true);
  assert.deepEqual(getCartSummary(), {
    totalQuantity: 2,
    totalAmount: 90000,
    totalSets: 0
  });

  result = removeCartLine('single:KC-001');

  assert.equal(result.ok, true);
  assert.deepEqual(getCartSummary(), {
    totalQuantity: 0,
    totalAmount: 0,
    totalSets: 0
  });
});