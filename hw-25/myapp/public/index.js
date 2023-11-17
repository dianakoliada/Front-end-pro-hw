'use strict'

const productCardList = document.querySelector('#js-product-list-wrap');
const homeBtn = document.querySelector('#js-home');
const nav = document.querySelector('#js-nav');
const productCardWrap = document.querySelector('#js-product-wrap');
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

const ORIGIN = window.location.origin;
function eventedPushState(state, title, url) {
   var pushChangeEvent = new CustomEvent('onpushstate', {
      detail: {
         state,
         title,
         url,
      },
      
   });
   document.dispatchEvent(pushChangeEvent);
   return history.pushState(state, title, [ORIGIN, url].join('/'));
};

function displayCategories() {
   fetch('/api/data')
      .then(response => response.json())
      .then(data => {
         data.categories.forEach((el) => {
            nav.insertAdjacentHTML('beforebegin', `<li class="categories-item">
                                                      <a class="categories-link js-link" href="">${el}</a>
                                                   </li>
            `)

         });
         const selectedCategory = document.querySelectorAll('.js-link');

         selectedCategory.forEach((el) => {
            el.addEventListener('click', (e) => {
               e.preventDefault();
         
               // 3. В обробнику треба викликати eventedPushState і передати в неї 3 аргументи: назву категорії, пустий рядок та урл категорії
               if (el.textContent === 'Mirrors') {
                  eventedPushState('Mirrors', '', 'Mirrors');
               }
               if (el.textContent === 'Blankets') {
                  eventedPushState('Blankets', '', 'Blankets');
               }
               if (el.textContent === 'Pillows') {
                  eventedPushState('Pillows', '', 'Pillows');
               }
            })
         });
  })
   
};


function buyProducts(product) {
   if (product) {
      basketArr.push(product);
      alert('The product was purchased!');
      productCardList.innerHTML = '';
      productCardWrap.innerHTML = '';
   }
}

function renderBasketLength() {
   let busketNums = basketArr.length;
   basketQuantity.innerHTML = '';
   basketQuantity.innerHTML += `(${busketNums})`;
}
renderBasketLength();

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
   productCardList.innerHTML = '';
   basketArr.forEach(({img, title, price, id}) => {
      productCardList.innerHTML += `<div class="product-list-card js-product-card" data-id="${id}">
                                       <div class="img-holder">
                                          <img src="${img}" alt="${title}" class="img">
                                       </div>
                                       <p class="img-title">${title}</p>
                                       <p class="img-price">${price} uah</p>
                                    </div>`
   });
});


// 5. В колбеку слухача подій додай console.log, щоб подивитись, який аргумент приходить, та що є в властивості `detail`.
document.addEventListener('onpushstate', (e) => { 
   let selectedUrl = e.detail.state;

   // render products Mirrors
   if (e.detail.url === 'Mirrors') {
      clearPage();

      fetch('/api/data')
         .then(response => response.json())
         .then(data => {
            data.mirrors.forEach(({img, title, price, id}) => {
               productCardList.insertAdjacentHTML('beforeend', ` <div class="product-list-card js-product-card" data-id="${id}">
                                                                     <div class="img-holder">
                                                                        <img src="${img}" alt="${title}" class="img">
                                                                     </div>
                                                                     <p class="img-title">${title}</p>
                                                                     <p class="img-price">${price} uah</p>
                                                                  </div>
               `)
            })

            // show selected product card
            const productCard = document.querySelectorAll('.js-product-card');
            productCard.forEach((el) => {
               el.addEventListener('click', (e) => {
      
                  const clickedCardId = el.dataset.id;
                  const clickedProduct = data.mirrors.find((product) => product.id === clickedCardId);
      
                  productCardWrap.innerHTML = '';
                  productCardWrap.insertAdjacentHTML('beforeend', ` <div class="product-item-card">
                                                                        <div class="img-holder">
                                                                           <img src="${clickedProduct.img}" alt="${clickedProduct.title}" class="img">
                                                                        </div>
                                                                        <p class="img-title">${clickedProduct.title}</p>
                                                                        <p class="img-price">${clickedProduct.price} uah</p>
                                                                        <a href="#" class="btn btn-buy" id="js-btn-buy">Add to cart</a>
                                                                     </div>
                  `);
                  eventedPushState('Mirrors', '', selectedUrl + '/' + clickedCardId);
      
                  // Add to basket
                  const addBtn = document.querySelector('#js-btn-buy');
      
                  addBtn.addEventListener('click', (e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     buyProducts(clickedProduct);
                     renderBasketLength();
                     saveToLocalStorage();
                  })
               });
            });
      })
   };

   // render products Blankets
   if (e.detail.url === 'Blankets') {
      clearPage();

      fetch('/api/data')
         .then(response => response.json())
         .then(data => {
            data.blankets.forEach(({img, title, price, id}) => {
               productCardList.insertAdjacentHTML('beforeend', ` <div class="product-list-card js-product-card" data-id="${id}">
                                                                     <div class="img-holder">
                                                                        <img src="${img}" alt="${title}" class="img">
                                                                     </div>
                                                                     <p class="img-title">${title}</p>
                                                                     <p class="img-price">${price} uah</p>
                                                                  </div>
               `)
            });

            // show selected product card
            const productCard = document.querySelectorAll('.js-product-card');
            productCard.forEach((el) => {
               el.addEventListener('click', (e) => {
            
                  const clickedCardId = el.dataset.id;
                  const clickedProduct = data.blankets.find((product) => product.id === clickedCardId);
         
                  productCardWrap.innerHTML = '';
                  productCardWrap.insertAdjacentHTML('beforeend', ` <div class="product-item-card">
                                                                        <div class="img-holder">
                                                                           <img src="${clickedProduct.img}" alt="${clickedProduct.title}" class="img">
                                                                        </div>
                                                                        <p class="img-title">${clickedProduct.title}</p>
                                                                        <p class="img-price">${clickedProduct.price} uah</p>
                                                                        <a href="#" class="btn btn-buy" id="js-btn-buy">Add to cart</a>
                                                                     </div>
                  `);
      
                  eventedPushState('Blankets', '', selectedUrl + '/' + clickedCardId);
      
                  // Add to basket
                  const addBtn = document.querySelector('#js-btn-buy');
      
                  addBtn.addEventListener('click', (e) => {
                     e.preventDefault();            
                     buyProducts(clickedProduct);
                     renderBasketLength();
                     saveToLocalStorage();
                  })
               });
            })
      })
   };

   // render products Pillows
   if (e.detail.url === 'Pillows') {
      clearPage();

      fetch('/api/data')
         .then(response => response.json())
         .then(data => {
            data.pillows.forEach(({img, title, price, id}) => {
               productCardList.insertAdjacentHTML('beforeend', ` <div class="product-list-card js-product-card" data-id="${id}">
                                                                     <div class="img-holder">
                                                                        <img src="${img}" alt="${title}" class="img">
                                                                     </div>
                                                                     <p class="img-title">${title}</p>
                                                                     <p class="img-price">${price} uah</p>
                                                                  </div>
               `)
            });
            
            // show selected product card
            const productCard = document.querySelectorAll('.js-product-card');
      
            productCard.forEach((el) => {
            
               el.addEventListener('click', (e) => {
                  
                  const clickedCardId = el.dataset.id;
                  const clickedProduct = data.pillows.find((product) => product.id === clickedCardId);
               
                  productCardWrap.innerHTML = '';
                  productCardWrap.insertAdjacentHTML('beforeend', ` <div class="product-item-card">
                                                                        <div class="img-holder">
                                                                           <img src="${clickedProduct.img}" alt="${clickedProduct.title}" class="img">
                                                                        </div>
                                                                        <p class="img-title">${clickedProduct.title}</p>
                                                                        <p class="img-price">${clickedProduct.price} uah</p>
                                                                        <a href="#" class="btn btn-buy" id="js-btn-buy">Add to cart</a>
                                                                     </div>
                  `);
      
                  eventedPushState('Pillows', '', selectedUrl + '/' + clickedCardId);
      
                  // Add to basket
                  const addBtn = document.querySelector('#js-btn-buy');
      
                  addBtn.addEventListener('click', (e) => {
                     e.preventDefault();     
                     buyProducts(clickedProduct);
                     renderBasketLength();
                     saveToLocalStorage();
                  })
               });
            })
      })

   };  
})
displayCategories();