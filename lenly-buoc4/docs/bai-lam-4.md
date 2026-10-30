# Bài làm 4 — Xây dựng header, menu điều hướng, banner và trang chủ

## 1. Mục tiêu và đầu vào thực hiện

- **Người phụ trách:** Nguyễn Quang Đức.
- **Mục tiêu:** Xây dựng thành phần dùng chung đầu trang (`header`, logo, menu điều hướng 3 mục, ô tìm kiếm tĩnh), banner chính và hoàn thiện toàn bộ nội dung trang chủ (`index.html`), đồng thời tích hợp chân trang dùng chung (`footer`) từ Bước 2 và nhận diện thương hiệu từ Bước 3.
- **Đầu vào sử dụng:**
  - Kế hoạch và nội dung trang chủ đã chốt tại Bước 1 (`Bài làm 1`).
  - Bộ khung dự án, dữ liệu 8 sản phẩm (`docs/products-data.md`), bộ ảnh WebP (`images/product-1.webp` đến `product-8.webp`, commit `55ab2d5`) và mẫu chân trang (`docs/footer-mau.html`, CSS `.site-footer`, commit `a34d0fc`) do Nam bàn giao tại Bước 2.
  - Đặc tả thiết kế giao diện 4 trang, bảng màu, phông chữ, wireframe và tệp `LOGO.png` (mẫu số 3: biểu tượng chữ `LC` kết hợp cuộn len) do Quyến bàn giao tại Bước 3.

## 2. Cấu trúc HTML semantic và tổ chức CSS

### 2.1. Cấu trúc HTML (`index.html` và `docs/header-mau.html`)
- **`<a class="skip-link" href="#noi-dung">`**: Liên kết hỗ trợ người dùng bàn phím nhảy nhanh tới phần nội dung chính.
- **`<header class="site-header">`**: Chia thành hai dải rõ ràng:
  - Dải trên (`.header-top`): chứa liên kết thương hiệu `.site-brand` gắn ảnh logo chính thức (`images/logo.png`, `alt="Lenly Crochet — Trang chủ"`), thanh điều hướng `<nav class="site-nav" aria-label="Điều hướng chính">` gồm 3 liên kết (`index.html`, `products.html`, `about.html`, đánh dấu trang hiện tại bằng `aria-current="page"`) và câu thông điệp ngắn `.header-caption`.
  - Dải dưới (`.search-strip`): chứa `<label for="site-search">`, ô `<input id="site-search" type="search">` có placeholder *“Bạn đang tìm món đồ len nào?”*, nút `<button type="button" disabled>Tìm kiếm</button>` và dòng ghi chú minh họa `#search-note` (*“Giao diện minh họa, chưa hỗ trợ tìm kiếm.”*).
- **`<main id="noi-dung">`**: Gồm 6 phân khu `<section>` tuần tự đúng theo đặc tả Bước 1 và wireframe Bước 3:
  1. **Banner chính (`.home-hero`)**: Tiêu đề `<h1>` *“Một món quà nhỏ, gửi điều muốn nói.”*, đoạn giới thiệu, 2 nút hành động (*“Khám phá sản phẩm”* dẫn tới `products.html`, *“Tìm hiểu bộ quà”* dẫn tới `#qua-theo-ngan-sach`) và `<figure class="hero-image">` hiển thị ảnh `images/product-3.webp`.
  2. **Danh mục sản phẩm (`#categories-title`)**: Lưới 4 thẻ danh mục (*Móc khóa len*, *Thú len*, *Hoa len*, *Phụ kiện móc len*) liên kết đến đúng nhóm tương ứng trên `products.html` (`#moc-khoa`, `#thu-len`, `#hoa-len`, `#phu-kien`).
  3. **Sản phẩm nổi bật (`.home-featured`)**: Lưới 4 thẻ `<article class="product-card">` lấy từ dữ liệu Bước 2 (`KC-001` 45.000đ, `TL-001` 125.000đ, `HL-002` 99.000đ, `PK-002` 25.000đ). Riêng sản phẩm mẫu `TL-001` dẫn tới `product-detail.html`; 3 sản phẩm còn lại dẫn tới khối thông tin nhanh tương ứng trên `products.html`.
  4. **Giới thiệu bộ quà theo ngân sách (`#qua-theo-ngan-sach`)**: Trình bày quy trình 3 bước bằng danh sách có thứ tự `<ol class="home-steps">` và ghi chú rõ nguyên tắc tính giá combo, miễn phí công đóng gói, chưa gồm phí vận chuyển.
  5. **Giới thiệu đặt làm theo mẫu (`.home-custom`)**: Bố cục 2 cột gồm ảnh minh họa và 3 bước trao đổi yêu cầu `<ol class="custom-steps">`, kèm nút dẫn tới `about.html#dat-lam`.
  6. **Giới thiệu ngắn về cửa hàng (`.home-about`)**: Tóm tắt định hướng của Lenly Crochet và nút dẫn tới `about.html`.
- **`<footer class="site-footer">`**: Tích hợp mẫu chân trang dùng chung của Nam gồm 4 cột trên desktop (Thương hiệu, Thông tin chính sách, Liên kết nhanh, Liên hệ kèm icon mạng xã hội minh họa) và ghi chú phạm vi học tập ở dải cuối.

### 2.2. Tổ chức CSS (`css/style.css`)
- Sử dụng biến CSS (`:root`) theo đúng bảng màu Bước 3: `--primary: #8F4558`, `--primary-hover: #733647`, `--page: #FFF9F4`, `--surface: #FFFFFF`, `--pink: #F4E1E5`, `--sage: #E8EDE4`, `--text: #332B2B`, `--muted: #6B5D59`, `--border: #D8C7BF`.
- Kết hợp **Flexbox** cho các thành phần một chiều (`.header-top`, `.site-nav`, `.search-inner`, `.hero-actions`, nội dung dọc trong `.product-card`) và **CSS Grid** cho các bố cục hai chiều (`.home-hero`, `.home-category-grid`, `.home-product-grid`, `.home-steps`, `.home-custom`, `.site-footer-inner`).
- Phân chia rõ 9 ngăn CSS có chú thích để các thành viên Bước 5, 6A, 6B, 7, 8 tích hợp không bị xung đột.

## 3. Kết quả tự kiểm tra điều hướng và hiển thị (1366 px, 768 px, 390 px)

| Kích thước / Hạng mục | Kết quả kiểm tra trên trình duyệt |
|---|---|
| **1366 px (Desktop)** | Khung nội dung tối đa `1200 px` căn giữa; Header hiển thị rõ logo số 3, menu 3 mục và câu mô tả; Banner 2 cột; Danh mục 4 cột; Sản phẩm nổi bật 4 cột; Footer 4 cột; không tràn ngang (`scrollWidth = 1366 px`). |
| **768 px (Tablet)** | Banner giữ 2 cột cân đối; Danh mục và Sản phẩm nổi bật chuyển sang 2 cột; ô tìm kiếm tự xuống dòng phần ghi chú; Footer 2 cột; không tràn ngang (`scrollWidth = 768 px`). |
| **390 px (Mobile)** | Header xếp dọc gọn gàng, menu 3 mục hiển thị đầy đủ dễ bấm (cao tối thiểu `44 px`); Banner 1 cột (chữ và nút xếp trước ảnh); Danh mục 2 cột; Sản phẩm nổi bật 1 cột; Footer 1 cột; không tràn ngang (`scrollWidth = 390 px`). |
| **Điều hướng & Tương tác** | Liên kết logo và menu dẫn đúng tới `index.html`, `products.html`, `about.html`; nút *“Tìm hiểu bộ quà”* cuộn đúng tới `#qua-theo-ngan-sach`; sản phẩm mẫu `TL-001` dẫn tới `product-detail.html`; viền `:focus-visible` màu `#245C52` dày `3 px` hiển thị rõ khi nhấn phím `Tab`. |

## 4. Trả lời câu hỏi kiểm tra kiến thức Bước 4

### Câu 1. Thẻ `<header>` và `<nav>` có vai trò gì?
- **Thẻ `<header>`** là thẻ ngữ nghĩa (semantic HTML5) dùng để xác định vùng đầu trang hoặc phần mở đầu của một khu vực nội dung. Trên website Lenly Crochet, `<header class="site-header">` gom nhóm nhận diện thương hiệu (logo liên kết về trang chủ), thanh điều hướng chính, câu thông điệp ngắn và thanh công cụ tìm kiếm minh họa, giúp trình duyệt, công cụ tìm kiếm và trình đọc màn hình phân biệt rõ phần đầu trang với nội dung chính (`<main>`) và chân trang (`<footer>`).
- **Thẻ `<nav>`** dùng để đánh dấu khu vực chứa các liên kết điều hướng quan trọng của website (như `<nav class="site-nav" aria-label="Điều hướng chính">` ở đầu trang gồm *Trang chủ*, *Sản phẩm*, *Giới thiệu* và `<nav aria-label="Liên kết nhanh">` ở chân trang). Nhờ thẻ `<nav>` kèm thuộc tính `aria-label` và `aria-current="page"`, người dùng sử dụng bàn phím hoặc công nghệ hỗ trợ có thể nhận biết ngay cấu trúc menu và vị trí trang đang đứng.

### Câu 2. Vì sao dùng Flexbox cho header có thể thuận tiện hơn so với định vị thủ công?
- Khi dùng **Flexbox** (`display: flex; align-items: center; gap: 48px;` trên `.header-top` và `margin-left: auto;` trên `.header-caption`), các phần tử con (logo, menu điều hướng, câu thông điệp) tự động căn chỉnh thẳng hàng theo trục dọc và phân bổ khoảng cách linh hoạt theo kích thước nội dung thực tế mà không cần tính toán tọa độ `top/left` hay dùng `float`.
- Khi chuyển sang màn hình nhỏ (`@media (max-width: 699px)`), chỉ cần đổi `flex-direction: column; align-items: flex-start;` và `justify-content: space-between;` kèm `flex-wrap: wrap;` là các thành phần tự động xếp chồng hoặc xuống dòng an toàn. Ngược lại, nếu định vị thủ công bằng `position: absolute` hoặc `margin` cố định, khi chữ dài hơn hoặc màn hình hẹp lại, các mục menu rất dễ đè lên logo hoặc tràn ra ngoài khung nhìn.

### Câu 3. Nếu menu hiển thị tốt trên máy tính nhưng bị chật trên điện thoại, nhóm sẽ điều chỉnh như thế nào?
- Trong phạm vi chỉ sử dụng HTML5 và CSS3 thuần (không dùng nút hamburger phụ thuộc JavaScript), nhóm xử lý menu trên màn hình điện thoại (`@media (max-width: 699px)`) bằng các bước sau:
  1. Chuyển vùng `.header-top` sang xếp dọc (`flex-direction:column; align-items:flex-start; gap:12px;`) để tách riêng hàng logo ở trên và hàng menu ở dưới, giúp menu có toàn bộ chiều ngang màn hình (`width: 100%`).
  2. Cho phép các mục trong `.site-nav` tự động xuống dòng khi thiếu chỗ (`flex-wrap: wrap;`), đồng thời giảm khoảng cách `gap` từ `32px` xuống `8px 16px` và phân bổ đều bằng `justify-content: space-between;`.
  3. Ẩn thành phần phụ chưa thiết yếu trên màn hình nhỏ (`.header-caption { display: none; }`), thu gọn chiều rộng logo (`.site-brand img { width: 92px; }`) nhưng vẫn giữ chiều cao vùng bấm của từng liên kết menu tối thiểu `44px` (`min-height: 44px`) để người dùng thao tác cảm ứng thuận tiện mà không bị chồng lấn hay tràn ngang.
