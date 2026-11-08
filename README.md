# Lenly Crochet

Đồ án học phần **Phát triển ứng dụng TMĐT — Nhóm 7, ST5**. Website giới thiệu và kinh doanh sản phẩm móc len handmade cho một cửa hàng.

## Bản nền Buổi 3 — lưu trữ dùng chung

Đã chuẩn bị `js/storage.js` do Đức phụ trách, lưu riêng giỏ hàng và bộ quà đang soạn. Các thành viên dùng [hướng dẫn bàn giao](docs/ban-giao-ban-nen-buoi3.md) và [quy ước hiện hành](docs/quy-uoc.md) để nối mã; chưa xác nhận toàn website Buổi 3 đã có đủ chức năng.

- Chạy qua HTTP bằng VS Code Live Server, hoặc `python -m http.server 5513` tại thư mục gốc.
- Mở `http://localhost:5513/docs/kiem-tra-storage.html` để gọi thử năm hàm; nên dùng cổng thử riêng. Trang chỉ ghi mẫu khi bấm nút, không tự ghi khi mở/tải lại.
- [Kết quả kiểm tra module lưu trữ](docs/kiem-thu-storage-buoi3.md): 23 ca tự động và lượt thử trên trình duyệt; còn chờ nghiệm thu với trang thật.
- Nếu có Node, chạy `npm run test:storage` (không cần cài thư viện). Node dùng kiểm thử, chưa triển khai backend.
- Nam: dữ liệu/danh sách; Tuấn: tìm/lọc/sắp/gợi ý; Khanh: chi tiết; Bảo: giỏ; Châu: chọn quà; Quyến: CSS/responsive; Đức: bản nền/lưu trữ/tích hợp/hồ sơ.

Các trang cửa hàng bên dưới vẫn là giao diện Buổi 2 cho tới khi chức năng của các PIC được ghép. Không dùng trang thử lưu trữ để thay trang giỏ hàng thật.

## 1. Phiên bản giao diện Buổi 2

Website được xây dựng bằng **HTML5 và CSS3 thuần**, kế thừa repository Buổi 1. Bản hiện tại có bốn loại trang chính và tám trang chi tiết sản phẩm, tổng cộng **11 trang HTML**. Các trang dùng chung nhận diện, CSS, header và footer; có Grid/Flexbox, media query, hover và focus.

- [Xem website Lenly Crochet](https://ptudtmdt-st5-nhom7.github.io/crochet-handmade-ecommerce/).
- [Bài làm chung của nhóm](https://docs.google.com/document/d/1uIoFsaHZOZoELrRm6Y9PIP3tNZ9jMsXwfM6cFZjABJ8/edit).
- [Câu hỏi kiến thức của cả bảy thành viên](https://docs.google.com/document/d/1uIoFsaHZOZoELrRm6Y9PIP3tNZ9jMsXwfM6cFZjABJ8/edit?tab=t.ndz8ebldwwq9).
- [Bảng phân công và tiến độ](https://docs.google.com/spreadsheets/d/1UIP27nPdW2n_PZR36gXBxR1aO9nti8mK8NYxyOvS_0s/edit?gid=0#gid=0).

Các trang chính đặt ngoài thư mục gốc; bảy trang chi tiết tĩnh bổ sung được gom vào `pages/product-details/`. Khi Khanh hoàn thiện Buổi 3, các sản phẩm dùng `product-detail.html?id=...` theo quy ước; giữ các trang cũ tới khi rà xong liên kết.

### Các trang hiện có

| Trang | Nội dung |
| --- | --- |
| `index.html` | Logo, menu, ô tìm kiếm minh họa, banner, danh mục, sản phẩm nổi bật, giới thiệu bộ quà và đặt làm. |
| `products.html` | Tám sản phẩm có ảnh, tên, giá; tám nút xem chi tiết dẫn đến đúng sản phẩm. |
| `product-detail.html` | Chi tiết TL-001 — Thú len thỏ, gồm hình ảnh, giá, mô tả, thuộc tính và nút mua minh họa. |
| `about.html` | Giới thiệu cửa hàng, khách hàng mục tiêu, điểm nổi bật, hình ảnh và liên hệ. |

Bảy trang chi tiết còn lại là `pages/product-details/product-kc-001.html`, `pages/product-details/product-kc-002.html`, `pages/product-details/product-tl-002.html`, `pages/product-details/product-hl-001.html`, `pages/product-details/product-hl-002.html`, `pages/product-details/product-pk-001.html` và `pages/product-details/product-pk-002.html`.

### Phạm vi hiện tại

Buổi 2 chỉ triển khai giao diện HTML/CSS. Tìm kiếm, mua hàng, gợi ý bộ quà theo ngân sách và đặt làm chưa xử lý nghiệp vụ. Phiên bản này chưa có JavaScript, framework CSS, backend, cơ sở dữ liệu, đăng nhập thật hoặc thanh toán. Ảnh, giá và thông tin sản phẩm là dữ liệu minh họa phục vụ học tập.

## 2. Cấu trúc thư mục

```text
crochet-handmade-ecommerce/
├── index.html
├── products.html
├── product-detail.html
├── about.html
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

Mở `index.html` bằng Chrome hoặc Edge, giữ nguyên vị trí thư mục `css/` và `images/`. Không cần cài npm hoặc máy chủ backend để xem giao diện. Có thể dùng VS Code Live Server; nếu máy có Python, chạy `python -m http.server 8000` tại thư mục dự án rồi mở `http://localhost:8000/`.

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

Các chức năng mua hàng có sẵn, bộ quà theo ngân sách, đặt làm, tài khoản, quản trị và thanh toán là phạm vi phát triển của toàn đồ án, không phải các chức năng đã hoạt động trong bản giao diện Buổi 2. Công nghệ và trách nhiệm phát triển về sau được giữ trong các tài liệu sau:

| Tài liệu | Nội dung |
| --- | --- |
| [REQUIREMENTS.md](REQUIREMENTS.md) | Yêu cầu chức năng, mức ưu tiên và tiêu chí nghiệm thu. |
| [PROJECT_PLAN.md](PROJECT_PLAN.md) | Vai trò, công việc, các giai đoạn, mốc và rủi ro toàn đồ án. |
| [AGENTS.md](AGENTS.md) | Phạm vi hỗ trợ AI, quy tắc mã nguồn và bảo mật. |
| [Khảo sát website](docs/competitor-analysis.md) | Khảo sát các website tham khảo ở Buổi 1. |
| [Quy trình nghiệp vụ](docs/business-workflow.md) | Mô tả và sơ đồ nghiệp vụ mua sẵn, bộ quà, đặt làm. |

Báo cáo [Bước 4](docs/bai-lam-4.md) và ảnh trong `docs/minh-chung-buoc4/` được giữ làm hồ sơ giai đoạn trang chủ; chúng không thay thế báo cáo và bộ ảnh bản tích hợp Buổi 2.
