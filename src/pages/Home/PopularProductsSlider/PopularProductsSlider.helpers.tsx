export const sliderConfig = {
  pagination: true,
  breakpoints: {
    390: {
      slidesPerView: 1.5,
      spaceBetween: '30px',
    },
    640: {
      slidesPerView: 2,
      spaceBetween: '30px',
    },
    992: {
      pagination: true,
      slidesPerView: 2,
    },
    1024: {
      pagination: false,
      slidesPerView: 2.5,
      spaceBetween: '30px',
    },
  },
};
