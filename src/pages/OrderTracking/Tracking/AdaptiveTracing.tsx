import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  Box,
  StepTitle,
  StepDescription,
  StepSeparator,
  Text,
} from '@chakra-ui/react';

import { steps } from './Tracking.helpers';

export const AdaptiveTracing = () => {
  const activeStep = steps.findIndex((step) => step.isActive);

  return (
    <Stepper
      index={activeStep + 1}
      orientation='vertical'
      height='400px'
      gap='0'
      size='sm'
      pr={2.5}
    >
      {steps.map((step, index) => (
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

          <Box flexShrink='0' w='100%'>
            <StepTitle>
              <Box
                display={'flex'}
                alignItems='center'
                justifyContent={'space-between'}
              >
                <Text fontSize='20px'>{step.title}</Text>
                <Text as='span' fontSize='15px' color='mainColor'>
                  {step.date}
                </Text>
              </Box>
            </StepTitle>
            <StepDescription>
              <Text fontSize='18px' wordBreak={'break-word'}>
                {step.description()}
              </Text>
            </StepDescription>
          </Box>
          <StepSeparator
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //   @ts-expect-error
            _vertical={{
              backgroundColor: activeStep >= index ? 'mainColor' : '#B1B1B1',
              top: 0,
              maxHeight: '100%',
            }}
          />
        </Step>
      ))}
    </Stepper>
  );
};
