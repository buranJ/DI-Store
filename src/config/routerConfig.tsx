import { lazy, ReactElement } from 'react';

type IRoute = {
  path: string;
  element: ReactElement;
  children?: IRoute[];
};

const Home = lazy(() => import('../pages/Home'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const Contacts = lazy(() => import('../pages/Contacts'));
const Basket = lazy(() => import('../pages/Basket'));
const Auth = lazy(() => import('../pages/Auth'));
const WishList = lazy(() => import('../pages/WishList'));
const Welcome = lazy(() => import('../pages/Welcome'));
const OrderTracking = lazy(() => import('../pages/OrderTracking'));
const PrivacyPolicy = lazy(() => import('../pages/HeplfulPages/PrivacyPolicy'));
const Return = lazy(() => import('../pages/HeplfulPages/Return'));
const Offer = lazy(() => import('../pages/HeplfulPages/Offer'));
const Sale = lazy(() => import('../pages/HeplfulPages/Sale'));
const PublicOffer = lazy(() => import('../pages/HeplfulPages/PublicOffer'));
const Refund = lazy(() => import('../pages/HeplfulPages/Refund'));
const About = lazy(() => import('../pages/About'));
const MyAcc = lazy(() => import('../pages/MyAcc'));
const Address = lazy(() => import('../pages/Address'));
const CompletePurchase = lazy(() => import('../pages/CompletePurchase'));
const Catalog = lazy(() => import('pages/Catalog'));
const ResetPassword = lazy(() => import('pages/Auth/ResetPassword'));

export const routerConfig: IRoute[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/product/:id',
    element: <ProductDetail />,
  },
  {
    path: '/contacts',
    element: <Contacts />,
  },
  {
    path: '/basket',
    element: <Basket />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/favorites',
    element: <WishList />,
  },
  {
    path: '/profile',
    element: <Welcome />,
  },
  {
    path: '/order-tracking',
    element: <OrderTracking />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/return',
    element: <Return />,
  },
  {
    path: '/rules-of-offer',
    element: <Offer />,
  },
  {
    path: '/rules-of-sale',
    element: <Sale />,
  },
  {
    path: '/public-offer',
    element: <PublicOffer />,
  },
  {
    path: '/refund',
    element: <Refund />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/my-acc',
    element: <MyAcc />,
  },
  {
    path: '/address/:id',
    element: <Address />,
  },
  {
    path: '/complete-purchase',
    element: <CompletePurchase />,
  },
  {
    path: '/catalog',
    element: <Catalog />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
  },
];
