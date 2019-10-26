import React, { useState } from 'react'
import { Box, Heading, Flex, Link, Text } from 'rebass'
import { Label, Select, Input } from '@rebass/forms'
import stringSimilarity from 'string-similarity';

import localidadesUnfiltered from '../data/localidades.json'
import Localidade from './LocalidadeListItem'

const localidades = localidadesUnfiltered
  .map(({ dataRevis, dataAvist, ...l }) => {
    if (dataRevis) {
      l.dataRevis = new Date(dataRevis)
    }
    if (dataAvist) {
      l.dataAvist = new Date(dataAvist)
    }
    return l
  })
  .sort((l1, l2) => {
    const a = l1.dataAvist
    const b = l2.dataAvist
    return a > b ? -1 : a < b ? 1 : 0
  })

const estados = [...new Set(localidades.map(l => l.estado))]

const LocalidadeList = () => {
  const [estado, setEstado] = useState('Todos')
  const [busca, setBusca] = useState('')

  const handleStateChange = event => {
    setEstado(event.target.value)
  }

  const handleSearchChange = event => {
    setBusca(event.target.value)
  }

  const locFiltrado = localidades.filter(l => {
    return (
      (estado === 'Todos' || l.estado === estado) &&
      (busca
        ? stringSimilarity.compareTwoStrings(
            busca.toLocaleLowerCase(),
            l.nome.toLocaleLowerCase(),
          ) > 0.4
        : true)
    )
  })

  return (
    <>
      <Heading>Localidades Afetadas ({locFiltrado.length})</Heading>
      <Text>
        Dados obtidos a partir do{' '}
        <Link
          href="https://www.ibama.gov.br/notas/2047-manchas-de-oleo-no-litoral-do-nordeste"
          target="_blank"
        >
          Site do Ibama
        </Link>
      </Text>

      <Box my={3} mb={2}>
        <Label htmlFor="estado">Estado</Label>
        <Select
          value={estado}
          id="estado"
          name="estado"
          onChange={handleStateChange}
        >
          <option>Todos</option>
          {estados.map(e => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </Select>
      </Box>

      <Box my={3} mb={5}>
        <Label htmlFor="busca">Buscar</Label>
        <Input
          value={busca}
          id="busca"
          name="busca"
          onChange={handleSearchChange}
        />
      </Box>

      <Flex flexWrap="wrap" m={-1} justifyContent="center">
        {locFiltrado.map(l => (
          <Localidade key={`${l.lat}_${l.long}`} {...l} />
        ))}
      </Flex>
    </>
  )
}

export default LocalidadeList
