import { renderProductsHTML, updateCartQuantity, addEventListenrToAddToCart } from "../scripts/tools/productsPage.js"
import renderCheckoutSummaryHTML from "../scripts/tools/orderSummary.js";
import renderPaymentSummaryHTML from "../scripts/tools/paymentSummary.js";

export class Product{
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars*10}.png`
  }

  getPrice(){
    return `$${(this.priceCents/100).toFixed(2)}`;
  }

  extraInfoHTML(){
    return '';
  }
} 

export class Clothing extends Product{
  sizeChartLink;

  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML(){
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size Chart
      </a>
    `;
  }
}

export class Appliance extends Product{
  instructionLink;
  warrantyLink;

  constructor(productDetails){
    super(productDetails);
    this.instructionLink = productDetails.instructionLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML(){
    return `
      <a href="${this.instructionLink}" target="_blank">
        Instructions
      </a>
      <a href="${this.warrantyLink}" target="_blank">
        Warranty
      </a>
    `;
  }
}

export let products = [];

export function loadProducts(func){
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load', ()=> {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if(productDetails.type === "clothing"){
        return new Clothing(productDetails);
      }else if(productDetails.type === 'applicance'){
        return new Appliance(productDetails);
      }
      return new Product(productDetails);
    });

    console.log('loaded products, ' + func);
    func();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();

}



