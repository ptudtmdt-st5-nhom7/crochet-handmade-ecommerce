# Backend Lenly Crochet

## Phạm vi

DA01 của Nam tạo nền Express và kết nối PostgreSQL qua `pg`.
DA03 bổ sung schema và dữ liệu mẫu. DA05.1 của Khanh thêm API
danh sách và chi tiết. DA05.2 phục vụ giao diện cùng địa chỉ với API
và nối trang danh sách với dữ liệu PostgreSQL.

## Môi trường

- Node.js và npm. Bản DA05 đã chạy thử với Node.js 24.
- PostgreSQL 18. Database cục bộ đề xuất là `crochet_dev`.

## Cài đặt và cấu hình

Thực hiện từ thư mục gốc repository:

```bat
cd backend
npm ci
copy .env.example .env
```

Nếu đã có file .env, giữ cấu hình đang dùng, không ghi đè.

Trong pgAdmin, tạo database `crochet_dev` nếu chưa có. Trên database trống,
chạy lần lượt [001_schema.sql](sql/001_schema.sql) và [002_seed.sql](sql/002_seed.sql).
Nếu database đã có bảng và dữ liệu DA03, bỏ qua bước nạp lại.
Mở `.env` và điền thông tin PostgreSQL trên máy:

```env
PORT=3000
PGHOST=127.0.0.1
PGPORT=5432
PGDATABASE=crochet_dev
PGUSER=postgres
PGPASSWORD="your_local_password"
```

Thay mật khẩu mẫu bằng mật khẩu PostgreSQL của người chạy.
Không commit .env hoặc thư mục node_modules.

## Chạy backend

Trong thư mục backend:

```bat
npm start
```

Lệnh phát triển, tự khởi động lại khi lưu thay đổi mã:

```bat
npm run dev
```

Chỉ chạy một lệnh tại một thời điểm.
Dừng máy chủ bằng Ctrl + C.

Trên Windows, nếu PowerShell chặn `npm.ps1`, dùng `npm.cmd ci` và `npm.cmd start`.

## Kiểm tra

Giữ Terminal đang chạy và mở các URL sau trên trình duyệt.

### Kiểm tra Express

http://127.0.0.1:3000/health

Kết quả mong đợi:

```json
{"status":"ok","service":"crochet-backend"}
```

### Kiểm tra PostgreSQL

http://127.0.0.1:3000/health/db

Kết quả mong đợi: status là ok, database là crochet_dev,
kèm thời gian do PostgreSQL trả về.

Đường dẫn này thực hiện truy vấn:
SELECT current_database() AS database, NOW() AS time

Nếu truy vấn thất bại, phản hồi HTTP 503 với thông báo
không kết nối được PostgreSQL.

### Kiểm tra API và danh sách trên trình duyệt

- [API danh sách](http://127.0.0.1:3000/api/products) trả `{ "data": [...] }` với 8 sản phẩm sau khi nạp dữ liệu mẫu.
- [API chi tiết KC-001](http://127.0.0.1:3000/api/products/KC-001) trả một sản phẩm và các biến thể đang bán.
- [Trang danh sách](http://127.0.0.1:3000/products.html) gọi API cùng địa chỉ. Thử tìm theo tên hoặc mã, lọc danh mục và sắp xếp theo giá.
- Kết quả của bản kết nối được ghi ở [báo cáo DA05](../docs/ban-giao-da05.md).

## Kết quả tự kiểm tra DA01

- Khởi động bằng node server.js: đã chạy được.
- Khởi động bằng npm start: đã chạy được.
- GET /health: trả về status ok và service crochet-backend.
- GET /health/db: trả về status ok và database crochet_dev.
- Minh chứng được lưu tại ../docs/minh-chung-da01/.

Đã chạy thử npm run dev thành công; backend tự khởi động lại khi lưu thay đổi server.js.

## Lưu ý khi gặp lỗi

- Sau khi sửa .env, dừng và chạy lại backend.
- Kiểm tra đủ các biến trong .env, không chỉ trong .env.example.
- Nếu báo lỗi xác thực 28P01, kiểm tra tài khoản và mật khẩu.
- Nếu không kết nối được, kiểm tra PostgreSQL đang chạy,
  tên database, địa chỉ và cổng.
- Lưu các file mã nguồn trước khi chạy.

## Giới hạn

Backend hiện chỉ lắng nghe tại 127.0.0.1 trên máy người chạy.
DA05.2 chỉ nối dữ liệu cho trang danh sách. Chi tiết trên giao diện, giỏ và bộ quà
vẫn dùng dữ liệu Buổi 3. Chưa triển khai backend lên máy chủ. GitHub Pages tiếp tục
phục vụ bản xem trước với dữ liệu minh họa.
