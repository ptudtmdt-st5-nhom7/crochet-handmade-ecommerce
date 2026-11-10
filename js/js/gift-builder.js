// ==========================================
// 1. IMPORT MODULE
// ==========================================

import { giftSets } from './gift-sets.js';

import {
  getProductById,
  getItemsTotal,
  formatPrice
} from './product-utils.js';

import {
  recommendGiftSets
} from './gift-recommendations.js';

import {
  loadGiftDraft,
  saveGiftDraft,
  clearGiftDraft
} from './storage.js';

import {
  addGiftSet
} from './cart.js';


// ==========================================
// 2. LẤY CÁC PHẦN TỬ HTML
// ==========================================

const elements = {

  budget: document.querySelector('#gift-budget'),

  recommendButton: document.querySelector('#btn-recommend'),

  budgetError: document.querySelector('#budget-error'),

  recommendationDescription:
    document.querySelector('#recommend-description'),

  recommendationList:
    document.querySelector('#gift-set-list'),

  recommendationMessage:
    document.querySelector('#recommend-message'),

  editorDescription:
    document.querySelector('#gift-editor-description'),

  editorList:
    document.querySelector('#gift-editor-list'),

  addProductButton:
    document.querySelector('#btn-add-product'),

  editorMessage:
    document.querySelector('#editor-message'),

  unitPrice:
    document.querySelector('#gift-unit-price'),

  budgetDisplay:
    document.querySelector('#gift-budget-display'),

  remaining:
    document.querySelector('#gift-remaining'),

  exceeded:
    document.querySelector('#gift-exceeded'),

  setQuantity:
    document.querySelector('#gift-set-quantity'),

  totalPrice:
    document.querySelector('#gift-total-price'),

  summaryMessage:
    document.querySelector('#summary-message'),

  duplicateButton:
    document.querySelector('#btn-duplicate-gift'),

  addCartButton:
    document.querySelector('#btn-add-cart')

};


// ==========================================
// 3. BIẾN QUẢN LÝ TRẠNG THÁI
// ==========================================

let currentDraft = null;

let allowedProductIds = [];

let lastAdded = false;

let recommendationsForCurrentBudget = [];

let recommendationsBudget = null;


// ==========================================
// 4. CÁC HÀM HỖ TRỢ
// ==========================================

// Hiển thị thông báo

function setMessage(element, message = '') {

  element.textContent = message;

}


// Kiểm tra số nguyên dương

function isPositiveInteger(value) {

  return Number.isSafeInteger(value) && value > 0;

}


// Lấy ngân sách khách nhập

function readBudget() {

  const rawValue = elements.budget.value.trim();

  if (!rawValue) return null;

  const value = Number(rawValue);

  return isPositiveInteger(value) ? value : null;

}


// Lấy danh sách sản phẩm được phép sử dụng

function getAllowedIds(sourceGiftSetId, fallbackItems = []) {

  const sourceSet = giftSets.find(
    (set) => set.id === sourceGiftSetId
  );

  if (sourceSet && Array.isArray(sourceSet.allowedProductIds)) {

    return [...sourceSet.allowedProductIds];

  }

  const existingIds = fallbackItems

    .map((item) => item.productId)

    .filter((id) => getProductById(id));

  return [...new Set(existingIds)];

}


// Tạo bản nháp từ bộ quà gợi ý

function createDraftFromRecommendation(recommendation, budget) {

  return {

    version: 1,

    budget,

    sourceGiftSetId: recommendation.giftSetId,

    name: recommendation.name,

    items: recommendation.items.map((item) => ({

      productId: item.productId,

      quantity: item.quantity

    })),

    setQuantity: 1,

    copiedFromLineId: null

  };

}


// Lưu bản quà đang soạn

function persistDraft() {

  if (!currentDraft) {

    return { ok: true, message: '' };

  }

  const result = saveGiftDraft(currentDraft);

  if (!result.ok) {

    setMessage(elements.editorMessage, result.message);

  }

  return result;

}


// Tạo phần tử HTML an toàn

function createElement(tag, className, text) {

  const element = document.createElement(tag);

  if (className) {

    element.className = className;

  }

  if (text !== undefined) {

    element.textContent = text;

  }

  return element;

}


// ==========================================
// 5. HIỂN THỊ CÁC BỘ QUÀ GỢI Ý
// ==========================================

function renderRecommendations(list) {

  elements.recommendationList.replaceChildren();

  list.forEach((recommendation) => {

    const card = createElement(
      'article',
      'gift-set-card'
    );

    const title = createElement(
      'h3',
      '',
      recommendation.name
    );

    const price = createElement(
      'p',
      'gift-set-price',
      `Giá một bộ: ${formatPrice(recommendation.unitTotal)}`
    );

    const remaining = createElement(
      'p',
      '',
      `Còn lại: ${formatPrice(recommendation.remainingBudget)}`
    );

    const itemList = createElement(
      'ul',
      'gift-set-items'
    );

    recommendation.items.forEach((item) => {

      const product = item.product ??
        getProductById(item.productId);

      if (!product) return;

      const line = createElement(
        'li',
        '',
        `${product.name} × ${item.quantity}`
      );

      itemList.append(line);

    });

    const chooseButton = createElement(
      'button',
      'button button-primary',
      'Chọn bộ quà này'
    );

    chooseButton.type = 'button';

    chooseButton.dataset.action = 'choose-gift';

    chooseButton.dataset.giftSetId =
      recommendation.giftSetId;

    card.append(
      title,
      price,
      remaining,
      itemList,
      chooseButton
    );

    elements.recommendationList.append(card);

  });

}


// ==========================================
// 6. HIỂN THỊ KHU VỰC CHỈNH SỬA
// ==========================================

function renderEditor() {

  elements.editorList.replaceChildren();

  if (!currentDraft) {

    elements.editorDescription.textContent =
      'Hãy chọn một bộ quà để bắt đầu chỉnh sửa.';

    elements.addProductButton.disabled = true;

    return;

  }

  elements.editorDescription.textContent =
    currentDraft.name || 'Bộ quà đang chỉnh sửa';

  elements.addProductButton.disabled =
    allowedProductIds.length === 0;


  if (currentDraft.items.length === 0) {

    elements.editorList.append(

      createElement(
        'p',
        'gift-empty-message',
        'Bộ quà chưa có sản phẩm. Hãy thêm ít nhất một món.'
      )

    );

  }


  currentDraft.items.forEach((item, index) => {

    const product = getProductById(item.productId);

    if (!product) return;


    const row = createElement(
      'article',
      'gift-editor-item'
    );


    // Hình ảnh sản phẩm

    const image = createElement('img', 'gift-editor-image');

    image.src = product.image;

    image.alt = product.name;

    image.width = 120;

    image.height = 120;

    image.loading = 'lazy';


    // Thông tin sản phẩm

    const info = createElement(
      'div',
      'gift-editor-item-info'
    );

    const name = createElement(
      'h3',
      '',
      product.name
    );

    const price = createElement(
      'p',
      '',
      `Đơn giá: ${formatPrice(product.price)}`
    );


    // Chọn sản phẩm thay thế

    const productLabel = createElement(
      'label',
      '',
      'Sản phẩm'
    );

    const productSelect = createElement(
      'select',
      'gift-product-select'
    );

    productSelect.dataset.index = String(index);

    productSelect.setAttribute(
      'aria-label',
      `Chọn sản phẩm cho dòng ${index + 1}`
    );


    allowedProductIds.forEach((productId) => {

      const allowedProduct = getProductById(productId);

      if (!allowedProduct) return;

      const option = createElement(
        'option',
        '',
        `${allowedProduct.name} — ${formatPrice(allowedProduct.price)}`
      );

      option.value = allowedProduct.id;

      option.selected =
        allowedProduct.id === item.productId;

      productSelect.append(option);

    });

    productLabel.append(productSelect);


    // Thay đổi số lượng

    const quantityLabel = createElement(
      'label',
      '',
      'Số lượng'
    );

    const quantityInput = createElement(
      'input',
      'gift-product-quantity'
    );

    quantityInput.type = 'number';

    quantityInput.min = '1';

    quantityInput.step = '1';

    quantityInput.value = String(item.quantity);

    quantityInput.dataset.index = String(index);

    quantityInput.setAttribute(
      'aria-label',
      `Số lượng ${product.name}`
    );

    quantityLabel.append(quantityInput);


    // Xem chi tiết sản phẩm

    const detailLink = createElement(
      'a',
      'gift-detail-link',
      'Xem chi tiết sản phẩm'
    );

    detailLink.href =
      `product-detail.html?id=${encodeURIComponent(product.id)}&from=gift`;

    detailLink.dataset.productDetail = 'true';

    detailLink.dataset.productId = product.id;


    // Xóa sản phẩm

    const removeButton = createElement(
      'button',
      'button button-secondary',
      'Bỏ sản phẩm'
    );

    removeButton.type = 'button';

    removeButton.dataset.action = 'remove-item';

    removeButton.dataset.index = String(index);


    info.append(
      name,
      price,
      productLabel,
      quantityLabel,
      detailLink,
      removeButton
    );

    row.append(image, info);

    elements.editorList.append(row);

  });

}


// ==========================================
// 7. TÍNH TOÁN VÀ HIỂN THỊ TỔNG KẾT
// ==========================================

function renderSummary() {

  const budget =
    currentDraft?.budget ?? readBudget() ?? 0;

  const setQuantity =
    currentDraft?.setQuantity ?? 1;

  let unitTotal = 0;

  let total = 0;

  let calculationError = '';


  try {

    if (currentDraft?.items?.length) {

      unitTotal = getItemsTotal(currentDraft.items);

    }

    total = unitTotal * setQuantity;

    if (!Number.isSafeInteger(total)) {

      throw new RangeError(
        'Thành tiền vượt giới hạn an toàn.'
      );

    }

  } catch (error) {

    calculationError = error.message;

  }


  elements.unitPrice.textContent =
    formatPrice(unitTotal);

  elements.budgetDisplay.textContent =
    formatPrice(budget);

  elements.remaining.textContent =
    formatPrice(Math.max(budget - unitTotal, 0));

  elements.exceeded.textContent =
    formatPrice(Math.max(unitTotal - budget, 0));

  elements.totalPrice.textContent =
    calculationError
      ? 'Không thể tính'
      : formatPrice(total);


  elements.setQuantity.value =
    String(setQuantity);

  elements.setQuantity.disabled =
    !currentDraft;

  elements.duplicateButton.disabled =
    !currentDraft ||
    currentDraft.items.length === 0 ||
    lastAdded;

  elements.addCartButton.disabled =
    !currentDraft ||
    currentDraft.items.length === 0 ||
    lastAdded ||
    Boolean(calculationError);


  if (calculationError) {

    setMessage(
      elements.summaryMessage,
      calculationError
    );

  } else if (
    currentDraft &&
    unitTotal > budget &&
    budget > 0
  ) {

    setMessage(
      elements.summaryMessage,
      `Bộ quà đang vượt ngân sách ${formatPrice(unitTotal - budget)}. Bạn vẫn có thể thêm bộ quà vào giỏ nếu số lượng hợp lệ.`
    );

  } else {

    setMessage(elements.summaryMessage, '');

  }

}


// Hiển thị lại toàn bộ khu vực chỉnh sửa và tổng kết

function renderAll() {

  renderEditor();

  renderSummary();

}


// ==========================================
// 8. CHỌN BỘ QUÀ GỢI Ý
// ==========================================

function selectRecommendation(giftSetId) {

  const recommendation =
    recommendationsForCurrentBudget.find(
      (item) => item.giftSetId === giftSetId
    );

  if (!recommendation) return;


  currentDraft = createDraftFromRecommendation(
    recommendation,
    readBudget()
  );

  allowedProductIds = getAllowedIds(
    currentDraft.sourceGiftSetId,
    currentDraft.items
  );

  lastAdded = false;

  setMessage(elements.editorMessage, '');

  setMessage(elements.summaryMessage, '');

  persistDraft();

  renderAll();

}


// ==========================================
// 9. GỢI Ý BỘ QUÀ THEO NGÂN SÁCH
// ==========================================

function handleRecommend() {

  setMessage(elements.budgetError, '');

  setMessage(elements.recommendationMessage, '');

  const budget = readBudget();


  // Kiểm tra ngân sách

  if (budget === null) {

    setMessage(
      elements.budgetError,
      'Vui lòng nhập ngân sách là số nguyên dương (VNĐ).'
    );

    elements.budget.focus();

    return;

  }


  recommendationsBudget = budget;

  recommendationsForCurrentBudget =
    recommendGiftSets(budget);


  if (currentDraft) {

    currentDraft.budget = budget;

    persistDraft();

    renderSummary();

  }


  elements.recommendationDescription.textContent =
    `Các bộ quà phù hợp với ngân sách ${formatPrice(budget)} cho một bộ:`;


  // Không tìm thấy bộ quà phù hợp

  if (recommendationsForCurrentBudget.length === 0) {

    elements.recommendationList.replaceChildren();

    setMessage(
      elements.recommendationMessage,
      'Hiện chưa có bộ quà phù hợp. Bạn có thể thử ngân sách cao hơn.'
    );

    return;

  }


  // Hiển thị bộ quà

  renderRecommendations(
    recommendationsForCurrentBudget
  );

  setMessage(
    elements.recommendationMessage,
    `Tìm thấy ${recommendationsForCurrentBudget.length} bộ quà phù hợp.`
  );

}


// ==========================================
// 10. THÊM SẢN PHẨM VÀO BỘ QUÀ
// ==========================================

function addProductToDraft() {

  if (!currentDraft || allowedProductIds.length === 0) {

    return;

  }

  const existingIds = new Set(
    currentDraft.items.map((item) => item.productId)
  );

  const nextId =
    allowedProductIds.find(
      (id) => !existingIds.has(id)
    ) ?? allowedProductIds[0];


  currentDraft.items.push({

    productId: nextId,

    quantity: 1

  });

  lastAdded = false;

  setMessage(elements.editorMessage, '');

  persistDraft();

  renderAll();

}


// ==========================================
// 11. THAY ĐỔI SẢN PHẨM
// ==========================================

function changeProduct(index, nextProductId) {

  if (
    !currentDraft ||
    !allowedProductIds.includes(nextProductId) ||
    !getProductById(nextProductId)
  ) {

    return;

  }

  const target = currentDraft.items[index];

  if (!target) return;


  // Nếu sản phẩm đã tồn tại thì gộp số lượng

  const duplicate = currentDraft.items.find(
    (item, itemIndex) =>
      itemIndex !== index &&
      item.productId === nextProductId
  );


  if (duplicate) {

    duplicate.quantity += target.quantity;

    currentDraft.items.splice(index, 1);

  } else {

    target.productId = nextProductId;

  }


  lastAdded = false;

  persistDraft();

  renderAll();

}


// ==========================================
// 12. THAY ĐỔI SỐ LƯỢNG SẢN PHẨM
// ==========================================

function changeItemQuantity(index, rawValue) {

  if (!currentDraft) return;

  const quantity = Number(rawValue);


  if (!isPositiveInteger(quantity)) {

    setMessage(
      elements.editorMessage,
      'Số lượng phải là số nguyên dương.'
    );

    renderEditor();

    return;

  }


  const item = currentDraft.items[index];

  if (!item) return;


  item.quantity = quantity;

  lastAdded = false;

  setMessage(elements.editorMessage, '');

  persistDraft();

  renderAll();

}


// ==========================================
// 13. XÓA SẢN PHẨM
// ==========================================

function removeItem(index) {

  if (
    !currentDraft ||
    !currentDraft.items[index]
  ) {

    return;

  }

  currentDraft.items.splice(index, 1);

  lastAdded = false;

  persistDraft();

  renderAll();

}


// ==========================================
// 14. THAY ĐỔI SỐ BỘ MUỐN MUA
// ==========================================

function changeSetQuantity() {

  if (!currentDraft) return;

  const quantity =
    Number(elements.setQuantity.value);


  if (!isPositiveInteger(quantity)) {

    setMessage(
      elements.summaryMessage,
      'Số bộ muốn mua phải là số nguyên dương.'
    );

    elements.setQuantity.value =
      String(currentDraft.setQuantity);

    return;

  }


  currentDraft.setQuantity = quantity;

  lastAdded = false;

  persistDraft();

  renderSummary();

}


// ==========================================
// 15. THAY ĐỔI NGÂN SÁCH
// ==========================================

function changeBudget() {

  const budget = readBudget();


  if (budget === null) {

    setMessage(
      elements.budgetError,
      'Ngân sách phải là số nguyên dương (VNĐ).'
    );

    return;

  }


  setMessage(elements.budgetError, '');


  if (currentDraft) {

    currentDraft.budget = budget;

    lastAdded = false;

    persistDraft();

  }


  if (
    recommendationsBudget !== null &&
    recommendationsBudget !== budget
  ) {

    recommendationsForCurrentBudget = [];

    recommendationsBudget = null;

    elements.recommendationList.replaceChildren();

    elements.recommendationDescription.textContent =
      'Ngân sách đã thay đổi. Hãy bấm “Gợi ý bộ quà” để cập nhật danh sách.';

    setMessage(elements.recommendationMessage, '');

  }


  renderSummary();

}


// ==========================================
// 16. NHÂN BẢN BỘ QUÀ ĐỂ CHỈNH RIÊNG
// ==========================================

function duplicateDraft() {

  if (
    !currentDraft ||
    currentDraft.items.length === 0
  ) {

    return;

  }


  // Tạo bản sao độc lập, không sửa bản gốc

  currentDraft = {

    version: 1,

    budget: currentDraft.budget,

    sourceGiftSetId: currentDraft.sourceGiftSetId,

    name: `${currentDraft.name || 'Bộ quà'} (bản chỉnh riêng)`,

    items: currentDraft.items.map(
      (item) => ({ ...item })
    ),

    setQuantity: 1,

    copiedFromLineId:
      currentDraft.copiedFromLineId ?? null

  };


  allowedProductIds = getAllowedIds(
    currentDraft.sourceGiftSetId,
    currentDraft.items
  );

  lastAdded = false;


  setMessage(
    elements.editorMessage,
    'Đã tạo bản sao một bộ. Mọi chỉnh sửa tiếp theo chỉ áp dụng cho bản sao; bộ gốc trong giỏ không bị thay đổi.'
  );


  persistDraft();

  renderAll();

}


// ==========================================
// 17. THÊM BỘ QUÀ VÀO GIỎ HÀNG
// ==========================================

function addCurrentDraftToCart() {

  if (!currentDraft) return;

  const enteredBudget = readBudget();


  // Kiểm tra ngân sách

  if (!isPositiveInteger(enteredBudget)) {

    setMessage(
      elements.summaryMessage,
      'Vui lòng nhập ngân sách hợp lệ trước khi thêm vào giỏ.'
    );

    elements.budget.focus();

    return;

  }


  currentDraft.budget = enteredBudget;


  // Kiểm tra bộ quà có sản phẩm

  if (
    !Array.isArray(currentDraft.items) ||
    currentDraft.items.length === 0
  ) {

    setMessage(
      elements.summaryMessage,
      'Bộ quà cần có ít nhất một sản phẩm.'
    );

    return;

  }


  // Kiểm tra sản phẩm có nằm trong danh sách được phép

  if (
    currentDraft.items.some(
      (item) => !allowedProductIds.includes(item.productId)
    )
  ) {

    setMessage(
      elements.summaryMessage,
      'Có sản phẩm nằm ngoài danh sách được phép của bộ quà.'
    );

    return;

  }


  // Kiểm tra giá bộ quà

  try {

    getItemsTotal(currentDraft.items);

  } catch (error) {

    setMessage(
      elements.summaryMessage,
      error.message
    );

    return;

  }


  // Chuẩn bị dữ liệu gửi sang cart.js

  const selection = {

    giftSetId:
      currentDraft.sourceGiftSetId || 'GIFT-CUSTOM',

    name:
      currentDraft.name || 'Bộ quà tự chọn',

    budget: currentDraft.budget,

    items: currentDraft.items.map(
      (item) => ({ ...item })
    ),

    setQuantity: currentDraft.setQuantity

  };


  // Gọi hàm thêm bộ quà của Bảo

  const result = addGiftSet(selection);


  // Nếu thêm thất bại thì giữ nguyên bản đang soạn

  if (!result.ok) {

    setMessage(
      elements.summaryMessage,
      result.message ||
      'Không thể thêm bộ quà vào giỏ. Vui lòng thử lại.'
    );

    return;

  }


  // Thêm thành công

  lastAdded = true;


  const clearResult = clearGiftDraft();


  if (clearResult.ok) {

    currentDraft = null;

    allowedProductIds = [];

    elements.editorList.replaceChildren();

    elements.editorDescription.textContent =
      'Bộ quà đã được thêm vào giỏ. Bạn có thể nhập ngân sách để tạo bộ mới.';

    elements.setQuantity.value = '1';

    elements.setQuantity.disabled = true;

    elements.duplicateButton.disabled = true;

    elements.addCartButton.disabled = true;

    elements.addProductButton.disabled = true;

    elements.unitPrice.textContent = formatPrice(0);

    elements.remaining.textContent = formatPrice(0);

    elements.exceeded.textContent = formatPrice(0);

    elements.totalPrice.textContent = formatPrice(0);


    setMessage(
      elements.summaryMessage,
      `${result.message} ${clearResult.message}`
    );

  } else {

    setMessage(
      elements.summaryMessage,
      `${result.message} Tuy nhiên, ${clearResult.message} Không bấm thêm lần nữa để tránh tạo dòng trùng.`
    );

    elements.addCartButton.disabled = true;

    elements.duplicateButton.disabled = true;

  }

}


// ==========================================
// 18. XỬ LÝ SỰ KIỆN TRONG KHU VỰC CHỈNH SỬA
// ==========================================

function handleEditorClick(event) {

  const detailLink =
    event.target.closest('[data-product-detail]');


  // Lưu bản nháp trước khi chuyển sang trang chi tiết

  if (detailLink) {

    const saved = persistDraft();

    if (!saved.ok) {

      event.preventDefault();

    }

    return;

  }


  const actionButton =
    event.target.closest('button[data-action]');

  if (!actionButton) return;


  if (
    actionButton.dataset.action === 'remove-item'
  ) {

    removeItem(
      Number(actionButton.dataset.index)
    );

  }

}


// Xử lý thay sản phẩm và số lượng

function handleEditorChange(event) {

  const productSelect =
    event.target.closest('.gift-product-select');


  if (productSelect) {

    changeProduct(
      Number(productSelect.dataset.index),
      productSelect.value
    );

    return;

  }


  const quantityInput =
    event.target.closest('.gift-product-quantity');


  if (quantityInput) {

    changeItemQuantity(
      Number(quantityInput.dataset.index),
      quantityInput.value
    );

  }

}


// ==========================================
// 19. XỬ LÝ CHỌN BỘ QUÀ
// ==========================================

function handleRecommendationClick(event) {

  const button =
    event.target.closest(
      'button[data-action="choose-gift"]'
    );

  if (button) {

    selectRecommendation(
      button.dataset.giftSetId
    );

  }

}


// ==========================================
// 20. KHÔI PHỤC BẢN QUÀ ĐANG SOẠN
// ==========================================

function restoreDraft() {

  const draft = loadGiftDraft();

  if (!draft) return;


  currentDraft = draft;

  allowedProductIds = getAllowedIds(
    draft.sourceGiftSetId,
    draft.items
  );

  lastAdded = false;


  if (isPositiveInteger(draft.budget)) {

    elements.budget.value =
      String(draft.budget);

  }


  setMessage(
    elements.editorMessage,
    'Đã khôi phục bộ quà đang soạn từ lần truy cập trước.'
  );


  renderAll();

}


// ==========================================
// 21. KHỞI TẠO TRANG CHỌN QUÀ
// ==========================================

function initGiftBuilder() {

  // Nút gợi ý bộ quà

  elements.recommendButton.addEventListener(
    'click',
    handleRecommend
  );


  // Thay đổi ngân sách

  elements.budget.addEventListener(
    'change',
    changeBudget
  );


  // Thêm sản phẩm

  elements.addProductButton.addEventListener(
    'click',
    addProductToDraft
  );


  // Xử lý chỉnh sửa sản phẩm

  elements.editorList.addEventListener(
    'click',
    handleEditorClick
  );

  elements.editorList.addEventListener(
    'change',
    handleEditorChange
  );


  // Chọn bộ quà gợi ý

  elements.recommendationList.addEventListener(
    'click',
    handleRecommendationClick
  );


  // Thay đổi số bộ

  elements.setQuantity.addEventListener(
    'change',
    changeSetQuantity
  );


  // Nhân bản bộ quà

  elements.duplicateButton.addEventListener(
    'click',
    duplicateDraft
  );


  // Thêm vào giỏ hàng

  elements.addCartButton.addEventListener(
    'click',
    addCurrentDraftToCart
  );


  // Khôi phục dữ liệu cũ

  restoreDraft();


  // Hiển thị tổng kết ban đầu

  renderSummary();

}


// ==========================================
// 22. CHẠY CHƯƠNG TRÌNH
// ==========================================

initGiftBuilder();// ==========================================
// 1. IMPORT MODULE
// ==========================================

import { giftSets } from './gift-sets.js';

import {
  getProductById,
  getItemsTotal,
  formatPrice
} from './product-utils.js';

import {
  recommendGiftSets
} from './gift-recommendations.js';

import {
  loadGiftDraft,
  saveGiftDraft,
  clearGiftDraft
} from './storage.js';

import {
  addGiftSet
} from './cart.js';


// ==========================================
// 2. LẤY CÁC PHẦN TỬ HTML
// ==========================================

const elements = {

  budget: document.querySelector('#gift-budget'),

  recommendButton: document.querySelector('#btn-recommend'),

  budgetError: document.querySelector('#budget-error'),

  recommendationDescription:
    document.querySelector('#recommend-description'),

  recommendationList:
    document.querySelector('#gift-set-list'),

  recommendationMessage:
    document.querySelector('#recommend-message'),

  editorDescription:
    document.querySelector('#gift-editor-description'),

  editorList:
    document.querySelector('#gift-editor-list'),

  addProductButton:
    document.querySelector('#btn-add-product'),

  editorMessage:
    document.querySelector('#editor-message'),

  unitPrice:
    document.querySelector('#gift-unit-price'),

  budgetDisplay:
    document.querySelector('#gift-budget-display'),

  remaining:
    document.querySelector('#gift-remaining'),

  exceeded:
    document.querySelector('#gift-exceeded'),

  setQuantity:
    document.querySelector('#gift-set-quantity'),

  totalPrice:
    document.querySelector('#gift-total-price'),

  summaryMessage:
    document.querySelector('#summary-message'),

  duplicateButton:
    document.querySelector('#btn-duplicate-gift'),

  addCartButton:
    document.querySelector('#btn-add-cart')

};


// ==========================================
// 3. BIẾN QUẢN LÝ TRẠNG THÁI
// ==========================================

let currentDraft = null;

let allowedProductIds = [];

let lastAdded = false;

let recommendationsForCurrentBudget = [];

let recommendationsBudget = null;


// ==========================================
// 4. CÁC HÀM HỖ TRỢ
// ==========================================

// Hiển thị thông báo

function setMessage(element, message = '') {

  element.textContent = message;

}


// Kiểm tra số nguyên dương

function isPositiveInteger(value) {

  return Number.isSafeInteger(value) && value > 0;

}


// Lấy ngân sách khách nhập

function readBudget() {

  const rawValue = elements.budget.value.trim();

  if (!rawValue) return null;

  const value = Number(rawValue);

  return isPositiveInteger(value) ? value : null;

}


// Lấy danh sách sản phẩm được phép sử dụng

function getAllowedIds(sourceGiftSetId, fallbackItems = []) {

  const sourceSet = giftSets.find(
    (set) => set.id === sourceGiftSetId
  );

  if (sourceSet && Array.isArray(sourceSet.allowedProductIds)) {

    return [...sourceSet.allowedProductIds];

  }

  const existingIds = fallbackItems

    .map((item) => item.productId)

    .filter((id) => getProductById(id));

  return [...new Set(existingIds)];

}


// Tạo bản nháp từ bộ quà gợi ý

function createDraftFromRecommendation(recommendation, budget) {

  return {

    version: 1,

    budget,

    sourceGiftSetId: recommendation.giftSetId,

    name: recommendation.name,

    items: recommendation.items.map((item) => ({

      productId: item.productId,

      quantity: item.quantity

    })),

    setQuantity: 1,

    copiedFromLineId: null

  };

}


// Lưu bản quà đang soạn

function persistDraft() {

  if (!currentDraft) {

    return { ok: true, message: '' };

  }

  const result = saveGiftDraft(currentDraft);

  if (!result.ok) {

    setMessage(elements.editorMessage, result.message);

  }

  return result;

}


// Tạo phần tử HTML an toàn

function createElement(tag, className, text) {

  const element = document.createElement(tag);

  if (className) {

    element.className = className;

  }

  if (text !== undefined) {

    element.textContent = text;

  }

  return element;

}


// ==========================================
// 5. HIỂN THỊ CÁC BỘ QUÀ GỢI Ý
// ==========================================

function renderRecommendations(list) {

  elements.recommendationList.replaceChildren();

  list.forEach((recommendation) => {

    const card = createElement(
      'article',
      'gift-set-card'
    );

    const title = createElement(
      'h3',
      '',
      recommendation.name
    );

    const price = createElement(
      'p',
      'gift-set-price',
      `Giá một bộ: ${formatPrice(recommendation.unitTotal)}`
    );

    const remaining = createElement(
      'p',
      '',
      `Còn lại: ${formatPrice(recommendation.remainingBudget)}`
    );

    const itemList = createElement(
      'ul',
      'gift-set-items'
    );

    recommendation.items.forEach((item) => {

      const product = item.product ??
        getProductById(item.productId);

      if (!product) return;

      const line = createElement(
        'li',
        '',
        `${product.name} × ${item.quantity}`
      );

      itemList.append(line);

    });

    const chooseButton = createElement(
      'button',
      'button button-primary',
      'Chọn bộ quà này'
    );

    chooseButton.type = 'button';

    chooseButton.dataset.action = 'choose-gift';

    chooseButton.dataset.giftSetId =
      recommendation.giftSetId;

    card.append(
      title,
      price,
      remaining,
      itemList,
      chooseButton
    );

    elements.recommendationList.append(card);

  });

}


// ==========================================
// 6. HIỂN THỊ KHU VỰC CHỈNH SỬA
// ==========================================

function renderEditor() {

  elements.editorList.replaceChildren();

  if (!currentDraft) {

    elements.editorDescription.textContent =
      'Hãy chọn một bộ quà để bắt đầu chỉnh sửa.';

    elements.addProductButton.disabled = true;

    return;

  }

  elements.editorDescription.textContent =
    currentDraft.name || 'Bộ quà đang chỉnh sửa';

  elements.addProductButton.disabled =
    allowedProductIds.length === 0;


  if (currentDraft.items.length === 0) {

    elements.editorList.append(

      createElement(
        'p',
        'gift-empty-message',
        'Bộ quà chưa có sản phẩm. Hãy thêm ít nhất một món.'
      )

    );

  }


  currentDraft.items.forEach((item, index) => {

    const product = getProductById(item.productId);

    if (!product) return;


    const row = createElement(
      'article',
      'gift-editor-item'
    );


    // Hình ảnh sản phẩm

    const image = createElement('img', 'gift-editor-image');

    image.src = product.image;

    image.alt = product.name;

    image.width = 120;

    image.height = 120;

    image.loading = 'lazy';


    // Thông tin sản phẩm

    const info = createElement(
      'div',
      'gift-editor-item-info'
    );

    const name = createElement(
      'h3',
      '',
      product.name
    );

    const price = createElement(
      'p',
      '',
      `Đơn giá: ${formatPrice(product.price)}`
    );


    // Chọn sản phẩm thay thế

    const productLabel = createElement(
      'label',
      '',
      'Sản phẩm'
    );

    const productSelect = createElement(
      'select',
      'gift-product-select'
    );

    productSelect.dataset.index = String(index);

    productSelect.setAttribute(
      'aria-label',
      `Chọn sản phẩm cho dòng ${index + 1}`
    );


    allowedProductIds.forEach((productId) => {

      const allowedProduct = getProductById(productId);

      if (!allowedProduct) return;

      const option = createElement(
        'option',
        '',
        `${allowedProduct.name} — ${formatPrice(allowedProduct.price)}`
      );

      option.value = allowedProduct.id;

      option.selected =
        allowedProduct.id === item.productId;

      productSelect.append(option);

    });

    productLabel.append(productSelect);


    // Thay đổi số lượng

    const quantityLabel = createElement(
      'label',
      '',
      'Số lượng'
    );

    const quantityInput = createElement(
      'input',
      'gift-product-quantity'
    );

    quantityInput.type = 'number';

    quantityInput.min = '1';

    quantityInput.step = '1';

    quantityInput.value = String(item.quantity);

    quantityInput.dataset.index = String(index);

    quantityInput.setAttribute(
      'aria-label',
      `Số lượng ${product.name}`
    );

    quantityLabel.append(quantityInput);


    // Xem chi tiết sản phẩm

    const detailLink = createElement(
      'a',
      'gift-detail-link',
      'Xem chi tiết sản phẩm'
    );

    detailLink.href =
      `product-detail.html?id=${encodeURIComponent(product.id)}&from=gift`;

    detailLink.dataset.productDetail = 'true';

    detailLink.dataset.productId = product.id;


    // Xóa sản phẩm

    const removeButton = createElement(
      'button',
      'button button-secondary',
      'Bỏ sản phẩm'
    );

    removeButton.type = 'button';

    removeButton.dataset.action = 'remove-item';

    removeButton.dataset.index = String(index);


    info.append(
      name,
      price,
      productLabel,
      quantityLabel,
      detailLink,
      removeButton
    );

    row.append(image, info);

    elements.editorList.append(row);

  });

}


// ==========================================
// 7. TÍNH TOÁN VÀ HIỂN THỊ TỔNG KẾT
// ==========================================

function renderSummary() {

  const budget =
    currentDraft?.budget ?? readBudget() ?? 0;

  const setQuantity =
    currentDraft?.setQuantity ?? 1;

  let unitTotal = 0;

  let total = 0;

  let calculationError = '';


  try {

    if (currentDraft?.items?.length) {

      unitTotal = getItemsTotal(currentDraft.items);

    }

    total = unitTotal * setQuantity;

    if (!Number.isSafeInteger(total)) {

      throw new RangeError(
        'Thành tiền vượt giới hạn an toàn.'
      );

    }

  } catch (error) {

    calculationError = error.message;

  }


  elements.unitPrice.textContent =
    formatPrice(unitTotal);

  elements.budgetDisplay.textContent =
    formatPrice(budget);

  elements.remaining.textContent =
    formatPrice(Math.max(budget - unitTotal, 0));

  elements.exceeded.textContent =
    formatPrice(Math.max(unitTotal - budget, 0));

  elements.totalPrice.textContent =
    calculationError
      ? 'Không thể tính'
      : formatPrice(total);


  elements.setQuantity.value =
    String(setQuantity);

  elements.setQuantity.disabled =
    !currentDraft;

  elements.duplicateButton.disabled =
    !currentDraft ||
    currentDraft.items.length === 0 ||
    lastAdded;

  elements.addCartButton.disabled =
    !currentDraft ||
    currentDraft.items.length === 0 ||
    lastAdded ||
    Boolean(calculationError);


  if (calculationError) {

    setMessage(
      elements.summaryMessage,
      calculationError
    );

  } else if (
    currentDraft &&
    unitTotal > budget &&
    budget > 0
  ) {

    setMessage(
      elements.summaryMessage,
      `Bộ quà đang vượt ngân sách ${formatPrice(unitTotal - budget)}. Bạn vẫn có thể thêm bộ quà vào giỏ nếu số lượng hợp lệ.`
    );

  } else {

    setMessage(elements.summaryMessage, '');

  }

}


// Hiển thị lại toàn bộ khu vực chỉnh sửa và tổng kết

function renderAll() {

  renderEditor();

  renderSummary();

}


// ==========================================
// 8. CHỌN BỘ QUÀ GỢI Ý
// ==========================================

function selectRecommendation(giftSetId) {

  const recommendation =
    recommendationsForCurrentBudget.find(
      (item) => item.giftSetId === giftSetId
    );

  if (!recommendation) return;


  currentDraft = createDraftFromRecommendation(
    recommendation,
    readBudget()
  );

  allowedProductIds = getAllowedIds(
    currentDraft.sourceGiftSetId,
    currentDraft.items
  );

  lastAdded = false;

  setMessage(elements.editorMessage, '');

  setMessage(elements.summaryMessage, '');

  persistDraft();

  renderAll();

}


// ==========================================
// 9. GỢI Ý BỘ QUÀ THEO NGÂN SÁCH
// ==========================================

function handleRecommend() {

  setMessage(elements.budgetError, '');

  setMessage(elements.recommendationMessage, '');

  const budget = readBudget();


  // Kiểm tra ngân sách

  if (budget === null) {

    setMessage(
      elements.budgetError,
      'Vui lòng nhập ngân sách là số nguyên dương (VNĐ).'
    );

    elements.budget.focus();

    return;

  }


  recommendationsBudget = budget;

  recommendationsForCurrentBudget =
    recommendGiftSets(budget);


  if (currentDraft) {

    currentDraft.budget = budget;

    persistDraft();

    renderSummary();

  }


  elements.recommendationDescription.textContent =
    `Các bộ quà phù hợp với ngân sách ${formatPrice(budget)} cho một bộ:`;


  // Không tìm thấy bộ quà phù hợp

  if (recommendationsForCurrentBudget.length === 0) {

    elements.recommendationList.replaceChildren();

    setMessage(
      elements.recommendationMessage,
      'Hiện chưa có bộ quà phù hợp. Bạn có thể thử ngân sách cao hơn.'
    );

    return;

  }


  // Hiển thị bộ quà

  renderRecommendations(
    recommendationsForCurrentBudget
  );

  setMessage(
    elements.recommendationMessage,
    `Tìm thấy ${recommendationsForCurrentBudget.length} bộ quà phù hợp.`
  );

}


// ==========================================
// 10. THÊM SẢN PHẨM VÀO BỘ QUÀ
// ==========================================

function addProductToDraft() {

  if (!currentDraft || allowedProductIds.length === 0) {

    return;

  }

  const existingIds = new Set(
    currentDraft.items.map((item) => item.productId)
  );

  const nextId =
    allowedProductIds.find(
      (id) => !existingIds.has(id)
    ) ?? allowedProductIds[0];


  currentDraft.items.push({

    productId: nextId,

    quantity: 1

  });

  lastAdded = false;

  setMessage(elements.editorMessage, '');

  persistDraft();

  renderAll();

}


// ==========================================
// 11. THAY ĐỔI SẢN PHẨM
// ==========================================

function changeProduct(index, nextProductId) {

  if (
    !currentDraft ||
    !allowedProductIds.includes(nextProductId) ||
    !getProductById(nextProductId)
  ) {

    return;

  }

  const target = currentDraft.items[index];

  if (!target) return;


  // Nếu sản phẩm đã tồn tại thì gộp số lượng

  const duplicate = currentDraft.items.find(
    (item, itemIndex) =>
      itemIndex !== index &&
      item.productId === nextProductId
  );


  if (duplicate) {

    duplicate.quantity += target.quantity;

    currentDraft.items.splice(index, 1);

  } else {

    target.productId = nextProductId;

  }


  lastAdded = false;

  persistDraft();

  renderAll();

}


// ==========================================
// 12. THAY ĐỔI SỐ LƯỢNG SẢN PHẨM
// ==========================================

function changeItemQuantity(index, rawValue) {

  if (!currentDraft) return;

  const quantity = Number(rawValue);


  if (!isPositiveInteger(quantity)) {

    setMessage(
      elements.editorMessage,
      'Số lượng phải là số nguyên dương.'
    );

    renderEditor();

    return;

  }


  const item = currentDraft.items[index];

  if (!item) return;


  item.quantity = quantity;

  lastAdded = false;

  setMessage(elements.editorMessage, '');

  persistDraft();

  renderAll();

}


// ==========================================
// 13. XÓA SẢN PHẨM
// ==========================================

function removeItem(index) {

  if (
    !currentDraft ||
    !currentDraft.items[index]
  ) {

    return;

  }

  currentDraft.items.splice(index, 1);

  lastAdded = false;

  persistDraft();

  renderAll();

}


// ==========================================
// 14. THAY ĐỔI SỐ BỘ MUỐN MUA
// ==========================================

function changeSetQuantity() {

  if (!currentDraft) return;

  const quantity =
    Number(elements.setQuantity.value);


  if (!isPositiveInteger(quantity)) {

    setMessage(
      elements.summaryMessage,
      'Số bộ muốn mua phải là số nguyên dương.'
    );

    elements.setQuantity.value =
      String(currentDraft.setQuantity);

    return;

  }


  currentDraft.setQuantity = quantity;

  lastAdded = false;

  persistDraft();

  renderSummary();

}


// ==========================================
// 15. THAY ĐỔI NGÂN SÁCH
// ==========================================

function changeBudget() {

  const budget = readBudget();


  if (budget === null) {

    setMessage(
      elements.budgetError,
      'Ngân sách phải là số nguyên dương (VNĐ).'
    );

    return;

  }


  setMessage(elements.budgetError, '');


  if (currentDraft) {

    currentDraft.budget = budget;

    lastAdded = false;

    persistDraft();

  }


  if (
    recommendationsBudget !== null &&
    recommendationsBudget !== budget
  ) {

    recommendationsForCurrentBudget = [];

    recommendationsBudget = null;

    elements.recommendationList.replaceChildren();

    elements.recommendationDescription.textContent =
      'Ngân sách đã thay đổi. Hãy bấm “Gợi ý bộ quà” để cập nhật danh sách.';

    setMessage(elements.recommendationMessage, '');

  }


  renderSummary();

}


// ==========================================
// 16. NHÂN BẢN BỘ QUÀ ĐỂ CHỈNH RIÊNG
// ==========================================

function duplicateDraft() {

  if (
    !currentDraft ||
    currentDraft.items.length === 0
  ) {

    return;

  }


  // Tạo bản sao độc lập, không sửa bản gốc

  currentDraft = {

    version: 1,

    budget: currentDraft.budget,

    sourceGiftSetId: currentDraft.sourceGiftSetId,

    name: `${currentDraft.name || 'Bộ quà'} (bản chỉnh riêng)`,

    items: currentDraft.items.map(
      (item) => ({ ...item })
    ),

    setQuantity: 1,

    copiedFromLineId:
      currentDraft.copiedFromLineId ?? null

  };


  allowedProductIds = getAllowedIds(
    currentDraft.sourceGiftSetId,
    currentDraft.items
  );

  lastAdded = false;


  setMessage(
    elements.editorMessage,
    'Đã tạo bản sao một bộ. Mọi chỉnh sửa tiếp theo chỉ áp dụng cho bản sao; bộ gốc trong giỏ không bị thay đổi.'
  );


  persistDraft();

  renderAll();

}


// ==========================================
// 17. THÊM BỘ QUÀ VÀO GIỎ HÀNG
// ==========================================

function addCurrentDraftToCart() {

  if (!currentDraft) return;

  const enteredBudget = readBudget();


  // Kiểm tra ngân sách

  if (!isPositiveInteger(enteredBudget)) {

    setMessage(
      elements.summaryMessage,
      'Vui lòng nhập ngân sách hợp lệ trước khi thêm vào giỏ.'
    );

    elements.budget.focus();

    return;

  }


  currentDraft.budget = enteredBudget;


  // Kiểm tra bộ quà có sản phẩm

  if (
    !Array.isArray(currentDraft.items) ||
    currentDraft.items.length === 0
  ) {

    setMessage(
      elements.summaryMessage,
      'Bộ quà cần có ít nhất một sản phẩm.'
    );

    return;

  }


  // Kiểm tra sản phẩm có nằm trong danh sách được phép

  if (
    currentDraft.items.some(
      (item) => !allowedProductIds.includes(item.productId)
    )
  ) {

    setMessage(
      elements.summaryMessage,
      'Có sản phẩm nằm ngoài danh sách được phép của bộ quà.'
    );

    return;

  }


  // Kiểm tra giá bộ quà

  try {

    getItemsTotal(currentDraft.items);

  } catch (error) {

    setMessage(
      elements.summaryMessage,
      error.message
    );

    return;

  }


  // Chuẩn bị dữ liệu gửi sang cart.js

  const selection = {

    giftSetId:
      currentDraft.sourceGiftSetId || 'GIFT-CUSTOM',

    name:
      currentDraft.name || 'Bộ quà tự chọn',

    budget: currentDraft.budget,

    items: currentDraft.items.map(
      (item) => ({ ...item })
    ),

    setQuantity: currentDraft.setQuantity

  };


  // Gọi hàm thêm bộ quà của Bảo

  const result = addGiftSet(selection);


  // Nếu thêm thất bại thì giữ nguyên bản đang soạn

  if (!result.ok) {

    setMessage(
      elements.summaryMessage,
      result.message ||
      'Không thể thêm bộ quà vào giỏ. Vui lòng thử lại.'
    );

    return;

  }


  // Thêm thành công

  lastAdded = true;


  const clearResult = clearGiftDraft();


  if (clearResult.ok) {

    currentDraft = null;

    allowedProductIds = [];

    elements.editorList.replaceChildren();

    elements.editorDescription.textContent =
      'Bộ quà đã được thêm vào giỏ. Bạn có thể nhập ngân sách để tạo bộ mới.';

    elements.setQuantity.value = '1';

    elements.setQuantity.disabled = true;

    elements.duplicateButton.disabled = true;

    elements.addCartButton.disabled = true;

    elements.addProductButton.disabled = true;

    elements.unitPrice.textContent = formatPrice(0);

    elements.remaining.textContent = formatPrice(0);

    elements.exceeded.textContent = formatPrice(0);

    elements.totalPrice.textContent = formatPrice(0);


    setMessage(
      elements.summaryMessage,
      `${result.message} ${clearResult.message}`
    );

  } else {

    setMessage(
      elements.summaryMessage,
      `${result.message} Tuy nhiên, ${clearResult.message} Không bấm thêm lần nữa để tránh tạo dòng trùng.`
    );

    elements.addCartButton.disabled = true;

    elements.duplicateButton.disabled = true;

  }

}


// ==========================================
// 18. XỬ LÝ SỰ KIỆN TRONG KHU VỰC CHỈNH SỬA
// ==========================================

function handleEditorClick(event) {

  const detailLink =
    event.target.closest('[data-product-detail]');


  // Lưu bản nháp trước khi chuyển sang trang chi tiết

  if (detailLink) {

    const saved = persistDraft();

    if (!saved.ok) {

      event.preventDefault();

    }

    return;

  }


  const actionButton =
    event.target.closest('button[data-action]');

  if (!actionButton) return;


  if (
    actionButton.dataset.action === 'remove-item'
  ) {

    removeItem(
      Number(actionButton.dataset.index)
    );

  }

}


// Xử lý thay sản phẩm và số lượng

function handleEditorChange(event) {

  const productSelect =
    event.target.closest('.gift-product-select');


  if (productSelect) {

    changeProduct(
      Number(productSelect.dataset.index),
      productSelect.value
    );

    return;

  }


  const quantityInput =
    event.target.closest('.gift-product-quantity');


  if (quantityInput) {

    changeItemQuantity(
      Number(quantityInput.dataset.index),
      quantityInput.value
    );

  }

}


// ==========================================
// 19. XỬ LÝ CHỌN BỘ QUÀ
// ==========================================

function handleRecommendationClick(event) {

  const button =
    event.target.closest(
      'button[data-action="choose-gift"]'
    );

  if (button) {

    selectRecommendation(
      button.dataset.giftSetId
    );

  }

}


// ==========================================
// 20. KHÔI PHỤC BẢN QUÀ ĐANG SOẠN
// ==========================================

function restoreDraft() {

  const draft = loadGiftDraft();

  if (!draft) return;


  currentDraft = draft;

  allowedProductIds = getAllowedIds(
    draft.sourceGiftSetId,
    draft.items
  );

  lastAdded = false;


  if (isPositiveInteger(draft.budget)) {

    elements.budget.value =
      String(draft.budget);

  }


  setMessage(
    elements.editorMessage,
    'Đã khôi phục bộ quà đang soạn từ lần truy cập trước.'
  );


  renderAll();

}


// ==========================================
// 21. KHỞI TẠO TRANG CHỌN QUÀ
// ==========================================

function initGiftBuilder() {

  // Nút gợi ý bộ quà

  elements.recommendButton.addEventListener(
    'click',
    handleRecommend
  );


  // Thay đổi ngân sách

  elements.budget.addEventListener(
    'change',
    changeBudget
  );


  // Thêm sản phẩm

  elements.addProductButton.addEventListener(
    'click',
    addProductToDraft
  );


  // Xử lý chỉnh sửa sản phẩm

  elements.editorList.addEventListener(
    'click',
    handleEditorClick
  );

  elements.editorList.addEventListener(
    'change',
    handleEditorChange
  );


  // Chọn bộ quà gợi ý

  elements.recommendationList.addEventListener(
    'click',
    handleRecommendationClick
  );


  // Thay đổi số bộ

  elements.setQuantity.addEventListener(
    'change',
    changeSetQuantity
  );


  // Nhân bản bộ quà

  elements.duplicateButton.addEventListener(
    'click',
    duplicateDraft
  );


  // Thêm vào giỏ hàng

  elements.addCartButton.addEventListener(
    'click',
    addCurrentDraftToCart
  );


  // Khôi phục dữ liệu cũ

  restoreDraft();


  // Hiển thị tổng kết ban đầu

  renderSummary();

}


// ==========================================
// 22. CHẠY CHƯƠNG TRÌNH
// ==========================================

initGiftBuilder();
