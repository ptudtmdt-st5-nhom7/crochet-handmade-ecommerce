# BÁO CÁO BÀN GIAO BƯỚC 3A — NGUYỄN ANH TUẤN

**Đề tài:** Lenly Crochet — Môn Phát triển ứng dụng Web/TMĐT

**Thành viên thực hiện (PIC):** Nguyễn Anh Tuấn

**Nhóm:** Nhóm 7

---

## 1. THÔNG TIN CHUNG
- **Nhiệm vụ phân công (Bước 3A):** 
  - Xây dựng hàm tìm kiếm theo tên, lọc danh mục, sắp xếp giá sản phẩm (`js/product-filters.js`).
  - Xây dựng hàm gợi ý bộ quà theo ngân sách `recommendGiftSets(budget)` (`js/gift-recommendations.js`).
- **Repository của nhóm:** [crochet-handmade-ecommerce](https://github.com/ptudtmdt-st5-nhom7/crochet-handmade-ecommerce)

---

## 2. HƯỚNG DẪN SỬ DỤNG VÀ CÁCH GỌI HÀM

### A. Tích hợp bộ lọc sản phẩm (Dành cho Nam - `js/product-filters.js`)
1. **Import từ đâu:**
   ```javascript
   import { products } from './products.js';
   import { renderProducts } from './product-list.js';
   import { initProductFilters } from './product-filters.js';
   ```
2. **Cách gọi hàm:**
   ```javascript
   initProductFilters({ 
     products, 
     renderProducts, 
     cartReady: true, 
     detailReady: true 
   });
   ```
3. **Giải thích đầu vào / đầu ra / hoạt động:**
   - `filterAndSortProducts(list, options)` nhận vào mảng sản phẩm `list` và đối tượng `options` (`{ query, category, sort }`). 
   - Hàm xử lý lọc theo tên/mã, danh mục và sắp xếp (`price-asc`, `price-desc`) trên bản sao mảng (`[...list]`) để **tuyệt đối không làm thay đổi mảng `products` gốc**.
   - `initProductFilters(...)` tự động tìm các phần tử HTML trên `products.html`, mở khóa `fieldset` và lắng nghe sự kiện để render lại danh sách ngay lập tức.
4. **Trường hợp đặc biệt:**
   - Nếu không tìm thấy kết quả phù hợp, hàm trả về mảng rỗng `[]` để giao diện hiển thị thông báo không có kết quả. Nếu mảng đầu vào không phải mảng, hệ thống ném ngoại lệ bảo vệ `TypeError`.

### B. Tích hợp gợi ý bộ quà theo ngân sách (Dành cho Châu - `js/gift-recommendations.js`)
1. **Import từ đâu:**
   ```javascript
   import { recommendGiftSets } from './gift-recommendations.js';
   ```
2. **Truyền gì vào (`recommendGiftSets(budget)`):**
   - Truyền vào một số nguyên dương đại diện cho ngân sách tối đa dành cho **một bộ quà** (đơn vị: VNĐ).
   - *Ví dụ:* `recommendGiftSets(150000)` nghĩa là tìm kiếm các bộ quà có tổng giá trị không vượt quá 150.000 đồng.
3. **Nhận lại gì (Đầu ra):**
   - Trả về mảng các bộ quà tặng thỏa mãn điều kiện ngân sách. Mỗi phần tử chứa các trường:
     - `id`: Mã bộ quà (VD: `"GIFT-01"`).
     - `name`: Tên bộ quà (VD: `"Món quà nhỏ"`).
     - `items`: Danh sách sản phẩm thành phần bên trong kèm thông tin chi tiết (`product`).
     - `totalPrice`: Tổng giá trị tiền của 1 bộ (`Number`).
     - `formattedTotalPrice`: Tổng giá đã định dạng tiền tệ (VD: `"80.000 ₫"`).
     - `remainingBudget`: Số tiền còn thừa so với ngân sách.
     - `formattedRemainingBudget`: Tiền thừa đã định dạng.
     - `allowedProductIds`: Danh sách mã sản phẩm được phép tùy chỉnh trong bộ.
4. **Trường hợp đặc biệt:**
   - Nếu ngân sách truyền vào không hợp lệ (số âm, số 0, hoặc kiểu dữ liệu khác số), hàm tự động trả về mảng rỗng `[]`.
   - Nếu không có bộ quà nào có tổng giá nằm trong giới hạn ngân sách, hàm trả về mảng rỗng `[]` để Châu hiển thị thông báo cho khách hàng.

---

## 3. CÁC CA TỰ THỬ (SELF-TEST CASES) ĐÃ THỰC HIỆN

| Ca thử (Test Case) | Dữ liệu đầu vào thực tế | Kết quả thực tế hàm trả về | Giải thích nghiệp vụ |
| :--- | :--- | :--- | :--- |
| **Ca 1 (Lọc & Sắp xếp 3A)** | `query: 'gấu'`, `category: 'moc-khoa'`, `sort: 'price-asc'` | Trả về mảng chứa chính xác 1 sản phẩm: *Móc khóa gấu len* (`KC-001`) giá 45.000đ. Mảng `products` gốc không bị thay đổi thứ tự. | Kiểm tra kết hợp đồng thời bộ lọc từ khóa, danh mục và sắp xếp giá tăng dần thành công. |
| **Ca 2 (Gợi ý quà hợp lệ 3B)** | `budget = 150000` | Trả về mảng chứa bộ `"GIFT-01"` (*Món quà nhỏ* gồm `KC-001` và `HL-001`, tổng giá = $45.000 + 35.000 = 80.000\text{đ}$) với số tiền thừa `remainingBudget = 70000`. | Lọc thành công bộ quà có giá nằm trong mức ngân sách cho phép của khách hàng. |
| **Ca 3 (Ngân sách quá thấp 3B)** | `budget = 20000` | Trả về mảng rỗng `[]`. | Xử lý đúng khi ngân sách của khách quá thấp, không mua được bộ quà nào, kích hoạt hiển thị thông báo lỗi trên giao diện của Châu. |
| **Ca 4 (Ngân sách sai định dạng 3B)** | `budget = -10000` hoặc `"abc"` | Trả về mảng rỗng `[]` (không ném ngoại lệ làm crash ứng dụng). | Đảm bảo tính an toàn dữ liệu đầu vào khi người dùng nhập sai hoặc để trống ô ngân sách. |