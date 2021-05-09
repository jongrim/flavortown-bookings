import * as React from 'react';
import { Spinner, Flex } from '@chakra-ui/react';

export default function FullScreenSpinner() {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Spinner />
    </Flex>
  );
}
