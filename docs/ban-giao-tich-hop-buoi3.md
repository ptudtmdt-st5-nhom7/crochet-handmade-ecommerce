# Bản tích hợp chức năng Buổi 3 — bàn giao Quyến

Ngày ghi nhận: 10/11/2026. Người điều phối và nhận bàn giao: Nguyễn Quang Đức.

## 1. Nội dung đã ghép và sửa

| Phần | Nguồn và thay đổi tích hợp |
| --- | --- |
| Danh sách sản phẩm | Nhận phần 2B của Nam tại `12ecb1f` (PR #28), nối tìm kiếm/lọc/sắp xếp của Tuấn và thêm giỏ của Bảo. Bật liên kết chi tiết động cho đủ tám mã. |
| Chi tiết động | Nhận phần Khanh trên `buoi3-khanh` tại `8d852ca`; đọc mã qua URL, đổ tên/ảnh/giá/thuộc tính, kiểm tra số lượng và thêm lẻ. Thiếu/sai mã hiện thông báo và ẩn nội dung sản phẩm. |
| Chi tiết từ chọn quà | Châu lưu bản soạn trước khi mở `product-detail.html?id=...&from=gift`. Link quay lại của Khanh về `gift-builder.html`, khôi phục lựa chọn. Chỉ dùng đích quay lại cố định, không nhận URL tùy ý. |
| Giỏ và bản soạn | Giữ phần Bảo đã merge qua PR #33: hàng lẻ và từng nhóm bộ quà, tăng/giảm, xóa, tổng tiền, tải lại và nhân bản độc lập một bộ. |
| Điều hướng chung | Bổ sung link Chọn quà/Giỏ hàng trên sáu trang chính; `js/site.js` cập nhật số món khi mở trang. Tìm đầu trang chuyển tới danh sách qua `?q=...`; danh sách nhận và áp dụng từ khóa. |
| CSS và đường dẫn | Chỉ nhận phần CSS chi tiết của Khanh; giữ CSS danh sách, giới thiệu, hover/focus và giỏ của main. Bỏ link `css/product-detail.css` không tồn tại vì CSS chi tiết đã nằm trong `css/style.css`. Giữ các điểm nối JavaScript. |
| Nội dung trang chủ | Link sản phẩm nổi bật dùng đúng mã; mô tả ngân sách thống nhất là tiền sản phẩm của một bộ, chưa gồm đóng gói/vận chuyển. |

Không chép đè toàn bộ `css/style.css` bằng bản cũ. Các nhật ký của Nam, Khanh, Bảo được giữ; phần Codex hỗ trợ tích hợp ghi riêng trong `AI_USAGE_LOG.md`.

## 2. Kết quả kiểm tra của công cụ

- `node --test tests/*.mjs`: 36 kiểm thử đạt, 0 lỗi, trên bản đã ghép và cập nhật liên kết động.
- Chạy lại 16 ca kiểm tra DOM giỏ hàng: đều đạt, gồm lỗi lưu, giới hạn số lượng và bản sao độc lập.
- Chrome kiểm thử riêng qua HTTP: 29 nhóm kiểm tra chức năng đạt; bao gồm đủ tám mã chi tiết, dữ liệu sai/thiếu, tìm kiếm/lọc/sắp, thêm lẻ, kiểm tra số lượng/tồn, xem chi tiết từ bộ quà và quay lại, cảnh báo vượt ngân sách, số bộ, tải lại, nhân bản và xóa tới giỏ trống.
- Rà sáu trang chính ở 1366, 768 và 390 px, tổng 18 trường hợp: không phát hiện tràn ngang trong trạng thái được thử. Bản chụp giao diện phục vụ rà nội bộ; kết quả này không xác nhận giao diện đã hoàn thiện hoặc thay kiểm tra trên thiết bị thật.
- Không có lỗi JavaScript không được xử lý hoặc tài nguyên HTTP lỗi trong lượt thử cuối.
- Đây là kết quả OpenAI Codex thực hiện theo yêu cầu Đức; không ghi thành thao tác các thành viên đã tự làm. Bản này chưa xác nhận đã nộp LMS.

## 3. Quyến cần làm tiếp

Quyến trực tiếp chỉnh giao diện trong `css/style.css`, kế thừa logo/màu/footer hiện có:

1. **Danh sách:** bố trí ô tìm kiếm, danh mục, sắp xếp, nút xóa lọc và thông báo thành một cụm rõ ràng; chỉnh kích thước trường nhập, khoảng cách, hover/focus và cách xuống dòng trên mobile. Có hai ô tìm: ô đầu trang dùng chung và ô trong bộ lọc; cần sắp xếp để người dùng hiểu, không xóa điểm nối chức năng khi chưa phối hợp.
2. **Chọn quà:** chia rõ ngân sách, các bộ gợi ý, thành phần đang chỉnh và tổng kết; bổ sung khoảng cách, bố cục thẻ, ảnh, nhãn/ô chọn sản phẩm/số lượng, cảnh báo vượt tiền và các nút thao tác. Đây là vùng còn đang dùng nhiều kiểu mặc định của trình duyệt.
3. **Giỏ hàng:** rà hình thức sản phẩm lẻ, từng nhóm bộ, số món/số bộ, tổng tiền, xóa, nhân bản và trạng thái giỏ trống; giữ nguyên quy tắc của Bảo.
4. **Thành phần chung/chi tiết:** rà menu đã có thêm link Chọn quà/Giỏ hàng, ô tìm đầu trang, ảnh, bảng thuộc tính, bộ chọn số lượng và footer; thống nhất chữ, nút, khoảng cách.
5. **Responsive:** kiểm tra tại 1366/768/390 px sau khi chỉnh; thử cả có/không có kết quả, bộ đã chọn, vượt ngân sách, giỏ có hàng và giỏ trống. Kiểm tra hover bằng chuột và focus bằng Tab.

Giữ `id`, `data-*`, `name`, các giá trị option và thẻ script đang được JavaScript dùng. Nếu cần đổi HTML cấu trúc, báo Đức và người phụ trách chức năng, rồi thử lại luồng liên quan. Lỗi nghiệp vụ báo đúng PIC; Đức xử lý lỗi ghép. Chưa ghi toàn bộ Bước 7 hoàn thành chỉ vì nhận được bản nền này.

## 4. Nhận bản mới và bàn giao lại

Nếu đang có thay đổi trong branch riêng, lưu/commit phần đã kiểm tra trước khi cập nhật. Sau khi PR tích hợp được merge:

```bash
git switch main
git pull --ff-only origin main
git switch <branch-Quyen-dang-lam>
git merge main
```

Không cần tạo lại branch nếu đã có. Nếu có xung đột, gửi Đức tên file; không lấy cả file CSS cũ để ghi đè. Người chưa clone có thể dùng Code → Download ZIP trên main sau khi đã ghép; ZIP cũ không tự cập nhật.

Chạy qua Live Server hoặc `python -m http.server 5500`, dùng cùng host/cổng. Bàn giao lại bằng PR kèm file đã sửa, ảnh 1366/768/390 px, kết quả tự thử, lỗi còn lại và nhật ký AI theo thực tế.

## 5. Các luồng cần thử lại sau khi sửa giao diện

1. Tìm `KC-001` → còn gấu; tìm mã không có → thông báo rỗng; xóa lọc → tám sản phẩm; Móc khóa + giá tăng → hoa cúc đứng trước gấu.
2. Mở đủ tám link chi tiết → đúng tên/giá/ảnh; thử `?id=BAD` và không có `id` → không hiện nhầm thỏ. Thêm hai gấu → 90.000 đồng và số giỏ tăng hai món.
3. Ngân sách 150.000 → ba bộ mẫu; chọn bộ 80.000 → xem chi tiết một món → quay lại chọn quà vẫn giữ bộ đang soạn.
4. Ngân sách 100.000, tăng gấu trong bộ 80.000 thành hai con → giá một bộ 125.000, cảnh báo vượt 25.000; mua hai bộ → 250.000 nếu đủ lượng demo.
5. Sang giỏ → tăng/giảm số bộ → tải lại vẫn giữ; nhân bản → bản soạn một bộ, nhóm gốc không đổi; thay món rồi thêm → nhóm khác; xóa hết → giỏ trống.

## 6. Giới hạn của bản bàn giao

Chỉ là website frontend học tập, dữ liệu/stock minh họa và localStorage theo trình duyệt. Chưa có backend, đơn máy chủ, tài khoản hoặc thanh toán thật. Báo cáo Word/Docs và ảnh nộp cuối cần cập nhật sau khi Quyến sửa giao diện và cả nhóm kiểm tra lại; tài liệu này không thay cho toàn bộ hồ sơ Buổi 3.
