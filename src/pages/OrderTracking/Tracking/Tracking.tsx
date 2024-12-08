import {
  Box,
  Stepper,
  Step,
  StepIndicator,
  Text,
  VStack,
  HStack,
  StepStatus,
  Image,
  StepSeparator,
  Show,
} from '@chakra-ui/react';

import BoxOpen from 'assets/icons/box-open.svg?react';
import Car from 'assets/icons/car-fill.svg?react';
import Delivered from 'assets/icons/delivered.svg?react';
import { AdaptiveTracing } from './AdaptiveTracing';

import { steps } from './Tracking.helpers';

export const Tracking = () => {
  const activeStep = steps.findIndex((step) => step.isActive);

  return (
    <>
      <VStack
        alignItems='center'
        spacing={8}
        display={{ base: 'none', lg: 'flex' }}
      >
        {/* icons */}
        <HStack
          display={{ base: 'none', lg: 'flex' }}
          justifyContent='space-between'
          alignItems='flex-start'
          width='100%'
        >
          <VStack spacing={2}>
            <Image as={BoxOpen} />
          </VStack>
          <VStack spacing={2}>
            <Image as={Car} />
          </VStack>
          <VStack spacing={2}>
            <Image as={Delivered} />
          </VStack>
        </HStack>
        <Box position='relative' width='100%'>
          {/* steppers */}
          <Stepper
            size='sm'
            index={activeStep + 1}
            gap='0'
            width='100%'
            _last={{ textAlign: 'right' }}
          >
            {steps.map((_, index) => (
              <Step key={index}>
                <StepIndicator
                  border='none'
                  sx={{
                    '[data-status=complete] &': {
                      background: 'mainColor',
                      borderColor: 'black',
                    },
                    '[data-status=active] &': {
                      background: 'darkgray',
                      borderColor: 'black',
                    },
                    '[data-status=incomplete] &': {
                      background: 'darkgray',
                      borderColor: 'black',
                    },
                  }}
                >
                  <StepStatus
                    complete={
                      <Box
                        bg='mainColor'
                        border='none'
                        w='20px'
                        h='20px'
                        borderRadius='50%'
                        outline='none'
                      />
                    }
                    incomplete={
                      <Box
                        bg='#B1B1B1'
                        border='none'
                        w='20px'
                        h='20px'
                        borderRadius='50%'
                      />
                    }
                    active={
                      <Box
                        bg='#B1B1B1'
                        border='none'
                        w='20px'
                        h='20px'
                        borderRadius='50%'
                      />
                    }
                  />
                </StepIndicator>
                <StepSeparator
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //   @ts-expect-error
                  _horizontal={{
                    backgroundColor:
                      activeStep >= index ? 'mainColor' : '#B1B1B1',
                    ml: '0',
                    w: '100%',
                    position: 'absolute',
                  }}
                />
              </Step>
            ))}
          </Stepper>
          {/* progress */}
        </Box>
        {/* text */}
        <HStack
          spacing={12}
          justifyContent='space-between'
          alignItems='flex-start'
          width='100%'
        >
          {steps.map((step, index) => (
            <VStack
              w='33%'
              key={index}
              spacing={2}
              _first={{ alignItems: 'flex-start' }}
              _last={{ alignItems: 'flex-end' }}
            >
              <Text fontWeight='bold' color='black' fontSize={'20px'}>
                {step.title}
              </Text>
              <Box color='darkGray' fontSize='18px'>
                {step.description()}
              </Box>
              {step.date && (
                <Text fontSize='15px' color='mainColor'>
                  {step.date}
                </Text>
              )}
            </VStack>
          ))}
        </HStack>
      </VStack>
      <Show below='lg'>
        <AdaptiveTracing />
      </Show>
    </>
  );
};
