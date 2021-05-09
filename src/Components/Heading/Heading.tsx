import * as React from 'react';
import { Heading as ChakraHeading, HeadingProps } from '@chakra-ui/react';

export default function Heading({ children, ...rest }: HeadingProps) {
  return (
    <ChakraHeading fontFamily="Roboto" {...rest}>
      {children}
    </ChakraHeading>
  );
}
