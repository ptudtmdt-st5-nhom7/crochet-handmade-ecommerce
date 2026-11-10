import { giftSets } from './gift-sets.js';
import { getProductById, getItemsTotal, formatPrice } from './product-utils.js';
import { recommendGiftSets } from './gift-recommendations.js';
import { addGiftSet } from './cart.js';
import {
  loadGiftDraft, clearGiftDraft, loadGiftWorkspace, saveGiftWorkspace,
  createWorkspaceDraft, duplicateWorkspaceDraft,
} from './storage.js';

// Mỗi draftId là một khung độc lập; items luôn được sao chép sâu khi nhân bản.
let workspace = loadGiftWorkspace();
let recommended = [];
let recommendationBudget = null;
const messages = new Map();
const editor = document.querySelector('#gift-editor-list');
const summary = document.querySelector('#gift-workspace-summary');
const budgetInput = document.querySelector('#gift-budget');
const integer = value => Number.isSafeInteger(value) && value > 0;
const copy = value => JSON.parse(JSON.stringify(value));

function element(tag, className = '', text = '') {
  const node = document.createElement(tag);
  node.className = className;
  node.textContent = text;
  return node;
}
function message(selector, text) {
  document.querySelector(selector).textContent = text;
}
function button(text, action, secondary = true) {
  const node = element('button', `button button-${secondary ? 'secondary' : 'primary'}`, text);
  node.type = 'button';
  node.dataset.action = action;
  return node;
}
function allowedIds(draft) {
  const source = giftSets.find(set => set.id === draft.sourceGiftSetId);
  return (source?.allowedProductIds ?? draft.items.map(item => item.productId))
    .filter(id => getProductById(id));
}
function evaluate(draft) {
  try {
    if (!integer(draft.budget)) throw Error('Nhập ngân sách nguyên dương cho một bộ.');
    if (!integer(draft.setQuantity)) throw Error('Số bộ phải là số nguyên dương.');
    if (!draft.items.length) throw Error('Bộ chưa có sản phẩm. Hãy thêm ít nhất một món.');
    if (draft.items.some(item => !allowedIds(draft).includes(item.productId))) {
      throw Error('Có sản phẩm không còn trong danh sách được phép. Hãy thay hoặc bỏ sản phẩm đó.');
    }
    const unitTotal = getItemsTotal(draft.items);
    const total = unitTotal * draft.setQuantity;
    if (!Number.isSafeInteger(total)) throw Error('Tổng tiền vượt giới hạn an toàn. Hãy giảm số lượng.');
    return { unitTotal, total, error: '' };
  } catch (error) {
    return { unitTotal: null, total: null, error: error.message };
  }
}
function price(value) {
  return value === null ? 'Chưa hợp lệ' : formatPrice(value);
}

// Chỉ thay trạng thái sau khi lưu thành công: lỗi dung lượng không làm mất bộ gốc.
function commit(next, successMessage = '', focusId = null, preserveControls = false) {
  const saved = saveGiftWorkspace(next);
  if (!saved.ok) {
    render();
    message('#editor-message', saved.message + ' Các bộ trước thao tác vẫn được giữ.');
    return false;
  }
  workspace = next;
  if (preserveControls) refreshTotals();
  else render();
  message('#editor-message', successMessage);
  if (focusId) {
    editor.querySelector(`[data-draft-id="${CSS.escape(focusId)}"] h3`)?.focus();
  }
  return true;
}
function updateDraft(draftId, update, preserveControls = false) {
  const next = copy(workspace);
  const draft = next.drafts.find(item => item.draftId === draftId);
  if (!draft) return;
  update(draft);
  messages.delete(draftId);
  commit(next, '', null, preserveControls);
}
function field(labelText, value, fieldName, draftId, index = null) {
  const label = element('label', 'gift-draft-field', labelText);
  const input = element('input');
  input.type = 'number'; input.min = '1'; input.step = '1'; input.inputMode = 'numeric';
  input.value = value ?? '';
  input.dataset.field = fieldName;
  if (index !== null) input.dataset.index = index;
  input.id = `gift-${CSS.escape(draftId)}-${fieldName}-${index ?? 'set'}`;
  label.htmlFor = input.id;
  label.append(input);
  return label;
}
function renderItem(draft, item, index) {
  const product = getProductById(item.productId);
  const row = element('div', 'gift-editor-item');
  if (product) {
    const image = element('img', 'gift-editor-image');
    image.src = product.image; image.alt = product.name; image.loading = 'lazy';
    image.width = 120; image.height = 120;
    row.append(image);
  }
  const info = element('div', 'gift-editor-item-info');
  info.append(element('h4', '', product?.name ?? `Không tìm thấy: ${item.productId}`));
  info.append(element('p', '', product ? `Đơn giá: ${formatPrice(product.price)}` : 'Hãy thay hoặc bỏ sản phẩm này.'));
  const label = element('label', '', 'Sản phẩm');
  const select = element('select', 'gift-product-select');
  select.dataset.field = 'product'; select.dataset.index = index;
  select.id = `gift-${draft.draftId}-product-${index}`; label.htmlFor = select.id;
  for (const id of new Set([...allowedIds(draft), item.productId])) {
    const candidate = getProductById(id);
    const option = element('option', '', candidate ? `${candidate.name} — ${formatPrice(candidate.price)}` : `Mã không tồn tại: ${id}`);
    option.value = id; option.selected = id === item.productId;
    select.append(option);
  }
  label.append(select);
  info.append(label, field('Số lượng trong một bộ', item.quantity, 'quantity', draft.draftId, index));
  if (product) {
    const link = element('a', 'gift-detail-link', 'Xem chi tiết sản phẩm');
    link.href = `product-detail.html?id=${encodeURIComponent(product.id)}&from=gift`;
    link.dataset.productDetail = '';
    info.append(link);
  }
  const remove = button('Bỏ sản phẩm', 'remove-item'); remove.dataset.index = index;
  info.append(remove); row.append(info);
  return row;
}
function renderCard(draft, index) {
  const card = element('article', 'gift-draft-card');
  card.dataset.draftId = draft.draftId;
  const heading = element('h3', '', `Bộ ${index + 1} · ${draft.name}`);
  heading.tabIndex = -1;
  card.append(heading);
  card.append(element('p', 'gift-draft-caption', draft.copyOfDraftId || draft.copiedFromLineId
    ? 'Bản sao chỉnh riêng. Đổi món hoặc số lượng ở khung này không thay đổi bộ gốc.'
    : 'Các sản phẩm bên dưới cùng tạo thành một bộ quà.'));
  const settings = element('div', 'gift-draft-settings');
  settings.append(field('Ngân sách cho một bộ (VNĐ)', draft.budget, 'budget', draft.draftId),
    field('Số bộ muốn mua', draft.setQuantity, 'setQuantity', draft.draftId));
  card.append(settings);
  const items = element('div', 'gift-draft-items');
  draft.items.forEach((item, itemIndex) => items.append(renderItem(draft, item, itemIndex)));
  if (!draft.items.length) items.append(element('p', 'gift-empty-message', 'Bộ đang trống. Nhấn “Thêm sản phẩm” để chọn món.'));
  card.append(items);
  const addProduct = button('+ Thêm sản phẩm', 'add-product');
  addProduct.disabled = !allowedIds(draft).length;
  card.append(addProduct);
  const evaluation = evaluate(draft);
  card.append(element('p', 'gift-draft-price', `Giá một bộ: ${price(evaluation.unitTotal)}`));
  card.append(element('p', 'gift-draft-note', draftNote(draft, evaluation)));
  const actions = element('div', 'gift-draft-actions');
  actions.append(button('Nhân bản bộ này', 'duplicate'), button('Bỏ bộ đang soạn', 'remove-draft'));
  card.append(actions);
  return card;
}
function renderSummary(draft, index) {
  const result = evaluate(draft);
  const row = element('article', 'gift-summary-row'); row.dataset.draftId = draft.draftId;
  row.append(element('h3', '', `Bộ ${index + 1} · ${draft.name}`));
  row.append(element('p', '', `${price(result.unitTotal)}/bộ × ${draft.setQuantity} bộ`));
  row.append(element('strong', '', `Thành tiền: ${price(result.total)}`));
  const add = button('Thêm bộ này vào giỏ', 'add-cart', false);
  add.disabled = Boolean(result.error);
  row.append(add);
  const feedback = element('p', 'gift-message', messages.get(draft.draftId) ?? result.error);
  feedback.setAttribute('role', 'status'); feedback.setAttribute('aria-live', 'polite');
  row.append(feedback);
  return row;
}
function draftNote(draft, evaluation) {
  return evaluation.error || (evaluation.unitTotal > draft.budget
    ? `Vượt ngân sách ${formatPrice(evaluation.unitTotal - draft.budget)} cho một bộ. Bạn vẫn có thể thêm vào giỏ nếu đủ số lượng.`
    : `Còn lại ${formatPrice(draft.budget - evaluation.unitTotal)} trong ngân sách một bộ.`);
}
// Giữ nguyên các input/nút khi ô số mất focus để cú click kế tiếp không bị mất.
function refreshTotals() {
  for (const draft of workspace.drafts) {
    const selector = `[data-draft-id="${CSS.escape(draft.draftId)}"]`;
    const card = editor.querySelector(selector), row = summary.querySelector(selector);
    const result = evaluate(draft);
    card.querySelector('.gift-draft-price').textContent = `Giá một bộ: ${price(result.unitTotal)}`;
    card.querySelector('.gift-draft-note').textContent = draftNote(draft, result);
    row.querySelector(':scope > p').textContent = `${price(result.unitTotal)}/bộ × ${draft.setQuantity} bộ`;
    row.querySelector(':scope > strong').textContent = `Thành tiền: ${price(result.total)}`;
    row.querySelector('button').disabled = Boolean(result.error);
    row.querySelector('.gift-message').textContent = messages.get(draft.draftId) ?? result.error;
  }
  renderTotal();
}
function renderTotal() {
  const evaluations = workspace.drafts.map(evaluate);
  const total = evaluations.reduce((sum, result) => sum + (result.total ?? 0), 0);
  document.querySelector('#gift-total-price').textContent = evaluations.some(result => result.error) || !Number.isSafeInteger(total)
    ? 'Chưa tính được — kiểm tra từng bộ' : formatPrice(total);
}
function render() {
  editor.replaceChildren(...workspace.drafts.map(renderCard));
  summary.replaceChildren(...workspace.drafts.map(renderSummary));
  if (!workspace.drafts.length) {
    summary.append(element('p', '', 'Chưa có bộ đang soạn. Hãy chọn mẫu ở mục 2.'));
  }
  renderTotal();
}
function recommend() {
  const budget = Number(budgetInput.value);
  const list = document.querySelector('#gift-set-list'); list.replaceChildren();
  recommended = []; recommendationBudget = null;
  if (!integer(budget)) {
    message('#budget-error', 'Ngân sách phải là số nguyên dương, ví dụ 150000.');
    message('#recommend-message', ''); return;
  }
  message('#budget-error', '');
  recommendationBudget = budget;
  recommended = recommendGiftSets(budget);
  document.querySelector('#recommend-description').textContent = `Gợi ý theo ngân sách ${formatPrice(budget)} cho một bộ. Có thể chọn nhiều mẫu; các bộ đã soạn vẫn được giữ.`;
  for (const gift of recommended) {
    const card = element('article', 'gift-set-card');
    card.append(element('h3', '', gift.name), element('p', 'gift-set-price', formatPrice(gift.unitTotal)));
    const ul = element('ul');
    gift.items.forEach(item => ul.append(element('li', '', `${getProductById(item.productId)?.name ?? item.productId} × ${item.quantity}`)));
    const choose = button('Thêm vào mục tùy chỉnh', 'choose-gift', false);
    choose.dataset.giftSetId = gift.giftSetId;
    card.append(ul, choose); list.append(card);
  }
  message('#recommend-message', recommended.length ? `Có ${recommended.length} bộ quà phù hợp.` : 'Chưa có bộ quà phù hợp ngân sách và số lượng hiện tại. Hãy thử ngân sách khác.');
}

document.querySelector('#btn-recommend').addEventListener('click', recommend);
budgetInput.addEventListener('keydown', event => { if (event.key === 'Enter') recommend(); });
document.querySelector('#gift-set-list').addEventListener('click', event => {
  const choose = event.target.closest('[data-action="choose-gift"]');
  const gift = recommended.find(item => item.giftSetId === choose?.dataset.giftSetId);
  if (!gift) return;
  const draft = createWorkspaceDraft({ version: 1, budget: recommendationBudget,
    sourceGiftSetId: gift.giftSetId, name: gift.name, items: gift.items,
    setQuantity: 1, copiedFromLineId: null });
  const next = copy(workspace); next.drafts.push(draft);
  commit(next, 'Đã thêm một khung bộ quà mới. Các bộ trước đó được giữ nguyên.', draft.draftId);
});
function handleFieldChange(event) {
  const input = event.target;
  const draftId = input.closest('[data-draft-id]')?.dataset.draftId;
  if (!draftId || !input.dataset.field) return;
  const draft = workspace.drafts.find(item => item.draftId === draftId);
  const index = Number(input.dataset.index);
  const name = input.dataset.field;
  if (name === 'product') {
    if (event.type === 'input') return;
    if (!allowedIds(draft).includes(input.value)) return;
    updateDraft(draftId, target => { target.items[index].productId = input.value; });
  } else {
    const value = Number(input.value);
    if (!integer(value)) {
      input.setAttribute('aria-invalid', 'true');
      input.setCustomValidity('Nhập số nguyên dương.');
      if (event.type === 'change') input.reportValidity();
      message('#editor-message', 'Giá trị chưa hợp lệ; chưa lưu thay đổi. Hãy nhập số nguyên dương trước khi nhân bản hoặc thêm giỏ.');
      return;
    }
    input.setCustomValidity(''); input.removeAttribute('aria-invalid');
    const previousValue = name === 'quantity' ? draft.items[index].quantity : draft[name];
    if (value === previousValue) return;
    updateDraft(draftId, target => {
      if (name === 'quantity') target.items[index].quantity = value;
      else target[name] = value;
    }, true);
  }
  const selector = `[data-draft-id="${CSS.escape(draftId)}"] [data-field="${name}"]${input.dataset.index === undefined ? '' : `[data-index="${index}"]`}`;
  if (name === 'product') editor.querySelector(selector)?.focus({ preventScroll: true });
}
editor.addEventListener('input', handleFieldChange);
editor.addEventListener('change', handleFieldChange);
editor.addEventListener('click', event => {
  const action = event.target.closest('[data-action]')?.dataset.action;
  const draftId = event.target.closest('[data-draft-id]')?.dataset.draftId;
  const draft = workspace.drafts.find(item => item.draftId === draftId);
  if (!draft || !action) return;
  if (action === 'duplicate') {
    if (!validVisibleInputs(draftId)) return;
    const next = copy(workspace);
    const duplicate = duplicateWorkspaceDraft(draft);
    next.drafts.splice(next.drafts.findIndex(item => item.draftId === draftId) + 1, 0, duplicate);
    commit(next, 'Đã tạo bản sao ngay dưới bộ gốc. Bản sao mặc định một bộ, chỉnh riêng và chưa thêm vào giỏ.', duplicate.draftId);
  } else if (action === 'remove-draft') {
    const next = copy(workspace); next.drafts = next.drafts.filter(item => item.draftId !== draftId);
    commit(next, 'Đã bỏ khung đang soạn. Các bộ khác và giỏ hàng vẫn được giữ nguyên.');
  } else if (action === 'remove-item') {
    const index = Number(event.target.closest('[data-index]').dataset.index);
    updateDraft(draftId, target => target.items.splice(index, 1));
  } else if (action === 'add-product') {
    const ids = allowedIds(draft);
    const id = ids.find(candidate => !draft.items.some(item => item.productId === candidate)) ?? ids[0];
    if (id) updateDraft(draftId, target => target.items.push({ productId: id, quantity: 1 }));
  }
});
function validVisibleInputs(draftId) {
  const card = editor.querySelector(`[data-draft-id="${CSS.escape(draftId)}"]`);
  const invalid = card?.querySelector('input:invalid, [aria-invalid="true"]');
  if (!invalid) return true;
  invalid.focus(); invalid.reportValidity();
  message('#editor-message', 'Có giá trị chưa hợp lệ trong bộ này. Hãy sửa trước khi tiếp tục.');
  return false;
}
summary.addEventListener('click', event => {
  if (!event.target.closest('[data-action="add-cart"]')) return;
  const draftId = event.target.closest('[data-draft-id]')?.dataset.draftId;
  const draft = workspace.drafts.find(item => item.draftId === draftId);
  if (!draft || !validVisibleInputs(draftId) || evaluate(draft).error) return;
  const result = addGiftSet({ giftSetId: draft.sourceGiftSetId ?? draft.draftId,
    name: draft.name, budget: draft.budget, items: copy(draft.items), setQuantity: draft.setQuantity });
  messages.set(draftId, result.ok
    ? `Đã thêm ${draft.setQuantity} bộ vào giỏ. Khung đang soạn vẫn giữ nguyên; nhấn thêm lần nữa sẽ tăng số bộ trong giỏ.`
    : result.message);
  // Không xóa bản soạn sau thêm: không phát sinh thao tác lưu thứ hai có thể lỗi giữa chừng.
  summary.replaceChildren(...workspace.drafts.map(renderSummary));
});

// Chuyển bản soạn v1 cũ sang danh sách một lần, giữ cả dữ liệu giỏ và các bộ đã soạn.
function restoreLegacyDraft() {
  const legacy = loadGiftDraft();
  if (!legacy) return;
  const fingerprint = JSON.stringify(legacy);
  if (workspace.legacyDraftFingerprint !== fingerprint) {
    const next = copy(workspace);
    next.drafts.push(createWorkspaceDraft(legacy));
    next.legacyDraftFingerprint = fingerprint;
    const saved = saveGiftWorkspace(next);
    if (!saved.ok) { message('#editor-message', saved.message + ' Bản soạn cũ vẫn được giữ để khôi phục.'); return; }
    workspace = next;
  }
  const cleared = clearGiftDraft();
  if (!cleared.ok) message('#editor-message', cleared.message + ' Bản đã chuyển sẽ không bị nhập lặp khi tải lại.');
}
restoreLegacyDraft();
render();
if (workspace.drafts[0]?.budget) budgetInput.value = workspace.drafts[0].budget;
