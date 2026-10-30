# Bước 4 — Header dùng chung, Banner và Trang chủ hoàn chỉnh

Ngày cập nhật: 30/10/2026. Người phụ trách: Nguyễn Quang Đức.

## 1. Hiện trạng bản hoàn chỉnh Bước 4

Bản Bước 4 đã được bổ sung đầy đủ các phần còn chờ trước đó từ Bước 2 (Nam) và Bước 3 (Quyến):

- **Logo chính thức (Bước 3 — Quyến):** Đã lấy tệp `LOGO.png` (mẫu số 3: biểu tượng chữ `LC` kết hợp cuộn len và tên `Lenly CROCHET` bên dưới) từ thư mục `Bài làm 3 / Logo` trên Google Drive nhóm, xử lý tách nền trong suốt (`images/logo.png`, kích thước chuẩn `402×430` tỷ lệ gốc, kèm bản gốc `images/LOGO.png`) và gắn trực tiếp vào `.site-brand` trong `index.html` cùng `docs/header-mau.html` (thay thế hoàn toàn ô giữ chỗ `.logo-pending`).
- **Footer dùng chung (Bước 2 — Nam):** Đã ghép nguyên bản mã HTML `docs/footer-mau.html` và toàn bộ CSS `.site-footer` từ nhánh `buoc2-nam` (commit `a34d0fc`) vào `index.html`, `css/style.css`, và đặt sẵn trong 3 trang khung (`products.html`, `product-detail.html`, `about.html`).
- **Dữ liệu và ảnh sản phẩm (Bước 2 — Nam):** Sử dụng đồng bộ 8 ảnh WebP (`images/product-1.webp` đến `images/product-8.webp`) và dữ liệu trong `docs/products-data.md` từ nhánh `main` (commit `55ab2d5`), trong đó sản phẩm mẫu duy nhất dẫn tới `product-detail.html` là **TL-001 — Thú len thỏ (125.000đ)**.

## 2. Danh sách file bàn giao

| File | Nội dung |
|---|---|
| `index.html` | Trang chủ hoàn chỉnh: Skip link, Header (Logo số 3, menu 3 mục, ô tìm kiếm minh họa), Hero banner, 4 danh mục, 4 sản phẩm nổi bật, Bộ quà theo ngân sách, Đặt làm theo mẫu, Giới thiệu ngắn và Footer chung của Nam |
| `css/style.css` | Biến màu, thiết lập chung, Header/tìm kiếm, Footer chung của Nam (ngăn 3), Trang chủ (ngăn 4), mẫu thẻ `.product-card` (ngăn 5), hover/focus cơ bản (ngăn 8) và responsive 1366/768/390 px (ngăn 9) |
| `images/logo.png` & `images/LOGO.png` | Logo số 3 của Quyến (bản PNG nền trong suốt đã cắt gọn viền thừa và bản gốc từ Drive) |
| `docs/header-mau.html` | Đoạn mã HTML Header dùng chung (đã gắn sẵn `images/logo.png`) để Bảo, Khanh và Tuấn ghép vào trang phụ trách |
| `docs/footer-mau.html` | Đoạn mã HTML Footer dùng chung của Nam (từ commit `a34d0fc`) |
| `docs/ban-giao-buoc4.md` | Hướng dẫn bàn giao và phối hợp tích hợp cho các thành viên |
| `docs/bai-lam-4.md` | Nội dung báo cáo Bài làm 4 và trả lời 3 câu hỏi kiểm tra kiến thức Bước 4 để điền vào Google Docs nhóm |
| `AI_USAGE_LOG.md` | Nhật ký sử dụng AI cập nhật đầy đủ quá trình thực hiện và hoàn thiện Bước 4 |

## 3. Hướng dẫn sử dụng Header & Footer cho Bảo, Khanh và Tuấn

1. **Header dùng chung:** Lấy đoạn mã trong `docs/header-mau.html`, đặt ngay sau thẻ mở `<body>` của trang mình (`products.html`, `product-detail.html`, `about.html`). Logo `images/logo.png` đã được gắn sẵn đường dẫn tương đối.
2. **Đánh dấu trang hiện tại (`aria-current="page"`):**
   - Tại `index.html`: đặt `aria-current="page"` ở liên kết `Trang chủ`.
   - Tại `products.html`: chuyển `aria-current="page"` sang liên kết `Sản phẩm`.
   - Tại `about.html`: chuyển `aria-current="page"` sang liên kết `Giới thiệu`.
   - Tại `product-detail.html`: bỏ `aria-current="page"` khỏi `Trang chủ` (vì đang xem chi tiết một sản phẩm mẫu thuộc nhóm Sản phẩm).
3. **Nội dung chính (`<main id="noi-dung">`):** Đặt `id="noi-dung"` trên thẻ `<main>` của mỗi trang để liên kết trợ năng “Đến nội dung chính” (`skip-link`) hoạt động thống nhất.
4. **Footer dùng chung:** Trong các file khung `products.html`, `product-detail.html` và `about.html` đã có sẵn `<footer class="site-footer">...</footer>` của Nam ngay trước `</body>` (hoặc lấy từ `docs/footer-mau.html`).
5. **CSS dùng chung (`css/style.css`):** Giữ liên kết `<link rel="stylesheet" href="css/style.css">` trong `<head>`. Mỗi thành viên chỉ viết bổ sung CSS vào đúng ngăn được đánh số của mình (`/* ===== 5. DANH SÁCH SẢN PHẨM ===== */`, `/* ===== 6. CHI TIẾT SẢN PHẨM ===== */`, `/* ===== 7. GIỚI THIỆU ===== */`), không xóa hoặc ghi đè các ngăn chung (1, 2, 3, 4, 8, 9).

## 4. Điểm neo (`id`) phối hợp giữa Trang chủ và các trang khác

- **Bảo (`products.html`):**
  - Tạo 4 `id` danh mục tương ứng với liên kết từ Trang chủ: `#moc-khoa`, `#thu-len`, `#hoa-len`, `#phu-kien`.
  - Tạo các khối/thẻ thông tin nhanh có `id` cho các sản phẩm chưa có trang chi tiết riêng, đặc biệt là 3 sản phẩm nổi bật trên Trang chủ: `#thong-tin-kc-001` (Móc khóa gấu len), `#thong-tin-hl-002` (Bó hoa len nhỏ), `#thong-tin-pk-002` (Kẹp tóc hoa len) và các mã còn lại theo quy ước `thong-tin-[ma-viet-thuong]`.
- **Khanh (`product-detail.html`):**
  - Xây dựng trang chi tiết cho sản phẩm mẫu duy nhất: **TL-001 — Thú len thỏ**, giá minh họa **125.000đ**, ảnh `images/product-3.webp`.
- **Tuấn (`about.html`):**
  - Đặt `id="dat-lam"` tại khu vực giới thiệu đặt làm theo yêu cầu trên `about.html` để khớp với nút “Tìm hiểu đặt làm” (`about.html#dat-lam`) từ Trang chủ.

## 5. Kết quả kiểm tra trên trình duyệt (Chromium)

| Hạng mục kiểm tra | Kết quả thực tế |
|---|---|
| **Desktop (`1366 px`)** | Logo hiển thị sắc nét trên nền kem `#FFF9F4`; Banner 2 cột; Danh mục 4 cột; Sản phẩm nổi bật 4 cột; Footer 4 cột (`1.2 : 1 : 0.8 : 1.6`); `scrollWidth = 1366 px` (không tràn ngang) |
| **Tablet (`768 px`)** | Header gọn gàng, ẩn dòng mô tả phụ; Banner 2 cột; Danh mục 2 cột; Sản phẩm nổi bật 2 cột; Footer 2 cột; `scrollWidth = 768 px` (không tràn ngang) |
| **Mobile (`390 px`)** | Logo thu gọn hợp lý (`92 px`), menu 3 mục hiển thị đầy đủ không dùng hamburger JS; Banner, Sản phẩm, Các bước bộ quà và Footer xếp 1 cột; Danh mục 2 cột; `scrollWidth = 390 px` (không tràn ngang) |
| **Tài nguyên ảnh** | `images/logo.png` và các ảnh WebP (`product-1.webp`, `product-3.webp`, `product-5.webp`, `product-6.webp`, `product-7.webp`, `product-8.webp`) tải đầy đủ, đúng tỷ lệ, không méo ảnh |
| **Điều hướng & Bàn phím** | Liên kết nội bộ `#noi-dung` và `#qua-theo-ngan-sach` hoạt động đúng; nút tìm kiếm `disabled` kèm ghi chú minh họa; phím `Tab` hiển thị viền focus `#245C52` dày `3 px` rõ ràng |
