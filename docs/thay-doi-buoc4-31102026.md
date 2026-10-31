# Các thay đổi để Đức xem lại — 31/10/2026

So với bản `buoc4-duc` tại commit `6137d7a`:

1. Đưa trang chủ từ `lenly-buoc4/index.html` về `index.html` gốc; CSS về `css/style.css`, logo về `images/logo.png`, mẫu dùng chung và báo cáo về `docs/`.
2. Bỏ thư mục lồng `lenly-buoc4/`. Các tài liệu Chương 1, tám ảnh WebP và dữ liệu sản phẩm bên trong đã được đối chiếu với file gốc, chỉ khác xuống dòng; giữ nguyên các file gốc và lịch sử Git.
3. Trang chủ giữ nội dung banner, danh mục, sản phẩm, bộ quà, đặt làm và giới thiệu đã bám Bài làm 1–3. Bỏ CSS `.logo-pending` không còn dùng.
4. Khôi phục HTML và CSS footer của Nam từ nhánh `buoc2-nam` tại `d507e6f`; icon ở bên trong nhóm liên hệ dưới email. Thêm một quy tắc đặt letter-spacing tiêu đề footer về 0 để không nhận letter-spacing âm của tiêu đề trang chủ. Ba trang khác giữ khung footer Nam đã cung cấp; chưa thêm nội dung của Bảo, Khanh hoặc Tuấn.
5. Ghép các mục nhật ký 2.3–2.5 của Nam, nhật ký WebP và Bước 4 vào một `AI_USAGE_LOG.md` gốc. Ghi thêm prompt và kết quả lượt sửa này; làm rõ các câu chưa có minh chứng của lượt Gemini trước.
6. Sửa thông tin “có lưu logo gốc LOGO.png” thành đúng hiện trạng: chỉ có bản đã xử lý `images/logo.png`, bản gốc nằm trên Drive.
7. Viết lại hướng dẫn và báo cáo cho đúng vị trí file, phạm vi kiểm tra và những id còn chờ các trang khác. Thêm trạng thái Buổi 2 và cách mở trang trong README, giữ nội dung kế hoạch Chương 1.
8. Thêm ảnh chụp ba kích thước, ảnh focus và số đo Chromium thực tế trong [minh chứng](minh-chung-buoc4/README.md).

## Cách xem

Tải nhánh `buoc4-duc`, giải nén và mở `index.html` ở thư mục gốc bằng Chrome. Xem logo/menu, banner, các khu vực nội dung và footer. So sánh [ảnh toàn trang 1366 px](minh-chung-buoc4/home-1366.png), [768 px](minh-chung-buoc4/home-768.png), [390 px](minh-chung-buoc4/home-390.png).

Không tràn ngang và không phát hiện ảnh lỗi trên trang chủ ở cả ba kích thước. Bộ quà và skip link có đích trong trang. Các URL sang danh sách/chi tiết/giới thiệu vẫn cần nội dung của từng thành viên trước khi kiểm thử đủ luồng. Không coi đây là lỗi cần Đức tự làm hộ các trang khác.

Bản sửa đã được cập nhật lên nhánh `buoc4-duc` bằng phiên đăng nhập của Đức. Tại commit `8e19a4f`, toàn bộ cây file trên GitHub khớp bản đã kiểm tra trên máy. [Bài làm 4 trong Google Docs](https://docs.google.com/document/d/1uIoFsaHZOZoELrRm6Y9PIP3tNZ9jMsXwfM6cFZjABJ8/edit?tab=t.e8hn99sxg0co) đã được điền báo cáo, ba câu trả lời kiến thức, ba ảnh minh chứng và link commit. `main`, nhánh Nam, PR #14 và Google Sheets chưa được thay đổi. Chưa xác nhận nghiệm thu thay Đức.
