# Bàn giao bản kết nối sản phẩm DA05

## 1. Phạm vi kết nối (DA05.2)

Trang danh sách gọi `GET /api/products` từ cùng địa chỉ với giao diện.
Dữ liệu đi từ PostgreSQL qua Express đến trang `products.html`.
Tên, ảnh, danh mục, giá và số lượng của biến thể hiển thị đến từ API.
Trang ưu tiên biến thể mặc định. Tìm kiếm theo tên/mã, lọc, sắp giá
và xóa bộ lọc áp dụng trên dữ liệu đã nhận.

Trang có trạng thái đang tải, danh sách rỗng, lọc không có kết quả và lỗi kèm nút
**Thử lại**. Bản tĩnh trên GitHub Pages tiếp tục hiển thị dữ liệu mẫu.

Trang chi tiết, giỏ và bộ quà vẫn dùng dữ liệu Buổi 3. Khi sản phẩm mới
hoặc giá của biến thể không khớp, trang danh sách vẫn hiển thị dữ liệu từ API,
còn thao tác cần catalog cũ được ẩn hoặc khóa để tránh dùng nhầm mặt hàng/giá.
Nút thêm giỏ cũng được khóa nếu tồn biến thể khác lượng trong giỏ Buổi 3,
vì giỏ cũ chưa đọc được tồn mới. Tồn mẫu chỉ dùng thử.

## 2. Cách chạy (DA05.4)

1. Lấy nhánh của PR và mở dự án. Cài Node.js/npm và PostgreSQL nếu máy chưa có.
2. Tạo database `crochet_dev` trong pgAdmin. Với database trống, chạy
   [schema](../backend/sql/001_schema.sql) rồi [dữ liệu mẫu](../backend/sql/002_seed.sql).
   Bỏ qua chạy lại script nếu đã tạo bảng và nạp mẫu.
3. Tạo `backend/.env` theo [file mẫu](../backend/.env.example), giữ mật khẩu
   trên máy và điền đúng cổng PostgreSQL.
4. Trong `backend`, chạy `npm ci` rồi `npm start`. Windows có thể dùng
   `npm.cmd ci` và `npm.cmd start`.
5. Mở [trang danh sách](http://127.0.0.1:3000/products.html). Đối chiếu
   tại [API danh sách](http://127.0.0.1:3000/api/products) và
   [trạng thái database](http://127.0.0.1:3000/health/db).

Đổi URL theo `PORT` nếu không dùng 3000. Dùng cùng host và cổng khi thử giỏ
để trình duyệt đọc cùng bộ nhớ localStorage. Xem thêm [hướng dẫn backend](../backend/README.md).

## 3. Kết quả kiểm thử trên bản kết nối (DA05.3)

Báo cáo [DA05.3 của Châu](https://docs.google.com/document/d/1V3NdIGiTeoN_ShX-vEe1GK4qIG4zNve8ezKFrvLF4qA/edit?tab=t.hw7nroutb453)
ghi kết quả nhóm đã chạy. Bảng dưới là lượt kiểm tra bổ sung bằng công cụ
trên bản PR, dùng Node.js 24.20.0, PostgreSQL 18.7 với database thử riêng
và Chrome qua Playwright.

| Ca | Kết quả thực tế |
| --- | --- |
| TC-01–TC-05 | Express khởi động, `/health` và kết nối hợp lệ trả 200. Khi database không truy cập được, máy chủ vẫn chạy và trả 503. Tạo 3 bảng, nạp 4 danh mục, 8 sản phẩm và 8 biến thể. |
| TC-06–TC-08 | API trả đủ 8 sản phẩm, tên/ảnh/giá khớp catalog. Chi tiết khớp cho cả 8 mã. |
| TC-09–TC-11 | Mã hợp lệ chưa có như `ZZ-999` trả 404. Mã sai định dạng như `BAD-999` và `kc_01` trả 400. Database chỉ có schema trả 200 với `data: []`. |
| WEB-01–WEB-02 | Đã thấy request API trả 200 trên trình duyệt, tải đủ 8 ảnh, có trạng thái đang tải và không tràn ngang ở 1366/768/390 px. Các file backend và cấu hình nằm ngoài vùng phục vụ web. |
| WEB-03 | Tìm theo tên/mã, lọc danh mục, sắp giá hai chiều, xóa lọc, chuyển từ ô tìm trang chủ và thao tác chi tiết/giỏ mẫu đều chạy. |
| WEB-04–WEB-05 | Đổi giá/tồn trong database thử làm danh sách thay đổi tương ứng. Khi hết hàng hoặc dữ liệu lệch catalog cũ, nút thêm giỏ bị khóa. Danh sách rỗng hiện đúng thông báo. |
| WEB-06–WEB-08 | Thử phản hồi 503 và dữ liệu sai cấu trúc, trang báo lỗi và bấm thử lại thì tải được. Bản tĩnh vẫn hiện 8 sản phẩm mẫu. Console không có lỗi ngoài phản hồi 503 được tạo chủ động. |
| Kiểm thử JavaScript | Chạy `node --test` ở thư mục gốc, đạt 42/42 ca. |

TC-12–TC-20 chờ các API nghiệp vụ tương ứng. DA05 chưa bàn giao checkout,
tài khoản, đặt làm, voucher hoặc thanh toán trên máy chủ.

## 4. Việc rà soát trước khi ghép (DA05.4)

- Quyến và Bảo kiểm tra danh sách, bộ lọc, trạng thái tải và lỗi.
- Đức đối chiếu báo cáo DA05.3 của Châu với bản PR và thử lại ca chính trên máy mình.
- Đức và Tuấn xác nhận hướng dẫn chạy và phạm vi của bản nền. Sau khi duyệt,
  ghép PR vào `main` rồi chạy lại `/health/db`, `/api/products` và `products.html`.
