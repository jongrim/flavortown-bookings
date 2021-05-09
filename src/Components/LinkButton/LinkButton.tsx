import * as React from 'react';
import { Link as ReactRouterLink, LinkProps } from 'react-router-dom';
import { Link } from '@chakra-ui/react';

interface LinkButtonProps {
  children: React.ReactNode;
}

export default function LinkButton({
  children,
  ...rest
}: LinkButtonProps & LinkProps) {
  return (
    <Link
      as={ReactRouterLink}
      w={24}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="md"
      py={2}
      _hover={{
        backgroundColor: 'gray.50',
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
