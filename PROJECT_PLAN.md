# Kế hoạch tổng thể đồ án Lenly Crochet

**Học phần:** Phát triển ứng dụng TMĐT — Nhóm 7, ST5.  
**Cập nhật:** 14/11/2026; tiến độ đối chiếu với bản tích hợp Buổi 3 trên `main`.

Website phục vụ một cửa hàng sản phẩm móc len, gồm mua hàng làm sẵn, tạo bộ quà theo ngân sách và đặt làm theo mẫu hoặc yêu cầu riêng. Kế hoạch này ghi vai trò, các mốc phát triển, công việc chính và rủi ro của toàn đồ án. Phạm vi và tiêu chí nghiệm thu chi tiết theo [REQUIREMENTS.md](REQUIREMENTS.md); quy trình theo [tài liệu nghiệp vụ](docs/business-workflow.md).

## 1. Thành viên và vai trò

Đây là vai trò phát triển toàn đồ án. Phần việc đã thực hiện trong từng buổi được lưu theo báo cáo và lịch sử GitHub của buổi đó.

| Thành viên | Trách nhiệm chính và kết quả bàn giao |
| --- | --- |
| **Nguyễn Quang Đức — Trưởng nhóm, nghiệp vụ và giỏ quà** | Điều phối phạm vi, phân công, tiến độ và quyết định chung; phát triển gợi ý, tùy chỉnh và nhân bản bộ quà, nối với giỏ/đơn hàng; cung cấp phần quản lý mẫu bộ quà cho Admin. Tổng hợp báo cáo, kiểm tra bản cuối và trực tiếp nộp bài. |
| **Đặng Đình Quyến — UI/UX và frontend khách hàng** | Giữ nhận diện và thành phần chung; hoàn thiện trang chủ, danh mục, tìm kiếm/lọc/sắp xếp, chi tiết và trạng thái tải/lỗi; phối hợp các PIC nối dữ liệu. Rà giao diện, responsive và khả năng thao tác trên các trang sau tích hợp. |
| **Trần Quốc Bảo — Giỏ hàng, checkout và đơn mua sẵn** | Phát triển giỏ, tính phí vận chuyển, áp dụng voucher, tạo đơn, lịch sử và trạng thái đơn; cung cấp phần xử lý đơn cho Admin. Kết nối dữ liệu Nam, tài khoản/thanh toán Khanh và voucher Châu; kiểm tra giá và tồn kho trên máy chủ. |
| **Nguyễn Anh Tuấn — Đặt làm và báo giá** | Phát triển chọn mẫu/tùy chọn, gửi yêu cầu riêng, cửa hàng xem xét và báo giá, khách xác nhận/từ chối, theo dõi tiến độ và giao nhận. Cung cấp phần quản lý đặt làm cho Admin, phối hợp Khanh nối tiền cọc; điều phối kịch bản demo, slide và tập trình bày. |
| **Đỗ Trọng Khanh — Tài khoản, phân quyền và thanh toán** | Phát triển đăng ký/đăng nhập/đăng xuất, hồ sơ và địa chỉ; kiểm tra quyền tại backend. Tích hợp sandbox cho đơn mua và tiền cọc, kiểm tra số tiền/kết quả giao dịch và chống ghi nhận trùng; phối hợp Bảo, Tuấn nối từng luồng. |
| **Nguyễn Thanh Nam — Dữ liệu, sản phẩm và tích hợp** | Điều phối schema và dữ liệu gửi nhận với từng PIC; phát triển sản phẩm, danh mục, biến thể, giá và tồn kho, API dùng chung và phần quản lý sản phẩm. Hỗ trợ Git, kết nối và triển khai; từng PIC vẫn tự kết nối, kiểm tra và sửa phần mình. |
| **Nguyễn Đình Châu — Quản trị, voucher, thống kê và QA** | Xây khung quản trị, khuyến mãi/voucher và thống kê; nhận phần xử lý sản phẩm, tài khoản, đơn và đặt làm từ PIC tương ứng. Lập và tổng hợp kiểm thử, theo dõi sửa lỗi; tổng hợp nhật ký AI từ thông tin thực tế của từng người. |

Mỗi task có một PIC và đầu ra cụ thể. Cặp kiểm tra chéo: Đức–Tuấn, Quyến–Nam, Bảo–Khanh; Đức kiểm tra phần tổng hợp của Châu. Nếu người kiểm tra cùng viết phần đó, chọn thêm người khác để kiểm tra. Phân công có thể điều chỉnh khi nhóm thống nhất và ghi lại; không dồn toàn bộ backend hoặc tích hợp cho một người.

## 2. Các giai đoạn và tiến độ

### 2.1. Kết quả đã có

| Phần việc | Kết quả trên bản tích hợp | Phần cần phát triển tiếp |
| --- | --- | --- |
| Hồ sơ Buổi 1/Chương 1 | Đã có yêu cầu, khảo sát, quy trình và kế hoạch ban đầu trong repository. | Đồng bộ tài liệu khi thay đổi nghiệp vụ; [phân công T01–T11](docs/phan-cong-chuong1.md) được lưu riêng. |
| Giao diện Buổi 2 | Đã có trang chủ, danh sách, chi tiết và giới thiệu; logo, header/footer, CSS và responsive. | Kế thừa giao diện và bổ sung các màn hình tài khoản, checkout, đặt làm, quản trị. |
| Danh sách và chi tiết Buổi 3 | Đã có tám sản phẩm dùng chung; danh sách từ JavaScript, tìm theo tên/mã, lọc danh mục, sắp giá và chi tiết theo ID. | Chuyển nguồn dữ liệu sang API/cơ sở dữ liệu; bổ sung bộ lọc, biến thể và thông tin theo F03–F05. |
| Giỏ và lưu trữ Buổi 3 | Đã thêm/xóa/đổi số lượng, tính tiền, cập nhật số đếm; giữ dữ liệu bằng localStorage. | Tạo đơn, địa chỉ, voucher, phí giao; backend kiểm tra giá/tồn và lưu dữ liệu giao dịch. |
| Giỏ quà Buổi 3 | Đã gợi ý bộ mẫu theo ngân sách, đổi/thêm/bỏ món, giữ nhiều khung và nhân bản độc lập; thêm bộ vào giỏ. | Quản lý bộ mẫu qua Admin, lấy dữ liệu từ backend và nối bộ quà vào luồng tạo đơn. |
| Tích hợp và kiểm thử Buổi 3 | Đã có bản web chung, kiểm thử tự động, minh chứng giao diện và báo cáo. | Tiếp tục kiểm thử khi nối backend; kết quả Buổi 3 không thay nghiệm thu toàn đồ án. |

Bản hiện hành dùng HTML5, CSS3 và JavaScript thuần; Node phục vụ chạy kiểm thử. **Chưa triển khai backend, cơ sở dữ liệu, tài khoản, đơn hàng máy chủ, thanh toán sandbox, đặt làm và quản trị.** Các phần đã chạy trong trình duyệt được ghi nhận ở mức frontend, chưa coi toàn bộ yêu cầu tương ứng đã hoàn thành.

### 2.2. Lộ trình toàn đồ án

Giữ các mã mốc M1–M7 để đối chiếu kế hoạch cũ. Frontend, backend và kiểm thử được triển khai theo từng luồng, tích hợp từ sớm.

| Mốc | Kết quả cần đạt | Tiến độ hiện tại |
| --- | --- | --- |
| **M1 — Khảo sát và xác định yêu cầu** | Thống nhất đề tài, phạm vi, người dùng, nghiệp vụ và vai trò; có hồ sơ dùng chung. | Đã có hồ sơ; tiếp tục cập nhật khi có quyết định mới. |
| **M2 — Chuẩn bị hệ thống** | Chốt quy tắc còn thiếu; có môi trường backend, schema, quy ước API và trang lấy sản phẩm từ cơ sở dữ liệu. Các thành viên chạy được trên máy. | Đã có nền giao diện Buổi 2–3; phần backend/dữ liệu chưa triển khai. **Đợt ưu tiên tiếp theo.** |
| **M3 — Luồng mua hàng cơ bản** | Tài khoản, danh mục, giỏ, địa chỉ, tạo đơn, xử lý đơn Admin và lịch sử khách hàng chạy cùng nhau; có bản triển khai thử. | Đã có danh mục/giỏ frontend; chưa có tài khoản và đơn máy chủ. |
| **M4 — Hoàn thiện phạm vi chức năng** | Nối giỏ quà và đặt làm/báo giá/tiền cọc; có sandbox, phí giao, voucher, quản trị và thống kê theo yêu cầu. | Đã có giỏ quà frontend; các phần còn lại chưa triển khai. |
| **M5 — Kiểm thử tổng thể và triển khai** | Kiểm thử chức năng, quyền, dữ liệu, giao diện và thanh toán trên bản triển khai; sửa lỗi và thử lại. | Đã có kiểm thử bản Buổi 3; toàn hệ thống còn chờ các luồng trên. |
| **M6 — Hoàn thiện và nộp hồ sơ** | Mã nguồn, website, báo cáo, minh chứng, nguồn/AI và bảng đóng góp được kiểm tra; Đức trực tiếp nộp. | Mốc nộp theo kế hoạch: **16/12/2026**. |
| **M7 — Demo và bảo vệ** | Nhóm tổng duyệt, demo các luồng và giải thích phần việc; duy trì quyền truy cập khi chấm. | Mốc báo cáo theo kế hoạch: **17/12/2026**. |

Ngày bàn giao từng đợt M2–M5 được nhóm thống nhất và ghi trong Sheet/Issues, bảo đảm có thời gian sửa lỗi trước M6. Thi giữa kỳ là lịch riêng, không mặc định là một lần nộp đồ án.

Công nghệ toàn đồ án giữ theo yêu cầu đã ghi: **HTML/CSS/JavaScript, Tailwind CSS; Node.js/Express; MongoDB/Mongoose; Git/GitHub**. Tailwind chưa được dùng trong bản Buổi 3; cách áp dụng về sau cần thống nhất để giữ CSS đang hoạt động. Nền tảng triển khai backend chưa chọn.

## 3. Công việc và cách phối hợp

### 3.1. Đợt tiếp theo — hoàn thành M2

| Công việc | PIC và phối hợp | Kết quả bàn giao |
| --- | --- | --- |
| **DA01 — Chuẩn bị môi trường** | Nam; Khanh hỗ trợ | Cấu trúc backend, cấu hình mẫu, lệnh cài/chạy và hướng dẫn. Không đưa thông tin bí mật lên repository. |
| **DA02 — Chốt quy tắc nghiệp vụ** | Đức; Bảo, Tuấn, Khanh, Châu phối hợp | Quyết định rõ phí/voucher, giữ và giải phóng tồn, hủy/hoàn tiền; báo giá, tỷ lệ/số tiền cọc, hạn cọc và thu phần còn lại. Giữ quy tắc ngân sách một bộ, vượt sau tùy chỉnh chỉ cảnh báo. |
| **DA03 — Thiết kế dữ liệu và API** | Nam; từng PIC cung cấp phần mình | Schema sản phẩm/biến thể, tài khoản, bộ quà, đơn, báo giá và thanh toán; đường dẫn, dữ liệu gửi nhận, quyền và lỗi thống nhất. |
| **DA04 — Hoàn thiện thiết kế các màn hình còn thiếu** | Quyến; các PIC phối hợp | Bố cục tài khoản, checkout, đặt làm và quản trị; dùng lại nhận diện và thành phần hiện có. |
| **DA05 — Chạy thử kết nối** | Nam; Khanh, Quyến hỗ trợ | Trang danh sách lấy được sản phẩm qua backend từ cơ sở dữ liệu; có thể chạy trên máy các thành viên. |
| **DA06 — Chuẩn bị kiểm thử** | Châu; từng PIC bổ sung | Test case gắn yêu cầu và quy tắc, có đầu vào, bước thử, kết quả mong đợi và dữ liệu biên. |

**Thứ tự bàn giao:** DA01 và DA02 triển khai song song. Có quy tắc và môi trường chung → DA03, DA04; DA06 lập sau DA02 và cập nhật theo API. Có dữ liệu/API sản phẩm và khung giao diện cần dùng → DA05. Không cần chờ thiết kế xong mọi trang mới thử kết nối sản phẩm.

Trong lúc phần nền được chuẩn bị, Bảo làm rõ checkout/đơn, Tuấn làm rõ biểu mẫu/báo giá, Đức chuẩn bị điểm nối giỏ quà, Châu chuẩn bị khung quản trị và test case. Mỗi người có đầu ra của phần mình; các chức năng phụ thuộc chỉ kết nối khi đã có dữ liệu và quy ước cần thiết.

### 3.2. Các nhóm công việc tiếp theo

| Nhóm việc | Người phụ trách | Mốc và điều kiện |
| --- | --- | --- |
| **DA07, DA12 — Danh mục, sản phẩm và dữ liệu** | Quyến, Nam; mỗi task một PIC | M3–M4; sau bản kết nối M2. Hoàn thiện F03–F05, F19–F20 và dữ liệu dùng chung. |
| **DA08 — Tài khoản và quyền** | Khanh | M3; sau schema và nền backend. Phân biệt Guest/Customer/Admin và kiểm tra quyền trên máy chủ. |
| **DA09, DA10 — Đơn mua và giỏ quà** | Bảo phụ trách đơn; Đức phụ trách quà | M3 đơn cơ bản, M4 đầy đủ; dùng dữ liệu sản phẩm và tài khoản chung. Bộ quà đi vào cùng luồng đơn mua sẵn. |
| **DA11 — Đặt làm và báo giá** | Tuấn; Khanh phối hợp tiền cọc | M4; có quy tắc, tài khoản và dữ liệu. Đơn đặt làm tách đơn mua sẵn trong phiên bản đầu. |
| **DA13 — Thanh toán sandbox** | Khanh; Bảo và Tuấn nối từng luồng | M4; thử kết nối kỹ thuật từ M2, nối khi đã có đơn/báo giá. Kiểm tra thành công, thất bại, hủy và thông báo lặp theo F10/F16. |
| **DA14 — Quản trị, voucher và thống kê** | Châu; PIC cung cấp phần quản lý của mình | M3 chuẩn bị khung, M4 hoàn thiện; thống kê dùng dữ liệu đơn/thanh toán đã có. |
| **DA15–DA19 — Tích hợp, kiểm thử và triển khai** | Nam điều phối kết nối/triển khai; Châu điều phối kiểm thử; Quyến rà giao diện; từng PIC sửa phần mình | M3–M5; ghép và thử từng luồng đủ đầu vào, gồm kiểm tra quyền/bảo mật. |
| **DA20–DA24 — Hồ sơ, tổng duyệt và nộp** | Đức tổng hợp/nộp; Tuấn điều phối demo; Châu tổng hợp QA/AI; cả nhóm cung cấp phần mình | Tài liệu cập nhật xuyên suốt; chốt sau M5, nộp M6 và báo cáo M7. |

F18 đánh giá cơ bản là **Nên có**; F27 yêu thích là **Phát triển sau**. Giữ ưu tiên theo REQUIREMENTS.md; không tự thêm AI sinh mẫu, 3D hoặc chat thời gian thực.

### 3.3. Theo dõi và nghiệm thu

- Dùng [bảng phân công](https://docs.google.com/spreadsheets/d/1UIP27nPdW2n_PZR36gXBxR1aO9nti8mK8NYxyOvS_0s/edit) và [GitHub Issues](https://github.com/ptudtmdt-st5-nhom7/crochet-handmade-ecommerce/issues) cho task chi tiết: mã, một PIC, người hỗ trợ, đầu ra, phụ thuộc, deadline, trạng thái và link bàn giao. Khi tạo đợt mới, đối chiếu các Issue Chương 1 còn mở với minh chứng, không suy ra tiến độ chỉ từ trạng thái cũ.
- Trạng thái dùng chung: **Chưa bắt đầu → Đang thực hiện → Chờ kiểm tra → Hoàn thành**. Task bị vướng ghi rõ đang chờ ai/đầu vào nào. Chỉ hoàn thành khi có đầu ra và kết quả kiểm tra; có giao diện chưa có nghĩa đã xong backend.
- Lấy `main` mới → làm trên branch riêng → tự thử → commit/push → mở PR → kiểm tra chéo → sửa góp ý → merge → thử lại bản chung. Đức điều phối bản cuối, Nam hỗ trợ ghép; người viết chịu trách nhiệm phần đã bàn giao.
- Mỗi PIC cập nhật tài liệu, nguồn và thông tin AI thực tế của mình; Châu tổng hợp [AI_USAGE_LOG.md](AI_USAGE_LOG.md). Kiểm tra công cụ được phân biệt với thao tác cá nhân; mỗi người chuẩn bị giải thích mã khi demo.
- Các quyết định thay đổi quy tắc, API, vai trò hoặc deadline cần ghi lại và cập nhật tài liệu liên quan trước khi bên nhận tiếp tục.

Hồ sơ kế thừa: [README và hướng dẫn chạy](README.md), [phân công Chương 1](docs/phan-cong-chuong1.md), [tích hợp Buổi 3](docs/ban-giao-tich-hop-buoi3.md), [soạn nhiều bộ quà](docs/chon-nhieu-bo-qua.md).

## 4. Rủi ro và phương án xử lý

| Rủi ro | Phương án | Đầu mối |
| --- | --- | --- |
| Chưa quen backend hoặc quá tải một người | Chạy thử DA05 sớm, chia task nhỏ theo nghiệp vụ; mỗi PIC tự kết nối và giải thích phần mình. | Đức điều phối; Nam/Khanh hỗ trợ nền |
| Dữ liệu/API hoặc tài liệu không khớp | Thống nhất trước khi nối; cập nhật yêu cầu, quy trình và test case khi có thay đổi. Đồng bộ điểm chưa thống nhất về mô phỏng/sandbox, không dùng COD/QR mẫu thay F10/F16. | Nam và PIC liên quan; Đức chốt phạm vi |
| Sai tiền, tồn, voucher hoặc giao dịch trùng | Backend tính lại và kiểm tra; lưu giá lúc chốt đơn, giữ/giải phóng tồn theo quy tắc; kiểm tra quyền và kết quả thanh toán lặp. | Bảo, Khanh, Nam, Châu |
| Giỏ quà/đặt làm mở rộng quá sức | Giữ bộ mẫu và tùy chọn giới hạn; báo giá riêng do cửa hàng xem xét. Chức năng mới chỉ nhận khi nhóm thống nhất tác động. | Đức, Tuấn |
| Xung đột Git hoặc hồi quy giao diện | Trao đổi trước khi sửa file chung; PR có kiểm tra chéo; thử lại các trang và luồng dùng chung sau merge. | Từng PIC; Nam hỗ trợ, Quyến rà giao diện |
| Sandbox hoặc triển khai gặp vướng | Thử cấu hình và kết nối từ sớm; kiểm tra trên môi trường triển khai, giữ hướng dẫn và dữ liệu mẫu. Chọn nền tảng khi chuẩn bị backend. | Khanh, Nam |
| Thiếu thời gian, hồ sơ hoặc hiểu mã AI | Chốt deadline theo thời gian thực tế, dành đợt sửa lỗi/tổng duyệt; cập nhật nguồn, AI log và minh chứng xuyên suốt. Duy trì link truy cập khi chấm. | Cả nhóm; Đức tổng hợp và nộp |
