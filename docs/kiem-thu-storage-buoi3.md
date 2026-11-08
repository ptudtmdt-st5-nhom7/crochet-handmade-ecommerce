# Kiểm tra bản nền và lưu trữ Buổi 3

Ngày: 08/11/2026. Người yêu cầu: Nguyễn Quang Đức. Thực hiện bằng công cụ: OpenAI Codex; không ghi thay việc các thành viên đã tự thao tác.

## Phạm vi

Kiểm tra `js/storage.js` độc lập và trang kỹ thuật `docs/kiem-tra-storage.html`. Chưa nghiệm thu giỏ Bảo, trang chọn quà Châu, chi tiết Khanh hoặc tích hợp toàn website.

## Kết quả

| Cách thử | Kết quả thực tế |
| --- | --- |
| `npm run test:storage` trên Node 24 | 23/23 ca đạt; dữ liệu rỗng/hỏng/sai phiên bản, bản sao độc lập, hai khóa riêng, số lượng sai, lỗi ghi/xóa và quyền truy cập được kiểm tra. |
| Mở trang kỹ thuật bằng trình duyệt qua HTTP cổng riêng 5513 | Module tải được, ban đầu giỏ rỗng và bản soạn `null`; không tự ghi mẫu khi mở. |
| Bấm lưu giỏ và lưu bản đang soạn, tải lại trang | Hàng lẻ, nhóm quà, số lượng từng món/số bộ và bản soạn vẫn hiển thị đúng cấu trúc mẫu. |
| Bấm xóa riêng bản đang soạn | Bản soạn thành `null`, giỏ lẻ/bộ bên cạnh vẫn còn nguyên. |
| Xem lỗi/cảnh báo trình duyệt sau lượt thử bình thường | Không có lỗi/cảnh báo trong lượt thử này. |

Các lỗi quyền/dung lượng trong bộ tự động được mô phỏng bằng bộ nhớ giả; không khẳng định đã làm đầy bộ nhớ trình duyệt thật. Dữ liệu mẫu chưa chứng minh phép tính giá/tồn kho của các module khác đúng. Các thành viên cần gọi thử và xác nhận đầu vào trước khi sử dụng.

## Kiểm tra tiếp khi ghép

- Bảo kiểm tra lưu sau thêm/xóa/đổi số lượng và chỉ cập nhật trạng thái sau khi lưu thành công; tính lại giá từ dữ liệu Nam.
- Châu kiểm tra chọn bộ, đổi món/số lượng, giữ bản soạn khi xem chi tiết/quay lại, thêm bộ và xóa bản soạn sau xác nhận.
- Khanh kiểm tra URL đúng mã và đường quay lại; không tự xóa bản soạn.
- Đức tích hợp, từng PIC thử lại phần mình; Quyến kiểm tra hình thức/responsive trên bản mới.
