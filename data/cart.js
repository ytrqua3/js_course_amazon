export let cart;


export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));
    if(cart === null){
        cart = [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 3,
            deliveryOptionId: '1'
        }];
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}
loadFromStorage();


export function addToCart(productId, quantity){
  let matchingItem = cart.find((cartItem) => productId === cartItem.productId);
  quantity = Number(quantity);
  if(matchingItem){
      matchingItem.quantity += Number(quantity);
  }else{
      cart.push({
          productId,
          quantity,
          deliveryOptionId: '1'
      });
  }
  //update cart json file
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function deleteFromCart(productId){
    let matchingItem = cart.find((cartItem) => productId === cartItem.productId);
    if(!matchingItem){
        return;
    }
    const deletItemIndex = cart.indexOf(matchingItem);
    cart.splice(deletItemIndex, 1);
    //update cart json file
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateDeliveryOption(productId, deliveryOptionId){
    const item = cart.find((cartItem) => productId === cartItem.productId);
    if(!item){
        return;
    }
    item.deliveryOptionId = deliveryOptionId;
    localStorage.setItem('cart', JSON.stringify(cart));

}