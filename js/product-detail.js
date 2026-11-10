
/*
 * LENLY CROCHET - PRODUCT DETAIL
 *
 * Chức năng:
 * 1. Đọc mã sản phẩm từ URL.
 * 2. Lấy dữ liệu sản phẩm từ product-utils.js.
 * 3. Hiển thị thông tin tương ứng trên product-detail.html.
 * 4. Xử lý mã sản phẩm thiếu hoặc không tồn tại.
 * 5. Kiểm tra số lượng và thêm sản phẩm lẻ vào giỏ.
 * 6. Hỗ trợ tăng/giảm số lượng bằng nút + và -.
 * 7. Điều hướng quay lại đúng trang theo tham số from.
 *
 * Lưu ý:
 * - Không chỉnh sửa products.html hoặc products-page.js.
 * - Không xóa hoặc ghi đè dữ liệu bộ quà đang soạn.
 * - addSingle() tự kiểm tra tồn kho, lưu giỏ hàng
 *   và cập nhật số lượng giỏ hàng.
 * - Không gọi updateCartBadge() lần thứ hai sau addSingle().
 */

// ======================================================
// 0. IMPORT CÁC MODULE
// ======================================================

import { getProductById } from './product-utils.js';
import { addSingle, updateCartBadge } from './cart.js';

// ======================================================
// 1. KHAI BÁO CÁC PHẦN TỬ HTML
// ======================================================

const elements = {
    // Khu vực hiển thị thông tin sản phẩm
    productDetail: document.getElementById('product-detail'),
    productError: document.getElementById('product-error'),
    productErrorMessage: document.getElementById('product-error-message'),

    // Breadcrumb
    breadcrumbProduct: document.getElementById('breadcrumb-product'),

    // Hình ảnh sản phẩm
    productImage: document.getElementById('product-image'),
    productImageCaption: document.getElementById('product-image-caption'),

    // Thông tin cơ bản
    productCategory: document.getElementById('product-category'),
    productCode: document.getElementById('product-code'),
    productTitle: document.getElementById('product-title'),
    productPrice: document.getElementById('product-price'),
    productDescription: document.getElementById('product-description'),

    // Thuộc tính sản phẩm
    productCategoryValue: document.getElementById('product-category-value'),
    productColor: document.getElementById('product-color'),
    productSize: document.getElementById('product-size'),
    productMaterial: document.getElementById('product-material'),
    productStock: document.getElementById('product-stock'),

    // Nội dung giới thiệu bổ sung
    detailExtra: document.getElementById('detail-extra'),
    extraDescription: document.getElementById('extra-description'),
    extraAppearance: document.getElementById('extra-appearance'),
    extraDesign: document.getElementById('extra-design'),
    extraSize: document.getElementById('extra-size'),
    extraMaterial: document.getElementById('extra-material'),

    // Form thêm sản phẩm vào giỏ hàng
    addToCartForm: document.getElementById('add-to-cart-form'),
    productQuantity: document.getElementById('product-quantity'),
    addToCartButton: document.getElementById('add-to-cart-button'),
    cartActionMessage: document.getElementById('cart-action-message'),

    // Hai nút tăng/giảm số lượng
    quantityDecrease: document.getElementById('quantity-decrease'),
    quantityIncrease: document.getElementById('quantity-increase'),

    // Đường dẫn quay lại
    detailBackLink: document.getElementById('detail-back-link'),
    backLinkLabel: document.getElementById('back-link-label')
};

// ======================================================
// 2. CẤU HÌNH VÀ HÀM TIỆN ÍCH
// ======================================================

const DEFAULT_PRODUCT_IMAGE = 'images/logo.png';

const DEFAULT_IMAGE_NOTE =
    'Sản phẩm được hoàn thiện thủ công. Hình ảnh mang tính chất tham khảo, màu sắc thực tế có thể chênh lệch nhẹ.';

/**
 * Định dạng giá tiền Việt Nam.
 *
 * @param {number} price
 * @returns {string}
 */
function formatVND(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

/**
 * Gán nội dung văn bản cho phần tử HTML.
 *
 * @param {HTMLElement|null} element
 * @param {string|number|null|undefined} value
 * @param {string} fallback
 */
function setText(element, value, fallback = 'Đang cập nhật') {
    if (!element) return;

    const content =
        value !== null &&
        value !== undefined &&
        String(value).trim() !== ''
            ? String(value)
            : fallback;

    element.textContent = content;
}

/**
 * Hiển thị hoặc ẩn phần tử HTML.
 *
 * @param {HTMLElement|null} element
 * @param {boolean} shouldShow
 */
function toggleElement(element, shouldShow) {
    if (!element) return;

    element.hidden = !shouldShow;
}

/**
 * Hiển thị thông báo cho người dùng.
 *
 * @param {string} message
 * @param {'success'|'error'} type
 */
function showMessage(message, type = 'success') {
    if (!elements.cartActionMessage) return;

    elements.cartActionMessage.textContent = message;

    elements.cartActionMessage.classList.remove(
        'success',
        'error'
    );

    elements.cartActionMessage.classList.add(type);
    elements.cartActionMessage.hidden = false;
}

/**
 * Xóa thông báo cũ.
 */
function clearMessage() {
    if (!elements.cartActionMessage) return;

    elements.cartActionMessage.textContent = '';

    elements.cartActionMessage.classList.remove(
        'success',
        'error'
    );

    elements.cartActionMessage.hidden = true;
}

// ======================================================
// 3. ĐỌC THAM SỐ URL
// ======================================================

const currentUrl = new URL(window.location.href);
const urlParams = currentUrl.searchParams;

const productId = urlParams.get('id');
const fromSource = urlParams.get('from');

// ======================================================
// 4. XỬ LÝ ĐƯỜNG DẪN QUAY LẠI
// ======================================================

/**
 * Nếu người dùng đến từ trang tạo bộ quà:
 * quay lại gift-builder.html.
 *
 * Các trường hợp còn lại:
 * quay lại products.html.
 *
 * Không xóa hoặc thay đổi dữ liệu bộ quà tại đây.
 */
function configureBackLink() {
    if (!elements.detailBackLink) return;

    if (fromSource === 'gift') {
        elements.detailBackLink.href = 'gift-builder.html';

        setText(
            elements.backLinkLabel,
            'Quay lại trang tạo bộ quà'
        );
    } else {
        elements.detailBackLink.href = 'products.html';

        setText(
            elements.backLinkLabel,
            'Quay lại danh sách sản phẩm'
        );
    }
}

// ======================================================
// 5. XỬ LÝ SẢN PHẨM KHÔNG HỢP LỆ
// ======================================================

/**
 * Hiển thị thông báo khi:
 * - URL không có mã sản phẩm.
 * - Mã sản phẩm không tồn tại.
 * - Dữ liệu sản phẩm không hợp lệ.
 *
 * @param {string} message
 */
function showProductError(message) {
    toggleElement(elements.productDetail, false);
    toggleElement(elements.detailExtra, false);
    toggleElement(elements.productError, true);

    setText(
        elements.productErrorMessage,
        message,
        'Không thể tải thông tin sản phẩm.'
    );

    document.title =
        'Không tìm thấy sản phẩm | Lenly Crochet';
}

/**
 * Kiểm tra dữ liệu cơ bản của sản phẩm.
 *
 * @param {object|null} product
 * @returns {boolean}
 */
function isValidProduct(product) {
    if (!product || typeof product !== 'object') {
        return false;
    }

    return (
        typeof product.id === 'string' &&
        typeof product.name === 'string' &&
        typeof product.price === 'number' &&
        Number.isFinite(product.price) &&
        product.price >= 0
    );
}

// ======================================================
// 6. HIỂN THỊ THÔNG TIN SẢN PHẨM
// ======================================================

/**
 * Cập nhật thông tin sản phẩm lên giao diện.
 *
 * @param {object} product
 */
function renderProduct(product) {

    // ------------------------------------------
    // 6.1. Thông tin cơ bản
    // ------------------------------------------

    setText(
        elements.breadcrumbProduct,
        product.name
    );

    setText(
        elements.productCategory,
        product.category
    );

    setText(
        elements.productCode,
        `Mã sản phẩm: ${product.id}`
    );

    setText(
        elements.productTitle,
        product.name
    );

    setText(
        elements.productPrice,
        formatVND(product.price)
    );

    setText(
        elements.productDescription,
        product.description,
        'Sản phẩm len handmade được hoàn thiện thủ công tại Lenly Crochet.'
    );

    // ------------------------------------------
    // 6.2. Thông tin thuộc tính
    // ------------------------------------------

    setText(
        elements.productCategoryValue,
        product.category
    );

    setText(
        elements.productColor,
        product.color
    );

    setText(
        elements.productSize,
        product.size
    );

    setText(
        elements.productMaterial,
        product.material
    );

    // ------------------------------------------
    // 6.3. Hình ảnh sản phẩm
    // ------------------------------------------

    if (elements.productImage) {

        const imagePath =
            typeof product.image === 'string' &&
            product.image.trim() !== ''
                ? product.image
                : DEFAULT_PRODUCT_IMAGE;

        elements.productImage.src = imagePath;

        elements.productImage.alt =
            `${product.name} - Sản phẩm handmade Lenly Crochet`;

        // Xử lý khi ảnh sản phẩm không tồn tại.
        elements.productImage.onerror = function () {
            this.onerror = null;
            this.src = DEFAULT_PRODUCT_IMAGE;
        };
    }

    setText(
        elements.productImageCaption,
        `Hình ảnh minh họa sản phẩm ${product.name} ${product.id}.`,
        DEFAULT_IMAGE_NOTE
    );

    // ------------------------------------------
    // 6.4. Thông tin tồn kho minh họa
    // ------------------------------------------

    const stock = Number.isSafeInteger(product.stockDemo)
        ? product.stockDemo
        : 0;

    setText(
        elements.productStock,
        stock > 0
            ? `Còn ${stock} sản phẩm`
            : 'Tạm hết hàng'
    );

    // ------------------------------------------
    // 6.5. Nội dung giới thiệu bổ sung
    // ------------------------------------------

    setText(
        elements.extraDescription,
        product.description,
        `Khám phá sản phẩm ${product.name} được thực hiện thủ công tại Lenly Crochet.`
    );

    setText(
        elements.extraAppearance,
        product.name
    );

    setText(
        elements.extraDesign,
        product.color,
        'Màu sắc được cập nhật theo từng sản phẩm'
    );

    setText(
        elements.extraSize,
        product.size
    );

    setText(
        elements.extraMaterial,
        product.material
    );

    // ------------------------------------------
    // 6.6. Cập nhật tiêu đề trang
    // ------------------------------------------

    document.title =
        `${product.name} - Chi tiết sản phẩm | Lenly Crochet`;

    // ------------------------------------------
    // 6.7. Cấu hình trường số lượng
    // ------------------------------------------

    if (elements.productQuantity) {

        elements.productQuantity.min = '1';
        elements.productQuantity.step = '1';
        elements.productQuantity.value = '1';

        // Giới hạn số lượng theo tồn kho minh họa.
        elements.productQuantity.max = String(stock);

        elements.productQuantity.disabled = stock <= 0;
    }

    // ------------------------------------------
    // 6.8. Cấu hình nút thêm vào giỏ
    // ------------------------------------------

    if (elements.addToCartButton) {

        elements.addToCartButton.disabled = stock <= 0;

        elements.addToCartButton.textContent =
            stock > 0
                ? 'Thêm vào giỏ hàng'
                : 'Tạm hết hàng';
    }

    if (stock <= 0) {
        setText(
            elements.productStock,
            'Sản phẩm hiện tạm hết hàng.'
        );
    }

    // Hiển thị nội dung sau khi đã tải dữ liệu.
    toggleElement(elements.productDetail, true);
    toggleElement(elements.detailExtra, true);
    toggleElement(elements.productError, false);

    // Cập nhật trạng thái hai nút tăng/giảm.
    updateQuantityButtons();
}

// ======================================================
// 7. XỬ LÝ BỘ CHỌN SỐ LƯỢNG
// ======================================================

/**
 * Cập nhật trạng thái hai nút tăng và giảm.
 *
 * - Nút giảm bị khóa khi số lượng bằng 1.
 * - Nút tăng bị khóa khi số lượng đạt tồn kho.
 * - Hai nút bị khóa khi giá trị nhập không hợp lệ.
 */
function updateQuantityButtons() {

    const input = elements.productQuantity;

    if (!input) return;

    const quantity = Number(input.value);
    const min = Number(input.min) || 1;
    const max = Number(input.max) || 0;

    const isValid =
        Number.isSafeInteger(quantity) &&
        quantity >= min &&
        quantity <= max;

    if (elements.quantityDecrease) {
        elements.quantityDecrease.disabled =
            !isValid || quantity <= min;
    }

    if (elements.quantityIncrease) {
        elements.quantityIncrease.disabled =
            !isValid || quantity >= max;
    }
}

/**
 * Giảm số lượng sản phẩm đi 1.
 */
function decreaseQuantity() {

    const input = elements.productQuantity;

    if (!input || input.disabled) return;

    const currentQuantity = Number(input.value);
    const min = Number(input.min) || 1;

    if (!Number.isSafeInteger(currentQuantity)) {
        input.value = String(min);
    } else {
        input.value = String(
            Math.max(min, currentQuantity - 1)
        );
    }

    clearMessage();
    updateQuantityButtons();
}

/**
 * Tăng số lượng sản phẩm lên 1.
 */
function increaseQuantity() {

    const input = elements.productQuantity;

    if (!input || input.disabled) return;

    const currentQuantity = Number(input.value);
    const min = Number(input.min) || 1;
    const max = Number(input.max) || 0;

    if (!Number.isSafeInteger(currentQuantity)) {
        input.value = String(min);
    } else {
        input.value = String(
            Math.min(max, currentQuantity + 1)
        );
    }

    clearMessage();
    updateQuantityButtons();
}

/**
 * Khởi tạo các nút điều chỉnh số lượng.
 */
function initializeQuantityControls() {

    const input = elements.productQuantity;

    if (!input) return;

    // Sự kiện giảm số lượng.
    if (elements.quantityDecrease) {
        elements.quantityDecrease.addEventListener(
            'click',
            decreaseQuantity
        );
    }

    // Sự kiện tăng số lượng.
    if (elements.quantityIncrease) {
        elements.quantityIncrease.addEventListener(
            'click',
            increaseQuantity
        );
    }

    // Khi người dùng tự nhập số lượng.
    input.addEventListener('input', function () {
        clearMessage();
        updateQuantityButtons();
    });

    // Kiểm tra trạng thái ban đầu.
    updateQuantityButtons();
}

// ======================================================
// 8. KIỂM TRA SỐ LƯỢNG TRƯỚC KHI THÊM VÀO GIỎ
// ======================================================

/**
 * Kiểm tra số lượng trước khi thêm vào giỏ.
 *
 * @returns {{ok: boolean, quantity?: number, message?: string}}
 */
function validateQuantity() {

    if (!elements.productQuantity) {
        return {
            ok: false,
            message: 'Không tìm thấy trường nhập số lượng.'
        };
    }

    const rawQuantity =
        elements.productQuantity.value.trim();

    if (rawQuantity === '') {
        return {
            ok: false,
            message: 'Vui lòng nhập số lượng sản phẩm.'
        };
    }

    const quantity = Number(rawQuantity);

    if (
        !Number.isSafeInteger(quantity) ||
        quantity <= 0
    ) {
        return {
            ok: false,
            message: 'Số lượng phải là số nguyên dương.'
        };
    }

    const minQuantity =
        Number(elements.productQuantity.min) || 1;

    const maxQuantity =
        Number(elements.productQuantity.max);

    if (quantity < minQuantity) {
        return {
            ok: false,
            message:
                `Số lượng tối thiểu là ${minQuantity} sản phẩm.`
        };
    }

    if (
        Number.isSafeInteger(maxQuantity) &&
        quantity > maxQuantity
    ) {
        return {
            ok: false,
            message:
                `Số lượng vượt quá tồn kho minh họa. ` +
                `Vui lòng chọn tối đa ${maxQuantity} sản phẩm.`
        };
    }

    return {
        ok: true,
        quantity
    };
}

// ======================================================
// 9. THÊM SẢN PHẨM LẺ VÀO GIỎ HÀNG
// ======================================================

/**
 * Xử lý thêm sản phẩm lẻ vào giỏ.
 *
 * Gọi addSingle() từ cart.js.
 *
 * Không thao tác với gift draft của người dùng.
 *
 * @returns {void}
 */
function handleAddToCart() {

    clearMessage();

    // ------------------------------------------
    // 9.1. Kiểm tra số lượng
    // ------------------------------------------

    const quantityResult = validateQuantity();

    if (!quantityResult.ok) {

        showMessage(
            quantityResult.message,
            'error'
        );

        elements.productQuantity?.focus();

        updateQuantityButtons();

        return;
    }

    const quantity = quantityResult.quantity;

    // ------------------------------------------
    // 9.2. Kiểm tra mã sản phẩm
    // ------------------------------------------

    if (!productId || !currentProduct) {

        showMessage(
            'Không xác định được mã sản phẩm.',
            'error'
        );

        return;
    }

    // ------------------------------------------
    // 9.3. Khóa nút trong lúc xử lý
    // ------------------------------------------

    if (elements.addToCartButton) {

        elements.addToCartButton.disabled = true;

        elements.addToCartButton.textContent =
            'Đang xử lý...';
    }

    try {

        // ------------------------------------------
        // 9.4. Gọi hàm thêm sản phẩm lẻ của Bảo
        // ------------------------------------------

        /*
         * addSingle() thực hiện:
         * - Kiểm tra mã sản phẩm.
         * - Kiểm tra số lượng hợp lệ.
         * - Kiểm tra tồn kho.
         * - Cập nhật giỏ hàng.
         * - Lưu dữ liệu vào storage.js.
         * - Tự cập nhật biểu tượng số lượng giỏ hàng.
         *
         * Không gọi clearGiftDraft().
         * Không thay đổi dữ liệu bộ quà đang soạn.
         */

        const result = addSingle(
            productId.trim(),
            quantity
        );

        // ------------------------------------------
        // 9.5. Xử lý kết quả
        // ------------------------------------------

        if (result.ok) {

            showMessage(
                result.message ||
                'Đã thêm sản phẩm vào giỏ hàng.',
                'success'
            );

        } else {

            showMessage(
                result.message ||
                'Không thể thêm sản phẩm vào giỏ hàng.',
                'error'
            );
        }

    } catch (error) {

        console.error(
            '[Lenly product detail] Lỗi khi thêm sản phẩm:',
            error
        );

        showMessage(
            'Đã xảy ra lỗi khi thêm sản phẩm. Vui lòng thử lại.',
            'error'
        );

    } finally {

        // ------------------------------------------
        // 9.6. Khôi phục trạng thái nút
        // ------------------------------------------

        if (elements.addToCartButton) {

            const stock =
                Number.isSafeInteger(currentProduct?.stockDemo)
                    ? currentProduct.stockDemo
                    : 0;

            elements.addToCartButton.disabled =
                stock <= 0;

            elements.addToCartButton.textContent =
                stock > 0
                    ? 'Thêm vào giỏ hàng'
                    : 'Tạm hết hàng';
        }
    }
}

// ======================================================
// 10. KHỞI TẠO TRANG CHI TIẾT
// ======================================================

let currentProduct = null;

/**
 * Khởi tạo trang khi tài liệu HTML đã được tải.
 */
function initializeProductDetail() {

    // ------------------------------------------
    // 10.1. Cấu hình đường dẫn quay lại
    // ------------------------------------------

    configureBackLink();

    // ------------------------------------------
    // 10.2. Đồng bộ biểu tượng giỏ hàng
    // ------------------------------------------

    /*
     * Chỉ cập nhật một lần khi tải trang.
     * Sau đó addSingle() tự cập nhật badge.
     */

    try {

        updateCartBadge();

    } catch (error) {

        console.error(
            '[Lenly product detail] Không thể cập nhật giỏ hàng:',
            error
        );
    }

    // ------------------------------------------
    // 10.3. Kiểm tra mã sản phẩm trên URL
    // ------------------------------------------

    if (!productId || productId.trim() === '') {

        showProductError(
            'Đường dẫn chưa có mã sản phẩm. Vui lòng quay lại danh sách sản phẩm và chọn sản phẩm muốn xem.'
        );

        return;
    }

    // ------------------------------------------
    // 10.4. Lấy dữ liệu sản phẩm
    // ------------------------------------------

    try {

        currentProduct = getProductById(
            productId.trim()
        );

    } catch (error) {

        console.error(
            '[Lenly product detail] Lỗi khi đọc dữ liệu sản phẩm:',
            error
        );

        showProductError(
            'Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.'
        );

        return;
    }

    // ------------------------------------------
    // 10.5. Kiểm tra dữ liệu sản phẩm
    // ------------------------------------------

    if (!isValidProduct(currentProduct)) {

        showProductError(
            `Không tìm thấy sản phẩm có mã "${productId}". Vui lòng kiểm tra lại đường dẫn hoặc chọn sản phẩm khác.`
        );

        return;
    }

    // ------------------------------------------
    // 10.6. Hiển thị thông tin sản phẩm
    // ------------------------------------------

    renderProduct(currentProduct);

    // ------------------------------------------
    // 10.7. Khởi tạo bộ chọn số lượng
    // ------------------------------------------

    initializeQuantityControls();

    // ------------------------------------------
    // 10.8. Đăng ký sự kiện thêm vào giỏ
    // ------------------------------------------

    if (elements.addToCartForm) {

        elements.addToCartForm.addEventListener(
            'submit',
            function (event) {

                // Ngăn trình duyệt tải lại trang.
                event.preventDefault();

                // Thực hiện thêm sản phẩm.
                handleAddToCart();
            }
        );
    }
}

// ======================================================
// 11. CHẠY CHƯƠNG TRÌNH
// ======================================================

initializeProductDetail();
