# Backend DA01

Người thực hiện: Nguyễn Thanh Nam  
Người hỗ trợ: Khanh  
Người phụ trách feedback: Tuấn

## Phạm vi

Khởi tạo backend Node.js/Express và cấu hình kết nối PostgreSQL
bằng thư viện pg.

Bản này có hai đường dẫn kiểm tra máy chủ và kết nối database.
Chưa tạo bảng, nạp sản phẩm hoặc triển khai API sản phẩm;
các nội dung đó thuộc DA03.

## Môi trường đã sử dụng

- Node.js v26.13.1.
- npm 11.20.0.
- PostgreSQL 18.
- Database cục bộ: crochet_dev.

## Cài đặt và cấu hình

Thực hiện từ thư mục gốc repository:

```bat
cd backend
npm ci
copy .env.example .env
```

Nếu đã có file .env, giữ cấu hình đang dùng, không ghi đè.

Trong pgAdmin, tạo database crochet_dev nếu chưa có.
Mở .env và điền thông tin PostgreSQL trên máy:

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

## Kết quả tự kiểm tra

- Khởi động bằng node server.js: đã chạy được.
- Khởi động bằng npm start: đã chạy được.
- GET /health: trả về status ok và service crochet-backend.
- GET /health/db: trả về status ok và database crochet_dev.
- Minh chứng được lưu tại ../docs/minh-chung-da01/.

Lệnh npm run dev đã được cấu hình, chưa ghi nhận kết quả tự thử.

## Lưu ý khi gặp lỗi

- Sau khi sửa .env, dừng và chạy lại backend.
- Kiểm tra đủ các biến trong .env, không chỉ trong .env.example.
- Nếu báo lỗi xác thực 28P01, kiểm tra tài khoản và mật khẩu.
- Nếu không kết nối được, kiểm tra PostgreSQL đang chạy,
  tên database, địa chỉ và cổng.
- Lưu các file mã nguồn trước khi chạy.

## Giới hạn

Backend hiện chỉ lắng nghe tại 127.0.0.1 trên máy người chạy.
Chưa nối giao diện với backend và chưa triển khai lên máy chủ.
GitHub Pages chỉ phục vụ giao diện tĩnh, không chạy backend này.