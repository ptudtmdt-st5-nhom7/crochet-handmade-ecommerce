# Project Plan

## 1. Thành viên và vai trò

### Nguyễn Quang Đức — Trưởng nhóm, nghiệp vụ và giỏ quà

Điều phối phạm vi, phân công, tiến độ và các quyết định chung. Phát triển gợi ý bộ quà theo ngân sách, tùy chỉnh thành phần, nhân bản và kết nối với giỏ hàng, đơn mua.

**Đầu ra:** Chức năng giỏ quà và quản lý bộ mẫu; kế hoạch, báo cáo tổng hợp và hồ sơ nộp cuối kỳ. Đức kiểm tra bản cuối và trực tiếp nộp bài.

### Đặng Đình Quyến — UI/UX và frontend khách hàng

Thiết kế nhận diện và thành phần dùng chung; phát triển trang chủ, danh mục, tìm kiếm, bộ lọc và chi tiết sản phẩm. Phối hợp các thành viên hoàn thiện giao diện, trạng thái tải/lỗi và kết nối dữ liệu.

**Đầu ra:** Giao diện khách hàng thống nhất, responsive và kết quả kiểm tra hiển thị sau tích hợp.

### Trần Quốc Bảo — Giỏ hàng, checkout và đơn mua sẵn

Phát triển giỏ hàng, địa chỉ giao nhận tại checkout, phí vận chuyển, áp dụng voucher, tạo đơn và lịch sử mua hàng. Kết nối dữ liệu sản phẩm, tài khoản và thanh toán; cung cấp chức năng quản lý đơn cho Admin.

**Đầu ra:** Luồng mua hàng và quản lý đơn; xử lý giá, số lượng, tồn kho và trạng thái đơn tại backend.

### Nguyễn Anh Tuấn — Đặt làm và báo giá

Phát triển đặt theo mẫu có tùy chọn, gửi yêu cầu riêng, xem xét và báo giá, xác nhận hoặc từ chối báo giá, theo dõi tiến độ và giao nhận. Phối hợp Khanh kết nối tiền cọc.

**Đầu ra:** Luồng đặt làm và quản lý yêu cầu, báo giá, tiến độ; kịch bản demo, slide và kế hoạch tổng duyệt.

### Đỗ Trọng Khanh — Tài khoản, phân quyền và thanh toán

Phát triển đăng ký, đăng nhập, đăng xuất, hồ sơ và sổ địa chỉ. Kiểm tra quyền tại backend; tích hợp thanh toán sandbox cho đơn mua và tiền cọc, xác thực kết quả và xử lý giao dịch trùng.

**Đầu ra:** Tài khoản, quyền truy cập và luồng thanh toán; kết quả kiểm thử các trường hợp thành công, thất bại, hủy và nhận thông báo lặp.

### Nguyễn Thanh Nam — Dữ liệu, sản phẩm và tích hợp

Điều phối cấu trúc dữ liệu và API; phát triển danh mục, sản phẩm, biến thể, giá, tồn kho và quản lý sản phẩm. Hỗ trợ Git, tích hợp và triển khai; phối hợp từng người kết nối phần phụ trách.

**Đầu ra:** Schema, dữ liệu mẫu, API sản phẩm, chức năng quản lý hàng hóa và hướng dẫn chạy, triển khai hệ thống.

### Nguyễn Đình Châu — Quản trị, voucher, thống kê và QA

Xây dựng khung quản trị, khuyến mãi, voucher và thống kê. Tiếp nhận các chức năng quản lý từ người phụ trách sản phẩm, tài khoản, đơn mua và đặt làm. Điều phối kiểm thử, theo dõi lỗi và tổng hợp nhật ký AI.

**Đầu ra:** Giao diện quản trị, voucher, dashboard, bộ ca kiểm thử, danh sách lỗi và nhật ký AI tổng hợp.

Mỗi công việc có một người chịu trách nhiệm chính; người hỗ trợ và đầu ra được ghi trong task. Các cặp kiểm tra chéo: Đức–Tuấn, Quyến–Nam, Bảo–Khanh; Đức kiểm tra phần tổng hợp của Châu. Mỗi thành viên tự kiểm tra, kết nối và giải thích phần mình.

## 2. Các giai đoạn

| Mốc | Giai đoạn | Kết quả cần đạt |
| --- | --- | --- |
| **M1** | Khảo sát và xác định yêu cầu | Thống nhất đề tài, phạm vi, vai trò, quy trình nghiệp vụ và phân công. |
| **M2** | Chuẩn bị hệ thống | Chốt quy tắc nghiệp vụ; chuẩn bị backend, schema và API; chạy thử trang lấy sản phẩm từ cơ sở dữ liệu. |
| **M3** | Hoàn thiện luồng mua hàng cơ bản | Kết nối tài khoản, sản phẩm, giỏ, checkout, tạo đơn, quản lý đơn và lịch sử mua hàng; có bản triển khai thử. |
| **M4** | Hoàn thiện chức năng | Kết nối giỏ quà, đặt làm, báo giá, tiền cọc, thanh toán sandbox, phí giao hàng, voucher, quản trị và thống kê. |
| **M5** | Kiểm thử tổng thể và triển khai | Kiểm tra chức năng, dữ liệu, quyền truy cập và giao diện; sửa lỗi và xác nhận bản triển khai. |
| **M6** | Hoàn thiện và nộp hồ sơ | Chốt báo cáo, mã nguồn, minh chứng và bảng đóng góp; nộp theo kế hoạch ngày **16/12/2026**. |
| **M7** | Demo và bảo vệ | Tổng duyệt, demo và giải thích mã nguồn; báo cáo theo kế hoạch ngày **17/12/2026**. |

**Tiến độ hiện tại:** Đã có hồ sơ yêu cầu và giao diện Buổi 2. Bản Buổi 3 đã tích hợp danh sách tám sản phẩm, tìm kiếm/lọc/sắp xếp, chi tiết động, giỏ hàng, localStorage và giỏ quà nhiều khung với bản sao độc lập; có kiểm thử và minh chứng.

Backend, cơ sở dữ liệu, tài khoản, đơn hàng máy chủ, thanh toán sandbox, đặt làm và quản trị chưa triển khai. Đợt tiếp theo tập trung M2 và thử kết nối danh sách sản phẩm.

Frontend và backend triển khai song song sau khi thống nhất dữ liệu và API. Tích hợp, kiểm thử và ghi nhận tài liệu thực hiện trong từng đợt. Thời hạn chi tiết M2–M5 được thống nhất trong bảng phân công.

## 3. Công việc

**Công nghệ:** HTML/CSS/JavaScript, Tailwind CSS; Node.js/Express; PostgreSQL, kết nối bằng `pg`; Git/GitHub. Nam phụ trách schema SQL và dữ liệu mẫu; Khanh phối hợp kết nối database. Nhà cung cấp triển khai chưa chốt.

Công việc, người phụ trách, đầu ra và thứ tự bàn giao được ghi trong [kế hoạch triển khai](docs/ke-hoach-trien-khai.md). Giữ các mã DA01–DA24 để theo dõi từ chuẩn bị hệ thống đến nộp và bảo vệ.

Đợt M2 gồm chuẩn bị môi trường, chốt nghiệp vụ, thiết kế dữ liệu/API, hoàn thiện thiết kế màn hình, chạy thử kết nối và lập ca kiểm thử. Thanh toán sandbox được thử kết nối kỹ thuật sớm trước khi hoàn thiện các luồng giao dịch.

Các task cụ thể được theo dõi trong [bảng phân công](https://docs.google.com/spreadsheets/d/1UIP27nPdW2n_PZR36gXBxR1aO9nti8mK8NYxyOvS_0s/edit) và [GitHub Issues](https://github.com/ptudtmdt-st5-nhom7/crochet-handmade-ecommerce/issues).

Trạng thái: **Chưa bắt đầu → Đang thực hiện → Chờ kiểm tra → Hoàn thành**. Task bị vướng ghi rõ nguyên nhân, đầu vào còn thiếu và người phối hợp. Chỉ chuyển sang hoàn thành khi có đầu ra được kiểm tra.

Quy trình bàn giao: **Lấy main mới → phát triển trên branch → tự kiểm tra → commit/push → mở PR → kiểm tra chéo → sửa góp ý → merge → kiểm thử bản chung.**

Phạm vi và mức ưu tiên theo [REQUIREMENTS.md](REQUIREMENTS.md). Đánh giá cơ bản F18 là phần nên có; danh sách yêu thích F27 triển khai sau các chức năng bắt buộc. Thay đổi nghiệp vụ, API, vai trò hoặc thời hạn cần được thống nhất và ghi lại.

Phân công Chương 1 được lưu trong [hồ sơ T01–T11](docs/phan-cong-chuong1.md). Mỗi thành viên cung cấp tài liệu, minh chứng và thông tin sử dụng AI thực tế; Châu tổng hợp [nhật ký AI](AI_USAGE_LOG.md), Đức tổng hợp báo cáo.

## 4. Rủi ro

### Quá tải hoặc phân công không đều

Chia nhỏ công việc theo nghiệp vụ, rà soát tiến độ từng đợt và điều phối hỗ trợ. Mỗi thành viên chịu trách nhiệm phần mình; Nam hỗ trợ tích hợp và Đức điều phối phạm vi.

### Chưa quen backend và cơ sở dữ liệu

Thực hiện bản kết nối sản phẩm ở M2 trước khi mở rộng. Chuẩn bị hướng dẫn chạy và thống nhất cấu trúc dữ liệu để các thành viên cùng sử dụng.

### Frontend và backend không thống nhất

Chốt API, dữ liệu gửi nhận, quyền và thông báo lỗi trước khi kết nối. Khi thay đổi, cập nhật tài liệu và kiểm thử các phần liên quan.

### Sai giá, tồn kho, voucher hoặc thanh toán

Kiểm tra nghiệp vụ tại backend, lưu giá tại thời điểm chốt đơn và xử lý tồn theo quy tắc. Kiểm thử giao dịch thất bại, thông báo lặp, hủy đơn và giới hạn số lượng.

### Giỏ quà hoặc đặt làm vượt phạm vi

Giữ bộ mẫu và tùy chọn trong phạm vi đã thống nhất. Chốt cách tính ngân sách, báo giá, tiền cọc, hủy và hoàn tiền trước khi triển khai.

### Xung đột Git hoặc lỗi sau tích hợp

Trao đổi trước khi sửa file chung, rà soát PR và thử lại các luồng dùng chung sau merge. Người phụ trách xử lý lỗi thuộc phần mình.

### Lộ cấu hình hoặc sai quyền truy cập

Giữ thông tin bí mật ngoài repository; cung cấp cấu hình mẫu. Kiểm tra quyền và quyền sở hữu dữ liệu tại backend, bao gồm tài khoản, đơn hàng và yêu cầu đặt làm.

### Sandbox hoặc môi trường triển khai gặp lỗi

Thử kết nối và cấu hình sớm; kiểm tra lại trên bản triển khai. Chuẩn bị dữ liệu mẫu và hướng dẫn vận hành, duy trì quyền truy cập khi chấm.

### Thiếu hồ sơ hoặc chưa hiểu mã AI

Ghi nhận đóng góp, nguồn và AI log theo task. Kiểm tra kết quả AI, thực hành giải thích mã, dành thời gian sửa lỗi và tổng duyệt trước khi nộp.
