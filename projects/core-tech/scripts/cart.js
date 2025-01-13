import { products } from "../data/products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId, quantity) {
    let cartProduct;
    let isProductIntoCart = false;
    
    cart.forEach((product) => {
        if (product.id === productId) {
            product.quantity += Number(quantity);
            isProductIntoCart = true;
            console.log(product);
        }
    });
    if (!isProductIntoCart) { 
        products.forEach((product) => {
            if (product.id === productId) {
                cartProduct = product;
                cartProduct.quantity = Number(quantity);
                cart.push(cartProduct);
            }
        }); 
    }

    localStorage.setItem('cart', JSON.stringify(cart))
}

export function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));
}

export function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
}