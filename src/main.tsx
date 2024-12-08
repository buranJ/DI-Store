import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { Provider } from 'react-redux';

import { setupStore } from 'api/index.ts';

import { chakraConfig } from 'config/chakraConfig.tsx';

import { Loader } from 'common/components';

import App from './App.tsx';

import './common/styles/styles.scss';
import 'swiper/css';

const theme = extendTheme(chakraConfig);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Suspense fallback={<Loader />}>
      <Provider store={setupStore()}>
        <BrowserRouter>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    </Suspense>
);
