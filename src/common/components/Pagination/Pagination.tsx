import React from 'react';
import { Box, Button, IconButton } from '@chakra-ui/react';
import PrevIcon from 'assets/icons/prev-arrow.svg?react';
import NextIcon from 'assets/icons/next-arrow.svg?react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
}) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxDisplayedPages = 4;

    if (totalPages <= maxDisplayedPages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= maxDisplayedPages) {
        for (let i = 1; i <= maxDisplayedPages; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage > totalPages - maxDisplayedPages) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - maxDisplayedPages + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <Box display='flex' alignItems='center' justifyContent='center' mt={4}>
      <IconButton
        aria-label='Previous Page'
        icon={<PrevIcon />}
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        _hover={{ bg: 'transparent' }}
        bg={currentPage === 1 ? '#919EAB' : 'transparent'}
        border='1px solid #DFE3E8'
        className='pagination-button'
      />
      {generatePageNumbers().map((page, index) =>
        page === '...' ? (
          <Button
            as='div'
            key={`ellipsis-${index}`}
            bg='white'
            border='1px solid #DFE3E8'
            className='pagination-button'
            _hover={{ bg: 'transparent' }}
            maxW='32px'
            h='40px'
            px={{ base: '2px', lg: '10px' }}
          >
            ...
          </Button>
        ) : (
          <Button
            key={`page-${page}`}
            onClick={() => onPageChange(page as number)}
            border='1px solid'
            bg='transparent'
            _hover={{ bg: 'transparent' }}
            borderColor={page === currentPage ? 'mainColor' : '#DFE3E8'}
            color={page === currentPage ? 'mainColor' : 'darkGray'}
            mx={1}
            px={{ base: '2px', lg: '10px' }}
          >
            {page}
          </Button>
        )
      )}
      <IconButton
        aria-label='Next Page'
        icon={<NextIcon />}
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages || !hasNext}
        _hover={{ bg: 'transparent' }}
        bg={currentPage === totalPages ? '#919EAB' : 'transparent'}
        border='1px solid #DFE3E8'
        className='pagination-button'
      />
    </Box>
  );
};
