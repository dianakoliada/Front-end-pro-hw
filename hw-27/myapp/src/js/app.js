//import * as func from './modules/render.js';

'use strict'
import { categories, mirrors, blankets, pillows } from './modules/products.js';
import { eventedPushState } from './modules/routing.js';
import { getCategoryHTML, getProductsHTML, getProductCardHTML, getBasketProductListHTML } from './modules/render.js';

const productCardList = document.querySelector('#js-product-list-wrap');
const homeBtn = document.querySelector('#js-home');
const nav = document.querySelector('#js-nav');
export const productCardWrap = document.querySelector('#js-product-wrap');
const basket = document.querySelector('#js-cart');
const basketQuantity = document.querySelector('#js-cart-nums');

const basketArr = getFromLocalStorage();


// save data into localstorage
function saveToLocalStorage() {
   let basketArrJSON = JSON.stringify(basketArr);
   localStorage.setItem('basketArr', basketArrJSON);
}

// get data from localstorage
function getFromLocalStorage() {
   let storedbasketArrJSON = localStorage.getItem('basketArr');
   let storedbasketArr = JSON.parse(storedbasketArrJSON);
   return storedbasketArr ?? [];
}

function displayCategories() {
   categories.forEach((el) => {
      nav.insertAdjacentHTML('beforebegin',  getCategoryHTML(el));
   });
};
displayCategories();

function buyProducts(product) {
   if (product) {
      basketArr.push(product);
      alert('The product was purchased!');
      productCardList.innerHTML = '';
      productCardWrap.innerHTML = '';
   }
}

function getBasketLength() {
   let busketNums = basketArr.length;
   basketQuantity.innerHTML = '';
   basketQuantity.innerHTML += `(${busketNums})`;
}
getBasketLength();

function clearPage() {
   productCardList.innerHTML = '';
   productCardWrap.innerHTML = '';
}

// go home 
homeBtn.addEventListener('click', (e) => {
   e.preventDefault();
   
   productCardList.innerHTML = '';
   productCardWrap.innerHTML = '';
   
   eventedPushState('Home', '', '');
});

// go to basket
basket.addEventListener('click', (e) => {
   e.preventDefault();
   eventedPushState('Basket', '', 'Basket');

   basketArr.forEach(({id, img, title, price}) => {
      productCardList.insertAdjacentHTML('beforeend', getBasketProductListHTML(id, img, title, price));
   });
});

// push selected url
const categoryLinks = document.querySelectorAll('.js-link');
categoryLinks.forEach((el) => {
   el.addEventListener('click', (e) => {
      e.preventDefault();

      const selectedCategory = el.dataset.category;

      // 3. В обробнику треба викликати eventedPushState і передати в неї 3 аргументи: назву категорії, пустий рядок та урл категорії
      if (selectedCategory) {
         eventedPushState(selectedCategory, '', selectedCategory);
      }
   })
});

// 5. В колбеку слухача подій додай console.log, щоб подивитись, який аргумент приходить, та що є в властивості `detail`.
document.addEventListener('onpushstate', (e) => {
   const selectedUrl = e.detail.url;

   const renderProducts = (productList) => {
      clearPage();
      productList.forEach(({img, title, price, id}) => {
         productCardList.insertAdjacentHTML('beforeend', getProductsHTML(img, title, price, id));
      });
   };

   const displaySelectedProductCard = (product) => {
      eventedPushState(selectedUrl, '', `${selectedUrl}/${product.id}`);
      getProductCardHTML(product);

      // Add to basket
      const addBtn = document.querySelector('#js-btn-buy');
      addBtn.addEventListener('click', (event) => {
         event.preventDefault();
         buyProducts(product);
         getBasketLength();
         saveToLocalStorage();
      });
   };

   if (selectedUrl === 'Mirrors') {
      renderProducts(mirrors);

      const productCards = document.querySelectorAll('.js-product-card');
      productCards.forEach((card) => {
         card.addEventListener('click', (e) => {
            const clickedCardId = card.dataset.id;
            const clickedProduct = mirrors.find((product) => product.id === clickedCardId);
            displaySelectedProductCard(clickedProduct);
         });
      });
   } else if (selectedUrl === 'Blankets') {
      renderProducts(blankets);

      const productCards = document.querySelectorAll('.js-product-card');
      productCards.forEach((card) => {
         card.addEventListener('click', (e) => {
            const clickedCardId = card.dataset.id;
            const clickedProduct = blankets.find((product) => product.id === clickedCardId);
            displaySelectedProductCard(clickedProduct);
         });
      });
   } else if (selectedUrl === 'Pillows') {
      renderProducts(pillows);

      const productCards = document.querySelectorAll('.js-product-card');
      productCards.forEach((card) => {
         card.addEventListener('click', (e) => {
            const clickedCardId = card.dataset.id;
            const clickedProduct = pillows.find((product) => product.id === clickedCardId);
            displaySelectedProductCard(clickedProduct);
         });
      });
   }
});