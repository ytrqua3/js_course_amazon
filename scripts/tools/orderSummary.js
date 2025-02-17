import { cart, deleteFromCart, updateDeliveryOption } from '../../data/cart.js';
import { findCartItemWithId, findProductWithId } from './findProducts.js';
import { deliveryOptions, calculateDeliveryDate } from '../../data/delivery.js';
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import renderPaymentSummaryHTML from './paymentSummary.js';

function updateQuantityEventListner(updateQuantityElement){
    const { productId } = updateQuantityElement.dataset;
    const quantityDisplayElement = document.querySelector(`.js-quantity-label-${productId}`);
    quantityDisplayElement.innerText="";
    //generate html for number input and save link (using container to avoid click even listner for js-update-quantity)
    document.querySelector(`.js-update-quantity-container-${productId}`).innerHTML = `<input type="number" 
        class="update-quantity-input js-update-quantity-input-${productId}"
        value=${findCartItemWithId(productId).quantity}>
        <span class="update-quantity-link link-primary js-save-quantity js-save-quantity-${productId}"
        data-product-id=${productId}>
        Save
        </span>
    `;
    //add event listner for new save link
    const inputSaveElement = document.querySelector(`.js-save-quantity-${productId}`);
    const inputQuantityElement = document.querySelector(`.js-update-quantity-input-${productId}`);
    inputSaveElement.addEventListener("click", () => saveUpdateQuantityEventListner(inputQuantityElement, productId));
}

//event listner for save link
function saveUpdateQuantityEventListner(inputQuantityElement, productId){
    const newQuantity = inputQuantityElement.value;
    if(newQuantity == 0){
        deletecheckoutItem(productId);
        return;
    }
    //update cart
    findCartItemWithId(productId).quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCheckoutSummaryHTML();
    renderPaymentSummaryHTML();
}

function deletecheckoutItem(productId){
    //delete in cart
    deleteFromCart(productId);
    //render html
    renderPaymentSummaryHTML();
    renderCheckoutSummaryHTML();
}

function addBusinessDays(day, duration){
    let resultDay = day;
    while(duration > 0){
        resultDay = resultDay.add(1, 'days');
        const resultWeekDay = resultDay.format('dddd');
        if(resultWeekDay != 'Saturday' && resultWeekDay != 'Sunday'){
            duration--;
        }
    }
    return resultDay;
}


function renderDeliveryOptionsHTML(cartItem){
    let html = "";
    const productId = cartItem.productId;
    deliveryOptions.forEach((option) => {
        const today = dayjs();
        const deliveryDate = addBusinessDays(today, option.duration);
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = option.priceCents === 0 ? "FREE" : `$${(option.priceCents/100).toFixed(2)} -`;
        const isChecked = option.deliveryOptionId === cartItem.deliveryOptionId;
        html += `
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input js-delivery-option-input js-delivery-option-input${option.deliveryOptionId}-${productId}"
                data-product-id=${productId}
                data-delivery-option-id=${option.deliveryOptionId}
                name="delivery-option-${productId}"
                ${isChecked ? "checked" : ""}>
                <div>
                <div class="delivery-option-date js-delivery-option-date1">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div> 
        `;
    });
    return html;
}


export function renderCheckoutSummaryHTML(){
    let html = "";
    cart.forEach((cartItem) => {
        //create variables needed   
        const { productId: id, quantity, deliveryOptionId } = cartItem;
        const deliveryDateString = calculateDeliveryDate(deliveryOptionId);

        const product = findProductWithId(id);
        const { name, priceCents, image } = product;
        //create html for cart items
        html += `
            <div class="cart-item-container cart-item-container-${id} js-cart-item-container">
                <div class="delivery-date js-delivery-date-${id}">
                    Delivery date: ${deliveryDateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                        ${name}
                    </div>
                    <div class="product-price">
                        ${product.getPrice()}
                    </div>
                    <div class="product-quantity js-product-quantity-${id}">
                        <span>
                        Quantity: <span class="quantity-label js-quantity-label-${id}">${quantity}</span>
                        </span>
                        <span class="js-update-quantity-container-${id}">
                            <span class="update-quantity-link link-primary js-update-quantity js-update-quantity-${id}"
                            data-product-id=${id}>
                            Update
                            </span>
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-quantity js-delete-quantity-${id}"
                        data-product-id=${id}>
                        Delete
                        </span>
                    </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${renderDeliveryOptionsHTML(cartItem)}
                    </div>
                </div>
            </div>
        `;  
    });
    document.querySelector('.order-summary').innerHTML = html;

    //add event listner to update quantity links
    const updateQuantityElements = document.querySelectorAll('.js-update-quantity');
    updateQuantityElements.forEach((updateQuantityElement) => {
        updateQuantityElement.addEventListener("click", () => updateQuantityEventListner(updateQuantityElement));
    });

    //add event listner to delete quantity links
    const deleteItemElements = document.querySelectorAll('.js-delete-quantity');
    deleteItemElements.forEach((deleteItemElement) => {
        deleteItemElement.addEventListener("click", () => deletecheckoutItem(deleteItemElement.dataset.productId));
    });

    //add event listners to radio buttons when new delivery option chose
    const radioButtonElements = document.querySelectorAll('.js-delivery-option-input');
    radioButtonElements.forEach((radioButton) => {
        radioButton.addEventListener("click", () => {
            const { productId, deliveryOptionId } = radioButton.dataset;
            //update cart
            updateDeliveryOption(productId, deliveryOptionId);
            renderCheckoutSummaryHTML();
            renderPaymentSummaryHTML();
        });
    });
}

export default renderCheckoutSummaryHTML;