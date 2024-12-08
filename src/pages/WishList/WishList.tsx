import { useEffect } from 'react';

import { ResponsiveContainer } from 'common/ui';
import { HeadingPage } from 'common/components';
import { useToastNotification } from 'common/hooks';

import {
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from 'api/common/products.api';
import { useLazyAddToCartQuery } from 'api/carts/carts.api';

import HeartIcon from 'assets/icons/heart-red.svg?react';

import './styles.scss';

export const WishList = () => {
  const notify = useToastNotification();

  const { data, refetch } = useGetFavoritesQuery(
    { page: 1, page_size: 999 },
    { refetchOnMountOrArgChange: true }
  );
  const [addCart, { isLoading, isSuccess }] = useLazyAddToCartQuery();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const defaultImage = `https://via.placeholder.com/80x83?text=${encodeURIComponent(
    'Пока у этого товара нет изображения'
  )}`;

  useEffect(() => {
    if (isSuccess) {
      notify.onCreated({
        title: 'Товар добавлен в корзину.',
      });
    }
  }, [isSuccess, notify]);

  const handleRemoveFavorite = async (productId: string) => {
    await removeFavorite({ product_id: productId });
    refetch(); // Refetch the favorites after successful removal
  };

  return (
    <section className='wish-list'>
      <ResponsiveContainer>
        <HeadingPage>
          <h2 className='text-[30px] font-bold'>Список Желаний</h2>
        </HeadingPage>
        <div className='wish-list__content'>
          {data?.items.map((product) => (
            <div key={product.id} className='wish-list__item'>
              <div className='info'>
                <div className='item-img'>
                  <img src={product.images[0]?.url ?? defaultImage} alt='' />
                </div>
                <div className='details'>
                  <h2 className='title'>{product.title}</h2>
                  <div className='volume'>
                    {product.variations[0]?.properties[0]?.value}
                  </div>
                  <div className='price'>
                    {product.variations[0]?.price} сом
                  </div>
                </div>
                <HeartIcon
                  width='40px'
                  height='36px'
                  onClick={() => handleRemoveFavorite(product.id)}
                  className='cursor-pointer'
                />
              </div>
              <button
                onClick={() =>
                  addCart({
                    variation_id: product.variations[0]?.id,
                    quantity: 1,
                  })
                }
                disabled={isLoading}
              >
                В корзину
              </button>
            </div>
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
};
