import React, { FC, useMemo, useCallback, memo } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  FormControl,
  NumberInput,
  NumberInputField,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  DrawerFooter,
  Button,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useGetCategoriesQuery } from 'api/common/categories.api';
import { useGetBrandsQuery } from 'api/common/brands.api';
import { IGetProductParams } from 'types/entities';
import { categoryMapper, PropertiesMap } from '../Catalog.helpers';
import { MemoizedCheckbox } from './MemoCheckbox.tsx';
import { FixedSizeList as List } from 'react-window';
import { useLocation } from 'react-router-dom';
import { RenderDynamicCheckbox } from './FilterDrawer.helpers.tsx';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  handleFormSubmit: (data: IGetProductParams) => void;
  properties: PropertiesMap;
}

const FilterDrawer: FC<IProps> = ({
  isOpen,
  onClose,
  handleFormSubmit,
  properties,
}) => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: brandsData } = useGetBrandsQuery();
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<IGetProductParams>({
    defaultValues: {
      categoryName: state?.categoryName || [],
      brandName: state?.brandName || [],
      properties: '',
      priceMin: 0,
      priceMax: 0,
    },
  });

  const selectedProperties = watch('properties') || '';

  // Мемоизируем данные категорий
  const categories = useMemo(
    () => categoriesData?.flatMap(categoryMapper),
    [categoriesData]
  );

  const BrandItem = ({
    index,
    style,
  }: {
    index: number;
    style?: React.CSSProperties;
  }) => {
    const brand = brandsData?.[index];
    return brand ? (
      <div style={style}>
        <MemoizedCheckbox
          key={brand.id}
          value={brand.name}
          name='brandName'
          register={register}
        />
      </div>
    ) : null;
  };

  const CategoryItem = ({
    index,
    style,
  }: {
    index: number;
    style?: React.CSSProperties;
  }) => {
    const category = categories && categories[index];
    return category ? (
      <div style={style}>
        <MemoizedCheckbox
          key={category.id}
          value={category.name}
          name='categoryName'
          register={register}
        />
      </div>
    ) : null;
  };

  // Мемоизация функций onSubmit и onReset
  const onSubmit = useCallback(
    (data: IGetProductParams) => {
      onClose();
      handleFormSubmit(data);
    },
    [onClose, handleFormSubmit]
  );

  const onReset = useCallback(() => {
    reset();
    onClose();
    handleFormSubmit({});
  }, [reset, onClose, handleFormSubmit]);

  return (
    <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Фильтр товаров</DrawerHeader>

        <DrawerBody p={0}>
          <Accordion allowMultiple>
            {/* Цена */}
            <AccordionItem border='none'>
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    bg='#CCD47C66'
                    fontSize={20}
                    fontWeight={500}
                    justifyContent='space-between'
                    px={4}
                    _hover={{ bg: '#CCD47C66' }}
                    _expanded={{ bg: '#CCD47C66' }}
                  >
                    Цена
                    {isExpanded ? (
                      <Text fontSize={20}>-</Text>
                    ) : (
                      <Text fontSize={20}>+</Text>
                    )}
                  </AccordionButton>
                  <AccordionPanel>
                    <Flex gap={4}>
                      <FormControl isInvalid={!!errors.priceMin}>
                        <Controller
                          name='priceMin'
                          control={control}
                          render={({ field }) => (
                            <NumberInput
                              defaultValue={0}
                              min={0}
                              clampValueOnBlur={false}
                              {...field}
                              display='flex'
                              alignItems='center'
                              gap={4}
                            >
                              От <NumberInputField placeholder='От' />
                            </NumberInput>
                          )}
                        />
                      </FormControl>
                      <FormControl isInvalid={!!errors.priceMax}>
                        <Controller
                          name='priceMax'
                          control={control}
                          render={({ field }) => (
                            <NumberInput
                              defaultValue={0}
                              min={0}
                              clampValueOnBlur={false}
                              {...field}
                              display='flex'
                              alignItems='center'
                              gap={4}
                            >
                              До <NumberInputField placeholder='До' />
                            </NumberInput>
                          )}
                        />
                      </FormControl>
                    </Flex>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            {/* Категория */}
            <AccordionItem border='none'>
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    bg='#CCD47C66'
                    fontSize={20}
                    fontWeight={500}
                    justifyContent='space-between'
                    px={4}
                    _hover={{ bg: '#CCD47C66' }}
                    _expanded={{ bg: '#CCD47C66' }}
                  >
                    Категория
                    {isExpanded ? (
                      <Text fontSize={20}>-</Text>
                    ) : (
                      <Text fontSize={20}>+</Text>
                    )}
                  </AccordionButton>
                  <AccordionPanel maxH={420} overflow='scroll'>
                    <List
                      height={320}
                      itemCount={categories?.length || 0}
                      itemSize={40}
                      width='100%'
                    >
                      {CategoryItem}
                    </List>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            {/* Бренд */}
            <AccordionItem border='none'>
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    bg='#CCD47C66'
                    fontSize={20}
                    fontWeight={500}
                    justifyContent='space-between'
                    px={4}
                    _hover={{ bg: '#CCD47C66' }}
                    _expanded={{ bg: '#CCD47C66' }}
                  >
                    Бренд
                    {isExpanded ? (
                      <Text fontSize={20}>-</Text>
                    ) : (
                      <Text fontSize={20}>+</Text>
                    )}
                  </AccordionButton>
                  <AccordionPanel maxH={420} overflow='scroll'>
                    <List
                      height={420}
                      itemCount={brandsData?.length || 0}
                      itemSize={40}
                      width='100%'
                    >
                      {BrandItem}
                    </List>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            {properties &&
              Object.keys(properties).map((item) => (
                <AccordionItem key={item} border='none'>
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        bg='#CCD47C66'
                        fontSize={20}
                        fontWeight={500}
                        justifyContent='space-between'
                        px={4}
                        _hover={{ bg: '#CCD47C66' }}
                        _expanded={{ bg: '#CCD47C66' }}
                      >
                        {item}
                        {isExpanded ? (
                          <span className='text-[20px]'>-</span>
                        ) : (
                          <span className='text-[20px]'>+</span>
                        )}
                      </AccordionButton>
                      <AccordionPanel maxH={420} overflow='scroll'>
                        <List
                          height={420}
                          itemCount={properties[item].length || 0}
                          itemSize={40}
                          width='100%'
                        >
                          {({ index, style }) => (
                            <RenderDynamicCheckbox
                              index={index}
                              style={style}
                              data={properties[item]}
                              selectedProperties={selectedProperties}
                              register={register}
                            />
                          )}
                        </List>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}
          </Accordion>
        </DrawerBody>

        <DrawerFooter px={4}>
          <Flex gap={4} w='100%'>
            <Button w='50%' onClick={onReset}>
              Сбросить
            </Button>
            <Button w='50%' onClick={handleSubmit(onSubmit)}>
              Применить
            </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const MemoizedFilterDrawer = memo(FilterDrawer);
export { MemoizedFilterDrawer as FilterDrawer };
