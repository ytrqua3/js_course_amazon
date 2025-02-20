import { loadProducts } from "../data/products.js";
import renderCheckoutSummaryHTML from "./tools/orderSummary.js";
import renderPaymentSummaryHTML from "./tools/paymentSummary.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js'
//import '../data/backend-practice.js'

Promise.all([ //wait for all promises to finish (run at the same time)
    new Promise((resolve)=>{ //resolve is a function
        loadProducts(() => {
            resolve('value1');
        })
    }),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
]).then(() => {
    renderCheckoutSummaryHTML();
    renderPaymentSummaryHTML();
})

/*
new Promise((resolve)=>{ //resolve is a function
    loadProducts(() => {
        resolve('value1');
    })

}).then((value) => {
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    });

}).then(()=> {
    renderCheckoutSummaryHTML();
        renderPaymentSummaryHTML();
})
*/

/*
loadProducts(()=>{
    loadCart(() => {
        renderCheckoutSummaryHTML();
        renderPaymentSummaryHTML();
    });
})
*/










