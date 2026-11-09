import { products } from './products.js';
import { renderProducts } from './product-list.js';

// Khởi tạo 2A: không import module tìm kiếm/giỏ chưa được bàn giao.
// 2B nhận initProductFilters của Tuấn và addSingle của Bảo, rồi gắn
// một listener ở [data-products-list]; không gắn listener trong renderProducts.
renderProducts(products);

// Sau render, khôi phục đích danh mục khi vào từ trang chủ.
const anchor = document.getElementById(location.hash.slice(1));
if (anchor) anchor.scrollIntoView();
