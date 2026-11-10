import { getGiftCopyName } from './gift-names.js';
import {
    getCart,
    setSingleQuantity,
    setGiftQuantity,
    removeCartLine,
    getCartSummary,
    updateCartBadge
} from './cart.js';

import {
    getProductById,
    getItemsTotal,
    formatPrice
} from './product-utils.js';
import { appendGiftWorkspaceDraft } from './storage.js';

const cartLinesElement =
    document.querySelector('[data-cart-lines]');

const emptyElement =
    document.querySelector('[data-cart-empty]');

const summaryElement =
    document.querySelector('[data-cart-summary]');

const messageElement =
    document.querySelector('[data-cart-message]');

const totalQuantityElement =
    document.querySelector('[data-cart-total-quantity]');

const totalSetsElement =
    document.querySelector('[data-cart-total-sets]');

const totalAmountElement =
    document.querySelector('[data-cart-total-amount]');

function createSingleCartLine(line) {
    const product = getProductById(line.productId);
    const article = document.createElement('article');

    article.className = 'cart-line cart-line--single';
    article.dataset.lineId = line.lineId;

    if (!product) {
        article.textContent =
            `Không tìm thấy sản phẩm ${line.productId}.`;

        return article;
    }

    const lineAmount = product.price * line.quantity;

    article.innerHTML = `
        <img
            class="cart-line__image"
            src="./${product.image}"
            alt="${product.name}"
        >

        <div class="cart-line__information">
            <p class="cart-line__type">
                Sản phẩm mua lẻ
            </p>

            <h2>${product.name}</h2>

            <p>
                Đơn giá:
                ${formatPrice(product.price)}
            </p>

            <div class="cart-line__quantity">
                <button
                    type="button"
                    data-cart-action="decrease-single"
                >
                    −
                </button>

                <span>${line.quantity}</span>

                <button
                    type="button"
                    data-cart-action="increase-single"
                >
                    +
                </button>
            </div>

            <p>
                Thành tiền:
                <strong>
                    ${formatPrice(lineAmount)}
                </strong>
            </p>

            <button
                type="button"
                data-cart-action="remove"
            >
                Xóa
            </button>
        </div>
    `;

    return article;
}

function createGiftCartLine(line) {
    const article = document.createElement('article');

    article.className = 'cart-line cart-line--gift';
    article.dataset.lineId = line.lineId;

    const unitAmount = getItemsTotal(line.items);
    const lineAmount =
        unitAmount * line.setQuantity;

    const itemsHtml = line.items
        .map((item) => {
            const product =
                getProductById(item.productId);

            if (!product) {
                return `
                    <li>
                        Không tìm thấy sản phẩm
                        ${item.productId}.
                    </li>
                `;
            }

            return `
                <li class="cart-gift-item">
                    <img
                        src="./${product.image}"
                        alt="${product.name}"
                    >

                    <span>
                        ${product.name}
                        × ${item.quantity}
                    </span>
                </li>
            `;
        })
        .join('');

    article.innerHTML = `
        <div class="cart-line__information">
            <p class="cart-line__type">
                Bộ quà
            </p>

            <h2>${line.name}</h2>

            <p>
                Ngân sách đã chọn:
                ${formatPrice(line.budget)}
            </p>

            <ul class="cart-gift-items">
                ${itemsHtml}
            </ul>

            <p>
                Giá một bộ:
                ${formatPrice(unitAmount)}
            </p>

            <div class="cart-line__quantity">
                <button
                    type="button"
                    data-cart-action="decrease-gift"
                >
                    −
                </button>

                <span>${line.setQuantity}</span>

                <button
                    type="button"
                    data-cart-action="increase-gift"
                >
                    +
                </button>
            </div>

            <p>
                Thành tiền:
                <strong>
                    ${formatPrice(lineAmount)}
                </strong>
            </p>

            <button
    type="button"
    class="cart-line__copy"
    data-cart-action="copy-gift"
>
    Nhân bản để chỉnh riêng
</button>

<button
    type="button"
    data-cart-action="remove"
>
    Xóa bộ quà
</button>
        </div>
    `;

    return article;
}
function renderCartPage() {
    const cart = getCart();
    const summary = getCartSummary();
    const isEmpty = cart.lines.length === 0;

    /*
     * Xóa nội dung cũ trước khi hiển thị lại.
     */
    cartLinesElement.replaceChildren();

    /*
     * Duyệt qua từng dòng trong giỏ hàng.
     * Bước này đang hiển thị sản phẩm mua lẻ.
     */
    for (const line of cart.lines) {
    if (line.type === 'single') {
        cartLinesElement.append(
            createSingleCartLine(line)
        );

        continue;
    }

    if (line.type === 'gift') {
        cartLinesElement.append(
            createGiftCartLine(line)
        );
    }
}

    /*
     * Hiện thông báo giỏ trống khi không có dòng nào.
     */
    emptyElement.hidden = !isEmpty;
    summaryElement.hidden = isEmpty;

    /*
     * Cập nhật phần tổng giỏ hàng.
     */
    totalQuantityElement.textContent =
        String(summary.totalQuantity);

    totalSetsElement.textContent =
        String(summary.totalSets);

    totalAmountElement.textContent =
        formatPrice(summary.totalAmount);

    /*
     * Cập nhật số trên biểu tượng giỏ hàng.
     */
    updateCartBadge();
}

/*
 * Hiển thị giỏ hàng khi trang vừa mở.
 */
function showCartResult(result) {
    messageElement.textContent = result.message;

    if (!result.ok) {
        messageElement.dataset.status = 'error';
        return;
    }

    messageElement.dataset.status = 'success';
    renderCartPage();
}

function handleCartClick(event) {
    const button = event.target.closest(
        '[data-cart-action]'
    );

    if (!button) {
        return;
    }

    const article = button.closest('[data-line-id]');

    if (!article) {
        return;
    }

    const lineId = article.dataset.lineId;
    const action = button.dataset.cartAction;

    const line = getCart().lines.find(
        (cartLine) => cartLine.lineId === lineId
    );

    if (!line) {
        messageElement.textContent =
            'Không tìm thấy sản phẩm trong giỏ.';

        messageElement.dataset.status = 'error';
        return;
    }

    let result;

    if (action === 'increase-single') {
        result = setSingleQuantity(
            lineId,
            line.quantity + 1
        );
    }

    if (action === 'decrease-single') {
        if (line.quantity === 1) {
            messageElement.textContent =
                'Số lượng tối thiểu là 1. Bạn có thể nhấn Xóa.';

            messageElement.dataset.status = 'error';
            return;
        }

        result = setSingleQuantity(
            lineId,
            line.quantity - 1
        );
    }

    if (action === 'increase-gift') {
        result = setGiftQuantity(
            lineId,
            line.setQuantity + 1
        );
    }

    if (action === 'decrease-gift') {
        if (line.setQuantity === 1) {
            messageElement.textContent =
                'Số bộ tối thiểu là 1. Bạn có thể nhấn Xóa bộ quà.';

            messageElement.dataset.status = 'error';
            return;
        }

        result = setGiftQuantity(
            lineId,
            line.setQuantity - 1
        );
    }

    if (action === 'copy-gift') {
    if (line.type !== 'gift') {
        messageElement.textContent =
            'Chỉ có thể nhân bản bộ quà.';

        messageElement.dataset.status = 'error';
        return;
    }

    result = appendGiftWorkspaceDraft({
        version: 1,
        budget: line.budget,
        sourceGiftSetId: line.giftSetId,
        name: getGiftCopyName(line.name),
        items: line.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity
        })),
        setQuantity: 1,
        copiedFromLineId: line.lineId
    });

    if (!result.ok) {
        showCartResult(result);
        return;
    }

    window.location.href = 'gift-builder.html';
    return;
}
    if (action === 'remove') {
        result = removeCartLine(lineId);
    }

    if (result) {
        showCartResult(result);
    }
}

cartLinesElement.addEventListener(
    'click',
    handleCartClick
);

renderCartPage();