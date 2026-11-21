
const pool = require("./db");
const express = require("express");
const path = require("node:path");

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json());

// Kiểm tra lỗi kết nối hoặc truy vấn PostgreSQL.
function isDatabaseUnavailable(error) {
  const unavailableCodes = [
    "08000",
    "08001",
    "08003",
    "08006",
    "08004",
    "57P01",
    "53300",
    "ECONNREFUSED",
    "ETIMEDOUT",
    "ECONNRESET",
    "57014",
  ];

  return (
    unavailableCodes.includes(error.code) ||
    /timeout|connection terminated|connection refused/i.test(
      error.message || ""
    )
  );
}

// Phản hồi lỗi theo cấu trúc thống nhất.
function sendError(res, status, code, message) {
  return res.status(status).json({
    error: {
      code,
      message,
    },
  });
}

// Câu truy vấn dùng chung cho danh sách và chi tiết sản phẩm.
// Chỉ lấy sản phẩm và biến thể đang bán.
const productQuery = `
  SELECT
    p.id,
    p.name,
    c.id AS category,
    c.name AS "categoryLabel",
    p.description,
    p.image,
    p.material,

    COALESCE(
      json_agg(
        json_build_object(
          'id', pv.id,
          'name', pv.name,
          'color', pv.color,
          'size', pv.size,
          'price', pv.price,
          'stockQuantity', pv.stock_quantity
        )
        ORDER BY pv.id
      ) FILTER (WHERE pv.id IS NOT NULL),
      '[]'::json
    ) AS variants

  FROM products p

  INNER JOIN categories c
    ON c.id = p.category_id

  INNER JOIN product_variants pv
    ON pv.product_id = p.id
    AND pv.is_active = TRUE

  WHERE p.is_active = TRUE
`;

// Kiểm tra máy chủ Express.
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "crochet-backend",
  });
});

// Kiểm tra kết nối PostgreSQL bằng một truy vấn thật.
app.get("/health/db", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT current_database() AS database, NOW() AS time"
    );

    res.json({
      status: "ok",
      database: result.rows[0].database,
      time: result.rows[0].time,
    });
  } catch (error) {
    console.error(
      "Kiem tra PostgreSQL that bai:",
      error.code || "DB_ERROR"
    );

    res.status(503).json({
      status: "error",
      message: "Khong ket noi duoc PostgreSQL.",
    });
  }
});

// API 1: Lấy danh sách sản phẩm đang bán.
app.get("/api/products", async (req, res) => {
  try {
    const query = `
      ${productQuery}
      GROUP BY
        p.id,
        p.name,
        c.id,
        c.name,
        p.description,
        p.image,
        p.material,
        p.display_order

      ORDER BY
        p.display_order ASC,
        p.id ASC
    `;

    const result = await pool.query(query);

    return res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.error(
      "Lay danh sach san pham that bai:",
      error.code || "DB_ERROR"
    );

    if (isDatabaseUnavailable(error)) {
      return sendError(
        res,
        503,
        "DATABASE_UNAVAILABLE",
        "Không thể kết nối cơ sở dữ liệu."
      );
    }

    return sendError(
      res,
      500,
      "INTERNAL_ERROR",
      "Đã xảy ra lỗi máy chủ."
    );
  }
});

// API 2: Lấy chi tiết một sản phẩm.
app.get("/api/products/:id", async (req, res) => {
  const productId = req.params.id;

  // Kiểm tra định dạng mã sản phẩm.
  if (!/^[A-Z]{2}-[0-9]{3}$/.test(productId)) {
    return sendError(
      res,
      400,
      "INVALID_PRODUCT_ID",
      "Mã sản phẩm không đúng định dạng."
    );
  }

  try {
    const query = `
      ${productQuery}
      AND p.id = $1

      GROUP BY
        p.id,
        p.name,
        c.id,
        c.name,
        p.description,
        p.image,
        p.material
    `;

    // Dùng tham số $1, không ghép trực tiếp mã vào SQL.
    const result = await pool.query(query, [productId]);

    if (result.rows.length === 0) {
      return sendError(
        res,
        404,
        "PRODUCT_NOT_FOUND",
        "Không tìm thấy sản phẩm."
      );
    }

    return res.status(200).json({
      data: result.rows[0],
    });
  } catch (error) {
    console.error(
      "Lay chi tiet san pham that bai:",
      error.code || "DB_ERROR"
    );

    if (isDatabaseUnavailable(error)) {
      return sendError(
        res,
        503,
        "DATABASE_UNAVAILABLE",
        "Không thể kết nối cơ sở dữ liệu."
      );
    }

    return sendError(
      res,
      500,
      "INTERNAL_ERROR",
      "Đã xảy ra lỗi máy chủ."
    );
  }
});

// Phục vụ giao diện và API cùng địa chỉ, chỉ phục vụ các tài nguyên công khai.
const storeRoot = path.resolve(__dirname, "..");
for (const directory of ["css", "images", "js", "pages"]) {
  app.use("/" + directory, express.static(path.join(storeRoot, directory), { index: false }));
}
app.get("/", (_req, res) => res.sendFile(path.join(storeRoot, "index.html")));
for (const page of ["index", "products", "product-detail", "cart", "gift-builder", "about"]) {
  app.get("/" + page + ".html", (_req, res) => res.sendFile(path.join(storeRoot, page + ".html")));
}

// Khởi chạy backend.
app.listen(port, "127.0.0.1", () => {
  console.log(
    `Backend dang chay tai http://127.0.0.1:${port}`
  );
});
