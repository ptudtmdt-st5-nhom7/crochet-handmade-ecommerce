import { updateCartBadge } from './cart.js';

// Mỗi trang dùng cùng giỏ và cùng số món, không tạo thêm trạng thái riêng.
updateCartBadge();

// products-page.js xử lý tìm trực tiếp tại danh sách. Các trang khác chuyển
// từ khóa sang danh sách bằng tham số q, không giữ nút tìm minh họa bị khóa.
if (!document.querySelector('[data-products-list]')) {
  const input = document.getElementById('site-search');
  const button = document.querySelector('.search-control button');
  if (input && button) {
    button.disabled = false;
    const note = document.getElementById('search-note');
    if (note) note.textContent = 'Tìm theo tên hoặc mã sản phẩm.';
    const search = () => {
      const target = new URL('products.html', window.location.href);
      const query = input.value.trim();
      if (query) target.searchParams.set('q', query);
      window.location.assign(target.href);
    };
    button.addEventListener('click', search);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        search();
      }
    });
  }
}
