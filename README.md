# Website kinh doanh sản phẩm móc len handmade

Đồ án học phần **Phát triển ứng dụng TMĐT — Nhóm 7, ST5**.

## 1. Giới thiệu

Dự án xây dựng website cho một cửa hàng kinh doanh sản phẩm móc len handmade, gồm móc khóa, thú len, hoa len và phụ kiện nhỏ. Website phục vụ ba nhu cầu chính: mua sản phẩm làm sẵn, lựa chọn bộ quà theo ngân sách và đặt làm theo mẫu hoặc yêu cầu riêng.

Khách mua quà thường cần cân đối chi phí, chọn các món phù hợp và biết rõ tổng tiền trước khi đặt hàng. Với sản phẩm đặt làm, khách và cửa hàng cần thống nhất mẫu, tùy chọn, giá, thời gian thực hiện và tiền đặt cọc. Website tập trung giải quyết những nhu cầu này, đồng thời hỗ trợ cửa hàng quản lý sản phẩm, tồn kho, báo giá và tiến độ xử lý đơn.

Điểm riêng của đề tài là công cụ gợi ý bộ quà cấu hình sẵn theo số tiền khách nhập. Khách được đổi món, thay số lượng hoặc bỏ món; hệ thống tính lại tổng tiền và thông báo phần vượt ngân sách. Ngân sách tính trên tiền sản phẩm, tách riêng phí vận chuyển. Hàng làm sẵn và hàng đặt làm được xử lý thành hai luồng đơn hàng riêng trong phiên bản đầu.

Repository hiện phục vụ giai đoạn khảo sát, xác định yêu cầu và lập kế hoạch Chương 1. Các chức năng dưới đây là phạm vi phát triển; trạng thái thực hiện được cập nhật trong kế hoạch và GitHub Issues.

## 2. Khách hàng mục tiêu và vai trò sử dụng

Khách hàng mục tiêu là sinh viên và người đi làm trẻ tại Việt Nam có nhu cầu mua sản phẩm móc len cho bản thân hoặc làm quà tặng.

Hệ thống xác định ba vai trò theo [REQUIREMENTS.md](REQUIREMENTS.md):

| Vai trò | Phạm vi sử dụng |
| --- | --- |
| Khách chưa đăng nhập — Guest | Xem, tìm kiếm và lọc sản phẩm; xem chi tiết; nhận gợi ý, điều chỉnh bộ quà và sử dụng giỏ hàng tạm. |
| Khách hàng — Customer | Quản lý hồ sơ, địa chỉ; đặt mua, thanh toán, theo dõi đơn; gửi yêu cầu đặt làm, xác nhận báo giá và đặt cọc. Chỉ truy cập dữ liệu của mình. |
| Quản trị viên — Admin | Quản lý hàng hóa, tồn kho, bộ quà, đơn mua, yêu cầu đặt làm, báo giá, tài khoản, voucher và thống kê. |

Các chức năng được sử dụng theo mức ưu tiên và quyền hạn ghi trong tài liệu yêu cầu; việc có tên trong bảng quyền không có nghĩa chức năng tùy chọn đã được triển khai.

## 3. Chức năng chính

### 3.1. Phạm vi bắt buộc

| Nhóm chức năng | Nội dung | Mã yêu cầu |
| --- | --- | --- |
| Tài khoản và phân quyền | Đăng ký, đăng nhập, đăng xuất; quản lý hồ sơ, sổ địa chỉ và quyền truy cập dữ liệu. | F01, F02, F25 |
| Tra cứu sản phẩm | Xem danh mục và chi tiết, sản phẩm liên quan; tìm kiếm, sắp xếp, lọc theo loại, màu, chất liệu, kích thước, khoảng giá và khả năng đặt làm. | F03–F05 |
| Bộ quà theo ngân sách | Nhập ngân sách; gợi ý bộ quà cấu hình sẵn; đổi món, thay số lượng, bỏ món; tính lại giá và kiểm tra tồn kho; quản trị các bộ quà mẫu. | F06, F07, F21 |
| Giỏ hàng và đơn mua sẵn | Thêm, sửa, xóa sản phẩm lẻ hoặc nguyên bộ quà; kiểm tra tồn kho gộp theo biến thể; đặt hàng, tính phí vận chuyển, áp dụng voucher, lưu lịch sử và quản lý trạng thái đơn. | F08, F09, F11, F22 |
| Thanh toán thử nghiệm | Tích hợp cổng thanh toán Sandbox cho đơn mua sẵn và tiền đặt cọc; kiểm tra kết quả, số tiền, mã giao dịch và tránh ghi nhận trùng. COD hỗ trợ theo chính sách cửa hàng; không thay thế tích hợp Sandbox. | F10, F16 |
| Đặt làm và báo giá | Đặt theo mẫu có tùy chọn giá niêm yết hoặc gửi yêu cầu riêng; cửa hàng xem xét khả năng làm, xác nhận thời gian hoặc lập báo giá; khách chấp nhận/từ chối, đặt cọc và theo dõi tiến độ. Ghi nhận phần tiền còn lại theo quy trình. | F12–F17, F23 |
| Vận hành cửa hàng | Quản lý sản phẩm, danh mục, biến thể, tồn kho, voucher và thống kê; lưu thông tin đơn tại thời điểm chốt và phân biệt giá trị đơn với tiền thực thu. | F19, F20, F24, F26 |

Các yêu cầu về giao diện, bảo mật, quyền riêng tư, dữ liệu tải lên và tính đúng đắn của giao dịch được quy định tại NF01–NF06.

### 3.2. Chức năng ưu tiên sau các phần bắt buộc

- **F18 — Đánh giá và nhận xét:** mức ưu tiên **Nên có**; chấm sao và nhận xét chữ sau khi hoàn thành đơn, chưa hỗ trợ tải ảnh đánh giá.
- **F27 — Danh sách yêu thích:** phần phát triển sau, chỉ triển khai khi các chức năng cần ưu tiên đã hoàn thành và được kiểm thử theo kế hoạch nhóm.

### 3.3. Ngoài phạm vi phiên bản đầu

AI tự sinh mẫu hoặc định giá từ ảnh; mô phỏng 3D; Live Chat thời gian thực; tích điểm; ảnh đánh giá; cấu hình chi tiết bao bì; gộp hàng làm sẵn và đặt làm trong cùng lần thanh toán; API vận chuyển tự động; cổng thanh toán quốc tế thật; ứng dụng di động độc lập; mô hình sàn nhiều người bán và đơn B2B.

Danh sách chức năng, mức ưu tiên và tiêu chí nghiệm thu chi tiết được quản lý trong [REQUIREMENTS.md](REQUIREMENTS.md). Mọi thay đổi phạm vi phải được nhóm thống nhất và cập nhật đồng thời vào tài liệu yêu cầu, [quy trình nghiệp vụ](docs/business-workflow.md) và [kế hoạch thực hiện](PROJECT_PLAN.md).

## 4. Thành viên và phân công

| Họ và tên | Vai trò phát triển | Công việc Chương 1 |
| --- | --- | --- |
| Nguyễn Quang Đức | Trưởng nhóm; bộ quà theo ngân sách; tổng hợp báo cáo và trực tiếp nộp bài. | T01, T07; tạo repository, cấp quyền và kiểm tra bản cuối. |
| Đặng Đình Quyến | Thiết kế giao diện chung; trang chủ, danh mục, chi tiết, tìm kiếm, lọc và kiểm tra hiển thị. | T02; kiểm tra, góp ý T05. |
| Trần Quốc Bảo | Giỏ hàng, phí vận chuyển, đặt hàng, lịch sử và quản lý đơn mua sẵn. | Phụ trách T05; kiểm tra chéo kết quả T03–T04 của Tuấn. |
| Nguyễn Anh Tuấn | Đặt làm, báo giá, tiến độ; chuẩn bị slide và kịch bản demo. | Phụ trách T03 và T04; cung cấp kết quả phân tích và phản biện cho T05. |
| Đỗ Trọng Khanh | Tài khoản, phân quyền và tích hợp thanh toán Sandbox. | Phụ trách T06; đã hoàn thành mô tả và sơ đồ quy trình nghiệp vụ. |
| Nguyễn Thanh Nam | Dữ liệu, sản phẩm, tồn kho; hỗ trợ Git; điều phối tích hợp và triển khai. | T08; hỗ trợ các thành viên tại T09. |
| Nguyễn Đình Châu | Khung quản trị, voucher, thống kê; điều phối kiểm thử và tổng hợp nhật ký AI. | Tổng hợp nhật ký AI tại T10; tổng kiểm tra hồ sơ tại T11. |

Mỗi công việc có một người chịu trách nhiệm chính và đầu ra cụ thể. Các thành viên trực tiếp lập trình, tự kiểm tra, cập nhật tài liệu và giải thích được phần mình phụ trách. Người làm sản phẩm, tài khoản, đơn hàng và đặt làm cung cấp chức năng quản trị tương ứng; Nam điều phối tích hợp và Châu điều phối kiểm thử, các PIC vẫn tự kết nối và sửa phần mình.

Tuấn đã hoàn thành T03–T04, Bảo đã hoàn thành nội dung T05 và Khanh đã hoàn thành mô tả cùng sơ đồ T06. Các phần còn lại được kiểm tra theo trạng thái trong [PROJECT_PLAN.md](PROJECT_PLAN.md); chưa coi toàn bộ hồ sơ Chương 1 đã hoàn tất chỉ vì các file đã được tạo.

## 5. Công nghệ sử dụng

| Thành phần | Công nghệ |
| --- | --- |
| Frontend | HTML5, CSS3, JavaScript thuần và Tailwind CSS |
| Backend | Node.js và Express.js |
| Cơ sở dữ liệu | MongoDB và Mongoose |
| Công cụ | Visual Studio Code, npm, Git, GitHub Issues và Pull Request |
| Triển khai | Chưa lựa chọn nền tảng; nhóm quyết định khi chuẩn bị triển khai |

Express phục vụ giao diện và API trong cùng dự án. Máy chủ kiểm tra quyền truy cập, dữ liệu đầu vào, giá, tồn kho, voucher, phí và trạng thái giao dịch trước khi lưu dữ liệu. Phiên bản thư viện được thống nhất khi khởi tạo môi trường và ghi trong `package.json`, `package-lock.json` cùng hướng dẫn chạy.

Tại giai đoạn Chương 1, repository lưu hồ sơ khảo sát và kế hoạch. Hướng dẫn cài đặt, lệnh chạy, cấu hình dữ liệu mẫu, liên kết website và tài khoản demo sẽ được bổ sung khi có mã nguồn và bản triển khai thực tế.

## 6. Kế hoạch thực hiện

| Giai đoạn | Nội dung chính | Mốc bàn giao |
| --- | --- | --- |
| 1. Khảo sát và xác định yêu cầu | Chọn đề tài, khảo sát website, phân tích và phản biện bằng AI; xác định yêu cầu, quy trình, phân công và hồ sơ GitHub. | M1 |
| 2. Thiết kế giao diện và hệ thống | Chuẩn bị môi trường; chốt quy tắc nghiệp vụ, dữ liệu và giao diện; chạy thử kết nối. | M2 |
| 3. Xây dựng frontend | Các PIC làm giao diện phần mình theo thiết kế chung và kết nối dữ liệu. | M3–M4 |
| 4. Phát triển backend và cơ sở dữ liệu | Xử lý nghiệp vụ, phân quyền, dữ liệu, bộ quà, đặt làm và thanh toán Sandbox. | M3–M4 |
| 5. Tích hợp và kiểm thử | Kết nối các phần, kiểm thử nghiệp vụ, giao diện, bảo mật và sửa lỗi. | M3–M5 |
| 6. Triển khai và hoàn thiện | Đưa website lên môi trường triển khai, hoàn thiện báo cáo, minh chứng, slide, nộp và bảo vệ. | M5–M7 |

Phân công từng việc, đầu ra, đầu vào, mốc, thời hạn, trạng thái và rủi ro được ghi trong [PROJECT_PLAN.md](PROJECT_PLAN.md). Ngày cụ thể của M2–M5 chờ nhóm thống nhất; các mốc này chưa phải lịch đã chốt.

Nhóm quản lý công việc tại [GitHub Issues](https://github.com/ptudtmdt-st5-nhom7/crochet-handmade-ecommerce/issues). Mỗi Issue ghi người phụ trách, kết quả cần đạt và tiêu chí hoàn thành; người thực hiện cập nhật kết quả và nhờ kiểm tra chéo trước khi đóng việc.

## 7. Tài liệu dự án

| Tài liệu | Nội dung |
| --- | --- |
| [REQUIREMENTS.md](REQUIREMENTS.md) | Mục tiêu, phạm vi, vai trò, yêu cầu chức năng và tiêu chí nghiệm thu. |
| [PROJECT_PLAN.md](PROJECT_PLAN.md) | Thành viên, vai trò, giai đoạn, phân công, tiến độ và rủi ro. |
| [AGENTS.md](AGENTS.md) | Quy tắc dùng AI và phối hợp trong repository. |
| [AI_USAGE_LOG.md](AI_USAGE_LOG.md) | Thông tin sử dụng AI thực tế, kết quả được giữ/sửa/bỏ và người kiểm tra. |
| [docs/competitor-analysis.md](docs/competitor-analysis.md) | Khảo sát và so sánh tối thiểu ba website tương tự. |
| [docs/business-workflow.md](docs/business-workflow.md) | Mô tả và sơ đồ quy trình nghiệp vụ. |

Thành viên nào sử dụng AI thì ghi lại công cụ, mục đích, prompt chính và cách kiểm tra kết quả; Châu tổng hợp vào nhật ký chung. Nội dung dùng trong bài phải được người phụ trách đọc, kiểm tra và giải thích được. Nhóm trưởng Nguyễn Quang Đức kiểm tra bản cuối và trực tiếp nộp bài.

