import { products } from "../data/products.js";
import { formatCurrency } from "./money.js"
import { addToCart } from "./cart.js";

let product;

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId')

products.forEach((item) => {
    if (item.id === productId) {
        product = item;
    }
});

document.querySelector('.js-product-image-container').innerHTML = `
    <div class="product-images-sidebar">
        <div class="sidebar-image-container js-sidebar-image-container active-image">
            <img class="sidebar-image" src="images/products/${product.id}/main-photo.jpg">
        </div>
        <div class="sidebar-image-container js-sidebar-image-container">
            <img class="sidebar-image" src="images/products/${product.id}/second-photo.jpg">
        </div>
        <div class="sidebar-image-container js-sidebar-image-container">
            <img class="sidebar-image" src="images/products/${product.id}/third-photo.jpg">
        </div>
        <div class="sidebar-image-container js-sidebar-image-container">
            <img class="sidebar-image" src="images/products/${product.id}/fourth-photo.jpg">
        </div>
    </div>
    <div class="image-display-container">
        <img class="product-image js-product-image" src="images/products/${product.id}/main-photo.jpg">
    </div>
`;

document.querySelector('.js-details-container').innerHTML = `
    <p class="product-name">
        ${product.name}
    </p>
    <p class="js-price"></p>
    <hr>
    <p class="info-text">INFO</p>
    <div class="info-container js-info-container"></div>

    <span>Quantity: </span> <input type="number" class="quantity-input js-quantity-input" value="1" min="1" max="99">
    <button class="add-to-cart-button js-add-to-cart-button">Add To Cart</button>
`;

document.querySelector('.js-product-name-mobile').textContent = product.name;

if (product.discount) {
    document.querySelector('.js-price').innerHTML = `
        &euro;${formatCurrency(product.priceCents)} <sup class="previous-price">Was &euro;${formatCurrency(product.previousPriceCents)}</sup>
    `;
} else {
    document.querySelector('.js-price').innerHTML = `
        &euro;${formatCurrency(product.priceCents)} 
    `;
}

if (product.categoryCharacteristics.category === 'phone') {
    document.querySelector('.js-info-container').innerHTML = `
        <span>Brand</span> 
        <span>${product.brand}</span>

        <span>Operating System</span> 
        <span>${product.categoryCharacteristics.operatingSystem}</span>

        <span>RAM</span>
        <span>${product.categoryCharacteristics.ram}GB</span>

        <span>Memory storage capacity</span>
        <span>${product.categoryCharacteristics.memoryStorage}GB</span>

        <span>Screen Size</span>
        <span>${product.categoryCharacteristics.screenSize}</span>

        <span>Resolution</span>
        <span>${product.categoryCharacteristics.resolution}</span>
    `;
} else if (product.categoryCharacteristics.category === 'speaker') {
    document.querySelector('.js-info-container').innerHTML = `
        <span>Brand</span> 
        <span>${product.brand}</span>

        <span>Output Power</span> 
        <span>${product.categoryCharacteristics.outputPower} Watts</span>

        <span>Speaker Type</span>
        <span>${product.categoryCharacteristics.speakerType}</span>

        <span>Connectivity Technology</span>
        <span>${product.categoryCharacteristics.connectivityTechnology}</span>

        <span>Mounting Type</span>
        <span>${product.categoryCharacteristics.mountingType}</span>
    `;
} else if (product.categoryCharacteristics.category === 'laptop') {
    document.querySelector('.js-info-container').innerHTML = `
        <span>Brand</span> 
        <span>${product.brand}</span>

        <span>Screen Size</span> 
        <span>${product.categoryCharacteristics.screenSize}</span>

        <span>Disk Size</span>
        <span>${product.categoryCharacteristics.diskSize}</span>

        <span>CPU</span>
        <span>${product.categoryCharacteristics.cpu}</span>

        <span>RAM</span>
        <span>${product.categoryCharacteristics.ram}GB</span>

        <span>Operating System</span> 
        <span>${product.categoryCharacteristics.operatingSystem}</span>

        <span>Graphics Card</span> 
        <span>${product.categoryCharacteristics.graphicsCard}</span>
    `;
} else if (product.categoryCharacteristics.category === 'headphones') {
    document.querySelector('.js-info-container').innerHTML = `
        <span>Brand</span> 
        <span>${product.brand}</span>

        <span>Form Factor</span> 
        <span>${product.categoryCharacteristics.formFactor}</span>

        <span>Noise Cancellation</span>
        <span>${product.categoryCharacteristics.noiseCancellation}</span>

        <span>Connectivity</span>
        <span>${product.categoryCharacteristics.Connectivity}</span>

        <span>Headphone Jack</span>
        <span>${product.categoryCharacteristics.headphoneJack}</span>
    `;
}

document.querySelector('.js-add-to-cart-button').addEventListener('click', () => {
    let quantity = Number(document.querySelector('.js-quantity-input').value);
    
    addToCart(productId, quantity);
});

document.querySelectorAll('.js-sidebar-image-container').forEach((element) => {
    element.classList.remove('active-image');
    element.addEventListener('click', () => {
        document.querySelectorAll('.js-sidebar-image-container').forEach((element) => {
            element.classList.remove('active-image');
        });
        element.classList.add('active-image');

        document.querySelector('.js-product-image').src = element.querySelector('img').src;
    });
});

document.querySelector('.js-menu-icon').addEventListener('click', () => {
    document.querySelector('.js-menu-container').classList.add('menu-container-active');
});

document.querySelector('.js-cross-icon').addEventListener('click', () => {
    document.querySelector('.js-menu-container').classList.remove('menu-container-active');
});