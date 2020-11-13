/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box, Heading, Flex, Text, Button,
} from '@chakra-ui/core';
import { Link } from 'react-router-dom';

interface Props {
  children: any;
}

const MenuItems: React.FC<Props> = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    <Link to={`/${children}`}>{children}</Link>
  </Text>
);

const Navbar: React.FC = (props) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing="-.1rem">
          <Link to="/">Data Traka</Link>
        </Heading>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        {/* <MenuItems>Docs</MenuItems> */}
        {/* <MenuItems>Examples</MenuItems> */}
        <MenuItems>cpu-usage</MenuItems>
      </Box>
    </Flex>
  );
};

export default Navbar;
