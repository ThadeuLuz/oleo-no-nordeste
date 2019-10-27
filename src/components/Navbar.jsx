import React from 'react'
import { Flex, Box, Link, Heading, Image } from 'rebass'

import github from '../images/github.svg'

const Navbar = () => (
  <Flex px={2} py={1} width={1} alignItems='center' bg='black'>
    <Heading p={2} fontWeight='bold' color='white'>
      Óleo no Nordeste
    </Heading>
    <Box mx='auto' sx={{ boxShadow: 'card' }} />
    <Link
      color='white'
      href='https://github.com/ThadeuLuz/oleo-nordeste'
      target='_blank'
    >
      <Image src={github} variant='icon' />
    </Link>
  </Flex>
)

export default Navbar
