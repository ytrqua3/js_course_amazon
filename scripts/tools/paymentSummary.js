import { cart } from '../../data/cart.js';
import { deliveryOptions } from '../../data/delivery.js';
import { findProductWithId } from './findProducts.js';

export function renderPaymentSummaryHTML(){
    let totalQuantity = 0;
    let totalPrice = 0;
    let totalShipping = 0;
    cart.forEach((cartItem) =>{
        const itemProduct = findProductWithId(cartItem.productId);
        const { priceCents } = itemProduct;
        const quantity = cartItem.quantity;
        totalQuantity += Number(quantity);
        const shipping = deliveryOptions.find((option) => option.deliveryOptionId === cartItem.deliveryOptionId).priceCents;
        totalShipping += shipping/100;
        totalPrice += Number(priceCents)*Number(quantity)/100;
    });
    totalQuantity = Number(totalQuantity.toFixed(2));
    totalPrice = Number(totalPrice.toFixed(2));
    totalShipping = Number(totalShipping.toFixed(2));
    let totalBeforeTax = totalPrice + totalShipping;
    totalBeforeTax = Number(totalBeforeTax.toFixed(2));
    let tax = (totalBeforeTax*0.1);
    tax = Number(tax.toFixed(2));
    let orderTotal = (totalBeforeTax + tax);
    orderTotal = Number(orderTotal.toFixed(2));

    const html = `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${totalQuantity}):</div>
        <div class="payment-summary-money">$${totalPrice}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money js-total-shipping">$${totalShipping}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${totalBeforeTax}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${tax}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money js-order-total">$${orderTotal}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `;
    document.querySelector('.payment-summary').innerHTML = html;

    //render back to home link text
    document.querySelector('.return-to-home-link').innerText = `${totalQuantity} Items`;
}

export default renderPaymentSummaryHTML;