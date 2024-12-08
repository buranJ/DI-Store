import React, { useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Image,
  Show,
  Tag,
  Text,
  ButtonProps,
} from '@chakra-ui/react';

import { useGetProductQuery } from 'api/common/products.api';
import { useLazyAddToCartQuery } from 'api/carts/carts.api';

import { destructProperties } from 'common/helpers';
import { useHeader, useToastNotification } from 'common/hooks';
import { Loader, HeadingPage } from 'common/components';
import { ResponsiveContainer } from 'common/ui';

import Logo from 'assets/icons/logo.svg';

import Slider from './Slider/Slider';

import './styles.scss';

interface IStyledTagProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const StyledTag = ({ selected, children, onClick }: IStyledTagProps) => (
  <Tag
    fontSize='15px'
    fontWeight={500}
    borderRadius='10px'
    border='1px solid'
    borderColor='mainColor'
    cursor='pointer'
    whiteSpace='nowrap'
    bg={selected ? 'mainColor' : 'white'}
    color={selected ? 'white' : 'mainColor'}
    onClick={onClick}
    className='transition-colors'
  >
    {children}
  </Tag>
);

interface IPrimaryButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const PrimaryButton = ({ children, ...props }: IPrimaryButtonProps) => (
  <Button
    bg='mainColor'
    color='white'
    rounded='50px'
    fontSize='22px'
    _hover={{ bg: 'mainColor', color: 'white' }}
    {...props}
  >
    {children}
  </Button>
);

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [addCart, { isError, isSuccess }] = useLazyAddToCartQuery();
  const productQuery = useGetProductQuery({ id: id ?? '' });
  const headerContext = useHeader();
  const notify = useToastNotification();

  const properties = useMemo(() => {
    if (!productQuery.data?.variations) return {};
    const destructedProperties = destructProperties(
      productQuery.data.variations
    );

    const result: { [key: string]: { value: string }[] } = {};
    for (const [key, value] of Object.entries(destructedProperties)) {
      const valuesSet = new Set(value.map((item) => item.value));
      result[key] = [...valuesSet].map((value) => ({ value }));
    }

    return result;
  }, [productQuery.data?.variations]);

  const { register, handleSubmit, setValue, watch } = useForm();

  const selectedValues = watch();

  const selectedVariation = useMemo(() => {
    if (!productQuery.data?.variations) return null;
    return productQuery.data.variations.find((variation) =>
      variation.properties.every((property) => {
        return selectedValues[property.name.trim()] === property.value;
      })
    );
  }, [selectedValues, productQuery.data?.variations]);

  useEffect(() => {
    if (productQuery.data?.variations) {
      Object.keys(properties).forEach((key) => {
        const firstItem = properties[key][0];
        if (firstItem) {
          setValue(key, firstItem.value);
        }
      });
    }
  }, [productQuery.data, properties, setValue]);

  const handleSelect = useCallback(
    ({ key, itemName }: { key: string; itemName: string }) => {
      setValue(key, itemName);
    },
    [setValue]
  );

  const onSubmit = () => {
    if (selectedVariation) {
      addCart({ variation_id: selectedVariation.id, quantity: 1 });
    }
  };

  useEffect(() => {
    headerContext?.handleShowArrow(true);
    headerContext?.handleSearchHide(false);
  }, [headerContext]);

  useEffect(() => {
    if (isSuccess) {
      notify.onCreated({ title: 'Товар добавлен в корзину.' });
    }
    if (isError) {
      notify.onError({
        title: 'Произошла ошибка при добавлении товара в корзину.',
      });
    }
  }, [isError, isSuccess, notify]);

  if (productQuery.isLoading) return <Loader />;

  return (
    <section className='product-details'>
      <ResponsiveContainer>
        <Text
          fontWeight={700}
          fontSize={{ base: '22px', lg: '30px' }}
          display={{ base: 'block', lg: 'none' }}
          textAlign='center'
          mb={21}
        >
          {productQuery.data?.title}
        </Text>
      </ResponsiveContainer>
      <ResponsiveContainer classNames='min-h-screen lg-md:pb-64'>
        <HeadingPage>
          <Image src={Logo} />
        </HeadingPage>
        <div className='lg-md:flex gap-[72px] mt-16'>
          <Box className='max-w-[384px] max-h-[570px]'>
            <Slider
              images={productQuery.data?.images}
              alt={productQuery.data?.title}
              productId={productQuery.data?.id}
            />
          </Box>
          <div className='flex flex-col flex-1'>
            <Text
              fontWeight={700}
              fontSize={{ base: '22px', lg: '28px' }}
              display={{ base: 'none', lg: 'block' }}
            >
              {productQuery.data?.title}
            </Text>
            <form onSubmit={handleSubmit(onSubmit)} className='h-full'>
              <div className='flex flex-col gap-5 mt-8 h-full'>
                {properties &&
                  Object.keys(properties).map((key) => (
                    <div key={key} className='flex text-xl font-medium'>
                      {key}:
                      <HStack
                        {...register(key)}
                        spacing={2.5}
                        ml={2}
                        wrap={'wrap'}
                      >
                        {properties[key].map((item) => (
                          <React.Fragment key={item.value}>
                            <StyledTag
                              selected={selectedValues[key] === item.value}
                              key={item.value}
                              onClick={() =>
                                handleSelect({ key, itemName: item.value })
                              }
                            >
                              {item.value}
                            </StyledTag>
                          </React.Fragment>
                        ))}
                      </HStack>
                      <input
                        type='hidden'
                        {...register(key)}
                        value={selectedValues[key] || ''}
                      />
                    </div>
                  ))}
                <Accordion defaultIndex={[0]} allowMultiple>
                  <AccordionItem border='none'>
                    <h2>
                      <AccordionButton px={0} _hover={{ base: 'none', lg: '' }}>
                        <Box
                          as='span'
                          flex='1'
                          textAlign='left'
                          fontWeight={500}
                          fontSize='20px'
                        >
                          Описание
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} px={0}>
                      {productQuery.data?.description}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                <div className='hidden lg:block mt-auto'>
                  <div className='flex justify-between'>
                    {selectedVariation?.price ? (
                      <Text className='text-[30px] font-bold'>
                        {selectedVariation?.price} сом
                      </Text>
                    ) : (
                      <></>
                    )}
                    <PrimaryButton type='submit'>В корзину</PrimaryButton>
                  </div>
                  <PrimaryButton
                    color='mainColor'
                    border='1px solid'
                    borderColor='mainColor'
                    bg='white'
                    fontWeight={700}
                    w='full'
                    mt={5}
                    size={'lg'}
                  >
                    <a href='https://wa.link/poxfrd' target='_blank'>
                      Оформить через Whatsapp
                    </a>
                  </PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </ResponsiveContainer>
      <Show below='lg'>
        <Box
          as='nav'
          position='fixed'
          bottom='0'
          width='100%'
          bg='white'
          display='flex'
          flexDirection='column'
          padding='1rem'
          boxShadow='0px -2px 15px 0px #0000001A'
          className='bg-white flex justify-around p-4 shadow-md'
          zIndex={999}
        >
          <div className='flex justify-between'>
            <span className='text-[22px] font-bold'>
              {selectedVariation?.price} сом
            </span>
            <PrimaryButton onClick={onSubmit}>В корзину</PrimaryButton>
          </div>
          <PrimaryButton
            color='mainColor'
            border='1px solid'
            borderColor='mainColor'
            fontWeight={700}
            mt={5}
            bg='white'
            py='14px'
          >
            <a href='https://wa.link/poxfrd' target='_blank'>
              Оформить через Whatsapp
            </a>
          </PrimaryButton>
        </Box>
      </Show>
    </section>
  );
};
