import { useCallback, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

import { useHeader } from 'common/hooks';

import { Nav } from './Nav';
import { MenuDrawer } from './MenuDrawer';

export const Header = () => {
  const headerContext = useHeader();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawerMenu = useCallback(
    (value: boolean) => setIsOpen(value),
    []
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <Box as='header'>
      <Nav toggleDrawerMenuShow={toggleDrawerMenu} isDrawerMenuOpen={isOpen} />
      {/* Условное отображение MenuDrawer, если isShowArrow равно false */}
      {!headerContext?.isShowArrow && (
        <MenuDrawer isOpen={isOpen} onClose={toggleDrawerMenu} />
      )}
    </Box>
  );
};
