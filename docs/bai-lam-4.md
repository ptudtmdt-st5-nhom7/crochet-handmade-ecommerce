# Bài làm 4 Xây dựng header menu điều hướng banner và trang chủ

Người thực hiện: Nguyễn Quang Đức.

## 1. Mục tiêu và đầu vào

Xây dựng trang chủ Lenly Crochet bằng HTML5 và CSS3 thuần theo nội dung Bước 1, thiết kế Bước 3 và cấu trúc dự án Bước 2. Sản phẩm gồm trang chủ hoàn chỉnh, mẫu header/menu/tìm kiếm dùng chung, CSS và tài nguyên trang chủ.

Nội dung sử dụng: Bài làm 1 và Bài làm 3 trong [tài liệu nhóm](https://docs.google.com/document/d/1uIoFsaHZOZoELrRm6Y9PIP3tNZ9jMsXwfM6cFZjABJ8/edit); dữ liệu tám sản phẩm, ảnh WebP và footer do Nam chuẩn bị; logo LC kết hợp cuộn len của Quyến. Tên, giá và ảnh sản phẩm là dữ liệu minh họa Buổi 2.

## 2. Kết quả xây dựng giao diện

Trang chủ [`index.html`](../index.html) có header, banner, bốn danh mục, bốn sản phẩm nổi bật, giới thiệu bộ quà theo ngân sách, đặt làm theo yêu cầu, giới thiệu ngắn và footer dùng chung. CSS đặt tại [`css/style.css`](../css/style.css); logo và ảnh đặt trong `images/`.

Header chứa logo liên kết về trang chủ, menu ba mục Trang chủ, Sản phẩm, Giới thiệu và ô tìm kiếm có nhãn. Thuộc tính `aria-current="page"` đánh dấu trang hiện tại. Tìm kiếm chỉ là giao diện, có ghi chú và nút `disabled`.

Banner có tiêu đề “Một món quà nhỏ, gửi điều muốn nói.”, ảnh thú len thỏ và hai nút dẫn đến `products.html`, `#qua-theo-ngan-sach`. Bốn danh mục gồm Móc khóa len, Thú len, Hoa len, Phụ kiện móc len.

Bốn sản phẩm nổi bật: KC-001 — Móc khóa gấu len, 45.000đ; TL-001 — Thú len thỏ, 125.000đ; HL-002 — Bó hoa len nhỏ, 99.000đ; PK-002 — Kẹp tóc hoa len, 25.000đ. TL-001 dẫn đến trang chi tiết mẫu; các sản phẩm khác dẫn đến thông tin đúng mã trên trang danh sách.

Khối bộ quà trình bày ba bước Chọn ngân sách, Xem gợi ý, Điều chỉnh lựa chọn. Giá gồm sản phẩm, hộp/túi và phụ kiện liệt kê; chưa gồm phí vận chuyển; miễn phí công đóng gói. Khối đặt làm giới thiệu quá trình trao đổi yêu cầu và dẫn tới `about.html#dat-lam`.

Footer kế thừa mẫu Bước 2, gồm thương hiệu, thông tin chính sách, liên kết nhanh và liên hệ. Chính sách và biểu tượng mạng xã hội chưa có URL chỉ hiển thị.

## 3. HTML semantic và bố cục CSS

Sử dụng `header`, `nav`, `main`, `section`, `article`, `figure`, `footer` và `address` theo vai trò nội dung. Skip link trỏ đến `main#noi-dung`; ảnh có văn bản thay thế phù hợp, ô tìm kiếm có `label`.

Flexbox dùng cho header, menu, thanh tìm kiếm, nhóm nút và nội dung thẻ sản phẩm. Grid dùng cho banner, danh mục, lưới sản phẩm, các bước bộ quà và khối đặt làm. CSS chia chín ngăn theo quy ước chung.

Màu chủ đạo `#8F4558`, nền `#FFF9F4`, chữ chính `#332B2B`, chữ phụ `#6B5D59`. Nội dung dùng Arial/Helvetica, cỡ 16 px, line-height 1.6. Có hover, focus-visible và giảm chuyển động. Các ngưỡng responsive là dưới 700 px, 700–1099 px và từ 1100 px.

## 4. Kiểm tra và minh chứng

Trang chủ được kiểm tra trên Chromium qua HTTP cục bộ, tại ba độ rộng sau khi cuộn tải ảnh.

| Độ rộng | Banner | Danh mục | Sản phẩm | Footer | Tràn ngang |
|---|---|---|---|---|---|
| 1366 px | 2 cột | 4 cột | 4 cột | 4 cột | Không |
| 768 px | 2 cột | 2 cột | 2 cột | 2 cột | Không |
| 390 px | 1 cột | 2 cột | 1 cột | 1 cột | Không |

`scrollWidth` bằng `clientWidth`, lần lượt 1351, 753 và 375 px trong môi trường kiểm tra. Không phát hiện ảnh lỗi trên trang chủ sau khi tải. Menu có vùng bấm cao 44 px. Nút “Tìm hiểu bộ quà” dẫn đúng khu vực; skip link nhận Tab và có viền focus.

Ảnh minh chứng: [1366 px](minh-chung-buoc4/home-1366.png), [768 px](minh-chung-buoc4/home-768.png), [390 px](minh-chung-buoc4/home-390.png), [focus bàn phím](minh-chung-buoc4/focus-ban-phim.png).

## 5. Sản phẩm bàn giao và phạm vi tích hợp

Kết quả gồm `index.html`, `css/style.css`, tài nguyên trang chủ và mẫu [`docs/header-mau.html`](header-mau.html). Mẫu [`docs/footer-mau.html`](footer-mau.html) dùng chung theo Bước 2. Cách sử dụng thành phần chung được ghi trong [quy ước mã nguồn](quy-uoc.md).

Các liên kết sử dụng đúng tên bốn file HTML theo thiết kế. Nội dung trên `products.html`, `product-detail.html`, `about.html` và các id danh mục, thông tin nhanh, đặt làm thuộc phần triển khai các trang tương ứng; kiểm thử nội dung đích được thực hiện khi tích hợp. Kết quả kiểm tra ở đây áp dụng riêng trang chủ. Buổi 2 chưa triển khai xử lý tìm kiếm, tính ngân sách hoặc đặt hàng.

## 6. Sử dụng AI và đánh giá kết quả

OpenAI Codex hỗ trợ xây dựng và kiểm tra HTML/CSS trang chủ; Google Gemini hỗ trợ tích hợp logo, footer và chuẩn bị báo cáo. Kết quả được đối chiếu với thiết kế, dữ liệu sản phẩm, cấu trúc HTML semantic, đường dẫn tài nguyên và bố cục tại ba kích thước.

Phương án phù hợp về nội dung và nhận diện được giữ lại. Tổ chức file được điều chỉnh theo cấu trúc chung; các bản sao trùng được loại bỏ. Nguồn tài nguyên, mục đích sử dụng AI, kết quả kiểm tra và cách xử lý được ghi trong [nhật ký AI](../AI_USAGE_LOG.md).

## 7. Trả lời câu hỏi kiểm tra kiến thức

### Câu 1. Thẻ header và nav có vai trò gì?

`header` xác định phần đầu trang, ở đây gom logo, menu và tìm kiếm. `nav` đánh dấu nhóm liên kết điều hướng quan trọng. `aria-label` phân biệt menu chính với liên kết nhanh trong footer; `aria-current="page"` chỉ rõ trang đang xem.

### Câu 2. Vì sao Flexbox thuận tiện hơn định vị thủ công cho header?

Flexbox căn phần tử theo trục và phân bố khoảng cách theo nội dung thực tế. `.header-top` dùng `display:flex`, `align-items:center`, `gap:48px`; mô tả phụ dùng `margin-left:auto`. Khi màn hình hẹp, có thể đổi hướng hoặc cho xuống dòng mà không tính lại từng tọa độ top/left, giảm nguy cơ logo và menu chồng nhau.

### Câu 3. Menu tốt trên máy tính nhưng chật trên điện thoại thì điều chỉnh thế nào?

Ở dưới 700 px, header chuyển sang xếp dọc, ẩn mô tả phụ và thu logo còn 92 px. Menu rộng 100%, giữ ba mục, cho phép `flex-wrap`, giảm gap và giữ vùng bấm cao tối thiểu 44 px. Kiểm tra lại tại 390 px và bằng bàn phím; không dùng hamburger phụ thuộc JavaScript trong phạm vi Buổi 2.

## 8. Đường dẫn kết quả

- [Website Lenly Crochet](https://ptudtmdt-st5-nhom7.github.io/crochet-handmade-ecommerce/).
- [Mã nguồn nhánh buoc4-duc](https://github.com/ptudtmdt-st5-nhom7/crochet-handmade-ecommerce/tree/buoc4-duc).
- [Bài làm 4 trên Google Docs](https://docs.google.com/document/d/1uIoFsaHZOZoELrRm6Y9PIP3tNZ9jMsXwfM6cFZjABJ8/edit?tab=t.e8hn99sxg0co).
