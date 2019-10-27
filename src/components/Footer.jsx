import React from 'react'
import { Box, Text, Link } from 'rebass'

const Footer = () => (
  <Box bg='black'>
    <Box
      p={4}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        px: 3,
      }}
    >
      <Text textAlign='center' color='white'>
        Sugestões para os próximos passos são MUITO bem vindas. Por favor, use o
        issues do{' '}
        <Link href='https://github.com/ThadeuLuz/oleo-nordeste' target='_blank'>
          GitHub
        </Link>{' '}
        (mais opções em breve).
      </Text>
      <Text color='white' textAlign='center'>
        Feito em Maceió 🏝
      </Text>
    </Box>
  </Box>
)

export default Footer
