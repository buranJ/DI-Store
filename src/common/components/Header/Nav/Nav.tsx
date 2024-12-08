import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Show,
  Text,
} from '@chakra-ui/react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useDebounce, useHeader } from 'common/hooks';
import { useLazyGetProductsQuery } from 'api/common/products.api';
import { RootState } from 'api';

import { ResponsiveContainer } from 'common/ui';

import BurgerMenuIcon from 'assets/icons/burgerMenu.svg';
import Close from 'assets/icons/close.svg';
import Logo from 'assets/icons/logo.svg';
import Search from 'assets/icons/search.svg';
import Cart from 'assets/icons/cart.svg';
import ArrowBack from 'assets/icons/arrowBack-green.svg';
import Heart from 'assets/icons/heart.svg?react';
import Account from 'assets/icons/account.svg?react';

import CategoriesTab from '../MenuDrawer/CategoriesTab/CategoriesTab';
import { Link } from './Link';
import { MobileSearch } from './MobileSearch';

import { IProduct } from 'types/entities';

import { mockPages } from './Nav.helpers';

import './index.scss';
import { useLazyGetCartsQuery } from 'api/carts/carts.api';

interface IProps {
  isDrawerMenuOpen: boolean;
  toggleDrawerMenuShow: (value: boolean) => void;
}

const NavComponent: FC<IProps> = ({
  toggleDrawerMenuShow,
  isDrawerMenuOpen,
}) => {
  useLazyGetCartsQuery();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const headerContext = useHeader();
  const cartData = useSelector((state: RootState) => state.cart);

  const [getProducts, { data: products }] = useLazyGetProductsQuery();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleAccountClick = () => {
    localStorage.getItem('access_token')
      ? navigate('/profile')
      : navigate('/auth');
  };

  const handleSearch = useDebounce((value: string) => {
    if (value) {
      getProducts({ search: value });
      setShowSearchResult(true);
    } else {
      setShowSearchResult(false);
    }
  }, 1500);

  useEffect(() => {
    setIsMenuOpen(isDrawerMenuOpen);
  }, [isDrawerMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    setShowMobileSearch(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResult(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowSearchResult(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    if (showMobileSearch) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileSearch]);

  return (
    <>
      <Box
        as='nav'
        boxShadow='0px 4px 50px 0px #0000000D'
        pos='relative'
        zIndex={10}
        bg='#fff'
      >
        <ResponsiveContainer>
          <Show above='lg'>
            <Box display='flex' justifyContent='space-between'>
              <Box
                as='div'
                pos='relative'
                className='w-1/2 nav items-center !gap-6'
                zIndex={2}
              >
                <Image
                  w='22px'
                  onClick={handleMenuToggle}
                  src={BurgerMenuIcon}
                />
                {mockPages.map(({ name, path }) => (
                  <Link
                    isActive={pathname === path}
                    key={name}
                    name={name}
                    path={path}
                  />
                ))}
                {isMenuOpen && (
                  <Box pos='absolute' top='56px' left='0'>
                    <CategoriesTab onClose={handleMenuToggle} />
                  </Box>
                )}
              </Box>
              <Box
                className='flex items-center w-1/2 gap-[30px]'
                ref={searchRef}
              >
                <Box maxW='70%' w='100%' mx='auto' p={0}>
                  <InputGroup alignItems='center' pos='relative'>
                    <Input
                      placeholder='ISNTREE hyaluronic acid...'
                      borderRadius='full'
                      h='30px'
                      bg='rgba(245, 245, 220, 0.5)'
                      pr='40px'
                      _placeholder={{ color: 'gray.500' }}
                      onChange={(e) => handleSearch(e.target.value)}
                      onFocus={() => setShowSearchResult(true)}
                      variant='unstyled'
                      px={3}
                    />
                    <InputRightElement
                      h='auto'
                      top='50%'
                      transform='translateY(-50%)'
                    >
                      <Image w='20px' h='20px' src={Search} alt='Search' />
                    </InputRightElement>
                    {showSearchResult && products && (
                      <Box
                        mt={2}
                        w='100%'
                        maxH={300}
                        bg='white'
                        boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
                        borderRadius='md'
                        overflow='scroll'
                        pos='absolute'
                        top={30}
                        left={0}
                      >
                        {products.items?.map((product: IProduct) => (
                          <Box
                            key={product.id}
                            display='flex'
                            alignItems='center'
                            justifyContent='space-between'
                            p={2}
                            borderBottom='1px solid #e2e8f0'
                            _last={{ borderBottom: 'none' }}
                            cursor='pointer'
                            onClick={() => {
                              navigate(`/product/${product.id}`);
                              setShowSearchResult(false);
                            }}
                          >
                            <Text fontSize='sm' className='line-clamp-1'>
                              {product.title}
                            </Text>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </InputGroup>
                </Box>

                <Icon
                  onClick={() => navigate('/favorites')}
                  cursor='pointer'
                  as={Heart}
                  color='mainColor'
                  w='25px'
                  h='25px'
                />
                <div className='relative w-[25px] h-[25px]'>
                  <Image
                    onClick={() => navigate('/basket')}
                    cursor='pointer'
                    src={Cart}
                    w='100%'
                    h='100%'
                  />
                  <span className='absolute -top-1.5 -right-[10px] text-[10px] text-white bg-mainColor rounded-full px-[5px]'>
                    {cartData.cartCount ?? 0}
                  </span>
                </div>
                <Icon
                  onClick={handleAccountClick}
                  cursor='pointer'
                  as={Account}
                  color='mainColor'
                  w='25px'
                  h='25px'
                />
              </Box>
            </Box>
          </Show>
          {/* mobile menu */}
          <Box
            display={{ base: 'flex', lg: 'none' }}
            alignItems='center'
            justifyContent='space-between'
            py={'20px'}
          >
            {headerContext?.isShowArrow ? (
              <Image onClick={() => navigate(-1)} src={ArrowBack} />
            ) : (
              <Image
                onClick={() => toggleDrawerMenuShow(!isDrawerMenuOpen)}
                src={isDrawerMenuOpen ? Close : BurgerMenuIcon}
              />
            )}

            <Box maxW='185px'>
              {headerContext?.headerContent ? (
                headerContext.headerContent
              ) : (
                <Image src={Logo} />
              )}
            </Box>
            <Box display='flex' gap='10px'>
              {!headerContext?.isIconsHide[0] && (
                <>
                  {headerContext?.isSearchHide[0] && (
                    <Box>
                      <Image
                        src={Search}
                        onClick={() => setShowMobileSearch(true)}
                      />
                      {showMobileSearch && (
                        <MobileSearch
                          setShowMobileSearch={setShowMobileSearch}
                        />
                      )}
                    </Box>
                  )}
                  <Box>
                    <NavLink to='/basket' className='relative'>
                      <Image src={Cart} />

                      <span className='absolute -top-1.5 -right-[10px] text-[10px] text-white bg-mainColor rounded-full px-[5px]'>
                        {cartData.cartCount}
                      </span>
                    </NavLink>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </ResponsiveContainer>
      </Box>
      {isMenuOpen && (
        <Box
          position='fixed'
          top='0'
          left='0'
          width='100%'
          height='100%'
          bg='rgba(0, 0, 0, 0.5)'
          backdropFilter='blur(5px)'
          zIndex='1'
          onClick={handleMenuToggle}
        />
      )}
    </>
  );
};

export const Nav = memo(NavComponent);
