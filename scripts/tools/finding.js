import { products } from "../data/products.js"

function findProductWithId(productId){
    return products.find(product => product.id === productId);
}