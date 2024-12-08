import { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface IInputs {
  newPassword: string;
  confirmPassword: string;
}

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  setNewPassword: (value: string) => void;
}

export const MyAccModal: FC<IProps> = ({ isOpen, onClose, setNewPassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IInputs>();

  const onSubmit = (values: IInputs) => {
    setNewPassword(values.newPassword);
    onClose();
  };

  const newPassword = watch('newPassword');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>Смена пароля</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <div className='mt-4'>
              <label htmlFor='newPassword'>
                <span>Новый пароль</span>
                <FormControl isInvalid={!!errors.newPassword} zIndex='1'>
                  <InputGroup size='md'>
                    <Input
                      id='newPassword'
                      type='password'
                      borderRadius='16px'
                      _focusVisible={{ boxShadow: 'none' }}
                      {...register('newPassword', {
                        required: {
                          value: true,
                          message: 'Поле обязательно для заполнения',
                        },
                        minLength: {
                          value: 8,
                          message:
                            'Пароль должен содержать не менее 8 символов',
                        },
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.newPassword && (
                      <span>{errors.newPassword.message}</span>
                    )}
                  </FormErrorMessage>
                </FormControl>
              </label>
            </div>
            <div className='mt-4'>
              <label htmlFor='confirmPassword'>
                <span>Подтвердить пароль</span>
                <FormControl isInvalid={!!errors.confirmPassword} zIndex='1'>
                  <InputGroup size='md'>
                    <Input
                      id='confirmPassword'
                      type='password'
                      borderRadius='16px'
                      _focusVisible={{ boxShadow: 'none' }}
                      {...register('confirmPassword', {
                        required: {
                          value: true,
                          message: 'Поле обязательно для заполнения',
                        },
                        validate: (value) =>
                          value === newPassword || 'Пароли не совпадают',
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.confirmPassword && (
                      <span>{errors.confirmPassword.message}</span>
                    )}
                  </FormErrorMessage>
                </FormControl>
              </label>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button type='submit' bg='#CCD47C' color='white' w='100%'>
              Изменить пароль
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
