import { ReactNode } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

export interface Step {
  title: string;
  description: () => ReactNode;
  date?: string;
  isActive: boolean;
}

export const steps: Step[] = [
  {
    title: 'Сборка',
    description: () => (
      <Text>
        На этапе сборки тщательно проверяют ваш заказ и проверяют перед
        отправкой
      </Text>
    ),
    date: '24.06.2024',
    isActive: false,
  },
  {
    title: 'Доставка',
    description: () => (
      <Text>На данном этапе заказа отправляется покупателю</Text>
    ),
    isActive: true,
  },
  {
    title: 'Доставлено',
    description: () => (
      <Box>
        <Text>Заказ доставлен покупателю</Text>
        <Button
          variant='link'
          textDecoration='underline'
          color='mainColor'
          textUnderlineOffset={3}
        >
          Подтвердить
        </Button>
      </Box>
    ),
    isActive: false,
  },
];
