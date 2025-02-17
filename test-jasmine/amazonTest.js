import { addEventListenrToAddToCart, renderProductsHTML, updateCartQuantity } from "../scripts/tools/productsPage.js";
import * as cartTools from "../data/cart.js"


//tests needed: quantity, add to cart
describe('test suite: interactive add to cart', () => {
    beforeEach(() => {
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
        //spyOn(cartTools, 'addToCart'); HOW CAN I DO IT???
        cartTools.loadFromStorage();
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-products-grid"></div>
            <div class="js-cart-quantity"></div>
        `;
        document.querySelector('.js-products-grid').innerHTML = renderProductsHTML(); 
        addEventListenrToAddToCart();
        document.querySelector('.js-cart-quantity').innerText = updateCartQuantity();
    });

    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML = '';
    });
    
    it('adds one to cart by default', ()=> {
        console.log(cartTools.cart);
        document.querySelector('.js-add-to-cart-3ebe75dc-64d2-4137-8860-1f5a963e534b').click();
        console.log(cartTools.cart);
        expect(cartTools.cart.length).toEqual(3);
        //expect(cartTools.addToCart).toHaveBeenCalledWith("3ebe75dc-64d2-4137-8860-1f5a963e534b", 1);
        const expectedCartString = JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: '1'
            },
            {
                productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                quantity: 3,
                deliveryOptionId: '2'
            },
            {
                productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', expectedCartString);
    });

    it('adds multiple to cart when quantity is chosen', ()=> {
        document.querySelector('.js-qunatity-selector-3ebe75dc-64d2-4137-8860-1f5a963e534b').value = 4;
        document.querySelector('.js-add-to-cart-3ebe75dc-64d2-4137-8860-1f5a963e534b').click();
        expect(cartTools.cart.length).toEqual(3);
        const expectedCartString = JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: '1'
            },
            {
                productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                quantity: 3,
                deliveryOptionId: '2'
            },
            {
                productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
                quantity: 4,
                deliveryOptionId: '1'
            }]);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', expectedCartString);
    });
});