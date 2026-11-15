# DA03 — Dữ liệu và API sản phẩm

Người thực hiện: Nguyễn Thanh Nam.
Người phụ trách feedback: Khanh.
Trạng thái: Đề xuất chờ nhóm kiểm tra và thống nhất.

## 1. Phạm vi

Đã tạo cấu trúc PostgreSQL cho danh mục, sản phẩm và biến thể;
nạp dữ liệu mẫu từ js/products.js.

API dưới đây là hợp đồng đề xuất cho DA05.1 triển khai,
chưa phải API đã chạy. Quan hệ các nghiệp vụ khác mới ở mức
phác thảo; thiết kế chi tiết tiếp tục ở M3–M4.

## 2. Cấu trúc dữ liệu

### categories

| Trường | Kiểu | Ý nghĩa và ràng buộc |
|---|---|---|
| id | TEXT | Khóa chính; mã danh mục hiện tại |
| name | TEXT | Bắt buộc, không được chỉ chứa khoảng trắng |

### products

| Trường | Kiểu | Ý nghĩa và ràng buộc |
|---|---|---|
| id | TEXT | Khóa chính; giữ mã KC-001, TL-001... |
| category_id | TEXT | Khóa ngoại tới categories.id; bắt buộc |
| name | TEXT | Bắt buộc, không rỗng |
| description | TEXT | Mô tả; mặc định chuỗi rỗng |
| image | TEXT | Đường dẫn ảnh; bắt buộc, không rỗng |
| material | TEXT | Chất liệu; mặc định chuỗi rỗng |
| is_active | BOOLEAN | Đang bán; mặc định true |
| display_order | INTEGER | Thứ tự hiển thị; lớn hơn 0 |

### product_variants

| Trường | Kiểu | Ý nghĩa và ràng buộc |
|---|---|---|
| id | TEXT | Khóa chính; mã biến thể |
| product_id | TEXT | Khóa ngoại tới products.id; bắt buộc |
| name | TEXT | Tên biến thể; bắt buộc, không rỗng |
| color | TEXT | Mô tả màu; mặc định chuỗi rỗng |
| size | TEXT | Mô tả kích thước; mặc định chuỗi rỗng |
| price | INTEGER | Giá VNĐ; bắt buộc, không âm |
| stock_quantity | INTEGER | Số lượng; không âm, mặc định 0 |
| is_active | BOOLEAN | Đang bán; mặc định true |

Tên biến thể không được trùng trong cùng sản phẩm.
Khóa ngoại dùng ON DELETE RESTRICT, tránh xóa bản ghi cha
khi vẫn có bản ghi con. Đã tạo chỉ mục cho hai cột khóa ngoại.

Mỗi sản phẩm mẫu có một biến thể tên "Mặc định",
mã theo dạng KC-001-DEFAULT. Không tự tách các mô tả màu
có dấu phẩy thành những lựa chọn riêng.

Giá và lượng hàng lưu tại biến thể. Nếu bổ sung biến thể sau này,
mỗi biến thể có giá và lượng riêng.

## 3. Dữ liệu mẫu

| Mã | Tên | Giá VNĐ |
|---|---|---:|
| KC-001 | Móc khóa gấu len | 45000 |
| KC-002 | Móc khóa hoa cúc len | 35000 |
| TL-001 | Thú len thỏ | 125000 |
| TL-002 | Thú len mèo | 115000 |
| HL-001 | Hoa tulip len | 35000 |
| HL-002 | Bó hoa len nhỏ | 99000 |
| PK-001 | Scrunchie len | 30000 |
| PK-002 | Kẹp tóc hoa len | 25000 |

Giữ nguyên tên, mô tả, ảnh, chất liệu, màu và kích thước
từ js/products.js. Có 4 danh mục, 8 sản phẩm và 8 biến thể.

stock_quantity = 20 được lấy từ stockDemo để thử nghiệm,
không xác nhận tồn kho thực tế. Chưa triển khai giữ/trừ tồn kho.

## 4. Cách tạo bảng và nạp dữ liệu

1. Tạo database trống, ví dụ crochet_dev.
2. Mở Query Tool của đúng database trong pgAdmin.
3. Mở và chạy toàn bộ backend/sql/001_schema.sql.
4. Thay toàn bộ nội dung Query Tool bằng nội dung
   backend/sql/002_seed.sql rồi chạy.

Mỗi script chạy một lần trên database mới.
Không chạy nối lại mã CREATE TABLE khi nạp seed.
Script dùng giao dịch BEGIN/COMMIT; nếu gặp lỗi,
chạy riêng ROLLBACK trước khi xử lý và chạy lại.

Không xóa dữ liệu đang dùng để chạy lại seed.
Các script này chưa phải cơ chế migration nâng cấp database.

## 5. Hợp đồng API đề xuất

### Quy ước chung

- Tiền là số nguyên VNĐ.
- JSON dùng camelCase; SQL dùng snake_case.
- Chỉ công khai sản phẩm và biến thể đang bán.
- Sản phẩm hết hàng vẫn có thể xuất hiện với stockQuantity = 0.
- image là đường dẫn tương đối từ gốc frontend.
  Khi frontend và API khác origin, phía giao diện phải ghép
  với địa chỉ phục vụ ảnh, không mặc định ảnh nằm trên API.
- Không trả trường stockDemo; dùng stockQuantity.
- Chưa phân trang, tìm kiếm hoặc lọc phía server trong hợp đồng này.
  Giao diện có thể xử lý trên danh sách nhận được.

### GET /api/products

Trả HTTP 200 với danh sách sản phẩm có is_active = true
và có ít nhất một biến thể đang bán.

Sắp theo display_order tăng dần, sau đó id tăng dần.
Chỉ đưa các biến thể đang bán vào variants; sắp theo id.

```json
{
  "data": [
    {
      "id": "KC-001",
      "name": "Móc khóa gấu len",
      "category": "moc-khoa",
      "categoryLabel": "Móc khóa len",
      "description": "Chú gấu len nhỏ xinh giúp chùm chìa khóa hoặc chiếc balo của bạn thêm đáng yêu. Một món quà dễ thương dành tặng bạn bè.",
      "image": "images/product-1.webp",
      "material": "Sợi cotton milk, bông nhồi polyester, khoen kim loại",
      "variants": [
        {
          "id": "KC-001-DEFAULT",
          "name": "Mặc định",
          "color": "Nâu nhạt, kem",
          "size": "Cao khoảng 7 cm, chưa tính khoen móc",
          "price": 45000,
          "stockQuantity": 20
        }
      ]
    }
  ]
}
```

Ví dụ chỉ minh họa một phần tử. Khi dùng seed hiện tại,
kết quả mong đợi có đủ 8 sản phẩm.
Không có sản phẩm phù hợp: HTTP 200, {"data": []}.

### GET /api/products/:id

:id là mã sản phẩm, ví dụ KC-001; phân biệt chữ hoa/chữ thường.
Mã hợp lệ theo mẫu: ^[A-Z]{2}-[0-9]{3}$.

HTTP 200 trả {"data": {...}}, trong đó đối tượng sản phẩm
có các trường giống một phần tử của danh sách phía trên.
variants chứa các biến thể đang bán.

### Lỗi

Cấu trúc phản hồi:

```json
{
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Không tìm thấy sản phẩm."
  }
}
```

| HTTP | code | Trường hợp |
|---|---|---|
| 400 | INVALID_PRODUCT_ID | Mã không đúng định dạng |
| 404 | PRODUCT_NOT_FOUND | Mã đúng định dạng nhưng không tồn tại, sản phẩm ngừng bán hoặc không có biến thể đang bán |
| 503 | DATABASE_UNAVAILABLE | Không kết nối được database hoặc truy vấn quá thời gian |
| 500 | INTERNAL_ERROR | Lỗi máy chủ ngoài dự kiến |

Không trả mật khẩu, chuỗi kết nối, SQL hoặc stack trace cho client.
Truy vấn nhận mã sản phẩm phải dùng tham số, không ghép chuỗi SQL.

### Điểm nối với frontend

Dữ liệu hiện tại có price, color, size và stockDemo ở cấp sản phẩm.
Hợp đồng mới đưa các thông tin đó vào variants.

Khi nối giao diện ở DA05.2, cần chọn biến thể trước khi lấy giá,
màu, kích thước và lượng hàng. Dữ liệu mẫu hiện có một biến thể
mặc định cho mỗi sản phẩm. Không tự cộng lượng của các biến thể
rồi coi là lượng của biến thể khách đã chọn.

Giỏ và thành phần bộ quà cần thống nhất dùng variantId khi nối backend;
việc chuyển dữ liệu localStorage cũ chưa được triển khai ở DA03.

## 6. Phác thảo quan hệ dữ liệu chung

Ba bảng danh mục/sản phẩm/biến thể đã có SQL.
Các thực thể bên dưới mới là đề xuất, chưa tạo bảng.

| Quan hệ đề xuất | Ý nghĩa |
|---|---|
| Account 1–N Order | Một tài khoản có nhiều đơn |
| Account 1–N CustomRequest | Một tài khoản có nhiều yêu cầu đặt làm |
| GiftSet 1–N GiftSetItem | Bộ quà gồm nhiều thành phần |
| ProductVariant 1–N GiftSetItem | Thành phần quà tham chiếu biến thể và số lượng |
| Order 1–N OrderItem | Đơn gồm các dòng hàng lẻ hoặc bộ quà |
| OrderItem 1–N OrderItemComponent | Dòng bộ quà lưu từng biến thể thành phần và số lượng |
| CustomRequest 1–N Quote | Yêu cầu đặt làm có thể có nhiều phiên bản báo giá |
| Quote 0–1 Order | Báo giá được chấp nhận có thể tạo đơn đặt làm |
| Order 1–N Payment | Đơn có thể có nhiều lần thanh toán, như cọc và phần còn lại |

Dòng hàng lẻ tham chiếu biến thể. Dòng bộ quà lưu bản chụp
cấu hình thành phần đã mua; không chỉ tham chiếu bộ mẫu có thể sửa.

Đơn và dòng đơn cần lưu tên, đơn giá và cấu hình tại thời điểm đặt.
Không tính lại tiền đơn cũ bằng giá catalog hiện hành.

Đơn đặt làm và hàng mua sẵn cần phân luồng theo DA02.4.
Chính sách khách vãng lai, phiên bản báo giá, hoàn tiền,
giữ/trừ tồn và giao dịch thanh toán sẽ tiếp tục chốt ở M3–M4.
DA03 chưa triển khai các luồng này.

## 7. Kết quả đã tự kiểm tra

Kiểm tra trên PostgreSQL 18, database crochet_dev:

| Ca kiểm tra | Kết quả thực tế |
|---|---|
| Chạy script tạo bảng | Thành công |
| Chạy script nạp dữ liệu | Thành công |
| Đếm bản ghi | 4 danh mục, 8 sản phẩm, 8 biến thể |
| Truy vấn danh sách kèm biến thể | 8 dòng; tên và giá khớp catalog |
| Đổi giá KC-001-DEFAULT thành -1 | Bị chặn, SQLSTATE 23514 |
| Đổi product_id sang KHONG-TON-TAI | Bị chặn, SQLSTATE 23503 |
| Kết thúc hai giao dịch thử lỗi | Đã chạy ROLLBACK |

Minh chứng tại docs/minh-chung-da03/:
- du-lieu-8-san-pham.png
- so-luong-ban-ghi.png
- chan-gia-am.png
- chan-khoa-ngoai.png

Chưa chạy thử HTTP cho hai API sản phẩm vì chưa triển khai route.
Chưa tự thử toàn bộ ràng buộc còn lại.

## 8. Nội dung cần feedback

Nhờ Khanh kiểm tra:
- Cấu trúc bảng, khóa và ràng buộc.
- Script tạo/nạp trên database thử riêng.
- Quy ước variants và điểm nối với giao diện.
- Đường dẫn API, trường JSON và mã lỗi đề xuất.

Nhờ Bảo, Tuấn và Đức đối chiếu phác thảo quan hệ
với quy tắc giỏ/đơn, đặt làm và bộ quà.
Chỉ coi hợp đồng đã chốt sau khi nhóm xác nhận.