export const chakraConfig = {
  colors: {
    mainColor: '#CCD47C',
    darkGray: '#212B36',
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'app',
          color: 'white',
        },
      },
    },
  },
  breakpoints: {
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
    '1xl': '90em', // 1440px
    '2xl': '96em', // 1536px
  },
};
