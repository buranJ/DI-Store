import { useGetOrderProductsQuery } from 'api/orders/orders.api';
import { Loader } from 'common/components';

export const Order = () => {
  const ordersQuery = useGetOrderProductsQuery();

  if (ordersQuery.isLoading) return <Loader />;

  return (
    <div className='order-tracking__content'>
      {ordersQuery.data && ordersQuery.data.length > 0 ? (
        ordersQuery.data.map((product) => (
          <div>
            <div
              className='item desktop'
              key={`${product?.product_variation.product.id}-${product?.product_variation.id}`}
            >
              <div className='flex items-center gap-[34px]'>
                <img
                  src={product?.product_variation.product.images[0]?.url}
                  alt=''
                />
                <h2 className='max-w-[405px] line-clamp-1'>
                  {product?.product_variation.product.title}
                </h2>
              </div>
              <div className='grid grid-cols-3'>
                <span className='volume'>
                  {product?.product_variation.properties[0]?.value || 'N/A'}
                </span>
                <span className='quantity'>{product?.quantity} шт</span>
                <div className='price'>
                  {product?.product_variation.price * product?.quantity} сом
                </div>
              </div>
            </div>
            <div className='item mobile'>
              <img
                src={product?.product_variation.product.images[0]?.url}
                alt=''
              />
              <div>
                <div>
                  <h2 className='max-w-[405px] line-clamp-2'>
                    {product?.product_variation.product.title}
                  </h2>
                  <span className='volume'>
                    {product?.product_variation.properties[0]?.value || 'N/A'}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='quantity'>{product?.quantity} шт</span>
                  <div className='price'>
                    {product?.product_variation.price * product?.quantity} сом
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='py-10 text-center text-mainColor text-lg font-bold'>
          На данный момент у вас нет заказов.
        </div>
      )}
    </div>
  );
};
