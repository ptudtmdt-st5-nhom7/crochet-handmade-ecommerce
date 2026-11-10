# Bàn giao Bước 7 của Quyến

Nhánh: `buoi3-quyen`, tạo từ `main` tại `31cba01`. Người dùng đã yêu cầu commit và đưa bài lên GitHub. Phần bàn giao gồm CSS responsive, bố cục bộ lọc, minh chứng và báo cáo chi tiết.

- Mã thay đổi: `css/style.css`, `products.html`. Giữ nguyên JavaScript.
- Báo cáo Word mới nhất: `Bao_cao_Buoc_7_Quyen_Theo_tung_buoc.docx` gồm 12 trang, 9 hình và phụ lục 23 ca kiểm thử.
- Ảnh và kết quả: `minh-chung-buoi3/`.
- Bảng kiểm thử: `KIEM_THU_BUOC7_QUYEN.md` và `.csv`.
- Hướng dẫn thử: `HUONG_DAN_DEVTOOLS_VA_NGHIEM_THU_BUOC7.md`.

## Cách kiểm tra

Chạy máy chủ tĩnh ở gốc dự án, mở `products.html`, thử tìm từ khóa, lọc Hoa len, sắp giá giảm dần và thêm giỏ. Kiểm tra tiếp `gift-builder.html`, chọn bộ 80.000 đồng, tăng gấu lên 2 để thấy cảnh báo vượt 45.000 đồng, thêm giỏ rồi tải lại. Thử tại 1366, 768 và 390 px. Chạy `node --test tests/*.test.mjs` để kiểm tra bộ test có sẵn.

## Trạng thái nghiệm thu

Các lượt kiểm tra do Codex thực hiện, không thay thế xác nhận của Quyến hoặc các PIC. Báo cáo Word và tài liệu kiểm thử ghi trạng thái tại thời điểm soạn trước khi commit. Việc đưa bài lên nhánh này cập nhật phần bàn giao GitHub; chưa chứng minh Đức đã nhận, merge hay nhóm đã nghiệm thu. Nam/Tuấn cần rà thay đổi bố cục và ô tìm trùng, Đức kiểm tra rồi ghép theo quy trình nhóm.
