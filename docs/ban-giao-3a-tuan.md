# BÁO CÁO BÀN GIAO BƯỚC 3A — NGUYỄN ANH TUẤN

**Đề tài:** Lenly Crochet — Môn Phát triển ứng dụng Web/TMĐT

**Thành viên thực hiện (PIC):** Nguyễn Anh Tuấn

**Nhóm:** Nhóm 7

## 1. THÔNG TIN CHUNG

* **Nhiệm vụ phân công (Bước 3A):**
  * Xây dựng hàm tìm kiếm theo tên, lọc danh mục, sắp xếp giá sản phẩm (`js/product-filters.js`) — bàn giao cho **Nam**.
  * Xây dựng hàm gợi ý bộ quà theo ngân sách `recommendGiftSets(budget)` (`js/gift-recommendations.js`) — bàn giao cho **Châu**.
* **Repository của nhóm:** [crochet-handmade-ecommerce](https://github.com/ptudtmdt-st5-nhom7/crochet-handmade-ecommerce)

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
   * `filterAndSortProducts(list, options)` nhận vào mảng sản phẩm `list` và đối tượng `options` (`{ query, category, sort }`).
   * Hàm xử lý lọc theo tên/mã, danh mục và sắp xếp (`price-asc`, `price-desc`) trên bản sao mảng (`[...list]`) để **tuyệt đối không làm thay đổi mảng `products` gốc**.
   * `initProductFilters(...)` tự động tìm các phần tử HTML trên `products.html` (`[data-product-search]`, `[data-category-filter]`, `[data-sort-select]`), mở khóa `fieldset` và lắng nghe sự kiện để render lại danh sách ngay lập tức.

4. **Trường hợp đặc biệt:**
   * Nếu không tìm thấy kết quả phù hợp, hàm trả về mảng rỗng `[]` để giao diện hiển thị thông báo không có kết quả. Nếu mảng đầu vào không phải mảng, hệ thống ném ngoại lệ bảo vệ `TypeError`.

---

### B. Tích hợp gợi ý bộ quà theo ngân sách (Dành cho Châu - `js/gift-recommendations.js`)

1. **Import từ đâu:**
   Trong file xử lý trang chọn quà (ví dụ `js/gift-builder.js`), import hàm bằng dòng lệnh:
   ```javascript
   import { recommendGiftSets } from './gift-recommendations.js';
   ```

2. **Truyền gì vào (`recommendGiftSets(budget)`):**
   * Truyền vào `budget` là **một số nguyên dương** đại diện cho ngân sách tối đa của **một bộ quà** (đơn vị: đồng / VND).
   * *Ví dụ:*
     ```javascript
     const suggestions = recommendGiftSets(100000);
     ```
     *(Nghĩa là tìm các bộ quà mẫu có giá một bộ không vượt quá 100.000 đồng và đủ số lượng hàng mẫu `stockDemo` cho từng sản phẩm trong bộ).*

3. **Nhận lại gì (Đầu ra & Ví dụ thực tế):**
   * Hàm trả về một mảng các đối tượng bộ quà thỏa mãn điều kiện, đã được **sắp xếp theo giá một bộ (`unitTotal`) tăng dần** (ví dụ: `80.000` $\rightarrow$ `129.000` $\rightarrow$ `150.000` đồng; nếu hai bộ cùng giá sẽ sắp xếp theo mã bộ `giftSetId` tăng dần để thứ tự luôn ổn định).
   * **Kết quả thực tế khi chạy `recommendGiftSets(100000)`:**
     ```javascript
     [
       {
         giftSetId: 'GIFT-01',
         name: 'Món quà nhỏ',
         items: [
           {
             productId: 'KC-001',
             quantity: 1,
             product: { id: 'KC-001', name: 'Móc khóa gấu len', price: 45000, stockDemo: 20, ... }
           },
           {
             productId: 'HL-001',
             quantity: 1,
             product: { id: 'HL-001', name: 'Hoa tulip len', price: 35000, stockDemo: 20, ... }
           }
         ],
         unitTotal: 80000,
         formattedUnitTotal: '80.000 ₫',
         remainingBudget: 20000,
         formattedRemainingBudget: '20.000 ₫',
         allowedProductIds: ['KC-001', 'KC-002', 'HL-001', 'HL-002', 'PK-001', 'PK-002']
       }
     ]
     ```
   * **Giải thích các trường để Châu lấy dữ liệu hiển thị:**
     * `giftSetId`: Mã bộ quà mẫu (VD: `'GIFT-01'`). Khi khách bấm chọn bộ này để chỉnh sửa, Châu dùng trường này gán vào `sourceGiftSetId` của bản soạn quà (`giftDraft`).
     * `name`: Tên bộ quà để hiển thị tiêu đề thẻ gợi ý (VD: `'Món quà nhỏ'`).
     * `items`: Danh sách các sản phẩm thành phần trong bộ. Mỗi phần tử gồm `productId` (mã sản phẩm), `quantity` (số lượng cần cho 1 bộ) và `product` (đối tượng sản phẩm đầy đủ từ `products.js` để Châu lấy trực tiếp `product.name`, `product.price`, `product.image`).
     * `unitTotal`: Tổng giá trị tiền của **một bộ quà** kiểu `Number` (VD: `80000`).
     * `formattedUnitTotal`: Giá một bộ đã định dạng tiền tệ VND (VD: `'80.000 ₫'`).
     * `remainingBudget`: Số tiền còn dư so với ngân sách truyền vào (`budget - unitTotal`, VD: `20000`).
     * `formattedRemainingBudget`: Số tiền còn dư đã định dạng tiền tệ VND (VD: `'20.000 ₫'`).
     * `allowedProductIds`: Danh sách mã sản phẩm được phép thay đổi/thêm bớt trong bộ quà đó.

4. **Trường hợp đặc biệt:**
   * **Ngân sách không hợp lệ:** Nếu truyền vào `budget <= 0`, số âm, số lẻ thập phân, `NaN`, `null`, hoặc chuỗi `'abc'`, hàm tự động trả về mảng rỗng `[]` mà không làm văng lỗi dừng trang.
   * **Không có bộ quà phù hợp:** Nếu ngân sách quá thấp (ví dụ `recommendGiftSets(50000)`), hàm trả về mảng rỗng `[]` để Châu hiển thị thông báo không có bộ quà phù hợp trong ngân sách.
   * **Kiểm tra đủ hàng mẫu (`stockDemo`):** Ngoài điều kiện `unitTotal <= budget`, hàm kiểm tra tổng số lượng từng sản phẩm mà một bộ cần so với `product.stockDemo`. Ví dụ bộ quà cần 2 sản phẩm nhưng `stockDemo` chỉ còn 1 thì bộ đó sẽ không được đưa vào kết quả gợi ý.

---

## 3. CÁC CA TỰ THỬ (SELF-TEST CASES) ĐÃ THỰC HIỆN

### A. Ca tự thử bộ lọc sản phẩm (`js/product-filters.js`)

| Ca thử (Test Case) | Dữ liệu đầu vào thực tế | Kết quả thực tế hàm trả về | Giải thích nghiệp vụ |
| :--- | :--- | :--- | :--- |
| **Ca 1 (Kết hợp lọc & sắp xếp)** | `query: 'gấu'`, `category: 'moc-khoa'`, `sort: 'price-asc'` | Trả về mảng chứa chính xác 1 sản phẩm: *Móc khóa gấu len* (`KC-001`) giá `45000`. Mảng `products` gốc giữ nguyên thứ tự ban đầu. | Kiểm tra kết hợp đồng thời từ khóa, danh mục và sắp xếp giá tăng dần. |
| **Ca 2 (Lọc danh mục & giá giảm dần)** | `query: ''`, `category: 'thu-len'`, `sort: 'price-desc'` | Trả về 2 sản phẩm theo thứ tự: `TL-001` (`125000`) $\rightarrow$ `TL-002` (`115000`). | Đảm bảo sắp xếp giảm dần hoạt động chính xác trong danh mục. |
| **Ca 3 (Từ khóa không khớp)** | `query: 'áo len'`, `category: ''`, `sort: 'default'` | Trả về mảng rỗng `[]`. | Giao diện hiển thị thông báo không tìm thấy sản phẩm phù hợp. |

### B. Ca tự thử gợi ý bộ quà (`js/gift-recommendations.js`)

| Ca thử (Test Case) | Dữ liệu đầu vào thực tế | Kết quả thực tế hàm trả về | Giải thích nghiệp vụ |
| :--- | :--- | :--- | :--- |
| **Ca 1 (Ngân sách 100.000đ)** | `recommendGiftSets(100000)` | Trả về 1 bộ: `giftSetId: 'GIFT-01'` (*Món quà nhỏ*, `unitTotal: 80000`, `remainingBudget: 20000`). | Chỉ có bộ `GIFT-01` (80.000đ) nằm trong ngân sách 100.000đ và đủ `stockDemo`. |
| **Ca 2 (Ngân sách 150.000đ - Kiểm tra sắp xếp giá tăng dần)** | `recommendGiftSets(150000)` | Trả về 3 bộ theo đúng thứ tự giá tăng dần: `GIFT-01` (`unitTotal: 80000`) $\rightarrow$ `GIFT-03` (`unitTotal: 129000`) $\rightarrow$ `GIFT-02` (`unitTotal: 150000`). | Sắp xếp chuẩn từ giá thấp đến giá cao (`80.000` $\rightarrow$ `129.000` $\rightarrow$ `150.000`). |
| **Ca 3 (Ngân sách quá thấp)** | `recommendGiftSets(50000)` | Trả về mảng rỗng `[]`. | Không có bộ quà nào $\le 50.000\text{đ}$, hỗ trợ Châu hiển thị thông báo điều chỉnh ngân sách. |
| **Ca 4 (Ngân sách không hợp lệ)** | `recommendGiftSets(-10000)` hoặc `recommendGiftSets('abc')` | Trả về mảng rỗng `[]` (không ném lỗi làm crash trang). | Đảm bảo an toàn khi người dùng nhập sai hoặc để trống ô ngân sách. |
| **Ca 5 (Kiểm tra thiếu `stockDemo`)** | Giả lập sản phẩm trong bộ cần `quantity: 2` nhưng `stockDemo: 1`, gọi `recommendGiftSets(150000)` | Bộ quà thiếu hàng mẫu tự động bị loại khỏi mảng kết quả trả về. | Đảm bảo chỉ gợi ý các bộ quà có đủ số lượng hàng mẫu thực tế. |