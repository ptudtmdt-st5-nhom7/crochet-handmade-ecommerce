BEGIN;

-- Danh mục sản phẩm.
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL CHECK (btrim(name) <> '')
);

-- Thông tin chung của sản phẩm.
-- Màu/kích thước giữ nguyên mô tả từ catalog hiện tại.
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    category_id TEXT NOT NULL
        REFERENCES categories(id) ON DELETE RESTRICT,
    name TEXT NOT NULL CHECK (btrim(name) <> ''),
    description TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL CHECK (btrim(image) <> ''),
    material TEXT NOT NULL DEFAULT '',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL CHECK (display_order > 0)
);

-- Đơn vị bán và quản lý lượng hàng của từng sản phẩm.
-- Dữ liệu mẫu ban đầu: mỗi sản phẩm có một biến thể mặc định.
-- Không tự tách các màu có dấu phẩy thành lựa chọn riêng.
CREATE TABLE product_variants (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL
        REFERENCES products(id) ON DELETE RESTRICT,
    name TEXT NOT NULL CHECK (btrim(name) <> ''),
    color TEXT NOT NULL DEFAULT '',
    size TEXT NOT NULL DEFAULT '',
    price INTEGER NOT NULL CHECK (price >= 0),
    stock_quantity INTEGER NOT NULL DEFAULT 0
        CHECK (stock_quantity >= 0),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (product_id, name)
);

CREATE INDEX idx_products_category_id
    ON products(category_id);

CREATE INDEX idx_product_variants_product_id
    ON product_variants(product_id);

COMMENT ON COLUMN product_variants.price
    IS 'Giá bán theo VNĐ, số nguyên.';

COMMENT ON COLUMN product_variants.stock_quantity
    IS 'Lượng hàng trong môi trường đang chạy. Seed từ stockDemo chỉ là dữ liệu minh họa, không xác nhận tồn kho thực tế.';

COMMIT;