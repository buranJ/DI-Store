import { Menu, MenuButton, MenuList, Button, Stack } from '@chakra-ui/react';
import Arrow from 'assets/icons/arrow.svg?react';
import { FC } from 'react';

interface IProps {
  label: string;
  children?: JSX.Element;
}

export const FilterMenu: FC<IProps> = ({ label, children }) => (
  <Menu>
    <MenuButton
      bg='mainColor'
      color='white'
      _hover={{ bg: 'mainColor' }}
      _active={{ bg: 'mainColor' }}
      borderRadius={10}
      as={Button}
      rightIcon={<Arrow />}
    >
      {label}
    </MenuButton>
    <MenuList
      maxH={420}
      boxShadow={'0px 0px 10px 0px #0000001A'}
    >
      <Stack direction='column' px='9px'>
        {children}
      </Stack>
    </MenuList>
  </Menu>
);
