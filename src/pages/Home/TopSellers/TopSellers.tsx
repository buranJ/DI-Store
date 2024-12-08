import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { ResponsiveContainer } from 'common/ui';
import { ProductGrid, Loader } from 'common/components';

import { useGetProductsQuery } from 'api/common/products.api';
import { IProduct } from 'types/entities';

export const TopSellers = () => {
  const navigate = useNavigate();
  const productsQuery = useGetProductsQuery({ page: 1, page_size: 20 });

  const onProductClick = (product: IProduct) => {
    navigate(`/product/${product.id}`);
  };

  if (productsQuery.isLoading) return <Loader />;

  const renderData = productsQuery.data?.items
    .filter((item) => item.images[0]?.url)
    .slice(0, 4);

  return (
    <section className='top-sellers mt-40'>
      <ResponsiveContainer>
        <h2 className='text-[22px] text-center font-bold text-black md:text-2xl lg-md:text-3xl'>
          Лидеры продаж за месяц
        </h2>
        <Box mt={{ base: '26px', lg: '40px' }}>
          <ProductGrid
            data={renderData}
            pagination={false}
            onProductClick={onProductClick}
            handlePageChange={console.log}
          />
        </Box>
      </ResponsiveContainer>
    </section>
  );
};
