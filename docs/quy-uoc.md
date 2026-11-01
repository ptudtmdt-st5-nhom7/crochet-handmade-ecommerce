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
