# Kế hoạch triển khai

## Tiến độ các phần đã thực hiện

| Phần việc | Kết quả trên bản tích hợp | Phần cần phát triển tiếp |
| --- | --- | --- |
| Hồ sơ Buổi 1/Chương 1 | Đã có yêu cầu, khảo sát, quy trình và kế hoạch ban đầu trong repository. | Đồng bộ tài liệu khi thay đổi nghiệp vụ; [phân công T01–T11](phan-cong-chuong1.md) được lưu riêng. |
| Giao diện Buổi 2 | Đã có trang chủ, danh sách, chi tiết và giới thiệu; logo, header/footer, CSS và responsive. | Kế thừa giao diện và bổ sung các màn hình tài khoản, checkout, đặt làm, quản trị. |
| Danh sách và chi tiết Buổi 3 | Đã có tám sản phẩm dùng chung; danh sách từ JavaScript, tìm theo tên/mã, lọc danh mục, sắp giá và chi tiết theo ID. | Chuyển nguồn dữ liệu sang API/cơ sở dữ liệu; bổ sung bộ lọc, biến thể và thông tin theo F03–F05. |
| Giỏ và lưu trữ Buổi 3 | Đã thêm/xóa/đổi số lượng, tính tiền, cập nhật số đếm; giữ dữ liệu bằng localStorage. | Tạo đơn, địa chỉ, voucher, phí giao; backend kiểm tra giá/tồn và lưu dữ liệu giao dịch. |
| Giỏ quà Buổi 3 | Đã gợi ý bộ mẫu theo ngân sách, đổi/thêm/bỏ món, giữ nhiều khung và nhân bản độc lập; thêm bộ vào giỏ. | Quản lý bộ mẫu qua Admin, lấy dữ liệu từ backend và nối bộ quà vào luồng tạo đơn. |
| Tích hợp và kiểm thử Buổi 3 | Đã có bản web chung, kiểm thử tự động, minh chứng giao diện và báo cáo. | Tiếp tục kiểm thử khi nối backend; kết quả Buổi 3 không thay nghiệm thu toàn đồ án. |

Bản hiện hành dùng HTML5, CSS3 và JavaScript thuần; Node phục vụ chạy kiểm thử. **Chưa triển khai backend, cơ sở dữ liệu, tài khoản, đơn hàng máy chủ, thanh toán sandbox, đặt làm và quản trị.** Các phần đã chạy trong trình duyệt được ghi nhận ở mức frontend, chưa coi toàn bộ yêu cầu tương ứng đã hoàn thành.

## Công nghệ

Công nghệ toàn đồ án giữ theo yêu cầu đã ghi: **HTML/CSS/JavaScript, Tailwind CSS; Node.js/Express; MongoDB/Mongoose; Git/GitHub**. Tailwind chưa được dùng trong bản Buổi 3; cách áp dụng về sau cần thống nhất để giữ CSS đang hoạt động. Nền tảng triển khai backend chưa chọn.

## 1. Đợt tiếp theo — hoàn thành M2

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

## 2. Các nhóm công việc tiếp theo

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

## 3. Theo dõi và nghiệm thu

- Dùng [bảng phân công](https://docs.google.com/spreadsheets/d/1UIP27nPdW2n_PZR36gXBxR1aO9nti8mK8NYxyOvS_0s/edit) và [GitHub Issues](https://github.com/ptudtmdt-st5-nhom7/crochet-handmade-ecommerce/issues) cho task chi tiết: mã, một PIC, người hỗ trợ, đầu ra, phụ thuộc, deadline, trạng thái và link bàn giao. Khi tạo đợt mới, đối chiếu các Issue Chương 1 còn mở với minh chứng, không suy ra tiến độ chỉ từ trạng thái cũ.
- Trạng thái dùng chung: **Chưa bắt đầu → Đang thực hiện → Chờ kiểm tra → Hoàn thành**. Task bị vướng ghi rõ đang chờ ai/đầu vào nào. Chỉ hoàn thành khi có đầu ra và kết quả kiểm tra; có giao diện chưa có nghĩa đã xong backend.
- Lấy `main` mới → làm trên branch riêng → tự thử → commit/push → mở PR → kiểm tra chéo → sửa góp ý → merge → thử lại bản chung. Đức điều phối bản cuối, Nam hỗ trợ ghép; người viết chịu trách nhiệm phần đã bàn giao.
- Mỗi PIC cập nhật tài liệu, nguồn và thông tin AI thực tế của mình; Châu tổng hợp [AI_USAGE_LOG.md](../AI_USAGE_LOG.md). Kiểm tra công cụ được phân biệt với thao tác cá nhân; mỗi người chuẩn bị giải thích mã khi demo.
- Các quyết định thay đổi quy tắc, API, vai trò hoặc deadline cần ghi lại và cập nhật tài liệu liên quan trước khi bên nhận tiếp tục.

Hồ sơ kế thừa: [README và hướng dẫn chạy](../README.md), [phân công Chương 1](phan-cong-chuong1.md), [tích hợp Buổi 3](ban-giao-tich-hop-buoi3.md), [soạn nhiều bộ quà](chon-nhieu-bo-qua.md).

[Kế hoạch tổng thể](../PROJECT_PLAN.md)
