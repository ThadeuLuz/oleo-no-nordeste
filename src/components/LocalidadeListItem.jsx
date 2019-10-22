import React from 'react'
import PropTypes from 'prop-types'
import { Card, Text, Heading, Image } from 'rebass'
import { format } from 'date-fns'

const imageSize = 300

const getUrl = (lat, long) =>
  `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=10&size=${imageSize}x${imageSize}&key=AIzaSyDjvbwqffxVZO36mEvjnTWjz-G3KqHYS9g`

const Beach = ({ nome, municipio, dataAvist, status, estado, lat, long }) => (
  <Card m={1} width={250}>
    <Image src={getUrl(lat, long)} />
    <Heading>{nome}</Heading>
    <Text>
      {municipio}-{estado}
    </Text>
    {dataAvist && <Text>Data Avistada: {format(dataAvist, 'dd/MM/yy')}</Text>}
    <Text>Status: {status}</Text>
  </Card>
)

Beach.propTypes = {
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
