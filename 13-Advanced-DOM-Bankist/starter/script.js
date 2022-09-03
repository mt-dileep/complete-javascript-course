'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////
//Learn more button
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function () {
  // section1.scrollIntoView({ behavior: 'smooth' });
  const s1coords = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
});
//////////////////////////////////////////////
// Navigation links
const navLinks = document.querySelector('.nav__links');
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const hrefId = e.target.getAttribute('href');
    const section = document.querySelector(hrefId);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////////////////////////////
// Tabbed Compoenent
const tabs = document.querySelectorAll('.operations__tab');
const contents = document.querySelectorAll('.operations__content');
const tabContainer = document.querySelector('.operations__tab-container');

tabContainer.addEventListener('click', function (e) {
  const tab = e.target.closest('.operations__tab'); //Remind
  console.log(tab);
  if (!tab) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tab.classList.add('operations__tab--active');
  contents.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${tab.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////////////////////////
// Hover Animation
const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(s => {
      if (s !== link) s.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////////
// Sticky header
const header = document.querySelector('.header');
const navheight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  },
  { root: null, threshold: 0, rootMargin: `-${navheight}px` }
);
headerObserver.observe(header);
// const sec1Coords = section1.getBoundingClientRect();
// not performant
// console.log(sec1Coords);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > sec1Coords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

//reveal sections
const sections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy load images
const targetImges = document.querySelectorAll('img[data-src]');
const loadImges = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImges, {
  root: null,
  threshold: 0,
  rootMargin: '100px',
});

targetImges.forEach(img => imgObserver.observe(img));

// slider
const leftBtn = document.querySelector('.slider__btn--left');
const rightBtn = document.querySelector('.slider__btn--right');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelector('.dots');

//extra functionality
let enableSliderForKeyPress = false;
const slider = document.querySelector('.slider');
const enableSlider = function (entries) {
  const [one] = entries;
  if (!one.isIntersecting) {
    console.log('key next slide disbale--------');
    enableSliderForKeyPress = false;
    return;
  }
  console.log('key next slide enabled--------');
  enableSliderForKeyPress = true;
};
const sliderObserver = new IntersectionObserver(enableSlider, {
  root: null,
  threshold: 0.9,
});
sliderObserver.observe(slider);

let currSlide = 0;
const gotoSlide = function (current) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - current)}%)`;
  });
};
//create dots for slides
const createDots = function () {
  slides.forEach((_, i) => {
    dots.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (current) {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${current}"]`)
    .classList.add('dots__dot--active');
};

createDots();
gotoSlide(0);
activateDot(0);
const nextSlide = function () {
  if (currSlide === slides.length - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  gotoSlide(currSlide);
  activateDot(currSlide);
};
const prevSlide = function () {
  if (currSlide === 0) {
    currSlide = slides.length - 1;
  } else {
    currSlide--;
  }
  gotoSlide(currSlide);
  activateDot(currSlide);
};
rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (enableSliderForKeyPress) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  }
});

dots.addEventListener('click', function (e) {
  gotoSlide(e.target.dataset.slide);
  activateDot(e.target.dataset.slide);
});
