import { loadProductsFetch } from "../data/products.js";
import renderCheckoutSummaryHTML from "./tools/orderSummary.js";
import renderPaymentSummaryHTML from "./tools/paymentSummary.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js'
//import '../data/backend-practice.js'

async function loadPage(){ //return a promise, allows await feature    
    try{
        await loadProductsFetch(); //write asynchronus code like normal code
        await new Promise((resolve, reject)=>{
            loadCart(()=>{
                //reject('error3'); //create an exception for asynchronous code
                resolve(); //value will be returned, instead of using .then, save the returned value in a variable and use it
            });
        });
    }catch(error){
        console.log('unexpected error. Try again later!!!')
    }
    renderCheckoutSummaryHTML();
    renderPaymentSummaryHTML();
}
loadPage().then(() => {
    console.log('next step');
    console.log(value);
})

/*
Promise.all([ //wait for all promises to finish (run at the same time)
    loadProductsFetch(),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
]).then(() => {
    renderCheckoutSummaryHTML();
    renderPaymentSummaryHTML();
})
*/

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










