class Cart{
    cartItems;
    localStorageKey;

    constructor(localStorageKey){
        this.localStorageKey= localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
        if(!this.cartItems){
            this.cartItems = [{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 3,
                deliveryOptionId: '1'
            }];
            localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
        }
    }

    addToCart(productId, quantity){
        let matchingItem = this.cartItems.find((cartItem) => productId === cartItem.productId);
        quantity = Number(quantity);
        if(matchingItem){
            matchingItem.quantity += Number(quantity);
        }else{
            this.cartItems.push({
                productId,
                quantity,
                deliveryOptionId: '1'
            });
        }
        //update cart json file
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    deleteFromCart(productId){
        let matchingItem = this.cartItems.find((cartItem) => productId === cartItem.productId);
        if(!matchingItem){
            return;
        }
        const deletItemIndex = this.cartItems.indexOf(matchingItem);
        this.cartItems.splice(deletItemIndex, 1);
        //update cart json file
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    updateDeliveryOption(productId, deliveryOptionId){
        const item = this.cartItems.find((cartItem) => productId === cartItem.productId);
        if(!item){
            return;
        }
        item.deliveryOptionId = deliveryOptionId;
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    
    }
}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

businessCart.addToCart("8c9c52b5-5a19-4bcb-a5d1-158a74287c53", 2);

console.log(cart);
console.log(businessCart);
