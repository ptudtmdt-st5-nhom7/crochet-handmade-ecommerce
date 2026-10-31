# Bài làm 4 — Header, menu điều hướng, banner và trang chủ

Người phụ trách: Nguyễn Quang Đức. Công cụ hỗ trợ: OpenAI Codex và Google Gemini theo [nhật ký AI](../AI_USAGE_LOG.md). Báo cáo cập nhật ngày 31/10/2026 theo mã thực tế trên [nhánh buoc4-duc](https://github.com/ptudtmdt-st5-nhom7/crochet-handmade-ecommerce/tree/buoc4-duc).

## 1. Đầu vào và kết quả

Sử dụng nội dung trang chủ tại Bài làm 1 và thiết kế Bài làm 3 của [tài liệu nhóm](https://docs.google.com/document/d/1uIoFsaHZOZoELrRm6Y9PIP3tNZ9jMsXwfM6cFZjABJ8/edit); dữ liệu và ảnh Bước 2 do Nam chuẩn bị; logo LC/cuộn len của Quyến; footer của Nam trên nhánh `buoc2-nam` tại commit `d507e6f`.

Trang chủ nằm tại [`index.html`](../index.html), dùng [`css/style.css`](../css/style.css), ảnh trong `images/` và các mẫu [`header`](header-mau.html), [`footer`](footer-mau.html). Bản tải lên trước đó ở commit `6137d7a` đặt cả dự án trong `lenly-buoc4/`; lượt sửa này đưa phần cần dùng về thư mục gốc và loại các bản sao dư.

Logo đang dùng là `images/logo.png` đã xử lý trong suốt 402 × 430. Bản gốc `LOGO.png` ở Drive; repository không lưu thêm bản gốc cùng tên khác hoa/thường. Tám ảnh sản phẩm WebP giữ nguyên. Tên và giá là dữ liệu minh họa Buổi 2 đã được Đức duyệt theo nội dung bàn giao.

## 2. Cấu trúc HTML và CSS

`header.site-header` chứa logo liên kết về trang chủ, `nav.site-nav` có ba mục Trang chủ, Sản phẩm, Giới thiệu và thanh tìm kiếm. Trang hiện tại được đánh dấu bằng `aria-current="page"`. Ô tìm kiếm có label và ghi chú minh họa; nút bị vô hiệu hóa vì Buổi 2 chưa xử lý tìm kiếm.

Skip link trỏ đến `main#noi-dung`. Nội dung chính gồm sáu section theo thứ tự: banner; bốn danh mục; bốn sản phẩm nổi bật; bộ quà theo ngân sách; đặt làm; giới thiệu ngắn. Thẻ sản phẩm dùng `article`. Cuối trang là footer dùng chung của Nam gồm thương hiệu, thông tin chính sách, liên kết nhanh và liên hệ. Chính sách/icon chưa có URL chỉ hiển thị.

Banner có H1 “Một món quà nhỏ, gửi điều muốn nói.”, nội dung giới thiệu và ảnh thú len thỏ. Hai nút dẫn tới `products.html` và `#qua-theo-ngan-sach`. Bốn thẻ nổi bật lần lượt là KC-001 — 45.000đ; TL-001 — 125.000đ; HL-002 — 99.000đ; PK-002 — 25.000đ. Chỉ TL-001 dẫn đến trang chi tiết mẫu; ba thẻ còn lại dẫn tới thông tin đúng mã trên trang danh sách.

Phần bộ quà giới thiệu Chọn ngân sách → Xem gợi ý → Điều chỉnh lựa chọn. Giá gồm sản phẩm, hộp/túi và phụ kiện liệt kê; chưa gồm phí vận chuyển; miễn phí công đóng gói. Phần đặt làm giới thiệu trao đổi yêu cầu, không tạo biểu mẫu hoặc đơn hàng thật.

CSS dùng các biến màu theo Bài làm 3: hồng đất `#8F4558`, nền kem `#FFF9F4`, nền trắng `#FFFFFF`, hồng nhạt `#F4E1E5`, xanh nhạt `#E8EDE4`, chữ `#332B2B`, chữ phụ `#6B5D59`, viền `#D8C7BF`. Nội dung dùng Arial/Helvetica, 16 px, line-height 1.6.

Flexbox dùng cho header, menu, tìm kiếm, nhóm nút và nội dung thẻ. Grid dùng cho banner, danh mục, sản phẩm, các bước bộ quà và khối đặt làm. CSS được chia chín ngăn theo quy ước nhóm. Có hover, focus-visible và giảm chuyển động. Ngưỡng responsive là dưới 700 px, 700–1099 px và từ 1100 px.

## 3. Kết quả kiểm tra ngày 31/10/2026

Codex kiểm tra bản ở thư mục gốc bằng Chromium qua HTTP cục bộ; ảnh được cuộn tải trước khi kiểm tra lỗi. Đây là lượt kiểm tra mới, không suy ra từ lời khẳng định trong báo cáo Gemini trước đó.

| Viewport | Banner | Danh mục | Sản phẩm | Footer | scrollWidth / clientWidth |
|---|---|---|---|---|---|
| 1366 px | 2 cột | 4 cột | 4 cột | 4 cột | 1351 / 1351 |
| 768 px | 2 cột | 2 cột | 2 cột | 2 cột | 753 / 753 |
| 390 px | 1 cột | 2 cột | 1 cột | 1 cột | 375 / 375 |

Không tràn ngang ở ba kích thước. `clientWidth` có thể nhỏ hơn viewport vì thanh cuộn; không giả định `scrollWidth` luôn bằng số viewport. Không phát hiện ảnh lỗi trên trang chủ sau khi tải. Menu có vùng bấm cao 44 px. Nút “Tìm hiểu bộ quà” dẫn đúng fragment cùng trang. Skip link nhận Tab và có viền focus. Tìm kiếm giữ trạng thái minh họa.

Minh chứng: [1366 px](minh-chung-buoc4/home-1366.png), [768 px](minh-chung-buoc4/home-768.png), [390 px](minh-chung-buoc4/home-390.png), [số đo trình duyệt](minh-chung-buoc4/ket-qua-trinh-duyet.json).

## 4. Phạm vi điều hướng và bàn giao

Menu và các nút đã dùng đúng tên file. `products.html`, `product-detail.html`, `about.html` hiện chỉ là khung có footer do Nam chuẩn bị, chưa có nội dung của Bảo, Khanh và Tuấn. Bốn id danh mục, ba id thông tin nhanh trên danh sách và `about.html#dat-lam` đang chờ tác giả trang tạo. Các đích này được ghi cụ thể trong [hướng dẫn bàn giao](ban-giao-buoc4.md).

Kiểm tra riêng trang chủ không thay thế kiểm thử bốn trang sau tích hợp. Kết quả được đưa lên nhánh riêng để Đức xem, chưa coi là nhóm đã nghiệm thu hoặc đã merge vào `main`.

## 5. Prompt, phản biện và xử lý

Các lượt tạo bản nháp và hoàn thiện logo/footer được ghi trong nhật ký AI. Prompt Gemini nguyên văn và toàn bộ cuộc trao đổi của lượt trước không có trong các file đã cung cấp; báo cáo không tự tạo lại chúng làm minh chứng.

Yêu cầu thực tế cho lượt sửa 31/10/2026:

> ở nhánh `buoc4-duc` là tôi để file theo gemini kêu, tôi ko biết đã để đúng chưa, và chưa xem được nội dung có làm đúng chưa nữa, nếu nó đăng dư, sai thì hãy sửa và nói cho tôi biết bạn đã sửa gì để tôi xem bạn có làm đúng với yêu cầu ko nha

Kết quả đối chiếu: giữ giao diện trang chủ, logo đang hiển thị, dữ liệu và các mẫu dùng chung; sửa vị trí file và mô tả chưa đúng; dùng lại HTML/CSS footer của Nam; hợp nhất nhật ký; bỏ bản sao dự án lồng. Ảnh kiểm tra và số đo được lưu cùng mã. Quyết định nghiệm thu cuối thuộc Đức sau khi xem bản sửa.

## 6. Câu hỏi kiểm tra kiến thức

### 1. Thẻ header và nav có vai trò gì?

`header` xác định phần đầu trang, ở đây gom logo, menu và tìm kiếm. `nav` xác định nhóm liên kết điều hướng quan trọng. `aria-label` phân biệt menu chính với liên kết nhanh trong footer; `aria-current="page"` đánh dấu trang hiện tại.

### 2. Vì sao Flexbox thuận tiện hơn định vị thủ công cho header?

Flexbox căn các phần tử theo trục và phân bố khoảng cách theo nội dung thực tế. `.header-top` dùng `display:flex`, `align-items:center`, `gap:48px`; mô tả phụ dùng `margin-left:auto`. Khi màn hình hẹp, đổi hướng hoặc cho xuống dòng mà không phải tính lại từng tọa độ top/left, giảm nguy cơ logo/menu chồng nhau.

### 3. Menu máy tính tốt nhưng điện thoại bị chật thì điều chỉnh thế nào?

Ở dưới 700 px, header xếp dọc, ẩn mô tả phụ, logo rộng 92 px. Menu rộng 100%, giữ đủ ba mục, cho phép `flex-wrap`, giảm gap và giữ vùng bấm cao tối thiểu 44 px. Kiểm tra lại tại 390 px và bằng bàn phím; không dùng hamburger cần JavaScript trong phạm vi Buổi 2.

Đây là ba câu của Bước 4; sáu câu bắt buộc cá nhân ở Bước 10 vẫn thực hiện riêng dựa trên mã thực tế.
