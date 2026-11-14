# Lenly Crochet

Đồ án học phần **Phát triển ứng dụng TMĐT — Nhóm 7, ST5**. Website giới thiệu và kinh doanh sản phẩm móc len handmade cho một cửa hàng.

## Bản tích hợp chức năng Buổi 3

Website dùng HTML/CSS và JavaScript thuần, lưu giỏ/bản soạn trong localStorage. Đã nối tìm kiếm, lọc và sắp xếp danh sách; chi tiết động theo mã; thêm sản phẩm lẻ; bộ quà theo ngân sách; giỏ hàng và nhân bản bộ quà. Ngân sách áp dụng cho tiền sản phẩm của một bộ, không gồm đóng gói/vận chuyển. Bộ hợp lệ vượt ngân sách sau điều chỉnh được cảnh báo và vẫn có thể thêm giỏ.

- [Xem website](https://ptudtmdt-st5-nhom7.github.io/crochet-handmade-ecommerce/).
- [Bàn giao bản tích hợp cho Quyến](docs/ban-giao-tich-hop-buoi3.md): nội dung đã ghép, cách kiểm tra và phần giao diện cần làm tiếp.
- Các trang chính: `index.html`, `products.html`, `product-detail.html?id=KC-001`, `about.html`, `cart.html`, `gift-builder.html`.
- **Chạy qua HTTP:** VS Code Live Server hoặc `python -m http.server 5500`, rồi mở `http://localhost:5500/`. Giữ cùng host/cổng để dùng chung localStorage; không mở trực tiếp bằng `file://`.
- **Kiểm thử:** `node --test tests/*.mjs` (Node chỉ phục vụ kiểm thử, chưa có backend).
- Dữ liệu tám sản phẩm và stockDemo phục vụ học tập. Chưa có đơn hàng máy chủ, tài khoản hay thanh toán thật. CSS bộ lọc, chọn quà và giỏ hàng của Quyến đã được ghép. Việc nghiệm thu hồ sơ học phần được tổng hợp riêng.

### Soạn nhiều bộ quà và nhân bản tại mục 3

Chọn một hoặc nhiều mẫu ở mục 2 để tạo các khung độc lập ở mục 3. Mỗi khung chứa toàn bộ sản phẩm của một bộ quà. Nút **Nhân bản bộ này** tạo một bản sao ngay dưới bộ gốc, mặc định một bộ; sửa bản sao không thay đổi bộ gốc. Muốn mua nhiều bộ giống nhau thì tăng **Số bộ muốn mua** trong cùng khung.

Mục 4 tổng kết từng khung và có nút **Thêm bộ này vào giỏ** riêng. Các khung đang soạn vẫn được giữ sau khi thêm; chúng không tự cập nhật những bộ đã nằm trong giỏ. Cùng cấu hình sản phẩm/số lượng thì giỏ tăng số bộ; khác cấu hình thì tách dòng. Tải lại hoặc đi xem chi tiết vẫn giữ các bộ đang soạn trên cùng trình duyệt/địa chỉ web.

- [Hướng dẫn và kiểm thử soạn nhiều bộ](docs/chon-nhieu-bo-qua.md).

Các phần Buổi 1–2 dưới đây là hồ sơ của các giai đoạn trước. [Hướng dẫn lưu trữ](docs/ban-giao-ban-nen-buoi3.md) và [quy ước chung](docs/quy-uoc.md) được giữ để đối chiếu hợp đồng dữ liệu.

## 1. Phiên bản giao diện Buổi 2

Website được xây dựng bằng **HTML5 và CSS3 thuần**, kế thừa repository Buổi 1. Bản hiện tại có bốn loại trang chính và tám trang chi tiết sản phẩm, tổng cộng **11 trang HTML**. Các trang dùng chung nhận diện, CSS, header và footer; có Grid/Flexbox, media query, hover và focus.

- [Xem website Lenly Crochet](https://ptudtmdt-st5-nhom7.github.io/crochet-handmade-ecommerce/).
- [Bài làm chung của nhóm](https://docs.google.com/document/d/1uIoFsaHZOZoELrRm6Y9PIP3tNZ9jMsXwfM6cFZjABJ8/edit).
- [Câu hỏi kiến thức của cả bảy thành viên](https://docs.google.com/document/d/1uIoFsaHZOZoELrRm6Y9PIP3tNZ9jMsXwfM6cFZjABJ8/edit?tab=t.ndz8ebldwwq9).
- [Bảng phân công và tiến độ](https://docs.google.com/spreadsheets/d/1UIP27nPdW2n_PZR36gXBxR1aO9nti8mK8NYxyOvS_0s/edit?gid=0#gid=0).

Các trang chính đặt ở thư mục gốc; bảy trang chi tiết tĩnh bổ sung được gom vào `pages/product-details/`. Khi Khanh hoàn thiện Buổi 3, các sản phẩm dùng `product-detail.html?id=...` theo quy ước; giữ các trang cũ tới khi rà xong liên kết.

### Các trang hiện có

| Trang | Nội dung |
| --- | --- |
| `index.html` | Logo, menu, ô tìm kiếm minh họa, banner, danh mục, sản phẩm nổi bật, giới thiệu bộ quà và đặt làm. |
| `products.html` | Tám sản phẩm có ảnh, tên, giá; tám nút xem chi tiết dẫn đến đúng sản phẩm. |
| `product-detail.html` | Chi tiết TL-001 — Thú len thỏ, gồm hình ảnh, giá, mô tả, thuộc tính và nút mua minh họa. |
| `about.html` | Giới thiệu cửa hàng, khách hàng mục tiêu, điểm nổi bật, hình ảnh và liên hệ. |

Bảy trang chi tiết còn lại là `pages/product-details/product-kc-001.html`, `pages/product-details/product-kc-002.html`, `pages/product-details/product-tl-002.html`, `pages/product-details/product-hl-001.html`, `pages/product-details/product-hl-002.html`, `pages/product-details/product-pk-001.html` và `pages/product-details/product-pk-002.html`.

### Phạm vi bản Buổi 2

Buổi 2 chỉ triển khai giao diện HTML/CSS. Tìm kiếm, mua hàng, gợi ý bộ quà theo ngân sách và đặt làm chưa xử lý nghiệp vụ. Phiên bản này chưa có JavaScript, framework CSS, backend, cơ sở dữ liệu, đăng nhập thật hoặc thanh toán. Ảnh, giá và thông tin sản phẩm là dữ liệu minh họa phục vụ học tập.

## 2. Cấu trúc thư mục

```text
crochet-handmade-ecommerce/
├── index.html
├── products.html
├── product-detail.html
├── about.html
├── cart.html
├── gift-builder.html
├── js/                           # Dữ liệu và chức năng Buổi 3
├── pages/product-details/       # Bảy trang chi tiết tĩnh của Buổi 2
├── css/style.css
├── images/                       # Logo và tám ảnh sản phẩm
├── docs/                         # Quy ước, dữ liệu, báo cáo và minh chứng
├── README.md
├── REQUIREMENTS.md
├── PROJECT_PLAN.md
├── AGENTS.md
└── AI_USAGE_LOG.md
```

`docs/header-mau.html` và `docs/footer-mau.html` là các đoạn HTML để chép vào trang ở thư mục gốc, không phải trang độc lập để mở trực tiếp. Cách sử dụng được ghi trong [quy ước chung](docs/quy-uoc.md).

## 3. Cách mở và kiểm tra website

Dùng Chrome hoặc Edge qua VS Code Live Server; nếu máy có Python, chạy `python -m http.server 5500` tại thư mục dự án rồi mở `http://localhost:5500/`. Giữ nguyên cấu trúc thư mục. Bản Buổi 3 dùng ES modules nên cần HTTP, không mở bằng cách nhấp đúp file HTML. Chưa cần backend để chạy bản này.

Trong DevTools, kiểm tra lần lượt các độ rộng **1366 px, 768 px và 390 px**. Cuộn hết từng trang, kiểm tra hình ảnh, menu, banner, số cột sản phẩm và footer. Dùng chuột thử hover; dùng Tab, Shift+Tab và Enter để kiểm tra focus, liên kết bỏ qua điều hướng và các liên kết trang. Kiểm tra thêm chế độ giảm chuyển động nếu trình duyệt hỗ trợ.

## 4. Kết quả kiểm thử và hồ sơ Buổi 2

Các lỗi đã xử lý gồm liên kết thiếu đích, CSS ảnh hưởng chéo, panel giới thiệu trên màn hình hẹp, logo/footer/icon chưa đồng bộ, mất khối hover/focus và bộ chọn nội dung thẻ sản phẩm không khớp HTML. Trong các lượt kiểm tra được ghi nhận tại bốn trang chính ở ba độ rộng, không phát hiện tràn ngang hoặc ảnh tải lỗi. Phạm vi, phiên bản và nguồn kiểm tra được trình bày trong báo cáo; kết quả công cụ được phân biệt với thao tác trực tiếp của thành viên.

| Hồ sơ | Vị trí |
| --- | --- |
| Báo cáo kiểm thử và ảnh responsive, hover/focus | [Báo cáo kiểm thử](docs/kiem-thu-tich-hop-buoi2.md), [bộ ảnh](docs/minh-chung-buoi2/). |
| Hai ví dụ đánh giá AI và minh chứng trước/sau | [Báo cáo 9B](docs/buoc9b-danh-gia-ai.md), [ảnh sửa CSS](docs/minh-chung-9b/). |
| Đối chiếu sản phẩm phải nộp | [Hồ sơ 9C](docs/buoc9c-ban-giao.md). |
| Quy ước mã nguồn và dữ liệu | [Quy ước](docs/quy-uoc.md), [tám sản phẩm](docs/products-data.md). |
| Nhật ký sử dụng AI | [AI_USAGE_LOG.md](AI_USAGE_LOG.md). |

Đã có đủ phần trả lời Bước 10 của **7/7 thành viên**, mỗi người sáu câu, trong tài liệu chung. Trưởng nhóm tổng hợp bản báo cáo và trực tiếp nộp LMS; repository không dùng để xác nhận rằng bài đã được nộp.

## 5. Phân công Buổi 2

| Thành viên | Phần việc |
| --- | --- |
| Nguyễn Quang Đức | Bước 1; trang chủ và thành phần chung Bước 4; hồ sơ 9C; tổng hợp Bước 10 và nộp bài. |
| Nguyễn Thanh Nam | Cấu trúc dự án, dữ liệu, ảnh và footer Bước 2; tích hợp, kiểm thử 9A. |
| Đặng Đình Quyến | Thiết kế Bước 3; responsive Bước 7. |
| Trần Quốc Bảo | Danh sách sản phẩm Bước 5. |
| Đỗ Trọng Khanh | Chi tiết sản phẩm Bước 6A. |
| Nguyễn Anh Tuấn | Giới thiệu cửa hàng Bước 6B. |
| Nguyễn Đình Châu | Tương tác Bước 8; đánh giá AI 9B. |

Mỗi thành viên tự trả lời sáu câu Bước 10 và cần giải thích được phần mã mình phụ trách cũng như cách phần đó kết nối với website chung.

## 6. Hồ sơ Buổi 1 và kế hoạch toàn đồ án

### Công nghệ toàn đồ án

| Thành phần | Công nghệ |
| --- | --- |
| Frontend | HTML5, CSS3, JavaScript thuần; Tailwind CSS theo kế hoạch phát triển. |
| Backend | Node.js và Express.js. |
| Cơ sở dữ liệu | PostgreSQL; kết nối từ Node.js bằng thư viện `pg` (node-postgres). |
| Công cụ | VS Code, npm, Git, GitHub Issues và Pull Request. |
| Triển khai | Chưa chốt nhà cung cấp database và nền tảng chạy backend. |

Đây là công nghệ đã chọn cho phần phát triển tiếp. Bản Buổi 3 vẫn dùng JavaScript/localStorage; PostgreSQL và backend chưa được triển khai. Nam phụ trách thiết kế dữ liệu, Khanh phối hợp kết nối; hướng dẫn triển khai ở [kế hoạch triển khai](docs/ke-hoach-trien-khai.md).

Tài liệu kết nối PostgreSQL từ Node.js: [node-postgres](https://node-postgres.com/).

Các chức năng mua hàng có sẵn, bộ quà theo ngân sách, đặt làm, tài khoản, quản trị và thanh toán là phạm vi phát triển của toàn đồ án, không phải các chức năng đã hoạt động trong bản giao diện Buổi 2. Công nghệ và trách nhiệm phát triển về sau được giữ trong các tài liệu sau:

| Tài liệu | Nội dung |
| --- | --- |
| [REQUIREMENTS.md](REQUIREMENTS.md) | Yêu cầu chức năng, mức ưu tiên và tiêu chí nghiệm thu. |
| [PROJECT_PLAN.md](PROJECT_PLAN.md) | Vai trò, công việc, các giai đoạn, mốc và rủi ro toàn đồ án. |
| [AGENTS.md](AGENTS.md) | Phạm vi hỗ trợ AI, quy tắc mã nguồn và bảo mật. |
| [Khảo sát website](docs/competitor-analysis.md) | Khảo sát các website tham khảo ở Buổi 1. |
| [Quy trình nghiệp vụ](docs/business-workflow.md) | Mô tả và sơ đồ nghiệp vụ mua sẵn, bộ quà, đặt làm. |

Báo cáo [Bước 4](docs/bai-lam-4.md) và ảnh trong `docs/minh-chung-buoc4/` được giữ làm hồ sơ giai đoạn trang chủ; chúng không thay thế báo cáo và bộ ảnh bản tích hợp Buổi 2.

### Cập nhật nội dung và header 11/11

Sáu trang mua sắm hiện hành dùng nội dung hướng đến khách hàng; các nhãn học phần/dữ liệu minh họa được giữ trong tài liệu thay vì lặp trên giao diện. Header dùng biểu tượng giỏ ở bên phải, số món tiếp tục lấy từ module giỏ và có tên truy cập bằng bàn phím/trình đọc màn hình. Nền hồng được tăng nhẹ độ đậm. Các file chi tiết tĩnh trong pages/product-details là hồ sơ Buổi 2; luồng hiện hành sử dụng product-detail.html?id=.... Việc sửa nội dung không bổ sung thanh toán hoặc đơn hàng máy chủ; dữ liệu và lượng giới hạn vẫn là dữ liệu bài tập.
