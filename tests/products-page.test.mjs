import test from 'node:test';
import assert from 'node:assert/strict';

// DOM tối thiểu cho kiểm tra cách nối sự kiện; không thay kiểm tra giao diện.
class Element {
  constructor(tag = 'div') {
    this.tagName = tag; this.dataset = {}; this.children = []; this.listeners = {};
    this.value = ''; this.disabled = false; this.textContent = ''; this.attributes = {};
  }
  append(...items) { for (const item of items) { item.parent = this; this.children.push(item); } }
  replaceChildren(...items) {
    this.children = [];
    for (const item of items) this.append(...(item.tagName === 'fragment' ? item.children : [item]));
  }
  setAttribute(name, value) { this.attributes[name] = value; }
  removeAttribute(name) { delete this.attributes[name]; }
  addEventListener(name, fn) { (this.listeners[name] ??= []).push(fn); }
  dispatchEvent(event) { for (const fn of this.listeners[event.type] ?? []) fn(event); return true; }
  closest(selector) {
    if (selector === 'fieldset') return fieldset;
    if (selector === '[data-add-product]' && this.dataset.addProduct) return this;
    return this.parent?.closest(selector) ?? null;
  }
  contains(element) { return element === this || this.children.some(child => child.contains(element)); }
}
const fieldset = new Element('fieldset');
const nodes = new Map();
for (const selector of ['[data-products-list]', '[data-product-search]', '[data-category-filter]',
  '[data-sort-select]', '[data-site-search-button]', '[data-reset-products]',
  '[data-cart-feedback]', '[data-products-count]', '[data-cart-count]', '#site-search']) nodes.set(selector, new Element());
globalThis.document = {
  querySelector: key => nodes.get(key) ?? null,
  querySelectorAll: key => nodes.has(key) ? [nodes.get(key)] : [],
  getElementById: id => nodes.get('#' + id) ?? null,
  createElement: tag => new Element(tag), createDocumentFragment: () => new Element('fragment')
};
globalThis.location = { hash: '' };
const memory = new Map();
let rejectSave = false;
globalThis.localStorage = {
  getItem: key => memory.get(key) ?? null,
  setItem(key, value) { if (rejectSave) throw new Error('blocked'); memory.set(key, String(value)); },
  removeItem: key => memory.delete(key)
};
const { initProductsPage } = await import('../js/products-page.js');
const { getCartSummary } = await import('../js/cart.js');
const list = nodes.get('[data-products-list]');
const query = nodes.get('[data-product-search]');
const category = nodes.get('[data-category-filter]');
const sort = nodes.get('[data-sort-select]');
const update = (node, value, event) => { node.value = value; node.dispatchEvent(new Event(event)); };
const add = () => {
  const button = list.children[0].children[1].children.at(-1);
  list.dispatchEvent({ type: 'click', target: button });
};

test('nối tìm, lọc, sắp, xóa lọc và thêm giỏ sau khi render lại', () => {
  assert.equal(list.children.length, 8);
  initProductsPage();
  assert.equal(list.listeners.click.length, 1);
  assert.equal(query.listeners.input.length, 2); // một bộ lọc, một đồng bộ ô tìm trên đầu trang
  update(query, 'KC-001', 'input');
  assert.equal(list.children.length, 1);
  assert.equal(list.children[0].dataset.productId, 'KC-001');
  add(); add();
  assert.equal(getCartSummary().totalQuantity, 2);
  assert.equal(getCartSummary().totalAmount, 90000);
  assert.equal(nodes.get('[data-cart-count]').textContent, '2');
  assert.match(nodes.get('[data-cart-feedback]').textContent, /Đã thêm/);
  update(query, 'khong-co-mon-nay', 'input');
  assert.equal(list.children[0].textContent, 'Không có sản phẩm phù hợp.');
  assert.equal(nodes.get('[data-products-count]').textContent, 'Hiển thị 0 sản phẩm.');
  nodes.get('[data-reset-products]').dispatchEvent(new Event('click'));
  assert.equal(list.children.length, 8);
  update(category, 'moc-khoa', 'change');
  assert.equal(list.children.length, 2);
  update(sort, 'price-asc', 'change');
  assert.equal(list.children[0].dataset.productId, 'KC-002');
  update(sort, 'price-desc', 'change');
  assert.equal(list.children[0].dataset.productId, 'KC-001');
  add();
  assert.equal(getCartSummary().totalQuantity, 3);
  rejectSave = true;
  const warn = console.warn; console.warn = () => {};
  try { add(); } finally { console.warn = warn; rejectSave = false; }
  assert.equal(getCartSummary().totalQuantity, 3);
  assert.doesNotMatch(nodes.get('[data-cart-feedback]').textContent, /Đã thêm/);
  nodes.get('[data-reset-products]').dispatchEvent(new Event('click'));
  nodes.get('#site-search').value = 'TL-001';
  nodes.get('[data-site-search-button]').dispatchEvent(new Event('click'));
  assert.equal(list.children[0].dataset.productId, 'TL-001');
  assert.equal(query.value, 'TL-001');
  assert.equal(list.children[0].children[1].children.at(-1).disabled, false);
});
