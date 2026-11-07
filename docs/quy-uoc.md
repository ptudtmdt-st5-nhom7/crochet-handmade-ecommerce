# Quy ước chung

- File và ảnh: chữ thường, không dấu, không khoảng trắng. Ví dụ: product-1.jpg, product-detail.html
- Class CSS đặt theo thành phần: site-header, product-card, about-section
- Chỉ dùng đường dẫn tương đối: css/style.css, images/product-1.jpg. Không dùng đường dẫn ổ đĩa như C:\...
- Mỗi người chỉ viết CSS trong ngăn của mình trong css/style.css

## Thành phần giao diện dùng chung Buổi 2

- Các trang đặt ở thư mục gốc và cùng liên kết `css/style.css`, `images/` bằng đường dẫn tương đối.
- Đặt đoạn HTML trong `docs/header-mau.html` sau thẻ mở `body`; đặt `id="noi-dung"` trên `main` để skip link hoạt động.
- Chỉ gắn `aria-current="page"` vào liên kết đúng trang đang xem. Trang chi tiết không đánh dấu Trang chủ là trang hiện tại.
- Dùng logo `images/logo.png`, giữ nguyên tỷ lệ. Tìm kiếm là giao diện minh họa, không thêm xử lý JavaScript trong Buổi 2.
- Footer dùng mẫu `docs/footer-mau.html`; mỗi trang có một footer. CSS bổ sung theo ngăn của từng trang, không ghi đè toàn bộ CSS chung.
- Danh mục trên `products.html` dùng các id `moc-khoa`, `thu-len`, `hoa-len`, `phu-kien`; thông tin nhanh dùng `chi-tiet-[ma-san-pham-viet-thuong]`.
- Trang chi tiết mẫu là TL-001 — Thú len thỏ, ảnh `product-3.webp`; liên hệ đặt làm trên `about.html` dùng id `lien-he-chi-tiet`.

- ID danh mục đặt ở thẻ sản phẩm đầu tiên của từng nhóm: KC-001, TL-001, HL-001, PK-001.
- CSS danh sách được giới hạn trong `.products-page`; CSS giới thiệu nằm trong `.about-page`. Dùng CSS `:hover`, không dùng thuộc tính sự kiện JavaScript trong Buổi 2.


## Chuẩn bị Buổi 3 — favicon và phạm vi tích hợp

- Giữ logo `images/logo.png` của nhóm; favicon `images/favicon.svg` dùng lại phần biểu tượng LC qua khung SVG, không thay ảnh gốc hoặc logo header/footer.
- Trong `<head>` của mỗi trang ở thư mục gốc, giữ liên kết PNG dự phòng và SVG ưu tiên:

  ```html
  <link rel="icon" type="image/png" href="images/logo.png">
  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
  ```

- Trang mới như `cart.html` hoặc `gift-builder.html` khi được tạo cũng dùng hai liên kết này. Đây là thay đổi phần đầu trang, không thay thế logo hiển thị trong nội dung.
- Buổi 3 tiếp tục HTML/CSS và bổ sung JavaScript thuần, localStorage; giữ nhận diện Buổi 2. Không coi favicon là bằng chứng đã hoàn thành chức năng JavaScript.
- Quy tắc Lenly đã được trưởng nhóm xác nhận: ngân sách tính tiền sản phẩm cho một bộ; điều chỉnh vượt ngân sách chỉ cảnh báo, vẫn cho thêm; cùng cấu hình tăng số bộ; nhân bản để chỉnh riêng không đổi bộ gốc. Tổng tiền và số lượng món phải nhân với số bộ.
- Bước 1 chuẩn bị danh sách đầu ra, dữ liệu/file/hàm/khóa và cách nạp JavaScript trước khi các PIC lập trình. Các đường dẫn JS trong bảng phân công là nơi dự kiến, chưa phải file đã triển khai. Khi có file/hàm thực tế, cập nhật quy ước tại đây thay vì tạo nhiều tài liệu trùng.
- Báo cáo Buổi 3: https://docs.google.com/document/d/1YUwTQOg8hfinPHeAhp2SUlCrO9pTVmh5yIjOR3n2A4E/edit
- Bảng công việc và lịch nội bộ được cập nhật trong tab TO DO LIST của workspace: https://docs.google.com/spreadsheets/d/1UIP27nPdW2n_PZR36gXBxR1aO9nti8mK8NYxyOvS_0s/edit?gid=0
