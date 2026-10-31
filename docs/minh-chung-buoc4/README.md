# Minh chứng kiểm tra Bước 4

Ngày: 31/10/2026. Người kiểm tra bằng công cụ: OpenAI Codex. Phạm vi: trang chủ `index.html` tại thư mục gốc trên nhánh `buoc4-duc`, sau khi chuyển mã và ghép footer gốc của Nam. Chưa phải nghiệm thu toàn website.

- [Toàn trang 1366 px](home-1366.png)
- [Toàn trang 768 px](home-768.png)
- [Toàn trang 390 px](home-390.png)
- [Phần đầu trang 1366 px](home-1366-dau-trang.png)
- [Số đo trình duyệt](ket-qua-trinh-duyet.json)
- [Skip link và focus bàn phím](focus-ban-phim.png)

Mở qua máy chủ HTTP cục bộ trên Chromium, đặt viewport lần lượt 1366/768/390 px, cuộn để tải ảnh lazy rồi kiểm tra `scrollWidth <= clientWidth`. Kết quả: không tràn ngang, không có ảnh lỗi sau khi tải. Các số đo ghi cả viewport và clientWidth để phản ánh phần thanh cuộn.

Nút bộ quà đến đúng `#qua-theo-ngan-sach`; skip link nhận Tab và hiện viền focus. Liên kết sang ba trang khác dùng đúng URL dự kiến nhưng nội dung/id đích còn phụ thuộc Bảo, Khanh, Tuấn, như hướng dẫn bàn giao.

Cách tự thử: mở `index.html` ở gốc bằng Chrome, bật DevTools và đặt chiều rộng lần lượt 1366, 768, 390 px; cuộn kiểm tra logo, ảnh, sản phẩm và footer. Bấm “Tìm hiểu bộ quà”; nhấn Tab từ đầu trang để xem skip link và focus. Nút tìm kiếm là minh họa, chưa có xử lý.
