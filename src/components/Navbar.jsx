import React from "react";
import { Flex, Box, Link as ExternalLink, Heading, Image } from "rebass";
import { Link } from "react-router-dom";

import github from "../images/github.svg";

const Navbar = () => (
  <Flex px={2} py={1} width={1} alignItems="center" bg="black">
    <Heading p={2} fontWeight="bold" color="white">
      <Link to="/" style={{ color: '#fff', textDecoration: 'none'}}>Óleo no Nordeste</Link>
    </Heading>
    <Box mx="auto" sx={{ boxShadow: "card" }} />
    <Heading p={3} fontWeight="bold" color="white">
      <Link to="/ajudar" style={{ color: '#fff', textDecoration: 'none'}}>Ajudar</Link>
    </Heading>
    <ExternalLink
      color="white"
      href="https://github.com/ThadeuLuz/oleo-nordeste"
      target="_blank"
    >
      <Image src={github} variant="icon" />
    </ExternalLink>
  </Flex>
);

export default Navbar;
