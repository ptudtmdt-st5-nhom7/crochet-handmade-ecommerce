# Quy tắc nghiệp vụ dùng chung DA02

## 1. Phạm vi tổng hợp

Tổng hợp DA02.1 của Đức, bản Done tại DA02.2 của Bảo và DA02.3 của Tuấn thành quy tắc dùng chung theo các quyết định của Đức. Bản tổng hợp bao gồm mua hàng có sẵn, bộ quà, nhắn shop trao đổi khi hết hàng, đặt làm, cọc, thanh toán, tồn kho và hoàn tiền; được bàn giao để Châu feedback.

Bản frontend hiện có danh sách tám sản phẩm, giỏ quà nhiều khung và giỏ hàng dùng localStorage/stockDemo. DA01 đã được merge qua PR #43, mới có Express và hai đường dẫn kiểm tra máy chủ/database. Các quy tắc checkout, đơn hàng, giữ tồn, thanh toán và đặt làm dưới đây là đầu vào triển khai backend, không phải xác nhận các chức năng đó đã chạy.

## 2. Bộ quy tắc dùng chung

### 2.1. Phân biệt mua sẵn và đặt làm

Sản phẩm còn đúng mẫu, màu sắc, kích thước và đủ số lượng có thể bán: khách mua theo luồng hàng có sẵn, không yêu cầu đặt cọc riêng. Áp dụng theo bản Bảo: khách có thể mua bằng tài khoản hoặc không đăng nhập, nhưng phải cung cấp đủ thông tin nhận hàng và liên hệ. Guest tra cứu đơn bằng mã đơn kèm email hoặc số điện thoại đã đặt, không chỉ bằng mã đơn; Customer xem lịch sử đơn của mình. Gửi yêu cầu đặt làm F12/F13 chính thức vẫn cần tài khoản Customer; nhắn shop trao đổi trước chưa phải gửi yêu cầu đặt làm trên hệ thống.

Sản phẩm hết hàng: có điểm liên hệ “Nhắn shop đặt làm”, kèm tên/mã mẫu để khách trao đổi khả năng làm, giá và thời gian. Bấm liên hệ chưa tạo đơn, chưa yêu cầu cọc và không tự chuyển giỏ hàng thành đơn đặt làm. Nếu shop không nhận làm hoặc khách không đồng ý thì kết thúc trao đổi.

Nếu shop nhận làm theo mẫu thiết kế của shop và các tùy chọn được hỗ trợ, tiếp tục theo F12. Yêu cầu riêng ngoài tùy chọn hỗ trợ hoặc mẫu/ảnh riêng tiếp tục theo F13. Cả hai nhánh đều phải có thông tin yêu cầu và giá/thời gian được ghi nhận, khách đồng ý, rồi thu đủ tiền cọc đã xác nhận trước khi sản xuất. Trao đổi qua kênh liên hệ không thay thế hồ sơ yêu cầu, báo giá và giao dịch cần lưu trên hệ thống.

F12 là “đặt làm mới theo mẫu thiết kế của shop”, không đồng nghĩa với thành phẩm đang còn trong kho. Đơn đặt làm tách khỏi lần checkout mua hàng có sẵn/bộ quà. Nhắn shop dùng kênh liên hệ, không bổ sung hệ thống live chat thời gian thực vào phạm vi hiện tại.

### 2.2. Bộ quà và ngân sách

Ngân sách là tiền sản phẩm của một bộ. Gợi ý chỉ lấy bộ mẫu hợp lệ, đủ lượng cho một bộ và không vượt ngân sách; sắp theo giá tăng dần rồi mã bộ. Sau tùy chỉnh, vượt ngân sách chỉ cảnh báo, không chặn thêm giỏ nếu cấu hình hợp lệ và đủ lượng.

Mỗi bộ đang soạn có khung độc lập. Nhân bản tạo khung mới, mặc định một bộ, giữ nguyên bộ gốc. Giỏ gộp các bộ có cùng mã sản phẩm và số lượng từng mã trong một bộ; khác cấu hình thì giữ riêng. Tổng tiền và tổng số món phải nhân với số bộ.

Gói quà cơ bản không thu phí riêng; tiền hàng thay đổi theo sản phẩm và số lượng thực tế. Mỗi bộ được shop trang trí, gói riêng; hai bộ gộp trên một dòng giỏ vẫn là hai gói. Tùy chỉnh bộ quà từ hàng có sẵn không tự biến đơn thành đặt làm và không phát sinh cọc riêng.

### 2.3. Giá, khuyến mãi, voucher và vận chuyển

Đối với cùng một đơn mua sẵn, tính chung tiền hàng lẻ và thành phần các bộ quà. Thứ tự tính: tổng giá gốc → khuyến mãi sản phẩm → kiểm tra và áp dụng một voucher hợp lệ → xét miễn ship → cộng phí vận chuyển. Voucher chỉ giảm các sản phẩm/nhóm sản phẩm thuộc phạm vi áp dụng, không giảm tiền ship.

Theo bản Bảo: điều kiện giá trị đơn tối thiểu của voucher tính trên tiền hàng sau khuyến mãi sản phẩm, trước khi trừ voucher; kiểm tra thêm thời hạn, lượt dùng, phạm vi sản phẩm và mức giảm tối đa của mã. Tổng giảm từ khuyến mãi và voucher không vượt 50% tổng giá gốc; nếu vượt, từ chối ưu đãi được thêm sau cùng và thông báo rõ cho khách. Trường hợp không được kết hợp, chọn ưu đãi có lợi hơn theo điều kiện chương trình.

Phí giao hàng theo vùng cấu hình: nội thành TP.HCM 20.000đ; ngoại thành TP.HCM 30.000đ; khu vực tỉnh/thành khác được hỗ trợ 40.000đ. Miễn ship khi tổng tiền hàng sau khuyến mãi và voucher đạt từ 300.000đ, chưa cộng phí vận chuyển. Danh sách phường/xã theo vùng phải được cấu hình thống nhất, không suy ra phí từ tên quận/huyện cũ.

Khi sửa sản phẩm, số lượng hoặc địa chỉ, kiểm tra lại điều kiện ưu đãi, phí giao hàng và tổng tiền. Giỏ hàng trước khi tạo đơn được gỡ voucher không còn hợp lệ và thông báo; khi sửa một đơn đã tạo thì phải kiểm tra trước khi lưu, hiển thị thay đổi để khách xác nhận. Trong thời gian đơn còn hiệu lực và khách còn được tiếp tục thanh toán, giữ voucher/lượt đang gắn với đơn, kể cả khi một lần giao dịch bị lỗi. Khi thanh toán kết thúc thất bại và đơn không còn tiếp tục, đơn hết hạn hoặc COD tự hủy, trả lại lượt theo bản Bảo nếu voucher còn hạn; xử lý trả lượt một lần, không gia hạn voucher. Khách chủ động hủy vẫn theo điều kiện riêng của mã.

### 2.4. Tồn kho dùng chung

Tính nhu cầu của mỗi mã biến thể trên toàn đơn: lượng mua lẻ + tổng (lượng trong một bộ × số bộ). Khi một món thiếu hàng hoặc ngừng bán, báo rõ bộ bị ảnh hưởng, tên/mã món, tổng lượng cần và lượng có thể bán; chưa tạo đơn, không tự bỏ hoặc thay món.

Hàng đang soạn hoặc nằm trong giỏ chưa giữ chỗ tồn kho. Khi tạo đơn hợp lệ, máy chủ giữ hàng trong giao dịch phù hợp để tránh mua đồng thời vượt số lượng. Ngay lúc giữ hàng, lượng đó không còn được bán cho đơn khác. Khi Admin xác nhận, chuyển từ giữ tạm sang cam kết cho đơn, không trừ lượng có thể bán lần thứ hai.

Hàng vẫn có thể còn tại cửa hàng sau khi đã cam kết; bàn giao cho đơn vị vận chuyển mới là xuất kho vật lý. Hủy trước xuất kho thì giải phóng phần đã giữ/cam kết. Sau xuất kho chỉ cộng lại hàng có thể bán khi hàng hoàn về và được kiểm tra. Tồn kho thực tế, lượng giữ/cam kết và lượng có thể bán phải được phân biệt khi thiết kế dữ liệu.

### 2.5. Thanh toán và xử lý đơn mua sẵn

Online: thời hạn 25 phút tính từ lúc tạo đơn. Thử lại thanh toán hoặc sửa đơn không làm mới thời hạn. Chuyển sang COD chỉ khi đơn còn hạn và địa chỉ được hỗ trợ; trạng thái chuyển sang Chờ xác nhận. Hết hạn chưa ghi nhận thành công thì hủy đơn và giải phóng hàng giữ.

Nếu kết quả thanh toán thành công đến sau khi đơn đã bị hủy, ghi nhận giao dịch hợp lệ một lần và xử lý hoàn toàn bộ tiền đã thu, không tự khôi phục đơn. Giao dịch đang xử lý phải được đối chiếu tiếp theo mã tham chiếu; không coi việc chưa nhận callback là bằng chứng chắc chắn khách chưa bị thu tiền.

COD: bắt đầu ở Chờ xác nhận, chưa thanh toán. Sau 24 giờ kể từ tạo đơn mà Admin chưa xử lý thì nhắc Admin; đủ 48 giờ vẫn chưa xử lý thì tự hủy và giải phóng hàng giữ. Chỉ ghi nhận đã thanh toán khi có xác nhận đã thu tiền; chỉ hoàn thành khi giao thành công và nghĩa vụ thanh toán đã đủ.

Luồng đơn mua: Chờ thanh toán (online) → Chờ xác nhận → Đã xác nhận → Đang chuẩn bị hàng → Đang giao hàng → Hoàn thành. Các nhánh hủy/giao thất bại quản lý riêng. Mỗi lần chuyển trạng thái phải lưu điều kiện, thời gian và người thực hiện.

### 2.6. Sửa, hủy và hoàn tiền đơn mua

Theo bản Bảo, khách được sửa đơn chưa thanh toán hoặc COD đang Chờ xác nhận nếu Admin chưa xử lý. Đơn đã thanh toán online chỉ tự sửa thông tin không làm thay đổi số tiền; muốn đổi hàng/số lượng làm thay đổi tổng tiền thì hủy hợp lệ và tạo đơn mới. Khi thiếu hàng sau thanh toán online, xử lý hủy và hoàn toàn bộ đơn cũ thay vì tự thu thêm/hoàn một phần.

Hủy trước khi bàn giao vận chuyển được chấp thuận thì hoàn toàn bộ số tiền đã trả. Lỗi cửa hàng/đơn vị vận chuyển thì hoàn toàn bộ, gồm phí giao hàng. Giao thất bại do lỗi khách: khoản hoàn trừ chi phí giao/hoàn hàng thực tế nếu có, phải thông báo trước. COD chưa thu tiền không phát sinh hoàn tiền.

Admin liên hệ để giao lại tối đa một lần, sắp xếp trong 24 giờ sau khi khách đồng ý. Phí giao lại do lỗi khách tính theo chi phí thực tế và chỉ thực hiện sau khi khách đồng ý mức phí. Việc hủy và trả hàng về kho không được làm mất lịch sử đơn.

Dùng chung quy trình hoàn tiền cho đơn mua sẵn và đặt làm. Khi xác định có khoản phải hoàn, ghi Chờ hoàn tiền; gửi yêu cầu cho đơn vị thanh toán trong một ngày làm việc từ khi quyết định hoàn được ghi nhận. Sau khi gửi yêu cầu, chuyển Đang hoàn tiền; thời gian dự kiến 3–5 ngày làm việc tính từ lúc đơn vị thanh toán tiếp nhận. Chỉ chuyển Đã hoàn tiền khi có kết quả thành công; lỗi xử lý thì Hoàn tiền thất bại để Admin kiểm tra, không ghi hoàn trùng khi thử lại. Hoàn về phương thức ban đầu, không quy đổi giảm giá voucher thành tiền.

### 2.7. Báo giá và cọc đơn đặt làm

Shop xác nhận khả năng làm, giá và thời gian trước khi khách đồng ý. Báo giá có phiên bản; khi đổi giá/thời gian phải tạo bản mới, đánh dấu bản cũ đã thay thế và yêu cầu khách xác nhận bản hiện hành. Sau khi đã cọc, khách không tự sửa nội dung đơn; nếu cần thay đổi phải liên hệ cửa hàng để xử lý.

Theo quyết định của Đức: mọi đơn đặt làm phải thu đủ cọc trước sản xuất. Hạn chấp nhận và cọc nằm trong cùng 24 giờ tính từ lúc shop gửi báo giá/xác nhận nhận làm; khách đồng ý không được cộng thêm 24 giờ. Phiên thanh toán tối đa 25 phút nhưng không vượt hạn báo giá. Tiền cọc không làm tròn đến 1.000đ; tổng tiền, cọc, đã thu và còn lại được lưu tách biệt.

Cọc cố định 50% tiền hàng đặt làm cho cả F12 và F13, không tính phí vận chuyển vào cơ sở tính cọc. Tiền cọc thanh toán online qua cổng Sandbox, không dùng COD cho khoản cọc. Phần còn lại = tổng tiền phải thanh toán trừ tổng tiền hợp lệ đã thu; thu COD khi giao thành công hoặc thanh toán Sandbox ở trạng thái Đóng gói trước khi giao. Giao dịch thành công chỉ cộng tiền một lần; đơn đã hủy mà nhận tiền muộn phải hoàn toàn bộ khoản thu, không tự mở lại sản xuất.
Đơn đặt làm không áp dụng voucher trong phiên bản đầu. Phí vận chuyển dùng chung biểu phí 20.000đ/30.000đ/40.000đ theo vùng; miễn phí vận chuyển khi tiền hàng đặt làm đã xác nhận đạt từ 300.000đ, chưa tính ship.
Mỗi yêu cầu có số lượng nguyên từ 1 đến 10 món. Ảnh tham khảo F13 tối đa ba ảnh, định dạng .jpg/.jpeg/.png/.webp, dung lượng không quá 5 MB/ảnh. Ngày mong muốn nhận hàng phải cách ít nhất năm ngày kể từ ngày gửi yêu cầu; shop vẫn phải xác nhận khả năng đáp ứng và thời gian thực tế trước khi khách đồng ý. Shop phản hồi yêu cầu trong vòng 24 giờ kể từ khi nhận; mốc này khác với hạn báo giá/cọc 24 giờ tính từ lúc shop gửi báo giá.

### 2.8. Hủy đơn đặt làm và trạng thái

Theo bản Tuấn: hủy được duyệt trước khi móc len thì hoàn toàn bộ tiền đã thu; cửa hàng không thực hiện đúng cam kết thì hoàn toàn bộ. Khi khách đổi ý hủy trong giai đoạn sản xuất/đóng gói, giữ khoản cọc và hoàn phần đã thu ngoài cọc theo quyết định Đức đã nêu. Ví dụ đã trả 300.000đ, cọc 140.000đ thì hoàn 160.000đ. Hủy khi đang giao do Admin xử lý sau khi liên hệ, không cho khách tự hủy trực tiếp.

Luồng đặt làm: yêu cầu/xem xét → báo giá → khách đồng ý → Chờ đặt cọc → Chờ sản xuất → Đang móc len → Đóng gói → Giao hàng → Hoàn thành. Trạng thái yêu cầu/báo giá, đơn và thanh toán được quản lý riêng. Hủy đơn không mặc nhiên đồng nghĩa đã hoàn tiền; trạng thái hoàn tiền và khoản tiền còn cần xử lý phải được theo dõi.

## 3. Nguồn và tài liệu bàn giao

[DA02.1 — Quy tắc bộ quà](https://docs.google.com/document/d/1V3NdIGiTeoN_ShX-vEe1GK4qIG4zNve8ezKFrvLF4qA/edit?tab=t.vsuyt08skxc2)

[DA02.2 — Bản Done của Bảo](https://docs.google.com/document/d/1V3NdIGiTeoN_ShX-vEe1GK4qIG4zNve8ezKFrvLF4qA/edit?tab=t.tk3up8hvnu06)

[DA02.3 — Quy tắc đặt làm và báo giá của Tuấn](https://docs.google.com/document/d/1V3NdIGiTeoN_ShX-vEe1GK4qIG4zNve8ezKFrvLF4qA/edit?tab=t.7z7pp0qv6958)

Bản tổng hợp và phần đồng bộ REQUIREMENTS.md, docs/business-workflow.md được bàn giao qua PR tài liệu; không thay đổi mã frontend/backend hoặc tạo thêm bảng dữ liệu trong nhiệm vụ này.

## 4. Đối chiếu và các tình huống cần kiểm tra

Đã đối chiếu ba phần nghiệp vụ và trạng thái mã hiện hành. Những tình huống dưới đây là kết quả mong đợi theo quy tắc, không phải kết quả API đã chạy thành công.

### 4.1. Hai bộ giống nhau

Một bộ 80.000đ, chọn hai bộ: tiền hàng 160.000đ; chuẩn bị hai gói quà cơ bản; phí gói riêng bằng 0.

### 4.2. Đơn có bộ quà và hàng lẻ

Giả định voucher toàn đơn hợp lệ: hai bộ 160.000đ + hàng lẻ 190.000đ = 350.000đ; khuyến mãi sản phẩm 20.000đ, voucher 30.000đ. Tiền hàng còn 300.000đ nên miễn ship; tổng trả 300.000đ.

### 4.3. Chưa đạt ngưỡng miễn ship

Tiền hàng 350.000đ, giảm tổng 60.000đ còn 290.000đ; vùng phí 20.000đ thì tổng trả 310.000đ.

### 4.4. Vượt giới hạn giảm giá

Giá gốc 400.000đ, khuyến mãi 180.000đ, thêm voucher 40.000đ: tổng giảm 220.000đ > 200.000đ. Từ chối voucher thêm sau; tiền hàng sau khuyến mãi vẫn là 220.000đ, chưa tính ship.

### 4.5. Lượng gộp và món thiếu

KC-001 có thể bán 20; mua lẻ 18 + hai bộ mỗi bộ dùng một KC-001 thì cần 20. Thêm một bộ làm nhu cầu 21: từ chối, báo rõ mã thiếu và không lưu đơn vượt lượng.

### 4.6. Hết hàng và nhắn shop

Khách bấm liên hệ về mẫu hết hàng: chưa tạo đơn/chưa thu cọc. Shop không nhận làm thì kết thúc; shop nhận và khách đồng ý giá/thời gian thì tiếp tục F12, thu đủ cọc trước sản xuất.

### 4.7. Thời hạn đơn mua

Đơn online tạo 10:00 hết hạn 10:25; thử thanh toán lại không gia hạn. Đơn COD tạo 10:00 ngày 16/11: nhắc 10:00 ngày 17/11, tự hủy 10:00 ngày 18/11 nếu vẫn chưa xử lý.

### 4.8. Thời hạn và tiền đơn đặt làm

Báo giá gửi 10:00 ngày 16/11 hết hạn 10:00 ngày 17/11; đồng ý lúc 09:00 chỉ còn một giờ để cọc. Theo mức cọc cố định 50% trên tiền hàng 280.000đ, ship 20.000đ: cọc 140.000đ, còn lại 160.000đ. Đã trả 300.000đ rồi hủy khi đang sản xuất: giữ cọc 140.000đ, hoàn 160.000đ.

## 5. Sơ đồ luồng tổng hợp

```mermaid
flowchart TD
 A["Chọn hàng có sẵn hoặc bộ quà"] --> B{"Đủ lượng có thể bán?"}
 B -- Có --> C["Kiểm tra giá, ưu đãi, phí ship tại máy chủ"]
 B -- Không --> D["Báo rõ món thiếu; khách có thể nhắn shop"]
 C --> E["Tạo đơn và giữ hàng"]
 E --> F{"Phương thức thanh toán"}
 F -- Online --> G["Chờ thanh toán tối đa 25 phút"]
 F -- COD --> H["Chờ xác nhận; nhắc sau 24h, hủy sau 48h nếu chưa xử lý"]
 G -- Thành công --> H
 G -- Hết hạn --> X["Hủy đơn; giải phóng hàng giữ"]
 G -- Tiền về sau hủy --> Y["Ghi nhận một lần và xử lý hoàn tiền"]
 H --> I["Admin xác nhận; chuyển giữ tạm sang cam kết"]
 I --> J["Chuẩn bị, giao hàng, thu đủ tiền"]
 J --> K["Hoàn thành hoặc xử lý giao thất bại"]
```

```mermaid
flowchart TD
 A["Khách nhắn shop về mẫu hoặc yêu cầu riêng"] --> B{"Shop có nhận làm?"}
 B -- Không --> X["Kết thúc trao đổi; chưa tạo đơn"]
 B -- Có --> C["Ghi nhận yêu cầu F12 hoặc F13"]
 C --> D["Shop xác nhận giá, thời gian và gửi báo giá có phiên bản"]
 D --> E{"Khách đồng ý trong hạn?"}
 E -- Không --> X
 E -- Có --> F["Tạo đơn Chờ đặt cọc; giữ hạn 24h từ lúc gửi báo giá"]
 F --> G{"Thu đủ cọc 50% trước hạn?"}
 G -- Có --> H["Chờ sản xuất, móc len, đóng gói"]
 G -- Không --> Y["Hủy đơn; tiền về muộn phải hoàn, không tự mở lại"]
 H --> I["Giao hàng, thu đủ phần còn lại và hoàn thành"]
```
