import { categoryLabels } from './products.js';

/*
 * ======================================================
 * LENLY CROCHET - PRODUCT DETAIL
 * ======================================================
 *
 * Chức năng:
 * 1. Đọc mã sản phẩm từ URL.
 * 2. Lấy dữ liệu sản phẩm từ product-utils.js.
 * 3. Hiển thị thông tin sản phẩm tương ứng.
 * 4. Xử lý trường hợp thiếu hoặc sai mã sản phẩm.
 * 5. Hiển thị hình ảnh và thông tin chi tiết sản phẩm.
 * 6. Kiểm tra số lượng trước khi thêm vào giỏ hàng.
 * 7. Hỗ trợ tăng/giảm số lượng bằng nút + và -.
 * 8. Thêm sản phẩm lẻ vào giỏ thông qua addSingle().
 * 9. Điều hướng quay lại theo tham số from.
 *
 * LƯU Ý:
 * - Không chỉnh sửa products.html.
 * - Không chỉnh sửa products-page.js.
 * - Không ghi đè hoặc xóa dữ liệu bộ quà đang soạn.
 * - Không gọi clearGiftDraft() tại trang này.
 * - addSingle() chịu trách nhiệm cập nhật giỏ hàng.
 * - Không gọi updateCartBadge() lần thứ hai sau addSingle().
 */

// ======================================================
// 0. IMPORT MODULE
// ======================================================

import { getProductById } from './product-utils.js';
import { addSingle } from './cart.js';


// ======================================================
// 1. KHAI BÁO CÁC PHẦN TỬ HTML
// ======================================================

const elements = {

    // Khu vực chính
    productDetail: document.getElementById('product-detail'),
    productError: document.getElementById('product-error'),
    productErrorMessage: document.getElementById('product-error-message'),

    // Breadcrumb
    breadcrumbProduct: document.getElementById('breadcrumb-product'),

    // Hình ảnh
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

    // Nội dung bổ sung
    detailExtra: document.getElementById('detail-extra'),
    extraDescription: document.getElementById('extra-description'),
    extraAppearance: document.getElementById('extra-appearance'),
    extraDesign: document.getElementById('extra-design'),
    extraSize: document.getElementById('extra-size'),
    extraMaterial: document.getElementById('extra-material'),

    // Form thêm vào giỏ
    addToCartForm: document.getElementById('add-to-cart-form'),
    productQuantity: document.getElementById('product-quantity'),
    addToCartButton: document.getElementById('add-to-cart-button'),
    cartActionMessage: document.getElementById('cart-action-message'),

    // Nút tăng/giảm số lượng
    quantityDecrease: document.getElementById('quantity-decrease'),
    quantityIncrease: document.getElementById('quantity-increase'),

    // Đường dẫn quay lại
    detailBackLink: document.getElementById('detail-back-link'),
    backLinkLabel: document.getElementById('back-link-label')
};


// ======================================================
// 2. CẤU HÌNH VÀ BIẾN TOÀN CỤC
// ======================================================

const DEFAULT_PRODUCT_IMAGE = 'images/logo.png';

const DEFAULT_PRODUCT_DESCRIPTION =
    'Sản phẩm len handmade được hoàn thiện thủ công tại Lenly Crochet.';

const DEFAULT_COLOR = 'Đang cập nhật';

const DEFAULT_SIZE = 'Đang cập nhật';

const DEFAULT_MATERIAL = 'Đang cập nhật';

let currentProduct = null;


// ======================================================
// 3. ĐỌC THAM SỐ URL
// ======================================================

const currentUrl = new URL(window.location.href);

const urlParams = currentUrl.searchParams;

const productId = urlParams.get('id');

const fromSource = urlParams.get('from');


// ======================================================
// 4. HÀM TIỆN ÍCH
// ======================================================

/**
 * Định dạng giá tiền Việt Nam.
 *
 * @param {number} price
 * @returns {string}
 */
function formatVND(price) {

    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        maximumFractionDigits: 0
    }).format(price) + 'đ';
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

    const hasValue =
        value !== null &&
        value !== undefined &&
        String(value).trim() !== '';

    element.textContent = hasValue
        ? String(value)
        : fallback;
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
 * Hiển thị thông báo thêm giỏ hàng.
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


/**
 * Lấy tồn kho minh họa của sản phẩm.
 *
 * @param {object} product
 * @returns {number}
 */
function getProductStock(product) {

    if (
        Number.isSafeInteger(product?.stockDemo) &&
        product.stockDemo >= 0
    ) {
        return product.stockDemo;
    }

    return 0;
}


// ======================================================
// 5. XỬ LÝ ĐƯỜNG DẪN QUAY LẠI
// ======================================================

/**
 * Điều hướng quay lại trang phù hợp.
 *
 * Nếu người dùng đến từ trang tạo bộ quà:
 * gift-builder.html
 *
 * Các trường hợp khác:
 * products.html
 *
 * Không thay đổi dữ liệu bộ quà đang soạn.
 */
function configureBackLink() {

    const errorBackLink = document.querySelector('#product-error a');
    if (errorBackLink) {
        errorBackLink.href = fromSource === 'gift' ? 'gift-builder.html' : 'products.html';
        errorBackLink.textContent = fromSource === 'gift' ? 'Quay lại trang tạo bộ quà' : 'Quay lại danh sách sản phẩm';
    }

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
// 6. XỬ LÝ SẢN PHẨM KHÔNG HỢP LỆ
// ======================================================

/**
 * Hiển thị thông báo khi không tìm thấy sản phẩm.
 *
 * Các trường hợp:
 * - URL không có mã sản phẩm.
 * - Mã sản phẩm không tồn tại.
 * - Dữ liệu sản phẩm không hợp lệ.
 *
 * @param {string} message
 */
function showProductError(message) {

    setText(elements.breadcrumbProduct, 'Không tìm thấy sản phẩm');

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
 * Kiểm tra dữ liệu sản phẩm.
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
        product.id.trim() !== '' &&

        typeof product.name === 'string' &&
        product.name.trim() !== '' &&

        typeof product.price === 'number' &&
        Number.isFinite(product.price) &&
        product.price >= 0
    );
}


// ======================================================
// 7. HIỂN THỊ THÔNG TIN SẢN PHẨM
// ======================================================

/**
 * Cập nhật thông tin sản phẩm lên giao diện.
 *
 * @param {object} product
 */
function renderProduct(product) {

    const stock = getProductStock(product);

    const description =
        product.description || DEFAULT_PRODUCT_DESCRIPTION;

    const color =
        product.color || DEFAULT_COLOR;

    const size =
        product.size || DEFAULT_SIZE;

    const material =
        product.material || DEFAULT_MATERIAL;


    // --------------------------------------------------
    // 7.1. Thông tin cơ bản
    // --------------------------------------------------

    setText(
        elements.breadcrumbProduct,
        product.name
    );

    setText(
        elements.productCategory,
        `LENLY CROCHET · ${categoryLabels[product.category] || 'SẢN PHẨM LEN'}`
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
        description,
        DEFAULT_PRODUCT_DESCRIPTION
    );


    // --------------------------------------------------
    // 7.2. Thuộc tính sản phẩm
    // --------------------------------------------------

    setText(
        elements.productCategoryValue,
        product.category
    );

    setText(
        elements.productColor,
        color
    );

    setText(
        elements.productSize,
        size
    );

    setText(
        elements.productMaterial,
        material
    );


    // --------------------------------------------------
    // 7.3. Hình ảnh sản phẩm
    // --------------------------------------------------

    if (elements.productImage) {

        const imagePath =
            typeof product.image === 'string' &&
            product.image.trim() !== ''
                ? product.image
                : DEFAULT_PRODUCT_IMAGE;

        elements.productImage.onerror = function () {

            this.onerror = null;

            this.src = DEFAULT_PRODUCT_IMAGE;

            this.alt = 'Hình ảnh mặc định của Lenly Crochet';
        };

        elements.productImage.src = imagePath;

        elements.productImage.alt =
            `${product.name} - Sản phẩm handmade Lenly Crochet`;
    }

    setText(
        elements.productImageCaption,
        `Hình ảnh sản phẩm ${product.name} (${product.id}).`
    );


    // --------------------------------------------------
    // 7.4. Tồn kho minh họa
    // --------------------------------------------------

    setText(
        elements.productStock,
        stock > 0
            ? `Còn ${stock} sản phẩm`
            : 'Tạm hết hàng'
    );


    // --------------------------------------------------
    // 7.5. Nội dung giới thiệu bổ sung
    // --------------------------------------------------

    setText(
        elements.extraDescription,
        `Khám phá thêm sản phẩm ${product.name} tại Lenly Crochet.`
    );

    setText(
        elements.extraAppearance,
        description,
        DEFAULT_PRODUCT_DESCRIPTION
    );

    setText(
        elements.extraDesign,
        color,
        DEFAULT_COLOR
    );

    setText(
        elements.extraSize,
        size,
        DEFAULT_SIZE
    );

    setText(
        elements.extraMaterial,
        material,
        DEFAULT_MATERIAL
    );


    // --------------------------------------------------
    // 7.6. Tiêu đề trang
    // --------------------------------------------------

    document.title =
        `${product.name} - Chi tiết sản phẩm | Lenly Crochet`;


    // --------------------------------------------------
    // 7.7. Thiết lập trường số lượng
    // --------------------------------------------------

    if (elements.productQuantity) {

        elements.productQuantity.min = '1';

        elements.productQuantity.step = '1';

        elements.productQuantity.max = String(stock);

        elements.productQuantity.value = '1';

        elements.productQuantity.disabled = stock <= 0;
    }


    // --------------------------------------------------
    // 7.8. Thiết lập nút thêm vào giỏ
    // --------------------------------------------------

    if (elements.addToCartButton) {

        elements.addToCartButton.disabled = stock <= 0;

        elements.addToCartButton.textContent =
            stock > 0
                ? 'Thêm vào giỏ hàng'
                : 'Tạm hết hàng';
    }


    // --------------------------------------------------
    // 7.9. Thiết lập nút tăng/giảm
    // --------------------------------------------------

    if (stock <= 0) {

        if (elements.quantityDecrease) {
            elements.quantityDecrease.disabled = true;
        }

        if (elements.quantityIncrease) {
            elements.quantityIncrease.disabled = true;
        }
    }


    // --------------------------------------------------
    // 7.10. Hiển thị nội dung
    // --------------------------------------------------

    toggleElement(elements.productDetail, true);

    toggleElement(elements.detailExtra, true);

    toggleElement(elements.productError, false);

    updateQuantityButtons();
}


// ======================================================
// 8. XỬ LÝ BỘ CHỌN SỐ LƯỢNG
// ======================================================

/**
 * Kiểm tra giá trị số lượng hiện tại.
 *
 * @returns {boolean}
 */
function isQuantityInputValid() {

    const input = elements.productQuantity;

    if (!input || input.disabled) return false;

    const quantity = Number(input.value);

    const min = Number(input.min) || 1;

    const max = Number(input.max);

    return (
        Number.isSafeInteger(quantity) &&
        quantity >= min &&
        Number.isSafeInteger(max) &&
        quantity <= max
    );
}


/**
 * Cập nhật trạng thái hai nút tăng/giảm.
 */
function updateQuantityButtons() {

    const input = elements.productQuantity;

    if (!input) return;

    const quantity = Number(input.value);

    const min = Number(input.min) || 1;

    const max = Number(input.max);

    const isValid = isQuantityInputValid();

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

    const max = Number(input.max);

    if (!Number.isSafeInteger(currentQuantity)) {

        input.value = String(min);

    } else if (Number.isSafeInteger(max)) {

        input.value = String(
            Math.min(max, currentQuantity + 1)
        );
    }

    clearMessage();

    updateQuantityButtons();
}


/**
 * Khởi tạo bộ chọn số lượng.
 */
function initializeQuantityControls() {

    const input = elements.productQuantity;

    if (!input) return;


    // Nút giảm số lượng
    if (elements.quantityDecrease) {

        elements.quantityDecrease.addEventListener(
            'click',
            decreaseQuantity
        );
    }


    // Nút tăng số lượng
    if (elements.quantityIncrease) {

        elements.quantityIncrease.addEventListener(
            'click',
            increaseQuantity
        );
    }


    // Người dùng nhập trực tiếp số lượng
    input.addEventListener('input', function () {

        clearMessage();

        updateQuantityButtons();
    });


    // Kiểm tra khi người dùng rời khỏi trường nhập
    input.addEventListener('change', function () {

        updateQuantityButtons();
    });


    updateQuantityButtons();
}


// ======================================================
// 9. KIỂM TRA SỐ LƯỢNG
// ======================================================

/**
 * Kiểm tra số lượng trước khi thêm vào giỏ.
 *
 * @returns {{
 *   ok: boolean,
 *   quantity?: number,
 *   message?: string
 * }}
 */
function validateQuantity() {

    const input = elements.productQuantity;

    if (!input) {

        return {
            ok: false,
            message: 'Không tìm thấy trường nhập số lượng.'
        };
    }


    if (input.disabled) {

        return {
            ok: false,
            message: 'Sản phẩm hiện không có sẵn.'
        };
    }


    const rawQuantity = input.value.trim();

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


    const minQuantity = Number(input.min) || 1;

    const maxQuantity = Number(input.max);


    if (quantity < minQuantity) {

        return {
            ok: false,
            message:
                `Số lượng tối thiểu là ${minQuantity} sản phẩm.`
        };
    }


    if (
        !Number.isSafeInteger(maxQuantity) ||
        quantity > maxQuantity
    ) {

        return {
            ok: false,
            message:
                `Số lượng vượt quá giới hạn có thể chọn. ` +
                `Vui lòng chọn tối đa ${maxQuantity} sản phẩm.`
        };
    }


    return {
        ok: true,
        quantity
    };
}


// ======================================================
// 10. THÊM SẢN PHẨM LẺ VÀO GIỎ HÀNG
// ======================================================

/**
 * Xử lý thêm sản phẩm lẻ vào giỏ hàng.
 *
 * Sử dụng addSingle() từ cart.js.
 *
 * Không thay đổi dữ liệu bộ quà đang soạn.
 *
 * @returns {void}
 */
function handleAddToCart() {

    clearMessage();


    // --------------------------------------------------
    // 10.1. Kiểm tra sản phẩm hiện tại
    // --------------------------------------------------

    if (!currentProduct || !productId) {

        showMessage(
            'Không xác định được sản phẩm cần thêm vào giỏ.',
            'error'
        );

        return;
    }


    // --------------------------------------------------
    // 10.2. Kiểm tra số lượng
    // --------------------------------------------------

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


    // --------------------------------------------------
    // 10.3. Khóa nút trong lúc xử lý
    // --------------------------------------------------

    if (elements.addToCartButton) {

        elements.addToCartButton.disabled = true;

        elements.addToCartButton.textContent =
            'Đang xử lý...';
    }


    try {

        // --------------------------------------------------
        // 10.4. Gọi hàm addSingle() từ cart.js
        // --------------------------------------------------

        /*
         * addSingle() chịu trách nhiệm:
         * - Kiểm tra mã sản phẩm.
         * - Kiểm tra số lượng.
         * - Kiểm tra tồn kho.
         * - Cập nhật dữ liệu giỏ hàng.
         * - Lưu giỏ hàng.
         * - Cập nhật biểu tượng số lượng giỏ hàng.
         *
         * Không gọi updateCartBadge() lần nữa.
         *
         * Không gọi clearGiftDraft().
         *
         * Không ghi đè dữ liệu bộ quà đang soạn.
         */

        const result = addSingle(
            currentProduct.id,
            quantity
        );


        // --------------------------------------------------
        // 10.5. Kiểm tra kết quả
        // --------------------------------------------------

        if (result && result.ok === true) {

            showMessage(
                result.message ||
                `Đã thêm ${quantity} ${currentProduct.name} vào giỏ hàng.`,
                'success'
            );

        } else {

            showMessage(
                result?.message ||
                'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.',
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

        // --------------------------------------------------
        // 10.6. Khôi phục trạng thái nút
        // --------------------------------------------------

        const stock = getProductStock(currentProduct);

        if (elements.addToCartButton) {

            elements.addToCartButton.disabled =
                stock <= 0;

            elements.addToCartButton.textContent =
                stock > 0
                    ? 'Thêm vào giỏ hàng'
                    : 'Tạm hết hàng';
        }

        updateQuantityButtons();
    }
}


// ======================================================
// 11. KHỞI TẠO TRANG CHI TIẾT
// ======================================================

/**
 * Khởi tạo trang chi tiết sản phẩm.
 */
function initializeProductDetail() {

    // --------------------------------------------------
    // 11.1. Cấu hình đường dẫn quay lại
    // --------------------------------------------------

    configureBackLink();


    // --------------------------------------------------
    // 11.2. Kiểm tra mã sản phẩm trên URL
    // --------------------------------------------------

    if (!productId || productId.trim() === '') {

        showProductError(
            'Đường dẫn chưa có mã sản phẩm. ' +
            'Vui lòng quay lại danh sách sản phẩm ' +
            'và chọn sản phẩm muốn xem.'
        );

        return;
    }


    // --------------------------------------------------
    // 11.3. Lấy dữ liệu sản phẩm
    // --------------------------------------------------

    try {

        currentProduct = getProductById(
            productId.trim()
        );

    } catch (error) {

        console.error(
            '[Lenly product detail] Không thể đọc dữ liệu sản phẩm:',
            error
        );

        showProductError(
            'Không thể tải dữ liệu sản phẩm. ' +
            'Vui lòng thử lại sau.'
        );

        return;
    }


    // --------------------------------------------------
    // 11.4. Kiểm tra dữ liệu sản phẩm
    // --------------------------------------------------

    if (!isValidProduct(currentProduct)) {

        showProductError(
            `Không tìm thấy sản phẩm có mã "${productId}". ` +
            'Vui lòng kiểm tra lại đường dẫn hoặc chọn sản phẩm khác.'
        );

        return;
    }


    // --------------------------------------------------
    // 11.5. Hiển thị thông tin sản phẩm
    // --------------------------------------------------

    renderProduct(currentProduct);


    // --------------------------------------------------
    // 11.6. Khởi tạo bộ chọn số lượng
    // --------------------------------------------------

    initializeQuantityControls();


    // --------------------------------------------------
    // 11.7. Đăng ký sự kiện thêm vào giỏ hàng
    // --------------------------------------------------

    if (elements.addToCartForm) {

        elements.addToCartForm.addEventListener(
            'submit',
            function (event) {

                event.preventDefault();

                handleAddToCart();
            }
        );
    }
}


// ======================================================
// 12. CHẠY CHƯƠNG TRÌNH
// ======================================================

initializeProductDetail();
