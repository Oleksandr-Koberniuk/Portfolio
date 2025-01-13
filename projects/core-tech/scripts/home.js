import { products } from "../data/products.js";
import { formatCurrency } from "./money.js";
let hotDealsHTML = '';
let trendingHTML = '';

products.forEach((product) => {  
    if (product.discount) {
        hotDealsHTML += `
            <a  href="product-page.html?productId=${product.id}">
                <div class="product-box">
                    <div class="product-image-container">
                        <img class="product-image" src="images/products/${product.id}/main-photo.jpg">
                    </div>
                    <div class="product-details">
                        <p>
                            ${product.name}
                        </p>
                        <p>
                            &euro;${formatCurrency(product.priceCents)} <sup class="previous-price">Was &euro;${formatCurrency(product.previousPriceCents)}</sup>
                        </p>
                    </div>
                </div>
            </a>
        `;
    }

    if (product.soldQuantity >= 50 ) {
        if (product.discount) {
            trendingHTML +=    `
            <a  href="product-page.html?productId=${product.id}">
                <div class="product-box">
                    <div class="product-image-container">
                        <img class="product-image" src="images/products/${product.id}/main-photo.jpg">
                    </div>
                    <div class="product-details">
                        <p>
                            ${product.name}
                        </p>
                        <p>
                            &euro;${formatCurrency(product.priceCents)} <sup class="previous-price">Was &euro;${formatCurrency(product.previousPriceCents)}</sup>
                        </p>
                    </div>
                </div>
            </a>
        `;
        } else {
            trendingHTML +=    `
            <a  href="product-page.html?productId=${product.id}">
                <div class="product-box">
                    <div class="product-image-container">
                        <img class="product-image" src="images/products/${product.id}/main-photo.jpg">
                    </div>
                    <div class="product-details">
                        <p>
                            ${product.name}
                        </p>
                        <p>
                            &euro;${formatCurrency(product.priceCents)}
                        </p>
                    </div>
                </div>
            </a>
        `;
        }
    }
});

document.querySelector('.js-hot-deals-container').innerHTML = hotDealsHTML;
document.querySelector('.js-trending-container').innerHTML = trendingHTML;

document.querySelector('.js-menu-icon').addEventListener('click', () => {
    document.querySelector('.js-menu-container').classList.add('menu-container-active');
});

document.querySelector('.js-cross-icon').addEventListener('click', () => {
    document.querySelector('.js-menu-container').classList.remove('menu-container-active');
});