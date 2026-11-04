# Bước 9B — Đánh giá mã nguồn bằng AI

**Dự án:** Lenly Crochet — Nhóm 7, ST5.  
**Phần được phân công:** Nguyễn Đình Châu.  
**Ngày đối chiếu bổ sung:** 04/11/2026.

## 1. Công cụ, đầu vào và prompt

Nhóm sử dụng ChatGPT để rà soát HTML/CSS. Đầu vào gồm liên kết `css/style.css` và `index.html` của repository. Phản hồi ban đầu và prompt được lưu trong [thẻ 9B trên Google Docs](https://docs.google.com/document/d/1uIoFsaHZOZoELrRm6Y9PIP3tNZ9jMsXwfM6cFZjABJ8/edit?tab=t.66ufqhbqnhhr).

Prompt đã dùng yêu cầu đánh giá semantic, tổ chức CSS, Grid/Flexbox, responsive, hover/focus và đoạn mã có thể đơn giản hóa; với mỗi vấn đề, nêu mã liên quan, lý do, mức ưu tiên, hướng khắc phục và cách kiểm tra; phân biệt lỗi có bằng chứng với nội dung cần kiểm tra thêm, không tự động viết lại toàn bộ dự án.

Ở lượt đối chiếu bổ sung, Codex hỗ trợ kiểm tra tên lớp với HTML thực tế, sửa một bộ chọn CSS, kiểm tra bằng trình duyệt và tổng hợp minh chứng. Các số đo bổ sung dưới đây là kết quả công cụ, không phải xác nhận từng thành viên đã tự thực hiện các phép đo.

## 2. Ví dụ 1 — Bộ chọn nội dung thẻ không khớp HTML

### Vấn đề và bằng chứng

`products.html` sử dụng `class="product-card-content"` cho cả tám vùng nội dung sản phẩm. Ở bản `534110d`, CSS lại khai báo `.products-page .product-content`; trước đó có một lần sửa thành `.-content`. Hai cách viết này đều không khớp phần tử thật trên trang danh sách. Quy tắc `.product-content` dùng ở trang chủ là thành phần khác, được giữ nguyên.

Trước khi sửa, trình duyệt ghi nhận tám vùng nội dung có `display: block`, `padding: 0px`; bộ chọn sai không khớp phần tử nào. Đây là lỗi đã xác định, không chỉ là đề xuất rút gọn CSS.

### Quyết định và thay đổi

Áp dụng việc sửa tên bộ chọn theo HTML, giữ nguyên các thuộc tính:

```css
.products-page .product-card-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
}
```

Không đổi class trong HTML và không sửa quy tắc `.product-content` của trang chủ để tránh tác động sang phần khác.

### Kiểm tra và kết quả

Codex mở mã qua HTTP cục bộ và kiểm tra bốn trang chính ở 1366, 768, 390 px. Tại ba độ rộng, cả tám vùng nội dung đều nhận `display: flex`, `flex: 1 1 0%` và `padding: 16px`. Lưới sản phẩm lần lượt có 4/2/1 cột; không phát hiện tràn ngang trong 12 tổ hợp trang/kích thước. Phép kiểm tra này xác nhận bộ chọn mới được áp dụng và không làm hỏng bố cục đã kiểm tra.

- [Ảnh trước sửa tên lớp](minh-chung-9b/products-before-selector.jpg).
- [Ảnh sau sửa ở 1366 px](minh-chung-9b/products-after-selector-1366.jpg).
- [Ảnh sau sửa ở 390 px](minh-chung-9b/products-after-selector-390.jpg).

## 3. Ví dụ 2 — Gộp hai quy tắc cùng bộ chọn thẻ sản phẩm

### Vấn đề và quyết định

Trong phiên bản trước, `.products-page .product-card` có hai khối: khối đầu định dạng thẻ; khối sau bổ sung `padding: 0` và `scroll-margin-top: 24px`. Đây là sự phân tán khai báo, không phải lỗi giao diện tự thân. Nhóm chọn gộp hai thuộc tính vào khối đầu để dễ theo dõi. Thay đổi này đã có trong `main` trước lượt sửa tên lớp; lượt bổ sung chỉ đối chiếu và kiểm tra lại, không nhận là một thay đổi mới do Codex thực hiện.

Trước gộp:

```css
.products-page .product-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
/* Các quy tắc khác */
.products-page .product-card {
  padding: 0;
  scroll-margin-top: 24px;
}
```

Sau gộp:

```css
.products-page .product-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  padding: 0;
  scroll-margin-top: 24px;
}
```

### Kiểm tra và kết quả

Codex đối chiếu CSS trên bản công khai trước cập nhật với mã đã gộp chạy cục bộ. CSSOM của bản trước có hai khối đúng bộ chọn này; bản sau còn một khối. Các giá trị tính toán được đối chiếu vẫn giữ `display: flex`, `flex-direction: column`, `padding: 0px`, `border-radius: 16px`, `scroll-margin-top: 24px` và màu viền RGB(216, 199, 191). Bố cục lưới tiếp tục 4/2/1 cột ở ba độ rộng. Kết quả phù hợp với mục tiêu làm mã tập trung mà không thay đổi các định dạng đã kiểm tra.

Không gộp tùy ý mọi quy tắc cùng tên ở các media query hoặc trạng thái hover/focus, vì chúng có điều kiện áp dụng và thứ tự ưu tiên riêng.

## 4. Kết luận

Hai ví dụ thể hiện hai quyết định khác nhau: sửa lỗi bộ chọn đã có bằng chứng và chấp nhận một đề xuất tổ chức CSS sau khi kiểm tra định dạng. Việc bỏ các khai báo `box-sizing` ở footer không được tính là thay đổi đã thực hiện trong bản này. Báo cáo chỉ ghi các sửa đổi và kết quả có thể đối chiếu; không suy diễn mọi gợi ý trong phản hồi AI thành lỗi thật hoặc thành công việc đã hoàn thành.
