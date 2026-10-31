# Bàn giao Bước 4 — Header, banner và trang chủ

Ngày cập nhật: 31/10/2026. Người phụ trách: Nguyễn Quang Đức. Codex hỗ trợ sửa cách tổ chức mã, đối chiếu và kiểm tra; Đức là người duyệt kết quả.

## Cách xem bản hiện tại

Trên nhánh `buoc4-duc`, tải repository về và mở `index.html` ở **thư mục gốc** bằng Chrome. Các file HTML, `css/`, `images/` và `docs/` nằm cùng cấp theo cấu trúc nhóm đã thống nhất. Không còn thư mục dự án lồng `lenly-buoc4/`.

Trang chủ có đủ header, menu, tìm kiếm minh họa, banner, bốn danh mục, bốn sản phẩm nổi bật, giới thiệu bộ quà, đặt làm, giới thiệu ngắn và footer. Các trang sản phẩm, chi tiết và giới thiệu hiện là khung có footer, chờ tác giả từng trang hoàn thiện. Bản này chưa phải website bốn trang hoàn chỉnh và chưa được merge vào `main`.

## File sử dụng

| File | Nội dung |
|---|---|
| `index.html` | Trang chủ do Đức phụ trách |
| `css/style.css` | CSS chung, header, footer, trang chủ, thẻ sản phẩm, hover/focus cơ bản và responsive |
| `images/logo.png` | Bản logo đã xử lý trong suốt, 402 × 430; kế thừa file Gemini đưa vào commit 6137d7a |
| `images/product-1.webp` đến `product-8.webp` | Tám ảnh minh họa dùng chung của Nam, giữ nguyên dữ liệu ảnh |
| `docs/header-mau.html` | Header/menu/tìm kiếm để dùng trên các trang khác |
| `docs/footer-mau.html` | Mẫu HTML footer của Nam tại nhánh `buoc2-nam`, commit d507e6f |
| `docs/bai-lam-4.md` | Báo cáo cấu trúc, kết quả kiểm tra và ba câu hỏi kiến thức |
| `docs/minh-chung-buoc4/` | Ảnh và số đo của lượt kiểm tra 31/10/2026 |
| `AI_USAGE_LOG.md` | Nhật ký Nam, đổi ảnh WebP, bản nháp và các lượt hoàn thiện Bước 4 |

Logo gốc `LOGO.png` vẫn nằm ở [Drive của Quyến](https://drive.google.com/drive/folders/1e44IaX-AW1pHCPSObs_VLZJThSgKo8gx). Repository hiện chỉ lưu bản `images/logo.png`, không có file gốc riêng tên `images/LOGO.png`. Khi cần lưu bản gốc, dùng tên khác rõ ràng như `logo-goc-quyen.png`, tránh trùng tên chỉ khác hoa/thường trên Windows.

## Header dùng chung cho Bảo, Khanh và Tuấn

1. Đặt đoạn trong `docs/header-mau.html` sau thẻ mở `body`. Giữ đường dẫn `css/style.css` trong `head` và dùng các ngăn CSS chung hiện có.
2. Chuyển `aria-current="page"` từ Trang chủ sang Sản phẩm ở `products.html`, hoặc Giới thiệu ở `about.html`. Trên `product-detail.html`, bỏ đánh dấu Trang chủ là trang hiện tại.
3. Đặt `id="noi-dung"` trên `main` để skip link hoạt động.
4. Giữ logo với đúng tỷ lệ, đường dẫn `images/logo.png` và văn bản thay thế phù hợp. Mẫu header là đoạn HTML, không phải trang độc lập trong `docs/` để mở xem.
5. Tìm kiếm chỉ là giao diện: có nhãn, ghi chú và nút `disabled`; không thêm xử lý JavaScript trong Buổi 2.
6. Footer đã có trong các trang khung; khi ghép phải giữ đúng một footer. Mẫu HTML và CSS footer lấy từ Nam; CSS bổ sung duy nhất để hòa với trang chủ là bỏ letter-spacing âm ở tiêu đề footer.

Không chép đè toàn bộ CSS của nhóm. Chỉnh phần của mình theo ngăn đã đánh số và phối hợp trước khi sửa thành phần chung.

## Đích liên kết cần phối hợp

- **Bảo:** tạo `moc-khoa`, `thu-len`, `hoa-len`, `phu-kien` trên `products.html`; tạo thông tin nhanh đúng mã, gồm `thong-tin-kc-001`, `thong-tin-hl-002`, `thong-tin-pk-002` được trang chủ dẫn tới.
- **Khanh:** xây dựng `product-detail.html` cho TL-001 — Thú len thỏ, 125.000đ, ảnh `product-3.webp`.
- **Tuấn:** hoàn thiện `about.html` và đặt `id="dat-lam"` cho mục đặt làm.

Các URL từ trang chủ đã khớp quy ước thiết kế. Những điểm neo trên chưa tồn tại trong các trang khung; cần thử lại sau khi nhận nội dung của từng bạn. Không coi kiểm tra đường dẫn file là đã kiểm tra đầy đủ nội dung đích.

## Kiểm tra và quy trình Git

Kết quả độc lập trên bản sửa: trang chủ không tràn ngang ở 1366/768/390 px; ảnh hiện trên trang tải được; banner 2/2/1 cột, sản phẩm 4/2/1 cột, footer 4/2/1 cột. Nút bộ quà dẫn đúng mục cùng trang. Xem [minh chứng](minh-chung-buoc4/README.md).

Đây là kiểm tra riêng Bước 4. Quyến, Châu và Nam tiếp tục các lượt responsive, tương tác và tích hợp toàn website theo phân công.

Nhánh riêng → tự kiểm tra → commit/push → tạo Pull Request → Đức xem và quyết định merge. Việc kế thừa footer và nhật ký từ Nam ở đây không đồng nghĩa PR #14 đã được merge vào `main`.
