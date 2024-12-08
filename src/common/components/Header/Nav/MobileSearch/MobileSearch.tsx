import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, InputGroup, Input, InputRightElement, Image, Text } from '@chakra-ui/react';

import { useLazyGetProductsQuery } from 'api/common/products.api';
import { useDebounce } from 'common/hooks';

import { IProduct } from 'types/entities';

import Search from 'assets/icons/search.svg';
import ArrowBack from 'common/assets/icons/arrowBack-green.svg';

import './styles.scss';

interface IProps {
  setShowMobileSearch: (value: boolean) => void;
}

export const MobileSearch = ({ setShowMobileSearch }: IProps) => {
  const navigate = useNavigate();
  const [getProducts, { data: products }] = useLazyGetProductsQuery();
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = useDebounce((value: string) => {
    if (value) getProducts({ search: value });
  }, 500);

  return (
    <Box ref={searchRef} className='mobile-search-container'>
      <Box className='flex gap-2'>
        <Image
          src={ArrowBack}
          alt='Back'
          className='mobile-search-back'
          onClick={() => setShowMobileSearch(false)}
        />
        <InputGroup alignItems='center' className='mobile-search-input-group'>
          <Input
            placeholder='ISNTREE hyaluronic acid...'
            className='mobile-search-input'
            onChange={(e) => handleSearch(e.target.value)}
            variant='unstyled'
          />
          <InputRightElement className='mobile-search-icon'>
            <Image src={Search} alt='Search' />
          </InputRightElement>
        </InputGroup>
      </Box>

      {products && (
        <Box className='mobile-search-dropdown'>
          {products.items?.map((product: IProduct) => (
            <Box
              key={product.id}
              className='mobile-search-item'
              onClick={() => {
                navigate(`/product/${product.id}`);
              }}
            >
              <Text variant='body' className='mobile-search-item-text'>
                {product.title}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
