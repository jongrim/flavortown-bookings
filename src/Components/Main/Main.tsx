import * as React from 'react';
import { Box } from '@chakra-ui/react';

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <Box gridArea="main" overflow="auto" pb={6} pr={3}>
      {children}
    </Box>
  );
}
