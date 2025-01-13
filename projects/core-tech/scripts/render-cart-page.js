import { cart, removeFromCart, clearCart } from "./cart.js";
import { formatCurrency } from "./money.js"

function renderCartContent() {
    let cartHTML = '';

    cart.forEach((product) => {
        if (product.discount) {
            cartHTML += `
            <div class="product-container">
                <div class="image-container">
                    <a href="product-page.html?productId=${product.id}">
                        <div class="product-image-container">
                            <img src="images/products/${product.id}/main-photo.jpg" class="product-image">
                        </div>
                    </a>
                </div>

                <div class="details-container">
                    <a class="a" href="product-page.html?productId=${product.id}">
                        <p>${product.name}</h2>
                        <p>&euro;${formatCurrency(product.priceCents)} <sup class="previous-price">Was &euro;${formatCurrency(product.previousPriceCents)}</sup></p>
                    </a>
                
                    <div class="quantity-and-delete-wrapper">
                        <input type="number" data-id="${product.id}" class="js-quantity-input quantity-input" value="${product.quantity}" min="1" max="99">
                        <img src="images/cart-page/delete.svg" data-id="${product.id}" class="js-delete-button delete-button">
                    </div>
                </div>
            </div>
        `; 
        } else {
            cartHTML += `
            <div class="product-container">
                <div class="image-container">
                    <a href="product-page.html?productId=${product.id}">
                        <div class="product-image-container">
                            <img src="images/products/${product.id}/main-photo.jpg" class="product-image">
                        </div>
                    </a>
                </div>

                <div class="details-container">
                    <a class="a" href="product-page.html?productId=${product.id}">
                        <p>${product.name}</h2>
                        <p>&euro;${formatCurrency(product.priceCents)}</p>
                    </a>
    
                    <div class="quantity-and-delete-wrapper">
                        <input type="number" data-id="${product.id}" class="js-quantity-input quantity-input" value="${product.quantity}" min="1" max="99">
                        <img src="images/cart-page/delete.svg" data-id="${product.id}" class="js-delete-button delete-button">
                    </div>
                </div>
            </div>
        `; 
        }
    });

    if (cart.length === 0) {
        cartHTML = `
            <p class="empty-cart">Cart is empty</p>
        `;
    }

    document.querySelector('.cart-container').innerHTML = cartHTML;

    document.querySelectorAll('.js-delete-button').forEach((button) => {
        let id = button.dataset.id;
        button.addEventListener('click', () => {
            removeFromCart(id);
            renderCartContent();
            renderCartSummary();
        });
    });
}

function renderCartSummary() {
    let itemsCost = 0; 
    let deliveryCost = 999;
    let totalCost = 0;

    cart.forEach((product) => {
        itemsCost += product.priceCents * product.quantity;
    });


    totalCost = itemsCost + deliveryCost;
    
    if (cart.length !== 0) {
        document.querySelector('.js-items-cost').innerHTML = `&euro;${formatCurrency(itemsCost)}`;
        document.querySelector('.js-delivery-cost').innerHTML = `&euro;${formatCurrency(deliveryCost)}`;
        document.querySelector('.js-total-cost').innerHTML = `&euro;${formatCurrency(totalCost)}`;
    } else {
        document.querySelector('.js-items-cost').innerHTML = `&euro;0`;
        document.querySelector('.js-delivery-cost').innerHTML = `&euro;0`;
        document.querySelector('.js-total-cost').innerHTML = `&euro;0`;
    }
};

renderCartContent();
renderCartSummary();

if (JSON.parse(localStorage.getItem('payed'))) {
    document.querySelector('.js-checkout-finished').style.display = 'block';
    localStorage.setItem('payed', JSON.stringify(false));
}

document.querySelector('.js-close-checkout-message').addEventListener('click', () => {
    document.querySelector('.js-checkout-finished').style.display = 'none';
});

document.querySelectorAll('.js-quantity-input').forEach((element) => {
    let id = element.dataset.id;

    element.addEventListener('change', () => {
        if ( element.value < 1) {
            element.value = 1;
        }
        if ( element.value > 99) {
            element.value = 99;
        }
        cart.forEach((product) => {
            if (product.id === id) {
                product.quantity = element.value;
                console.log(product);
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        });

        renderCartSummary();  
    });
});

document.querySelector('.js-menu-icon').addEventListener('click', () => {
    document.querySelector('.js-menu-container').classList.add('menu-container-active');
});
document.querySelector('.js-cross-icon').addEventListener('click', () => {
    document.querySelector('.js-menu-container').classList.remove('menu-container-active');
});

document.querySelector('.js-checkout-button').addEventListener('click', () => {
    if (cart.length !== 0) {
        document.querySelector('.js-checkout-container').classList.add('active-checkout');
    } else {
        document.querySelector('.empty-cart').style.color = 'red';
    }
});
document.querySelector('.js-checkout-cross-icon').addEventListener('click', () => {
    document.querySelector('.js-checkout-container').classList.remove('active-checkout');
});

document.querySelector('.js-checkout-form').addEventListener('submit', () => {
    clearCart();
    renderCartContent();
    
    localStorage.setItem('payed', JSON.stringify(true));
});