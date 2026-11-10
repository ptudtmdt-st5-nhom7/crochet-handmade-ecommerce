
/*
============================================================
LENLY CROCHET
BƯỚC 4 - TÍCH HỢP TRANG CHI TIẾT SẢN PHẨM ĐỘNG
============================================================

Chức năng:
1. Đọc mã sản phẩm từ tham số URL.
2. Lấy dữ liệu sản phẩm từ products.js thông qua product-utils.js.
3. Hiển thị thông tin sản phẩm tương ứng.
4. Xử lý trường hợp thiếu mã hoặc mã sản phẩm không hợp lệ.
5. Kiểm tra số lượng người dùng nhập.
6. Thêm sản phẩm lẻ vào giỏ hàng thông qua addSingle().
7. Cập nhật số lượng giỏ hàng khi tải trang.
8. Điều hướng quay lại đúng trang theo nguồn truy cập.

Nguyên tắc tích hợp:
- Không tự tạo cấu trúc giỏ hàng mới.
- Không thao tác trực tiếp với localStorage.
- Không ghi đè hoặc xóa gift draft.
- Không gọi clearGiftDraft().
- Không gọi saveGiftDraft().
- Không gọi addGiftSet().
- addSingle() chịu trách nhiệm cập nhật giỏ hàng.
============================================================
*/

// ============================================================
// 1. IMPORT CÁC MODULE DÙNG CHUNG
// ============================================================

import {
    getProductById,
    formatPrice
} from './product-utils.js';

import {
    categoryLabels
} from './products.js';

import {
    addSingle,
    updateCartBadge
} from './cart.js';


// ============================================================
// 2. KHAI BÁO CÁC PHẦN TỬ HTML
// ============================================================

// Khu vực hiển thị thông tin sản phẩm
const productDetailElement =
    document.getElementById('product-detail');

const productErrorElement =
    document.getElementById('product-error');

const detailExtraElement =
    document.getElementById('detail-extra');

// Thông tin cơ bản
const productImageElement =
    document.getElementById('product-image');

const productImageCaptionElement =
    document.getElementById('product-image-caption');

const productCodeElement =
    document.getElementById('product-code');

const productTitleElement =
    document.getElementById('product-title');

const productPriceElement =
    document.getElementById('product-price');

const productDescriptionElement =
    document.getElementById('product-description');

// Thuộc tính sản phẩm
const productCategoryElement =
    document.getElementById('product-category');

const productColorElement =
    document.getElementById('product-color');

const productSizeElement =
    document.getElementById('product-size');

const productMaterialElement =
    document.getElementById('product-material');

const productStockElement =
    document.getElementById('product-stock');

// Điều hướng
const breadcrumbProductElement =
    document.getElementById('breadcrumb-product');

const detailBackLinkElement =
    document.getElementById('detail-back-link');

const backLinkLabelElement =
    document.getElementById('back-link-label');

const errorBackLinkElement =
    document.getElementById('error-back-link');

// Thông báo lỗi
const productErrorMessageElement =
    document.getElementById('product-error-message');

// Form thêm giỏ hàng
const addToCartForm =
    document.getElementById('add-to-cart-form');

const quantityInput =
    document.getElementById('product-quantity');

const addToCartButton =
    document.getElementById('add-to-cart-button');

const cartActionMessage =
    document.getElementById('cart-action-message');

// Nội dung bổ sung
const extraDescriptionElement =
    document.getElementById('extra-description');

const extraAppearanceElement =
    document.getElementById('extra-appearance');

const extraMaterialElement =
    document.getElementById('extra-material');


// ============================================================
// 3. ĐỌC THAM SỐ TRÊN URL
// ============================================================

const urlParams = new URLSearchParams(
    window.location.search
);

// Mã sản phẩm
const productId = urlParams.get('id');

// Xác định nguồn truy cập
const fromGift = urlParams.get('from') === 'gift';

// Trang quay lại tương ứng
const returnUrl = fromGift
    ? 'gift-builder.html'
    : 'products.html';


// ============================================================
// 4. HÀM HỖ TRỢ HIỂN THỊ
// ============================================================

/**
 * Chuyển giá trị rỗng thành nội dung mặc định.
 *
 * @param {*} value
 * @returns {string}
 */
function getDisplayValue(value) {
    if (
        value === null ||
        value === undefined ||
        String(value).trim() === ''
    ) {
        return 'Đang cập nhật';
    }

    return String(value);
}


/**
 * Lấy tên danh mục từ categoryLabels.
 *
 * @param {*} category
 * @returns {string}
 */
function getCategoryLabel(category) {
    if (
        categoryLabels &&
        typeof categoryLabels === 'object' &&
        category in categoryLabels
    ) {
        return categoryLabels[category];
    }

    return getDisplayValue(category);
}


/**
 * Hiển thị thông báo thao tác.
 *
 * @param {string} message
 * @param {string} type
 */
function showCartMessage(message, type = '') {
    if (!cartActionMessage) {
        return;
    }

    cartActionMessage.textContent = message;

    cartActionMessage.className =
        'detail-action-message';

    if (type) {
        cartActionMessage.classList.add(type);
    }
}


/**
 * Hiển thị khu vực lỗi.
 *
 * @param {string} message
 */
function showProductError(message) {
    productDetailElement.hidden = true;
    detailExtraElement.hidden = true;

    productErrorElement.hidden = false;

    productErrorMessageElement.textContent = message;

    document.title =
        'Không tìm thấy sản phẩm | Lenly Crochet';
}


// ============================================================
// 5. THIẾT LẬP ĐƯỜNG DẪN QUAY LẠI
// ============================================================

function setupReturnNavigation() {
    detailBackLinkElement.href = returnUrl;
    errorBackLinkElement.href = returnUrl;

    if (fromGift) {
        backLinkLabelElement.textContent =
            'Quay lại trang tạo bộ quà';
    } else {
        backLinkLabelElement.textContent =
            'Quay lại danh sách sản phẩm';
    }
}


// ============================================================
// 6. KIỂM TRA DỮ LIỆU SẢN PHẨM
// ============================================================

/**
 * Kiểm tra dữ liệu cơ bản trước khi hiển thị.
 *
 * @param {Object} product
 * @returns {{valid: boolean, message: string}}
 */
function validateProductData(product) {
    if (!product || typeof product !== 'object') {
        return {
            valid: false,
            message: 'Không tìm thấy dữ liệu sản phẩm.'
        };
    }

    if (!product.id || !product.name) {
        return {
            valid: false,
            message: 'Thông tin mã hoặc tên sản phẩm không hợp lệ.'
        };
    }

    if (
        !Number.isFinite(product.price) ||
        product.price < 0
    ) {
        return {
            valid: false,
            message: 'Thông tin giá sản phẩm không hợp lệ.'
        };
    }

    if (
        !Number.isSafeInteger(product.stockDemo) ||
        product.stockDemo < 0
    ) {
        return {
            valid: false,
            message: 'Thông tin số lượng sản phẩm không hợp lệ.'
        };
    }

    if (product.stockDemo === 0) {
        return {
            valid: false,
            message: 'Sản phẩm hiện không còn số lượng mẫu.'
        };
    }

    return {
        valid: true,
        message: ''
    };
}


// ============================================================
// 7. HIỂN THỊ THÔNG TIN SẢN PHẨM
// ============================================================

/**
 * Hiển thị dữ liệu của sản phẩm lên giao diện.
 *
 * @param {Object} product
 */
function renderProduct(product) {

    // --------------------------------------------------------
    // 7.1. Hình ảnh
    // --------------------------------------------------------

    productImageElement.src = product.image;

    productImageElement.alt =
        `Hình ảnh ${product.name}`;

    productImageCaptionElement.textContent =
        `Hình ảnh sản phẩm ${product.name} tại Lenly Crochet.`;

    // --------------------------------------------------------
    // 7.2. Thông tin cơ bản
    // --------------------------------------------------------

    productCodeElement.textContent =
        `Mã sản phẩm: ${product.id}`;

    productTitleElement.textContent =
        product.name;

    productPriceElement.textContent =
        formatPrice(product.price);

    productDescriptionElement.textContent =
        getDisplayValue(product.description);

    // --------------------------------------------------------
    // 7.3. Thuộc tính sản phẩm
    // --------------------------------------------------------

    productCategoryElement.textContent =
        getCategoryLabel(product.category);

    productColorElement.textContent =
        getDisplayValue(product.color);

    productSizeElement.textContent =
        getDisplayValue(product.size);

    productMaterialElement.textContent =
        getDisplayValue(product.material);

    productStockElement.textContent =
        `${product.stockDemo} sản phẩm`;

    // --------------------------------------------------------
    // 7.4. Nội dung bổ sung
    // --------------------------------------------------------

    extraDescriptionElement.textContent =
        getDisplayValue(product.description);

    extraAppearanceElement.textContent =
        `Màu sắc: ${getDisplayValue(product.color)}. ` +
        `Kích thước: ${getDisplayValue(product.size)}.`;

    extraMaterialElement.textContent =
        `Sản phẩm sử dụng chất liệu ${getDisplayValue(product.material)}.`;

    // --------------------------------------------------------
    // 7.5. Breadcrumb
    // --------------------------------------------------------

    breadcrumbProductElement.textContent =
        product.name;

    // --------------------------------------------------------
    // 7.6. Tiêu đề trình duyệt
    // --------------------------------------------------------

    document.title =
        `${product.name} | Lenly Crochet`;

    // --------------------------------------------------------
    // 7.7. Thiết lập số lượng
    // --------------------------------------------------------

    quantityInput.min = '1';

    quantityInput.max =
        String(product.stockDemo);

    quantityInput.value = '1';

    // --------------------------------------------------------
    // 7.8. Hiển thị nội dung
    // --------------------------------------------------------

    productDetailElement.hidden = false;

    detailExtraElement.hidden = false;

    productErrorElement.hidden = true;
}


// ============================================================
// 8. KIỂM TRA SỐ LƯỢNG NGƯỜI DÙNG NHẬP
// ============================================================

/**
 * Kiểm tra số lượng trước khi thêm vào giỏ hàng.
 *
 * @param {Object} product
 * @returns {{valid: boolean, quantity?: number, message?: string}}
 */
function validateQuantity(product) {

    const rawQuantity =
        quantityInput.value.trim();

    // Không được để trống
    if (rawQuantity === '') {
        return {
            valid: false,
            message: 'Vui lòng nhập số lượng sản phẩm.'
        };
    }

    const quantity = Number(rawQuantity);

    // Phải là số nguyên dương
    if (
        !Number.isSafeInteger(quantity) ||
        quantity <= 0
    ) {
        return {
            valid: false,
            message: 'Số lượng phải là số nguyên dương.'
        };
    }

    // Không được vượt quá số lượng mẫu
    if (quantity > product.stockDemo) {
        return {
            valid: false,
            message:
                `Số lượng không được vượt quá ${product.stockDemo} sản phẩm.`
        };
    }

    return {
        valid: true,
        quantity
    };
}


// ============================================================
// 9. XỬ LÝ THÊM SẢN PHẨM LẺ VÀO GIỎ HÀNG
// ============================================================

/**
 * Gọi addSingle() từ cart.js.
 *
 * Không tự thao tác với localStorage.
 * Không ghi đè gift draft.
 *
 * @param {Object} product
 * @param {number} quantity
 */
function handleAddToCart(product, quantity) {

    // Tránh người dùng nhấn nhiều lần liên tục
    addToCartButton.disabled = true;

    addToCartButton.textContent =
        'Đang xử lý...';

    showCartMessage('');

    try {

        // Gọi hàm thêm sản phẩm lẻ của Bảo
        const result = addSingle(
            product.id,
            quantity
        );

        // Kiểm tra kết quả trả về
        if (!result || !result.ok) {

            showCartMessage(
                result?.message ||
                'Không thể thêm sản phẩm vào giỏ hàng.',
                'error'
            );

            return;
        }

        // Thông báo thêm thành công
        showCartMessage(
            result.message ||
            'Đã thêm sản phẩm vào giỏ hàng thành công.',
            'success'
        );

    } catch (error) {

        console.error(
            'Lỗi khi thêm sản phẩm vào giỏ hàng:',
            error
        );

        showCartMessage(
            'Đã xảy ra lỗi khi thêm sản phẩm. Vui lòng thử lại.',
            'error'
        );

    } finally {

        addToCartButton.disabled = false;

        addToCartButton.textContent =
            'Thêm vào giỏ hàng';

    }
}


// ============================================================
// 10. GẮN SỰ KIỆN CHO FORM
// ============================================================

/**
 * Xử lý sự kiện gửi form thêm giỏ hàng.
 *
 * @param {Object} product
 */
function setupAddToCartForm(product) {

    addToCartForm.addEventListener(
        'submit',
        function (event) {

            event.preventDefault();

            // Kiểm tra số lượng
            const validation =
                validateQuantity(product);

            if (!validation.valid) {

                showCartMessage(
                    validation.message,
                    'error'
                );

                quantityInput.focus();

                return;
            }

            // Thêm sản phẩm vào giỏ
            handleAddToCart(
                product,
                validation.quantity
            );

        }
    );

    // Xóa thông báo cũ khi người dùng thay đổi số lượng
    quantityInput.addEventListener(
        'input',
        function () {

            showCartMessage('');

        }
    );
}


// ============================================================
// 11. KHỞI TẠO TRANG CHI TIẾT
// ============================================================

function initProductDetail() {

    // --------------------------------------------------------
    // 11.1. Thiết lập đường dẫn quay lại
    // --------------------------------------------------------

    setupReturnNavigation();

    // --------------------------------------------------------
    // 11.2. Cập nhật số lượng trên biểu tượng giỏ hàng
    // --------------------------------------------------------

    updateCartBadge();

    // --------------------------------------------------------
    // 11.3. Kiểm tra tham số id
    // --------------------------------------------------------

    if (!productId || !productId.trim()) {

        showProductError(
            'Đường dẫn chưa có mã sản phẩm. ' +
            'Vui lòng quay lại danh sách sản phẩm.'
        );

        return;
    }

    // --------------------------------------------------------
    // 11.4. Tìm sản phẩm theo mã
    // --------------------------------------------------------

    const product = getProductById(
        productId.trim()
    );

    // --------------------------------------------------------
    // 11.5. Kiểm tra sản phẩm có tồn tại không
    // --------------------------------------------------------

    if (!product) {

        showProductError(
            `Không tìm thấy sản phẩm có mã "${productId}". ` +
            'Vui lòng kiểm tra lại đường dẫn.'
        );

        return;
    }

    // --------------------------------------------------------
    // 11.6. Kiểm tra tính hợp lệ của dữ liệu
    // --------------------------------------------------------

    const productValidation =
        validateProductData(product);

    if (!productValidation.valid) {

        showProductError(
            productValidation.message
        );

        return;
    }

    // --------------------------------------------------------
    // 11.7. Hiển thị dữ liệu sản phẩm
    // --------------------------------------------------------

    renderProduct(product);

    // --------------------------------------------------------
    // 11.8. Thiết lập sự kiện thêm giỏ hàng
    // --------------------------------------------------------

    setupAddToCartForm(product);

}


// ============================================================
// 12. CHẠY CHƯƠNG TRÌNH
// ============================================================

initProductDetail();
