import { useEffect, useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Stack, useDisclosure } from '@chakra-ui/react';

import { HeadingPage } from 'common/components';
import { ResponsiveContainer } from 'common/ui';
import { useHeader } from 'common/hooks';
import { OrderConfirmationModal } from './OrderConfirmationModal';
import { UdsModal } from './UdsModal';

import { IOrder, ICreateOrderParams } from 'types/entities';
import {
  useLazyCreateOrderQuery,
  useLazyDeleteOrderQuery,
} from 'api/orders/orders.api';
import { useLazyGenerateSignatureQuery } from 'api/payment/payment.api';

import {
  OrderInfoSection,
  AddressSection,
  AdditionalInfoSection,
  PrivacyPolicySection,
  SubmitButton,
} from './components';

export interface FormData extends ICreateOrderParams {
  acceptTerms: boolean;
}

export const CompletePurchase = () => {
  const viteHost = window.location.host;
  const [createOrder, orderQuery] = useLazyCreateOrderQuery();
  const [generateSignature, signatureQuery] = useLazyGenerateSignatureQuery();
  const [ deleteOrder ] = useLazyDeleteOrderQuery();

  const [order, setOrder] = useState<FormData | null>(null);
  const [udsData, setUdsData] = useState<{
    points: number;
    uds_code: string;
  } | null>(null);
  const [delivery, setDelivery] = useState(false);
  const headerContext = useHeader();

  const {
    isOpen: isOrderConfirmModalOpen,
    onOpen: openOrderConfirmModal,
    onClose: closeOrderConfirmModal,
  } = useDisclosure();
  const {
    isOpen: isUdsModalOpen,
    onOpen: openUdsModal,
    onClose: closeUdsModal,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      acceptTerms: false,
      customer_name: '',
      customer_phone: '',
      customer_email: '',
      address: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setOrder(data);
    openUdsModal();
  };

  const handleUdsConfirm = useCallback(
    (data: { points: number; uds_code: string }) => {
      setUdsData(data);
      closeUdsModal();
      openOrderConfirmModal();
    },
    [openOrderConfirmModal, closeUdsModal]
  );

  const handleUdsSkip = () => {
    closeUdsModal();
    openOrderConfirmModal();
  };

  // Final submit handler for order
  const finalSubmit = async (delivery: boolean) => {
    if (!order) return;
    const { acceptTerms, ...orderData } = order;

    if (udsData) {
      localStorage.setItem('uds', JSON.stringify(udsData));
    }

    try {
      const response = await createOrder(orderData as IOrder);
      const createdOrderId = response.data?.id;

      if (createdOrderId && udsData) {
        setDelivery(delivery);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      closeOrderConfirmModal();
    }
  };

  useEffect(() => {
    if (orderQuery.data?.id) {
      const amount = orderQuery.data.total_price - (udsData?.points ?? 0);

      generateSignature({
        pg_amount: amount,
        pg_order_id: orderQuery.data.id,
        pg_description: 'Payment for the order',
        pg_merchant_id: '552939',
        pg_salt: 'distore',
        pg_currency: 'KGS',
        pg_success_url: `http://${viteHost}/order-tracking`,
        pg_fail_url: `http://${viteHost}/`,
        pg_delivery: delivery ? '1' : '0',
      });
    }
  }, [orderQuery.data, udsData?.points, generateSignature, delivery, viteHost]);

  useEffect(() => {
    if (signatureQuery.isSuccess && orderQuery.data) {
      const paymentData = {
        pg_amount: (
          orderQuery.data.total_price - (udsData?.points ?? 0)
        ).toString(),
        pg_order_id: orderQuery.data.id.toString(),
        pg_description: 'Payment for the order',
        pg_sig: signatureQuery.data?.signature ?? '',
        pg_merchant_id: '552939',
        pg_salt: 'distore',
        pg_currency: 'KGS',
        pg_success_url: `http://${viteHost}/order-tracking`,
        pg_fail_url: `http://${viteHost}/`,
        pg_delivery: `${delivery ? '1' : '0'}`,
      };

      const paymentUrl = `https://api.freedompay.kg/payment.php?${new URLSearchParams(
        paymentData
      )}`;

      localStorage.setItem('isCustomerRedirected', JSON.stringify(orderQuery.data.id))
      window.location.href = paymentUrl;
    }
  }, [
    signatureQuery.isSuccess,
    signatureQuery.data?.signature,
    orderQuery.data,
    udsData?.points,
    delivery,
    viteHost,
  ]);

  useEffect(() => {
    if (headerContext) {
      headerContext.handleIconsHide(true);
      headerContext.setHeaderContent(
        <h2 className='text-lg font-bold'>Оформление заказа</h2>
      );
      headerContext.handleShowArrow(true);
    }
    const orderID = localStorage.getItem('isCustomerRedirected') ? JSON.parse(localStorage.getItem('isCustomerRedirected') || '') : ''

    const handleDelete = async (orderID: number) => {
      try {
        await deleteOrder({ order_id: orderID }).unwrap();
        localStorage.setItem('isCustomerRedirected', JSON.stringify(null))
      } catch (err) {
        console.error('Failed to delete order:', err);
      }
    }

    if (orderID) {
      handleDelete(orderID)
        .catch((error) => console.log('Заказ не был найден', error))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ResponsiveContainer classNames='pb-20'>
      <HeadingPage>
        <h2 className='text-[30px] font-bold'>Оформление заказа</h2>
      </HeadingPage>
      <form className='mt-7' onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={4}
          align='stretch'
        >
          <OrderInfoSection errors={errors} register={register} />

          <AddressSection errors={errors} register={register} />

          <AdditionalInfoSection register={register} />
        </Stack>
        <Stack
          mt={{ base: 0, md: 8 }}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
        >
          <PrivacyPolicySection register={register} errors={errors} />

          <SubmitButton />
        </Stack>
      </form>
      {isUdsModalOpen && (
        <UdsModal
          isOpen={true}
          onClose={closeUdsModal}
          onConfirm={handleUdsConfirm}
          onSkip={handleUdsSkip}
        />
      )}

      <OrderConfirmationModal
        discountPoints={udsData?.points}
        onConfirm={finalSubmit}
        isOpen={isOrderConfirmModalOpen}
        onClose={closeOrderConfirmModal}
      />
    </ResponsiveContainer>
  );
};
