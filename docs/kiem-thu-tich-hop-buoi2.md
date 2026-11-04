# Kiểm thử bản tích hợp Buổi 2

**Phiên bản giao diện:** [`29c295c`](https://github.com/ptudtmdt-st5-nhom7/crochet-handmade-ecommerce/tree/29c295c9586492eab34a1e20283d08cda1b4799c). **Ngày bổ sung:** 04/11/2026. Bản công khai được triển khai từ `main`. Báo cáo này cập nhật trạng thái từng ghi chờ kiểm thử ở lượt rà soát 01/11.

## Nguồn và cách kiểm tra

- Mã nguồn HTML/CSS hiện hành, dữ liệu và tài nguyên trong repository.
- [Báo cáo tích hợp 9A của Nam ngày 03/11](https://docs.google.com/document/d/1uIoFsaHZOZoELrRm6Y9PIP3tNZ9jMsXwfM6cFZjABJ8/edit?tab=t.n4ae0xgpikad): quá trình ghép nhánh, sửa logo/footer/icon và ảnh thao tác.
- Lượt kiểm tra bổ sung của Codex: phân tích mã 11 trang, mở website công khai, cuộn tải ảnh và đo bốn trang chính ở ba độ rộng. Không gán các thao tác của công cụ thành thao tác trực tiếp của sinh viên.

## Bảng kiểm thử bốn trang chính

| Trang | 1366 px | 768 px | 390 px | Ảnh |
|---|---|---|---|---|
| Trang chủ | Không tràn | Không tràn | Không tràn | Đều tải được |
| Sản phẩm | Không tràn | Không tràn | Không tràn | Đều tải được |
| Chi tiết TL-001 | Không tràn | Không tràn | Không tràn | Đều tải được |
| Giới thiệu | Không tràn | Không tràn | Không tràn | Đều tải được |

Ở cả bốn trang, `scrollWidth = clientWidth`: 1351 px tại viewport 1366 px; 753 px tại 768 px; 375 px tại 390 px. Chênh lệch với viewport là phần thanh cuộn dọc của môi trường kiểm thử. Footer giữ 4/2/1 cột. Các số đo chỉ phản ánh những lượt kiểm tra được ghi nhận, không thay cho kiểm thử mọi thiết bị hoặc mọi trình duyệt.

## Lỗi đã xử lý trong quá trình tích hợp

| Nội dung | Cách xử lý | Căn cứ xác minh |
|---|---|---|
| Danh mục và liên kết nổi bật thiếu ID đích | Đồng bộ href với ID trên products.html | Kiểm tra file và ID; đích hiện có |
| Liên kết đặt làm sai đích | Dùng about.html#lien-he-chi-tiet | ID đích tồn tại |
| Token trích dẫn và event handler trên about | Bỏ token, đưa hover sang CSS và giới hạn class theo trang | Phân tích HTML hiện hành |
| CSS danh sách ảnh hưởng thẻ trang chủ | Giới hạn trong .products-page | Đối chiếu selector và kiểm tra hai trang |
| Responsive panel giới thiệu | Điều chỉnh padding, số cột và nội dung dài | Ảnh và số đo ở ba kích thước |
| Logo footer, Instagram và footer Kẹp tóc | Giới hạn logo 108 px, sửa fill/stroke, dùng cấu trúc footer chung | Báo cáo Nam và mã 6bd4de1; ảnh bản tích hợp |
| Mô tả danh sách chỉ có một trang chi tiết | Cập nhật theo tám trang chi tiết hiện có | Tám nút dẫn đến tám file |
| Khối tương tác Bước 8 bị mất sau cập nhật CSS | Khôi phục riêng khối từ fbd44d6, giữ CSS responsive/footer mới | Diff 29c295c và kiểm thử dưới đây |
| Selector hover/active của khối khôi phục áp dụng cả nút disabled | Giới hạn .button bằng :not(:disabled) | Nút disabled không có transform trong phép thử |

## Kiểm tra khối tương tác khôi phục

| Phép thử | Kết quả |
|---|---|
| Tab tới menu Trang chủ | Nhận focus-visible, viền xanh rgb(43, 87, 151) |
| Hover nút hoạt động ở banner | Có chuyển động nâng lên theo CSS 2 px |
| Hover thẻ sản phẩm | Có chuyển động nâng thẻ theo CSS |
| Bật prefers-reduced-motion: reduce | Thẻ sản phẩm có transform none, transition 0 giây |
| Hover nút tìm kiếm disabled | Transform none |
| Responsive sau khôi phục | 12 tổ hợp vẫn không tràn ngang, không ảnh lỗi |

Viewport và giả lập giảm chuyển động được trả về mặc định sau kiểm tra. Không thêm JavaScript vào website; các phép đo DOM và giả lập chỉ dùng trong môi trường kiểm thử.

## Bộ ảnh minh chứng

| Trang | 1366 px | 768 px | 390 px |
|---|---|---|---|
| Trang chủ | [Ảnh](minh-chung-buoi2/home-1366.png) | [Ảnh](minh-chung-buoi2/home-768.png) | [Ảnh](minh-chung-buoi2/home-390.png) |
| Danh sách | [Ảnh](minh-chung-buoi2/products-1366.png) | [Ảnh](minh-chung-buoi2/products-768.png) | [Ảnh](minh-chung-buoi2/products-390.png) |
| Chi tiết thỏ | [Ảnh](minh-chung-buoi2/detail-1366.png) | [Ảnh](minh-chung-buoi2/detail-768.png) | [Ảnh](minh-chung-buoi2/detail-390.png) |
| Giới thiệu | [Ảnh](minh-chung-buoi2/about-1366.png) | [Ảnh](minh-chung-buoi2/about-768.png) | [Ảnh](minh-chung-buoi2/about-390.png) |

[Focus bàn phím](minh-chung-buoi2/focus-header.png) và [hover nút](minh-chung-buoi2/hover-button.png). Ảnh được chụp từ website thật, không phải wireframe. Ảnh cũ của Bước 4 giữ riêng trong thư mục lịch sử.

## Giới hạn và hồ sơ liên quan

Trang tìm kiếm, mua hàng, bộ quà và đặt làm chưa có xử lý nghiệp vụ trong Buổi 2. Kiểm thử bố cục ở ba độ rộng không đồng nghĩa các chức năng này đã hoạt động. Sáu câu của từng thành viên và hai ví dụ đánh giá AI được theo dõi trong [hồ sơ 9C](buoc9c-ban-giao.md); việc có đủ mã và ảnh không thay thế các nội dung cá nhân đó.
