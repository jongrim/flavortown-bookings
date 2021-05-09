import * as React from 'react';
import { Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

export default function Nav() {
  const activeLink = { backgroundColor: 'blue.100', borderRadius: 'md' };
  return (
    <Flex flexDirection={['row', 'column']} gridArea="nav" h="full" p={1}>
      <Link
        as={NavLink}
        to="/bookings"
        _activeLink={activeLink}
        py={3}
        px={2}
        mb={[0, 3]}
        mr={[3, 0]}
      >
        Bookings
      </Link>
      <Link
        as={NavLink}
        to="/tables"
        _activeLink={activeLink}
        py={3}
        px={2}
        mb={[0, 3]}
        mr={[3, 0]}
      >
        Tables
      </Link>
      <Link as={NavLink} to="/sales" _activeLink={activeLink} py={3} px={2}>
        Sales
      </Link>
    </Flex>
  );
}
