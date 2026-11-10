# Bài làm Bước 7 của Quyến trên bản tích hợp 5

Ngày thực hiện: 10/11/2026. PIC theo phân công: Đặng Đình Quyến. Đầu vào: crochet-handmade-ecommerce-main (5).zip. Công việc triển khai và kiểm tra dưới đây do Codex hỗ trợ theo yêu cầu Quyến; chưa ghi nhận Quyến tự kiểm tra hoặc Đức nhận/merge.

## Kết quả triển khai

Giữ nhận diện Lenly: logo, màu kem/hồng đất, font Arial và dữ liệu. Chỉ thay đổi css/style.css và products.html; toàn bộ file JavaScript giống hệt bản ZIP (5).

- Trang sản phẩm: gom bộ tìm/lọc/sắp và nút xóa bộ lọc thành vùng thống nhất; desktop bốn cột, tablet hai cột, mobile một cột. Ô nhập cao tối thiểu 48 px. Thêm div/class để bố trí nhưng giữ id, name, data-*, giá trị option và script.
- Ẩn thanh tìm kiếm thứ hai ở header của products.html bằng hidden; giữ phần tử để tương thích module đang đọc nó. Các trang khác tiếp tục dùng ô tìm chung chuyển từ khóa sang products.html?q=...; đã thử chuyển từ trang chủ.
- Danh sách: tăng khoảng cách hai nút, định dạng số kết quả, thông báo không tìm thấy và phản hồi thêm giỏ. Giữ trạng thái disabled theo JavaScript.
- Chọn quà: chia khu vực ngân sách, gợi ý, chỉnh món và tổng kết; bộ gợi ý 3/2/1 cột; ảnh dùng contain; điều khiển có nhãn, kích thước và khoảng cách thống nhất. Mobile chuyển vùng chỉnh món và nhóm nút thành một cột. Cảnh báo vượt ngân sách không chặn nút thêm bộ hợp lệ.
- Giỏ: giữ CSS Bảo; bổ sung ảnh contain, danh sách món trong bộ hai cột trên màn hình rộng/một cột trên mobile; nút số lượng tối thiểu 44 px; nút nhân bản/xóa giãn cách và toàn chiều rộng trên mobile. Rà giỏ hàng lẻ, bộ quà và trạng thái rỗng.
- Chung và chi tiết: menu cho năm liên kết, tìm kiếm chung xuống dòng hợp lý; focus-visible rõ cho liên kết/nút/ô nhập/select; điều chỉnh vùng lỗi sản phẩm, khoảng cách bộ số lượng. Giữ [hidden] để JS ẩn nội dung đúng.

## Kiểm tra đã thực hiện

Công cụ: Playwright và Microsoft Edge headless, HTTP cục bộ, chiều cao cửa sổ 900 px. Kết quả công cụ không thay thế xác nhận tự thử của thành viên.

| Mã | Ca kiểm tra | Kết quả thực tế |
| --- | --- | --- |
| AUTO | node --test tests/*.test.mjs | 36/36 đạt, 0 thất bại. |
| UI01 | Sáu trang index/products/product-detail/gift-builder/cart/about × 1366/768/390 | 18/18 lượt sau sửa không tràn ngang, không ảnh lỗi trong trạng thái đã thử. |
| FN01 | Tìm zzzz; xóa lọc; Hoa len + giá giảm | Có thông báo rỗng; trả tám món; Bó hoa len nhỏ đứng trước Hoa tulip len. |
| FN02 | Thêm KC-001 hai lần từ danh sách | Một dòng hàng lẻ, quantity = 2. |
| FN03 | Mở đủ tám mã chi tiết | Đúng tên từng mã; mã sai hiện lỗi và ẩn vùng sản phẩm. |
| FN04 | Thêm KC-001 số lượng 2 tại chi tiết | Giỏ có KC-001 × 2. |
| FN05 | Tìm KC-001 từ trang chủ bằng Enter | Sang products.html?q=KC-001 và hiện một sản phẩm. |
| FN06 | Thêm bộ 80.000; tăng số bộ lên 2; tải lại | Tổng 160.000 và dữ liệu giữ sau tải lại. |
| FN07 | Nhân bản → chi tiết món → quay lại | Bản soạn một bộ; quay lại giữ hai món và ngân sách 80.000. |
| FN08 | Ngân sách 80.000, tăng gấu lên 2 trong bộ | Hiện vượt 45.000, nút thêm giỏ vẫn bật; đã thêm bộ và mở giỏ. |
| FN09 | Xóa dòng cuối | Không còn dòng hàng, hiện giỏ trống. |
| UI02 | Focus tìm kiếm rồi Tab | Danh mục nhận focus, viền outline solid. |

Các luồng chính FN01/FN02/FN06/FN07/FN09 được chạy tại ba chiều rộng. Tám mã chi tiết, thêm giỏ từ chi tiết, tìm từ trang chủ và cảnh báo vượt được chạy bổ sung ở 390 px. Không ghi nhận pageerror trong lượt luồng chính. Không tuyên bố đã thử mọi dữ liệu, mọi trình duyệt hoặc thiết bị thật.

## Minh chứng và cách tái hiện

- docs/minh-chung-buoi3/before-*.png và after-*.png: 36 ảnh, sáu trang × ba kích thước × trước/sau.
- Ảnh trạng thái riêng: empty-products-390.png, over-budget-390.png, gift-cart-390.png, empty-cart-390.png, invalid-detail-390.png.
- results.json và extra-results.json: dữ kiện từng lượt thử. Các ảnh products-*, cart-*, gift-* bổ sung từ lượt kiểm thử luồng.
- Chạy bằng Live Server hoặc python -m http.server 5500 tại gốc dự án; dùng cùng host/cổng. Mở products.html, gift-builder.html và cart.html.
- Bộ quà kiểm tra: Món quà nhỏ = gấu 45.000 + tulip 35.000. Tăng gấu thành 2 → giá một bộ 125.000. Với ngân sách 80.000 → vượt 45.000.

## Bàn giao và giới hạn

Mã sẵn sàng để Quyến/Đức rà và ghép; chưa push GitHub, chưa tạo commit/PR và chưa nộp LMS. Chỉ cần ghép css/style.css và products.html theo patch buoc7-quyen.patch; không lấy JS/HTML từ bản ZIP cũ. Nếu main đã đổi, đối chiếu diff trước khi ghép.

Sau ghép, Quyến tự thử giao diện; Nam/Tuấn rà vùng điều khiển đã thêm wrapper và ẩn thanh tìm trùng; các PIC thử lại phần mình. Không ghi kết quả công cụ thành việc Quyến đã trực tiếp làm. Chỉ đánh Done theo quy trình nhóm sau khi Đức nhận, thử bản chung và xác nhận.

Báo cáo này thay các ghi chú cũ rằng chưa có giỏ hoặc chi tiết động. Bản ZIP (5) đã có các chức năng đó; lượt này hoàn thiện giao diện trên nền mới. Không xác nhận backend, tài khoản, thanh toán hoặc đơn máy chủ; đó không phải phạm vi Bước 7.


## Bổ sung sau đối chiếu PDF Bước 7

Đã chuyển ảnh về docs/minh-chung-buoi3 theo yêu cầu. Đã chạy thêm 12 ca (BS01–BS12), đều đạt trong phạm vi mô tả, gồm ngân sách sai/không có bộ, thay/thêm/bỏ món, số lượng sai/bộ rỗng, gộp bộ, nhân bản không đổi gốc, tồn kho gộp, mã sai, tìm/lọc/sắp kết hợp và hover/focus. BS10 gọi module trong trình duyệt, không phải nhập mã sai qua giao diện.

Bảng kiểm thử đủ sáu cột ở KIEM_THU_BUOC7_QUYEN.md; bản CSV có thêm trạng thái/nguồn thực hiện. Hướng dẫn DevTools, ưu tiên sửa lỗi và xác nhận còn chờ ở HUONG_DAN_DEVTOOLS_VA_NGHIEM_THU_BUOC7.md. Đây là dữ kiện để Đức tổng hợp, không tạo xác nhận TEST_REPORT_BUOI3.md thay Đức.
