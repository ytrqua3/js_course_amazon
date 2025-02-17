import { products } from "../../data/products.js";
import { cart } from "../../data/cart.js"

export function findProductWithId(id){
    return products.find((product) => product.id === id);
}

export function findCartItemWithId(id){
    return cart.find((product) => product.productId === id);
}