BEGIN;

INSERT INTO categories (id, name) VALUES
('moc-khoa', 'Móc khóa len'),
('thu-len', 'Thú len'),
('hoa-len', 'Hoa len'),
('phu-kien', 'Phụ kiện móc len');

INSERT INTO products
(id, category_id, name, description, image, material, display_order)
VALUES
(
 'KC-001', 'moc-khoa', 'Móc khóa gấu len',
 'Chú gấu len nhỏ xinh giúp chùm chìa khóa hoặc chiếc balo của bạn thêm đáng yêu. Một món quà dễ thương dành tặng bạn bè.',
 'images/product-1.webp',
 'Sợi cotton milk, bông nhồi polyester, khoen kim loại', 1
),
(
 'KC-002', 'moc-khoa', 'Móc khóa hoa cúc len',
 'Bông cúc len với nhụy vàng tươi mang đến điểm nhấn nhẹ nhàng cho túi xách và balo. Kiểu dáng nhỏ gọn, dễ phối cùng phụ kiện hằng ngày.',
 'images/product-2.webp',
 'Sợi cotton milk, khoen kim loại', 2
),
(
 'TL-001', 'thu-len', 'Thú len thỏ',
 'Bạn thỏ tai dài với dáng ngồi dễ thương, thích hợp đặt ở góc học tập hoặc bàn làm việc. Chiếc nơ nhỏ tạo thêm nét ngọt ngào cho món quà.',
 'images/product-3.webp',
 'Sợi cotton milk, bông nhồi polyester, chỉ thêu', 3
),
(
 'TL-002', 'thu-len', 'Thú len mèo',
 'Chú mèo len có đôi tai nhỏ và khuôn mặt ngộ nghĩnh, mang lại cảm giác vui tươi cho góc bàn. Một lựa chọn đáng yêu cho những bạn thích mèo.',
 'images/product-4.webp',
 'Sợi cotton milk, bông nhồi polyester, chỉ thêu', 4
),
(
 'HL-001', 'hoa-len', 'Hoa tulip len',
 'Một cành tulip len mang sắc màu dịu dàng, phù hợp cắm lọ nhỏ trên bàn học. Bạn cũng có thể kết hợp nhiều cành thành bó hoa theo sở thích.',
 'images/product-5.webp',
 'Sợi cotton milk, bông nhồi polyester, kẽm cành bọc sáp', 5
),
(
 'HL-002', 'hoa-len', 'Bó hoa len nhỏ',
 'Bó hoa gồm ba bông tulip len phối màu nhẹ nhàng, được gói cùng giấy và nơ. Kích thước nhỏ xinh phù hợp làm quà sinh nhật hoặc trang trí góc phòng.',
 'images/product-6.webp',
 'Sợi cotton milk, bông nhồi polyester, kẽm cành bọc sáp, giấy gói, ruy băng', 6
),
(
 'PK-001', 'phu-kien', 'Scrunchie len',
 'Scrunchie len với viền bèo tạo điểm nhấn xinh xắn cho kiểu tóc buộc hằng ngày. Tông màu nhẹ nhàng dễ kết hợp cùng trang phục đi học hoặc đi làm.',
 'images/product-7.webp',
 'Sợi cotton milk, dây thun', 7
),
(
 'PK-002', 'phu-kien', 'Kẹp tóc hoa len',
 'Chiếc kẹp tóc đính hoa len nhỏ mang đến nét tươi tắn cho mái tóc. Phù hợp kẹp mái hoặc tạo điểm nhấn cho kiểu tóc buộc nửa đầu.',
 'images/product-8.webp',
 'Sợi cotton milk, kẹp kim loại, chỉ khâu', 8
);

-- Mỗi sản phẩm có một biến thể mặc định.
-- Lượng 20 lấy từ stockDemo, chỉ phục vụ thử nghiệm.
INSERT INTO product_variants
(id, product_id, name, color, size, price, stock_quantity)
VALUES
(
 'KC-001-DEFAULT', 'KC-001', 'Mặc định',
 'Nâu nhạt, kem',
 'Cao khoảng 7 cm, chưa tính khoen móc',
 45000, 20
),
(
 'KC-002-DEFAULT', 'KC-002', 'Mặc định',
 'Trắng phối vàng',
 'Đường kính hoa khoảng 6 cm, chưa tính khoen móc',
 35000, 20
),
(
 'TL-001-DEFAULT', 'TL-001', 'Mặc định',
 'Kem phối hồng pastel',
 'Cao khoảng 18 cm, tính cả tai',
 125000, 20
),
(
 'TL-002-DEFAULT', 'TL-002', 'Mặc định',
 'Vàng nhạt phối trắng kem',
 'Cao khoảng 15 cm',
 115000, 20
),
(
 'HL-001-DEFAULT', 'HL-001', 'Mặc định',
 'Hồng pastel phối xanh lá',
 'Dài khoảng 28 cm, bông hoa rộng khoảng 5 cm',
 35000, 20
),
(
 'HL-002-DEFAULT', 'HL-002', 'Mặc định',
 'Hồng pastel, tím nhạt, kem phối xanh lá',
 'Cao khoảng 30 cm, ngang khoảng 18 cm',
 99000, 20
),
(
 'PK-001-DEFAULT', 'PK-001', 'Mặc định',
 'Hồng pastel, tím nhạt, kem',
 'Đường kính ngoài khoảng 10 cm khi chưa kéo giãn',
 30000, 20
),
(
 'PK-002-DEFAULT', 'PK-002', 'Mặc định',
 'Trắng phối vàng, hồng pastel phối vàng',
 'Kẹp dài khoảng 5 cm, đường kính hoa khoảng 4 cm',
 25000, 20
);

COMMIT;