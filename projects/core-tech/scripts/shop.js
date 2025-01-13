import { products } from "../data/products.js";
import { formatCurrency } from "./money.js";
let productsHTML = '';
let filtersMenu = false;

function generateProducts(product) {
    if (product.discount) {
        productsHTML +=    ` 
            <div class="product-box js-product-box-${product.id}">
                <a href="product-page.html?productId=${product.id}">
                    <div class="product-image-container">
                        <img class="product-image" src="images/products/${product.id}/main-photo.jpg">
                    </div>
                </a>
                <a href="product-page.html?productId=${product.id}">
                    <div class="product-details">
                        <p>
                            ${product.name}
                        </p>
                        <p class="discounted-price">
                            <span>&euro;${formatCurrency(product.priceCents)}</span> <span><sup class="previous-price">Was &euro;${formatCurrency(product.previousPriceCents)}</sup></span>
                        </p>
                    </div>
                </a>
            </div>
    
        `;
    } else {
        productsHTML +=    `     
            <div class="product-box js-product-box-${product.id}">
                <a href="product-page.html?productId=${product.id}">        
                    <div class="product-image-container">
                        <img class="product-image" src="images/products/${product.id}/main-photo.jpg">
                    </div>
                </a>
                <a href="product-page.html?productId=${product.id}">
                    <div class="product-details">
                        <p>
                            ${product.name}
                        </p>
                        <p>
                            &euro;${formatCurrency(product.priceCents)}
                        </p>
                    </div>
                </a>
            </div>      
        `;
    }
}

function priceInputCheck(elementClass) {
    const input = document.querySelector(elementClass).value;
    if (input < 0) {
        alert('Please enter positive number');
    }
}

function applyFilters() {
    const checkedBrands = Array.from(document.querySelectorAll('.js-product-brand:checked'))
        .map(cb => cb.value);

    const checkedCategories = Array.from(document.querySelectorAll('.js-product-category:checked'))
        .map(cb => cb.value);

    products.forEach(product => {
        const category = product.categoryCharacteristics.category;
        const brand = product.brand;            

        const matchesBrand = checkedBrands.includes(brand);
        const matchesCategory = checkedCategories.includes(category);
        let maxPrice, minPrice;

        if (filtersMenu) {
            minPrice = document.querySelector('.js-min-price-menu').value * 100;
            maxPrice = document.querySelector('.js-max-price-menu').value * 100;
        } else {
            minPrice = document.querySelector('.js-min-price').value * 100;
            maxPrice = document.querySelector('.js-max-price').value * 100;
        }
        
        if (maxPrice === 0) {
            maxPrice = 200000;
        }

        if (
            (checkedBrands.length === 0 || matchesBrand) 
            && 
            (checkedCategories.length === 0 || matchesCategory)
            &&
            (minPrice <= product.priceCents && maxPrice >= product.priceCents)
        ) {
            document.querySelector(`.js-product-box-${product.id}`).classList.remove('hide');
        } else {
            document.querySelector(`.js-product-box-${product.id}`).classList.add('hide');
        }
    });   
}

products.forEach((product) => {  
    generateProducts(product);
});

function sortProducts(criteria) {
    let sortedProducts;

    switch (criteria) {
        case "price-asc":
            sortedProducts = [...products].sort((a, b) => a.priceCents - b.priceCents);
            break;
        case "price-desc":
            sortedProducts = [...products].sort((a, b) => b.priceCents - a.priceCents);
            break;
        case "name-asc":
            sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "name-desc":
            sortedProducts = [...products].sort((a, b) => b.name.localeCompare(a.name));
            break;
        case "popularity-desc":
            sortedProducts = [...products].sort((a, b) => b.soldQuantity - a.soldQuantity);
            break;
        default:
            sortedProducts = products;
    }

    renderProducts(sortedProducts);
    applyFilters();
}

function renderProducts(productsToRender) {
    const productsContainer = document.querySelector('.js-products-container');
    productsHTML = ''; 
    productsToRender.forEach(product => generateProducts(product));
    productsContainer.innerHTML = productsHTML;
}

document.querySelector('.js-sort-dropdown').addEventListener('change', (event) => {
    sortProducts(event.target.value);
});

document.querySelector('.js-min-price').addEventListener('input', applyFilters);
document.querySelector('.js-max-price').addEventListener('input', applyFilters);
document.querySelector('.js-min-price-menu').addEventListener('input', applyFilters);
document.querySelector('.js-max-price-menu').addEventListener('input', applyFilters);

document.querySelectorAll('.js-product-brand, .js-product-category').forEach((checkbox) => { 
    checkbox.addEventListener('change', applyFilters);
});

document.querySelector('.js-products-container').innerHTML = productsHTML;

document.querySelector('.js-menu-icon').addEventListener('click', () => {
    document.querySelector('.js-menu-container').classList.add('menu-container-active');
});

document.querySelector('.js-cross-icon').addEventListener('click', () => {
    document.querySelector('.js-menu-container').classList.remove('menu-container-active');
});

document.querySelector('.js-filters-menu-button').addEventListener('click', () => {
    document.querySelector('.js-filters-menu-container').classList.add('filters-menu-active');
    filtersMenu = true;
});

document.querySelector('.js-cross-icon-filters').addEventListener('click', () => {
    document.querySelector('.js-filters-menu-container').classList.remove('filters-menu-active');
    filtersMenu = false;
});