# Quy ước chung

- File và ảnh: chữ thường, không dấu, không khoảng trắng. Ví dụ: product-1.jpg, product-detail.html
- Class CSS đặt theo thành phần: site-header, product-card, about-section
- Chỉ dùng đường dẫn tương đối: css/style.css, images/product-1.jpg. Không dùng đường dẫn ổ đĩa như C:\...
- Mỗi người chỉ viết CSS trong ngăn của mình trong css/style.css

## Thành phần giao diện dùng chung Buổi 2

- Các trang đặt ở thư mục gốc và cùng liên kết `css/style.css`, `images/` bằng đường dẫn tương đối.
- Đặt đoạn HTML trong `docs/header-mau.html` sau thẻ mở `body`; đặt `id="noi-dung"` trên `main` để skip link hoạt động.
- Chỉ gắn `aria-current="page"` vào liên kết đúng trang đang xem. Trang chi tiết không đánh dấu Trang chủ là trang hiện tại.
- Dùng logo `images/logo.png`, giữ nguyên tỷ lệ. Tìm kiếm là giao diện minh họa, không thêm xử lý JavaScript trong Buổi 2.
- Footer dùng mẫu `docs/footer-mau.html`; mỗi trang có một footer. CSS bổ sung theo ngăn của từng trang, không ghi đè toàn bộ CSS chung.
- Danh mục trên `products.html` dùng các id `moc-khoa`, `thu-len`, `hoa-len`, `phu-kien`; thông tin nhanh dùng `chi-tiet-[ma-san-pham-viet-thuong]`.
- Trang chi tiết mẫu là TL-001 — Thú len thỏ, ảnh `product-3.webp`; liên hệ đặt làm trên `about.html` dùng id `lien-he-chi-tiet`.

- ID danh mục đặt ở thẻ sản phẩm đầu tiên của từng nhóm: KC-001, TL-001, HL-001, PK-001.
- CSS danh sách được giới hạn trong `.products-page`; CSS giới thiệu nằm trong `.about-page`. Dùng CSS `:hover`, không dùng thuộc tính sự kiện JavaScript trong Buổi 2.


## Chuẩn bị Buổi 3 — favicon và phạm vi tích hợp

- Giữ logo `images/logo.png` của nhóm; favicon `images/favicon.svg` dùng lại phần biểu tượng LC qua khung SVG, không thay ảnh gốc hoặc logo header/footer.
- Trong `<head>` của mỗi trang ở thư mục gốc, giữ liên kết PNG dự phòng và SVG ưu tiên:

  ```html
  <link rel="icon" type="image/png" href="images/logo.png">
  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
  ```

- Trang mới như `cart.html` hoặc `gift-builder.html` khi được tạo cũng dùng hai liên kết này. Đây là thay đổi phần đầu trang, không thay thế logo hiển thị trong nội dung.
- Buổi 3 tiếp tục HTML/CSS và bổ sung JavaScript thuần, localStorage; giữ nhận diện Buổi 2. Không coi favicon là bằng chứng đã hoàn thành chức năng JavaScript.
- Ngân sách tính tiền sản phẩm cho một bộ quà. Sau khi khách thay sản phẩm khác, thêm/bỏ sản phẩm hoặc tăng/giảm số lượng trong bộ, hệ thống tính lại giá; nếu vượt ngân sách thì thông báo số tiền vượt nhưng vẫn cho thêm bộ hợp lệ vào giỏ. Hai bộ có cùng sản phẩm và cùng số lượng từng sản phẩm sẽ được gộp tăng số bộ. Nhân bản để chỉnh riêng tạo lựa chọn mới, không sửa hoặc giảm số bộ gốc. Thành tiền và lượng sản phẩm cần dùng đều nhân với số bộ mua.
- Bước 1 đã xác lập cấu trúc/file/hàm/khóa và cách nạp JavaScript trong phần Quy ước kỹ thuật bên dưới. Các file JS là đầu ra phải lập trình, chưa phải mã đã hoàn thành. PIC dùng đúng quy ước; thay đổi phải báo Đức và người nhận trước khi ghép. Hướng dẫn chi tiết đặt ở mục 7 tab Bước 1 trong báo cáo; tab Bài làm 1 trình bày kế hoạch bằng văn phong báo cáo, không ghi lịch bàn giao chi tiết.
- Báo cáo Buổi 3: https://docs.google.com/document/d/1YUwTQOg8hfinPHeAhp2SUlCrO9pTVmh5yIjOR3n2A4E/edit
- Bảng công việc và lịch nội bộ được cập nhật trong tab TO DO LIST của workspace: https://docs.google.com/spreadsheets/d/1UIP27nPdW2n_PZR36gXBxR1aO9nti8mK8NYxyOvS_0s/edit?gid=0

## Quy ước kỹ thuật Buổi 3 — bản hiện hành 08/11/2026

Đây là đầu vào triển khai do trưởng nhóm ban hành, bổ sung cho phân công và quy tắc nghiệp vụ đã chốt. Các tên dưới đây dùng chung khi viết mã. Đã có năm hàm lưu trữ trong `js/storage.js` và trang thử kỹ thuật; các module khác vẫn do PIC triển khai, không được coi là đã chạy chỉ vì có tên trong quy ước. PIC có trở ngại phải báo Đức và người nhận trước khi đổi tên/cấu trúc.

### 1. Cách nạp JavaScript và chạy website

- Dùng JavaScript thuần với ES modules (`export`/`import`). Các trang HTML ở gốc; file JavaScript ở `js/`, dữ liệu ảnh ở `images/`. Không dùng biến toàn cục hoặc thuộc tính `onclick` trong HTML.
- Mỗi trang nạp `js/site.js` để cập nhật số đếm giỏ chung, và tối đa một file khởi tạo riêng: `products.html` → `js/products-page.js`; `product-detail.html` → `js/product-detail.js`; `cart.html` → `js/cart-page.js`; `gift-builder.html` → `js/gift-builder.js`.
- Dùng thẻ `<script type="module" src="js/ten-file.js"></script>` trong HTML. Không nạp lại các file dữ liệu/thư viện bằng thẻ script riêng; chúng được import từ file khởi tạo.
- File thư viện chỉ xuất dữ liệu/hàm; không tự gắn sự kiện, render hoặc chạy khởi tạo khi được import. File khởi tạo gắn sự kiện một lần. Không import ngược từ thư viện vào file khởi tạo trang.
- Chạy qua HTTP, dùng VS Code Live Server, hoặc mở terminal tại gốc repository rồi chạy `python -m http.server 5500`; mở `http://localhost:5500/`. Không chạy bằng cách nhấp đúp HTML (`file://`). Dùng cùng host/cổng khi thử chuyển trang vì localStorage tách theo origin.

### 2. Chủ sở hữu file và đầu ra bắt đầu

- Nam: `js/products.js`, `js/gift-sets.js`, `js/product-utils.js`, `js/product-list.js`, `js/products-page.js`; vùng danh sách sản phẩm trong `products.html`.
- Tuấn: `js/product-filters.js`, `js/gift-recommendations.js`; vùng điều khiển tìm/lọc/sắp trong `products.html`, phối hợp Nam trước khi ghép.
- Khanh: `product-detail.html`, `js/product-detail.js`; sửa các link chi tiết cùng chủ trang. Giữ trang chi tiết cũ tới khi rà hết liên kết.
- Bảo: `cart.html`, `js/cart.js`, `js/cart-page.js`. `cart.js` là nghiệp vụ dùng chung, `cart-page.js` là giao diện trang giỏ.
- Đức: `js/storage.js`, `js/site.js`; lưu/đọc dùng chung, bản nền, tích hợp và hồ sơ cuối. Module lưu không tự gắn sự kiện UI hoặc viết lại nghiệp vụ giỏ.
- Châu: `gift-builder.html`, `js/gift-builder.js`; trang chọn quà, điều chỉnh sản phẩm/số lượng, bản đang soạn và thêm bộ, dùng các hàm Tuấn/Bảo/Đức.
- Quyến: CSS chung và responsive, kế thừa thiết kế Buổi 2, bổ sung phần mới và kiểm tra giao diện. Chủ trang hoàn thiện HTML/chức năng. Đức tổng hợp kiểm thử và hồ sơ từ kết quả thực tế của các PIC.
- `css/style.css`: Quyến giữ nhận diện Buổi 2, bổ sung CSS phần mới và responsive; chủ trang sửa HTML và vùng trang mình theo quy ước. Giữ `id`/`data-*`; báo nhau khi đổi phần chung. Đức kiểm tra `git diff`, ghép và xử lý lỗi ghép.
- Nam bàn giao 2A và Đức bàn giao hàm lưu trữ trước 11:00 ngày 09/11; Tuấn giao 3A, Bảo giao 5A trước 15:00 cùng ngày. Các PIC giao trang/module tự thử trước 21:00. Sau đó các PIC bắt đầu phần độc lập. Các file khởi tạo chỉ import module đã tồn tại; không đưa bản trang bị lỗi import lên `main` để chờ người khác sửa.

### 3. Cấu trúc sản phẩm và bộ mẫu

`id` là chuỗi, giữ tám mã KC-001, KC-002, TL-001, TL-002, HL-001, HL-002, PK-001, PK-002. Giá là số nguyên VND; số lượng là số nguyên dương. Danh mục dùng mã `moc-khoa`, `thu-len`, `hoa-len`, `phu-kien`; nhãn hiển thị do Nam ánh xạ. Mô tả/ảnh/giá kế thừa dữ liệu Buổi 2, không tự đổi theo ví dụ.

```json
{
  "id": "KC-001", "name": "Móc khóa gấu len", "price": 45000,
  "category": "moc-khoa", "image": "images/product-1.webp",
  "description": "Kế thừa mô tả Buổi 2", "stockDemo": 20
}
```

`stockDemo: 20` là lượng minh họa ban đầu cho mỗi mã, không phải tồn thực tế. Mỗi mã đại diện một cấu hình bán trong Buổi 3; màu/kích thước hiện có là thông tin mô tả, chưa thêm bộ chọn biến thể. Nam giữ thuộc tính cần hiển thị; mở rộng biến thể sau phải cập nhật quy ước.

Bộ quà chỉ tham chiếu mã/số lượng món và danh sách thay thế; không lưu bảng giá riêng. Ví dụ đầu vào để Nam xây dựng ít nhất ba bộ: GIFT-01 gồm KC-001 × 1 + HL-001 × 1; GIFT-02 gồm TL-001 × 1 + PK-002 × 1; GIFT-03 gồm HL-002 × 1 + PK-001 × 1. Tổng từ giá Buổi 2 tương ứng 80.000, 150.000 và 129.000 đồng. Đây là bộ demo phục vụ bài tập.

```json
{
  "id": "GIFT-01", "name": "Món quà nhỏ",
  "items": [{"productId":"KC-001","quantity":1},
            {"productId":"HL-001","quantity":1}],
  "allowedProductIds": ["KC-001","KC-002","HL-001","HL-002","PK-001","PK-002"]
}
```

Nam công bố `allowedProductIds` cho từng bộ; tám mã hiện có đều có thể dùng nếu phù hợp cách giới thiệu bộ. Châu chỉ cho đổi/thêm món trong danh sách đã bàn giao. Bỏ món được phép nhưng bộ cuối không được rỗng.

### 4. Cấu trúc giỏ và bản soạn quà

Giỏ có một đối tượng gốc `{version: 1, lines: [...]}`. `quantity` là số món của hàng lẻ hoặc trong một bộ; `setQuantity` là số bộ mua, không dùng lẫn hai trường. Giá/tổng luôn tính từ `products` hiện hành, không coi tổng đã lưu là nguồn giá.

```json
{
  "version": 1,
  "lines": [
    {"lineId":"single:KC-001","type":"single",
     "productId":"KC-001","quantity":2},
    {"lineId":"gift:HL-001=1|KC-001=1","type":"gift",
     "giftSetId":"GIFT-01","name":"Món quà nhỏ","budget":100000,
     "items":[{"productId":"KC-001","quantity":1},
              {"productId":"HL-001","quantity":1}],"setQuantity":2}
  ]
}
```

Trong Buổi 3, “cấu hình của một bộ quà” là danh sách mã sản phẩm và số lượng của từng sản phẩm trong một bộ. Hai bộ có cùng danh sách sản phẩm và cùng số lượng từng sản phẩm được xem là giống nhau, dù khách chọn từ bộ mẫu khác hoặc thêm theo thứ tự khác.

Nhận diện trong mã: gộp mã lặp trong `items`, cộng số lượng từng mã, sắp mã tăng dần rồi ghép `productId=quantity` bằng dấu `|`. Không tính tên, thứ tự món, mã bộ mẫu, ngân sách hoặc số bộ vào cấu hình. Khi khách thêm lại một bộ giống hệt bộ đã có, tăng `setQuantity` trên dòng cũ thay vì tạo dòng trùng; giữ thông tin tham chiếu của dòng cũ. Ngân sách trên dòng chỉ là thông tin tham chiếu của lần tạo dòng, không phải giới hạn chặn mua.

```json
{
  "version":1, "budget":100000, "sourceGiftSetId":"GIFT-01",
  "name":"Món quà nhỏ",
  "items":[{"productId":"KC-001","quantity":1},
           {"productId":"HL-001","quantity":1}],
  "setQuantity":1, "copiedFromLineId":null
}
```

Bản soạn quà là ngân sách, danh sách sản phẩm và số lượng khách đang lựa chọn nhưng chưa xác nhận thêm vào giỏ. Bản soạn được lưu riêng với các sản phẩm/bộ quà đã có trong giỏ. Khi khách nhấn “Nhân bản để chỉnh riêng”, tạo bản sao sâu của danh sách sản phẩm, đặt `setQuantity` mặc định 1 và ghi mã dòng gốc vào `copiedFromLineId`. Thao tác này không tự thêm bản sao vào giỏ, không sửa danh sách sản phẩm và không giảm số bộ của dòng gốc. Sau khi khách thay sản phẩm khác, thêm/bỏ sản phẩm hoặc thay đổi số lượng trong bản sao rồi xác nhận thêm, bộ mới được lưu thành nhóm riêng nếu thành phần khác dòng gốc. Nếu khách giữ nguyên mọi sản phẩm và số lượng thì tăng số bộ trên dòng đã có.

### 5. Tên hàm dùng chung và trách nhiệm

- Nam xuất `products`, `giftSets`; `getProductById(id)` trả sản phẩm hoặc `null`; `getItemsTotal(items)` tính tiền một bộ từ giá chung, bộ rỗng trả 0, mã/số lượng sai báo lỗi để người gọi xử lý. Hàm không thay đổi dữ liệu đầu vào.
- Nam xuất `renderProducts(list)` để vẽ danh sách. Tuấn xuất `initProductFilters({products, renderProducts})` để nối điều khiển; Nam gọi một lần từ `products-page.js` sau khi nhận module. Tuấn không tạo hàm render thứ hai.
- Nam gắn vùng danh sách `[data-products-list]`, ô từ khóa `[data-product-search]`, bộ lọc `[data-category-filter]` (rỗng là tất cả, còn lại dùng mã danh mục) và chọn sắp xếp `[data-sort-select]` (`default`, `price-asc`, `price-desc`). Tuấn dùng đúng các điểm nối này. Render lại chỉ thay vùng danh sách; sự kiện thêm giỏ được Nam gắn một lần bằng ủy quyền sự kiện trên vùng đó.
- Tuấn xuất `recommendGiftSets(budget)` trả mảng `{giftSetId, name, items, unitTotal, remainingBudget}`. Chỉ gợi ý bộ có giá không vượt ngân sách và đủ `stockDemo` cho một bộ; sắp giá tăng dần rồi mã bộ. Ngân sách sai/không có bộ phù hợp trả `[]`; giao diện Châu kiểm tra ô nhập trước để phân biệt thông báo sai dữ liệu với không có bộ phù hợp.
- Bảo xuất `getCart()`, `addSingle(productId, quantity = 1)`, `addGiftSet(selection)`, `setSingleQuantity(lineId, quantity)`, `setGiftQuantity(lineId, setQuantity)`, `removeCartLine(lineId)`, `getCartSummary()` và `updateCartBadge()`. `selection` gồm `giftSetId`, `name`, `budget`, `items`, `setQuantity` như bản soạn; không truyền tổng tiền do UI tự tính vào làm nguồn giá.
- Hàm thay đổi giỏ trả `{ok, code, message, cart}`; mã tối thiểu: `OK`, `INVALID_INPUT`, `NOT_FOUND`, `OUT_OF_STOCK`, `STORAGE_ERROR`. Nếu thất bại thì giữ giỏ trước thao tác. Vượt ngân sách hợp lệ vẫn `OK`; Châu hiển thị cảnh báo, không chuyển thành lỗi chặn mua.
- `getCart()` và trường `cart` trả bản sao dữ liệu để UI đọc; chỉ các hàm nghiệp vụ của Bảo được sửa trạng thái giỏ. Tạo bản trạng thái mới, kiểm tra và lưu thành công rồi mới thay trạng thái đang dùng; lỗi lưu không được báo là đã lưu thành công.
- `getCartSummary()` trả `{totalQuantity, totalAmount, totalSets}`: tổng số món thực tế, tổng tiền và số bộ. Một bộ gồm hai món, mua hai bộ thì có 4 món, 2 bộ; số đếm giỏ dùng `totalQuantity`, không dùng số dòng.
- Đức xuất `loadCart()`, `saveCart(cart)`, `loadGiftDraft()`, `saveGiftDraft(draft)` và `clearGiftDraft()`. Giỏ rỗng trả `{version:1, lines:[]}`; chưa có bản soạn trả `null`. Hàm lưu/xóa trả `{ok, message}` để UI biết khi không lưu được. JSON hỏng/sai phiên bản không làm trang dừng: trả mặc định an toàn và ghi cảnh báo Console để kiểm tra.
- Khóa localStorage thống nhất: `lenly.cart.v1` và `lenly.giftDraft.v1`. `storage.js` không import `cart.js` và không sửa DOM; Bảo nhập module lưu và gọi sau thay đổi hợp lệ. Kiểm tra lưu thành công trước khi xác nhận thao tác thành công.
- Đức gọi `updateCartBadge()` từ `site.js` khi mở trang. Các hàm thay đổi giỏ của Bảo gọi cập nhật số đếm sau thành công; phần tử số đếm dùng `[data-cart-count]`. UI trang giỏ được render lại sau mỗi thao tác; không tự tạo một mảng giỏ riêng khác với `cart.js`.
- Bảo kiểm tra lượng sau thao tác bằng tổng hàng lẻ + tổng `(quantity trong một bộ × setQuantity)` ở mọi bộ; không trừ trực tiếp vào `products.stockDemo`. Tăng số bộ phải kiểm tra lại toàn giỏ. Thiếu lượng demo thì trả `OUT_OF_STOCK` và không thêm một phần bộ.

### 6. Điểm nối trang và ca kiểm tra bàn giao

- Danh sách/trang chủ mở `product-detail.html?id=KC-001` theo mã thật. Khanh đọc mã qua `URLSearchParams`; thiếu/sai mã có thông báo và đường về danh sách.
- Từ chọn quà, Châu lưu bản soạn rồi mở `product-detail.html?id=KC-001&from=gift`. Khanh chỉ chấp nhận `from=gift` làm đích quay lại `gift-builder.html`, không nhận URL tùy ý. Khi không có `from=gift` thì quay lại `products.html`. Không tự xóa bản soạn khi xem chi tiết hoặc thêm lẻ.
- Nhân bản tại trang giỏ: Bảo lấy dòng quà, sao chép theo phần “Cấu trúc giỏ và bản soạn quà”, gọi `saveGiftDraft()`, chỉ chuyển tới `gift-builder.html` khi lưu thành công; Châu đọc bản soạn và cho chỉnh. Không cần module cart import file giao diện chọn quà.
- Chỉ xóa bản soạn sau khi thêm bộ thành công hoặc khách chủ động bỏ bản soạn. Thêm giỏ lỗi phải giữ nguyên lựa chọn để khách sửa.
- Ca Nam → Tuấn: GIFT-01 có giá 80.000 đồng theo dữ liệu mẫu. Ngân sách 79.000 không gợi ý bộ này; 80.000 có bộ này và dư 0. Giá được kiểm tra lại nếu Nam sửa giá nguồn.
- Ca giỏ/lưu: thêm KC-001 × 2 thì tổng 90.000; thêm GIFT-01 × 2 thì thêm 160.000, tổng giỏ 250.000, tổng 6 món và 2 bộ. Tải lại vẫn giữ đúng nhóm/số lượng. Đây là kết quả mong đợi, chưa phải kết quả đã thử.
- Ca Lenly: khách nhập ngân sách 150.000 đồng cho một bộ; sau khi thay sản phẩm khác, thêm/bỏ sản phẩm hoặc thay đổi số lượng sản phẩm trong bộ, giá một bộ thành 155.000 đồng thì cảnh báo vượt 5.000 đồng nhưng vẫn cho thêm nếu dữ liệu hợp lệ và đủ số lượng demo. Mua hai bộ hiển thị 155.000 đồng/bộ × 2 = 310.000 đồng. Khi nhân bản để thay sản phẩm trong bộ mới, dòng gốc giữ nguyên. Dùng dữ liệu phù hợp thực tế khi chạy ca này, không sửa giá chỉ để làm đúng ví dụ.

### 7. Mọi người bắt đầu theo thứ tự nào

Đức gửi link Sheet và Bài làm 1; mỗi PIC đọc phần chung và tab bước của mình, báo vướng mắc sớm. Việc đọc/xác nhận có thể nhắn trong nhóm, không bắt buộc họp riêng. Chỉ điểm không tương thích dữ liệu/hàm mới cần Đức điều phối thống nhất trước khi ghép.

Các PIC bắt đầu phần độc lập sau bản nền. Ngày 09/11: 11:00 dữ liệu Nam và lưu trữ Đức; 15:00 hàm Tuấn/Bảo; 21:00 các trang/module đã nối và tự thử. Ngày 10/11: 12:00 bản tích hợp/giao diện; 18:00 kiểm thử và thử lại; 21:00 hồ sơ sẵn nộp. Đức tích hợp, các PIC sửa phần mình, Quyến rà CSS.

Tạo nhánh từ `main` mới nhất: `buoi3-nam`, `buoi3-tuan`, `buoi3-khanh`, `buoi3-bao`, `buoi3-chau`, `buoi3-quyen`, `buoi3-duc`. Không ghi đè/xóa nhánh đã có. Commit/push phần mình, gửi PR hoặc commit kèm cách thử cho người kiểm tra. Đức ghép sau kiểm tra; chưa đủ module thì giữ trên nhánh riêng, không ghép trang bị lỗi import lên main.

Khi bàn giao, ghi file/commit, dữ liệu/hàm đã có, cách chạy, một ca bình thường/một ca sai phù hợp, ảnh và phần còn chờ. Người nhận kiểm tra đầu vào ngay; Quyến kiểm thử toàn luồng sau bản ghép, PIC sửa lỗi phần mình, Đức duyệt hồ sơ cuối. Deadline chi tiết theo Sheet; trình tự phụ thuộc ở trên là căn cứ để biết khi nào có thể bắt đầu.


## Phối hợp cải thiện giao diện Buổi 3

- Quyến kế thừa thiết kế Buổi 2, giữ logo, footer, màu và CSS phù hợp; trực tiếp bổ sung CSS cho bộ lọc, thông báo, giỏ hàng/chọn quà và responsive. Không yêu cầu làm lại thương hiệu hoặc thiết kế lại toàn website.
- Chủ trang chịu trách nhiệm HTML và chức năng: Nam danh sách, Tuấn điều khiển tìm/lọc/sắp, Khanh chi tiết, Bảo giỏ, Châu chọn quà. Phần chung cần thay đổi thì phối hợp với Đức và Quyến; không lấy bản cũ ghi đè mã mới.
- Khi sửa hình thức, giữ tên hàm, mã sản phẩm và những thuộc tính HTML mà JavaScript đang đọc. Nếu cần đổi, báo người phụ trách chức năng trước và kiểm tra lại thao tác sau thay đổi.
- Sau khi Đức ghép, từng PIC thử lại chức năng, Quyến kiểm tra giao diện tại 1366, 768 và 390 px; ghi kết quả thật và lỗi. Đức tổng hợp, xử lý lỗi ghép; từng tác giả sửa phần mình, Quyến sửa CSS và thử lại.
- Hướng dẫn Bước 1–8 và Sheet đã được diễn giải đầy đủ hơn: nhận dữ liệu gì, làm thao tác nào, lưu file ở đâu, giao cho ai và kiểm tra thế nào. Tên file/hàm và cấu trúc dữ liệu trong mã giữ theo quy ước kỹ thuật. Đây là phân công triển khai, chưa xác nhận giao diện đã được làm đẹp hoặc chức năng đã hoàn thành.

## Bản nền và lưu trữ đã bàn giao 08/11/2026

- Đọc [hướng dẫn bàn giao](ban-giao-ban-nen-buoi3.md) trước khi nối mã; [trang thử](kiem-tra-storage.html) nạp trực tiếp `js/storage.js`, không phụ thuộc module chưa có.
- `loadCart`, `saveCart`, `loadGiftDraft`, `saveGiftDraft`, `clearGiftDraft` đã có mã. Lưu/xóa trả `{ok, message}`; phải kiểm tra `ok` trước khi xác nhận thao tác.
- Bản đang chỉnh có đủ trường như ví dụ; cho phép `budget: null`, `sourceGiftSetId: null`, `copiedFromLineId: null`, tên trống và `items: []`. Khi thêm vào giỏ thì bộ phải hợp lệ/không rỗng, ngân sách nguyên dương, đủ lượng demo; module giỏ chịu trách nhiệm kiểm tra.
- `storage.js` kiểm tra cấu trúc và tạo dữ liệu độc lập; không lưu giá/tổng tiền, không kiểm tra mã trong catalog hoặc lượng tồn. Đọc lỗi trả mặc định và cảnh báo; ghi lỗi không báo thành công. Bảo tính lại giá/tổng và kiểm tra lượng từ dữ liệu Nam.
- Chỉ module lưu và trang thử đã được triển khai trong lượt này. `site.js` sẽ nối `updateCartBadge()` khi Bảo giao hàm; chưa nạp file chưa tồn tại vào website bán hàng.
- Dữ liệu/ảnh Buổi 2 giữ nguyên. Không tạo các file rỗng trùng phần việc Nam/Tuấn/Khanh/Bảo/Châu; các PIC tạo đúng module được phân công, dùng ví dụ để bắt đầu, rồi thay bằng đầu vào thật.
