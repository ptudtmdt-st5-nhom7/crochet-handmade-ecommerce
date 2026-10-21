<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tài liệu quy trình nghiệp vụ website kinh doanh sản phẩm móc len</title>
</head>
<body style="max-width:980px;margin:0 auto;padding:16px;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;line-height:1.7;color:#27212a;background:#ffffff">

<h1 style="text-align:center;color:#c2457a">Tài liệu quy trình nghiệp vụ website kinh doanh sản phẩm móc len</h1>


<h2 style="color:#c2457a;border-bottom:2px solid #fbe6ef;padding-bottom:4px;margin-top:2em" id="mục-lục">Mục lục</h2>
<ol>
<li><a href="#1-mục-đích-và-phạm-vi">Mục đích và phạm vi</a></li>
<li><a href="#2-tác-nhân-tham-gia">Tác nhân tham gia</a></li>
<li><a href="#3-quy-trình-1-mua-sản-phẩm-làm-sẵn-hoặc-tạo-giỏ-quà-theo-ngân-sách">Quy trình 1: Mua sản phẩm làm sẵn hoặc tạo giỏ quà theo ngân sách</a></li>
<li><a href="#4-quy-trình-2-đặt-làm-theo-mẫucá-nhân-hóa-custom-order">Quy trình 2: Đặt làm theo mẫu/cá nhân hóa (Custom Order)</a></li>
<li><a href="#5-quy-tắc-nghiệp-vụ-dùng-chung">Quy tắc nghiệp vụ dùng chung</a></li>
<li><a href="#6-sơ-đồ-luồng-custom-order">Sơ đồ luồng Custom Order</a></li>
</ol>
<hr />
<h2 style="color:#c2457a;border-bottom:2px solid #fbe6ef;padding-bottom:4px;margin-top:2em" id="1-mục-đích-và-phạm-vi">1. Mục đích và phạm vi</h2>
<p>Tài liệu mô tả hai quy trình nghiệp vụ chính của website kinh doanh sản phẩm móc len, bao gồm quy trình mua sản phẩm làm sẵn hoặc tạo giỏ quà theo ngân sách và quy trình đặt làm sản phẩm theo mẫu hoặc yêu cầu cá nhân hóa (Custom Order). Mục tiêu là xác định trình tự xử lý, tác nhân tham gia, dữ liệu đầu vào và đầu ra, trạng thái nghiệp vụ, điều kiện chuyển bước và cách xử lý các trường hợp ngoại lệ, làm cơ sở cho việc thiết kế sơ đồ luồng và triển khai chức năng website.</p>
<p>Quy trình mua sản phẩm làm sẵn tập trung vào các chức năng F01, F03–F10, trong đó khách có thể tìm kiếm sản phẩm, xem chi tiết, tạo hoặc điều chỉnh giỏ quà, quản lý giỏ hàng và đặt hàng. Quy trình này có liên quan đến F19–F22 và F24 trong các nghiệp vụ quản lý sản phẩm, biến thể, tồn kho, bộ quà, đơn hàng và voucher. Các chức năng quản lý hồ sơ, địa chỉ và lịch sử mua hàng tại F02 và F11 được áp dụng khi khách thực hiện đặt hàng và theo dõi đơn.</p>
<p>Quy trình Custom Order tập trung vào F12–F17 và F23, bao gồm đặt làm theo mẫu có tùy chọn, gửi yêu cầu riêng cần báo giá, xem xét yêu cầu, bổ sung thông tin, lập và xác nhận báo giá, thanh toán tiền cọc khi có áp dụng, theo dõi tiến độ sản xuất và giao nhận. Trong đó, F12 và F13 được phân biệt theo hình thức đặt làm; không mặc định mọi yêu cầu đều phải trải qua quy trình báo giá riêng.</p>
<p>Các quy trình được thực hiện theo phân quyền người dùng quy định tại T05. Hệ thống phải kiểm tra dữ liệu, giá, tồn kho, điều kiện thanh toán và quyền truy cập ở phía máy chủ; lưu thông tin đơn hàng tại thời điểm chốt đơn và ghi nhận các thay đổi quan trọng theo phạm vi triển khai. Các phương thức thanh toán, quy tắc giữ tồn, điều kiện đặt cọc, hủy đơn và hoàn tiền phải tuân theo quyết định đã được nhóm thống nhất trước khi lập trình. Những chức năng ngoài phạm vi phiên bản đầu của T05 không được xem là chức năng bắt buộc trong hai quy trình.</p>
<h2 style="color:#c2457a;border-bottom:2px solid #fbe6ef;padding-bottom:4px;margin-top:2em" id="2-tác-nhân-tham-gia">2. Tác nhân tham gia</h2>
<div style="overflow-x:auto;margin:14px 0"><table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;min-width:560px;border-color:#eadfe4">
<thead>
<tr>
<th align="left" style="background:#f6e9ef">Tác nhân</th>
<th align="left" style="background:#f6e9ef">Vai trò trong quy trình</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Guest</strong> (Khách chưa đăng nhập)</td>
<td>Tìm kiếm, lọc và xem sản phẩm; sử dụng chức năng gợi ý bộ quà theo ngân sách; điều chỉnh bộ quà và quản lý giỏ hàng tạm thời theo phạm vi F03–F08. Khách phải đăng ký hoặc đăng nhập theo F01 trước khi đặt hàng hoặc gửi yêu cầu Custom Order. Giỏ hàng tạm thời được duy trì và đồng bộ sau khi đăng nhập theo quy tắc đã xác định trong T05.</td>
</tr>
<tr>
<td><strong>Customer</strong> (Khách hàng)</td>
<td>Quản lý hồ sơ, địa chỉ và giỏ hàng; đặt mua sản phẩm làm sẵn; gửi yêu cầu đặt làm; bổ sung thông tin; chấp nhận hoặc từ chối báo giá; thực hiện thanh toán theo điều kiện áp dụng và theo dõi đơn hàng thuộc tài khoản của mình. Customer chỉ được xem hoặc thay đổi dữ liệu thuộc quyền của bản thân.</td>
</tr>
<tr>
<td><strong>Staff</strong> (Nhân viên cửa hàng)</td>
<td>Thực hiện nghiệp vụ vận hành được cấp quyền, bao gồm tiếp nhận và xử lý đơn hàng, kiểm tra tồn kho, xem xét yêu cầu Custom Order, yêu cầu bổ sung thông tin, lập báo giá, cập nhật tiến độ sản xuất và giao nhận. Staff không được tự quản lý tài khoản quản trị hoặc thay đổi cấu hình phân quyền hệ thống.</td>
</tr>
<tr>
<td><strong>Admin</strong> (Quản trị viên)</td>
<td>Thực hiện các nghiệp vụ vận hành trong phạm vi được phân quyền; quản lý sản phẩm, danh mục, biến thể, bộ quà, voucher và người dùng; cấp vai trò, khóa hoặc mở tài khoản và xem thống kê cửa hàng. Các quyền quản trị đặc thù chỉ dành cho Admin và phải được kiểm tra ở phía máy chủ.</td>
</tr>
<tr>
<td><strong>Hệ thống website</strong></td>
<td>Kiểm tra dữ liệu đầu vào, xác thực người dùng và quyền truy cập, tính lại giá và tổng tiền phía máy chủ, kiểm tra tồn kho, tạo mã yêu cầu hoặc mã đơn tại đúng thời điểm, lưu dữ liệu và trạng thái, ghi nhận kết quả thanh toán theo phương thức thực tế được triển khai và ngăn ghi nhận trùng giao dịch. Hệ thống đồng thời bảo đảm khách hàng chỉ truy cập hồ sơ, địa chỉ, yêu cầu và đơn hàng thuộc tài khoản của mình.</td>
</tr>
</tbody>
</table></div>
<hr />
<h2 style="color:#c2457a;border-bottom:2px solid #fbe6ef;padding-bottom:4px;margin-top:2em" id="3-quy-trình-1-mua-sản-phẩm-làm-sẵn-hoặc-tạo-giỏ-quà-theo-ngân-sách">3. Quy trình 1: Mua sản phẩm làm sẵn hoặc tạo giỏ quà theo ngân sách</h2>
<h3 id="31-mục-tiêu">3.1. Mục tiêu</h3>
<p>Cho phép khách tìm sản phẩm làm sẵn, hoặc chọn các sản phẩm phù hợp với ngân sách để tạo giỏ quà, kiểm tra đơn hàng và hoàn tất đặt mua qua phương thức thanh toán được website hỗ trợ.</p>
<h3 id="32-dữ-liệu-đầu-vào-và-kết-quả">3.2. Dữ liệu đầu vào và kết quả</h3>
<h4 id="321-dữ-liệu-đầu-vào">3.2.1. Dữ liệu đầu vào</h4>
<ul>
<li>Danh sách sản phẩm làm sẵn được chọn, biến thể tương ứng nếu có và số lượng của từng sản phẩm.</li>
<li>Đối với giỏ quà theo ngân sách: mức ngân sách khách nhập, bộ quà cấu hình sẵn được lựa chọn và các điều chỉnh về thành phần hoặc số lượng theo chức năng F06–F07.</li>
<li>Thông tin người nhận gồm họ tên, số điện thoại, địa chỉ giao hàng và ghi chú nếu có. Địa chỉ được chọn từ danh sách địa chỉ đã lưu hoặc bổ sung trong quá trình đặt hàng theo F02.</li>
<li>Phương thức giao hàng hoặc hình thức vận chuyển được website hỗ trợ theo phạm vi F09.</li>
<li>Phương thức thanh toán được xác định trong phiên bản triển khai. Theo F10, website phải có ít nhất một cổng thanh toán sandbox và xử lý được kết quả thành công, thất bại hoặc hủy. Nếu nhóm triển khai thêm COD, cần quy định riêng thời điểm ghi nhận khoản thu và trạng thái thanh toán. QR giả lập chỉ được mô tả là phương thức mô phỏng nếu đó là cách thức thực tế mà nhóm lựa chọn triển khai.</li>
<li>Mã voucher nếu khách sử dụng. Hệ thống kiểm tra thời hạn, điều kiện áp dụng và giới hạn sử dụng theo F24; nếu mã không hợp lệ, hệ thống thông báo lý do và tính lại tổng tiền theo quy tắc đã thống nhất.</li>
<li>Các thông tin về giá, số lượng, tồn kho, phí vận chuyển, điều kiện voucher và tổng tiền được hệ thống kiểm tra lại phía máy chủ trước khi tạo đơn. Tổng tiền do giao diện gửi lên không được sử dụng trực tiếp làm căn cứ ghi nhận đơn hàng.</li>
</ul>
<h4 id="322-kết-quả-đầu-ra">3.2.2. Kết quả đầu ra</h4>
<ul>
<li>Giỏ hàng chứa danh sách sản phẩm lẻ hoặc bộ quà, biến thể, số lượng, giá tạm tính và tổng giá trị sản phẩm. Phí vận chuyển và các khoản giảm giá được thể hiện riêng.</li>
<li>Đơn hàng có mã đơn, thông tin người đặt và người nhận, địa chỉ giao hàng, phương thức vận chuyển, phương thức thanh toán và trạng thái xử lý ban đầu.</li>
<li>Chi tiết đơn hàng lưu tên sản phẩm, biến thể, cấu hình bộ quà, số lượng và đơn giá tại thời điểm chốt đơn. Việc cập nhật thông tin sản phẩm sau này không làm thay đổi dữ liệu lịch sử của đơn đã tạo.</li>
<li>Thông tin thanh toán gồm số tiền phải thanh toán, số tiền đã ghi nhận thành công, trạng thái thanh toán và mã tham chiếu giao dịch nếu phương thức triển khai có cung cấp.</li>
<li>Tồn kho được cập nhật hoặc giữ theo quy tắc đã được nhóm thống nhất; việc hủy đơn hoặc giao dịch không hoàn tất được xử lý theo điều kiện giải phóng tồn tương ứng.</li>
<li>Đơn hàng xuất hiện trong lịch sử mua hàng của Customer theo F11 và danh sách quản lý đơn hàng của Staff/Admin theo quyền được cấp.</li>
</ul>
<h3 id="33-các-bước-nghiệp-vụ">3.3. Các bước nghiệp vụ</h3>
<div style="overflow-x:auto;margin:14px 0"><table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;min-width:560px;border-color:#eadfe4">
<thead>
<tr>
<th align="left" style="background:#f6e9ef">Bước</th>
<th align="left" style="background:#f6e9ef">Tác nhân</th>
<th align="left" style="background:#f6e9ef">Xử lý</th>
<th align="left" style="background:#f6e9ef">Dữ liệu/trạng thái sau bước</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>Guest/Customer</td>
<td>Truy cập website, tìm kiếm hoặc lọc sản phẩm theo từ khóa, danh mục, khoảng giá hoặc màu sắc; xem chi tiết sản phẩm.</td>
<td>Khách chọn được sản phẩm phù hợp; chưa phát sinh đơn hàng.</td>
</tr>
<tr>
<td>2A</td>
<td>Guest/Customer</td>
<td>Đối với sản phẩm làm sẵn, chọn số lượng và thêm sản phẩm vào giỏ hàng.</td>
<td>Giỏ hàng được cập nhật.</td>
</tr>
<tr>
<td>2B</td>
<td>Guest/Customer và Hệ thống</td>
<td>Khách nhập mức ngân sách cụ thể. Hệ thống tìm và hiển thị các bộ quà cấu hình sẵn do cửa hàng thiết lập, có tổng giá trị sản phẩm phù hợp với ngân sách và đáp ứng điều kiện còn bán. Khách chọn một bộ quà và có thể đổi món, thay đổi số lượng hoặc bỏ món trong phạm vi chức năng F07. Sau mỗi lần điều chỉnh, hệ thống tính lại tổng giá trị sản phẩm và hiển thị số tiền còn lại hoặc số tiền vượt ngân sách.</td>
<td>Giỏ quà được tạo khi có ít nhất một sản phẩm hợp lệ và tổng giá trị sản phẩm không vượt ngân sách. Phí vận chuyển và các khoản phát sinh được tính riêng. Nếu không có bộ quà phù hợp, giỏ quà rỗng hoặc tổng giá trị vượt ngân sách, hệ thống thông báo để khách điều chỉnh. Việc gợi ý được thực hiện từ dữ liệu bộ quà do cửa hàng cấu hình, không sử dụng AI tự tạo bộ quà.</td>
</tr>
<tr>
<td>3</td>
<td>Guest/Customer</td>
<td>Xem giỏ hàng, kiểm tra sản phẩm, số lượng và giá; điều chỉnh hoặc xóa sản phẩm nếu cần.</td>
<td>Giỏ hàng được cập nhật theo lựa chọn của khách.</td>
</tr>
<tr>
<td>4</td>
<td>Guest/Customer</td>
<td>Khi chọn tiến hành đặt hàng, Guest phải đăng ký hoặc đăng nhập theo F01. Sau khi đăng nhập, hệ thống duy trì hoặc đồng bộ giỏ hàng tạm thời theo quy tắc đã thống nhất, đồng thời kiểm tra lại thông tin giỏ hàng. Customer chọn hoặc bổ sung địa chỉ giao hàng, nhập thông tin người nhận, chọn phương thức giao hàng và phương thức thanh toán được hỗ trợ. Khách có thể nhập mã voucher nếu muốn sử dụng.</td>
<td>Thông tin đặt hàng được chuyển đến bước kiểm tra phía máy chủ. Nếu khách chưa đăng nhập, hệ thống chưa tạo đơn hàng và hướng dẫn khách đăng nhập hoặc đăng ký.</td>
</tr>
<tr>
<td>5</td>
<td>Hệ thống</td>
<td>Hệ thống kiểm tra thông tin bắt buộc, giá hiện hành, biến thể, số lượng, tồn kho, địa chỉ giao hàng, phương thức vận chuyển và điều kiện voucher nếu có. Hệ thống tính phí vận chuyển, khoản giảm giá và tổng tiền ở phía máy chủ. Đối với bộ quà, hệ thống kiểm tra từng biến thể cấu thành bộ quà và tính tổng nhu cầu tồn kho của các sản phẩm, bao gồm cả sản phẩm bán lẻ và sản phẩm nằm trong bộ quà. Việc kiểm tra phải căn cứ vào cùng một nguồn tồn kho để tránh bán vượt số lượng thực tế.</td>
<td>Nếu dữ liệu hợp lệ, hệ thống hiển thị bảng xác nhận gồm sản phẩm, số lượng, giá, giảm giá, phí vận chuyển, tổng tiền, địa chỉ và phương thức thanh toán. Nếu dữ liệu không hợp lệ hoặc giá/tồn kho thay đổi, hệ thống thông báo cụ thể và yêu cầu khách điều chỉnh hoặc xác nhận lại trước khi tiếp tục.</td>
</tr>
<tr>
<td>6</td>
<td>Customer</td>
<td>Kiểm tra lần cuối thông tin sản phẩm, người nhận, tổng tiền và phương thức thanh toán; xác nhận đặt hàng.</td>
<td>Yêu cầu tạo đơn được gửi đến hệ thống.</td>
</tr>
<tr>
<td>7</td>
<td>Hệ thống</td>
<td>Sau khi Customer xác nhận, hệ thống kiểm tra lại giá, số lượng, tồn kho, voucher, phí vận chuyển và tổng tiền ở phía máy chủ. Nếu dữ liệu vẫn hợp lệ, hệ thống tạo mã đơn hàng và lưu thông tin người đặt, người nhận, địa chỉ, phương thức vận chuyển, phương thức thanh toán, chi tiết sản phẩm và giá tại thời điểm chốt đơn. Với bộ quà, hệ thống lưu thành phần, biến thể và số lượng cụ thể để bảo đảm thông tin lịch sử không thay đổi khi cấu hình bộ quà được cập nhật.<br><br>Hệ thống thực hiện giữ hoặc cập nhật tồn kho theo quy tắc mà nhóm đã thống nhất. Nếu tồn kho không còn đủ tại thời điểm xác nhận cuối cùng, hệ thống không tạo đơn với số lượng vượt tồn và thông báo để khách điều chỉnh. Điều kiện giải phóng tồn khi đơn bị hủy hoặc giao dịch không hoàn tất phải tuân theo quy tắc giữ tồn đã được xác định.</td>
<td>Đơn hàng được tạo với trạng thái ban đầu “Chờ xử lý” và xuất hiện trong lịch sử mua hàng của Customer. Thông tin thanh toán được ghi nhận riêng theo phương thức đã chọn; việc tạo đơn không đồng nghĩa với việc thanh toán đã thành công. Nếu dữ liệu không còn hợp lệ, hệ thống không tạo đơn sai và yêu cầu khách kiểm tra lại.</td>
</tr>
<tr>
<td>8</td>
<td>Staff/Admin</td>
<td>Tiếp nhận đơn mới, kiểm tra thông tin và xác nhận đơn hợp lệ. Sau khi xác nhận, cửa hàng tiến hành chuẩn bị sản phẩm.</td>
<td>Đơn hàng được cập nhật từ “Chờ xử lý” sang “Đã xác nhận” và “Đang chuẩn bị” theo tiến trình thực tế.</td>
</tr>
<tr>
<td>9</td>
<td>Staff/Admin</td>
<td>Sau khi hoàn tất chuẩn bị sản phẩm, cửa hàng đóng gói và bàn giao đơn cho đơn vị hoặc người thực hiện giao hàng; cập nhật trạng thái theo tiến trình thực tế.</td>
<td>Đơn hàng chuyển sang trạng thái “Đóng gói” và “Giao hàng” tương ứng với các mốc xử lý được ghi nhận.</td>
</tr>
<tr>
<td>10</td>
<td>Staff/Admin và Hệ thống</td>
<td>Ghi nhận kết quả giao nhận theo thông tin do cửa hàng tiếp nhận hoặc cập nhật. Chỉ chuyển đơn sang trạng thái hoàn thành khi đáp ứng điều kiện hoàn thành đã quy định.</td>
<td>Nếu giao nhận thành công theo quy ước của website, đơn hàng chuyển sang trạng thái “Hoàn thành”. Nếu giao nhận không thành công, đơn được giữ hoặc cập nhật theo trạng thái xử lý sự cố đã thống nhất; không tự động chuyển sang trạng thái “Hoàn thành”.</td>
</tr>
</tbody>
</table></div>
<h3 id="34-trạng-thái-và-nhánh-xử-lý">3.4. Trạng thái và nhánh xử lý</h3>
<p>Đối với đơn hàng sản phẩm làm sẵn, trạng thái “Đang móc len” không phù hợp với quy trình thông thường vì sản phẩm đã được hoàn thiện trước khi khách đặt mua. Do đó, các trạng thái xử lý chính của đơn hàng gồm “Chờ xử lý”, “Đã xác nhận”, “Đang chuẩn bị”, “Đóng gói”, “Giao hàng” và “Hoàn thành”. Ngoài ra, trạng thái “Đã hủy” có thể được sử dụng nếu website hỗ trợ và đơn đáp ứng điều kiện hủy theo chính sách đã thống nhất. Trường hợp giao hàng không thành công cần được ghi nhận và xử lý riêng, không mặc nhiên xem là đơn đã hoàn thành.</p>
<p>Các trạng thái được cập nhật theo tiến trình thực tế. Sau khi tiếp nhận đơn, Admin kiểm tra thông tin và xác nhận đơn hợp lệ. Cửa hàng tiếp tục chuẩn bị, đóng gói và bàn giao đơn cho quá trình giao hàng. Khi việc giao nhận kết thúc, đơn được cập nhật thành “Hoàn thành”. Nếu phát sinh sự cố, chẳng hạn khách yêu cầu hủy hoặc giao hàng không thành công, Admin ghi nhận tình trạng và xử lý theo quy tắc đã được nhóm thống nhất.</p>
<p>Bên cạnh trạng thái xử lý đơn hàng, hệ thống cần quản lý trạng thái thanh toán riêng biệt. Việc tách hai loại trạng thái giúp xác định độc lập tiến độ thực hiện đơn và tình trạng thanh toán của khách hàng.</p>
<p>Đối với phương thức thanh toán khi nhận hàng (COD), đơn hàng có thể đang được xử lý hoặc giao hàng trong khi khoản thanh toán chưa được ghi nhận hoàn tất. Đối với phương thức QR giả lập, hệ thống chỉ ghi nhận thanh toán thành công khi có kết quả xác nhận phù hợp với quy trình mô phỏng. Trạng thái “Đã cọc” chỉ sử dụng khi chính sách đặt cọc được nhóm xác nhận áp dụng. Việc cập nhật trạng thái thanh toán không thay thế việc cập nhật trạng thái xử lý đơn hàng. Mỗi trạng thái cần phản ánh đúng tiến trình tương ứng và kết quả được ghi nhận trong website.</p>
<p>Đối với thanh toán qua cổng sandbox, hệ thống phải xử lý tối thiểu ba kết quả: thành công, thất bại và hủy giao dịch. Chỉ giao dịch có kết quả thành công hợp lệ mới được cộng vào số tiền đã thu và cập nhật trạng thái thanh toán. Trường hợp giao dịch thất bại hoặc bị hủy, hệ thống không ghi nhận khoản thanh toán thành công và chỉ cho phép thử lại theo quy trình được triển khai.</p>
<p>Mỗi giao dịch cần được kiểm tra mã tham chiếu, số tiền và trạng thái trước khi ghi nhận. Nếu hệ thống nhận nhiều lần cùng một thông báo thanh toán, giao dịch chỉ được ghi nhận thành công một lần. Trạng thái đơn hàng và trạng thái thanh toán được lưu độc lập để tránh trường hợp đơn đã tạo bị hiểu nhầm là đã thanh toán.</p>
<div style="overflow-x:auto;margin:14px 0"><table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;min-width:560px;border-color:#eadfe4">
<thead>
<tr>
<th align="left" style="background:#f6e9ef">Trường hợp</th>
<th align="left" style="background:#f6e9ef">Cách xử lý</th>
</tr>
</thead>
<tbody>
<tr>
<td>Giỏ hàng rỗng hoặc thiếu thông tin bắt buộc</td>
<td>Không cho tạo đơn; chỉ rõ thông tin cần bổ sung.</td>
</tr>
<tr>
<td>Giá hoặc tồn kho thay đổi</td>
<td>Tính lại phía máy chủ, thông báo thông tin mới và yêu cầu khách xác nhận lại.</td>
</tr>
<tr>
<td>Sản phẩm hoặc biến thể hết hàng</td>
<td>Không tạo đơn với số lượng không đáp ứng; yêu cầu khách đổi biến thể hoặc số lượng.</td>
</tr>
<tr>
<td>Bộ quà vượt ngân sách</td>
<td>Yêu cầu điều chỉnh thành phần hoặc số lượng; không tính phí vận chuyển vào ngân sách sản phẩm.</td>
</tr>
<tr>
<td>Voucher hết hạn hoặc không đủ điều kiện</td>
<td>Từ chối áp dụng voucher, hiển thị lý do và tính lại tổng tiền.</td>
</tr>
<tr>
<td>Thanh toán sandbox thất bại hoặc bị hủy</td>
<td>Không ghi nhận thanh toán thành công; lưu kết quả giao dịch và cho thử lại nếu được hỗ trợ.</td>
</tr>
<tr>
<td>Nhận thông báo thanh toán trùng</td>
<td>Không ghi nhận trùng số tiền đã thu hoặc cập nhật trạng thái nhiều lần.</td>
</tr>
<tr>
<td>Khách yêu cầu hủy đơn</td>
<td>Kiểm tra trạng thái đơn và chính sách hủy; chỉ cập nhật “Đã hủy” khi đáp ứng điều kiện.</td>
</tr>
<tr>
<td>Giao hàng không thành công</td>
<td>Staff/Admin ghi nhận tình trạng và xử lý theo chính sách; không tự động chuyển sang “Hoàn thành”.</td>
</tr>
<tr>
<td>Hủy đơn hoặc giao dịch không hoàn tất</td>
<td>Giải phóng tồn theo điều kiện giữ tồn đã thống nhất; nếu có thanh toán, xử lý hoàn tiền theo chính sách áp dụng.</td>
</tr>
</tbody>
</table></div>
<h3 id="35-sơ-đồ-luồng-đơn-giản">3.5. Sơ đồ luồng đơn giản</h3>
<p>Sơ đồ dưới đây mô tả quy trình mua sản phẩm làm sẵn, bao gồm trường hợp khách tạo giỏ quà theo ngân sách.</p>

<p align="center">
  <a href="images/sơ đồ quy trình mua sản phẩm làm sẵn.jpg" target="_blank">
    <img
      src="images/sơ đồ quy trình mua sản phẩm làm sẵn.jpg"
      alt="Sơ đồ quy trình mua sản phẩm làm sẵn hoặc tạo giỏ quà theo ngân sách"
      width="100%"
      style="max-width: 100%; height: auto;"
    >
  </a>
</p>

<p align="center">
  <em>Nhấn vào hình để mở ảnh kích thước đầy đủ.</em>
</p>
<hr />
<h2 style="color:#c2457a;border-bottom:2px solid #fbe6ef;padding-bottom:4px;margin-top:2em" id="4-quy-trình-2-đặt-làm-theo-mẫucá-nhân-hóa-custom-order">4. Quy trình 2: Đặt làm theo mẫu/cá nhân hóa (Custom Order)</h2>
<h3 id="41-mục-tiêu">4.1. Mục tiêu</h3>
<p>Quy trình Custom Order nhằm chuẩn hóa việc tiếp nhận và xử lý các đơn đặt làm sản phẩm móc len theo mẫu hoặc yêu cầu cá nhân hóa. Quy trình bao gồm hai hình thức.</p>
<p><strong>Đối với F12: Đặt làm theo mẫu có tùy chọn,</strong> khách hàng lựa chọn mẫu và các tùy chọn được website hỗ trợ, chẳng hạn màu sắc, kích thước hoặc biến thể. Hệ thống hiển thị giá dự kiến theo cấu hình được chọn. Trước khi khách đặt cọc, cửa hàng phải xác nhận khả năng thực hiện và thời gian dự kiến. Nếu có nội dung cần điều chỉnh hoặc chưa thể xác nhận theo giá niêm yết, cửa hàng xử lý theo quy trình phù hợp đã được nhóm thống nhất.</p>
<p><strong>Đối với F13: Gửi yêu cầu riêng cần báo giá,</strong> khách cung cấp thông tin cá nhân hóa, ảnh tham khảo nếu có, số lượng, ngày mong muốn nhận hàng và ghi chú. Cửa hàng xem xét yêu cầu, yêu cầu bổ sung thông tin, từ chối hoặc lập báo giá theo F14. Khách chỉ có thể xác nhận đơn theo F15 sau khi chấp nhận phiên bản báo giá còn hiệu lực và đáp ứng các điều kiện chốt đơn đã thống nhất.</p>
<p>Sau khi đơn được xác nhận, cửa hàng thực hiện sản xuất, đóng gói và giao nhận; hệ thống lưu trạng thái xử lý, thanh toán và lịch sử thay đổi theo phạm vi F16 - F17 và F23. Yêu cầu ban đầu chưa được xem là đơn sản xuất đã xác nhận, và việc khách gửi yêu cầu không đồng nghĩa với cam kết chắc chắn về giá hoặc thời gian giao hàng.</p>
<h3 id="42-dữ-liệu-đầu-vào-và-kết-quả">4.2. Dữ liệu đầu vào và kết quả</h3>
<h4 id="421-dữ-liệu-đầu-vào">4.2.1. Dữ liệu đầu vào</h4>
<ul>
<li>Tài khoản Customer đã đăng nhập theo F01.</li>
<li>Đối với F12: mã mẫu sản phẩm trên website, các tùy chọn được hỗ trợ như màu sắc, kích thước hoặc biến thể, số lượng và thông tin cần thiết để cửa hàng xác nhận khả năng thực hiện.</li>
<li>Đối với F13: mẫu gốc hoặc mô tả sản phẩm mong muốn, màu sắc, kích thước, nội dung cá nhân hóa, ảnh tham khảo nếu có, số lượng, ngày mong muốn nhận hàng và ghi chú của khách.</li>
<li>Tệp ảnh tham khảo phải đáp ứng quy định về định dạng và dung lượng theo NF05. Hệ thống kiểm tra tệp trước khi lưu.</li>
<li>Đối với yêu cầu cần báo giá riêng: thông tin xem xét và báo giá do Staff/Admin có quyền xử lý cung cấp, gồm giá, thời gian dự kiến hoàn thành hoặc giao hàng, tiền cọc nếu áp dụng, thời hạn hiệu lực báo giá và điều kiện thanh toán.</li>
<li>Đối với yêu cầu theo mẫu có giá niêm yết: giá dự kiến được tính theo mẫu và các tùy chọn được hỗ trợ; cửa hàng vẫn phải xác nhận khả năng thực hiện và thời gian trước khi khách đặt cọc.</li>
</ul>
<p>Báo giá phải gắn với một phiên bản yêu cầu cụ thể. Khi nội dung yêu cầu thay đổi làm ảnh hưởng đến giá hoặc thời gian, cửa hàng phải cập nhật báo giá và yêu cầu khách xác nhận lại trước khi tiếp tục.</p>
<h4 id="422-kết-quả-đầu-ra">4.2.2. Kết quả đầu ra</h4>
<ul>
<li>Mã yêu cầu Custom Order, thông tin khách hàng, mẫu gốc, màu sắc, kích thước, nội dung cá nhân hóa, số lượng, ngày mong muốn nhận hàng, ghi chú và tệp tham khảo hợp lệ.</li>
<li>Trạng thái xem xét yêu cầu, gồm chờ cửa hàng xem xét, cần bổ sung thông tin, chờ khách phản hồi báo giá hoặc bị từ chối theo kết quả xử lý.</li>
<li>Thông tin báo giá gồm mã hoặc phiên bản báo giá, giá áp dụng, thời gian dự kiến, số tiền cọc nếu có, điều kiện thanh toán và thời hạn hiệu lực.</li>
<li>Kết quả khách chấp nhận hoặc từ chối báo giá. Chỉ sử dụng báo giá hiện hành còn hiệu lực làm căn cứ xác nhận đơn.</li>
<li>Thông tin đơn đặt làm sau khi đáp ứng điều kiện chốt đơn, bao gồm nội dung yêu cầu đã xác nhận, giá cuối cùng, thời gian dự kiến và trạng thái đơn.</li>
<li>Lịch sử thanh toán gồm các giao dịch hợp lệ, số tiền đã thu và số tiền còn phải thanh toán theo điều kiện áp dụng.</li>
<li>Lịch sử tiến độ sản xuất và giao nhận, bao gồm trạng thái, thời gian cập nhật và người thực hiện theo F17 và yêu cầu NF09.</li>
</ul>
<h3 id="43-các-bước-nghiệp-vụ">4.3. Các bước nghiệp vụ</h3>
<p>Quy trình Custom Order được phân thành hai nhánh theo hình thức đặt làm. Đối với F12, khách chọn mẫu có sẵn và các tùy chọn được hỗ trợ; hệ thống tính giá dự kiến và cửa hàng xác nhận khả năng thực hiện cùng thời gian dự kiến trước khi khách đặt cọc. Nếu yêu cầu cần điều chỉnh giá hoặc lập báo giá riêng, yêu cầu được chuyển sang nhánh xem xét và báo giá theo quy tắc đã thống nhất. Đối với F13, khách gửi yêu cầu riêng cần báo giá; Staff/Admin xem xét và quyết định yêu cầu bổ sung thông tin, từ chối hoặc lập báo giá theo F14.</p>
<p>Trong nhánh F13, sau khi cửa hàng lập báo giá, khách có thể chấp nhận hoặc từ chối. Nếu khách chấp nhận báo giá còn hiệu lực, hệ thống kiểm tra các điều kiện chốt đơn. Chỉ khi các điều kiện cần thiết được đáp ứng, đơn mới được chuyển sang trạng thái phù hợp để sản xuất. Việc thanh toán hoặc đặt cọc trước chỉ bắt buộc khi được quy định trong báo giá hoặc chính sách đã thống nhất.</p>
<div style="overflow-x:auto;margin:14px 0"><table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;min-width:560px;border-color:#eadfe4">
<thead>
<tr>
<th align="left" style="background:#f6e9ef">Bước</th>
<th align="left" style="background:#f6e9ef">Tác nhân</th>
<th align="left" style="background:#f6e9ef">Xử lý</th>
<th align="left" style="background:#f6e9ef">Dữ liệu/trạng thái sau bước</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>Customer</td>
<td>Customer đăng nhập và chọn một trong hai hình thức: đặt làm theo mẫu có tùy chọn (F12) hoặc gửi yêu cầu riêng cần báo giá (F13).</td>
<td>Hệ thống xác định đúng loại nghiệp vụ để chuyển sang biểu mẫu tương ứng.</td>
</tr>
<tr>
<td>2</td>
<td>Customer</td>
<td>Với F12, khách chọn mẫu, màu sắc, kích thước hoặc biến thể được hỗ trợ và số lượng. Với F13, khách cung cấp mẫu gốc hoặc mô tả yêu cầu, màu sắc, kích thước, nội dung cá nhân hóa, ảnh tham khảo nếu có, số lượng, ngày mong muốn nhận hàng và ghi chú.</td>
<td>Biểu mẫu được hoàn thiện theo các trường bắt buộc của từng hình thức đặt làm.</td>
</tr>
<tr>
<td>3</td>
<td>Hệ thống</td>
<td>Hệ thống kiểm tra trường bắt buộc, tính hợp lệ của tùy chọn, số lượng và tệp đính kèm. Đối với F13, hệ thống tạo mã yêu cầu và lưu thông tin hợp lệ. Đối với F12, hệ thống tính giá dự kiến theo mẫu và tùy chọn đã chọn, đồng thời chuyển thông tin đến cửa hàng để xác nhận khả năng thực hiện và thời gian trước khi cho phép đặt cọc.</td>
<td>F13 có mã yêu cầu với trạng thái “Chờ cửa hàng xem xét”. F12 có thông tin mẫu, tùy chọn và giá dự kiến để cửa hàng kiểm tra. Chưa có nhánh nào được xem là đã bắt đầu sản xuất.</td>
</tr>
<tr>
<td>4</td>
<td>Staff/Admin</td>
<td>Đối với F12, Staff/Admin kiểm tra mẫu, tùy chọn, khả năng thực hiện và thời gian dự kiến. Nếu có thể thực hiện, cửa hàng xác nhận thông tin để khách tiếp tục theo điều kiện đặt làm đã thống nhất. Nếu cần thay đổi giá hoặc lập báo giá riêng, chuyển sang quy trình báo giá tương ứng.<br><br>Đối với F13, Staff/Admin xem xét mẫu, màu sắc, kích thước, số lượng, ảnh tham khảo, ghi chú và ngày mong muốn nhận hàng. Cửa hàng quyết định yêu cầu cần bổ sung thông tin, không thể thực hiện hoặc đủ điều kiện lập báo giá.</td>
<td>Yêu cầu F13 được chuyển sang một trong ba nhánh: cần bổ sung thông tin, bị từ chối hoặc lập báo giá. Yêu cầu F12 được xác nhận khả năng thực hiện và thời gian dự kiến hoặc chuyển sang xử lý bổ sung nếu chưa đủ điều kiện.</td>
</tr>
<tr>
<td>5A</td>
<td>Admin</td>
<td>Nếu thông tin chưa đủ, ghi rõ nội dung cần bổ sung và gửi thông báo cho khách.</td>
<td>Trạng thái “Cần bổ sung thông tin”.</td>
</tr>
<tr>
<td>6A</td>
<td>Customer</td>
<td>Bổ sung hoặc chỉnh sửa thông tin theo yêu cầu của Admin.</td>
<td>Yêu cầu được cập nhật và quay lại trạng thái “Chờ cửa hàng xem xét”.</td>
</tr>
<tr>
<td>5B</td>
<td>Admin</td>
<td>Nếu cửa hàng không thể thực hiện, ghi lý do và thông báo từ chối yêu cầu.</td>
<td>Trạng thái “Bị từ chối”; kết thúc quy trình, không phát sinh sản xuất.</td>
</tr>
<tr>
<td>5C</td>
<td>Staff/Admin</td>
<td>Khi yêu cầu F13 đủ điều kiện thực hiện, Staff/Admin lập báo giá gồm giá áp dụng, thời gian dự kiến hoàn thành hoặc giao hàng, số tiền cọc nếu có, điều kiện thanh toán và thời hạn hiệu lực. Báo giá phải gắn với phiên bản yêu cầu cụ thể và được gửi cho Customer xem xét. Nếu nội dung yêu cầu thay đổi làm ảnh hưởng đến giá hoặc thời gian, cửa hàng lập phiên bản báo giá mới thay vì âm thầm ghi đè báo giá đã gửi hoặc đã được khách chấp nhận.</td>
<td>Yêu cầu chuyển sang “Chờ khách phản hồi báo giá”. Hệ thống lưu nội dung và thời hạn hiệu lực của báo giá để kiểm tra khi khách phản hồi.</td>
</tr>
<tr>
<td>7</td>
<td>Customer</td>
<td>Customer xem nội dung yêu cầu, phiên bản báo giá hiện hành, giá, thời gian dự kiến, điều kiện thanh toán và thời hạn hiệu lực. Hệ thống kiểm tra báo giá trước khi ghi nhận phản hồi.</td>
<td>Nếu khách từ chối, hệ thống ghi nhận “Báo giá bị từ chối” và kết thúc nhánh này. Nếu khách chấp nhận báo giá còn hiệu lực, hệ thống ghi nhận phiên bản được chấp nhận và chuyển sang kiểm tra điều kiện chốt đơn. Nếu báo giá đã hết hiệu lực hoặc nội dung đã thay đổi, khách phải xác nhận báo giá cập nhật trước khi tiếp tục. Việc chấp nhận báo giá chưa đồng nghĩa với việc đơn đã được phép sản xuất.</td>
</tr>
<tr>
<td>8</td>
<td>Customer/Hệ thống</td>
<td>Nếu báo giá quy định phải đặt cọc hoặc thanh toán trước, Customer thực hiện giao dịch theo phương thức được website hỗ trợ. Hệ thống kiểm tra kết quả giao dịch, số tiền và mã tham chiếu; ghi nhận số tiền đã thu, số tiền còn lại và trạng thái thanh toán. Một giao dịch thành công chỉ được ghi nhận một lần. Nếu báo giá không yêu cầu thanh toán trước, bước này không bắt buộc.</td>
<td>Giao dịch thành công được ghi nhận theo điều kiện thanh toán áp dụng. Giao dịch thất bại hoặc bị hủy không được ghi nhận là đã thanh toán. Nếu điều kiện thanh toán trước chưa được đáp ứng, đơn chưa đủ điều kiện chuyển sang sản xuất.</td>
</tr>
<tr>
<td>9</td>
<td>Hệ thống và Staff/Admin</td>
<td>Hệ thống kiểm tra khách đã chấp nhận báo giá còn hiệu lực, nội dung yêu cầu đã được xác nhận và các điều kiện chốt đơn đã đáp ứng hay chưa. Nếu có yêu cầu thanh toán hoặc đặt cọc trước, hệ thống kiểm tra kết quả giao dịch tương ứng. Staff/Admin xác nhận nghiệp vụ theo quyền được cấp.</td>
<td>Khi đủ điều kiện, hệ thống lưu nội dung yêu cầu cuối cùng, phiên bản báo giá được chấp nhận, giá cuối cùng, thời gian dự kiến và thông tin thanh toán; đơn chuyển sang “Chờ sản xuất”. Nếu chưa đáp ứng điều kiện thanh toán trước, đơn tiếp tục ở trạng thái “Chờ thanh toán/đặt cọc” và chưa được đưa vào sản xuất. Nếu báo giá không yêu cầu thanh toán trước, đơn có thể chuyển sang “Chờ sản xuất” sau khi đáp ứng các điều kiện chốt đơn còn lại.</td>
</tr>
<tr>
<td>10</td>
<td>Admin/Hệ thống</td>
<td>Tiến hành móc len theo mẫu, màu sắc, kích thước và các yêu cầu đã được khách xác nhận; cập nhật tiến độ thực hiện theo quy trình của cửa hàng.</td>
<td>Đơn chuyển từ “Chờ sản xuất” sang “Đang móc len”. Khi sản phẩm hoàn thành, đơn đủ điều kiện chuyển sang công đoạn đóng gói.</td>
</tr>
<tr>
<td>11</td>
<td>Admin/Hệ thống</td>
<td>Sau khi sản phẩm hoàn thành, cửa hàng đóng gói, bàn giao đơn cho quá trình giao hàng và cập nhật trạng thái theo tiến trình thực tế. Ghi nhận kết quả giao nhận theo quy ước của website.</td>
<td>Đơn lần lượt được ghi nhận ở trạng thái “Đóng gói”, “Giao hàng” và “Hoàn thành” khi đáp ứng điều kiện tương ứng. Nếu giao hàng không thành công, đơn được xử lý theo quy trình ngoại lệ, không tự động chuyển sang “Hoàn thành”.</td>
</tr>
<tr>
<td>12</td>
<td>Customer</td>
<td>Truy cập tài khoản để xem thông tin và tiến độ đơn đặt làm.</td>
<td>Khách theo dõi được trạng thái xử lý và kết quả giao nhận.</td>
</tr>
</tbody>
</table></div>
<h3 id="44-trạng-thái-nghiệp-vụ-đề-xuất">4.4. Trạng thái nghiệp vụ đề xuất</h3>
<h4 id="441-trạng-thái-yêu-cầu-và-báo-giá">4.4.1. Trạng thái yêu cầu và báo giá</h4>
<div style="overflow-x:auto;margin:14px 0"><table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;min-width:560px;border-color:#eadfe4">
<thead>
<tr>
<th align="left" style="background:#f6e9ef">Trạng thái</th>
<th align="left" style="background:#f6e9ef">Ý nghĩa</th>
</tr>
</thead>
<tbody>
<tr>
<td>Chờ cửa hàng xem xét</td>
<td>Yêu cầu hợp lệ đã được tiếp nhận và chờ Staff/Admin đánh giá.</td>
</tr>
<tr>
<td>Cần bổ sung thông tin</td>
<td>Staff/Admin yêu cầu khách cung cấp hoặc chỉnh sửa thông tin cần thiết.</td>
</tr>
<tr>
<td>Chờ khách phản hồi báo giá</td>
<td>Báo giá đã được gửi và còn thời hạn để khách phản hồi.</td>
</tr>
<tr>
<td>Báo giá bị từ chối</td>
<td>Khách từ chối báo giá; nhánh báo giá kết thúc.</td>
</tr>
<tr>
<td>Bị từ chối</td>
<td>Cửa hàng không thể thực hiện yêu cầu và đã thông báo lý do cho khách.</td>
</tr>
</tbody>
</table></div>
<p>Sau khi khách bổ sung thông tin, hệ thống cập nhật yêu cầu hiện có và chuyển về “Chờ cửa hàng xem xét”. Nếu báo giá hết hiệu lực, hệ thống không cho khách chấp nhận báo giá đó; cửa hàng cần gửi báo giá mới hoặc xác nhận lại điều kiện trước khi tiếp tục.</p>
<h4 id="442-trạng-thái-đơn-đặt-làm">4.4.2. Trạng thái đơn đặt làm</h4>
<div style="overflow-x:auto;margin:14px 0"><table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;min-width:560px;border-color:#eadfe4">
<thead>
<tr>
<th align="left" style="background:#f6e9ef">Trạng thái</th>
<th align="left" style="background:#f6e9ef">Ý nghĩa</th>
</tr>
</thead>
<tbody>
<tr>
<td>Chờ thanh toán/đặt cọc</td>
<td>Khách đã chấp nhận báo giá còn hiệu lực và cần hoàn tất thanh toán trước theo điều kiện đã thống nhất, nhưng chưa đáp ứng điều kiện đó.</td>
</tr>
<tr>
<td>Chờ sản xuất</td>
<td>Đơn đã đáp ứng các điều kiện chốt đơn; nếu có yêu cầu thanh toán trước thì giao dịch phải được xác nhận thành công.</td>
</tr>
<tr>
<td>Đang móc len</td>
<td>Cửa hàng đã bắt đầu sản xuất theo nội dung được khách xác nhận.</td>
</tr>
<tr>
<td>Đóng gói</td>
<td>Sản phẩm đã hoàn tất sản xuất và đang được đóng gói.</td>
</tr>
<tr>
<td>Giao hàng</td>
<td>Đơn đã được bàn giao cho quá trình giao nhận.</td>
</tr>
<tr>
<td>Hoàn thành</td>
<td>Việc giao nhận đáp ứng điều kiện hoàn thành do nhóm quy định.</td>
</tr>
<tr>
<td>Đã hủy</td>
<td>Yêu cầu hủy đã được chấp thuận theo chính sách áp dụng. Việc hủy không mặc nhiên đồng nghĩa với hoàn tiền hoặc hoàn cọc.</td>
</tr>
</tbody>
</table></div>
<p>Không được tự động chuyển sang “Đang móc len” chỉ vì khách đã chấp nhận báo giá. Cần bảo đảm điều kiện chốt đơn đã hoàn tất và cửa hàng thực sự bắt đầu sản xuất.</p>
<h4 id="443-trạng-thái-thanh-toán">4.4.3. Trạng thái thanh toán</h4>
<div style="overflow-x:auto;margin:14px 0"><table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;min-width:560px;border-color:#eadfe4">
<thead>
<tr>
<th align="left" style="background:#f6e9ef">Trạng thái thanh toán</th>
<th align="left" style="background:#f6e9ef">Ý nghĩa</th>
</tr>
</thead>
<tbody>
<tr>
<td>Chưa thanh toán</td>
<td>Chưa ghi nhận khoản thanh toán thành công cho đơn hàng.</td>
</tr>
<tr>
<td>Thanh toán thất bại</td>
<td>Giao dịch thanh toán giả lập được ghi nhận thất bại.</td>
</tr>
<tr>
<td>Đã cọc</td>
<td>Đã ghi nhận khoản đặt cọc theo điều kiện được thống nhất; chưa thanh toán đủ giá trị phải thanh toán.</td>
</tr>
<tr>
<td>Đã thanh toán đủ</td>
<td>Đã ghi nhận hoàn tất nghĩa vụ thanh toán theo điều kiện áp dụng cho đơn hàng.</td>
</tr>
</tbody>
</table></div>
<p>Mỗi đơn đặt làm phải lưu giá trị đơn hàng, số tiền cần thanh toán trước nếu có, tổng số tiền đã ghi nhận thành công và số tiền còn phải thanh toán. Trạng thái “Đã cọc” được sử dụng khi hệ thống xác nhận đã thu khoản đặt cọc theo điều kiện đã thống nhất nhưng chưa hoàn tất nghĩa vụ thanh toán. Trạng thái “Đã thanh toán đủ” chỉ được cập nhật khi tổng số tiền đã thu đáp ứng nghĩa vụ thanh toán của đơn.</p>
<p>Hệ thống lưu từng giao dịch hợp lệ và kiểm tra mã tham chiếu, số tiền, trạng thái giao dịch trước khi cập nhật tổng tiền đã thu. Một giao dịch không được cộng nhiều lần khi nhận thông báo trùng. Nếu giao dịch thất bại hoặc bị hủy, số tiền đã thu không được tăng và hệ thống không ghi nhận giao dịch là thanh toán thành công. Trạng thái thanh toán được quản lý độc lập với trạng thái sản xuất và giao nhận.</p>
<p>Nếu báo giá không yêu cầu đặt cọc trước, hệ thống không tự đặt trạng thái “Chờ thanh toán/đặt cọc” chỉ vì khách vừa chấp nhận báo giá. Điều kiện thu phần tiền còn lại và thời điểm chuyển sang “Đã thanh toán đủ” phải tuân theo chính sách thanh toán mà nhóm thống nhất trước khi lập trình.</p>
<h3 id="45-các-trường-hợp-ngoại-lệ">4.5. Các trường hợp ngoại lệ</h3>
<div style="overflow-x:auto;margin:14px 0"><table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;min-width:560px;border-color:#eadfe4">
<thead>
<tr>
<th align="left" style="background:#f6e9ef">Trường hợp</th>
<th align="left" style="background:#f6e9ef">Cách xử lý</th>
</tr>
</thead>
<tbody>
<tr>
<td>Customer chưa đăng nhập</td>
<td>Yêu cầu đăng ký hoặc đăng nhập theo F01 trước khi gửi yêu cầu đặt làm.</td>
</tr>
<tr>
<td>Thiếu trường bắt buộc</td>
<td>Không tiếp nhận yêu cầu cho đến khi khách bổ sung đầy đủ các trường bắt buộc của F12 hoặc F13.</td>
</tr>
<tr>
<td>Yêu cầu đã tiếp nhận nhưng chưa đủ thông tin để báo giá</td>
<td>Staff/Admin chuyển trạng thái sang “Cần bổ sung thông tin”, ghi rõ nội dung cần bổ sung. Sau khi khách cập nhật, yêu cầu quay lại “Chờ cửa hàng xem xét”.</td>
</tr>
<tr>
<td>Tệp ảnh không hợp lệ hoặc tải lên thất bại</td>
<td>Kiểm tra định dạng và dung lượng theo NF05; thông báo lỗi, không lưu tệp không hợp lệ. Khách có thể tải lại hoặc tiếp tục không kèm ảnh nếu ảnh không bắt buộc.</td>
</tr>
<tr>
<td>Cửa hàng không thể thực hiện</td>
<td>Staff/Admin ghi lý do, thông báo từ chối và cập nhật trạng thái “Bị từ chối”. Không phát sinh bước chốt đơn hoặc sản xuất.</td>
</tr>
<tr>
<td>Khách từ chối báo giá</td>
<td>Ghi nhận “Báo giá bị từ chối”; không chuyển sang sản xuất.</td>
</tr>
<tr>
<td>Khách không phản hồi báo giá</td>
<td>Giữ trạng thái chờ phản hồi cho đến khi khách phản hồi hoặc yêu cầu được xử lý theo thời hạn do nhóm thống nhất. Không xem việc im lặng là đồng ý.</td>
</tr>
<tr>
<td>Báo giá hết hiệu lực</td>
<td>Không cho khách chấp nhận báo giá đã hết hạn. Staff/Admin gửi báo giá mới hoặc xác nhận lại các điều kiện theo quy tắc đã thống nhất.</td>
</tr>
<tr>
<td>Khách chấp nhận báo giá nhưng thanh toán/đặt cọc thất bại</td>
<td>Ghi nhận kết quả giao dịch thất bại; không cộng vào số tiền đã thu. Nếu thanh toán trước là điều kiện chốt đơn, đơn chưa được chuyển sang sản xuất.</td>
</tr>
<tr>
<td>Khách yêu cầu hủy trước khi sản xuất</td>
<td>Staff/Admin kiểm tra điều kiện hủy và xác nhận kết quả. Chỉ cập nhật “Đã hủy” khi yêu cầu được chấp thuận.</td>
</tr>
<tr>
<td>Khách yêu cầu hủy sau khi bắt đầu sản xuất</td>
<td>Staff/Admin xem xét theo chính sách đã thống nhất, lưu lý do và kết quả xử lý. Việc hủy không mặc nhiên đồng nghĩa với hoàn cọc hoặc hoàn tiền.</td>
</tr>
<tr>
<td>Nội dung yêu cầu thay đổi sau khi đã chấp nhận báo giá</td>
<td>Tạo phiên bản báo giá cập nhật nếu thay đổi ảnh hưởng đến giá hoặc thời gian. Khách phải xác nhận lại trước khi tiếp tục.</td>
</tr>
<tr>
<td>Giao hàng chậm hoặc không thành công</td>
<td>Staff/Admin cập nhật tình trạng, thời gian và người xử lý; phối hợp với khách để giải quyết. Không tự động chuyển sang “Hoàn thành”.</td>
</tr>
</tbody>
</table></div>
<hr />
<h2 style="color:#c2457a;border-bottom:2px solid #fbe6ef;padding-bottom:4px;margin-top:2em" id="5-quy-tắc-nghiệp-vụ-dùng-chung">5. Quy tắc nghiệp vụ dùng chung</h2>
<ul>
<li><strong>Quy tắc 1: Kiểm tra giá và tổng tiền:</strong> Trước khi tạo đơn mua sản phẩm làm sẵn hoặc chốt đơn đặt làm, hệ thống kiểm tra lại dữ liệu có liên quan ở phía máy chủ. Đối với đơn mua sẵn, hệ thống tính lại giá sản phẩm, số lượng, tồn kho, voucher, phí vận chuyển và tổng tiền. Đối với Custom Order, giá cuối cùng được xác định theo mẫu và tùy chọn đã xác nhận hoặc phiên bản báo giá được khách chấp nhận còn hiệu lực. Tổng tiền do giao diện gửi lên không được sử dụng trực tiếp làm căn cứ tạo đơn hoặc ghi nhận thanh toán.</li>
<li><strong>Quy tắc 2: Gợi ý và điều chỉnh bộ quà:</strong> Hệ thống chỉ gợi ý bộ quà cấu hình sẵn do cửa hàng thiết lập theo F06. Khách được thay đổi thành phần hoặc số lượng trong phạm vi F07. Ngân sách áp dụng cho tổng giá trị sản phẩm; phí vận chuyển và các khoản phát sinh được tính riêng. Tổng giá trị sản phẩm sau điều chỉnh không được vượt ngân sách nếu khách muốn tiếp tục theo luồng giỏ quà có kiểm soát ngân sách.</li>
<li><strong>Quy tắc 3: Kiểm soát tồn kho:</strong> Tồn kho được quản lý theo từng biến thể sản phẩm. Khi kiểm tra khả năng đáp ứng đơn hàng, hệ thống phải tính cả số lượng bán lẻ và số lượng nằm trong bộ quà. Thời điểm giữ tồn, thời hạn giữ và điều kiện giải phóng tồn khi hủy đơn hoặc thanh toán không hoàn tất phải được nhóm thống nhất trước khi triển khai.</li>
<li><strong>Quy tắc 4: Lưu dữ liệu đơn hàng:</strong> Tên, giá, biến thể, số lượng và cấu hình sản phẩm được lưu tại thời điểm chốt đơn. Việc chỉnh sửa sản phẩm hoặc bộ quà trong danh mục không được làm thay đổi thông tin lịch sử của đơn đã tạo.</li>
<li><strong>Quy tắc 5: Phân biệt F12 và F13:</strong> F12 áp dụng cho đặt làm theo mẫu có tùy chọn được website hỗ trợ; F13 áp dụng cho yêu cầu riêng cần báo giá. Giá niêm yết hoặc giá dự kiến của F12 không thay thế việc cửa hàng xác nhận khả năng thực hiện và thời gian trước khi khách đặt cọc. Đối với F13, yêu cầu chỉ được chốt thành đơn khi khách chấp nhận báo giá còn hiệu lực và đáp ứng các điều kiện chốt đơn đã thống nhất.</li>
<li><strong>Quy tắc 6: Quản lý báo giá:</strong> Báo giá gắn với phiên bản yêu cầu cụ thể, có giá, thời gian dự kiến, điều kiện thanh toán và thời hạn hiệu lực. Nếu nội dung đã chấp nhận thay đổi, hệ thống không được âm thầm ghi đè dữ liệu cũ. Khách phải xác nhận lại báo giá mới nếu thay đổi ảnh hưởng đến giá hoặc cam kết thực hiện.</li>
<li><strong>Quy tắc 7: Quản lý thanh toán:</strong> Trạng thái thanh toán được lưu độc lập với trạng thái xử lý đơn hàng. Hệ thống ghi nhận số tiền đã thu, số tiền còn lại và từng giao dịch hợp lệ. Mỗi giao dịch thành công chỉ được ghi nhận một lần. Trạng thái “Đã cọc” và “Đã thanh toán đủ” chỉ được cập nhật khi đáp ứng điều kiện thanh toán tương ứng.</li>
<li><strong>Quy tắc 8: Phân quyền:</strong> Guest chỉ được sử dụng các chức năng công khai và giỏ hàng tạm thời. Customer chỉ được xem hoặc thao tác với hồ sơ, địa chỉ, yêu cầu và đơn hàng của chính mình. Staff thực hiện nghiệp vụ vận hành trong phạm vi quyền được cấp. Admin có quyền quản trị theo T05; các quyền này phải được kiểm tra ở phía máy chủ.</li>
<li><strong>Quy tắc 9: Theo dõi và lưu vết:</strong> Hệ thống hiển thị trạng thái hiện tại của đơn mua sẵn và yêu cầu/đơn đặt làm. Những thay đổi quan trọng về báo giá, thanh toán và trạng thái đơn phải lưu thời gian và người thực hiện theo NF09. Phạm vi lịch sử được hiển thị cho Customer phải bảo đảm không tiết lộ dữ liệu của khách khác.</li>
<li><strong>Quy tắc 10: Thanh toán và vận chuyển:</strong> Phương thức thanh toán được mô tả đúng với chức năng thực tế đã triển khai. Nếu sử dụng cổng sandbox, hệ thống phải xử lý thành công, thất bại và hủy giao dịch. Nếu có COD hoặc QR giả lập, phải mô tả riêng cách thức ghi nhận khoản thu và giới hạn của phương thức. Nếu chưa tích hợp API vận chuyển, trạng thái giao nhận do Staff/Admin cập nhật theo thông tin thực tế tiếp nhận, không mô tả như một quy trình vận chuyển tự động.</li>
</ul>
<hr />
<h2 style="color:#c2457a;border-bottom:2px solid #fbe6ef;padding-bottom:4px;margin-top:2em" id="6-sơ-đồ-luồng-custom-order">6. Sơ đồ luồng Custom Order</h2>
<p>Sơ đồ mô tả đầy đủ các bước từ lúc khách gửi yêu cầu đặt làm đến khi sản phẩm được giao. Các nhánh bổ sung thông tin, cửa hàng từ chối, khách không chấp nhận báo giá, thanh toán thất bại, yêu cầu hủy và giao hàng không thành công được thể hiện riêng để tránh nhầm lẫn với luồng xử lý thành công.</p>
<p align="center"><a href="images/quy-trinh-2-custom-order.png"><img src="images/quy-trinh-2-custom-order.png" alt="Sơ đồ luồng quy trình đặt làm theo mẫu hoặc cá nhân hóa (Custom Order)" style="max-width:100%;height:auto"></a></p>
<p align="center"><em>Nhấn vào hình để mở ảnh kích thước đầy đủ.</em></p>

<hr>
<p align="center"><small>Tài liệu quy trình nghiệp vụ website kinh doanh sản phẩm móc len</small></p>

</body>
</html>
