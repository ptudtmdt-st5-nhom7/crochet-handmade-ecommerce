# NHẬT KÝ SỬ DỤNG AI TRONG DỰ ÁN NHÓM
> **Môn học:** Phát triển ứng dụng thương mại điện tử  
> **Nhóm:** 7  
> **Nhiệm vụ:** T10 – Quy trình sử dụng AI trong dự án nhóm  
> **Đề tài:** Website kinh doanh sản phẩm móc len handmade, hỗ trợ đặt làm theo mẫu và tạo giỏ quà theo ngân sách  
> **Quy mô nhóm:** 7 người

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
| Thời gian thực hiện theo thông tin dự án | 20/10/2026 - 17/12/2026 |
| Quy mô nhóm | 7 người |
| Website tham khảo | [Tiệm Len 1992](https://tiemlen1992.com), [Tiệm Chúng Mình](https://tiemchungminh.com), [Lyly Craft](https://lylycraft.vn) |

### Prompt chính

```text
*Có đính kèm dữ liệu T02
Bạn là chuyên gia phân tích nghiệp vụ cho dự án thương mại điện tử.

Thông tin dự án:

- Tên dự án: Website kinh doanh sản phẩm móc len handmade hỗ trợ đặt làm theo mẫu và tạo giỏ quà theo ngân sách.
- Sản phẩm hoặc dịch vụ: Móc khóa, thú len, hoa len và phụ kiện nhỏ; sản phẩm làm sẵn; lựa chọn bộ quà phù hợp với ngân sách hoặc gửi yêu cầu cá nhân hóa dựa trên mẫu cửa hàng có khả năng thực hiện.
- Khách hàng mục tiêu: Sinh viên và người đi làm trẻ tại Việt Nam có nhu cầu mua sản phẩm móc len cho bản thân hoặc làm quà tặng.
- Vấn đề kinh doanh: Hỗ trợ khách hàng lựa chọn quà tặng trong giới hạn chi tiêu và thống nhất nội dung đặt làm; đồng thời giúp cửa hàng quản lý việc xác nhận và xử lý đơn trên một hệ thống.
- Website tham khảo: https://tiemlen1992.com, https://tiemchungminh.com, https://lylycraft.vn
- Thời gian thực hiện theo tài liệu dự án: 20/10/2026 - 17/12/2026
- Quy mô nhóm: 7 người

Hãy đề xuất:
1. Mục tiêu và phạm vi dự án.
2. Các nhóm người dùng và quyền hạn.
3. Danh sách chức năng cần có.
4. Quy trình nghiệp vụ chính.
5. Yêu cầu phi chức năng.
6. Các chức năng nên hoàn thành ở phiên bản đầu tiên.
7. Các chức năng nâng cao có thể bổ sung.
8. Rủi ro khi triển khai và cách giảm thiểu.

Phân biệt rõ:
- Yêu cầu bắt buộc.
- Yêu cầu có thể phát triển sau.
- Đề xuất cần nhóm xác minh thêm.
Không giả định nhóm có đủ thời gian hoặc năng lực để triển khai.
Phát triển ứng dụng WEB/TMĐT tất cả chức năng. Hãy giải thích cơ sở của từng đề xuất.  
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
| Ngày sử dụng | 20/10/2026  |
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

## 2.3. Buổi 2 – Dùng ChatGPT soạn dữ liệu 8 sản phẩm

| Trường thông tin | Nội dung |
|---|---|
| Mã ghi nhận | (Châu cấp số) / Buổi 2 – Bước 2 |
| Ngày thực hiện | 28/10/2026 |
| Công cụ AI | ChatGPT (gói Plus) |
| Người thực hiện | Nguyễn Thanh Nam |
| Mục đích | Soạn nội dung 8 sản phẩm minh họa (mã, tên, danh mục, giá, mô tả, màu, kích thước, chất liệu) cho trang danh sách và trang chi tiết. |
| Đầu vào | Danh sách 8 sản phẩm do Nam chọn theo 4 danh mục của trang chủ (móc khóa, thú len, hoa len, phụ kiện), mẫu trình bày và các ràng buộc. |

### Prompt chính

```text
Tôi làm đồ án website bán đồ móc len handmade tên Lenly Crochet, khách hàng là sinh viên và người đi làm trẻ. Hãy viết dữ liệu minh họa cho 8 sản phẩm dưới đây.

Danh sách sản phẩm:
1. KC-001 Móc khóa gấu len (Móc khóa len)
2. KC-002 Móc khóa hoa cúc len (Móc khóa len)
3. TL-001 Thú len thỏ (Thú len)
4. TL-002 Thú len mèo (Thú len)
5. HL-001 Hoa tulip len (Hoa len)
6. HL-002 Bó hoa len nhỏ (Hoa len)
7. PK-001 Scrunchie len (Phụ kiện móc len)
8. PK-002 Kẹp tóc hoa len (Phụ kiện móc len)

Với mỗi sản phẩm, viết theo đúng mẫu: Mã, Tên, Danh mục, Giá (VND, mức hợp lý cho sinh viên), Mô tả ngắn (1-2 câu, giọng thân thiện), Màu, Kích thước, Chất liệu, File ảnh, Nguồn ảnh, Nguồn thông tin, Sản phẩm mẫu.

Yêu cầu:
- Không bịa thông tin thật của cửa hàng (địa chỉ, chính sách, cam kết).
- Không nhắc phí vận chuyển hay chương trình khuyến mãi.
- Chỉ trả về nội dung theo mẫu, không giải thích thêm.
```

### Kết quả AI đề xuất

- Bảng 8 sản phẩm theo đúng mẫu, giá từ 25.000 đến 125.000 đồng, mỗi sản phẩm có mô tả 2 câu, màu, kích thước, chất liệu.
- Cột nguồn ảnh ghi "Ảnh minh họa do ChatGPT tạo"; cột nguồn thông tin ghi "AI đề xuất, giá minh họa, nhóm chưa xác nhận".

### Đánh giá và kiểm tra

- Đối chiếu cột "File ảnh" với thư mục images: 8/8 tên ảnh khớp file thật.
- Giá và mô tả chỉ là dữ liệu minh họa, chưa có căn cứ từ cửa hàng thật. [Nam điền: đã sửa gì ở giá hoặc mô tả; nếu không sửa thì ghi "giữ nguyên"]
- Chọn Thú len thỏ (TL-001) làm sản phẩm mẫu vì có đủ màu, kích thước, chất liệu và ảnh rõ.

### Quyết định của nhóm

- **Giữ:** danh sách 8 sản phẩm, 4 danh mục và cách ghi nguồn.
- **Chỉnh sửa:** đổi đuôi ảnh từ .jpg sang .png cho khớp file thật; gắn link ảnh vào cột "File ảnh".
- **Hoãn:** xác nhận giá và mô tả thật khi nhóm có dữ liệu của cửa hàng.

**Người kiểm tra:** Nguyễn Quang Đức.

---

## 2.4. Buổi 2 – Dùng ChatGPT tạo 8 ảnh sản phẩm minh họa

| Trường thông tin | Nội dung |
|---|---|
| Mã ghi nhận | (Châu cấp số) / Buổi 2 – Bước 2 |
| Ngày thực hiện | 28/10/2026 |
| Công cụ AI | ChatGPT (gói Plus, tạo ảnh) |
| Người thực hiện | Nguyễn Thanh Nam |
| Mục đích | Tạo 8 ảnh sản phẩm minh họa đồng bộ phong cách cho trang danh sách và trang chi tiết. |
| Đầu vào | Thông tin từng sản phẩm trong bảng (tên, màu, kích thước, chất liệu) và mô tả phong cách chung. |

### Prompt chính

```text
Tạo cho tôi một ảnh sản phẩm cho website bán đồ móc len handmade.

Sản phẩm: Thú len thỏ, tai dài, dáng ngồi, màu kem phối hồng pastel, có nơ nhỏ, cao khoảng 18 cm, làm bằng sợi cotton milk, nhìn rõ từng mũi móc.

Phong cách (dùng cho các sản phẩm khác):
- Ảnh vuông 1:1
- Nền màu kem sáng trơn
- Ánh sáng mềm, chụp chính diện, từ trên cao một chút
- Sản phẩm đặt giữa khung, chiếm khoảng 70% ảnh
- Giống ảnh chụp sản phẩm thật
- Không có chữ, logo, tay người hay mặt người
```

Với 7 sản phẩm còn lại, Nam gửi lần lượt trong cùng cuộc trò chuyện: "Tạo tiếp ảnh sản phẩm số [N], giữ đúng phong cách các ảnh trước. Sản phẩm: [tên, màu, kích thước, chất liệu lấy từ bảng]."

### Kết quả AI đề xuất

- 8 ảnh PNG vuông 1254 x 1254, đồng bộ nền kem và ánh sáng, đặt tên product-1.png đến product-8.png, mỗi ảnh khoảng 1,8 đến 2 MB.

### Đánh giá và kiểm tra

- Xem từng ảnh: không có chữ hay logo lạ, sản phẩm nằm giữa khung, nền thống nhất.
- Ảnh do AI tạo, không phải ảnh sản phẩm thật nên đã ghi "Ảnh minh họa do ChatGPT tạo" ở cột nguồn ảnh.
- Sau khi đẩy lên GitHub, trang so sánh commit báo "Unable to render code block" ở một số ảnh. Mở trực tiếp từng file trong thư mục images và link trong bảng thì ảnh hiển thị bình thường, nên đây là lỗi hiển thị của GitHub.
- Hạn chế: 8 ảnh nặng khoảng 15 MB, có thể làm trang tải chậm.

### Quyết định của nhóm

- **Giữ:** cả 8 ảnh vì đủ rõ và đồng bộ.
- **Hoãn:** thu nhỏ kích thước ảnh nếu khi ghép trang thấy tải chậm.
- **Điều kiện:** nếu cửa hàng có ảnh sản phẩm thật thì thay ảnh minh họa.

**Người kiểm tra:** Nguyễn Quang Đức.

---

## 2.5. Buổi 2 — hỗ trợ phần chân trang của Nam

**Người thực hiện:** Nguyễn Thanh Nam. **Ngày:** 29/10/2026. **Công cụ:** OpenAI Codex trong VS Code.

**Mục đích và đầu vào:** Dùng AI hỗ trợ viết, giải thích và chỉnh HTML/CSS footer dùng chung theo yêu cầu của Nam, thiết kế Chương 2 và mã nguồn dự án.

**Prompt chính (trích yêu cầu thực tế):** "Tạo file docs/footer-mau.html, chỉ chứa đoạn HTML của thẻ <footer class="site-footer">"; "icon nằm dưới chỗ email"; "liên hệ nhảy lên cùng hàng với lenly, thông tin chính sách và liên kết nhanh"; "cái icon để nhỏ lại chút ... và để sát cái email hơn 1 tí".

**Kết quả:** Tạo mẫu footer docs/footer-mau.html và CSS trong ngăn FOOTER của css/style.css. Mỗi thành viên tự gắn đoạn HTML mẫu vào trang mình phụ trách. Bản hiện tại có bốn cột desktop: thương hiệu, chính sách, liên kết nhanh, liên hệ; tablet hai cột, mobile một cột. Icon Facebook/TikTok/Instagram nằm dưới email; khung icon 44px, SVG 22px. Giữ ghi chú học tập, màu, hover, focus và giảm chuyển động; không dùng JavaScript hay framework CSS. Chính sách và icon chưa có đường dẫn nên chỉ hiển thị.

**Phản biện và quyết định:** Các phương án đầu chưa cân đối giữa các cột. Nam yêu cầu điều chỉnh vị trí liên hệ và icon, rồi chọn giao diện cuối. So với thiết kế Chương 2 (3 vùng: thương hiệu, liên kết nhanh, liên hệ cùng ghi chú học tập), bản hiện tại có thêm cột chính sách (chỉ hiển thị chữ) và icon mạng xã hội (chưa có liên kết); chờ Nguyễn Quang Đức và Đặng Đình Quyến xác nhận giữ hay bỏ. Nhóm không tự thêm cam kết chính sách; nhóm chưa nghiệm thu chính thức.

**Kiểm tra:** Đã đối chiếu cấu trúc footer với mẫu và chạy git diff --check. Responsive và bàn phím: [Nam điền sau khi thử 3 cỡ 1366 / 768 / 390 và phím Tab]. **Người kiểm tra giao diện:** Nguyễn Thanh Nam. **Người nghiệm thu của nhóm:** Nguyễn Quang Đức.

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
| Tuấn | Cung cấp công cụ, ngày sử dụng, prompt, kết quả, đánh giá và minh chứng |
| Châu | Tổng hợp nhật ký, kiểm tra trường thông tin còn thiếu và cập nhật `AI_USAGE_LOG.md` |
| Đức | Kiểm tra chéo hồ sơ, nội dung đối chiếu và minh chứng trước khi bàn giao tại T11 |
| Cả nhóm | Xác minh nội dung do AI đề xuất và chịu trách nhiệm về quyết định cuối cùng |

---


### Đổi định dạng ảnh sản phẩm — 29/10/2026

- Người thực hiện: Nguyễn Thanh Nam. Công cụ: OpenAI Codex.
- Mục đích/prompt chính: “giờ t muốn đổi mấy file ảnh định dạng png sang webp hết á”, kèm tám file WebP.
- Kết quả: thay tám ảnh `images/product-1.png` đến `product-8.png` bằng các file WebP Nam cung cấp; cập nhật đường dẫn trong `docs/products-data.md`. Không chỉnh nội dung ảnh.
- Kiểm tra: nhận dạng header WebP, đối chiếu SHA-256 bản sao với nguồn, kiểm tra đường dẫn mới và tham chiếu PNG cũ.
- Quyết định của Nam: dùng WebP thay PNG. Đánh giá/người kiểm tra của nhóm: chưa ghi nhận.

### Bước 4 — Bản nháp header và trang chủ — 29/10/2026

- Người phụ trách: Nguyễn Quang Đức. Công cụ hỗ trợ: OpenAI Codex.
- Yêu cầu thực tế: “những việc này bạn có thể làm tiếp giúp tôi được đúng ko”, kèm ảnh các công việc header, menu, banner và trang chủ.
- Đầu vào: Bài làm 1 và Bài làm 3 trong Google Docs nhóm; dữ liệu sản phẩm và quy ước ở repository main tại 55ab2d5. Bộ tám sản phẩm là dữ liệu minh họa đã được Đức duyệt qua bàn giao chat phụ.
- Kết quả AI hỗ trợ: tạo index.html, CSS chung/header/trang chủ, mẫu header trong docs/header-mau.html và hướng dẫn docs/ban-giao-buoc4.md. Dùng màu, cỡ chữ, bố cục và sơ đồ liên kết theo Bước 3. Không triển khai xử lý tìm kiếm hoặc mua hàng.
- Kiểm tra của Codex: bản cục bộ tại 1366/768/390 px không tràn ngang; ảnh tải được; kiểm tra anchor bộ quà, focus bàn phím và dữ liệu bốn thẻ nổi bật. Ảnh kiểm tra lưu trong gói xem trước riêng.
- Điều chỉnh/giới hạn: nút tìm kiếm disabled, có ghi chú minh họa; mỗi sản phẩm dẫn đúng đích dự kiến thay vì cùng dẫn về mẫu thỏ. Logo gốc tải từ Drive bị từ chối quyền; dùng vùng giữ chỗ có nhãn, không dựng lại logo. Chưa ghép footer Nam, chưa kiểm thử các trang thành viên còn đang là khung.
- Phản biện và quyết định của Đức/nhóm: chưa ghi nhận sau khi xem bản nháp. Người kiểm tra bằng công cụ: Codex; người nghiệm thu nhóm: chờ Đức xác nhận. Chưa push, tạo Pull Request hoặc merge.

### Bước 4 (Hoàn thiện) — Tích hợp Logo gốc Bước 3 và Footer Bước 2 — 30/10/2026

- Người phụ trách: Nguyễn Quang Đức. Công cụ hỗ trợ: Google Gemini.
- Yêu cầu thực tế: Kiểm tra gói bản nháp Bước 4 (`lenly-buoc4`), bổ sung tệp logo gốc của Quyến từ Google Drive và ghép phần Footer dùng chung của Nam từ GitHub repository để hoàn thiện Bước 4.
- Đầu vào: Gói bản nháp `Lenly_Crochet_Buoc4_Ban_nhap.zip`, tệp `LOGO.png` (mẫu số 3) trong thư mục `Bài làm 3 / Logo` trên Google Drive, mã `docs/footer-mau.html` và CSS `.site-footer` tại commit `a34d0fc` (nhánh `buoc2-nam`), dữ liệu `docs/products-data.md` tại commit `55ab2d5` (nhánh `main`).
- Kết quả AI hỗ trợ:
  - Xử lý tách nền trong suốt cho `LOGO.png` thành `images/logo.png` (bản đã xử lý `402×430`; không có bản gốc `images/LOGO.png` trong commit đã tải lên), cập nhật vào `.site-brand` trong `index.html` và `docs/header-mau.html` thay cho ô giữ chỗ `.logo-pending`.
  - Tạo `docs/footer-mau.html`, ghép `<footer class="site-footer">` vào `index.html` (cùng các trang khung) và bổ sung đầy đủ CSS ngăn `/* ===== 3. FOOTER ===== */` vào `css/style.css`.
  - Cập nhật `docs/ban-giao-buoc4.md` và soạn `docs/bai-lam-4.md`.
- Kết quả kiểm tra do Gemini ghi trong bản bàn giao, chưa có ảnh hoặc log đi kèm tại commit 6137d7a: Kết xuất và kiểm tra trên trình duyệt Chromium ở cả 3 độ rộng `1366 px`, `768 px` và `390 px` (`scrollWidth == clientWidth`, không tràn ngang, logo và 8 ảnh WebP hiển thị đúng tỷ lệ, bố cục Footer chuyển đổi đúng 4 cột / 2 cột / 1 cột).

### Bước 4 — Sửa cấu trúc bàn giao và kiểm tra độc lập — 31/10/2026

- Người phụ trách: Nguyễn Quang Đức. Công cụ hỗ trợ: OpenAI Codex.
- Prompt thực tế: “ở nhánh `buoc4-duc` là tôi để file theo gemini kêu, tôi ko biết đã để đúng chưa, và chưa xem được nội dung có làm đúng chưa nữa, nếu nó đăng dư, sai thì hãy sửa và nói cho tôi biết bạn đã sửa gì để tôi xem bạn có làm đúng với yêu cầu ko nha”.
- Đầu vào: nhánh `buoc4-duc` tại `6137d7a`, bản nháp ZIP, TXT bàn giao, Bước 4/Bài làm 1/Bài làm 3 trong Google Docs, bảng phân công và logo trên Drive. Footer và các mục nhật ký 2.3–2.5 kế thừa nhánh `buoc2-nam` tại `d507e6f`.
- Phản biện: upload toàn bộ dự án trong `lenly-buoc4/` làm bản gốc vẫn trống và tạo bản sao tài liệu/ảnh; mô tả lưu `images/LOGO.png` không khớp git tree; nhật ký Nam chưa được ghép; đích liên kết các trang khác còn là khung; báo cáo trước chưa kèm minh chứng đầy đủ.
- Kết quả sửa: đưa trang chủ/CSS/logo/mẫu dùng chung về cấu trúc gốc; dùng lại HTML/CSS footer của Nam, chỉ thêm cách ly letter-spacing tiêu đề footer; giữ nguyên tám ảnh và dữ liệu sản phẩm; hợp nhất nhật ký Nam, WebP và Bước 4; sửa hướng dẫn/báo cáo/README; bỏ thư mục dự án lồng sau khi đối chiếu các file trùng. Giữ ba trang của thành viên khác ở khung footer Nam đã cung cấp.
- Kiểm tra độc lập: Chromium tại viewport 1366/768/390 px; scrollWidth bằng clientWidth lần lượt 1351/753/375 px; không có ảnh lỗi trên trang chủ sau khi cuộn tải; banner 2/2/1 cột, sản phẩm 4/2/1 cột, footer 4/2/1 cột. Bấm bộ quà đến đúng fragment; Tab đầu tiên hiện skip link và viền focus. Có ảnh và số đo trong `docs/minh-chung-buoc4/`.
- Quyết định áp dụng trong phạm vi người dùng yêu cầu: giữ nội dung/giao diện phù hợp, sửa tổ chức và mô tả sai, bỏ bản sao dư. Không tự viết nội dung của Bảo/Khanh/Tuấn, không coi các id chờ tích hợp là đã chạy đủ, không tạo lại prompt Gemini nguyên văn khi chưa có nguồn.
- Người kiểm tra bằng công cụ: Codex. Đức xem bản sửa và quyết định nghiệm thu. Cập nhật trên nhánh riêng; không merge `main`, không thay trạng thái trong Google Sheets hoặc tự nhận nhóm đã duyệt.

### Bước 4 — Cập nhật nhánh GitHub và Bài làm 4 trên Docs — 31/10/2026

- Người phụ trách: Nguyễn Quang Đức. Công cụ hỗ trợ: OpenAI Codex.
- Yêu cầu thực tế: “tôi sẽ gửi bạn tk github để bạn sửa giúp tôi luôn, và ghi nội dung cần nộp trên docs giúp tôi”.
- Thực hiện: dùng phiên trình duyệt đăng nhập tài khoản Đức để cập nhật `buoc4-duc`; đưa đủ mã và minh chứng về cấu trúc gốc, sau đó bỏ thư mục sao chép `lenly-buoc4/`. Không lưu thông tin đăng nhập vào repository hoặc tài liệu.
- Kiểm tra: tại commit `8e19a4f`, toàn bộ cây file trên GitHub khớp bản cục bộ `23e6bd9` đã kiểm tra. `main` vẫn ở `55ab2d5`; không merge PR footer của Nam hoặc tự thay trạng thái WORKING SPACE.
- Google Docs: điền tab [Bài làm 4](https://docs.google.com/document/d/1uIoFsaHZOZoELrRm6Y9PIP3tNZ9jMsXwfM6cFZjABJ8/edit?tab=t.e8hn99sxg0co), gồm đầu vào/kết quả, cấu trúc HTML/CSS, bảng kiểm tra, giới hạn bàn giao, sử dụng AI, ba câu trả lời kiến thức, ba ảnh và liên kết commit. Rà bản xuất sáu trang, chỉnh chú thích ảnh và câu hỏi không tách khỏi phần liên quan.
- Giới hạn: các id và nội dung trên trang danh sách, chi tiết và giới thiệu còn phụ thuộc tác giả từng trang; báo cáo ghi đúng phạm vi riêng trang chủ. Đức vẫn là người đọc, kiểm tra và quyết định nghiệm thu cuối.
