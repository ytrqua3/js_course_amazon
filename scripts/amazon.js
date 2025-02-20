import { renderProductsHTML } from "./tools/productsPage.js";
import { loadProducts, products } from "../data/products.js";

loadProducts(renderProductsHTML);

/*
document.querySelector('.js-products-grid').innerHTML = renderProductsHTML(); 
    addEventListenrToAddToCart();
    document.querySelector('.js-cart-quantity').innerText = updateCartQuantity();
*/
