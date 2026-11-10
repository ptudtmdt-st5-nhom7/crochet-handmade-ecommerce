# Hướng dẫn DevTools và nghiệm thu Bước 7

## Kiểm tra giao diện

Chạy website qua Live Server hoặc python -m http.server 5500 tại gốc dự án, dùng cùng host/cổng. Mở Chrome, nhấn F12; Ctrl+Shift+M bật mô phỏng thiết bị. Chọn Responsive và lần lượt đặt chiều rộng 1366, 768, 390 px. Thử cả danh sách rỗng, bộ quà đã chọn, vượt ngân sách, giỏ có hàng và giỏ trống. Dùng Tab kiểm tra viền focus; rê chuột lên nút để kiểm tra hover. Chụp ảnh đúng bản đang ghép và ghi chiều rộng, trang, dữ liệu.

## Console và Network

Trong Console, xóa log trước ca thử rồi thao tác. Ghi lại thông báo đỏ, file/dòng và bước tái hiện. Phân biệt lỗi không xử lý với cảnh báo chủ động về dữ liệu localStorage hỏng; không xóa mã chỉ để mất cảnh báo. Trong Network, tải lại trang và kiểm tra yêu cầu bị lỗi, nhất là CSS, JS và ảnh. Nếu lỗi 404, đối chiếu tên file và đường dẫn tương đối. Kiểm tra ảnh tải hoàn tất trước khi chụp.

## Elements và Computed

Chọn phần tử bị lệch bằng công cụ chọn phần tử. Xem Styles/Computed để xác định width, min-width, padding, gap, display hoặc media query đang áp dụng. Sửa thử tại DevTools chỉ có hiệu lực tạm thời; chép thay đổi đã xác nhận về css/style.css. Không xóa id/name/data-* hoặc thuộc tính hidden do JavaScript điều khiển.

## Application và lưu trữ

Mở Application → Local Storage → đúng origin đang thử. Theo dõi lenly.cart.v1 và lenly.giftDraft.v1 trước/sau thêm giỏ, đổi số lượng, nhân bản và tải lại. Giỏ lưu nhóm và số lượng; bản soạn lưu riêng. Khi đổi host/cổng, đó là vùng lưu trữ khác. Chỉ xóa hai khóa này trong phiên thử riêng khi muốn đặt lại dữ liệu; không xóa dữ liệu cá nhân ở website khác.

## Ưu tiên xử lý lỗi

1. P1 — Chặn luồng hoặc sai dữ liệu: trang không mở, lỗi import, sai giá/số lượng, mất giỏ, sửa bản sao làm đổi gốc, vượt tồn vẫn thêm. Dừng nghiệm thu luồng; gửi đúng PIC và Đức. Ví dụ lỗi import: kiểm tra đường dẫn/module export, sửa ở file liên quan rồi thử lại cả trang nhận.
2. P2 — Không thao tác được hoặc phản hồi sai: nút bị che, ô lọc không dùng được, không có báo lỗi, tràn ngang làm mất nội dung. Quyến xử lý CSS, chủ trang xử lý HTML/JS. Ví dụ ô select tràn: kiểm tra min-width/khung grid, sửa giới hạn và kiểm tra cả ba độ rộng.
3. P3 — Lệch hình thức: khoảng cách, cỡ chữ, bo góc hoặc căn hàng chưa đồng đều nhưng vẫn thao tác được. Quyến sửa có phạm vi và kiểm tra trang khác dùng chung selector.

Đây là hướng dẫn phân loại khi phát sinh lỗi, không phải danh sách lỗi đang tồn tại. 12 ca bổ sung không ghi nhận thất bại. Sau mọi sửa đổi, lặp ca lỗi và luồng liên quan; chỉ ghi Đạt khi có kết quả thực tế.

## Xác nhận còn chờ

- Quyến: đọc hiểu thay đổi, tự thử và ghi quyết định giữ/sửa/bỏ đối với hỗ trợ AI.
- Nam/Tuấn: rà wrapper .product-filter-fields/.product-filter-field và việc ẩn thanh tìm thứ hai; xác nhận một ô tìm chính, tìm/lọc/sắp vẫn đúng.
- Đức: nhận file/patch hoặc nhánh/commit, ghép vào main mới, chạy lại và tổng hợp TEST_REPORT_BUOI3.md.
- Các PIC: thử phần mình trên bản đã ghép, phối hợp sửa lỗi nếu có.

Chưa có commit/PR/push hoặc xác nhận nhận bàn giao trong phiên này. Giữ trạng thái chờ nghiệm thu; không ghi Done hoặc xác nhận đã đáp ứng các mốc giờ quá khứ. Tài liệu phân công ghi 10/11 11:00 bàn giao, 14:00 bản tích hợp, 14:00–18:00 kiểm tra chung; lịch này không phải bằng chứng công việc đã được giao đúng giờ.
