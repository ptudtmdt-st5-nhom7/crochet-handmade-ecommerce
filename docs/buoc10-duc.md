# Bước 10 Câu hỏi kiến thức của Nguyễn Quang Đức

**Người thực hiện:** Nguyễn Quang Đức. **Phần việc:** kế hoạch Buổi 2, trang chủ và thành phần dùng chung, tổng hợp hồ sơ. Nội dung đối chiếu với `index.html` và `css/style.css` của bản mã `29c295c`. Phần soạn câu trả lời và đo kiểm được Codex hỗ trợ; các số đo dưới đây là kết quả công cụ, không phải xác nhận sinh viên đã tự thao tác.

## Câu 1 Giải thích mã nguồn

Một đoạn trong khu vực sản phẩm nổi bật của trang chủ:

```html
<article class="product-card">
  <div class="product-image">
    <img src="images/product-1.webp"
         alt="Móc khóa gấu len — ảnh minh họa"
         width="400" height="300" loading="lazy">
  </div>
  <div class="product-content">
    <p class="product-code">KC-001</p>
    <h3>Móc khóa gấu len</h3>
    <p class="product-price">45.000đ</p>
    <a class="product-link" href="products.html#chi-tiet-kc-001"
       aria-label="Xem thông tin Móc khóa gấu len">Xem thông tin
      <span aria-hidden="true">↗</span>
    </a>
  </div>
</article>
```

`article` biểu diễn một sản phẩm có thể đọc riêng. `div` nhóm vùng ảnh và vùng nội dung để định dạng. `img` hiển thị ảnh, `alt` mô tả ảnh cho công nghệ hỗ trợ và khi không tải được. `h3` là tên sản phẩm bên dưới tiêu đề `h2` của khu vực. `p` chứa mã và giá; `a` dẫn đến thông tin đúng mã sản phẩm. Mũi tên trong `span` chỉ trang trí nên được ẩn với trình đọc màn hình.

Phần tử cha chứa bốn thẻ dùng quy tắc CSS:

```css
.home-product-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}
```

`display: grid` tạo lưới; `grid-template-columns` tạo bốn cột chia đều không gian; `minmax(0, 1fr)` cho cột co lại thay vì bị nội dung kéo rộng; `gap` tạo khoảng cách 24 px giữa hàng và cột. Kết quả là bốn sản phẩm nổi bật nằm cùng một hàng ở màn hình lớn. Media query đổi thành hai cột ở tối đa 1099 px và một cột ở tối đa 699 px.

## Câu 2 Dự đoán kết quả khi thay đổi mã

Với đoạn `.product-list` trong đề, đổi `repeat(4, 1fr)` thành `repeat(2, 1fr)` làm mỗi hàng còn hai cột chia đều thay vì bốn. Nếu có tám sản phẩm, danh sách chuyển từ hai hàng thành bốn hàng; nếu có bốn sản phẩm như khu vực nổi bật của trang chủ thì chuyển từ một hàng thành hai hàng. Trong cùng chiều rộng vùng chứa, mỗi thẻ có nhiều chỗ hơn, tên và giá thường xuống dòng ít hơn.

`display: grid` vẫn giữ nguyên và `gap: 16px` của ví dụ không đổi. Thứ tự sản phẩm vẫn theo HTML. Trong bài thực tế, selector tương ứng là `.home-product-grid`, dùng `gap: 24px` và `minmax(0, 1fr)`. Khi thử sửa số cột phải kiểm tra cả media query, vì quy tắc áp dụng ở màn hình nhỏ có thể ghi đè giá trị vừa sửa.

## Câu 3 Phát hiện và sửa lỗi ảnh bị kéo giãn

Trong ví dụ của đề, `width: 100%` thay đổi theo khung trong khi `height: 250px` cố định. Nếu tỷ lệ khung khác tỷ lệ ảnh, ảnh có thể bị kéo giãn. Với sản phẩm handmade cần xem toàn bộ hình, có thể giữ khung và bổ sung:

```css
.product-image {
  width: 100%;
  height: 250px;
  object-fit: contain;
}
```

`object-fit: contain` thu ảnh vào khung và giữ tỷ lệ, không cắt mất sản phẩm; có thể còn khoảng trống ở hai bên hoặc trên dưới. Nếu không cần các ảnh cao bằng nhau, dùng `height: auto` thay cho chiều cao cố định. `object-fit: cover` cũng giữ tỷ lệ nhưng có thể cắt mép ảnh, nên chỉ chọn khi chấp nhận việc cắt và đã quan sát sản phẩm. Sau sửa cần xem nhiều ảnh có tỷ lệ khác nhau ở máy tính và điện thoại.

## Câu 4 Giải thích lựa chọn Grid và Flexbox

Trang chủ dùng Grid cho banner, danh mục và sản phẩm nổi bật. Danh sách sản phẩm cần quản lý hàng/cột, chia cột đều và chuyển 4/2/1 cột theo chiều rộng nên Grid phù hợp. Banner dùng hai cột cho chữ và ảnh, chuyển một cột ở điện thoại.

Flexbox phù hợp hơn cho các thành phần theo một hàng hoặc cột. Ví dụ `.hero-actions` chứa hai liên kết trong banner:

```css
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}
```

Các nút sắp theo hàng, cách nhau 12 px và được xuống dòng khi thiếu chỗ. Ở điện thoại, `flex-direction: column` xếp nút theo chiều dọc. Flexbox cũng được dùng trong header và menu. Hai công cụ được chọn theo cấu trúc nội dung, không cần dùng một công cụ cho toàn bộ trang.

## Câu 5 Kiểm tra tràn ngang ở 390 px

Trước hết cần đặt viewport 390 px trong Chrome DevTools và quan sát toàn bộ trang. Các vùng kiểm tra đầu tiên trên trang chủ là header/menu, ô tìm kiếm, banner, ảnh, lưới sản phẩm và footer; chú ý phần tử có chiều rộng cố định, chuỗi dài không xuống dòng, padding lớn hoặc cột có kích thước tối thiểu quá rộng.

Dùng Elements và Computed để xem chiều rộng, margin, padding, `min-width` và quy tắc media query thực sự được áp dụng. Trong Console có thể so sánh:

```js
({
  content: document.documentElement.scrollWidth,
  available: document.documentElement.clientWidth
})
```

Đây là lệnh kiểm thử trong DevTools, không phải JavaScript thêm vào website. Nếu `content` lớn hơn `available`, cần tìm phần tử vượt khung rồi sửa đúng nguyên nhân: cho ảnh co lại, dùng `min-width: 0`, `minmax(0, 1fr)`, đổi số cột hoặc cho nội dung dài xuống dòng khi phù hợp. Không dùng `overflow-x: hidden` chỉ để che lỗi.

Sau sửa kiểm tra lại 390, 768 và 1366 px. Trong lượt đo bằng công cụ ở bản `29c295c`, trang chủ có `scrollWidth = clientWidth = 375px` tại viewport 390 px; chênh lệch với 390 là phần dành cho thanh cuộn dọc của môi trường thử.

## Câu 6 Đánh giá một đề xuất của AI

Một đề xuất được xử lý là khôi phục khối hover/focus Bước 8 của Châu từ commit `fbd44d6` vào CSS chung. Đối chiếu lịch sử cho thấy khối này đã bị xóa ở `177ecae`. Phương án phù hợp là lấy lại riêng khối tương tác, không thay toàn bộ stylesheet bằng bản cũ vì sẽ làm mất các sửa responsive và footer mới.

Khối cũ có selector `.button:hover` và `.button:active`, có thể áp dụng cả cho nút mang class `button` dù nút đang `disabled`. Phương án được điều chỉnh thành `.button:not(:disabled):hover` và `.button:not(:disabled):active`; nhờ đó giữ hiệu ứng cho nút hoạt động mà không thêm chuyển động cho nút mua minh họa bị vô hiệu hóa.

Codex hỗ trợ đối chiếu Git, ghép mã và kiểm thử: dùng Tab để đo viền focus xanh `#2b5797`, rê chuột lên nút và thẻ, bật giả lập giảm chuyển động và kiểm tra bốn trang ở ba độ rộng. Kết quả ghi nhận: nút hoạt động nâng 2 px khi hover; nút tìm kiếm disabled không có transform; thẻ sản phẩm có `transform: none` và transition 0 giây khi bật giảm chuyển động; không phát hiện tràn ngang hoặc ảnh lỗi trong 12 tổ hợp trang/kích thước.

Qua ví dụ này, việc có sẵn mã AI hoặc mã của thành viên chưa đủ để chép nguyên khối. Cần đối chiếu lịch sử, giới hạn selector, giữ các thay đổi mới của nhóm và kiểm tra hành vi sau khi ghép. Kết quả ở đây phản ánh lượt kiểm thử có AI hỗ trợ, không ghi thay rằng sinh viên đã tự thao tác các phép đo.

## Mã nguồn và minh chứng

- [Bản mã được đối chiếu](https://github.com/ptudtmdt-st5-nhom7/crochet-handmade-ecommerce/tree/29c295c9586492eab34a1e20283d08cda1b4799c).
- [Commit khôi phục CSS](https://github.com/ptudtmdt-st5-nhom7/crochet-handmade-ecommerce/commit/29c295c9586492eab34a1e20283d08cda1b4799c).
- [Báo cáo kiểm thử](kiem-thu-tich-hop-buoi2.md).
- [Phần Đức trong Bài làm 10](https://docs.google.com/document/d/1uIoFsaHZOZoELrRm6Y9PIP3tNZ9jMsXwfM6cFZjABJ8/edit?tab=t.72ewz0g07cf3).
