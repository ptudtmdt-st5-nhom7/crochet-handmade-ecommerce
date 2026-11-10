# Chọn nhiều bộ quà và nhân bản để chỉnh riêng

## Cách sử dụng

1. Nhập ngân sách cho một bộ ở mục 1, nhấn **Gợi ý bộ quà**.
2. Ở mục 2, nhấn **Thêm vào mục tùy chỉnh** trên một hoặc nhiều mẫu. Mỗi lần chọn bổ sung một khung; các bộ trước đó được giữ.
3. Mỗi khung ở mục 3 chứa trọn một bộ, ví dụ hoa và scrunchie. Trong từng khung, có thể đổi sản phẩm, thêm/bỏ món, đổi số lượng trong một bộ, ngân sách và số bộ muốn mua.
4. Nhấn **Nhân bản bộ này** dưới khung cần sao chép. Bản sao hiện ngay dưới khung nguồn, mặc định một bộ. Khung gốc giữ nguyên; sửa bản sao không ảnh hưởng các khung khác. Nếu có hai khung A và B rồi nhân bản từng khung, kết quả là A, bản sao A, B, bản sao B.
5. Mục 4 hiển thị giá một bộ, số bộ và thành tiền của từng khung. Nhấn **Thêm bộ này vào giỏ** trên bộ muốn mua. Các khung đang soạn vẫn được giữ; nhấn thêm lần nữa sẽ tăng số bộ trong giỏ nếu đủ số lượng.
6. Muốn mua nhiều bộ giống hệt: tăng số bộ trong một khung. Muốn mua các bộ khác nhau: chỉnh từng khung rồi thêm từng bộ. Hai bộ giữ nguyên cùng cấu hình sẽ được gộp số lượng trong giỏ.
7. **Bỏ bộ đang soạn** chỉ bỏ khung ở mục 3; không xóa các khung khác hoặc những bộ đã có trong giỏ. **Nhân bản để chỉnh riêng** ở trang giỏ bổ sung một khung mới ở mục 3, giữ nguyên dòng giỏ gốc.

Ngân sách tính cho tiền sản phẩm của một bộ, không bao gồm đóng gói/vận chuyển. Vượt ngân sách sau chỉnh chỉ cảnh báo; bộ rỗng, số không hợp lệ, mã không tồn tại hoặc thiếu lượng minh họa không được thêm giỏ. Giá tính từ catalog hiện tại; lượng được kiểm tra trên toàn giỏ. Lưu trữ là dữ liệu demo của từng trình duyệt và địa chỉ website; dữ liệu ở localhost không tự chuyển sang GitHub Pages.

## File và dữ liệu liên quan

- `gift-builder.html`, `js/gift-builder.js`: giao diện nhiều khung, thao tác trên từng bộ, tổng kết và thêm giỏ.
- `css/style.css`: bổ sung kiểu khung bộ quà và tổng kết, giữ thiết kế chung của Quyến.
- `js/storage.js`: thêm API workspace, giữ API bản soạn/giỏ cũ tương thích.
- `js/cart-page.js`: bản sao từ giỏ được bổ sung vào workspace thay vì thay bản soạn đang có.
- `tests/storage.test.mjs`: kiểm thử lưu nhiều khung, bản sao độc lập, ID không trùng và lỗi lưu.

## Kiểm thử bằng công cụ

Kết quả do Codex chạy trên Chrome headless và Node; không coi là xác nhận từng thành viên đã tự thao tác.

- Node: `node --test tests/*.mjs`, 41 kiểm thử đạt (36 kiểm thử trước và 5 kiểm thử workspace).
- Trình duyệt: chọn hai mẫu, nhân bản từng mẫu, thứ tự A/A-sao/B/B-sao, sửa riêng, mặc định một bộ, tải lại, đi chi tiết rồi quay lại; thêm bộ gốc và bản đổi món, gộp cấu hình giống nhau; nhân bản từ giỏ không thay dòng gốc; từ chối thiếu lượng, giữ dữ liệu khi lỗi lưu; chuyển bản soạn cũ một lần; thao tác liên tiếp sau sửa số lượng.
- Bố cục: sáu trang chính tại 1366, 768, 390 px; kiểm tra không tràn ngang. Các luồng danh sách/tìm kiếm và chi tiết theo mã được thử lại.

Phạm vi vẫn là HTML/CSS/JavaScript thuần và localStorage, chưa có thanh toán hoặc đơn hàng máy chủ.
