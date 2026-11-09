# Báo cáo bàn giao Bước 3A — Nguyễn Anh Tuấn

## 1. Thông tin chung
- **Họ và tên thành viên (PIC):** Nguyễn Anh Tuấn
- **Nhiệm vụ phân công (Bước 3A):**
  - Viết hàm tìm kiếm theo tên, lọc danh mục, sắp xếp giá tăng/giảm (`js/product-filters.js`) bàn giao cho Nam.
  - Viết hàm gợi ý bộ quà theo ngân sách `recommendGiftSets(budget)` (`js/gift-recommendations.js`) bàn giao cho Châu.
- **Repository của nhóm:** [crochet-handmade-ecommerce](https://github.com/ptudtmdt-st5-nhom7/crochet-handmade-ecommerce)

---

## 2. Hướng dẫn sử dụng module tìm kiếm, lọc và sắp xếp (Dành cho Nam - `js/product-filters.js`)

### Cách gọi hàm & Import
```javascript
import { products } from './products.js';
import { renderProducts } from './product-list.js';
import { initProductFilters } from './product-filters.js';

// Khởi tạo bộ lọc và gắn sự kiện cho các điều khiển trên trang products.html
initProductFilters({ products, renderProducts, cartReady: true, detailReady: true });