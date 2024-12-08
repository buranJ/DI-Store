import React, { useMemo, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  Text,
} from '@chakra-ui/react';
import { useLazyGetUdsQuery } from 'api/common/uds.api';
import { useSelector } from 'react-redux';
import { RootState } from 'api';
import { useToastNotification } from 'common/hooks';

interface IUdsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { points: number; uds_code: string }) => void;
  onSkip: () => void;
}

export const UdsModal: React.FC<IUdsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onSkip,
}) => {
  const [udsCode, setUdsCode] = useState<string>('');
  const [enteredPoints, setEnteredPoints] = useState<number>(0);

  const [getUds, udsQuery] = useLazyGetUdsQuery();
  const cart = useSelector((state: RootState) => state.cart);

  const notify = useToastNotification();

  const maxPoints = useMemo(
    () => Math.floor((cart.data?.total_price || 0) / 2),
    [cart.data?.total_price]
  );

  const isSubmitDisabled = useMemo(
    () => !udsCode || enteredPoints <= 0 || enteredPoints > maxPoints,
    [udsCode, enteredPoints, maxPoints]
  );

  const handleSubmit = async () => {
    if (isSubmitDisabled) {
      notify.onError({
        title: 'Невалидные данные',
        description: `Введите корректное количество бонусов (до ${maxPoints}) и UDS-код.`,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await getUds({ uds_code: udsCode }).unwrap();
      if (response.points >= enteredPoints) {
        onConfirm({ points: enteredPoints, uds_code: udsCode });
        onClose();
      } else {
        notify.onError({
          title: 'Недостаточно бонусов',
          description: 'Попробуйте ввести меньшее количество бонусов.',
        });
      }
    } catch (error) {
      notify.onError({
        description: 'Произошла ошибка при проверке UDS-кода.',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Списать бонусы UDS</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder='Введите UDS-код'
            value={udsCode}
            onChange={(e) => setUdsCode(e.target.value)}
            mb={4}
          />
          <Input
            type='number'
            placeholder='Количество бонусов'
            value={enteredPoints || ''}
            onChange={(e) =>
              setEnteredPoints(Math.min(Number(e.target.value), maxPoints))
            }
            mb={2}
          />
          <Text fontSize='sm' color='gray.500'>
            Вы можете списать не более <b>{maxPoints}</b> бонусов.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            w='50%'
            variant='outline'
            color='mainColor'
            borderColor='mainColor'
            onClick={onSkip}
            _hover={{ bg: 'mainColor', color: 'white' }}
            mr={3}
          >
            Пропустить
          </Button>
          <Button
            w='50%'
            bg='mainColor'
            color='white'
            onClick={handleSubmit}
            isLoading={udsQuery.isLoading}
            isDisabled={isSubmitDisabled}
            _hover={{ bg: 'mainColor' }}
          >
            Списать
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
