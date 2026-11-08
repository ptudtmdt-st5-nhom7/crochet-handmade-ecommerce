// Chỉ dùng ở docs/kiem-tra-storage.html; không nạp vào trang bán hàng.
import { loadCart, saveCart, loadGiftDraft, saveGiftDraft, clearGiftDraft } from './storage.js';

const sampleCart = () => ({ version: 1, lines: [
  { lineId: 'single:KC-001', type: 'single', productId: 'KC-001', quantity: 2 },
  { lineId: 'gift:HL-001=1|KC-001=1', type: 'gift', giftSetId: 'GIFT-01', name: 'Món quà nhỏ',
    budget: 100000, items: [{ productId: 'KC-001', quantity: 1 }, { productId: 'HL-001', quantity: 1 }], setQuantity: 2 },
] });
const sampleDraft = () => ({ version: 1, budget: 100000, sourceGiftSetId: 'GIFT-01', name: 'Món quà nhỏ',
  items: [{ productId: 'KC-001', quantity: 1 }, { productId: 'HL-001', quantity: 1 }],
  setQuantity: 1, copiedFromLineId: 'gift:HL-001=1|KC-001=1' });

function show() {
  document.querySelector('#cart-output').textContent = JSON.stringify(loadCart(), null, 2);
  document.querySelector('#draft-output').textContent = JSON.stringify(loadGiftDraft(), null, 2);
}
document.querySelector('.actions').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  let result;
  switch (button.dataset.action) {
    case 'cart': result = saveCart(sampleCart()); break;
    case 'draft': result = saveGiftDraft(sampleDraft()); break;
    case 'clear-draft': result = clearGiftDraft(); break;
    default: result = { ok: true, message: 'Đã đọc lại; trang không tự sửa dữ liệu.' };
  }
  document.querySelector('#status').textContent = `${result.ok ? '✓' : 'Không thành công:'} ${result.message}`;
  show();
});
show();
document.querySelector('#status').textContent = 'Module đã sẵn sàng. Đã đọc dữ liệu hiện có; chưa ghi dữ liệu mẫu.';
