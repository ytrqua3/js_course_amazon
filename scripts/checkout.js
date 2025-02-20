import { loadProducts } from "../data/products.js";
import renderCheckoutSummaryHTML from "./tools/orderSummary.js";
import renderPaymentSummaryHTML from "./tools/paymentSummary.js";
//import '../data/cart-class.js'
//import '../data/backend-practice.js'

loadProducts(() => {
    renderCheckoutSummaryHTML();
    renderPaymentSummaryHTML();
});













