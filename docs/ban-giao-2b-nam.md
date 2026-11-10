# Nối chức năng trang Sản phẩm — Bước 2B

Người phụ trách: Nguyễn Thanh Nam.

## Phần đã sửa

- `products.html`: thêm số món trong giỏ, nút xóa bộ lọc và vùng báo kết quả thêm giỏ; cập nhật lời hướng dẫn tìm kiếm.
- `js/products-page.js`: gọi bộ lọc của Tuấn, nối nút thêm vào giỏ với `addSingle()` của Bảo, cập nhật số giỏ khi mở trang. Sự kiện thêm giỏ gắn một lần trên vùng danh sách nên vẫn dùng được sau khi tìm/lọc/sắp.
- `tests/products-page.test.mjs`: thử cách nối các module bằng DOM mô phỏng trong Node; không thay cho việc xem giao diện trên trình duyệt.

Sao chép các file trong gói vào đúng thư mục trên nhánh `buoi3-nam` đã nhận main có PR #27. Gói này cần các module dữ liệu, bộ lọc, giỏ và lưu trữ đã có trên nhánh; không chạy độc lập. Không chép đè CSS của Quyến.

## Kết quả kiểm tra tự động

Chạy `node --test tests/*.mjs` trên bản kiểm tra gồm dữ liệu/bộ lọc được gửi, module giỏ đã sửa ở PR #27 và bản nối 2B: 36 đạt, 0 lỗi.

Bài thử nối trang đã kiểm tra: tải tám sản phẩm; tìm theo mã; không có kết quả; xóa bộ lọc; lọc danh mục; sắp giá hai chiều; thêm sau khi render lại; bấm hai lần chỉ tăng hai món; gọi khởi tạo lại không gắn trùng sự kiện; lỗi lưu không báo thành công và không tăng giỏ; ô tìm phía trên gọi được bộ lọc.

Nam đã tự thử bằng Live Server: hiển thị đủ tám sản phẩm và ảnh; tìm theo mã bằng nút Tìm kiếm và phím Enter; lọc danh mục, sắp giá tăng/giảm, xóa bộ lọc và trạng thái không có kết quả đều đúng. Thêm giỏ tăng đúng một món mỗi lần bấm, tải lại vẫn giữ số giỏ. Ba link chi tiết gấu, hoa cúc và thỏ mở đúng. Chạy node --test tests/*.mjs: 36 đạt, 0 lỗi.

## Các bước Nam cần tự thử bằng Live Server

1. Mở `products.html` bằng Live Server. Kiểm tra đủ tám sản phẩm và ảnh; ghi lại số giỏ ban đầu nếu đã có hàng từ lần thử trước.
2. Nhập `KC-001` ở ô tìm trong bộ lọc: còn một sản phẩm gấu. Nhập chuỗi không trùng sản phẩm: hiện 0 sản phẩm và thông báo không có sản phẩm phù hợp.
3. Bấm “Xóa bộ lọc”: hiện lại tám sản phẩm. Chọn Móc khóa len: còn hai sản phẩm. Chọn giá tăng dần: hoa cúc đứng trước gấu; giảm dần: gấu đứng trước hoa cúc.
4. Bấm thêm gấu một lần: thông báo đã thêm và số giỏ tăng một. Đổi cách sắp rồi bấm thêm một lần nữa: số giỏ chỉ tăng thêm một.
5. Tải lại trang: số món đã thêm còn giữ. Không xóa localStorage để thử nếu cần giữ giỏ hoặc bản soạn quà đang dùng.
6. Xóa bộ lọc, nhập `TL-001` ở ô tìm đầu trang rồi bấm “Tìm kiếm”; thử cả phím Enter. Kiểm tra còn sản phẩm thỏ.
7. Bấm “Xem chi tiết” của các sản phẩm và đối chiếu đúng tên/mã sản phẩm. Kiểm tra Console không có lỗi import hoặc lỗi khi bấm thêm.
8. Chụp minh chứng sau khi kết quả thực tế đúng, ghi kết quả chạy trên máy vào nhật ký AI và phần bàn giao, rồi commit/push gửi người kiểm tra.

## Phần còn chờ

`product-detail.html` nhận được vẫn là trang thỏ tĩnh, chưa đọc mã sản phẩm để đổi nội dung. Bản này giữ link các trang chi tiết tĩnh theo mã, chưa bật `detailReady: true`. Khi Khanh bàn giao trang động, đổi tùy chọn này và thử đủ tám link trước khi xác nhận hoàn tất phần nối chi tiết.

Số giỏ hiện là dòng thông tin; chưa gắn link đến trang giỏ chưa được bàn giao. Khi Đức đưa phần đếm chung vào `site.js`, đối chiếu lại phần đếm ở header để dùng cùng giao diện chung.

## Ghi nhận hỗ trợ AI

ChatGPT/Codex hỗ trợ đọc các module được gửi, nối chức năng trong hai file của Nam và chạy kiểm tra tự động. Kết quả 36/36 là kết quả trong môi trường công cụ; kết quả Live Server của Nam cần ghi sau khi Nam chạy thực tế. Chưa ghi người nhận đã kiểm tra hoặc ghép main.

## Minh chứng tự kiểm tra

- Lọc danh mục và sắp giá: minh-chung-2b/loc-va-sap-gia.png
- Không có kết quả: minh-chung-2b/khong-co-ket-qua.png
- Thêm vào giỏ: minh-chung-2b/them-vao-gio.png
- Kiểm thử tự động, 36 đạt và 0 lỗi: minh-chung-2b/ket-qua-kiem-thu.png