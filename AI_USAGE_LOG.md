# AI_USAGE_LOG.md
# NHẬT KÝ SỬ DỤNG AI TRONG DỰ ÁN NHÓM

> **Môn học:** Phát triển ứng dụng thương mại điện tử  
> **Nhóm:** 7  
> **Nhiệm vụ:** T10 – Quy trình sử dụng AI trong dự án nhóm  
> **Đề tài:** Website kinh doanh sản phẩm móc len handmade, hỗ trợ đặt làm theo mẫu và tạo giỏ quà theo ngân sách  
> **Quy mô nhóm:** 8 người

---

## 1. Quy trình sử dụng AI của nhóm

1. **Phân tích yêu cầu tại T03:** Thành viên phụ trách sử dụng Gemini để phân tích đề tài, xác định mục tiêu, phạm vi, tác nhân, chức năng, quy trình nghiệp vụ và yêu cầu phi chức năng.
2. **Phản biện tại T04:** Sử dụng ChatGPT để đánh giá kết quả T03, tìm yêu cầu còn thiếu, chưa rõ, trùng lặp, chưa phù hợp phạm vi hoặc có rủi ro khi triển khai.
3. **Đối chiếu kết quả:** So sánh đề xuất T03 với phản biện T04 và thông tin đầu vào từ T01–T02.
4. **Quyết định của nhóm:** Với từng nội dung quan trọng, nhóm chọn giữ nguyên, chỉnh sửa, hoãn hoặc loại bỏ; ghi rõ lý do và vấn đề cần xác minh.
5. **Cập nhật yêu cầu:** Chỉnh sửa tài liệu yêu cầu dự án theo quyết định đã thống nhất. Nội dung chưa được xác nhận không tự động trở thành yêu cầu chính thức.
6. **Ghi nhật ký:** Người trực tiếp sử dụng AI cung cấp công cụ, ngày sử dụng, prompt, kết quả, phản biện, quyết định và người kiểm tra cho Châu.
7. **Rà soát và bàn giao:** Châu tổng hợp, kiểm tra trường thông tin còn thiếu và cập nhật `AI_USAGE_LOG.md`. Đức kiểm tra chéo hồ sơ, nội dung đối chiếu và minh chứng trước khi bàn giao tại T11.

**Nguyên tắc chung:** AI chỉ hỗ trợ phân tích và phản biện. Nhóm chịu trách nhiệm đánh giá, xác minh và đưa ra quyết định cuối cùng. Không ghi thông tin nhạy cảm, mật khẩu hoặc token vào nhật ký.

---

## 2. Nhật ký sử dụng AI

## 2.1. T03 – Dùng Gemini để phân tích yêu cầu

| Trường thông tin | Nội dung |
|---|---|
| Mã ghi nhận | AI-01 / T03 |
| Ngày thực hiện | 20/10/2026 |
| Công cụ AI | Google Gemini |
| Người thực hiện | Nguyễn Anh Tuấn |
| Mục đích | Phân tích đề tài website thương mại điện tử kinh doanh sản phẩm móc len handmade; xác định mục tiêu kinh doanh, phạm vi hệ thống, nhóm người dùng và chức năng dự kiến. |
| Đầu vào | Mô tả dự án, sản phẩm/dịch vụ, khách hàng mục tiêu, vấn đề kinh doanh và ba website tham khảo. |
| Thời gian thực hiện theo thông tin dự án | 20/10/2026 |
| Quy mô nhóm | 8 người |
| Website tham khảo | [Tiệm Len 1992](https://tiemlen1992.com), [Tiệm Chúng Mình](https://tiemchungminh.com), [Lyly Craft](https://lylycraft.vn) |

### Prompt chính

```text
Bạn là chuyên gia phân tích nghiệp vụ cho dự án thương mại điện tử.

Thông tin dự án:

- Tên dự án: Website kinh doanh sản phẩm móc len handmade hỗ trợ đặt làm theo mẫu và tạo giỏ quà theo ngân sách.
- Sản phẩm hoặc dịch vụ: Móc khóa, thú len, hoa len và phụ kiện nhỏ; sản phẩm làm sẵn; lựa chọn bộ quà phù hợp với ngân sách hoặc gửi yêu cầu cá nhân hóa dựa trên mẫu cửa hàng có khả năng thực hiện.
- Khách hàng mục tiêu: Sinh viên và người đi làm trẻ tại Việt Nam có nhu cầu mua sản phẩm móc len cho bản thân hoặc làm quà tặng.
- Vấn đề kinh doanh: Hỗ trợ khách hàng lựa chọn quà tặng trong giới hạn chi tiêu và thống nhất nội dung đặt làm; đồng thời giúp cửa hàng quản lý việc xác nhận và xử lý đơn trên một hệ thống.
- Website tham khảo: https://tiemlen1992.com, https://tiemchungminh.com, https://lylycraft.vn
- Thời gian thực hiện theo tài liệu dự án: 20/10/2026
- Quy mô nhóm: 8 người

Hãy phân tích mục tiêu, phạm vi, nhóm người dùng, chức năng chính,
quy trình nghiệp vụ và các yêu cầu phi chức năng của website.
Phân biệt rõ nội dung đề xuất với những thông tin cần nhóm xác minh.
```

### Kết quả AI đề xuất

**a. Mục tiêu và phạm vi**

- Phân phối sản phẩm móc len làm sẵn, hỗ trợ tạo giỏ quà theo ngân sách và tiếp nhận yêu cầu đặt làm theo mẫu.
- Xây dựng công cụ hỗ trợ khách mua sắm và trang quản trị giúp cửa hàng quản lý sản phẩm, đơn hàng và tiến độ gia công.
- Đề xuất thanh toán mô phỏng bằng COD/QR; không triển khai cổng thanh toán tự động hoặc API vận chuyển bên thứ ba trong phạm vi ban đầu.
- Ưu tiên website responsive thay vì phát triển ứng dụng di động độc lập.

**b. Nhóm người dùng và chức năng**

- **Khách vãng lai:** Xem danh mục, tìm kiếm, lọc sản phẩm, xem chi tiết và thử tạo giỏ quà theo ngân sách.
- **Khách hàng thành viên:** Quản lý hồ sơ, gửi yêu cầu đặt làm, đặt hàng và theo dõi đơn.
- **Quản trị viên:** Quản lý sản phẩm và danh mục, xử lý yêu cầu đặt làm, báo giá, cập nhật tiến độ và xem thống kê cơ bản.

**c. Các nhóm yêu cầu được đề xuất**

1. Tài khoản và phân quyền.
2. Danh mục, tìm kiếm, lọc và chi tiết sản phẩm.
3. Tạo giỏ quà theo ngân sách.
4. Đặt làm sản phẩm theo mẫu.
5. Giỏ hàng và đặt hàng.
6. Thanh toán trong phạm vi mô phỏng.
7. Quản lý và theo dõi đơn hàng.
8. Quản trị sản phẩm, đơn hàng và thống kê.

### Đánh giá kết quả T03

Kết quả Gemini tạo được khung yêu cầu ban đầu tương đối đầy đủ, gắn với hai vấn đề chính: hỗ trợ khách chọn quà theo ngân sách và giúp cửa hàng quản lý quy trình đặt làm.

Tuy nhiên, một số chức năng mới dừng ở mức mô tả tổng quát. Các quy tắc như cách tạo giỏ quà, xác nhận báo giá, thời hạn hoàn thành, trạng thái đơn hàng và tiêu chí kiểm thử cần được làm rõ trước khi triển khai.

### Quyết định ban đầu của nhóm

- **Giữ và tiếp tục phát triển:** Danh mục sản phẩm, tìm kiếm/lọc, giỏ hàng, đặt hàng, tạo giỏ quà theo ngân sách, đặt làm theo mẫu và quản trị đơn hàng.
- **Cần làm rõ:** Quy tắc tạo giỏ quà, quy trình báo giá đơn đặt làm, trạng thái đơn hàng, thanh toán và điều kiện kiểm thử.
- **Cần cân nhắc phạm vi:** Các chức năng bổ sung không trực tiếp phục vụ luồng mua hàng và xử lý đơn cốt lõi.
- **Lý do:** Tập trung nguồn lực vào nghiệp vụ chính, bảo đảm phù hợp thời gian và khả năng thực hiện đồ án.

**Người kiểm tra:** Quang Đức

---

## 2.2. T04 – Dùng ChatGPT để phản biện yêu cầu

### Thông tin sử dụng

| Trường thông tin | Nội dung |
|---|---|
| Mã ghi nhận | AI-02 / T04 |
| Công cụ AI | ChatGPT |
| Ngày sử dụng | 20/10/2026 (theo tài liệu dự án; cần xác nhận ngày thực tế) |
| Người thực hiện | Nguyễn Anh Tuấn |
| Mục đích | Phản biện độc lập danh sách yêu cầu do Gemini đề xuất tại T03; đánh giá mức độ phù hợp với vấn đề kinh doanh, phạm vi triển khai, quy trình nghiệp vụ, bảo mật và khả năng kiểm thử. |
| Đầu vào | Mô tả đề tài, vấn đề kinh doanh, khách hàng mục tiêu, kết quả khảo sát ba website và danh sách yêu cầu do Gemini đề xuất. |

### Prompt đã sử dụng

```text
Phân tích dữ liệu trên với vai trò và yêu cầu dưới đây:

Bạn là người phản biện độc lập cho một dự án website thương mại điện tử
do nhóm sinh viên thực hiện trong một học phần.

Tôi sẽ cung cấp:
1. Mô tả đề tài.
2. Vấn đề kinh doanh và khách hàng mục tiêu.
3. Kết quả khảo sát ba website.
4. Danh sách yêu cầu do một công cụ AI khác đề xuất.

Hãy phản biện các yêu cầu theo những khía cạnh:
- Có thực sự giải quyết vấn đề kinh doanh không?
- Có yêu cầu nào trùng lặp hoặc không cần thiết không?
- Có chức năng nào vượt quá phạm vi của nhóm không?
- Có thiếu chức năng cơ bản hoặc quy trình nghiệp vụ nào không?
- Có rủi ro về dữ liệu, bảo mật hoặc quyền riêng tư không?
- Có yêu cầu nào chưa đủ rõ để lập trình và kiểm thử không?

Với mỗi vấn đề, hãy nêu lý do và đề xuất điều chỉnh.
Không mặc định rằng phương án của công cụ AI trước là đúng.
Không tự ý thay đổi toàn bộ đề tài.
```

### Kết quả phản biện của ChatGPT

**a. Đánh giá khả năng giải quyết vấn đề kinh doanh**

ChatGPT nhận định các chức năng tạo giỏ quà theo ngân sách (F05), đặt làm theo mẫu (F06) và theo dõi tiến độ đơn hàng (F08) liên quan trực tiếp đến vấn đề kinh doanh. Tuy nhiên, chỉ xây dựng màn hình hoặc biểu mẫu là chưa đủ để giải quyết trọn vẹn nhu cầu.

- **F05 – Tạo giỏ quà theo ngân sách:** Nếu chỉ lọc sản phẩm theo giá, khách vẫn phải tự phối hợp từng món. Đề xuất luồng: nhập ngân sách → xem bộ quà phù hợp → chọn bộ → điều chỉnh sản phẩm/số lượng → kiểm tra tổng tiền → chuyển sang giỏ hàng.
- **F06 – Đặt làm theo mẫu:** Biểu mẫu chỉ thu thập thông tin ban đầu. Cần bổ sung quy trình cửa hàng phản hồi, báo giá, xác nhận giá và thời hạn, cùng điều kiện đặt cọc nếu áp dụng.
- **F08 – Theo dõi tiến độ:** Cần phân biệt tiến độ gia công với thời gian giao hàng; ghi nhận ngày khách mong muốn nhận và thời hạn dự kiến của cửa hàng.

Kết quả khảo sát ba website chưa đủ để khẳng định người dùng chắc chắn có nhu cầu với chức năng mới hoặc chức năng đó là điểm khác biệt đã được chứng minh. Nhóm nên xem đây là giả thuyết và kiểm tra thêm bằng bằng chứng phù hợp.

**b. Đánh giá chức năng trùng lặp và phạm vi**

- Giỏ hàng (F04) và tạo giỏ quà (F05) có thao tác tương tự nhưng khác mục đích. Giữ cả hai: F05 tạo bộ quà và kiểm soát ngân sách; F04 quản lý sản phẩm trước khi đặt hàng.
- Tích điểm, trò chuyện trực tiếp hoặc đánh giá kèm ảnh có thể làm tăng độ phức tạp. Ưu tiên luồng mua hàng và xử lý đơn cốt lõi trước.
- Danh sách yêu thích có thể là chức năng tùy chọn nếu nhóm còn đủ nguồn lực.

**c. Đánh giá quy trình nghiệp vụ**

Các trường hợp cần làm rõ:

- Đơn đặt làm có thể ở trạng thái chờ bổ sung thông tin, chờ báo giá, chờ đặt cọc, bị từ chối hoặc bị hủy.
- Trạng thái thanh toán cần tách biệt với trạng thái gia công.
- Xác định quy tắc chuyển trạng thái, xử lý hủy đơn và giao hàng thất bại.
- Làm rõ cách tính giá cho sản phẩm đặt làm và cách xử lý khi giỏ quà vượt ngân sách.

**d. Đánh giá bảo mật và khả năng kiểm thử**

- Cụ thể hóa quyền truy cập của khách hàng và quản trị viên.
- Bảo vệ mật khẩu và kiểm tra dữ liệu gửi lên, bao gồm ảnh đính kèm trong yêu cầu đặt làm.
- Chỉ thu thập dữ liệu cần thiết cho quy trình đặt hàng.
- Xác định thiết bị, trình duyệt, dữ liệu thử và tiêu chí nghiệm thu cho yêu cầu tốc độ, khả năng tương thích giao diện.

### Đánh giá kết quả T04

Kết quả phản biện giúp nhóm nhận diện những yêu cầu có ý nghĩa kinh doanh nhưng chưa đủ chi tiết để triển khai. Đặc biệt, F05, F06 và F08 cần mô tả đầy đủ quy trình nghiệp vụ thay vì chỉ liệt kê chức năng giao diện.

ChatGPT cũng chỉ ra một số chức năng có thể được thu hẹp hoặc chuyển thành tùy chọn để phù hợp nguồn lực của nhóm.

### Quyết định xử lý của nhóm sau T04

- **Giữ:** Các chức năng cốt lõi như giỏ hàng, tạo giỏ quà, đặt làm theo mẫu và quản lý đơn hàng.
- **Chỉnh sửa/bổ sung:** Làm rõ quy trình báo giá, xác nhận đơn đặt làm, trạng thái đơn, thanh toán, giao nhận, bảo mật và tiêu chí kiểm thử.
- **Chuyển thành tùy chọn:** Danh sách yêu thích và các chức năng chưa thiết yếu, tùy theo nguồn lực thực tế.
- **Loại khỏi phạm vi hiện tại:** Tích điểm đổi ưu đãi và Live Chat; vẫn giữ mã giảm giá cơ bản nếu phù hợp yêu cầu dự án.
- **Lý do:** Ưu tiên các chức năng giải quyết trực tiếp vấn đề kinh doanh, giảm độ phức tạp và bảo đảm khả năng hoàn thành, kiểm thử.

**Người kiểm tra:** Quang Đức

---

## 3. Bảng đối chiếu giữa đề xuất và phản biện

| Nội dung | AI thứ nhất đề xuất | AI thứ hai phản biện | Quyết định của nhóm |
|---|---|---|---|
| Quản lý tài khoản và phân quyền | Có | Cần cho quản lý khách hàng và bảo vệ trang quản trị | Giữ lại; bổ sung quản lý hồ sơ, địa chỉ |
| Tìm kiếm và lọc sản phẩm | Có | Đồng ý; cần thêm tiêu chí lọc | Giữ lại; bổ sung chất liệu, kích thước và sắp xếp |
| Xem chi tiết sản phẩm | Có | Cần cho quyết định mua hàng | Giữ lại |
| Quản lý giỏ hàng | Có | Cần cho quy trình mua hàng | Giữ lại |
| Tạo giỏ quà theo ngân sách | Có | Phù hợp đề tài nhưng cách chọn khoảng ngân sách chưa rõ | Giữ lại; cho khách nhập ngân sách cụ thể |
| Gợi ý bộ quà cấu hình sẵn | Chưa đầy đủ | Cần để giải quyết tốt hơn bài toán chọn quà theo ngân sách | Bổ sung vào chức năng tạo giỏ quà |
| Đặt làm theo mẫu | Có | Cần cửa hàng xác nhận khả năng thực hiện, giá và thời gian | Giữ lại và điều chỉnh |
| Báo giá và khách xác nhận | Có một phần | Chưa rõ thời điểm yêu cầu trở thành đơn hàng | Bổ sung quy trình khách chấp thuận trước khi tạo đơn |
| Đặt cọc đơn làm thủ công | Có đề xuất phương án | Không nên mặc định bỏ cọc hoặc áp dụng mức cọc 50% | Giữ chức năng cọc; nhóm xác định mức cọc sau |
| Thanh toán COD hoặc QR mẫu | Có | QR mẫu chưa đáp ứng đầy đủ yêu cầu tích hợp và kiểm thử thanh toán | Điều chỉnh, sử dụng một cổng thanh toán COD hoặc QR mẫu |
| Theo dõi lịch sử và tiến độ đơn | Có | Cần tách tiến độ gia công, thanh toán và giao hàng | Giữ lại và điều chỉnh |
| Quản trị hệ thống | Có | Cần thiết nhưng phạm vi quá rộng trong một chức năng | Giữ lại; tách thành các chức năng quản trị nhỏ |
| Đánh giá và bình luận sản phẩm | Có | Cần thiết sau mua nhưng ảnh đánh giá làm tăng khối lượng xử lý | Giữ đánh giá cơ bản; ảnh đánh giá phát triển sau |
| Danh sách yêu thích | Có | Không ảnh hưởng trực tiếp đến quy trình mua hàng chính | Đưa vào nhóm chức năng tùy chọn |
| Tích điểm khách hàng | Có | Có thể vượt phạm vi do phát sinh nhiều quy tắc nghiệp vụ | Đưa ra khỏi phiên bản đầu |
| Live Chat | Có | Có thể vượt phạm vi và tăng khối lượng lập trình, kiểm thử | Đưa ra khỏi phiên bản đầu |
| Phí đóng gói cố định 30.000 đồng | Có đề xuất | Chưa có căn cứ thực tế và làm thay đổi cách tính ngân sách | Không áp dụng mặc định; xác minh chính sách |
| Lựa chọn từng loại bao bì | Có đề xuất | Tăng phạm vi nhưng chưa trực tiếp giải quyết vấn đề chính | Chưa triển khai trong phiên bản đầu |
| Bảo mật và phân quyền dữ liệu | Có | Yêu cầu còn chung chung, khó kiểm thử | Giữ lại và cụ thể hóa tiêu chí bảo mật |
| Giao diện responsive và hiệu năng | Có | Cần xác định rõ môi trường và tiêu chí kiểm thử | Giữ lại và làm rõ tiêu chí nghiệm thu |

---

## 4. Kết luận và trách nhiệm của nhóm

Sau khi đối chiếu đề xuất của AI thứ nhất với kết quả phản biện của AI thứ hai, nhóm quyết định giữ lại các chức năng trực tiếp phục vụ quy trình mua hàng, tạo giỏ quà theo ngân sách và đặt làm theo mẫu. Những yêu cầu chưa rõ được nhóm điều chỉnh trước khi triển khai.

Các chức năng bổ trợ như danh sách yêu thích được đưa vào nhóm tùy chọn, trong khi tích điểm và Live Chat chưa được triển khai trong phiên bản đầu nhằm bảo đảm phù hợp với thời gian, kiến thức, chi phí và phạm vi của đồ án. Quyết định cuối cùng thuộc về nhóm và được đưa ra trên cơ sở mức độ cần thiết của từng chức năng đối với đề tài.

| Vai trò | Trách nhiệm |
|---|---|
| Thành viên trực tiếp sử dụng AI | Cung cấp công cụ, ngày sử dụng, prompt, kết quả, đánh giá và minh chứng |
| Châu | Tổng hợp nhật ký, kiểm tra trường thông tin còn thiếu và cập nhật `AI_USAGE_LOG.md` |
| Đức | Kiểm tra chéo hồ sơ, nội dung đối chiếu và minh chứng trước khi bàn giao tại T11 |
| Cả nhóm | Xác minh nội dung do AI đề xuất và chịu trách nhiệm về quyết định cuối cùng |

---

