import { Button } from '@chakra-ui/react';

const SubmitButton: React.FC = () => (
  <Button
    bg='mainColor'
    color='white'
    _hover={{ bg: 'mainColor' }}
    type='submit'
    size={'lg'}
    mt={4}
    w='full'
  >
    Оформить заказ
  </Button>
);

export default SubmitButton;
