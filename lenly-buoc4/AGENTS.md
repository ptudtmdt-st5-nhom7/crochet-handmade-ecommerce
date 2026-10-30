# Hướng dẫn AI hỗ trợ dự án

## 1. Bối cảnh dự án

Đây là dự án website thương mại điện tử của sinh viên Nhóm 7,
kinh doanh sản phẩm móc len handmade cho một cửa hàng.

Định hướng ban đầu gồm mua hàng có sẵn, đặt làm theo mẫu
và tạo giỏ quà theo ngân sách.

## 2. Phạm vi

Chỉ triển khai các chức năng đã được nhóm thống nhất
trong REQUIREMENTS.md.

Các nội dung chưa được ghi là yêu cầu đã chốt trong REQUIREMENTS.md
không được tự ý triển khai.
Không tự ý thêm chức năng hoặc chọn công nghệ thay nhóm.

Công nghệ đã thống nhất: Frontend (HTML5, CSS3, JavaScript thuần,
Tailwind CSS), Backend (Node.js, Express.js), cơ sở dữ liệu
(MongoDB, Mongoose), quản lý mã nguồn (Git, GitHub).
Xem REQUIREMENTS.md, mục 6.

## 3. Nguyên tắc viết mã nguồn

- Giữ mã nguồn rõ ràng, dễ đọc và dễ bảo trì.
- Không thay đổi kiến trúc lớn khi chưa được nhóm đồng ý.
- Không tự ý xóa chức năng đang hoạt động.
- Ưu tiên thay đổi nhỏ, có thể kiểm tra.

## 4. Quy trình làm việc

Trước khi sửa mã nguồn:

1. Đọc các tài liệu liên quan.
2. Phân tích hiện trạng.
3. Đề xuất phương án.
4. Chờ nhóm xác nhận.

Sau khi sửa mã nguồn:

1. Giải thích các thay đổi.
2. Nêu những file đã sửa.
3. Hướng dẫn chạy và kiểm thử.
4. Báo cáo các giới hạn còn tồn tại.

## 5. Ghi nhận sử dụng AI

Ghi lại công cụ, mục đích, prompt chính và kết quả sử dụng AI.

Nhóm kiểm tra kết quả, ghi nhận ý kiến phản biện,
quyết định giữ, sửa hoặc bỏ và người kiểm tra
trong AI_USAGE_LOG.md.

## 6. Bảo mật

- Không đưa mật khẩu, API key hoặc token vào mã nguồn hoặc repository;
  dùng biến môi trường và không commit file cấu hình chứa thông tin bí mật.
- Không tự ý vô hiệu hóa hoặc bỏ qua các kiểm tra bảo mật
  (đăng nhập, phân quyền, kiểm tra dữ liệu đầu vào và kiểm tra quyền
  ở phía máy chủ).
- Không sử dụng dữ liệu cá nhân thật khi chưa được phép; dùng dữ liệu mẫu.
- Không đưa thông tin đăng nhập, dữ liệu cá nhân hoặc tài liệu không
  được phép công khai vào công cụ AI.

## 7. Giao tiếp

Nếu yêu cầu chưa rõ, hãy hỏi lại nhóm trước khi triển khai.
Không tự suy đoán hoặc tự thêm chức năng để lấp chỗ chưa rõ.
Ghi lại câu hỏi và quyết định của nhóm trong GitHub Issue liên quan.
