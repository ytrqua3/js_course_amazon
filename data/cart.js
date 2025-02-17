const cart = [];
function addToCart(productId, qunatity){
    const matchingItem = products.find(product => product.id === productId);
    if(matchingItem){
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    }
}