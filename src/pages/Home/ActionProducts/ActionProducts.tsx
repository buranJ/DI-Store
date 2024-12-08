import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import { ProductGrid } from 'common/components';
import { ResponsiveContainer } from 'common/ui';

import {
  useGetBestsellersQuery,
  useGetNewProductsQuery,
  useGetProductsQuery,
} from 'api/common/products.api';

import { IProduct } from 'types/entities';

export const ActionProducts = () => {
  const [newPage, setNewPage] = useState(1);
  const [bestsellersPage, setBestsellersPage] = useState(1);
  const [productsPage, setProductsPage] = useState(1);

  const productsQuery = useGetProductsQuery({
    page: productsPage,
    page_size: 10,
  });
  const bestsellersQuery = useGetBestsellersQuery({
    page: bestsellersPage,
    page_size: 10,
  });
  const newProductsQuery = useGetNewProductsQuery({
    page: newPage,
    page_size: 10,
  });

  const bestsellersData = bestsellersQuery.data?.items.filter(
    (item) => item.variations[0]
  );
  const newProductsData = newProductsQuery.data?.items.filter(
    (item) => item.variations[0]
  );

  const navigate = useNavigate();
  const onProductClick = (product: IProduct) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <ResponsiveContainer>
      <Tabs variant='unstyled'>
        <TabList justifyContent='center'>
          <Tab
            _selected={{
              color: 'mainColor',
              border: '2px solid',
              borderColor: 'mainColor',
              rounded: '100px',
            }}
            fontSize={{ base: '14px', lg: '18px', xl: '25px' }}
            py='3px'
          >
            Новинки
          </Tab>
          <Tab
            _selected={{
              color: 'mainColor',
              border: '2px solid',
              borderColor: 'mainColor',
              rounded: '100px',
            }}
            fontSize={{ base: '14px', lg: '18px', xl: '25px' }}
            py='3px'
          >
            Бестселлеры
          </Tab>
          <Tab
            _selected={{
              color: 'mainColor',
              border: '2px solid',
              borderColor: 'mainColor',
              rounded: '100px',
            }}
            fontSize={{ base: '14px', lg: '18px', xl: '25px' }}
            py='3px'
          >
            Рекомендуемое
          </Tab>
        </TabList>
        <TabPanels>
          {/* Новинки */}
          <TabPanel px={0} mt={{ base: '26px', md: '30px', lg: '50px' }}>
            <ProductGrid
              onProductClick={onProductClick}
              data={newProductsData ?? []}
              paginationData={newProductsQuery?.data?.pagination}
              pagination={true}
              handlePageChange={(page) => setNewPage(page)}
            />
          </TabPanel>

          {/* Бестселлеры */}
          <TabPanel px={0} mt={{ base: '26px', md: '30px', lg: '50px' }}>
            <ProductGrid
              onProductClick={onProductClick}
              data={bestsellersData ?? []}
              paginationData={bestsellersQuery?.data?.pagination}
              pagination={true}
              handlePageChange={(page) => setBestsellersPage(page)}
            />
          </TabPanel>

          {/* Рекомендуемое */}
          <TabPanel px={0} mt={{ base: '26px', md: '30px', lg: '50px' }}>
            <ProductGrid
              onProductClick={onProductClick}
              data={productsQuery?.data?.items ?? []}
              paginationData={productsQuery?.data?.pagination}
              pagination={true}
              handlePageChange={(page) => setProductsPage(page)}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ResponsiveContainer>
  );
};
