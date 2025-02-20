import {cart, addToCart} from '../../data/cart.js';
import {products} from '../../data/products.js';


export function updateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => cartQuantity += Number(cartItem.quantity));
  document.querySelector('.js-cart-quantity').innerText =  cartQuantity;
}

function addedToCartPopUp(currentTimeoutID, productId){
  const addedMsgElement = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMsgElement.classList.add('visible');
  clearTimeout(currentTimeoutID);
  currentTimeoutID = setTimeout(() => {addedMsgElement.classList.remove('visible');}, 2000);
}

export function renderProductsHTML(){
  let productsHTML = "";

  products.forEach((product) => {
      productsHTML += `
          <div class="product-container">
            <div class="product-image-container"> 
              <img class="product-image"
                src=${product.image}>
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()};
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector js-qunatity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart js-add-to-cart-${product.id}" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
      `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;
  addEventListenrToAddToCart();
  updateCartQuantity();
}

export function addEventListenrToAddToCart(){
  let currentTimeoutID = undefined; 
  //add event listner to all add to cart button (separate it into another function)
  document.querySelectorAll('.js-add-to-cart')
      .forEach((button) => {
          button.addEventListener('click', () => {
              const { productId } = button.dataset;
              const quantitySelectElement = document.querySelector(`.js-qunatity-selector-${productId}`);
              const quantity = Number(quantitySelectElement.value);
              addedToCartPopUp(currentTimeoutID, productId);
              addToCart(productId, quantity);
              document.querySelector('.js-cart-quantity').innerText = updateCartQuantity();
          })
          
      });
}