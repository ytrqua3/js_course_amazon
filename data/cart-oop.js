
function Cart(localStorageKey){
    const cart = { //organize code into objects
        cartItems: undefined,
    
        loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
            if(!this.cartItems){
                this.cartItems = [{
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 3,
                    deliveryOptionId: '1'
                }];
                localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
            }
        },
    
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
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
    
        deleteFromCart(productId){
            let matchingItem = this.cartItems.find((cartItem) => productId === cartItem.productId);
            if(!matchingItem){
                return;
            }
            const deletItemIndex = this.cartItems.indexOf(matchingItem);
            this.cartItems.splice(deletItemIndex, 1);
            //update cart json file
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
    
        updateDeliveryOption(productId, deliveryOptionId){
            const item = this.cartItems.find((cartItem) => productId === cartItem.productId);
            if(!item){
                return;
            }
            item.deliveryOptionId = deliveryOptionId;
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        
        }
    };

    return cart;
}


const cart = Cart('cart-oop');
cart.loadFromStorage();
cart.addToCart("54e0eccd-8f36-462b-b68a-8182611d9add", 3);

const businessCart = Cart('cart-business');
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
