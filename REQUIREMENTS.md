# Requirements

## 1. Mục tiêu dự án
*Mục tiêu kinh doanh: Phân phối sản phẩm móc len handmade (làm sẵn, giỏ quà theo ngân sách, đặt làm theo mẫu).
*Giá trị mang lại cho khách hàng: Giải quyết bài toán chọn quà theo chi phí của giới trẻ và chuẩn hóa quản lý đơn thủ công cho shop.

## 2. Phạm vi
### Trong phạm vi
*Phân hệ khách hàng: Tài khoản, Danh mục sản phẩm, Tạo giỏ quà theo ngân sách, Form đặt mẫu riêng, Giỏ hàng & Thanh toán giả lập (COD/QR)
*Phân hệ quản trị (Admin): CRUD sản phẩm & danh mục, duyệt/báo giá yêu cầu custom, cập nhật tiến độ gia công đơn hàng, thống kê cơ bản.

### Ngoài phạm vi
*Tích hợp bên thứ ba: Cổng thanh toán tự động (Stripe, VNPay quốc tế) và API vận chuyển tự động (GHN, ViettelPost).
*Nền tảng thiết bị: Ứng dụng di động (Mobile App iOS/Android) độc lập.


## 3. Người dùng
*Khách vãng lai (guest)
- Mô tả đối tượng: Người dùng truy cập website nhưng chưa đăng nhập.
- Quyền hạn được phép thực hiện:
    + Xem trang chủ, danh mục, tìm kiếm, lọc và xem chi tiết sản phẩm
    + Dùng thử công cụ 'Tạo giỏ quà theo ngân sách'.
    + Thêm sản phẩm làm sẵn vào giỏ hàng; Đăng ký / Đăng nhập.
- Giới hạn truy cập:
    + Chưa thể gửi form 'đặt làm theo mẫu'
    + Chưa lưu được Wishlist
    + Chưa xem được lịch sử đơn hàng.

*Khách hàng thành viên (Customer)
- Mô tả đối tượng: Khách hàng đã có tài khoản và đăng nhập hệ thống.
- Quyền hạn được phép thực hiện:
    + Toàn bộ quyền của Khách vãng lai.
    + Quản lý hồ sơ cá nhân, sổ địa chỉ, danh sách yêu thích (Wishlist)
    + Gửi yêu cầu 'Đặt làm theo mẫu' kèm ảnh/ghi chú.
    + Đặt hàng và theo dõi tiến độ gia công đơn hàng thực tế.
- Giới hạn truy cập:
    + Không được truy cập vào trang Quản trị (Admin Dashboard) hoặc chỉnh sửa dữ liệu hệ thống.

*Quản trị viên (Admin)
- Mô tả đối tượng: Chủ cửa hàng hoặc nhân viên quản lý vận hành.
- Quyền hạn được phép thực hiện:
    + Sản phẩm: Thêm, sửa, xóa danh mục & sản phẩm (gắn nhãn Có sẵn / Nhận custom).
    + Đơn custom: Duyệt, phản hồi và báo giá yêu cầu đặt làm riêng.
    + Đơn hàng: Cập nhật trạng thái (Đã xác nhận -> Đang móc len -> Đóng gói -> Giao hàng -> Hoàn thành).
    + Thống kê: Xem doanh thu và số lượng đơn theo thời gian.

## 4. Yêu cầu chức năng
*F01
- Tên chức năng: Quản lý tài khoản & Phân quyền
- Mô tả: Đăng ký, đăng nhập, đăng xuất, phân quyền truy cập theo vai trò (Role-based).
- Người sử dụng: Guest, Customer, Admin
- Mức độ ưu tiên: Bắt buộc (MVP)
- Tiêu chí nghiệm thu:

*F02
- Tên chức năng: Tìm kiếm và lọc sản phẩm
- Mô tả: Tìm theo từ khóa; lọc theo danh mục (móc khóa, thú len, hoa len), khoảng giá, màu sắc.
- Người sử dụng: Guest, Customer
- Mức độ ưu tiên: Bắt buộc (MVP)
- Tiêu chí nghiệm thu:

*F03
- Tên chức năng:
- Mô tả:
- Người sử dụng:
- Mức độ ưu tiên:
- Tiêu chí nghiệm thu:

*F03
- Tên chức năng:
- Mô tả:
- Người sử dụng:
- Mức độ ưu tiên:
- Tiêu chí nghiệm thu:

*F04
- Tên chức năng:
- Mô tả:
- Người sử dụng:
- Mức độ ưu tiên:
- Tiêu chí nghiệm thu:

*F05
- Tên chức năng:
- Mô tả:
- Người sử dụng:
- Mức độ ưu tiên:
- Tiêu chí nghiệm thu:

*F06
- Tên chức năng:
- Mô tả:
- Người sử dụng:
- Mức độ ưu tiên:
- Tiêu chí nghiệm thu:

*F07
- Tên chức năng:
- Mô tả:
- Người sử dụng:
- Mức độ ưu tiên:
- Tiêu chí nghiệm thu:

*F08
- Tên chức năng:
- Mô tả:
- Người sử dụng:
- Mức độ ưu tiên:
- Tiêu chí nghiệm thu:

*F03
- Tên chức năng:
- Mô tả:
- Người sử dụng:
- Mức độ ưu tiên:
- Tiêu chí nghiệm thu:

*F09
- Tên chức năng:
- Mô tả:
- Người sử dụng:
- Mức độ ưu tiên:
- Tiêu chí nghiệm thu:

*F10
- Tên chức năng:
- Mô tả:
- Người sử dụng:
- Mức độ ưu tiên:
- Tiêu chí nghiệm thu:

*F11
- Tên chức năng:
- Mô tả:
- Người sử dụng:
- Mức độ ưu tiên:
- Tiêu chí nghiệm thu:

*F12
- Tên chức năng:
- Mô tả:
- Người sử dụng:
- Mức độ ưu tiên:
- Tiêu chí nghiệm thu:
## 5. Yêu cầu phi chức năng
Ví dụ:
- Giao diện đáp ứng nhiều kích thước màn hình.
- Dữ liệu đầu vào được kiểm tra.
- Các chức năng quản trị được phân quyền.
- Mã nguồn được tổ chức rõ ràng.
- Không công khai thông tin bí mật.

## 6. Giới hạn và giả định
Nêu giới hạn thời gian, công nghệ và nguồn lực.
