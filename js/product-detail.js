
/*
 * LENLY CROCHET - PRODUCT DETAIL
 * Chức năng:
 * 1. Đọc mã sản phẩm từ URL.
 * 2. Lấy dữ liệu sản phẩm từ product-utils.js.
 * 3. Hiển thị thông tin tương ứng trên product-detail.html.
 * 4. Xử lý mã sản phẩm thiếu hoặc không tồn tại.
 * 5. Kiểm tra số lượng và thêm sản phẩm lẻ vào giỏ.
 * 6. Điều hướng quay lại đúng trang theo tham số from.
 *
 * Lưu ý:
 * - Không chỉnh sửa products.html hoặc products-page.js.
 * - Không xóa hoặc ghi đè dữ liệu bộ quà đang soạn.
 * - addSingle() tự cập nhật số lượng giỏ hàng và biểu tượng giỏ.
 */

import { getProductById } from './product-utils.js';
import { addSingle, updateCartBadge } from './cart.js';

// ======================================================
// 1. KHAI BÁO CÁC PHẦN TỬ HTML
// ======================================================

const elements = {
    productDetail: document.getElementById('product-detail'),
    productError: document.getElementById('product-error'),
    productErrorMessage: document.getElementById('product-error-message'),

    breadcrumbProduct: document.getElementById('breadcrumb-product'),

    productImage: document.getElementById('product-image'),
    productImageCaption: document.getElementById('product-image-caption'),

    productCategory: document.getElementById('product-category'),
    productCode: document.getElementById('product-code'),
    productTitle: document.getElementById('product-title'),
    productPrice: document.getElementById('product-price'),
    productDescription: document.getElementById('product-description'),

    productCategoryValue: document.getElementById('product-category-value'),
    productColor: document.getElementById('product-color'),
    productSize: document.getElementById('product-size'),
    productMaterial: document.getElementById('product-material'),
    productStock: document.getElementById('product-stock'),

    detailExtra: document.getElementById('detail-extra'),
    extraDescription: document.getElementById('extra-description'),
    extraAppearance: document.getElementById('extra-appearance'),
    extraDesign: document.getElementById('extra-design'),
    extraSize: document.getElementById('extra-size'),
    extraMaterial: document.getElementById('extra-material'),

    addToCartForm: document.getElementById('add-to-cart-form'),
    productQuantity: document.getElementById('product-quantity'),
    addToCartButton: document.getElementById('add-to-cart-button'),
    cartActionMessage: document.getElementById('cart-action-message'),

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
 * Hiển thị hoặc ẩn phần tử.
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
    elements.cartActionMessage.classList.remove('success', 'error');
    elements.cartActionMessage.classList.add(type);
    elements.cartActionMessage.hidden = false;
}

/**
 * Xóa thông báo cũ.
 */
function clearMessage() {
    if (!elements.cartActionMessage) return;

    elements.cartActionMessage.textContent = '';
    elements.cartActionMessage.classList.remove('success', 'error');
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

    document.title = 'Không tìm thấy sản phẩm | Lenly Crochet';
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

    setText(elements.breadcrumbProduct, product.name);
    setText(elements.productCategory, product.category);
    setText(elements.productCode, `Mã sản phẩm: ${product.id}`);
    setText(elements.productTitle, product.name);
    setText(elements.productPrice, formatVND(product.price));

    setText(
        elements.productDescription,
        product.description,
        'Sản phẩm len handmade được hoàn thiện thủ công tại Lenly Crochet.'
    );

    // ------------------------------------------
    // 6.2. Thông tin thuộc tính
    // ------------------------------------------

    setText(elements.productCategoryValue, product.category);
    setText(elements.productColor, product.color);
    setText(elements.productSize, product.size);
    setText(elements.productMaterial, product.material);

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
    // 6.5. Cập nhật nội dung phần giới thiệu
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
    // 6.7. Cấu hình số lượng mua
    // ------------------------------------------

    if (elements.productQuantity) {
        elements.productQuantity.min = '1';
        elements.productQuantity.step = '1';
        elements.productQuantity.value = '1';

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

    toggleElement(elements.productDetail, true);
    toggleElement(elements.detailExtra, true);
    toggleElement(elements.productError, false);
}

// ======================================================
// 7. KIỂM TRA SỐ LƯỢNG
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

    const rawQuantity = elements.productQuantity.value.trim();

    if (rawQuantity === '') {
        return {
            ok: false,
            message: 'Vui lòng nhập số lượng sản phẩm.'
        };
    }

    const quantity = Number(rawQuantity);

    if (!Number.isSafeInteger(quantity) || quantity <= 0) {
        return {
            ok: false,
            message: 'Số lượng phải là số nguyên dương.'
        };
    }

    const maxQuantity = Number(elements.productQuantity.max);

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
// 8. THÊM SẢN PHẨM LẺ VÀO GIỎ HÀNG
// ======================================================

/**
 * Xử lý thêm sản phẩm lẻ.
 *
 * Gọi addSingle() từ cart.js.
 * Không thao tác với gift draft của người dùng.
 */
function handleAddToCart() {
    clearMessage();

    const quantityResult = validateQuantity();

    if (!quantityResult.ok) {
        showMessage(quantityResult.message, 'error');

        elements.productQuantity?.focus();
        return;
    }

    const quantity = quantityResult.quantity;

    if (!productId) {
        showMessage(
            'Không xác định được mã sản phẩm.',
            'error'
        );
        return;
    }

    if (elements.addToCartButton) {
        elements.addToCartButton.disabled = true;
        elements.addToCartButton.textContent = 'Đang xử lý...';
    }

    try {
        // addSingle tự kiểm tra tồn kho, lưu giỏ hàng
        // và cập nhật biểu tượng số lượng giỏ.
        const result = addSingle(productId, quantity);

        if (result.ok) {
            showMessage(
                result.message || 'Đã thêm sản phẩm vào giỏ hàng.',
                'success'
            );

            // Không gọi updateCartBadge() ở đây vì addSingle()
            // đã tự cập nhật badge sau khi lưu giỏ thành công.
        } else {
            showMessage(
                result.message || 'Không thể thêm sản phẩm vào giỏ hàng.',
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
        if (elements.addToCartButton) {
            const stock = Number.isSafeInteger(currentProduct?.stockDemo)
                ? currentProduct.stockDemo
                : 0;

            elements.addToCartButton.disabled = stock <= 0;

            elements.addToCartButton.textContent =
                stock > 0
                    ? 'Thêm vào giỏ hàng'
                    : 'Tạm hết hàng';
        }
    }
}

// ======================================================
// 9. KHỞI TẠO TRANG CHI TIẾT
// ======================================================

let currentProduct = null;

/**
 * Khởi tạo trang khi tài liệu HTML đã được tải.
 */
function initializeProductDetail() {
    // Cập nhật đường dẫn quay lại.
    configureBackLink();

    // Đồng bộ số lượng giỏ hàng hiện tại.
    // addSingle() sẽ tự cập nhật badge ở các lần thêm tiếp theo.
    try {
        updateCartBadge();
    } catch (error) {
        console.error(
            '[Lenly product detail] Không thể cập nhật giỏ hàng:',
            error
        );
    }

    // Kiểm tra mã sản phẩm trên URL.
    if (!productId || productId.trim() === '') {
        showProductError(
            'Đường dẫn chưa có mã sản phẩm. Vui lòng quay lại danh sách sản phẩm và chọn sản phẩm muốn xem.'
        );
        return;
    }

    // Lấy dữ liệu sản phẩm từ product-utils.js.
    try {
        currentProduct = getProductById(productId.trim());
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

    // Kiểm tra mã không tồn tại hoặc dữ liệu không hợp lệ.
    if (!isValidProduct(currentProduct)) {
        showProductError(
            `Không tìm thấy sản phẩm có mã "${productId}". Vui lòng kiểm tra lại đường dẫn hoặc chọn sản phẩm khác.`
        );
        return;
    }

    // Hiển thị thông tin sản phẩm.
    renderProduct(currentProduct);

    // Đăng ký sự kiện thêm vào giỏ.
    if (elements.addToCartForm) {
        elements.addToCartForm.addEventListener(
            'submit',
            function (event) {
                event.preventDefault();
                handleAddToCart();
            }
        );
    }

    // Xóa thông báo cũ khi người dùng thay đổi số lượng.
    if (elements.productQuantity) {
        elements.productQuantity.addEventListener(
            'input',
            clearMessage
        );
    }
}

// ======================================================
// 10. CHẠY CHƯƠNG TRÌNH
// ======================================================

initializeProductDetail();
