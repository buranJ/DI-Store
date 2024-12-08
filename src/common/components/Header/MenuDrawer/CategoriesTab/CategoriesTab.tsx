import { useState } from 'react';
import { Box, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import ArrowBack from 'assets/icons/arrow-back.svg?react';
import ArrowForward from 'assets/icons/arrow-forward.svg?react';
import { useGetCategoriesQuery } from 'api/common/categories.api';
import { ICategoryData } from 'types/entities';

interface IProps {
  onClose: (value: boolean) => void;
}

const CategoriesTab = ({ onClose }: IProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryData | null>(null);
  const categoryQuery = useGetCategoriesQuery();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate('/catalog', { state: { categoryName } });
    onClose(false);
  };

  return (
    <>
      {!selectedCategory ? (
        <Box
          bg={{ base: 'transparent', lg: 'white' }}
          borderBottomRadius={{ base: 'none', lg: '22px' }}
        >
          {categoryQuery.data?.map((category) => (
            <Box key={category.name}>
              <Box
                className='flex items-center'
                onClick={() => setSelectedCategory(category)}
                px={{ base: 'none', lg: '30px' }}
              >
                <Box
                  display='block'
                  py={2}
                  fontWeight='500'
                  fontSize='20px'
                  color='#B1B1B1'
                >
                  {category.name}
                </Box>
                <ArrowForward className='ml-auto' />
              </Box>
              <Divider color={'mainColor'} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          bg={{ base: 'transparent', lg: 'white' }}
          borderBottomRadius={{ base: 'none', lg: '22px' }}
          py={{ base: 0, lg: '10px' }}
        >
          <Box className='flex items-center' px={{ base: 'none', lg: '30px' }}>
            <ArrowBack onClick={() => setSelectedCategory(null)} />
            <Box ml='32px' fontWeight='bold' fontSize='lg' color='mainColor'>
              {selectedCategory.name}
            </Box>
          </Box>
          <Box className='mt-[10px]'>
            {selectedCategory.categories.map((item) => (
              <Box key={item.id}>
                <Box
                  onClick={() => handleCategoryClick(item.name)}
                  display='block'
                  py={2}
                  className='text-xl'
                  color='#B1B1B1'
                  px={{ base: 'none', lg: '30px' }}
                  cursor='pointer'
                >
                  {item.name}
                </Box>
                <Divider color={'mainColor'} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default CategoriesTab;
