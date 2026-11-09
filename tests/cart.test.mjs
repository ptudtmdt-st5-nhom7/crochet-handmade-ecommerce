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

test('tự cập nhật số đếm giỏ hàng sau mỗi thao tác thành công', () => {
  const badges = [
    { textContent: '' },
    { textContent: '' }
  ];

  globalThis.document = {
    querySelectorAll(selector) {
      assert.equal(selector, '[data-cart-count]');
      return badges;
    }
  };

  try {
    let result = addSingle('KC-002', 2);

    assert.equal(result.ok, true);
    assert.deepEqual(
      badges.map((badge) => badge.textContent),
      ['2', '2']
    );

    result = setSingleQuantity(
      'single:KC-002',
      3
    );

    assert.equal(result.ok, true);
    assert.deepEqual(
      badges.map((badge) => badge.textContent),
      ['3', '3']
    );

    result = removeCartLine('single:KC-002');

    assert.equal(result.ok, true);
    assert.deepEqual(
      badges.map((badge) => badge.textContent),
      ['0', '0']
    );
  } finally {
    delete globalThis.document;
  }
});

test('đọc giỏ có mã hàng lẻ cũ vẫn giữ dòng hợp lệ và cập nhật số đếm', async () => {
  const savedCart = {
    version: 1,
    lines: [
      { lineId: 'single:OLD-001', type: 'single', productId: 'OLD-001', quantity: 1 },
      { lineId: 'single:KC-001', type: 'single', productId: 'KC-001', quantity: 2 }
    ]
  };
  const raw = JSON.stringify(savedCart);
  memory.set('lenly.cart.v1', raw);
  memory.set('lenly.giftDraft.v1', 'giu-ban-soan');
  const badges = [{ textContent: '' }];
  const warnings = [];
  const oldWarn = console.warn;
  const oldDocument = globalThis.document;
  console.warn = (...args) => warnings.push(args);
  globalThis.document = { querySelectorAll: () => badges };
  try {
    // Nạp mới cart.js để mô phỏng mở lại trang với giỏ đã lưu.
    const restored = await import('../js/cart.js?test=old-single');
    assert.equal(restored.getCart().lines.length, 1);
    assert.equal(restored.getCart().lines[0].productId, 'KC-001');
    assert.deepEqual(restored.getCartSummary(), {
      totalQuantity: 2, totalAmount: 90000, totalSets: 0
    });
    assert.equal(restored.updateCartBadge(), 2);
    assert.equal(badges[0].textContent, '2');
    assert.equal(warnings.length, 1);
    assert.equal(memory.get('lenly.cart.v1'), raw);
    assert.equal(memory.get('lenly.giftDraft.v1'), 'giu-ban-soan');

    assert.equal(restored.addSingle('KC-001', 1).ok, true);
    assert.equal(badges[0].textContent, '3');
    assert.equal(restored.setSingleQuantity('single:KC-001', 4).ok, true);
    assert.equal(badges[0].textContent, '4');
    assert.equal(restored.removeCartLine('single:KC-001').ok, true);
    assert.equal(badges[0].textContent, '0');
    assert.deepEqual(JSON.parse(memory.get('lenly.cart.v1')), { version: 1, lines: [] });
    assert.equal(memory.get('lenly.giftDraft.v1'), 'giu-ban-soan');
  } finally {
    console.warn = oldWarn;
    if (oldDocument === undefined) delete globalThis.document;
    else globalThis.document = oldDocument;
    memory.clear();
  }
});

test('bộ quà có mã cũ bị bỏ nguyên bộ, các dòng khác và số bộ vẫn đúng', async () => {
  const savedCart = {
    version: 1,
    lines: [
      { lineId: 'gift:old', type: 'gift', giftSetId: 'GIFT-OLD',
        name: 'Bộ cũ', budget: 100000, setQuantity: 2,
        items: [{ productId: 'OLD-002', quantity: 1 }, { productId: 'KC-001', quantity: 1 }] },
      { lineId: 'gift:valid', type: 'gift', giftSetId: 'GIFT-01',
        name: 'Món quà nhỏ', budget: 100000, setQuantity: 2,
        items: [{ productId: 'KC-001', quantity: 1 }, { productId: 'HL-001', quantity: 1 }] },
      { lineId: 'single:KC-002', type: 'single', productId: 'KC-002', quantity: 1 }
    ]
  };
  memory.set('lenly.cart.v1', JSON.stringify(savedCart));
  const oldWarn = console.warn;
  console.warn = () => {};
  try {
    const restored = await import('../js/cart.js?test=old-gift');
    assert.deepEqual(restored.getCart().lines.map(line => line.lineId), ['gift:valid', 'single:KC-002']);
    assert.deepEqual(restored.getCartSummary(), {
      totalQuantity: 5, totalAmount: 195000, totalSets: 2
    });
    assert.equal(restored.updateCartBadge(), 5);
    assert.equal(restored.removeCartLine('single:KC-002').ok, true);
    assert.deepEqual(restored.getCartSummary(), {
      totalQuantity: 4, totalAmount: 160000, totalSets: 2
    });
    const onlyOld = { version: 1, lines: [savedCart.lines[0]] };
    memory.set('lenly.cart.v1', JSON.stringify(onlyOld));
    const empty = await import('../js/cart.js?test=only-old');
    assert.deepEqual(empty.getCart(), { version: 1, lines: [] });
    assert.equal(empty.updateCartBadge(), 0);
    assert.equal(memory.get('lenly.cart.v1'), JSON.stringify(onlyOld));
    assert.equal(empty.addSingle('KC-001', 1).ok, true);
    assert.equal(empty.getCartSummary().totalAmount, 45000);
  } finally {
    console.warn = oldWarn;
    memory.clear();
  }
});
