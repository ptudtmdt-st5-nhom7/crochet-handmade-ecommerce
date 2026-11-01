# Rà soát tích hợp Buổi 2 — 01/11/2026

## Nguồn và phạm vi

Đầu vào: `crochet-handmade-ecommerce-integration-buoi2.zip` do nhóm cung cấp sau PR #15–#19; đối chiếu yêu cầu HTML/CSS trong `BaiTap_Nhom_Buoi2.pdf` do nhóm gửi. Không truy cập hoặc sửa GitHub trực tiếp trong lượt rà soát này. Giữ tài nguyên ảnh và nội dung nghiệp vụ. Không triển khai chức năng của các buổi sau.

## Lỗi xác định từ mã và cách xử lý

| Mã | Bằng chứng trước sửa | Xử lý | Xác minh sau sửa |
| --- | --- | --- | --- |
| L01 | Bốn liên kết danh mục trên index không có ID đích trên products | Đặt ID `moc-khoa`, `thu-len`, `hoa-len`, `phu-kien` tại sản phẩm đầu tiên của từng nhóm | Đủ bốn ID, không trùng; đường dẫn khớp |
| L02 | Ba liên kết `#thong-tin-...` trên index không trùng ID `chi-tiet-...` của Bảo | Dùng `#chi-tiet-kc-001`, `#chi-tiet-hl-002`, `#chi-tiet-pk-002` | Cả ba đích tồn tại |
| L03 | index trỏ `about.html#dat-lam` nhưng không có ID này | Nút “Liên hệ đặt làm” trỏ `#lien-he-chi-tiet` đã có trên about | ID đích tồn tại |
| L04 | 13 đoạn `[cite: ... CHƯƠNG 2.docx]` nằm trong nội dung hiển thị của about | Bỏ token trích dẫn, giữ nội dung cửa hàng | Không còn token trong bốn trang |
| L05 | about dùng `onmouseover`/`onmouseout` là JavaScript; CSS inline khó điều chỉnh ở mobile | Chuyển style sang class `.about-*` trong CSS chung; dùng `:hover` | Không còn script, event handler hoặc inline style trong bốn trang |
| L06 | CSS Bảo khai báo lại `.product-card`, `.product-price`, `.product-code` ở cuối stylesheet nên áp dụng cả trang chủ | Giới hạn cả khối danh sách trong `.products-page`, bỏ padding ngoài thẻ ở trang danh sách | Quy tắc mới chỉ chọn phần tử bên trong trang danh sách; thẻ trang chủ giữ quy tắc chung |
| L07 | about có cột tối thiểu 300 px bên trong panel padding 48 px; nguy cơ tràn khi không đủ chiều rộng | Cho lưới co theo vùng chứa, chuyển một cột dưới 700 px, giảm padding xuống 24 px, cho email xuống dòng | Đã kiểm tra quy tắc mã; cần đo và chụp lại trên trình duyệt để kết luận hiển thị |
| L08 | Link menu “Sản phẩm” ở trang chi tiết gắn `aria-current="page"` dù trang hiện tại là chi tiết | Bỏ thuộc tính ở link đó; giữ dấu trang hiện tại ở breadcrumb | Chỉ breadcrumb chỉ đúng trang Thú len thỏ |
| L09 | README còn mô tả ba trang là khung và chỉ có nhánh Đức | Cập nhật bốn trang đã ghép, cách chạy, cách kiểm tra và giới hạn | Nội dung tài liệu khớp tình trạng mã hiện tại |

## Kiểm tra mã nguồn đã thực hiện

Phân tích bốn trang bằng trình phân tích HTML; kiểm tra tất cả `href/src` cục bộ và ID fragment, cấu trúc trang, ID trùng, alt ảnh, dấu conflict và mã JavaScript. Không dùng việc đọc mã để khẳng định kết quả giao diện trên trình duyệt.

| Trang | Tham chiếu cục bộ đã đối chiếu | Thẻ ảnh | Header / main / footer / h1 | Kết quả |
| --- | --- | --- | --- | --- |
| products.html | 34 | 9 | 1 / 1 / 1 / 1 | Đạt kiểm tra mã |
| index.html | 34 | 11 | 1 / 1 / 1 / 1 | Đạt kiểm tra mã |
| about.html | 18 | 6 | 1 / 1 / 1 / 1 | Đạt kiểm tra mã |
| product-detail.html | 16 | 2 | 1 / 1 / 1 / 1 | Đạt kiểm tra mã |

- 102 tham chiếu cục bộ: không thiếu file và không thiếu ID đích.
- 28 thẻ ảnh đều có đường dẫn file tồn tại và thuộc tính alt (ảnh trang trí được phép alt rỗng). Chưa xác nhận tải/hiển thị thực tế bằng trình duyệt.
- Trang danh sách có đủ tám thẻ sản phẩm; chỉ TL-001 dẫn đến trang chi tiết mẫu.
- Không còn dấu conflict trong HTML/CSS/Markdown; không trùng ID trong từng trang.
- Mỗi trang có một header, một main, một footer và một h1.
- CSS có đủ cặp ngoặc; quy tắc responsive và hover/focus được giữ lại. Đây không phải kiểm định toàn bộ CSS bằng trình duyệt.

## Kiểm thử trình duyệt — CHƯA THỰC HIỆN SAU SỬA

Đã thử mở Chromium tự động nhưng môi trường thực thi chặn tạo socket; công cụ trình duyệt dự phòng cũng không khởi tạo được. Không tạo ảnh minh chứng hoặc số đo giả. Các ảnh cũ của Bước 4 không đại diện cho bản ghép đã sửa.

Nhóm mở bản mới, chạy các mục sau và bổ sung kết quả thực tế cùng người kiểm tra:

| Mục | Cách kiểm tra | Kết quả mong đợi | Trạng thái |
| --- | --- | --- | --- |
| 12 tổ hợp trang/kích thước | Mở 4 trang ở 1366×900, 768×900 và 390×900, cuộn hết nội dung | Không tràn ngang, không chồng chữ hoặc cắt nội dung; ảnh tải được | Chờ nhóm |
| Menu và skip link | Tab từ đầu trang, Enter vào skip link; bấm menu ở cả 4 trang | Focus nhìn thấy, đi đúng trang/nội dung | Chờ nhóm |
| Bốn danh mục | Bấm từng danh mục ở trang chủ | Đến sản phẩm đầu tiên đúng loại trên danh sách | Chờ nhóm |
| Sản phẩm nổi bật và thông tin nhanh | Bấm bốn sản phẩm nổi bật, bảy nút thông tin nhanh, nút quay lại | TL-001 đến chi tiết thỏ; sản phẩm khác đến thông tin đúng mã | Chờ nhóm |
| Liên hệ đặt làm | Bấm nút đặt làm trên index và liên hệ trên about | Cuộn đến phần liên hệ about | Chờ nhóm |
| CSS độc lập | So sánh thẻ sản phẩm trang chủ và danh sách | Quy tắc danh sách không đổi giá/khoảng cách thẻ trang chủ | Chờ nhóm |
| Hover / focus | Thử menu, nút, thẻ; bật giảm chuyển động trong DevTools | Hiệu ứng rõ, không che nội dung; giảm chuyển động được tôn trọng | Chờ nhóm |
| Nội dung và phạm vi | Đọc about, thử nút minh họa | Không hiện token cite; không có JavaScript; nút disabled có ghi chú | Chờ nhóm |

Có thể đo tràn ngang trong Console (đây chỉ là công cụ kiểm thử, không đưa JavaScript vào website):

```js
({ viewport: innerWidth, content: document.documentElement.scrollWidth })
```

Chụp minh chứng thực tế vào `docs/minh-chung-tich-hop/` khi nhóm hoàn thành kiểm thử; ghi rõ trang, kích thước, trình duyệt và ngày. Chưa tạo thư mục ảnh này khi chưa có ảnh thật.

## Hai ví dụ đánh giá AI để nhóm xác minh (Bước 9B)

1. **Liên kết sai đích:** AI đề xuất L01–L03; bằng chứng mã cho thấy href và ID không khớp. Bản sửa đã thống nhất tên. Nhóm bấm các link trên trình duyệt, chụp trước/sau nếu có, ghi quyết định giữ/sửa/bỏ và người kiểm tra. Kết quả trình duyệt: chờ nhóm.
2. **CSS ảnh hưởng trang khác và responsive:** AI đề xuất L06–L07; quy tắc class dùng chung và kích thước tối thiểu là căn cứ cần sửa/kiểm tra. Bản sửa đã giới hạn selector và thu nhỏ panel ở mobile. Nhóm so sánh hai trang sản phẩm, đo ở 390 px, ghi kết quả và đánh giá đề xuất. Kết quả trình duyệt: chờ nhóm.

Đây là ghi nhận công việc AI thực sự thực hiện và hướng kiểm chứng, chưa phải xác nhận nghiệm thu của sinh viên.

## Việc còn lại trước nộp

- Nhóm hoàn thành kiểm thử trình duyệt và ảnh ba kích thước; kiểm tra trên Chrome/Edge theo thiết bị có sẵn.
- Đối chiếu bảng phân công và hồ sơ Bước 1/3/7/8/9; không suy ra đã đủ vì merge thành công.
- Mỗi thành viên tự chuẩn bị sáu câu trả lời kiến thức theo phần việc mình, hiểu cả cách kết nối với trang chung; không dùng nhật ký AI thay câu trả lời cá nhân.
- Nếu main vừa có sửa nhật ký mới, so sánh với bản tích hợp và giữ đầy đủ nội dung trước PR cuối.
- Kiểm tra Settings → Pages để biết website đang phục vụ nhánh nào; không dùng website của nhánh cũ để nghiệm thu bản này.

## File thay đổi trong lượt rà soát

Bốn file HTML, `css/style.css`, `README.md`, `AI_USAGE_LOG.md`, `docs/quy-uoc.md`; thêm `docs/kiem-thu-tich-hop-buoi2.md`. Các ảnh, yêu cầu Chương 1, kế hoạch và báo cáo lịch sử Bước 4 không bị chỉnh sửa.
