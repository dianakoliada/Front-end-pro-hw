'use strict'
// Підключення модуля Express:
const express = require('express');

// Створення екземпляру застосунку Express:
const app = express();
const port = 3000;

const data = {
   categories: ['Mirrors', 'Blankets', 'Pillows'],
   mirrors: [
      {  
         'id': '1',
         'img': 'https://cdn2.jysk.com/getimage/wd2.medium/36385',
         'title': 'Дзеркало MARIBO 72x162см',
         'price': '2500'
      },
   
      {  
         'id': '2',
         'img': 'https://cdn3.jysk.com/getimage/wd2.teaser/185671',
         'title': 'Дзеркало SPANG 40x70см',
         'price': '1000'
      },
   
      {  
         'id': '3',
         'img': 'https://cdn1.jysk.com/getimage/wd2.medium/86411',
         'title': 'Дзеркало NORDBORG 70x90см',
         'price': '2299 '
      },
   
   ],
   blankets: [
      {  
         'id': '4',
         'img': 'https://cdn4.jysk.com/getimage/wd2.medium/119090',
         'title': 'Ковдра важка GJENDETUNGA 135x200см',
         'price': '2250'
      },
   
      {  
         'id': '5',
         'img': 'https://cdn3.jysk.com/getimage/wd2.medium/88140',
         'title': 'Ковдра OKKEN тепла 135х200см',
         'price': '7000'
      },
   
      {  
         'id': '6',
         'img': 'https://cdn4.jysk.com/getimage/wd2.medium/114723',
         'title': 'Термоковдра BEITO екстра 135x200см',
         'price': '7000'
      },
   
   ],
   pillows: [
      {  
         'id': '7',
         'img': 'https://cdn2.jysk.com/getimage/wd2.medium/86772',
         'title': 'Подушка ALTA 50х70см 750г',
         'price': '550'
      },
   
      {  
         'id': '8',
         'img': 'https://cdn4.jysk.com/getimage/wd2.medium/128614',
         'title': 'Подушка FALKETIND 50x70см',
         'price': '850'
      },
   
      {  
         'id': '9',
         'img': 'https://cdn3.jysk.com/getimage/wd2.medium/88133',
         'title': 'Подушка LOFTET 50x70см',
         'price': '2000 '
      },
   
   ]
}

// Маршрут для отримання даних
app.get('/api/data', (req, res) => {
   res.json(data);
});

// Вказуємо Express використовувати статичні файли з папки 'public'
app.use(express.static('public'));

// Обробник для головної сторінки
app.get('/', (req, res) => {
   res.send('public');
 });

// Запуск сервера:
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


// http://localhost:3000/