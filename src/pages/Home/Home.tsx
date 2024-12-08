import { useEffect, useState, useRef, ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useLazyDeleteOrderQuery } from 'api/orders/orders.api';

import { Loader, OnlinePay, Consultation, FollowInst } from 'common/components';

import { useHeader, useToastNotification } from 'common/hooks';

import Hero from './Hero';
import AboutBlock from './AboutBlock';
import TopSellers from './TopSellers';
import ActionProducts from './ActionProducts';
import PopularProductsSlider from './PopularProductsSlider';
import MasksForFace from './MasksForFace';

const LazyRender = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className='text-center'>
      {isVisible ? children : <Loader />}
    </div>
  );
};

export const Home = () => {
  const [deleteOrder] = useLazyDeleteOrderQuery();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const notify = useToastNotification();
  const headerContext = useHeader();

  useEffect(() => {
    headerContext?.handleIconsHide(false);
    headerContext?.handleSearchHide(true);
    headerContext?.handleShowArrow(false);
    headerContext?.setHeaderContent(null);
  }, []);

  useEffect(() => {
    const orderId = searchParams.get('pg_order_id');
    if (orderId) {
      try {
        deleteOrder({ order_id: +orderId });
        notify.onError({
          variant: 'subtle',
          position: 'top',
        });
      } catch (error) {
        notify.onError({
          variant: 'subtle',
          position: 'top',
        });
      }
      navigate('/', { replace: true });
    }
  }, [deleteOrder, navigate, searchParams, notify]);

  return (
    <>
      <Hero />
      <LazyRender>
        <PopularProductsSlider />
      </LazyRender>
      <LazyRender>
        <MasksForFace />
      </LazyRender>
      <LazyRender>
        <ActionProducts />
      </LazyRender>
      <LazyRender>
        <AboutBlock />
      </LazyRender>
      <LazyRender>
        <TopSellers />
      </LazyRender>
      <LazyRender>
        <div className='my-[100px]'>
          <Consultation />
        </div>
      </LazyRender>
      <LazyRender>
        <div className='mt-[100px]'>
          <OnlinePay />
        </div>
      </LazyRender>
      <LazyRender>
        <div className='my-[100px]'>
          <FollowInst />
        </div>
      </LazyRender>
    </>
  );
};
