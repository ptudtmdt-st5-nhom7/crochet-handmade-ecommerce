# Bàn giao 2A dữ liệu và hiển thị cơ bản
Người phụ trách: Nguyễn Thanh Nam. Ngày chuẩn bị: 09/11/2026.
Phạm vi: Bước 2A theo TO DO LIST, không gộp phần kết nối 2B hạn 21h.

## File đã triển khai
- js/products.js: tám mã, tên, giá số, danh mục, ảnh, mô tả, stockDemo và thuộc tính màu/kích thước/chất liệu từ docs/products-data.md.
- js/gift-sets.js: ba bộ tham chiếu sản phẩm và allowedProductIds, không lưu giá bộ riêng.
- js/product-utils.js: getProductById, getItemsTotal, formatPrice.
- js/product-list.js: renderProducts(list), dùng DOM/textContent, trạng thái rỗng và đường dẫn đúng mã.
- js/products-page.js và vùng danh sách products.html: render tám sản phẩm bằng ES modules; giữ các phần chung/CSS cũ, các điểm nối theo quy ước.
- tests/products.test.mjs; docs/kiem-tra-2a.html và docs/kiem-tra-2a.js: cách kiểm tra tự động/trình duyệt.
- AI_USAGE_LOG.md: bổ sung phiên hỗ trợ 09/11.

stockDemo = 20 cho mỗi mã chỉ là lượng minh họa của Buổi 3, không phải tồn kho thực tế. Giá và mô tả sản phẩm là dữ liệu minh họa kế thừa Buổi 2.

## Ví dụ gọi từ một file trong js
```js
import { products, categoryLabels } from './products.js';
import { giftSets } from './gift-sets.js';
import { getProductById, getItemsTotal, formatPrice } from './product-utils.js';
import { renderProducts } from './product-list.js';

getProductById('KC-001'); // sản phẩm giá 45000, stockDemo 20
getProductById('SAI'); // null
getItemsTotal(giftSets[0].items); // 80000 cho một bộ
getItemsTotal(giftSets[1].items); // 150000
getItemsTotal(giftSets[2].items); // 129000
getItemsTotal([]); // 0
getItemsTotal([{productId:'KC-001',quantity:2}]); // 90000
// Mã không tồn tại hoặc quantity 0/âm/lẻ/chuỗi: ném lỗi; người gọi try/catch.
renderProducts(products); // trang phải có [data-products-list]
renderProducts([]); // Không có sản phẩm phù hợp.
```

Không nhân số bộ trong getItemsTotal. Bảo/Châu nhân riêng setQuantity và kiểm tra tổng lượng toàn giỏ. Hàm tính tiền không kiểm tra tồn hoặc danh sách món được phép; đó là kiểm tra nghiệp vụ của giỏ/chọn quà. Các hàm không tự trừ stockDemo hay sửa mảng đầu vào.

## Ba bộ và danh sách được phép đổi
- GIFT-01, Món quà nhỏ: KC-001 × 1 + HL-001 × 1 = 80.000 đồng. Cho phép KC-001, KC-002, HL-001, HL-002, PK-001, PK-002.
- GIFT-02, Bạn thỏ và hoa xinh: TL-001 × 1 + PK-002 × 1 = 150.000 đồng. Cho phép TL-001, TL-002, KC-001, KC-002, PK-001, PK-002.
- GIFT-03, Hoa và phụ kiện: HL-002 × 1 + PK-001 × 1 = 129.000 đồng. Cho phép HL-001, HL-002, PK-001, PK-002.

Món mặc định đều thuộc allowedProductIds. Châu sao chép items trước khi chỉnh; không sửa các bộ mẫu gốc. Giá luôn lấy từ products hiện hành.

## Kết quả đã chạy khi chuẩn bị
Lệnh tại gốc: node --test tests/products.test.mjs tests/storage.test.mjs
Kết quả: 30 kiểm thử đạt, 0 lỗi; gồm 7 kiểm thử dữ liệu/tính giá mới và 23 kiểm thử lưu trữ có sẵn. Log tại docs/minh-chung-2a/ket-qua-node.txt.
Đã kiểm tra cú pháp các module mới và đối chiếu dữ liệu/đường dẫn ảnh với file nguồn. Việc chạy bộ lưu trữ cũ chỉ kiểm tra hồi quy, không nhận là phần Nam viết.
Trình duyệt tự động trong môi trường hỗ trợ không khởi động được (hạn chế socket). Chưa ghi nhận kết quả hoặc ảnh trình duyệt của bản 2A này; dùng trang thử dưới đây để Nam/người nhận xác nhận thực tế.

## Cách tự thử và chụp minh chứng
1. Mở thư mục dự án bằng VS Code, chạy Live Server với products.html. Không mở HTML bằng nhấp đúp.
2. Kiểm tra tám thẻ và ảnh, tên/giá; F12 Console không có lỗi import. Nút thêm giỏ và điều khiển lọc đang disabled đúng phạm vi 2A.
3. Mở docs/kiem-tra-2a.html cùng host/cổng. Trang tự kiểm tra dữ liệu, ba tổng tiền, mã/số lượng sai, render rỗng, render lặp và tám ảnh. Kết quả ĐẠT/LỖI là từ lần mở thật.
4. Bấm Thử danh sách rỗng rồi Hiện lại tám sản phẩm. Chụp ảnh trang thử và danh sách để bổ sung docs/minh-chung-2a/.
5. Gửi Đức/Tuấn/Khanh/Bảo/Châu nhánh/commit và file này. Người nhận gọi ví dụ để xác nhận trước khi ghép.

## Phần chờ kết nối 2B
- Tuấn: initProductFilters({products, renderProducts}); các điểm nối data-product-search, data-category-filter, data-sort-select đã có. Bỏ disabled của fieldset sau khi nhận và gắn module.
- Bảo: addSingle(productId, quantity); gắn MỘT listener trên vùng danh sách. Chỉ bật nút sau khi có hàm giỏ; có thể dùng renderProducts(list, {cartReady:true}). Khi nối bộ lọc, truyền wrapper render với tùy chọn này để render sau lọc không vô hiệu hóa lại nút.
- Khanh: hoàn thiện trang động product-detail.html đọc id. Các link đã mang mã đúng theo hợp đồng; bản nền vẫn hiển thị chi tiết thỏ tĩnh nên chưa được coi là đã nghiệm thu tám trang động.
- Đức: site.js chưa có trong bản nền gửi kèm, vì vậy không import file chưa tồn tại.
- Quyến: bổ sung kiểu điều khiển mới và khoảng cách nút, rà responsive sau kết nối.

2A là dữ liệu/hàm cơ bản; không xác nhận đã tìm/lọc/thêm giỏ hoặc hoàn thành 2B. Nhánh/commit sẽ có sau khi Nam chép file, tự thử và commit trong repository của nhóm.
