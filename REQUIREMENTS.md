# Requirements

## 1. Mục tiêu dự án
*Mục tiêu kinh doanh: Phân phối sản phẩm móc len handmade (làm sẵn, giỏ quà theo ngân sách, đặt làm theo mẫu).
*Giá trị mang lại cho khách hàng: Giải quyết bài toán chọn quà theo chi phí của giới trẻ và chuẩn hóa quản lý đơn thủ công cho shop.

## 2. Phạm vi
### Trong phạm vi
*Phân hệ khách hàng: Tài khoản, Danh mục sản phẩm, Tạo giỏ quà theo ngân sách, Form đặt mẫu riêng, Giỏ hàng & Thanh toán giả lập (COD/QR)
*Phân hệ quản trị (Admin): CRUD sản phẩm & danh mục, duyệt/báo giá yêu cầu custom, cập nhật tiến độ gia công đơn hàng, thống kê cơ bản.

### Ngoài phạm vi
*Tích hợp bên thứ ba: Cổng thanh toán thật trên môi trường Production như VNPay, MoMo, Stripe và API vận chuyển tự động như GHN, Viettel Post. Hệ thống chỉ sử dụng thanh toán giả lập hoặc cổng thanh toán trên môi trường thử nghiệm (Sandbox).
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
    + Quản lý hồ sơ cá nhân, sổ địa chỉ, danh sách yêu thích (Wishlist) (nếu F27 được triển khai)
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

| Mã CN | Tên chức năng | Mô tả chi tiết nghiệp vụ | Người sử dụng | Mức độ ưu tiên | Tiêu chí nghiệm thu |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **F01** | **Đăng ký, đăng nhập và đăng xuất** | Hỗ trợ tạo tài khoản khách hàng mới, xác thực phiên đăng nhập theo vai trò và đăng xuất an toàn. | Tất cả (`Guest`, `Customer`, `Admin`) | **Bắt buộc** | • Người dùng đăng ký bằng thông tin hợp lệ và đăng nhập đúng vai trò.<br>• Thông tin sai không tạo phiên đăng nhập; mật khẩu được băm bằng cơ chế của framework.<br>• Giỏ hàng tạm thời của Guest được giữ nguyên sau khi đăng nhập. |
| **F02** | **Quản lý hồ sơ và sổ địa chỉ** | Cho phép khách hàng xem, cập nhật thông tin cá nhân và quản lý danh sách địa chỉ nhận hàng. | `Customer` | **Bắt buộc** | • Khách xem, thêm và sửa thông tin cá nhân, địa chỉ nhận hàng của chính mình.<br>• Hệ thống kiểm tra quyền ở máy chủ: khách không truy cập được hồ sơ hoặc địa chỉ của khách khác (kể cả khi đổi ID trên URL). |
| **F03** | **Xem danh mục sản phẩm** | Hiển thị danh sách sản phẩm móc len hoàn thiện theo từng nhóm danh mục (móc khóa, thú len, hoa len, phụ kiện). | `Guest`, `Customer` | **Bắt buộc** | • Hiển thị đầy đủ danh sách sản phẩm theo danh mục với ảnh thống nhất tỷ lệ, tên, giá hoặc *"Liên hệ báo giá"*.<br>• Thể hiện rõ nhãn tình trạng (*"Còn hàng"* / *"Hết hàng"*) và khả năng nhận đặt làm (*"Có sẵn"* / *"Nhận đặt làm"*). |
| **F04** | **Tìm kiếm, lọc và sắp xếp sản phẩm** | Hỗ trợ tìm sản phẩm theo từ khóa, kết hợp lọc đa tiêu chí và sắp xếp danh sách kết quả. | `Guest`, `Customer` | **Bắt buộc** | • Tìm kiếm đúng theo tên/từ khóa; lọc kết hợp theo tối thiểu 5 thuộc tính: loại sản phẩm, màu sắc, chất liệu, kích thước, khoảng giá (và khả năng đặt làm).<br>• Hỗ trợ sắp xếp (giá, mới nhất), nút xóa bộ lọc và hiển thị thông báo rõ ràng khi không có kết quả. |
| **F05** | **Xem chi tiết sản phẩm** | Cung cấp thông tin chi tiết của từng mẫu sản phẩm làm sẵn hoặc mẫu nhận đặt làm. | `Guest`, `Customer` | **Bắt buộc** | • Hiển thị hình ảnh đa góc độ, mô tả, chất liệu, kích thước, màu sắc, biến thể, giá bán và số lượng tồn kho.<br>• Hiển thị rõ thời gian xử lý dự kiến (tách biệt với thời gian vận chuyển) và gợi ý sản phẩm liên quan. |
| **F06** | **Gợi ý bộ quà theo ngân sách** | Đề xuất các bộ quà cấu hình sẵn phù hợp với hạn mức chi tiêu cụ thể do khách hàng nhập vào. | `Guest`, `Customer` | **Bắt buộc** | • Khách nhập số tiền ngân sách cụ thể (chỉ tính trên tổng giá sản phẩm).<br>• Hệ thống truy vấn và hiển thị các bộ quà cấu hình sẵn có tổng giá thành phần nằm trong ngân sách và tất cả thành phần đều còn bán.<br>• Thông báo rõ nếu chưa có bộ quà phù hợp để khách đổi mức chi tiêu. |
| **F07** | **Điều chỉnh thành phần bộ quà** | Cho phép khách hàng tùy chỉnh các món hàng làm sẵn bên trong bộ quà đã chọn. | `Guest`, `Customer` | **Bắt buộc** | • Cho phép đổi món, tăng/giảm số lượng hoặc bỏ bớt món trong phạm vi hàng còn tồn kho.<br>• Sau mỗi thao tác, hệ thống tính lại tổng giá bộ quà và hiển thị chính xác số tiền còn dư hoặc phần vượt ngân sách để khách điều chỉnh trước khi thêm vào giỏ. |
| **F08** | **Quản lý giỏ hàng** | Quản lý danh sách sản phẩm lẻ và các bộ quà đã cấu hình trước khi tiến hành đặt mua. | `Guest`, `Customer` | **Bắt buộc** | • Cho phép thêm mới, tăng/giảm số lượng, xóa riêng từng sản phẩm lẻ hoặc xóa nguyên một bộ quà mà không làm mất các mục khác.<br>• Kiểm tra tồn kho gộp trên tổng số lượng của cùng một biến thể xuất hiện ở cả hàng mua lẻ và bên trong các bộ quà. |
| **F09** | **Đặt hàng và tính tổng thanh toán** | Thiết lập thông tin giao nhận, áp dụng mã giảm giá và tổng hợp bảng chi phí đơn hàng mua sẵn. | `Customer` | **Bắt buộc** | • Khách chọn địa chỉ nhận hàng, phương thức giao và nhập mã voucher.<br>• Máy chủ kiểm tra lại giá hiện hành, tồn kho, điều kiện voucher và hiển thị tách biệt: tiền hàng, mức giảm giá, phí vận chuyển và tổng thanh toán cuối cùng. |
| **F10** | **Thanh toán qua cổng thử nghiệm (Sandbox)** | Tích hợp cổng thanh toán môi trường Sandbox để xử lý giao dịch thanh toán đơn mua sẵn. | `Customer` | **Bắt buộc** | • Tạo giao dịch và nhận kết quả trả về từ cổng Sandbox; xử lý đúng các trường hợp thành công, thất bại hoặc khách hủy.<br>• Kiểm tra mã giao dịch, số tiền và chữ ký xác thực; một giao dịch thành công chỉ được ghi nhận đúng một lần (chống trùng lặp IPN/Callback). |
| **F11** | **Xem lịch sử và theo dõi đơn mua sẵn** | Hiển thị danh sách đơn hàng làm sẵn đã đặt và chi tiết trạng thái xử lý, thanh toán, vận chuyển. | `Customer` | **Bắt buộc** | • Khách chỉ xem được đơn thuộc tài khoản của mình.<br>• Hiển thị đầy đủ sản phẩm, đơn giá tại thời điểm chốt đơn, trạng thái thanh toán tách biệt với trạng thái xử lý đơn (*Chờ xử lý -> Đã xác nhận -> Đang chuẩn bị -> Đóng gói -> Giao hàng -> Hoàn thành / Đã hủy*). |
| **F12** | **Đặt làm theo mẫu có tùy chọn niêm yết** | Cho phép khách chọn mẫu cửa hàng hỗ trợ kèm các tùy chọn cá nhân hóa đã có bảng giá cố định. | `Customer` | **Bắt buộc** | • Khách chọn mẫu gốc và các tùy chọn được hỗ trợ (màu sắc, kích thước theo mẫu), xem tổng tiền dự kiến theo giá niêm yết.<br>• Hệ thống lưu yêu cầu nhưng chưa cho thanh toán cọc ngay; chỉ mở bước đặt cọc sau khi cửa hàng xác nhận khả năng nhận làm và thời gian hoàn thành. |
| **F13** | **Gửi yêu cầu đặt làm riêng cần báo giá** | Tiếp nhận các yêu cầu tùy chỉnh ngoài bảng giá sẵn hoặc có ảnh tham khảo riêng của khách. | `Customer` | **Bắt buộc** | • Biểu mẫu lưu đầy đủ: mẫu gốc (nếu có), màu sắc, kích thước, nội dung thêm, ảnh tham khảo hợp lệ (đúng định dạng/dung lượng), số lượng, ngày mong muốn nhận và ghi chú.<br>• Tạo mã yêu cầu với trạng thái *"Chờ cửa hàng xem xét"*. |
| **F14** | **Xem xét và báo giá yêu cầu đặt làm** | Hỗ trợ cửa hàng thẩm định khả năng thực hiện và lập báo giá phản hồi cho khách hàng. | `Admin` | **Bắt buộc** | • Cho phép chuyển trạng thái *"Cần bổ sung thông tin"*, *"Bị từ chối"* (kèm lý do) hoặc lập báo giá.<br>• Báo giá lưu rõ: phiên bản báo giá, mức giá, thời gian dự kiến hoàn thành/giao hàng, số tiền cọc yêu cầu và thời hạn hiệu lực của báo giá. |
| **F15** | **Chấp nhận hoặc từ chối báo giá** | Cho phép khách hàng xem nội dung báo giá từ cửa hàng và xác nhận quyết định. | `Customer` | **Bắt buộc** | • Khách xem đúng phiên bản báo giá hiện hành còn hiệu lực.<br>• Nếu từ chối: cập nhật *"Báo giá bị từ chối"* và kết thúc.<br>• Nếu chấp nhận: khóa nội dung đã chốt và chuyển sang một đơn chờ đặt cọc duy nhất (bấm nhiều lần không tạo đơn trùng; nếu shop vừa sửa báo giá thì yêu cầu khách xem lại). |
| **F16** | **Thanh toán và ghi nhận tiền đơn đặt làm** | Thực hiện thanh toán tiền đặt cọc qua cổng thử nghiệm và ghi nhận khoản tiền còn lại của đơn đặt làm đã chốt báo giá. | `Customer` | **Bắt buộc** | • Chỉ cho phép thanh toán tiền đặt cọc khi đơn đang ở trạng thái “Chờ đặt cọc” và báo giá còn hiệu lực.<br>• Khi giao dịch đặt cọc thành công, hệ thống cập nhật trạng thái thanh toán thành “Đã đặt cọc”, đồng thời lưu số tiền đã thu và số tiền còn lại phải trả.<br>• Admin có thể ghi nhận khoản tiền còn lại khi giao hàng hoặc hoàn thành đơn; trạng thái chỉ chuyển thành “Đã thanh toán đủ” khi tổng số tiền hợp lệ đã thu bằng tổng giá trị đơn.<br>• Mỗi giao dịch phải lưu mã giao dịch, số tiền, thời gian và phương thức thanh toán; một giao dịch thành công chỉ được ghi nhận một lần. |
| **F17** | **Theo dõi tiến độ đơn đặt làm** | Hiển thị tiến trình gia công thực tế, mốc thời gian dự kiến và lịch sử cập nhật của đơn đặt làm. | `Customer`, `Admin` | **Bắt buộc** | • Hiển thị rõ ngày khách mong muốn nhận, ngày cửa hàng dự kiến hoàn thành và lịch sử chuyển trạng thái (*Chờ sản xuất -> Đang móc len -> Đóng gói -> Giao hàng -> Hoàn thành*) kèm thời gian và người cập nhật.<br>• Khi cửa hàng thay đổi thời hạn dự kiến, hệ thống ghi nhận và hiển thị thông báo trong tài khoản khách. |
| **F18** | **Đánh giá và nhận xét sản phẩm** | Cho phép khách hàng chấm sao và viết đánh giá sau khi đã nhận hàng thành công. | `Customer` | **Nên có** | • Chỉ khách hàng có đơn ở trạng thái đã nhận hàng (*"Hoàn thành"*) mới được gửi đánh giá cho sản phẩm trong đơn đó (đơn chưa nhận hoặc đã hủy bị từ chối).<br>• Hiển thị điểm sao và nội dung nhận xét an toàn (chống XSS); chưa triển khai tải ảnh đánh giá ở phiên bản đầu. |
| **F19** | **Quản lý sản phẩm, danh mục và biến thể** | Cung cấp công cụ CRUD danh mục, sản phẩm móc len, biến thể và cấu hình tùy chọn đặt làm. | `Admin` | **Bắt buộc** | • Thêm, sửa, ẩn/ngừng bán danh mục, sản phẩm và các biến thể (màu, kích thước, giá).<br>• Việc chỉnh sửa giá, tên hoặc ngừng bán sản phẩm không làm thay đổi thông tin và đơn giá đã lưu trong các đơn hàng cũ. |
| **F20** | **Quản lý tồn kho** | Theo dõi và kiểm soát số lượng tồn kho của từng biến thể sản phẩm làm sẵn. | `Admin` | **Bắt buộc** | • Cập nhật tồn kho theo từng biến thể sản phẩm.<br>• Trừ/giữ tồn và giải phóng tồn đúng quy tắc khi đặt hàng, hủy đơn hoặc nhận hàng hoàn; đồng bộ tồn kho giữa bán lẻ và thành phần trong bộ quà. |
| **F21** | **Quản lý bộ quà cấu hình sẵn** | Tạo và quản lý các mẫu bộ quà để phục vụ chức năng gợi ý theo ngân sách. | `Admin` | **Bắt buộc** | • Cho phép tạo bộ quà mới, chọn các sản phẩm/biến thể thành phần, định nghĩa số lượng từng món và bật/tắt trạng thái hiển thị.<br>• Giá bộ quà được tính nhất quán từ giá các thành phần hiện hành. |
| **F22** | **Quản lý đơn hàng mua sẵn** | Tiếp nhận, xử lý quy trình chuẩn bị hàng, giao nhận và các trường hợp ngoại lệ của đơn mua sẵn. | `Admin` | **Bắt buộc** | • Xem danh sách, lọc và cập nhật trạng thái đơn mua sẵn theo đúng trình tự nghiệp vụ.<br>• Hỗ trợ xử lý yêu cầu hủy đơn, ghi nhận giao hàng thất bại và hoàn hàng theo chính sách (không tự động chuyển đơn giao lỗi sang Hoàn thành). |
| **F23** | **Quản lý yêu cầu và đơn đặt làm** | Quản lý toàn bộ vòng đời của đơn Custom Order từ lúc tiếp nhận yêu cầu đến khi hoàn tất. | `Admin` | **Bắt buộc** | • Quản lý danh sách yêu cầu, lịch sử các phiên bản báo giá, trạng thái đặt cọc, tiến độ sản xuất (*"Đang móc len"*), giao nhận và thu phần tiền còn lại.<br>• Lưu vết người thực hiện và thời gian cho mọi thay đổi trạng thái quan trọng. |
| **F24** | **Quản lý khuyến mãi và Voucher** | Thiết lập và kiểm soát các mã giảm giá áp dụng trong quá trình đặt hàng. | `Admin` | **Bắt buộc** | • Tạo, sửa, bật/tắt mã voucher với các thông số: mức giảm (% hoặc tiền mặt), thời gian hiệu lực, giá trị đơn tối thiểu và giới hạn số lần sử dụng.<br>• Hệ thống tự động từ chối mã hết hạn, hết lượt hoặc đơn không đủ điều kiện khi kiểm tra ở máy chủ. |
| **F25** | **Quản lý người dùng và phân quyền** | Kiểm soát danh sách tài khoản khách hàng, nhân viên và cấp quyền truy cập hệ thống. | `Admin` | **Bắt buộc** | • Xem danh sách người dùng, khóa/mở khóa tài khoản vi phạm và phân quyền vai trò (`Customer`, `Admin`).<br>• Các route và API quản trị kiểm tra chặt vai trò ở phía máy chủ. |
| **F26** | **Thống kê hoạt động cửa hàng** | Tổng hợp các chỉ số vận hành và doanh thu phục vụ quản trị cửa hàng. | `Admin` | **Bắt buộc** | • Hiển thị thống kê theo khoảng thời gian: tổng số đơn, sản phẩm bán chạy, số khách hàng, đơn chờ xử lý/chờ giao.<br>• Phân biệt rõ giá trị đơn hàng, khoản tiền thực thu (tiền cọc, tiền đã thanh toán đủ) và đơn đã hủy để không tính trùng doanh thu. |
| **F27** | **Danh sách yêu thích (Wishlist)** | Lưu lại các mẫu sản phẩm móc len yêu thích vào tài khoản cá nhân để xem lại sau. | `Customer` | **Tùy chọn (Phát triển sau)** | • Khách đã đăng nhập có thể thêm/xóa sản phẩm khỏi danh sách yêu thích và chuyển nhanh sang trang chi tiết.<br>• Chỉ triển khai khi nhóm đã hoàn thành và kiểm thử xong toàn bộ các chức năng Bắt buộc (`F01`–`F26`). |
## 5. Yêu cầu phi chức năng


| Mã | Nhóm yêu cầu | Nội dung và tiêu chí nghiệm thu |
| :---: | :--- | :--- |
| **NF01** | Giao diện | Sử dụng được trên desktop và smartphone; không tràn hoặc che khuất nội dung tại các kích thước nhóm chọn để kiểm thử. |
| **NF02** | Bảo mật tài khoản | Mật khẩu được băm bằng cơ chế của framework; trang và API quản trị kiểm tra vai trò ở phía máy chủ. |
| **NF03** | Quyền riêng tư | Người dùng chỉ truy cập hồ sơ, địa chỉ, yêu cầu và đơn của mình, kể cả khi thay đổi ID trên URL hoặc request. |
| **NF04** | Tính đúng đắn của giá | Máy chủ tính lại giá, tồn kho, voucher, phí và tổng tiền; không sử dụng trực tiếp tổng tiền do giao diện gửi lên. |
| **NF05** | Tải ảnh | Chỉ chấp nhận định dạng và dung lượng quy định; đổi tên file khi lưu và kiểm soát quyền truy cập. |
| **NF06** | Thanh toán | Kiểm tra mã giao dịch, số tiền và trạng thái; một giao dịch thành công chỉ được ghi nhận một lần. |
| **NF07** | Hiệu năng | Xác định trang, thiết bị, mạng và lượng dữ liệu dùng để đo; không sử dụng tiêu chí chung chung như chạy mượt. |
| **NF08** | Tương thích | Kiểm thử trên phiên bản Chrome, Edge và trình duyệt di động do nhóm thống nhất. |
| **NF09** | Lưu vết | Các thay đổi quan trọng đối với báo giá, thanh toán và trạng thái đơn lưu thời gian và người thực hiện. |



## 6. Giới hạn và giả định
Giới hạn về Thời gian, Công nghệ và Nguồn lực

### 1. Giới hạn về Thời gian (Timeline Constraints)
- **Thời gian thực hiện:** Kéo dài gần 2 tháng (từ ngày 20/10/2026 đến ngày 17/12/2026).
- **Phạm vi MVP:** Tập trung vào các luồng nghiệp vụ lõi gồm mua sản phẩm làm sẵn, tạo giỏ quà theo ngân sách, đặt làm theo mẫu (Custom Order) và quản trị hệ thống cơ bản.
- **Các tính năng loại bỏ/hoãn:** Không đủ thời gian phát triển hệ thống tích điểm thành viên (Loyalty), khung chat trực tiếp thời gian thực (Live Chat qua WebSocket), hay mô phỏng 3D sản phẩm/hộp quà.

### 2. Giới hạn về Công nghệ (Technology Constraints)
- **Tech Stack:** Frontend (HTML5, CSS3, JavaScript thuần, Tailwind CSS), Backend (Node.js, Express.js), Database (MongoDB, Mongoose ODM), Quản lý mã nguồn (Git & GitHub).
- **Thanh toán:** Không tích hợp cổng thanh toán quốc tế phức tạp (Stripe/VNPay thật); chỉ áp dụng thanh toán giả lập (COD, chuyển khoản QR mẫu) hoặc tích hợp cổng Sandbox cơ bản.
- **Vận chuyển & AI:** Không kết nối API vận chuyển tự động bên thứ ba (GHN/ViettelPost); không sử dụng AI để tự động sinh mẫu sản phẩm hoặc định giá từ ảnh.

### 3. Giới hạn về Nguồn lực (Resource Constraints)
- **Quy mô & Năng lực:** Nhóm gồm 07 thành viên với trình độ kỹ thuật ở mức sinh viên học phần thương mại điện tử, phân chia các mô-đun qua GitHub.
- **Phạm vi dữ liệu:** Dữ liệu mẫu giới hạn trong phạm vi một cửa hàng thủ công độc lập (khoảng 15–20 sản phẩm tiêu biểu, chia thành 3–4 danh mục chính), không vận hành theo mô hình sàn thương mại điện tử nhiều người bán (Multi-vendor).
