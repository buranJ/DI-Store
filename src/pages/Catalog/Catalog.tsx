import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDisclosure, Flex, Icon, Show } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';

import { useLazyGetProductsQuery } from 'api/common/products.api';

import { cleanFilters, destructProperties } from 'common/helpers';
import { useDebounce, useHeader } from 'common/hooks';

import { Loader, ProductGrid } from 'common/components';
import { ResponsiveContainer } from 'common/ui';
import { SortMenu } from './HelperComponents/SortMenu';
import { Filters } from './HelperComponents/Filters';
import { ProductFilters } from './ProductFilters/ProductFilters';

import { uniqueAttributes, PropertiesMap } from './Catalog.helpers';
import { IGetProductParams, IProduct } from 'types/entities';

import Logo from 'assets/icons/logo.svg?react';

const FilterDrawer = lazy(() => import('./FilterDrawer'));

export const Catalog = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [getProducts, productsQuery] = useLazyGetProductsQuery();

  const [properties, setProperties] = useState<PropertiesMap>({});
  const [pagination, setPagination] = useState({ page: 1, page_size: 20 });
  const [filters, setFilters] = useState({});

  const headerContext = useHeader();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const methods = useForm<IGetProductParams>({
    defaultValues: {
      ...state,
      properties: [],
      order_by: '',
      categoryName: state?.categoryName || '',
      brandName: state?.brandName || '',
    },
  });

  const {
    control,
    setValue,
    formState: { errors },
    register,
    watch,
  } = methods;

  const debouncedGetProducts = useDebounce((newFilters, newPagination) => {
    const cleanedFilters = cleanFilters(newFilters);
    getProducts({ ...cleanedFilters, ...newPagination, ...state });
  }, 1000);

  const memoizedSortMenu = useMemo(
    () => (
      <SortMenu
        onOpenFilter={onOpen}
        control={control}
        setValue={setValue}
        onClose={onClose}
      />
    ),
    [onOpen, control, setValue, onClose]
  );

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: IProduct) => {
    navigate(`/product/${product.id}`);
  };

  // Заполняем список свойств для фильтрации
  const memoizedProperties = useMemo(() => {
    if (Object.values(filters).length || state) {
      const variations = productsQuery.data?.items.map((item) =>
        destructProperties(item.variations)
      );
      return uniqueAttributes(variations) || {};
    }
    return {};
  }, [filters, productsQuery.data, state]);

  useEffect(() => {
    setProperties(memoizedProperties);
  }, [memoizedProperties]);

  useEffect(() => {
    const subscription = watch((values) => {
      const filterParams = Object.entries(values || {}).reduce(
        (acc, [key, value]) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (value !== undefined) acc[key] = value.toString();
          return acc;
        },
        {}
      );

      setFilters(cleanFilters(filterParams));
      setPagination({ page: 1, page_size: 20 });
    });

    return () => subscription.unsubscribe();
  }, [watch, pagination]);

  useEffect(() => {
    if (headerContext) {
      headerContext.handleShowArrow(true);
      headerContext.handleIconsHide(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    debouncedGetProducts({ ...filters, ...pagination });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pagination]);

  return (
    <div className='pb-7 lg-md:pb-36'>
      <ResponsiveContainer>
        {/* Логотип */}
        <Show above='lg'>
          <Flex justify='center' mt={30}>
            <Icon as={Logo} w='564px' h='30px' />
          </Flex>
        </Show>
        {/* memoized меню сортировки */}
        <FormProvider {...methods}>
          {memoizedSortMenu}
          {/* Фильтры */}
          <Show above='lg'>
            <Filters control={control} register={register} errors={errors} />
            <hr />
            <Flex gap='50px' my={34} wrap='wrap'>
              {/* Динамическая выборка */}
              <ProductFilters properties={properties} register={register} />
            </Flex>
          </Show>
        </FormProvider>
        {productsQuery.isFetching ? (
          <Loader />
        ) : (
          <ProductGrid
            data={productsQuery?.data?.items}
            paginationData={productsQuery.data?.pagination}
            pagination={true}
            onProductClick={handleProductClick}
            handlePageChange={handlePageChange}
          />
        )}
      </ResponsiveContainer>
      <Show below='lg'>
        <Suspense fallback={<Loader />}>
          <FilterDrawer
            isOpen={isOpen}
            onClose={onClose}
            handleFormSubmit={(data) => setFilters(cleanFilters(data))}
            properties={properties}
          />
        </Suspense>
      </Show>
    </div>
  );
};
