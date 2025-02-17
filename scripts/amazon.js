import { renderProductsHTML, updateCartQuantity, addEventListenrToAddToCart } from "./tools/productsPage.js";

document.querySelector('.js-products-grid').innerHTML = renderProductsHTML(); 
addEventListenrToAddToCart();
document.querySelector('.js-cart-quantity').innerText = updateCartQuantity();