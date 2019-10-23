import React from 'react'
import PropTypes from 'prop-types'
import { Card, Text, Heading, Image } from 'rebass'
import { format } from 'date-fns'

const Beach = ({ nome, imageUrl, municipio, dataAvist, status, estado }) => (
  <Card m={1} width={250}>
    <Image src={imageUrl} />
    <Heading>{nome}</Heading>
    <Text>
      {municipio}-{estado}
    </Text>
    {dataAvist && <Text>Data Avistada: {format(dataAvist, 'dd/MM/yy')}</Text>}
    <Text>Status: {status}</Text>
  </Card>
)

Beach.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  municipio: PropTypes.string.isRequired,
  estado: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
  // Opcionais
  dataAvist: PropTypes.instanceOf(Date),
  dataRevis: PropTypes.instanceOf(Date),
}

export default Beach
