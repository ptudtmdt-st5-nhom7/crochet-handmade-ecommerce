const pool = require("./db");
const express = require("express");

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json());

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
    console.error("Kiem tra PostgreSQL that bai:", error.code || "DB_ERROR");

    res.status(503).json({
      status: "error",
      message: "Khong ket noi duoc PostgreSQL.",
    });
  }
});

app.listen(port, "127.0.0.1", () => {
  console.log(`Backend dang chay tai http://127.0.0.1:${port}`);
});