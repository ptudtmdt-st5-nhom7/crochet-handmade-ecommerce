# Kế hoạch thực hiện đồ án Nhóm 7

**Học phần:** Phát triển ứng dụng TMĐT — ST5.

**Đề tài:** Website kinh doanh sản phẩm móc len handmade hỗ trợ đặt làm theo mẫu và tạo giỏ quà theo ngân sách.

## 1. Thành viên và vai trò

| **Họ và tên** | **Vai trò phát triển** | **Trách nhiệm Chương 1** |
| --- | --- | --- |
| Nguyễn Quang Đức | **Điều phối nhóm:** chia công việc, theo dõi tiến độ, giải quyết những phần các bạn chưa thống nhất và kiểm tra các phần có khớp nhau không.<br><br>**Làm chức năng giỏ quà:** khách nhập ngân sách → website gợi ý một số bộ quà → khách được đổi món, thay số lượng hoặc bỏ món → hệ thống tính lại tiền và báo nếu vượt ngân sách.<br><br>**Tổng hợp báo cáo:** nhận nội dung, hình ảnh và kết quả do từng bạn cung cấp để ghép thành báo cáo chung.<br><br>**Kiểm tra và nộp bài:** xác nhận bản cuối và trực tiếp nộp theo hướng dẫn của thầy. | T01, T07; tạo repository, cấp quyền và kiểm tra cuối |
| Đặng Đình Quyến | **Thiết kế giao diện chung:** thống nhất màu sắc, chữ, nút bấm, thanh menu và cách bố trí để các trang nhìn đồng bộ.<br><br>**Làm trang chủ:** giới thiệu cửa hàng, hiển thị danh mục, sản phẩm nổi bật và voucher đang áp dụng.<br><br>**Làm trang danh mục và chi tiết sản phẩm:** khách xem danh sách sản phẩm, ảnh, giá, mô tả và các lựa chọn.<br><br>**Làm tìm kiếm, sắp xếp và bộ lọc:** chẳng hạn tìm “hoa len”, lọc theo màu, kích thước, chất liệu hoặc giá.<br><br>**Kiểm tra hiển thị:** chỉnh giao diện để dùng được trên máy tính và điện thoại.<br><br>Lưu ý: Quyến chuẩn bị mẫu giao diện chung; các bạn còn lại dựa vào mẫu đó để làm trang thuộc phần mình. | T02; kiểm tra, góp ý T05 |
| Trần Quốc Bảo | **Làm giỏ hàng:** thêm sản phẩm, đổi số lượng, xóa sản phẩm và tính tổng.<br><br>**Làm bước đặt hàng:** khách chọn địa chỉ, cách giao hàng, nhập voucher và xem số tiền phải thanh toán.<br><br>**Tính phí vận chuyển:** áp dụng bảng phí mà nhóm thống nhất và lưu phí vào đơn.<br><br>**Quản lý đơn mua:** tạo đơn, hiển thị lịch sử mua và theo dõi trạng thái xử lý đơn.<br><br>**Kiểm tra trước khi tạo đơn:** sản phẩm còn hàng không, số lượng có hợp lệ không, giá và tổng tiền có đúng không.<br><br>Phối hợp: Bảo dùng dữ liệu sản phẩm của Nam, chức năng voucher của Châu và kết nối thanh toán do Khanh phụ trách. | T05; kiểm tra chéo kết quả T03–T04 |
| Nguyễn Anh Tuấn | **Làm trang đặt làm:** khách chọn mẫu có sẵn và tùy chọn được phép, hoặc gửi yêu cầu riêng.<br><br>**Làm phần xử lý yêu cầu:** cửa hàng xem yêu cầu, xác nhận có làm được không và gửi báo giá, thời gian thực hiện.<br><br>**Làm bước khách chấp nhận báo giá:** lưu nội dung khách đã đồng ý trước khi chuyển sang đặt cọc.<br><br>**Theo dõi tiến độ:** khách xem yêu cầu đang chờ phản hồi, đã xác nhận, đang làm hoặc đã hoàn thành theo quy trình nhóm chốt.<br><br>**Chuẩn bị demo:** tổng hợp kịch bản trình diễn website; phối hợp làm slide và tổ chức tập trình bày.<br><br>Phối hợp: Khanh hỗ trợ kết nối thanh toán tiền cọc; mỗi thành viên tự chuẩn bị cách giải thích phần mình khi demo. | T03 và T04; cung cấp kết quả phân tích, phản biện cho T05 |
| Đỗ Trọng Khanh | **Làm đăng ký, đăng nhập và đăng xuất.**<br><br>**Quản lý thông tin tài khoản:** hồ sơ, địa chỉ và những thông tin cần thiết theo yêu cầu.<br><br>**Phân quyền:** phân biệt khách chưa đăng nhập (Guest), khách hàng (Customer) và quản trị viên (Admin); kiểm tra quyền ở máy chủ và chỉ cho phép truy cập dữ liệu thuộc phạm vi của từng vai trò.<br><br>**Kết nối cổng thanh toán sandbox:** cho phép thử thanh toán trong môi trường thử nghiệm của cổng.<br><br>**Xử lý kết quả thanh toán:** thành công, thất bại hoặc hủy; kiểm tra đúng đơn, đúng số tiền và tránh ghi nhận một giao dịch hai lần.<br><br>Ví dụ: khách A không được mở đơn của khách B bằng cách đổi mã đơn trên đường dẫn. | T06; đã hoàn thành mô tả và sơ đồ quy trình |
| Nguyễn Thanh Nam | **Chuẩn bị cấu trúc dữ liệu chung:** thống nhất cách lưu sản phẩm, người dùng, đơn hàng, bộ quà và yêu cầu đặt làm cùng các bạn phụ trách.<br><br>**Làm phần quản lý sản phẩm:** thêm, sửa, ẩn sản phẩm; quản lý danh mục, biến thể, giá và tồn kho.<br><br>**Cung cấp dữ liệu sản phẩm:** để trang danh mục, giỏ hàng và bộ quà cùng dùng một nguồn dữ liệu.<br><br>**Hỗ trợ Git:** hướng dẫn lấy mã mới, đưa phần đã làm lên GitHub và xử lý khi các bạn sửa trùng nhau.<br><br>**Điều phối kết nối:** hỗ trợ ghép các phần thành website hoạt động chung.<br><br>**Triển khai:** khi nhóm chọn nền tảng, đưa website và cơ sở dữ liệu lên mạng, kiểm tra truy cập.<br><br>Lưu ý: từng bạn vẫn phải tự kết nối và sửa phần mình; Nam hỗ trợ và điều phối việc ghép chung. | T08; hỗ trợ T09 |
| Nguyễn Đình Châu | **Làm khung trang quản trị:** menu và bố cục để người có quyền quản lý cửa hàng.<br><br>**Làm khuyến mãi và voucher:** tạo mã, điều kiện áp dụng, thời hạn và giới hạn sử dụng theo quy tắc nhóm thống nhất.<br><br>**Làm thống kê:** hiển thị doanh thu, số đơn, sản phẩm bán chạy và các số liệu cần quản lý.<br><br>**Chuẩn bị danh sách kiểm thử:** ghi tình huống cần thử, thao tác và kết quả mong đợi.<br><br>**Điều phối kiểm thử:** tổng hợp lỗi, chuyển người phụ trách sửa và kiểm tra lại.<br><br>**Tổng hợp nhật ký AI:** nhận thông tin sử dụng AI thực tế từ các thành viên.<br><br>Lưu ý: người làm sản phẩm, tài khoản, đơn hàng hoặc đặt làm cung cấp phần quản lý tương ứng cho trang quản trị. Châu không phải tự viết toàn bộ các phần đó. | T10 tổng hợp nhật ký AI; T11 tổng kiểm tra |

### 1.1. Nguyên tắc phối hợp

- Mỗi việc có một người phụ trách chính (PIC); người hỗ trợ nhận phần việc rõ ràng. Các công việc dùng chung cả nhóm có một đầu mối điều phối, mỗi người vẫn chịu trách nhiệm phần mình.

- Tất cả thành viên có đóng góp kỹ thuật, tự kiểm tra và giải thích được phần phụ trách. Không giao toàn bộ việc lập trình cho một người hoặc cho AI.

- Các cặp kiểm tra chéo: Đức–Tuấn, Quyến–Nam, Bảo–Khanh; Đức kiểm tra chéo phần tổng hợp của Châu. Nếu người kiểm tra cùng viết phần đó, chọn thêm người khác để kiểm tra.

- Người phụ trách sản phẩm, tài khoản, đơn mua và đặt làm cung cấp xử lý cho màn hình quản trị tương ứng. Châu làm khung quản trị, khuyến mãi, thống kê và điều phối kiểm thử; không viết lại toàn bộ nghiệp vụ của các mảng.

- Nam điều phối dữ liệu, tích hợp và triển khai; từng PIC vẫn tự xây dựng, kết nối và sửa phần mình. Đức điều phối phạm vi và tiến độ, đồng thời trực tiếp làm giỏ quà.

- Phân công phát triển không phải cam kết người đó phải giữ nguyên vai trò đến cuối môn; mọi thay đổi được ghi trong kế hoạch và Issues.

### 1.2. Công nghệ sử dụng

| **Thành phần** | **Công nghệ** |
| --- | --- |
| Frontend | HTML5, CSS3, JavaScript thuần, Tailwind CSS |
| Backend | Node.js và Express.js |
| Database | MongoDB; Mongoose kết nối từ Node.js và định nghĩa schema |
| Công cụ | VS Code, npm, Git, GitHub Issues và Pull Request |
| Triển khai | Chưa lựa chọn nền tảng |

Nền tảng triển khai để nhóm quyết định sau. Phiên bản cụ thể được thống nhất khi chuẩn bị môi trường và lưu trong package.json, package-lock.json cùng hướng dẫn.

Express phục vụ giao diện và API trong cùng dự án. Máy chủ kiểm tra quyền, giá, tồn kho, voucher, phí và trạng thái trước khi lưu MongoDB. Phiên bản cài đặt và thư viện được ghi trong hướng dẫn cùng package-lock.json khi khởi tạo.

### 1.3. Phạm vi chức năng

- Một cửa hàng; hàng làm sẵn, bộ quà cấu hình trước cho phép đổi món, đặt làm theo mẫu có tùy chọn và yêu cầu riêng cần báo giá.

- Mua sẵn và giỏ quà dùng dữ liệu sản phẩm có giá; không ghép hàng làm sẵn và hàng đặt làm vào cùng một đơn trong phiên bản đầu.

- Có ít nhất một gateway/sandbox theo quy định học phần; COD hoặc QR tự mô phỏng chỉ hỗ trợ thử nghiệp vụ, không thay phần tích hợp bắt buộc.

- Có tính phí vận chuyển; API vận chuyển tự động không phải phương án bắt buộc nếu dùng bảng phí có kiểm tra và lưu vào đơn.

- Voucher, quản trị, thống kê, tìm kiếm/lọc và giao diện theo phạm vi tại REQUIREMENTS.md. Đánh giá cơ bản có mức ưu tiên Nên có theo F18; danh sách yêu thích là phần phát triển sau theo F27. Ảnh đánh giá, Live Chat, tích điểm, AI sinh mẫu, 3D và tự báo giá từ ảnh nằm ngoài phiên bản đầu.

- Chốt trước khi lập trình: tỷ lệ hoặc số tiền cọc, hạn cọc và báo giá, thời điểm thu phần còn lại, hủy/hoàn tiền, giữ/giải phóng tồn và quy tắc tính doanh thu. Không tự coi các chính sách này đã được thống nhất.

## 2. Các giai đoạn

| **GĐ** | **Giai đoạn** | **Kết quả** | **Mốc** |
| --- | --- | --- | --- |
| 1 | Khảo sát và xác định yêu cầu | T01 đến T11; xác nhận công nghệ và nội dung hồ sơ | M1 |
| 2 | Thiết kế giao diện và hệ thống | Cài môi trường, thiết kế dữ liệu, quy tắc và giao diện; chạy thử kết nối | M2 |
| 3 | Xây dựng frontend | Từng PIC làm giao diện của phần mình theo bố cục chung | M3 đến M4 |
| 4 | Phát triển backend và cơ sở dữ liệu | Xử lý nghiệp vụ, lưu dữ liệu, phân quyền và tích hợp thanh toán | M3 đến M4 |
| 5 | Tích hợp và kiểm thử | Nối từng phần, kiểm thử chức năng, bảo mật, giao diện và sửa lỗi | M3 đến M5 |
| 6 | Triển khai và hoàn thiện | Triển khai, tài liệu, báo cáo, demo, nộp và bảo vệ | M5 đến M7 |

### 2.1. Các cột mốc

| **Mốc** | **Nội dung** | **Điều kiện** |
| --- | --- | --- |
| M1 | Hoàn thiện hồ sơ Chương 1 | Đủ tài liệu, công nghệ sử dụng, phân công, Issues, lịch sử đóng góp và nhật ký AI; Đức kiểm tra và nộp bài. |
| M2 | Hoàn thiện môi trường và thiết kế | Môi trường chạy theo công nghệ đã chọn; có thiết kế dữ liệu, quy tắc, giao diện và một phần chạy thử nối được giao diện với dữ liệu. |
| M3 | Chạy được luồng mua hàng cơ bản | Tài khoản, danh mục, giỏ hàng và tạo đơn hoạt động cùng nhau trên dữ liệu lưu trữ; có bản thử trên môi trường triển khai. |
| M4 | Hoàn thiện chức năng theo phạm vi | Mua hàng, giỏ quà và đặt làm được kết nối; có thanh toán thử nghiệm, vận chuyển, voucher, quản trị và thống kê. |
| M5 | Hoàn tất kiểm thử và triển khai | Các luồng chính đã được kiểm tra; lỗi ảnh hưởng giao dịch và phân quyền được xử lý; website, dữ liệu mẫu và hướng dẫn sử dụng sẵn sàng. |
| M6 | Chốt và nộp hồ sơ cuối kỳ | Báo cáo Word, mã nguồn, website, minh chứng, bảng đóng góp và phụ lục đã được kiểm tra; Đức trực tiếp nộp trước hạn. |
| M7 | Báo cáo và bảo vệ đồ án | Nhóm thực hiện trình bày, demo và trả lời về phần việc của từng thành viên theo lịch giảng viên. |

## 3. Công việc

### 3.1. Công việc Chương 1

Các thời hạn dưới đây kế thừa bảng phân công đang dùng; đây không phải xác nhận đã hoàn thành đúng hạn. Nếu điều chỉnh, ghi thời hạn mới và lý do bên cạnh mốc ban đầu. Trạng thái chỉ phản ánh nội dung đã quan sát, chưa thay thế kiểm tra của nhóm.

##### T01 Lựa chọn đề tài và xác định vấn đề kinh doanh

**PIC và phối hợp:** Đức

**Kết quả cần đạt:** Mô tả đủ sản phẩm, khách hàng, vấn đề, giải pháp, khác biệt và phạm vi

**Thời hạn:** 09:00 20/10/2026

**Trạng thái:** Có bản No.1; chờ xác nhận và đồng bộ bản cuối

##### T02 Phân tích ít nhất ba website tương tự

**PIC và phối hợp:** Quyến; Nam hỗ trợ cập nhật

**Kết quả cần đạt:** docs/competitor-analysis.md có URL, so sánh và lý do áp dụng

**Thời hạn:** 17:00 20/10/2026

**Trạng thái:** Có nội dung; chờ rà soát và xác nhận bản cuối

##### T03 Sử dụng AI phân tích yêu cầu

**PIC và phối hợp:** Tuấn; Bảo kiểm tra chéo

**Kết quả cần đạt:** Công cụ, prompt, kết quả và các điểm cần kiểm tra

**Thời hạn:** 17:00 20/10/2026

**Trạng thái:** Đã hoàn thành; Tuấn phụ trách, Bảo đã kiểm tra.

##### T04 Dùng công cụ AI khác phản biện

**PIC và phối hợp:** Tuấn; Bảo kiểm tra chéo

**Kết quả cần đạt:** Hồ sơ phản biện và quyết định giữ, sửa hoặc bỏ

**Thời hạn:** 17:00 20/10/2026

**Trạng thái:** Đã hoàn thành; Tuấn phụ trách, Bảo đã kiểm tra.

##### T05 Xác định vai trò người dùng và chức năng

**PIC và phối hợp:** Bảo; Quyến kiểm tra, góp ý; Đức duyệt phạm vi

**Kết quả cần đạt:** REQUIREMENTS.md đồng bộ T05 mới, đầy đủ mã và tiêu chí nghiệm thu

**Thời hạn:** 17:00 20/10/2026

**Trạng thái:** Đã hoàn thành nội dung T05; đối chiếu bản REQUIREMENTS.md trên GitHub tại T11.

##### T06 Xác định quy trình nghiệp vụ

**PIC và phối hợp:** Khanh

**Kết quả cần đạt:** docs/business-workflow.md khớp vai trò, mã và thanh toán tại T05

**Thời hạn:** 22:00 20/10/2026

**Trạng thái:** Đã hoàn thành phần mô tả và sơ đồ quy trình nghiệp vụ.

##### T07 Phân công vai trò và công việc

**PIC và phối hợp:** Đức

**Kết quả cần đạt:** PROJECT_PLAN.md có người, giai đoạn, việc, đầu ra, hạn, trạng thái và rủi ro

**Thời hạn:** 22:00 20/10/2026

**Trạng thái:** Đã hoàn thành nội dung; chờ cập nhật PROJECT_PLAN.md lên GitHub.

##### T08 Tạo repository GitHub dùng chung

**PIC và phối hợp:** Nam; Đức tạo repository và cấp quyền

**Kết quả cần đạt:** README, AGENTS, thư mục, quyền đóng góp và Issues rõ người thực hiện

**Thời hạn:** 11:00 21/10/2026

**Trạng thái:** Repository Public và file đã có; README, AGENTS cần cập nhật

##### T09 Làm việc với Git và kiểm tra chéo

**PIC và phối hợp:** Mỗi thành viên thực hiện; Nam hỗ trợ

**Kết quả cần đạt:** Có lịch sử đóng góp, kiểm tra chéo và kết quả sửa của từng người

**Thời hạn:** 13:00 21/10/2026; tiếp tục xuyên suốt

**Trạng thái:** Đang áp dụng; chưa xác nhận đủ minh chứng của cả bảy người

##### T10 Quy trình AI và nhật ký sử dụng

**PIC và phối hợp:** Mỗi người ghi phần mình; Châu tổng hợp; Đức kiểm tra chéo

**Kết quả cần đạt:** AI_USAGE_LOG.md đầy đủ thông tin thực tế và người kiểm tra

**Thời hạn:** 13:00 21/10/2026; tiếp tục xuyên suốt

**Trạng thái:** Có file; Châu tổng hợp và xác nhận nội dung còn thiếu

##### T11 Tổng kiểm tra và hoàn thiện hồ sơ Chương 1

**PIC và phối hợp:** Châu; Đức kiểm tra chéo và trực tiếp nộp

**Kết quả cần đạt:** Đủ bảy file có nội dung nhất quán, Issues, đóng góp và quyền truy cập

**Thời hạn:** Trước 17:00 21/10/2026 theo mốc nội bộ

**Trạng thái:** Chờ tổng kiểm tra hồ sơ và bản cập nhật trên GitHub; Đức xác nhận bản cuối và trực tiếp nộp.

Phân công đã xác nhận: Tuấn phụ trách T03 và T04; Bảo phụ trách T05; Khanh phụ trách T06. T04 phải sử dụng công cụ AI khác với T03 theo yêu cầu đề bài; không bắt buộc hai nhiệm vụ do hai thành viên khác nhau thực hiện. Khanh đã hoàn thành phần mô tả và sơ đồ quy trình nghiệp vụ của T06.

### 3.2. Công việc phát triển

Các mã DA01–DA24 cụ thể hóa tám dòng CV01–CV08 còn để trống trong bản GitHub trước đó. Đây là mã quản lý nội bộ, không phải nhiệm vụ bổ sung của giảng viên. PIC là người chính; hỗ trợ và đầu vào ghi trong cùng hàng.

Thời hạn theo mốc bàn giao; ngày cụ thể của M2–M5 chờ nhóm thống nhất. Tất cả các việc phát triển dưới đây ở trạng thái Chưa bắt đầu trong bản kế hoạch; trạng thái được người phụ trách xác nhận và cập nhật khi nhận việc, không coi là đã được khảo sát tiến độ thực tế.

#### Thiết kế và chuẩn bị

##### DA01 Ghi công nghệ và chuẩn bị môi trường

**PIC và hỗ trợ:** PIC Nam  
 Hỗ trợ Khanh  
 Đức kiểm tra

**Kết quả:** M1 ghi HTML/CSS/JS, Tailwind CSS, Node.js/Express, MongoDB/Mongoose và công cụ chung vào README, kế hoạch. M2 cài đặt, tạo cấu trúc dự án, hướng dẫn chạy; ghi nguồn và quyền nếu kế thừa.

**Thời hạn và đầu vào:** M1 ghi công nghệ  
 M2 môi trường  
 Sau T05

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA02 Chốt quy tắc nghiệp vụ

**PIC và hỗ trợ:** PIC Đức  
 Hỗ trợ Bảo, Tuấn, Khanh, Châu

**Kết quả:** Thống nhất cách tính ngân sách, đổi món, phí, voucher; giá mẫu và báo giá riêng; đặt cọc, hủy và trạng thái. Cập nhật REQUIREMENTS.md trước khi lập trình.

**Thời hạn và đầu vào:** M2  
 Sau T05, T06

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA03 Thiết kế dữ liệu và kết nối

**PIC và hỗ trợ:** PIC Nam  
 Mỗi PIC cung cấp dữ liệu phần mình

**Kết quả:** Có sơ đồ dữ liệu, trường và quan hệ; thống nhất mã sản phẩm, giá, tồn kho, đơn, thanh toán và đặt làm; ghi dữ liệu gửi nhận giữa các phần.

**Thời hạn và đầu vào:** M2  
 Sau DA01, DA02

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA04 Thiết kế giao diện

**PIC và hỗ trợ:** PIC Quyến  
 Châu và các PIC phối hợp

**Kết quả:** Có bố cục trang khách, quản trị, bộ quà, đặt làm và trạng thái lỗi; thống nhất thành phần chung. Các PIC thiết kế chi tiết trang thuộc phần mình.

**Thời hạn và đầu vào:** M2  
 Sau DA01, DA02

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA05 Chạy thử kết nối cơ bản

**PIC và hỗ trợ:** PIC Nam  
 Hỗ trợ Quyến, Khanh

**Kết quả:** Một trang lấy được sản phẩm từ dữ liệu lưu trữ qua backend; các thành viên chạy được trên máy. Có hướng dẫn và cách triển khai thử để phát hiện vướng mắc sớm.

**Thời hạn và đầu vào:** M2  
 Sau DA03, DA04

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA06 Chuẩn bị kế hoạch kiểm thử

**PIC và hỗ trợ:** PIC Châu  
 Mỗi PIC bổ sung tình huống

**Kết quả:** Danh sách test case gắn yêu cầu, gồm bước thử, đầu vào, kết quả mong đợi; có dữ liệu mẫu cho hết hàng, vượt ngân sách, voucher sai và thanh toán lỗi.

**Thời hạn và đầu vào:** M2  
 Sau DA02

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

#### Triển khai các nhóm chức năng

##### DA07 Giao diện danh mục khách hàng

**PIC và hỗ trợ:** PIC Quyến  
 Hỗ trợ Nam

**Kết quả:** Trang chủ giới thiệu cửa hàng, danh mục, sản phẩm nổi bật và voucher đang áp dụng; tìm kiếm, sắp xếp, lọc theo ít nhất năm thuộc tính, chi tiết và sản phẩm liên quan theo F03–F05. Hiển thị đánh giá cơ bản ở mức ưu tiên Nên có theo F18; danh sách yêu thích phát triển sau theo F27. Có trạng thái không dữ liệu, nhập sai; kết nối dữ liệu từ DA12.

**Thời hạn và đầu vào:** M3 bản cơ bản  
 M4 hoàn thiện  
 Sau DA04, DA05

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA08 Tài khoản và phân quyền

**PIC và hỗ trợ:** PIC Khanh  
 Hỗ trợ Nam  
 Bảo kiểm tra chéo

**Kết quả:** Đăng ký, đăng nhập, hồ sơ, địa chỉ; kiểm tra quyền phía máy chủ và quyền xem dữ liệu cá nhân; cung cấp chức năng quản lý tài khoản cho quản trị.

**Thời hạn và đầu vào:** M3  
 Sau DA03, DA05

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA09 Giỏ hàng và đơn mua hàng

**PIC và hỗ trợ:** PIC Bảo  
 Hỗ trợ Khanh, Nam, Châu

**Kết quả:** Thêm, sửa số lượng, xóa sản phẩm lẻ hoặc nguyên bộ quà; tính tổng trên máy chủ, kiểm tra tồn kho gộp theo biến thể; lưu phí vận chuyển, giảm giá, thông tin đơn và trạng thái; hiển thị lịch sử đơn và cung cấp chức năng quản lý đơn cho Admin theo F08, F09, F11 và F22. Phối hợp sử dụng voucher và thanh toán.

**Thời hạn và đầu vào:** M3 bản cơ bản  
 M4 hoàn thiện  
 Sau DA08, DA12

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA10 Giỏ quà theo ngân sách

**PIC và hỗ trợ:** PIC Đức  
 Hỗ trợ Quyến, Nam, Bảo

**Kết quả:** Nhập ngân sách tính trên tiền sản phẩm, gợi ý bộ quà cấu hình sẵn; cho đổi món, thay số lượng hoặc bỏ món; tính lại tiền, kiểm tra giá và tồn kho; báo phần vượt ngân sách hoặc không có bộ phù hợp. Thêm nguyên bộ quà đã điều chỉnh vào giỏ hàng, giữ thông tin từng món và số lượng theo F06–F08; cung cấp chức năng quản lý bộ quà cho Admin theo F21.

**Thời hạn và đầu vào:** M4  
 Sau DA02, DA08, DA12

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA11 Đặt làm và báo giá

**PIC và hỗ trợ:** PIC Tuấn  
 Hỗ trợ Khanh, Châu  
 Đức kiểm tra chéo

**Kết quả:** Chọn mẫu và giá niêm yết hoặc gửi yêu cầu riêng để báo giá; xác nhận/từ chối, đặt cọc, tiến độ và giao nhận. Lưu mẫu, tùy chọn, giá đã xác nhận và xử lý hủy theo quy tắc.

**Thời hạn và đầu vào:** M4  
 Sau DA02, DA08, DA12

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA12 Sản phẩm và dữ liệu dùng chung

**PIC và hỗ trợ:** PIC Nam  
 Hỗ trợ Quyến, Châu

**Kết quả:** Xử lý sản phẩm, danh mục, biến thể, thuộc tính, giá, tồn kho và dữ liệu thành phần bộ quà; cung cấp dữ liệu sản phẩm liên quan cho khách hàng và chức năng quản lý sản phẩm, tồn kho cho Admin theo F03–F05, F19 và F20. Hỗ trợ lưu, hiển thị đánh giá đúng điều kiện ở mức ưu tiên Nên có theo F18; danh sách yêu thích phát triển sau theo F27.

**Thời hạn và đầu vào:** M3  
 Sau DA03, DA05

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA13 Thanh toán thử nghiệm

**PIC và hỗ trợ:** PIC Khanh  
 Bảo nối mua hàng  
 Tuấn nối đặt cọc

**Kết quả:** Tích hợp ít nhất một gateway/sandbox thực tế theo yêu cầu học phần; tạo giao dịch, xác thực kết quả trả về, xử lý thành công/thất bại/hủy và kết quả lặp; không ghi đã thanh toán chỉ từ thông báo phía giao diện.

**Thời hạn và đầu vào:** M4  
 Sau đơn cơ bản DA09  
 Nhánh cọc nối DA11

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA14 Quản trị khuyến mãi và thống kê

**PIC và hỗ trợ:** PIC Châu  
 Các PIC cung cấp xử lý của mảng mình

**Kết quả:** Khung quản trị; cấu hình khuyến mãi, voucher và điều kiện; màn hình quản lý dữ liệu dùng xử lý tương ứng. Thống kê doanh thu, đơn, bán chạy, chờ giao và khách; phân biệt cọc với doanh thu để tránh tính trùng.

**Thời hạn và đầu vào:** M4  
 Cấu hình sau DA08, DA12  
 Thống kê sau DA09, DA11

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

#### Tích hợp kiểm thử và triển khai

##### DA15 Kết nối và kiểm tra luồng đầy đủ

**PIC và hỗ trợ:** PIC Nam  
 Mỗi PIC nối và sửa phần mình

**Kết quả:** M3 nối mua hàng cơ bản; M4 nối đủ mua hàng, giỏ quà và đặt làm, voucher, giao hàng và thanh toán. Có danh sách lỗi kết nối, người sửa và kết quả kiểm tra lại.

**Thời hạn và đầu vào:** M3 và M4  
 Theo phần đã hoàn thành

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA16 Kiểm thử nghiệp vụ

**PIC và hỗ trợ:** PIC Châu  
 Tất cả thực hiện và sửa lỗi

**Kết quả:** Chạy test case thực tế, ghi kết quả và minh chứng; kiểm tra dữ liệu biên, giá, tồn kho, voucher, đổi món, báo giá và đơn; kiểm tra lại sau sửa. Không ghi đạt khi chưa chạy thử.

**Thời hạn và đầu vào:** M5  
 Sau luồng đã nối DA15

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA17 Rà soát bảo mật

**PIC và hỗ trợ:** PIC Khanh  
 Mỗi PIC xử lý lỗi phần mình

**Kết quả:** Kiểm tra đăng nhập, phân quyền, truy cập đơn của người khác, validation và rủi ro XSS, NoSQL injection, CSRF phù hợp công nghệ; bảo vệ secret; lưu biện pháp và kết quả thử.

**Thời hạn và đầu vào:** M5  
 Sau chức năng đã kết nối

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA18 Kiểm tra giao diện

**PIC và hỗ trợ:** PIC Quyến  
 Mỗi PIC chỉnh trang mình

**Kết quả:** Kiểm tra ít nhất hai kích thước màn hình, thông báo lỗi và tối thiểu ba hiệu ứng tương tác có mục đích UX; lưu ảnh, lỗi và kết quả sửa trên các trang chính.

**Thời hạn và đầu vào:** M5  
 Sau giao diện đã nối

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA19 Triển khai website

**PIC và hỗ trợ:** PIC Nam  
 Hỗ trợ Khanh và các PIC

**Kết quả:** Có bản thử từ M3; đến M5 website và dữ liệu mẫu truy cập được, cấu hình đúng, có tài khoản demo và hướng dẫn chạy. Thử lại giao dịch trên môi trường triển khai.

**Thời hạn và đầu vào:** M3 bản thử  
 M5 bản hoàn thiện

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

#### Hoàn thiện hồ sơ và báo cáo

##### DA20 Báo cáo và bảng đóng góp

**PIC và hỗ trợ:** PIC Đức  
 Mỗi người viết phần mình

**Kết quả:** Tổng hợp báo cáo Word theo yêu cầu môn học; phân tích hệ thống, ít nhất ba luồng Product, Cart, Checkout; phần đã sửa/mở rộng, kiểm thử và hạn chế. Bảng đóng góp ghi việc và minh chứng thực tế.

**Thời hạn và đầu vào:** M6  
 Cập nhật từ M1

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA21 Nguồn nhật ký AI và phụ lục

**PIC và hỗ trợ:** PIC Châu  
 Mọi người cung cấp  
 Nam bổ sung cấu hình

**Kết quả:** Tổng hợp nguồn code/API/tài nguyên và quyền sử dụng; AI_USAGE_LOG.md; link GitHub, website, dữ liệu mẫu, hướng dẫn, ảnh và test case. Đối chiếu trích dẫn với nguồn thực sự sử dụng.

**Thời hạn và đầu vào:** M6  
 Cập nhật xuyên suốt

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA22 Slide demo và tổng duyệt

**PIC và hỗ trợ:** PIC Tuấn  
 Quyến hỗ trợ slide  
 Cả nhóm tập giải thích

**Kết quả:** Slide và kịch bản không vượt 15 phút; demo ba luồng theo phạm vi; mỗi người giải thích và thực hành chỉnh phần mình; chuẩn bị phương án trình bày khi dịch vụ ngoài gián đoạn.

**Thời hạn và đầu vào:** Trước M6  
 Sau M5 và bản báo cáo

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA23 Tổng kiểm tra hồ sơ cuối kỳ

**PIC và hỗ trợ:** PIC Châu  
 Nam kiểm tra truy cập  
 Đức xác nhận

**Kết quả:** Đối chiếu yêu cầu cuối kỳ, website, báo cáo Word, mã nguồn, phụ lục và liên kết; chuyển thiếu sót cho người làm sửa; kiểm tra lại và bàn giao bản sẵn sàng nộp.

**Thời hạn và đầu vào:** Trước M6  
 Sau DA19 đến DA22

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

##### DA24 Nộp và báo cáo đồ án

**PIC và hỗ trợ:** PIC Đức  
 Tất cả phối hợp bảo vệ

**Kết quả:** Đức trực tiếp nộp hồ sơ đúng hướng dẫn trước hạn 16/12. Nhóm báo cáo ngày 17/12; duy trì quyền truy cập và website đến khi có kết quả chấm.

**Thời hạn và đầu vào:** M6 và M7  
 Sau DA23

**Trạng thái:** Chưa bắt đầu; chờ nhận việc

### 3.3. Trình tự và công việc song song

- Chương 1: T01 → T02 → T03 → T04 → T05. Sau T05, T06 và T07 làm song song; T07 chuẩn bị khung sớm và cập nhật theo T05. T08 chuẩn bị repository sau T01 và hoàn thiện khi nhận tài liệu. T09, T10 thực hiện xuyên suốt; hồ sơ đủ → T11 → sửa → Đức kiểm tra và nộp.

- Trong M1, DA01 cập nhật công nghệ đã chọn vào README và kế hoạch. M2 chuẩn bị môi trường tại DA01 và chốt quy tắc DA02; khi cả hai có đầu ra, DA03 thiết kế dữ liệu và DA04 thiết kế giao diện làm song song. DA06 lập test case sau DA02, không chờ lập trình.

- DA03 và DA04 → DA05 chạy thử kết nối → M2. Sau M2, Quyến làm DA07 giao diện với dữ liệu mẫu đã thống nhất, Khanh làm DA08 tài khoản và Nam làm DA12 sản phẩm; các việc có đầu vào chung đã hoàn thành.

- Sau DA08 và DA12, Bảo làm DA09 đơn mua, Đức làm DA10 giỏ quà và Tuấn làm DA11 đặt làm theo cấu trúc giao tiếp đã thống nhất; từng người tự kiểm tra trước khi bàn giao.

- DA09 có đơn cơ bản → DA13 thanh toán mua hàng; DA11 có báo giá được chấp nhận → DA13 kết nối đặt cọc. DA14 cấu hình khuyến mãi sau DA08, DA12; phần quản lý đơn, đặt làm và thống kê hoàn thiện khi DA09, DA11 có dữ liệu.

- DA15 nối từng phần đã hoàn thành. Trên luồng đã nối, DA16 kiểm thử nghiệp vụ, DA17 bảo mật và DA18 giao diện có thể làm song song ở phạm vi khác nhau. DA19 có bản triển khai thử từ M3, bản hoàn thiện tại M5.

- DA20 báo cáo và DA21 nguồn/AI/phụ lục cập nhật xuyên suốt; sau M5 hoàn thiện → DA22 tổng duyệt → DA23 tổng kiểm tra → Đức xác nhận và nộp tại M6 → báo cáo tại M7.

- Một người có nhiều việc phải sắp xếp thứ tự. Cùng mốc không có nghĩa người đó làm mọi việc cùng lúc; chỉ triển khai song song khi đầu vào đã có và không chờ kết quả của nhau.

### 3.4. Theo dõi và nghiệm thu

- Mỗi Issue ghi mã, một PIC, người hỗ trợ, kết quả, tiêu chí hoàn thành, mốc, thời hạn cụ thể khi đã thống nhất và trạng thái.

- Người thực hiện lấy bản mới nhất, tự làm, kiểm tra, commit và push nếu làm trên máy; nếu sửa trực tiếp trên GitHub, commit đã lưu trên GitHub nên không cần push riêng.

- Nhờ người kiểm tra chéo đọc và chạy thử phần liên quan; xử lý góp ý trước khi nhập bản chung và đóng việc. Trạng thái Issue không thay thế minh chứng đầu ra.

- Khi trễ hoặc vướng, ghi phần đã làm, nội dung đang chờ, ảnh hưởng và hỗ trợ cần có; Đức điều phối, cập nhật người nhận và mốc mới khi nhóm thống nhất.

- Mỗi người viết phần tài liệu kỹ thuật, nguồn và minh chứng của mình; Đức tổng hợp báo cáo. Châu tổng hợp nhật ký AI từ thông tin thực tế; không viết giả công cụ, prompt hoặc người kiểm tra.

## 4. Rủi ro và phương án xử lý

| **Rủi ro** | **Phương án xử lý** | **Đầu mối** |
| --- | --- | --- |
| Thiếu kinh nghiệm hoặc quá tải một người | Chạy thử DA05, chia việc nhỏ; chia backend theo từng nghiệp vụ; không dồn cho Nam, Khanh hoặc Châu | Đức điều phối; các PIC báo vướng |
| Tài liệu không đồng bộ khi có thay đổi | Bảo cập nhật yêu cầu; Khanh cập nhật quy trình khi có thay đổi; Tuấn bổ sung hồ sơ phân tích và phản biện liên quan; Đức đối chiếu tài liệu với GitHub trước khi chốt. | Bảo, Khanh, Tuấn, Đức |
| Sai tiền, tồn kho, voucher hoặc ghi nhận cọc trùng | Máy chủ kiểm tra lại; lưu giá tại thời điểm chốt; kiểm tra tổng số lượng theo biến thể và thông báo thanh toán lặp | PIC nghiệp vụ; Châu kiểm thử |
| Chính sách cọc, hoàn tiền, giữ tồn chưa rõ | DA02 ghi quyết định và tiêu chí trước khi lập trình; không tự đưa chính sách chưa được nhóm xác nhận vào mã | Đức, Bảo, Tuấn, Khanh |
| Đặt làm hoặc giỏ quà mở rộng quá phạm vi | Giữ mẫu, tùy chọn và bộ quà giới hạn; yêu cầu riêng do cửa hàng xem xét/báo giá/từ chối; chức năng mới phải được nhóm thống nhất | Đức và Tuấn |
| Cổng thanh toán hoặc môi trường triển khai bị vướng | Thử sandbox và cấu hình sớm; kiểm tra kết quả thật, sai và lặp; lưu hướng dẫn, dữ liệu mẫu và phương án hỗ trợ | Khanh và Nam |
| Xung đột Git hoặc thiếu lịch sử đóng góp | Trao đổi trước khi sửa file chung; dùng nhánh phù hợp; từng người cập nhật phần mình và có kiểm tra chéo | Nam hỗ trợ; tất cả thực hiện |
| AI sai hoặc không giải thích được mã | Đọc, chạy và chỉnh; lưu quyết định; luyện giải thích luồng dữ liệu và thay đổi phần mình | Tất cả; Châu tổng hợp log |
| Thi giữa kỳ và thời hạn đồ án ảnh hưởng tiến độ | Giữ mốc thi riêng; thống nhất lịch từng đợt theo thời gian thực tế; ưu tiên chức năng bắt buộc trước mở rộng | Đức và các PIC |
| Thiếu hồ sơ hoặc liên kết không truy cập được khi chấm | DA20–DA21 cập nhật sớm; DA23 kiểm tra từ phiên khác; giữ website, repository và phụ lục đến khi có điểm | Châu kiểm tra; Nam duy trì; Đức nộp |

