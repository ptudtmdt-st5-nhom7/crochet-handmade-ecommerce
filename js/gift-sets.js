// Không lưu giá bộ: gọi getItemsTotal(giftSet.items) để lấy giá từ products.
export const giftSets = [
  {
    "id": "GIFT-01",
    "name": "Món quà nhỏ",
    "items": [
      {
        "productId": "KC-001",
        "quantity": 1
      },
      {
        "productId": "HL-001",
        "quantity": 1
      }
    ],
    "allowedProductIds": [
      "KC-001",
      "KC-002",
      "HL-001",
      "HL-002",
      "PK-001",
      "PK-002"
    ]
  },
  {
    "id": "GIFT-02",
    "name": "Bạn thỏ và hoa xinh",
    "items": [
      {
        "productId": "TL-001",
        "quantity": 1
      },
      {
        "productId": "PK-002",
        "quantity": 1
      }
    ],
    "allowedProductIds": [
      "TL-001",
      "TL-002",
      "KC-001",
      "KC-002",
      "PK-001",
      "PK-002"
    ]
  },
  {
    "id": "GIFT-03",
    "name": "Hoa và phụ kiện",
    "items": [
      {
        "productId": "HL-002",
        "quantity": 1
      },
      {
        "productId": "PK-001",
        "quantity": 1
      }
    ],
    "allowedProductIds": [
      "HL-001",
      "HL-002",
      "PK-001",
      "PK-002"
    ]
  }
];
