import { FC, ReactNode } from 'react';
import { Container } from '@chakra-ui/react';

interface ResponsiveContainerProps {
  children: ReactNode;
  classNames?: string;
}

export const ResponsiveContainer: FC<ResponsiveContainerProps> = ({
  children,
  classNames
}) => {
  return (
    <Container
      maxW={{
        base: '100%', // full width on small screens
        sm: '95%', // 95% width on small screens
        md: '90%', // 90% width on medium screens
        lg: '85%', // 85% width on large screens
        xl: '80%',
        '1xl': '1200px', // 1200px width on 1440px+ screens
        '2xl': '1440px', // 1440px width on 1536px+ screens
      }}
      px={{ base: '30px', lg: 0 }}
      className={classNames}
    >
      {children}
    </Container>
  );
};
