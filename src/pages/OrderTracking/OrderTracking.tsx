import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useHeader, useToastNotification } from 'common/hooks';
import { ResponsiveContainer } from 'common/ui';
import { HeadingPage } from 'common/components';

import { useSetUdsDiscountMutation } from 'api/common/uds.api';
import { useSetOrderDeliveryMutation } from 'api/orders/orders.api';
import { IOrderUdsDiscountParams } from 'types/entities';

import Order from './Order';
import Tracking from './Tracking';

import './styles.scss';

export const OrderTracking = () => {
  const [state, setState] = useState<boolean>(false);
  const headerContext = useHeader();
  const [isHandled, setIsHandled] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const notify = useToastNotification();

  const [setUdsDiscount] = useSetUdsDiscountMutation();
  const [updateDelivery] = useSetOrderDeliveryMutation();

  useEffect(() => {
    const handlePostPaymentActions = async () => {
      if (isHandled) return;
      const orderId = searchParams.get('pg_order_id');
      const delivery = localStorage.getItem('delivery') === '1';

      if (orderId) {
        try {
          const udsData: IOrderUdsDiscountParams = JSON.parse(
            localStorage.getItem('uds') || '{}'
          );

          if (udsData?.uds_code && udsData?.points) {
            await setUdsDiscount({
              order_id: +orderId,
              uds_code: udsData.uds_code,
              points: udsData.points,
            });
          }

          await updateDelivery({ order_id: +orderId, delivery });

          notify.onCreated({
            title: `Заказ обработан. Доставка: ${
              delivery ? 'включена' : 'не включена'
            }.`,
          });

          navigate('/order-tracking', { replace: true });
          localStorage.removeItem('uds');
          localStorage.removeItem('delivery');
        } catch (error) {
          notify.onError();
        } finally {
          setIsHandled(true);
        }
      }
    };

    handlePostPaymentActions();
  }, [
    setUdsDiscount,
    updateDelivery,
    notify,
    navigate,
    searchParams,
    isHandled,
  ]);

  useEffect(() => {
    headerContext?.handleShowArrow(false);
  }, [headerContext]);

  return (
    <section className='order-tracking'>
      <ResponsiveContainer>
        <HeadingPage>
          <h2 className='text-[30px] font-bold'>Отслеживание заказа</h2>
        </HeadingPage>
        <div className='order-tracking__top'>
          <div
            className={`pill transition-colors duration-300 ${
              !state ? 'active' : ''
            }`}
            onClick={() => setState(false)}
          >
            Заказ
          </div>
          <div
            className={`pill transition-colors duration-300 ${
              state ? 'active' : ''
            }`}
            onClick={() => setState(true)}
          >
            Статус заказа
          </div>
        </div>
        {state ? <Tracking /> : <Order />}
      </ResponsiveContainer>
    </section>
  );
};
