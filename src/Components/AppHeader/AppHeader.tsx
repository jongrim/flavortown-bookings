import * as React from 'react';
import { Box, Flex, IconButton, Spacer } from '@chakra-ui/react';
import { RiUser3Line, RiNotification3Fill } from 'react-icons/ri';
import BrandIcon from './BrandIcon';

export default function AppHeader() {
  return (
    <Flex py={1} px={2} w="full" alignItems="center" gridArea="header">
      <Box h="full" w={16}>
        <BrandIcon />
      </Box>
      <Spacer />
      <IconButton
        aria-label="notifications"
        variant="ghost"
        icon={<RiNotification3Fill />}
        size="lg"
      />
      <IconButton
        aria-label="user settings"
        variant="ghost"
        icon={<RiUser3Line />}
        ml={1}
        size="lg"
      />
    </Flex>
  );
}
