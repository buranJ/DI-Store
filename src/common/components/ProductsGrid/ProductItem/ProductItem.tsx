import { FC, memo, useCallback } from 'react';
import { Box, Badge, Image, Text, IconButton } from '@chakra-ui/react';

import { useToastNotification } from 'common/hooks';
import { useLazyAddToCartQuery } from 'api/carts/carts.api';
import { defaultImage } from 'common/constants';

import { IProduct } from 'types/entities';

import Cart from 'assets/icons/cart.svg?react';

import './styles.scss';

interface IProps {
  product: IProduct;
  imageSrc?: string;
  onProductClick: (product: IProduct) => void;
  height?: {
    base?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  };
}

export const ProductItem: FC<IProps> = memo(
  ({ product, imageSrc, onProductClick, height }) => {
    const [addCart, { isLoading, isSuccess }] = useLazyAddToCartQuery();
    const notify = useToastNotification();
    const onCartClick = async () => {
      try {
        await addCart({
          variation_id: product.variations[0].id,
          quantity: 1,
        });
        if (isSuccess) {
          notify.onCreated({ title: 'Товар добавлен в корзину.' });
        }
      } catch (error) {
        notify.onError();
      }
    };

    const handleProductClick = useCallback(() => {
      onProductClick(product);
    }, [onProductClick, product]);

    return (
      <Box
        key={product.id}
        borderRadius={{ base: '28px', lg: '40px', xl: '45px' }}
        shadow='md'
        position='relative'
        className='product-item'
        h={height}
      >
        <Image
          src={imageSrc ?? defaultImage}
          alt='image'
          objectFit='cover'
          borderRadius={{ base: '28px', lg: '40px', xl: '45px' }}
          overflow='hidden'
          w='100%'
          h='100%'
        />
        <Box
          onClick={() => handleProductClick()}
          pos='absolute'
          bottom='-10px'
          textAlign='center'
          w='100%'
        >
          <Text
            fontWeight='bold'
            fontSize={{ base: '12px', lg: '18px', xl: '14px' }}
            color='white'
            mb={2}
            cursor='pointer'
          >
            {product.title}
          </Text>
          <Badge
            bg='mainColor'
            borderRadius='50px'
            px='10px'
            py={{ base: '4px', lg: '6px' }}
            fontSize={{ base: '15px', lg: '18px', xl: '22px' }}
            color='white'
            cursor='pointer'
            fontWeight={600}
          >
            {product.variations[0].price} сом
          </Badge>
        </Box>
        <IconButton
          isLoading={isLoading}
          onClick={onCartClick}
          icon={<Cart />}
          aria-label='Add to cart'
          position='absolute'
          top='0'
          left='0'
          bg='white'
          borderRadius='full'
          boxShadow='md'
          w={{ base: '52px' }}
          h={{ base: '52px' }}
          p={{ base: '4px', lg: '6px', xl: '8px' }}
          minW='auto'
        />
      </Box>
    );
  }
);
