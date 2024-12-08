import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ResponsiveContainer } from 'common/ui';
import { HeadingPage, Loader } from 'common/components';
import { useHeader } from 'common/hooks';

import {
  useGetCartsQuery,
  useLazyRemoveFromCartQuery,
  useLazyUpdateCartQuery,
} from 'api/carts/carts.api';
import { ICartProduct, ICart } from 'types/entities';

import trash from 'assets/icons/Basket/trash.svg';
import minus from 'assets/icons/Basket/minus.svg';
import plus from 'assets/icons/Basket/plus.svg';

import './index.scss';

export const Basket = () => {
  const getCartsQuery = useGetCartsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [deleteFromCart] = useLazyRemoveFromCartQuery();
  const [updateCart] = useLazyUpdateCartQuery();
  const [items, setItems] = useState<ICart>();
  const headerContext = useHeader();

  useEffect(() => {
    if (headerContext) {
      headerContext.setHeaderContent(
        <h2 className='text-lg font-bold'>Корзина</h2>
      );
      headerContext.handleIconsHide(true);
      headerContext.handleShowArrow(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getCartsQuery.currentData) {
      setItems(getCartsQuery.currentData);
    }
  }, [getCartsQuery.currentData]);

  const updateQuantity = async (product: ICartProduct, delta: number) => {
    const newQuantity = product.quantity + delta;
    if (newQuantity < 1) return;

    const { data } = await updateCart({
      variation_id: product.product_variation.id,
      quantity: newQuantity,
    });

    setItems(data);
  };

  const decreaseQnty = (product: ICartProduct) => updateQuantity(product, -1);
  const increaseQnty = (product: ICartProduct) => updateQuantity(product, +1);

  const removeFromCart = async (id: number) => {
    const { data } = await deleteFromCart({
      product_variation_id: id,
    });

    setItems(data);
  };
  if (getCartsQuery.isLoading) return <Loader />;

  return (
    <>
      <section className='basket min-h-80'>
        <ResponsiveContainer>
          <HeadingPage>
            <h2 className='text-[30px] font-bold'>Корзина</h2>
          </HeadingPage>
          <div className='basket__content'>
            {items?.products.map((item: ICartProduct, i) => (
              <div className='basket__item' key={i}>
                <div className='basket__item-img'>
                  <img
                    src={
                      item.product_variation.product.images[0]?.url ??
                      'https://via.placeholder.com/300x200?text=Пока+у+этого+товара+нет+картинки'
                    }
                    alt={item.product_variation.product.title}
                  />
                </div>
                <div className='basket__info'>
                  <div className='basket__info-top'>
                    <div>
                      <h2>{item.product_variation.product.title}</h2>
                      <p>{item.product_variation.properties[0]?.value}</p>
                    </div>
                    <img
                      src={trash}
                      alt='Корзина'
                      onClick={() => removeFromCart(item.product_variation.id)}
                    />
                  </div>
                  <div className='basket__info-bottom'>
                    <span className='price'>
                      {item.product_variation.price * item.quantity} сом
                    </span>
                    <div className='basket__info-qnty'>
                      <img
                        src={minus}
                        alt=''
                        onClick={() => decreaseQnty(item)}
                      />
                      <span className='qnty'>{item.quantity}</span>
                      <img
                        src={plus}
                        alt=''
                        onClick={() => increaseQnty(item)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ResponsiveContainer>
      </section>

      <div className='basket__bottom'>
        <ResponsiveContainer classNames='!p-0'>
          <div className='basket__bottom-content'>
            <div className='total-sum'>
              Общая сумма:
              <b>
                {items?.products.reduce(
                  (a, b) => a + b.product_variation.price * b.quantity,
                  0
                )}
                сом
              </b>
            </div>
            <Link to='/complete-purchase'>К оплате</Link>
          </div>
        </ResponsiveContainer>
      </div>
    </>
  );
};
