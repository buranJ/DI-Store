import { FC, useMemo, useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import { useGetCartsQuery } from 'api/carts/carts.api';
import { defaultImage } from 'common/constants';

import './styles.scss';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
  onConfirm: (delivery: boolean) => void;
  discountPoints?: number;
}

export const OrderConfirmationModal: FC<IProps> = ({
  isOpen,
  onClose,
  onConfirm,
  discountPoints,
}) => {
  const cartQuery = useGetCartsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [isActive, setIsActive] = useState<string>('pickup');
  const handleSubmit = () => {
    onConfirm(isActive === 'deliver from');
    localStorage.setItem('delivery', isActive === 'deliver from' ? '1' : '0');
  };

  const options: { value: string; label: string; cost?: string }[] = [
    {
      value: 'deliver from',
      label: 'Доставка от',
      cost: '200',
    },
    {
      value: 'pickup',
      label: 'Самовывоз',
    },
  ];

  const handleClick = (value: string) => {
    setIsActive(value);
  };

  const totalPrice = useMemo(() => {
    if (!cartQuery.data) return 0;
    return cartQuery.data?.total_price - (discountPoints ?? 0);
  }, [cartQuery.data, discountPoints]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: 'sm', md: 'lg', lg: '3xl' }}
      >
        <ModalOverlay />
        <ModalContent className='!rounded-[15px] py-5 lg-md:py-7'>
          <ModalBody p={0}>
            <div className='flex flex-col overflow-scroll max-h-28'>
              {cartQuery.data?.products.map((product) => (
                <Flex
                  key={product.id}
                  paddingInline={{ base: 6, lg: '50px' }}
                  mb='4'
                >
                  <Image
                    src={
                      product.product_variation.product.images[0]?.url ??
                      defaultImage
                    }
                    alt='Product Image'
                    boxSize='64px'
                    borderRadius='14px'
                    w='83px'
                    h='83px'
                  />
                  <Box ml='4' w='full'>
                    <Text fontSize='18px' fontWeight='bold'>
                      {product.product_variation.product.title}
                    </Text>
                    {product.product_variation.properties[0]?.value && (
                      <Text fontSize='12px' fontWeight={400} color='#4F4F4F'>
                        {product.product_variation.properties[0]?.value}
                      </Text>
                    )}
                    <Flex mt='2'>
                      <Text fontSize='18px' fontWeight='bold'>
                        {product.product_variation.price} сом
                      </Text>
                      <Text ml='auto' fontSize='18px' fontWeight='bold'>
                        {product.product_variation.quantity} шт
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              ))}
            </div>

            <hr className='my-4' />

            <Flex
              paddingInline={{ base: 6, lg: '50px' }}
              mb='4'
              alignItems='center'
              justifyContent='space-between'
            >
              <Text fontSize='lg' fontWeight='bold'>
                Подытог
              </Text>
              <Text fontSize='lg' fontWeight='bold'>
                {cartQuery.data?.total_price} сом
              </Text>
            </Flex>

            <hr className='my-4' />

            <Flex
              paddingInline={{ base: 6, lg: '50px' }}
              mb='4'
              justifyContent='space-between'
            >
              <Text fontSize='lg' fontWeight='bold'>
                Доставка
              </Text>
              <CheckboxGroup value={[isActive]}>
                <Flex flexDirection='column' align='end' mt='2'>
                  {options.map((option) => (
                    <Checkbox
                      key={option.value}
                      isChecked={isActive === option.value}
                      _checked={{
                        borderColor: 'mainColor',
                        _focus: { boxShadow: 'none' },
                      }}
                      onChange={() => handleClick(option.value)}
                    >
                      {option.label}{' '}
                      {option.cost && (
                        <span className='text-lg font-bold'>
                          {option.cost} сом
                        </span>
                      )}
                    </Checkbox>
                  ))}
                </Flex>
              </CheckboxGroup>
            </Flex>

            <hr className='my-4' />

            {discountPoints && (
              <Flex
                paddingInline={{ base: 6, lg: '50px' }}
                mb='6'
                alignItems='center'
                justifyContent='space-between'
              >
                <Text fontSize='22px' fontWeight='bold'>
                  Скидка
                </Text>
                <Text fontSize='22px' fontWeight='bold' color='mainColor'>
                  {discountPoints} сом
                </Text>
              </Flex>
            )}

            <Flex
              paddingInline={{ base: 6, lg: '50px' }}
              mb='6'
              alignItems='center'
              justifyContent='space-between'
            >
              <Text fontSize='22px' fontWeight='bold'>
                Итого
              </Text>
              <Text fontSize='22px' fontWeight='bold' color='mainColor'>
                {totalPrice} сом
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter px={0} pos='absolute' bottom='-80px' w={'full'}>
            <Button
              width='full'
              colorScheme='green'
              bg='mainColor'
              borderColor='mainColor'
              borderWidth='2px'
              _hover={{ bg: 'mainColor' }}
              type='submit'
              onClick={handleSubmit}
              size='lg'
            >
              Подтвердить заказ
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
