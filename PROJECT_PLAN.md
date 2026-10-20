# Kế hoạch dự án

## Thông tin dự án

- Nhóm thực hiện: Nhóm 7 — Phát triển ứng dụng TMĐT ST5.
- Đề tài: Website kinh doanh sản phẩm móc len handmade,
  hỗ trợ đặt làm theo mẫu và tạo giỏ quà theo ngân sách.
- Trưởng nhóm: Đức.
- Repository: https://github.com/ptudtmdt-st5-nhom7/crochet-handmade-ecommerce
- Trạng thái tài liệu: Bản kế hoạch ban đầu, đang được bổ sung
  và thống nhất trong nhóm.

Kế hoạch bao gồm công việc khởi tạo ở Chương 1 và các giai đoạn
phát triển website trong toàn bộ học phần.

Các mục chưa có người phụ trách hoặc thời gian cụ thể được
ghi rõ để nhóm tiếp tục hoàn thiện.

## 1. Thành viên và vai trò

### 1.1. Phân công trong giai đoạn khởi tạo

| Thành viên | Vai trò hiện tại | Trách nhiệm và kết quả phụ trách |
| --- | --- | --- |
| Đức | Trưởng nhóm, phụ trách đề tài và kế hoạch | Hoàn thiện đề tài và vấn đề kinh doanh; lập kế hoạch dự án; tạo repository và cấp quyền; theo dõi tiến độ; kiểm tra, xác nhận bản cuối và nộp bài |
| Quyến | Phụ trách nội dung khảo sát website T02 | Tổng hợp khảo sát ít nhất ba website; trình bày bảng so sánh, nhận xét và phương án áp dụng; bổ sung, chỉnh sửa theo góp ý |
| Tuấn | Nhận thực hiện T03–T04, phối hợp Bảo | Phối hợp phân tích yêu cầu bằng AI và phản biện bằng công cụ AI khác; lưu prompt, kết quả và nội dung cần nhóm quyết định |
| Bảo | Phối hợp thực hiện T03–T04 | Thống nhất với Tuấn cách chia phần phân tích và phản biện; kiểm tra kết quả và cung cấp thông tin sử dụng AI |
| Khanh | Phụ trách quy trình nghiệp vụ T06 | Mô tả quy trình mua sản phẩm có sẵn và đặt làm theo yêu cầu, dựa trên REQUIREMENTS.md đã thống nhất |
| Nam | Phụ trách chuẩn bị tài liệu GitHub và hỗ trợ Git | Chuẩn bị cấu trúc tài liệu, README.md, AGENTS.md và GitHub Issues; hỗ trợ thành viên cập nhật kết quả và commit |
| Châu | Phụ trách tổng hợp nhật ký AI và tổng kiểm tra | Tổng hợp AI_USAGE_LOG.md; kiểm tra hồ sơ Chương 1; theo dõi các nội dung thiếu và kết quả chỉnh sửa |

### 1.2. Các phân công cần thống nhất thêm

- Tuấn và Bảo xác định người phụ trách chính của T03 và T04.
- Quyến, Bảo và Tuấn thống nhất người tổng hợp REQUIREMENTS.md
  tại T05.
- Đức cùng nhóm bổ sung vai trò trong các giai đoạn thiết kế,
  frontend, backend, cơ sở dữ liệu, kiểm thử và triển khai.
- Mỗi công việc cụ thể cần có một người chịu trách nhiệm chính;
  các thành viên khác có thể phối hợp và kiểm tra.

### 1.3. Trách nhiệm chung

- Mỗi thành viên có sản phẩm hoặc kết quả công việc cụ thể.
- Thành viên cập nhật phần việc của mình lên GitHub bằng commit.
- Người tổng hợp có thể cập nhật file chung sau khi nhận đủ
  nội dung từ các thành viên.
- Mỗi phần bàn giao cần được một thành viên khác kiểm tra.
- Người sử dụng AI ghi lại thông tin thực tế và gửi Châu tổng hợp.
- Khi phát hiện chậm tiến độ hoặc thiếu đầu vào, thành viên
  báo cho trưởng nhóm để thống nhất cách xử lý.

## 2. Các giai đoạn thực hiện

| Giai đoạn | Nội dung thực hiện | Kết quả cần đạt |
| --- | --- | --- |
| 1. Khảo sát và xác định yêu cầu | Xác định đề tài, khách hàng và vấn đề kinh doanh; khảo sát website; phân tích và phản biện bằng AI; chốt yêu cầu; mô tả quy trình; lập kế hoạch và chuẩn bị GitHub | Bộ tài liệu Chương 1 được kiểm tra và thống nhất |
| 2. Thiết kế giao diện | Xác định các màn hình và luồng thao tác; thiết kế giao diện theo phạm vi đã chốt | Bản thiết kế giao diện và luồng tương tác làm đầu vào cho lập trình |
| 3. Xây dựng frontend | Xây dựng giao diện và xử lý tương tác phía người dùng theo thiết kế | Các màn hình và chức năng frontend theo yêu cầu |
| 4. Phát triển backend và cơ sở dữ liệu | Thiết kế dữ liệu; xây dựng API, phân quyền và xử lý nghiệp vụ | Cơ sở dữ liệu và các chức năng backend phục vụ website |
| 5. Tích hợp và kiểm thử | Kết nối frontend, backend và dữ liệu; kiểm tra luồng chính, ngoại lệ và quyền truy cập; sửa lỗi | Website hoạt động theo yêu cầu và có kết quả kiểm thử |
| 6. Triển khai và hoàn thiện | Đưa website lên môi trường triển khai; kiểm tra hoạt động; hoàn thiện tài liệu và báo cáo | Website có thể truy cập, tài liệu và hồ sơ đồ án hoàn thiện |

Thời gian và người phụ trách cụ thể của các giai đoạn 2–6
được Đức cùng nhóm bổ sung sau khi chốt phạm vi và đối chiếu
lịch học phần.

## 3. Công việc

### 3.1. Công việc Chương 1

Thời hạn được lấy từ checklist của nhóm.

Trạng thái được ghi theo thông tin hiện có. Nội dung chưa được
báo cáo hoặc kiểm tra được giữ ở trạng thái chờ xác nhận.

| Mã | Công việc | Người phụ trách | Kết quả cần đạt | Thời hạn | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| T01 | Lựa chọn đề tài và xác định vấn đề kinh doanh | Đức | Mô tả sản phẩm, khách hàng, vấn đề kinh doanh, giải pháp, điểm khác biệt và phạm vi ban đầu | 09:00 thứ Ba 20/10 | Đã có nội dung trong Word, chờ xác nhận bản cuối |
| T02 | Phân tích ít nhất ba website tương tự | Quyến | docs/competitor-analysis.md có URL, bảng so sánh, nhận xét và phương án áp dụng có lý do | 17:00 thứ Ba 20/10 | Quyến đã báo làm xong, đang nhờ kiểm tra |
| T03 | Dùng AI phân tích yêu cầu | Tuấn nhận việc, phối hợp Bảo; chờ chốt PIC chính | Công cụ, prompt, kết quả phân tích và danh sách nội dung cần kiểm tra | 17:00 thứ Ba 20/10 | Đã nhận việc, chưa có xác nhận hoàn thành |
| T04 | Dùng công cụ AI khác phản biện | Tuấn nhận việc, phối hợp Bảo; chờ chốt PIC chính | Công cụ, prompt, kết quả phản biện và bảng tổng hợp quyết định của nhóm | 17:00 thứ Ba 20/10 | Đã nhận việc, chưa có xác nhận hoàn thành |
| T05 | Xác định vai trò người dùng và chức năng | Quyến, Bảo, Tuấn; chờ thống nhất người tổng hợp | REQUIREMENTS.md có mục tiêu, phạm vi, vai trò, chức năng, ưu tiên, tiêu chí nghiệm thu và yêu cầu phi chức năng | 17:00 thứ Ba 20/10 | Chờ cập nhật |
| T06 | Xác định quy trình nghiệp vụ | Khanh | docs/business-workflow.md mô tả luồng chính, trạng thái và các ngoại lệ liên quan | 22:00 thứ Ba 20/10 | Chờ cập nhật |
| T07 | Lập kế hoạch và phân công | Đức | PROJECT_PLAN.md có thành viên, vai trò, các giai đoạn, công việc, thời hạn, trạng thái và rủi ro | 22:00 thứ Ba 20/10 | Đang chuẩn bị bản kế hoạch ban đầu |
| T08 | Chuẩn bị repository GitHub dùng chung | Nam; Đức tạo repository và cấp quyền | Repository Public, quyền đóng góp, cấu trúc tài liệu, README.md, AGENTS.md và GitHub Issues | 11:00 thứ Tư 21/10 | Đã có repository Public; đang bổ sung tài liệu và hoàn thiện quyền đóng góp |
| T09 | Đóng góp bằng Git và kiểm tra chéo | Tất cả; Nam hỗ trợ thao tác | Kết quả công việc được cập nhật bằng commit, có kiểm tra chéo và xử lý góp ý | 13:00 thứ Tư 21/10 | Đang triển khai, chờ tổng hợp kết quả đóng góp |
| T10 | Thực hiện quy trình sử dụng AI và tổng hợp nhật ký | Tất cả cung cấp thông tin; Châu tổng hợp | AI_USAGE_LOG.md ghi công cụ, mục đích, prompt, kết quả, phản biện, quyết định và người kiểm tra | 13:00 thứ Tư 21/10 | Chờ tổng hợp và xác nhận |
| T11 | Tổng kiểm tra và hoàn thiện hồ sơ | Châu; Đức kiểm tra chéo, xác nhận và nộp | Danh sách kiểm tra, kết quả xử lý các mục thiếu và đường dẫn repository được xác nhận | 17:00 thứ Tư 21/10 | Chờ các đầu ra được hoàn thiện |

### 3.2. Quan hệ phụ thuộc giữa các công việc

- T01 cung cấp đề tài và phạm vi ban đầu cho T02.
- T02 cung cấp kết quả khảo sát cho T03.
- T03 cung cấp bản phân tích để T04 phản biện.
- T04 và quyết định của nhóm là đầu vào để hoàn thiện T05.
- T05 cung cấp yêu cầu đã thống nhất cho T06 và T07.
- T06 và T07 có thể thực hiện song song sau T05.
- T08 được chuẩn bị ngay sau T01; phần hoàn thiện tài liệu
  tiếp tục sau khi nhận kết quả T05, T06 và T07.
- T09 được thực hiện trong quá trình các thành viên đưa kết quả
  lên GitHub và kiểm tra chéo.
- Quy trình AI tại T10 cần được thống nhất trước T03;
  nhật ký được ghi trong quá trình sử dụng và bổ sung khi có
  kết quả kiểm tra, quyết định của nhóm.
- T11 kiểm tra hồ sơ sau khi các đầu ra liên quan đã được
  hoàn thiện; mục còn thiếu được trả lại người phụ trách sửa.

### 3.3. Công việc phát triển website sau Chương 1

Bảng dưới xác định các nhóm việc dự kiến.
Đức cùng nhóm cần chia thành công việc cụ thể, bổ sung người
chịu trách nhiệm chính và thời hạn sau khi chốt yêu cầu.

| Mã | Công việc dự kiến | Người phụ trách | Kết quả cần đạt | Thời hạn | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| CV01 | Thiết kế các màn hình và luồng thao tác | Chờ phân công | Thiết kế các màn hình theo REQUIREMENTS.md | Chờ thống nhất | Chưa lập kế hoạch chi tiết |
| CV02 | Xây dựng giao diện và tương tác frontend | Chờ phân công | Frontend theo thiết kế và yêu cầu đã chốt | Chờ thống nhất | Chưa lập kế hoạch chi tiết |
| CV03 | Thiết kế cơ sở dữ liệu | Chờ phân công | Cấu trúc dữ liệu đáp ứng các nghiệp vụ trong phạm vi | Chờ thống nhất | Chưa lập kế hoạch chi tiết |
| CV04 | Xây dựng backend và xử lý nghiệp vụ | Chờ phân công | API, phân quyền và xử lý nghiệp vụ theo yêu cầu | Chờ thống nhất | Chưa lập kế hoạch chi tiết |
| CV05 | Tích hợp frontend, backend và dữ liệu | Chờ phân công | Các thành phần trao đổi dữ liệu và hoạt động cùng nhau | Chờ thống nhất | Chưa lập kế hoạch chi tiết |
| CV06 | Kiểm thử và sửa lỗi | Chờ phân công | Kết quả kiểm thử theo tiêu chí nghiệm thu; các lỗi được ghi nhận và xử lý | Chờ thống nhất | Chưa lập kế hoạch chi tiết |
| CV07 | Triển khai website | Chờ phân công | Website hoạt động trên môi trường triển khai | Chờ thống nhất | Chưa lập kế hoạch chi tiết |
| CV08 | Hoàn thiện tài liệu và báo cáo | Chờ phân công | Tài liệu sử dụng, tài liệu kỹ thuật và báo cáo theo yêu cầu học phần | Chờ thống nhất | Chưa lập kế hoạch chi tiết |

### 3.4. Theo dõi tiến độ và bàn giao

- Công việc được theo dõi trên GitHub Issues.
- Khi nhận việc, thành viên xác nhận đầu ra và thời hạn.
- Khi bàn giao, thành viên cập nhật file liên quan và commit
  với mô tả rõ nội dung thay đổi.
- Một thành viên khác kiểm tra và ghi nhận góp ý.
- Người phụ trách sửa các nội dung chưa đạt trước khi đóng việc.
- Chỉ ghi hoàn thành khi đã có kết quả đáp ứng yêu cầu và
  đã được kiểm tra.
- Giữ thời hạn kế hoạch ban đầu; nếu điều chỉnh, ghi lại
  thời hạn mới và lý do để nhóm theo dõi.

## 4. Rủi ro và phương án xử lý

Các nội dung dưới đây là rủi ro dự kiến và phương án đề xuất.
Nhóm xem xét, điều chỉnh và thống nhất khi hoàn thiện kế hoạch.

| Rủi ro | Ảnh hưởng | Phương án xử lý đề xuất |
| --- | --- | --- |
| Phạm vi chức năng quá rộng | Không đủ thời gian hoàn thành các chức năng chính | Chốt chức năng ưu tiên trong REQUIREMENTS.md; tách chức năng có thể phát triển sau |
| Chậm bàn giao công việc đầu vào | Các nhiệm vụ phụ thuộc bị chậm | Theo dõi tiến độ, báo sớm vướng mắc và thống nhất hỗ trợ hoặc điều chỉnh phân công |
| Chưa rõ người chịu trách nhiệm chính | Công việc bị bỏ sót hoặc nhiều người cùng chờ nhau | Chỉ định một PIC chính cho mỗi công việc trên GitHub Issues |
| Nhiều người cùng sửa một file | Xung đột nội dung hoặc ghi đè phần đã cập nhật | Thống nhất người tổng hợp; lấy bản mới nhất trước khi sửa; đối chiếu thay đổi trước khi đưa vào bản chung |
| Kết quả AI sai hoặc vượt phạm vi | Yêu cầu khó triển khai hoặc không giải quyết đúng vấn đề | Dùng công cụ AI khác phản biện; thành viên kiểm tra; nhóm quyết định giữ, sửa hoặc bỏ |
| Yêu cầu và quy trình nghiệp vụ không nhất quán | Thiết kế, lập trình và kiểm thử sai hướng | Đối chiếu REQUIREMENTS.md với quy trình; cập nhật các tài liệu liên quan khi có thay đổi |
| Thiếu kinh nghiệm với công nghệ hoặc tích hợp | Phát sinh lỗi và chậm tiến độ | Chọn công nghệ phù hợp năng lực; thử các phần quan trọng sớm; tích hợp theo từng phần |
| Kiểm thử muộn | Lỗi nghiệp vụ chỉ được phát hiện gần hạn nộp | Kiểm tra từng chức năng và luồng nghiệp vụ ngay khi có kết quả; ghi nhận và xử lý lỗi liên tục |
| Công khai thông tin bí mật trên repository | Lộ tài khoản, token hoặc dữ liệu không được phép công khai | Kiểm tra file trước khi commit; không đưa thông tin bí mật vào mã nguồn; dùng cấu hình môi trường phù hợp |
