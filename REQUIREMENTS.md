# Requirements

## 1. Mục tiêu dự án
*Mục tiêu kinh doanh: Phân phối sản phẩm móc len handmade (làm sẵn, giỏ quà theo ngân sách, đặt làm theo mẫu).
*Giá trị mang lại cho khách hàng: Giải quyết bài toán chọn quà theo chi phí của giới trẻ và chuẩn hóa quản lý đơn thủ công cho shop.

## 2. Phạm vi
### Trong phạm vi
*Phân hệ khách hàng: Tài khoản, Danh mục sản phẩm, Tạo giỏ quà theo ngân sách, Form đặt mẫu riêng, Giỏ hàng & Thanh toán giả lập (COD/QR)
*Phân hệ quản trị (Admin): CRUD sản phẩm & danh mục, duyệt/báo giá yêu cầu custom, cập nhật tiến độ gia công đơn hàng, thống kê cơ bản.

### Ngoài phạm vi
*Tích hợp bên thứ ba: Cổng thanh toán tự động (Stripe, VNPay quốc tế) và API vận chuyển tự động (GHN, ViettelPost).
*Nền tảng thiết bị: Ứng dụng di động (Mobile App iOS/Android) độc lập.


## 3. Người dùng
*Khách vãng lai (guest)
- Mô tả đối tượng: Người dùng truy cập website nhưng chưa đăng nhập.
- Quyền hạn được phép thực hiện:
    + Xem trang chủ, danh mục, tìm kiếm, lọc và xem chi tiết sản phẩm
    + Dùng thử công cụ 'Tạo giỏ quà theo ngân sách'.
    + Thêm sản phẩm làm sẵn vào giỏ hàng; Đăng ký / Đăng nhập.
- Giới hạn truy cập:
    + Chưa thể gửi form 'đặt làm theo mẫu'
    + Chưa lưu được Wishlist
    + Chưa xem được lịch sử đơn hàng.

*Khách hàng thành viên (Customer)
- Mô tả đối tượng: Khách hàng đã có tài khoản và đăng nhập hệ thống.
- Quyền hạn được phép thực hiện:
    + Toàn bộ quyền của Khách vãng lai.
    + Quản lý hồ sơ cá nhân, sổ địa chỉ, danh sách yêu thích (Wishlist)
    + Gửi yêu cầu 'Đặt làm theo mẫu' kèm ảnh/ghi chú.
    + Đặt hàng và theo dõi tiến độ gia công đơn hàng thực tế.
- Giới hạn truy cập:
    + Không được truy cập vào trang Quản trị (Admin Dashboard) hoặc chỉnh sửa dữ liệu hệ thống.

*Quản trị viên (Admin)
- Mô tả đối tượng: Chủ cửa hàng hoặc nhân viên quản lý vận hành.
- Quyền hạn được phép thực hiện:
    + Sản phẩm: Thêm, sửa, xóa danh mục & sản phẩm (gắn nhãn Có sẵn / Nhận custom).
    + Đơn custom: Duyệt, phản hồi và báo giá yêu cầu đặt làm riêng.
    + Đơn hàng: Cập nhật trạng thái (Đã xác nhận -> Đang móc len -> Đóng gói -> Giao hàng -> Hoàn thành).
    + Thống kê: Xem doanh thu và số lượng đơn theo thời gian.

## 4. Yêu cầu chức năng
## Bảng Ma trận Chức năng & Phân loại Ưu tiên (Functional Requirements)

| Mã CN | Tên chức năng | Mô tả | Người sử dụng | Mức độ ưu tiên | Tiêu chí nghiệm thu |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **F01** | **Quản lý tài khoản, hồ sơ và phân quyền** | Đăng ký, đăng nhập, đăng xuất; quản lý thông tin cá nhân, sổ địa chỉ nhận hàng và phân quyền truy cập theo vai trò. | `Guest`, `Customer`, `Admin` | **Bắt buộc** | • Đăng ký, đăng nhập thành công và phân quyền đúng vai trò (`Guest`, `Customer`, `Admin`).<br>• Mật khẩu lưu trữ được băm chuyên dụng có salt thông qua thư viện/framework.<br>• Khách hàng xem, sửa được hồ sơ và địa chỉ của mình; máy chủ kiểm tra quyền trên từng bản ghi để chặn khách A xem dữ liệu của khách B khi thay mã ID trên URL. |
| **F02** | **Danh mục, tìm kiếm, lọc và sắp xếp sản phẩm** | Hiển thị trang chủ, danh mục sản phẩm (móc khóa, thú len, hoa len, phụ kiện); tìm kiếm theo từ khóa, lọc đa tiêu chí và sắp xếp kết quả. | `Guest`, `Customer` | **Bắt buộc** | • Trang chủ có hai lối vào rõ ràng (*"Mua sản phẩm có sẵn"* và *"Đặt làm theo yêu cầu"*).<br>• Tìm theo từ khóa; lọc kết hợp theo loại sản phẩm, màu sắc, chất liệu, kích thước, khoảng giá và khả năng đặt làm (*"Có sẵn"* / *"Nhận đặt làm"*).<br>• Hỗ trợ sắp xếp (tên, giá, mới nhất), xóa bộ lọc và hiển thị trạng thái khi không có kết quả. |
| **F03** | **Xem chi tiết sản phẩm** | Hiển thị thông tin chi tiết của sản phẩm làm sẵn hoặc mẫu nhận đặt làm, kèm gợi ý các sản phẩm liên quan. | `Guest`, `Customer` | **Bắt buộc** | • Hiển thị hình ảnh đa góc độ, mô tả, chất liệu, kích thước, màu sắc, giá bán (hoặc nhãn *"Liên hệ báo giá"*) và tình trạng còn hàng.<br>• Đặt thông số chính và thời gian xử lý dự kiến (phân biệt rõ thời gian làm với thời gian vận chuyển) gần khu vực thao tác mua; hiển thị sản phẩm liên quan. |
| **F04** | **Quản lý giỏ hàng** | Thêm, điều chỉnh số lượng, xóa sản phẩm làm sẵn hoặc bộ quà đã chọn trong giỏ hàng và tính tổng tiền tạm tính. | `Guest`, `Customer` | **Bắt buộc** | • Cho phép thêm, sửa số lượng, xóa riêng từng sản phẩm lẻ hoặc xóa nguyên một bộ quà khỏi giỏ mà không làm mất các mục còn lại.<br>• Giữ nguyên giỏ hàng khi khách vãng lai đăng nhập để thanh toán.<br>• Kiểm tra tồn kho gộp trên tổng số lượng của cùng một biến thể xuất hiện ở cả sản phẩm lẻ và bộ quà. |
| **F05** | **Tạo giỏ quà theo ngân sách** | Nhập mức ngân sách cụ thể, nhận gợi ý các bộ quà do cửa hàng cấu hình sẵn và tùy chỉnh thành phần món quà trong phạm vi ngân sách. | `Guest`, `Customer` | **Bắt buộc** | • Khách nhập số tiền ngân sách cụ thể (chỉ tính trên tổng giá sản phẩm hiện hành; phí vận chuyển trình bày riêng).<br>• Hệ thống đề xuất các bộ quà cấu hình sẵn phù hợp; cho phép đổi món, thay đổi số lượng hoặc bỏ sản phẩm trong phạm vi hàng còn bán.<br>• Tính lại tổng giá sau mỗi thay đổi, hiển thị chính xác số tiền còn lại hoặc phần vượt ngân sách (ví dụ: ngân sách 300k, bộ quà 280k hiện dư 20k; chỉnh lên 330k báo vượt 30k) và cho phép chuyển sang giỏ hàng. |
| **F06** | **Đặt làm theo mẫu và nhận báo giá** | Hỗ trợ hai nhánh đặt làm: chọn mẫu kèm tùy chọn đã có giá niêm yết, hoặc gửi yêu cầu riêng kèm ảnh tham khảo để cửa hàng xem xét và báo giá. | `Customer`, `Admin` | **Bắt buộc** | • Biểu mẫu thu thập: mẫu gốc, màu sắc, kích thước (cấu hình theo từng mẫu), nội dung thêm, ảnh tham khảo (kiểm tra định dạng/dung lượng ở máy chủ), số lượng, ngày mong muốn nhận và ghi chú.<br>• Cửa hàng xác nhận khả năng nhận làm và thời gian hoàn thành (kể cả với tùy chọn đã có giá), hoặc gửi báo giá có lưu phiên bản và thời hạn hiệu lực.<br>• Chỉ tạo một đơn chờ đặt cọc chính thức sau khi khách bấm chấp nhận phiên bản báo giá hiện hành. |
| **F07** | **Đặt hàng, khuyến mãi và thanh toán thử nghiệm** | Nhập thông tin nhận hàng, áp dụng mã giảm giá, tính phí vận chuyển, thanh toán đơn mua sẵn hoặc đặt cọc đơn đặt làm qua cổng Sandbox. | `Customer` | **Bắt buộc** | • Máy chủ tính lại tổng tiền từ dữ liệu hợp lệ; kiểm tra giá, tồn kho, điều kiện mã giảm giá và trình bày rõ tiền hàng, giảm giá, phí giao hàng, tổng tiền.<br>• Tích hợp ít nhất một cổng thanh toán thử nghiệm (Sandbox); đơn đặt làm chỉ được đặt cọc sau khi đã chấp nhận báo giá.<br>• Kiểm tra kết quả thành công, thất bại hoặc hủy; giao dịch hợp lệ chỉ được ghi nhận đúng một lần (ví dụ: thông báo cọc 200k lặp hai lần vẫn chỉ ghi nhận đã thu 200k). |
| **F08** | **Theo dõi lịch sử và tiến độ đơn hàng** | Xem danh sách, chi tiết đơn hàng đã đặt, lịch sử cập nhật trạng thái và thông báo tiến độ gia công, thanh toán, giao nhận. | `Customer` | **Bắt buộc** | • Khách chỉ xem được đơn hàng thuộc tài khoản của mình; thông tin và đơn giá của đơn cũ được giữ nguyên khi cửa hàng sửa hoặc ngừng bán sản phẩm.<br>• Tách riêng trạng thái thanh toán (*Chưa thanh toán, Đã cọc, Đã thanh toán đủ*) với trạng thái sản xuất (*Đang làm -> Hoàn thành*) và giao nhận.<br>• Lưu ngày khách mong muốn nhận, ngày cửa hàng dự kiến hoàn thành và thông báo khi thay đổi thời hạn; xử lý đúng trường hợp hủy đơn hoặc giao thất bại. |
| **F09.1** | **Quản trị sản phẩm, danh mục, bộ quà và tồn kho** | Quản lý danh mục, nhóm sản phẩm, sản phẩm làm sẵn, cấu hình bộ quà mẫu và kiểm soát số lượng tồn kho (tách từ `F09`). | `Admin` | **Bắt buộc** | • Thêm, sửa, xóa/ngừng bán danh mục, sản phẩm và cấu hình thành phần, số lượng, tình trạng hiển thị của các bộ quà mẫu.<br>• Quản lý tồn kho dùng chung cho sản phẩm mua lẻ và thành phần trong bộ quà; đảm bảo quy tắc giữ và giải phóng hàng khi chờ thanh toán. |
| **F09.2** | **Quản trị đơn mua hàng, yêu cầu đặt làm và báo giá** | Tiếp nhận và xử lý đơn mua sẵn, thẩm định yêu cầu đặt làm, lập báo giá, cập nhật tiến độ gia công và giao nhận (tách từ `F09`). | `Admin` | **Bắt buộc** | • Xem xét yêu cầu đặt làm, yêu cầu bổ sung thông tin, từ chối hoặc gửi báo giá kèm thời gian dự kiến và điều kiện đặt cọc.<br>• Cập nhật trạng thái sản xuất, giao nhận, xử lý hủy đơn và hàng hoàn; lưu lịch sử trạng thái kèm thời gian và người cập nhật. |
| **F09.3** | **Quản trị người dùng, khuyến mãi và thống kê** | Quản lý tài khoản người dùng, thiết lập chương trình mã giảm giá và theo dõi bảng thống kê hoạt động cửa hàng (tách từ `F09`). | `Admin` | **Bắt buộc** | • Quản lý người dùng và chương trình khuyến mãi/mã giảm giá (điều kiện áp dụng, thời hạn, mức giảm, giới hạn sử dụng).<br>• Bảng thống kê hiển thị doanh thu, số đơn, sản phẩm bán chạy, đơn chờ giao và số khách hàng; phân biệt rõ giá trị đơn với số tiền thực thu và cách xử lý đơn hủy/mới thu cọc. |
| **F10** | **Đánh giá và bình luận sản phẩm** | Cho phép khách hàng chấm sao và gửi nhận xét phản hồi về sản phẩm sau khi đã nhận hàng. | `Customer` | **Bắt buộc (Cơ bản)** / **Phát triển sau (Ảnh)** | • Chỉ khách hàng đã nhận hàng thành công mới được chấm sao và viết nhận xét (khách chưa nhận hàng hoặc đơn đã hủy không được đánh giá).<br>• Nội dung đánh giá được xử lý an toàn khi hiển thị; chức năng tải ảnh đánh giá được hoãn sang giai đoạn phát triển sau. |
| **F11** | **Danh sách yêu thích (Wishlist)** | Lưu lại các mẫu sản phẩm móc len yêu thích vào tài khoản cá nhân để xem và đặt mua sau. | `Customer` | **Tùy chọn (Phát triển sau)** | • Khách hàng đã đăng nhập có thể lưu và xóa sản phẩm yêu thích trong tài khoản cá nhân.<br>• Xếp mức ưu tiên sau giỏ hàng, đặt làm và thanh toán; chỉ thực hiện khi nhóm còn đủ nguồn lực. |
| **F12.1** | **Tích điểm khách hàng (Loyalty Points)** | Tích lũy điểm thưởng sau mỗi đơn hàng hoàn tất để đổi voucher giảm giá cho các lần mua sau (tách từ `F12`). | `Customer`, `Admin` | **Loại khỏi phiên bản đầu** | • Đưa ra khỏi phạm vi phiên bản đầu do phát sinh nhiều quy tắc cộng, sử dụng và hoàn điểm khi hủy đơn; nhóm chỉ giữ chức năng mã giảm giá cơ bản. |
| **F12.2** | **Trò chuyện trực tiếp (Live Chat)** | Khung chat trực tiếp theo thời gian thực trên website giữa khách hàng và cửa hàng (tách từ `F12`). | `Customer`, `Admin` | **Loại khỏi phiên bản đầu** | • Đưa ra khỏi phạm vi phiên bản đầu vì làm tăng công việc lập trình, quản lý hội thoại và kiểm thử; sử dụng biểu mẫu đặt làm, phản hồi báo giá và thông báo trong tài khoản để thay thế. |
## 5. Yêu cầu phi chức năng
1. Giao diện & Trải nghiệm (UI/UX)
- Yêu cầu kĩ thuật cụ thể: Thiết kế phong cách thủ công ấm áp (Pastel/Kem), bố cục rõ ràng, ưu tiên trải nghiệm trên điện thoại (Mobile-first).
- Thước đo/ Tiêu chuẩn nghiệm thu: Hiển thị chuẩn xác, không vỡ khung hình trên tối thiểu 2 kích thước màn hình (Desktop và Smartphone).
2. Hiệu năng & Phản hồi-
- Yêu cầu kĩ thuật cụ thể: Tối ưu hóa dung lượng hình ảnh sản phẩm móc len và tốc độ phản hồi khi lọc dữ liệu.
- Thước đo/ Tiêu chuẩn nghiệm thu: Thời gian tải trang dưới 3 giây; thao tác cộng tiền trong công cụ 'Tạo giỏ quà' cập nhật tức thì (Real-time UI).
3. Bảo mật & Phân quyền
- Yêu cầu kĩ thuật cụ thể: Bảo vệ thông tin tài khoản khách hàng và kiểm soát chặt quyền truy cập trang quản trị.
- Thước đo/ Tiêu chuẩn nghiệm thu: Mật khẩu lưu trữ phải được mã hóa (Hashing); chặn truy cập trái phép vào URL của Admin; kiểm tra dữ liệu đầu vào (Validation).
4. Khả năng tương thích
- Yêu cầu kĩ thuật cụ thể: Hoạt động ổn định trên các môi trường trình duyệt web thông dụng hiện nay.
- Thước đo/ Tiêu chuẩn nghiệm thu: Chạy mượt mà trên Google Chrome, Safari, Microsoft Edge và Firefox mà không phát sinh lỗi giao diện.



## 6. Giới hạn và giả định
Nêu giới hạn thời gian, công nghệ và nguồn lực.
