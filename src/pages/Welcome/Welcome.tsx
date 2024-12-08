import { Link, useNavigate } from 'react-router-dom';

import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import { useGetCurrentUserQuery } from 'api/users/users.api';
import { ResponsiveContainer } from 'common/ui';
import { Loader } from 'common/components';

import './styles.scss';

export const Welcome = () => {
  const userQuery = useGetCurrentUserQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose();
    localStorage.clear();
    navigate('/');
  };

  if (userQuery.isLoading) return <Loader />;

  return (
    <section className='welcome'>
      <Modal isOpen={isOpen} onClose={onClose} size='xs' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <h2 className='font-bold text-center text-[22px]'>
              Вы уверены, что хотите выйти?
            </h2>
          </ModalBody>

          <ModalFooter display='flex' justifyContent='space-between'>
            <Button
              colorScheme='red'
              variant='outline'
              mr={3}
              onClick={onClose}
              w='50%'
            >
              Отменить
            </Button>
            <Button onClick={handleLogout} colorScheme='red' w='50%'>
              Выйти
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ResponsiveContainer>
        <div className='welcome__content'>
          <div className='welcome__top'>
            <div className='detail'>
              <div className='avatar'>
                <Avatar size='2xl' className='w-[72px] h-[72px] rounded-full' />
              </div>
              <div>
                <h2>
                  {userQuery.data?.name ??
                    userQuery.data?.nickname ??
                    'Пользователь'}
                </h2>
                <h3>{userQuery.data?.email}</h3>
              </div>
            </div>
            <div className='exit' onClick={() => onOpen()}>
              <svg
                width='70'
                height='70'
                viewBox='0 0 70 70'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M43.75 24.0625V18.5938C43.75 17.1433 43.1738 15.7523 42.1482 14.7268C41.1227 13.7012 39.7317 13.125 38.2812 13.125H12.0312C10.5808 13.125 9.18985 13.7012 8.16426 14.7268C7.13867 15.7523 6.5625 17.1433 6.5625 18.5938V51.4062C6.5625 52.8567 7.13867 54.2477 8.16426 55.2732C9.18985 56.2988 10.5808 56.875 12.0312 56.875H38.2812C39.7317 56.875 41.1227 56.2988 42.1482 55.2732C43.1738 54.2477 43.75 52.8567 43.75 51.4062V45.9375M52.5 24.0625L63.4375 35M63.4375 35L52.5 45.9375M63.4375 35H26.1133'
                  stroke='#CCD47C'
                  strokeWidth='5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </div>
          <nav>
            <div className='box'>
              <div className='item'>
                <svg
                  width='120'
                  height='120'
                  viewBox='0 0 120 120'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g clipPath='url(#clip0_385_3184)'>
                    <path
                      d='M96 96C89.34 96 84 101.34 84 108C84 111.183 85.2643 114.235 87.5147 116.485C89.7652 118.736 92.8174 120 96 120C99.1826 120 102.235 118.736 104.485 116.485C106.736 114.235 108 111.183 108 108C108 104.817 106.736 101.765 104.485 99.5147C102.235 97.2643 99.1826 96 96 96ZM0 0V12H12L33.6 57.54L25.44 72.24C24.54 73.92 24 75.9 24 78C24 81.1826 25.2643 84.2348 27.5147 86.4853C29.7652 88.7357 32.8174 90 36 90H108V78H38.52C38.1222 78 37.7406 77.842 37.4593 77.5607C37.178 77.2794 37.02 76.8978 37.02 76.5C37.02 76.2 37.08 75.96 37.2 75.78L42.6 66H87.3C91.8 66 95.76 63.48 97.8 59.82L119.28 21C119.7 20.04 120 19.02 120 18C120 16.4087 119.368 14.8826 118.243 13.7574C117.117 12.6321 115.591 12 114 12H25.26L19.62 0M36 96C29.34 96 24 101.34 24 108C24 111.183 25.2643 114.235 27.5147 116.485C29.7652 118.736 32.8174 120 36 120C39.1826 120 42.2348 118.736 44.4853 116.485C46.7357 114.235 48 111.183 48 108C48 104.817 46.7357 101.765 44.4853 99.5147C42.2348 97.2643 39.1826 96 36 96Z'
                      fill='#CCD47C'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_385_3184'>
                      <rect width='120' height='120' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <Link to={'/order-tracking'}>Заказы</Link>
            </div>
            <div className='box'>
              <div className='item'>
                <svg
                  width='120'
                  height='120'
                  viewBox='0 0 120 120'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M60 52.5C64.1421 52.5 67.5 49.1421 67.5 45C67.5 40.8579 64.1421 37.5 60 37.5C55.8579 37.5 52.5 40.8579 52.5 45C52.5 49.1421 55.8579 52.5 60 52.5Z'
                    fill='#CCD47C'
                  />
                  <path
                    d='M60 7.5C39.3234 7.5 22.5 23.5898 22.5 43.3594C22.5 52.7742 26.7914 65.2945 35.2547 80.5734C42.0516 92.8406 49.9148 103.934 54.0047 109.453C54.6958 110.396 55.5994 111.163 56.6422 111.692C57.6851 112.221 58.8378 112.496 60.007 112.496C61.1762 112.496 62.329 112.221 63.3718 111.692C64.4147 111.163 65.3183 110.396 66.0094 109.453C70.0922 103.934 77.9625 92.8406 84.7594 80.5734C93.2086 65.2992 97.5 52.7789 97.5 43.3594C97.5 23.5898 80.6766 7.5 60 7.5ZM60 60C57.0333 60 54.1332 59.1203 51.6664 57.472C49.1997 55.8238 47.2771 53.4811 46.1418 50.7403C45.0065 47.9994 44.7094 44.9834 45.2882 42.0736C45.867 39.1639 47.2956 36.4912 49.3934 34.3934C51.4912 32.2956 54.1639 30.867 57.0736 30.2882C59.9834 29.7094 62.9994 30.0065 65.7402 31.1418C68.4811 32.2771 70.8238 34.1997 72.472 36.6664C74.1203 39.1332 75 42.0333 75 45C74.9957 48.9769 73.4139 52.7897 70.6018 55.6018C67.7897 58.4139 63.9769 59.9957 60 60Z'
                    fill='#CCD47C'
                  />
                </svg>
              </div>
              <Link to={'/address/' + userQuery.data?.id}>Адрес</Link>
            </div>
            <div className='box'>
              <div className='item'>
                <svg
                  width='120'
                  height='120'
                  viewBox='0 0 120 120'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M60.0004 60C66.5639 60 72.8585 57.3661 77.4995 52.6777C82.1406 47.9893 84.7479 41.6304 84.7479 35C84.7479 28.3696 82.1406 22.0107 77.4995 17.3223C72.8585 12.6339 66.5639 10 60.0004 10C53.437 10 47.1424 12.6339 42.5013 17.3223C37.8603 22.0107 35.2529 28.3696 35.2529 35C35.2529 41.6304 37.8603 47.9893 42.5013 52.6777C47.1424 57.3661 53.437 60 60.0004 60ZM29.9499 67.1429C26.6682 67.1429 23.5209 68.4598 21.2004 70.804C18.8798 73.1482 17.5762 76.3277 17.5762 79.6429V81.4286C17.5762 89.975 22.9605 97.2036 30.6039 102.118C38.2898 107.061 48.6944 110 60.0004 110C71.3065 110 81.7075 107.061 89.3969 102.118C97.0403 97.2036 102.425 89.975 102.425 81.4286V79.6429C102.425 76.3277 101.121 73.1482 98.8005 70.804C96.4799 68.4598 93.3326 67.1429 90.0509 67.1429H29.9499Z'
                    fill='#CCD47C'
                  />
                </svg>
              </div>
              <Link to={'/my-acc'}>Аккаунт</Link>
            </div>
          </nav>
        </div>
      </ResponsiveContainer>
    </section>
  );
};
