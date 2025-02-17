import { addToCart, cart, loadFromStorage, deleteFromCart, updateDeliveryOption } from "../../data/cart.js";

describe('test suite: addToCart', () => {

    it('add new product to cart', () => { 
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]); //creats a fake localStorage.getItem that returns []
        }); 
        spyOn(localStorage, 'setItem'); //mock only lasts for one test
        loadFromStorage(); //now cart=[]
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 10);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); //only works if method was mocked
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[0].quantity).toEqual(10);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":10,"deliveryOptionId":"1"}]');
    });

    it('add existing product to cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 10,
                deliveryOptionId: '1'
            }]); 
        }); 
        spyOn(localStorage, 'setItem');
        loadFromStorage(); 

        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 10);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":20,"deliveryOptionId":"1"}]')
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); //only works if method was mocked
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[0].quantity).toEqual(20);
    })

});

describe('test suite: deleteFromCart', () => {
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
        loadFromStorage();

    });

    it('remove a product on the cart', () => {
        deleteFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        const expectedCartString = JSON.stringify([{
            productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            quantity: 3,
            deliveryOptionId: '2'
        }]);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', expectedCartString);
    });

    it('remove a product not on the cart', () => {
        deleteFromCart("e43638ce-6aa0-4b85-b27f");
        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(localStorage.setItem).not.toHaveBeenCalled();

    });
    
    it('updates delivery option in the cart', () => {
        updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", '3');
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(cart[1].productId).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(cart[1].deliveryOptionId).toEqual('2');
        const expectedCartString = JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: '3'
            },
            {
                productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                quantity: 3,
                deliveryOptionId: '2'
            }]);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', expectedCartString);
    });

    it('updates delivery option for product not in the cart', () => {
        updateDeliveryOption("e4363885-b27f-e1d07eb678c6", '3');
        expect(localStorage.setItem).not.toHaveBeenCalled();
    }); 

    it('updates delivery option for product not in the cart', () => {
        updateDeliveryOption("15b6fc6f-327a-4ec4-896f-486349e85a3d", '3');
        expect(localStorage.setItem).not.toHaveBeenCalled();
    }); 
});



