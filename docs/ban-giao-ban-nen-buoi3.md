# Bản nền và lưu trữ dùng chung Buổi 3

Ngày bàn giao: 08/11/2026. Người phụ trách: Nguyễn Quang Đức. Mã và hướng dẫn được OpenAI Codex hỗ trợ; các thành viên đọc hiểu và gọi thử trước khi nối trang của mình.

## 1. Nhận bản nền và bắt đầu

1. Lấy nhánh `main` mới nhất sau khi bản bàn giao được đăng lên GitHub. Nếu đang có thay đổi chưa lưu, commit trên nhánh của mình trước; không xóa mã để kéo bản mới.
2. Mỗi người tạo nhánh riêng từ bản mới, hoặc ghép `main` mới vào nhánh đang làm. Không ghi đè nhánh của người khác. Gửi Đức tên nhánh/commit khi bàn giao.
3. Mở dự án trong VS Code, dùng Live Server; hoặc chạy `python -m http.server 5513` tại thư mục gốc rồi mở `http://localhost:5513/docs/kiem-tra-storage.html`.
4. Bấm lưu giỏ mẫu → lưu bản đang soạn → tải lại trang → xóa riêng bản đang soạn. Đối chiếu dữ liệu và hai khóa trong F12 → Application → Local Storage. Trang thử chỉ ghi mẫu khi người dùng bấm nút.
5. Đọc ví dụ đúng phần mình dưới đây. Bản nền không đòi hỏi phải có file của tất cả thành viên mới thử được lưu trữ.

Giữ nguyên địa chỉ và cổng khi thử: `localhost:5513` khác `127.0.0.1:5513` và `localhost:5500`. Nên dùng cổng thử riêng để không ghi đè giỏ đang thử ở địa chỉ khác. Không mở ES modules bằng cách nhấp đúp file HTML.

## 2. Phần đã có và phần mọi người cần tiếp tục

| File/phần | Trạng thái và người tiếp tục |
| --- | --- |
| `js/storage.js` | Đã triển khai năm hàm đọc/lưu/xóa, chạy độc lập với sản phẩm và giỏ; Đức phụ trách. |
| `docs/kiem-tra-storage.html`, `js/storage-demo.js` | Trang thử kỹ thuật với dữ liệu mẫu; không phải giỏ/chọn quà của cửa hàng. |
| `tests/storage.test.mjs`, `package.json` | Kiểm thử tự động của module lưu; `npm run test:storage`, không cần `npm install`. Node chỉ dùng chạy kiểm thử, không có backend mới. |
| `docs/quy-uoc.md` | Tên file/hàm/dữ liệu và cách nối hiện hành; bản này thay quy ước phân công cũ. |
| Dữ liệu và danh sách | Nam viết `products.js`, `gift-sets.js`, `product-utils.js`, `product-list.js`, `products-page.js`; kế thừa tám sản phẩm/ảnh Buổi 2. Không lấy dữ liệu trang thử làm một catalog mới. |
| Tìm kiếm và gợi ý | Tuấn viết `product-filters.js`, `gift-recommendations.js`. |
| Giỏ và chi tiết | Bảo viết `cart.js`, `cart-page.js`, `cart.html`; Khanh làm `product-detail.js` và sửa trang chi tiết. |
| Chọn quà | Châu viết `gift-builder.js`, `gift-builder.html`, dùng hàm Tuấn/Bảo/Đức. |
| Giao diện và tích hợp | Quyến bổ sung CSS/responsive; chủ trang chịu trách nhiệm HTML/chức năng. Đức ghép mã và xử lý lỗi ghép. `site.js` được nối với hàm số đếm giỏ khi Bảo bàn giao; hiện chưa tạo file rỗng hoặc import module chưa tồn tại. |

Các trang bán hàng Buổi 2 giữ nguyên trong lượt bàn giao này. Có `storage.js` không có nghĩa tìm kiếm, giỏ, chọn quà hoặc toàn bộ Bước 6 đã nghiệm thu trên website thật.

## 3. Giao tiếp năm hàm

Trong file JavaScript ở `js/`, dùng:

```js
import {
  loadCart, saveCart, loadGiftDraft, saveGiftDraft, clearGiftDraft,
} from './storage.js';
```

| Hàm | Dữ liệu nhận | Kết quả |
| --- | --- | --- |
| `loadCart()` | Không có | `{version: 1, lines: [...]}`; chưa có/hỏng thì `{version: 1, lines: []}`. |
| `saveCart(cart)` | Toàn bộ trạng thái giỏ đã kiểm tra | `{ok: true/false, message: '...'}`. Chỉ xác nhận thao tác khi `ok === true`. |
| `loadGiftDraft()` | Không có | Đối tượng bản đang soạn; chưa có/hỏng thì `null`. |
| `saveGiftDraft(draft)` | Toàn bộ bản đang soạn | `{ok, message}`, không tự thêm giỏ. |
| `clearGiftDraft()` | Không có | `{ok, message}`, chỉ xóa bản đang soạn, giữ giỏ và khóa khác. |

Khóa dùng chung: `lenly.cart.v1`, `lenly.giftDraft.v1`. Module không import `cart.js`, không có dữ liệu sản phẩm riêng, không sửa DOM hoặc gắn sự kiện. Các lần đọc trả dữ liệu độc lập; sửa đối tượng vừa đọc chưa tự làm thay đổi dữ liệu đã lưu.

Module kiểm tra cấu trúc, kiểu dữ liệu, phiên bản, mã dòng và số nguyên dương. Nó **không kiểm tra mã có trong catalog, tổng giá, lượng tồn hoặc tự gộp hai bộ giống nhau**: Nam/Bảo/Châu phải kiểm tra nghiệp vụ bằng dữ liệu sản phẩm chung. Không lưu trường giá/tổng tiền; khi đọc giỏ, tính lại từ `products` của Nam.

JSON hỏng, sai phiên bản hoặc sai cấu trúc: trả mặc định an toàn, ghi cảnh báo Console, giữ nguyên văn bản lỗi để kiểm tra; không khôi phục một phần giỏ lỗi. Bị chặn/quá dung lượng: hàm lưu trả `ok: false`; không báo khách đã lưu. Không tự xóa toàn bộ localStorage.

## 4. Bảo — dùng cho giỏ hàng

```js
const initialCart = loadCart();
// Trạng thái gửi lưu phải đúng cấu trúc sau (giá không lưu ở đây):
const candidate = {
  version: 1,
  lines: [
    { lineId: 'single:KC-001', type: 'single', productId: 'KC-001', quantity: 2 },
    {
      lineId: 'gift:HL-001=1|KC-001=1', type: 'gift',
      giftSetId: 'GIFT-01', name: 'Món quà nhỏ', budget: 100000,
      items: [{ productId: 'KC-001', quantity: 1 }, { productId: 'HL-001', quantity: 1 }],
      setQuantity: 2,
    },
  ],
};
const saved = saveCart(candidate);
if (!saved.ok) {
  // Trả STORAGE_ERROR kèm saved.message; giữ trạng thái trước thao tác.
} else {
  // Sau khi lưu thành công mới thay trạng thái giỏ và cập nhật giao diện/số đếm.
}
```

`initialCart` và `candidate` ở ví dụ là hai biến minh họa, không phải tạo hai giỏ chạy song song. Trong mã thật, `cart.js` giữ một trạng thái nghiệp vụ, tạo bản đề xuất trước mỗi thay đổi, kiểm tra rồi lưu. Không sửa trạng thái hiện hành trước khi biết đã lưu thành công. Chỉ các hàm nghiệp vụ giỏ thực hiện thêm/xóa/đổi số lượng.

Khi nhân bản: lấy dòng `type: 'gift'`, sao chép `items`, đặt `setQuantity: 1`, chuyển `giftSetId` sang `sourceGiftSetId` và đặt `copiedFromLineId` bằng mã dòng gốc. Gọi `saveGiftDraft`; chỉ chuyển trang nếu lưu thành công. Không dùng `saveCart` để thêm bản sao trước khi khách xác nhận.

## 5. Châu — dùng cho trang chọn quà

```js
const editing = loadGiftDraft() ?? {
  version: 1, budget: null, sourceGiftSetId: null, name: '',
  items: [], setQuantity: 1, copiedFromLineId: null,
};

// Khi chọn bộ mẫu hoặc khách thay món/số lượng, cập nhật editing rồi:
const saved = saveGiftDraft(editing);
if (!saved.ok) {
  // Hiển thị saved.message; chưa báo đã lưu, chưa chuyển sang chi tiết.
}

// Trước khi xem chi tiết, lưu thành công rồi mới mở:
// product-detail.html?id=KC-001&from=gift
// Lần mở lại trang chọn quà gọi loadGiftDraft() để khôi phục.
```

Trường bắt buộc: `version`, `budget`, `sourceGiftSetId`, `name`, `items`, `setQuantity`, `copiedFromLineId`. Dùng `null` cho mã nguồn/mã dòng gốc chưa có. **Bản đang chỉnh** có thể `budget: null`, `items: []`, tên trống; số bộ vẫn là số nguyên dương. Ô ngân sách sai không lưu nguyên chữ vào dữ liệu: giữ trạng thái hợp lệ trước đó hoặc `null`, và hiển thị lỗi trên form.

**Bộ xác nhận thêm giỏ** phải có ngân sách nguyên dương, ít nhất một món, mã/số lượng đúng và đủ lượng demo toàn giỏ. Vượt ngân sách hợp lệ chỉ cảnh báo. Sau `addGiftSet(...)` của Bảo trả thành công, gọi `clearGiftDraft()`. Nếu xóa bản soạn thất bại thì báo rõ: giỏ đã thêm, chỉ phần xóa bản đang soạn còn lỗi; không tự thêm lại để tránh trùng.

## 6. Khanh, Nam, Tuấn và Quyến

- Khanh: đọc `id` và `from` từ URL; `from=gift` quay về `gift-builder.html`, trường hợp khác về `products.html`. Không xóa bản soạn khi xem chi tiết hoặc thêm mua lẻ. Gọi hàm thêm giỏ Bảo, không tự lưu một giỏ khác.
- Nam: giữ tám mã/giá/ảnh hiện hành; giao dữ liệu/hàm cơ bản trước, nối Tuấn/Bảo sau. Module lưu trữ không cần import dữ liệu Nam nên mọi người có thể thử ngay.
- Tuấn: nhận `products`/`giftSets` và giao đúng kết quả gợi ý theo quy ước; không tự ghi giỏ hoặc bản soạn trong hàm gợi ý.
- Quyến: giữ thiết kế Buổi 2, bổ sung CSS cho các phần mới và responsive; giữ `id`/`data-*` JavaScript đang đọc. Trang thử kỹ thuật có CSS riêng, không dùng làm mẫu thay thiết kế cửa hàng.

## 7. Tự kiểm tra và bàn giao

1. Chạy `npm run test:storage` nếu đã có Node; không cần cài thư viện. Bộ kiểm thử gồm dữ liệu rỗng/hỏng/sai phiên bản, đọc/lưu giỏ và bản soạn độc lập, bản sao sâu, số lượng sai, lỗi quyền/dung lượng và lỗi xóa.
2. Thử trang HTML như mục 1 bằng trình duyệt thật. Các trường hợp lỗi quyền/dung lượng trong bộ tự động được mô phỏng; không ghi là đã làm đầy dung lượng trình duyệt thật.
3. Khi có trang giỏ/chọn quà thật, Bảo/Châu/Khanh thử liên trang và tải lại. Đối chiếu giá/số lượng với Nam, thử nhân bản không sửa gốc. Đây là phần nghiệm thu kết nối còn chờ.
4. Gửi Đức nhánh/commit, file đã sửa, cách gọi và cách chạy, kết quả thực tế, ảnh, lỗi/phần còn chờ, thông tin AI đã dùng. Không đánh Done chỉ vì đã nhận file mẫu.

Mốc hiện hành: 09/11 11:00 dữ liệu Nam và lưu trữ Đức → 15:00 hàm Tuấn/Bảo → 21:00 các trang đã nối/tự thử → 10/11 tích hợp, kiểm thử và hồ sơ theo Sheet. Bản nền được chuẩn bị sớm để mọi người bắt đầu trước các mốc này.
