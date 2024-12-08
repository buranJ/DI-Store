import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { IPagination, IProduct } from 'types/entities';

import { ProductItem } from './ProductItem';
import { Pagination } from '../Pagination';

import ContentLoader from 'react-content-loader';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

interface IProps {
  data?: IProduct[];
  paginationData?: IPagination;
  pagination: boolean;
  onProductClick: (product: IProduct) => void;
  handlePageChange: (page: number) => void;
}

export const ProductGrid: FC<IProps> = ({
  data,
  pagination,
  paginationData,
  onProductClick,
  handlePageChange,
}) => {
  const totalPages = paginationData?.total_pages;

  const breakpointColumnsObj = {
    992: 4,
    600: 3,
    430: 2,
  };

  const skeletonCount = 8;

  if (!data) {
    return (
      <ResponsiveMasonry columnsCountBreakPoints={breakpointColumnsObj}>
        <Masonry gutter='18px'>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <ContentLoader
              key={index}
              speed={2}
              width={262}
              height={404}
              viewBox='0 0 262 404'
              backgroundColor='#f3f3f3'
              foregroundColor='#ecebeb'
            >
              <rect x='0' y='0' rx='34' ry='34' width='261' height='403' />
            </ContentLoader>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    );
  }

  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={breakpointColumnsObj}>
        <Masonry gutter='18px'>
          {data?.map((product: IProduct, i: number) => {
            const height =
              i % 2
                ? { base: '271px', xl: '422px', lg: '422px' }
                : { base: '227px', xl: '356px', lg: '356px' };
            return (
              <ProductItem
                onProductClick={onProductClick}
                key={product.id}
                product={product}
                height={height}
                imageSrc={product?.images[0]?.url}
              />
            );
          })}
        </Masonry>
      </ResponsiveMasonry>

      {pagination && (
        <Box mt={4} display='flex' justifyContent='center'>
          <Pagination
            hasNext={paginationData?.has_next ?? false}
            currentPage={paginationData?.current_page ?? 1}
            totalPages={totalPages ?? 1}
            onPageChange={handlePageChange}
          />
        </Box>
      )}
    </>
  );
};
