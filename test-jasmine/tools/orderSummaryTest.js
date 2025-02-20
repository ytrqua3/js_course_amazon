import { renderCheckoutSummaryHTML } from '../../scripts/tools/orderSummary.js';
import { addToCart, cart, loadFromStorage } from "../../data/cart.js";
import renderPaymentSummaryHTML from '../../scripts/tools/paymentSummary.js';
import { findProductWithId } from "../../scripts/tools/findProducts.js"
import { loadProducts } from '../../data/products.js';
 
describe('test suite: render order summary', () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";

    beforeAll((done) => { //finishes after done function is called, can wait for backend code to finish
        loadProducts(done);
    });

    //this is called a hook
    beforeEach(()=>{
        document.querySelector('.js-test-container').innerHTML = `
            <div class="return-to-home-link"></div>
            <div class="order-summary"></div>
            <div class="payment-summary"></div>
        `;
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: '1'
            },
            {
                productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                quantity: 3,
                deliveryOptionId: '2'
            }]);
        });
        spyOn(localStorage, 'setItem');
        loadFromStorage();
        renderCheckoutSummaryHTML();
        renderPaymentSummaryHTML();
    });

    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('displays the cart', ()=>{
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 1');

        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 3');
        
        expect(
            document.querySelectorAll(`.product-name`)[0].innerText
        ).toEqual(findProductWithId(productId1).name);
        expect(
            document.querySelectorAll(`.product-name`)[1].innerText
        ).toEqual(findProductWithId(productId2).name);
        expect(
            document.querySelectorAll('.product-price')[0].innerText
        ).toEqual(`$${(findProductWithId(productId1).priceCents/100).toFixed(2)}`);
        expect(
            document.querySelectorAll('.product-price')[1].innerText
        ).toEqual(`$${(findProductWithId(productId2).priceCents/100).toFixed(2)}`);

    });

    it('removes a product', ()=>{
        document.querySelector(`.js-delete-quantity-${productId1}`).click();
        //check number of item displayed
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);
        //check if display of the item is removed
        expect(
            document.querySelector(`.cart-item-container-${productId1}`)
        ).toEqual(null);
        //check if other products still exist
        expect(
            document.querySelector(`.cart-item-container-${productId2}`)
        ).not.toEqual(null);
        //check if cart is updated accordingly
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(`${productId2}`);
    });

    it('updates delivery option accordingly', () => {
        const newDeliveryOption = document.querySelector(`.js-delivery-option-input3-${productId1}`);
        newDeliveryOption.click();
        expect(newDeliveryOption.checked).toEqual(true);
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toEqual(2);
        expect(document.querySelector('.js-order-total').innerText).toEqual('$52.64');
        expect(document.querySelector('.js-total-shipping').innerText).toEqual('$12.98');
    });
});