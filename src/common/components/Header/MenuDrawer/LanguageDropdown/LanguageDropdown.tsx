import { FC, useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Image,
  MenuDivider,
} from '@chakra-ui/react';
import englishFlag from 'assets/icons/english.svg';
import kyrgyzFlag from 'assets/icons/kg.svg';
import russianFlag from 'assets/icons/ru.svg';
import Arrow from 'assets/icons/arrow.svg?react';

const LanguageDropdown: FC = () => {
  const [language, setLanguage] = useState('Язык');
  const [flag, setFlag] = useState<string | undefined>(undefined);

  const handleLanguageChange = (lang: string, flag: string) => {
    setLanguage(lang);
    setFlag(flag);
  };

  const mockLanguages = [
    {
      lang: 'English',
      flag: englishFlag,
    },
    {
      lang: 'Кыргызча',
      flag: kyrgyzFlag,
    },
    {
      lang: 'Русский',
      flag: russianFlag,
    },
  ];

  return (
    <Menu>
      <MenuButton
        as={Button}
        bg='mainColor'
        color='white'
        fontSize='22px'
        className='text-left'
        rightIcon={<Arrow />}
        borderRadius='md'
        boxShadow='md'
      >
        <div className='flex items-center'>
          {flag && <Image src={flag} boxSize='20px' mr='2' />}
          {language}
        </div>
      </MenuButton>
      <MenuList w='150px'>
        {mockLanguages.map(({ lang, flag }) => (
          <span key={lang}>
            <MenuItem
              key={lang}
              fontSize='18px'
              className='flex justify-between items-center'
              color='mainColor'
              onClick={() => handleLanguageChange(lang, flag)}
            >
              {lang}
              <Image src={flag} boxSize='20px' ml='2' />
            </MenuItem>
            <MenuDivider borderColor='mainColor' m={0} />
          </span>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageDropdown;
