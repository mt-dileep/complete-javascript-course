'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//coding challenge 2
const wait = delay => new Promise(resolve => setTimeout(resolve, delay));
const images = document.querySelector('.images');
let globImg = null;
const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      images.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found!'));
    });
  });
};

createImage('img/img-1.jpg')
  .then(img => {
    globImg = img;
    console.log('Image 1 loaded');
    return wait(2000);
  })
  .then(() => {
    globImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    globImg = img;
    console.log('Image 2 loaded');
    return wait(2000);
  })
  .then(() => {
    globImg.style.display = 'none';
  })
  .catch(err => console.error(err));
