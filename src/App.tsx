import { Suspense, useEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { routerConfig } from 'config/routerConfig';
import { Header, Footer, Loader } from 'common/components';
import { HeaderContextProvider } from 'contexts/HeaderContext';

function App() {
  const routes = useRoutes(routerConfig);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <HeaderContextProvider>
          <Header />
          {routes}
          <Footer />
        </HeaderContextProvider>
      </Suspense>
    </>
  );
}

export default App;
