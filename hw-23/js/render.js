import { productCardWrap } from './index.js';

export const getCategoryHTML = name => 
   `<li class="categories-item">
      <a class="categories-link js-link" href="" data-category="${name}">${name}</a>
   </li>`;

export const getProductsHTML = (img, title, price, id) => {
   return `
   <div class="product-list-card js-product-card" data-id="${id}">
      <div class="img-holder">
         <img src="${img}" alt="${title}" class="img">
      </div>
      <p class="img-title">${title}</p>
      <p class="img-price">${price} uah</p>
   </div>`
};

export const getProductCardHTML = (product) => {
   productCardWrap.innerHTML = '';

   productCardWrap.insertAdjacentHTML('beforeend', 
      `<div class="product-item-card">
         <div class="img-holder">
            <img src="${product.img}" alt="${product.title}" class="img">
         </div>
         <p class="img-title">${product.title}</p>
         <p class="img-price">${product.price} uah</p>
         <a href="#" class="btn btn-buy" id="js-btn-buy">Add to cart</a>
      </div>
   `);
};

export const getBasketProductListHTML = (id, img, title, price) => {
   return   `
   <div class="product-list-card js-product-card" data-id="${id}">
      <div class="img-holder">
         <img src="${img}" alt="${title}" class="img">
      </div>
      <p class="img-title">${title}</p>
      <p class="img-price">${price} uah</p>
   </div>`
}